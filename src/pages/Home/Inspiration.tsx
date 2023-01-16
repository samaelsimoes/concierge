import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { H1 } from "../../globalStyles";
import { Image, Container, TextOverImage } from "./Inspiration.elements";

const Inspiration: FC = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Image />
      <TextOverImage>
        <H1 style={{ color: "white" }}> {t('Inspira_1')}</H1>
      </TextOverImage>
    </Container>
  );
};

export default Inspiration;
