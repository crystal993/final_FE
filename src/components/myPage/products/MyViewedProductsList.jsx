import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getMyViewedProducts } from "../../../redux/modules/myPageSlice";
import styled from "styled-components";
import Item from "./MyViewedProductsItem";

const MyViewedProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.myPage.myProducts);
  useEffect(() => {
    dispatch(__getMyViewedProducts());
  }, [dispatch]);
  return (
    <>
      <MyViewedProductsListWrapper>
        {products &&
          products?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
      </MyViewedProductsListWrapper>
    </>
  );
};

const MyViewedProductsListWrapper = styled.div`
  width: 100%;
  margin: 1.6rem 2.4rem 0 2.4rem;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
  flex-wrap: wrap;
`;

export default MyViewedProductsList;
