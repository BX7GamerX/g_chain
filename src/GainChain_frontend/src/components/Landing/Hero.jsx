import React, { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai"; // Example tech icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); // Hook for navigation

  // Update mouse position on mouse movement
  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      className="relative isolate overflow-hidden bg-[#3E78B2] py-32 sm:py-48"
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#3E78B2]" />

      {/* Mouse-Following AI Icon */}
      <AiOutlineAppstoreAdd
        className="absolute text-[#4A525A] text-4xl transition-transform duration-100 ease-linear pointer-events-none"
        style={{
          top: mousePosition.y - 20,
          left: mousePosition.x - 20,
        }}
      />

      {/* Hero Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-[#4A525A] sm:text-5xl">
          Empower Your Blockchain Journey
        </h1>
        <p className="mt-6 text-lg font-medium text-white sm:text-2xl max-w-3xl mx-auto">
          Build innovative blockchain solutions effortlessly and harness the
          power of AI with GainChain.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <button
            className="px-8 py-3 text-lg font-semibold text-white bg-[#004BA8] rounded-full shadow-lg hover:bg-[#3E78B2] hover:scale-105 transition-all"
            onClick={() => navigate('/signup')}
            aria-label="Get Started"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Company Statistics Section (positioned at the bottom left corner) */}
      <div className="absolute bottom-10 left-10 flex gap-12">
        <div className="flex flex-col items-center">
          <h3 className="text-4xl font-bold text-white">500+</h3>
          <p className="text-lg mt-2 text-white">Projects Completed</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-4xl font-bold text-white">100+</h3>
          <p className="text-lg mt-2 text-white">Satisfied Clients</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-4xl font-bold text-white">24/7</h3>
          <p className="text-lg mt-2 text-white">Support Available</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-4xl font-bold text-white">999,999,999+</h3>
          <p className="text-lg mt-2 text-white">gch coins deployed</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
