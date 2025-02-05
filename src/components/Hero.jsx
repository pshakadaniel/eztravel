import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-between gap-12 mx-auto px-12 md:px-20 place-items-center max-w-4xl py-20">
      <h1 className="font-extrabold text-3xl md:text-6xl text-center ">
        <span className="text-[#FF6B08]">
          Discover your next Adventure with AI:
        </span>
        <br />
        <p className="text-[#715c58]">
          Personalized Itineraries for your next trips 🗺️📌
        </p>
      </h1>

      <p className="text-center text-[#715c58] text-lg font-bold md:text-xl">
        NO SUBSCRIPTIONS, NO HIDDEN CHARGES
      </p>
      <Link to="/create-trip">
        <div className="flex items-center justify-center gap-4 bg-[#FF6B08] px-8 py-4 rounded-full cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out">
          <button className="text-gray-900 font-semibold ">
            Get Started, 100% Free
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="black"
            class="w-7 h-7"
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
