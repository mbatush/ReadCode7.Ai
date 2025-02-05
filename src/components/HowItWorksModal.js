// HowItWorksModal.js
import React from "react";

const HowItWorksModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-xl max-w-3xl mx-auto shadow-lg transform transition-all scale-105">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          How It Works
        </h2>
        <p className="text-xl text-gray-700 mb-8 text-center">
          Here's a quick overview of how the platform works:
        </p>
        <ol className="list-decimal pl-6 space-y-5 text-gray-700 text-lg leading-8">
          <li>Select the difficulty and programming language.</li>
          <li> Review the problem statement and the generated code.</li>
          <li>Try to understand the code, and explain it in your own words.</li>
          <li>Submit your explanation for feedback.</li>
          <li>Get a hint if you need help or clarification.</li>
        </ol>
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;
