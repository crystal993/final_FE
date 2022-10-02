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

export default MyViewedProductsList;
