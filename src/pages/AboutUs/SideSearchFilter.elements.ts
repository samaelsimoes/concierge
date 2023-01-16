import styled from "styled-components";
import { Colors } from "../../globalStyles";

export const Container = styled.div`
  width: 40%;
  border-right: 1px solid black;
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
