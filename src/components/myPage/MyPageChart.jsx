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
      <TitleWrapper>
        <Title>가격 총합</Title>
      </TitleWrapper>
      <MyPageSumPriceChart chartData={chartData} />
    </MyPageChartWrapper>
  );
};

const MyPageChartWrapper = styled.div`
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-bottom: 7rem;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.white};
  padding: 4rem 2rem;
  width: 50rem;
  height: 50rem;
  @media (max-width: 767px) {
    /* Mobile */
    padding: 3rem 0;
    width: 26rem;
    height: 40rem;
    margin: 1rem;
    margin-bottom: 7rem;
  }
`;

const TitleWrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 47.5rem;
  margin: 0 4rem;
  padding: 0 2rem;
  @media (max-width: 767px) {
    /* Mobile */
    width: 23.5rem;
    padding-left: 1rem;
  }
`;

const Title = styled.h1`
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 2.3rem;
  margin-bottom: 2rem;
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }
`;

export default MyPageChart;
