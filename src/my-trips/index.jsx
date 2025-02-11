import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebaseConfig";
import UserTripsCard from "./components/userTripsCard";

function MyTrips() {
  const navigate = useNavigate(); // For navigation
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.error("No user found in localStorage.");
      navigate("/"); // Redirect if user is not logged in
      return;
    }

    try {
      console.log("Querying Firestore with userEmail:", user.email);

      const q = query(
        collection(db, "GeneratedTrips"),
        where("userEmail", "==", user.email)
      );

      const querySnapshot = await getDocs(q);

      console.log("Query snapshot size:", querySnapshot.size);

      if (querySnapshot.empty) {
        console.log("No trips found for this user.");
        setUserTrips([]); // No trips available
      } else {
        const trips = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Trips:", trips);
        setUserTrips(trips);
      }
    } catch (error) {
      console.error("Error fetching user trips:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const SkeletonCard = () => (
    <div className="h-full flex flex-col justify-between items-start gap-4 p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl animate-pulse">
      {/* Skeleton for Trip Image */}
      <div className="object-cover rounded-xl h-40 w-full bg-gray-300"></div>
      {/* Skeleton for Destination */}
      <div className="h-8 w-3/4 bg-gray-300 rounded-md"></div>
      {/* Skeleton for Trip Details */}
      <div className="h-6 w-1/2 bg-gray-300 rounded-full mt-2"></div>
      <div className="h-6 w-1/2 bg-gray-300 rounded-full mt-2"></div>
      <div className="h-6 w-1/2 bg-gray-300 rounded-full mt-2"></div>
    </div>
  );

  return (
    <div className="px-4 md:px-24 lg:px-32 py-10 flex flex-col gap-4 min-h-screen">
      <h1 className="text-center font-bold text-3xl lg:text-4xl pb-6 text-[#FF6B08]">
        My Trips
      </h1>

      {/* Show skeleton if loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : userTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {userTrips.map((trip) => (
            <UserTripsCard key={trip.id} trip={trip} /> // Render trip cards
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No trips found.</p>
      )}
    </div>
  );
}

export default MyTrips;
