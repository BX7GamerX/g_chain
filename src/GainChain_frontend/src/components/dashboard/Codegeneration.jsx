import React from "react";

const CodeGenerationPrompt = ({ onNext }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Code Generation Prompt</h2>
      <p className="text-gray-700 mb-4">
        Enter your customization prompt below to generate the code you need.
      </p>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004BA8]"
        placeholder="Describe your requirements here..."
      />
      <button
        className="mt-4 w-full bg-[#004BA8] text-white py-2 rounded hover:bg-[#3E78B2] transition"
        onClick={onNext}
      >
        Generate Code
      </button>
    </div>
  );
};

export default CodeGenerationPrompt;
