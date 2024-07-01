import React, { useEffect, useState } from 'react';
import { Tooltip, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  fetchResidentialProjectsCountByYear,
  fetchCommercialProjectsCountByYear,
  fetchIndustrialProjectsCountByYear,
  fetchInfrastructureProjectsCountByYear,
  fetchOtherProjectsCountByYear
} from '../../services/ProjectService'; 


function TransactionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [residential, commercial, industrial, infrastructure, other] = await Promise.all([
          fetchResidentialProjectsCountByYear(),
          fetchCommercialProjectsCountByYear(),
          fetchIndustrialProjectsCountByYear(),
          fetchInfrastructureProjectsCountByYear(),
          fetchOtherProjectsCountByYear(),
        ]);

        const combinedData = combineData(
          residential.data,
          commercial.data,
          industrial.data,
          infrastructure.data,
          other.data
        );
        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const combineData = (residential, commercial, industrial, infrastructure, other) => {
    const years = [...new Set([
      ...residential.map(d => d.year),
      ...commercial.map(d => d.year),
      ...industrial.map(d => d.year),
      ...infrastructure.map(d => d.year),
      ...other.map(d => d.year)
    ])];

    return years.map(year => ({
      name: year,
      Residential: residential.find(d => d.year === year)?.count || 0,
      Commercial: commercial.find(d => d.year === year)?.count || 0,
      Industrial: industrial.find(d => d.year === year)?.count || 0,
      Infrastructure: infrastructure.find(d => d.year === year)?.count || 0,
      Others: other.find(d => d.year === year)?.count || 0
    }));
  };

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