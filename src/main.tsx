import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import { getRouter } from "./router";
import { loadPublicContent } from "./lib/site-content";
import { AdminDashboard } from "./components/site/AdminDashboard";

const router = getRouter();

// Track each public route once, including hash-based SPA navigation.
// Do not include password-protected CMS visits in the client's website analytics.
function trackPageView(){
  const route = window.location.hash.replace(/^#/, "").split("?")[0] || "/";
  if(route.startsWith("/admin"))return;
  const path = route.startsWith("/") ? route : "/";
  const gtag = (window as Window & {gtag?: (...args: unknown[]) => void}).gtag;
  gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: window.location.origin + path,
    page_path: path,
  });
}

function AppRoot(){
  const [admin,setAdmin] = useState(() => window.location.hash.startsWith("#/admin"));
  useEffect(()=>{
    const sync=()=>setAdmin(window.location.hash.startsWith("#/admin"));
    window.addEventListener("hashchange",sync);
    return ()=>window.removeEventListener("hashchange",sync);
  },[]);
  useEffect(()=>{
    trackPageView();
    window.addEventListener("hashchange",trackPageView);
    return ()=>window.removeEventListener("hashchange",trackPageView);
  },[]);
  return admin ? <AdminDashboard/> : <RouterProvider router={router}/>;
}

void loadPublicContent();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);