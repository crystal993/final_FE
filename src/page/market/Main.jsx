import React from "react";
import Header from "../../components/elements/GlobalHeader";
import Layout from "../../components/elements/GlobalLayout";
import MainContainer from "../../components/market/main/MainContainer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/elements/buttons/AddPostButton";

const Main = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.userToken);

  const onPathHandler = () => {
    navigate("/market/post");
  };

  return (
    <>
      <Header />
      <Layout>
        <MainContainer />
        {isLogin && (
          <>
            <AddPostButton onClick={onPathHandler}></AddPostButton>
          </>
        )}
      </Layout>
    </>
  );
};

export default Main;
