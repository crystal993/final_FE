import React from "react";
import styled from "styled-components";
import PopularSearchList from "./PopularSearchList";
import RecentSearchList from "./RecentSearchList";

const Search = () => {
  return (
    <SearchWrapper>
      <PopularSearchWrapper>
        <Title>인기 검색어</Title>
        <PopularSearchList></PopularSearchList>
      </PopularSearchWrapper>
      <RecentSearchWrapper>
        <TitleWrapper>
          <Title>최근 검색어</Title>
          <ButtonsWrapper>
            <p>토글</p>
            <AllDeleteButton>모두 지우기</AllDeleteButton>
          </ButtonsWrapper>
        </TitleWrapper>
        <RecentSearchList></RecentSearchList>
      </RecentSearchWrapper>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  margin: 3.3rem 1.8rem;
`;

const PopularSearchWrapper = styled.div`
  width: 100%;
`;

const RecentSearchWrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  line-height: 2.9rem;
  margin-bottom: 3rem;
`;

const ButtonsWrapper = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.7rem;
  color: ${({ theme }) => theme.darkgray};
`;

const AllDeleteButton = styled.div`
  cursor: pointer;
`;

export default Search;
