import { useState } from "react";
import RESP from "../../../server/response";
import Button from "../GlobalButton";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { apis } from "../../../shared/axios";
import GlobalModal from "../GlobalModal";

const ItemZzimButton = ({ isZzim, isLogin, postId }) => {
  const [isZzimed, setZzimed] = useState(isZzim);

  const toggleLike = async () => {
    if (!isLogin) {
      alert("로그인을 해주세요!");
      return;
    }

    if (!isZzimed) {
      const { data } = await apis.like_post(postId);
      if (data.isHeart) {
        <GlobalModal content={data.msg} />;
      }

      setZzimed((isZzimed) => !isZzimed);
    } else {
      const { data } = await apis.unlike_post(postId);
      if (!data.isHeart) {
        <GlobalModal content={data.msg} />;
      }

      setZzimed((isZzimed) => !isZzimed);
    }
  };

  return (
    <>
      {!isZzimed ? (
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

export default ItemZzimButton;
