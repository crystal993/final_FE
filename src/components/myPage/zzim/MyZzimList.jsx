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
