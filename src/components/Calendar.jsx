import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPeopleFill, BsSearch, BsCalendar3, BsListUl, BsGeoAltFill, BsChevronLeft, BsChevronRight, BsChevronDown} from "react-icons/bs";
import { IoClose } from "react-icons/io5"; 
import DABuilding from "../assets/DABuilding.jpeg";
import PMC from "../assets/PMC.JPG";
import PES from "../assets/PES.png";
import Disaster from "../assets/Disaster.jpg";
import ToT from "../assets/ToT.png";
import Pilot from "../assets/Pilot.JPG";
import Rollout from "../assets/Rollout.png";
import Fourps from "../assets/4ps.png";
import Houseparenting from "../assets/Houseparenting.png";
import Lad from "../assets/Lad.JPG";
import Random from "../assets/Random.png";
import Upskill from "../assets/Upskill.png";
import DSWDLogo from "../assets/DSWDLogo.png";
import TALogo from "../assets/TALogo.png";
import BPLogo from "../assets/BPLogo.png";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const trainingCategories = {
  1: "Disaster Response Trainings",
  2: "DSWD Academy Functionality Trainings",
  3: "SDCA Functionality",
  4: "Sectoral Development Programs Trainings",
  5: "Social Welfare and Development Agencies Trainings",
  6: "Training on Community-based Programs",
  7: "Training on Family"
};

const trainingSchedule = [
  {
    id: 1,
    startDate: new Date(2026, 0, 12),
    endDate: new Date(2026, 0, 16),
    title: "Training on Pre-Marriage Counseling",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "National Capital Region",
    target: "",
    image: PMC,
    colorId: 7,
    tag: ""
  },

];

const THEME_COLOR = "#073763";

const fullMonths = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
  }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

const ExpandableDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!text) return null;
  const words = text.split(" ");
  const isOverLimit = words.length > 20;
  if (!isOverLimit) return <p className="text-gray-600 text-sm leading-relaxed">{text}</p>;
  const displayText = isExpanded ? text : words.slice(0, 20).join(" ") + "...";
  return (
    <div className="text-gray-600 text-sm leading-relaxed">
      <p>{displayText}
        <button onClick={() => setIsExpanded(!isExpanded)} className="ml-2 text-[#073763] font-black hover:underline focus:outline-none">
          {isExpanded ? "See Less" : "See More"}
        </button>
      </p>
    </div>
  );
};

