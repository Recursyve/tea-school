import * as TeaSchool from '../../src/index';
import * as pug from 'pug';
import * as path from 'path';
import {PDFOptions} from 'puppeteer';

(async () => {
    // Get relative path from cwd to the desired file
    const htmlTemplatePath = path.resolve(__dirname, 'basic-usage.pug');

    const htmlTemplateOptions: pug.LocalsObject = {
        name: 'Timothy',
    };

    const pdfOptions: PDFOptions = {
        // Output path will be relative.
        path: path.resolve(__dirname, 'output', 'basic-usage.pdf'),
        format: 'a4',
        printBackground: true
    };

    const teaSchoolOptions: TeaSchool.GeneratePdfOptions = {
        styleOptionsPath: path.resolve(__dirname, 'basic-usage.scss'),
        htmlTemplatePath,
        htmlTemplateOptions,
        pdfOptions
    };

    // We just wait for the pdf to generate, and then the program can exit
    await TeaSchool.generatePdf(teaSchoolOptions);
})();
