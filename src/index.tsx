import React from "react";
import { createRoot } from "react-dom/client";
import Plotter from "./pages/plotter";
import "./index.css";
const root = createRoot(document.getElementById("root") as Element);

root.render(<Plotter />);
