import React from "react";
import { createRoot } from "react-dom/client";
import Plotter from "./pages/plotter";
import "./index.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import { Login } from "./pages/login";
import { getCurrentUser } from "aws-amplify/auth";

const root = createRoot(document.getElementById("root") as Element);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Plotter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      try {
        const user = await getCurrentUser();

        if (user) {
          return redirect("/");
        }

        return null;
      } catch (e) {
        return null;
      }
    },
  },
]);

root.render(<RouterProvider router={router} />);
