import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

// A B C
// A : 자기 등록 상품 가격 총합
// B : 판매 완료된 자기 등록 상품 가격 총합
// C : 내가 찜한 상품 가격 총합
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
