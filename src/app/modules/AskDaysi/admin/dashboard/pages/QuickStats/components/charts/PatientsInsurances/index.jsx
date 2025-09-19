import { JumboCard } from "@jumbo/components";
import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Aetna",
    value: 20,
  },
  { name: "Cigna", value: 30 },
  { name: "Medicare", value: 25 },
  { name: "Medicaid", value: 28 },
  { name: "Blue Cross", value: 18 },
];

const COLORS = ["blue", "red", "green", "orange", "purple"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PatientInsurancePieChart() {
  return (
    <JumboCard
      title={"Appointments"}
      contentWrapper
      contentSx={{ backgroundColor: "background.paper" }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            paddingAngle={0}
            labelLine={false}
            label={renderCustomizedLabel}
            nameKey={"name"}
            dataKey={"value"}
            innerRadius={0}
            outerRadius={120}
          >
            {data.map((x, index) => (
              <Cell
                stroke="0"
                key={`cell-${index}`}
                fill={`${COLORS[index]}`}
              />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconSize="20"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </JumboCard>
  );
}
