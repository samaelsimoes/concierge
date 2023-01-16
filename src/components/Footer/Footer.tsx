import { FC } from "react";
import {
  ContainerColumn,
  LogoContainer,
  LogoFacebook,
  LogoImage,
  LogoInstagram,
  LogoPinterest,
  LogoSocialMedia,
  LogoYoutube,
  SocialMediaContainer,
  TradeMarkText,
} from "./Footer.elements";
import './Footer.css';


const Footer: FC = () => {
  return (
    <div className="container">
      <div className="row style-footer-padding-bottom">
        <div className="d-flex justify-content-center bd-highlight">
          <div className="style-border-footer">
            <LogoImage />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center bd-highlight mb-3">
          <a href="https://www.facebook.com/PortobelloS.A/" target="_blank">
            <LogoFacebook/>
          </a>
          <a href="https://www.instagram.com/portobello/" target="_blank">
            <LogoInstagram />
          </a>  
          <a href="http://www.pinterest.com/portobellosa" target="_blank">
            <LogoPinterest />
          </a>
          <a href="https://www.youtube.com/user/PortobelloCeramica" target="_blank">   
            <LogoYoutube />
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center bd-highlight mb-3">
          <TradeMarkText className="d-flex justify-content-center">©PBG S/A. 2022. Concierge</TradeMarkText>
        </div>
      </div>
    </div>
  );
};

export default Footer;
