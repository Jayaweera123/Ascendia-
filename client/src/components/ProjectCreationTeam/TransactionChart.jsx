import React, { useEffect, useState } from 'react';
import { Tooltip, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { fetchProjectCountsByYear } from '../../services/ProjectService';

function TransactionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const counts = await fetchProjectCountsByYear();
        const years = Array.from(new Set([
          ...Object.keys(counts.completed),
          ...Object.keys(counts.inProgress),
          ...Object.keys(counts.cancelled),
          ...Object.keys(counts.pending)
        ])).sort();

        const formattedData = years.map(year => ({
          name: year,
          Completed: counts.completed[year] || 0,
          'In Progress': counts.inProgress[year] || 0,
          Cancelled: counts.cancelled[year] || 0,
          Pending: counts.pending[year] || 0
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching project counts", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow-md h-96">
      <strong className='font-medium text-gray-700'>Project Status</strong>
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
            <Bar dataKey="Completed" fill="#15803d" />
            <Bar dataKey="In Progress" fill="#0369a1" />
            <Bar dataKey="Pending" fill="#a16207" />
            <Bar dataKey="Cancelled" fill="#b91c1c" />
            
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TransactionChart;
