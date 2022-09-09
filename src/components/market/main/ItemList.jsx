import React, { useEffect, Fragment, useState } from 'react';
import styled from 'styled-components';
import Item from './Item';

const ItemList = ({
  list,
  dogList,
  catList,
  foodList,
  snackList,
  clothesList,
  beautyList,
  toyList,
  etcList,
  doubleList,
}) => {
  const filtered = doubleList.filter((x) => {
    return x !== undefined;
  });

  console.log(filtered);

  return (
    <>
      <TwitListBox>
        {/* 전체 상품 조회 */}
        {list &&
          list?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        {/* 강아지 물품 조회 */}
        {dogList &&
          dogList?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        {/* 고양이 물품 조회 */}
        {catList &&
          catList?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        {/* 식품 조회 */}
        {foodList &&
          foodList?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        {/* 과자 조회 */}
        {snackList &&
          snackList?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        {/*  옷 조회*/}
        {clothesList &&
          clothesList?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        {/* 미용 조회 */}
        {beautyList &&
          beautyList?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        {/* 장난감 조회 */}
        {toyList &&
          toyList?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        {/* 기타용품 조회 */}
        {etcList &&
          etcList?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        {/* 공통상품 조회 */}
        {filtered &&
          filtered?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
      </TwitListBox>
    </>
  );
};

export default ItemList;

const TwitListBox = styled.div`
  width: 100%;
  /* border-radius: 10px; */
  margin: 1.6rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
`;
