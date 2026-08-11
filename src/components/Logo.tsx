import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  darkNav?: boolean;
}

export default function Logo({
  className = '',
  size = 'md',
}: LogoProps) {
  const heightMap = {
    sm: 'h-16 sm:h-20',
    md: 'h-24 sm:h-32',
    lg: 'h-36 sm:h-44 lg:h-48',
    xl: 'h-56 sm:h-72',
  };

  return (
    <img
      src="/logo.png"
      alt="DMCXchange - Global DMC Marketplace"
      className={`${heightMap[size]} w-auto object-contain shrink-0 max-w-full drop-shadow-md transition-all ${className}`}
    />
  );
}
