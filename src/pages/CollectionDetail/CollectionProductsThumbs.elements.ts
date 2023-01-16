import styled from "styled-components";
import Img from "../../assets/GAIA_TURMALINA.jpg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3rem;
`;

export const ColumnProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const CollectionBoxSelection = styled.div`
  padding: 0.5rem 0.5rem 1px 0.5rem;
  transition: all 0.3s ease-out;
  :hover {
    background-color: #ececec;
  }

  &.selected {
    background-color: #ececec;
  }
`;

export const ThumbImage = styled.img`
  content: url(${Img});
  width: 290px;
  height: 215px;
  object-fit: cover;
  object-position: bottom;

  @media screen and (min-width: 1800px) {
    width: 400px;
    height: 400px;
  }
`;

export const ChoicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid #000000;
  padding-bottom: 1rem;
  width: 24%;
`;

export const Selector = styled.div<any>`
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#e5e5e5")};
  border: 1px solid #a7aaac;
  border-radius: 6px;
  padding: 0 1rem;
  font-size: 14px;
  font-family: "Montserrat";
  cursor: pointer;
`;
