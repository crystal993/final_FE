import React, { useState, useEffect } from "react";
import GlobalButton from "../elements/GlobalButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/modules/user/userActions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as EditDocumentIcon } from "../../assets/icons/edit_document.svg";
import { ReactComponent as FavoriteIcon } from "../../assets/icons/favorite.svg";
import { ReactComponent as ChatBubbleIcon } from "../../assets/icons/comment-1.svg";
import { ReactComponent as VisibilityIcon } from "../../assets/icons/visibility.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile_img_sm.svg";

const Profile = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const logoutInfo = useSelector((state) => state.user.logoutInfo);
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    if (logoutInfo) {
      dispatch(logoutUser());
      navigate("/");
    }
  };

  const URI = {
    KAKAO_REST_API: process.env.REACT_APP_KAKAO_REST_API,
  };

  //현재 위치 api
  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude; //위도
          const lon = position.coords.longitude; //경도
          //kakao REST API에 get 요청을 보낸다.
          //파라미터 x,y에 lon,lat을 넣어주고 API_KEY를 Authorization헤더에 넣어준다.
          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
              {
                headers: {
                  Authorization: `KakaoAK ${URI.KAKAO_REST_API}`,
                },
              }
            )
            .then((res) => {
              setLocation(
                res.data.documents[0].address.region_1depth_name +
                  " " +
                  res.data.documents[0].address.region_2depth_name
              );
            })
            .catch((e) => console.log(e));
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }
  getLocation(); //호출

  const onPathHandler = (path) => {
    navigate(path);
  };

  const user = JSON.parse(localStorage.getItem("user-info"));
  const nickname = user?.nickname;

  return (
    <>
      <ProfileWrapper>
        <ProfileUserWrapper>
          <StUserBox>
            <UserImgBox>
              <StProfileIcon />
            </UserImgBox>
            <UserTxtWrapper>
              <StTxt
                mobileFontSize={"1.3rem"}
                fontSize={"2rem"}
                fontWeight={900}
              >
                {nickname}
              </StTxt>
              <StTxt
                mobileFontSize={"1rem"}
                fontSize={"1.5rem"}
                fontWeight={100}
              >
                {location}
              </StTxt>
            </UserTxtWrapper>
          </StUserBox>
          <GlobalButton
            width={"10rem"}
            height={"5rem"}
            fontSize={"1.4rem"}
            mogileWidth={"5.6rem"}
            mobileHeight={"2.8rem"}
            mobileFontSize={"0.8rem"}
            content={"로그아웃"}
            onClick={onLogoutHandler}
            color={"subColor"}
          />
        </ProfileUserWrapper>
        <ProfileIconWrapper>
          <IconWrapper onClick={() => onPathHandler("/mypage/writings")}>
            <StEditDocumentIcon />
            <StTxt mobileFontSize={"1rem"} fontSize={"1.5rem"} fontWeight={100}>
              내가쓴글
            </StTxt>
          </IconWrapper>
          <IconWrapper onClick={() => onPathHandler("/mypage/zzims")}>
            <StFavoriteIcon />
            <StTxt mobileFontSize={"1rem"} fontSize={"1.5rem"} fontWeight={100}>
              찜목록
            </StTxt>
          </IconWrapper>
          <IconWrapper onClick={() => onPathHandler("/mypage/products")}>
            <StVisibilityIcon />
            <StTxt mobileFontSize={"1rem"} fontSize={"1.5rem"} fontWeight={100}>
              최근본상품
            </StTxt>
          </IconWrapper>
          <IconWrapper>
            <StChatBubbleIcon />
            <StTxt mobileFontSize={"1rem"} fontSize={"1.5rem"} fontWeight={100}>
              채팅목록
            </StTxt>
          </IconWrapper>
        </ProfileIconWrapper>
      </ProfileWrapper>
    </>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.white};
  width: 50rem;
  height: 30rem;
  margin: 2rem 2rem 1.5rem 2rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 26rem;
    height: 17.5rem;
    margin: 0.5rem 1rem;
  }
`;

const ProfileUserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #f0f0f0;
  width: 47.5rem;
  height: 14.5rem;
  margin: 0 2rem;
  padding: 0 2rem;
  @media (max-width: 767px) {
    /* Mobile */
    padding: 0 1rem;
    width: 23.5rem;
    height: 9.5rem;
    margin: 0 2rem;
  }
`;

const ProfileIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 48.5rem;
  margin: 4rem 2rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 24.5rem;
    margin: 0 2rem;
  }
`;

const StUserBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: center;
  font-size: 3.6rem;
  gap: 2rem;
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 2rem;
    gap: 1rem;
  }
`;

const UserImgBox = styled.div`
  border-radius: 70%;
  overflow: hidden;
  width: 6rem;
  height: 6rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 4rem;
    height: 4rem;
  }
`;

const UserTxtWrapper = styled.div``;

const StTxt = styled.p`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  @media (max-width: 767px) {
    /* Mobile */
    font-size: ${(props) => props.mobileFontSize};
  }
`;

const StProfileIcon = styled(ProfileIcon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.mainColor};
  align-items: center;
  width: 10rem;
  height: 6rem;
  row-gap: 0.4rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.lightgray};
  }
`;

const StEditDocumentIcon = styled(EditDocumentIcon)`
  width: 2.8rem;
  height: 2.8rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 2.2rem;
    height: 2.2rem;
  }
`;

const StFavoriteIcon = styled(FavoriteIcon)`
  width: 2.8rem;
  height: 2.8rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 2.2rem;
    height: 2.2rem;
  }
`;

const StChatBubbleIcon = styled(ChatBubbleIcon)`
  width: 2.8rem;
  height: 2.8rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 2.2rem;
    height: 2.2rem;
  }
`;

const StVisibilityIcon = styled(VisibilityIcon)`
  width: 2.8rem;
  height: 2.8rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 2.2rem;
    height: 2.2rem;
  }
`;

export default Profile;
