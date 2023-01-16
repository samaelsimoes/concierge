import styled from "styled-components";
import { Paragraph } from "../../../globalStyles";

export const GridContainer = styled.div<any>`
  display: flex;
  width: 100%;
  gap: 1rem;
  border-bottom: ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor}` : `1px solid black`};
  /* background-color: red; */
`;

export const GridTableTitle = styled.h4`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 1000;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.015em;
  color: #000000;
`;

export const MainColumnGrid = styled.div`
  flex: 4;
  display: flex;
  /* background-color: green; */
`;

export const ColumnGrid = styled.div`
  flex: 1;
  justify-content: center;
  display: flex;
  min-width: 5rem;
  /* background-color: blue; */
  /* border: 1px dotted purple; */
`;

export const ItemParagraph = styled(Paragraph)`
  font-size: 18px;
`;

export const ThumbImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
  object-position: center;
`;

export const LinkAction = styled.a`
  white-space: nowrap;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none !important;
  border-bottom: 1px solid black;
  margin-right: 1rem;
  cursor: pointer;
`;
