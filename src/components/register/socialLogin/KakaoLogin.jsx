import React from "react";
import Button from "../../elements/GlobalButton";
import { ReactComponent as KakaoButton } from "../../../assets/icons/kakao_final.svg";
import styled from "styled-components";

const KakaoLogin = () => {
  const URI = {
    KAKAO_REST_API: process.env.REACT_APP_KAKAO_REST_API,
  };
  const CLIENT_ID = "e449888dc0106a87ab00f84cf9c444d6";
  const CLIENT_ID2 = "673df3a728c08bd1553b48f6d824da27";
  const REDIRECT_URI = "https://meongnyang-market.com/members/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${URI.KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <a href={KAKAO_AUTH_URL}>
      <StKakaoButton />
      {/* <img src={`${process.env.PUBLIC_URL}/img/kakao_login_medium_wide.png}`} /> */}
    </a>
  );
};

const StKakaoButton = styled(KakaoButton)`
  margin-left: -0.6rem;
  width: 38rem;
  transition: ${(props) => props.theme.transition};
  @media (max-width: 767px) {
    /* Mobile */
    margin-left: 0.2rem;
    width: 25rem;
  }
`;

export default KakaoLogin;
