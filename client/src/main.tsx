import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App.js";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-center" />
  </StrictMode>
);
