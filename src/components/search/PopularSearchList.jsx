import React, { useEffect } from "react";
import styled from "styled-components";
import Keyword from "./PopularSearchKeyword";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { __getPopularKeywords } from "../../redux/modules/searchSlice";

const PopularSearchList = () => {
  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.search.popularKeywordList);

  useEffect(() => {
    dispatch(__getPopularKeywords());
  }, []);

  return (
    <PopularSearchWrapper>
      {keywords?.map((keyword) => {
        return <Keyword keyword={keyword.searchWord} key={uuidv4()} />;
      })}
    </PopularSearchWrapper>
  );
};

export default PopularSearchList;

const PopularSearchWrapper = styled.div`
  margin-bottom: 4.6rem;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
