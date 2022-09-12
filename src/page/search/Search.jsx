import React from "react";
import Header from "../../components/search/SearchHeader";
import Layout from "../../components/elements/GlobalLayout";
import SearchContainer from "../../components/search/Search";

const Search = () => {
  return (
    <Layout>
      <Header />
      <SearchContainer />
    </Layout>
  );
};

export default Search;
