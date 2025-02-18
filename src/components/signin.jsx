import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the referring page or default to "/"
  const redirectTo = location.state?.from || "/";

  // Handle Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast.error("Login failed. Please try again.", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
      });
    },
  });

  // Redirect user if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate(redirectTo); // Redirect if logged in
    }
  }, [navigate, redirectTo]);

  // Fetch Google User Profile

  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      const userData = response.data;
      console.log("Google User Data:", userData);

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Show success toast
      toast.success("Signed in successfully! 🎉", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
      });

      // Redirect back to the referring page
      navigate(redirectTo);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between items-center h-screen">
      <div className=" bg-gradient-to-r from-[#240036] to-[#010f3b] w-full h-screen md:h-3/4 lg:w-1/3  lg:h-screen flex items-center justify-center">
        <div className="border-2 border-[#FF6B08] h-[400px] w-[300px] lg:w-[400px] lg:h-[600px] rounded-3xl m-auto">
          <div className="flex flex-col justify-center items-center gap-4 h-full mx-2 text-center">
            <div className="flex items-center justify-between gap-4 ">
              <img src="/favicon.ico" alt="logo" className="w-10 h-10" />
              <h1 className="text-[#FF6B08] font-bold text-2xl lg:text-4xl">
                EZ TRAVEL
              </h1>
            </div>
            <p className="text-slate-300 text-lg font-semibold "></p>
            <button
              className="w-3/4 flex items-center justify-evenly bg-slate-200 text-slate-900 font-semibold px-4 py-2 rounded-full cursor-pointer mt-8 hover:scale-105 transition-transform duration-500 ease-in-out"
              onClick={login}
            >
              <FcGoogle />
              <div className="text-slate-900">Sign in with Google</div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-2/3 md:h-1/4 lg:h-screen bg-gradient-to-br from-[#043b8d] to-[#8b4712] overflow-hidden">
        <div className="flex flex-col text-white text-xl md:text-5xl lg:text-7xl font-semibold p-4 justify-between">
          <p>
            WE BRING YOU THE TRIPS PLANS
            <p>
              YOU GIVE US YOUR
              <span className="text-[#FF6B08]">3-MINUTE</span>
            </p>
          </p>
          <p>
            <span className="text-[#FF6B08]">100% </span>FREE TO START PLAN FOR
            YOUR TRIPS
          </p>
          <p>
            WE BRING YOU THE TRIPS PLANS
            <p>
              YOU GIVE US YOUR
              <span className="text-[#FF6B08]">3-MINUTE</span>
            </p>
          </p>
          <p>
            <span className="text-[#FF6B08]">100% </span>FREE TO START PLAN FOR
            YOUR TRIPS
          </p>
          <p>
            WE BRING YOU THE TRIPS PLANS
            <p>
              YOU GIVE US YOUR
              <span className="text-[#FF6B08]">3-MINUTE</span>
            </p>
          </p>
          <p>
            <span className="text-[#FF6B08]">100% </span>FREE TO START PLAN FOR
            YOUR TRIPS
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SignIn;
