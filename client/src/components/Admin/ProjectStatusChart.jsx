import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UserService from '../../services/UserService';
import StatusGrid from './StatusGrid';

const COLORS = [ '#0369a1', '#b91c1c'];

function ProjectStatusChart() {
  const [data, setData] = useState([
    
    { name: 'Active', value: 0 },
    
    { name: 'Deactive', value: 0 }
  ]);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch total user count
        const responseUsers = await axios.get(`${UserService.BASE_URL}/admin/countUsers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userCount = responseUsers.data;

        // Fetch count of active users
        const responseActiveUsers = await axios.get(`${UserService.BASE_URL}/admin/countActiveUsers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const activeUserCount = responseActiveUsers.data;

        // Fetch count of deactivated users
        const responseDeactivatedUsers = await axios.get(`${UserService.BASE_URL}/admin/countDeactivatedUsers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const deactivatedUserCount = responseDeactivatedUsers.data;

        setData(prevData => prevData.map(item => {
          switch (item.name) {
            case 'Users':
              return { ...item, value: userCount };
            case 'Active':
              return { ...item, value: activeUserCount };
            case 'Deactive':
              return { ...item, value: deactivatedUserCount };
            default:
              return item;
          }
        }));
      } catch (error) {
        console.error('Error fetching user counts:', error);
        // Handle error appropriately
      }
    };

    fetchUserCounts();
  }, []);

  useEffect(() => {
    const fetchTodayActiveUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${UserService.BASE_URL}/admin/todayActiveUsers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const todayActiveUsers = response.data; // Assuming the response is a number
        setData(prevData => prevData.map(item => {
          if (item.name === 'Today Active') {
            return { ...item, value: todayActiveUsers };
          }
          return item;
        }));
      } catch (error) {
        console.error('Error fetching today active users:', error);
      }
    };

    fetchTodayActiveUsers();
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow-md ">
      <strong className='font-medium text-gray-700'>Users Status</strong>
      <div className='flex-1 w-full mt-3 text-xs'>
        
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data} // Pass the data array here
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
