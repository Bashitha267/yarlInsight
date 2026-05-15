import React from 'react';

const About = () => {
  return (
    <section className="py-32 px-6 md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] opacity-30"></div>
          <div className="relative glass-card rounded-2xl overflow-hidden p-2">
            <img 
              className="w-full aspect-square md:aspect-video lg:aspect-square object-cover rounded-xl" 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" 
              alt="Students collaborating" 
            />
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
          </div>
          {/* Floating Card */}
          <div className="absolute -bottom-10 -right-6 md:-right-10 glass-card p-6 rounded-xl max-w-[240px] animate-bounce-slow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">group</span>
              </div>
              <div className="font-bold">Student Powered</div>
            </div>
            <p className="text-xs text-white/60">An initiative by students, for students, fostering a culture of peer-to-peer learning.</p>
          </div>
        </div>

        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-primary font-mono text-sm uppercase tracking-[0.3em]">The Initiative</h2>
            <h3 className="font-hanken text-4xl md:text-5xl text-white font-bold leading-tight">
              What is <span className="text-primary underline underline-offset-8 decoration-white/20">Yarl Insight?</span>
            </h3>
          </div>
          
          <p className="font-inter text-lg text-white/60 leading-relaxed">
            Yarl Insight 2.0 is a premier campus event designed to bridge the gap between academic learning and real-world innovation. We provide a platform for students to showcase their talents, learn from industry mentors, and network with fellow enthusiasts.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 glass-card rounded-xl group">
              <span className="material-symbols-outlined text-primary text-3xl mb-4 group-hover:scale-110 transition-transform block">lightbulb</span>
              <h4 className="font-bold text-white mb-2">Ideation Workshops</h4>
              <p className="text-sm text-white/50">Turn your creative concepts into structured projects with expert guidance.</p>
            </div>
            <div className="p-6 glass-card rounded-xl group">
              <span className="material-symbols-outlined text-primary text-3xl mb-4 group-hover:scale-110 transition-transform block">military_tech</span>
              <h4 className="font-bold text-white mb-2">Competitions</h4>
              <p className="text-sm text-white/50">Participate in hackathons and quizzes to test your skills and win prizes.</p>
            </div>
          </div>

          <button className="flex items-center gap-3 text-primary font-bold group hover:translate-x-2 transition-transform">
            Learn More About Us
            <span className="material-symbols-outlined">trending_flat</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
