import React, { useEffect, useState } from "react";
import { IoShareOutline } from "react-icons/io5";
import placeholder from "../../assets/placeholder.jpg";
import { GetPlaceDetails, photoRef_URL } from "../../service/googleApi";
import { Link } from "react-router-dom";

function UserTripsCard({ trip }) {
  const [photoURL, setPhotoURL] = useState("");
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userPreferences?.destination?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[1].name);
      const photoRef = photoRef_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[1].name
      );
      setPhotoURL(photoRef);
    });
  };
  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className="h-full flex flex-col  justify-between items-start gap-4 p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-500 ease-in-out">
        {/* Trip Image */}
        <img
          src={photoURL || placeholder} // Use `trip.imageUrl` or fallback to placeholder
          alt={trip.userPreferences?.destination?.label || "Trip"}
          className="object-cover rounded-xl h-40 w-full"
        />
        <div className="flex justify-between items-center w-full">
          <h1 className=" px-2 py-1 font-bold text-2xl md:3xl text-gray-300">
            ✈️{trip?.userPreferences?.destination?.label}
          </h1>
          {/* <IoShareOutline className="w-8 h-8 cursor-pointer" onClick={""} /> */}
        </div>

        <p className=" px-4 py-2  text-gray-400  bg-[#FF6B08]/10 backdrop-blur-sm rounded-full">
          📅 Total:
          {trip?.userPreferences?.noOfDays} days
        </p>
        <p className=" px-4 py-2  text-gray-400 bg-[#FF6B08]/10 backdrop-blur-sm rounded-full ">
          💸 Type:
          {trip?.userPreferences?.budget}
        </p>
        <p className=" px-4 py-2  text-gray-400 bg-[#FF6B08]/10 backdrop-blur-sm rounded-full ">
          🥂 Total People:
          {trip?.userPreferences?.noOfPeople}
        </p>
      </div>
    </Link>
  );
}

export default UserTripsCard;
