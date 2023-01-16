import { FaGlobe, FaHeart, FaLock, FaRegUser, FaRegUserCircle, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/logo.png";
import { Colors } from "../../globalStyles";

const maxBrowserWidth = "1100px";
const maxBrowserWidth2 = "1400px";
const maxBrowserWidth3 = "800px";

export const Nav = styled.nav`
  display: flex;
  /* background: yellow; */
`;

export const Container = styled.div`
  z-index: 5;
  width: 100%;
  padding-left: 0;

  @media screen and (max-width: 991px) {
    padding-right: 1rem;
    padding-left: 1rem;
  }
`;


export const NavbarContainer = styled(Container)`
  display: flex;
  margin: 1rem;
  /* background: red; */
`;

export const NavLogo = styled(Link)`
  color: #000;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;

  /* width: 100%; */
  /* justify-content: end; */
  /* align-items: center; */
  /* background-color: green; */
`;

export const NavIcon = styled.img`
  content: url(${Logo});
  height: 40px;
  width: 110px
`;

export const MobileIcon = styled.div`
  display: none;
  margin-top: -18px;
  @media screen and (max-width: ${maxBrowserWidth}) {
    display: block;
    padding-top: 16px;
    margin-left: 10px;
    font-size: 1.8rem;
  }
`;

export const MobileResponsive = styled.div`
  display: none;
  margin-top: -18px;
  @media screen and (max-width: ${maxBrowserWidth}) {
    display: contents;   
  }
`;

export const NavMenu = styled.ul<any>`
  display: flex;
  align-items: center;
  list-style: none;
  /* padding: 0 !important; */
  flex: 3;
  /* justify-content: ${({ justify }) => (justify ? justify : "")}; */
  justify-content: space-between;
  /* background-color: purple; */

  @media screen and (max-width: ${maxBrowserWidth}) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 20rem !important;
    position: absolute;
    top: 60px;
    left: ${({ click }) => (click ? 0 : "-110%")};
    opacity: 1;
    transition: all 0.5s ease;
    background-color: white;
  }
`;

export const NavLinks = styled(Link)`
  color: ${Colors.primary};
  background-color: white;
  font-size: 15px;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0rem 0.6rem;
  font-style: normal;
  white-space: nowrap;

  @media screen and (max-width: ${maxBrowserWidth2}) {
    text-align: center;
    padding: 0.5px;
    font-size: 12px;    
  } 

  &:hover {
    border-bottom: 2px solid ${Colors.primary};
    color: ${Colors.primary};
    transition: all 0.3s ease;
  }

  @media screen and (max-width: ${maxBrowserWidth}) {
    text-align: center;
    padding: 1rem;
    width: 100%;
    display: table;

    &:hover {
      color: gray;
      transition: all 0.3s ease;
    }
  }
`;

export const NavItem = styled.li`
  @media screen and (max-width: ${maxBrowserWidth}) {
    width: 100%;
  }
`;

export const NavIconsContainer = styled.li`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: -5rem;
  @media screen and (max-width: ${maxBrowserWidth}) {
    display: none;
  }
  /* background-color: yellowgreen; */
`;

export const MargeIconHeart = styled.button<any>`
  margin-top: -10px;
  width: ${({ width }) => (width ? width : "100%")};
  border-radius: 6px;
  background: ${({ primary }) => (primary ? Colors.primary : "#fff")};
  white-space: nowrap;
  padding:15px;
  color: ${({ primary }) => (primary ? "white" : Colors.primary)};
  font-size: 15px;
  outline: none;
  border: 1px solid transparent;

  &:hover {
    transition: all 0.3s ease-out;
    border: 1px solid ${Colors.primary};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;


export const IconHeart = styled.img`
  font-size: 23px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  margin-left: 2px;
  /* position: absolute; */

  &:hover {
    color: ${Colors.primary} !important;
    transition: all 0.3s ease;
  }

  @media screen and (max-width: ${maxBrowserWidth3}) {
    margin-left: 0px!important;   
  } 
`;

export const IconLanguage = styled.img`
font-size: 23px;
  cursor: pointer;
  &:hover { 
    color: ${Colors.primary} !important;
    transition: all 0.3s ease;
  }
`;

export const LanguageMenu = styled.ul`
  position: absolute;
  inset: 0px auto auto -84px;
  transform: translate(0px, 41px);
  right: auto;
  left: -84px;
`;

export const IconLanguageButton = styled.button`
	border: none;
	background: none;
`;



export const IconUser = styled.img`
  font-size: 24px;
  width: 24px;
  height: 24px;
  margin: 0 0.4rem;
  cursor: pointer; 
  &:hover {
    color: ${Colors.primary} !important;
    transition: all 0.3s ease;
  }
`;

export const Separator = styled.div`
  margin: 0.6rem 1rem 0.6rem 1rem;
  width: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  height: 3.5rem;
  
  @media screen and (max-width: ${maxBrowserWidth}) {
    display: none;
  }
`;

export const InputSearch = styled.input`
  box-sizing: border-box;
  font-family: "Montserrat" !important;
  font-size: 18px;
  width: 50%;
  border-radius: 10px;
`;


export const IconLock = styled(FaLock)`
  font-size: 24px;
  margin: 0 0.4rem;
  cursor: pointer;

  &:hover {
    color: ${Colors.primary} !important;
    transition: all 0.3s ease;
  }
`;

export const IconFaWindowClose = styled(FaWindowClose)`
  font-size: 24px;
  margin: 0 0.4rem;
  cursor: pointer;
  /*color: red !important;*/
`;


export const IconFaWindowCloseSecond = styled(FaWindowClose)`
  font-size: 30px;
  cursor: pointer;
  /*color: red !important;*/
`;

