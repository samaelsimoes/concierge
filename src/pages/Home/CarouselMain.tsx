import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

import { ContainerColumn, ImageSlider } from "./CarouselMain.elements";
import { versionReact } from "../../components/Version/Version";

const CarouselMain = ({ listBannerSup }: any) => {
  return (
    <ContainerColumn>
      <Carousel>
        {listBannerSup?.map((item: any, index: number) => {
          return (
            <Carousel.Item key={index}>
              <ImageSlider
                style={{ width: "100vw" }}
                alt={item.id}
                src={`https://portobello.com.br/concierge/images/${item.image}` + '?v='+ versionReact()}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </ContainerColumn>
  );
};

export default CarouselMain;
