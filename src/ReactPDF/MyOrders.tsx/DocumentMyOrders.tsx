import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Moment from "moment";

function DocumentMyOrders(
	list: any,
	tradPedido1: any,
	tradPedido2: any,
	tradPedido3: any,
	tradPedido4: any,
	tradPedido5: any,
	tradPedido6: any,
	tradPedido7: any
) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;
	const reportTitle = [
		{
			text: tradPedido7,
			fontSize: 15,
			bold: true,
			margin: [15, 20, 0, 45], // left, top, right, bottom
		},
	];
	const dados = list?.map((elem: any) => {
		return [
			{ text: elem.order_number, fontSize: 9, margin: [0, 2, 0, 2] },
			{ text: elem.qtd_itens, fontSize: 9, margin: [0, 2, 0, 2] },
			{ text: elem.volumecomprado, fontSize: 9, margin: [0, 2, 0, 2] },
			{ text: "USD", fontSize: 9, margin: [0, 2, 0, 2] },
			{ text: elem.valor_total, fontSize: 9, margin: [0, 2, 0, 2] },
			{
				text:
					elem.request_date == ""
						? "-"
						: Moment(elem.request_date).format("DD-MM-YYYY"),
				fontSize: 9,
				margin: [0, 2, 0, 2],
			},
		];
	});

	const details = [
		{
			table: {
				headerRows: 1,
				widths: ["*", "*", "*", "*", "*", "*"],
				body: [
					[
						{ text: tradPedido1, style: "tableHeader", fontSize: 8 },
						{ text: tradPedido2, style: "tableHeader", fontSize: 8 },
						{ text: tradPedido3, style: "tableHeader", fontSize: 8 },
						{ text: tradPedido4, style: "tableHeader", fontSize: 8 },
						{ text: tradPedido5, style: "tableHeader", fontSize: 8 },
						{ text: tradPedido6, style: "tableHeader", fontSize: 8 },
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
		pageMargins: [15, 50, 15, 40],

		header: [reportTitle],
		content: [details],
		footer: Rodape,
	};

	pdfMake.createPdf(docDefinitios).open({}, window.open("", "_blank"));
	pdfMake.createPdf(docDefinitios).download();
}

export default DocumentMyOrders;
