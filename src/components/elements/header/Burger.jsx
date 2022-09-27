import React from "react";
import { bool, func } from "prop-types";
import styled from "styled-components";

const Burger = ({ open, setOpen, ...props }) => {
  const isExpanded = open ? true : false;

  return (
    <StyledBurger
      aria-label="Toggle menu"
      aria-expanded={isExpanded}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <Bar open={open} />
      <Bar open={open} />
      <Bar open={open} />
    </StyledBurger>
  );
};

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 99999;
  color: ${({ theme }) => theme.black};
`;

const Bar = styled.span`
  display: block;
  width: 2rem;
  height: 0.25rem;
  background: ${({ theme }) => theme.mainColor};
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;

  :first-child {
    transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
  }

  :nth-child(2) {
    opacity: ${({ open }) => (open ? "0" : "1")};
    transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
  }

  :nth-child(3) {
    transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
  }
`;
