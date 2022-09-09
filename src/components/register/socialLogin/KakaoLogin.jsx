import React from 'react';
import Button from '../../elements/GlobalButton';

const KakaoLogin = () => {
  const CLIENT_ID = 'e449888dc0106a87ab00f84cf9c444d6';
  const REDIRECT_URI = 'http://localhost:3000/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <a href={KAKAO_AUTH_URL}>
      <Button
        content={'카카오 로그인'}
        fontSize={'1.3rem'}
        width={'30rem'}
        color={'subColor'}
      ></Button>
    </a>
  );
};

export default KakaoLogin;
