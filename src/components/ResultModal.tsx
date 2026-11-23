import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw, CheckCircle2, Sparkles, ShieldAlert } from 'lucide-react';
import { soundService } from '../services/sound';
import { ParticleBurst } from './ParticleBurst';

interface ResultModalProps {
  won: boolean;
  message: string;
  attemptsLeft: number;
  isGrandFinale: boolean;
  onRetry: () => void;
  onContinue: () => void;
  onBackToMap: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  won,
  message,
  attemptsLeft,
  isGrandFinale,
  onRetry,
  onContinue,
  onBackToMap,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      {/* Dramatic Atmospheric Backdrop Glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 ${
          won
            ? 'bg-[radial-gradient(circle_at_50%_45%,rgba(251,191,36,0.2),rgba(16,185,129,0.08)_45%,transparent_75%)]'
            : 'bg-[radial-gradient(circle_at_50%_45%,rgba(239,68,68,0.18),transparent_70%)]'
        }`}
      />

      {won && <ParticleBurst variant="burst" />}

      <motion.div
        initial={{ opacity: 0, scale: 0.82, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-md max-h-[92vh] overflow-y-auto overflow-x-hidden p-5 sm:p-7 rounded-3xl text-center text-slate-100 flex flex-col items-center my-auto shadow-2xl border-3 ${
          won
            ? 'bg-gradient-to-b from-[#153523] via-[#0b1f15] to-[#050f0a] border-amber-400 shadow-[0_0_70px_rgba(251,191,36,0.35)]'
            : 'bg-gradient-to-b from-[#2b1416] via-[#170c0f] to-[#090608] border-red-400/70 shadow-[0_0_60px_rgba(239,68,68,0.28)]'
        }`}
      >
        {/* Top Mayan Banner Stamp */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border font-pixel text-[9px] uppercase tracking-widest mb-4 ${
            won
              ? 'bg-amber-400/20 border-amber-300/70 text-amber-200'
              : 'bg-red-500/20 border-red-400/60 text-red-200'
          }`}
        >
          {won ? (
            <>
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{isGrandFinale ? 'Hazaña Legendaria' : 'Misión Cumplida'}</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </>
          ) : (
            <>
              <ShieldAlert className="w-3 h-3 text-red-300" />
              <span>Desafío Interrumpido</span>
            </>
          )}
        </motion.div>

        {/* Dramatic Emblem with Rotating Rays (Win) or Swaying Dusk (Lose) */}
        <div className="relative flex items-center justify-center w-28 h-28 mb-3">
          {won ? (
            <div
              aria-hidden="true"
              className="anim-rays-spin absolute inset-0 rounded-full opacity-55"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(251,191,36,0.45) 20deg, transparent 40deg, transparent 90deg, rgba(52,211,153,0.4) 110deg, transparent 130deg, transparent 180deg, rgba(251,191,36,0.45) 200deg, transparent 220deg, transparent 270deg, rgba(52,211,153,0.4) 290deg, transparent 310deg)',
                filter: 'blur(2px)',
              }}
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-2 rounded-full bg-red-500/20 blur-lg animate-pulse"
            />
          )}

          <div
            className={`relative z-10 w-22 h-22 rounded-full flex items-center justify-center border-2 shadow-xl ${
              won
                ? 'bg-gradient-to-b from-amber-400/30 to-emerald-900/60 border-amber-300'
                : 'bg-gradient-to-b from-red-500/25 to-slate-950/80 border-red-400/60'
            }`}
          >
            <span
              className={`text-5xl md:text-6xl filter drop-shadow-lg ${
                won ? 'anim-dramatic-slam' : 'anim-leaf-sway'
              }`}
            >
              {won ? (isGrandFinale ? '🏆' : '🌟') : '🍂'}
            </span>
          </div>
        </div>

        {/* Dramatic Headline */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className={`font-pixel text-sm sm:text-base mb-2.5 leading-snug ${
            won ? 'text-amber-200 drop-shadow-[0_2px_8px_rgba(251,191,36,0.45)]' : 'text-red-200'
          }`}
        >
          {won
            ? isGrandFinale
              ? '¡Todos los Santuarios Protegidos!'
              : '¡Santuario Superado con Éxito!'
            : '¡Intento Terminado!'}
        </motion.h3>

        {/* Message Box */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`p-3.5 rounded-2xl text-xs text-slate-200 mb-5 w-full leading-relaxed border ${
            won
              ? 'bg-[#071910]/85 border-emerald-500/40'
              : 'bg-black/45 border-red-400/30'
          }`}
        >
          <p>{message}</p>
          {!won && (
            <p className="mt-2 text-amber-300 font-semibold font-pixel text-[10px]">
              Oportunidades restantes: {attemptsLeft} de 3
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="flex flex-col gap-2.5 w-full"
        >
          {won ? (
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                onContinue();
              }}
              className="btn-pixel btn-pixel-gold card-shimmer w-full py-3.5 text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isGrandFinale ? 'Ver Gran Celebración Final 🏆' : 'Continuar al Mapa de Escenarios ▶'}
              </span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  onRetry();
                }}
                className="btn-pixel btn-pixel-gold card-shimmer w-full py-3.5 text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Volver a intentar nivel</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  onBackToMap();
                }}
                className="flex items-center justify-center gap-2 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a escenarios</span>
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
