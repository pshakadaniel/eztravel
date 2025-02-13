import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelList,
} from "../constants/Option";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "../service/AiModal";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { TbLoader3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Restore trip details after login
    const savedTripDetails = JSON.parse(localStorage.getItem("unsavedTrip"));
    const user = localStorage.getItem("user");

    if (savedTripDetails) {
      setFormData(savedTripDetails);
      setPlace(OnGenerateTrip?.destination);
    }

    // If user logs in and trip details exist, auto-generate the trip
    if (user && savedTripDetails) {
      localStorage.removeItem("unsavedTrip"); // Clear after use
      OnGenerateTrip(); // Auto-generate trip after login
    }
  }, [formData]);

  const OnGenerateTrip = async () => {
    setLoading(true);
    const user = localStorage.getItem("user");

    if (!user) {
      // Save trip details before redirecting
      localStorage.setItem(
        "unsavedTrip",
        JSON.stringify({
          ...formData,
          destination: place, // Save full destination object
        })
      );

      toast.info("Please sign in to generate your trip!", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
      });
      setLoading(false);
      navigate("/sign-in", { state: { from: "/create-trip" } });
      return;
    }

    if (
      formData?.noOfDays > 100 ||
      formData?.noOfDays < 1 ||
      !Number.isInteger(Number(formData.noOfDays)) ||
      !formData.destination ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.noOfPeople
    ) {
      toast.error("Fill in the details properly!", {
        position: "bottom-center",
        autoClose: 5000,
        theme: "dark",
      });
      setLoading(false);
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{destination}",
      formData?.destination.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{budget}", formData?.budget)
      .replace("{noOfPeople}", formData?.noOfPeople);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = await result?.response?.text();

      toast.success("Trip generated successfully! ✈️", {
        position: "bottom-center",
        autoClose: 5000,
        theme: "dark",
      });

      await saveGeneratedTrip(tripData);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveGeneratedTrip = async (genTripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docID = Date.now().toString();

      await setDoc(doc(db, "GeneratedTrips", docID), {
        userPreferences: formData,
        generatedTrip: JSON.parse(genTripData),
        userEmail: user?.email,
        id: docID,
      });
      navigate(`/view-trip/${docID}`);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip. Please try again.", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="my-8 py-8 px-4 md:px-24 lg:px-32 flex flex-col gap-2">
      <h2 className="font-bold text-3xl text-[#FF6B08]">
        Tell us your travel preferences
      </h2>
      <p className="text-gray-400 text-xl">
        Just provide some information, and we will help you to plan your next
        trip based on your preferences.
      </p>

      {/* Destination Input */}
      <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
        selectProps={{
          place,
          onChange: (v) => {
            setPlace(v);
            handleInputChange("destination", v);
          },
          styles: {
            control: (provided, state) => ({
              ...provided,
              backgroundColor: "#1E293B",
              color: "white",
              borderRadius: "8px",
              padding: "6px",
              border: "none",
              boxShadow: state.isFocused ? "0 0 0 3px #FF6B08" : "none",
            }),
            input: (provided) => ({
              ...provided,
              color: "#FF6B08",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#D1D5DC",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#9CA3AF",
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: "#1E293B",
              borderRadius: "8px",
              border: "1px solid #4B5563",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#FF6B08" : "#1E293B",
              color: "white",
              padding: "10px",
              cursor: "pointer",
            }),
          },
        }}
      />
      <div>
        <h2 className="text-xl my-3 font-md text-gray-400">
          How many days are you travelling?
        </h2>
        <input
          className=" w-full p-3 bg-slate-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B08] placeholder-gray-400"
          placeholder="Example: 7"
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
        />
      </div>
      <div>
        <h2 className="text-xl my-3 font-md text-gray-400">
          What is your budget?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
          {SelectBudgetOption.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg flex flex-col items-start gap-2
              ${
                formData?.budget === item.title &&
                "border-[#FF6B08] shadow-lg border-4"
              }
                `}
              onClick={() => handleInputChange("budget", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-gray-400">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-md text-gray-400">
          Who do you plan to travelling with on your next adventure?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3  ">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg flex flex-col items-start gap-2
                ${
                  formData.noOfPeople === item.people &&
                  "border-[#FF6B08]  shadow-lg border-4"
                }
                  `}
              onClick={() => handleInputChange("noOfPeople", item.people)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-gray-400">{item.title}</h2>
              <h2 className="text-sm text-gray-600">{item.desc}</h2>
              <h2 className="text-sm text-gray-600">{item.people}</h2>
            </div>
          ))}
        </div>
      </div>
      {/* Generate Trip Button */}
      <div className="flex justify-end py-4">
        <button
          onClick={OnGenerateTrip}
          disabled={loading}
          className="text-gray-900 font-bold flex items-center justify-center gap-4 bg-[#FF6B08] px-8 py-4 rounded-full cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out"
        >
          {loading ? <TbLoader3 className="animate-spin" /> : "Generate Trip"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CreateTrip;
