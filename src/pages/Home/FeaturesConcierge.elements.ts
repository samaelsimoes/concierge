import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  /* 
  jus
  margin-top: 3rem; */
  /* background-color: blue; */
  /* justify-content: center; */
  /* flex: 1 1 0px; */
`;

export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3rem;
  padding-right: 0px;
  width: 100%;
  background-color: #f5f5f5;
`;

export const ContainerColumnText = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3rem;
  padding-right: 3rem;
  width: 100%;
  min-height: 50%;
  justify-content: center;
  /* background-color: aliceblue; */
`;

export const FeatureContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 31.5%;
  height: auto;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  background-color: white;
  min-height: 380px;

  @media screen and (max-width: 480px) and (min-width:320px)  { 
    /* smartphones, iPhone, portrait 480x320 phones */ 
    min-height: 250px;
    width: 270px;
  }
  @media only screen and (max-width: 640px) and (min-width:481px)  { 
    /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */ 
    min-height: 250px;
    width: 45%;
  }
  @media only screen and (max-width: 960px) and (min-width:641px)  { 
    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */ 
    min-height: 250px;
    width: 47%;
  }
  @media only screen and (max-width: 1200px) and (min-width:961px)  { 
    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */ 
    min-height: 250px;
    width: 195px;
  }
`;

export const FeatureIcon = styled.img`
  max-width: 80px;
  max-height: 80px;
  margin-top: 2rem;
  /* background-color: green; */
  flex: 1;
`;
