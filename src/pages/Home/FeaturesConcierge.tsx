import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ICON_FINANCIAL from "../../assets/ICON_FINANCIAL.svg";
import ICON_INVENTORY from "../../assets/ICON_INVENTORY.svg";
import ICON_MARKETING from "../../assets/ICON_MARKETING.svg";
import ICON_ORDER from "../../assets/ICON_ORDER.svg";
import ICON_SAMPLE from "../../assets/ICON_SAMPLE.svg";
import ICON_TECH_AREA from "../../assets/ICON_TECH_AREA.svg";
import { H1, H4, Paragraph } from "../../globalStyles";
import { ThumbContainer } from "./WhoAreWe.elements";
import {
  Container,
  ContainerColumn,
  ContainerColumnText,
  FeatureContainer,
  FeatureIcon,
} from "./FeaturesConcierge.elements";

const FeaturesConcierge: FC = () => {
  interface Features {
    img: string;
    title: string;
    desription: string;
    css: string;
  }

  const { t } = useTranslation();
  const features: Features[] = [  
    {
      img: ICON_SAMPLE,
      title: t('Acesso_section7'),
      desription:
      t('Acesso_section2'),
      css: "white;"
    },   
    {
      img: ICON_ORDER,
      title: t('Acesso_section8'),
      desription:
      t('Acesso_section1'),
        css: "white;"
    },
    {
      img: ICON_FINANCIAL,
      title: t('Acesso_section9'),
      desription:
      t('Acesso_section3'),
      css: "#e7e7e7"
    },
    {
      img: ICON_TECH_AREA,
      title: t('Acesso_section10'),
      desription:
        "",
      css: "#e7e7e7"
    },
    {
      img: ICON_MARKETING,
      title: "Marketing",
      desription:
      t('Acesso_section5'),
      css: "White"
    },
    {
      img: ICON_INVENTORY,
      title: t('Acesso_section11'),
      desription:
      t('Acesso_section4'),
      css: "white;"      
    },
  ];

  const navigate = useNavigate();
  const navigateEstoque = () => {
    navigate('/inventory');
    window.scrollTo(0, 0)
  };
  const navigateEmbarque = () => {
    navigate('/shipments');
    window.scrollTo(0, 0);
  };
  const navigateMyOrders = () => {
    navigate('/myorders');
    window.scrollTo(0, 0);
  } 
  const navigateMarketing = () => {
    navigate('/marketing');
    window.scrollTo(0, 0);
  } 

  const functionCard = (feature:any) => {
    if (feature.title == 'Marketing') {
      return (
        <FeatureContainer onClick={navigateMarketing} key={feature.title} style={{
          background: feature.css,
          cursor: "pointer"
          }}
        >   
          <FeatureIcon src={feature.img} />
          <ContainerColumnText>
            <br />
            <H4 style={{ textShadow: "0.4px 0.4px black" }}>
              {" "}
              {feature.title}
            </H4>
            <br />
            <Paragraph>{feature.desription}</Paragraph>
          </ContainerColumnText>
        </FeatureContainer>
      );
    } else if (feature.title == (t("Acesso_section11"))) {
      return (
        <FeatureContainer onClick={navigateEstoque} key={feature.title} style={{
          background: feature.css,
          cursor: "pointer"
          }}
        >
          
          <FeatureIcon src={feature.img} />                  

          <ContainerColumnText>
            <br />
            <H4 style={{ textShadow: "0.4px 0.4px black" }}>
              {" "}
              {feature.title}
            </H4>
            <br />
            <Paragraph>{feature.desription}</Paragraph>
          </ContainerColumnText>
        </FeatureContainer>
      );
    } else if(feature.title == t('Acesso_section7') || feature.title == t('Acesso_section11')) {
      return (
        <FeatureContainer onClick={navigateEmbarque} key={feature.title} style={{
          background: feature.css,
          cursor: "pointer"
          }}
        >   
          <FeatureIcon src={feature.img} />
          <ContainerColumnText>
            <br />
            <H4 style={{ textShadow: "0.4px 0.4px black" }}>
              {" "}
              {feature.title}
            </H4>
            <br />
            <Paragraph>{feature.desription}</Paragraph>
          </ContainerColumnText>
        </FeatureContainer>
      )
    } else if(feature.title == t('Acesso_section8')) {
      return (
        <FeatureContainer onClick={navigateMyOrders} key={feature.title} style={{
          background: feature.css,
          cursor: "pointer"
          }}
        >   
          <FeatureIcon src={feature.img} />
          <ContainerColumnText>
            <br />
            <H4 style={{ textShadow: "0.4px 0.4px black" }}>
              {" "}
              {feature.title}
            </H4>
            <br />
            <Paragraph>{feature.desription}</Paragraph>
          </ContainerColumnText>
        </FeatureContainer>
      )
    } else {
      return (
        <FeatureContainer key={feature.title} style={{
          background: feature.css,
          }}
        > 
          <ThumbContainer> {t('Acesso_section12')}</ThumbContainer>  
          <FeatureIcon src={feature.img} />
          <ContainerColumnText>
            <br />
            <H4 style={{ textShadow: "0.4px 0.4px black" }}>
              {" "}
              {feature.title}
            </H4> 
            <br />
            <Paragraph>{feature.desription}</Paragraph>
          </ContainerColumnText>
        </FeatureContainer>
      )
    }
  };

  return (
    <ContainerColumn
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <H4 style={{ height: "100%", marginBottom: "3rem" }}>
        {t('Acesso_section6')}
      </H4>
      <Container>
        {features.map((feature) => {
          return (              
            functionCard(feature)
          );
        })}
      </Container>
    </ContainerColumn>
  );
};

export default FeaturesConcierge;
