import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import RollingText from './RollingText';
import SplineScene from './SplineScene';

const Hero = () => {
  const dynamicWords = ["INSIGHT"];
  const [activeEvent, setActiveEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

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
          // Default fallback active event
          setActiveEvent({
            display_time: "09:30 AM - 10:30 AM",
            title: "AI-powered Requirement Engineering and Product Discovery (Part 1)",
            speaker: "Naresh Shanmgaraj",
            event_type: "KEYNOTE"
          });
        }
      } catch (err) {
        setActiveEvent({
          display_time: "09:30 AM - 10:30 AM",
          title: "AI-powered Requirement Engineering and Product Discovery (Part 1)",
          speaker: "Naresh Shanmgaraj",
          event_type: "KEYNOTE"
        });
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
    <section className="relative min-h-[95vh] w-full overflow-hidden flex flex-col justify-center pt-24 pb-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-5 scale-110 animate-pulse-slow grayscale"
          src="https://images.unsplash.com/photo-1523050335102-c89b1811b127?auto=format&fit=crop&q=80&w=2070"
          alt="University Campus Backdrop"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        {/* Animated Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-blob transform-gpu will-change-transform"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[120px] animate-blob animation-delay-2000 transform-gpu will-change-transform"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-margin-desktop max-w-container-max mx-auto w-full space-y-8">
        
        {/* Happening Now Top Popup Banner */}
        {showPopup && activeEvent && (
          <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <div className="bg-yellow-500/10 border border-yellow-400/60 backdrop-blur-xl p-4 sm:p-5 rounded-2xl sm:rounded-full shadow-[0_0_35px_rgba(234,179,8,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden group">
              {/* Inner ambient glow */}
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text Content */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-[0.3em] animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Campus Innovation Summit
            </div>

            <div className="space-y-2">
              <h1 className="font-hanken text-5xl md:text-8xl font-black leading-none tracking-tight animate-slide-up flex flex-wrap items-center gap-x-4 mb-6">
                <span className="text-primary">YARL</span>
                <RollingText words={dynamicWords} />
              </h1>
              <p className="font-inter text-xl md:text-2xl text-white/60 mb-12 max-w-2xl leading-relaxed animate-slide-up animation-delay-300">
                Ready to join YarlInsight 3.0? Registration will be available soon for this transformative two-day summer school hosted by IEEE Student Branch of the University of Jaffna.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 animate-slide-up animation-delay-1000">
              <a
                href="https://forms.gle/1HjzND696eXYvYzA8"
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-white px-10 py-4 rounded-xl font-black text-lg md:text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(17,63,124,0.3)] active:scale-95 flex items-center gap-3"
              >
                Register Now
                <span className="material-symbols-outlined font-bold">arrow_forward</span>
              </a>
              <button className="btn-outline px-10 py-4 rounded-xl text-lg md:text-xl">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side: 3D Spline Scene */}
          <div className="h-[400px] lg:h-[600px] w-full animate-fade-in scale-110 lg:scale-125">
            <SplineScene 
              scene="https://prod.spline.design/5w-wVImaKLa121h5/scene.splinecode" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
