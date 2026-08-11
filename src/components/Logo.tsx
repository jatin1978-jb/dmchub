import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  darkNav?: boolean;
}

export default function Logo({
  variant = 'horizontal',
  className = '',
  size = 'md',
  darkNav = false
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 48, text: 'text-2xl sm:text-3xl', sub: 'text-[11px]' },
    md: { icon: 64, text: 'text-3xl sm:text-4xl', sub: 'text-[13px]' },
    lg: { icon: 88, text: 'text-4xl sm:text-5xl', sub: 'text-[15px]' },
    xl: { icon: 120, text: 'text-6xl sm:text-7xl', sub: 'text-lg' },
  };

  const currentSize = sizeMap[size];

  // SVG Mark matching exact proportions and gap geometry of the uploaded logo image
  const IconMark = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 overflow-visible drop-shadow-sm"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="logoGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A47E32" />
          <stop offset="35%" stopColor="#C5A059" />
          <stop offset="70%" stopColor="#FBE6A3" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="logoNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1B2D" />
          <stop offset="100%" stopColor="#162B44" />
        </linearGradient>
        <filter id="arrowGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#D4AF37" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* 1. Outer Metallic Gold Square Frame with Bottom Gap */}
      <line x1="20" y1="20" x2="120" y2="20" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />
      <line x1="120" y1="20" x2="120" y2="120" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />
      <line x1="20" y1="20" x2="20" y2="120" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />
      <line x1="20" y1="120" x2="52" y2="120" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />
      <line x1="88" y1="120" x2="120" y2="120" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />

      {/* 2. Solid Continuous Navy Diagonal Stroke (\) */}
      <g>
        {/* Top Serif */}
        <path d="M 30 32 L 64 32 L 64 37 L 30 37 Z" fill={darkNav ? "#64748B" : "url(#logoNavyGrad)"} />
        {/* Solid Main Navy Bar */}
        <path d="M 38 37 L 54 37 L 102 103 L 86 103 Z" fill={darkNav ? "#64748B" : "url(#logoNavyGrad)"} />
        {/* Bottom Serif */}
        <path d="M 76 103 L 110 103 L 110 108 L 76 108 Z" fill={darkNav ? "#64748B" : "url(#logoNavyGrad)"} />
      </g>

      {/* 3. Gold Arrow Stroke (/) with Center Gap Cutover */}
      {/* Bottom-left Serif Foot */}
      <path d="M 30 103 L 54 103 L 54 99 L 30 99 Z" fill="url(#logoGoldGrad)" />

      {/* Lower Gold Segment (stopping before navy bar with elegant gap) */}
      <path d="M 36 99 L 45 99 L 63 74 L 56 69 Z" fill="url(#logoGoldGrad)" />

      {/* Upper Gold Segment (resuming above navy bar with elegant gap) */}
      <path d="M 76 56 L 83 61 L 101 35 L 94 30 Z" fill="url(#logoGoldGrad)" />

      {/* Sharp Golden Arrowhead pointing Up-Right */}
      <path d="M 88 38 L 116 20 L 98 48 L 94 40 Z" fill="url(#logoGoldGrad)" filter="url(#arrowGlow)" />
    </svg>
  );

  if (variant === 'icon') {
    return <IconMark />;
  }

  // Text color based on header/background theme
  const primaryTextColor = darkNav ? 'text-white' : 'text-[#0B1B2D]';
  const subTextColor = darkNav ? 'text-[#D4AF37]' : 'text-[#0B1B2D]';
  const lineBg = darkNav ? 'from-transparent via-[#D4AF37] to-transparent' : 'from-transparent via-[#C5A059] to-transparent';

  return (
    <div className={`flex ${variant === 'stacked' ? 'flex-col items-center text-center gap-3' : 'items-center gap-4'} ${className}`}>
      <IconMark />
      <div className="flex flex-col justify-center">
        {/* Brand Name */}
        <div className={`font-serif tracking-tight flex items-baseline leading-none ${currentSize.text}`}>
          <span className={`font-bold ${primaryTextColor}`}>
            DMC
          </span>
          <span className="font-extrabold text-[#C5A059] mx-[1px]">
            X
          </span>
          <span className={`font-normal ${primaryTextColor}`}>
            change
          </span>
        </div>

        {/* Subtitle / Tagline */}
        <div className="flex items-center gap-2 mt-2">
          <span className={`h-[1.5px] w-6 bg-gradient-to-r ${lineBg} opacity-80`} />
          <span className={`uppercase tracking-[0.26em] font-semibold ${currentSize.sub} ${subTextColor}`}>
            Global DMC Marketplace
          </span>
          <span className={`h-[1.5px] w-6 bg-gradient-to-l ${lineBg} opacity-80`} />
        </div>
      </div>
    </div>
  );
}
