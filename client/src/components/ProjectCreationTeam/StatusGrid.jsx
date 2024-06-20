import React from "react";
import { MdFreeCancellation } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";
import { GrInProgress } from "react-icons/gr";
import { FaCircleStop } from "react-icons/fa6";

function StatusGrid() {
    return (
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <BoxWrapper>
                <div className="flex items-center justify-center w-12 h-12 bg-green-700 rounded-full">
                    <IoIosCloudDone className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-lg font-bold ">Completed</span>
                    <br />
                    <strong className="text-3xl font-semibold text-gray-500 text-">123</strong>
                </div>
            </BoxWrapper>

            <BoxWrapper>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-700">
                    <GrInProgress className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-lg font-bold">In Progress</span>
                    <br />
                    <strong className="text-3xl font-semibold text-gray-500 ">35</strong>
                </div>
            </BoxWrapper>

            <BoxWrapper>
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-700 rounded-full">
                    <FaCircleStop className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-lg font-bold">Stopped</span>
                    <br />
                    <strong className="text-3xl font-semibold text-gray-500 ">14</strong>
                </div>
            </BoxWrapper>

            <BoxWrapper>
                <div className="flex items-center justify-center w-12 h-12 bg-red-700 rounded-full">
                    <MdFreeCancellation className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-lg font-bold">Cancelled</span>
                    <br />
                    <strong className="text-3xl font-semibold text-gray-500 ">8</strong>
                </div>
            </BoxWrapper>
        </div>
    );
}

export default StatusGrid;

function BoxWrapper({ children }) {
    return (
        <div className="relative flex items-center w-64 h-24 p-4 bg-white rounded-sm shadow-lg">
            {/* Blue decoration: a small blue dot in the top-left corner */}
            <div className="absolute w-4 h-4rounded-full top-2 left-2"></div>
            {children}
        </div>
    );
}