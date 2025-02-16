import React from "react";

const Footer = () => {
  return (
    <div className=" bg-black py-4 px-4 md:px-24 lg:px-32 ">
      {/* Left Section with Logo and Mission Statement */}
      <div className="flex flex-col items-start">
        <ul className="flex flex-col gap-2 text-gray-400 items-start pb-4">
          <a href="/" className="hover:text-white">
            Home
          </a>
          <a href="/" className="hover:text-white">
            About Us
          </a>
          <div>
            <a href="https://danielp.vercel.app/" className="hover:text-white">
              Contact Us
            </a>
          </div>
        </ul>
      </div>
      {/* Footer Bottom */}
      <div className="text-gray-500 border-t border-gray-800 text-center pt-4 text-sm">
        Copyright &copy; 2025{" "}
        <a
          href="https://danielp.vercel.app/"
          className="underline font-semibold"
        >
          EZ TRAVEL- AI TRIPS PLANNER
        </a>
        . All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
