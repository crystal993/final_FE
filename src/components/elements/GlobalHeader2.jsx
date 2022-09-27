import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ArrowBackIcon } from "../../assets/icons/arrow_back_ios.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";

const GlobalHeader2 = ({ IconType = "Home" }) => {
  const navigate = useNavigate();
  const onPathHandler = (paths) => {
    navigate(paths);
  };

  return (
    <NavbarWrapper>
      <Navbar>
        <NavItem>
          {IconType === "ArrowBack" && (
            <ArrowBackIcon onClick={() => navigate(-1)} />
          )}
          {IconType === "Home" && <HomeIcon onClick={() => navigate("/")} />}
        </NavItem>
        <NavItem onClick={() => onPathHandler("/")}>
          <span style={{ marginRight: "-1.5rem" }}>LOGO</span>
        </NavItem>
        <NavItem></NavItem>
      </Navbar>
    </NavbarWrapper>
  );
};

export default GlobalHeader2;

const NavbarWrapper = styled.div`
  position: fixed;
  height: 4.8rem;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 5;
`;

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.headerMainColor};
  color: ${({ theme }) => theme.headerTxtColor};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
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
