import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const SimpleSlider = ({ itemImgs }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
  margin-bottom: 1.9rem;
`;

const Img = styled.img`
  width: 100%;
  object-fit: contain;
  background-color: ${({ theme }) => theme.lightgray};
  @media screen and (min-width: 1024px) {
    /* Desktop */
    height: 35.2rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    height: 28.2rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    height: 25.2rem;
  }
`;

export default SimpleSlider;
