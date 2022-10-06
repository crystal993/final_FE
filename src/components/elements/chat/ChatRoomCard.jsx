import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
// import { connectRoom } from "../redux/modules/currentRoomSlice";
import { useDispatch } from "react-redux";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile_img_sm.svg";

function ChatRoomCard({
  stompClient,
  roomId,
  roomName,
  roomNickname,
  itemId,
  itemMemberId,
}) {
  console.log(roomName);
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     stompClient.subscribe(`/sub/chat/room/${roomId}`, {
  //       token: token,
  //     });
  //   });

  const member = localStorage.getItem("user-info");
  const obj = JSON.parse(member);
  const loginMemberId = obj.memberId;

  return (
    <span
      //   ={`/chatroom/${roomId}/${loginMemberId}`}
      onClick={() => {
        localStorage.setItem("itemMemberId", itemMemberId);
        localStorage.setItem("itemNickname", roomNickname);
        localStorage.setItem("itemId", itemId);
        localStorage.setItem("title", roomName);
        navigate(`/chatroom/${roomId}/${loginMemberId}`);
      }}
    >
      <StChatRoomCard>
        <StUserBox>
          <UserImgBox>
            <StProfileIcon />
          </UserImgBox>
        </StUserBox>
        <StTextWrapper>
          <h3>{roomNickname}</h3>
          <p>{roomName}</p>
        </StTextWrapper>
      </StChatRoomCard>
    </span>
  );
}

const StChatRoomCard = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2rem;
  width: 100vw;
  height: 9.6rem;
  background-color: #ffffff;
  :hover {
    background-color: #f8f8f8;
  }
`;

const StTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    margin: 5px 0 3px 0;
    margin-left: 10px;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: black;
  }

  p {
    margin: 0.3rem 0 5px 0;
    font-size: 0.8rem;
    margin-left: 10px;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: #6b6b6b;
  }
`;

const StUserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  gap: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-right: 1rem;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    display: flex;
    align-content: center;
    justify-content: center;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    display: flex;
    align-content: center;
    justify-content: center;
  }
  @media (max-width: 767px) {
    /* Mobile */
    display: flex;
    align-content: center;
    justify-content: center;
  }
`;

const UserImgBox = styled.div`
  border-radius: 70%;
  overflow: hidden;
  @media (min-width: 768px) {
    /* Tablet */ /* Desktop */
    width: 5rem;
    height: 5rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 4rem;
    height: 4rem;
  }
`;

const StProfileIcon = styled(ProfileIcon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  circle {
    fill: #cbcbcb;
  }
`;

export default ChatRoomCard;
