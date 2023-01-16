import styled from "styled-components";
import img1 from "../../assets/about_01.png";
import img2 from "../../assets/about_02.png";
import img3 from "../../assets/about_03.png";
import img4 from "../../assets/about_04.png";
import img5 from "../../assets/about_05.png";
import img6 from "../../assets/about_06.png";

import BANNER_SUSTAINABILITY from "../../assets/BANNER_SUSTAINABILITY.png"
import BANNER_LINHA_TEMPO from "../../assets/BANNER_FACTORY2.png";
import ICON_ZERO_PRODUCT from "../../assets/ICON_ZERO_PRODUCT.svg"
import ICON_ATOXIC_PRODUCT from "../../assets/ICON_ATOXIC_PRODUCT.svg"
import ICON_FIRE_RESISTANT from "../../assets/ICON_FIRE_RESISTANT.svg"
import ICON_RECYCLABLE from "../../assets/ICON_RECYCLABLE.svg"
import ICON_REGENERATIVE_EXTRACTION from "../../assets/ICON_REGENERATIVE_EXTRACTION.svg"
import ICON_REUSE_OF_WATER from "../../assets/ICON_REUSE_OF_WATER.svg"


export const RowContainerAbout = styled.div`
  min-height: 30%;  
  min-height: 1vh; 
  display: flex;
  margin: 0 auto;
  width: 98%;
  background-color: #fff; 
  /*border-style: solid;*/
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  text-align: justify;
`;
export const RowContainerInAbout = styled.div`
  min-height: 30%;
  /*margin: 0 auto;*/
  width: 98%;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  text-align: justify;
  /*background-color: red; 
  border-style: solid;
  */
`;

export const RowContainerInAboutImages = styled.div`
  width: 100%;
  align-items: center;
  /* background-color: red; 
  border-style: solid;
  font-family: "Montserrat";
  */
`;

export const ImageAbout1 = styled.img`
  content: url(${img1});
  margin: 1rem 0em;
  width: 100%;
  height: 123px;
`;

export const ImageAbout2 = styled.img`
  content: url(${img2});
  margin: 1rem 1em;
  width: 100%;
  height: 123px;
`;

export const ImageAbout3 = styled.img`
  content: url(${img3});
  margin: 1rem 1.5em;
  width: 100%;
  height: 123px;
`;

export const ImageAbout4 = styled.img`
  content: url(${img4});
  margin: 1rem 0em;
  width: 100%;
  height: 123px;
`;

export const ImageAbout5 = styled.img`
  content: url(${img5});
  margin: 1rem 1em;
  width: 100%;
  height: 123px;
`;

export const ImageAbout6 = styled.img`
  content: url(${img6});
  margin: 1rem 1.5em;
  width: 100%;
  height: 123px;
`;

export const RowContainer2 = styled.div`
  min-height: 30%;  
  min-height: 1vh; 
  display: flex;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: initial;
  align-items: left;
  margin: 0rem;
  text-align: justify;
  background-color: #F5F5F5; 
  /*border-style: solid;
  */
`;
export const RowContainer3 = styled.div`
  min-height: 30%;  
  min-height: 1vh;
  display: flex;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: initial;
  align-items: left;
  margin: 0rem;
  text-align: justify;
  background-color: #fff; 
  `;

export const ColumnContainer = styled.div`
  flex-direction: column;
  width: 100%;
  min-height: 30%;
  margin: 0 auto;
  width: 100%;
  display: inline-block;
  align-items: center;
  margin: 2rem;
  text-align: justify;
  /* background-color: #687b4f; 
  border-style: solid;
  */
`;

export const ColumnContainerRight = styled.div`
  flex-direction: column;
  min-height: 30%;
  margin: 0 auto;
  width: 100%;
  display: inline-block;
  align-items: center;
  margin: 3rem;
  text-align: justify;
  background-color: #687b4f;
  color: #fff;
  /* background-color: #687b4f; 
  border-style: solid;
  */
`;

export const ImageSustainabilityBanner = styled.img`
  content: url(${BANNER_SUSTAINABILITY});
  width: 100%;
`;

export const ImageSustainability1 = styled.img`
  content: url(${ICON_ZERO_PRODUCT});
  height: 155px;
  width: 100%;
`;

export const ImageSustainability2 = styled.img`
  content: url(${ICON_ATOXIC_PRODUCT});
  height: 125px;
  width: 100%;
`;
export const ImageSustainability3 = styled.img`
  content: url(${ICON_FIRE_RESISTANT});
  height: 125px;
  width: 100%;
`;
export const ImageSustainability4 = styled.img`
  content: url(${ICON_RECYCLABLE});
  height: 125px;
  width: 100%;
`;
export const ImageSustainability5 = styled.img`
  content: url(${ICON_REGENERATIVE_EXTRACTION});
  height: 145px;
  width: 100%;
`;
export const ImageSustainability6 = styled.img`
  content: url(${ICON_REUSE_OF_WATER});
  height: 125px;
  width: 100%;
`;

export const ImageSustainabilityBannerReservada = styled.img`
  content: url(${BANNER_LINHA_TEMPO});
  width: 100%;
  height: 500px;
  object-fit: contain;
  object-position: top;
`;


export const ColumnContainerRightReservada = styled.div`
  flex-direction: column;
  width: 100%;
  min-height: 30%;
  margin: 0 auto;
  display: inline-block;
  align-items: center;
  margin: 3rem;
  text-align: justify;
  /* background-color: #687b4f; 
  border-style: solid;
  */
`;