import * as TeaSchool from '../../src/index';
import * as pug from 'pug';
import * as path from 'path';
import {PDFOptions} from 'puppeteer';

(async () => {
    /********************************
     *      TEMPLATE FILE PATH      *
     ********************************/
        // Get relative path from cwd to the desired file
    const htmlTemplatePath = path.resolve(__dirname, 'invoice-pdf.template.pug');

    /********************************
     *        TEMPLATE OPTIONS      *
     ********************************/
    const htmlTemplateOptions: pug.LocalsObject = {
        invoice: {
            id: 2452,
            createdAt: '2018-10-12',
            customer: { name: 'International Bank of Blueprintya'},
            shipping: 10,
            total: 104.95,
            comments: 'Do not feed him fish',
            lines: [
                {
                    id: 1,
                    item: 'Best dry cleaner',
                    price: '52.43',
                },
                {
                    id: 2,
                    item: 'Not so good toaster',
                    price: '11.62',
                },
            ]
        },
    };

    /********************************
     *        PDF FILE OPTIONS      *
     ********************************/
    const pdfOptions: PDFOptions = {
        // Output path will be relative
        path: path.resolve(__dirname, 'output', 'invoice.pdf'),
        format: 'a4',
    };

    /********************************
     *      PUTTING IT TOGETHER     *
     ********************************/
    const teaSchoolOptions: TeaSchool.GeneratePdfOptions = {
        styleOptionsPath: path.resolve(__dirname, 'invoice-pdf.scss'),
        htmlTemplatePath,
        htmlTemplateOptions,
        pdfOptions,
    };

    /**************************************************************
     *      GENERATED PDF AS A BUFFER AND ALSO SAVED TO A FILE    *
     **************************************************************/
    const pdfFile = await TeaSchool.generatePdf(teaSchoolOptions);
})();
