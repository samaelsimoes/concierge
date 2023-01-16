import Pagination from "@mui/material/Pagination";
import i18next from "i18next";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../GlobalSerice/api";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import ListItensIventory from "./PaginationIventory/ListItensInventory";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const ThumbResultsIventory: FC = () => {
  const { filtro, DataFilters } = SetFilterData();

  const [listItensIventory, setItensIventory] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [currentPosts, setCurrentPosts] = useState<any>();
  const [totalPages, setTotalPages] = useState<number>();
  const [pagNationFilterLastras, setPagNationFilterLastras] = useState(false);
  const [pagNationFilterLinha, setPagNationFilterLinha] = useState(false);

  const [orderParam, setOrderParam] = useState("");
  const [order,      setOrder] = useState("");

  interface Inventory {
    code: string;
    id: string;
    name: string;
    nominal_format: string;
    totalStock: string;
    unit_measure: string;
    zoomImage: string;
    catalog: boolean
  }

  const serviceProducts = async (urlParam: any) => {
    let url = "/dev/concierge-me/1.0/" + urlParam;

    setItensIventory("");
    setTotalPages(0);
    setCurrentPosts("");

    var langQuery = "";
    const language = i18next.language;
    if (urlParam == "stock/list") {
      langQuery = "?lang=" + language;
    } else if (urlParam) {
      langQuery = "&lang=" + language;
    }

    url += langQuery;

    await Api.get(url, {
      headers: {
        access_token: localStorage.getItem(TOKEN_KEY)
          ? "" + localStorage.getItem(TOKEN_KEY)
          : "",
        client_id: "2569d5b3-765c-4262-8037-979daca99782",
        "Access-Control-Allow-Origin": "true",
      },
    }).then((response) => {
        setLoading(false);
        const itens: Array<Inventory> = [];
        response.data.data.forEach((elem: any) => {
          let paramElem = {
            code: elem.code,
            id: elem.id,
            name: elem.name,
            nominal_format: elem.nominal_format,
            totalStock: elem.totalStock,
            unit_measure: elem.unit_measure,
            zoomImage: elem.zoomImage,
            catalog: false
          };
          itens.push(paramElem);
        });
        
        const currentPostsN = itens.slice(0, 10);

        setItensIventory(itens);
        setCurrentPosts(currentPostsN);
        setTotalPages(response.data.totalPages);
      })
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      await setLoading(true);
      let url = "stock/list";
      if ( filtro[0] && filtro[0].pageOne ) {
        await setCurrentPage(1);
      }
      
      if (filtro && ( filtro[0] && filtro[0].id ) && filtro.length > 0 && filtro.type != 'orderFild') {
        filtro.forEach((elem: any, index: any) => {
          
          if (elem.idCampo == "1SearchField") {
            if (elem.id.length > 2) url += "/search?search=" + elem.id;
          } else {
            url += index == 0 ? "?" : "&";

            if (elem.idCampo == "1") {
              url += "material=" + elem.id;
            }
            if (elem.idCampo == "2") {
              url += "color=" + elem.id;
            }
            if (elem.idCampo == "3") {
              url += "size=" + elem.id;
            }
            if (elem.idCampo == "4") {
              url += "edge=" + elem.id;
            }
            if (elem.idCampo == "5") {
              url += "finish=" + elem.id;
            }
            if (elem.idCampo == "2radio" || elem.idCampo == "6") {
              url += "view=" + "slabs";
            }

            if (pagNationFilterLastras == false && elem.idCampo != "1radio") {
              setPagNationFilterLastras(true);
              setPagNationFilterLinha(false);
            }
            if (pagNationFilterLinha == false && elem.idCampo != "2radio") {
              setPagNationFilterLinha(true);
              setPagNationFilterLastras(false);
            }
          }
        });
          url += currentPage ? "&pagination=" + currentPage : "";
          await serviceProducts(url);
      } else {       

        if (filtro && filtro.type == 'orderFild' ) {
          setOrderParam(filtro.param);
          setOrder(filtro.order);
          url += '?sort='+filtro.param;
          
          await serviceProducts(url);
          url += currentPage ? "&pagination=" + currentPage : "";
  
        } else {
          url += currentPage ? "?pagination=" + currentPage : "";
        }

        await serviceProducts(url);
      }      
    };
    fetchData();
  }, [filtro, currentPage]);

  const { t } = useTranslation();
  if (loading) {
    return <h2>{t('untld_dreams_section_3')}</h2>;
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    window.scrollTo(0, 100);
    setCurrentPage(value);
  };

  return (
    <div>
      {currentPosts && currentPosts.length > 0 ? (
				  <ListItensIventory listItensIventory={currentPosts} 
            loading={loading}
            orderParam={orderParam}
            orderTable={order} />
			) : (
				<h3>{t("search_not_found")}</h3>
			)}

      <div style={{ display: "flex", justifyContent: "end" }}>
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
  );
};

export default ThumbResultsIventory;
