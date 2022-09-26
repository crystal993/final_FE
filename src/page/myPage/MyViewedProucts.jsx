import React from "react";
import Footer from "../../components/elements/GlobalFooter";
import Header from "../../components/elements/GlobalHeader2";
import MyViewedProductsContainer from "../../components/myPage/products/MyViewedProductsContainer";

const MyViewedProucts = () => {
  return (
    <>
      <Header />
      <MyViewedProductsContainer />
      <Footer />
    </>
  );
};

export default MyViewedProucts;
