import { Tooltip } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import Moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../../../GlobalSerice/api";
import {
	IconBsClipboardCheck,
	IconBstruck,
	IconFcFactory,
	IconGiCancel
} from "../../MyOrdersFilter.elements";
import CsvWallet from "./CsvWallet";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const ListItensWalletMyOrdersDetails = ({
	listItensMyOrders,
	loading,
	listTotal,
}: any) => {
	const { t } = useTranslation();
	const { keycloak } = useKeycloak();
	const id_client = keycloak.tokenParsed?.["id_client"];
	const [columOrder, setOrderColumOrder] = useState<any>("fatura");
	const [order, setOrders] = useState(1);
	const [orderNumber, setorder_number] = useState(1);
	const [orderQtItens, setorderQtItens] = useState(1);
	const [orderVolumeComprado, setvolumeComprado] = useState(1);
	const [orderValorTotal, setOrderValorTotal] = useState(1);
	const [orderDate, setOrderDate] = useState(1);
	const [itemCheckbox, setCheckboxItem] = useState<any>(false);
	let [exportListTableWallet, setExportListTableWallet] = useState<any>([]);
	const data: any = [];
	const [loadingExport, setLoading] = useState(false);

	const serviceAllListExport = async () => {
		setLoading(true);
		let url =
			"/dev/concierge-me/1.0/" +
			"orders/wallet/" +
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
		})
			.then((response) => {
				const itens: any = [];
				response.data.items.forEach(async (elem: any) => {
					let paramElem = {
						tracking: await textTooltip(elem.tracking),
						order_number: elem.order_number,
						oc_cliente: elem.oc_cliente,
						request_date: elem.request_date,
						cod_produto: elem.cod_produto,
						descricao_produto: elem.descricao_produto,
						uom: elem.uom,
						quantidade_vendida: elem.quantidade_vendida,
						moeda: elem.moeda,
						preco_venda: elem.preco_venda,
						valor_total: elem.valor_total,
					};
					exportListTableWallet = paramElem;
					itens.push(paramElem);
				});
				setLoading(false);
				setExportListTableWallet(itens);
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

	const setItens = (fieldName: any) => {
		switch (fieldName) {
			case "order_number":
				setorder_number(-orderNumber);
				setOrders(-order);
				break;
			case "qtd_itens":
				setorderQtItens(-orderQtItens);
				setOrders(-order);
				break;
			case "volumecomprado":
				setvolumeComprado(-orderVolumeComprado);
				setOrders(-order);
				break;
			case "valor_total":
				setOrderValorTotal(-orderValorTotal);
				break;
			case "request_date":
				setOrderDate(-orderDate);
				setOrders(-order);
				break;
			default:
		}
	};

	const handleOrder = async (fieldName: any) => {
		await setItens(fieldName);
		await setOrderColumOrder(fieldName);
	};

	const listItens = listItensMyOrders.sort((a: any, b: any) => {
		return a[columOrder] < b[columOrder] ? -order : order;
	});

	if (loading) {
		return <h2>{t("untld_dreams_section_3")}</h2>;
	}

	const ajustCLick = () => {
		window.scrollTo(0, 0);
	};

	const allItensTable = async () => {
		const checkbox = document.getElementsByClassName("form-checked-wallet");
		if (itemCheckbox == false) {
			setExportListTableWallet("");
			statusCheckBox(checkbox, true);
			serviceAllListExport();
			setCheckboxItem(true);
		} else {
			setLoading(false);
			setCheckboxItem(false);
			statusCheckBox(checkbox, false);
			setExportListTableWallet("");
		}
	};

	const itensTable = (itemTable: any, index: any) => {
		setLoading(true);
		const checkbox = document.getElementById(
			itemTable.tracking + "wallet" + index
		) as HTMLInputElement;
		if (checkbox.checked == true) {
			const param = {
				tracking: textTooltip(itemTable.tracking),
				order_number: itemTable.order_number,
				oc_cliente: itemTable.oc_cliente,
				request_date: itemTable.request_date,
				cod_produto: itemTable.cod_produto,
				descricao_produto: itemTable.descricao_produto,
				uom: itemTable.uom,
				quantidade_vendida: itemTable.quantidade_vendida,
				moeda: itemTable.moeda,
				preco_venda: itemTable.preco_venda,
				valor_total: itemTable.valor_total,
			};

			setExportListTableWallet([...exportListTableWallet, param]);
			setLoading(false);
		} else {
			setLoading(false);
			const newList = exportListTableWallet.slice(1, index);
			setExportListTableWallet(newList);
		}
	};

	const setIcon = (e: number) => {
		let param;
		switch (e) {
			case 1:
				param = <IconFcFactory />;
				break;
			case 2:
				param = <IconFcFactory />;
				break;
			case 3:
				param = <IconBsClipboardCheck />;
				break;
			case 4:
				param = <IconBsClipboardCheck />;
				break;
			case 5:
				param = <IconBstruck />;
				break;
			case 6:
				param = <IconGiCancel />;
				break;
			default:
		}

		return param;
	};
	const textTooltip = (e: number) => {
		let param = "";

		switch (e) {
			case 1:
				param = t("meus_pedidos_41");
				break;
			case 2:
				param = t("meus_pedidos_41");
				break;
			case 3:
				param = t("meus_pedidos_42");
				break;
			case 4:
				param = t("meus_pedidos_42");
				break;
			case 5:
				param = t("meus_pedidos_43");
				break;
			case 6:
				param = t("meus_pedidos_45");
				break;
			case undefined:
				param = "";
				break;
			default:
		}
		return param;
	};

	return (
		<div className="style-table-padding table-responsive">
			<div className="row">
				<table className="table table-hover">
					<thead>
						<tr className="style-table-my-orders style-tr-myorders style-upper-case-myorders ">
							<th scope="col">
								<input
									className="form-check-input form-checked-wallet"
									type="checkbox"
									defaultChecked={itemCheckbox}
									id="defaultCheck1"
									onClick={() => allItensTable()}
								/>
							</th>
							<th scope="col style-fatura"> {t("meus_pedidos_24")} </th>
							<th scope="col style-fatura"> {t("meus_pedidos_32")} </th>
							<th scope="col"> {t("meus_pedidos_36")} </th>
							<th scope="col"> {t("meus_pedidos_6")} </th>
							<th scope="col"> {t("Iventario_3")} </th>
							<th scope="col"> {t("lista_favo_2")} </th>
							<th scope="col"> {t("meus_pedidos_27")} </th>
							<th scope="col"> {t("meus_pedidos_28")} </th>
							<th scope="col"> {t("meus_pedidos_29")} </th>
							<th scope="col"> {t("meus_pedidos_35")} </th>
							<th scope="col"> {t("meus_pedidos_31")} </th>
						</tr>
					</thead>
					<tbody>
						{listItens && listItens.length > 0
							? listItens?.map((itens: any, index: any) => {
									return (
										<tr
											key={index + "wallet"}
											className="style-table-my-orders"
										>
											<th scope="row">
												<input
													className="form-checked-wallet form-check-input"
													type="checkbox"
													id={itens.tracking + "wallet" + index}
													name={itens.tracking + "wallet" + index}
													onChange={() => itensTable(itens, index)}
												/>
											</th>
											<td className=" ">
												<Tooltip
													title={textTooltip(itens.tracking)}
													placement="right-start"
												>
													<div className="">{setIcon(itens.tracking)}</div>
												</Tooltip>
											</td>

											<td className="style-fatura">{itens.order_number}</td>
											<td className=" ">{itens.oc_cliente}</td>
											<td className=" ">
												{itens.request_date == ""
													? t("meus_embarques_16")
													: Moment(itens.request_date).format("DD-MM-YYYY")}
											</td>
											<td className=" ">{itens.cod_produto}</td>

											<td className="">{itens.descricao_produto}</td>
											<td className=" ">{itens.uom}</td>

											<td className="">{itens.quantidade_vendida}</td>

											<td className="">{itens.moeda}</td>
											<td className="">{itens.preco_venda}</td>
											<td className="">{itens.valor_total}</td>
										</tr>
									);
							  })
							: ""}
					</tbody>
				</table>
			</div>
			<div className="row">
				<div className="col" style={{ display: "flex", justifyContent: "end" }}>
					<CsvWallet list={exportListTableWallet} loading={loadingExport} />
				</div>
			</div>
		</div>
	);
};

export default ListItensWalletMyOrdersDetails;
