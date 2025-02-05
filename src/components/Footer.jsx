import React from "react";

const Footer = () => {
  return (
    <div
      className="py-10 w-full text-center bg-gray-950 overflow-hidden"
      id="Footer"
    >
      <div className="container mx-auto flex flex-col md:items-center md:flex-row md:justify-between gap-4 ">
        {/* Left Section with Logo and Mission Statement */}
        <div className="flex flex-col items-start">
          <h3 className="text-[#FF6B08] text-lg font-bold mb-4">EZ TRAVEL</h3>
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

        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <p className="text-gray-400 mt-4 text-start">
            🌍 We believe that everyone deserves the opportunity to explore the
            world. ✈️ Our mission is to make traveling simpler, more accessible,
            and truly enjoyable for everyone. 🗺️ From personalized itineraries
            to expert travel tips and essential resources, we’re here to help
            you plan your next unforgettable adventure. 🌟✨
            <a
              href="/create-trip"
              className="text-[#FF6B08] underline underline-offset-2 ml-2"
            >
              Let's Get Started
            </a>
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <a href="/">
            <img src="logo.svg" alt="logo" className="cursor-pointer" />
          </a>
          <p className="text-[#FF6B08] font-bold">EZ TRAVEL</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-gray-500 border-t border-gray-800 text-center mt-8 pt-4">
        Copyright &copy; 2025 Daniel Pyae. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
