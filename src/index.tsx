import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Dictaphone from "./Dictaphone";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    {/* <Dictaphone></Dictaphone> */}
  </React.StrictMode>
);
