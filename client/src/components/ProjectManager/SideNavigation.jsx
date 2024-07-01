import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaRegClipboard } from "react-icons/fa6";
import { FaClipboardUser } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../services/ProjectService";
import { jwtDecode } from 'jwt-decode';

const SideNavigation = () => {
  //============================================
  /*Need the ID of the project manager who is logged in to the system*/
  //For now I'm using the pmId from the project data.

  const [projectManagerId, setProjectManagerId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.projectIDs && decodedToken.projectIDs.length > 0) {
        setProjectId(decodedToken.projectIDs[0]); // Set the first projectId found in the token
      }
    }
  }, []);

  useEffect(() => {
    if (projectId != null) {
      getProjectById(projectId)
        .then((response) => {
          //console.log(response.data);
          setProjectManagerId(response.data.pmId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [projectId]);
  //============================================

  const menus = [
    { name: "Home", link: projectManagerId ? `/${projectManagerId}/pmhome` : "#", icon: IoHome },
    { name: "Projects", link: projectManagerId ? `/${projectManagerId}/project` : "#", icon: PiProjectorScreenChartBold },
    { name: "Dashboard", link: projectId ? `/project/${projectId}/dashboard` : "#", icon: MdOutlineDashboard },
    { name: "Tasks", link: projectId ? `/project/${projectId}/task` : "#", icon: FaRegClipboard },
    { name: "Employees", link: projectId ? `/project/${projectId}/employee` : "#", icon: FaClipboardUser },
    { name: "Progress", link: projectId ? `/project/${projectId}/progress` : "#", icon: GiProgression },
    { name: "Project Progress", link: projectId ? `/progress/${projectId}` : "#", icon: GiProgression },
  ];
  const [open, setOpen] = useState(true);

  /*if (projectId === null) {
    return <div>Loading...</div>; // Or handle the null case appropriately
  } else {*/
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

export default SideNavigation;