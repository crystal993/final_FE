import styled from "styled-components";
import React, { FunctionComponent } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const mainColors = ["#B192F3", "#FFE47A"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } 
  ${x + width / 2}, ${y}C${x + width / 2},${y + height / 3} ${
    x + (2 * width) / 3
  },${y + height} ${x + width}, ${y + height}
Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function PriceChart({ sellingPrice, purchasePrice }) {
  const data = [
    {
      name: "현재가격",
      price: purchasePrice,
    },
    {
      name: "판매가격",
      price: sellingPrice,
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
        <Bar
          dataKey="price"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
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
