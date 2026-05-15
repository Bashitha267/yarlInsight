import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="flex justify-between items-center px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-black font-black text-xl">Y</span>
          </div>
          <Link to="/" className="text-xl md:text-2xl font-bold text-white tracking-tight font-hanken">
            Yarl Insight <span className="text-primary">2.0</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-primary font-semibold border-b-2 border-primary pb-1">Home</Link>
          <Link to="/schedule" className="text-white/70 hover:text-white transition-colors font-medium">Schedule</Link>
          <Link to="#" className="text-white/70 hover:text-white transition-colors font-medium">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-white font-medium hover:text-primary transition-colors text-sm">Login</button>
          <button className="bg-primary text-black px-5 py-2 rounded-lg font-bold hover:brightness-110 transition-all active:scale-95 text-sm">
            Register Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
