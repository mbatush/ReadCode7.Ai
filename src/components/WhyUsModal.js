import React from "react";

const WhyUsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-xl max-w-3xl mx-auto shadow-lg transform transition-all scale-105">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Why Choose Us?
        </h2>
        <p className="text-xl text-gray-700 mb-8 text-center">
          Here are <span className="font-bold">4 key reasons</span> why our
          platform will help you level up as a coder:
        </p>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700 text-lg">
          <li>
            <span className="font-semibold">
              Software engineers spend 90% of their time reading code.
            </span>
            The faster you can read and understand code, the more efficiently
            you'll code.
          </li>
          <li>
            <span className="font-semibold">
              Every line of code is read and reviewed at least 10 times.
            </span>
            This deep review process helps you internalize best practices and
            techniques.
          </li>
          <li>
            <span className="font-semibold">
              The fastest way to improve at LeetCode is to understand the
              solutions, not just memorize them.
            </span>
            Our platform forces you to focus on understanding concepts.
          </li>

          <li>
            <span className="font-semibold">
              Teaching is one of the best ways to solidify knowledge.
            </span>
            Our platform encourages you to explain code in your own words,
            ensuring you truly grasp it.
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
