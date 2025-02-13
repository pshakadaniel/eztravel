import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex justify-between items-center py-4 px-4 md:px-24 lg:px-32">
      <div className="flex flex-col items-center justify-between gap-4 md:gap-8 mx-auto px-12 md:px-20 py-20 xl:py-32 place-items-center max-w-4xl">
        <h1 className="font-extrabold text-3xl md:text-6xl text-center ">
          <span className="text-[#FF6B08]">
            Discover your next Adventure with AI:
          </span>
          <br />
          <p className="text-[#715c58] animate-pulse">
            Personalized Itineraries for your next trips ✈️🗺️
          </p>
        </h1>

        <p className="text-center text-[#715c58] text-lg font-bold md:text-xl">
          NO SUBSCRIPTIONS, NO HIDDEN CHARGES
        </p>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#FF6B08"
            class="size-12 animate-bounce"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </div>
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
      <div>
        <h1></h1>
      </div>
    </div>
  );
}

export default Hero;
