import React, { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

function DateRangePickerComponent({ onDateChange }) {
    const [openDate, setOpenDate] = useState(false);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleChange = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setSelectionRange({ startDate, endDate, key: 'selection' });
        onDateChange(startDate, endDate); // Call the callback with the new date range
    };

    const handleClick = () => {
        setOpenDate(prev => !prev);
    };

    return (
        <div className="relative mb-1">
            <input 
                type="text" 
                value={`${format(selectionRange.startDate, 'MMM dd, yyyy')} to ${format(selectionRange.endDate, 'MMM dd, yyyy')}`} 
                readOnly 
                onClick={handleClick}
                className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary w-60"
            />
            {openDate && (
                <div className="absolute z-10"
                >
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleChange}
                        onRangeFocusChange={(focusedRange) => {
                            if (!focusedRange[0]) {
                                setOpenDate(false);
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default DateRangePickerComponent;
