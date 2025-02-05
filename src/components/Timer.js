import React, { useState, useEffect } from "react";

const Timer = ({ timeLimit, onTimeUp, timeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (timeLeft <= 0 || timeUp) {
      onTimeUp(); // ✅ Stop timer if time runs out
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, timeUp, onTimeUp]); // ✅ Dependencies added

  // 🟢 Change progress bar color based on remaining time
  const progress = (timeLeft / timeLimit) * 100;
  const getProgressColor = () => {
    if (progress > 66) return "bg-green-500";
    if (progress > 33) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (
    <div className="w-full mb-4">
      {/* ⏳ Timer Text */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Time Left: {timeLeft} seconds
      </h3>

      {/* 🔵 Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
