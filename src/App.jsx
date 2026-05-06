import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Calendar from "./components/Calendar";
import Preloader from "./components/Preloader";
import MaintenancePage from "./components/MaintenancePage"; // Assuming you saved the previous code here

function App() {
  const [loading, setLoading] = useState(true);

  // --- TOGGLE THIS TO SWITCH BETWEEN MODES ---
  const isUnderDevelopment = true; 
  // -------------------------------------------

  useEffect(() => {
    const handleLoad = () => {
      // Small delay to ensure the preloader feels smooth
      setTimeout(() => setLoading(false), 2000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" />
        ) : (
          /* Once loading is finished, check if we show Maintenance or the App */
          isUnderDevelopment ? (
            <MaintenancePage key="maintenance" />
          ) : (
            <Calendar key="calendar" />
          )
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;