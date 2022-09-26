import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  LabelList,
  Tooltip,
  ResponsiveContainer,
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
  const mainColors = ["#B192F3", "#cbcbcb", "#FFE47A"];

  const data = [
    {
      name: "등록상품",
      price: chartData[0]?.price,
    },
    {
      name: "판매완료",
      price: chartData[1]?.price,
    },
    {
      name: "찜한상품",
      price: chartData[2]?.price,
    },
  ];
  return (
    <StComposedChartWrapper>
      <ResponsiveContainer width={"99%"} height={"100%"}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 5,
            left: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" axisLine={false}></XAxis>
          {/* <YAxis /> */}
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="price" barSize={20} fill="#B192F3">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={mainColors[index % 20]} />
            ))}
            <LabelList dataKey="price" position="top" />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  height: 63rem;
  width: 45.5rem;
  @media (max-width: 767px) {
    /* Mobile */
    height: 33rem;
    width: 25rem;
  }
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
