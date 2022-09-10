import React, { useEffect } from "react";
import styled from "styled-components";
import Keyword from "./PopularSearchKeyword";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { __getPopularKeywords } from "../../../redux/modules/searchSlice";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const PopularSearchList = () => {
  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.search.popularKeywordList);

  useEffect(() => {
    dispatch(__getPopularKeywords());
  }, []);

  const SwiperBreakPoints = {
    499: {
      width: 499,
      slidesPerView: 3,
      spaceBetween: -180,
    },
    640: {
      width: 640,
      slidesPerView: 3,
      spaceBetween: -180,
    },
    767: {
      width: 767,
      slidesPerView: 5,
      spaceBetween: 0,
    },
    850: {
      width: 850,
      slidesPerView: 4,
      spaceBetween: -180,
    },
    1024: {
      width: 1024,
      slidesPerView: 5,
      spaceBetween: -250,
    },
    1500: {
      width: 1500,
      slidesPerView: 5,
      spaceBetween: -300,
    },
  };
  console.log(keywords);
  return (
    <PopularSearchWrapper>
      <Swiper breakpoints={SwiperBreakPoints}>
        {keywords?.map((keyword) => {
          return (
            <>
              <SwiperSlide key={keyword.searchWord}>
                <Keyword keyword={keyword.searchWord} />
              </SwiperSlide>
            </>
          );
        })}
        <SwiperSlide> </SwiperSlide>
        <SwiperSlide> </SwiperSlide>
      </Swiper>
    </PopularSearchWrapper>
  );
};

export default PopularSearchList;

const PopularSearchWrapper = styled.div`
  margin-bottom: 4.6rem;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
