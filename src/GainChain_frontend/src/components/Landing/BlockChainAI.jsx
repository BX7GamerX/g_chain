import React from "react";
import { animated } from "react-spring";

export default function IntegratedSection() {
  return (
    <div className="relative bg-[#001F54] py-24 sm:py-32 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#001F54]"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Header section */}
        <h2 className="text-center text-base font-semibold text-[#00A7E1]">
          Empower Your Blockchain Experience
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Blockchain Development & AI for the Future
        </p>

        {/* Features Section */}
        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* AI-Powered Blockchain */}
          <div className="relative flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10 bg-[#002C72] text-white">
              <h3 className="text-lg font-medium text-center">AI-Powered Blockchain</h3>
              <p className="mt-2 text-sm text-center">
                Harness the power of AI to enhance blockchain development and user engagement on Gain Chain.
              </p>
            </div>
            <div className="relative h-80 sm:h-96 w-full bg-cover bg-center">
              <img
                className="absolute inset-0 h-full w-full object-cover opacity-70"
                src="src/images/hand.jpg"
                alt="AI Blockchain"
              />
            </div>
          </div>

          {/* Decentralized Security */}
          <div className="relative flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10 bg-[#002C72] text-white">
              <h3 className="text-lg font-medium text-center">Decentralized Security</h3>
              <p className="mt-2 text-sm text-center">
                Gain Chain ensures top-notch security through decentralized protocols and cryptography.
              </p>
            </div>
            <div className="flex items-center justify-center px-8 py-6">
              <img
                className="w-full max-w-sm rounded-md shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                src="src/images/security.webp"
                alt="Decentralized Security"
              />
            </div>
          </div>

          {/* Blockchain Analytics */}
          <div className="relative flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10 bg-[#002C72] text-white">
              <h3 className="text-lg font-medium text-center">Blockchain Analytics</h3>
              <p className="mt-2 text-sm text-center">
                Gain valuable insights through AI-powered analytics for blockchain transactions and behavior patterns.
              </p>
            </div>
            <div className="flex items-center justify-center py-6">
              <img
                className="h-40 w-auto object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                src="src/images/community.webp"
                alt="Blockchain Analytics"
              />
            </div>
          </div>

          {/* New Section: Community & Support */}
          <div className="relative flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10 bg-[#002C72] text-white">
              <h3 className="text-lg font-medium text-center">Community & Support</h3>
              <p className="mt-2 text-sm text-center">
                Join our vibrant community of developers and blockchain enthusiasts. Gain Chain offers 24/7 support and collaborative learning to help you build, share, and innovate.
              </p>
            </div>
            <div className="flex items-center justify-center px-8 py-6">
              <img
                className="w-full max-w-md rounded-md shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                src="src/images/community-support.webp"
                alt="Community Support"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
