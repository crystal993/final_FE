import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ReactComponent as ArrowBackIcon } from "../../../assets/icons/arrow_back_ios.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { useDispatch } from "react-redux";
import { __itemSearch } from "../../../redux/modules/searchSlice";

const SearchHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onPathHandler = (path) => {
    navigate(path);
  };

  // 검색 기능
  const onSearchResultHandler = (formData) => {
    dispatch(__itemSearch({ keyword: formData.keyword }));
  };

  return (
    <NavbarWrapper>
      <Navbar>
        <NavItem>
          <ArrowBackIcon onClick={() => onPathHandler("/")} />
        </NavItem>
        <StForm onSubmit={handleSubmit(onSearchResultHandler)}>
          <NavItem>
            <StInput
              placeholder="검색어를 입력해주세요."
              type="text"
              name="keyword"
              required
              {...register("keyword")}
            />
          </NavItem>
          <NavItem>
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </NavItem>
        </StForm>
      </Navbar>
    </NavbarWrapper>
  );
};

export default SearchHeader;

const NavbarWrapper = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.mainColor};
  color: white;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  gap: 2rem;
  cursor: pointer;
  width: fit-content;
`;

const StInput = styled.input`
  width: 27rem;
  height: 3rem;
  border: none;
  border-radius: 0.4rem;
  color: rgba(0, 0, 0, 0.85);
  padding: 0.4rem 1.1rem;
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.3rem;
  &:hover {
    border-color: ${({ theme }) => theme.mainColor};
  }
  &:focus {
    border-color: ${({ theme }) => theme.mainColor};
    outline: none;
  }
  &::placeholder {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: ${({ theme }) => theme.gray};
  }
  @media (min-width: 1024px) {
    width: 40rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 35rem;
  }
  @media (max-width: 767px) {
    width: 28rem;
  }
`;

const StForm = styled.form`
  width: 73%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.mainColor};
`;
