import "./index.css";
import "./styles/tailwind-pre-build.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProblemSelector from "./components/ProblemSelector";
import CodeDisplay from "./components/CodeDisplay";
import ExplanationInput from "./components/ExplanationInput";
import Feedback from "./components/Feedback";
import Timer from "./components/Timer";
import HowItWorksModal from "./components/HowItWorksModal";
import WhyUsModal from "./components/WhyUsModal";
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const [gptSolution, setGptSolution] = useState(null);
  const [userExplanation, setUserExplanation] = useState("");
  const [userComplexity, setUserComplexity] = useState("Not sure");
  const [hint, setHint] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [failed, setFailed] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true); // ✅ Added state to control timer
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isWhyUsOpen, setWhyUs] = useState(false);

  const openWhyUs = () => setWhyUs(true);
  const closeWhyUs = () => setWhyUs(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (selectedProblem) {
      setTimeUp(false);
      setFailed(false);
      setTimerRunning(true); // ✅ Reset timer when new problem is selected
    }
  }, [selectedProblem]);

  const fetchGptSolution = async (problemName, language) => {
    try {
      console.log(
        " Asking GPT to generate the problem",
        language,
        "code for:",
        problemName
      );
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are a coding assistant. Write a clean, optimized function for the given problem. However, DO NOT include the problem name in the function or class name. Instead, use 'Solution' for the class and 'xyz' for the method name, with ZERO comments.",
            },
            {
              role: "user",
              content: `Write a solution in ${language} for the LeetCode problem: "${problemName}".
                      - Use 'Solution' as the class name (if applicable).
                      - Name the main function 'xyz'.
                      - Do not include any explanation.
                      - Keep the rest of the code normal (variable names, logic).`,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const gptCode = response.data.choices[0].message.content.trim();
      console.log("✅ GPT Generated Code in", language, ":", gptCode);
      setGptSolution(gptCode);
    } catch (error) {
      console.error("❌ Error fetching GPT solution:", error);
      setGptSolution("⚠️ GPT could not generate a solution.");
    }
  };

  const fetchHint = async () => {
    if (!selectedProblem) return;

    try {
      console.log("💡 Fetching hint for:", selectedProblem);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are a coding assistant. Provide a small hint for the given problem.",
            },
            {
              role: "user",
              content: `Give a concise hint for solving: "${selectedProblem}". 
                        Do NOT reveal the full approach, just a nudge to help solve it.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 50,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const hintResponse = response.data.choices[0].message.content.trim();
      console.log("✅ GPT Hint:", hintResponse);
      setHint(hintResponse);
    } catch (error) {
      console.error("❌ Error fetching hint:", error);
      setHint("⚠️ Could not generate a hint.");
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setFailed(true);
  };

  const resetGame = () => {
    setSelectedProblem(null);
    setGptSolution(null);
    setUserExplanation("");
    setHint(null);
    setTimeUp(false);
    setFailed(false);
    setTimerRunning(false); // ✅ Stop timer when resetting
  };

  const handleProblemSelect = (problemName, language) => {
    setSelectedProblem(problemName);
    setSelectedLanguage(language);
    setGptSolution(null);
    setUserExplanation("");
    setUserComplexity("not sure");
    setHint(null);
    setTimeUp(false);
    setFailed(false);
    setTimerRunning(true); // ✅ Start timer when a problem is selected
    fetchGptSolution(problemName, language);
  };

  const handleSubmitExplanation = (explanation, complexity) => {
    setUserExplanation(explanation);
    setUserComplexity(complexity);
    setTimerRunning(false); // ✅ Stop timer when explanation is submitted
  };

  return (
    <>
      {/* 🌟 Hero Section (Fixes Excessive Space) */}
      <section className="w-full text-center py-8 bg-blue-100 shadow-md">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
          Read Code Faster
          <span className="text-green-500 mx-2">→</span>
          Write Code Better.
        </h1>

        <div className="flex justify-center mt-6 space-x-4">
          {/* How It Works Button */}
          <button
            onClick={openModal}
            className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
          >
            How It Works
          </button>

          {/* Why Us / About Us Button */}
          <button
            onClick={openWhyUs}
            className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
          >
            Why Us?
          </button>
        </div>
      </section>

      {!selectedProblem && (
        <div className="mt-0 flex justify-center space-x-6 text-center bg-gray-100 p-6 rounded-lg shadow-md">
          {/* Students Improving */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-40">
            <h4 className="text-2xl font-bold text-blue-600">🎓 4+</h4>
            <p className="text-gray-700">Students Improving</p>
          </div>

          {/* Problems Solved */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-40">
            <h4 className="text-2xl font-bold text-green-600">💡 1000+</h4>
            <p className="text-gray-700">Problems Attempted</p>
          </div>

          {/* #1 Code Reading Platform */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-40">
            <h4 className="text-2xl font-bold text-yellow-600">🏆 #1</h4>
            <p className="text-gray-700">Code Reading Platform</p>
          </div>
          {isModalOpen && (
            <HowItWorksModal isOpen={isModalOpen} onClose={closeModal} />
          )}
          {isWhyUsOpen && (
            <WhyUsModal isOpen={isWhyUsOpen} onClose={closeWhyUs} />
          )}
        </div>
      )}

      <div className="flex flex-col items-center bg-gray-100 min-h-screen py-4">
        {/* 🛠️ Problem Selection */}
        {!selectedProblem && !failed && (
          <div className="w-full max-w-md bg-white p-5 rounded-lg shadow-lg">
            <ProblemSelector onProblemSelect={handleProblemSelect} />
          </div>
        )}

        {/* ❌ Failure Screen */}
        {failed && (
          <div className="w-full max-w-lg bg-red-50 p-8 rounded-2xl shadow-xl text-center border border-red-300">
            <h2 className="text-3xl font-extrabold text-red-700 flex items-center justify-center gap-2">
              ❌ <span>Time's Up! You Failed.</span>
            </h2>
            <button
              onClick={resetGame}
              className="mt-6 px-6 py-3 text-lg font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* 🖥️ Main Content Area */}
        {selectedProblem && !failed && (
          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              What does this {selectedLanguage} code accomplish?
            </h2>

            {/* ⏳ Timer */}
            {!timeUp && timerRunning && (
              <Timer timeLimit={120} onTimeUp={handleTimeUp} />
            )}

            {/* 📜 Code Display */}
            <div className="p-4 bg-gray-900 text-white rounded-lg font-mono text-sm overflow-auto shadow border border-gray-700">
              <CodeDisplay
                problem={{ title: selectedProblem, code: gptSolution }}
              />
            </div>

            {/* 💡 Hint Button */}
            <button
              onClick={fetchHint}
              className="mt-3 w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Get a Hint
            </button>

            {/* 📝 Display Hint */}
            {hint && (
              <p className="mt-2 text-gray-600 italic text-center bg-gray-200 p-2 rounded-lg">
                💡 {hint}
              </p>
            )}

            {/* ✍️ Explanation Input */}
            <div className="mt-4">
              <ExplanationInput onSubmit={handleSubmitExplanation} />
            </div>

            {/* 🎯 Feedback Section */}
            {userExplanation && (
              <div className="mt-4 text-center">
                <Feedback
                  userExplanation={userExplanation}
                  complexity={userComplexity}
                  problem={{ title: selectedProblem, code: gptSolution }}
                />

                <button
                  onClick={resetGame}
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
