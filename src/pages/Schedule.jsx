import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Fallback schedule data with exact event timeline
const staticScheduleData = [
  {
    day_label: "Day 01",
    event_date: "25 JULY",
    events: [
      { display_time: "08.00 – 08.30 AM", title: "Registration", speaker: "Organizing Team", event_type: "GENERAL" },
      { display_time: "08.30 – 08.40 AM", title: "Lighting of the Oil Lamp", speaker: "Dignitaries", event_type: "GENERAL" },
      { display_time: "08.40 – 08.50 AM", title: "Welcome Speech (Chairperson)", speaker: "Chairperson", event_type: "GENERAL" },
      { display_time: "08.50 – 09.00 AM", title: "Speech by Vice Chancellor, University of Jaffna", speaker: "Vice Chancellor, UOJ", event_type: "GENERAL" },
      { display_time: "09.00 – 09.10 AM", title: "Speech by Dean, Faculty of Science", speaker: "Dean, Faculty of Science", event_type: "GENERAL" },
      { display_time: "09.10 – 09.20 AM", title: "Speech by HoD, Department of Computer Science", speaker: "HoD, Department of Computer Science", event_type: "GENERAL" },
      { display_time: "09.20 – 09.30 AM", title: "Overview of Yarl Insight & Event Guidelines", speaker: "Organizing Committee", event_type: "GENERAL" },
      { display_time: "09.30 – 10.30 AM", title: "Session 1: AI-powered Requirement Engineering & Product Discovery", speaker: "Mr. Naresh Shanmugaraj", event_type: "KEYNOTE", is_active: true },
      { display_time: "10.30 – 11.00 AM", title: "Tea Break", speaker: "", event_type: "BREAK" },
      { display_time: "11.00 – 12.30 PM", title: "Session 1: Continue", speaker: "Mr. Naresh Shanmugaraj", event_type: "WORKSHOP" },
      { display_time: "12.30 – 01.30 PM", title: "Lunch Break", speaker: "", event_type: "BREAK" },
      { display_time: "01.30 – 03.00 PM", title: "Session 2: AI-assisted Development & Code Generation", speaker: "Mr. Sheron Jude", event_type: "KEYNOTE" },
      { display_time: "03.00 – 03.30 PM", title: "Tea Break", speaker: "", event_type: "BREAK" },
      { display_time: "03.30 – 05.00 PM", title: "Session 2: Continue", speaker: "Mr. Sheron Jude", event_type: "WORKSHOP" },
      { display_time: "05.00 – 05.10 PM", title: "Group Photo & Closing Ceremony", speaker: "Organizing Team", event_type: "GENERAL" }
    ]
  }
];

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Ensure the page loads from the very top of the window on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Update current time every minute to check for active events
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data: days, error: daysError } = await supabase
          .from('schedule_days')
          .select('*')
          .order('sort_order', { ascending: true });

        if (daysError || !days || days.length === 0) throw new Error("No data or not configured");

        const { data: events, error: eventsError } = await supabase
          .from('schedule_events')
          .select('*')
          .order('start_time', { ascending: true });

        if (eventsError) throw eventsError;

        // Group events by day
        const grouped = days.map(day => ({
          ...day,
          events: events ? events.filter(e => e.day_id === day.id) : []
        }));

        if (grouped.length > 0 && grouped.some(d => d.events && d.events.length > 0)) {
          setScheduleData(grouped);
        } else {
          setScheduleData(staticScheduleData);
        }
      } catch (err) {
        console.log("Using static schedule fallback as Supabase is not configured or schedule is empty.");
        setScheduleData(staticScheduleData);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();

    const channel = supabase
      .channel('schedule_page_events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'schedule_events' }, () => {
        fetchSchedule();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const isEventActive = (startTimeStr, endTimeStr) => {
    if (!startTimeStr || !endTimeStr) return false;
    const start = new Date(startTimeStr).getTime();
    const end = new Date(endTimeStr).getTime();
    const now = currentTime.getTime();
    return now >= start && now <= end;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-transparent text-white font-inter min-h-screen pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="w-full space-y-12 md:space-y-16">
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-hanken text-4xl sm:text-5xl md:text-7xl font-black tracking-tight">
            Event <span className="text-primary italic">Schedule</span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg md:text-xl font-inter leading-relaxed">
            Three days of intensive learning, competitive building, and high-level networking.
          </p>
        </header>

        {loading ? (
          <div className="w-full flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-16 h-16 border-4 border-white/10 border-t-yellow-400 rounded-full animate-spin"></div>
            <div className="text-yellow-400 font-mono uppercase tracking-widest text-sm animate-pulse">Loading Schedule...</div>
          </div>
        ) : scheduleData.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center py-24 sm:py-32 px-6 space-y-8 glass-card rounded-3xl border-dashed border-white/20 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center animate-bounce-slow shadow-[0_0_30px_rgba(26,86,166,0.2)]">
                <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary animate-spin" style={{ animationDuration: '6s' }}>
                  autorenew
                </span>
              </div>
              <div className="space-y-3 max-w-lg">
                <h3 className="text-2xl sm:text-4xl font-hanken font-bold text-white tracking-tight">
                  Schedule will be announced soon!
                </h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  Stay tuned for updates and get ready for an unforgettable experience at YARL INSIGHT 3.0!
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-16 sm:space-y-20 w-full">
            {scheduleData.map((day, dayIdx) => (
              <motion.div 
                key={day.day_label || dayIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: dayIdx * 0.1 }}
                className="space-y-6 sm:space-y-8 w-full"
              >
                {/* Day Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-white px-5 py-1.5 sm:px-6 sm:py-2 rounded-full font-black text-lg sm:text-xl shadow-lg">
                      {day.day_label}
                    </div>
                    <h2 className="text-white/70 font-mono text-sm sm:text-base font-semibold tracking-wider uppercase">
                      {new Date(day.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) !== 'Invalid Date' 
                        ? new Date(day.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
                        : day.event_date}
                    </h2>
                  </div>
                  <div className="hidden sm:block text-xs font-mono text-white/40 uppercase tracking-widest">
                    {day.events?.length || 0} Sessions
                  </div>
                </div>

                {/* Events Grid / List */}
                <div className="grid gap-4 sm:gap-5 w-full">
                  {day.events.map((event, eventIdx) => {
                    const active = Boolean(event.is_active) || isEventActive(event.start_time, event.end_time);
                    
                    return (
                      <motion.div 
                        key={event.id || eventIdx}
                        whileHover={{ scale: 1.008 }}
                        transition={{ duration: 0.2 }}
                        className={`p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 transition-all relative overflow-hidden ${
                          active 
                            ? 'bg-yellow-500/10 border-2 border-yellow-400 shadow-[0_0_40px_rgba(234,179,8,0.25)]' 
                            : 'glass-card border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {/* Ambient glow for active card */}
                        {active && (
                          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
                        )}

                        {/* Left Side: Time & Happening Now Badge */}
                        <div className="flex flex-wrap sm:flex-col items-center sm:items-start justify-between gap-2 md:w-56 shrink-0">
                          <div className={`font-mono font-bold text-base sm:text-lg lg:text-xl tracking-tight ${
                            active ? 'text-yellow-400' : 'text-primary'
                          }`}>
                            {event.display_time}
                          </div>
                          
                          {active && (
                            <div className="bg-yellow-400 text-black font-black text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                              <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                              HAPPENING NOW
                            </div>
                          )}
                        </div>

                        {/* Middle: Title & Speaker */}
                        <div className="flex-grow space-y-2 pr-0 md:pr-4">
                          <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold tracking-tight leading-snug ${
                            active ? 'text-white font-extrabold' : 'text-white'
                          }`}>
                            {event.title}
                          </h3>
                          {event.speaker && (
                            <p className="text-white/60 text-xs sm:text-sm font-inter flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-sm text-primary">person</span>
                              <span>with <strong className="text-white/90 font-medium">{event.speaker}</strong></span>
                            </p>
                          )}
                        </div>

                        {/* Right Side: Event Type Badge */}
                        <div className="flex items-center self-start md:self-center shrink-0">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase border transition-all ${
                            event.event_type === 'KEYNOTE' ? 'bg-primary/20 border-primary/50 text-primary' : 
                            event.event_type === 'WORKSHOP' ? 'bg-purple-500/20 border-purple-400/50 text-purple-300' : 
                            event.event_type === 'PANEL' ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300' :
                            event.event_type === 'BREAK' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300/80' :
                            'bg-white/5 border-white/15 text-white/50'
                          }`}>
                            {event.event_type || 'GENERAL'}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Schedule;
