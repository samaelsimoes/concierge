import { useKeycloak } from "@react-keycloak/web";
import Moment from 'moment';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import Api from "../../../GlobalSerice/api";
import DocumentMyOrders from "../../../ReactPDF/MyOrders.tsx/DocumentMyOrders";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const ListItensMyOrders = ({listItensMyOrders, loading, listTotal}:any) => {

    const { t } = useTranslation();

    const [columOrder, setOrderColumOrder] = useState<any>('fatura');   
    const { keycloak } = useKeycloak();

    const [order, setOrders] = useState(1);
    const [ orderNumber, setorder_number ] = useState(1);
    const [ orderQtItens, setorderQtItens ] = useState(1);
    const [ orderVolumeComprado, setvolumeComprado ] = useState(1);
    const [ orderValorTotal, setOrderValorTotal ] = useState(1);
    const [ orderDate, setOrderDate ] = useState(1);
    let [ exportListTable, setExportListTable ] = useState<any>([]);
    const [ clickItens, setClickItens ] = useState<any>([]);
    let id_client = keycloak.tokenParsed?.["id_client"];

    const [ itemCheckbox, setCheckboxItem ] = useState<boolean>(false);
    
    const itensTable = (itemTable:any,index:any) => {        
        const checkbox = (document.getElementById(itemTable.order_number) as HTMLInputElement);   
        if (checkbox.checked == true) {
            clickItens.push(itemTable);
            setExportListTable(clickItens);
        } else {
            const newList = clickItens.slice(0,index);
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
        setExportListTable('');
        let url = "/dev/concierge-me/1.0/" + "orders/" + id_client+ "?limit=" + listTotal;

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
                    account_number: elem.account_number,
                    order_number: elem.order_number,
                    qtd_itens: elem.qtd_itens,
                    request_date: elem.request_date,
                    valor_total: elem.valor_total,
                    volumecomprado: elem.volumecomprado
                };              
                itens.push(paramElem);
            });			
            exportListTable = itens;
            setExportListTable(itens);
        }) 
	}

    const allItensTable = async() => {
        const checkbox = document.getElementsByClassName('form-check-input')

        if (itemCheckbox == false) {
            setCheckboxItem(true);
            statusCheckBox(checkbox, true); 
            await serviceAllListExport();        
         
        } else {
            setCheckboxItem(false);
            statusCheckBox(checkbox, false);
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

    const listItens = listItensMyOrders.sort( (a:any, b:any) => {
        return a[columOrder] < b[columOrder] ? -order : order;
    });

    if (loading) {
        return <h2>{t('untld_dreams_section_3')}</h2>
    }

    const ajustCLick = () => {
        window.scrollTo(0, 0);
    };

    let tradPedido1 = t('meus_pedidos_1');
    let tradPedido2 = t('meus_pedidos_2');
    let tradPedido3 = t('meus_pedidos_3');
    let tradPedido4 = t('meus_pedidos_4');
    let tradPedido5 = t('meus_pedidos_5');
    let tradPedido6 = t('meus_pedidos_6');
    let tradPedido7 = t('Acesso_section8');

    return (   
        <div className="style-table-padding table-responsive">
            <div className="row"> 
                <table className="table table-hover">
                    <thead>
                        <tr className="style-table-my-orders style-tr-myorders">
                            <th scope="col">
                                <input className="form-check-input" type="checkbox" defaultChecked={itemCheckbox} id="defaultCheck1" onClick={() => allItensTable()}/>
                            </th>
                                                                                                
                            <th scope="col style-fatura" >{t('meus_pedidos_1')} </th>
                            <th scope="col" > {t('meus_pedidos_6')} </th>                            

                            <th scope="col"> {t('meus_pedidos_2')} </th>
                            <th scope="col"> {t('meus_pedidos_3')} </th>
                            <th scope="col" > {t('meus_pedidos_4')} </th>
                            <th scope="col" > {t('meus_pedidos_5')} </th> 
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItens && listItens.length > 0 ? (
                            listItens?.map((itens:any, index:any) => {
                                return(
                                    <tr className="style-table-my-orders" key={index}>
                                        <th scope="row">                            
                                            <input className="form-check-input" type="checkbox" id={itens.order_number} name={itens.order_number} onClick={() => itensTable(itens, index)}/>
                                        </th>
                                        <td className="style-fatura">{itens.order_number}</td>
                                        <td className="">{itens.request_date == "" ? t("meus_embarques_16") : Moment (itens.request_date).format('d-MM-YYYY')}</td> 

                                        <td className=" ">{itens.qtd_itens}</td>
                                        <td className=" ">{itens.volumecomprado}</td>

                                        <td className="">USD</td>
                                        <td className=" ">{itens.valor_total}</td>

                                        <td className="">{itens.quantidade_container}</td>
                                        <td className="icons-style"> 
                                            <Link to={"/myordersdetail/" + itens.order_number+"/"+Moment (itens.request_date).format('d-MMM-YYYY')} style={{ textDecoration: "none" }} onClick={ajustCLick}>
                                                <AiOutlinePlus />
                                            </Link>
                                        </td>
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
                    <button type="button" className="style-button-export btn btn-outline-secondary" 
                        onClick={
                            () => DocumentMyOrders(
                                exportListTable,
                                tradPedido1,
                                tradPedido2,
                                tradPedido3,
                                tradPedido4,
                                tradPedido5,
                                tradPedido6,
                                tradPedido7
                                )
                        }> {t('meus_pedidos_9')} 
                    </button>
                </div> 
			</div>
        </div>
    );
}

export default ListItensMyOrders;