import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Api from "../../../GlobalSerice/api";
import { DataContextFilterProvider } from "../../../helpers/DataContextFilterConllectionsProvider";

import { Pagination } from "@mui/material";
import { IconReturn, ReturnButton } from "../../CollectionDetail/CollectionDetail.elements";
import StatusOrder from "../StatusOrder/StatusOrder";
import ListItensMyOrdersDetails from "./ListItensMyOrdersDetails";
import './MyOrdersDetail.css';

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface MyOrders {
    cod_produto: string,
    descricao_produto: string,
    line_id: number,
    moeda: string,
    order_number: number,
    preco_venda: number,
    quantidade_vendida: number,
    uom: string,
    tracking: number
}

const DetailMyOrder = () => {

    const { t } = useTranslation();
    const { id, data } = useParams();
    const [listDetail, setCurrentPosts] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(false);
    const [minStatus, setMinStatus] = useState<number>(1);
    let [totalPages, setTotalPages] = useState<any>();
    const [currentPage, setCurrentPage] = useState<any>(1);

    const serviceMyOrders = async () => {
        let url = "/dev/concierge-me/1.0/orders/order/" + id + (currentPage ? "?pagination=" + currentPage : '');
        //await serviceTotalPages("/dev/concierge-me/1.0/orders/order/"+ id + "/count");

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
                const itens: Array<MyOrders> = [];
                response.data.items.forEach((elem: any) => {
                    let paramElem = {
                        cod_produto: elem.cod_produto,
                        descricao_produto: elem.descricao_produto,
                        line_id: elem.line_id,
                        moeda: elem.moeda,
                        order_number: elem.order_number,
                        preco_venda: elem.preco_venda,
                        quantidade_vendida: elem.quantidade_vendida,
                        uom: elem.uom,
                        tracking: elem.tracking
                    }
                    itens.push(paramElem);
                });

                const currentPostsN = itens.slice(0, 15);


                setLoading(false);
                setCurrentPosts(currentPostsN);
                setMinStatus(Math.min(...itens.map(item => item.tracking)))
                totalPages = Math.ceil(response.data.count / 15);
                setTotalPages(Math.ceil(response.data.count / 15));

            })
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            if (id) {
                setLoading(false);
                await serviceMyOrders();
            }
        };
        fetchData();
    }, [currentPage]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <DataContextFilterProvider>
            <div className="section style-custom style-padding">
                <div className="row">
                    <div className="col-md-8">
                        <h4 className="style-font-myOrders">{t('meus_pedidos_20')}</h4>
                    </div>
                    <div className="col-md-4 style-myorders-detail-center-itens">
                        <a href="/concierge/myorders">
                        </a><Link to={"/myorders"} style={{ textDecoration: "none" }}>
                            <ReturnButton>
                                {t("return")}
                                <IconReturn />
                            </ReturnButton>
                        </Link>
                    </div>
                </div>
                <div className="row style-line">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="style-detailOrders1 style-upper-case-detail-order">{t('meus_pedidos_32')}</div>
                            <div className="style-detailOrders2">{id}</div>
                        </div>
                        <div className="row">
                            <div className="style-detailOrders1">{t('meus_pedidos_23')}</div>
                            <div className="style-detailOrders2">{data}</div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 style-myorders-detail-center-itens">
                        <button type="button" className="btn btn-outline-secondary style-myorders-detail-button" onClick={() => setStatus(!status)}>{t("meus_pedidos_21")}</button>
                    </div>
                </div>


                {
                    status === true ? <StatusOrder minStatus={minStatus} /> : ''
                }

                <ListItensMyOrdersDetails listItensMyOrdersDetails={listDetail} listTotal={totalPages * 10} id={id} />
            </div>
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
        </DataContextFilterProvider>

    );
};

export default DetailMyOrder;
