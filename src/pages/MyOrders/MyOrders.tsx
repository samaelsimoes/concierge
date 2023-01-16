import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { H4 } from "../../globalStyles";
import { DataContextFilterProvider } from "../../helpers/DataContextFilterConllectionsProvider";
import ItensMyOrders from "./ItensMyOrders";
import "./MyOrders.css";
import MyOrdersFilter from "./MyOrdersFilter";
import { useKeycloak } from "@react-keycloak/web";

const MyOrders: FC = () => {
	const { t } = useTranslation();
	const { keycloak } = useKeycloak();

	const [checkeStatus1, setCheckedStatus1] = useState(true);
	const [checkeStatus2, setCheckedStatus2] = useState(false);
	const [statusFinal, setStatusFinal] = useState("wallet");

	let id_client = keycloak.tokenParsed?.["id_client"];

	const statusButton = async (inf: string) => {
		if (inf == "order") {
			await setCheckedStatus1(true);
			await setCheckedStatus2(false);
			await setStatusFinal("order");
		} else {
			await setCheckedStatus2(true);
			await setCheckedStatus1(false);
			await setStatusFinal("wallet");
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchData = async () => {
			if (!checkeStatus1) {
				setCheckedStatus1(true);
				setCheckedStatus2(false);
				statusButton("order");
			} else if (!checkeStatus2) {
				setCheckedStatus1(false);
				setCheckedStatus2(true);
				statusButton("wallet");
			}
		};
		fetchData();
	}, []);

	return (
		<DataContextFilterProvider>
			<div className="section style-custom style-padding">
				<div className="row">
					<div className="col">
						<H4>{t("Acesso_section8")}</H4>
					</div>
				</div>

				<div className="row style-button-myorders">
					<div className="col-md-12">
						<h3
							onClick={(event) => statusButton("wallet")}
							className="style-h3-my-orders"
						>
							{t("meus_pedidos_34")}
						</h3>
					</div>
				</div>

				<div className="row style-line">
					<div className="col-sm-12">
						<div className="row style-padding-filter-myorders">
							<MyOrdersFilter item={statusFinal} />
						</div>
						<div className="row">
							{id_client ? (
								<ItensMyOrders id={id_client} item={statusFinal} />
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</DataContextFilterProvider>
	);
};

export default MyOrders;
