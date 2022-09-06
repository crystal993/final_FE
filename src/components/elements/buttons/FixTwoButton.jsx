import React from "react";
import styled, { css } from "styled-components";

const FixTwoButton = ({ content1, content2, onClick1, onClick2 }) => {
  return (
    <>
      <ButtonsWrapper>
        <STbutton1 className="btn" onClick={onClick1}>
          <span>{content1}</span>
        </STbutton1>
        <STbutton2 className="btn" onClick={onClick2}>
          <span>{content2}</span>
        </STbutton2>
      </ButtonsWrapper>
    </>
  );
};

export default FixTwoButton;

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
  span {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.3rem;
    text-align: center;
    color: #ffffff;
  }
  .btn:hover {
    cursor: pointer;
  }
  @media screen and (min-width: 1024px) {
    /* Desktop */
    right: 45%;
    width: 45%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    right: 47.5%;
    width: 47.5%;
  }

  @media screen and (max-width: 767px) {
    /* Mobile */
    right: 49%;
    width: 49%;
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
  @media screen and (min-width: 1024px) {
    /* Desktop */
    left: 45%;
    width: 45%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    left: 47.5%;
    width: 47.5%;
  }

  @media screen and (max-width: 767px) {
    /* Mobile */
    left: 49%;
    width: 49%;
  }
`;
