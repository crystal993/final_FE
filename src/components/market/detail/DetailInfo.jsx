import React, { useEffect } from 'react';
import { __getSinglePost } from '../../../redux/modules/market/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import LikeButton from '../../elements/buttons/LikeButton';
import Comment from '../comment/Comment';
import { v4 as uuidv4 } from 'uuid';

const DetailInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector((state) => state.marketPost.singlePost);
  const itemImgs = item.itemImgs;

  useEffect(() => {
    dispatch(__getSinglePost({ itemId: id }));
  }, [dispatch]);

  return (
    <>
      <DetailWrapper>
        <ImgWrapper>
          {itemImgs &&
            itemImgs.map((url) => <Img src={url} key={uuidv4()}></Img>)}
        </ImgWrapper>
        {/* <Slider imgs={item.itemImgs} imgLength={item.imgLength} /> */}
        <ImgWrapper></ImgWrapper>
        <InfoWrapper>
          <p>
            {item.itemCategory} {item.createdAt}
          </p>
        </InfoWrapper>
        <Title>{item.title}</Title>
        <InfoWrapper>
          <Price>{item.sellingPrice}</Price>
        </InfoWrapper>
        <StUserBox>
          <UserImgBox>
            <UserImage src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBg8SBw4PEhATDg0PFRAPEA8ODQ0RFREWFhURExYYKCggGBslHRUfITEhJSkrLi4uFx8zODMtNyg5OisBCgoKDg0OFw8QGjIlHSItNy0tKy4tKzctLy0tKzgtLS0tLSstLi0rNy0tLC0tKy0rOC0tKy03LS0rLTctKy0rN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QANhABAAECAgYIBAUFAQAAAAAAAAECAwQRBSExUWFxEhMiMkGRocEzcoGxNFJiotEUQoLh8SP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAdEQEBAQEAAgMBAAAAAAAAAAAAAQIRAzESIUET/9oADAMBAAIRAxEAPwDrAH0XzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe00zVPZiZ5a26nB3KtlE/XKHOu8aBInBXI/s8piWmuiaJ7cTHOMjsOViA64AAAAAAAAAAAAAAAAAAAAAAJ+F0f0ozv6v0+P1Z6OwuURXcjX4Ru4rBLW/yK5x+1jbtxbjKiIjkyBNQeVUxVGVURMcXoCBidHRMZ2NU/l8J5KyqOjOVW10SHj8L1tHSojtR+6FM7/KnrH7FSAqkAAAAAAAAAAAAAAAAAANuEtddfiPDbPKGpYaIo7VU8oZ1eRrM7VlGqNQCC4AAAAACm0hZ6rETlsnXHujLTS1Gdqmd1WXnCrXzexDU5QBpkAAAAAAAAAAAAAAAAWeiPhVfNH2VifomvK5VG+Iny/wCs79N49rMBBYAAAAABE0p+F/ypVCz0tX2KaeOfkrFsekd+wBtgAAAAAAAAAAAAAAAAZ2LnU3YqjwnzhgDroaKorpiadkxm9VOAxfUz0bnd3/l/0tonONSGpxfN7ABl0AAJnKNYrdIYzOJotTzn2h2TrlvEXGXuvvzMbNkcmkF4hQB1wAAAAAAAAAAAAAAAAAASMNjKrGqNdO6fZHHLOuy8XNrHUXNs5Tun+UiKoq2TDniJy2MXxtzyOimctrRdxdFrbVE8I1ypJnPaH8y+RLxOOqvRlR2afWUQG5OMW9AHXAAAAAAAAAAAAAAAAAAAZ2bNV6rK3H8Qs8Po+m3rudqf2s3UjUzarLdmq7P/AJ0zP2Srejaqu/MR6ytYjKNQnd1SYiDToymO9VVPLKGcaOo/V5pY58q18YiTo6jj5sKtGUz3aqo55SnB8qfGKq5oyqO5MT6Si3bNVr4lMx9l+TGca3Zus3Ec6Le/o+m58Pszw2eSsv2KrFWVyPr4SpNSp3NjWA0yAAAAAAAAAAAAAAJGDwk4ic51U79/CHmDw/8AUXOEbZ9l1RTFFMRTGUQxrXPpTOe/by3bi1RlbjKGQIqgAAAAAAADG5RFynKuM4ZAKfGYObE5066fWOaK6GqOlTlVsU2Nw39PX2e7OzhwVzrv1UtZ59xHAUTAAAAAAAAAACmOlVEU7Z1Cbou10rs1TsjZzly3kdk7eLDDWYsWoiPrO+W0HnegAAAAAAAAAAAAYX7UXrUxV4+k72YDnrlE265irbE5PFhpWzlMVRyn2V70S9iFnKAOsgAAAAAAAC60fb6GFp46/NS7XQ0R0aIiPCIhPyVTxx6AkqAAAAAAAAAAAAAA1Yu31uHqjhn9YULo3P3aehdqjdVMeqvjqfkjEBRIAAAAAAABlajO7T80fd0Cgs/Gp+an7r9LyK+MATUAAAAAAAAAAAAAAFHjIyxVfzLxR438XXz9lPH7Y8nppAVRAAAAf//Z'></UserImage>
          </UserImgBox>
          <h3>{item.nickname}</h3>
        </StUserBox>
        <h1>{item.content}</h1>
        <h1>조회수 {item.viewCnt}</h1>
        <h1>찜갯수 {item.zzimCnt}</h1>
        <LikeButton />
        <Comment id={id} />
      </DetailWrapper>
    </>
  );
};

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ImgWrapper = styled.div`
  width: 100vw;
  height: 30rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-bottom: 1.9rem;
  /* overflow: hidden; */
`;

const Img = styled.img`
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.darkgray};
`;

const Title = styled.p`
  font-size: 2rem;
`;

const Price = styled.p`
  font-size: 2.4rem;
  font-weight: bold;
`;

const StUserBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  margin: 20px 0px;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    display: flex;
    align-content: center;
    justify-content: center;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    display: flex;
    align-content: center;
    justify-content: center;
  }
  @media (max-width: 767px) {
    /* Mobile */
    display: flex;
    align-content: center;
    justify-content: center;
  }
`;

const UserImgBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 70%;
  overflow: hidden;

  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 50px;
    height: 50px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 50px;
    height: 50px;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 50px;
    height: 50px;
  }
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default DetailInfo;
