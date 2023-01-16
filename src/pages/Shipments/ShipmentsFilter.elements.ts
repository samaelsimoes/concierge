import styled from "styled-components";
import { Colors } from "../../globalStyles";

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
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  margin: 0.5rem 0.5rem 0.5rem 1rem;
  font-family: "Montserrat" !important;
  font-size: 18px;
  border: none;
  padding-left: 1rem;
  width: 58%;
  border: 1px solid rgba(73, 73, 73, 0.8);
  height:40px;
`;

export const H4Font = styled.h4<any>`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.015em;
  font-size:24px;
  display: inline-block;
  color: #495057;
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
