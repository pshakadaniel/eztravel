import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>

      {/* Navbar */}
      <div className="relative z-10 ">
        <Navbar />
      </div>
      {/* Page Content */}
      <div className="relative z-10  ">
        <Outlet /> {/* Renders current page content */}
      </div>
    </div>
  );
}

export default Layout;
