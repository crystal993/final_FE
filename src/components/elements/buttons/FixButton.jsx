import React from "react";
import styled from "styled-components";

const FixButton = ({ content, onClick }) => {
  return (
    <STbutton className="btn" onClick={onClick}>
      <span>{content}</span>
    </STbutton>
  );
};

export default FixButton;

const STbutton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: ${({ theme }) => theme.mainColor};
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
`;
