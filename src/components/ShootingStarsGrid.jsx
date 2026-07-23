import React, { useEffect, useState } from 'react';

const ShootingStarsGrid = () => {
  const [horizontalLines, setHorizontalLines] = useState([]);
  const [verticalLines, setVerticalLines] = useState([]);

  useEffect(() => {
    // Generate horizontal glowing shooting star streaks
    const hLines = [
      { id: 'h1', top: '15%', width: '140px', duration: '6s', delay: '0s', color: 'rgba(249, 168, 37, 0.9)' },
      { id: 'h2', top: '28%', width: '220px', duration: '8s', delay: '2s', color: 'rgba(249, 168, 37, 0.7)' },
      { id: 'h3', top: '42%', width: '180px', duration: '5s', delay: '4s', color: 'rgba(245, 127, 23, 0.85)' },
      { id: 'h4', top: '60%', width: '260px', duration: '9s', delay: '1s', color: 'rgba(249, 168, 37, 0.8)' },
      { id: 'h5', top: '75%', width: '150px', duration: '7s', delay: '5s', color: 'rgba(59, 130, 246, 0.8)' },
      { id: 'h6', top: '88%', width: '200px', duration: '6.5s', delay: '3s', color: 'rgba(249, 168, 37, 0.9)' },
    ];

    // Generate vertical glowing shooting star streaks
    const vLines = [
      { id: 'v1', left: '22%', height: '160px', duration: '7s', delay: '1.5s', color: 'rgba(249, 168, 37, 0.7)' },
      { id: 'v2', left: '48%', height: '200px', duration: '9s', delay: '3.5s', color: 'rgba(59, 130, 246, 0.6)' },
      { id: 'v3', left: '72%', height: '140px', duration: '6s', delay: '0.5s', color: 'rgba(249, 168, 37, 0.8)' },
    ];

    setHorizontalLines(hLines);
    setVerticalLines(vLines);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none transform-gpu">
      {/* Subtle, Faint Background Grid */}
      <div 
        className="absolute inset-0 opacity-15" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Animated Horizontal Shooting Star Streaks */}
      <div className="absolute inset-0 overflow-hidden">
        {horizontalLines.map((line) => (
          <div
            key={line.id}
            className="absolute h-[2px] rounded-full animate-shoot-horizontal"
            style={{
              top: line.top,
              width: line.width,
              background: `linear-gradient(90deg, transparent 0%, ${line.color} 50%, transparent 100%)`,
              boxShadow: `0 0 12px ${line.color}, 0 0 20px ${line.color}`,
              animationDuration: line.duration,
              animationDelay: line.delay,
            }}
          />
        ))}
      </div>

      {/* Animated Vertical Shooting Star Streaks */}
      <div className="absolute inset-0 overflow-hidden">
        {verticalLines.map((line) => (
          <div
            key={line.id}
            className="absolute w-[2px] rounded-full animate-shoot-vertical"
            style={{
              left: line.left,
              height: line.height,
              background: `linear-gradient(180deg, transparent 0%, ${line.color} 50%, transparent 100%)`,
              boxShadow: `0 0 12px ${line.color}, 0 0 20px ${line.color}`,
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
