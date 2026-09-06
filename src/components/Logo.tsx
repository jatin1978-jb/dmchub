import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  darkNav?: boolean;
}

export default function Logo({
  className = '',
  size = 'lg',
  darkNav = false,
}: LogoProps) {
  // Dramatically increased logo height sizes
  const heightMap = {
    sm: 'h-14 sm:h-16',
    md: 'h-20 sm:h-24',
    lg: 'h-24 sm:h-28 lg:h-32',
    xl: 'h-32 sm:h-36 lg:h-40',
  };

  const imgElement = (
    <img
      src="/logo-official.jpg"
      alt="dmcXchange - Global Marketplace Connecting DMC's & Travel Ecosystem"
      className={`${heightMap[size]} w-auto object-contain shrink-0 max-w-full transition-all ${className}`}
    />
  );

  if (darkNav) {
    return (
      <div className="inline-block rounded-2xl bg-white p-2 sm:p-3 shadow-lg border border-[#C49A45]/30">
        {imgElement}
      </div>
    );
  }

  return imgElement;
}
