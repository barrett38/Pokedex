import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import AuthContextProvider from "./authContext";

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    {/* <AuthContextProvider> */}
    <Router>
      <App />
    </Router>
    {/* </AuthContextProvider> */}
  </React.StrictMode>
);

reportWebVitals();
