import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Calendar from "./components/Calendar";
import MaintenancePage from "./components/MaintenancePage"; 
import Information from "./components/Information"; 
import Preloader from "./components/Preloader"; // Imported your custom Preloader

const TRACKING_URL = "https://script.google.com/macros/s/AKfycbxsMZlNqtsHd0_U5twtPuM062RDKeBjr3CJhDBa05TGhoyz48kF4TqezAr-KZd6P4/exec";

function App() {
  const [trackingDone, setTrackingDone] = useState(false);
  const [preloaderActive, setPreloaderActive] = useState(true);

  // --- TOGGLE THIS TO SWITCH BETWEEN MODES ---
  const isUnderDevelopment = false; 
  // -------------------------------------------

  // Handle analytical background visitor tracking
  useEffect(() => {
    const trackVisitor = async () => {
      if (window.location.hostname === "localhost") {
        setTrackingDone(true);
        return;
      }

      let locationString = "Unknown / Limit Reached";
      try {
        const geoRes = await fetch("https://ipapi.co/json/");
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          locationString = `${geoData.city}, ${geoData.country_name}`;
        }
      } catch (e) {
        console.error("Location service limit reached or blocked");
      }

      try {
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
      } finally {
        setTrackingDone(true);
      }
    };

    trackVisitor();
  }, []);

  // Sync Preloader timeout (2000ms duration matching your preloader logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderActive(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Dashboard is fully loaded only when background tracking completes AND the preloader time window closes
  const isAppLoaded = !preloaderActive && trackingDone;

  return (
    <div className="relative min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        {!isAppLoaded ? (
          /* 1ST STAGE: Display your spinning asset preloader screen */
          <Preloader key="app-preloader" />
        ) : (
          /* 2ND STAGE: Mount dashboard layers and then animate Information popup */
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {/* forceShow is passed as true right when this stage mounts */}
            <Information forceShow={true} />

            {isUnderDevelopment ? (
              <MaintenancePage key="maintenance" />
            ) : (
              <Calendar key="calendar" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;