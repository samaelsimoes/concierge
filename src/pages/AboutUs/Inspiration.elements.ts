import styled from "styled-components";
import ImageInspiration from "../../assets/BANNER_PHOTO_COMMUNITY-2.png";

export const Container = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
`;

export const Image = styled.img`
  content: url(${ImageInspiration});
  width: 100%;
  height: 650px;
  /* object-fit: cover; */
  object-position: bottom;
  /* width: fit-content; */
  object-fit: cover;
`;

export const ImageBanner = styled.img`
  width: 100%;
  height: 650px;
  /* object-fit: cover; */
  object-position: bottom;
  /* width: fit-content; */
  object-fit: cover;
`;

export const TextOverImage = styled.div`
  position: absolute;
  top: 3rem;
  left: 3rem;
`;
