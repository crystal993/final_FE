import React from "react";
import Header from "../../components/elements/GlobalHeader2";
import Layout from "../../components/elements/GlobalLayout";
import Create from "../../components/market/create/Create";

const Posting = () => {
  return (
    <>
      <Header />
      <Layout>
        <Create />
      </Layout>
    </>
  );
};

export default Posting;
