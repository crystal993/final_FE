import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const MainBannerSlide = ({
  itemImgs,
  mobileImgs,
  tabletImgs,
  desktopImgs,
  autoplay = false,
  fade = false,
  autoplaySpeed = 0,
  nextArrow,
  prevArrow,
  mobileWidth,
  tabletWidth,
  desktopWidth,
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
      <Img1 />
      <Img2 />
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  width: ${({ width }) => width};
  margin-bottom: 0.8rem;
  position: relative;
`;

const Img1 = styled.div`
  object-fit: contain;
  background-color: #b192f3;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    background-image: url(${process.env.PUBLIC_URL}/img/desktop.png);
    width: 100%;
    height: 30rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    background-image: url(${process.env.PUBLIC_URL}/img/tablet.png);
    width: 100%;
    height: 18.4rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    background-image: url(${process.env.PUBLIC_URL}/img/mobile.png);
    width: 100%;
    height: 14rem;
  }
`;

const Img2 = styled.div`
  object-fit: contain;
  background-color: #b192f3;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    background-image: url(${process.env.PUBLIC_URL}/img/desktop.png);
    width: 100%;
    height: 30rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    background-image: url(${process.env.PUBLIC_URL}/img/tablet.png);
    width: 100%;
    height: 18.4rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    background-image: url(${process.env.PUBLIC_URL}/img/mobile.png);
    width: 100%;
    height: 14rem;
  }
`;

export default MainBannerSlide;
