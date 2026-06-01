import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Calendar from "./components/Calendar";
import MaintenancePage from "./components/MaintenancePage"; 

const TRACKING_URL = "https://script.google.com/macros/s/AKfycbwxsMZlNqtsHd0_U5twtPuM062RDKeBjr3CJhDBa05TGhoyz48kF4TqezAr-KZd6P4/exec";

function App() {
  // Set to false initially since there's no preloader screen to wait on
  const [loading, setLoading] = useState(false);

  // --- TOGGLE THIS TO SWITCH BETWEEN MODES ---
  const isUnderDevelopment = false; 
  // -------------------------------------------

  useEffect(() => {
    const trackVisitor = async () => {
      if (window.location.hostname === "localhost") return;

      // Initialize with a fallback value
      let locationString = "Unknown / Limit Reached";

      try {
        // Attempt to fetch location
        const geoRes = await fetch("https://ipapi.co/json/");
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          locationString = `${geoData.city}, ${geoData.country_name}`;
        }
      } catch (e) {
        // If IPAPI fails or hits 1000 limit, we just log it and move on
        console.error("Location service limit reached or blocked");
      }

      try {
        // This will now run even if the location fetch failed above
        await fetch(TRACKING_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            location: locationString
          }),
        });
      } catch (e) {
        console.error("Google Sheets sync failed:", e);
      }
    };

    trackVisitor();
  }, []); 

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isUnderDevelopment ? (
          <MaintenancePage key="maintenance" />
        ) : (
          <Calendar key="calendar" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;