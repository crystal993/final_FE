import React from "react";
import styled, { css } from "styled-components";

const FixTwoButton = ({ content1, content2 }) => {
  return (
    <>
      <ButtonsWrapper>
        <STbutton1 className="btn">
          <span>{content1}</span>
        </STbutton1>
        <STbutton2 className="btn">
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
  bottom: 10;
  left: 0;
  right: 0;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 45%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 42%;
  }

  @media screen and (max-width: 767px) {
    /* Mobile */
    width: 40%;
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

const STbutton2 = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 45%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 42%;
  }

  @media screen and (max-width: 767px) {
    /* Mobile */
    width: 40%;
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
