import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowLeft, HeartCrack } from 'lucide-react';
import { VocabWord } from '../types';
import { UNIQUE_DICTIONARY } from '../data/dictionary';
import { soundService } from '../services/sound';
import { ParticleBurst } from './ParticleBurst';
import { NPCAvatar } from './NPCAvatar';

interface VocabModalProps {
  npcName: string;
  levelVocab?: VocabWord[];
  failureReason?: string;
  attemptsLeft?: number;
  onContinue: (unlockedWord?: VocabWord) => void;
  onBackToMap?: () => void;
}

export const VocabModal: React.FC<VocabModalProps> = ({
  npcName,
  levelVocab = [],
  failureReason = 'Te has quedado sin vidas en este santuario.',
  attemptsLeft = 3,
  onContinue,
  onBackToMap,
}) => {
  const [targetWord, setTargetWord] = useState<VocabWord | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Pick words from the official dictionary
    const validWords = UNIQUE_DICTIONARY.filter(
      (w) => w.maya && w.es && w.es.length > 2 && w.es.length <= 50
    );

    // Prioritize words related to the level or random from dictionary
    const pool = levelVocab.length > 0 ? [...levelVocab, ...validWords] : validWords;
    const target = pool[Math.floor(Math.random() * pool.length)] || validWords[0];

    // Generate 3 unique distractors from the dictionary
    const otherMeanings = Array.from(
      new Set(
        validWords
          .map((w) => w.es)
          .filter((e) => e.toLowerCase().trim() !== target.es.toLowerCase().trim())
      )
    );

    const shuffledOthers = otherMeanings.sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [target.es, ...shuffledOthers].sort(() => Math.random() - 0.5);

    setTargetWord(target);
    setOptions(opts);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [levelVocab]);

  const handleSelectOption = (opt: string) => {
    if (isAnswered || !targetWord) return;
    setIsAnswered(true);
    setSelectedOption(opt);

    if (opt.toLowerCase().trim() === targetWord.es.toLowerCase().trim()) {
      soundService.playSuccess();
    } else {
      soundService.playError();
    }
  };

  if (!targetWord) return null;

  const isCorrectChoice =
    selectedOption &&
    targetWord &&
    selectedOption.toLowerCase().trim() === targetWord.es.toLowerCase().trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto overflow-x-hidden p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#11291b] via-[#0b1c13] to-[#050f0a] border-2 border-emerald-500/60 shadow-[0_15px_50px_rgba(4,120,87,0.4)] text-center text-slate-100 flex flex-col items-center animate-in zoom-in-95 duration-150 select-none my-auto">
        {isAnswered && isCorrectChoice && <ParticleBurst variant="burst" />}
        {/* Compact Header */}
        <div className="flex items-center gap-2 mb-1">
          <HeartCrack className="w-5 h-5 text-red-400 shrink-0 animate-pulse" />
          <h3 className="font-heading font-extrabold text-sm sm:text-base text-amber-200">
            ¡Has perdido tus vidas!
          </h3>
        </div>

        <p className="font-medium text-[11px] text-slate-300 mb-2 px-1 line-clamp-1">
          {failureReason}
        </p>

        {/* Compact Mayan Guide Wisdom Prompt */}
        <div className="w-full px-3 py-2 rounded-xl bg-[#071910]/90 border border-emerald-600/40 mb-2.5 text-left flex items-center gap-3">
          <NPCAvatar variant="guide" name={npcName || 'Ixchel'} size="xs" />
          <p className="text-[11px] text-emerald-200/90 leading-tight">
            <strong>Sabiduría de {npcName || 'Ixchel'}:</strong> Responde la pregunta maya para recuperar fuerzas.
          </p>
        </div>

        {/* Word Display in Maaya T'aan */}
        <div className="w-full flex flex-col items-center py-2 px-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-400/20 to-amber-500/15 border border-amber-400/70 mb-2 shadow-inner">
          <span className="font-pixel text-[8px] text-amber-400/90 uppercase tracking-widest block">
            Palabra en maaya t'aan
          </span>
          <div className="font-pixel text-lg sm:text-xl text-amber-200 flex items-center gap-2 mt-0.5">
            <span>«{targetWord.maya}»</span>
            {targetWord.img && <span className="text-xl">{targetWord.img}</span>}
          </div>
        </div>

        <p className="font-heading font-bold text-xs text-slate-200 mb-2">
          ¿Qué significa esta palabra?
        </p>

        {/* 2x2 Grid of Options for Laptop Fit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mb-3">
          {options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt.toLowerCase().trim() === targetWord.es.toLowerCase().trim();

            let btnStyle =
              'bg-[#081f14]/80 border-emerald-900/60 hover:border-emerald-400 hover:bg-[#0c2b1c] text-slate-200';

            if (isAnswered) {
              if (isCorrect) {
                btnStyle =
                  'bg-emerald-700/90 border-emerald-300 text-white font-bold ring-2 ring-emerald-400/60 shadow-lg';
              } else if (isSelected) {
                btnStyle = 'bg-red-900/80 border-red-400 text-red-100 font-bold';
              } else {
                btnStyle = 'bg-[#040e09]/60 border-slate-900 text-slate-500 opacity-40';
              }
            }

            return (
              <button
                key={opt}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`p-2.5 rounded-xl border font-heading font-semibold text-xs text-left transition-all cursor-pointer shadow-sm flex items-center justify-between gap-1.5 min-h-[42px] ${btnStyle}`}
              >
                <span className="line-clamp-2">{opt}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 ml-1" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-3.5 h-3.5 text-red-300 shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Actions */}
        {isAnswered && (
          <div className="w-full flex flex-col gap-2 animate-in fade-in duration-150">
            {/* Feedback message */}
            <div
              className={`p-2 rounded-xl text-[11px] font-medium border text-center leading-snug ${
                isCorrectChoice
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                  : 'bg-amber-950/80 border-amber-400/80 text-amber-200'
              }`}
            >
              {isCorrectChoice ? (
                <span>
                  ✨ ¡Excelente! <strong>«{targetWord.maya}»</strong> = <strong>{targetWord.es}</strong>.
                </span>
              ) : (
                <span>
                  💡 <strong>«{targetWord.maya}»</strong> significa <strong>{targetWord.es}</strong>.
                </span>
              )}
            </div>

            {/* Reintentar Button */}
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                onContinue(isCorrectChoice ? targetWord : undefined);
              }}
              className="btn-pixel btn-pixel-gold w-full py-2.5 text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Volver a intentar el nivel</span>
            </button>

            {onBackToMap && (
              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  onBackToMap();
                }}
                className="flex items-center justify-center gap-1 py-1 text-[11px] text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Regresar al mapa</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
