import styled from "styled-components";
import { Colors } from "../../globalStyles";
import Slide1 from "../../assets/BANNER_PRINCIPAL_COLLECTIONS.png";

export const Container = styled.div`
  width: 100%;
  /* background-color: red; */
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-right: 1.5rem;
  /* background-color: purple; */
`;

export const InputSearch = styled.input`
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 1.5rem 1.5rem 1.5rem 0rem;
  font-family: "Montserrat" !important;
  font-size: 18px;
  border: none;
  padding-left: 1rem;
`;

export const LinkSmall = styled.a`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  font-family: "Montserrat";
  &:hover {
    color: ${Colors.primary};
  }
`;
export const MainImage = styled.img`
  height: 285px;
  width: 100%;
  content: url(${Slide1});
  object-fit: cover;
  object-position: bottom;
`;

export const MainImageBanner = styled.img`
  width: 100vw;
  object-fit: cover;
  object-position: bottom;
`;

