import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as VisibilityIcon } from "../../../assets/icons/visibility.svg";
import { ReactComponent as HeartIcon } from "../../../assets/icons/favorite.svg";

export const MyWritingsItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <ItemWrapper onClick={() => navigate(`/market/detail/${item.id}`)}>
        <ImgWrapper>
          <Img src={item.itemImgs[0]} />
        </ImgWrapper>
        <TextsWrapper>
          <Title>{item.title}</Title>
          <ItemInfoWrapper>
            <ItemInfoTxt>
              {item.location} {item.time}
            </ItemInfoTxt>
          </ItemInfoWrapper>
          <Price>{item.sellingPrice.toLocaleString("ko-KR")}원</Price>
        </TextsWrapper>
        <IconsWrapper>
          <IconWrapper>
            <StHeartIcon />
            <StCnt>{item.zzimCnt}</StCnt>
          </IconWrapper>
          <IconWrapper>
            <StVisibilityIcon />
            <StCnt>{item.viewCnt}</StCnt>
          </IconWrapper>
        </IconsWrapper>
      </ItemWrapper>
    </>
  );
};

export default MyWritingsItem;

const ItemWrapper = styled.div`
  width: 100%;
  /* border-radius: 10px; */
  border-bottom: 2px solid ${({ theme }) => theme.lightgray};
  margin: auto;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: rgba(210, 210, 210, 0.08);
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    color: black;
  }
`;

const ImgWrapper = styled.div`
  width: 16rem;
  margin: 2rem 0;
  margin-right: 1rem;
  display: flex;
  margin-right: 1.5rem;
`;

const Img = styled.img`
  width: 13rem;
  height: 16rem;
  border: none;
  object-fit: cover;
  background-color: ${({ theme }) => theme.lightgray};
`;

const TextsWrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: 14rem;
  margin: 0.2rem 1rem;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 50%;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 50%;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 40%;
  }
`;

const Title = styled.div`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: normal;
  font-weight: 500;
  line-height: 2.3rem;
  font-size: 1.6rem;
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  font-weight: medium;
  color: ${({ theme }) => theme.gray};
`;

const ItemInfoTxt = styled.p`
  text-overflow: ellipsis;
  display: block;
  font-size: 1rem;
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

const StHeartIcon = styled(HeartIcon)`
  width: 1.4rem;
  height: 1.4rem;
  font-size: 1rem;
  cursor: pointer;
  path {
    fill: #cbcbcb;
  }
`;

const StVisibilityIcon = styled(VisibilityIcon)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  path {
    fill: #cbcbcb;
  }
`;

const IconsWrapper = styled.div`
  height: 2.5rem;
  position: absolute;
  display: flex;
  flex-direction: row;
  bottom: 2rem;
  right: 0.1rem;
`;

const StCnt = styled.div`
  margin: 0 0.3rem;
`;
