import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        {/* Modern geometric loader */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-gray-100 rounded-full"></div>
          
          {/* Animated ring */}
          <div 
            className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent rounded-full animate-spin" 
            style={{
              borderTopColor: '#0017E7', 
              borderRightColor: '#0017E7'
            }}
          ></div>
          
          {/* Inner pulsing dot */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse" 
            style={{backgroundColor: '#0017E7'}}
          ></div>
          
          {/* Orbiting dots */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 animate-spin" 
            style={{animationDuration: '3s'}}
          >
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full" 
              style={{backgroundColor: '#0017E7', opacity: '0.7'}}
            ></div>
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full" 
              style={{backgroundColor: '#0017E7', opacity: '0.5'}}
            ></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="mt-8 text-center">
          <h2 
            className="text-2xl font-bold mb-2" 
            style={{color: '#0017E7'}}
          >
            Loading
          </h2>
          <p className="text-gray-500 text-sm">
            Please wait while we prepare your content...
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="mt-6 w-64 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full animate-pulse" 
            style={{backgroundColor: '#0017E7'}}
          ></div>
        </div>
        
        {/* Floating elements */}
        <div 
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-bounce opacity-30" 
          style={{
            backgroundColor: '#0017E7', 
            animationDelay: '0s'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full animate-bounce opacity-40" 
          style={{
            backgroundColor: '#0017E7', 
            animationDelay: '0.5s'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full animate-bounce opacity-35" 
          style={{
            backgroundColor: '#0017E7', 
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/3 w-1 h-1 rounded-full animate-bounce opacity-45" 
          style={{
            backgroundColor: '#0017E7', 
            animationDelay: '1.5s'
          }}
        ></div>
        
        {/* Additional spinning ring for more depth */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-gray-50 rounded-full animate-spin opacity-30" 
          style={{
            animationDuration: '4s', 
            animationDirection: 'reverse'
          }}
        ></div>
      </div>
    </div>
  );
};

export default Preloader;