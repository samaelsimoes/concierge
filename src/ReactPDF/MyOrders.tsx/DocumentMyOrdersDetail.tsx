

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Moment from 'moment'

function DocumentMyOrdersDetail(
    list:any, 
    trad6: any,
    trad7: any,
    trad8: any,
    trad9: any,
    trad10: any,
    trad11: any,
    trad12: any,
    trad13: any  
) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const reportTitle = [
        {
            text: trad13,
            fontSize: 15,
            bold: true,
            margin: [10, 20, 0, 45] // left, top, right, bottom
        }
    ];

    const dados = list?.map((elem:any) => {
        return [
            {text: elem.cod_produto, fontSize: 8, margin: [0, 1, 0, 1]},
            {text: elem.descricao_produto, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: elem.uom, fontSize: 8, margin: [0, 1, 0, 1]},
            {text: elem.quantidade_vendida, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: elem.moeda , fontSize: 8, margin: [0, 1, 0, 1]},
            {text: elem.preco_venda, fontSize: 8, margin: [0, 2, 0, 2]},
            {text: (elem.quantidade_vendida * elem.preco_venda).toFixed(2), fontSize: 8, margin: [0, 1, 0, 1]},    
        ] 
    });

    const details = [
        {
            table:{
                headerRows: 1,
                widths: ['*', 135, '*', '*', '*', '*', '*'],
                body: [
                    [
                        {text: trad6, style: 'tableHeader', fontSize: 8},
                        {text: trad7, style: 'tableHeader', fontSize: 8},
                        {text: trad8, style: 'tableHeader', fontSize: 8},
                        {text: trad9, style: 'tableHeader', fontSize: 8},
                        {text: trad10, style: 'tableHeader', fontSize: 8},
                        {text: trad11, style: 'tableHeader', fontSize: 8},
                        {text: trad12, style: 'tableHeader', fontSize: 8},
                    ],
                    ...dados
                ]
            },
            layout: 'headerLineOnly' // headerLineOnly
        }
    ];

    function Rodape(currentPage:any, pageCount:any){
        return [
            {
            text: currentPage + ' / ' + pageCount,
            alignment: 'right',
            fontSize: 9,
            margin: [0, 10, 20, 0] // left, top, right, bottom
            }
        ]
    }

    const docDefinitios:any = {
        pageSize: 'A4',
        pageMargins: [10, 50, 10, 40],

        header: [reportTitle],
        content: [details],
        footer: Rodape
    }

    pdfMake.createPdf(docDefinitios).open({}, window.open('', '_blank'));
    pdfMake.createPdf(docDefinitios).download();
}

export default DocumentMyOrdersDetail;