import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

const SplineScene = ({ scene, className = "" }) => {
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
        />
        {/* Hides the Spline watermark on free tier */}
        <div className="absolute bottom-0 right-0 w-[150px] h-[40px] bg-black z-10" />
      </Suspense>
    </div>
  );
};

export default SplineScene;
