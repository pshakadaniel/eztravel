import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navbar */}
      <div className="py-4 px-4 md:px-24 lg:px-32 bg-transparent backdrop-blur-3xl">
        <Navbar />
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#010f3b_40%,#240036_100%)]"></div>
      {/* Page Content - Ensure it takes full height */}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
