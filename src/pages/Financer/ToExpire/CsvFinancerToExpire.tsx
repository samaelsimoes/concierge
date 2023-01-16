import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const CsvFinancerToExpire = ({list, loading}: any) => {
	const { t } = useTranslation();

    let tradPedido1 = t('acesso_financeiro_11');
    let tradPedido2 = t('acesso_financeiro_12');
    let tradPedido3 = t('acesso_financeiro_15');
    let tradPedido4 = t('acesso_financeiro_16');
    let tradPedido5 = t('acesso_financeiro_17');
    let tradPedido6 = t('acesso_financeiro_18');

	const header = [
		{ label: tradPedido1, key: "fatura" },
		{ label: tradPedido2, key: "metodo_pgto" },
		{ label: tradPedido3, key: "dt_embarque" },
		{ label: tradPedido4, key: "dt_vencimento" },
		{ label: tradPedido5, key: "qt_dia_pgto" },
        { label: tradPedido6, key: "vl_pago"},
        
	];

	if (loading) {
		return <h6> Export {t("untld_dreams_section_3")}</h6>;
	}

	return (
		<>
            <CSVLink
                data={list}
                headers={header}
                filename={"Financeiro A vencer.csv"}
                className="style-button-export-2 btn btn-outline-secondary"
            >
                Export
            </CSVLink>
        </>
	);
};

export default CsvFinancerToExpire;
