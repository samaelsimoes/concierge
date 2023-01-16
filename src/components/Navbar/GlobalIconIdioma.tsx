import i18next from 'i18next';
import { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import { IconLanguage, IconLanguageButton, LanguageMenu } from './Navbar.elements';
import '../Navbar/Navbar.css'
import imagemLogo from '../../assets/lang_icon.svg'

const GlobalIconLanguage: FC = () => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <>
            <Dropdown className="float-right">
                <Dropdown.Toggle variant="" id="dropdown-basic">
                <IconLanguage src={imagemLogo}/>
                </Dropdown.Toggle>
                <Dropdown.Menu className="style-navbar">
                    <Dropdown.Item onClick={() => {
                        i18next.changeLanguage('pt_BR')
                        setShowMenu(false)
                         window.location.reload()
                    }}> Português - BR</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                        i18next.changeLanguage('en_US')
                        setShowMenu(false)
                         window.location.reload()
                    }}> English - EN</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                        i18next.changeLanguage('es_ES')
                        setShowMenu(false)
                         window.location.reload()
                    }}> Español - ES</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}


export default GlobalIconLanguage;