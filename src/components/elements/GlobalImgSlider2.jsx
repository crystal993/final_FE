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
      {itemImgs &&
        itemImgs.map((url, idx) => (
          <Img
            src={url}
            // srcSet={`${mobileImgs[idx]} 328w, ${tabletImgs[idx]} 764w, ${desktopImgs[idx]} 1280w`}
            key={uuidv4()}
            alt={idx + 1}
            mobileWidth={mobileWidth}
            tabletWidth={tabletWidth}
            desktopWidth={desktopWidth}
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
  margin-bottom: 0.8rem;
  position: relative;
`;

const Img = styled.img`
  object-fit: contain;
  background-color: #fafafa;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: ${({ desktopWidth }) => desktopWidth};
    height: ${({ desktopHeight }) => desktopHeight};
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: ${({ tabletWidth }) => tabletWidth};
    height: ${({ tabletHeight }) => tabletHeight};
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: ${({ mobileWidth }) => mobileWidth};
    height: ${({ mobileHeight }) => mobileHeight};
  }
`;

const Source = styled.source``;

export default GlobalImgSlider2;
