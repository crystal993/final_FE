import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

function GlobalButton({ content, icon, size, onClick, width }) {
  return (
    <Wrapper onClick={onClick} width={width}>
      {icon && <Icon icon={icon} size={size} />}
      {content && <Btn size={size}>{content}</Btn>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: ${(width) => width};
`;
const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.mainColor};
  padding: 10px 20px;
`;

const Btn = styled.button`
  text-align: center;
  padding: 8px 15px;
  margin: 5px auto;
  color: #ffffff;
  border-radius: ${(props) => props.theme.buttonRadius};
  transition: ${(props) => props.theme.transition};
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  &:hover {
    cursor: pointer;
    background-color: #ffffff;
    box-shadow: inset 0px 0px 4px 0px #b6b7b9;
    color: ${(props) => props.theme.mainColor};
  }
  ${(props) =>
    props.size === "large" &&
    css`
      height: 3rem;
      font-size: 1.25rem;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      height: 2.25rem;
      font-size: 1rem;
    `}
    ${(props) =>
    props.size === "small" &&
    css`
      height: 1.75rem;
      font-size: 0.875rem;
    `}
    display: flex;
  align-items: center;
`;

export default GlobalButton;
