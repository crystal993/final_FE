import React from "react";
import Header from "../../components/elements/GlobalHeader2";
import Footer from "../../components/elements/GlobalFooter";
import Layout from "../../components/elements/GlobalLayout";
import Update from "../../components/market/update/Update";

const PostingUpdate = () => {
  return (
    <>
      <Layout>
        <Header />
        <Update />
        <Footer />
      </Layout>
    </>
  );
};

export default PostingUpdate;
