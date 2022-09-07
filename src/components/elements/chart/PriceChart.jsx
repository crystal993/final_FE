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
} from "recharts";

const mainColors = ["#cbcbcb", "#B192F3"];

export default function PriceChart({ sellingPrice, purchasePrice }) {
  const [pPrice, setPprice] = useState();
  const [sPrice, setSprice] = useState();

  useEffect(() => {
    setSprice(sellingPrice);
    setPprice(purchasePrice);
  }, [setPprice, setSprice, purchasePrice, sellingPrice]);

  const data = [
    {
      name: "구매 당시 가격",
      price: pPrice,
    },
    {
      name: "판매 희망가",
      price: sPrice,
    },
  ];

  return (
    <StBarChartWrapper>
      <BarChart
        width={500}
        height={400}
        data={data}
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
      </BarChart>
    </StBarChartWrapper>
  );
}

const StBarChartWrapper = styled.div`
  margin: 0 auto;
  font-size: 1.2rem;
`;
