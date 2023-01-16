import styled, { createGlobalStyle } from "styled-components";
import Slide1 from "../../assets/BANNER_HOME.jpg";

export const ContainerDownloadSection = styled.div`
  display: flex;
  width: 100%;
  padding-left: 3rem;
  padding-right: 3rem;
`;

export const LeftSideContainer = styled.div`
  display: flex;
  width: 55%;
`;

export const RightSideContainer = styled.div`
  display: flex;
  width: 45%;
  padding-left: 3rem;
  padding-top: 1rem;
  flex-direction: column;
  row-gap: 1rem;
  /* background-color: red; */
`;

export const MainImage = styled.img`
  height: 542px;
  width: 100%;
  content: url(${Slide1});
  object-fit: cover;
  object-position: bottom;
`;

export const ImageContainer = styled.div`
  /* padding-bottom: 2rem; */
  width: 100%
`;

export const DownloadContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: end;

  /* background-color: green; */
`;

export const DownloadContainer = styled.div`
  background: #ffffff;
  border: 1px solid #a7aaac;
  padding: 1rem 2rem;
  width: 294px;
  justify-content: space-between;
  /* align-items: revert; */
  display: flex;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;
  :hover{
    background-color: whitesmoke;
  }
`;

export const ImageSlider = styled.img`
  height: 542px;
  object-fit: cover;
  object-position: bottom;
`;

export const ContainerColumn = styled.div`
  display: flex;
  background-color: black;
  flex-direction: column;
  align-items: center;
`;
