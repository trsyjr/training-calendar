import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Calendar from "./components/Calendar";
import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

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