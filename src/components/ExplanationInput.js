import React, { useState } from "react";
import AxiosInstance from "./Axios"; // Import Axios

const ExplanationInput = ({ onSubmit, userEmail }) => {
  const [explanation, setExplanation] = useState("");
  const [complexity, setComplexity] = useState("O(1)");

  const timeComplexities = [
    "Not Applicable",
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n+m)",
    "O(n log n)",
    "O(n^2)",
    "O(n^3)",
    "O(2^n)",
    "O(n!)",
  ];

  const handleSubmit = async () => {
    if (!userEmail) {
      onSubmit(explanation, complexity);
      return;
    }

    try {
      // Send request to Django to increment problems completed
      const response = await AxiosInstance.post(
        "/userstats/increment_problems_completed/",
        {
          email: userEmail, // Pass user email to Django
        }
      );
    } catch (error) {
      console.error("Error updating problem count:", error);
    }
    onSubmit(explanation, complexity);

    // Call parent onSubmit function
  };

  return (
    <div className="w-full mt-6 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Explain the Code as Best You Can
      </h3>

      <textarea
        rows="5"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 resize-none"
        placeholder="Write your explanation here..."
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
      />

      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-1">
          Select Time Complexity:
        </label>
        <select
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring focus:ring-blue-300"
        >
          {timeComplexities.map((tc) => (
            <option key={tc} value={tc}>
              {tc}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit} // 🔥 Calls Django when clicked
        className="mt-4 w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
      >
        Submit Explanation
      </button>
    </div>
  );
};

export default ExplanationInput;
