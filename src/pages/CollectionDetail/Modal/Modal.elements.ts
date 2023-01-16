import { Col, Image, Table, ToastBody } from "react-bootstrap";
import styled from "styled-components";

const maxBrowserWidth = "1300px";
const maxBrowserWidth2 = "1400px";

export const End = styled(Col)`
  text-align: 'end';
`;

export const TBody = styled(ToastBody)`
  textAlign: 'start',
  padding: '2rem',
  verticalAlign: 'middle',
  fontWeight: 'normal',
`;

export const Th10 = styled(Table)`
width: '10%',
`;

export const Image95 = styled(Image)`
  width: "95%",
  height: "95%"
`;

export const TdLast = styled(Table)`
  width: '50%',
  text-align: 'end'
`;