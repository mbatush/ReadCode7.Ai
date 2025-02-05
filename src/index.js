import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Create a root using createRoot
root.render(<App />); // Render the app using the root instance
