import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { H1 } from "../../globalStyles";
import {
	ImageBanner,
	Container,
	TextOverImage,
} from "./InspirationCollection.elements";
import { versionReact } from "../../components/Version/Version";

const InspirationCollection = ({ bannerInf }:any) => {
const { t } = useTranslation();
  return (
    <Container>
      {bannerInf?.map((item:any, index:number) => {
          return (            
            <ImageBanner 
              key={index}
              className="d-block w-100"
              alt={item.id}
              src={`https://portobello.com.br/concierge/images/${item.image}`  + '?v='+ versionReact()}            
            />              
          );
      })}
      <TextOverImage>
        <H1 style={{ color: "white" }}> {t('Inspira_1')}</H1>
      </TextOverImage>
    </Container>
  );
};

export default InspirationCollection;
