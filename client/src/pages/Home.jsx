// Home.jsx
import React, { useState } from "react";
import TopNavigationStore from "../components/Store/TopNavigationStore";
import SideNavigationStore from "../components/Store/SideNavigationStore";




import SideNavigationAdmin from "../components/Admin/SideNavigationAdmin"; // Adjust the path based on your project structure
import TopNavigationAdmin from "../components/Admin/TopNavigationAdmin"; // Adjust the path based on your project structure

const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigationStore />
      <section className="flex gap-6">
        <SideNavigationStore open={open} setOpen={setOpen} />
        
     {/*</section> <TopNavigationAdmin />
      <section className="flex gap-6">
        <SideNavigationAdmin open={open} setOpen={setOpen} />
  */}
      </section>
    </div>
  );
};

export default Home;
