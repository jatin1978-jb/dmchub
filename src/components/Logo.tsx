import React, { useState } from 'react';

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
  const [imgError, setImgError] = useState(false);

  const heightMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12 lg:h-14',
    lg: 'h-14 sm:h-16 lg:h-18',
    xl: 'h-18 sm:h-20 lg:h-22',
  };

  const logoPath = "/pcoxchange-logo.png";

  const imgElement = !imgError ? (
    <img
      src={logoPath}
      onError={() => setImgError(true)}
      alt="PCOXchange - Connecting Events, Delegates & Travel Solutions"
      className={`${heightMap[size]} w-auto object-contain shrink-0 max-w-full transition-all ${className}`}
    />
  ) : (
    <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#C5A059]/40 bg-[#0B1B2D] text-white ${heightMap[size]} text-sm ${className}`}>
      <span className="font-extrabold tracking-tight text-white">PCO</span>
      <span className="font-normal text-[#C5A059]">Xchange</span>
    </div>
  );

  if (darkNav) {
    return (
      <div className="inline-block rounded-xl bg-white p-2 shadow-md border border-[#C5A059]/30">
        {imgElement}
      </div>
    );
  }

  return imgElement;
}


