import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import Item from "./SearchItem";

const SearchItemList = ({ searchResultList }) => {
  return (
    <>
      <SearchListWrapper>
        {/* 검색 결과 조회 */}
        {searchResultList &&
          searchResultList?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
      </SearchListWrapper>
    </>
  );
};

export default SearchItemList;

const SearchListWrapper = styled.div`
  width: 100%;
  /* border-radius: 10px; */
  margin: 1.6rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
`;
