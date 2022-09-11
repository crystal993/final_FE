import React from "react";
import Layout from "../../components/elements/GlobalLayout";
import Header from "../../components/elements/GlobalHeader2";
import MyViewedProductsContainer from "../../components/myPage/products/MyViewedProductsContainer";

const MyViewedProucts = () => {
  return (
    <>
      <Layout>
        <Header path={"/mypage"} />
        <MyViewedProductsContainer />
      </Layout>
    </>
  );
};

export default MyViewedProucts;
