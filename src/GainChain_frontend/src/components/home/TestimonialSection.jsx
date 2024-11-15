import React from 'react';

const TestimonialSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-deep-blue mb-8">What Our Users Are Saying</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="bg-light-cyan text-deep-blue p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-full md:w-1/3">
            <p>"Gain Chain has revolutionized how we interact with blockchain technology."</p>
            <p>- John Doe, Developer</p>
          </div>
          <div className="bg-light-cyan text-deep-blue p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-full md:w-1/3">
            <p>"The platform's seamless integration with ICP is game-changing for the industry."</p>
            <p>- Jane Smith, Entrepreneur</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
