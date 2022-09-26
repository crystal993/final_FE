import React from "react";
import styled from "styled-components";

const GlobalFooter = () => {
  return (
    <>
      <Footer>
        <FooterContentsWrapper>
          Footer영역 Copoyright.2022 <br></br>
          팀원 이름 이메일 등등 이용약관 적던지<br></br> 모바일 사이즈 최적화
          어쩌구 적어야되나
        </FooterContentsWrapper>
      </Footer>
    </>
  );
};

const Footer = styled.footer`
  z-index: -1px;
  background-color: ${({ theme }) => theme.darkgray};
  width: 100%;
  height: 15rem;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: none;
  color: white;
  font-size: 1rem;
  line-height: 1.7rem;
  font-weight: 500;
  position: absolute;
  bottom: 0;
  @media (max-width: 767px) {
    /* Mobile */
    height: 8rem;
  }
`;

const FooterContentsWrapper = styled.div`
  margin: 0 auto;
  padding: 2rem;
  @media (max-width: 767px) {
    /* Mobile */
    padding: 1rem 1.5rem;
  }
`;

export default GlobalFooter;
