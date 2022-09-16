import React from 'react';
import styled, { css } from 'styled-components';
import image from '../../assets/images/KakaoTalk_logo.svg';

// 채팅 메시지 컴포넌트
const ChatCard = () => {
  return (
    <STchatCardWrapper>
      <img src={image} alt='카카오톡 이미지'></img>
      <STcontentWrapper>
        <h3>닉네임</h3>
        <STchatCard>오늘 뭐먹지</STchatCard>
      </STcontentWrapper>
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
  ${({ author }) => {
    switch (author === 'me') {
      case true:
        return css`
          align-self: flex-end;
          background-color: #ffeb33;
          ::after {
            position: absolute;
            right: -0.3rem;
            color: #ffeb33;
            font-size: 1.8rem;
            transform: rotate(30deg);
          }
        `;
      default:
        return css`
          background-color: #fff;
          ::before {
            position: absolute;
            left: 6rem;
            color: #fff;
            font-size: 1.8rem;
            top: 2.5rem;
            transform: rotate(30deg);
          }
        `;
    }
  }}
`;
