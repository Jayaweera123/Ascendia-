// Home.jsx
import React, { useState } from "react";
import TopNavigationAdmin from "../components/Admin/TopNavigationAdmin";
import SideNavigationAdmin from "../components/Admin/SideNavigationAdmin";



const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigationAdmin />
      <section className="flex gap-6">
        <SideNavigationAdmin open={open} setOpen={setOpen} />
        
   
      </section>
    </div>
  );
};

export default Home;
