// Home.jsx
import React, { useState } from "react";
import TopNavigationStore from "../components/Store/TopNavigationStore";
import SideNavigationStore from "../components/Store/SideNavigationStore";





const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigationStore />
      <section className="flex gap-6">
        <SideNavigationStore open={open} setOpen={setOpen} />
        
        <div className="m-3 text-xl font-semibold text-gray-900">
          REACT TAILWIND
        
        </div>
      </section>
    </div>
  );
};

export default Home;
