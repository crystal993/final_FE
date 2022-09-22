import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const GlobalImgSlider2 = ({
  itemImgs,
  autoplay = false,
  fade = false,
  autoplaySpeed = 0,
  nextArrow,
  prevArrow,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: fade,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    lazyLoad: true,
    nextArrow: nextArrow,
    prevArrow: prevArrow,
  };
  return (
    <StyledSlider {...settings}>
      {itemImgs &&
        itemImgs.map((url, idx) => (
          <Img src={url} key={uuidv4()} alt={idx + 1}></Img>
        ))}
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  width: 100%;
  margin-bottom: 1.9rem;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  object-fit: fill;
  background-color: ${({ theme }) => theme.lightgray};
  @media screen and (min-width: 1024px) {
    /* Desktop */
    height: 33rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    height: 22rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    height: 14rem;
  }
`;

export default GlobalImgSlider2;
