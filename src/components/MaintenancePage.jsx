import React from 'react';
import { motion } from 'framer-motion';

// Assets - ensure these paths are correct for your project
import DakilaLogo from '../assets/ConstDakila.png'; 
import LayaLogo from '../assets/ConstLaya.png';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#073763] px-4 overflow-hidden">
      
      {/* The "Sandwich" Container - Increased to full width */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-[100vw]">
        
        {/* Left Logo: Dakila */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <img 
            src={DakilaLogo} 
            alt="Dakila Logo" 
            className="h-24 md:h-[30rem] w-auto object-contain" 
          />
        </motion.div>

        {/* Center Message - MAX WIDTH INCREASED */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center px-2 flex-grow flex flex-col items-center justify-center max-w-6xl"
        >
          {/* Animated Graphic/Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="mb-8 flex justify-center"
          >
            <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center">
              <span className="text-white text-5xl font-bold">!</span>
            </div>
          </motion.div>

          {/* Main Text - Expanded width */}
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight w-full">
            The DSWD Academy Training Calendar is currently being updated 
          </h1>
          
          {/* Descriptive Text - Expanded width */}
          <p className="text-white/80 text-xl md:text-2xl max-w-5xl mx-auto leading-relaxed">
            In compliance with the National Energy Conservation Protocols, all trainings are being converted to online modality. 
            It will be made accessible once the final schedules have been finalized. <br />
            <span className="text-white/50 text-base md:text-lg italic mt-4 block">
              Sorry for the inconvenience!
            </span>
          </p>

          {/* Progress Bar */}
          <div className="mt-10 w-48 h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-1/2 h-full bg-white"
            />
          </div>

          {/* Footer "Coming Soon" */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-white/30 text-xs md:text-sm uppercase tracking-[0.5em]"
          >
            Coming Soon
          </motion.p>
        </motion.div>

        {/* Right Logo: Laya */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <img 
            src={LayaLogo} 
            alt="Laya Logo" 
            className="h-24 md:h-[30rem] w-auto object-contain" 
          />
        </motion.div>

      </div>
    </div>
  );
};

export default MaintenancePage;