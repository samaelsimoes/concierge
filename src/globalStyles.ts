import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
    margin: 0;
    padding:0 ;
    font-family : "Montserrat";
    
    }

    ul{
      margin:0 !important;      
      padding:0 !important;
    }

    body{
      /* background-color: #f5f5f5; */
      background-color: #f5f5f5; 
      background-color: white;
    }

    ::placeholder {
  color: #E5E5E5;
}

    .form-select{
      background-color: white !important;
      font-family: "Montserrat";
      color: black !important;
      border: none;
      border-bottom: 2px solid #CCCCCC !important;
      border-radius: 0px !important;
      font-size: 12px !important;
      border-color: none;

      &:hover {
        box-shadow: none !important;
      }

      &:after {
        /* background-color: red !important; */
        background-color: red !important; 
      }

      &:focus-within {        
        box-shadow: none !important;
      }   
    }

    .custom-option{
      font-family: "Montserrat";
      /* color:red; */
      /* border: 1px dotted red; */
      font-family: Montserrat;
      color: black;
      border: 1px dotted black;
    }

    .form-check-input{
      background-color:  #C4C4C4 !important;
      
    }

    .form-check-label{
      font-family: "Montserrat" !important;
      font-size: 18px;
    }

`;

export const Colors = {
  primary: "rgba(13, 34, 76, 0.8)",
};

export const Sizes = {
  maxWidth: "1300px",
};

export const Button = styled.button<any>`
  margin-top: 15px;
  width: ${({ width }) => (width ? width : "100%")};
  border-radius: 6px;
  background: ${({ primary }) => (primary ? Colors.primary : "#fff")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "15px 64px" : "11px 21px")};
  color: ${({ primary }) => (primary ? "white" : Colors.primary)};
  font-size: 15px;
  outline: none;
  border: none;
  cursor: pointer;
  height: ${({ height }) => (height ? height : "")};

  &:hover {
    transition: all 0.3s ease-out;
    color: ${Colors.primary};
    border: 1px solid ${Colors.primary};
    background: ${({ primary }) => (primary ? "#fff" : Colors.primary)};

    @media screen and (max-width: 960px) {
      width: 100%;
    }
  }
`;

export const SectionContainer = styled.section`
  margin-top: 80px;
`;

export const PageContainer = styled.div<any>`
  display: flex;
  width: 100%;
  /*max-width: ${Sizes.maxWidth}; */
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  /* padding-left: 3rem; */
`;

export const Container = styled.div<any>`
  /* background-color: purple; */
  width: 100%;
  display: flex;
  padding: 3rem;
  text-align: justify;
  text-justify: inter-word;
  flex-direction: ${({ flexColumn }) => (flexColumn ? "column" : "row")};
`;

export const Paragraph = styled.p<any>`
  font-size: ${({ size }) => (size ? size : "14px")};
  font-family: "Montserrat";
`;

export const H1 = styled.h1`
  font-family: "Montserrat";
`;

export const H4 = styled.h4<any>`
  font-family: "Montserrat";
  font-weight: 900;
  font-size: ${({ size }) => (size ? size : "24px")};
  line-height: 36px;
  letter-spacing: -0.015em;
`;

export const H5 = styled.h5<any>`
  font-family: "Montserrat";
  font-weight: 900;
  font-size: ${({ size }) => (size ? size : "15px")};
  line-height: 36px;
  letter-spacing: -0.015em;
`;

export default GlobalStyle;
