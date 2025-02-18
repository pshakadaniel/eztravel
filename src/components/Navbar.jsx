import React, { useState } from "react";
import Logo from "/favicon.ico";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/UI/Popover";
import { googleLogout } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInRedirect = () => {
    navigate("/sign-in", { state: { from: location.pathname } }); // Pass current page as `from`
  };

  const user = JSON.parse(localStorage.getItem("user")); // Fetch user from localStorage

  const handleLogout = () => {
    googleLogout(); // Google logout
    localStorage.clear(); // Clear user data
    window.location.reload(); // Refresh the app
  };

  return (
    <div className="flex justify-between items-center">
      <a href="/">
        <img src={Logo} alt="logo" className="w-10 h-10" />
      </a>
      <ToastContainer />
      {user ? (
        <div className="flex items-center gap-2">
          <Link to="/create-trip">
            <button className="text-gray-900 font-semibold bg-[#FF6B08] px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out">
              + Add
            </button>
          </Link>
          <Link to="/my-trips">
            <button className="text-gray-900 font-semibold bg-[#FF6B08] px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out">
              My Trips
            </button>
          </Link>
          <Popover>
            <PopoverTrigger>
              <img
                src={user.picture}
                alt="profile"
                className="w-10 h-10 rounded-full"
                loading="lazy"
              />
            </PopoverTrigger>
            <PopoverContent
              className="cursor-pointer bg-slate-300/20 backdrop-blur-md text-gray-500 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={handleLogout}
            >
              Logout
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <button
          onClick={() =>
            navigate("/sign-in", { state: { from: window.location.pathname } })
          }
          className="focus:outline-none text-gray-950 bg-[#FF6B08] hover:scale-105 transition-transform duration-500 ease-in-out font-medium rounded-full text-sm px-5 py-2.5"
        >
          Sign in
        </button>
      )}
    </div>
  );
}

export default Header;
