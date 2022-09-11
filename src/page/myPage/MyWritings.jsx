import React from "react";
import Header from "../../components/elements/GlobalHeader2";
import Layout from "../../components/elements/GlobalLayout";
import MyWritingsContainer from "../../components/myPage/writings/MyWritingsContainer";

const MyWritings = () => {
  return (
    <Layout>
      <Header />
      <MyWritingsContainer />
    </Layout>
  );
};

export default MyWritings;
