import React, { useState, useEffect } from "react";
import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin";
import constructionc from "../../assets/constructionc.jpg";
import { FaUserTie } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";

import axios from "axios";

const Login = () => {
  const [data, setData] = useState([]);

  

  

  return (
    <div>
      <TopNavigationAdmin />
      <div class="relative bg-white bg-contain">
        <div className="text-xl font-semibold text-gray-900 ">
            <div className="flex flex-row gap-10">
              
                <img
                  src={constructionc}
                  alt="img"
                  className="object-left w-6/12 ml-16 h-fit"
                />
        
             
        <div className="flex flex-col object-right pr-20">
            <form className="mt-5 rounded-lg shadow-md w-96 bg-slate-100 h-fit gap-9">
        <div className="flex flex-col items-center justify-center object-center mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <FaUserTie size={100} color="#001b5e"/>
          <h1 className="text-4xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Login
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="flex flex-row gap-2 mt-2">
                <div className="pl-8 bg-blue">
                    <FaUserCircle size={35} color="#001b5e"/>
                </div>
              
                <input
                  id="id"
                  name="id"
                  type="text"
                  autoComplete="id"
                  required
                  className="flex-1 block w-64 pl-1 text-gray-900 bg-transparent border-0 rounded-md shadow-sm mr-9 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                  placeholder="User Id"       
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <div className="pl-8 bg-blue">
                    <FaUnlockKeyhole size={33} color="#001b5e"/>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="flex-1 block w-48 pl-1 text-gray-900 bg-transparent border-0 rounded-md shadow-sm mr-9 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400"
                  placeholder="Password"
                  />
              </div>
            </div>

            <div className="mt-10 pl-15">
              <button
                type="submit"
                className="flex w-80 justify-center mt-10 rounded-md bg-[#001b5e] ml-8 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-10"
              >
                Login
              </button>
            </div>
          </form>

          
        </div>
        </form>
      </div>
    

      </div>    
    </div>
    </div>
    </div>
  );
};

export default Login;
