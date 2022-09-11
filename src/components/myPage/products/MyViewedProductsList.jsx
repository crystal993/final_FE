import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import Item from "./MyViewedProductsItem";

const MyViewedProductsList = () => {
  const products = [];
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
