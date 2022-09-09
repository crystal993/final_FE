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

// // A B C
// A : 자기 등록 상품 가격 총합
// B : 판매 완료된 자기 등록 상품 가격 총합
// C : 내가 찜한 상품 가격 총합
const data = [
  {
    name: "사료",
    ZzimCnt: 6,
  },
  {
    name: "간식",
    ZzimCnt: 10,
  },
  {
    name: "의류",
    ZzimCnt: 12,
  },
  {
    name: "미용",
    ZzimCnt: 5,
  },
  {
    name: "장난감",
    ZzimCnt: 6,
  },
  {
    name: "기타용품",
    ZzimCnt: 8,
  },
];

const getIntroOfPage = (label) => {
  if (label === "사료") {
    return "반려동물의 사료";
  }
  if (label === "간식") {
    return "반려동물의 간식";
  }
  if (label === "의류") {
    return "반려동물의 의류";
  }
  if (label === "미용") {
    return "반려동물의 미용";
  }
  if (label === "장난감") {
    return "반려동물의 장난감";
  }
  if (label === "기타용품") {
    return "반려동물의 기타용품";
  }
  return "";
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <StCustomToolTip style={{ border: "none" }}>
        <StLabel>{`${label}`}</StLabel>
        <StZzimCnt>{`${payload[0].value}`}</StZzimCnt>
        <StIntro>{getIntroOfPage(label)}</StIntro>
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </StCustomToolTip>
    );
  }

  return null;
};

export default function ZzimChart() {
  return (
    <StComposedChartWrapper>
      <ComposedChart
        width={500}
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
        <XAxis dataKey="name">
          <Label
            value="ItemCategory 내가 찜한 갯수"
            offset={-15}
            position="insideBottom"
          />
        </XAxis>
        <YAxis
          label={{
            value: "찜개수",
            angle: -90,
            position: "insideLeft",
            textAnchor: "middle",
          }}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="ZzimCnt" barSize={20} fill="#B192F3" />
        <Line type="monotone" dataKey="ZzimCnt" stroke="#ffd324" />
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

const StZzimCnt = styled.p`
  color: ${({ theme }) => theme.mainColor};
`;
