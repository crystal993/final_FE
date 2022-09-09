import React from "react";
import Header from "../components/elements/header/SearchHeader";
import Layout from "../components/elements/GlobalLayout";
import SearchContainer from "../components/search/Search";

const Search = () => {
  return (
    <Layout>
      <Header />
      <SearchContainer />
    </Layout>
  );
};

export default Search;
