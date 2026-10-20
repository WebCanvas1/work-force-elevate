import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import { getRouter } from "./router";
import { loadPublicContent } from "./lib/site-content";
import { AdminDashboard } from "./components/site/AdminDashboard";

const router = getRouter();
function AppRoot(){
  const [admin,setAdmin] = useState(() => window.location.hash.startsWith("#/admin"));
  useEffect(()=>{const sync=()=>setAdmin(window.location.hash.startsWith("#/admin"));window.addEventListener("hashchange",sync);return ()=>window.removeEventListener("hashchange",sync)},[]);
  return admin ? <AdminDashboard/> : <RouterProvider router={router}/>;
}

void loadPublicContent();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);