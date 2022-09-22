import React from "react";
import ImgSlider from "../../elements/GlobalImgSlider2";
import styled from "styled-components";
import NextArrowButton from "../../elements/buttons/NextArrowButton";
import PrevArrowButton from "../../elements/buttons/PrevArrowButton";

const MainBanner = () => {
  return (
    <>
      <ImgWrapper>
        <ImgSlider
          itemImgs={[
            "https://i.postimg.cc/QxKVp4Hp/2.png",
            "https://i.postimg.cc/FKzqPsBq/3.png",
          ]}
          fade={true}
          autoplaySpeed={3000}
          autoplay={true}
          prevArrow={<PrevArrowButton />}
          nextArrow={<NextArrowButton />}
        />
      </ImgWrapper>
    </>
  );
};

const ImgWrapper = styled.div`
  padding: 8.4rem 1.6rem 0rem 1.6rem;
`;

export default MainBanner;
