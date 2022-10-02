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
import { useNavigate } from "react-router-dom";
import GlobalModal from "../elements/GlobalModal";

const Search = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.userToken);
  const autoSaveState = useSelector((state) => state.search.toggle);
  const [isToggled, setIsToggled] = useState(autoSaveState);
  const navigate = useNavigate();
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
    dispatch(__deleteAllRecentKeywords());
  };

  const moveLogin = () => {
    navigate("/login");
  };
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      {isModal && (
        <GlobalModal
          name={"로그인"}
          content1={"로그인이 필요한 서비스입니다."}
          content2={"로그인 하시겠습니까?"}
          isModal={isModal}
          setIsModal={setIsModal}
          onClick={moveLogin}
        />
      )}
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
                {isLogin ? (
                  <GlobalToggle
                    isToggled={isToggled}
                    onToggle={onToggleHandler}
                  />
                ) : (
                  <GlobalToggle
                    isToggled={false}
                    onToggle={() => setIsModal((prev) => !prev)}
                  />
                )}
              </ToggleWrapper>
              {isLogin ? (
                <AllDeleteButton onClick={() => onAllRecentDeleteHandler()}>
                  모두지우기
                </AllDeleteButton>
              ) : (
                <AllDeleteButton onClick={() => setIsModal((prev) => !prev)}>
                  모두지우기
                </AllDeleteButton>
              )}
            </ButtonsWrapper>
          </TitleWrapper>
          {isToggled && <RecentSearchList></RecentSearchList>}
        </RecentSearchWrapper>
      </SearchWrapper>
    </>
  );
};

const SearchWrapper = styled.div`
  padding-top: 8rem;
  margin: 0 auto;
  @media (max-width: 767px) {
    /* Mobile */
    width: calc(100% - 2.8rem);
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    /* Tablet */
    width: calc(100% - 14.4rem);
  }

  @media (min-width: 1280px) {
    /* Desktop */
    width: calc(100% - 33rem);
  }
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
  @media (min-width: 1280px) {
    /* Desktop */
    font-size: 1.8rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    font-size: 1.6rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 1.6rem;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.8rem;
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.darkgray};
  @media (min-width: 1280px) {
    /* Desktop */
    gap: 3rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    gap: 2.4rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    gap: 1.8rem;
  }
`;

const AllDeleteButton = styled.div`
  cursor: pointer;
  @media (min-width: 1280px) {
    /* Desktop */
    font-size: 1.1rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    font-size: 1rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 0.8rem;
  }
`;

const ToggleWrapper = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
  @media (min-width: 1280px) {
    /* Desktop */
    font-size: 1.1rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    font-size: 1rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 0.8rem;
  }
`;

const ToggleLabel = styled.p`
  display: block;
  @media (min-width: 1280px) {
    /* Desktop */
    font-size: 1.1rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    font-size: 1rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 0.8rem;
  }
`;

export default Search;
