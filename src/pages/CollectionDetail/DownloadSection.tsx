import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { H1, H4 } from "../../globalStyles";
import { ContainerColumn, ImageSlider } from "./Carousel/CarouselCollection.elements";
import {
  ContainerDownloadSection,
  DownloadContainer,
  DownloadContainerAll,
  ImageContainer,
  LeftSideContainer,
  RightSideContainer
} from "./DownloadSection.elements";

import { Carousel } from "react-bootstrap";
import Api from "../../GlobalSerice/api";
import "./DownloadSection.elements";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const DownloadSection = (props: any) => {
  interface DownloadModel {
    id: string;
    description: string;
  }
  interface imageCarrousel {
    nameImage: String,
    id: string
  }

  let carouselModel: Array<imageCarrousel> = [];
  const [col, setCol] = useState<any>();

  const serviceCollectionSection = async (id: any) => {
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
      setCol(carouselModel);
    })
  }

  const downloadModel: DownloadModel[] = [
    { id: "1", description: "Pacote de fotos" },
    { id: "2", description: "Manual do especificador" },
    { id: "3", description: "Manual do proprietário" },
    { id: "4", description: "Manual de limpeza" },
    { id: "5", description: "Garantia Geral" },
  ];

  useEffect(() => {
    if (props.data) {
      serviceCollectionSection(props.data);
    }
  }, [])

  return (
    <div>
      {(() => {
        if (props.data) {
          return (
            <ContainerDownloadSection>
              <LeftSideContainer>
                <ImageContainer>
                  <ContainerColumn>
                    <Carousel>
                      {col?.map((carousel: any) => {
                        return (
                          <Carousel.Item key={carousel.id}>
                            <ImageSlider
                              className="d-block w-100"
                              src={"https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br/"+carousel.nameImage}                        
                            />                            
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  </ContainerColumn>
                </ImageContainer>
              </LeftSideContainer>
              <RightSideContainer>
                <H1>Oh! Take City</H1>
                <DownloadContainerAll>
                  <H4>Downloads</H4>
                  {downloadModel.map((model) => {
                    return (
                      <DownloadContainer key={model.id}>
                        {" "}
                        {model.description}
                        <AiOutlineDownload style={{ fontSize: "2rem" }} />
                      </DownloadContainer>
                    );
                  })}
                </DownloadContainerAll>
              </RightSideContainer>
            </ContainerDownloadSection>
          )
        }
      })()}
    </div>
  );
};

export default DownloadSection;
