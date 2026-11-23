import React, { useEffect, useState, useRef } from 'react';
import { LevelConfig, VocabWord } from '../../types';
import { soundService } from '../../services/sound';
import { NPCAvatar } from '../NPCAvatar';

interface MercadoGameProps {
  level: LevelConfig;
  onSuccess: (unlockedWords: VocabWord[]) => void;
  onFailure: (message: string) => void;
  onUpdateStats: (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => void;
}

const MISSIONS_TARGET = 6;
const TIME_LIMIT = 120;

export const MercadoGame: React.FC<MercadoGameProps> = ({
  level,
  onSuccess,
  onFailure,
  onUpdateStats,
}) => {
  const [missions, setMissions] = useState<VocabWord[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [options, setOptions] = useState<VocabWord[]>([]);
  const [mistakesThisRound, setMistakesThisRound] = useState(0);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  const [statusSubtitle, setStatusSubtitle] = useState('Toca el objeto que creas que corresponde.');
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [solvedItem, setSolvedItem] = useState<string | null>(null);

  const isRunningRef = useRef(true);
  const unlockedWordsRef = useRef<VocabWord[]>([]);
  const roundTimerRef = useRef<number | null>(null);
  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  // Sync to HUD
  useEffect(() => {
    onUpdateStats(3, currentRound, MISSIONS_TARGET, timeLeft);
  }, [currentRound, timeLeft, onUpdateStats]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRunningRef.current) return;
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          isRunningRef.current = false;
          soundService.playLifeLoss();
          onFailureRef.current('Se acabó el tiempo del mercado. ¡Vuelve a intentarlo!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
      if (roundTimerRef.current) window.clearTimeout(roundTimerRef.current);
    };
  }, []);

  // Setup missions
  useEffect(() => {
    const picked = [...level.vocab].sort(() => Math.random() - 0.5).slice(0, MISSIONS_TARGET);
    setMissions(picked);
  }, [level.vocab]);

  // Setup current round stall items
  useEffect(() => {
    if (missions.length === 0 || currentRound >= missions.length) return;
    const target = missions[currentRound];
    const otherItems = level.vocab.filter((w) => w.maya !== target.maya);
    const randomOthers = otherItems.sort(() => Math.random() - 0.5).slice(0, 3);
    const roundOptions = [target, ...randomOthers].sort(() => Math.random() - 0.5);

    setOptions(roundOptions);
    setMistakesThisRound(0);
    setDisabledOptions([]);
    setSolvedItem(null);
    setStatusSubtitle(`Toca el objeto del puesto que sea «${target.maya}».`);
  }, [currentRound, missions, level.vocab]);

  const targetWord = missions[currentRound];

  const handleOptionClick = (item: VocabWord) => {
    if (!isRunningRef.current || !targetWord || solvedItem !== null) return;

    if (item.maya === targetWord.maya) {
      soundService.playSuccess();
      setSolvedItem(item.maya);
      setStatusSubtitle(`¡Correcto! ${targetWord.maya} = ${targetWord.es}`);

      if (!unlockedWordsRef.current.find((w) => w.maya === targetWord.maya)) {
        unlockedWordsRef.current = [...unlockedWordsRef.current, targetWord];
      }

      roundTimerRef.current = window.setTimeout(() => {
        if (!isRunningRef.current) return;
        const nextRound = currentRound + 1;
        if (nextRound >= MISSIONS_TARGET) {
          isRunningRef.current = false;
          soundService.playFanfare();
          onSuccessRef.current(unlockedWordsRef.current);
        } else {
          setCurrentRound(nextRound);
        }
      }, 950);
    } else {
      soundService.playError();
      setDisabledOptions((prev) => [...prev, item.maya]);
      const nextMistakes = mistakesThisRound + 1;
      setMistakesThisRound(nextMistakes);

      if (nextMistakes >= 2) {
        setStatusSubtitle(
          `Pista: «${targetWord.maya}» significa «${targetWord.es}». Busca ese producto.`
        );
      } else {
        setStatusSubtitle('Ese no era. ¡Inténtalo de nuevo!');
      }
    }
  };

  if (!targetWord) return null;

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      {/* Traditional Tianguis Canopy / Toldo de Mercado (flush roof inside overflow-hidden) */}
      <div className="w-full relative rounded-3xl overflow-hidden border-3 sm:border-4 border-amber-500 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200 shadow-2xl text-stone-900 select-none">
        {/* Flush Striped Canopy Roof Banner */}
        <div className="w-full h-7 bg-[repeating-linear-gradient(90deg,#ef4444_0px,#ef4444_24px,#fef08a_24px,#fef08a_48px)] border-b-4 border-amber-700 shadow-md" />

        <div className="p-4 sm:p-5">
          {/* Customer Dialogue Balloon with Real Illustrated Merchant Portrait */}
          <div className="relative p-3.5 rounded-2xl bg-white/95 border-2 border-amber-600 shadow-md mb-3 flex items-center gap-3.5 text-left">
            <NPCAvatar variant="merchant" size="md" name="Don Balam" />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Marchante del Mercado
              </span>
              <p className="font-heading text-xs sm:text-sm font-bold text-stone-800 mt-0.5">
                Por favor, pásame:
              </p>
              <div className="font-pixel text-sm sm:text-base text-amber-900 bg-amber-200/75 inline-block px-3.5 py-1 rounded-xl border border-amber-400 mt-1 shadow-inner">
                «{targetWord.maya}»
              </div>
            </div>
          </div>

          <p className="text-center font-heading font-semibold text-xs sm:text-sm text-stone-700 mb-3.5 min-h-[1.25rem]">
            {statusSubtitle}
          </p>

          {/* Market Stall Goods Grid */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto">
            {options.map((opt) => {
              const isDisabled = disabledOptions.includes(opt.maya);
              const isSolved = solvedItem === opt.maya;
              const isHinted = mistakesThisRound >= 2 && opt.maya === targetWord.maya;

              return (
                <button
                  key={opt.maya}
                  type="button"
                  disabled={isDisabled || solvedItem !== null}
                  onClick={() => handleOptionClick(opt)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-4 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg min-h-[86px] ${
                    isSolved
                      ? 'bg-emerald-400 border-emerald-600 scale-105 shadow-emerald-500/50'
                      : isDisabled
                      ? 'bg-stone-300 border-stone-400 opacity-40 cursor-not-allowed scale-95'
                      : isHinted
                      ? 'bg-amber-100 border-amber-500 animate-pulse ring-4 ring-amber-400 shadow-amber-400/50'
                      : 'bg-white border-amber-600 hover:bg-amber-50 hover:-translate-y-0.5 active:translate-y-0.5'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl filter drop-shadow">{opt.img || '🧺'}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
