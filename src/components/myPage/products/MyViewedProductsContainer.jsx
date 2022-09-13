import React from "react";
import styled from "styled-components";
import MyViewedProductsList from "./MyViewedProductsList";

const MyViewedProductsContainer = () => {
  return (
    <>
      <SectionWrapper>
        <MyViewedProductsTitle>최근 본 상품</MyViewedProductsTitle>
      </SectionWrapper>
      <MyViewedProductsList />
    </>
  );
};

export default MyViewedProductsContainer;

const SectionWrapper = styled.section`
  padding-top: 9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const MyViewedProductsTitle = styled.h1`
  font-size: 2.4rem;
  margin: 0 2.4rem;
  font-weight: 700;
`;
