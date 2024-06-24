import React from 'react';
import { Tooltip, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { name: '2020', Residential: 12, Commercial: 8, Industrial: 6, Infrastructure: 10, Others: 4 },
  { name: '2021', Residential: 15, Commercial: 10, Industrial: 9, Infrastructure: 12, Others: 5 },
  { name: '2022', Residential: 18, Commercial: 14, Industrial: 12, Infrastructure: 15, Others: 8 },
  { name: '2023', Residential: 20, Commercial: 17, Industrial: 14, Infrastructure: 18, Others: 10 },
  { name: '2024', Residential: 19, Commercial: 16, Industrial: 13, Infrastructure: 17, Others: 9 },
];

function TransactionChart() {
  return (
    <div className="flex flex-col flex-1 w-full p-4 mt-4 bg-white border border-gray-200 rounded-sm shadow-md h-96">
      <strong className='font-medium text-gray-700'>Project Types</strong>
      <div className='flex-1 w-full mt-3 text-xs'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 5,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
            <YAxis ticks={[5, 10, 15, 20]} label={{ value: 'Projects', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Residential" fill="#cfe2ff" />
            <Bar dataKey="Commercial" fill="#9ec5fe" />
            <Bar dataKey="Industrial" fill="#6ea8fe" />
            <Bar dataKey="Infrastructure" fill="#3d8bfd" />
            <Bar dataKey="Others" fill="#0a58ca" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TransactionChart;
