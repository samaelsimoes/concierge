import { Col, Image, Table, ToastBody } from "react-bootstrap";
import styled from "styled-components";

// const maxBrowserWidth = "1300px";
// const maxBrowserWidth2 = "1400px";

export const End = styled(Col)`
  text-align: "end";
`;

export const TBody = styled(ToastBody)`
  text-align: "start";
  padding: "2rem";
  vertical-align: middle;
  font-weight: "normal";
`;

export const Th10 = styled(Table)`
  width: "10%";
`;

export const Image95 = styled(Image)`
  width: "95%";
  height: "95%";
`;

export const TdLast = styled(Table)`
  width: "50%";
  text-align: "end";
`;

export const MargemFav = styled.div`
min-width: 56px;
border-radius: 8px;
padding: 6px 12px;  
width: 100%;
height: 100%;
border: 1px solid transparent;
transition: border 0.2s linear;
&:hover{
  border: 1px solid black;
}
`;
