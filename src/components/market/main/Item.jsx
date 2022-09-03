import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // ♡

export const Item = ({ item }) => {
  // TODO 아마 다른 걸로 연결될 듯,,,
  //   const isLogin = useSelector((state) => state.user.isLogin);
  const isLogin = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMine = item.isMine;

  return (
    <>
      <ItemWrapper onClick={() => navigate(`/market/detail/${item.id}`)}>
        <ImgWrapper>
          <Img src={item.itemImgs[0]} />
        </ImgWrapper>
        <TextWrapper>
          <TextsWrapper>
            <Title>{item.title}</Title>
            <ItemInfoWrapper>
              <div>
                {item.location} {item.createdAt}
              </div>
            </ItemInfoWrapper>
            <Price>{item.sellingPrice}원</Price>
          </TextsWrapper>
          <IconsWrapper>
            <IconWrapper>
              <HeartIcon icon={regularHeart} />
              <div>{item.zzimCnt}</div>
            </IconWrapper>
            <IconWrapper>
              <div>조회수 {item.viewCnt}</div>
            </IconWrapper>
          </IconsWrapper>
        </TextWrapper>
      </ItemWrapper>
      <ButtonsWrapper>{/* TODO 좋아요 갯수만! */}</ButtonsWrapper>
    </>
  );
};

export default Item;

const ItemWrapper = styled.div`
  width: 100%;
  /* border-radius: 10px; */
  border: 1px solid #eee;
  margin: auto;
  display: flex;
  flex-direction: row;
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

const ImgWrapper = styled.div`
  width: 50%;
  margin: 2rem 1.5rem;
`;

const Img = styled.img`
  width: 20rem;
  height: 16rem;
  margin: 20px 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 50%;
  height: 16rem;
  padding: 1rem;
`;

const TextsWrapper = styled.div`
  margin-bottom: 2.4rem;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.darkgray};
`;

const Price = styled.h1`
  font-size: 1.6rem;
  color: #6b6b6b;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: #cbcbcb;
  align-items: center;
  margin: 0 0.5rem;
`;

const HeartIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  cursor: pointer;
  color: #cbcbcb;
  margin: 0.3rem;
`;
const IconsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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
