import React from "react";
import Header from "../components/elements/GlobalHeader";
import Layout from "../components/elements/GlobalLayout";
import MyPages from "../components/user/MyPage";
const MyPage = () => {
  return (
    <>
      <Layout>
        <Header />
        <MyPages />
      </Layout>
    </>
  );
};

export default MyPage;
