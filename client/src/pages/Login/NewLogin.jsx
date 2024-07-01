import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss';
import { jwtDecode } from 'jwt-decode';

const NewLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.projectIDs && decodedToken.projectIDs.length > 0) {
        setProjectId(decodedToken.projectIDs[0]); // Set the first projectId found in the token
      }
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const userData = await UserService.login(username, password);
      console.log("User data received:", userData);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("designation", userData.designation);
        localStorage.setItem("userID", userData.userID);

        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
        });

        // Navigate to the appropriate dashboard based on user designation
        switch (userData.designation) {
          case "Administrator":
            navigate("/admin/dashboard");
            break;
          case 'Client':
          case 'Consultant':
            navigate(`/progress/${projectId}`);
            break;
          case 'Project Creation Team':
            navigate('/project/Dashboard');
            break;
          case "Project Manager":
            navigate("/pmanager/projects");
            break;
          case "Site Engineer":
            navigate("/sengineer/dashboard");
            break;
          case "Supervisor":
            navigate("/supervisor/dashboard");
            break;
          case "Store Keeper":
            navigate("/store/dashboard");
            break;
          case "Quantity Surveyor":
            navigate("/store/dashboard");
            break;
          default:
            navigate("/client/dashboard"); // Default page if designation is not recognized
            break;
        }
      } else {
        setError(userData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response || error.message || error);
      setTimeout(() => {
        Swal.fire({
          title: "Error!",
          text:
            error.response?.data?.message ||
            error.message ||
            "An error occurred during login. Please try again.",
          icon: "error",
        });
      }, 5000);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen overflow-hidden"
      style={{ background: "#edf2f7" }}
    >
      <div
        className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5"
        style={{
          background:
            "linear-gradient(to bottom, #14244a 0%, #14244a 20%, #101d3f 70%, #101d3f 100%)",
        }}
      >
        <div className="relative justify-center min-h-screen bg-transparent shadow-xl sm:flex sm:flex-row rounded-3xl">
          <div className="z-10 flex flex-col self-center lg:px-14 sm:max-w-4xl xl:max-w-md">
            <div className="flex-col self-start hidden text-gray-200 lg:flex">
              <h1 className="my-3 text-4xl font-semibold">Welcome back</h1>
              <p className="pr-3 text-sm text-gray-200 opacity-75">
                MASTER BUILDER ! It's time to breathe life into your blueprints
                and transform dreams into stunning reality. Let's build the
                extraordinary together!
              </p>
            </div>
          </div>

          <div className="z-10 flex self-center justify-center">
            <form onSubmit={handleSubmit}>
              <div className="p-12 mx-auto bg-white rounded-3xl w-96">
                <div className="mb-7">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Log In
                  </h3>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="space-y-6">
                  <div>
                    <input
                      className="w-full px-4 py-3 text-sm bg-gray-200 border border-gray-200 rounded-lg focus:bg-gray-100 focus:outline-none focus:border-indigo-500"
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder="Password"
                      value={password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-gray-200 border border-gray-200 rounded-lg focus:bg-gray-100 focus:outline-none focus:border-indigo-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-sm leading-5">
                      <svg
                        onClick={() => setShowPassword(!showPassword)}
                        className={`h-4 text-[#101d3f] cursor-pointer ${
                          showPassword ? "hidden" : "block"
                        }`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        />
                      </svg>
                      <svg
                        onClick={() => setShowPassword(!showPassword)}
                        className={`h-4 text-[#101d3f] cursor-pointer ${
                          showPassword ? "block" : "hidden"
                        }`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-[#101d3f] hover:bg-indigo-500 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                    >
                      Log in
                    </button>
                  </div>
                  <div className="flex items-center justify-center my-5 space-x-2">
                    <span className="h-px bg-gray-100 w-36"></span>
                    <span className="h-px bg-gray-100 w-36"></span>
                  </div>
                </div>

                <div className="text-xs text-center text-gray-300 mt-7">
                  <span>
                    Copyright © 2023-2024{" "}
                    <a
                      href="https://codepen.io/uidesignhub"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-[#101d3f] hover:text-indigo-500"
                      title="Codepen aji"
                    >
                      Ascendia
                    </a>
                  </span>
                </div>
              </div>
            </form>
          </div>

          <footer className="absolute bottom-0 left-0 z-30 w-full bg-transparent">
            <div className="container flex items-center justify-between p-5 mx-auto">
              <div className="flex mr-auto">
                <a
                  href="https://codepen.io/uidesignhub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-gray-700 focus:outline-none"
                >
                  <img
                    src="https://flowbite.com/docs/images/logo.svg" // Update with your image path
                    alt="logo"
                    className="object-cover mx-auto rounded-full w-14 h-14"
                  />
                  <p className="text-4xl">
                    Asc<strong>endia</strong>
                  </p>
                </a>
              </div>
            </div>
          </footer>
          <svg
            className="absolute bottom-0 left-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
