import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import Item from "./MyWritingsItem";

const MyWritingsList = () => {
  const writings = [];
  return (
    <>
      <MyWritingsListWrapper>
        {/* 검색 결과 조회 */}
        {writings &&
          writings?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
      </MyWritingsListWrapper>
    </>
  );
};

export default MyWritingsList;

const MyWritingsListWrapper = styled.div`
  width: 100%;
  /* border-radius: 10px; */
  margin: 1.6rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
`;
