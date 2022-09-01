const CLIENT_ID = 'e449888dc0106a87ab00f84cf9c444d6';
const REDIRECT_URI = 'http://localhost:3000/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
