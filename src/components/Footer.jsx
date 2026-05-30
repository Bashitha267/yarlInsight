import React from 'react';
import FAQ from './FAQ';

const CTA = () => {
  return (
    <section className="py-24 px-6 md:px-margin-desktop max-w-container-max mx-auto">
      <div className="relative rounded-3xl overflow-hidden py-16 px-12 text-center bg-black/60 border border-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(26,86,166,0.15)]">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-white">
          <h2 className="font-hanken text-4xl md:text-5xl font-black leading-tight">
            Ready to Join <span className="text-primary">YARL</span> <span className="text-secondary">INSIGHT</span> <span className="text-white">3.0</span>
          </h2>
          <p className="text-white/60 text-lg font-medium max-w-xl mx-auto font-inter">
            Don't miss this opportunity to enhance your skills and network with industry professionals.
          </p>
          <div className="pt-4">
            <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all active:scale-95 shadow-xl hover:bg-primary-dark">
              Registrations available soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white pt-24 pb-8 border-t border-white/5">
        <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: About */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-hanken text-xl font-black tracking-wider uppercase select-none">
                  <span className="text-primary">YARL</span> <span className="text-secondary">INSIGHT</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                A comprehensive two-day summer school dedicated to Fullstack Development with MERN Stack. Hosted by IEEE Student Branch of the University of Jaffna.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Speakers', 'Schedule', 'Gallery', 'FAQ'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-white/40">
                  <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                  <span>University of Jaffna, Sri Lanka</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/40">
                  <span className="material-symbols-outlined text-primary text-lg">mail</span>
                  <span>ieeesb@univ.jfn.ac.lk</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/40">
                  <span className="material-symbols-outlined text-primary text-lg">phone</span>
                  <span>+94 71 087 0119</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/IEEESBUoJ/' },
                  { icon: 'linkedin', label: 'LinkedIn', url: 'https://lk.linkedin.com/company/ieeesbuoj' },
                  { icon: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@ieeesbuoj' },
                  { icon: 'twitter', label: 'Twitter', url: 'https://twitter.com/IEEESBUOJ' },
                  { icon: 'globe', label: 'Website', url: 'https://ieee.jfn.ac.lk/' }
                ].map((social) => (
                  <a
                    key={social.icon}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                    aria-label={social.label}
                  >
                    <i className={social.icon === 'globe' ? 'fas fa-globe' : `fab fa-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-white/20 uppercase tracking-widest text-center">
              © {new Date().getFullYear()} <span className="text-primary">YARL</span> <span className="text-secondary">INSIGHT</span>. All rights reserved. Organized by IEEE Student Branch of University of Jaffna.
            </p>
            <div className="flex items-center gap-4 text-[10px] text-white/20 uppercase tracking-widest">
              <span>Developed by <a href="https://nimeshbashitha.me" target="_blank" rel="noopener noreferrer" className="text-white/60 font-bold hover:text-primary transition-colors">Nimesh Bashitha</a></span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export { CTA, Footer };
