import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

function GlobalButton({
  content,
  icon,
  size,
  onClick,
  width,
  height,
  fontSize,
  fontWeight,
}) {
  return (
    <Wrapper onClick={onClick}>
      {icon && <Icon icon={icon} size={size} />}
      {content && (
        <Btn
          size={size}
          fontSize={fontSize}
          fontWeight={fontWeight}
          width={width}
          height={height}
        >
          {content}
        </Btn>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: ${(props) => props.width};
`;
const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.mainColor};
  padding: 1rem 2rem;
`;

const Btn = styled.button`
  text-align: center;
  padding: 1rem;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.theme.white};
  border-radius: ${(props) => props.theme.buttonRadius};
  transition: ${(props) => props.theme.transition};
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  font-size: ${(props) => props.fontSize};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.white};
    box-shadow: inset 0px 0px 4px 0px #b6b7b9;
    color: ${(props) => props.theme.mainColor};
    border-color: ${(props) => props.theme.mainColor};
  }
`;

export default GlobalButton;
