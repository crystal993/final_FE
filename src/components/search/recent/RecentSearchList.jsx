import React, { useEffect } from "react";
import styled from "styled-components";
import Keyword from "./RecentSearchKeyword";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { __getRecentKeywords } from "../../../redux/modules/searchSlice";

const RecentSearchList = () => {
  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.search.recentKeywordList);

  useEffect(() => {
    dispatch(__getRecentKeywords());
  }, []);

  return (
    <RecentSearchWrapper>
      {keywords?.map((keyword) => {
        return <Keyword keyword={keyword.searchWord} key={uuidv4()} />;
      })}
    </RecentSearchWrapper>
  );
};

const RecentSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem;
`;

export default RecentSearchList;
