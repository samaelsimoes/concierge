import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const CsvWallet = ({list, loading}: any) => {
	const { t } = useTranslation();

	let tradPedido1 = t("meus_pedidos_24");
	let tradPedido2 = t("meus_pedidos_32");
	let tradPedido3 = t("meus_pedidos_36");
	let tradPedido4 = t("meus_pedidos_6");
	let tradPedido5 = t("Iventario_3");
	let tradPedido6 = t("lista_favo_2");
	let tradPedido7 = t("meus_pedidos_27");
	let tradPedido8 = t("meus_pedidos_28");
	let tradPedido9 = t("meus_pedidos_29");
	let tradPedido10 = t("meus_pedidos_35");
	let tradPedido11 = t("meus_pedidos_31");
	let tradPedido12 = t("Acesso_section8");

	const header = [
		{ label: tradPedido1, key: "tracking" },
		{ label: tradPedido2, key: "order_number" },
		{ label: tradPedido3, key: "oc_cliente" },
		{ label: tradPedido4, key: "request_date" },
		{ label: tradPedido5, key: "cod_produto" },
		{ label: tradPedido6, key: "descricao_produto" },
		{ label: tradPedido7, key: "uom" },
		{ label: tradPedido8, key: "quantidade_vendida" },
		{ label: tradPedido9, key: "moeda" },
		{ label: tradPedido10, key: "preco_venda" },
		{ label: tradPedido11, key: "valor_total" },
	];

	if (loading) {
		return <h6> Export {t("untld_dreams_section_3")}</h6>;
	}

	return (
		<>
            <CSVLink
                data={list}
                headers={header}
                filename={"carteira-de-pedidos.csv"}
                className="style-button-export-2 btn btn-outline-secondary"
            >
                Export
            </CSVLink>
        </>
	);
};

export default CsvWallet;
