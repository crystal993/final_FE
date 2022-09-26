import React from "react";
import Header from "../../components/elements/GlobalHeader";
import MyPages from "../../components/myPage/MyPage";
import Footer from "../../components/elements/GlobalFooter";
import styled from "styled-components";

const MyPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <MyPages />
      </Wrapper>
      <Footer />
    </>
  );
};

export default MyPage;

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 0rem;
`;
