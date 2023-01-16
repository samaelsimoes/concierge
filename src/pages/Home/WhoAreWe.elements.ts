import styled from "styled-components";
import Img from "../../assets/BANNER_PORTOBELLO.png";

export const ContainerRow = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  width: 100%;
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

export const ThumbContainer = styled.div`
position: relative;
z-index: 9999;
margin-right: 10px;
margin-left: auto;
margin-top: 10px;  
border-radius: 8px;
color: white;
font-size: 15px;
outline: none;
border: none;
width: 142px;
text-align: center;
background-color: #0D224CCC; 
padding: 11px 14px
`;


export const Image = styled.img`
  content: url(${Img});
  width: 100%;
  /* height: 550px; */
  object-fit: cover;
  object-position: bottom;

  /* width: fit-content; */
`;

export const Colors = {
  primary: "rgba(13, 34, 76, 0.8)",
};

export const ButtonPortoBello = styled.button<any>`
  margin-top: 15px;
  width: ${({ width }) => (width ? width : "100%")};
  border-radius: 6px;
  background: ${({ primary }) => (primary ? Colors.primary : "#fff")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "15px 64px" : "11px 21px")};
  color: ${({ primary }) => (primary ? "white" : Colors.primary)};
  font-size: 15px;
  outline: none;
  border: 1px solid transparent;
  cursor: pointer;
  height: ${({ height }) => (height ? height : "")};

  &:hover {
    transition: all 0.3s ease-out;
    color: ${Colors.primary};
    border: 1px solid ${Colors.primary};
    background: ${({ primary }) => (primary ? "#fff" : Colors.primary)};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;