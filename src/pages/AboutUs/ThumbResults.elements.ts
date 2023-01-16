import styled from "styled-components";
import Img from "../../assets/GAIA_TURMALINA.jpg";
import IconLoad from "../../assets/ICON_LOADMORE.svg";

export const Container = styled.div`
  width: 100%;
  /* background-color: yellow;
  border: 2px solid green; */
  display: flex;
  gap: 0.8rem;
  /* margin-left: 3rem; */
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export const ThumbContainer = styled.div`
  width: 45%;
  /* background-color: purple; */
`;

export const ThumbImage = styled.img`
  content: url(${Img});
  width: 100%;
  height: 285px;
  object-fit: cover;
  object-position: bottom;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: yellow; */
  width: 100%;
`;

export const LoadIconContainer = styled.div`
  width: 100%;
  /* background-color: green; */
  display: flex;
  justify-content: center;
  /* margin-left: 3rem; */
`;

export const LoadIcon = styled.img<any>`
  content: url(${IconLoad});
  margin-top: 1.5rem;
  width: 57px;
  cursor: pointer;
  animation: ${({ spin }) => (spin ? "rotation 1s infinite" : "")};
  animation-timing-function: linear;

  &:hover {
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
