import React from "react";
import Header from "../../components/elements/GlobalHeader";
import Layout from "../../components/elements/GlobalLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/elements/buttons/AddPostButton";
import SearchItemList from "../../components/search/SearchItemList";

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
        <SearchItemList />
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
