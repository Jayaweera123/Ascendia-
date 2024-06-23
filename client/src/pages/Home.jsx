// Home.jsx
import React, { useState } from "react";
import TopNavigationStore from "../components/Store/TopNavigationStore";
import SideNavigationStore from "../components/Store/SideNavigationStore";
import NotificationBar from "../components/Store/NotificationBar";


const Home = () => {
  const [open, setOpen] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const notificationHandler = (status) => {
      setIsOpen(status);
  };

  return (
    <div>
      <TopNavigationStore notificationHandler={notificationHandler} />
      <section className="flex gap-6">
        <SideNavigation open={open} setOpen={setOpen} />
        
        <div className="relative flex-auto w-8/12">
        <NotificationBar isOpen={isOpen} setIsOpen={setIsOpen} notificationHandler={notificationHandler} />
        </div>
      </section>
    </div>
  );
};

export default Home;
