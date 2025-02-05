import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeDisplay = ({ problem }) => {
  if (!problem || !problem.code) return <p>Code is loading...</p>;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md border border-gray-700">
      <SyntaxHighlighter
        language="java"
        style={tomorrow}
        customStyle={{
          padding: "15px",
          borderRadius: "8px",
          fontSize: "14px",
          lineHeight: "1.5",
          overflowX: "auto",
        }}
      >
        {problem.code.replace(/```(java)?/g, "").trim()}{" "}
        {/* Remove Markdown backticks */}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
