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
import { Box, Typography } from "@mui/material";
import { Colors } from "@app/_themes/TileFlex";

const data = [
  { name: "Visitors", Data: 78 },
  { name: "Appointments", Data: 70 },
  { name: "Inquiries", Data: 200 },
  { name: "New Customers", Data: 34 },
  { name: "Sales", Data: 80 },
  { name: "Revenue", Data: 189 },
  { name: "Net Profit", Data: 300 },
];
const BeforeChart = ({ title }) => (
  <Box>
    <Typography variant="h3" sx={{ marginBottom: "20px" }}>
      {title}
    </Typography>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 1000]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelStyle={{ color: "black" }}
          itemStyle={{ color: "black" }}
          cursor={false}
        />

        <Bar dataKey="Data" fill={`${Colors.dark_blue_2}`} />
      </BarChart>
    </ResponsiveContainer>
  </Box>
);

export { BeforeChart };
