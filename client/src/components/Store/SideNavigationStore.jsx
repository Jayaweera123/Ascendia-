import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { HiMiniWrenchScrewdriver, HiMiniRectangleGroup } from "react-icons/hi2";
import { VscHistory } from "react-icons/vsc";
import AuthService from "../../services/StoreServices";
import { TbLogout } from "react-icons/tb";
import Swal from "sweetalert2";

const SideNavigationStore = () => {
  const navigate = useNavigate();
  const isAuthenticated = AuthService.isAuthenticated();
  const isStoreKeeper = AuthService.isStore();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        AuthService.logout();
        navigate('/');  // Redirect to login page after logout
        Swal.fire('Logged out!', 'You have been logged out.', 'success');
      }
    });
  };

  const menus = [
    { name: "Dashboard", link: "/store/dashboard", icon: MdOutlineDashboard },
    { name: "Material List", link: "/material", icon: HiMiniRectangleGroup, condition: isStoreKeeper },
    { name: "Equipment List", link: "/equipment", icon: HiMiniWrenchScrewdriver },
    { name: "History", link: "/history", icon: VscHistory },
    { name: "Ascendia", link: "/", icon: null, condition: !isAuthenticated },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div className={`fixed h-screen bg-[#101d3f] ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-end py-3">
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>

            <div className="relative flex flex-col gap-4 mt-4">
              {menus.map((menu, i) => {
                if (menu.condition === undefined || menu.condition) {
                  return (
                    <Link
                      to={menu.link}
                      key={i}
                      className={`${
                        menu.margin && "mt-5"
                      } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                    >
                      <div>{React.createElement(menu.icon, { size: "20" })}</div>
                      <h2
                        style={{
                          transitionDelay: `${i + 3}00ms`,
                        }}
                        className={`whitespace-pre duration-500 ${
                          !open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                      >
                        {menu.name}
                      </h2>
                      <h2
                        className={`${
                          open && "hidden"
                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10`}
                      >
                        {menu.name}
                      </h2>
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {isAuthenticated && (
            <div
              className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer mb-20"
              onClick={handleLogout}
            >
              <div>{React.createElement(TbLogout, { size: "20" })}</div>
              <h2
                style={{ transitionDelay: `${menus.length + 3}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Logout
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10`}
              >
                Logout
              </h2>
            </div>
          )}
        </div>
      </div>

      <div className={`flex-grow ml-${open ? "64" : "8"} duration-500 p-4`}>
        
      </div>
    </div>
  );
};

export default SideNavigationStore;
