import React from "react";
import Header from "../../components/elements/GlobalHeader";
import Footer from "../../components/elements/GlobalFooter";
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
