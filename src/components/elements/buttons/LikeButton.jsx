import { useState } from "react";
import RESP from "../../../server/response";
import Button from "../GlobalButton";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // ♡
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // ♥︎import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const LikeButton = ({ isLike, isLogin, postId, heart }) => {
  // ${URI.BASE}
  const URI = {
    BASE: process.env.REACT_APP_BASE_URI,
  };
  // 좋아요
  //   const [liked, setLiked] = useState(isLike);
  const [liked, setLiked] = useState(false);
  const [heartCount, setHeartCount] = useState(heart);

  const toggleLike = async () => {
    // if (!isLogin) {
    //   alert("로그인을 해주세요!");
    //   return;
    // }

    if (!liked) {
      //   const { result, data, message } = await axios({
      //     method: "post",
      //     url: `http://54.180.143.106/api/postLike/${postId}`,
      //     headers: {
      //       Authorization: localStorage.getItem("Authorization"),
      //       RefreshToken: localStorage.getItem("RefreshToken"),
      //     },
      //   });
      // const { result, data, message } = RESP.LIKE_SUCCESS;

      // if (result) {
      //   alert(message);
      //   return;
      // }
      setLiked((liked) => !liked);
      console.log(liked);
      setHeartCount((prev) => prev + 1);
    } else {
      //   const { result, data, message } = await axios({
      //     method: "delete",
      //     url: `http://54.180.143.106/api/postLike/${postId}`,
      //     headers: {
      //       Authorization: localStorage.getItem("accessToken"),
      //       RefreshToken: localStorage.getItem("refreshToken"),
      //     },
      //   });

      // success
      // const { result, data, message } = RESP.UNLIKE_SUCCESS;

      setLiked((liked) => !liked);
      setHeartCount((prev) => prev - 1);
    }
  };

  return (
    <>
      {!liked ? (
        <LikeWrapper>
          <HeartIconFalse icon={regularHeart} onClick={toggleLike} />
        </LikeWrapper>
      ) : (
        <LikeWrapper>
          <HeartIconTrue icon={solidHeart} onClick={toggleLike} />
        </LikeWrapper>
      )}
    </>
  );
};

const HeartIconFalse = styled(FontAwesomeIcon)`
  font-size: 18px;
  cursor: pointer;
  color: ${(props) => props.theme.darkgray};
  &:nth-child(2) {
    color: ${(props) => props.theme.mainColor};
  }
`;

const HeartIconTrue = styled(FontAwesomeIcon)`
  font-size: 18px;
  cursor: pointer;
  color: ${(props) => props.theme.mainColor};
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  width: 50px;
  height: 50px;
  border: none;
  position: fixed;
  background-color: white;

  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);

  @media (min-width: 1024px) {
    right: 6%;
    bottom: 11%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    right: 5%;
    bottom: 11%;
  }
  @media (max-width: 767px) {
    right: 4%;
    bottom: 11%;
  }
`;

export default LikeButton;
