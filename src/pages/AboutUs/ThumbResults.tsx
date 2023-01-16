import { FC, MouseEventHandler, useState } from "react";
import {
  Container,
  LoadIconContainer,
  MainContainer
} from "./ThumbResults.elements";

const ThumbResults: FC = () => {
  const collectionModel: CollectionModel[] = [
    { id: "1", img: "", title: "Oh!Take" },
    { id: "2", img: "", title: "Charleston" },
    { id: "3", img: "", title: "Oh!Take" },
    { id: "4", img: "", title: "Charleston" },
    { id: "5", img: "", title: "Oh!Take" },
    { id: "6", img: "", title: "Charleston" },
  ];

  const [loadProducts, setLoadProducts] = useState<boolean>(false);
  const [products, setProducts] = useState<CollectionModel[]>(collectionModel);

  const handleClickLoadProducts: MouseEventHandler = () => {
    setLoadProducts(!loadProducts);

    setTimeout(() => {
      setLoadProducts(false);
      //lOAD mORE
      const collectionModelMore: CollectionModel[] = [
        ...products,
        { id: "7", img: "", title: "Oh!Take" },
        { id: "8", img: "", title: "Charleston" },
        { id: "9", img: "", title: "Oh!Take" },
        { id: "10", img: "", title: "Charleston" },
        { id: "11", img: "", title: "Oh!Take" },
        { id: "12", img: "", title: "Charleston" },
      ];
      setProducts(collectionModelMore);
    }, 1500);
  };

  interface CollectionModel {
    id: string;
    img: string;
    title: string;
  }

  return (
    <MainContainer>
      <Container>
      </Container>
      <LoadIconContainer>
      </LoadIconContainer>
    </MainContainer>
  );
};

export default ThumbResults;
