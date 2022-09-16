import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../assets/icons/add-1.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/remove.svg";
import PriceChart from "./chart/PriceChart";

const GlobalAccordian = ({ btnTxt, contents }) => {
  const [open, setOpen] = useState(false);
  const onAccordianHandler = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <AccordianWrapper onClick={onAccordianHandler}>
        <Item>{btnTxt}</Item>
        <Item>{open ? <RemoveIcon /> : <AddIcon />}</Item>
      </AccordianWrapper>
      <AccordianContentsWrapper aria-expanded={!open}>
        {contents}
      </AccordianContentsWrapper>
    </>
  );
};

const AccordianWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.8rem;
  margin-top: 1.8rem;
  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.mainColor};
  border-bottom: 1px solid ${({ theme }) => theme.mainColor};
  color: ${({ theme }) => theme.mainColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease-in-out;
`;

const AccordianContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  overflow: hidden;
  max-height: 1000px;
  transition: max-height 1s ease-in-out;
  &[aria-expanded="true"] {
    max-height: 0px;
    transition: max-height 0.5s;
  }
`;

export default GlobalAccordian;
