import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Calendar from "./components/Calendar";
import Preloader from "./components/Preloader";

const TRACKING_URL = "https://script.google.com/macros/s/AKfycbwxsMZlNqtsHd0_U5twtPuM062RDKeBjr3CJhDBa05TGhoyz48kF4TqezAr-KZd6P4/exec";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisitor = async () => {
      if (window.location.hostname === "localhost") return;

      try {
        const geoRes = await fetch("https://ipapi.co/json/");
        const geoData = await geoRes.json();
        const locationString = `${geoData.city}, ${geoData.country_name}`;

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
        console.error("Analytics error:", e);
      }
    };

    trackVisitor();
  }, []); 

  useEffect(() => {
    const handleLoad = () => {
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
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>
      <Calendar />
    </div>
  );
}

export default App;