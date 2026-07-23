import React, { useEffect, useState } from 'react';

const ShootingStarsGrid = () => {
  const [horizontalLines, setHorizontalLines] = useState([]);
  const [verticalLines, setVerticalLines] = useState([]);

  useEffect(() => {
    // Smooth, low-brightness shooting star streaks
    const hLines = [
      { id: 'h1', top: '15%', width: '150px', duration: '8s', delay: '0s', color: 'rgba(249, 168, 37, 0.5)' },
      { id: 'h2', top: '28%', width: '180px', duration: '11s', delay: '0s', color: 'rgba(249, 168, 37, 0.6)' },
      { id: 'h3', top: '45%', width: '150px', duration: '7s', delay: '0s', color: 'rgba(245, 127, 23, 0.7)' },
      { id: 'h4', top: '62%', width: '220px', duration: '12s', delay: '0s', color: 'rgba(249, 168, 37, 0.6)' },
      { id: 'h5', top: '78%', width: '130px', duration: '9s', delay: '0s', color: 'rgba(59, 130, 246, 0.6)' },
      { id: 'h6', top: '90%', width: '160px', duration: '8.5s', delay: '0s', color: 'rgba(249, 168, 37, 0.4)' },
    ];

    const vLines = [
      { id: 'v1', left: '22%', height: '140px', duration: '10s', delay: '0s', color: 'rgba(249, 168, 37, 0.6)' },
      { id: 'v2', left: '50%', height: '160px', duration: '12s', delay: '0s', color: 'rgba(59, 130, 246, 0.56)' },
      { id: 'v3', left: '78%', height: '120px', duration: '9s', delay: '0s', color: 'rgba(249, 168, 37, 0.65)' },
    ];

    setHorizontalLines(hLines);
    setVerticalLines(vLines);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none transform-gpu">
      {/* Soft, Faint Dark Background Grid */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Subtle Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Smooth Horizontal Shooting Star Streaks */}
      <div className="absolute inset-0 overflow-hidden">
        {horizontalLines.map((line) => (
          <div
            key={line.id}
            className="absolute h-[1px] rounded-full animate-shoot-horizontal"
            style={{
              top: line.top,
              width: line.width,
              background: `linear-gradient(90deg, transparent 0%, ${line.color} 50%, transparent 100%)`,
              boxShadow: `0 0 6px ${line.color}`,
              animationDuration: line.duration,
              animationDelay: line.delay,
            }}
          />
        ))}
      </div>

      {/* Smooth Vertical Shooting Star Streaks */}
      <div className="absolute inset-0 overflow-hidden">
        {verticalLines.map((line) => (
          <div
            key={line.id}
            className="absolute w-[1px] rounded-full animate-shoot-vertical"
            style={{
              left: line.left,
              height: line.height,
              background: `linear-gradient(180deg, transparent 0%, ${line.color} 50%, transparent 100%)`,
              boxShadow: `0 0 6px ${line.color}`,
              animationDuration: line.duration,
              animationDelay: line.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ShootingStarsGrid;
