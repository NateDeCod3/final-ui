import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Ensure correct import path
import "./styles/theme.css"; // ✅ Ensure this file exists and is correctly styled

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
