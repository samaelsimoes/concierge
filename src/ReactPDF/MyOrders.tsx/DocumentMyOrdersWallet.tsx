import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Moment from "moment";

function DocumentMyOrdersWallet(
	list: any,
	tradPedido1: any,
	tradPedido2: any,
	tradPedido3: any,
	tradPedido4: any,
	tradPedido5: any,
	tradPedido6: any,
	tradPedido7: any,
	tradPedido8: any,
	tradPedido9: any,
	tradPedido10: any,
	tradPedido11: any,
	tradPedido12: any
) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;
	const reportTitle = [
		{
			text: tradPedido7,
			fontSize: 15,
			bold: true,
			margin: [10, 20, 0, 45], // left, top, right, bottom
		},
	];

	const dados = list?.map((elem: any) => {
		return [
			{ text: elem.tracking, fontSize: 7, margin: [0, 1, 0, 1] },
			{ text: elem.order_number, fontSize: 7, margin: [0, 2, 0, 2] },
			{ text: elem.oc_cliente, fontSize: 7, margin: [0, 1, 0, 1] },
			{
				text:
					elem.request_date == ""
						? "-"
						: Moment(elem.request_date).format("DD-MM-YYYY"),
				fontSize: 9,
				margin: [0, 2, 0, 2],
			},
			{ text: elem.cod_produto, fontSize: 7, margin: [0, 1, 0, 1] },
			{ text: elem.descricao_produto, fontSize: 7, margin: [0, 2, 0, 2] },
			{ text: "m²", fontSize: 7, margin: [0, 1, 0, 1] },
			{ text: elem.quantidade_vendida, fontSize: 7, margin: [0, 2, 0, 2] },
			{ text: elem.moeda, fontSize: 7, margin: [0, 2, 0, 2] },
			{ text: elem.preco_venda, fontSize: 7, margin: [0, 2, 0, 2] },
			{ text: elem.valor_total, fontSize: 7, margin: [0, 2, 0, 2] },
		];
	});

	const details = [
		{
			table: {
				headerRows: 1,
				widths: [30, 50, 30, 55, 30, 50, 30, 35, 30, 30, 45],
				body: [
					[
						{ text: tradPedido1, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido2, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido3, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido4, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido5, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido6, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido7, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido8, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido9, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido10, style: "tableHeader", fontSize: 7 },
						{ text: tradPedido11, style: "tableHeader", fontSize: 7 },
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
		pageMargins: [10, 50, 10, 40],

		header: [reportTitle],
		content: [details],
		footer: Rodape,
	};

	pdfMake.createPdf(docDefinitios).open({}, window.open("", "_blank"));
	pdfMake.createPdf(docDefinitios).download();
}

export default DocumentMyOrdersWallet;
