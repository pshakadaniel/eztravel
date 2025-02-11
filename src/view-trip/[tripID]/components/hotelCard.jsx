import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, photoRef_URL } from "../../../service/googleApi";
import placeholder from "../../../assets/placeholder.jpg";
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";

function hotelCard({ hotel, index }) {
  const [photoURL, setPhotoURL] = useState("");
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.HotelName,
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
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel?.HotelName + " " + hotel?.address
      )}`}
      target="_blank"
      rel="noreferrer"
    >
      <div
        key={index}
        className=" p-4 border border-white/20 bg-white/10 backdrop-blur-xl rounded-xl hover:scale-105 transition-transform ease-in-out duration-500 h-full"
      >
        {/* <img
          src={photoURL || placeholder}
          alt=""
          className="rounded-xl w-full h-48 object-cover"
        /> */}
        {images.slice(0, 16).map((src, i) => (
          <AsyncImage
            key={i}
            src={src || placeholder}
            Transition={Blur}
            style={{
              width: "100%",
              height: "12rem",
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
        <div className="flex flex-col justify-items-center gap-2 mt-4">
          <h2 className="font-bold text-lg flex items-center gap-2 text-gray-300">
            <div>🛌</div>
            {hotel.HotelName}
          </h2>
          <h2 className="text-xs font-medium flex items-center gap-2 text-gray-400">
            <div>📍</div>
            {hotel.address || hotel["Hotel address"]}
          </h2>
          <h2 className="flex items-center gap-2 text-gray-400">
            <div>⭐</div>
            {hotel.rating || hotel.Rating}
          </h2>
          <h2 className=" flex items-center gap-2 text-gray-400">
            <div>💵</div> {hotel.price} USD per night
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default hotelCard;
