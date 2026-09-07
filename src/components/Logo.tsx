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
  // Balanced, refined logo height dimensions
  const heightMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12 lg:h-14',
    lg: 'h-14 sm:h-16 lg:h-18',
    xl: 'h-18 sm:h-20 lg:h-22',
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
      <div className="inline-block rounded-xl bg-white p-1.5 shadow-md border border-[#C49A45]/30">
        {imgElement}
      </div>
    );
  }

  return imgElement;
}
