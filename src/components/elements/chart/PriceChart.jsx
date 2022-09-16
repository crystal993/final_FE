import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mainColors = ["#cbcbcb", "#B192F3", "#FFE47A"];

export default function PriceChart({
  sellingPrice,
  purchasePrice,
  averagePrice,
}) {
  const [pPrice, setPprice] = useState();
  const [sPrice, setSprice] = useState();
  const [aPrice, setAPrice] = useState();

  useEffect(() => {
    setSprice(sellingPrice);
    setPprice(purchasePrice);
    setAPrice(averagePrice);
  }, [
    setPprice,
    setSprice,
    setAPrice,
    purchasePrice,
    sellingPrice,
    averagePrice,
  ]);

  const data = [
    {
      name: "구매당시가격",
      price: pPrice,
    },
    {
      name: "판매희망가",
      price: sPrice,
    },
    {
      name: "평균가격",
      price: aPrice,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <StCustomToolTip style={{ border: "none" }}>
          <StLabel>{`${label}`}</StLabel>
          <StPrice>{`${payload[0].value.toLocaleString("ko-KR")}원`}</StPrice>
          {/* <p className="desc">Anything you want can be displayed here.</p> */}
        </StCustomToolTip>
      );
    }

    return null;
  };

  return (
    <StBarChartWrapper>
      <ResponsiveContainer width={"99%"} height={"100%"}>
        <BarChart
          data={data}
          barSize={50}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="price" fill="#000000" label={{ position: "top" }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={mainColors[index % 20]} />
            ))}
          </Bar>
          <Tooltip
            cursor={{ stroke: "#B192F3", strokeWidth: 2, fill: "transparent" }}
            content={<CustomTooltip />}
          />
        </BarChart>
      </ResponsiveContainer>
    </StBarChartWrapper>
  );
}

const StBarChartWrapper = styled.div`
  width: 50rem;
  min-width: 30rem;
  height: 40rem;
  margin: 0 auto;
  font-size: 1.2rem;
  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 50rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 40rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 30rem;
  }
`;

const StCustomToolTip = styled.div`
  border: 1px solid #ffffff;
  padding: 0.8rem;
  width: 10rem;
  opacity: 0.8;
  text-align: center;
  background-color: #f7f2f2;
`;

const StLabel = styled.p`
  font-size: 1.2rem;
`;

const StPrice = styled.p`
  color: ${({ theme }) => theme.mainColor};
  font-weight: 600;
`;
