import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getMyZzims } from "../../../redux/modules/myPageSlice";
import Item from "./MyZzimItem";

const MyZzimList = () => {
  const dispatch = useDispatch();
  const zzimItems = useSelector((state) => state.myPage.myZzims);
  useEffect(() => {
    dispatch(__getMyZzims());
  }, [dispatch]);

  return (
    <MyZzimListWrapper>
      {zzimItems &&
        zzimItems?.map((item) => {
          return <Item item={item} key={item.id} />;
        })}
    </MyZzimListWrapper>
  );
};

export default MyZzimList;

const MyZzimListWrapper = styled.div`
  margin: 1.6rem auto;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
  flex-wrap: wrap;
  transition: all 0.3s;
  row-gap: 0.3rem;
  column-gap: 0.3rem;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 70rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 42rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 28rem;
  }
`;
