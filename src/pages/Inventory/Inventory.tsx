import { FC, useEffect, useState } from "react";
import { H1, PageContainer } from "../../globalStyles";
import { DataContextFilterProvider } from "../../helpers/DataContextFilterConllectionsProvider";
import Inspiration from "./Inspiration";
import {
	ColumnContainer, MainImageBanner
} from "./Inventory.elements";

import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import ApiAdm from "../Admin/ApiAdm/ApiAdm";
import "./Inventory.css";
import IventoryFilter from "./InventoryFilter";
import ThumbResultsIventory from "./ThumbResultsIventory";
import { versionReact } from "../../components/Version/Version";
ReactGA.initialize("G-MKKE7GMP9Q");
ReactGA.pageview(window.location.pathname + window.location.search);

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface ItensBanner {
	active: string;
	createdAt: string;
	id: string;
	image: string;
	name: string;
	page: string;
}

const Inventory: FC = () => {

	const { t } = useTranslation()

	const [listItensBannerSuperior, setCurrentPostsBannerSup] = useState<any>();
	const [listItensBannerInferior, setCurrentPostsInferior] = useState<any>();

	const serviceAdm = async () => {
		let url = "/banner/findbypage/inventory";
		await ApiAdm.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				Authorization:
					"Basic MjU2OWQ1YjMtNzY1Yy00MjYyLTgwMzctOTc5ZGFjYTk5NzgyOjMyZjc1NDhkLTg4M2EtNGUyNi04ZTkyLThhYThlOGM2ZTQzZQ",
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				const itensBannerSuperior: Array<ItensBanner> = [];
				const itensBannerInferior: Array<ItensBanner> = [];

				response.data.forEach((elem: any) => {
					let paramElem = {
						active: elem.active,
						createdAt: elem.createdAt,
						id: elem.id,
						image: elem.filename,
						name: elem.name,
						page: elem.page,
					};

					if (elem.id.includes("banner_superior")) {
						itensBannerSuperior.push(paramElem);
					} else if (elem.id.includes("banner_inferior")) {
						itensBannerInferior.push(paramElem);
					}
				});

				const currentPostBannerSuperior = itensBannerSuperior.slice(0, 10);
				const currentPostBannerInferior = itensBannerInferior.slice(0, 10);
				setCurrentPostsBannerSup(currentPostBannerSuperior);
				setCurrentPostsInferior(currentPostBannerInferior);
			})
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchData = async () => {
			await serviceAdm();
		};
		fetchData();
	}, []);

  return (
    <DataContextFilterProvider>
      <PageContainer>      
          <ColumnContainer> 
            <H1 style={{ padding: "2rem 0 1rem 3rem" }}> {t('modal_estoque_4')} </H1>
            {listItensBannerSuperior?.map((item:any, index:number) => {
                return (            
                  <MainImageBanner key={index}
                    className="d-block"
                    alt={item.id}
                    src={`https://portobello.com.br/concierge/images/${item.image}` + '?v='+ versionReact()}            
                  />                    
                );
              })}
          </ColumnContainer>
          <div className="style-container style-with-row" >
            <div className="row">
              <div className="col-md-4">
                <IventoryFilter />
              </div>
              <div className="col-md-8">
                <ThumbResultsIventory />
              </div>
            </div>
          </div>
          <Inspiration bannerInf={listItensBannerInferior}/>
      </PageContainer>
    </DataContextFilterProvider>
  );
};

export default Inventory;
