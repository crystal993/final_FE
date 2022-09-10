import React from "react";
import Header from "../../components/elements/GlobalHeader";
import Layout from "../../components/elements/GlobalLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/elements/buttons/AddPostButton";
import SearchResultContainer from "../../components/searchResult/SearchResultContainer";

const SearchResult = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.userToken);

  const onPathHandler = () => {
    navigate("/market/post");
  };
  return (
    <>
      <Layout>
        <Header />
        <SearchResultContainer />
        {isLogin && (
          <>
            <AddPostButton onClick={onPathHandler}></AddPostButton>
          </>
        )}
      </Layout>
    </>
  );
};

export default SearchResult;
