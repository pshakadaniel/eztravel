import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import InfoSection from "./components/infoSection";
import Hotels from "./components/hotels";
import VisitPlan from "./components/visitPlan";
import Footer from "./components/footer";
function viewTrip() {
  const { tripID } = useParams();
  const [tripData, setTripData] = useState({});
  useEffect(() => {
    tripID && getTripData();
  }, []);
  // Get trip data from firestore using tripID from Firebase
  const getTripData = async () => {
    // Fetch trip data using tripID
    const docRef = doc(db, "GeneratedTrips", tripID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTripData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <div className="px-4 md:px-24 lg:px-32 py-10 flex flex-col gap-4 min-h-screen  ">
      {/* INFO Section */}
      <InfoSection trip={tripData} />
      {/* Rcmd Hotel Section */}
      <Hotels trip={tripData} />
      {/* Visit Plan per Day Section */}
      <VisitPlan trip={tripData} />
      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default viewTrip;
