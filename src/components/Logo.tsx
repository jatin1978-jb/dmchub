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
    sm: 'h-9 sm:h-10',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-18 lg:h-20',
    xl: 'h-24 sm:h-28',
  };

  return (
    <img
      src="/logo-transparent.png"
      alt="DMCXchange - Global DMC Marketplace"
      className={`${heightMap[size]} w-auto object-contain shrink-0 max-w-full transition-all ${darkNav ? 'brightness-125 contrast-125' : ''} ${className}`}
    />
  );
}
