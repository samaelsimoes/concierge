import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../../GlobalSerice/api";
import DocumentMyOrdersDetail from "../../../ReactPDF/MyOrders.tsx/DocumentMyOrdersDetail";
import { IconBsBagCheck, IconBsClipboardCheck, IconBstruck, IconFcFactory, IconGiCancel } from "../MyOrdersFilter.elements";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const ListItensMyOrdersDetails = ({listItensMyOrdersDetails, listTotal, id}:any) => {

    const { t } = useTranslation();
    let [exportListTableDetail, setExportListTableDetail] = useState<any>([]);
    const [clickItens, setClickItens] = useState<any>([]);
    const [itemCheckbox, setCheckboxItem] = useState<boolean>(false);

    const serviceAllListExport = async () => {	
        const checkbox = (document.getElementById('defaultCheck1') as HTMLInputElement);

        if (checkbox.checked == true) {
            let url = "/dev/concierge-me/1.0/orders/order/"+ id + "?limit="+listTotal;

            await Api.get(url, {
                headers: {
                    access_token: localStorage.getItem(TOKEN_KEY)
                        ? "" + localStorage.getItem(TOKEN_KEY)
                        : "",
                    client_id: "2569d5b3-765c-4262-8037-979daca99782",
                    "Access-Control-Allow-Origin": "true",
                },
            }).then((response) => {
                const itens: Array<any> = [];
                response.data.items.forEach((elem: any) => {
                    let paramElem = {
                        cod_produto: elem.cod_produto,
                        descricao_produto: elem.descricao_produto,
                        line_id: elem.line_id,
                        moeda: elem.moeda,
                        order_number: elem.order_number,
                        preco_venda: elem.preco_venda,
                        quantidade_vendida: elem.quantidade_vendida,
                        uom: elem.uom
                };                
                    itens.push(paramElem);
                });		
                setExportListTableDetail(itens);
                exportListTableDetail=itens;	

            })
        }
	};

    const statusCheckBox = (listCheck: any, status: boolean) => {
        for (var i = 0; i < listCheck.length; i++) {
            if (listCheck[i].name) {
                const checkbox = (document.getElementById(listCheck[i].id) as HTMLInputElement);
                checkbox.checked = status;
            }
        }
    }

    const itensTable = (itemTable: any, index: any) => {
        const checkbox = (document.getElementById("ch" + itemTable.line_id) as HTMLInputElement);
        if (checkbox.checked == true) {
            setExportListTableDetail([...exportListTableDetail, itemTable] );
        } else {
            const newList = clickItens.slice(0, index);
            setExportListTableDetail(newList);
        }
    }

    const allItensTable = async () => {
        const checkbox = document.getElementsByClassName('form-check-input')

        if (itemCheckbox == false) {
            setCheckboxItem(true);
            statusCheckBox(checkbox, true);          
        } else {
            setCheckboxItem(false);
            statusCheckBox(checkbox, false);
            setExportListTableDetail('');
        }
    }

    const setIcon = (e:number) => {
        let param;
        switch (e) {
            case 1:
                param = <IconBsBagCheck />
                break;
            case 2:
              param = <IconFcFactory />
              break;
            case 3 || 4:
                param = <IconBsClipboardCheck />
                break;
            case 5:
                param = <IconBstruck />
                break;
              break;
            case 6:
                param = <IconGiCancel />
                break;
            default:
          }
          
          return param;
    }

    const textTooltip = (e:number) => {
        let param;
        
        switch (e) {
            case 1:
                param = t('meus_pedidos_40')
                break;
            case 2:
              param = t('meus_pedidos_41')
              break;
            case 3 || 4:
                param = t('meus_pedidos_42')
                break;
            case 5:
                param = t('meus_pedidos_43')
                break;
              break;
            case 6:
                param = t('meus_pedidos_45')
                break;
            default:
        }
        return param;
    }
    
    let trad6 = t('meus_pedidos_25');
    let trad7 = t('meus_pedidos_26');
    let trad8 = t('meus_pedidos_27');
    let trad9 = t('meus_pedidos_28');
    let trad10 = t('meus_pedidos_29');
    let trad11 = t('meus_pedidos_30');
    let trad12 = t('meus_pedidos_31');
    let trad13 = t('meus_pedidos_39');

    return (   
        <div className="style-table-padding table-responsive py-5">
            <div className="row"> 
                <table className="table table-hover">
                    <thead> 
                        <tr className="style-table-my-orders style-tr-myorders">
                            <th scope="col">  
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={() => allItensTable()}/>
                            </th>
                            <th scope="col style-fatura">{t('meus_pedidos_24')}</th>
                            <th scope="col">{t('meus_pedidos_25')}</th>
                            <th scope="col">{t('meus_pedidos_26')}</th>
                            <th scope="col">{t('meus_pedidos_27')}</th>
                            <th scope="col">{t('meus_pedidos_28')}</th> 
                            <th scope="col">{t('meus_pedidos_29')}</th>
                            <th scope="col">{t('meus_pedidos_30')}</th>                            
                            <th scope="col">{t('meus_pedidos_31')}</th>                            
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItensMyOrdersDetails && listItensMyOrdersDetails.length > 0 ? (
                            listItensMyOrdersDetails?.map((itens:any, index:any) => {
                                return(
                                    <tr key={index} className="style-table-my-orders">
                                        <th scope="row">                           
                                            <input className="form-check-input" type="checkbox" value={itens} id={"ch" + itens.line_id} name={"ch" +itens.line_id} onChange={() => itensTable(itens, index)}/>
                                        </th>
                                        <td className="">
                                            <Tooltip title={textTooltip(itens.tracking)} placement="right-start">
                                                <div className="">
                                                    {
                                                        setIcon(itens.tracking)
                                                        
                                                    }
                                                </div>
                                            </Tooltip>
                                        </td> 

                                        <td className="">{itens.cod_produto}</td>
                                        <td className="">{itens.descricao_produto}</td>
                                        <td className="">{itens.uom}</td>
                                        <td className="">{itens.quantidade_vendida}</td>

                                        <td className="">{itens.moeda}</td> 
                                        <td className="">{itens.preco_venda}</td>
                                        <td className="">{(itens.quantidade_vendida * itens.preco_venda).toFixed(2)}</td>                                        
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
            <div className="row">
                <div className="col" style={{ display: "flex", justifyContent: "end" }}>
                    <button type="button" className="style-button-export btn btn-outline-secondary"
                        onClick={
                            async () => { await serviceAllListExport();
                                DocumentMyOrdersDetail(
                                    exportListTableDetail,
                                    trad6,
                                    trad7,
                                    trad8,
                                    trad9,
                                    trad10,
                                    trad11,
                                    trad12,
                                    trad13                                       
                                );}
                        }> {t('meus_pedidos_9')} 
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ListItensMyOrdersDetails;