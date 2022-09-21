import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as DropDownIcon } from "../../assets/icons/arrow_drop_down.svg";

const GlobalSelect = ({
  optionDatas,
  setSelected,
  color,
  width,
  height,
  optionWidth,
  optionsWidth,
  initialValue = optionDatas[0].name,
}) => {
  const [currentOption, setCurrentOption] = useState(initialValue);
  const [isShowOptions, setIsShowOptions] = useState(false);

  const onChangeSelectOptionHandler = (e) => {
    setCurrentOption(e.target.getAttribute("name"));
    setSelected(e.target.getAttribute("value"));
  };

  const selectRef = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsShowOptions(false);
      }
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [selectRef]);

  return (
    <>
      <SelectorWrapper
        color={color}
        width={width}
        height={height}
        onClick={() => setIsShowOptions((prev) => !prev)}
        ref={selectRef}
      >
        <DropDownIconSet color={color} />
        <Label>{currentOption}</Label>
        {isShowOptions && (
          <SelectOptions color={color} optionsWidth={optionsWidth}>
            {optionDatas.map((option) => (
              <Option
                onClick={onChangeSelectOptionHandler}
                key={option.value}
                value={option.value}
                name={option.name}
                color={color}
                optionWidth={optionWidth}
              >
                {option.name}
              </Option>
            ))}
          </SelectOptions>
        )}
      </SelectorWrapper>
    </>
  );
};

const SelectorWrapper = styled.div`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 0.6rem;
  text-align: center;
  color: ${({ color, theme }) =>
    color === "gray" ? theme.darkgray : theme.mainColor};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 20rem;
  align-self: center;
  border: 2px solid
    ${({ color, theme }) => (color === "gray" ? theme.gray : theme.mainColor)};
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.3rem 0 0 1.4rem;
  transition: all 0.3s;
`;

const DropDownIconSet = styled(DropDownIcon)`
  position: absolute;
  right: 1rem;
  top: 1.25rem;
  width: 1rem;
  height: 0.5rem;
  path {
    fill: ${({ color, theme }) =>
      color === "gray" ? "#1C1B1F" : theme.mainColor};
  }
`;

const Label = styled.label`
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s;
`;
const SelectOptions = styled.ul`
  width: ${({ optionsWidth }) => optionsWidth};
  margin: 0.5rem 0 0.2rem -1.6rem;
  font-size: 1.4rem;
  background-color: white;
  z-index: 100;
  border: 2px solid
    ${({ color, theme }) => (color === "gray" ? theme.gray : theme.mainColor)};
  border-top: none;
  text-align: left;
  border-radius: 0.6rem;
  transition: all 0.3s;
`;
const Option = styled.li`
  width: ${({ optionWidth }) => optionWidth};
  padding: 0.6rem 0 0.6rem 0;
  padding-left: 1.6rem;
  z-index: 100;
  transition: all 0.3s;
  &:hover {
    color: ${({ color, theme }) =>
      color === "gray" ? theme.darkgray : theme.mainColor};
    font-weight: 900;
    width: ${({ optionWidth }) => optionWidth};
    border-radius: 0.3rem;
    background-color: ${({ color, theme }) =>
      color === "gray" ? theme.lightgray : "#f6f2fe"};
  }
  &:nth-child(1) {
    width: ${({ optionWidth }) => optionWidth};
    border-top: 2px solid
      ${({ color, theme }) => (color === "gray" ? theme.gray : theme.mainColor)};
    border-radius: 0.6rem;
  }
`;

export default GlobalSelect;
