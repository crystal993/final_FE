import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";
import Burger from "./header/Burger";
import Menu from "./header/Menu";

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

  useOnClickOutside(node, () => setOpen(false));
  return (
    <NavbarWrapper>
      <Navbar>
        <NavItem ref={node}>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
          <Menu open={open} setOpen={setOpen} id={menuId} />
        </NavItem>
        <NavItem>
          <IoIosSearch
            onClick={() => {
              navigate("/search");
            }}
          />
        </NavItem>
      </Navbar>
    </NavbarWrapper>
  );
};

export default GlobalHeader;

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
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`;
