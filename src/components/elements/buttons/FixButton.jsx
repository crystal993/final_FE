import React from "react";
import styled from "styled-components";

const FixButton = ({ content, onClick, version }) => {
  return (
    <STbutton className="btn" onClick={onClick} version={version}>
      <span>{content}</span>
    </STbutton>
  );
};

export default FixButton;

const STbutton = styled.button`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: ${(props) =>
    props.version === 2 ? props.theme.gray : props.theme.mainColor};
  padding: 1rem;
  border: none;
  cursor: pointer;
  span {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.3rem;
    text-align: center;
    color: #ffffff;
  }
  &:hover {
    background: ${(props) =>
      props.version === 2 ? props.theme.mainColor : props.theme.gray};
  }
`;
