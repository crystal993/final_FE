import React from "react";
import Header from "../../components/elements/GlobalHeader2";
import Layout from "../../components/elements/GlobalLayout";
import DetailInfo from "../../components/market/detail/DetailInfo";

const Detail = () => {
  return (
    <>
      <Layout>
        <Header />
        <DetailInfo />
      </Layout>
    </>
  );
};

export default Detail;
