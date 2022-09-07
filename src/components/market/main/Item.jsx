import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // ♡

export const Item = ({ item }) => {
  const navigate = useNavigate();
  const items = useSelector((state) => state.marketPost.singlePost);

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
                {item.location} {item.time}
              </div>
            </ItemInfoWrapper>
            <Price>{item.sellingPrice.toLocaleString("ko-KR")}원</Price>
          </TextsWrapper>
          <IconsWrapper>
            <IconWrapper>
              <HeartIcon icon={regularHeart} />
              <StCnt>{item.zzimCnt}</StCnt>
            </IconWrapper>
            <IconWrapper>
              <span className="material-icons eye">visibility</span>{" "}
              <StCnt>{item.viewCnt}</StCnt>
            </IconWrapper>
          </IconsWrapper>
        </TextWrapper>
      </ItemWrapper>
    </>
  );
};

export default Item;

const ItemWrapper = styled.div`
  width: 100%;
  /* border-radius: 10px; */
  border-bottom: 1px solid #eee;
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
  margin: 2rem 1rem;
  border: none;
  width: 100%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.lightgray};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 16rem;
`;

const TextsWrapper = styled.div`
  margin: 0.2rem 1rem;
`;

const Title = styled.div`
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  &span {
    margin: 0 0.2rem;
  }
`;

const HeartIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  cursor: pointer;
  color: #cbcbcb;
`;
const IconsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  &span {
    margin: 0 0.2rem;
  }
`;

const StCnt = styled.div`
  margin: 0 0.3rem;
`;
