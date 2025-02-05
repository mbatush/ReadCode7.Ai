import React, { useState, useEffect } from "react";
import axios from "axios";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const Feedback = ({ userExplanation, problem, complexity }) => {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const getFeedback = async () => {
      if (!userExplanation || !problem.code) return;

      setLoading(true);
      try {
        console.log("📢 Sending user explanation for feedback...");

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content:
                  "You are an AI reviewer. Analyze the user's explanation and compare it to the provided code. Give a score from 1-10 based on how well they understood the code and provide concise feedback.",
              },
              {
                role: "user",
                content: `Here is the code:
                                \n\n${problem.code}
                                \n\nHere is the user's explanation:
                                \n\n"${userExplanation}"
                                \n\n the using beleives the time complexity is ${complexity}
                                \n\nEvaluate their understanding, provide a score (0-10) first as "Your score is X/10." followed by a newline and then a detailed paragraph response.`,
              },
            ],
            temperature: 0.5,
            max_tokens: 200,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );

        console.log("✅ AI Feedback Response:", response.data);
        const aiResponse = response.data.choices[0].message.content.trim();

        // Extract score from AI response
        const scoreMatch = aiResponse.match(/Your score is (\d+)\/10/);
        if (scoreMatch) {
          setScore(scoreMatch[1]); // Extract score value
          setFeedback(aiResponse.replace(scoreMatch[0], "").trim()); // Remove score from response
        } else {
          setFeedback(aiResponse);
        }
      } catch (error) {
        console.error("❌ Error fetching AI feedback:", error);
        setFeedback("⚠️ AI could not generate feedback.");
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [userExplanation, problem, complexity]);

  return (
    <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      {/* 🔹 Header */}
      <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
        🤖 AI Feedback & Score
      </h3>

      {/* 🏆 Score & Time Complexity Row */}
      <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg mb-3">
        <span className="text-2xl font-bold text-blue-600">
          📊 Score: {score ? `${score}/10` : "Analyzing..."}
        </span>
      </div>

      {/* 📄 Feedback Section */}
      {loading ? (
        <p className="text-gray-600 italic">Analyzing your explanation...</p>
      ) : (
        <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-300">
          <p className="text-gray-700">{feedback || "No feedback yet."}</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
