import styled from "styled-components";
import ImgCatalog from "../../assets/CATALOGO_CONCIERGE_ME.png";

export const ContainerRow = styled.div`
  display: flex;
  width: 100%;
  background-color: #f5f5f5;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  padding-left: 3rem;
  text-align: justify;
  text-justify: inter-word;
`;

export const ImageCatalogs = styled.img`
  content: url(${ImgCatalog});
  width: 100%;
  object-fit: cover;
  object-position: bottom;
`;
