import React from 'react';
import { motion } from 'framer-motion';

const Sponsors = () => {
  // Ensure the page loads from the very top of the window on mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Sponsor data configured to allow easy customization or image replacement.
  const sponsorTiers = {
    gold: [
      {
        name: 'Aravanai',
        logoUrl: 'https://res.cloudinary.com/dnfbik3if/image/upload/v1780118625/05_kd5xjn.png',
        tagline: 'Empowering communities through education, entrepreneurship & employment.',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        glowColor: 'group-hover:shadow-[0_0_45px_rgba(245,158,11,0.2)]',
        borderColor: 'border-amber-500/10 group-hover:border-amber-500/40',
        gradientText: 'from-amber-300 via-amber-200 to-yellow-500',
        logoBg: 'bg-amber-500/5 border-amber-500/20'
      }
    ],
    silver: [
      {
        name: 'WSO2',
        logoUrl: '', // Fallback styling is used if empty
        tagline: 'A global leader in digital transformation, open-source integration, and identity management.',
        badgeColor: 'bg-slate-400/10 text-slate-300 border-slate-400/20',
        glowColor: 'group-hover:shadow-[0_0_45px_rgba(241,78,35,0.2)]', // WSO2 brand orange glow
        borderColor: 'border-slate-500/10 group-hover:border-[#F14E23]/60', // Highlighted with WSO2 official orange
        gradientText: 'from-white via-slate-200 to-[#F14E23]',
        logoBg: 'bg-slate-500/5 border-slate-500/10'
      }
    ],
    bronze: [
      {
        name: 'Prime1',
        logoUrl: 'https://res.cloudinary.com/dnfbik3if/image/upload/v1780118625/Prime1_yhmkdt.png',
        tagline: 'Supporting technology ecosystem development and future talent.',
        badgeColor: 'bg-orange-950/20 text-orange-400 border-orange-900/30',
        glowColor: 'group-hover:shadow-[0_0_35px_rgba(180,83,9,0.12)]',
        borderColor: 'border-orange-900/15 group-hover:border-orange-600',
        gradientText: 'from-orange-400 via-amber-600 to-amber-800',
        logoBg: 'bg-amber-900/5 border-amber-900/10'
      }
    ]
  };

  return (
    <div className="bg-transparent text-white font-inter min-h-screen pt-32 pb-20 px-6 md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#1A56A6]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#F9A825]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-20 relative z-10">
        {/* Page Header */}
        <header className="text-center space-y-4">
          <span className="text-primary font-mono text-sm uppercase tracking-[0.3em]">Our Partners</span>
          <h1 className="font-hanken text-5xl md:text-7xl font-black tracking-tight">
            YarlInsight 3.0 <span className="text-primary italic">Sponsors</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-inter">
            A special thank you to our partners who make YarlInsight 3.0 possible. We are proud to present our supporters.
          </p>
        </header>

        {/* Tier by Tier Listing */}
        <div className="space-y-20">
          
          {/* Gold Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Divider Header */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-base">emoji_events</span>
                Gold Sponsor
              </div>
              <div className="h-px flex-grow bg-amber-500/20"></div>
            </div>

            {/* Gold Sponsor Card */}
            <div className="grid gap-6">
              {sponsorTiers.gold.map((sponsor) => (
                <div 
                  key={sponsor.name}
                  className={`group glass-card rounded-2xl p-8 border ${sponsor.borderColor} ${sponsor.glowColor} transition-all duration-500 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-amber-500/[0.04] to-transparent`}
                >
                  {/* Logo Container */}
                  <div className={`w-full md:w-48 h-32 flex-shrink-0 flex items-center justify-center rounded-xl bg-black/40 border relative overflow-hidden transition-all duration-300 group-hover:bg-black/60 ${sponsor.logoBg}`}>
                    {sponsor.logoUrl ? (
                      <img 
                        src={sponsor.logoUrl} 
                        alt={`${sponsor.name} Logo`} 
                        className="max-w-[80%] max-h-[80%] object-contain"
                      />
                    ) : (
                      <span className={`text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${sponsor.gradientText}`}>
                        {sponsor.name}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow text-center md:text-left space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <h4 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                          {sponsor.name}
                        </h4>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-mono font-semibold ${sponsor.badgeColor}`}>
                          Gold Partner
                        </span>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed font-inter">
                        {sponsor.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Silver Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* Divider Header */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-slate-400/10 text-slate-300 border border-slate-400/20 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-base">workspace_premium</span>
                Silver Sponsor
              </div>
              <div className="h-px flex-grow bg-slate-400/20"></div>
            </div>

            {/* Silver Sponsor Card */}
            <div className="grid gap-6">
              {sponsorTiers.silver.map((sponsor) => (
                <div 
                  key={sponsor.name}
                  className={`group glass-card rounded-2xl p-8 border ${sponsor.borderColor} ${sponsor.glowColor} transition-all duration-500 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-slate-500/[0.02] to-transparent`}
                >
                  {/* Logo Container */}
                  <div className={`w-full md:w-48 h-32 flex-shrink-0 flex items-center justify-center rounded-xl bg-black/40 border relative overflow-hidden transition-all duration-300 group-hover:bg-black/60 ${sponsor.logoBg}`}>
                    {sponsor.logoUrl ? (
                      <img 
                        src={sponsor.logoUrl} 
                        alt={`${sponsor.name} Logo`} 
                        className="max-w-[80%] max-h-[80%] object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-0.5">
                          <span className="text-3xl font-black tracking-tight text-white">
                            WSO
                          </span>
                          <span className="text-3xl font-black tracking-tight text-[#F14E23]">
                            2
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow text-center md:text-left space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <h4 className="text-2xl font-bold text-white group-hover:text-[#F14E23] transition-colors">
                          {sponsor.name}
                        </h4>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-mono font-semibold ${sponsor.badgeColor}`}>
                          Silver Partner
                        </span>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed font-inter">
                        {sponsor.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bronze Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Divider Header */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-orange-950/20 text-orange-400 border border-orange-900/30 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-base">military_tech</span>
                Bronze Sponsor
              </div>
              <div className="h-px flex-grow bg-orange-900/20"></div>
            </div>

            {/* Bronze Sponsor Card */}
            <div className="grid gap-6">
              {sponsorTiers.bronze.map((sponsor) => (
                <div 
                  key={sponsor.name}
                  className={`group glass-card rounded-2xl p-8 border ${sponsor.borderColor} ${sponsor.glowColor} transition-all duration-500 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-amber-900/[0.02] to-transparent`}
                >
                  {/* Logo Container */}
                  <div className={`w-full md:w-48 h-32 flex-shrink-0 flex items-center justify-center rounded-xl bg-black/40 border relative overflow-hidden transition-all duration-300 group-hover:bg-black/60 ${sponsor.logoBg}`}>
                    {sponsor.logoUrl ? (
                      <img 
                        src={sponsor.logoUrl} 
                        alt={`${sponsor.name} Logo`} 
                        className="max-w-[80%] max-h-[80%] object-contain"
                      />
                    ) : (
                      <span className={`text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${sponsor.gradientText}`}>
                        {sponsor.name}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow text-center md:text-left space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <h4 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">
                          {sponsor.name}
                        </h4>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-mono font-semibold ${sponsor.badgeColor}`}>
                          Bronze Partner
                        </span>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed font-inter">
                        {sponsor.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Sponsors;
