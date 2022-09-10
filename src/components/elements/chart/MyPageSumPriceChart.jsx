import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";
import styled from "styled-components";

export default function MyPageSumPriceChart({ chartData }) {
  const getIntroOfPage = (label) => {
    if (label === "A") {
      return "자신이 등록한 상품들의 가격 총 합입니다.";
    }
    if (label === "B") {
      return "판매 완료된 자신이 등록한 상품들의 가격 총 합입니다.";
    }
    if (label === "C") {
      return "내가 찜한 상품들의 가격 총 합입니다.";
    }
    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <StCustomToolTip style={{ border: "none" }}>
          <StLabel>{`${label}`}</StLabel>
          <StPrice>{`${payload[0].value.toLocaleString("ko-KR")}원`}</StPrice>
          <StIntro>{getIntroOfPage(label)}</StIntro>
        </StCustomToolTip>
      );
    }

    return null;
  };

  const data = [
    {
      name: "A",
      price: chartData[0]?.price,
    },
    {
      name: "B",
      price: chartData[1]?.price,
    },
    {
      name: "C",
      price: chartData[2]?.price,
    },
  ];
  return (
    <StComposedChartWrapper>
      <ComposedChart
        width={400}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name"></XAxis>
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="price" barSize={20} fill="#B192F3" />
        <Line type="monotone" dataKey="price" stroke="#ffd324" />
      </ComposedChart>
    </StComposedChartWrapper>
  );
}

const StComposedChartWrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
  margin: 0 auto;
  border: none;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.grayColor};
`;

const StCustomToolTip = styled.div`
  border: 1px solid #ffffff;
  padding: 0.8rem;
  width: 20rem;
  opacity: 0.8;
  background-color: ${({ theme }) => theme.lightgray};
`;

const StLabel = styled.p`
  font-size: 1.2rem;
`;

const StIntro = styled.p`
  font-size: 1rem;
`;

const StPrice = styled.p`
  color: ${({ theme }) => theme.mainColor};
`;
