import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { JumboCard } from "@jumbo/components";
import { barData } from "./data";

const PatientExpensesBarChart = () => (
  <JumboCard
    title={"Yearly Expenses and coPay Amount"}
    contentWrapper
    contentSx={{ backgroundColor: "background.paper" }}
  >
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={barData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelStyle={{ color: "black" }}
          itemStyle={{ color: "black" }}
          cursor={false}
        />
        <Legend />

        <Bar dataKey="expense" fill={"#0399e3"} />
        <Bar dataKey="copay" fill={"#c96ee2"} />
      </BarChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { PatientExpensesBarChart };
