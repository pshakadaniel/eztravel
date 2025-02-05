import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
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
import { toast, ToastContainer } from "react-toastify";

function Header() {
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.error(error),
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);

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
      });
  };
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center p-4 px-4 md:px-24 lg:px-32 ">
      <a
        className="flex items-center gap-2 p-2 font-bold text-[#FF6B08]"
        href="/"
      >
        <img src={Logo} alt="logo" />
        <h1 className="hidden md:flex"> EZ TRAVEL</h1>
      </a>
      <ToastContainer />
      {user ? (
        <div className="flex items-center justify-between gap-2">
          <div></div>
          <a href="/create-trip">
            <button className=" text-gray-900 font-semibold bg-[#FF6B08] px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out">
              + Add
            </button>
          </a>
          <a href="/my-trips">
            <button className=" text-gray-900 font-semibold bg-[#FF6B08] px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out">
              My Trips
            </button>
          </a>
          <Popover>
            <PopoverTrigger>
              <img
                src={user.picture}
                alt="profile picture"
                className="w-10 h-10 rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent
              className="cursor-pointer bg-slate-300/20 backdrop-blur-md text-gray-500 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={handleLogout}
              href="/"
            >
              Logout
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <button
          onClick={setOpenDialog}
          className="focus:outline-none text-gray-950 bg-[#FF6B08] hover:scale-105 transition-transform duration-500 ease-in-out  font-medium rounded-full text-sm px-5 py-2.5 "
        >
          Sign in
        </button>
      )}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center justify-between">
                <a href="/">
                  <img src="logo.svg" alt="logo" className="w-12 h-12" />
                </a>
                <h2 className="text-xl font-bold text-[#FF6B08]">EZ TRAVEL</h2>
                <span></span>
              </div>
            </DialogTitle>
            <div className="flex flex-col gap-4 justify-center ">
              <p className="text-start font-bold text-gray-900">
                Hey Traveler, Are You Ready to explore? 🌍✈️🛳️
              </p>
              <DialogDescription>
                <p className="text-start text-gray-200 font-light text-sm">
                  Get Plans for Your Next Destinations ...
                </p>
              </DialogDescription>
              <button
                className=" bg-[#FF6B08] hover:scale-105 transition-transform duration-500 ease-in-out text-gray-900 font-semibold px-6 py-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
                onClick={login}
              >
                Sign in with Google
                <FcGoogle />
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
