import React from "react";
import styled from "styled-components";
import Keyword from "./PopularSearchKeyword";

const PopularSearchList = () => {
  const keywords = ["keyword1dasdasdadasdasd", "keyword2", "keyword3"];
  return (
    <PopularSearchWrapper>
      {keywords?.map((keyword) => {
        return <Keyword keyword={keyword} key={keyword.id} />;
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
