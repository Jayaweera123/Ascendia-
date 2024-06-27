import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const GanttChart = ({ data }) => (
  <BarChart
    width={800}
    height={400}
    data={data}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="name" />
    <YAxis type="number" domain={[0, "auto"]} />
    <Tooltip />
    <Legend />
    <Bar dataKey="start" stackId="a" fill="#82ca9d" />
    <Bar dataKey="end" stackId="a" fill="#8884d8" />
  </BarChart>
);

export default GanttChart;
