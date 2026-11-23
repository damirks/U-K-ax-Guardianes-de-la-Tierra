import React, { useState } from 'react';
import ixchelPortrait from '../assets/images/npc_ixchel_guide_1794947175518.jpg';
import merchantPortrait from '../assets/images/npc_mercado_elder_1794947176582.jpg';

interface NPCAvatarProps {
  variant?: 'guide' | 'merchant';
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  speaking?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<NPCAvatarProps['size']>, string> = {
  xs: 'w-9 h-9 rounded-xl',
  sm: 'w-12 h-12 rounded-xl',
  md: 'w-16 h-16 rounded-2xl',
  lg: 'w-20 h-20 sm:w-24 sm:h-24 rounded-2xl',
  xl: 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl',
};

export const NPCAvatar: React.FC<NPCAvatarProps> = ({
  variant = 'guide',
  name,
  size = 'md',
  speaking = false,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const src = variant === 'merchant' ? merchantPortrait : ixchelPortrait;
  const altText =
    variant === 'merchant'
      ? name || 'Don Balam · Marchante del Mercado Maya'
      : name || 'Ixchel · Guía Ancestral Maya';

  return (
    <div
      className={`relative shrink-0 overflow-hidden border-2 border-amber-400/85 bg-gradient-to-b from-emerald-950 to-slate-950 shadow-[0_6px_20px_rgba(0,0,0,0.55)] transition-transform duration-200 ${
        SIZE_CLASSES[size]
      } ${speaking ? 'scale-105 ring-2 ring-amber-300/80' : ''} ${className}`}
    >
      {!imgError ? (
        <img
          src={src}
          alt={altText}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top select-none"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900 to-amber-950 text-amber-200 font-pixel text-xs">
          <span>{variant === 'merchant' ? 'M' : 'I'}</span>
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/15 rounded-[inherit]"
      />
    </div>
  );
};
