import React, { useEffect } from "react";
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
  padding-left: 0.6rem;
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

export default MyViewedProductsList;
