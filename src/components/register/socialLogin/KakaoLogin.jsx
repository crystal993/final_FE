import React from 'react';
import styled from 'styled-components';

const KakaoLogin = () => {
  const CLIENT_ID = 'e449888dc0106a87ab00f84cf9c444d6';
  const REDIRECT_URI = 'http://localhost:3000/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <a href={KAKAO_AUTH_URL}>
      <STkakao
        src='//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg'
        width='402'
        alt='카카오 로그인'
        className='kakao_btn'
      />
    </a>
  );
};

export default KakaoLogin;

const STkakao = styled.img`
  margin-top: 3.5rem;
  width: 30rem;
  border: 2px solid #cbcbcb;
  border-radius: 6px;
  height: 3.5rem;
`;
