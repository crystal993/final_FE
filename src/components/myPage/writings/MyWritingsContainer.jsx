import React from "react";
import styled from "styled-components";
import MyWritingsList from "./MyWritingsList";

const MyWritingsContainer = () => {
  return (
    <>
      <SectionWrapper>
        <MyWritingsTitle>내가 쓴 글</MyWritingsTitle>
      </SectionWrapper>
      <MyWritingsList />
    </>
  );
};

export default MyWritingsContainer;

const SectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    gap: 0.5rem;
  }
`;

const MyWritingsTitle = styled.h1`
  font-size: 2.4rem;
  margin: 0 2.4rem;
  font-weight: 700;
`;
