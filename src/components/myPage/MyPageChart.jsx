import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __myPageChart } from "../../redux/modules/chartSlice";
import MyPageSumPriceChart from "../elements/chart/MyPageSumPriceChart";

const MyPageChart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chart.myPageChartData);

  useEffect(() => {
    dispatch(__myPageChart());
  }, [dispatch]);

  return (
    <MyPageChartWrapper>
      <MyPageSumPriceChart chartData={chartData} />
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
  padding: 6.4rem 0 0 0;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.white};
`;

export default MyPageChart;
