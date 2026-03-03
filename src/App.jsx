import React from 'react';
import Calendar from './components/Calendar';
import TABG from './assets/TABG.png';

function App() {
  return (
    <div className="relative min-h-screen w-full">
      <div 
        className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <main className="relative z-10">
        <Calendar />
      </main>
    </div>
  );
}

export default App;