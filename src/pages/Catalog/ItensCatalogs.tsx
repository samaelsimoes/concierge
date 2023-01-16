import { Pagination } from "@mui/material";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../GlobalSerice/api";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import ListItensCatalog from "../Catalog/PaginationCatalog/ListCatalogShipment";
export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const ItensCatalogs = () => {
  const languageServ = i18next.language;

  const { filtro, DataFilters } = SetFilterData();

  const [listItensShipments, setItensShipments] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<any>();


  const [currentPosts, setCurrentPosts] = useState<any>();
  const [totalPages, setTotalPages] = useState<any>();
  const [pagSearchFilter, setSearchFilter] = useState(false);
  const [urlFilter, setUrlFilter] = useState("");
  let [language, setLanguage] = useState("");

  interface Shipments {
    active: any,
    dateCreated: any,
    dateUpdated: any,
    description: any,
    fileName: any,
    fileSize: any,
    fileType: any,
    hasThumb: any,
    id: any,
    lang: any,
    link: any,
    order: any,
    productType: any,
    public: any,
    restrict: any,
    showB2B: any,
    thumb: any,
    title: any,
    type: any,
    year: any,
  }

  const serviceTotalPages = async(urlParam:any) => {

    let url = urlParam + "/count" + "?lang=" + (!language ? languageServ : language);
    let count:number = 0;
      
    await Api.get(url, {
      headers: {
        access_token: localStorage.getItem(TOKEN_KEY) ? ''+localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        'Access-Control-Allow-Origin': "true",
      } 
    }).then(response => {
      setTotalPages(response.data.result); 
    }) 
  }

  const serviceCatalogs = async(urlParam:any) => {
 
    const valItemLanguagem = urlParam.includes("?") ? "&lang="+(!language ? languageServ : language) : "?lang="+(!language ? languageServ : language);
    let url = '/dev/concierge-me/1.0/' + urlParam + valItemLanguagem;
    let count:number = 0;

    setItensShipments("");
    setTotalPages("");

    if (!urlParam.includes("search")) {
      await serviceTotalPages("/dev/concierge-me/1.0/catalogues/list");
    } else {
      setTotalPages(1); 
    }
    await Api.get(url, {
      headers: {
        access_token: localStorage.getItem(TOKEN_KEY) ? ''+localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        'Access-Control-Allow-Origin': "true",
      } 
    }).then(response => {    
      const itens: Array<Shipments> = [];
      
      response.data.result.forEach((elem: any) => {
        let paramElem = {
          active: elem.active,
          dateCreated: elem.dateCreated,
          dateUpdated: elem.dateUpdated,
          description: elem.description,
          fileName: elem.fileName,
          fileSize: elem.fileSize,
          fileType: elem.fileType,
          hasThumb: elem.hasThumb,
          id: elem.id,
          lang: elem.lang,
          link: elem.link,
          order: elem.order,
          productType: elem.productType,
          public: elem.public,
          restrict: elem.restrict,
          showB2B: elem.showB2B,
          thumb: elem.thumb,
          title: elem.title,
          type: elem.type,
          year: elem.year
        }
        itens.push(paramElem);
      });

      const currentPostsN = itens.slice(0, 12);

      setItensShipments(itens);
      setLoading(false);      
      setCurrentPosts(currentPostsN);
    })    
  }

  useEffect(() => {
    const fetchData = async () => {    
      setLoading(true);

      let url = "catalogues/list";

      if (filtro && filtro.length && !filtro[0].id && !filtro[0].name && !filtro[0].idCampo) {
        setCurrentPage(1);
      }
      if (filtro && filtro.length > 0) {
        filtro.forEach((elem: any, index:any) => {
          if( elem.idCampo && elem.idCampo == "1SearchField") {
            url += "/search?search="+ elem.id;
            if (pagSearchFilter == false) {
              setCurrentPage(1);
              setSearchFilter(true);
            } else {
              setCurrentPage(currentPage);
            }
            url +=  currentPage ? "&pagination="+currentPage : "";
          }
          
          if (elem.id == 'language') {
            language = elem.name;
            setLanguage(elem.name);
          }
        });
        
        url +=  currentPage ? "&pagination="+currentPage : "";

        setUrlFilter(url)
        await serviceCatalogs(url);
      } else {
        url += currentPage ? "?pagination="+currentPage : "";
        setUrlFilter(url)
        await serviceCatalogs(url);
      }        
    }
    fetchData();
  }, [filtro, currentPage])

  const { t } = useTranslation();
  if (loading) {
    return <h2>{t('untld_dreams_section_3')} </h2>
  }

  const paginateControl =  async(e:any) => {
    setCurrentPage(e);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    window.scrollTo(0, 400);
    setCurrentPage(value);
  };

  return (
    <div>
      <ListItensCatalog listItensCatalog={currentPosts} loading={loading}/>
        <div style={{
          display: "flex",
          justifyContent: "flex-end"
        }}>
      <Pagination
        defaultPage={1}
        count={Math.ceil(totalPages / 12)}
        showFirstButton
        showLastButton
        page={currentPage} 
        onChange={handleChange}
      />
      </div>     
    </div>
  );
};

export default ItensCatalogs;
