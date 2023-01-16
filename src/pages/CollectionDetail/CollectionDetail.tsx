import i18next from "i18next";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Api from "../../GlobalSerice/api";
import { H1, Paragraph } from "../../globalStyles";
import "./Collection.css";
import {
  IconReturn, ReturnButton
} from "./CollectionDetail.elements";
import CollectionProductsThumbs from "./CollectionProductsThumbs";

import "./CollectionDetail.css";
export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const CollectionDetail: FC = () => {
  const { id } = useParams();
  let collection: Array<CollectionsDetail> = [];
  const [col, setCol] = useState<any>();
  const { t } = useTranslation();

  interface CollectionsDetail {
    briefing: string;
    id: string;
    medioImage: string;
    name: string;
  }

  const serviceCollectionDetail = async () => {
    var language = i18next.language;

    let url =
      "/dev/concierge-me/1.0/collections/details/" + id + "?lang=" + language;
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
        if (collection.length < 1) {
          response.data.result.results.forEach((elem: any) => {
            let paramElem = {
              briefing: elem.Line.briefing,
              id: elem.Line.id,
              medioImage: elem.Line.medioImage,
              name: elem.Line.name,
            };
            collection.push(paramElem);
          });
          setCol(collection);
        }
      })
  };

  useEffect(() => {
    serviceCollectionDetail();
  }, [t]);

  return (
    <div className="style-container-itens-collection">
      <div className="col">
        <div
          className="d-flex justify-content-end"
          style={{ marginRight: "3rem" }}
        >
          <Link to={"/collections"} style={{ textDecoration: "none" }}>
            <ReturnButton>
              {t("return")}
              <IconReturn />
            </ReturnButton>
          </Link>
        </div>
        {col?.map((collection: any) => {
          return (
            <div className="row" key={collection.id}>
              <div className="col-md-4">
                <div className="row">
                  <H1>{collection.name}</H1>
                </div>
                <div className="row">
                  <Paragraph
                    dangerouslySetInnerHTML={{ __html: collection.briefing }}
                    style={{ paddingRight: "1.8rem" }}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <img
                    className="style-imagem"
                    src={
                      "https://imagens.portobello.com.br/unsafe/fit-in/1920x1080/https://www.portobello.com.br/" +
                      collection.medioImage
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
        <CollectionProductsThumbs />
      </div>
    </div>
  );
};

export default CollectionDetail;
