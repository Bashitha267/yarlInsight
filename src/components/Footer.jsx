import React from 'react';
import { Link } from 'react-router-dom';
import FAQ from './FAQ';

const CTA = () => null;

const Footer = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Speakers', path: '/speakers' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'About', path: '/#about' },
    { name: 'FAQ', path: '/#faq' },
  ];

  return (
    <>
      <footer className="bg-black text-white pt-24 pb-8 border-t border-white/5">
        <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: About */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-deltha text-xl font-black tracking-wider uppercase select-none">
                  <span className="text-primary">YARL</span> <span className="text-secondary">INSIGHT</span>
                </span>
              </div>

            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-6">
              <h4 className="font-deltha text-sm font-bold uppercase tracking-widest text-primary">Quick Links</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="font-deltha tracking-wider text-white/50 hover:text-white transition-colors text-xs uppercase">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-6">
              <h4 className="font-deltha text-sm font-bold uppercase tracking-widest text-primary">Contact</h4>
              <ul className="space-y-4 font-deltha">
                <li className="flex items-start gap-3 text-xs tracking-wider uppercase text-white/50">
                  <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                  <span>University of Jaffna, Sri Lanka</span>
                </li>
                <li className="flex items-start gap-3 text-xs tracking-wider uppercase text-white/50">
                  <span className="material-symbols-outlined text-primary text-lg">mail</span>
                  <span>ieeesb@univ.jfn.ac.lk</span>
                </li>
                <li className="flex items-start gap-3 text-xs tracking-wider uppercase text-white/50">
                  <span className="material-symbols-outlined text-primary text-lg">phone</span>
                  <span>075 6852 271</span>
                </li>
                  <li className="flex items-start gap-3 text-xs tracking-wider uppercase text-white/50">
                  <span className="material-symbols-outlined text-primary text-lg">phone</span>
                  <span>072 154 1183</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div className="space-y-6">
              <h4 className="font-deltha text-sm font-bold uppercase tracking-widest text-primary">Follow Us</h4>
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
            <p className="font-deltha text-[10px] text-white/40 uppercase tracking-widest text-center">
              © {new Date().getFullYear()} <span className="text-primary">YARL</span> <span className="text-secondary">INSIGHT</span>. All rights reserved. Organized by IEEE Student Branch of University of Jaffna.
            </p>
            <div className="flex items-center gap-4 font-deltha text-[10px] text-white/40 uppercase tracking-widest">
              <span>Developed by <a href="https://nimeshbashitha.me" target="_blank" rel="noopener noreferrer" className="text-white/80 font-bold hover:text-primary transition-colors">Nimesh Bashitha</a></span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export { CTA, Footer };
