import React, { useState } from "react";
import styled from "styled-components";

const GlobalSelect = ({ optionDatas }) => {
  const [currentOption, setCurrentOption] = useState(optionDatas[0].name);
  const [isShowOptions, setIsShowOptions] = useState(false);

  const onChangeSelectOptionHandler = (e) => {
    setCurrentOption(e.target.getAttribute("name"));
  };
  return (
    <>
      <SelectorWrapper onClick={() => setIsShowOptions((prev) => !prev)}>
        <Label>{currentOption}</Label>
        {isShowOptions && (
          <SelectOptions>
            {optionDatas.map((option) => (
              <Option
                onClick={onChangeSelectOptionHandler}
                key={option.value}
                value={option.value}
                name={option.name}
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
  width: 8.8rem;
  height: 3.2rem;
  border-radius: 0.6rem;
  text-align: center;
  color: ${({ theme }) => theme.mainColor};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 20rem;
  align-self: center;
  border: 2px solid ${({ theme }) => theme.mainColor};
  cursor: pointer;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: flex-start;
  padding: 0.3rem 0 0 1.4rem;
  transition: background-color 0.2s ease-in;
  &::before {
    content: "⌵";
    position: absolute;
    top: -9rem;
    right: 0.8rem;
    font-size: 1.4rem;
  }
`;

const Label = styled.label`
  font-size: 1.4rem;
  cursor: pointer;
`;
const SelectOptions = styled.ul`
  width: 8.8rem;
  margin: 0.5rem 0 0 -1.5rem;
  font-size: 1.4rem;

  border: 2px solid ${({ theme }) => theme.mainColor};
  border-top: none;
  text-align: left;
  border-radius: 0.6rem;
`;
const Option = styled.li`
  width: 8.8rem;
  padding: 0.6rem 0 0.6rem 0;
  padding-left: 1.3rem;
  /* 짝수번째 요소에 배경색 넣기 */
  &:nth-child(2n) {
    width: 8.5rem;
    background-color: #f6f2fe;
    font-weight: 900;
  }
`;

export default GlobalSelect;
