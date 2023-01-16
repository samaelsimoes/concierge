import styled from "styled-components";
import { Sizes } from "../../globalStyles";
import Logo from "../../assets/logo.png";
import IconFacebook from "../../assets/ICON_FACEBOOK.svg";
import IconInstagram from "../../assets/ICON_INSTAGRAM.svg";
import IconPinterest from "../../assets/ICON_PINTEREST.svg";
import IconYoutube from "../../assets/ICON_YOUTUBE.svg";

export const ContainerColumn = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  width: 100%/*${Sizes.maxWidth}*/;
  align-items: center;
  padding-bottom: 5rem;
`;

export const LogoContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  height: 192px;
  width: 100%;
  align-items: end;
  padding-bottom: 2rem;
  justify-content: center;
  max-width: 1200px;
`;

export const TradeMarkText = styled.div`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 1rem;
  font-family: "Montserrat";
  
`;

export const LogoImage = styled.img`
  content: url(${Logo});
  width: 105px;
`;

export const SocialMediaContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  max-width: 1200px;
`;

export const LogoSocialMedia = styled.img`
  height: 40px;
  margin: 9px;
  cursor: pointer;
`;

export const LogoFacebook = styled(LogoSocialMedia)`
  content: url(${IconFacebook});
`;

export const LogoInstagram = styled(LogoSocialMedia)`
  content: url(${IconInstagram});
  href='https://www.facebook.com/PortobelloS.A/'
`;

export const LogoPinterest = styled(LogoSocialMedia)`
  content: url(${IconPinterest});
`;

export const LogoYoutube = styled(LogoSocialMedia)`
  content: url(${IconYoutube});
`;
