import React, { useState } from "react";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin"; // Adjust the path based on your project structure
import dboard from "../../assets/dboard.png";
import { RiUserAddFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import profilepic from "../../assets/profilepic.jpg";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FiPhoneIncoming } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const CreationDashboard = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigationAdmin />
      <section className="flex">
        <SideNavigationPCTeam open={open} setOpen={setOpen} />

        <div className="relative h-screen">
          <img
            src={dboard}
            alt="bimage"
            className="object-fill object-center w-full h-full bg-right bg-cover opacity-40"
          />
          <div className="absolute top-0 left-0 pt-3 pl-10">
            <h1 className="text-6xl leading-relaxed font-bold text-[#001b5e]">
              Dashboard
            </h1>
          </div>

          {/* Current buttons on the left side */}
          <div className="absolute bottom-0 left-0 pb-24 pl-3 space-y-6">
            <button className="overflow-hidden rounded-3xl">
              {/* Add User */}
              <div className="grid grid-cols-[100px,1fr] pl-10 gap-x-0">
                <div className="p-4 bg-[#001b5e] text-white w-[100px] items-centered pl-6 rounded-l-3xl">
                  <div>
                    <RiUserAddFill size={50} />
                  </div>
                </div>
                <div className="p-4 bg-white w-[300px] opacity-80">
                  <h2 className="pl-5 text-left text-3xl leading-relaxed font-bold text-[#001b5e]">
                    Create Project
                  </h2>
                </div>
              </div>
            </button>
            <button className="overflow-hidden rounded-3xl">
              {/* Edit User */}
              <div className="grid grid-cols-[100px,1fr] pl-10 gap-x-0">
                <div className="p-4 bg-[#001b5e] text-white w-[100px] items-centered pl-7 rounded-l-3xl">
                  <div>
                    <FaUserEdit size={50} />
                  </div>
                </div>
                <div className="p-4 bg-white w-[300px] opacity-80">
                  <h2 className="pl-5 text-left text-3xl leading-relaxed font-bold text-[#001b5e]">
                    Add Employee
                  </h2>
                </div>
              </div>
            </button>
          </div>

          {/* New buttons on the right side */}
          <div className="absolute bottom-0 right-0 pb-24 pr-3 space-y-6">
            <button className="overflow-hidden rounded-3xl">
              {/* New Button 1 */}
            </button>
            <button className="overflow-hidden rounded-3xl">
              {/* New Button 2 */}
            </button>
          </div>
          {/*Profile*/}
          <div className="absolute w-64 pt-6 pr-3 shadow-xl top-5 ps-3 right-5 bg-slate-200">
            <figure className="flex items-center justify-center mb-2">
              <img src={profilepic} alt="profile photo" className="w-52 h-52" />
            </figure>
            <div className="text-center profile">
              <h2 className="text-base font-bold">Ravindu Jayaweera</h2>
              <h6 className="text-sm">Administrator</h6>

              <div className="flex items-center justify-center py-1 border-b-2 border-white"></div>
              <div className="flex items-center gap-3 pt-2 pl-5 justify-items-start">
                <div>
                  <FaRegUser size={18} />
                </div>
                <h6 className="text-xs">AD 10457</h6>
              </div>
              <div className="flex items-center gap-2 pt-2 pl-5 justify-items-start">
                <div>
                  <HiOutlineOfficeBuilding size={20} />
                </div>
                <h6 className="text-xs">Department</h6>
              </div>
            </div>

            <div className="flex items-center justify-center py-1 border-b-2 border-white"></div>
            <div className="flex items-center gap-3 pt-2 pl-5 justify-items-start">
              <div>
                <FiPhoneIncoming size={18} />
              </div>
              <h6 className="text-xs">+94 703 550 144 </h6>
            </div>
            <div className="flex items-center gap-2 pt-2 pb-5 pl-5 justify-items-start">
              <div>
                <MdOutlineAttachEmail size={20} />
              </div>
              <h6 className="text-xs">jayaweerabrd@ascendia.com</h6>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreationDashboard;
