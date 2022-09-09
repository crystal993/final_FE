import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __deleteAllRecentKeywords } from "../../redux/modules/searchSlice";
import GlobalToggle from "../elements/GlobalToggle";
import PopularSearchList from "./PopularSearchList";
import RecentSearchList from "./RecentSearchList";

const Search = () => {
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);

  // TODO 최근 검색어 자동 저장 켜기 끄기 기능
  const onToggleHandler = () => {
    if (isToggled) {
      //TODO dispatch
    } else {
      //TODO dispatch
    }
    setIsToggled((prev) => !prev);
  };

  const onAllRecentDeleteHandler = () => {
    console.log("전체 삭제");
    dispatch(__deleteAllRecentKeywords());
  };

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
            <ToggleWrapper>
              <p>자동 저장</p>
              <GlobalToggle isToggled={isToggled} onToggle={onToggleHandler} />
            </ToggleWrapper>
            <AllDeleteButton onClick={() => onAllRecentDeleteHandler()}>
              모두 지우기
            </AllDeleteButton>
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
  width: 33%;
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

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 0.6rem;
`;

export default Search;
