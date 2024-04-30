import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';
import { FaRegClipboard } from 'react-icons/fa6';
import { FaClipboardUser } from 'react-icons/fa6';
import { GiProgression } from 'react-icons/gi';
import { PiProjectorScreenChartBold } from 'react-icons/pi';

const SideNavigation = () => {
  const menus = [
    { name: 'Home', link: '/pmhome', icon: IoHome },
    { name: 'Dashboard', link: '/creationDashboard', icon: PiProjectorScreenChartBold },
    { name: 'Projects', link: '/projectList', icon: MdOutlineDashboard, margin: true,},
    { name: 'Create Project', link: '/addProjects', icon: FaRegClipboard },
   // { name: "Employees", link: "/employees", icon: FaClipboardUser },
    { name: 'Progress', link: '/progress', icon: GiProgression },
  ];
  const [open, setOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const toggleProjectsDropdown = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  return (
    <div
      className={`min-h-screen ${
        open ? 'w-72' : 'w-16'
      } duration-500 text-gray-100 px-4`}
      style={{
        background: '#101d3f',
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
          <div key={i}>
            {menu.name === 'Projects' ? (
              <div className="group">
                <div 
                  className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${isProjectsOpen ? 'bg-gray-800' : ''}`}
                  onClick={toggleProjectsDropdown}
                >
                  <div>{React.createElement(menu.icon, { size: '20' })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && 'opacity-0 translate-x-28 overflow-hidden'
                    }`}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${
                      open && 'hidden'
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu.name}
                  </h2>
                </div>
                {isProjectsOpen && (
                  <div
                    id="projectsDropdown"
                    className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="projectsDropdownButton">
                      <li>
                        <Link to="/addProjects" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Create Project</Link>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove Project</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Update Project</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && 'mt-5'
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: '20' })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && 'opacity-0 translate-x-28 overflow-hidden'
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && 'hidden'
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNavigation;
