import React from 'react';

// Elegant SVG Calla Lily (Copo-de-leite) Floral Illustration
export const CallaLilyFlower: React.FC<{ className?: string }> = ({ className = "w-16 h-24" }) => (
  <svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Stems */}
    <path
      d="M60 175 C 60 130, 58 100, 55 60"
      stroke="#2D5A3E"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M58 175 C 65 140, 72 110, 76 80"
      stroke="#3A6B4C"
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity="0.8"
    />

    {/* Eucalyptus / Floral leaf */}
    <path
      d="M58 130 C 40 125, 20 105, 28 85 C 42 78, 55 100, 58 120"
      fill="#4E785B"
      opacity="0.9"
    />
    <path
      d="M58 110 C 75 105, 95 90, 88 70 C 74 65, 62 85, 60 100"
      fill="#3D6349"
      opacity="0.85"
    />

    {/* Calla Lily Petal Outer Shadow (Copo de Leite) */}
    <path
      d="M48 65 C 38 50, 42 30, 55 20 C 65 12, 75 12, 85 22 C 95 32, 98 52, 86 68 C 76 80, 58 80, 48 65 Z"
      fill="#F0EFEA"
      stroke="#D6D3C7"
      strokeWidth="1.2"
    />

    {/* Inner sculptural white petal curve */}
    <path
      d="M52 62 C 45 48, 50 28, 62 18 C 72 10, 80 14, 88 26 C 94 38, 92 56, 80 66 C 70 74, 58 72, 52 62 Z"
      fill="#FCFCFA"
    />

    {/* Golden Spadix (Espádice dourado do copo de leite) */}
    <path
      d="M66 50 C 68 40, 70 28, 71 22 C 72 19, 75 20, 74 24 C 73 32, 70 44, 68 52 Z"
      fill="#D4AF37"
    />
    <path
      d="M67 46 C 68 38, 70 30, 71 24"
      stroke="#E5C158"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Subtle shading inside throat */}
    <path
      d="M58 58 C 64 52, 74 54, 78 60 C 74 64, 62 64, 58 58 Z"
      fill="#E5DFD0"
      opacity="0.6"
    />
  </svg>
);

// Botanical Floral Garland / Divider
export const BotanicalDivider: React.FC<{ className?: string }> = ({ className = "my-8" }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#8FA392] to-[#2D5A3E]/40" />
    <svg className="w-6 h-6 text-[#2D5A3E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C12 2 13.5 6 17 7C13.5 8 12 12 12 12C12 12 10.5 8 7 7C10.5 6 12 2 12 2Z" fill="#C5A059" stroke="#C5A059" />
      <path d="M12 12C12 12 13.5 16 17 17C13.5 18 12 22 12 22C12 22 10.5 18 7 17C10.5 16 12 12 12 12Z" fill="#2D5A3E" stroke="#2D5A3E" />
    </svg>
    <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#8FA392] to-[#2D5A3E]/40" />
  </div>
);

// Crest Monogram with Intertwined Botanical Laurel & Calla Lilies
export const WeddingMonogram: React.FC<{ initials?: string; className?: string }> = ({
  initials = "S & G",
  className = "w-32 h-32",
}) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
      {/* Outer delicate oval wreath */}
      <circle cx="80" cy="80" r="72" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.6" />
      <circle cx="80" cy="80" r="66" stroke="#2D5A3E" strokeWidth="1" opacity="0.4" />
      
      {/* Left botanical branch */}
      <path
        d="M32 95 C 28 70, 42 40, 68 26"
        stroke="#2D5A3E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="34" cy="82" r="3" fill="#4E785B" />
      <circle cx="42" cy="62" r="3.5" fill="#4E785B" />
      <circle cx="56" cy="42" r="3.5" fill="#4E785B" />
      <circle cx="70" cy="28" r="2.5" fill="#C5A059" />

      {/* Right botanical branch */}
      <path
        d="M128 95 C 132 70, 118 40, 92 26"
        stroke="#2D5A3E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="126" cy="82" r="3" fill="#4E785B" />
      <circle cx="118" cy="62" r="3.5" fill="#4E785B" />
      <circle cx="104" cy="42" r="3.5" fill="#4E785B" />
      <circle cx="90" cy="28" r="2.5" fill="#C5A059" />

      {/* Bottom intertwined leaf knot */}
      <path
        d="M60 135 C 75 142, 85 142, 100 135"
        stroke="#2D5A3E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M72 136 C 80 130, 88 130, 88 136"
        stroke="#C5A059"
        strokeWidth="1.5"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <span className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-light text-[#1C3829] tracking-widest">
        {initials}
      </span>
      <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-medium -mt-0.5">
        17 · 10 · 2026
      </span>
    </div>
  </div>
);

// Botanical Corner Vignette
export const BotanicalCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  const rotation = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  }[position];

  return (
    <div className={`pointer-events-none select-none opacity-40 ${rotation} ${className}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path
          d="M6 6 C 6 50, 20 80, 70 100"
          stroke="#2D5A3E"
          strokeWidth="1.2"
        />
        <path
          d="M6 6 C 50 6, 80 20, 100 70"
          stroke="#2D5A3E"
          strokeWidth="1.2"
        />
        {/* Leaves */}
        <path d="M18 25 C 28 20, 36 28, 30 36 C 22 36, 18 28, 18 25 Z" fill="#4E785B" opacity="0.6" />
        <path d="M25 18 C 20 28, 28 36, 36 30 C 36 22, 28 18, 25 18 Z" fill="#4E785B" opacity="0.6" />
        <path d="M38 48 C 50 42, 58 50, 52 60 C 42 60, 36 52, 38 48 Z" fill="#3D6349" opacity="0.5" />
        <circle cx="12" cy="12" r="3" fill="#C5A059" />
      </svg>
    </div>
  );
};
