import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataType = {
  name: string;
  value: number;
};

type Props = {
  chartData: DataType[];
};

const AnalyticsBarChart: React.FC<Props> = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#4F46E5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsBarChart;