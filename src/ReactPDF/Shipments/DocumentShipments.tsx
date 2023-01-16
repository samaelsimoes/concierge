import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Moment from "moment";

function DocumentShipments(
	list: any,
	trad6: any,
	trad7: any,
	trad8: any,
	trad9: any,
	trad10: any,
	trad11: any,
	trad12: any,
	trad13: any,
	trad14: any,
	trad15: any
) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;
	const reportTitle = [
		{
			text: trad15,
			fontSize: 15,
			bold: true,
			margin: [15, 20, 0, 45], // left, top, right, bottom
		},
	];

	const dados = list.map((elem: any) => {
		return [
			{
				text: elem.fatura_numero + "/" + elem.fatura_ano,
				fontSize: 9,
				margin: [0, 1, 0, 1],
			},
			{ text: elem.booking, fontSize: 8, margin: [0, 1, 0, 1] },
			{
				text:
					elem.data_embarque == ""
						? "-"
						: Moment(elem.data_embarque).format("DD-MMM-YYYY"),
				fontSize: 9,
				margin: [0, 1, 0, 1],
			},
			{
				text: elem.eta == "" ? "-" : Moment(elem.eta).format("DD-MMM-YYYY"),
				fontSize: 9,
				margin: [0, 1, 0, 1],
			},
			{ text: elem.quantidade_container, fontSize: 9, margin: [0, 1, 0, 1] },
			{ text: elem.quantidade_pallets, fontSize: 9, margin: [0, 1, 0, 1] },
			{ text: elem.peso_bruto_total, fontSize: 9, margin: [0, 1, 0, 1] },
			{ text: elem.moeda_codigo, fontSize: 9, margin: [0, 1, 0, 1] },
			{ text: elem.vlme_total_faturado, fontSize: 9, margin: [0, 1, 0, 1] },
		];
	});

	const details = [
		{
			table: {
				headerRows: 1,
				widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
				body: [
					[
						{ text: trad6, style: "tableHeader", fontSize: 8 },
						{ text: trad14, style: "tableHeader", fontSize: 8 },
						{ text: trad7, style: "tableHeader", fontSize: 8 },
						{ text: trad8, style: "tableHeader", fontSize: 8 },
						{ text: trad9, style: "tableHeader", fontSize: 8 },
						{ text: trad10, style: "tableHeader", fontSize: 8 },
						{ text: trad11, style: "tableHeader", fontSize: 8 },
						{ text: trad12, style: "tableHeader", fontSize: 8 },
						{ text: trad13, style: "tableHeader", fontSize: 8 },
					],
					...dados,
				],
			},
			layout: "headerLineOnly", // headerLineOnly
		},
	];

	function Rodape(currentPage: any, pageCount: any) {
		return [
			{
				text: currentPage + " / " + pageCount,
				alignment: "right",
				fontSize: 9,
				margin: [0, 10, 20, 0], // left, top, right, bottom
			},
		];
	}

	const docDefinitios: any = {
		pageSize: "A4",
		pageMargins: [10, 40, 10, 30],
		header: [reportTitle],
		content: [details],
		footer: Rodape,
	};

	pdfMake.createPdf(docDefinitios).open({}, window.open("", "_blank"));
	pdfMake.createPdf(docDefinitios).download();
}

export default DocumentShipments;
