import React from 'react';

interface VeloxLogoProps {
  size?: number;
  variant?: 'full' | 'icon' | 'light';
  className?: string;
}

const VeloxLogoIcon: React.FC<{ size?: number; variant?: 'full' | 'icon' | 'light' }> = ({ size = 36, variant = 'full' }) => {
  const isDark = variant !== 'light';
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.3))',
      }}
    >
      <defs>
        <linearGradient id="veloxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      
      {/* Rounded square background */}
      <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#veloxGradient)" />
      
      {/* VF Text - Bold, italic, geometric */}
      <text
        x="18"
        y="24"
        fontFamily="Inter, sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
        style={{
          fontStyle: 'italic',
          letterSpacing: '-1px',
        }}
      >
        VF
      </text>
    </svg>
  );
};

export const VeloxLogoIconOnly: React.FC<VeloxLogoProps> = ({ size = 36 }) => {
  return (
    <div
      className="hover:drop-shadow-lg transition-all duration-300"
      aria-label="Velox Fintech Logo"
    >
      <VeloxLogoIcon size={size} variant="icon" />
    </div>
  );
};

export const VeloxLogoLight: React.FC<VeloxLogoProps> = ({ size = 36, className = '' }) => {
  return (
    <div
      className={`flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 ${className}`}
      aria-label="Velox Fintech Logo"
    >
      <VeloxLogoIcon size={size} variant="light" />
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-bold tracking-tight text-slate-900">VELOX</span>
        <span className="text-xs font-light tracking-widest text-slate-500">FINTECH</span>
      </div>
    </div>
  );
};

const VeloxLogo: React.FC<VeloxLogoProps> = ({ size = 36, variant = 'full', className = '' }) => {
  const isDark = variant !== 'light';
  const textColor = isDark ? 'text-slate-100' : 'text-slate-900';
  const mutedColor = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div
      className={`flex items-center gap-3 hover:opacity-90 transition-all duration-300 ${className}`}
      aria-label="Velox Fintech Logo"
      role="img"
    >
      <VeloxLogoIcon size={size} variant={variant} />
      <div className="flex flex-col leading-tight">
        <span className={`text-base font-bold tracking-tight ${textColor}`}>
          VELOX
        </span>
        <span
          className={`text-xs font-light tracking-widest ${mutedColor}`}
          style={{ letterSpacing: '0.15em' }}
        >
          FINTECH
        </span>
      </div>
    </div>
  );
};

export default VeloxLogo;
