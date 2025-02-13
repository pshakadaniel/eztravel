import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-screen py-8 px-4 md:px-24 lg:px-32 ">
      <Link to="/create-trip">
        <div
          className=" flex items-center justify-center gap-4 px-6 py-3 rounded-full cursor-pointer
          backdrop-blur-md bg-black/40 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
           hover:scale-105 transition-all duration-500 ease-in-out"
        >
          <button className="text-white font-semibold">
            Get Started, 100% Free
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}

export default Hero;