const Calendar = () => {
  const today = new Date();
  const fixedYear = 2026;
  const [selectedMonth, setSelectedMonth] = useState(2); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState("calendar"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState("All");
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") setSelectedEvent(null); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, searchQuery, filterCategoryId]);

  const filteredEvents = useMemo(() => {
    return trainingSchedule.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategoryId === "All" || event.colorId === parseInt(filterCategoryId);
      
      const startM = event.startDate.getMonth();
      const startY = event.startDate.getFullYear();
      const endM = event.endDate.getMonth();
      const endY = event.endDate.getFullYear();

      const matchesMonth = (startY === fixedYear && startM === selectedMonth) || 
                           (endY === fixedYear && endM === selectedMonth);
      
      return matchesSearch && matchesCategory && matchesMonth;
    });
  }, [searchQuery, filterCategoryId, selectedMonth]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage]);

  const formatDateRange = (start, end) => {
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleString("en-US", { month: "short" })} ${start.getFullYear()}`;
  };

  const { firstDay, daysArray, numRows } = useMemo(() => {
    const fd = new Date(fixedYear, selectedMonth, 1).getDay();
    const dCount = new Date(fixedYear, selectedMonth + 1, 0).getDate();
    const dArray = Array.from({ length: dCount }, (_, i) => new Date(fixedYear, selectedMonth, i + 1));
    const totalSlots = fd + dCount;
    const rows = Math.ceil(totalSlots / 7);
    return { firstDay: fd, daysArray: dArray, numRows: rows };
  }, [selectedMonth]);

  const renderCalendarRows = () => {
    const rows = [];
    const hasEventsThisMonth = filteredEvents.length > 0;

    for (let r = 0; r < numRows; r++) {
      const weekStartOffset = r * 7;
      const weekStartDate = new Date(fixedYear, selectedMonth, weekStartOffset - firstDay + 1);
      const weekEndDate = new Date(fixedYear, selectedMonth, weekStartOffset - firstDay + 7);
      
      const eventsInWeek = filteredEvents.filter(e => {
        const eStart = new Date(e.startDate).setHours(0,0,0,0);
        const eEnd = new Date(e.endDate).setHours(23,59,59,999);
        return eStart <= weekEndDate && eEnd >= weekStartDate;
      });
      
      rows.push(
        <div key={`row-${r}`} className="relative border-b border-gray-400/50 min-h-[90px] md:min-h-[180px] flex flex-col overflow-visible">
          <div className="absolute inset-0 grid grid-cols-7 z-10 pointer-events-none">
            {Array.from({ length: 7 }).map((_, i) => {
              const dayIdx = weekStartOffset + i - firstDay;
              const date = new Date(fixedYear, selectedMonth, dayIdx + 1);
              const isCurrentMonth = date.getMonth() === selectedMonth;
              const isToday = date.toDateString() === today.toDateString();
              return (
                <div key={`date-${i}`} className="p-1 md:p-3 border-r border-gray-400/50 last:border-r-0">
                  <div className={`text-[10px] md:text-lg font-medium ${isToday ? "bg-[#990000] text-white rounded-full w-5 h-5 md:w-10 md:h-10 flex items-center justify-center shadow-lg font-black" : isCurrentMonth ? "text-black" : "text-black/30"}`}>
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="relative z-20 flex flex-col pt-6 md:pt-14 pb-1 md:pb-4 px-0.5 md:px-2 space-y-1 pointer-events-none">
            {eventsInWeek.map((event) => {
              const eventStart = event.startDate < weekStartDate ? weekStartDate : event.startDate;
              const eventEnd = event.endDate > weekEndDate ? weekEndDate : event.endDate;
              const startCol = (eventStart.getDay() % 7) + 1;
              const duration = Math.round((eventEnd - eventStart) / (1000 * 60 * 60 * 24)) + 1;
              return (
                <div key={`${event.id}-${r}`} className="grid grid-cols-7 w-full gap-0 px-px">
                  <motion.div 
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    style={{ 
                      gridColumn: `${startCol} / span ${duration}`, 
                      backgroundColor: THEME_COLOR,
                      transformOrigin: "left" 
                    }} 
                    whileHover={{ scale: 1.01, filter: "brightness(1.2)" }} 
                    className="text-white text-[7px] md:text-[14px] h-4 md:h-8 flex items-center px-1 md:px-3 cursor-pointer truncate rounded md:rounded-lg border border-white/20 shadow-sm md:shadow-md font-medium pointer-events-auto" 
                    onClick={() => setSelectedEvent(event)}
                  >
                    <span className="truncate">{(event.startDate >= weekStartDate || eventStart.getDay() === 0) && event.title}</span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return <div className="relative">{rows}{!hasEventsThisMonth && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"><span className="text-[#073763]/10 font-black text-lg md:text-5xl uppercase tracking-[0.2em] text-center px-4">To Be Announced</span></div>}</div>;
  };

  return (
    <div className="pt-4 md:pt-16 font-sans relative min-h-screen text-[#073763] overflow-x-hidden">
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: ${THEME_COLOR}; border-radius: 20px; }
        .glass-card { background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }
        .calendar-main-body { background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(25px); border: 1px solid rgba(156, 163, 175, 0.5); }
      `}</style>

      <div className="fixed inset-0 z-0" style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.8)), url(${DABuilding})`, backgroundSize: "cover", backgroundPosition: "center" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <header className="mb-6 md:mb-12 pt-4 md:pt-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl md:text-5xl font-black tracking-tighter text-[#073763]">DSWD ACADEMY 2026</h1>
            <p className="text-[#ee1c25] font-bold tracking-[0.3em] md:tracking-[1.56em] text-[10px] md:text-sm uppercase">Training Calendar</p>
          </div>
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 md:gap-6 p-3 md:p-4">
            <img src={DSWDLogo} alt="DSWD Logo" className="h-10 md:h-21 w-auto object-contain" />
            <img src={TALogo} alt="TA Logo" className="h-[39px] md:h-[77px] w-auto object-contain" />
            <img src={BPLogo} alt="BP Logo" className="h-15 md:h-31 w-auto object-contain -mt-3 md:-mt-4" />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 pb-20">
          <aside className="w-full lg:w-72 shrink-0 space-y-4 md:space-y-6">
            <div className="bg-[#073763] p-1 rounded-2xl flex shadow-lg">
              <button onClick={() => setView("calendar")} className={`flex-1 py-2.5 md:py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-black transition-all ${view === "calendar" ? "bg-white text-[#073763]" : "text-white hover:bg-white/10"}`}><BsCalendar3/> Calendar</button>
              <button onClick={() => setView("list")} className={`flex-1 py-2.5 md:py-3 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-black transition-all ${view === "list" ? "bg-white text-[#073763]" : "text-white hover:bg-white/10"}`}><BsListUl/> List</button>
            </div>
            
            <div className="relative">
              <div className="lg:hidden flex flex-col gap-4">
                <button onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)} className="w-full bg-[#073763] rounded-2xl p-4 flex justify-between items-center font-black text-white uppercase tracking-widest text-sm shadow-xl">
                  <span>{fullMonths[selectedMonth]}</span>
                  <BsChevronDown className={`transition-transform duration-300 ${isMonthDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isMonthDropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-16 left-0 right-0 z-50 bg-[#073763] rounded-2xl p-2 max-h-64 overflow-y-auto shadow-2xl border border-white/10">
                      {fullMonths.map((name, index) => (
                        <button key={name} onClick={() => { setSelectedMonth(index); setIsMonthDropdownOpen(false); }} className={`w-full py-3 px-4 rounded-xl text-xs font-black text-left mb-1 transition-all ${selectedMonth === index ? "bg-white text-[#073763]" : "text-white hover:bg-white/10"}`}>
                          {name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <a href="https://sites.google.com/dswd.gov.ph/dswdacademyfaqs2026/faqs" target="_blank" rel="noopener noreferrer" className="bg-[#073763] text-white p-4 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest shadow-lg">
                   Frequently Asked Questions
                </a>
              </div>

              <div className="hidden lg:block space-y-4">
                <div className="glass-card rounded-3xl p-5">
                  <p className="text-[#073763] font-black uppercase tracking-widest text-[10px] mb-3 ml-2">Monthly Index</p>
                  <div className="space-y-1">
                    {fullMonths.map((name, index) => (
                      <button key={name} onClick={() => setSelectedMonth(index)} className={`w-full py-2.5 px-5 rounded-xl text-[11px] font-black text-left transition-all ${selectedMonth === index ? "bg-[#073763] text-white shadow-lg scale-105" : "text-[#073763]/70 hover:bg-[#073763]/10"}`}>
                        <span className="opacity-40 mr-3">{(index + 1).toString().padStart(2, '0')}</span>{name}
                      </button>
                    ))}
                  </div>
                </div>
                <a href="https://sites.google.com/dswd.gov.ph/dswdacademyfaqs2026/faqs" target="_blank" rel="noopener noreferrer" className="w-full bg-[#073763] hover:bg-[#134c81] text-white p-5 rounded-3xl flex flex-col items-center justify-center gap-2 text-center font-black text-[11px] uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02]">
                  Frequently Asked Questions
                </a>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {view === "calendar" ? (
                <motion.div key={`calendar-${selectedMonth}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex justify-between items-end px-2 md:px-4 mb-4 md:mb-6">
                      <div className="flex flex-col">
                        <h2 className="text-xl md:text-5xl font-black uppercase tracking-tight">{fullMonths[selectedMonth]}</h2>
                      </div>
                      <span className="text-[#073763]/30 font-black text-sm md:text-3xl leading-none">2026</span>
                  </div>
                  <div className="grid grid-cols-7 text-center font-black text-white bg-[#073763] rounded-xl mb-3 py-3 md:py-4 uppercase text-[9px] md:text-xs">
                    {weekdays.map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className="calendar-main-body rounded-xl overflow-hidden">{renderCalendarRows()}</div>
                </motion.div>
              ) : (
                <motion.div key={`list-${selectedMonth}`} initial="hidden" animate="visible" exit="exit" className="space-y-4">
                  <div className="bg-[#073763] p-3 md:p-4 rounded-2xl flex flex-col md:flex-row gap-3 shadow-xl relative">
                    <div className="relative flex-1">
                      <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                      <input type="text" placeholder="Search..." className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 text-sm text-white focus:outline-none placeholder:text-white/30" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    
                    <div className="relative md:w-80">
                      <button 
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-4 flex justify-between items-center text-[10px] font-black text-white uppercase tracking-wider text-left"
                      >
                        <span className="truncate">{filterCategoryId === "All" ? "All Categories" : trainingCategories[filterCategoryId]}</span>
                        <BsChevronDown className={`transition-transform duration-300 ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isCategoryDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: 10 }} 
                            className="absolute top-full left-0 right-0 z-50 mt-2 bg-[#073763] rounded-2xl p-2 max-h-64 overflow-y-auto shadow-2xl border border-white/10"
                          >
                            <button onClick={() => { setFilterCategoryId("All"); setIsCategoryDropdownOpen(false); }} className={`w-full py-2.5 px-4 rounded-xl text-[10px] font-black text-left mb-1 transition-all ${filterCategoryId === "All" ? "bg-white text-[#073763]" : "text-white hover:bg-white/10"}`}>ALL CATEGORIES</button>
                            {Object.entries(trainingCategories).map(([id, label]) => (
                              <button key={id} onClick={() => { setFilterCategoryId(id); setIsCategoryDropdownOpen(false); }} className={`w-full py-2.5 px-4 rounded-xl text-[10px] font-black text-left mb-1 transition-all uppercase ${filterCategoryId === id ? "bg-white text-[#073763]" : "text-white hover:bg-white/10"}`}>
                                {label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <AnimatePresence mode="popLayout">
                    {paginatedEvents.length > 0 ? paginatedEvents.map((event, index) => (
                      <motion.div 
                        key={event.id} 
                        custom={index} 
                        variants={cardVariants} 
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        onClick={() => setSelectedEvent(event)} 
                        className="bg-white/80 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center cursor-pointer hover:shadow-xl transition-all border-l-[6px] border-[#073763] shadow-md group relative overflow-hidden"
                      >
                        <div className="flex-1 w-full space-y-1">
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-black text-[#073763]/50 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><BsCalendar3/> {formatDateRange(event.startDate, event.endDate)}</span>
                            <span className="flex items-center gap-1.5"><BsGeoAltFill/> {event.venue.split('(')[0]}</span>
                          </div>
                          <h3 className="text-[#073763] font-black text-base md:text-lg group-hover:text-[#ee1c25] transition-colors leading-tight">{event.title}</h3>
                          <p className="text-[9px] font-bold text-[#073763]/60 uppercase">{trainingCategories[event.colorId]}</p>
                        </div>
                        {event.tag && <span className="shrink-0 bg-[#073763] text-white text-[8px] md:text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{event.tag}</span>}
                      </motion.div>
                    )) : <div className="py-20 text-center glass-card rounded-3xl font-black text-sm uppercase tracking-widest opacity-50">No Events Found</div>}
                    </AnimatePresence>
                  </div>

                  {filteredEvents.length > itemsPerPage && (
                    <div className="flex items-center justify-center gap-6 pt-4 font-black text-[#073763] uppercase tracking-widest text-[10px] md:text-xs">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-2 transition-opacity ${currentPage === 1 ? "opacity-20 cursor-not-allowed" : "hover:text-[#ee1c25]"}`}
                      >
                        <BsChevronLeft strokeWidth={1} /> Prev
                      </button>
                      
                      <span className="bg-[#073763] text-white px-4 py-1.5 rounded-full shadow-lg">
                        {currentPage} out of {totalPages}
                      </span>

                      <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-2 transition-opacity ${currentPage === totalPages ? "opacity-20 cursor-not-allowed" : "hover:text-[#ee1c25]"}`}
                      >
                        Next <BsChevronRight strokeWidth={1} />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEvent(null)} className="absolute inset-0 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="w-full h-48 md:h-80 relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-white hover:text-[#073763] transition-all border border-white/30">
                  <IoClose size={20} />
                </button>
                <div className="absolute bottom-4 left-6 z-20">
                  {selectedEvent.tag && selectedEvent.tag.trim() !== "" && (
                    <span className="bg-[#ee1c25] text-white text-[8px] md:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {selectedEvent.tag}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
                <h2 className="text-xl md:text-3xl font-black text-[#073763] mb-4 md:mb-6 leading-tight">{selectedEvent.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mb-6 md:mb-8">
                  <div className="flex items-start gap-3"><div className="bg-[#073763]/10 p-2 rounded-lg"><BsCalendar3 className="text-[#073763]" /></div><div className="flex flex-col"><span className="text-[9px] font-black text-[#073763]/40 uppercase">Schedule</span><span className="text-xs md:text-sm font-bold">{formatDateRange(selectedEvent.startDate, selectedEvent.endDate)}</span></div></div>
                  <div className="flex items-start gap-3"><div className="bg-[#073763]/10 p-2 rounded-lg"><BsGeoAltFill className="text-[#073763]" /></div><div className="flex flex-col"><span className="text-[9px] font-black text-[#073763]/40 uppercase">Location</span><span className="text-xs md:text-sm font-bold">{selectedEvent.venue}</span></div></div>
                  <div className="flex items-start gap-3 md:col-span-2"><div className="bg-[#073763]/10 p-2 rounded-lg"><BsPeopleFill className="text-[#073763]" /></div><div className="flex flex-col"><span className="text-[9px] font-black text-[#073763]/40 uppercase">Target Participants</span><span className="text-xs md:text-sm font-bold">{selectedEvent.target}</span></div></div>
                </div>
                <div className="bg-gray-50 p-5 md:p-6 rounded-2xl">
                    <p className="text-[9px] font-black text-[#073763]/40 uppercase mb-2">Program Overview</p>
                    <ExpandableDescription text={selectedEvent.description} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;