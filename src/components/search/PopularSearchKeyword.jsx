import React from "react";
import styled from "styled-components";

const PopularSearchKeyword = ({ keyword }) => {
  return (
    <KeywordWrapper>
      <Keyword>{keyword}</Keyword>
    </KeywordWrapper>
  );
};

const KeywordWrapper = styled.div`
  padding: 0.6rem 1rem;
  margin: 0 1rem 0 0;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.mainColor};
  border-radius: 100px;
`;
const Keyword = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.mainColor};
`;

export default PopularSearchKeyword;
