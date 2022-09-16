import React from "react";
import Header from "../../components/elements/GlobalHeader2";
import Layout from "../../components/elements/GlobalLayout";
import DetailInfo from "../../components/market/detail/DetailInfo";

const Detail = () => {
  return (
    <>
      <Header />
      <Layout>
        <DetailInfo />
      </Layout>
    </>
  );
};

export default Detail;
