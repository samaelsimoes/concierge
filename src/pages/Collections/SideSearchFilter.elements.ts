import styled from "styled-components";
import { Colors } from "../../globalStyles";

export const Container = styled.div`
  width: 100%;
  border-right: 1px solid black;
  /* background-color: red; */
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CollectionsSearch = styled.div`
  width: 96%;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-right: 1.5rem;
  margin-top: 30px;
  /* background-color: purple; */
`;

export const InputSearch = styled.input`
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 5px 5px 6px rgb(0 0 0 / 30%);
  margin: 0.5rem 1.5rem 1.5rem 0rem;
  font-family: "Montserrat" !important;
  font-size: 18px;
  border: 1px #6b6b6b;
  height: 30px;
  padding-left: 1rem;
`;

export const LinkSmall = styled.a`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  font-family: "Montserrat";
  margin-right: -15px;
  &:hover {
    color: ${Colors.primary};
  }
`;
