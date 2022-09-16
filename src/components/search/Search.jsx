import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  __deleteAllRecentKeywords,
  toggleOn,
  toggleOff,
  __toggleStateRecentKeyword,
} from "../../redux/modules/searchSlice";
import GlobalToggle from "../elements/GlobalToggle";
import PopularSearchList from "./popular/PopularSearchList";
import RecentSearchList from "./recent/RecentSearchList";
import { apis } from "../../shared/axios";

const Search = () => {
  const dispatch = useDispatch();
  const autoSaveState = useSelector((state) => state.search.toggle);
  const [isToggled, setIsToggled] = useState(autoSaveState);

  useEffect(() => {
    setIsToggled(autoSaveState);
  }, [autoSaveState]);

  useEffect(() => {
    dispatch(__toggleStateRecentKeyword());
  }, [dispatch]);

  const onToggleHandler = () => {
    if (isToggled) {
      apis.put_toggle_state();
      dispatch(toggleOff());
    } else {
      apis.put_toggle_state();
      dispatch(toggleOn());
    }
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
              <ToggleLabel>자동저장</ToggleLabel>
              <GlobalToggle isToggled={isToggled} onToggle={onToggleHandler} />
            </ToggleWrapper>
            <AllDeleteButton onClick={() => onAllRecentDeleteHandler()}>
              모두지우기
            </AllDeleteButton>
          </ButtonsWrapper>
        </TitleWrapper>
        {isToggled && <RecentSearchList></RecentSearchList>}
      </RecentSearchWrapper>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  padding-top: 9rem;
  margin: 0 1.8rem;
`;

const PopularSearchWrapper = styled.div`
  width: 100%;
  z-index: -100;
`;

const RecentSearchWrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  line-height: 2.9rem;
  margin-bottom: 3rem;
`;

const ButtonsWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.7rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.darkgray};
  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 20%;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 23%;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 25%;
  }
`;

const AllDeleteButton = styled.div`
  cursor: pointer;
`;

const ToggleWrapper = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ToggleLabel = styled.p`
  margin-left: -10rem;
  font-size: 1.2rem;
`;

export default Search;
