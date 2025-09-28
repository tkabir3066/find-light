import React from "react";

const Navbar = () => {
  return (
    <div className="navbar shadow-sm bg-[#1B5299] rounded-md mb-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-[#F1ECCE] lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow font-bold text-lg"
            style={{ backgroundColor: "#1B5299", color: "#F1ECCE" }}
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>My Profile</a>
            </li>
          </ul>
        </div>
        <a className="md:text-3xl text-xl font-extrabold text-[#9FC2CC]">
          Find Light
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold text-lg text-[#F1ECCE]">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>My Profile</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <a
          className="btn border-0"
          style={{ backgroundColor: "#9FC2CC", color: "#331832" }}
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Navbar;
