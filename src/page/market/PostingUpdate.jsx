import React from "react";
import Header from "../../components/elements/GlobalHeader2";
import Layout from "../../components/elements/GlobalLayout";
import Update from "../../components/market/update/Update";

const PostingUpdate = () => {
  return (
    <>
      <Header />
      <Layout>
        <Update />
      </Layout>
    </>
  );
};

export default PostingUpdate;
