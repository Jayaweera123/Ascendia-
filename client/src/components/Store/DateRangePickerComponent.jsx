import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

const DateRangePickerComponent = ({value, setValue}) => { 


    const handleValueChange = (newValue) => {
        
        console.log("newValue:", newValue); 
        setValue(newValue); 

    } 

    return (
    <div className="mb-1 border rounded-md w-72">
        <Datepicker 

            value={value} 
            onChange={handleValueChange} 

        /> 
        </div>

    );
}; 

export default DateRangePickerComponent;