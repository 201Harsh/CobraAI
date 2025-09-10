import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "../Pages/Welcome";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Examples from "../Pages/Examples";
import Pricing from "../Pages/Pricing";
import OtpVerification from "../Pages/OtpVerification";
import Dashboard from "../Pages/Dashboard";
import AutoRedirecter from "../Hooks/AutoRedirecter";
import DashboardProtector from "../Hooks/DashboardProtector";
import Profile from "../Pages/Profile";
import UpdateUserInfo from "../Pages/UpdateUserInfo";
import Settings from "../Pages/Settings";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/welcome" element={<Welcome />} /> */}
        <Route path="/" element={<AutoRedirecter />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<OtpVerification />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/dashboard"
          element={
            <DashboardProtector>
              <Dashboard />
            </DashboardProtector>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateInfo" element={<UpdateUserInfo />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
