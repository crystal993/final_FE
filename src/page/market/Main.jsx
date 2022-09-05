import React from "react";
import Header from "../../components/elements/GlobalHeader";
import Footer from "../../components/elements/GlobalFooter";
import Layout from "../../components/elements/GlobalLayout";
import MainContainer from "../../components/market/main/MainContainer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Main = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.userToken);
  console.log(isLogin);
  return (
    <>
      <Layout>
        <Header />
        <MainContainer />
        {isLogin && (
          <>
            <AddPostButton
              onClick={() => {
                navigate("/market/post");
              }}
            >
              +
            </AddPostButton>
          </>
        )}

        <Footer />
      </Layout>
    </>
  );
};

const AddPostButton = styled.button`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  border: none;
  position: fixed;

  @media (min-width: 1024px) {
    right: 10%;
    bottom: 5%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    right: 7%;
    bottom: 5%;
  }
  @media (max-width: 767px) {
    right: 5%;
    bottom: 5%;
  }
`;

export default Main;
