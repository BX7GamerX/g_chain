import React from 'react';

const FeatureSection = () => {
  return (
    <section className="bg-light-cyan py-16 px-6 md:px-12">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-deep-blue mb-8">
          What is Gain Chain?
        </h2>
        <div className="flex flex-col md:flex-row gap-12 justify-center">
          <div className="bg-deep-blue text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Decentralized Platform</h3>
            <p>
              Empowering users with greater control over their assets and data on the ICP blockchain.
            </p>
          </div>
          <div className="bg-deep-blue text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Seamless ICP Integration</h3>
            <p>
              Integration with ICP makes transactions fast, secure, and easy to manage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
