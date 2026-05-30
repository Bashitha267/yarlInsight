import React from 'react';
import { motion } from 'framer-motion';

const Sponsors = () => {
  // Ensure the page loads from the very top of the window on mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Sponsor configuration data
  const sponsorTiers = {
    gold: [
      {
        name: 'Aravanai',
        logoUrl: 'https://res.cloudinary.com/dnfbik3if/image/upload/v1780118625/05_kd5xjn.png',
        tagline: 'Empowering communities through education, entrepreneurship & employment.',
        badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
        borderColor: 'group-hover:border-amber-400/80 border-white/5',
        logoBg: 'bg-amber-500/5 group-hover:bg-amber-500/10 border-white/5 group-hover:border-amber-400/40',
        shadowGlow: 'hover:shadow-[0_0_50px_rgba(245,158,11,0.25)]',
        textColor: 'text-amber-400',
        icon: 'emoji_events', // Trophy
        iconColor: 'text-amber-400',
        cardBg: 'bg-amber-500/[0.02]'
      }
    ],
    silver: [
      {
        name: 'WSO2',
        logoUrl: '', // Fallback styled logo text is used if empty
        tagline: 'A global leader in digital transformation, open-source integration, and identity management.',
        badgeColor: 'text-slate-300 border-slate-500/30 bg-slate-500/10',
        borderColor: 'group-hover:border-[#F14E23]/80 border-white/5',
        logoBg: 'bg-slate-500/5 group-hover:bg-orange-500/10 border-white/5 group-hover:border-[#F14E23]/40',
        shadowGlow: 'hover:shadow-[0_0_50px_rgba(241,78,35,0.25)]',
        textColor: 'text-[#F14E23]',
        icon: 'workspace_premium', // Medal
        iconColor: 'text-slate-300',
        cardBg: 'bg-slate-500/[0.01]'
      }
    ],
    bronze: [
      {
        name: 'Prime1',
        logoUrl: 'https://res.cloudinary.com/dnfbik3if/image/upload/v1780118625/Prime1_yhmkdt.png',
        tagline: 'Supporting technology ecosystem development and future talent.',
        badgeColor: 'text-orange-400 border-orange-700/30 bg-orange-700/10',
        borderColor: 'group-hover:border-orange-500/80 border-white/5',
        logoBg: 'bg-orange-950/5 group-hover:bg-orange-950/20 border-white/5 group-hover:border-orange-500/30',
        shadowGlow: 'hover:shadow-[0_0_40px_rgba(234,88,12,0.2)]',
        textColor: 'text-orange-500',
        icon: 'military_tech', // Rank Badge
        iconColor: 'text-orange-500',
        cardBg: 'bg-orange-950/[0.01]'
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-transparent text-white font-inter min-h-screen pt-36 pb-24 px-6 md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#1A56A6]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[450px] h-[450px] bg-[#F9A825]/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-24 relative z-10">
        {/* Page Header */}
        <header className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] text-white/60 uppercase shadow-inner"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Our Partners
          </motion.div>
          <h1 className="font-hanken text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white">
            <span className="text-primary">YARL</span> <span className="text-secondary">INSIGHT</span> <span className="text-white">3.0</span> <span className="text-secondary italic">Sponsors</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-inter leading-relaxed">
            We are deeply grateful to the organizations that power our community vision, making YarlInsight 3.0 possible.
          </p>
        </header>

        {/* Tier by Tier Listing */}
        <div className="space-y-20">
          
          {/* Gold Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Divider Header */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest font-bold shadow-md">
                <span className="material-symbols-outlined text-base">emoji_events</span>
                Gold Sponsor
              </div>
              <div className="h-px flex-grow bg-amber-500/20"></div>
            </div>

            {/* Gold Sponsor Card */}
            <div className="grid gap-6">
              {sponsorTiers.gold.map((sponsor) => (
                <motion.div 
                  key={sponsor.name}
                  whileHover={{ 
                    x: 12, 
                    scale: 1.015,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  className={`group relative glass-card rounded-3xl p-8 border transition-all duration-500 flex flex-col md:flex-row items-center gap-8 ${sponsor.borderColor} ${sponsor.shadowGlow} ${sponsor.cardBg}`}
                >
                  {/* Logo Container */}
                  <div className={`w-full md:w-56 h-36 flex-shrink-0 flex items-center justify-center rounded-2xl bg-black/60 border relative overflow-hidden transition-all duration-300 group-hover:bg-black/80 ${sponsor.logoBg}`}>
                    {sponsor.logoUrl ? (
                      <img 
                        src={sponsor.logoUrl} 
                        alt={`${sponsor.name} Logo`} 
                        className="max-w-[75%] max-h-[75%] object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    ) : (
                      <span className={`text-3xl font-black tracking-tight ${sponsor.textColor}`}>
                        {sponsor.name}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow text-center md:text-left space-y-3 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      <h4 className="text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                        {sponsor.name}
                      </h4>
                      <span className={`text-[9px] px-3 py-1 rounded-full border uppercase tracking-wider font-mono font-bold ${sponsor.badgeColor}`}>
                        Gold Partner
                      </span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed font-inter">
                      {sponsor.tagline}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Silver Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Divider Header */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-slate-400/10 text-slate-300 border border-slate-400/20 px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest font-bold shadow-md">
                <span className="material-symbols-outlined text-base">workspace_premium</span>
                Silver Sponsor
              </div>
              <div className="h-px flex-grow bg-slate-500/20"></div>
            </div>

            {/* Silver Sponsor Card */}
            <div className="grid gap-6">
              {sponsorTiers.silver.map((sponsor) => (
                <motion.div 
                  key={sponsor.name}
                  whileHover={{ 
                    x: 12, 
                    scale: 1.015,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  className={`group relative glass-card rounded-3xl p-8 border transition-all duration-500 flex flex-col md:flex-row items-center gap-8 ${sponsor.borderColor} ${sponsor.shadowGlow} ${sponsor.cardBg}`}
                >
                  {/* Logo Container */}
                  <div className={`w-full md:w-56 h-36 flex-shrink-0 flex items-center justify-center rounded-2xl bg-black/60 border relative overflow-hidden transition-all duration-300 group-hover:bg-black/80 ${sponsor.logoBg}`}>
                    {sponsor.logoUrl ? (
                      <img 
                        src={sponsor.logoUrl} 
                        alt={`${sponsor.name} Logo`} 
                        className="max-w-[75%] max-h-[75%] object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    ) : (
                      <div className="text-center group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-center gap-0.5">
                          <span className="text-4xl font-black tracking-tighter text-white">
                            WSO
                          </span>
                          <span className="text-4xl font-black tracking-tighter text-[#F14E23]">
                            2
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow text-center md:text-left space-y-3 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      <h4 className="text-3xl font-extrabold text-white group-hover:text-[#F14E23] transition-colors tracking-tight">
                        {sponsor.name}
                      </h4>
                      <span className={`text-[9px] px-3 py-1 rounded-full border uppercase tracking-wider font-mono font-bold ${sponsor.badgeColor}`}>
                        Silver Partner
                      </span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed font-inter">
                      {sponsor.tagline}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bronze Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Divider Header */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-orange-950/20 text-orange-400 border border-orange-900/30 px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest font-bold shadow-md">
                <span className="material-symbols-outlined text-base">military_tech</span>
                Bronze Sponsor
              </div>
              <div className="h-px flex-grow bg-orange-900/20"></div>
            </div>

            {/* Bronze Sponsor Card */}
            <div className="grid gap-6">
              {sponsorTiers.bronze.map((sponsor) => (
                <motion.div 
                  key={sponsor.name}
                  whileHover={{ 
                    x: 12, 
                    scale: 1.015,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  className={`group relative glass-card rounded-3xl p-8 border transition-all duration-500 flex flex-col md:flex-row items-center gap-8 ${sponsor.borderColor} ${sponsor.shadowGlow} ${sponsor.cardBg}`}
                >
                  {/* Logo Container */}
                  <div className={`w-full md:w-56 h-36 flex-shrink-0 flex items-center justify-center rounded-2xl bg-black/60 border relative overflow-hidden transition-all duration-300 group-hover:bg-black/80 ${sponsor.logoBg}`}>
                    {sponsor.logoUrl ? (
                      <img 
                        src={sponsor.logoUrl} 
                        alt={`${sponsor.name} Logo`} 
                        className="max-w-[75%] max-h-[75%] object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    ) : (
                      <span className={`text-3xl font-black tracking-tight ${sponsor.textColor}`}>
                        {sponsor.name}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow text-center md:text-left space-y-3 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      <h4 className="text-3xl font-extrabold text-white group-hover:text-amber-500 transition-colors tracking-tight">
                        {sponsor.name}
                      </h4>
                      <span className={`text-[9px] px-3 py-1 rounded-full border uppercase tracking-wider font-mono font-bold ${sponsor.badgeColor}`}>
                        Bronze Partner
                      </span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed font-inter">
                      {sponsor.tagline}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Sponsors;
