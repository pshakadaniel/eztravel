import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelList,
} from "../constants/Option";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "../service/AiModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { TbLoader3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Header from "../components/Navbar";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.error(error),
  });

  const OnGenerateTrip = async () => {
    setLoading(true); // Start loading immediately when the button is clicked

    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      setLoading(false); // Stop loading if user is not logged in
      return;
    }

    // Validation for form data
    if (
      formData?.noOfDays > 100 ||
      formData?.noOfDays < 1 ||
      !formData.destination ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.noOfPeople
    ) {
      toast.error("Please fill all the details properly 😒", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
      });
      setLoading(false); // Stop loading if validation fails
      return;
    }

    // Generate the AI prompt
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{destination}",
      formData?.destination.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{noOfPeople}", formData?.noOfPeople)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = await result?.response?.text();

      toast.success("Trip generated successfully! ✈️", {
        position: "bottom-left",
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
      setLoading(false); // Stop loading after the process completes
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

  const getUserProfile = (tokenInfo) => {
    console.log("Google Login Token Info:", tokenInfo); // Debugging

    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Google User Data:", res.data); // Debugging
        localStorage.setItem("user", JSON.stringify(res.data)); // Save user data
        toast.success("Signed in successfully! 🎉", {
          position: "bottom-left",
          autoClose: 5000,
          theme: "dark",
        });
        setOpenDialog(false); // Close dialog after login
        OnGenerateTrip(); // Generate trip after login
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to sign in. Please try again.", {
          position: "bottom-left",
          autoClose: 5000,
          theme: "dark",
        });
      });
  };
  return (
    <div className="px-4 md:px-24 lg:px-32 py-10 flex flex-col gap-4 min-h-screen ">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-3xl text-[#FF6B08]">
          Tell us your travel preferences
        </h2>
        <p className=" text-gray-400 text-xl ">
          Just provide some information, and we will help you to plan your next
          trip based on your preferences.
        </p>
      </div>
      <div>
        <h2 className="text-xl my-3 font-md text-gray-400">
          What is your destination of choice?
        </h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            place,
            onChange: (v) => {
              setPlace(v);
              handleInputChange("destination", v);
            },
            styles: {
              control: (provided) => ({
                ...provided,
                backgroundColor: "#1E293B", // Dark slate background for input
                color: "white",
                borderRadius: "8px",
                padding: "6px",
                border: "1px solid #4B5563", // Gray border
              }),
              input: (provided) => ({
                ...provided,
                color: "white", // Ensures text inside input is readable
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "white", // Selected value color
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#9CA3AF", // Gray text for placeholder
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#1E293B", // Dark background for dropdown
                borderRadius: "8px",
                border: "1px solid #4B5563",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow for a nice effect
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#4B5563" : "#1E293B", // Darker shade on hover
                color: "white",
                padding: "10px",
                cursor: "pointer",
              }),
            },
          }}
        />
      </div>
      <div>
        <h2 className="text-xl my-3 font-md text-gray-400">
          How many days are you travelling?
        </h2>
        <input
          type="number"
          className=" w-full p-3 bg-slate-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
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
      <div className="flex justify-end py-4">
        <button
          disabled={loading}
          className="text-gray-900 font-bold flex items-center justify-center gap-4 bg-[#FF6B08] px-8 py-4 rounded-full cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out"
          onClick={OnGenerateTrip}
        >
          {loading ? (
            <TbLoader3 className="animate-spin" />
          ) : (
            <>
              Generate Trip
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </>
          )}
        </button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center justify-center gap-2 md:gap-12">
                <img src="logo.svg" alt="logo" className="w-12 h-12" />
                <h2 className="text-xl font-bold">EZ TRAVEL</h2>
              </div>
            </DialogTitle>
            <div className="flex flex-col gap-4 ">
              <p className="text-center font-bold">
                Ready to Plan For Your Trip 🌴⛱️
              </p>
              <DialogDescription>
                <p className="text-start text-gray-500">
                  Please Sign In to continue ...
                </p>
              </DialogDescription>
              <button
                className=" bg-[#FF6B08]  hover:bg-[#FF9C08] text-gray-900 font-semibold px-6 py-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
                onClick={login}
              >
                Sign In with Google
                <FcGoogle />
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default CreateTrip;
