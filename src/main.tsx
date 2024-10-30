import "./index.css";
import App from "./app.tsx";
import { StrictMode } from "react";
import routers from "./routers.tsx";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
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
