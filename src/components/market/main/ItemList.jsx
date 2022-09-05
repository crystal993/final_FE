import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import { __getPost } from "../../../redux/modules/market/postSlice";

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.marketPost.list);
  console.log(items);

  // 무한스크롤시
  //   const [page, setPage] = useState(0);
  //   const pageSize = 5;

  useEffect(() => {
    dispatch(__getPost());
    return;
  }, []);

  return (
    <>
      <ItemListBox>
        {items &&
          items?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
      </ItemListBox>
    </>
  );
};

export default ItemList;

const ItemListBox = styled.div`
  width: 100%;
  /* border-radius: 10px; */
  border: 1px solid #eee;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
`;
