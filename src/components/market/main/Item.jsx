import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { __deletePost } from "../../redux/modules/postSlice";

export const Item = ({ item }) => {
  console.log("item:", item);
  // TODO 아마 다른 걸로 연결될 듯,,,
  //   const isLogin = useSelector((state) => state.user.isLogin);
  const isLogin = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMine = item.isMine;
  const deleteHandler = () => {
    // dispatch(__deletePost(item.id));
  };

  return (
    <>
      <TwitBox onClick={() => navigate(`/market/detail/${item.itemId}`)}>
        <StTwitTitle>
          {isLogin && isMine && (
            <StTitleButton
              onClick={(event) => {
                event.stopPropagation();
                const result = window.confirm("진짜로 삭제하시겠습니까?");
                if (result) {
                  return deleteHandler(item.id);
                } else {
                  return;
                }
              }}
            >
              ✖
            </StTitleButton>
          )}
        </StTwitTitle>

        <StUserBox>
          {/* TODO Item Image list로 어떻게 보여줄지 */}
          <UserImgBox>
            <UserImage
              src={
                "https://image.shutterstock.com/image-vector/dog-paw-vector-icon-logo-260nw-1147990112.jpg"
              }
            ></UserImage>
          </UserImgBox>
          <h3>닉네임 {item.nickname}</h3>
        </StUserBox>

        <div>{item.title}</div>
        <div>{item.content}</div>
        <div>판매가격 {item.sellingPrice}</div>
        <Img src={item.itemImgs[0]} />

        <h3>{item.createdAt}</h3>
        <div>찜갯수 {item.zzimCNT}</div>
        <div>조회수 {item.viewCnt}</div>
      </TwitBox>
      <ButtonsWrapper>{/* TODO 좋아요 갯수만! */}</ButtonsWrapper>
    </>
  );
};

export default Item;

const TwitBox = styled.div`
  width: 100%;
  /* border-radius: 10px; */
  border: 1px solid #eee;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-collapse: collapse;

  cursor: pointer;
  &:hover {
    background-color: rgba(210, 210, 210, 0.08);
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    color: black;
  }
`;

const Img = styled.img`
  width: 90%;
  margin: 20px 10px;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px solid #9e9999; */
  margin-bottom: 30px;
  padding: 10px;
`;

const UserImgBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 70%;
  overflow: hidden;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StTwitTitle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
`;

const StTitleButton = styled.button`
  width: 35px;
  height: 35px;
  /* border: 1px solid #eee; */
  border: none;
  /* border: 0;
outline: 0; */
  border-radius: 50%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 5px; */
  cursor: pointer;
  background-color: white;
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px; */
  &:hover {
    background-color: rgba(210, 210, 210, 0.5);
    /* box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset; */
    color: black;
  }
`;

const StUserBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
`;
