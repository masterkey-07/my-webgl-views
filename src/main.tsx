import "./index.css";
import App from "./app.tsx";
import { StrictMode } from "react";
import routers from "./routers.tsx";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This contains the layout with the vertical navbar
    children: routers,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
