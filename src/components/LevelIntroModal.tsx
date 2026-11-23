import React from 'react';
import { ArrowLeft, Play, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { LevelConfig } from '../types';
import { soundService } from '../services/sound';

interface LevelIntroModalProps {
  level: LevelConfig;
  onStart: () => void;
  onBack: () => void;
}

export const LevelIntroModal: React.FC<LevelIntroModalProps> = ({
  level,
  onStart,
  onBack,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="anim-modal-pop relative w-full max-w-xl max-h-[92vh] overflow-y-auto p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-slate-900 via-stone-900 to-slate-950 border-4 border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.3)] text-center text-slate-100 my-auto">
        {/* Glow corner decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

        {/* Cinematic Level Artwork Banner */}
        <div className="relative w-full h-44 sm:h-56 mb-5 rounded-2xl bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 border-2 border-amber-400/80 flex items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.6)] overflow-hidden group">
          {/* Ambient radial glow behind artwork */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(251,191,36,0.22),transparent_65%)] pointer-events-none" />
          <img
            src={level.art}
            alt={level.name}
            className="relative z-10 w-full h-full object-contain p-3 sm:p-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = 'text-6xl';
                span.textContent = level.icon;
                parent.appendChild(span);
              }
            }}
          />
          {/* Subtle cinema scanlines + bottom scrim */}
          <div className="scanlines absolute inset-0 opacity-20 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent pointer-events-none z-10" />

          {/* Corner Level Emblem */}
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/85 border border-amber-400/50 backdrop-blur-sm shadow-md">
            <span className="text-lg leading-none">{level.icon}</span>
            <span className="font-pixel text-[8px] text-amber-300 uppercase tracking-wider">Santuario</span>
          </div>

          <div className="absolute bottom-2.5 right-3 z-20 font-pixel text-[9px] text-emerald-300 drop-shadow">
            {level.resIcon} {level.minigame}
          </div>
        </div>

        {/* Header kicker */}
        <div className="flex items-center justify-center gap-2 mb-1 text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-pixel text-[9px] sm:text-[10px] tracking-wider uppercase">
            U K'ÁAX · GUARDIANES DE LA TIERRA
          </span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Level Title */}
        <h2 className="font-pixel text-base md:text-xl text-amber-200 mb-2">
          {level.name}
        </h2>

        {/* Minigame Badge */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 font-heading font-bold text-sm mb-4">
          🎮 {level.minigame}
        </div>

        {/* Hint / Instructions Box */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/30 text-left mb-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
            <BookOpen className="w-4 h-4" />
            <span>Misión del Escenario:</span>
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {level.hint}
          </p>

          {level.vocab.length > 0 && (
            <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-amber-400/80 font-medium">Palabras clave:</span>
              {level.vocab.slice(0, 4).map((w) => (
                <span
                  key={w.maya}
                  className="px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/30 text-[11px] text-amber-200 font-medium"
                >
                  {w.img} {w.maya} = {w.es}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              soundService.playClick();
              onStart();
            }}
            className="btn-pixel btn-pixel-gold w-full py-3.5 text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Entrar al minijuego ▶</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundService.playClick();
              onBack();
            }}
            className="flex items-center justify-center gap-2 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a escenarios</span>
          </button>
        </div>
      </div>
    </div>
  );
};
