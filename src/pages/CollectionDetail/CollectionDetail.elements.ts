import styled from "styled-components";
import Slide1 from "../../assets/BANNER_HOME.jpg";
import imagem from "../../assets/BANNER_PHOTO_COMMUNITY.png";
import IconReturnPath from "../../assets/ICON_RETURN.svg";
import Img from "../../assets/BANNER_PHOTO_COMMUNITY.png";
import {
  FaArrowAltCircleLeft,
  FaArrowCircleLeft,
  FaArrowLeft,
  FaBackward,
  FaLevelUpAlt,
  FaLongArrowAltLeft,
  FaReply,
} from "react-icons/fa";
import { Colors } from "../../globalStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
  height: 100%;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  /* justify-content: center; */
  padding-right: 2rem;
  height: 100%;
  text-align: justify;
  /* background-color: green; */
`;

export const RowsContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  width: 100%;
  /* background-color: yellow; */
`;

export const MainImage = styled.img`
  height: 550px;
  width: 100%;
  object-fit: fill;
`;

export const ImageContainer = styled.div`
  width: 75%;
  height: 100%;
  padding-bottom: 2rem;
`;

export const ReturnButton = styled.div`
  display: flex;
  background-color: ${Colors.primary};
  color: white;
  font-size: 15px;
  width: 142px;
  border-radius: 8px;
  padding: 7px 10px;
  margin-bottom: 10px;
  gap: 7px;
  justify-content: center;
  border: 1px solid ${Colors.primary};
  transition: all .2s linear;
  :hover{
    background-color: white;
    color: ${Colors.primary};
  }
`;

export const IconReturn = styled(FaReply)`
  font-size: 20px;
  fill: white;
  cursor: pointer;
  transition: all .2s linear;
  ${ReturnButton}:hover & {
    fill: ${Colors.primary};
  }
`;
