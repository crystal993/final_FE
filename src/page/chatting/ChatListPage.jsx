import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux/es/exports";
import { useEffect , useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';
import ChatRoomCard from '../../components/elements/chat/ChatRoomCard';

function ChattingListPage({}) {
  const sock = new SockJS('http://localhost:8080/ws');
  const stompClient = webstomp.over(sock);

  const member = localStorage.getItem('user-info');
  const obj = JSON.parse(member);
  const loginMemberId = obj.memberId;

  const token = localStorage.getItem('access-token');

  const[rooms, setRooms] = useState([]);

  useEffect(() =>  {
    let listSubscription;
    listSubscription = stompClient.subscribe(
      `/sub/room/${loginMemberId}`,
      function (frame) {
        console.log(frame);
        setRooms([...rooms, ...JSON.parse(frame.body)]);
      }
    );
    stompClient.send(
      `/pub/room/${loginMemberId}`,
      {},
      {
        token: token
      }
    );
    
    return () => {
      listSubscription.unsubscribe();
    };
  },[]);

    useEffect(()=>{
      let invitedRoomSubscription;
      if(stompClient.connected) {
        invitedRoomSubscription = stompClient.subscribe(
          `/sub/room/founder/${loginMemberId}`,
          function (payload) {
            console.log(JSON.parse(payload.body));
            setRooms([...rooms, JSON.parse(payload.body)]);
          }
        );
      }
      return () => {
        invitedRoomSubscription.unsubscribe();
      };
    }, [rooms]);
    console.log(stompClient);
    return (
      <StChatRoomList>
        {rooms.length === 0 ? (
          <h1 className='no-chartroom'>참여중인 채팅방이 없습니다</h1>
        ) : (
          rooms.map((room) => {
            return(
              <ChatRoomCard
              key={room.roomInfoId}
              roomId={room.roomInfoId}
              roomName={room.title}
              stompClient={stompClient}
              />
            );
          })
        )}
      </StChatRoomList>
    )
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
