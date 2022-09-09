import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __itemSearch } from "../../redux/modules/searchSlice";

const PopularSearchKeyword = ({ keyword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 검색 기능
  const onSearchResultHandler = (keyword) => {
    dispatch(__itemSearch({ keyword }));
    navigate(`/search/result/${keyword}`);
  };

  return (
    <KeywordWrapper>
      <Keyword onClick={() => onSearchResultHandler(keyword)}>
        {keyword}
      </Keyword>
    </KeywordWrapper>
  );
};

const KeywordWrapper = styled.div`
  padding: 0.6rem 1rem;
  margin: 0 1rem 0 0;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.mainColor};
  border-radius: 100px;
  cursor: pointer;
`;
const Keyword = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.mainColor};
`;

export default PopularSearchKeyword;
