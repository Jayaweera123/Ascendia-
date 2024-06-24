import React from "react";
const  ContactForm =()=>{
    return(
        <div className="flex items-center justify-center w-[100%] h-[100vh]">
        <div className="w-full max-w-md p-6 mx-auto bg-gray-600 rounded-lg shadow-md">
            <h2 className="mb-6 text-3xl font-bold text-center text-pink-600">Contact Us</h2>
            <from action="">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-white" htmlFor="">Your Name</label>
                    <input placeholder="Ravindu Jayaweera" className="w-full px-3 py-2 bg-gray-800 border rounded-lg focus:outline-none focus:border-blue-500" required type="text"></input>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-white"htmlFor="">Your Email</label>
                    <input placeholder="brdjayaweera@gmail.com" className="w-full px-3 py-2 bg-gray-800 border rounded-lg focus:border-blue-500 focus:outline-none" required type="email"></input>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold text-white" htmlFor="">Your Massage</label>
                    <textarea rows='4' placeholder="Type Your Massage Here..." className="w-full px-3 py-2 bg-gray-200 border rounded-lg focus:border-blue-500 focus:outline-none" required type="text"></textarea>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="px-4 py-2 font-semibold text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-white">
                        Send Massage
                    </button>
                </div>
                


            </from>
        </div>
        </div>

    );

};

export default ContactForm;