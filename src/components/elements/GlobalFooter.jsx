import React from "react";
import styled from "styled-components";

const GlobalFooter = () => {
  return (
    <>
      <Footer>
        <FooterContentsWrapper>
          <p>
            Copyright 2022. 멍냥마켓. All Rights Reserved. <br></br>
            <br></br>
            FE_김수정_ggg7152@gmail.com 김주형_wnguddl9632@daum.net
            UI/UX_양명현_and2288@naver.com<br></br> BE_이회섭_5chips17@gmail.com
            한종혁_B1gDD@naver.com 김재영_jy0511_@naver.com
          </p>
        </FooterContentsWrapper>
      </Footer>
    </>
  );
};

const Footer = styled.footer`
  z-index: -10px;
  background-color: ${({ theme }) => theme.darkgray};
  width: 100%;
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
  height: 15rem;
  position: relative;
  transform: translatY(-100%);
  @media (max-width: 767px) {
    /* Mobile */
    height: 10rem;
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
