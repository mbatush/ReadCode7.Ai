import React, { useState } from "react";

const CodeInput = ({ onSubmit }) => {
  const [code, setCode] = useState("");

  return (
    <div>
      <h3>Enter Your Solution</h3>
      <textarea
        rows="8"
        cols="50"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br />
      <button onClick={() => onSubmit(code)}>Submit</button>
    </div>
  );
};

export default CodeInput;
