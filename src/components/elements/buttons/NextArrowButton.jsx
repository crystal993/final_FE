import React from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";

const NextArrowButton = ({ onClick }) => {
  return (
    <>
      <Button onClick={onClick}>
        <IoIosArrowForward />
      </Button>
    </>
  );
};

const Button = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 0.2rem;
  width: 2rem;
  height: 3rem;
  font-size: 2rem;
  opacity: 0.9;
  display: block;
  text-shadow: center;
  border: none;
  position: absolute;
  cursor: pointer;
  transition: all 3ms ease;
  z-index: 3;
  color: ${({ theme }) => theme.darkgray};
  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 2.5rem;
    height: 3.5rem;
    font-size: 2.5rem;
    top: 10rem;
    right: 1rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 2.5rem;
    height: 3.5rem;
    font-size: 2.5rem;
    top: 8rem;
    right: 1rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    top: 5rem;
    right: 1rem;
  }
`;

export default NextArrowButton;
