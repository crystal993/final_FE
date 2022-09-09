import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __deleteRecentKeyword } from "../../../redux/modules/searchSlice";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/close2.svg";

const RecentSearchKeyword = ({ keyword }) => {
  const dispatch = useDispatch();
  const onDeleteKeywordHandler = (keyword) => {
    dispatch(__deleteRecentKeyword({ searchWord: keyword }));
  };
  return (
    <KeywordWrapper>
      <KeywordButtonWrapper>
        <Keyword>{keyword}</Keyword>
        <StDeletIcon onClick={() => onDeleteKeywordHandler(keyword)} />
      </KeywordButtonWrapper>
    </KeywordWrapper>
  );
};

const KeywordWrapper = styled.div`
  margin-bottom: 2.5rem;
  width: 85%;
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
`;

const StDeletIcon = styled(DeleteIcon)`
  cursor: pointer;
`;

export default RecentSearchKeyword;
