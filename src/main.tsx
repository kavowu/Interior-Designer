import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import Home from "../Home";
import "../index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Home />
    <Toaster richColors position="top-center" />
  </React.StrictMode>
);