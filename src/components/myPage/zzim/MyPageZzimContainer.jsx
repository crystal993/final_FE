import React from "react";
import styled from "styled-components";
import MyZzimList from "./MyZzimList";

const MyPageZzimContainer = () => {
  return (
    <>
      <SectionWrapper>
        <MyZzimTitle>찜 목록</MyZzimTitle>
      </SectionWrapper>
      <MyZzimList />
    </>
  );
};

export default MyPageZzimContainer;

const SectionWrapper = styled.section`
  width: 100%;
  display: flex;
  margin: 0 auto;
  margin-left: 0.6rem;
  flex-direction: row;
  padding-top: 9rem;
  margin-bottom: 2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const MyZzimTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0.5rem auto;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 70rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 39rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 28rem;
  }
`;
