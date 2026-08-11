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
  const scaleMap = {
    sm: { scale: 0.6, height: 45 },
    md: { scale: 0.85, height: 60 },
    lg: { scale: 1.15, height: 80 },
    xl: { scale: 1.6, height: 110 },
  };

  const currentScale = scaleMap[size];
  const textColor = darkNav ? "#FFFFFF" : "#0A192F";
  const subTextColor = darkNav ? "#D4AF37" : "#0A192F";
  const navyFill = darkNav ? "#94A3B8" : "url(#brandNavyGrad)";

  // Full Pixel-Perfect SVG reproducing exact uploaded image (Icon Box + Custom Arrow X in Text + Tagline)
  if (variant === 'stacked') {
    return (
      <svg
        height={currentScale.height * 2.2}
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 overflow-visible ${className}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="brandGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9E782F" />
            <stop offset="35%" stopColor="#C5A059" />
            <stop offset="70%" stopColor="#F9E29C" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <linearGradient id="brandNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1B2D" />
            <stop offset="100%" stopColor="#162B44" />
          </linearGradient>
          <filter id="goldGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4AF37" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Large Top Square Icon Box */}
        <g transform="translate(110, 10)">
          {/* Gold Outer Frame with Bottom Gap */}
          <line x1="10" y1="10" x2="170" y2="10" stroke="url(#brandGoldGrad)" strokeWidth="7" />
          <line x1="170" y1="10" x2="170" y2="170" stroke="url(#brandGoldGrad)" strokeWidth="7" />
          <line x1="10" y1="10" x2="10" y2="170" stroke="url(#brandGoldGrad)" strokeWidth="7" />
          <line x1="10" y1="170" x2="72" y2="170" stroke="url(#brandGoldGrad)" strokeWidth="7" />
          <line x1="108" y1="170" x2="170" y2="170" stroke="url(#brandGoldGrad)" strokeWidth="7" />

          {/* Navy Solid Diagonal (\) */}
          <path d="M 28 32 L 72 32 L 72 39 L 28 39 Z" fill={navyFill} />
          <path d="M 38 39 L 60 39 L 142 143 L 120 143 Z" fill={navyFill} />
          <path d="M 108 143 L 152 143 L 152 149 L 108 149 Z" fill={navyFill} />

          {/* Gold Arrow Diagonal (/) with Crossover Gap */}
          {/* Bottom-left foot */}
          <path d="M 28 143 L 60 143 L 60 137 L 28 137 Z" fill="url(#brandGoldGrad)" />
          {/* Lower segment */}
          <path d="M 36 137 L 48 137 L 82 95 L 70 87 Z" fill="url(#brandGoldGrad)" />
          {/* Upper segment */}
          <path d="M 98 68 L 110 76 L 142 36 L 130 28 Z" fill="url(#brandGoldGrad)" />
          {/* Sharp Arrowhead pointing Up-Right */}
          <path d="M 124 44 L 164 16 L 138 58 L 132 46 Z" fill="url(#brandGoldGrad)" filter="url(#goldGlowEffect)" />
        </g>

        {/* 2. Text "DMC X change" with Custom Arrow X */}
        <g transform="translate(20, 235)">
          {/* DMC Text */}
          <text x="0" y="0" font-family="Times New Roman, Georgia, serif" font-size="54" font-weight="bold" fill={textColor}>DMC</text>
          
          {/* Custom Arrow X in Text */}
          <g transform="translate(136, -42) scale(0.36)">
            {/* Navy left stroke */}
            <path d="M 10 10 L 40 10 L 100 110 L 70 110 Z" fill={navyFill} />
            {/* Gold right stroke with arrow */}
            <path d="M 70 10 L 100 10 L 40 110 L 10 110 Z" fill="url(#brandGoldGrad)" />
            <path d="M 85 25 L 115 5 L 95 35 Z" fill="url(#brandGoldGrad)" />
          </g>

          {/* change Text */}
          <text x="182" y="0" font-family="Times New Roman, Georgia, serif" font-size="54" font-weight="normal" fill={textColor}>change</text>
        </g>

        {/* 3. Subtitle / Tagline */}
        <g transform="translate(20, 275)">
          <line x1="0" y1="-6" x2="45" y2="-6" stroke="url(#brandGoldGrad)" strokeWidth="1.5" />
          <text x="55" y="0" font-family="Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="4.5" fill={subTextColor}>GLOBAL DMC MARKETPLACE</text>
          <line x1="315" y1="-6" x2="360" y2="-6" stroke="url(#brandGoldGrad)" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  if (variant === 'icon') {
    return (
      <svg
        width={currentScale.height}
        height={currentScale.height}
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 overflow-visible ${className}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="iconGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9E782F" />
            <stop offset="35%" stopColor="#C5A059" />
            <stop offset="70%" stopColor="#F9E29C" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <linearGradient id="iconNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1B2D" />
            <stop offset="100%" stopColor="#162B44" />
          </linearGradient>
          <filter id="iconGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4AF37" floodOpacity="0.4" />
          </filter>
        </defs>

        <g transform="translate(5, 5)">
          <line x1="10" y1="10" x2="160" y2="10" stroke="url(#iconGoldGrad)" strokeWidth="6.5" />
          <line x1="160" y1="10" x2="160" y2="160" stroke="url(#iconGoldGrad)" strokeWidth="6.5" />
          <line x1="10" y1="10" x2="10" y2="160" stroke="url(#iconGoldGrad)" strokeWidth="6.5" />
          <line x1="10" y1="160" x2="68" y2="160" stroke="url(#iconGoldGrad)" strokeWidth="6.5" />
          <line x1="102" y1="160" x2="160" y2="160" stroke="url(#iconGoldGrad)" strokeWidth="6.5" />

          {/* Navy Solid Diagonal */}
          <path d="M 26 30 L 68 30 L 68 36 L 26 36 Z" fill={navyFill} />
          <path d="M 36 36 L 56 36 L 134 136 L 114 136 Z" fill={navyFill} />
          <path d="M 102 136 L 144 136 L 144 142 L 102 142 Z" fill={navyFill} />

          {/* Gold Arrow Diagonal */}
          <path d="M 26 136 L 56 136 L 56 130 L 26 130 Z" fill="url(#iconGoldGrad)" />
          <path d="M 34 130 L 44 130 L 78 88 L 68 80 Z" fill="url(#iconGoldGrad)" />
          <path d="M 94 62 L 104 70 L 134 32 L 124 24 Z" fill="url(#iconGoldGrad)" />
          <path d="M 118 40 L 156 12 L 132 52 L 126 42 Z" fill="url(#iconGoldGrad)" filter="url(#iconGlow)" />
        </g>
      </svg>
    );
  }

  // Horizontal Variant (Default) - Complete Logo matching uploaded image
  return (
    <svg
      height={currentScale.height}
      viewBox="0 0 460 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-visible ${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="hGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9E782F" />
          <stop offset="35%" stopColor="#C5A059" />
          <stop offset="70%" stopColor="#F9E29C" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="hNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1B2D" />
          <stop offset="100%" stopColor="#162B44" />
        </linearGradient>
        <filter id="hArrowGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4AF37" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Left Icon Box Mark */}
      <g transform="translate(10, 10)">
        <line x1="8" y1="8" x2="88" y2="8" stroke="url(#hGoldGrad)" strokeWidth="4.5" />
        <line x1="88" y1="8" x2="88" y2="88" stroke="url(#hGoldGrad)" strokeWidth="4.5" />
        <line x1="8" y1="8" x2="8" y2="88" stroke="url(#hGoldGrad)" strokeWidth="4.5" />
        <line x1="8" y1="88" x2="38" y2="88" stroke="url(#hGoldGrad)" strokeWidth="4.5" />
        <line x1="58" y1="88" x2="88" y2="88" stroke="url(#hGoldGrad)" strokeWidth="4.5" />

        {/* Navy Diagonal */}
        <path d="M 16 18 L 38 18 L 38 21 L 16 21 Z" fill={navyFill} />
        <path d="M 22 21 L 33 21 L 74 75 L 63 75 Z" fill={navyFill} />
        <path d="M 57 75 L 80 75 L 80 78 L 57 78 Z" fill={navyFill} />

        {/* Gold Arrow Diagonal with Crossover Gap */}
        <path d="M 16 75 L 32 75 L 32 72 L 16 72 Z" fill="url(#hGoldGrad)" />
        <path d="M 20 72 L 26 72 L 44 49 L 38 45 Z" fill="url(#hGoldGrad)" />
        <path d="M 52 38 L 58 42 L 75 20 L 69 16 Z" fill="url(#hGoldGrad)" />
        <path d="M 66 24 L 88 9 L 74 31 L 70 25 Z" fill="url(#hGoldGrad)" filter="url(#hArrowGlow)" />
      </g>

      {/* Right Brand Name & Subtitle */}
      <g transform="translate(118, 52)">
        {/* DMC Text */}
        <text x="0" y="0" font-family="Times New Roman, Georgia, serif" font-size="46" font-weight="bold" fill={textColor}>DMC</text>

        {/* Custom Gold Arrow X in Text */}
        <g transform="translate(116, -37) scale(0.32)">
          {/* Left Navy stroke */}
          <path d="M 10 10 L 36 10 L 90 100 L 64 100 Z" fill={navyFill} />
          {/* Right Gold stroke with arrow */}
          <path d="M 64 10 L 90 10 L 36 100 L 10 100 Z" fill="url(#hGoldGrad)" />
          <path d="M 78 22 L 106 4 L 88 32 Z" fill="url(#hGoldGrad)" />
        </g>

        {/* change Text */}
        <text x="156" y="0" font-family="Times New Roman, Georgia, serif" font-size="46" font-weight="normal" fill={textColor}>change</text>
      </g>

      {/* Subtitle / Tagline */}
      <g transform="translate(118, 85)">
        <line x1="0" y1="-5" x2="35" y2="-5" stroke="url(#hGoldGrad)" strokeWidth="1.2" opacity="0.8" />
        <text x="43" y="0" font-family="Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="3.2" fill={subTextColor}>GLOBAL DMC MARKETPLACE</text>
        <line x1="285" y1="-5" x2="320" y2="-5" stroke="url(#hGoldGrad)" strokeWidth="1.2" opacity="0.8" />
      </g>
    </svg>
  );
}
