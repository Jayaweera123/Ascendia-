import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { countCompletedProjects, countInProgressProjects, countPendingProjects, countCancelledProjects } from '../../services/ProjectService';


const COLORS = ['#15803d', '#0369a1', '#a16207', '#b91c1c'];

function ProjectStatusChart() {
  const [data, setData] = useState([
    { name: 'Completed', value: 0 },
    { name: 'In Progress', value: 0 },
    { name: 'Pending', value: 0 },
    { name: 'Cancelled', value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const completedCount = await countCompletedProjects();
        const inProgressCount = await countInProgressProjects();
        const pendingCount = await countPendingProjects();
        const cancelledCount = await countCancelledProjects();

        setData([
          { name: 'Completed', value: completedCount.data },
          { name: 'In Progress', value: inProgressCount.data },
          { name: 'Pending', value: pendingCount.data },
          { name: 'Cancelled', value: cancelledCount.data },
        ]);
      } catch (error) {
        console.error('Error fetching project counts', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow-md">
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
