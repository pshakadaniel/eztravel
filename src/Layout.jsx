import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <div className="py-4 px-4 md:px-24 lg:px-32 bg-black">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="bg-gradient-to-b from-black to-blue-900 text-stone-100  ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
