import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="navbar shadow-sm bg-[#1B5299]   ">
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
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow font-bold text-lg bg-[#1B5299] text-[#F1ECCE]"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <li>
                <Link to="/auth/profile">My Profile</Link>
              </li>
            )}
            {user && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
            <li>
              <Link to="/subscription">Subscription</Link>
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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/subscription">Subscription</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-[#9FC2CC]"
            >
              <li>
                <Link to="/auth/profile" className="text-[#331832]">
                  My Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-[#331832]">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="btn border-0 bg-[#9FC2CC] text-[#331832]"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;