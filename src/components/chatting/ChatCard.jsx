import React from 'react';
import styled, { css } from 'styled-components';
import image from '../../assets/images/KakaoTalk_logo.svg';

// 채팅 메시지 컴포넌트
const ChatCard = (frame) => {
  const author = frame.author
  const nickname = frame.nickname
  const createdAt = frame.createdAt
  const body = frame.body
  
  return (
    <STchatCardWrapper>
      {author === "friend" && <img src={image} alt='카카오톡 이미지'></img>}
      {author === "me" && (
        <span>{createdAt}</span>
      )}
      <STcontentWrapper author={author}>
        {author === "friend" && <h3>{nickname}</h3>}
        <STchatCard author={author}>{body}</STchatCard>
      </STcontentWrapper>
      {author === "friend" && (
        <span>{createdAt}</span>
      )}
    </STchatCardWrapper>
  );
};

export default ChatCard;

// 만약 상대방이 보낸 메시지 이면 반대쪽에서 보여지게 css 작업

const STchatCardWrapper = styled.div`
  position: relative;
  display: flex;
  max-width: calc(100% - 80px);
  padding: 0.7rem;
  img {
    width: 4.3rem;
    height: 4.3rem;
    border-radius: 41%;
    margin-right: 1.8rem;
  }
  align-items: center;
`;

// display: flex;
// flex-direction: column-reverse;

const STcontentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 0.9rem;
    font-weight: 400;
    padding-bottom: 0.5rem;
  }
`;

const STchatCard = styled.div`
  text-align: justify;
  display: inline-block;
  font-size: 1.3rem;
  border-radius: 0.4rem;
  padding: 0.5rem;
`;
