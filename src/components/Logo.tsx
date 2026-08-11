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
    lg: { icon: 84, text: 'text-4xl sm:text-5xl', sub: 'text-[15px]' },
    xl: { icon: 110, text: 'text-6xl sm:text-7xl', sub: 'text-lg' },
  };

  const currentSize = sizeMap[size];

  // SVG Mark matching exact proportions of the uploaded logo image
  const IconMark = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-md"
    >
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9E782F" />
          <stop offset="30%" stopColor="#C5A059" />
          <stop offset="65%" stopColor="#F9E29C" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="logoNavy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1B2D" />
          <stop offset="100%" stopColor="#162B44" />
        </linearGradient>
      </defs>

      {/* Outer Metallic Gold Square Frame */}
      <rect
        x="14"
        y="14"
        width="92"
        height="92"
        fill="none"
        stroke="url(#logoGold)"
        strokeWidth="6"
        rx="2"
      />

      {/* Navy Serif Diagonal (\) */}
      <g>
        <path
          d="M 38 30 L 50 30 L 80 90 L 68 90 Z"
          fill={darkNav ? "#64748B" : "url(#logoNavy)"}
        />
        {/* Top Serif */}
        <path d="M 32 30 L 56 30 L 56 35 L 32 35 Z" fill={darkNav ? "#94A3B8" : "url(#logoNavy)"} />
        {/* Bottom Serif */}
        <path d="M 62 90 L 86 90 L 86 85 L 62 85 Z" fill={darkNav ? "#94A3B8" : "url(#logoNavy)"} />
      </g>

      {/* Gold Arrow Diagonal Stroke (/) */}
      <path
        d="M 30 90 L 42 90 L 80 34 L 74 28 Z"
        fill="url(#logoGold)"
      />

      {/* Arrow Head pointing up-right */}
      <path
        d="M 64 40 L 92 22 L 78 52 L 72 43 Z"
        fill="url(#logoGold)"
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
        {/* Brand Name - Large & Bold */}
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
