import React from 'react';

const CTA = () => {
  return (
    <section className="py-32 px-6 md:px-margin-desktop max-w-container-max mx-auto">
      <div className="relative rounded-[40px] overflow-hidden py-24 px-12 text-center border border-white/10 bg-surface shadow-2xl">
        {/* Abstract Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-10 relative z-10">
          <h2 className="font-hanken text-4xl md:text-6xl text-white font-bold leading-tight tracking-tight">
            Be part of the <span className="text-primary italic">next big thing</span> on campus
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-inter max-w-2xl mx-auto">
            Don't miss out on the opportunity to showcase your skills and connect with peers. Registration for Yarl Insight 2024 is now open.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <button className="bg-primary text-black px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(250,204,21,0.2)] active:scale-95">
              Sign Up Now
            </button>
            <button className="glass-card text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/10 active:scale-95">
              Contact Organizing Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6 col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-black font-black text-xl">Y</span>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight font-hanken">
                Yarl Insight <span className="text-primary">2.0</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Empowering students through innovation, collaboration, and peer-to-peer excellence.
            </p>
            <div className="flex gap-4">
              {['school', 'groups', 'auto_awesome'].map((icon) => (
                <a key={icon} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-white/40 hover:text-primary hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-lg">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-bold">Event Info</h5>
            <ul className="space-y-4">
              {['Schedule', 'Speakers', 'Workshops', 'Hackathon'].map((item) => (
                <li key={item}><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-bold">Support</h5>
            <ul className="space-y-4">
              {['FAQ', 'Venue Map', 'Student Guide', 'Contact Us'].map((item) => (
                <li key={item}><a href="#" className="text-white/60 hover:text-white transition-colors text-sm">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-bold">Stay Updated</h5>
            <p className="text-white/40 text-sm leading-relaxed">
              Get the latest news and announcements delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Student email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary transition-colors text-white"
              />
              <button className="bg-primary text-black p-2 rounded-lg hover:brightness-110 transition-all">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/20 uppercase tracking-widest">
          <div>© 2024 Yarl Insight Organizing Committee. Student Initiative.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { CTA, Footer };
