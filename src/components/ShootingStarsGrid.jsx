import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ShootingStar = ({ id }) => {
  const [style, setStyle] = useState({ top: '0%', left: '0%', width: '2px', height: '0px', background: '', transform: '' });

  const resetStar = () => {
    const isVertical = Math.random() > 0.5;
    const isForward = Math.random() > 0.5;
    
    let top, left, width, height, background, x, y;

    if (isVertical) {
      width = '1px';
      height = '150px';
      left = `${Math.floor(Math.random() * 20) * 5}%`; // Align to grid
      top = isForward ? '-20%' : '110%';
      background = `linear-gradient(to ${isForward ? 'bottom' : 'top'}, rgba(250, 204, 21, 0.8), transparent)`;
      x = 0;
      y = isForward ? 1200 : -1200;
    } else {
      width = '150px';
      height = '1px';
      top = `${Math.floor(Math.random() * 20) * 5}%`; // Align to grid
      left = isForward ? '-20%' : '110%';
      background = `linear-gradient(to ${isForward ? 'right' : 'left'}, rgba(250, 204, 21, 0.8), transparent)`;
      x = isForward ? 2000 : -2000;
      y = 0;
    }

    setStyle({ top, left, width, height, background, x, y });
  };

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        x: style.x,
        y: style.y
      }}
      transition={{ 
        duration: 2 + Math.random() * 2, 
        ease: "linear",
        repeat: Infinity,
        delay: Math.random() * 10
      }}
      onUpdate={(latest) => {
        // We reset the "start" position when opacity is 0 if we wanted more variety, 
        // but simple repeat is fine for now.
      }}
      style={{
        position: 'absolute',
        top: style.top,
        left: style.left,
        width: style.width,
        height: style.height,
        background: style.background,
        zIndex: 0,
        filter: 'drop-shadow(0 0 5px rgba(250, 204, 21, 0.4))'
      }}
      onAnimationStart={resetStar}
    />
  );
};

const ShootingStarsGrid = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      {/* Shooting Stars - Increased count */}
      {[...Array(20)].map((_, i) => (
        <ShootingStar key={i} id={i} />
      ))}

      {/* Ambient Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow animation-delay-2000"></div>
    </div>
  );
};

export default ShootingStarsGrid;
