import React from "react";
import { bool } from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import GlobalButton from "../GlobalButton";
import { useNavigate } from "react-router-dom";

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const isLogin = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();

  const onPathHandler = () => {
    navigate(`/login`);
  };

  return (
    <StMenu open={open} aria-hidden={!isHidden} {...props}>
      {!isLogin && (
        <>
          <StBtnWrapper>
            <GlobalButton
              content={"로그인"}
              fontSize={"1.4rem"}
              fontWeight={900}
              width={"22rem"}
              height={"5rem"}
              onClick={onPathHandler}
            />
          </StBtnWrapper>
          <StLink href="/signup" tabIndex={tabIndex}>
            <span aria-hidden="true"></span>
            <StText>회원가입</StText>
          </StLink>
        </>
      )}
      {isLogin && (
        <>
          <StUserBox>
            <UserImgBox>
              <UserImage src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBg8SBw4PEhATDg0PFRAPEA8ODQ0RFREWFhURExYYKCggGBslHRUfITEhJSkrLi4uFx8zODMtNyg5OisBCgoKDg0OFw8QGjIlHSItNy0tKy4tKzctLy0tKzgtLS0tLSstLi0rNy0tLC0tKy0rOC0tKy03LS0rLTctKy0rN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QANhABAAECAgYIBAUFAQAAAAAAAAECAwQRBSExUWFxEhMiMkGRocEzcoGxNFJiotEUQoLh8SP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAdEQEBAQEAAgMBAAAAAAAAAAAAAQIRAzESIUET/9oADAMBAAIRAxEAPwDrAH0XzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe00zVPZiZ5a26nB3KtlE/XKHOu8aBInBXI/s8piWmuiaJ7cTHOMjsOViA64AAAAAAAAAAAAAAAAAAAAAAJ+F0f0ozv6v0+P1Z6OwuURXcjX4Ru4rBLW/yK5x+1jbtxbjKiIjkyBNQeVUxVGVURMcXoCBidHRMZ2NU/l8J5KyqOjOVW10SHj8L1tHSojtR+6FM7/KnrH7FSAqkAAAAAAAAAAAAAAAAAANuEtddfiPDbPKGpYaIo7VU8oZ1eRrM7VlGqNQCC4AAAAACm0hZ6rETlsnXHujLTS1Gdqmd1WXnCrXzexDU5QBpkAAAAAAAAAAAAAAAAWeiPhVfNH2VifomvK5VG+Iny/wCs79N49rMBBYAAAAABE0p+F/ypVCz0tX2KaeOfkrFsekd+wBtgAAAAAAAAAAAAAAAAZ2LnU3YqjwnzhgDroaKorpiadkxm9VOAxfUz0bnd3/l/0tonONSGpxfN7ABl0AAJnKNYrdIYzOJotTzn2h2TrlvEXGXuvvzMbNkcmkF4hQB1wAAAAAAAAAAAAAAAAAASMNjKrGqNdO6fZHHLOuy8XNrHUXNs5Tun+UiKoq2TDniJy2MXxtzyOimctrRdxdFrbVE8I1ypJnPaH8y+RLxOOqvRlR2afWUQG5OMW9AHXAAAAAAAAAAAAAAAAAAAZ2bNV6rK3H8Qs8Po+m3rudqf2s3UjUzarLdmq7P/AJ0zP2Srejaqu/MR6ytYjKNQnd1SYiDToymO9VVPLKGcaOo/V5pY58q18YiTo6jj5sKtGUz3aqo55SnB8qfGKq5oyqO5MT6Si3bNVr4lMx9l+TGca3Zus3Ec6Le/o+m58Pszw2eSsv2KrFWVyPr4SpNSp3NjWA0yAAAAAAAAAAAAAAJGDwk4ic51U79/CHmDw/8AUXOEbZ9l1RTFFMRTGUQxrXPpTOe/by3bi1RlbjKGQIqgAAAAAAADG5RFynKuM4ZAKfGYObE5066fWOaK6GqOlTlVsU2Nw39PX2e7OzhwVzrv1UtZ59xHAUTAAAAAAAAAACmOlVEU7Z1Cbou10rs1TsjZzly3kdk7eLDDWYsWoiPrO+W0HnegAAAAAAAAAAAAYX7UXrUxV4+k72YDnrlE265irbE5PFhpWzlMVRyn2V70S9iFnKAOsgAAAAAAAC60fb6GFp46/NS7XQ0R0aIiPCIhPyVTxx6AkqAAAAAAAAAAAAAA1Yu31uHqjhn9YULo3P3aehdqjdVMeqvjqfkjEBRIAAAAAAABlajO7T80fd0Cgs/Gp+an7r9LyK+MATUAAAAAAAAAAAAAAFHjIyxVfzLxR438XXz9lPH7Y8nppAVRAAAAf//Z"></UserImage>
            </UserImgBox>
            <h3>닉네임</h3>
          </StUserBox>
          <StCategoryBtn href="/mypage" tabIndex={tabIndex}>
            <span aria-hidden="true"></span>
            <StText>마이페이지</StText>
          </StCategoryBtn>
        </>
      )}
      <StText>카테고리</StText>
      <StCategoryBtnWrapper>
        <StCategoryBtn tabIndex={tabIndex}>
          <span aria-hidden="true"></span>
          사료
        </StCategoryBtn>
        <StCategoryBtn tabIndex={tabIndex}>
          <span aria-hidden="true"></span>
          간식
        </StCategoryBtn>
        <StCategoryBtn tabIndex={tabIndex}>
          <span aria-hidden="true"></span>
          의류
        </StCategoryBtn>
        <StCategoryBtn tabIndex={tabIndex}>
          <span aria-hidden="true"></span>
          미용
        </StCategoryBtn>
        <StCategoryBtn tabIndex={tabIndex}>
          <span aria-hidden="true"></span>
          장난감
        </StCategoryBtn>
        <StCategoryBtn tabIndex={tabIndex}>
          <span aria-hidden="true"></span>
          기타용품
        </StCategoryBtn>
      </StCategoryBtnWrapper>
    </StMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

const StMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: ${({ theme }) => theme.mainColor};
  transform: ${({ open }) => (open ? "translateX(17%)" : "translateX(100%)")};
  height: 100%;
  text-align: left;
  padding: 4rem 0rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    transform: ${({ open }) =>
      open ? "translateX(21%)" : "translateX(-100%)"};
    width: 25rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    transform: ${({ open }) => (open ? "translateX(5%)" : "translateX(-100%)")};
    width: 25rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(-100%)")};
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const StText = styled.h3`
  font-size: 1.5rem;
  padding: 2.4rem 0 0 1.6rem;
`;

const StLink = styled.a`
  text-transform: uppercase;
  font-weight: 900;
  color: ${({ theme }) => theme.white};
  border-radius: 1rem;
  text-decoration: none;
  transition: color 0.3s linear;

  @media screen and (min-width: 1024px) {
    /* Desktop */
    font-size: 1.5rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    font-size: 1.5rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    font-size: 1.5rem;
    text-align: center;
  }

  &:hover {
    /* color: ${({ theme }) => theme.hoverButtonTextColor}; */
  }
`;

const StBtnWrapper = styled.div`
  padding: 2.4rem 0 0 1.6rem;
`;

const StCategoryBtnWrapper = styled.div`
  margin: 2.4rem 0 0 1.6rem;
  width: 17.2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

const StCategoryBtn = styled.button`
  text-transform: uppercase;
  width: 8rem;
  height: 8rem;
  font-weight: 100;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.gray};
  border-radius: 1rem;
  text-decoration: none;
  transition: color 0.3s linear;
  border: none;
  cursor: pointer;

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1024px) {
    /* Desktop */
    font-size: 1.5rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    font-size: 1.5rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    font-size: 1.5rem;
    text-align: center;
  }

  &:hover {
    /* color: ${({ theme }) => theme.hoverButtonTextColor}; */
  }
`;

const StUserBox = styled.div`
  display: flex;
  width: 100%;
  padding: 2.4rem 0 0 1.6rem;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  margin: 20px 0px;
  @media (max-width: 767px) {
    /* Mobile */
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
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

export default Menu;
