import React from "react";
import styled from "styled-components";
import Keyword from "./RecentSearchKeyword";

const RecentSearchList = () => {
  const keywords = ["keyword1", "keyword2", "keyword3"];
  return (
    <RecentSearchWrapper>
      {keywords?.map((keyword) => {
        return <Keyword keyword={keyword} key={keyword.id} />;
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
