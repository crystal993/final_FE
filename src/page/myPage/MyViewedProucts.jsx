import React from "react";
import Footer from "../../components/elements/GlobalFooter";
import Header from "../../components/elements/GlobalHeader2";
import MyViewedProductsContainer from "../../components/myPage/products/MyViewedProductsContainer";
import styled from "styled-components";

const MyViewedProucts = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <MyViewedProductsContainer />
      </Wrapper>
      <Footer />
    </>
  );
};

export default MyViewedProucts;

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 0rem;
`;
