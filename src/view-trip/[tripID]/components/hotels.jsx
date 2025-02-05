import React from "react";
import HotelCard from "./hotelCard";

function hotels({ trip }) {
  return (
    <div className="mt-8">
      <h1 className="px-2 py-1 font-bold text-xl md:text-2xl text-[#FF6B08]">
        Recommended Hotels
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4 ">
        {trip?.generatedTrip?.hotels?.map((hotel, index) => (
          <HotelCard hotel={hotel} index={index} />
        ))}
      </div>
    </div>
  );
}

export default hotels;
