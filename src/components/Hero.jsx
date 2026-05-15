import React from 'react';
import RollingText from './RollingText';

const Hero = () => {
  const dynamicWords = ["Insight"];

  return (
    <section className="relative min-h-[95vh] w-full overflow-hidden flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-5 scale-110 animate-pulse-slow grayscale"
          src="https://images.unsplash.com/photo-1523050335102-c89b1811b127?auto=format&fit=crop&q=80&w=2070"
          alt="University Campus Backdrop"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        {/* Animated Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 px-6 md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-4xl space-y-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-[0.3em] animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Campus Innovation Summit 2024
          </div>

          <div className="space-y-2">
            <h1 className="font-hanken text-5xl md:text-8xl text-white font-black leading-none tracking-tight animate-slide-up flex flex-wrap items-center gap-x-4 mb-6">
              <span>Yarl</span>
              <RollingText words={dynamicWords} />
            </h1>
            <p className="font-inter text-xl md:text-2xl text-white/60 mb-12 max-w-2xl leading-relaxed animate-slide-up animation-delay-300">
              Join us for a transformative two-day summer school hosted by IEEE Student Branch of the University of Jaffna.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-4 animate-slide-up animation-delay-1000">
            <button className="bg-primary text-black px-10 py-4 rounded-xl font-black text-lg md:text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(250,204,21,0.3)] active:scale-95 flex items-center gap-3">
              Register Now
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </button>
            <button className="btn-outline px-10 py-4 rounded-xl text-lg md:text-xl">
              Learn More
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
