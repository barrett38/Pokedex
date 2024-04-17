import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
