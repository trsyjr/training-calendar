import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope } from "react-icons/fa6";
import { BsCalendar3, BsGeoAltFill } from "react-icons/bs";

// Sample dataset of postponed trainings - customize or dynamicize this array as needed
const postponedTrainings = [
  {
    id: 1,
    title: "Ladderized 2: Training on Problem Solving and Decision Making",
    originalDate: "27 - 31 July 2026",
    venue: "Virtual via Google Meet"
  },
  {
    id: 2,
    title: "Ladderized 3: Training on Results - Based Monitoring and Evaluation for Local Social Welfare and Development Officers",
    originalDate: "28 September - 2 October 2026",
    venue: "Virtual via Google Meet"
  },
  {
    id: 3,
    title: "Disaster Response and Crisis Management: Child Friendly Spaces",
    originalDate: "28 September - 9 October 2026",
    venue: "Virtual via Google Meet"
  },
  {
    id: 4,
    title: "Certificate Course on Gender Responsive Case Management",
    originalDate: "12 - 23 October 2026",
    venue: "Virtual via Google Meet"
  },
  {
    id: 5,
    title: "Disaster Response and Crisis Management: Women Friendly Spaces",
    originalDate: "3 - 13 November 2026",
    venue: "Virtual via Google Meet"
  },
];

const Information = ({ onClose, forceShow }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Triggers visibility only after the parent component sets forceShow to true (after loading/calendar mounts)
    if (forceShow) {
      // 300ms cushion timeout gives the background interface time to render gracefully first
      const timer = setTimeout(() => setIsOpen(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [forceShow]);

  const handleProceed = () => {
    setIsOpen(false);
    if (onClose) onClose(); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          
          {/* Custom scoped scrollbar formatting matching the exact theme identity color */}
          <style>{`
            .postponed-list-scroll {
              scrollbar-width: thin;
              scrollbar-color: #073763 #f1f5f9;
            }
            .postponed-list-scroll::-webkit-scrollbar {
              width: 5px;
            }
            .postponed-list-scroll::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 10px;
            }
            .postponed-list-scroll::-webkit-scrollbar-thumb {
              background: #073763;
              border-radius: 10px;
            }
          `}</style>

          {/* Backdrop Blur Overlay - Click target removed to enforce mandatory action button confirmation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden font-sans z-10"
          >
            {/* Top Branding Solid Monochromatic Blue Accent Bar */}
            <div className="h-2 bg-[#073763]" />

            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
              {/* Geometric SVG Info Icon with Infinite Swaying Loop Motion */}
              <div className="w-20 h-20 flex items-center justify-center text-[#073763] mb-4 overflow-visible">
                <motion.div
                  animate={{ rotate: [-6, 6, -6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut"
                  }}
                  className="flex items-center justify-center origin-center"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="w-20 h-20"
                    stroke="currentColor" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="11" x2="12" y2="17" strokeWidth="1.5" />
                    <circle cx="12" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
                  </svg>
                </motion.div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#073763] tracking-tight mb-3">
                Announcement!
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                Please be informed that the following trainings have been <span className="font-bold text-gray-800">POSTPONED</span> until further notice.
              </p>

              {/* Scrollable list frame wrapper with theme color matches */}
              <div className="w-full text-left mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1 mb-2">
                  Postponed Schedules:
                </p>
                <div className="postponed-list-scroll max-h-[240px] overflow-y-auto pr-1.5 space-y-3">
                  {postponedTrainings.map((training) => (
                    <motion.div 
                      key={training.id}
                      whileHover={{ scale: 1.01, x: 2, filter: "brightness(0.98)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="w-full bg-slate-50 border-l-[5px] border-[#073763] rounded-xl p-3.5 border border-slate-100 flex flex-col gap-1.5 cursor-default"
                    >
                      <h3 className="text-xs sm:text-sm text-gray-800 font-bold leading-tight">
                        {training.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] font-bold text-[#073763]/60 uppercase tracking-wide">
                        <span className="flex items-center gap-1.5"><BsCalendar3/> {training.originalDate}</span>
                        <span className="flex items-center gap-1.5"><BsGeoAltFill/> {training.venue}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Inquiry Action Box */}
              <div className="w-full bg-blue-50/50 border border-blue-100/70 rounded-2xl p-4 mb-5 text-left flex items-start gap-3">
                <FaEnvelope className="text-[#073763] mt-0.5 text-base shrink-0" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-[#073763]">Have any concerns?</span> please message us directly via email at{" "}
                  <a 
                    href="mailto:academy@dswd.gov.ph" 
                    className="font-semibold text-[#073763] underline hover:text-[#073763]/80 transition-colors"
                  >
                    academy@dswd.gov.ph
                  </a>.
                </p>
              </div>

              {/* Primary Confirmation Action Button - This is now the ONLY way to dismiss the notification */}
              <button
                onClick={handleProceed}
                className="w-full bg-[#073763] hover:bg-[#073763]/90 text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-md transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                I Understand
              </button>

              <p className="text-[10px] text-gray-400 mt-4 text-center max-w-xs leading-normal">
                New adjustment dates will be reflected transparently onto your timeline matrix interface once finalized.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Information;