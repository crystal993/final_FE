import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import ChatRoomCard from "../../components/elements/chat/ChatRoomCard";

function ChattingListPage({}) {
  // 소켓 연결
  const sock = new SockJS("http://3.35.47.137/ws");
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
        ()=>{
        ws.subscribe(
          `/sub/room/${loginMemberId}`, 
            function (frame) {
            console.log(frame);
            setRooms([...rooms, ...JSON.parse(frame.body)]);
          });
        ws.send(
          `/pub/room/${loginMemberId}`,
          {
            token: token,
          }
        );

        setTimeout(
          () => {
            ws.subscribe(
              `/sub/room/founder/${loginMemberId}`,
              function (payload) {
                console.log(JSON.parse(payload.body));
                setRooms([...rooms, JSON.parse(payload.body)]);
              },
              {
                token:token
              }
            );
        },500)
      },[rooms])
    } catch (error) {
      console.log(error);}

    return () => {
      ws.unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   try{ws.connect(
  //     {
  //       token:token
  //     },
  //     ()=>{
  //     })} catch(error) 
  //     {console.log(error)};
  //   return () => {
  //     ws.unsubscribe();
  //   };
  // }, [rooms]);
  console.log(ws);
  return (
    <StChatRoomList>
      {rooms.length === 0 ? (
        <h1 className="no-chartroom">참여중인 채팅방이 없습니다</h1>
      ) : (
        rooms.map((room) => {
          return (
            <ChatRoomCard
              key={room.roomInfoId}
              roomId={room.roomInfoId}
              roomName={room.title}
              stompClient={ws}
            />
          );
        })
      )}
    </StChatRoomList>
  );
}

// return <div>ChattingListPage</div>;

const StChatRoomList = styled.div`
  width: calc(100vw - 48px);
  height: calc(100vh - 178px);
  background-color: #ffffff;
  overflow-y: scroll;
  .no-chatroom {
    margin-top: 20px;
    text-align: center;
    font-size: 1.4rem;
  }
`;
export default React.memo(ChattingListPage);

// export default ChattingListPage;
