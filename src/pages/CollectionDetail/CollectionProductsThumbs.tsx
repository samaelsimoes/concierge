import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Api from "../../GlobalSerice/api";
import { H4 } from "../../globalStyles";
import CarouselCollection from "./Carousel/CarouselCollection";
import "./Collection.css";
import './CollectionProductsThumbs.css';
import { CollectionBoxSelection } from "./CollectionProductsThumbs.elements";
import "./DownloadSection.elements";
import FormatsList from "./FormatsList";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const CollectionProductsThumbs: FC = () => {

  const { id } = useParams();
  const { nameCollection } = useParams();
  const [idItens, setidItens] = useState<string | number>('');
  const [idItensName, setidItensName] = useState<string>('');
  const { t } = useTranslation();
  const [col, setCol] = useState<any>();

  let [firsIdCollections, setFirsIdCollections] = useState<any>();
  let collection: Array<CollectionProductModel> = [];

  interface CollectionProductModel {
    hasLastra: string,
    id: string,
    mainImage: string,
    name: string
    new: string
    totalProducts: string
  }

  const serviceCollectionProducts = async () => {
    let url = '/dev/concierge-me/1.0/collections/product-colors/' + id;
    await Api.get(url, {
      headers: {
        access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        'Access-Control-Allow-Origin': "true",
      }
    }).then(response => {
      if (collection.length < 1) {
        setFirsIdCollections(response.data.result.results[0].ProductGroupColor.id);
        setidItensName(response.data.result.results[0].ProductGroupColor.name);
        response.data.result.results.forEach((elem: any) => {
          let paramElem = {
            hasLastra: elem.ProductGroupColor.hasLastra,
            id: elem.ProductGroupColor.id,
            mainImage: elem.ProductGroupColor.mainImage,
            name: elem.ProductGroupColor.name,
            new: elem.ProductGroupColor.new,
            totalProducts: elem.ProductGroupColor.totalProducts,
            briefing: elem.ProductGroupColor.briefing,
          }
          collection.push(paramElem);
        });
        setCol(collection);
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      serviceCollectionProducts();
      if (firsIdCollections) {
        setidItens(firsIdCollections);
      }
    }
    fetchData();
  }, [firsIdCollections, t]);

  const imageClick = async (id: any, name: any) => {
    if (id) {
      setidItens(id);
      setidItensName(name);
    }
  }
  
  return (
    <div className="row">
      <div className="col">
          <H4> {nameCollection} {t('lista_favo_2')} </H4>
          <div className="row padding-collection style-collection-button">
            {col?.map((collection:CollectionProductModel, index:number) => {            
              return (            
                <div className="col-md-2" key={index}>
                  <CollectionBoxSelection className={idItens === collection.id ? "selected": ""}>
                    <img 
                      alt="pic id code"
                      role="button"
                      onClick={() => imageClick(collection.id, collection.name)}
                      src={collection && collection.mainImage ?"https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br"+collection.mainImage : " https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br//template/images/imageNotFound.png"}
                      className="img-collection"
                    />
                    <p className="text-product"> {collection.name}</p>       
                  </CollectionBoxSelection>       
                </div>               
              );
            })}                  
          </div>       
        <CarouselCollection paramId={idItens} paraName={idItensName}/>          
        <FormatsList paramFormatList={idItens} />
      </div>
    </div>
  );
};

export default CollectionProductsThumbs;
