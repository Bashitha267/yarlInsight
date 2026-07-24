import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import RollingText from './RollingText';

const Hero = () => {
  const dynamicWords = ["INSIGHT"];
  const [activeEvent, setActiveEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Saturday, July 25th at 7:30 AM
    const targetDate = new Date('2026-07-25T07:30:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchActiveEvent = async () => {
      try {
        const { data, error } = await supabase
          .from('schedule_events')
          .select('*')
          .eq('is_active', true)
          .limit(1);

        if (!error && data && data.length > 0) {
          setActiveEvent(data[0]);
        } else {
          setActiveEvent(null);
        }
      } catch (err) {
        setActiveEvent(null);
      }
    };

    fetchActiveEvent();

    const channel = supabase
      .channel('hero_schedule_events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'schedule_events' }, () => {
        fetchActiveEvent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden flex flex-col justify-center pt-28 pb-20">
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-[500px] h-[350px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 px-4 sm:px-6 md:px-margin-desktop max-w-container-max mx-auto w-full space-y-10">
        
        {/* Happening Now Top Popup Banner */}
        {showPopup && activeEvent && (
          <div className="w-full max-w-4xl mx-auto animate-fade-in mb-4">
            <div className="bg-yellow-500/10 border border-yellow-400/60 backdrop-blur-xl p-4 sm:p-5 rounded-2xl sm:rounded-full shadow-[0_0_35px_rgba(234,179,8,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/5 pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left z-10">
                <div className="bg-yellow-400 text-black font-black text-[10px] sm:text-xs px-3.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-2 shrink-0 shadow-[0_0_12px_rgba(234,179,8,0.6)]">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                  HAPPENING NOW
                </div>
                <div className="space-y-0.5">
                  <div className="text-white font-bold text-sm sm:text-base line-clamp-1">
                    {activeEvent.title}
                  </div>
                  <div className="text-white/60 text-xs font-inter flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-yellow-400 font-mono font-semibold">{activeEvent.display_time}</span>
                    {activeEvent.speaker && <span>• with <strong className="text-white/90">{activeEvent.speaker}</strong></span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 z-10 shrink-0">
                <Link
                  to="/schedule"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1 shadow-lg hover:scale-105"
                >
                  <span>View Schedule</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="text-white/40 hover:text-white p-1 rounded-full transition-colors"
                  aria-label="Close popup"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Hero Grid: Text on Left, Countdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Headline & Text Content (col-span-7) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-5 py-2 rounded-full font-mono text-xs uppercase tracking-[0.3em] animate-fade-in shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Campus Innovation Summit
            </div>

            <div className="space-y-4">
              <h1 className="font-deltha text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight animate-slide-up flex flex-wrap items-center gap-x-4">
                <span className="text-primary">YARL</span>
                <RollingText words={dynamicWords} />
              </h1>
              <p className="font-inter text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed animate-slide-up animation-delay-300">
                Welcome to YarlInsight 3.0! We are delighted to have you join us. Get ready for an engaging experience filled with knowledge, collaboration, and innovation.
              </p>
            </div>
          </div>

          {/* Right Side: Countdown Timer Box (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center animate-slide-up animation-delay-500">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-full max-w-md space-y-6">
              <div className="text-xs uppercase font-mono tracking-[0.25em] text-secondary/90 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
                Event Starts In (Saturday 7:30 AM)
              </div>

              <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-center group hover:border-primary/50 transition-all duration-300 shadow-lg">
                  <span className="font-deltha text-3xl sm:text-4xl font-black text-white group-hover:text-primary transition-colors block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-white/40 tracking-widest mt-1 block">Days</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-center group hover:border-primary/50 transition-all duration-300 shadow-lg">
                  <span className="font-deltha text-3xl sm:text-4xl font-black text-white group-hover:text-primary transition-colors block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-white/40 tracking-widest mt-1 block">Hours</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-center group hover:border-primary/50 transition-all duration-300 shadow-lg">
                  <span className="font-deltha text-3xl sm:text-4xl font-black text-white group-hover:text-primary transition-colors block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-white/40 tracking-widest mt-1 block">Mins</span>
                </div>
                <div className="bg-white/5 border border-secondary/30 rounded-2xl p-3 sm:p-4 text-center group hover:border-secondary transition-all duration-300 shadow-[0_0_20px_rgba(249,168,37,0.15)] relative overflow-hidden">
                  <span className="font-deltha text-3xl sm:text-4xl font-black text-secondary block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-white/40 tracking-widest mt-1 block">Secs</span>
                </div>
              </div>

              <Link
                to="/schedule"
                className="w-full bg-primary hover:bg-primary/90 text-white font-deltha font-bold tracking-wider uppercase py-3.5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(17,63,124,0.4)] hover:shadow-[0_0_35px_rgba(17,63,124,0.7)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Full Schedule</span>
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
