import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoot from "./AppRoot";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);
