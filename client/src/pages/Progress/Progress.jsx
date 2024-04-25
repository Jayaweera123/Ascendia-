import React, { useState } from "react";
 
import SideNavigationClient from "../../components/Client/SideNavigationClient"; // Adjust the path based on your project structure
import TopNavigationClient from "../../components/Client/TopNavigationClient";
import progresspark from "../../assets/progresspark.png";
import { GiProgression } from "react-icons/gi"; // Adjust the path based on your project structure
import RadialProgressBar1 from "../../components/Progress/RadialProgressBar1";
import RadialProgressBar2 from "../../components/Progress/RadialProgressBar2";
import RadialProgressBar3 from "../../components/Progress/RadialProgressBar3";
import RadialProgressBar4 from "../../components/Progress/RadialProgressBar4";
import RadialProgressBar5 from "../../components/Progress/RadialProgressBar5";

const Progress = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigationClient />
      <section className="flex">
        <SideNavigationClient open={open} setOpen={setOpen} />
        <div class="relative bg-sky-50 bg-cover h-fit w-screen">
        <div className="m-3 text-xl font-semibold text-gray-900">
        <div className="flex flex-row gap-3 pt-2 pb-1 ml-3 items-centered">
        <GiProgression  size={80} color="#001b5e"/>
            
          <div><h1 className="place-items-baseline text-4xl leading-relaxed py-4 tracking-tight font-bold text-left text-[#001b5e]">Progress</h1></div>
        </div>

        <div className="flex flex-col object-left w-auto gap-1 mt-2 ml-3 bg-white h-fit">
            <div className="flex flex-row gap-5 p-3 m-3 border-2 border-dotted rounded-lg border-gray-900/10">
                <div className="flex flex-col justify-center object-left gap-5 items-left">
                    <h1 className="top-0 left-0 text-3xl font-bold leading-9 tracking-tight text-left text-gray-900">
                        Project Id - 0156A
                    </h1>
                    <h2 className="font-sans text-2xl font-semibold leading-9 tracking-tight text-left text-gray-500">
                        The Galle Techno-Park
                    </h2>
                    <div className="text-base text-justify">The Galle Techno-Park is located in the Galle District, close to the Southern Expressway Pinnaduwa interchange. Construction of the complex was envisioned by the Ministry of Information Technology in line with the National Policy Framework and the President’s vision.</div>

                </div>
                <img
                  src={progresspark}
                  alt="park"
                  className="object-right w-6/12 pt-1 shadow-sm h-1/2 shadow-white"
                />
        
            </div>

            <div className="flex flex-col gap-3 p-3 m-3 border-2 border-dotted rounded-lg border-gray-900/10">
                <h1 className="top-0 left-0 pt-3 text-3xl font-bold leading-9 tracking-tight text-left text-gray-900">
                            Progress : 15/02/2024
                </h1>
                {/* Radial Progress Component */}
                <div className="flex flex-row gap-5 p-3 m-3">
                    <div className="flex flex-col">
                        <RadialProgressBar1/>
                        <h3 className="text-base font-semibold tracking-tight text-center text-gray-900">
                                Closure of the building site
                        </h3>
                    </div>
                    <div className="flex flex-col">
                        <RadialProgressBar2/>
                        <h3 className="text-base font-semibold tracking-tight text-center text-gray-900">
                                Land and Foundation
                        </h3>
                    </div>
                    <div className="flex flex-col">
                        <RadialProgressBar3/>
                        <h3 className="text-base font-semibold tracking-tight text-center text-gray-900">
                                The structure of the construction
                        </h3>
                    </div>
                    <div className="flex flex-col">
                        <RadialProgressBar4/>
                        <h3 className="text-base font-semibold tracking-tight text-center text-gray-900">
                                Insulation and waterproofing
                        </h3>
                    </div>
                    <div className="flex flex-col">
                        <RadialProgressBar5/>
                        <h3 className="text-base font-semibold tracking-tight text-center text-gray-900">
                                Finishes and Closures
                        </h3>
                    </div>
                    
                </div>
                </div>




        </div>

        
          
          </div>
        </div>
      </section>
    </div>
  );
};

export default Progress;