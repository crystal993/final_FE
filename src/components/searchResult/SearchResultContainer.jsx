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
      <SectionWrapper></SectionWrapper>
      {searchResultList?.length > 0 ? (
        <>
          <SearchResultTitle>'{keyword}' 검색결과</SearchResultTitle>
          <Select
            optionDatas={option}
            setSelected={setSelected}
            width={"8.8rem"}
            height={"3.2rem"}
            optionWidth={"8.5rem"}
          />
          <SearchItemList searchResultList={searchResultList} />
        </>
      ) : (
        <NoSearchResult>
          검색 결과가 없습니다.
          <br />
          철자를 확인하거나 다시 검색해주세요.
        </NoSearchResult>
      )}
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
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    gap: 0.5rem;
  }
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
  color: ${({ theme }) => theme.darkgray};
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
    font-size: 1.5rem;
  }
  @media (max-width: 380px) {
    /* Mobile */
    font-size: 1.5rem;
  }
`;

export default SearchResultContainer;
