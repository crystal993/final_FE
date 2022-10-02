import React, { useEffect, useRef } from "react";
import MyPageChart from "./MyPageChart";
import Profile from "./Profile";
import styled from "styled-components";

const MyPage = () => {
  const divRef = useRef();
  useEffect(() => {
    divRef.current.scrollIntoView();
  }, []);
  return (
    <>
      <span ref={divRef}></span>
      <MyPageBackgroundWrapper>
        <MyPageWrapper>
          <Profile></Profile>
          <MyPageChart></MyPageChart>
        </MyPageWrapper>
      </MyPageBackgroundWrapper>
    </>
  );
};

const MyPageBackgroundWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.lightgray};
  @media (min-width: 1280px) {
    /* Desktop */
    background-color: ${({ theme }) => theme.white};
  }
`;

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 6rem;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 54rem;
    background-color: ${({ theme }) => theme.white};
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 54rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 28rem;
  }
`;

export default MyPage;
