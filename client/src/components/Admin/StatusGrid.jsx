import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdFreeCancellation } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";
import { GrInProgress } from "react-icons/gr";
import { FaCircleStop } from "react-icons/fa6";
import UserService from '../../services/UserService';
import { MdOutlineAutoDelete } from "react-icons/md";
import { RiProgress5Line } from "react-icons/ri";

function StatusGrid() {
    const [data, setData] = useState([
        { name: 'Users', value: 0 },
        { name: 'Active', value: 0 },
        { name: 'Today Active', value: 0 },
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
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <BoxWrapper icon={<IoIosCloudDone className="text-2xl text-white" />} label="Users" value={data.find(item => item.name === 'Users').value} bgColor="bg-green-700" />
            <BoxWrapper icon={<GrInProgress className="text-2xl text-white" />} label="Active" value={data.find(item => item.name === 'Active').value} bgColor="bg-sky-700" />
            <BoxWrapper icon={<RiProgress5Line className="text-2xl text-white" />} label="Today Active" value={data.find(item => item.name === 'Today Active').value} bgColor="bg-yellow-700" />
            <BoxWrapper icon={<MdOutlineAutoDelete className="text-2xl text-white" />} label="Deactive" value={data.find(item => item.name === 'Deactive').value} bgColor="bg-red-700" />
        </div>
    );
}

export default StatusGrid;

function BoxWrapper({ icon, label, value, bgColor }) {
    return (
        <div className="m-4 relative flex items-center w-60 h-24 p-4 bg-white rounded-lg shadow-md">
            {/* Icon container */}
            <div className={`flex items-center justify-center w-12 h-12 ${bgColor} rounded-full`}>
                {icon}
            </div>
            <div className="pl-4">
                <span className="text-lg font-bold">{label}</span>
                <br />
                <strong className="text-3xl font-semibold text-gray-500">{value}</strong>
            </div>
        </div>
    );
}
