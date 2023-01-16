import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const CsvShipments = ({list, loading}: any) => {
	const { t } = useTranslation();

	let trad6 = t("meus_embarques_6");
	let trad7 = t("meus_embarques_7");
	let trad8 = t("meus_embarques_8");
	let trad9 = t("meus_embarques_9");
	let trad10 = t("meus_embarques_10");
	let trad11 = t("meus_embarques_11");
	let trad12 = t("meus_embarques_12");
	let trad13 = t("meus_embarques_13");
	let trad14 = t("meus_embarques_14");

	const header = [
		{ label: trad6, key: "invoice" },
		{ label: trad14, key: "booking" },
		{ label: trad7, key: "shipmentDate" },
		{ label: trad8, key: "eta" },
		{ label: trad9, key: "qtyContainer" },
		{ label: trad10, key: "qtyPallet" },
		{ label: trad11, key: "grossWeight" },
		{ label: trad12, key: "currency" },
		{ label: trad13, key: "totalAmout" }
	];

	if (loading) {
		return <h6> Export {t("untld_dreams_section_3")}</h6>;
	}

	return (
		<>
            <CSVLink
                data={list}
                headers={header}
                filename={"shipment.csv"}
                className="style-button-export-2 btn btn-outline-secondary"
            >
                Export
            </CSVLink>
        </>
	);
};

export default CsvShipments;
