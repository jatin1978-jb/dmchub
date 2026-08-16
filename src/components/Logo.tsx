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
  darkNav = false,
}: LogoProps) {
  const heightMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16 lg:h-18',
    xl: 'h-20 sm:h-24',
  };

  const imgElement = (
    <img
      src="/logo-transparent.png"
      alt="DMCXchange - Global DMC Marketplace"
      className={`${heightMap[size]} w-auto object-contain shrink-0 max-w-full transition-all ${className}`}
    />
  );

  if (darkNav) {
    return (
      <div className="inline-block rounded-xl bg-white p-2 sm:p-2.5 shadow-md border border-[#C5A059]/35">
        {imgElement}
      </div>
    );
  }

  return imgElement;
}
