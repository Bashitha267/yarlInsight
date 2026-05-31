import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Fallback data
const staticScheduleData = [
  {
    day_label: "Day 01",
    event_date: "October 24, 2024",
    events: [
      { display_time: "08:30 AM", title: "Registration & Welcome", speaker: "Organizing Team", event_type: "GENERAL" },
      { display_time: "10:00 AM", title: "Opening Keynote", speaker: "Dr. Aris Thorne", event_type: "KEYNOTE" },
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

        if (daysError || !days.length) throw new Error("No data or not configured");

        const { data: events, error: eventsError } = await supabase
          .from('schedule_events')
          .select('*')
          .order('start_time', { ascending: true });

        if (eventsError) throw eventsError;

        // Group events by day
        const grouped = days.map(day => ({
          ...day,
          events: events.filter(e => e.day_id === day.id)
        }));

        setScheduleData(grouped);
      } catch (err) {
        console.log("Using 'Updating Soon' state. Supabase might not be configured yet or schedule is empty.");
        setScheduleData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
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
      className="bg-transparent text-white font-inter min-h-screen pt-32 pb-20 px-6 md:px-margin-desktop max-w-container-max mx-auto"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <h1 className="font-hanken text-5xl md:text-7xl font-black tracking-tight">Event <span className="text-primary italic">Schedule</span></h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-inter">
            Three days of intensive learning, competitive building, and high-level networking. 
          </p>
        </header>

        {loading ? (
          <div className="w-full flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin"></div>
            <div className="text-primary font-mono uppercase tracking-widest text-sm animate-pulse">Loading Schedule...</div>
          </div>
        ) : scheduleData.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center py-32 px-6 space-y-8 glass-card rounded-3xl border-dashed border-white/20 relative overflow-hidden"
          >
            {/* Ambient Background for the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            
            <div className="relative z-10 flex flex-col items-center space-y-6">
              {/* Animated Icon */}
              <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center animate-bounce-slow shadow-[0_0_30px_rgba(26,86,166,0.2)]">
                <span className="material-symbols-outlined text-5xl text-primary" style={{ animation: 'spin 4s linear infinite' }}>
                  autorenew
                </span>
              </div>
              
              {/* Text Content */}
              <div className="text-center space-y-3 max-w-lg">
                <h3 className="text-3xl md:text-4xl font-hanken font-bold text-white tracking-tight">
                  Schedule will be announced soon!
                </h3>
                <p className="text-white/50 font-inter leading-relaxed">
                  Shedule will be announced soon. Stay tuned for updates and get ready for an unforgettable experience at YARL INSIGHT 3.0!
                </p>
              </div>
              
              {/* Status Pill */}
           
            </div>
          </motion.div>
        ) : (
          <div className="space-y-24">
            {scheduleData.map((day, dayIdx) => (
              <motion.div 
                key={day.day_label || dayIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: dayIdx * 0.1 }}
                className="space-y-10"
              >
                <div className="flex items-center gap-6">
                  <div className="bg-primary text-white px-6 py-2 rounded-full font-black text-xl">
                    {day.day_label}
                  </div>
                  <div className="h-px flex-grow bg-white/10"></div>
                  <div className="text-white/60 font-mono text-sm tracking-widest uppercase">
                    {new Date(day.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) !== 'Invalid Date' 
                      ? new Date(day.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
                      : day.event_date}
                  </div>
                </div>

                <div className="grid gap-4">
                  {day.events.map((event, eventIdx) => {
                    const active = isEventActive(event.start_time, event.end_time);
                    
                    return (
                      <motion.div 
                        key={event.id || eventIdx}
                        whileHover={{ scale: 1.01, backgroundColor: active ? 'rgba(26,86,166,0.1)' : 'rgba(255,255,255,0.03)' }}
                        className={`p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center gap-6 transition-all ${
                          active 
                            ? 'bg-primary/5 border border-primary shadow-[0_0_30px_rgba(26,86,166,0.2)]' 
                            : 'glass-card border-white/5'
                        }`}
                      >
                        <div className="md:w-32 text-primary font-mono font-bold text-lg flex flex-col">
                          {event.display_time}
                          {active && (
                            <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded uppercase mt-1 animate-pulse tracking-widest inline-block text-center">
                              Happening Now
                            </span>
                          )}
                        </div>
                        
                        <div className="flex-grow space-y-1">
                          <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary">
                            {event.title}
                          </h4>
                          {event.speaker && (
                            <p className="text-white/40 text-sm font-inter">
                              with <span className="text-white/80">{event.speaker}</span>
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${
                            event.event_type === 'KEYNOTE' ? 'bg-primary/20 border-primary text-primary' : 
                            event.event_type === 'WORKSHOP' ? 'bg-white/10 border-white/20 text-white' : 
                            'bg-white/5 border-white/10 text-white/40'
                          }`}>
                            {event.event_type}
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
