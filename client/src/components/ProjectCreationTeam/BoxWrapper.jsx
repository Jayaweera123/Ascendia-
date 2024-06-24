// BoxWrapper.js
import React from 'react';

function BoxWrapper({ children, icon, text }) {
    return (
        <div className="relative flex items-center justify-between w-64 h-24 p-4 bg-white rounded-sm shadow-lg">
            {/* Blue decoration: a small blue dot in the top-left corner */}
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full top-2 left-2"></div>
            <div className="text-lg font-bold">{text}</div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full">
                {icon}
            </div>
        </div>
    );
}

export default BoxWrapper;
