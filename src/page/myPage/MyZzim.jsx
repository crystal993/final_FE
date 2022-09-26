import React from "react";
import Footer from "../../components/elements/GlobalFooter";
import Header from "../../components/elements/GlobalHeader2";
import MyPageZzimContainer from "../../components/myPage/zzim/MyPageZzimContainer";
import styled from "styled-components";

const MyZzim = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <MyPageZzimContainer />
        <Footer />
      </Wrapper>
    </>
  );
};

export default MyZzim;

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 0rem;
`;
