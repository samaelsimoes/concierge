import { useTranslation } from "react-i18next";
import { Button, H1, H4, Paragraph } from "../../globalStyles";
import { ContainerColumn, ContainerRow, Image, ButtonPortoBello } from "./WhoAreWe.elements";

import './WhoAreWe.css'
import { useNavigate } from "react-router-dom";
const WhoAreWe = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateWhoWe = () => {
    navigate('/about');
    window.scrollTo(0, 0)
  };

  return (
    <ContainerRow>
      <ContainerColumn>
        <Image />
      </ContainerColumn> 
      <ContainerColumn style={{ padding: "3rem" }}>
        <H4>{t('a_portobello_section_4')}</H4>
        <Paragraph>
        {t('a_portobello_section_1')}            
        </Paragraph>
        <Paragraph >
        {t('a_portobello_section_2')}
        </Paragraph>
        <ButtonPortoBello width="142px" primary onClick={navigateWhoWe}>
        {t('a_portobello_section_3')}
        </ButtonPortoBello>
      </ContainerColumn>
    </ContainerRow>
  );
};

export default WhoAreWe;
