import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Burger from "./header/Burger";
import Menu from "./header/Menu";
import { ReactComponent as ChatIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

const GlobalHeader = () => {
  const navigate = useNavigate();

  const menuBackground = {
    boxShadow: "rgba(0,0,0,0.5) 0 0 0 9999px",
  };
  // menu 외부를 눌렀을 때 꺼지도록
  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }, [ref, handler]);
  };

  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  const onPathHandler = (path) => {
    navigate(path);
  };

  useOnClickOutside(node, () => setOpen(false));
  return (
    <NavbarWrapper>
      <Navbar>
        <NavItem ref={node}>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
          <Menu open={open} setOpen={setOpen} id={menuId} />
        </NavItem>
        <NavItem onClick={() => onPathHandler("/")}>
          <span style={{ marginRight: "-1.5rem" }}>LOGO</span>
        </NavItem>
        <NavItem>
          <SearchIcon onClick={() => onPathHandler("/search")} />
          {/* TODO 추후에 채팅 리스트 페이지 생기면 path 적용 */}
          <ChatIcon />
        </NavItem>
      </Navbar>
    </NavbarWrapper>
  );
};

export default GlobalHeader;

const NavbarWrapper = styled.div`
  margin: 0;
  z-index: 5;
  padding: 0;
  height: 4.8rem;
  width: 100%;
  position: fixed;
  box-sizing: border-box;
`;

const Navbar = styled.nav`
  height: 4.8rem;
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
