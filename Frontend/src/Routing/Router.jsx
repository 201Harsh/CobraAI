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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<OtpVerification />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
