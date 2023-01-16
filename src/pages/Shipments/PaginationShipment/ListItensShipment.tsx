import { useKeycloak } from "@react-keycloak/web";
import Moment from "moment";
import { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AiOutlineDownload, AiOutlinePlusCircle } from "react-icons/ai";
import FormButton from "../../../components/FormButton";
import Api from "../../../GlobalSerice/api";
import CsvShipments from "./CsvShipments";
import "./Modal.css";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const ListItensShipment = ({ listItensShipment, loading, listTotal }: any) => {
	const [showDocument, setShow] = useState(false);
	const [showDocumentInfos, setShowInfos] = useState(false);
	const [title, setTitleDownload] = useState();
	const [allIdsDocuments, setAllIdsDocuments] = useState();
	const [allNameDocuments, setAllNameDocuments] = useState<string[]>([]);
	const [itensModalDocuments, setItensModalDocuments] = useState<any>();
	const [itensModalInvoice, setItensModalInvoice] = useState<any>();
	const { t } = useTranslation();
	const [columOrder, setOrderColumOrder] = useState<any>("fatura");

	const [order, setOrders] = useState(1);
	const [orderFatura, setorder_fatura] = useState(1);
	const [orderBooking, setorder_booking] = useState(1);
	const [orderData_embarque, setorder_data_embarque] = useState(1);
	const [orderEta, setorder_eta] = useState(1);
	const [orderQuantidade_container, setorder_quantidade_container] =
		useState(1);
	const [orderQuantidade_pallets, setorder_quantidade_pallets] = useState(1);
	const [orderPeso_bruto_total, setorder_peso_bruto_total] = useState(1);
	const [orderMoeda_codigo, setorder_moeda_codigo] = useState(1);
	const [orderVlme_total_faturado, setorder_vlme_total_faturado] = useState(1);
	const [listExcell, setListExcell] = useState<any>([]);
	const [loadingExport, setLoading] = useState(false);

	const [itemCheckbox, setCheckboxItem] = useState<boolean>(false);
	const { keycloak } = useKeycloak();
	let id_client = keycloak.tokenParsed?.["id_client"];

	interface Documents {
		codigo_documento: any;
		documento_anexo_id: any;
		tipo_documento_descricao: any;
	}

	interface Invoice {
		agente_de_carga: any;
		awb_cliente: any;
		booking: any;
		chegada_prevista: any;
		chegada_real: any;
		embarque_id: any;
		embarque_previsto: any;
		embarque_real: any;
		fatura_id: any;
		forma_pagamento: any;
		incoterm: any;
		invoice: any;
		modal_emissao: any;
		navio: any;
		porto_destino: any;
	}

	interface Shipments {
		booking: string | number;
		cruze_front: string | number;
		data_embarque: string | number;
		eta: string | number;
		fatura_ano: string | number;
		fatura_id: string | number;
		fatura_numero: string | number;
		moeda_codigo: string | number;
		peso_bruto_total: string | number;
		quantidade_container: string | number;
		quantidade_pallets: string | number;
		via_transporte: string | number;
		vlme_total_faturado: string | number;
		volume_faturado: string | number;
	}

	interface Excel {
		invoice: string,
		booking: string,
		shipmentDate: string,
		eta: string,
		qtyContainer: string,
		qtyPallet: string,
		grossWeight: string,
		currency: string,
		totalAmout: string
	}

	const serviceAllListExport = async () => {
		setLoading(true);
		let url =
			"/dev/concierge-me/1.0/" +
			"shipments/" +
			id_client +
			"?limit=" +
			listTotal;

		await Api.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				"Access-Control-Allow-Origin": "true",
			},
		}).then((response) => {
			const itens: Array<Excel> = [];
			response.data.items.forEach((elem: any) => {
				let paramElem = {
					invoice: elem.fatura_numero + "/" + elem.fatura_ano,
					booking: elem.booking || "-",
					shipmentDate:  elem.data_embarque ? Moment(elem.data_embarque).format("DD-MMM-YYYY") : '-',
					eta: elem.eta ? elem.eta : '-', 
					qtyContainer: elem.quantidade_container,
					qtyPallet: elem.quantidade_pallets,
					grossWeight: elem.peso_bruto_total,
					currency: elem.moeda_codigo,
					totalAmout: elem.vlme_total_faturado
				};
				itens.push(paramElem);
			});
			setLoading(false);
			setListExcell(itens);
		})
	};

	const statusCheckBox = (listCheck: any, status: boolean) => {
		for (var i = 0; i < listCheck.length; i++) {
			if (listCheck[i].name) {
				const checkbox = document.getElementById(
					listCheck[i].id
				) as HTMLInputElement;
				checkbox.checked = status;
			}
		}
	};

	const itensTable = (itemTable: any, index: any) => {
		setLoading(true);

		const checkbox = document.getElementById(
			itemTable.fatura_numero + "/" + itemTable.fatura_ano
		) as HTMLInputElement;
		if (checkbox.checked == true) {
			const param = {
				invoice: itemTable.fatura_numero + "/" + itemTable.fatura_ano,
				booking: itemTable.booking || "-",
				shipmentDate:  itemTable.data_embarque ? Moment(itemTable.data_embarque).format("DD-MMM-YYYY") : '-',
				eta: itemTable.eta ? itemTable.eta : '-', 
				qtyContainer: itemTable.quantidade_container,
				qtyPallet: itemTable.quantidade_pallets,
				grossWeight: itemTable.peso_bruto_total,
				currency: itemTable.moeda_codigo,
				totalAmout: itemTable.vlme_total_faturado
			};
			setLoading(false);
			setListExcell([...listExcell, param]);
		} else {	
			setLoading(false);
			const newList = listExcell.slice(1,index);
			setListExcell(newList);
		}
	};

	const allItensTable = async (itens: any) => {
		const checkbox = document.getElementsByClassName("form-check-input");

		if (itemCheckbox == false) {
			setListExcell("");
			statusCheckBox(checkbox, true);
			serviceAllListExport();
			setCheckboxItem(true);
		} else {
			setLoading(false);
			statusCheckBox(checkbox, false);
			setCheckboxItem(false);
			setListExcell("");
		}
	};

	const setItens = (fieldName: any) => {
		switch (fieldName) {
			case "fatura_numero":
				setorder_fatura(-orderFatura);
				setOrders(-order);
				break;
			case "booking":
				setorder_booking(-orderBooking);
				setOrders(-order);
				break;
			case "data_embarque":
				setorder_data_embarque(-orderData_embarque);
				setOrders(-order);
				break;
			case "eta":
				setorder_eta(-orderEta);
				break;
			case "quantidade_container":
				setorder_quantidade_container(-orderQuantidade_container);
				setOrders(-order);
				break;
			case "quantidade_pallets":
				setorder_quantidade_pallets(-orderQuantidade_pallets);
				setOrders(-order);
				break;
			case "peso_bruto_total":
				setorder_peso_bruto_total(-orderPeso_bruto_total);
				setOrders(-order);
				break;
			case "moeda_codigo":
				setorder_moeda_codigo(-orderMoeda_codigo);
				setOrders(-order);
				break;
			case "vlme_total_faturado":
				setorder_vlme_total_faturado(-orderVlme_total_faturado);
				setOrders(-order);
				break;
			default:
		}
	};

	const handleOrder = async (fieldName: any) => {
		await setItens(fieldName);
		await setOrderColumOrder(fieldName);
	};

	const listItens = listItensShipment.sort((a: any, b: any) => {
		return a[columOrder] < b[columOrder] ? -order : order;
	});

	const handleCloseDownload = () => {
		setShow(false);
	};
	const handleShowDownload = (id: any, item: any) => {
		serviceDownloadInvoice(id);
		setTitleDownload(item);
	};
	const handleCloseInvoice = () => {
		setShowInfos(false);
	};

	const handleShowInvoice = async (id: any, item: any) => {
		let url = "/dev/concierge-me/1.0/shipments/invoice/" + id;
		let count: number = 0;
		const itens: Array<Invoice> = [];

		await Api.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				"Access-Control-Allow-Origin": "true",
			},
		})
			.then((response) => {
				response.data.items.forEach((elem: any) => {
					let paramElem = {
						agente_de_carga: elem.agente_de_carga || "-",
						awb_cliente: elem.awb_cliente || "-",
						booking: elem.booking || "-",
						chegada_prevista: elem.chegada_prevista || "-",
						chegada_real: elem.chegada_real || "",
						embarque_id: elem.embarque_id || "",
						embarque_previsto: elem.embarque_previsto || "",
						embarque_real: elem.embarque_real || "",
						fatura_id: elem.fatura_id || "-",
						forma_pagamento: elem.forma_pagamento || "-",
						incoterm: elem.incoterm || "-",
						invoice: elem.invoice || "-",
						modal_emissao: elem.modal_emissao || "-",
						navio: elem.navio || "-",
						porto_destino: elem.porto_destino || "-",
					};
					itens.push(paramElem);
				});
				setItensModalInvoice(itens);
			})

		setShowInfos(true);
		setTitleDownload(item);
	};

	if (loading) {
		return <h2>{t("untld_dreams_section_3")}</h2>;
	}

	const downloadAllDocuments = async (
		nameDocuments: string[],
		idDocument: any
	) => {
		for (let i = 0; i < idDocument.length; i++) {
			downloadDocument(nameDocuments[i], idDocument[i]);
		}
	};

	const downloadDocument = async (nameDocument: string, idDocument: any) => {
		let url = "/dev/concierge-me/1.0/shipments/invoice/download/" + idDocument;

		await Api.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				"Access-Control-Allow-Origin": "true",
			},
			responseType: "blob",
		})
			.then((response) => {
				const blob = new Blob([response.data], { type: "application/pdf" });
				const link = document.createElement("a");
				link.href = URL.createObjectURL(blob);
				link.download = nameDocument + "-" + idDocument + ".pdf";
				link.click();
			})
	};

	const serviceDownloadInvoice = async (id: any) => {
		let url = "/dev/concierge-me/1.0/shipments/invoice/documents/" + id;
		let count: number = 0;

		await Api.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				"Access-Control-Allow-Origin": "true",
			},
		})
			.then((response) => {
				const itens: Array<Documents> = [];
				const allIdsDocuments: any = [];
				const allNamesDocuments: string[] = [];
				response.data.items.forEach((elem: any) => {
					let paramElem = {
						codigo_documento: elem.codigo_documento,
						documento_anexo_id: elem.documento_anexo_id,
						tipo_documento_descricao: elem.tipo_documento_descricao,
					};
					itens.push(paramElem);
					allNamesDocuments.push(elem.tipo_documento_descricao);
					allIdsDocuments.push(elem.documento_anexo_id);
				});
				setItensModalDocuments(itens);
				setAllNameDocuments(allNamesDocuments);
				setAllIdsDocuments(allIdsDocuments);
				setShow(true);
			})
	};

	return (
		<div>
			<Fragment>
				<Modal
					show={showDocumentInfos}
					onHide={handleCloseInvoice}
					backdrop="static"
					keyboard={true}
					style={{
						position: "absolute" as "absolute",
					}}
					className="style.modal.shipments"
				>
					<Modal.Header closeButton>
						<Modal.Title>
							<h4 className="style-title-shipments-modal">
								{t("meus_embarques_3")}{" "}
							</h4>
						</Modal.Title>
					</Modal.Header>

					<Modal.Body className="style-shipments-modal-border">
						<div>
							<h4 className="title-num-shipments"> {title} </h4>
						</div>
						<div className="row">
							<div className="col border-col-bottom style-title-download">
								<h6>{t("detalhe_produto_1")}</h6>
							</div>
						</div>
						<div>
							{itensModalInvoice && itensModalInvoice.length ? (
								itensModalInvoice.map((item: any, index: any) => {
									return (
										<div
											key={index}
											className="style-text-colum-left style-text-colum-right"
										>
											<div className="row rowTwo">
												<div className="col-sm-5">
													<h2> {t("embar_modal_1")} </h2>
												</div>
												<div className="col-sm">
													<h1> {item.porto_destino} </h1>
												</div>
											</div>
											<div className="row rowTwo">
												<div className="col-sm-5">
													<h2> {t("embar_modal_2")} </h2>
												</div>
												<div className="col-sm">
													<h1> {item.incoterm} </h1>
												</div>
											</div>
											<div className="row rowTwo">
												<div className="col-sm-5">
													<h2> {t("embar_modal_3")} </h2>
												</div>
												<div className="col-sm">
													<h1> {item.forma_pagamento} </h1>
												</div>
											</div>
											<div className="row rowTwo">
												<div className="col-sm-5">
													<h2> {t("embar_modal_4")} </h2>
												</div>
												<div className="col-sm">
													<h1> {item.booking} </h1>
												</div>
											</div>
											<div className="row rowTwo">
												<div className="col-sm-5">
													<h2> {t("embar_modal_5")} </h2>
												</div>
												<div className="col-sm">
													<h1>
														{" "}
														{item.embarque_previsto &&
														item.embarque_previsto != "-"
															? Moment(item.embarque_previsto).format(
																	"DD-MMM-YYYY"
															  )
															: "-"}{" "}
													</h1>
												</div>
											</div>
											<div className="row rowTwo">
												<div className="col-sm-5">
													<h2> {t("embar_modal_6")} </h2>
												</div>
												<div className="col-sm">
													<h1>
														{" "}
														{item.chegada_prevista &&
														item.chegada_prevista != "-"
															? Moment(item.chegada_prevista).format(
																	"DD-MMM-YYYY"
															  )
															: "-"}{" "}
													</h1>
												</div>
											</div>
											<div className="row rowTwo">
												<div className="col-sm-5">
													<h2> {t("embar_modal_7")} </h2>
												</div>
												<div className="col-sm">
													<h1> {item.invoice} </h1>
												</div>
											</div>
											<div className="row rowTwo">
												<div className="col-sm-5">
													<h2> {t("embar_modal_8")} </h2>
												</div>
												<div className="col-sm">
													<h1> {item.modal_emissao} </h1>
												</div>
											</div>
											<div className="row rowTwo">
												<div className="col-sm-5">
													<h2> {t("embar_modal_9")} </h2>
												</div>
												<div className="col-sm">
													<h1>{t("embar_modal_11")}</h1>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-5">
													<h2> {t("embar_modal_10")} </h2>
												</div>
												<div className="col-sm">
													<h1> {item.navio} </h1>
												</div>
											</div>
										</div>
									);
								})
							) : (
								<h4> {t("embar_modal_12")} </h4>
							)}
						</div>
					</Modal.Body>
					<Modal.Footer></Modal.Footer>
				</Modal>

				<Modal
					show={showDocument}
					onHide={handleCloseDownload}
					backdrop="static"
					keyboard={true}
					style={{
						position: "absolute" as "absolute",
					}}
				>
					<Modal.Header closeButton className="style-title-download">
						<h4>Downloads</h4>
					</Modal.Header>
					<Modal.Body>
						<div className="row rowTwo">
							<div className="col border-col-bottom style-title-shipment">
								<h4>FATURA {title}</h4>
							</div>
						</div>

						<div className="row style-row-padding">
							{(() => {
								if (itensModalDocuments && itensModalDocuments.length > 0) {
									return (
										<div>
											{itensModalDocuments.map((item: any, index: any) => {
												return (
													<div className="row rowTwo" key={index}>
														<div className="col-md-8">
															{item.tipo_documento_descricao}
														</div>
														<div className="col-md-2">
															<AiOutlineDownload
																className="style-icon"
																onClick={() =>
																	downloadDocument(
																		item.tipo_documento_descricao,
																		item.documento_anexo_id
																	)
																}
															/>
														</div>
														<div className="col-md-2"></div>
													</div>
												);
											})}
										</div>
									);
								} else {
									return (
										<div>
											<h4> Nenhum item encontrado ... </h4>
										</div>
									);
								}
							})()}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className="row">
							<div className="style-bottom-shipments">
								<FormButton
									type="button"
									className="btn btn-light"
									onClick={() =>
										downloadAllDocuments(allNameDocuments, allIdsDocuments)
									}
								>
									{" "}
									{t("embar_modal_14")}{" "}
								</FormButton>
							</div>
						</div>
					</Modal.Footer>
				</Modal>
			</Fragment>
			<div className="style-table-padding table-responsive">
				<div className="row">
					<table className="table table-striped table-hover">
						<thead>
							<tr className="style-tdth-shipments">
								<th scope="col">
									<input
										className="form-check-input"
										type="checkbox"
										value=""
										id="defaultCheck1"
										onClick={() => allItensTable(listItens)}
									/>
								</th>

								<th scope="col style-fatura">{t("meus_embarques_6")} </th>
								<th scope="col"> {t("meus_embarques_14")} </th>
								<th scope="col"> {t("meus_embarques_7")} </th>
								<th scope="col"> {t("meus_embarques_8")} </th>
								<th scope="col"> {t("meus_embarques_9")} </th>
								<th scope="col"> {t("meus_embarques_10")} </th>
								<th scope="col"> {t("meus_embarques_11")} </th>
								<th scope="col"> {t("meus_embarques_12")} </th>
								<th scope="col"> {t("meus_embarques_13")} </th>
								<th className="style-border"></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{listItens && listItens.length > 0
								? listItens?.map((itens: any, index: any) => {
										return (
											<tr key={index} className="style-tdth-shipments">
												<th scope="row">
													<input
														className="form-check-input"
														type="checkbox"
														value={itens}
														id={itens.fatura_numero + "/" + itens.fatura_ano}
														name={itens.fatura_numero + "/" + itens.fatura_ano}
														onClick={() => itensTable(itens, index)}
													/>
												</th>
												<td className="style-fatura">
													{itens.fatura_numero + "/" + itens.fatura_ano}{" "}
												</td>
												<td className=" ">{itens.booking}</td>
												<td className="">
													{itens.data_embarque == ""
														? "-"
														: Moment(itens.data_embarque).format("DD-MMM-YYYY")}
												</td>
												<td className="">
													{itens.eta == ""
														? itens.cruze_front == ""
															? "-"
															: Moment(itens.cruze_front).format("DD-MMM-YYYY")
														: Moment(itens.eta).format("DD-MMM-YYYY")}
												</td>
												<td className="">{itens.quantidade_container}</td>
												<td className="">{itens.quantidade_pallets}</td>
												<td className="">{itens.peso_bruto_total}</td>
												<td className="">{itens.moeda_codigo}</td>
												<td className="">{itens.vlme_total_faturado}</td>
												<td className="icons-style">
													<AiOutlineDownload
														onClick={() =>
															handleShowDownload(
																itens.fatura_id,
																"" +
																	itens.fatura_numero +
																	"/" +
																	itens.fatura_ano +
																	""
															)
														}
														style={{ fontSize: "25px" }}
													/>
												</td>
												<td className="icons-style">
													<AiOutlinePlusCircle
														onClick={() =>
															handleShowInvoice(
																itens.fatura_id,
																"" +
																	itens.fatura_numero +
																	"/" +
																	itens.fatura_ano +
																	""
															)
														}
														style={{ fontSize: "25px" }}
													/>
												</td>
											</tr>
										);
								  })
								: ""}
						</tbody>
					</table>
				</div>
				<div className="row">
					<div
						className="col"
						style={{ display: "flex", justifyContent: "end" }}
					>	
						<CsvShipments list={listExcell} loading={loadingExport} />					
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListItensShipment;
