import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 123 },
  { name: 'In Progress', value: 35 },
  { name: 'stopped', value: 14 },
  { name: 'Cancelled', value: 8 },
];

const COLORS = ['#15803d', '#0369a1', '#a16207', '#b91c1c'];

function ProjectStatusChart() {
  return (
    <div className="flex flex-col flex-1 w-full p-4 mt-4 bg-white border border-gray-200 rounded-sm shadow-md">
      <strong className='font-medium text-gray-700'>Project Status</strong>
      <div className='flex-1 w-full mt-3 text-xs'>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProjectStatusChart;