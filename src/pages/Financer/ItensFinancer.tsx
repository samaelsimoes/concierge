import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../GlobalSerice/api";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import '../Export/Export.css';
import ListItensFinancerExpired from "./Expired/ListItensFinancerExpired";
import ListItensFinancerPaid from "./Paid/ListItensFinancerPaid";
import ListItensFinancerToExpire from "./ToExpire/ListItensFinancerToExpire";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface Financer {
	client_id: string,
	dias_a_vencer: string,
	dt_embarque: string,
	dt_vencimento: string,
	fatura: string,
	metodo_pgto: string,
	moeda: string,
	vl_titulo: string
}

interface FinancerExpired {
	client_id: string,
	condicao_pgto: string,
	dias_vencidos: number,
	dt_embarque: string,
	dt_vencimento: string,
	fatura: string,
	moeda: string,
	vl_titulo: number,
}

interface FinancerPaid {
	client_id: string,
	condicao_pgto: string,
	dt_embarque: string,
	dt_pagamento: string,
	dt_vencimento: string,
	fatura: string,
	qt_dia_pgto:  number,
	vl_pago: number,
}

const ItensFinancer = ({id, item}:any) => {
	const { filtro, DataFilters } = SetFilterData();
	const [valTotalUSD, setValTotalUSD] = useState<any>(0);
	const [valTotalBRL, setValTotalBR] = useState<any>(0);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<any>(1);
	const [currentPosts, setCurrentPosts] = useState<any>();
	const [totalPages, setTotalPages] = useState<any>();
	const [pagSearchFilter, setSearchFilter] = useState(false);
	const [itemOld, setItemOld] = useState('');
	const [openComponent, setOpenComponent] = useState<any>(false);

	const getItensFinancer = () => {
		if (openComponent) {
			let paramItem;
			switch (item) {
				case 'toexpire':
					if (currentPosts.length > 0 ) { 
						paramItem = <ListItensFinancerToExpire valorUSD={valTotalUSD} valorBRL={valTotalBRL} listItensFinancer={currentPosts} loading={loading} listTotal={totalPages*15} key={'1Financer'}/>;
					} else {
						paramItem = <h3>{t("search_not_found")}</h3>
					}					
					break;
				case 'expired':
					if (currentPosts.length > 0 ) { 
						paramItem = <ListItensFinancerExpired valorUSD={valTotalUSD} valorBRL={valTotalBRL} listItensFinancer={currentPosts} loading={loading} listTotal={totalPages*15} key={'3Financer'}/>;
					} else {
						paramItem = <h3>{t("search_not_found")}</h3>
					}
					break;
				case 'paid':
					if (currentPosts.length > 0 ) { 
						paramItem = <ListItensFinancerPaid valorUSD={valTotalUSD} valorBRL={valTotalBRL} listItensFinancer={currentPosts} loading={loading} listTotal={totalPages*15} key={'2Financer'}/>; 				
					} else {
						paramItem = <h3>{t("search_not_found")}</h3>
					}
					break;
				default:				
			}
			return paramItem;
		}
	}

	const serviceTotalPages = async (urlParam: any) => {
		let url = urlParam ;

		await Api.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				"Access-Control-Allow-Origin": "true",
			},
		}).then((response) => {
			const qtItem = item == 'order' || !item ? 15 : 20; 
			setTotalPages(Math.ceil(response.data.items[0].total_itens / qtItem));
		})

	};

	const serviceFinancer = async (urlParam: any) => {
		
		let url = "/dev/concierge-me/1.0/" + urlParam;
		let itensList:any;

		await Api.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				"Access-Control-Allow-Origin": "true",
			},
		}).then(async (response) => {
			let somValueTotUSD = 0;
			let somValueTotBRL = 0;
			const itensToExpired: Array<Financer> = [];
			const itensExpired: Array<FinancerExpired> = [];
			const itensPaid: Array<FinancerPaid> = [];

			response.data.items.forEach((elem: any) => {
				if (item == 'toexpire') {
					let paramToExpired = {
						client_id: elem.client_id,
						dias_a_vencer: elem.dias_a_vencer,
						dt_embarque: elem.dt_embarque,
						dt_vencimento: elem.dt_vencimento,
						fatura: elem.fatura,
						metodo_pgto: elem.metodo_pgto,
						moeda: elem.moeda,
						vl_titulo: elem.vl_titulo
					}
					if (elem.moeda == 'USD') {
						somValueTotUSD = somValueTotUSD + elem.vl_titulo;
					} else if (elem.moeda == 'BRL') {
						somValueTotBRL = somValueTotBRL + elem.vl_titulo;
					}
					itensToExpired.push(paramToExpired);
				} else if (item == "expired") {
					let paramExpired = {
						client_id: elem.client_id,
						condicao_pgto: elem.condicao_pgto,
						dias_vencidos: elem.dias_vencidos,    
						dt_embarque: elem.dt_embarque,
						dt_vencimento: elem.dt_vencimento,
						fatura: elem.fatura,
						moeda: elem.moeda,
						vl_titulo: elem.vl_titulo
					}
					if (elem.moeda == 'USD') {
						somValueTotUSD = somValueTotUSD + elem.vl_titulo;
					} else if (elem.moeda == 'BRL') {
						somValueTotBRL = somValueTotBRL + elem.vl_titulo;
					}
					itensExpired.push(paramExpired);
				} else if (item == "paid") {
					let paramPaid = {
						client_id: elem.client_id,
						condicao_pgto: elem.condicao_pgto,
						dt_embarque: elem.dt_embarque,
						dt_pagamento: elem.dt_pagamento,
						dt_vencimento: elem.dt_vencimento,
						fatura: elem.fatura,
						qt_dia_pgto: elem.qt_dia_pgto,
						vl_pago: elem.vl_pago						
					}
					if (elem.moeda == 'USD') {
						somValueTotUSD = somValueTotUSD + elem.vl_titulo;
					} else if (elem.moeda == 'BRL') {
						somValueTotBRL = somValueTotBRL + elem.vl_titulo;
					}
					itensPaid.push(paramPaid);
				}		
			});

			setValTotalUSD(somValueTotUSD);
			setValTotalBR(somValueTotBRL);

			if (item == 'toexpire') {
				itensList = itensToExpired;
			} else if (item == "expired") {
				itensList = itensExpired;
			} else if (item == "paid") {
				itensList = itensPaid
			}		

			setLoading(false);
			setCurrentPosts(itensList);		
			setOpenComponent(true);
		})
	};

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchData = async () => {
			setLoading(true);
			setItemOld(item);
	
			if (item != itemOld) {
				setCurrentPage(1)
			}
	
			let url = "";
			let urlCount = "";

			switch (item) {
			  case 'toexpire':
				url = 'financial/' + id + "/toexpire"
				break;
			  case 'expired':
				url = 'financial/' + id + "/expired"
				break;
			  case 'paid':
				url = 'financial/' + id + "/paid"
				break;
			  default:				
			}
			if (url) {
				if (filtro && filtro.length > 0 && id) {
					filtro.forEach((elem: any, index: any) => {
						if (elem.idCampo === "1SearchField") {
							serviceTotalPages("/dev/concierge-me/1.0/" + url +'/count'+ "?search=" + elem.id);
							url += "?search=" + elem.id;				
							setCurrentPage(1);								
						}else if(elem.idCampo == "vencidos" || elem.idCampo == "ate") {
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
							let urlFilter = "/dev/concierge-me/1.0/" + url + '/count'
							//"/dev/concierge-me/1.0/" + url + '/count' + (index == 0 ? "?" : "&");
							//serviceTotalPages(urlFilter);
							serviceTotalPages(urlFilter);
							url += index == 0 ? "?" : "&";
							switch (elem.idCampo) {

								case 'dt-vencimento-maior':
									url += "orderby=dt_vencimento&orderdir=desc";
									break;	
								case 'dt-vencimento-menor':
									url += "orderby=dt_vencimento&orderdir=asc";
									break;		

								case 'dt-pagamento-maior':
									url += "orderby=dt_pagamento&orderdir=desc";
									break;	
								case 'dt-pagamento-menor':
									url += "orderby=dt_pagamento&orderdir=asc";
									break;			

								case 'dt-valor-total-maior' :									
									if(item == 'paid') {
										url += "orderby=vl_pago&orderdir=desc";									
									} else {
										url += "orderby=vl_titulo&orderdir=desc";	
									}										
									break;
								case 'dt-valor-total-menor':	
									if(item == 'paid') {
										url += "orderby=vl_pago&orderdir=asc";									
									} else {
										url += "orderby=vl_titulo&orderdir=asc";									
									}							
									break;	
								case 'dt-fatura':
									url += "orderby=fatura";
									break;
								
								case 'dt-embarque-maior':
									url += "orderby=dt_embarque&orderdir=desc";
									break;
								case 'dt-embarque-menor':
									url += "orderby=dt_embarque&orderdir=asc";
									break;			
									
								case 'fatura-maior':
									url += "orderby=fatura&orderdir=desc";
									break;
								case 'fatura-menor':
									url += "orderby=fatura&orderdir=asc";
									break;		
									
								case 'nenhum-item': 
									url += "";
									break;
								default:									
							}
						}
						
					});

					url += currentPage ? "&pagination=" + currentPage : "";
					setSearchFilter(false);
					await serviceFinancer(url);
					
				} else if (id) {
					serviceTotalPages("/dev/concierge-me/1.0/" + url + '/count');	
	
					url += currentPage ? "?pagination=" + currentPage : "";
					await serviceFinancer(url);
				}
			}		};
		fetchData();

	}, [filtro, currentPage]);

	const { t } = useTranslation();
	if (loading) {
		return <h2>{t('untld_dreams_section_3')}</h2>;
	}

	return (
		<div> 		
			{getItensFinancer()}
			
			<div className="row" > 
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

export default ItensFinancer;
