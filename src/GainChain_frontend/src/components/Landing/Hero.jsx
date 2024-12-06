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
      className="relative isolate overflow-hidden bg-[#001F54] py-32 sm:py-48"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <img
          src="src/images/home.jpg" // Replace with actual image path
          alt="Hero Background"
          className="h-full w-full object-cover opacity-70"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#001F54]" />

      {/* Mouse-Following AI Icon */}
      <AiOutlineAppstoreAdd
        className="absolute text-[#00A7E1] text-4xl transition-transform duration-100 ease-linear pointer-events-none"
        style={{
          top: mousePosition.y - 20,
          left: mousePosition.x - 20,
        }}
      />

      {/* Hero Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-[#00A7E1] sm:text-5xl">
          Empower Your Blockchain Journey
        </h1>
        <p className="mt-6 text-lg font-medium text-white sm:text-2xl max-w-3xl mx-auto">
          Build innovative blockchain solutions effortlessly and harness the
          power of AI with GainChain.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <button className="px-8 py-3 text-lg font-semibold text-white bg-[#002C72] rounded-full shadow-lg hover:bg-[#00A7E1] hover:scale-105 transition-all">
            Get Started
          </button>
          <button className="px-8 py-3 text-lg font-semibold text-[#002C72] bg-white rounded-full shadow-lg hover:text-white hover:bg-[#00A7E1] hover:scale-105 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
