import React from "react";
import styled from "styled-components";

const GlobalToggle = ({ isToggled, onToggle }) => {
  return (
    <ToggleWrapper>
      <Toggle
        id="checkbox"
        type="checkbox"
        checked={isToggled}
        onChange={onToggle}
      />
      <ToggleLabel htmlFor="checkbox" />
    </ToggleWrapper>
  );
};

export default GlobalToggle;

const ToggleWrapper = styled.div`
  position: relative;
  margin-top: 0.5rem;
`;

const ToggleLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 4.2rem;
  height: 2.1rem;
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.gray};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 1.4rem;
    height: 1.4rem;
    margin: 0.3rem;
    margin-left: 0.3rem;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: ${({ theme }) => theme.transition};
  }
`;

const Toggle = styled.input`
  z-index: 1;
  border-radius: 2rem;
  width: 4.2rem;
  height: 2.1rem;
  &:checked + ${ToggleLabel} {
    background: ${({ theme }) => theme.mainColor};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 2.5rem;

      transition: ${({ theme }) => theme.transition};
    }
  }
`;
