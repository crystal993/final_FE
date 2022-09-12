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
        <SearchResultTitle>멍냥마켓</SearchResultTitle>
        <Select optionDatas={option} setSelected={setSelected} />
      </SectionWrapper>
      <SearchItemList searchResultList={searchResultList} />
    </>
  );
};

const SectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
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
  font-size: 2.4rem;
  margin: 0 2.4rem;
  font-weight: 700;
`;

export default SearchResultContainer;
