import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "./Layout"; // Import the Layout
import CreateTrip from "./create-trip/index.jsx";
import ViewTrip from "./view-trip/[tripID]/index.jsx";
import MyTrips from "./my-trips/index.jsx";
import Signin from "./components/signin.jsx";
import "./index.css";
import Footer from "./components/Footer.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap everything inside Layout
    children: [
      { path: "/", element: <App /> },
      { path: "/create-trip", element: <CreateTrip /> },
      { path: "/view-trip/:tripID", element: <ViewTrip /> },
      { path: "/my-trips", element: <MyTrips /> },
    ],
  },
  { path: "/sign-in", element: <Signin /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
