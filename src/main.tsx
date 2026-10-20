import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import { getRouter } from "./router";
import { loadPublicContent } from "./lib/site-content";
import { AdminDashboard } from "./components/site/AdminDashboard";

const router = getRouter();

void loadPublicContent();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {window.location.hash.startsWith("#/admin") ? <AdminDashboard /> : <RouterProvider router={router} />}
  </StrictMode>,
);