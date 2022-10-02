import React, { useState, useEffect } from "react";
import option from "./Option";
import styled from "styled-components";
import SearchItemList from "./SearchItemList";
import { useDispatch, useSelector } from "react-redux";
import Select from "../elements/GlobalSelect";
import { useParams } from "react-router-dom";
import {
  __itemSearch,
  __itemSearchSortByPopular,
} from "../../redux/modules/searchSlice";

const SearchResultContainer = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const toggleState = useSelector((state) => state.search.toggle);

  const searchResultList = useSelector(
    (state) => state.search.searchResultList
  );
  const [Selected, setSelected] = useState("recent");

  useEffect(() => {
    if (Selected === "recent") {
      dispatch(__itemSearch({ keyword, toggleState }));
    } else if (Selected === "popular") {
      dispatch(__itemSearchSortByPopular({ keyword, toggleState }));
    }
  }, [Selected, dispatch, keyword, toggleState]);

  return (
    <>
      <Wrapper>
        {searchResultList?.length > 0 && keyword != "undefined" ? (
          <>
            <SectionWrapper>
              <SearchResultTitle>'{keyword}' 검색결과</SearchResultTitle>
              <Select
                optionDatas={option}
                setSelected={setSelected}
                width={"8.8rem"}
                height={"3.2rem"}
                optionWidth={"8.5rem"}
              />
            </SectionWrapper>
            <SearchItemList searchResultList={searchResultList} />
          </>
        ) : (
          <SectionsWrapper>
            <NoSearchResult>
              검색 결과가 없습니다.
              <br />
              철자를 확인하거나 다시 검색해주세요.
            </NoSearchResult>
          </SectionsWrapper>
        )}
      </Wrapper>
    </>
  );
};

const SectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 9rem;
  margin-bottom: 3.2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const SectionsWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 9rem;
  margin-bottom: 3.2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0 auto;
`;

const SearchResultTitle = styled.h1`
  font-size: 1.7rem;
  font-weight: 700;
  @media (min-width: 1280px) {
    /* Desktop */
    font-size: 2.4rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    font-size: 2.4rem;
  }
  @media (min-width: 380px) and (max-width: 767px) {
    /* Mobile */
    font-size: 2.1rem;
  }
  @media (max-width: 380px) {
    /* Mobile */
    font-size: 1.7rem;
  }
`;

const NoSearchResult = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
  text-align: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
  color: ${({ theme }) => theme.darkgray};
  @media (min-width: 1280px) {
    /* Desktop */
    font-size: 2.1rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    font-size: 1.8rem;
  }
  @media (min-width: 380px) and (max-width: 767px) {
    /* Mobile */
    font-size: 1.5rem;
  }
  @media (max-width: 380px) {
    /* Mobile */
    font-size: 1.3rem;
  }
`;

const Wrapper = styled.div`
  height: auto;
  @media (min-width: 1280px) {
    /* Desktop */
    min-height: 77vh;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    min-height: 81vh;
  }
  @media (max-width: 767px) {
    /* Mobile */
    min-height: 86.4vh;
  }
`;

export default SearchResultContainer;
