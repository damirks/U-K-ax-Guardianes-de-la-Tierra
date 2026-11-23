import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, BookOpen, Sparkles } from 'lucide-react';
import { VocabWord } from '../types';
import { soundService } from '../services/sound';
import { ParticleBurst } from './ParticleBurst';

interface VictoryScreenProps {
  playerName: string;
  totalLevels: number;
  allGlossary: VocabWord[];
  onRestart: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  playerName,
  totalLevels,
  allGlossary,
  onRestart,
}) => {
  const fullStory = useMemo(
    () =>
      `¡${playerName || 'Guardián'}, completaste los ${totalLevels} escenarios y demostraste un verdadero compromiso por nuestro planeta! Limpiaste ríos sagrados, clasificaste residuos en tu escuela, sembraste vida en los campos, protegiste cada gota de agua en La Na' ecoahorradora, rescataste especies en peligro en El K'áax y conquistaste el templo de las palabras. Has reunido ${allGlossary.length} vocablos en maaya t'aan.`,
    [playerName, totalLevels, allGlossary.length]
  );

  const [typedCount, setTypedCount] = useState(0);
  const isTypingDone = typedCount >= fullStory.length;

  useEffect(() => {
    setTypedCount(0);
    const interval = window.setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= fullStory.length) {
          window.clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 28);
    return () => window.clearInterval(interval);
  }, [fullStory]);

  const handleRevealAll = () => {
    if (!isTypingDone) {
      setTypedCount(fullStory.length);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-amber-950 via-emerald-950 to-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none overflow-hidden">
      {/* Continuous Star & Confetti Rain */}
      <ParticleBurst variant="rain" />

      {/* Background celebration glow */}
      <div className="absolute top-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Twinkling Corner Stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute top-12 left-[12%] text-amber-300 text-lg anim-star-twinkle">✦</span>
        <span className="absolute top-20 right-[14%] text-yellow-200 text-xl anim-star-twinkle" style={{ animationDelay: '0.8s' }}>★</span>
        <span className="absolute bottom-24 left-[18%] text-emerald-300 text-lg anim-star-twinkle" style={{ animationDelay: '1.5s' }}>✦</span>
        <span className="absolute bottom-20 right-[16%] text-amber-200 text-xl anim-star-twinkle" style={{ animationDelay: '1.1s' }}>★</span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl p-5 sm:p-6 md:p-10 rounded-3xl bg-slate-900/90 border-4 border-amber-400 shadow-[0_0_70px_rgba(245,158,11,0.38)] flex flex-col items-center gap-4 sm:gap-5 backdrop-blur-md"
      >
        <div className="text-2xl sm:text-3xl text-amber-300 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span>🌿 🦋 🌿</span>
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
        </div>

        {/* Animated Trophy with Rotating Golden Halo */}
        <div className="relative flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40">
          <div
            aria-hidden="true"
            className="anim-rays-spin absolute inset-0 rounded-full opacity-65"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(251,191,36,0.5) 18deg, transparent 36deg, transparent 72deg, rgba(16,185,129,0.45) 90deg, transparent 108deg, transparent 144deg, rgba(251,191,36,0.5) 162deg, transparent 180deg, transparent 216deg, rgba(56,189,248,0.4) 234deg, transparent 252deg, transparent 288deg, rgba(251,191,36,0.5) 306deg, transparent 324deg)',
              filter: 'blur(3px)',
            }}
          />
          <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-amber-400/25 via-amber-500/15 to-emerald-950/60 border-2 border-amber-300/80 flex items-center justify-center shadow-[0_0_35px_rgba(251,191,36,0.5)] animate-float">
            <span className="text-6xl sm:text-7xl md:text-8xl filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)] anim-dramatic-slam">
              🏆
            </span>
          </div>
        </div>

        <h1 className="font-pixel text-base sm:text-lg md:text-2xl text-amber-300 tracking-wide drop-shadow-md leading-relaxed">
          ¡MISIÓN CUMPLIDA, GUARDIÁN!
        </h1>

        <p className="font-heading font-extrabold text-base md:text-xl text-emerald-400">
          ¡La Tierra y la sabiduría maya están más vivas gracias a ti!
        </p>

        {/* Typewriter Narrative Box */}
        <div
          onClick={handleRevealAll}
          title={!isTypingDone ? 'Toca para mostrar el texto completo' : undefined}
          className="font-heading text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg w-full bg-slate-950/75 p-4 sm:p-5 rounded-2xl border border-amber-500/40 text-left shadow-inner cursor-pointer min-h-[108px]"
        >
          <span>{fullStory.slice(0, typedCount)}</span>
          {!isTypingDone && <span className="typewriter-caret" aria-hidden="true" />}
        </div>

        {/* Collected glossary list */}
        {allGlossary.length > 0 && (
          <div className="w-full">
            <div className="flex items-center justify-center gap-2 font-pixel text-xs text-amber-300 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Glosario Sagrado Maya ({allGlossary.length} palabras)</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-h-48 overflow-y-auto p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              {allGlossary.map((w) => (
                <span
                  key={w.maya}
                  className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-xs text-amber-200 font-heading font-semibold"
                >
                  {w.img} {w.maya} = {w.es}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            soundService.playClick();
            onRestart();
          }}
          className="btn-pixel btn-pixel-gold card-shimmer px-8 py-4 text-xs md:text-sm rounded-xl mt-2 flex items-center gap-2 cursor-pointer shadow-xl animate-pulse"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Volver al mapa de escenarios</span>
        </button>
      </motion.div>
    </div>
  );
};
