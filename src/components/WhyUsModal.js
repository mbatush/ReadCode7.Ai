// WhyUsModal.js
import React from "react";

const WhyUsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-xl max-w-3xl mx-auto shadow-lg transform transition-all scale-105">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Why Us?
        </h2>
        <p className="text-xl text-gray-700 mb-8 text-center">
          Here are <span className="font-bold">3 key reasons</span> why our
          platform helps you become a better coder:
        </p>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700 text-lg">
          <li>
            <span className="font-semibold">
              90% of a Software Engineer's time is spent reading code.
            </span>
            The faster you read and comprehend code the more time you spend
            coding
          </li>
          <li>
            <span className="font-semibold">
              Every line of code is read at least 10 times.
            </span>
            This deep review process helps internalize patterns and techniques.
          </li>
          <li>
            <span className="font-semibold">
              Fastest way to improve at LeetCode.
            </span>
            Our platform forces you to understand not memorize solutions
          </li>

          <li>
            <span className="font-semibold">
              Teaching is the best way to learn.
            </span>
            Our platform makes you explain code in your own words to make sure
            you understand it
          </li>
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

export default WhyUsModal;
