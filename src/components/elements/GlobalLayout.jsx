import React from 'react';
import styled from 'styled-components';

const GlobalLayout = ({ children }) => {
  return <StGlobalLayoutWrap>{children}</StGlobalLayoutWrap>;
};

export default GlobalLayout;

const StGlobalLayoutWrap = styled.div`
  width: 1760px;
  margin: 0 auto;
  @media (min-width: 1024px) {
    width: 90%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 95%;
  }
  @media (max-width: 767px) {
    width: 98%;
  }
`;
