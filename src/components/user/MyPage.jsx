import React from "react";
import MyPageContainer from "./MyPageContainer";
import Profile from "./Profile";
import styled from "styled-components";

const MyPage = () => {
  const userInfo = localStorage.getItem("user-info");
  console.log(JSON.parse(userInfo));
  return (
    <>
      <MyPageWrapper>
        <Profile></Profile>
        <MyPageContainer></MyPageContainer>
      </MyPageWrapper>
    </>
  );
};

const MyPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 0 0;
  background-color: ${({ theme }) => theme.lightgray};
`;

export default MyPage;
