import React, { useState } from "react";
import Header from "../../components/elements/GlobalHeader";
import Layout from "../../components/elements/GlobalLayout";
import MainContainer from "../../components/market/main/MainContainer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/elements/buttons/AddPostButton";
import GlobalModal from "../../components/elements/GlobalModal";
import MainBanner from "../../components/market/main/MainBanner";
import Footer from "../../components/elements/GlobalFooter";

const Main = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.userToken);

  const onPathHandler = () => {
    navigate("/market/post");
  };

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      {isModal && <GlobalModal content={"로그인이 필요합니다."} />}
      <Header />
      <Layout>
        <MainBanner />
        <MainContainer />
        {isLogin ? (
          <AddPostButton
            onClick={onPathHandler}
            isLogin={isLogin}
          ></AddPostButton>
        ) : (
          <AddPostButton
            onClick={() => setIsModal((prev) => !prev)}
            isLogin={isLogin}
          ></AddPostButton>
        )}
      </Layout>
      <Footer />
    </>
  );
};

export default Main;
