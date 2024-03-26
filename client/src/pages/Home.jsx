// Home.jsx
import React, { useState } from "react";
import SideNavigation from "../components/SideNavigation"; // Adjust the path based on your project structure
import TopNavigation from "../components/TopNavigation"; // Adjust the path based on your project structure
//import SideNavigationPM from "../components/Nethuni/SideNavigationPM";

const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigation />
      <section className="flex gap-6">
        <SideNavigation open={open} setOpen={setOpen} />
        <div className="m-3 text-xl font-semibold text-gray-900">
          REACT TAILWIND
        </div>
      </section>
    </div>
  );
};

export default Home;
