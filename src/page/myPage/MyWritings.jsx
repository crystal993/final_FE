import React from "react";
import Footer from "../../components/elements/GlobalFooter";
import Header from "../../components/elements/GlobalHeader2";
import Layout from "../../components/elements/GlobalLayout";
import MyWritingsContainer from "../../components/myPage/writings/MyWritingsContainer";

const MyWritings = () => {
  return (
    <>
      <Header />
      <Layout>
        <MyWritingsContainer />
      </Layout>
      <Footer />
    </>
  );
};

export default MyWritings;
