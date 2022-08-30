import React from "react";
import styled from "styled-components";

const GlobalFooter = () => {
  return (
    <>
      <Footer>footer</Footer>
    </>
  );
};

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.mainColor};
  width: 100%;
  height: 200px;
  text-align: center;
  margin: 0 auto;
`;

export default GlobalFooter;
