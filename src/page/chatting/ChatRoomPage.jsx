import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import webstomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ChatSubmitBox from '../../components/chatting/ChatSubmitBox';
import ChatCard from '../../components/chatting/ChatCard';
import { __getinitialChatList } from '../../redux/modules/chattingSlice';
import { postChat, clearChat } from '../../redux/modules/chattingSlice';
import GlobalHeaderChat from '../../components/elements/GlobalHeaderChat';

function ChatRoomPage() {
  // 소켓 연결
  const sock = new SockJS('http://3.35.47.137/ws');
  const ws = webstomp.over(sock);

  const navigate = useNavigate();
  // access-token
  const token = localStorage.getItem('access-token');

  const dispatch = useDispatch();

  // 리스트 정보
  const listRef = useRef();

  // stompClient
  const stompClient = useRef(null);
  //
  const prevDate = useRef(0);
  // 채팅 내역 리스트

  // 방
  const [room, setRoom] = useState();

  const member = localStorage.getItem('user-info');
  const obj = JSON.parse(member);
  const loginMemberId = obj.memberId;

  // 컴포넌트 마운트시에 소켓 연결 , 채팅방 생성
  useEffect(() => {
    dispatch(__getinitialChatList);
    waitForConnection(ws, wsConnectSubscribe());
    makeRoom();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, []);

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, []);

  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          // 채팅방 만들기(memberId) -> 방 만드는 사람의 아이디(로그인한 사람의 아이디)
          // send랑 똑같은 멤버 아이디
          ws.subscribe(
            `/sub/room/founder/${loginMemberId}`,
            function (greeting) {
              console.log(greeting.body);
              const data = JSON.parse(greeting.body);
              console.log(data.roomInfoId);
              setRoom(data.roomInfoId);
              console.log('채팅방 생성');
            }
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // 연결해제, 구독해제
  function wsDisConnectUnsubscribe() {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe('sub-0');
        },
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(ws, callback = () => {}) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  // 방 생성하기
  function makeRoom() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인 해주세요.');
        navigate('/login');
      }
      // 데이터 보내기
      waitForConnection(ws, function () {
        // 초대하는 사람의 멤버 아이디
        // 방을 만드는 사람(로그인한 사람) , 두번째가 초대되는 사람(글 쓴 사람) , 초대되는사람 닉네임
        // itemId 추가
        ws.send(
          `/pub/room/founder/${loginMemberId}`,
          JSON.stringify({
            memberId: localStorage.getItem('itemMemberId'),
            nickname: localStorage.getItem('itemNickname'),
          }),
          {
            token: token,
          }
        );
        // 채팅만든 사람의 memberId 방에 들어가있는 리스트
        // ws.send(`/pub/room/15`, {}, { token: token });
        // console.log(ws.ws.readyState);
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  return (
    <>
      <GlobalHeaderChat />
      <StChatRoomPage>
        <StChatListContainer ref={listRef}></StChatListContainer>
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatSubmitBox sock={sock} ws={ws} room={room} token={token} />
      </StChatRoomPage>
    </>
  );
}

const StChatRoomPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #afc0cf;
`;

const StChatListContainer = styled.div``;

export default ChatRoomPage;
