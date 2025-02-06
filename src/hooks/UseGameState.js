// hooks/useGameState.js
import { useState, useEffect } from "react";

const UseGameState = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const [gptSolution, setGptSolution] = useState(null);
  const [userExplanation, setUserExplanation] = useState("");
  const [userComplexity, setUserComplexity] = useState("Not sure");
  const [hint, setHint] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [failed, setFailed] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (selectedProblem) {
      setTimeUp(false);
      setFailed(false);
      setTimerRunning(true);
    }
  }, [selectedProblem]);

  return {
    selectedProblem,
    selectedLanguage,
    gptSolution,
    userExplanation,
    userComplexity,
    hint,
    timeUp,
    failed,
    timerRunning,
    setSelectedProblem,
    setSelectedLanguage,
    setGptSolution,
    setUserExplanation,
    setUserComplexity,
    setHint,
    setTimeUp,
    setFailed,
    setTimerRunning,
  };
};

export default UseGameState;
