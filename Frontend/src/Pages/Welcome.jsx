import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";

const Welcome = () => {
  return (
    <div className="h-screen w-screen bg-gray-900 md:overflow-hidden overflow-x-hidden">
      <Header />
      <Hero />
    </div>
  );
};

export default Welcome;
