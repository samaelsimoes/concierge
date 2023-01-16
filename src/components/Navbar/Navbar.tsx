import { FC, useState } from "react";
import { FaBars, FaNewspaper, FaTimes, FaUser } from "react-icons/fa";
import {
  IconFaWindowClose,
  IconUser,
  MobileIcon,
  MobileResponsive,
  Nav,
  NavbarContainer,
  NavIcon,
  NavItem,
  NavLinks,
  NavLogo,
  NavMenu,
  Separator,
} from "./Navbar.elements";

import { useKeycloak, withKeycloak } from "@react-keycloak/web";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IconContext } from "react-icons/lib";
import { Colors } from "../../globalStyles";
import LoginStub from "../../stub/LoginStub";
import ModalFavoritos from "./../ModalFavoritos/ModalFavoritos";
import GlobalIconLanguage from "./GlobalIconIdioma";
import "./Navbar.elements.css";

import loginIconImage from "../../assets/login_icon.svg";

const Navbar: FC = () => {
  const { t } = useTranslation();
  const [click, setClick] = useState<boolean>(false);
  const { keycloak, initialized } = useKeycloak();

  interface MenuLinks {
    id: string;
    text: string;
    linkTo: string;
    break?: boolean;
  }

  const links: MenuLinks[] = [
    { id: "1", text: "Home", linkTo: "/" },
    { id: "2", text: t("titulo_cole"), linkTo: "/collections" },
    { id: "3", text: t("catalogues_section1"), linkTo: "/catalog" },
    { id: "4", text: t("a_portobello_section_4"), linkTo: "/about" },
  ];

  const linksComercial: MenuLinks[] = [
    { id: "1", text: "Home", linkTo: "/" },
    { id: "2", text: t("titulo_cole"), linkTo: "/collections" },
    { id: "3", text: t("Acesso_section11"), linkTo: "/inventory" },
    { id: "4", text: "Marketing", linkTo: "/marketing" },
    { id: "5", text: t("catalogues_section1"), linkTo: "/catalog" },
    { id: "6", text: t("Acesso_section7"), linkTo: "/shipments" },
    { id: "7", text: t("Acesso_section8"), linkTo: "/myorders" },
    { id: "8", text: t("a_portobello_section_4"), linkTo: "/about" },
  ];

  const linksMarketing: MenuLinks[] = [
    { id: "1", text: "Home", linkTo: "/" },
    { id: "2", text: t("titulo_cole"), linkTo: "/collections" },
    { id: "4", text: "Marketing", linkTo: "/marketing" },
    { id: "5", text: t("catalogues_section1"), linkTo: "/catalog" },
    { id: "10", text: t("a_portobello_section_4"), linkTo: "/about" },
  ];

  const linksFinanceiroeColaborador: MenuLinks[] = [
    { id: "1", text: "Home", linkTo: "/" },
    { id: "2", text: t("titulo_cole"), linkTo: "/collections" },
    { id: "3", text: t("Acesso_section11"), linkTo: "/inventory" },
    { id: "4", text: "Marketing", linkTo: "/marketing" },
    { id: "5", text: t("catalogues_section1"), linkTo: "/catalog" },
    { id: "7", text: t("Acesso_section8"), linkTo: "/myorders" },
    { id: "6", text: t("Acesso_section7"), linkTo: "/shipments" },
    { id: "8", text: t("Acesso_section9"), linkTo: "/financer" },
    /*{ id: "9", text: t("Acesso_section10"), linkTo: "#" },*/
    { id: "10", text: t("a_portobello_section_4"), linkTo: "/about" },
  ];

  let linksDeTela: MenuLinks[] = links;
  if (keycloak.authenticated) {
    if (
      keycloak.hasResourceRole("financeiro") ||
      keycloak.hasResourceRole("colaborador-pb")
    ) {
      linksDeTela = linksFinanceiroeColaborador;
    }
    if (keycloak.hasResourceRole("comercial")) {
      linksDeTela = linksComercial;
    }
    if (keycloak.hasResourceRole("marketing")) {
      linksDeTela = linksMarketing;
    }
  }

  const valNavItens = (idNav: any, click: any) => {
    setClick(!click);
  };


  return (
    <div className="style-navbar-padding">
      <Nav>
        <IconContext.Provider value={{ color: Colors.primary }}>
          <NavbarContainer>
            <NavLogo to="/">
              <NavIcon
                style={{ marginRight: linksDeTela.length <= 5 ? "5rem" : "" }}
              />
            </NavLogo>

            <MobileResponsive>
              <div className="col-dad-icons-mobile">
                <div className="col-global">
                  <GlobalIconLanguage></GlobalIconLanguage>
                </div>
                <div className="col-favorito nav-margin-top">
                  <ModalFavoritos></ModalFavoritos>
                </div>
                <div className="col-login nav-margin-top">
                  {keycloak.authenticated == false && <LoginStub />}
                </div>
                <div className="col-hamburguer">
                  <MobileIcon onClick={() => setClick(!click)}>
                    {click ? <FaTimes /> : <FaBars />}
                  </MobileIcon>
                </div>
              </div>
            </MobileResponsive>

            <NavMenu
              justify="center"
              onclick={() => setClick(!click)}
              click={click}
              className="styleMobileNav"
            >
              {linksDeTela.map((link) => {
                let param: any = link.linkTo == "#" ? "style-nav-point" : "";
                let paramtag: any =
                  link.linkTo == "#" ? " style-nav-point-tag" : "";

                return (
                  <NavItem key={`nav_item_menu_${link.id}`} className={param}>
                    <NavLinks
                      className={paramtag}
                      key={`menu_${link.id}`}
                      to={link.linkTo}
                      onClick={() => valNavItens(link.id, click)}
                    >
                      {link.text}
                    </NavLinks>
                    {link.break ? <Separator /> : ""}
                  </NavItem>
                );
              })}
              <li className="sc-igHpSv MeizD styleMobileIcons">
                <div className="row d-flex align-items-center">
                  <div className="col-sm-4 col-md-4  hidden-responsive-colum">
                    <div className="d-flex justify-content-center">
                      <GlobalIconLanguage></GlobalIconLanguage>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4  hidden-responsive-colum">
                    <div className="d-flex justify-content-center">
                      <ModalFavoritos></ModalFavoritos>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4  hidden-responsive-colum">
                    <div className="hidden xl:flex items-center space-x-5 d-flex justify-content-center">
                      <div className="hover:text-gray-200">
                        {!keycloak.authenticated && (
                          <div className="">
                            <LoginStub />
                          </div>
                        )}
                        {keycloak.authenticated && (
                          <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                              <IconUser
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/IconUsuario.png"
                                }
                              />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <div
                                style={{ minWidth: "20vw", padding: "1rem" }}
                              >
                                <div>
                                  {t("modal_perfil_2")},{" "}
                                  <b>
                                    {keycloak.idTokenParsed?.["given_name"]}
                                  </b>
                                </div>
                                <div style={{ marginTop: "5px" }}>
                                  {t("modal_perfil_3")}
                                </div>
                                <div
                                  className="text-uppercase"
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    marginTop: "5px",
                                  }}
                                >
                                  <FaUser />
                                  {keycloak.idTokenParsed?.["client_group"]}
                                </div>
                                <div
                                  className="text-uppercase"
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                  }}
                                >
                                  <FaNewspaper />
                                  {keycloak.idTokenParsed?.["client_roles"]}
                                </div>
                              </div>

                              <Dropdown.Divider />
                              <Dropdown.Item onClick={() => keycloak.logout()}>
                                <IconFaWindowClose />
                                {t("modal_perfil_4")}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </NavMenu>
          </NavbarContainer>
        </IconContext.Provider>
      </Nav>
    </div>
  );
};

export default Navbar;
