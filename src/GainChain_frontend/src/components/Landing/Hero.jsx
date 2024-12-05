import React, { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai"; // Example tech icon

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Update mouse position on mouse movement
  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#00A7E1] to-[#40E0D0] py-32 sm:py-48"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <img
          src="src/images/home.jpg" // Replace with actual image path
          alt="Hero Background"
          className="h-full w-full object-cover opacity-50"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#001F3F] to-transparent opacity-50" />

      {/* Mouse-Following AI Icon */}
      <AiOutlineAppstoreAdd
        className="absolute text-[#40E0D0] text-4xl transition-transform duration-100 ease-linear pointer-events-none"
        style={{
          top: mousePosition.y - 20,
          left: mousePosition.x - 20,
        }}
      />

      {/* Hero Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-white sm:text-8xl">
          GainChain AI
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-200 sm:text-2xl max-w-3xl mx-auto">
          Your Web3 Developer at the click of a button. Build blockchain
          applications effortlessly and harness the power of AI for Web3
          innovation.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <button className="px-8 py-3 text-lg font-semibold text-white bg-[#001F3F] rounded-full shadow-lg hover:bg-[#40E0D0] hover:scale-105 transition-all">
            Get Started
          </button>
          <button className="px-8 py-3 text-lg font-semibold text-[#001F3F] bg-white rounded-full shadow-lg hover:text-white hover:bg-[#40E0D0] hover:scale-105 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
