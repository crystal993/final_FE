import React, { Component, Fragment } from "react";
import styled, { css } from "styled-components";

const FixThreeButton = ({
  content1,
  content2,
  content3,
  onClick1,
  onClick2,
  onClick3,
  icon1,
  icon2,
  icon3,
}) => {
  return (
    <>
      <ButtonsWrapper>
        <STbutton1 onClick={onClick1}>
          <StIcon src={icon1} alt={content1}></StIcon>
          <StSpan>{content1}</StSpan>
        </STbutton1>
        <STbutton2 onClick={onClick2}>
          <StIcon src={icon2} alt={content2}></StIcon>
          <StSpan>{content2}</StSpan>
        </STbutton2>
        <STbutton3 onClick={onClick3}>
          <StIcon src={icon3} alt={content3}></StIcon>
          <StSpan>{content3}</StSpan>
        </STbutton3>
      </ButtonsWrapper>
    </>
  );
};

export default FixThreeButton;

const ButtonsWrapper = styled.button`
  display: flex;
  flex-direction: row;
`;

const STbutton1 = styled.button`
  position: fixed;
  bottom: 0;
  left: 0%;
  height: 4.8rem;
  margin: 0 auto;
  background: ${(props) => props.theme.gray};
  padding: 1rem;
  z-index: 20;
  border: none;
  margin: 0 auto;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  span {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.3rem;
    text-align: center;
    color: #ffffff;
  }
  &:hover {
    cursor: pointer;
  }
  @media screen and (min-width: 1024px) {
    /* Desktop */
    left: 4.5%;
    width: 34%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    left: 2.5%;
    width: 32%;
  }

  @media screen and (max-width: 767px) {
    /* Mobile */
    left: 1%;
    width: 33%;
  }
`;

const STbutton2 = styled.button`
  position: fixed;
  bottom: 0;
  left: 45%;
  right: 0%;
  height: 4.8rem;
  margin: 0 auto;
  background: ${(props) => props.theme.darkgray};
  padding: 1rem;
  z-index: 20;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  span {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.3rem;
    text-align: center;
    color: #ffffff;
  }
  border: 1px solid gray;
  .btn:hover {
    cursor: pointer;
  }
  @media screen and (min-width: 1024px) {
    /* Desktop */
    left: 2.5%;
    width: 30%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    left: -0.5%;
    width: 32%;
  }

  @media screen and (max-width: 767px) {
    /* Mobile */
    left: -1%;
    width: 33%;
  }
`;

const STbutton3 = styled.button`
  position: fixed;
  bottom: 0;
  left: 45%;
  right: 0%;
  height: 4.8rem;
  margin: 0 auto;
  background: ${(props) => props.theme.darkgray};
  padding: 1rem;
  z-index: 20;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  span {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.3rem;
    text-align: center;
    color: #ffffff;
  }
  border: 1px solid gray;
  .btn:hover {
    cursor: pointer;
  }
  @media screen and (min-width: 1024px) {
    /* Desktop */
    left: 62%;
    width: 30%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    left: 63%;
    width: 32%;
  }

  @media screen and (max-width: 767px) {
    /* Mobile */
    left: 65%;
    width: 33%;
  }
`;

const StIcon = styled.img`
  fill: #ffffff;
  width: 1.6rem;
`;

const StSpan = styled.span``;
