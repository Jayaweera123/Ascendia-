// Home.jsx
import React, { useState } from "react";
import TopNavigation from "../components/TopNavigation";
import SideNavigation from "../components/ProjectManager/SideNavigation";


const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigation />
      <section className="flex gap-6">
        <SideNavigation open={open} setOpen={setOpen} />
        
   
      </section>
    </div>
  );
};

export default Home;
