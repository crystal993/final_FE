import React, { useState } from 'react';
import styled, { css } from 'styled-components';

// 채팅방 메시지 보내기 컴포넌트
function ChatSubmitBox({ sock, ws, room, token }) {
  const [chatBody, setChatBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdAt = Date.now().toString();
    console.log(createdAt);
    const content = {
      content: chatBody,
      memberId: 5,
      createdAt: '2022-01-01',
    };
    //roomId에 해당하는 채팅방으로 구독하고
    ws.subscribe(`sub/chat/room/${room}`, {}, { token: token });
    // 해당하는 채팅방에 메시지 보내기
    ws.send(`/pub/chat/room/${room}`, JSON.stringify(content), {
      token: token,
    });
    setChatBody('');
  };

  return (
    <StboxContainer>
      <StChatForm>
        <input
          onChange={(e) => {
            setChatBody(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
          value={chatBody}
        />
        <button onClick={handleSubmit}>전송</button>
      </StChatForm>
    </StboxContainer>
  );
}

export default ChatSubmitBox;

const StboxContainer = styled.div`
  width: 100vw;
  height: max-content;
  background-color: #fff;
`;

const StChatForm = styled.form`
  width: 100%;
  height: 10%;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  input {
    width: 100%;
    flex-grow: 1;
    overflow-y: hidden;
    text-align: justify;
    resize: none;
    border: none;
    font-size: 1.3rem;
    :focus {
      outline: none;
      text-decoration: none;
      color: black;
    }
  }
  button {
    position: absolute;
    bottom: 1.5rem;
    right: 0;
    margin-right: 1rem;
    width: 4.8rem;
    height: 2.8rem;
    background-color: #ffec42;
    border: 1px solid #e8d73f;
    border-radius: 0.5rem;
    ${({ chatLength }) => {
      switch (chatLength > 0) {
        case true:
          return css`
            color: rgba(0, 0, 0, 1);
          `;
        default:
          return css`
            color: rgba(0, 0, 0, 0.3);
          `;
      }
    }}
  }
`;
