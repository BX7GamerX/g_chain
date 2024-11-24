import React from "react";

export default function BlockchainAI() {
  return (
    <div className="bg-[#001F54] py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base font-semibold text-[#00A7E1]">
          Empower Your Blockchain Experience
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Blockchain Development & AI for the Future
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* AI-Powered Blockchain */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-l-[2rem] shadow-md">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <h3 className="text-lg font-medium text-gray-900 text-center">
                  AI-Powered Blockchain
                </h3>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Harness the power of AI to enhance blockchain development and
                  user engagement on Gain Chain.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://your-image-link/ai-blockchain.png"
                  alt="AI Blockchain"
                />
              </div>
            </div>
          </div>

          {/* Decentralized Security */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg max-lg:rounded-t-[2rem] shadow-md">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <h3 className="text-lg font-medium text-gray-900 text-center">
                  Decentralized Security
                </h3>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Gain Chain ensures top-notch security through decentralized
                  protocols and cryptography.
                </p>
              </div>
              <div className="flex items-center justify-center px-8 py-10">
                <img
                  className="w-full max-w-sm"
                  src="https://your-image-link/security-blockchain.png"
                  alt="Decentralized Security"
                />
              </div>
            </div>
          </div>

          {/* Blockchain Analytics */}
          <div className="relative lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg shadow-md">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <h3 className="text-lg font-medium text-gray-900 text-center">
                  Blockchain Analytics
                </h3>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Gain valuable insights through AI-powered analytics for
                  blockchain transactions and behavior patterns.
                </p>
              </div>
              <div className="flex items-center justify-center py-10">
                <img
                  className="h-40 w-auto object-cover"
                  src="https://your-image-link/blockchain-analytics.png"
                  alt="Blockchain Analytics"
                />
              </div>
            </div>
          </div>

          {/* Scalable Smart Contracts */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-r-[2rem] shadow-md">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <h3 className="text-lg font-medium text-gray-900 text-center">
                  Scalable Smart Contracts
                </h3>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Deploy and scale decentralized applications with smart
                  contracts optimized for performance and security.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow bg-[#FF4500]">
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center px-6">
                    <h4 className="font-bold">SmartContract.jsx</h4>
                    <p>Code example goes here...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
