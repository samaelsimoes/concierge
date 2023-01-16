import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../GlobalSerice/api";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import "../Export/Export.css";
import ListItensWalletMyOrdersDetails from "./Wallet/Detail/ListItensWalletMyOrdersDetails";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface MyOrders {
	account_number: string;
	order_number: number;
	qtd_itens: number;
	request_date: string;
	valor_total: number;
	volumecomprado: number;
}
interface MyOrdersWallet {
	tracking: any;
	order_number: any;
	oc_cliente: any;
	request_date: any;
	cod_produto: any;
	descricao_produto: any;
	uom: string;
	quantidade_vendida: any;
	moeda: any;
	preco_venda: any;
	valor_total: any;
}

const ItensMyOrders = ({ id, item }: any) => {
	const { filtro, DataFilters } = SetFilterData();

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentPosts, setCurrentPosts] = useState<any>();
	const [totalPages, setTotalPages] = useState<any>();
	const [pagSearchFilter, setSearchFilter] = useState(false);
	let [totalItens, setTotalItens] = useState<any>();

	const [itemOld, setItemOld] = useState("");

	const serviceTotalPages = async (urlParam: any) => {
		let url = urlParam;

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
				const qtItem = item == "order" || !item ? 15 : 20;
				setTotalPages(Math.ceil(response.data.items[0].total_itens / qtItem));
			})
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchData = async () => {

			setLoading(true);
			setItemOld(item);
			setCurrentPosts(null);
			if (item != itemOld && currentPage != 1) {
				setCurrentPage(1);
			} else {
				let url = item == "order" || !item ? "orders/" + id : "orders/wallet/" + id;
				let urlCount = "";

				if (filtro && filtro.length > 0 && id) {
					filtro.forEach((elem: any, index: any) => {
						if (elem.idCampo === "1SearchField") {
							serviceTotalPages(
								"/dev/concierge-me/1.0/" +
									url +
									"/search/count" +
									"?search=" +
									elem.id
							);
							url += "/search?search=" + elem.id;
							setCurrentPage(1);
						} else if(elem.idCampo == "vencidos" || elem.idCampo == "ate") {
							if (index == 0) {
								urlCount = url + "/count?"
							}
							url += index == 0 ? "?" : "&";

							switch (elem.idCampo) {
								case "vencidos":
									url += "initialdate=" + elem.id;
									urlCount += "initialdate=" + elem.id
									break;
								case "ate":
									url += "finaldate="+ elem.id;
									urlCount += "&finaldate="+ elem.id
									break;								
								default:									
							}
							if (index == 1) {
								serviceTotalPages("/dev/concierge-me/1.0/" + urlCount);	
							}
						} else {
							serviceTotalPages("/dev/concierge-me/1.0/" + url + "/count");

							url += index == 0 ? "?" : "&";

							switch (elem.idCampo) {
								case "Dt-embarque-new":
									url += "orderdir=asc";
									break;
								case "Dt-embarque-old":
									url += "orderdir=desc";
									break;
								case "Dt-pedido-recente-maior":
									url += "orderby=request_date&orderdir=desc";
									break;
								case "Dt-pedido-recente-menor":
									url += "orderby=request_date&orderdir=asc";
									break;
								case "Dt-pedido-maior":
									url += "orderby=qtd_itens&orderdir=desc";
									break;
								case "Dt-pedido-menor":
									url += "orderby=qtd_itens&orderdir=asc";
									break;
								case "Dt-quantidade-itens-maior":
									url += "orderby=volume&orderdir=desc";
									break;
								case "Dt-quantidade-itens-menor":
									url += "orderby=volume&orderdir=asc";
									break;
								case "Dt-valor-total-maior":
									url += "orderby=valor_total&orderdir=desc";
									break;
								case "Dt-valor-total-menor":
									url += "orderby=valor_total&orderdir=asc";
									break;
								case "nenhum-item":
									url += "";
									break;
								default:
							}
						}
					});

					url += currentPage ? "&pagination=" + currentPage : "";
					setSearchFilter(false);
					await serviceMyOrders(url);
				} else if (id) {
					serviceTotalPages("/dev/concierge-me/1.0/" + url + "/count");

					url += currentPage ? "?pagination=" + currentPage : "";
					await serviceMyOrders(url);
				}
			}
		};
		fetchData();
	}, [filtro, currentPage]);

	const serviceMyOrders = async (urlParam: any) => {
		let url = "/dev/concierge-me/1.0/" + urlParam;
		await Api.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				"Access-Control-Allow-Origin": "true",
			},
		}).then((response) => {
			const itens: Array<MyOrders> = [];
			const itensWallet: Array<MyOrdersWallet> = [];

			response.data.items.forEach((elem: any) => {
				if (item == "wallet") {
					if (elem.uom == "m2") {
						elem.uom = "m²";
					}
					let paramWallet = {
						tracking: elem.tracking,
						order_number: elem.order_number,
						oc_cliente: elem.oc_cliente,
						request_date: elem.request_date,
						cod_produto: elem.cod_produto,
						descricao_produto: elem.descricao_produto,
						uom: elem.uom,
						quantidade_vendida: elem.quantidade_vendida,
						moeda: elem.moeda,
						preco_venda: elem.preco_venda,
						valor_total: (elem.valor_total).toFixed(2),
						line_id: elem.line_id,
					};

					itensWallet.push(paramWallet);
				} else {
					let paramElem = {
						account_number: elem.account_number,
						order_number: elem.order_number,
						qtd_itens: elem.qtd_itens,
						request_date: elem.request_date,
						valor_total: (elem.valor_total).toFixed(2),
						volumecomprado: elem.volumecomprado,
						line_id: elem.line_id,
					};
					itens.push(paramElem);
				}
			});

			totalItens = item == "wallet" ? itensWallet : itens;
			setTotalItens(totalItens);
			const currentPostsN =
				item == "wallet" ? itensWallet.slice(0, 20) : itens.slice(0, 20);
			setLoading(false);
			setCurrentPosts(currentPostsN);
		})
	};

	const { t } = useTranslation();
	if (loading) {
		return <h2>{t("untld_dreams_section_3")}</h2>;
	}

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	return (
		<div>
			{currentPosts.length > 0 ? (
				<ListItensWalletMyOrdersDetails
					listItensMyOrders={currentPosts}
					loading={loading}
					listTotal={totalPages * 20}
					key={"2wallet"}
				/>
			) : (
				<h3>{t("search_not_found")}</h3>
			)}
				
			<div className="row">
				<div className="col" style={{ display: "flex", justifyContent: "end" }}>
					<Pagination
						defaultPage={1}
						count={totalPages}
						showFirstButton
						showLastButton
						page={currentPage}
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default ItensMyOrders;
