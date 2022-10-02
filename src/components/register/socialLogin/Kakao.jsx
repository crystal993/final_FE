import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kakaoLogin } from "../../../redux/modules/user/userActions";
import { useNavigate } from "react-router-dom";

const Kakao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);

  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");

  useEffect(() => {
    dispatch(kakaoLogin(code));
    navigate("/");
  }, []);

  return <div>로그인 중입니다....</div>;
};

export default Kakao;
