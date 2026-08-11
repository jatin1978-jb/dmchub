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

  // SVG Mark matching exact proportions of the uploaded logo image with zero clipping
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
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4AF37" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Outer Metallic Gold Square Frame with Bottom Center Gap */}
      {/* Top Border */}
      <line x1="20" y1="20" x2="120" y2="20" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />
      {/* Right Border */}
      <line x1="120" y1="20" x2="120" y2="120" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />
      {/* Left Border */}
      <line x1="20" y1="20" x2="20" y2="120" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />
      {/* Bottom Left Segment */}
      <line x1="20" y1="120" x2="52" y2="120" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />
      {/* Bottom Right Segment */}
      <line x1="88" y1="120" x2="120" y2="120" stroke="url(#logoGoldGrad)" strokeWidth="5.5" strokeLinecap="square" />

      {/* Dark Navy Serif Diagonal Stroke (\) */}
      <g>
        {/* Top Serif */}
        <path d="M 32 34 L 62 34 L 62 39 L 32 39 Z" fill={darkNav ? "#64748B" : "url(#logoNavyGrad)"} />
        {/* Upper diagonal section */}
        <path d="M 40 39 L 54 39 L 68 62 L 56 69 Z" fill={darkNav ? "#64748B" : "url(#logoNavyGrad)"} />
        {/* Lower diagonal section */}
        <path d="M 68 76 L 80 83 L 94 105 L 80 105 Z" fill={darkNav ? "#64748B" : "url(#logoNavyGrad)"} />
        {/* Bottom Serif */}
        <path d="M 68 105 L 102 105 L 102 100 L 68 100 Z" fill={darkNav ? "#64748B" : "url(#logoNavyGrad)"} />
      </g>

      {/* Gold Arrow Diagonal Stroke (/) - Continuous line crossing over */}
      {/* Bottom-left Serif foot */}
      <path d="M 32 105 L 56 105 L 56 101 L 32 101 Z" fill="url(#logoGoldGrad)" />
      
      {/* Main Diagonal Shaft */}
      <path
        d="M 38 101 L 48 101 L 104 36 L 95 28 Z"
        fill="url(#logoGoldGrad)"
      />

      {/* Sharp Arrowhead pointing Up-Right (Completely visible, zero clipping) */}
      <path
        d="M 90 42 L 118 24 L 100 52 L 96 43 Z"
        fill="url(#logoGoldGrad)"
        filter="url(#arrowGlow)"
      />
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

        {/* Subtitle / Tagline with Gold Side Lines */}
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
