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
      <SectionWrapper>
        <SearchResultTitle>'{keyword}' 검색결과</SearchResultTitle>
        <Select
          optionDatas={option}
          setSelected={setSelected}
          width={"8.8rem"}
          height={"3.2rem"}
          optionWidth={"8.6rem"}
        />
      </SectionWrapper>
      {searchResultList?.length > 0 ? (
        <SearchItemList searchResultList={searchResultList} />
      ) : (
        <NoSearchResult>검색 결과가 없습니다.</NoSearchResult>
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
  font-size: 2rem;
  margin: 0 2.4rem;
  font-weight: 700;
`;

const NoSearchResult = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.darkgray};
`;

export default SearchResultContainer;
