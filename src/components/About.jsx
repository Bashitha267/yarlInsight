import React from 'react';
import whyImage from '../assets/why_imge.jpg';

const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] opacity-30"></div>
          <div className="relative glass-card rounded-2xl overflow-hidden p-2">
            <img 
              className="w-full aspect-square md:aspect-video lg:aspect-square object-cover rounded-xl" 
              src={whyImage} 
              alt="Why Attend YarlInsight" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
          </div>
          {/* Floating Card */}
          <div className="absolute -bottom-10 -right-6 md:-right-10 glass-card p-6 rounded-xl max-w-[240px] animate-bounce-slow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">school</span>
              </div>
              <div className="font-bold">Expert Led</div>
            </div>
            <p className="text-xs text-white/60">Hosted by the IEEE Student Branch of the University of Jaffna.</p>
          </div>
        </div>

        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-primary font-mono text-sm uppercase tracking-[0.3em]">About YarlInsight</h2>
            <h3 className="font-hanken text-4xl md:text-5xl text-white font-bold leading-tight">
              Why Attend <span className="text-primary underline underline-offset-8 decoration-white/20">YarlInsight?</span>
            </h3>
          </div>
          
          <p className="font-inter text-lg text-white/60 leading-relaxed">
            YarlInsight brings together industry experts, academic leaders, and passionate students for an immersive learning experience in Fullstack Development with MERN Stack.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: 'psychology', title: 'Expert-Led Sessions', desc: 'Learn from industry experts in various fields of web development and cloud computing.' },
              { icon: 'handshake', title: 'Hands-On Learning', desc: 'Engage in practical workshops to apply what you learn in real-time projects.' },
              { icon: 'layers', title: 'Comprehensive Coverage', desc: 'Gain knowledge across a broad spectrum of web development topics.' },
              { icon: 'hub', title: 'Networking Opportunities', desc: 'Connect with peers and professionals to expand your professional network.' },
              { icon: 'explore', title: 'Career Guidance', desc: 'Receive expert advice and guidance for advancing your career in technology.' },
              { icon: 'diversity_3', title: 'Inclusive Environment', desc: 'A vibrant and inclusive learning environment for students and professionals.' }
            ].map((item, i) => (
              <div key={i} className="p-6 glass-card rounded-xl group hover:border-primary/50 transition-all">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 group-hover:scale-110 transition-transform block">{item.icon}</span>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
