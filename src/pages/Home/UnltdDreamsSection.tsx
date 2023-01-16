import { useTranslation } from "react-i18next";
import { FC } from "react";
import { H1, H4, Paragraph} from "../../globalStyles";
import {
  ContainerColumn,
  MainImage,
  MainThumbnail,
  Side,
  Side2,
  Stylep,
  ContainerHome,
  Thumb,
  Thumb2,
  Thumb3,
  Thumb4,
  Thumb5,
  Thumb6,
  Thumbnails,
  LogUNLTD
} from "./UnltdDreamsSection.elements";




const UnltdDreamsSection: FC = () => {
  

  const { t } = useTranslation();
  return (
    <ContainerHome>
      <Side>
        <LogUNLTD />
        
        <Paragraph style={{ marginTop: "2rem", marginRight: "3rem" }}>
          {t('untld_dreams_section_1')}       
        </Paragraph>
        <Paragraph style={{ marginTop: "0rem", marginRight: "3rem" }}>
        {t('untld_dreams_section_2')} 
        </Paragraph>
        <Thumbnails>
          <Thumb />
          <Thumb2 />
          <Thumb3 />
        </Thumbnails>

        <Thumbnails>
          <Thumb4 />
          <Thumb5 />
          <Thumb6 />
        </Thumbnails>
      </Side>
      
      <Side2 style={{ alignItems: "end" }}>
        <MainThumbnail>
          <MainImage />
          <ContainerColumn>
            <H4>{t('slabs_section_8')}</H4>
            <Paragraph>
              <Stylep> 
              {t('slabs_section_1')}
              </Stylep>
              <Stylep> 
              {t('slabs_section_2')} 
              </Stylep>
              <Stylep> 
              {t('slabs_section_3')}
              </Stylep>
              <Stylep>
              {t('slabs_section_4')} 
              </Stylep>
              <Stylep>
              {t('slabs_section_5')} 
              </Stylep>
              <Stylep>
              {t('slabs_section_6')} 
              </Stylep>
              <Stylep>{t('slabs_section_7')}</Stylep>
            </Paragraph>
          </ContainerColumn>
        </MainThumbnail>
      </Side2>
    </ContainerHome>
  );
};

export default UnltdDreamsSection;
