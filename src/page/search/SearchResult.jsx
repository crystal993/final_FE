import React, { useState } from "react";
import Header from "../../components/search/SearchHeader";
import Layout from "../../components/elements/GlobalLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/elements/buttons/AddPostButton";
import SearchResultContainer from "../../components/searchResult/SearchResultContainer";
import GlobalModal from "../../components/elements/GlobalModal";
import Footer from "../../components/elements/GlobalFooter";

const SearchResult = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.userToken);

  const onPathHandler = () => {
    navigate("/market/post");
  };

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      {isModal && <GlobalModal content={"로그인이 필요합니다."} />}
      <Header />
      <Layout>
        <SearchResultContainer />
        {isLogin ? (
          <AddPostButton
            onClick={onPathHandler}
            isLogin={isLogin}
          ></AddPostButton>
        ) : (
          <AddPostButton
            onClick={() => setIsModal((prev) => !prev)}
            isLogin={isLogin}
          ></AddPostButton>
        )}
      </Layout>
      <Footer />
    </>
  );
};

export default SearchResult;
