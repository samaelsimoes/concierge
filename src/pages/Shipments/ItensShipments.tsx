import Pagination from "@mui/material/Pagination";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../GlobalSerice/api";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import ListItensShipments from "../Shipments/PaginationShipment/ListItensShipment";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const ItensShipments = () => {
	const { filtro, DataFilters } = SetFilterData();

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<any>(1);
	const { keycloak } = useKeycloak();
	const [currentPosts, setCurrentPosts] = useState<any>();
	const [totalPages, setTotalPages] = useState<any>();

	let id_client = keycloak.tokenParsed?.["id_client"];

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
				if (response.data.items[0].total_faturas > 0) {
					//totalPages = Math.ceil(response.data.items[0].total_faturas / 10);
					setTotalPages(Math.ceil(response.data.items[0].total_faturas / 10));
				} else {
					setTotalPages(1);
				}
			})
	};

	const serviceShipment = async (urlParam: any) => {
		let url = "/dev/concierge-me/1.0/" + urlParam;
		setTotalPages("");

		await Api.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				"Access-Control-Allow-Origin": "true",
			},
		}).then((response) => {
			const itens: Array<Shipments> = [];
			response.data.items.forEach((elem: any) => {
				let paramElem = {
					booking: elem.booking || "",
					cruze_front: elem.cruze_front || "",
					data_embarque: elem.data_embarque || "",
					eta: elem.eta || "",
					fatura_ano: elem.fatura_ano,
					fatura_id: elem.fatura_id,
					fatura_numero: elem.fatura_numero,
					moeda_codigo: elem.moeda_codigo,
					peso_bruto_total: elem.peso_bruto_total,
					quantidade_container: elem.quantidade_container,
					quantidade_pallets: elem.quantidade_pallets,
					via_transporte: elem.via_transporte,
					vlme_total_faturado: elem.vlme_total_faturado,
					volume_faturado: elem.volume_faturado,
				};

				itens.push(paramElem);
			});

			const currentPostsN = itens.slice(0, 10);

			setLoading(false);
			setCurrentPosts(currentPostsN);
		})
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchData = async () => {
			setLoading(true);
			let url = "shipments/" + id_client;
			let urlCount = "";

			if (filtro && filtro.length > 0) {
				filtro.forEach((elem: any, index: any) => {
					if (elem.idCampo === "1SearchField") {
						serviceTotalPages(
							"/dev/concierge-me/1.0/shipments/" +
								id_client +
								"/search/count?search=" +
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
						serviceTotalPages(
							"/dev/concierge-me/1.0/shipments/" + id_client + "/count"
						);
						url += index == 0 ? "?" : "&";

						if (elem.id == "dt-embarque-new") {
							url += "sort=data_embarque_asc";
						}
						if (elem.id == "dt-embarque-old") {
							url += "sort=data_embarque_desc";
						}

						if (elem.id == "fatura_desc") {
							url += "sort=fatura_desc";
						}
						if (elem.id == "fatura_asc") {
							url += "sort=fatura_asc";
						}

						if (elem.id == "chegada-prevista-asc") {
							url += "sort=data_prevista_asc";
						}
						if (elem.id == "chegada-prevista-desc") {
							url += "sort=data_prevista_desc";
						}
					}
				});
				url += currentPage ? "&pagination=" + currentPage : "";
				await serviceShipment(url);
			} else {
				serviceTotalPages(
					"/dev/concierge-me/1.0/shipments/" + id_client + "/count"
				);

				url += currentPage ? "?pagination=" + currentPage : "";
				await serviceShipment(url);
			}
		};
		fetchData();
	}, [filtro, currentPage]);

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
				<ListItensShipments
					listItensShipment={currentPosts}
					loading={loading}
					listTotal={totalPages * 10}
				/>
			) : (
				<h3>{t("search_not_found")}</h3>
			)}
			
			<div style={{ display: "flex", justifyContent: "end" }}>
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
	);
};

export default ItensShipments;
