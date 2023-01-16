import { useKeycloak } from "@react-keycloak/web";
import CsvFinancerPaid from "./CsvFinancerPaid";
import Moment from 'moment';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../../GlobalSerice/api";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const ListItensFinancerPaid = ({valorUSD, valTotalBRL, listItensFinancer, loading, listTotal}:any) => {

    const { t } = useTranslation();
    const [columOrder, setOrderColumOrder] = useState<any>('fatura');   
    const { keycloak } = useKeycloak();
    const [order, setOrders] = useState(1);
    const [ orderNumber, setorder_number ] = useState(1);
    const [ orderQtItens, setorderQtItens ] = useState(1);
    const [ orderVolumeComprado, setvolumeComprado ] = useState(1);
    const [ orderValorTotal, setOrderValorTotal ] = useState(1);
    const [ orderDate, setOrderDate ] = useState(1);
    const [ exportListTable, setExportListTable ] = useState<any>([]);
    const id_client = keycloak.tokenParsed?.["id_client"];
    const [ itemCheckbox, setCheckboxItem ] = useState<boolean>(false);
    const [loadingExport, setLoading] = useState(false);

    const itensTable = (itemTable:any,index:any) => {     
        setLoading(true);   
        const checkbox = (document.getElementById(itemTable.fatura) as HTMLInputElement);   
        if (checkbox.checked == true) {
            const param = {
                fatura: itemTable.fatura,
                condicao_pgto: itemTable.condicao_pgto,
                dt_embarque: Moment (itemTable.dt_embarque).format('DD-MM-YYYY'),
                dt_vencimento: itemTable.dt_vencimento,
                client_id: itemTable.client_id,
                dt_pagamento: Moment (itemTable.dt_pagamento).format('DD-MM-YYYY'),
                qt_dia_pgto: itemTable.qt_dia_pgto,
                vl_pago: itemTable.vl_pago
			};

            setExportListTable([...exportListTable, param] );
            setLoading(false);
        } else {
            setLoading(false);
            const newList = exportListTable.slice(1,index);
			setExportListTable(newList);
        }
    }

    const statusCheckBox = (listCheck:any, status:boolean) => {
        for(var i =0; i < listCheck.length; i++) {
            if (listCheck[i].name) {
                const checkbox = (document.getElementById(listCheck[i].id) as HTMLInputElement);    
                checkbox.checked = status;
            }
        }
    }

    const serviceAllListExport = async () => {
        setLoading(true);
        let url = "/dev/concierge-me/1.0/" + "financial/" + id_client+ "/paid?limit=" + listTotal;
        await Api.get(url, {
            headers: {
                access_token: localStorage.getItem(TOKEN_KEY)
                    ? "" + localStorage.getItem(TOKEN_KEY)
                    : "",
                client_id: "2569d5b3-765c-4262-8037-979daca99782",
                "Access-Control-Allow-Origin": "true",
            },
        }).then((response) => {
            const itens: any = [];
            response.data.items.forEach((elem: any) => {
                let paramElem = {
                    fatura: elem.fatura,
                    condicao_pgto: elem.condicao_pgto,
                    dt_embarque: Moment(elem.dt_embarque).format('d-MM-YYYY'),
                    dt_vencimento: Moment(elem.dt_vencimento).format('d-MM-YYYY'),
                    client_id: elem.client_id,
                    dt_pagamento: Moment(elem.dt_pagamento).format('d-MM-YYYY'),
                    qt_dia_pgto: elem.qt_dia_pgto,
                    vl_pago: elem.vl_pago
                };
                itens.push(paramElem);
            });
            setLoading(false);
            setExportListTable(itens);
        })
        .catch((error: any) => {
            console.log("error " + error);
        });
    }

    const allItensTable = async() => {
        const checkbox = document.getElementsByClassName('form-check-input')

        if (itemCheckbox == false) {
            setExportListTable("")   
            statusCheckBox(checkbox, true);
            serviceAllListExport();
			setCheckboxItem(true);

        } else {
            setLoading(false);
            setCheckboxItem(false);
            statusCheckBox(checkbox, false);
            setExportListTable("");
        }
    }
    const setItens = (fieldName:any) => {
        switch (fieldName) {
            case 'order_number':
                setorder_number(-orderNumber);
                setOrders(-order);
                break;
            case 'qtd_itens':
                setorderQtItens(-orderQtItens);
                setOrders(-order);
                break;
            case 'volumecomprado':
                setvolumeComprado(-orderVolumeComprado);
                setOrders(-order);
                break;
            case 'valor_total':
                setOrderValorTotal(-orderValorTotal);
                break; 
            case 'request_date':
                setOrderDate(-orderDate);
                setOrders(-order);
                break;  
            default:            
        }
    }

    const handleOrder = async (fieldName:any) => {
        await setItens(fieldName);
        await setOrderColumOrder(fieldName);
    }

    /*const listItens = listItensFinancer.sort( (a:any, b:any) => {
        return a[columOrder] < b[columOrder] ? -order : order;
    });*/

    if (loading) {
        return <h2>{t('untld_dreams_section_3')}</h2>
    }

    const ajustCLick = () => {
        window.scrollTo(0, 0);
    };

    return (   
        <div className="style-table-padding table-responsive">
            <div className="row">  
                <table className="table table-hover">
                    <thead>
                        <tr className="style-table-my-orders style-tr-myorders">
                            <th scope="col">
                                <input className="form-check-input" type="checkbox" defaultChecked={itemCheckbox} id="defaultCheck1" onClick={() => allItensTable()}/>
                            </th>                                                                                                
                            <th scope="col style-fatura" >{t('acesso_financeiro_11')} </th>
                            <th scope="col" > {t('acesso_financeiro_12')} </th>                        
                            <th scope="col" > {t('acesso_financeiro_15')} </th>
                            <th scope="col" > {t('acesso_financeiro_19')} </th> 
                            <th scope="col"> {t('acesso_financeiro_18')} </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItensFinancer && listItensFinancer.length > 0 ? (
                            listItensFinancer?.map((itens:any, index:any) => {
                                return(
                                    <tr className="style-table-my-orders" key={index}>
                                        <th scope="row">                            
                                            <input className="form-check-input" type="checkbox" id={itens.fatura} name={itens.fatura} onClick={() => itensTable(itens, index)}/>
                                        </th>
                                        <td className="style-fatura">{itens.fatura}</td>
                                        <td className="">{itens.condicao_pgto}</td> 
                                        <td>{Moment(itens.dt_embarque).format('DD-MM-YYYY')}</td>
                                        <td>{Moment(itens.dt_pagamento).format('DD-MM-YYYY')}</td>
                                        <td className="">{ itens.vl_pago}</td>                                       
                                    </tr>                                        
                                )               
                                }          
                            )
                            ) : (
                        ""
                        )}
                    </tbody> 
                </table>   
            </div>
           
            <div className="row" >
				<div className="col" style={{ display: "flex", justifyContent: "end" }}>
                    <CsvFinancerPaid list={exportListTable} loading={loadingExport} />
                </div> 
			</div>
        </div>
    );
}

export default ListItensFinancerPaid;