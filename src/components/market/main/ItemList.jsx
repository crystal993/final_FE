import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import { __getPost } from "../../../redux/modules/market/postSlice";

const ItemList = ({ list }) => {
  // const dispatch = useDispatch();
  // const items = useSelector((state) => state.marketPost.list);
  // console.log(items);

  // 무한스크롤시
  //   const [page, setPage] = useState(0);
  //   const pageSize = 5;

  // useEffect(() => {
  //   dispatch(__getPost());
  //   return;
  // }, []);

  // console.log(list);
  return (
    <>
      <ItemListBox>
        {list &&
          list?.map((item) => {
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
  margin: 1.6rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
`;
