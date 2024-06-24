import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { RiUserAddLine } from "react-icons/ri";
import UserService from "../../services/UserService";
import { TbLogout } from "react-icons/tb";


const SideNavigationAdmin = () => {
  const navigate = useNavigate();
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  const handleLogout = () => {
    const confirmDelete = window.confirm('Are you sure you want to logout this user?');
    if (confirmDelete) {
      UserService.logout();
      navigate('/');  // Redirect to login page after logout
    }
  };

  const menus = [
    { name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard },
    { name: "User List", link: "/admin/userlist", icon: LuUsers2, condition: isAdmin },
    { name: "Add User", link: "/admin/adduser", icon: RiUserAddLine },,
    { name: "Logout", link: "#", icon: TbLogout, action: handleLogout },
    { name: "Ascendia", link: "/ascendia", icon: null, condition: !isAuthenticated },    
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className={`min-h-screen flex flex-col justify-between bg-[#101d3f] ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
      <div>
        <div className="flex justify-end py-3">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="relative flex flex-col gap-4 mt-4">
          {menus.map((menu, i) => {
            if (menu.condition === undefined || menu.condition) {
              return (
                <Link
                  to={menu.link}
                  key={i}
                  onClick={menu.action}
                  className={`${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                >
                  {menu.icon && <div>{React.createElement(menu.icon, { size: "20" })}</div>}
                  <h2
                    style={{ transitionDelay: `${i + 3}00ms` }}
                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
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
    </div>
  );
};

export default SideNavigationAdmin;
