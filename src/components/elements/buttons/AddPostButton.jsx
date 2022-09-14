import React from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";

const AddPostButton = ({ onClick, isLogin }) => {
  return (
    <StAddPostBtn onClick={onClick} isLogin={isLogin}>
      <StAddIcon />
    </StAddPostBtn>
  );
};

const StAddPostBtn = styled.button`
  border-radius: 5rem;
  width: 6rem;
  height: 6rem;
  border: none;
  position: fixed;
  cursor: pointer;
  background-color: ${(props) =>
    props.isLogin ? props.theme.mainColor : props.theme.grey};
  @media (min-width: 1024px) {
    right: 10%;
    bottom: 5%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    right: 7%;
    bottom: 5%;
  }
  @media (max-width: 767px) {
    right: 5%;
    bottom: 5%;
  }
`;

const StAddIcon = styled(AddIcon)`
  width: 3.4rem;
  height: 3.4rem;
`;

export default AddPostButton;
