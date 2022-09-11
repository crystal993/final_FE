import React from "react";
import styled from "styled-components";
import Item from "./MyZzimItem";
import RESP from "../../../server/response";

const MyZzimList = () => {
  const zzimItems = [
    {
      id: 373,
      isComplete: false,
      itemCategory: "식품",
      itemImgs: [],
      lastData: false,
      location: "안드로메",
      petCategory: "강아지\n",
      sellingPrice: 100000,
      time: "2일 전",
      title: "saff",
      viewCnt: 38,
      zzimCnt: 0,
    },
    {
      id: 372,
      isComplete: false,
      itemCategory: "사료",
      itemImgs: [
        "https://springadvancedbucket.s3.ap-northeast-2.amazonaws.com/heart1662598680432.png",
      ],
      lastData: false,
      location: "서울 은평구",
      petCategory: "강아지",
      sellingPrice: 10000,
      time: "3일 전",
      title: "ㅁㄴㅇㅇ",
      viewCnt: 120,
      zzimCnt: 0,
    },
  ];
  return (
    <>
      <MyZzimListWrapper>
        {zzimItems &&
          zzimItems?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
      </MyZzimListWrapper>
    </>
  );
};

export default MyZzimList;

const MyZzimListWrapper = styled.div`
  width: 100%;
  margin: 1.6rem 2.4rem 0 2.4rem;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
  flex-wrap: wrap;
`;
