import React, { useEffect, useState } from "react";
import {
  __getSinglePost,
  __deletePost,
} from "../../../redux/modules/market/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LikeButton from "../../elements/buttons/LikeButton";
import SimpleSlider from "./SimpleSlider";
import Button from "../../elements/GlobalButton";
import Comment from "../comment/Comment";
import DetailButton from "../../elements/buttons/DetailButton";
import FixTwoButton from "../../elements/buttons/FixTwoButton";

const DetailInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector((state) => state.marketPost.singlePost);
  const isLogin = useSelector((state) => state.user.userToken);
  const itemImgs = item.itemImgs;

  useEffect(() => {
    dispatch(__getSinglePost({ id: id }));
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(__deletePost({ id: id }));
    navigate("/");
  };

  const sharekakao = (event) => {
    event.preventDefault();
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("a729d68f8474b39d110cdd9e7a162f5a");
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${item.title}`,
          description: `${item.content}`,
          imageUrl: `${item.itemImgs[0]}`,
          link: {
            // 배포한 주소
            mobileWebUrl: "공유할 url 주소",
            webUrl: "공유할 url주소",
          },
        },
      });
    }
  };

  // 사용할 컴포넌트에서만 script를 호출하기 위해서
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onEditHandler = () => {
    navigate(`/market/post/${id}`, { state: item });
  };

  const onDeleteHandler = (event) => {
    event.stopPropagation();
    // TODO:  추후에 모달로 바꿀 예정
    const result = window.confirm("게시글을 삭제할래?");
    if (result) {
      return deleteHandler(id);
    } else {
      return;
    }
  };

  return (
    <>
      <SimpleSlider itemImgs={itemImgs} />
      <DetailWrapper>
        <InfoWrapper>
          <P>
            {item.itemCategory} {item.createdAt}
          </P>
        </InfoWrapper>
        <Title>{item.title}</Title>
        <InfoWrapper>
          <Price>{item.sellingPrice}</Price>
        </InfoWrapper>
        <LinkWrapper>
          <div>
            <StUserBox>
              <UserImgBox>
                <UserImage src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBg8SBw4PEhATDg0PFRAPEA8ODQ0RFREWFhURExYYKCggGBslHRUfITEhJSkrLi4uFx8zODMtNyg5OisBCgoKDg0OFw8QGjIlHSItNy0tKy4tKzctLy0tKzgtLS0tLSstLi0rNy0tLC0tKy0rOC0tKy03LS0rLTctKy0rN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QANhABAAECAgYIBAUFAQAAAAAAAAECAwQRBSExUWFxEhMiMkGRocEzcoGxNFJiotEUQoLh8SP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAdEQEBAQEAAgMBAAAAAAAAAAAAAQIRAzESIUET/9oADAMBAAIRAxEAPwDrAH0XzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe00zVPZiZ5a26nB3KtlE/XKHOu8aBInBXI/s8piWmuiaJ7cTHOMjsOViA64AAAAAAAAAAAAAAAAAAAAAAJ+F0f0ozv6v0+P1Z6OwuURXcjX4Ru4rBLW/yK5x+1jbtxbjKiIjkyBNQeVUxVGVURMcXoCBidHRMZ2NU/l8J5KyqOjOVW10SHj8L1tHSojtR+6FM7/KnrH7FSAqkAAAAAAAAAAAAAAAAAANuEtddfiPDbPKGpYaIo7VU8oZ1eRrM7VlGqNQCC4AAAAACm0hZ6rETlsnXHujLTS1Gdqmd1WXnCrXzexDU5QBpkAAAAAAAAAAAAAAAAWeiPhVfNH2VifomvK5VG+Iny/wCs79N49rMBBYAAAAABE0p+F/ypVCz0tX2KaeOfkrFsekd+wBtgAAAAAAAAAAAAAAAAZ2LnU3YqjwnzhgDroaKorpiadkxm9VOAxfUz0bnd3/l/0tonONSGpxfN7ABl0AAJnKNYrdIYzOJotTzn2h2TrlvEXGXuvvzMbNkcmkF4hQB1wAAAAAAAAAAAAAAAAAASMNjKrGqNdO6fZHHLOuy8XNrHUXNs5Tun+UiKoq2TDniJy2MXxtzyOimctrRdxdFrbVE8I1ypJnPaH8y+RLxOOqvRlR2afWUQG5OMW9AHXAAAAAAAAAAAAAAAAAAAZ2bNV6rK3H8Qs8Po+m3rudqf2s3UjUzarLdmq7P/AJ0zP2Srejaqu/MR6ytYjKNQnd1SYiDToymO9VVPLKGcaOo/V5pY58q18YiTo6jj5sKtGUz3aqo55SnB8qfGKq5oyqO5MT6Si3bNVr4lMx9l+TGca3Zus3Ec6Le/o+m58Pszw2eSsv2KrFWVyPr4SpNSp3NjWA0yAAAAAAAAAAAAAAJGDwk4ic51U79/CHmDw/8AUXOEbZ9l1RTFFMRTGUQxrXPpTOe/by3bi1RlbjKGQIqgAAAAAAADG5RFynKuM4ZAKfGYObE5066fWOaK6GqOlTlVsU2Nw39PX2e7OzhwVzrv1UtZ59xHAUTAAAAAAAAAACmOlVEU7Z1Cbou10rs1TsjZzly3kdk7eLDDWYsWoiPrO+W0HnegAAAAAAAAAAAAYX7UXrUxV4+k72YDnrlE265irbE5PFhpWzlMVRyn2V70S9iFnKAOsgAAAAAAAC60fb6GFp46/NS7XQ0R0aIiPCIhPyVTxx6AkqAAAAAAAAAAAAAA1Yu31uHqjhn9YULo3P3aehdqjdVMeqvjqfkjEBRIAAAAAAABlajO7T80fd0Cgs/Gp+an7r9LyK+MATUAAAAAAAAAAAAAAFHjIyxVfzLxR438XXz9lPH7Y8nppAVRAAAAf//Z"></UserImage>
              </UserImgBox>
              <UserInfoTxt>
                <H3>{item.nickname}</H3>
                <P>{item.location}</P>
              </UserInfoTxt>
            </StUserBox>
          </div>
          <StIcon>
            <span class="material-icons" onClick={sharekakao}>
              share
            </span>
          </StIcon>
        </LinkWrapper>
        <Content>{item.content}</Content>
        <InfoCntWrapper>
          <P>
            관심 {item.zzimCnt} 조회수 {item.viewCnt}
          </P>
        </InfoCntWrapper>
        <LikeButton postId={id} isLogin={isLogin} isLike={item.isZzimed} />
        <Comment id={id} />
        {!item.isMine && <DetailButton></DetailButton>}
        {item.isMine && (
          <FixTwoButton
            content1={"수정하기"}
            content2={"삭제하기"}
            onClick1={onEditHandler}
            onClick2={onDeleteHandler}
          />
        )}
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

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.darkgray};
`;

const P = styled.p`
  font-size: 1rem;
`;

const H3 = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
`;

const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  span {
    color: ${({ theme }) => theme.darkgray};
  }
`;

const StIcon = styled.div`
  @media (min-width: 1024px) {
    margin: 0 1.3rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin: 0 1.3rem;
  }
  @media (max-width: 767px) {
    margin: 0 1.3rem;
  }
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
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  gap: 1.5rem;
  margin: 3rem 0;
  .user-info {
    justify-content: flex-start;
    background-color: green;
  }
  .share {
    justify-content: flex-end;
    background-color: red;
  }
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

const UserInfoTxt = styled.div``;

const Content = styled.h1`
  font-weight: 400;
  font-size: 1.4rem;
`;

const InfoCntWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.darkgray};
  margin: 3.2rem 0;
`;

export default DetailInfo;
