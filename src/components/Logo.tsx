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
    sm: 'h-10 sm:h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-20 sm:h-24 lg:h-28',
    xl: 'h-32 sm:h-40',
  };

  return (
    <img
      src="/logo-transparent.png"
      alt="DMCXchange - Global DMC Marketplace"
      className={`${heightMap[size]} w-auto object-contain shrink-0 max-w-full transition-all ${darkNav ? 'brightness-125 contrast-125' : ''} ${className}`}
    />
  );
}
