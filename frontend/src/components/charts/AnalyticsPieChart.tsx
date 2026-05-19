import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DataType = {
  name: string;
  value: number;
};

type Props = {
  chartData: DataType[];
};

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B"];

const AnalyticsPieChart: React.FC<Props> = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label={({ percent }) => `${(percent! * 100).toFixed(0)}%`}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsPieChart;