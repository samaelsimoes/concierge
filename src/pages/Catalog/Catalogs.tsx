import { FC, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { DataContextFilterProvider } from "../../helpers/DataContextFilterConllectionsProvider";
import ApiAdm from "../Admin/ApiAdm/ApiAdm";
import './Catalogs.css';
import CatalogFilter from "./CatalogsFilter";
import ItensCatalog from "./ItensCatalogs";
import { versionReact } from "../../components/Version/Version";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const Catalogs:FC = () => {  
  const { t } = useTranslation();  
  
  const [listItensBannerSuperior, setCurrentPostsBannerSup] = useState<any>();
  const [listItensBannerInferior, setCurrentPostsInferior] = useState<any>();

  interface ItensBanner {
    active: string,
    createdAt: string,
    id: string,
    image: string,
    name: string,
    page: string
  }

  const serviceAdm = async () => {
    let url = '/banner/findbypage/catalog';
    await ApiAdm.get(url, {
      headers: { 
        access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        Authorization: 'Basic MjU2OWQ1YjMtNzY1Yy00MjYyLTgwMzctOTc5ZGFjYTk5NzgyOjMyZjc1NDhkLTg4M2EtNGUyNi04ZTkyLThhYThlOGM2ZTQzZQ', 
        'Content-Type': 'application/json' 
      } 
    }).then(response => {
      const itensBannerSuperior: Array<ItensBanner> = [];
      const itensBannerInferior: Array<ItensBanner> = [];

      response.data.forEach((elem: any) => {        
        let paramElem = {
          active: elem.active,
          createdAt: elem.createdAt,
          id: elem.id,
          image: elem.filename,
          name: elem.name,
          page: elem.page
        };

        if (elem.id.includes('banner_superior')) {
          itensBannerSuperior.push(paramElem);
        } else if (elem.id.includes('banner_inferior')) {
          itensBannerInferior.push(paramElem);
        }
      });

      const currentPostBannerSuperior = itensBannerSuperior.slice(0, 10);
      const currentPostBannerInferior = itensBannerInferior.slice(0, 10);
      setCurrentPostsBannerSup(currentPostBannerSuperior);
      setCurrentPostsInferior(currentPostBannerInferior);      
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      await serviceAdm();
    };
    fetchData();
  }, []);

  return (
    <DataContextFilterProvider>
      <div className="style-custom">
        <div className="row"> 
          <div className="col style-padding">
            <h4 className="style-h4-catalogs">{t('catalogues_section1')}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {listItensBannerSuperior?.map((item:any, index:number) => {
                return (            
                  <img key={index}
                    className="d-block banner-catalog-style"
                    src={`https://portobello.com.br/concierge/images/${item.image}` + '?v='+ versionReact()}                
                    alt={item.id}
                  />                    
                );
              })}
          </div>
        </div>
        <div className="row style-line style-custom style-padding">
          <div className="col-md-2 style-filter-padding">
            <CatalogFilter />
          </div>
          <div className="col-md-10">
            <ItensCatalog />
          </div>
        </div>
      </div>
    </DataContextFilterProvider>
  );
};
export default Catalogs;
