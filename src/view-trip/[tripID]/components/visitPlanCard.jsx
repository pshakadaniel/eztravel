import React from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, photoRef_URL } from "@/service/googleApi";
import { useState, useEffect } from "react";
import placeholder from "../../../assets/placeholder.jpg";

function visitPlanCard({ activity, index }) {
  const [photoURL, setPhotoURL] = useState("");
  useEffect(() => {
    activity && GetPlacePhoto();
  }, [activity]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: activity?.placeName,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[2].name);
      const photoRef = photoRef_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[2].name
      );
      setPhotoURL(photoRef);
    });
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        activity?.placeName
      )}`}
      target="_blank"
      rel="noreferrer"
    >
      <div
        key={index}
        className="h-full flex flex-col 2xl:flex-row  items-start gap-4 p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-500 ease-in-out"
      >
        {/* Card */}

        {/* Image Section */}
        <img
          src={photoURL || placeholder}
          alt=""
          className="w-full lg:w-48 h-48 md:h-full rounded-lg object-cover"
        />

        {/* Content Section */}
        <div className="flex flex-col gap-2 mt-4 md:mt-0">
          <h2 className="font-bold flex items-start gap-2 text-gray-300">
            <span>📌</span>
            {activity.placeName}
          </h2>
          <h2 className="flex items-start gap-2 text-sm font-thin  text-gray-400">
            "{activity.placeDetails}"
          </h2>
          <h2 className="flex items-start gap-2 text-gray-400">
            <span>🏃‍♂️</span>
            {activity.timeToVisit ||
              activity.bestTimeToVisit ||
              activity["Best time to visit"]}
          </h2>
          <h2 className="flex items-center gap-2 text-gray-400">
            <span>⭐</span>
            {activity.rating || activity.Rating || "No rating available"}
          </h2>
          <h2 className="flex items-start gap-2 text-gray-400">
            <span>💵</span>
            {activity.ticketPrice ||
            activity.ticketPricing ||
            activity["Ticket Price"] !== "Free" ? (
              <>
                {activity.ticketPrice ||
                  activity.ticketPricing ||
                  activity["Ticket Price"]}
              </>
            ) : (
              activity.ticketPrice ||
              activity.ticketPricing ||
              activity["Ticket Price"]
            )}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default visitPlanCard;
