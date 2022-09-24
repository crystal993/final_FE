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
  width = "100%",
  mobileHeight = "14rem",
  tabletHeight = "22rem",
  desktopHeight = "33rem",
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
          <Img
            src={url}
            key={uuidv4()}
            alt={idx + 1}
            width={width}
            mobileHeight={mobileHeight}
            tabletHeight={tabletHeight}
            desktopHeight={desktopHeight}
          ></Img>
        ))}
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  width: ${({ width }) => width};
  margin-bottom: 1.9rem;
  position: relative;
`;

const Img = styled.img`
  object-fit: fill;
  background-color: ${({ theme }) => theme.lightgray};
  @media screen and (min-width: 1024px) {
    /* Desktop */
    height: ${({ desktopHeight }) => desktopHeight};
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    height: ${({ tabletHeight }) => tabletHeight};
  }

  @media (max-width: 767px) {
    /* Mobile */
    height: ${({ mobileHeight }) => mobileHeight};
  }
`;

export default GlobalImgSlider2;
