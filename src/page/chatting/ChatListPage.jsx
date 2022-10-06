import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import ChatRoomCard from "../../components/elements/chat/ChatRoomCard";
import GlobalHeaderChat from "../../components/elements/GlobalHeaderChat";
import GlobalHeader2 from "../../components/elements/GlobalHeader2";

function ChattingListPage({}) {
  // 소켓 연결
  const sock = new SockJS("https://3.35.47.137/wss");
  const ws = webstomp.over(sock);

  const member = localStorage.getItem("user-info");
  const obj = JSON.parse(member);
  const loginMemberId = obj.memberId;

  const token = localStorage.getItem("access-token");

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(`/sub/room/${loginMemberId}`, function (frame) {
            console.log(frame);
            setRooms([...rooms, ...JSON.parse(frame.body)]);
          });
          ws.send(`/pub/room/${loginMemberId}`, {
            token: token,
          });

          setTimeout(() => {
            ws.subscribe(
              `/sub/room/founder/${loginMemberId}`,
              function (payload) {
                console.log(JSON.parse(payload.body));
                setRooms([...rooms, JSON.parse(payload.body)]);
              },
              {
                token: token,
              }
            );
          }, 100);
        },
        [rooms]
      );
    } catch (error) {
      console.log(error);
    }

    return () => {
      ws.unsubscribe();
    };
  }, []);

  console.log(rooms);
  return (
    <>
      <GlobalHeader2 IconType={"ArrowBack"} />
      <SectionWrapper>
        <MyChatListTitle>채팅 목록</MyChatListTitle>
      </SectionWrapper>
      <StChatRoomList>
        {rooms.length === 0 ? (
          <h1 className="no-chartroom">참여중인 채팅방이 없습니다</h1>
        ) : (
          rooms.map((room) => {
            console.log(room.roomInfoId);
            return (
              <ChatRoomCard
                key={room.roomInfoId}
                roomId={room.roomInfoId}
                roomNickname={room.nickname}
                roomName={room.title}
                itemMemberId={room.itemMemberId}
                itemId={room.itemId}
                stompClient={ws}
              />
            );
          })
        )}
      </StChatRoomList>
    </>
  );
}

const SectionWrapper = styled.section`
  width: 100%;
  display: flex;
  margin: 0 auto;
  /* margin-left: 0.6rem; */
  flex-direction: row;
  padding-top: 9rem;
  margin-bottom: 2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const MyChatListTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-left: 2rem;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 70rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 39rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 28rem;
  }
`;

const StChatRoomList = styled.div`
  padding-top: 0.5rem;
  height: calc(100vh - 17rem);
  background-color: #ffffff;
  .no-chatroom {
    margin-top: 20px;
    text-align: center;
    font-size: 1.4rem;
  }
`;
export default React.memo(ChattingListPage);
