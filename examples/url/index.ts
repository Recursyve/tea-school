import * as TeaSchool from '../../src/index';
import * as pug from 'pug';
import * as path from 'path';
import {PDFOptions} from 'puppeteer';

(async () => {
    /********************************
     *        PDF FILE OPTIONS      *
     ********************************/
    const pdfOptions: PDFOptions = {
        // Output path will be relative
        path: path.resolve(__dirname, 'output', 'quote.pdf'),
        format: 'a4',
        printBackground: true
    };

    /********************************
     *      PUTTING IT TOGETHER     *
     ********************************/
    const teaSchoolOptions: TeaSchool.GeneratePdfOptionsFromUrl = {
        url: "http://localhost:3000",
        pdfOptions,
    };

    /**************************************************************
     *      GENERATED PDF AS A BUFFER AND ALSO SAVED TO A FILE    *
     **************************************************************/
    const pdfFile = await TeaSchool.generatePdfFromUrl(teaSchoolOptions);
})();
