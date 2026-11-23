import React, { useEffect, useState, useRef } from 'react';
import { LevelConfig, VocabWord } from '../../types';
import { soundService } from '../../services/sound';

interface MemoriaGameProps {
  level: LevelConfig;
  onSuccess: (unlockedWords: VocabWord[]) => void;
  onFailure: (message: string) => void;
  onUpdateStats: (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => void;
}

interface MemoryCardItem {
  id: number;
  pairId: number;
  kind: 'maya' | 'es';
  label: string;
  word: VocabWord;
  isFlipped: boolean;
  isMatched: boolean;
}

const PAIRS_TARGET = 8;
const TIME_LIMIT = 100;

export const MemoriaGame: React.FC<MemoriaGameProps> = ({
  level,
  onSuccess,
  onFailure,
  onUpdateStats,
}) => {
  const [cards, setCards] = useState<MemoryCardItem[]>([]);
  const [openCards, setOpenCards] = useState<MemoryCardItem[]>([]);
  const [matches, setMatches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isBusy, setIsBusy] = useState(false);

  const isRunningRef = useRef(true);
  const matchesRef = useRef(0);
  const unlockedWordsRef = useRef<VocabWord[]>([]);
  const flipTimeoutRef = useRef<number | null>(null);
  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  // Sync to HUD
  useEffect(() => {
    onUpdateStats(3, matches, PAIRS_TARGET, timeLeft);
  }, [matches, timeLeft, onUpdateStats]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRunningRef.current) return;
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          isRunningRef.current = false;
          soundService.playLifeLoss();
          onFailureRef.current('Se acabó el tiempo. ¡Vuelve a intentarlo!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
      if (flipTimeoutRef.current) window.clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  // Setup cards on mount
  useEffect(() => {
    const chosen = [...level.vocab].sort(() => Math.random() - 0.5).slice(0, PAIRS_TARGET);
    let cardDeck: MemoryCardItem[] = [];
    let idx = 0;

    chosen.forEach((w, pairId) => {
      cardDeck.push({
        id: idx++,
        pairId,
        kind: 'maya',
        label: `${w.img || ''} ${w.maya}`,
        word: w,
        isFlipped: false,
        isMatched: false,
      });
      cardDeck.push({
        id: idx++,
        pairId,
        kind: 'es',
        label: `${w.img || ''} ${w.es}`,
        word: w,
        isFlipped: false,
        isMatched: false,
      });
    });

    cardDeck = cardDeck.sort(() => Math.random() - 0.5);
    setCards(cardDeck);
  }, [level.vocab]);

  const handleCardClick = (card: MemoryCardItem) => {
    if (isBusy || !isRunningRef.current || card.isFlipped || card.isMatched) return;

    soundService.playClick();
    const updatedCards = cards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c));
    setCards(updatedCards);

    const nextOpen = [...openCards, card];
    setOpenCards(nextOpen);

    if (nextOpen.length === 2) {
      setIsBusy(true);
      const [c1, c2] = nextOpen;
      const isMatch = c1.pairId === c2.pairId && c1.kind !== c2.kind;

      flipTimeoutRef.current = window.setTimeout(() => {
        if (!isRunningRef.current) return;

        if (isMatch) {
          soundService.playSuccess();
          setCards((prev) =>
            prev.map((c) => (c.pairId === c1.pairId ? { ...c, isMatched: true } : c))
          );

          if (!unlockedWordsRef.current.find((x) => x.maya === c1.word.maya)) {
            unlockedWordsRef.current = [...unlockedWordsRef.current, c1.word];
          }

          const nextM = matchesRef.current + 1;
          matchesRef.current = nextM;
          setMatches(nextM);

          if (nextM >= PAIRS_TARGET) {
            isRunningRef.current = false;
            soundService.playFanfare();
            onSuccessRef.current(unlockedWordsRef.current);
          }
        } else {
          soundService.playError();
          setCards((prev) =>
            prev.map((c) =>
              c.id === c1.id || c.id === c2.id ? { ...c, isFlipped: false } : c
            )
          );
        }

        setOpenCards([]);
        setIsBusy(false);
      }, 650);
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-2.5">
      <p className="font-heading font-bold text-xs sm:text-sm text-purple-200 text-center">
        Encuentra cada palabra maya junto con su significado en español.
      </p>

      {/* 4x4 Memory Grid sized to stay cleanly inside 1 viewport */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-[min(88vw,350px)] sm:max-w-[min(54dvh,390px)] aspect-square p-2.5 sm:p-3 rounded-2xl bg-slate-900/90 border-3 sm:border-4 border-purple-400/80 shadow-2xl">
        {cards.map((c) => (
          <button
            key={c.id}
            type="button"
            disabled={c.isMatched || isBusy}
            onClick={() => handleCardClick(c)}
            className="card-perspective w-full h-full cursor-pointer focus:outline-none"
          >
            <div
              className={`relative w-full h-full card-inner rounded-xl shadow-md ${
                c.isFlipped || c.isMatched ? 'card-flipped' : ''
              }`}
            >
              <div className="absolute inset-0 card-front rounded-xl bg-gradient-to-br from-emerald-800 via-green-700 to-emerald-950 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-pixel text-lg sm:text-2xl shadow-inner">
                🌿
              </div>

              <div
                className={`absolute inset-0 card-back rounded-xl p-1.5 flex flex-col items-center justify-center text-center font-heading font-bold text-[11px] sm:text-xs border-2 ${
                  c.isMatched
                    ? 'bg-emerald-300 text-emerald-950 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : 'bg-amber-100 text-stone-900 border-amber-500'
                }`}
              >
                <span className="line-clamp-3 leading-tight break-words">{c.label}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
