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
    <div className="flex justify-between items-center ">
      <div className="bg-linear-to-r to-black from-[#FF6B08]  w-full lg:w-2/5 h-dvh flex overflow-hidden">
        <div className="border-2 border-stone-500 h-[400px] w-[300px] lg:w-[400px] lg:h-[600px] rounded-3xl m-auto">
          <div className="flex flex-col justify-center items-center gap-4 h-full mx-2 text-center">
            <h1 className="text-[#FF6B08] font-bold text-2xl lg:text-4xl">
              EZ TRAVEL
            </h1>

            <p className="text-slate-300 text-lg font-semibold ">
              Welcome back! Sign in to your account
            </p>
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

      <div className="hidden lg:flex w-3/5 h-dvh bg-black bg-cover bg-center bg-no-repeat"></div>

      <ToastContainer />
    </div>
  );
}

export default SignIn;
