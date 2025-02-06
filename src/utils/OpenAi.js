import axios from "axios";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAI_API_KEY}`,
};

/**
 * Fetches a GPT-generated solution for the given problem and language.
 * @param {string} problemName - The name of the problem.
 * @param {string} language - The programming language (e.g., "Java", "Python", "SQL").
 * @returns {Promise<string>} - The generated solution or an error message.
 */
export const fetchGptSolution = async (problemName, language) => {
  try {
    console.log(
      `🤖 Fetching GPT solution for: ${problemName} in ${language}...`
    );

    let systemPrompt, userPrompt;

    if (language === "SQL") {
      // SQL-specific prompt
      systemPrompt =
        "You are an expert SQL data analyst. Given a database problem, generate an optimized SQL query that solves it.";
      userPrompt = `Write an SQL query to solve the following database problem: "${problemName}". If you do not recognize the problem, fill in missing context with any reasonable assumptions to make a solution.
        - Ensure the query is efficient.
        - Do not include comments or explanations.
        - Assume necessary tables exist with logical column names.`;
    } else {
      // General programming prompt
      systemPrompt =
        "You are a coding assistant. Write a clean, optimized function for the given problem. Use 'Solution' as the class name and 'xyz' as the function name. Do not include explanations or comments.";
      userPrompt = `Write a solution in ${language} for the problem: "${problemName}".
        - Use 'Solution' as the class name (if applicable).
        - Name the main function 'xyz'.
        - Do not include any explanation.
        - Keep variable names and logic normal.`;
    }

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 300,
      },
      { headers }
    );

    const gptCode = response.data.choices[0].message.content.trim();
    console.log("✅ GPT Generated Code:", gptCode);
    return gptCode;
  } catch (error) {
    console.error("❌ Error fetching GPT solution:", error);
    return "⚠️ GPT could not generate a solution.";
  }
};

/**
 * Fetches a hint for the given problem.
 * @param {string} problemName - The name of the problem.
 * @param {string} language - The programming language (e.g., "Java", "Python", "SQL").
 * @returns {Promise<string>} - The generated hint or an error message.
 */
export const fetchHint = async (problemName, language) => {
  if (!problemName) return "⚠️ No problem selected.";

  try {
    console.log(`💡 Fetching GPT hint for: ${problemName} in ${language}...`);

    let systemPrompt, userPrompt;

    if (language === "SQL") {
      // SQL-specific hint logic
      systemPrompt =
        "You are an SQL expert. Provide a helpful hint to guide the user toward understanding the code of an SQL query problem.";
      userPrompt = `Give a concise hint for understnading code for the SQL problem: "${problemName}".  
        - If the problem is well-known, give a targeted hint.  
        - If the problem is vague, provide a short general SQL hint that applies broadly to the "${problemName}" regarldess of context
        - Do NOT reveal the full approach, just a nudge to help solve it.`;
    } else {
      // General programming hint logic
      systemPrompt =
        "You are a coding assistant. Provide a small hint for the given problem.";
      userPrompt = `Give a concise hint for solving: "${problemName}".  
        - Do NOT reveal the full approach, just a nudge to help solve it.`;
    }

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 50,
      },
      { headers }
    );

    const hintResponse = response.data.choices[0].message.content.trim();
    console.log("✅ GPT Hint:", hintResponse);
    return hintResponse;
  } catch (error) {
    console.error("❌ Error fetching hint:", error);
    return "⚠️ Could not generate a hint.";
  }
};
