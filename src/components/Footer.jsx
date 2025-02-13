import React from "react";

const Footer = () => {
  return (
    <div className="py-4 px-4 md:px-24 lg:px-32 w-full text-center bg-gray-950 pt-8">
      <div className="container mx-auto flex flex-col md:items-center md:flex-row md:justify-between gap-4 ">
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
              <a href="/" className="hover:text-white">
                Contact Us
              </a>
            </div>
          </ul>
        </div>

        {/* Right Section with Navigation Links */}
      </div>

      {/* Footer Bottom */}
      <div className="text-gray-500 border-t border-gray-800 text-center mt-8 pt-4 text-sm">
        Copyright &copy; 2025{" "}
        <a
          href="https://danielp.vercel.app/"
          className="underline font-semibold"
        >
          Daniel Pyae
        </a>
        . All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
