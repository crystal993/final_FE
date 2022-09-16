import React, { useEffect } from "react";
import styled from "styled-components";
import Keyword from "./PopularSearchKeyword";
import { useDispatch, useSelector } from "react-redux";
import { __getPopularKeywords } from "../../../redux/modules/searchSlice";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PopularSearchList = () => {
  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.search.popularKeywordList);

  useEffect(() => {
    dispatch(__getPopularKeywords());
  }, []);

  const SwiperBreakPoints = {
    499: {
      width: 580,
      slidesPerView: 3,
    },
    640: {
      width: 820,
      slidesPerView: 3,
    },
    767: {
      width: 940,
      slidesPerView: 5,
    },
    850: {
      width: 1030,
      slidesPerView: 4,
    },
    1024: {
      width: 1680,
      slidesPerView: 5,
    },
    1500: {
      width: 1780,
      slidesPerView: 5,
    },
  };
  return (
    <PopularSearchWrapper>
      <Swiper breakpoints={SwiperBreakPoints}>
        {keywords?.map((keyword) => {
          return (
            <>
              <SwiperSlide key={uuidv4()}>
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
  flex-wrap: nowrap;
`;
