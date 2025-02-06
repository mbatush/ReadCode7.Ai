import "./index.css";
import "./styles/tailwind-pre-build.css";
import React, { useState, useEffect } from "react";

import ProblemSelector from "./components/ProblemSelector";
import CodeDisplay from "./components/CodeDisplay";
import ExplanationInput from "./components/ExplanationInput";
import Feedback from "./components/Feedback";
import Timer from "./components/Timer";
import { gapi } from "gapi-script";
import ModalManager from "./components/ModalManager";
import { fetchGptSolution, fetchHint } from "./utils/OpenAi";

const clientId =
  "539258541805-jej97k38n6vrcepvvgpo5fqj1ii1v7pp.apps.googleusercontent.com";

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
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const updateUser = (userInfo) => {
    setLoggedIn(true);
    setUser(userInfo);
  };

  useEffect(() => {
    function start() {
      console.log("this was called");

      gapi.client.init({
        clientId: clientId,
        scope: "profile email", // Add the appropriate scope
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    if (selectedProblem) {
      setTimeUp(false);
      setFailed(false);
      setTimerRunning(true); // ✅ Reset timer when new problem is selected
    }
  }, [selectedProblem]);

  const handleProblemSelect = async (problemName, language) => {
    setSelectedProblem(problemName);
    setSelectedLanguage(language);
    setGptSolution(null);
    setUserExplanation("");
    setUserComplexity("Not sure");
    setHint(null);
    setTimeUp(false);
    setFailed(false);
    setTimerRunning(true);

    const solution = await fetchGptSolution(problemName, language);
    setGptSolution(solution);
  };

  const handleFetchHint = async () => {
    if (!selectedProblem) return;
    const hintResponse = await fetchHint(selectedProblem);
    setHint(hintResponse);
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

  const handleSubmitExplanation = (explanation, complexity) => {
    setUserExplanation(explanation);
    setUserComplexity(complexity);
    setTimerRunning(false); // ✅ Stop timer when explanation is submitted
  };

  return (
    <>
      <div>
        <ModalManager
          user={user}
          isLoggedIn={isLoggedIn}
          updateUser={updateUser}
        />
      </div>
      {/* 🌟 Hero Section (Fixes Excessive Space) */}
      <section className="w-full text-center py-8 bg-blue-100 shadow-md">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
          Read Code Faster
          <span className="text-green-500 mx-2">→</span>
          Write Code Better.
        </h1>
      </section>

      {!selectedProblem && (
        <div className="mt-0 flex justify-center space-x-6 text-center bg-gray-100 p-6 rounded-lg shadow-md">
          {/* Students Improving */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-40">
            <h4 className="text-2xl font-bold text-blue-600">🎓 10+</h4>
            <p className="text-gray-700">Students Improving</p>
          </div>

          {/* Problems Solved */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-40">
            <h4 className="text-2xl font-bold text-green-600">💡 1300+</h4>
            <p className="text-gray-700">Problems Attempted</p>
          </div>

          {/* #1 Code Reading Platform */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-40">
            <h4 className="text-2xl font-bold text-yellow-600">🏆 #1</h4>
            <p className="text-gray-700">Code Reading Platform</p>
          </div>
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
              <span> ❌ Time's Up - You Failed ❌ </span>
            </h2>
            <button
              onClick={resetGame}
              className="mt-6 px-6 py-3 text-lg font-semibold bg-green-500 text-white rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
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
              <Timer timeLimit={90} onTimeUp={handleTimeUp} />
            )}

            {/* 📜 Code Display */}
            <div className="p-4 bg-gray-900 text-white rounded-lg font-mono text-sm overflow-auto shadow border border-gray-700">
              <CodeDisplay
                problem={{ title: selectedProblem, code: gptSolution }}
              />
            </div>

            {/* 💡 Hint Button */}

            {/* 💡 Hint & Return Buttons */}
            <div className="mt-3 flex w-full justify-center gap-2">
              <button
                onClick={handleFetchHint}
                className="w-1/5 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition mr-2"
              >
                Get Hint
              </button>

              <button
                onClick={resetGame}
                className="w-1/5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Return
              </button>
            </div>

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
