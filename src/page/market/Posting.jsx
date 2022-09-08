import React from "react";
import Footer from "../../components/elements/GlobalFooter";
import Header from "../../components/elements/GlobalHeader2";
import Layout from "../../components/elements/GlobalLayout";
import Create from "../../components/market/create/Create";

const Posting = () => {
  return (
    <>
      <Layout>
        <Header />
        <Create />
        <Footer />
      </Layout>
    </>
  );
};

export default Posting;
