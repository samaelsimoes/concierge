import styled from "styled-components";
import Img1 from "../../assets/MINI_BANNER_BEATS.png";
import Img2 from "../../assets/GAIA_TURMALINA.jpg";
import Img3 from "../../assets/MINI_BANNER_VERANO.png";
import Img4 from "../../assets/MINI_BANNER_BOTANIQUE.png";
import Img5 from "../../assets/MINI_BANNER_MALIBU.png";
import Img6 from "../../assets/MINI_BANNER_CHARLESTON.png";
import ImageMain from "../../assets/BANNER_SLAB.png";
import logoUNLTD from "../../assets/LOGO_DREAMS_COLOR.png";
export const Side = styled.div`
    display: flex;
    @media only screen and (max-width: 960px) {
        width: 100%;
    }
    width: 50%;
    flex-direction: column;
    /* height: 100%; */
    /* background-color: yellowgreen; */
    /* justify-content: end; */
    /* background-color: red; */
    margin-bottom: 5%;
`;
export const Side2 = styled.div`
    display: flex;
    @media only screen and (max-width: 960px) {
        width: 100%;
        height: 100%;
    }
    width: 50%;
    flex-direction: column;
`;
export const ContainerHome = styled.div<any>`
    /*background-color: purple;*/
    @media only screen and (max-width: 960px) {
        flex-direction: column;
    }
    width: 100%;
    display: flex;
    padding: 3rem;
    text-align: justify;
    text-justify: inter-word;
    flex-direction: row;
`;
export const Stylep = styled.div`
    @media screen and (max-width: 600px) {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 18;
        -webkit-box-orient: vertical;
    }
    padding-bottom: 10px; ;
`;
export const Thumbnails = styled.div`
    padding-right: 2rem;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    flex: wrap;
    /* background-color: purple; */
    width: 100%;
    height: 100%;
    column-gap: 2rem;
    /* border: 1px dotted red; */
    @media screen and (max-width: 1260px) {
        /* height: 10%; */
    }
`;
export const Thumb = styled.img`
    margin-top: 2rem;
    height: 70%;
    width: 80%;
    max-height: 160px;
    object-fit: cover;
    object-position: center;
    content: url(${Img1});
    @media screen and (max-width: 1618px) {
        width: 35%;
        height: 100%;
    }
    @media screen and (max-width: 1336px) {
        width: 29%;
        height: 100%;
    }
`;
export const Thumb2 = styled(Thumb)`
    content: url(${Img2});
`;
export const Thumb3 = styled(Thumb)`
    content: url(${Img3});
`;
export const Thumb4 = styled(Thumb)`
    content: url(${Img4});
`;
export const Thumb5 = styled(Thumb)`
    content: url(${Img5});
`;
export const Thumb6 = styled(Thumb)`
    content: url(${Img6});
`;
export const MainThumbnail = styled.div`
  border: 1px solid lightgray;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  height 100%;
  @media only screen and (max-width: 960px) and (min-width:641px)  {
    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
    height: 100%;
    width: 100%;
  }
`;
export const MainImage = styled.img`
    content: url(${ImageMain});
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    object-position: bottom;
`;
export const LogUNLTD = styled.img`
    @media screen and (max-width: 960px) {
        width: 80%;
    }
    content: url(${logoUNLTD});
    width: 50%;
    height: 200px;
`;
export const ContainerRow = styled.div`
    display: flex;
    background-color: #F5F5F5;
`;
export const ContainerColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 3rem 3rem 3rem 3rem;
    @media screen and (max-width: 600px) {
        height: 30%;
    }
    @media screen and (max-width: 1375px) {
        /* margin-bottom: 21px; */
        margin: 2rem 2rem 2rem 2rem;
        /* background-color: red; */
    }
`;