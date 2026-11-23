import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Clock, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { LevelConfig, PlayerProfile, VocabWord } from '../types';
import { soundService } from '../services/sound';

interface GameHUDProps {
  level: LevelConfig;
  playerProfile: PlayerProfile;
  timeLeft: number | null;
  lives: number;
  maxLives: number;
  goalCount: number;
  goalTarget: number;
  attemptsLeft: number;
  unlockedWords: VocabWord[];
  onBackToSelect: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  level,
  playerProfile,
  timeLeft,
  lives,
  maxLives,
  goalCount,
  goalTarget,
  attemptsLeft,
  unlockedWords,
  onBackToSelect,
  isMuted,
  onToggleMute,
}) => {
  const isTimeCritical = timeLeft !== null && timeLeft <= 15;
  const progressPercent = goalTarget > 0 ? Math.min(100, Math.round((goalCount / goalTarget) * 100)) : 0;

  // Detect lost life to trigger heart-break shake animation
  const prevLivesRef = useRef<number>(lives);
  const [breakingIndices, setBreakingIndices] = useState<number[]>([]);

  useEffect(() => {
    const prev = prevLivesRef.current;
    if (lives < prev) {
      const lostIndices: number[] = [];
      for (let idx = lives; idx < prev; idx++) {
        lostIndices.push(idx);
      }
      setBreakingIndices(lostIndices);
      const timer = window.setTimeout(() => {
        setBreakingIndices([]);
      }, 650);
      prevLivesRef.current = lives;
      return () => window.clearTimeout(timer);
    }
    prevLivesRef.current = lives;
  }, [lives]);

  return (
    <div className="w-full max-w-4xl flex flex-col gap-1.5 sm:gap-2 pb-1.5 sm:pb-2 shrink-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-900/90 border-2 border-amber-400/60 shadow-lg backdrop-blur-md">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => {
            soundService.playClick();
            onBackToSelect();
          }}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-200 border border-amber-400/30 text-xs font-heading font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden xs:inline sm:inline">Escenarios</span>
        </button>

        {/* Level Title & Player Badge */}
        <div className="flex items-center gap-2 text-center truncate min-w-0">
          <span className="text-lg sm:text-xl shrink-0">{level.icon}</span>
          <div className="truncate text-left sm:text-center">
            <h2 className="font-pixel text-[10px] sm:text-xs text-amber-300 truncate">
              {level.name}
            </h2>
            <div className="hidden sm:flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-medium truncate">
              <span>{playerProfile.avatar} {playerProfile.name || 'Guardián'}</span>
              <span>·</span>
              <span className="text-slate-400">Guía: {playerProfile.npcGuide || 'Ixchel'}</span>
            </div>
          </div>
        </div>

        {/* Right side: Timer & Sound */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {timeLeft !== null && (
            <div
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-pixel text-[10px] sm:text-xs border-2 shadow-inner transition-colors tabular-nums ${
                isTimeCritical
                  ? 'bg-red-950/90 border-red-500 text-red-200 animate-pulse'
                  : 'bg-slate-950/90 border-amber-400 text-amber-300'
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-red-400' : 'text-amber-400'}`} />
              <span>{timeLeft}s</span>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 border border-amber-400/40 text-amber-300 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
          </button>
        </div>
      </div>

      {/* Middle Bar: Hearts, Goal Meter, Opportunities */}
      <div
        className={`flex items-center justify-between gap-3 sm:gap-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900/80 border text-xs shadow-md backdrop-blur-md transition-colors duration-300 ${
          breakingIndices.length > 0 ? 'border-red-500/80 bg-red-950/30' : 'border-emerald-500/30'
        }`}
      >
        {/* Lives / Opportunities */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {Array.from({ length: maxLives }).map((_, i) => {
              const isBreaking = breakingIndices.includes(i);
              const isAlive = i < lives;
              return (
                <span
                  key={i}
                  className={`text-sm sm:text-base transition-transform duration-200 ${
                    isBreaking
                      ? 'heart-breaking'
                      : isAlive
                      ? 'hover:scale-110 drop-shadow-[0_0_6px_rgba(239,68,68,0.45)]'
                      : 'opacity-50 scale-90'
                  }`}
                >
                  {isBreaking ? '💔' : isAlive ? '❤️' : '🖤'}
                </span>
              );
            })}
          </div>
          <span className="text-[10px] text-amber-300/85 tabular-nums hidden sm:inline">
            Intentos: {attemptsLeft}/3
          </span>
        </div>

        {/* Goal Progress Bar */}
        <div className="flex-1 flex items-center gap-2 sm:gap-3 max-w-md min-w-0">
          <span className="text-base sm:text-lg shrink-0">{level.resIcon}</span>
          <div className="flex-1 relative h-3 rounded-full bg-slate-950 border border-slate-700 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-amber-400 transition-all duration-300 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="font-pixel text-[10px] sm:text-[11px] text-amber-300 shrink-0 tabular-nums">
            {goalCount}/{goalTarget}
          </div>
        </div>
      </div>

      {/* Glossary Strip for Unlocked Words (Single scrollable row so playfield never gets pushed down) */}
      {unlockedWords.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap px-1 pb-0.5">
          <span className="text-[10px] font-pixel text-amber-400 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3 text-amber-400" /> Palabras:
          </span>
          {unlockedWords.map((w) => (
            <span
              key={w.maya}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] sm:text-[11px] font-medium text-amber-200 shrink-0"
            >
              {w.img} <strong className="font-bold">{w.maya}</strong> = {w.es}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
