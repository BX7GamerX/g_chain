import React, { useState } from 'react';

const FAQSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-deep-blue text-white py-16 px-6 md:px-12">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <button
              onClick={() => setOpen(!open)}
              className="w-full text-left bg-dark-purple text-white p-4 rounded-lg hover:bg-light-cyan transition duration-300"
            >
              What is Gain Chain?
            </button>
            {open && (
              <div className="bg-dark-purple text-white p-4 rounded-lg mt-2">
                Gain Chain is an innovative decentralized platform built on the ICP blockchain.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
