import React from 'react';
import { Carousel } from "react-bootstrap";

const ListCarousel = ({ colCarouselModel }:any) => {
    return ( 
        <div className="col-lg-8">      
            <Carousel tabIndex={0}>   
                {colCarouselModel?.map((carousel: any, index: any) => {
                    return (
                    <Carousel.Item id={carousel.id + "carrousel"} key={index}>
                        <img
                        className="d-block  style-image-carousel"      
                        src={carousel && carousel.nameImage ?"https://imagens.portobello.com.br/unsafe/fit-in/1920x1080/https://www.portobello.com.br"+ carousel.nameImage : "https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br//template/images/imageNotFound.png"}
                        />                            
                    </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    )
};

export default ListCarousel;