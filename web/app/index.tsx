import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./pages/main";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./shared/components/error-page";
import { Login } from "./pages/login";
import { getCurrentUser } from "aws-amplify/auth";
import Index from "@app/pages";

const root = createRoot(document.getElementById("root") as Element);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/main",
    element: <Main />,
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
