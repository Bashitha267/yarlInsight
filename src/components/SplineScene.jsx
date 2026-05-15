import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

const SplineScene = ({ scene, className = "" }) => {
  const [error, setError] = React.useState(null);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-surface-higher rounded-2xl border border-white/10 ${className}`}>
        <p className="text-white/40 text-sm">Failed to load 3D scene. Please refresh or check your connection.</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-full min-h-[400px] md:min-h-[600px] relative transition-opacity duration-1000 ${className}`}>
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <Spline 
          scene={scene} 
          className="w-full h-full"
          onError={() => setError(true)}
        />
        {/* Hides the Spline watermark on free tier */}
        <div className="absolute bottom-0 right-0 w-[180px] h-[60px] bg-black z-10 pointer-events-none" />
      </Suspense>
    </div>
  );
};

export default SplineScene;
