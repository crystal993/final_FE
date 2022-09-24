import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as VisibilityIcon } from "../../../assets/icons/visibility.svg";

const MyViewedProductsItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <ItemWrapper onClick={() => navigate(`/market/detail/${item.id}`)}>
      <ImgWrapper>
        <Img src={item.itemImgs[0]} />
      </ImgWrapper>
      <TextWrapper>
        <TextsWrapper>
          <Title>{item.title}</Title>
          <ItemInfoWrapper>
            {item.location} {item.time}
          </ItemInfoWrapper>
          <PriceIconWrapper>
            <Price>{item.sellingPrice.toLocaleString("ko-KR")}원</Price>
            <IconWrapper>
              <StVisibilityIcon />
              <StCnt>{item.viewCnt}</StCnt>
            </IconWrapper>
          </PriceIconWrapper>
        </TextsWrapper>
      </TextWrapper>
    </ItemWrapper>
  );
};

export default MyViewedProductsItem;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  flex-wrap: wrap;
  cursor: pointer;
  width: 13.2rem;
`;

const ImgWrapper = styled.div`
  position: relative;
  border: none;
  border-radius: 0.6rem;
  width: 13.2rem;
`;

const Img = styled.img`
  width: 13.2rem;
  height: 12.6rem;
  border: none;
  border-radius: 0.6rem;
  width: 100%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.lightgray};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1.7rem;
  width: 13.2rem;
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
  line-height: 2.3rem;
  font-size: 1.6rem;
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: medium;
  color: ${({ theme }) => theme.gray};
`;

const Price = styled.h1`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mainColor};
`;

const PriceIconWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: #cbcbcb;
  align-items: center;
  margin-right: -0.8rem;
`;

const StVisibilityIcon = styled(VisibilityIcon)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  path {
    fill: #cbcbcb;
  }
`;

const StCnt = styled.div`
  margin: 0 0.3rem;
`;
