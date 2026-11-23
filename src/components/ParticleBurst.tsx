import React from 'react';

interface ParticleBurstProps {
  variant?: 'burst' | 'rain';
  className?: string;
}

interface ParticleSpec {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  rot: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  symbol?: string;
}

const BURST_PARTICLES: ParticleSpec[] = [
  { id: 1, x: 50, y: 45, tx: -160, ty: -140, rot: -220, delay: 0.0, duration: 0.95, size: 12, color: '#fbbf24', symbol: '✨' },
  { id: 2, x: 50, y: 45, tx: 155, ty: -135, rot: 210, delay: 0.03, duration: 0.95, size: 12, color: '#34d399', symbol: '⭐' },
  { id: 3, x: 50, y: 45, tx: -115, ty: -190, rot: -160, delay: 0.05, duration: 1.05, size: 10, color: '#38bdf8' },
  { id: 4, x: 50, y: 45, tx: 110, ty: -185, rot: 185, delay: 0.04, duration: 1.0, size: 10, color: '#f59e0b' },
  { id: 5, x: 50, y: 45, tx: -195, ty: -45, rot: -270, delay: 0.02, duration: 0.9, size: 9, color: '#fde047' },
  { id: 6, x: 50, y: 45, tx: 190, ty: -55, rot: 260, delay: 0.06, duration: 0.9, size: 9, color: '#10b981' },
  { id: 7, x: 50, y: 45, tx: -65, ty: -210, rot: -120, delay: 0.08, duration: 1.1, size: 14, color: '#fde047', symbol: '🌟' },
  { id: 8, x: 50, y: 45, tx: 60, ty: -205, rot: 140, delay: 0.07, duration: 1.1, size: 12, color: '#6ee7b7', symbol: '🍃' },
  { id: 9, x: 50, y: 45, tx: -145, ty: 75, rot: -190, delay: 0.04, duration: 1.0, size: 9, color: '#fb7185' },
  { id: 10, x: 50, y: 45, tx: 145, ty: 85, rot: 200, delay: 0.05, duration: 1.0, size: 9, color: '#38bdf8' },
  { id: 11, x: 50, y: 45, tx: -85, ty: 115, rot: -140, delay: 0.09, duration: 1.05, size: 8, color: '#fbbf24' },
  { id: 12, x: 50, y: 45, tx: 90, ty: 110, rot: 150, delay: 0.08, duration: 1.05, size: 8, color: '#a78bfa' },
  { id: 13, x: 50, y: 45, tx: 0, ty: -220, rot: 360, delay: 0.02, duration: 1.05, size: 14, color: '#fbbf24', symbol: '✨' },
  { id: 14, x: 50, y: 45, tx: -220, ty: 10, rot: -310, delay: 0.06, duration: 1.0, size: 10, color: '#2dd4bf' },
  { id: 15, x: 50, y: 45, tx: 220, ty: 15, rot: 310, delay: 0.03, duration: 1.0, size: 10, color: '#facc15' },
  { id: 16, x: 50, y: 45, tx: -35, ty: -140, rot: -90, delay: 0.1, duration: 0.9, size: 8, color: '#34d399' },
  { id: 17, x: 50, y: 45, tx: 40, ty: -145, rot: 95, delay: 0.1, duration: 0.9, size: 8, color: '#f472b6' },
  { id: 18, x: 50, y: 45, tx: 0, ty: 130, rot: 180, delay: 0.07, duration: 1.0, size: 11, color: '#fbbf24', symbol: '⭐' },
];

const RAIN_PARTICLES: ParticleSpec[] = [
  { id: 101, x: 6, y: -10, tx: 20, ty: 110, rot: 260, delay: 0.0, duration: 4.4, size: 13, color: '#fbbf24', symbol: '⭐' },
  { id: 102, x: 14, y: -12, tx: -18, ty: 112, rot: -220, delay: 0.9, duration: 5.1, size: 9, color: '#34d399' },
  { id: 103, x: 22, y: -8, tx: 25, ty: 108, rot: 310, delay: 0.4, duration: 4.8, size: 12, color: '#fde047', symbol: '✨' },
  { id: 104, x: 31, y: -15, tx: -15, ty: 115, rot: -280, delay: 1.5, duration: 5.5, size: 10, color: '#38bdf8' },
  { id: 105, x: 39, y: -10, tx: 16, ty: 110, rot: 240, delay: 0.2, duration: 4.2, size: 13, color: '#6ee7b7', symbol: '🍃' },
  { id: 106, x: 48, y: -14, tx: -22, ty: 114, rot: -320, delay: 1.9, duration: 5.0, size: 9, color: '#f59e0b' },
  { id: 107, x: 56, y: -8, tx: 14, ty: 108, rot: 280, delay: 0.7, duration: 4.6, size: 14, color: '#fde047', symbol: '🌟' },
  { id: 108, x: 64, y: -12, tx: -20, ty: 112, rot: -240, delay: 2.3, duration: 5.3, size: 10, color: '#a78bfa' },
  { id: 109, x: 73, y: -10, tx: 18, ty: 110, rot: 300, delay: 1.1, duration: 4.5, size: 12, color: '#fbbf24', symbol: '✨' },
  { id: 110, x: 82, y: -15, tx: -16, ty: 115, rot: -260, delay: 0.5, duration: 5.2, size: 9, color: '#2dd4bf' },
  { id: 111, x: 90, y: -9, tx: 12, ty: 109, rot: 220, delay: 1.7, duration: 4.7, size: 13, color: '#fbbf24', symbol: '⭐' },
  { id: 112, x: 95, y: -12, tx: -24, ty: 112, rot: -300, delay: 2.8, duration: 5.4, size: 9, color: '#fb7185' },
  { id: 113, x: 18, y: -14, tx: 10, ty: 114, rot: 200, delay: 2.6, duration: 4.9, size: 8, color: '#facc15' },
  { id: 114, x: 44, y: -11, tx: -12, ty: 111, rot: -210, delay: 3.1, duration: 4.6, size: 11, color: '#38bdf8', symbol: '💧' },
  { id: 115, x: 68, y: -13, tx: 22, ty: 113, rot: 270, delay: 3.5, duration: 5.0, size: 8, color: '#34d399' },
  { id: 116, x: 86, y: -10, tx: -14, ty: 110, rot: -250, delay: 3.9, duration: 4.8, size: 12, color: '#fde047', symbol: '✨' },
];

export const ParticleBurst: React.FC<ParticleBurstProps> = ({
  variant = 'burst',
  className = '',
}) => {
  const particles = variant === 'rain' ? RAIN_PARTICLES : BURST_PARTICLES;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden z-30 ${className}`}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={variant === 'rain' ? 'particle-rain' : 'particle-burst'}
          style={
            {
              left: `${p.x}%`,
              top: variant === 'rain' ? '-24px' : `${p.y}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--tx': `${p.tx}px`,
              '--ty': variant === 'rain' ? '115vh' : `${p.ty}px`,
              '--rot': `${p.rot}deg`,
              color: p.color,
              fontSize: p.symbol ? `${p.size + 4}px` : undefined,
            } as React.CSSProperties
          }
        >
          {p.symbol ? (
            p.symbol
          ) : (
            <span
              className="block rounded-[2px] shadow-sm"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
};
