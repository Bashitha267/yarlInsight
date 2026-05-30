import React from 'react';

const Sponsors = () => {
  // Sponsor data configured to allow easy customization or image replacement.
  const sponsors = [
    {
      name: 'Aravanai',
      tier: 'Gold',
      logoUrl: 'https://res.cloudinary.com/dnfbik3if/image/upload/v1780118625/05_kd5xjn.png', // Logo image URL provided by user
      badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      cardStyle: 'border-amber-500/20 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.03)] hover:shadow-[0_0_60px_rgba(245,158,11,0.35)] bg-gradient-to-b from-amber-500/[0.06] via-white/[0.01] to-transparent',
      logoBg: 'bg-amber-500/5 border-amber-500/20 group-hover:border-amber-400/40',
      gradientText: 'from-amber-300 via-amber-200 to-yellow-500',
      icon: 'emoji_events', // Trophy
      iconColor: 'text-amber-400'
    },
    {
      name: 'WSO2',
      tier: 'Silver',
      logoUrl: '', // User can manually add WSO2 logo image path here
      badgeStyle: 'bg-slate-300/10 text-slate-300 border-slate-300/20',
      cardStyle: 'border-slate-500/10 hover:border-[#F14E23] shadow-[0_0_20px_rgba(241,78,35,0.02)] hover:shadow-[0_0_60px_rgba(241,78,35,0.35)] bg-gradient-to-b from-slate-500/[0.02] via-white/[0.01] to-transparent',
      logoBg: 'bg-slate-500/5 border-slate-500/10 group-hover:border-[#F14E23]/40',
      gradientText: 'from-white via-slate-200 to-[#F14E23]',
      icon: 'workspace_premium', // Medal
      iconColor: 'text-slate-300'
    },
    {
      name: 'Prime1',
      tier: 'Bronze',
      logoUrl: 'https://res.cloudinary.com/dnfbik3if/image/upload/v1780118625/Prime1_yhmkdt.png', // Logo image URL provided by user
      badgeStyle: 'bg-orange-950/20 text-orange-400 border-orange-900/30',
      cardStyle: 'border-orange-900/15 hover:border-orange-600 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(234,88,12,0.25)] bg-gradient-to-b from-amber-900/[0.02] via-white/[0.01] to-transparent',
      logoBg: 'bg-amber-900/5 border-amber-900/10 group-hover:border-orange-600/40',
      gradientText: 'from-orange-400 via-amber-600 to-amber-800',
      icon: 'military_tech', // Medal badge
      iconColor: 'text-amber-600'
    }
  ];

  return (
    <section id="sponsors" className="min-h-screen py-24 md:py-32 bg-transparent border-t border-white/5 relative overflow-hidden flex flex-col justify-center">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#1A56A6]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#F9A825]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-primary font-mono text-sm uppercase tracking-[0.3em] animate-fade-in">
            Supporting Innovation
          </h2>
          <h3 className="font-hanken text-4xl md:text-5xl text-white font-bold tracking-tight">
            YarlInsight 3.0 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary">Sponsors</span>
          </h3>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-inter">
            We are proud to partner with organizations that share our vision of empowering the next generation of tech talent.
          </p>
        </div>

        {/* Sponsors Grid - Responsive Layout: 1 column on mobile, 3 columns on desktop (uniform card sizes, widened layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch max-w-6xl mx-auto pt-6">
          {sponsors.map((sponsor) => (
            <div 
              key={sponsor.name}
              className={`group glass-card rounded-[2.5rem] p-12 md:p-14 border transition-all duration-500 flex flex-col items-center text-center justify-center w-full ${sponsor.cardStyle}`}
            >
              <div className="w-full flex flex-col items-center space-y-8">
                {/* Visual Icon Badge */}
                <div className="flex items-center gap-2 py-1.5 px-4 rounded-full border text-xs font-mono font-bold tracking-wider uppercase bg-black/40 border-white/5 shadow-inner">
                  <span className={`material-symbols-outlined text-base ${sponsor.iconColor}`}>
                    {sponsor.icon}
                  </span>
                  <span className="text-white">{sponsor.tier} Sponsor</span>
                </div>

                {/* Logo Container (increased height to h-44) */}
                <div className={`w-full h-44 flex items-center justify-center rounded-[1.75rem] bg-black/50 border relative overflow-hidden transition-all duration-300 group-hover:bg-black/70 ${sponsor.logoBg}`}>
                  {sponsor.logoUrl ? (
                    <img 
                      src={sponsor.logoUrl} 
                      alt={`${sponsor.name} Logo`} 
                      className="max-w-[80%] max-h-[80%] object-contain"
                    />
                  ) : (
                    <div className="text-center p-4">
                      {sponsor.name === 'WSO2' ? (
                        /* WSO2 Logo styling: Crisp white with orange accent matching guidelines */
                        <div className="flex items-center justify-center gap-0.5">
                          <span className="text-5xl font-black tracking-tight text-white">
                            WSO
                          </span>
                          <span className="text-5xl font-black tracking-tight text-[#F14E23]">
                            2
                          </span>
                        </div>
                      ) : (
                        <span className={`text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${sponsor.gradientText}`}>
                          {sponsor.name}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Details (enlarged text sizes, tagline/description removed) */}
                <div className="space-y-2 w-full">
                  <h4 className="text-3xl md:text-4xl font-bold text-white transition-colors tracking-tight">
                    {sponsor.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
