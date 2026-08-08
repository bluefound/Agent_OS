'use client';

import React from 'react';

interface MatchDialProps {
  score: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const MatchDial: React.FC<MatchDialProps> = ({
  score,
  size = 'md',
  label,
  className = '',
}) => {
  // Clamp score
  const clampedScore = Math.min(100, Math.max(0, Math.round(score)));

  // Size dimensions
  const sizeMap = {
    sm: { dimension: 44, strokeWidth: 3.5, fontSize: 'text-xs', labelSize: 'text-[9px]' },
    md: { dimension: 64, strokeWidth: 4.5, fontSize: 'text-base', labelSize: 'text-[10px]' },
    lg: { dimension: 96, strokeWidth: 6, fontSize: 'text-2xl', labelSize: 'text-xs' },
  };

  const config = sizeMap[size];
  const radius = (config.dimension - config.strokeWidth * 2) / 2;
  const center = config.dimension / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <div
        className="relative flex items-center justify-center"
        style={{ width: config.dimension, height: config.dimension }}
      >
        <svg
          width={config.dimension}
          height={config.dimension}
          className="transform -rotate-90"
        >
          {/* Muted Track Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={config.strokeWidth}
          />
          {/* Accent Arc Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#B8F35A"
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        {/* Centered Score in Mono Numeral Face */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-mono-data font-bold tracking-tight text-[#F3F4F6] ${config.fontSize}`}>
            {clampedScore}%
          </span>
        </div>
      </div>
      {label && (
        <span className={`mt-1.5 font-medium uppercase tracking-wider text-muted-foreground ${config.labelSize}`}>
          {label}
        </span>
      )}
    </div>
  );
};
