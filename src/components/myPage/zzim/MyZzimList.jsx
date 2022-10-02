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
  flex-wrap: wrap;
  transition: all 0.3s;
  padding-left: 0.6rem;
  display: grid;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 71rem;
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 42rem;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 28rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;
