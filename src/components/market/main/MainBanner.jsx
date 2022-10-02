import React from "react";
import MainBannerSlide from "./MainBannerSlide";
import styled from "styled-components";
import NextArrowButton from "../../elements/buttons/NextArrowButton";
import PrevArrowButton from "../../elements/buttons/PrevArrowButton";

const MainBanner = () => {
  return (
    <>
      <ImgWrapper>
        <MainBannerSlide
          fade={true}
          autoplaySpeed={5000}
          autoplay={true}
          prevArrow={<PrevArrowButton />}
          nextArrow={<NextArrowButton />}
        />
      </ImgWrapper>
    </>
  );
};

const ImgWrapper = styled.div`
  padding: 8.4rem 0rem 0rem 0rem;
`;

export default MainBanner;
