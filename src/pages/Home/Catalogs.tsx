import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { H4, Paragraph, Button } from "../../globalStyles";
import {
  ContainerColumn,
  ContainerRow,
  ImageCatalogs,
} from "./Catalogs.elements";

const Catalogs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateHomee = () => {
    // 👇️ navigate to /
    navigate('/catalog');
    window.scrollTo(0, 0)
  };

  return (
    <ContainerRow>
      <ContainerColumn>
        <H4>{t('catalogues_section1')}</H4>
        <Paragraph>
        {t('catalogues_section2')}
        </Paragraph>

        <Button width="142px" primary onClick={navigateHomee}>
        {t('catalogues_section3') }
        </Button>
      </ContainerColumn>
      <ContainerColumn>
        <ImageCatalogs />
      </ContainerColumn>
    </ContainerRow>
  );
};

export default Catalogs;
