import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { kakaoLogin } from '../../../redux/modules/user/userActions';
import { useNavigate } from 'react-router-dom';

const Kakao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);

  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');

  /*
    만약 리덕스의 userInfo를 조회해서 true이면  
      navigate('/')
    로그인이 실패하면 
      로그인을 다시 시도하십시오(모달)
      navigate('/로그인')
  */

  // 인가 코드를 dispatch로 백엔드에게 전달함
  useEffect(() => {
    dispatch(kakaoLogin(code));
  }, []);

  return <div>로그인 중입니다....</div>;
};

export default Kakao;
