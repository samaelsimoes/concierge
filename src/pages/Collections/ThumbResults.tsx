import { FC, MouseEventHandler, useState, useEffect } from "react";
import Api from "../../GlobalSerice/api";
import "./ThumbResultcss.css";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import ListItensCollections from "./ThubsResultsPagination/ListItensCollections";
import { Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface Collections {
  id: string;
  medioImage: number;
  name: string;
}

const ThumbResults: FC = () => {

  const { filtro, DataFilters } = SetFilterData();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentPosts, setCurrentPosts] = useState<any>();
  const [totalPages, setTotalPages] = useState<any>();
  const { t } = useTranslation()


  const serviceCollection = async (paramUrl: any) => {
    let url = "/dev/concierge-me/1.0/" + paramUrl;
    setLoading(true);

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

        const itens: Array<Collections> = [];
        response.data.result.results.forEach((elem: any) => {
          let paramElem = {
            id: elem.Line.id,
            medioImage: elem.Line.medioImage,
            name: elem.Line.name,
          };
          itens.push(paramElem);
        });
        const currentPostsN = itens.slice(0, 10);
  
        setCurrentPosts(currentPostsN);
        setTotalPages(response.data.result.totalPages || 1);
      });
  };

  useEffect(() => {
    const fetChItensColection = async () => {
      let urlFilter = "collections";

      if (filtro && filtro.length > 0) {
        setCurrentPage(1);

        filtro.forEach((elem: any, index: any) => {
          if (elem.idCampo == "1SearchField") {
            if (elem.id.length >= 1) urlFilter += "/search?search=" + elem.id;

          } else {
            urlFilter += index == 0 ? "?" : "&";

            if (elem.idCampo == "1") {
              urlFilter += "material=" + elem.id;
            }
            if (elem.idCampo == "2") {
              urlFilter += "color=" + elem.id;
            }
            if (elem.idCampo == "3") {
              urlFilter += "size=" + elem.id;
            }
            if (elem.idCampo == "4") {
              urlFilter += "edge=" + elem.id;
            }
            if (elem.idCampo == "5") {
              urlFilter += "finish=" + elem.id;
            }
            if (elem.idCampo == "2radio") {
              urlFilter += "view=" + "slabs";
            }
          }
        });
        
        let url = urlFilter + "&pagination=" + currentPage + "&limit=10";
        await serviceCollection(url);
        
      } else {
        let url = urlFilter + "?pagination=" + currentPage + "&limit=10";
        await serviceCollection(url);
      }
    };
    fetChItensColection();
  }, [filtro, currentPage]);

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
				<ListItensCollections listCollections={currentPosts} loading={loading} />
			) : (
				<h3>{t("search_not_found")}</h3>
			)}
      
      <div style={{
        display: "flex",
        justifyContent: "flex-end"
      }}>
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

export default ThumbResults;
