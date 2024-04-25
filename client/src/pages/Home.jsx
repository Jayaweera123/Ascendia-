// Home.jsx
import React, { useState } from "react";
import SideNavigationAdmin from "../components/Admin/SideNavigationAdmin"; // Adjust the path based on your project structure
import TopNavigationAdmin from "../components/Admin/TopNavigationAdmin"; // Adjust the path based on your project structure

const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigationAdmin />
      <section className="flex gap-6">
        <SideNavigationAdmin open={open} setOpen={setOpen} />
        <div className="m-3 text-xl font-semibold text-gray-900">
          REACT TAILWIND
        </div>
      </section>
    </div>
  );
};

export default Home;
