
import "bootstrap/dist/css/bootstrap.min.css";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AiOutlineDownload } from "react-icons/ai";
import Api from "../../../GlobalSerice/api";
import { H1, H4 } from "../../../globalStyles";
import {
  DownloadContainer,
  DownloadContainerAll
} from "../DownloadSection.elements";
import './CarouselCollection.css';
import ListCarousel from "./ListCarousel";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

type paramIdProps = { paramId: string | number; paraName: string }
const CarouselCollection: FC<paramIdProps> = ({ paramId, paraName }) => {
  interface imageCarrousel {
    nameImage: String,
    id: string
  }

  interface DownloadModel {
    id: string;
    description: string;
    file: string;
  }

  let carouselModel: Array<imageCarrousel> = [];
  const [colCarouselModel, setColCarouselModel] = useState<any>();
  const [language, setLanguage] = useState<any>();


  const downloadFile = async (file: any) => {
    if (file === '') return;

    setLanguage(localStorage.getItem("i18nextLng"));

    const fileURL = "http://" + window.location.host + "/concierge/" + getDoc(file);
    window.open(fileURL);

  }

  const serviceCollectionCarousel = async (id: any) => {
    let count: any = 0;
    let url = '/dev/concierge-me/1.0/collections/product-colors/' + id + '/images';

    await Api.get(url, {
      headers: {
        access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        'Access-Control-Allow-Origin': "true",
      }
    }).then(response => {
      response.data.dados.forEach((element: any) => {
        count = count + 1;
        let paramElem = {
          nameImage: element,
          id: count
        }
        carouselModel.push(paramElem);
      });
      setColCarouselModel(carouselModel);
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      if (paramId) {
        setColCarouselModel("");
        serviceCollectionCarousel(paramId);
      }

    };
    fetchData();
  }, [paramId]);

  const { t } = useTranslation();

  const docs = [
    { lang: "pt_BR", manual: "ManualTecnicoLimpezaeManut_PT.pdf", garantia: "GarantiaPT.pdf" },
    { lang: "en_US", manual: "ManualTecnicoLimpezaeManut_ING.pdf", garantia: "Garantia_ING.pdf" },
    { lang: "es_ES", manual: "ManualTecnicoLimpezaeManut_ESP.pdf", garantia: "Garantia_ESP.pdf" },
  ]

  function getDoc(file: string) {

    const doc = docs.find(it => it.lang === localStorage.getItem("i18nextLng"))
    if (doc === undefined) return;

    return file === 'manual' ? doc['manual'] : doc['garantia'] 
  }

  const downloadModel: DownloadModel[] = [
    // { id: "1", description: t('catalo_section_1'), file: '' },
    //{ id: "2", description: t('catalo_section_2') },
    //{ id: "3", description: t('catalo_section_3') },
    { id: "4", description: t('catalo_section_4'), file: 'manual' },
    { id: "5", description: t('catalo_section_5'), file: 'garantia' },
  ];

  return (
    <div className="row">
      {colCarouselModel ? (
        <ListCarousel colCarouselModel={colCarouselModel} />
      ) : (
        ""
      )}
      <div className="col-lg-4">
        <div className="row">
          <H1>{paraName}</H1>
          <DownloadContainerAll>
            <H4>Downloads</H4>
            {downloadModel.map((model, index: any) => {
              return (
                <DownloadContainer key={index} onClick={() => downloadFile(model.file)}>
                  {model.description}
                  <AiOutlineDownload style={{ fontSize: "2rem" }} />
                </DownloadContainer>
              );
            })}
          </DownloadContainerAll>
        </div>
      </div>
    </div>
  );
};

export default CarouselCollection;
