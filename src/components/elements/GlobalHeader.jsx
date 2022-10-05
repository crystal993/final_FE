import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Burger from "./header/Burger";
import Menu from "./header/Menu";
import { ReactComponent as ChatIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

const GlobalHeader = () => {
  const navigate = useNavigate();

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

  const divRef = useRef();
  // useEffect(() => {
  //   divRef.current.scrollIntoView();
  // }, []);

  const onScrollTop = () => {
    divRef.current.scrollIntoView(0);
  };

  const member = localStorage.getItem("user-info");
  const obj = JSON.parse(member);
  const loginMemberId = obj.memberId;

  return (
    <>
      <NavbarWrapper>
        <span ref={divRef}></span>
        <Navbar>
          <NavItem ref={node}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} />
          </NavItem>
          <NavItem
            onClick={() => {
              onPathHandler("/");
              window.localStorage.removeItem("petCategory");
              window.localStorage.removeItem("itemCategory");
            }}
          >
            <Logo
              src={process.env.PUBLIC_URL + "/img/logo_gnb2@2x.png"}
              alt="멍냥마켓 로고"
            ></Logo>
          </NavItem>
          <NavItem>
            <SearchIcon onClick={() => onPathHandler("/search")} />
            <ChatIcon
              onClick={() => onPathHandler(`/chatlist/${loginMemberId}`)}
            />
          </NavItem>
        </Navbar>
      </NavbarWrapper>
    </>
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

const Logo = styled.img`
  @media (min-width: 1280px) {
    /* Desktop */
    margin-left: 3rem;
    width: 9.3rem;
    height: 2.3rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-left: 3.5rem;
    width: 9.3rem;
    height: 2.3rem;
  }
  @media (min-width: 361px) and (max-width: 767px) {
    /* Mobile */
    margin-left: 2.3rem;
    width: 9rem;
    height: 2.3rem;
  }
  @media (max-width: 360px) {
    /* Mobile */
    margin-left: 1.4rem;
    width: 8rem;
    height: 2.1rem;
  }
`;
