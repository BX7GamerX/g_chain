import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-deep-blue text-white py-24 px-6 md:px-12">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0"></div>
      <div className="max-w-screen-lg mx-auto relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Gain Chain
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your Gateway to the ICP Blockchain Revolution
        </p>
        <button className="bg-light-cyan text-deep-blue py-3 px-6 rounded-lg text-lg font-semibold hover:bg-deep-blue hover:text-white transition duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
