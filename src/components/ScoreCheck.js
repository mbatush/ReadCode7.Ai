import React, { useState } from "react";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const API_BASE_URL = "http://3.91.157.56:80"; // Use your public IP

  const handleCreateUser = async () => {
    console.log("Running on:", process.env);

    try {
      const response = await fetch(`${API_BASE_URL}/api/create-user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "testuser@example.com",
        }),
      });

      const data = await response.json();
      console.log("User Created:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateUser} disabled={loading}>
        {loading ? "Creating User..." : "Create User"}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CreateUser;
