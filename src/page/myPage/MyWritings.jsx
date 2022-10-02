import React from "react";
import Footer from "../../components/elements/GlobalFooter";
import Header from "../../components/elements/GlobalHeader2";
import Layout from "../../components/elements/GlobalLayout";
import MyWritingsContainer from "../../components/myPage/writings/MyWritingsContainer";
import styled from "styled-components";

const MyWritings = () => {
  return (
    <>
      <Header IconType={"ArrowBack"} />
      <Wrapper>
        <Layout>
          <MyWritingsContainer />
        </Layout>
      </Wrapper>
      <Footer />
    </>
  );
};

export default MyWritings;

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 0rem;
`;
