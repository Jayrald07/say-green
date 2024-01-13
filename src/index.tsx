import React from "react";
import { createRoot } from "react-dom/client";
import Plotter from "./pages/plotter";
import "./index.css";
let root = createRoot(document.getElementById("root") as Element);

root.render(<Plotter />);
