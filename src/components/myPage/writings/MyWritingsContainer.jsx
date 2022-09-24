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
  padding-top: 10rem;
  margin-bottom: 1rem;
`;

const MyWritingsTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
`;
