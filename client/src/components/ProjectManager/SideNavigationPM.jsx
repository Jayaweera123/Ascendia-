import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import UserService from "../../services/UserService";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const SideNavigationPM = ({ pmId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        UserService.logout();
        navigate("/"); // Redirect to login page after logout
        Swal.fire("Logged out!", "You have been logged out.", "success");
      }
    });
  };

  const menus = [
    { name: "Home", link: `/${pmId}/pmhome`, icon: IoHome },
    {
      name: "Pojects",
      link: `/${pmId}/project`,
      icon: PiProjectorScreenChartBold,
    },
    { name: "Logout", link: "#", icon: TbLogout, action: handleLogout },
  ];
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
      style={{
        background: "#101d3f",
      }}
    >
      <div className="flex justify-end py-3">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="relative flex flex-col gap-4 mt-4">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavigationPM;
