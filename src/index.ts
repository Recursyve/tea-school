import * as pug from 'pug';
import * as sass from 'sass';
import puppeteer, { BrowserConnectOptions, BrowserLaunchArgumentOptions, LaunchOptions, PDFOptions } from "puppeteer";
import { Options as SassOptions } from 'sass';

export interface GeneratePdfOptions {
    styleOptionsPath?: string;
    styleOptions?: SassOptions<"async">;
    htmlTemplateFn?: pug.compileTemplate;
    htmlTemplatePath?: string;
    htmlTemplateOptions?: pug.Options & pug.LocalsObject;
    pdfOptions?: PDFOptions;
    puppeteerOptions?: LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions;
}

export interface GeneratePdfOptionsFromUrl {
    url: string;
    pdfOptions?: PDFOptions;
    puppeteerOptions?: LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions;
}

export const generatePdf = async (options: GeneratePdfOptions): Promise<Buffer> => {
    const browser = await puppeteer.launch(options.puppeteerOptions);
    const page = await browser.newPage();
    const htmlTemplateOptions: pug.Options & pug.LocalsObject = {...options.htmlTemplateOptions};
    let renderedTemplate;

    // This is conditional since the user could get his style in some other way.
    if (options.styleOptionsPath) {
        const compiledStyle = await sass.compileAsync(options.styleOptionsPath, {...options.styleOptions ?? {}});

        htmlTemplateOptions.compiledStyle = compiledStyle.css;
    }

    if (options.htmlTemplateFn) {
        renderedTemplate = options.htmlTemplateFn(htmlTemplateOptions);
    } else if (options.htmlTemplatePath) {
        renderedTemplate = pug.renderFile(options.htmlTemplatePath, htmlTemplateOptions)
    } else {
        throw Error('htmlTemplateFn or htmlTemplatePath must be provided')
    }

    // Make puppeteer render the HTML from data buffer
    await page.setContent(renderedTemplate, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    });

    const pdfBuffer = await page.pdf({...options.pdfOptions});

    await browser.close();

    return pdfBuffer
};

export const generatePdfFromUrl = async (options: GeneratePdfOptionsFromUrl): Promise<Buffer> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(options.url, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });

    const pdfBuffer = await page.pdf({...options.pdfOptions});

    await browser.close();

    return pdfBuffer
};
