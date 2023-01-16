import styled from "styled-components";
import Slide1 from "../../assets/BANNER_PRINCIPAL_INVENTORY.png";

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  width: 100%;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: red; */
  width: 100%;
  padding: 3rem;
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
