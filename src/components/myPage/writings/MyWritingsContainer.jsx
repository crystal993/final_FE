import React from "react";
import styled from "styled-components";
import MyWritingsList from "./MyWritingsList";

const MyWritingsContainer = () => {
  return (
    <>
      <Wrapper>
        <SectionWrapper>
          <MyWritingsTitle>내가 쓴 글</MyWritingsTitle>
        </SectionWrapper>
        <MyWritingsList />
      </Wrapper>
    </>
  );
};

export default MyWritingsContainer;

const SectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10rem;
  margin-bottom: 1rem;
`;

const MyWritingsTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
`;

const Wrapper = styled.div`
  height: auto;
  @media (min-width: 1280px) {
    /* Desktop */
    min-height: 77vh;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    min-height: 78.5vh;
  }
  @media (max-width: 767px) {
    /* Mobile */
    min-height: 86.5vh;
  }
`;
