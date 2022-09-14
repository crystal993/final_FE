import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';
import { useNavigate, useLocation } from 'react-router-dom';

const DetailButton = ({ memberId, nickName }) => {
  const sock = new SockJS('http://3.35.47.137/ws');
  const ws = webstomp.over(sock);
  const token = localStorage.getItem('access-token');
  const navigate = useNavigate();

  useEffect(() => {
    waitForConnection(ws, wsConnectSubscribe());
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, []);

  //렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('connected');
  //     ws.send(
  //       `http://3.35.47.137/room/invite/3`,
  //       JSON.stringify({ memberId: 3 })
  //     );
  //   }, 500);

  //   return () => {
  //     wsDisConnectUnsubscribe();
  //   };
  // }, [ws, wsDisConnectUnsubscribe]);

  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          // 채팅 만들기,메시지 보내기(roomId) , 해당 채팅방 구독
          ws.subscribe(`sub/chat/room/31`, {}, { token: token });
          // 채팅방 만들기(memberId) -> 방 만드는 사람의 아이디
          // send랑 똑같은 멤버 아이디
          // ws.subscribe(`/sub/room/founder/9`, function (greeting) {
          //   console.log(greeting.body);
          //   console.log('채팅방');
          // });
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

  // 메시지 보내기
  function sendMessage() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인 해주세요.');
        navigate('/login');
      }
      // 보낼 data
      const content = {
        content: '메시지 가라 좀',
        memberId: 4,
        createdAt: '2022-07-11',
      };
      // 데이터 보내기
      waitForConnection(ws, function () {
        // 해당 채팅방에 메시지 보내기(roomId) , 해당 채팅방에 메시지 보내기
        ws.send('/pub/chat/room/31', JSON.stringify(content), { token: token });
        // 초대하는 사람의 멤버 아이디
        // 방을 만드는 사람 , 두번째가 초대되는 사람
        // ws.send(`/pub/room/founder/9`, JSON.stringify({ memberId: 4 }), {
        //   token: token,
        // });
        console.log(ws.ws.readyState);
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  return (
    <STbutton className='btn'>
      <span
        onClick={() => {
          // navigate(`/chatRoom/24`);
          sendMessage();
        }}
      >
        채팅으로 거래하기
      </span>
    </STbutton>
  );
};

export default DetailButton;

const STbutton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 90%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 95%;
  }

  @media screen and (max-width: 767px) {
    /* Mobile */
    width: 98%;
  }
  margin: 0 auto;
  background: #b63eff;
  padding: 1rem;
  span {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.3rem;
    text-align: center;
    color: #ffffff;
  }
  border: 1px solid gray;

  .btn:hover {
    cursor: pointer;
  }
`;
