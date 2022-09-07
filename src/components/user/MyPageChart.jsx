import React from "react";
import styled from "styled-components";
import ZzimChart from "../elements/chart/ZzimChart";

const MyPageChart = () => {
  return (
    <MyPageChartWrapper>
      <ZzimChart />
    </MyPageChartWrapper>
  );
};

const MyPageChartWrapper = styled.div`
  height: 40rem;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin: 0rem 2rem 4rem 2rem;
  padding 6.4rem 0 0 0;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.white};
`;

export default MyPageChart;
