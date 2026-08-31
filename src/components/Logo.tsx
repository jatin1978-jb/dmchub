import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  darkNav?: boolean;
}

export default function Logo({
  className = '',
  size = 'md',
  darkNav = false,
}: LogoProps) {
  const heightMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* Brand Vector Logo rendering dmcXchange */}
      <div className="flex flex-col">
        <div className="flex items-baseline font-serif tracking-tight text-[#1B4985] font-extrabold select-none">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight lowercase">dmc</span>
          
          {/* Custom X with ascending Gold Arrow */}
          <span className="relative inline-flex items-center justify-center text-3xl sm:text-4xl font-black text-[#1B4985] mx-0.5">
            X
            <svg 
              className="absolute -top-1 -right-1.5 w-5 h-5 text-[#C49A45] transform rotate-12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="5" y1="19" x2="19" y2="5" />
              <polyline points="12 5 19 5 19 12" />
            </svg>
          </span>
          
          <span className="text-2xl sm:text-3xl font-normal lowercase tracking-tight">change</span>
        </div>
        
        {/* Tagline flanked by Gold Lines */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="h-[1.5px] w-3 bg-[#C49A45]" />
          <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-tight text-[#1B4985]/80 uppercase">
            Global marketplace connecting DMC's & Travel ecosystem
          </span>
          <span className="h-[1.5px] w-3 bg-[#C49A45]" />
        </div>
      </div>
    </div>
  );
}
