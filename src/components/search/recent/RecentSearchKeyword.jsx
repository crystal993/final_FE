import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  __deleteRecentKeyword,
  __itemSearch,
} from "../../../redux/modules/searchSlice";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/close2.svg";
import { useNavigate } from "react-router-dom";

const RecentSearchKeyword = ({ keyword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleState = useSelector((state) => state.search.toggle);

  const onDeleteKeywordHandler = (keyword) => {
    dispatch(__deleteRecentKeyword({ searchWord: keyword }));
  };
  const onSearchHandler = (keyword) => {
    dispatch(__itemSearch({ keyword: keyword, toggleState: toggleState }));
    navigate(`/search/result/${keyword}`);
  };
  return (
    <KeywordWrapper>
      <KeywordButtonWrapper>
        <Keyword onClick={() => onSearchHandler(keyword)}>{keyword}</Keyword>
        <StDeletIcon onClick={() => onDeleteKeywordHandler(keyword)} />
      </KeywordButtonWrapper>
    </KeywordWrapper>
  );
};

const KeywordWrapper = styled.div`
  margin-bottom: 2.5rem;

  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 80%;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 75%;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 70%;
  }
`;

const KeywordButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

const Keyword = styled.span`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.3rem;
  color: ${({ theme }) => theme.darkgray};
  cursor: pointer;
`;

const StDeletIcon = styled(DeleteIcon)`
  cursor: pointer;
`;

export default RecentSearchKeyword;
