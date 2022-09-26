import React, { useState } from "react";
import Header from "../../components/search/SearchHeader";
import Layout from "../../components/elements/GlobalLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/elements/buttons/AddPostButton";
import SearchResultContainer from "../../components/searchResult/SearchResultContainer";
import GlobalModal from "../../components/elements/GlobalModal";
import styled from "styled-components";
import Footer from "../../components/elements/GlobalFooter";

const SearchResult = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.userToken);
  const searchResultList = useSelector(
    (state) => state.search.searchResultList
  );
  const onPathHandler = () => {
    navigate("/market/post");
  };

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Wrapper>
        {isModal && <GlobalModal content={"로그인이 필요합니다."} />}
        <Header />
        <Layout>
          <SearchResultContainer />
          {searchResultList.length !== 0 ? (
            isLogin ? (
              <AddPostButton
                onClick={onPathHandler}
                isLogin={isLogin}
              ></AddPostButton>
            ) : (
              <AddPostButton
                onClick={() => setIsModal((prev) => !prev)}
                isLogin={isLogin}
              ></AddPostButton>
            )
          ) : null}
        </Layout>
      </Wrapper>
      <Footer />
    </>
  );
};

export default SearchResult;

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 0rem;
`;
