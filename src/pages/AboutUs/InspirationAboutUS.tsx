import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { ImageBanner, Container, TextOverImage } from "./Inspiration.elements";
import { versionReact } from "../../components/Version/Version";

const InspirationAboutUS = ({ bannerInf }:any)=> {
  const { t } = useTranslation();
  return (
    <>
      {bannerInf?.map((item:any, index:number) => {
        return (            
          <ImageBanner
            className="d-block w-100"
            alt={item.id}
            src={`https://portobello.com.br/concierge/images/${item.image}`}            
          />            
        );
      })}
    </>
  );
};

export default InspirationAboutUS;
