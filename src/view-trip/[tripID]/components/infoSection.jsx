import React, { useEffect } from "react";
import { IoShareOutline } from "react-icons/io5";
import { GetPlaceDetails } from "@/service/googleApi";
import { useState } from "react";
import { photoRef_URL } from "../../../service/googleApi";
import placeholder from "../../../assets/placeholder.jpg";
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";

function infoSection({ trip }) {
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
  const images = [photoURL || placeholder];
  return (
    <div>
      {/* <img
        src={photoURL || placeholder}
        alt="placeholder img"
        className="h-[400px] w-full object-cover rounded-xl"
      /> */}
      {images.slice(0, 16).map((src, i) => (
        <AsyncImage
          key={i}
          src={src || placeholder}
          Transition={Blur}
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
          loader={
            <div
              style={{
                width: "100%",
                height: "400px",
                background: "#888",
                objectFit: "cover",
                rounded: "8px",
              }}
            />
          }
        />
      ))}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h1 className=" px-2 py-1 font-bold text-2xl md:3xl text-gray-300">
            ✈️🗺️📌
            {trip?.userPreferences?.destination?.label}
          </h1>
          <IoShareOutline className="w-8 h-8 cursor-pointer" onClick={""} />
        </div>
        <div className="text-gray-400 font-bold text-sm flex flex-col lg:flex-row justify-center items-start md:justify-start gap-2 ">
          <p className=" px-4 py-2   bg-[#FF6B08]/40 backdrop-blur-sm rounded-full">
            📅 Total:
            {trip?.userPreferences?.noOfDays} days
          </p>
          <p className=" px-4 py-2   bg-[#FF6B08]/40 backdrop-blur-sm rounded-full ">
            💸 Type:
            {trip?.userPreferences?.budget}
          </p>
          <p className=" px-4 py-2   bg-[#FF6B08]/40 backdrop-blur-sm rounded-full ">
            🥂 Total People:
            {trip?.userPreferences?.noOfPeople}
          </p>
        </div>
      </div>
    </div>
  );
}

export default infoSection;
