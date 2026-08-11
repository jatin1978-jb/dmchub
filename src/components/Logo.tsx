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
    sm: 'h-10 sm:h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-20 sm:h-24',
    xl: 'h-28 sm:h-36',
  };

  return (
    <img
      src="/logo.png"
      alt="DMCXchange - Global DMC Marketplace"
      className={`${heightMap[size]} w-auto object-contain shrink-0 ${className}`}
    />
  );
}
