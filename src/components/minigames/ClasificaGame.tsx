import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LevelConfig, VocabWord } from '../../types';
import { CL_POOL, CL_BINS, WasteItem } from '../../data/levels';
import { soundService } from '../../services/sound';

interface ClasificaGameProps {
  level: LevelConfig;
  onSuccess: (unlockedWords: VocabWord[]) => void;
  onFailure: (message: string) => void;
  onUpdateStats: (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => void;
}

interface FallingItem {
  id: number;
  item: WasteItem;
  x: number;
  y: number;
  speed: number;
}

const WIN_TARGET = 10;
const MAX_LIVES = 3;
const MAX_MISTAKES = 5;
const TIME_LIMIT = 100;

export const ClasificaGame: React.FC<ClasificaGameProps> = ({
  onSuccess,
  onFailure,
  onUpdateStats,
}) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [classified, setClassified] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [tipMessage, setTipMessage] = useState<{ text: string; type: 'info' | 'ok' | 'bad' }>({
    text: 'Toca un residuo que cae y luego el contenedor correcto.',
    type: 'info',
  });

  const isRunningRef = useRef(true);
  const nextIdRef = useRef(1);
  const itemsRef = useRef<FallingItem[]>([]);
  const selectedIdRef = useRef<number | null>(null);
  selectedIdRef.current = selectedId;
  const classifiedRef = useRef(0);
  const mistakesRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const unlockedWordsRef = useRef<VocabWord[]>([]);

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  // Sync to HUD
  useEffect(() => {
    onUpdateStats(lives, classified, WIN_TARGET, timeLeft);
  }, [lives, classified, timeLeft, onUpdateStats]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRunningRef.current) return;
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          isRunningRef.current = false;
          soundService.playLifeLoss();
          onFailureRef.current('Se acabó el tiempo escolar. ¡Vuelve a intentarlo!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const createFallingItem = useCallback((): FallingItem | null => {
    if (!fieldRef.current) return null;
    const poolItem = CL_POOL[Math.floor(Math.random() * CL_POOL.length)];
    const width = fieldRef.current.clientWidth || 320;
    const maxX = Math.max(20, width - 175);
    return {
      id: nextIdRef.current++,
      item: poolItem,
      x: 12 + Math.random() * maxX,
      y: -36,
      speed: 20 + Math.min(classifiedRef.current, 10) * 2.2,
    };
  }, []);

  // Initial spawn
  useEffect(() => {
    const first = createFallingItem();
    if (first) {
      itemsRef.current = [first];
      setItems([first]);
    }
  }, [createFallingItem]);

  // Animation loop without nested setState side-effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRunningRef.current || !fieldRef.current) return;
      const height = fieldRef.current.clientHeight || 260;

      const nextList: FallingItem[] = [];
      let fellItemName: string | null = null;
      let clearedSelection = false;

      for (const it of itemsRef.current) {
        const nextY = it.y + it.speed * 0.05;
        if (nextY > height - 46) {
          if (selectedIdRef.current === it.id) clearedSelection = true;
          fellItemName = it.item.name;
        } else {
          nextList.push({ ...it, y: nextY });
        }
      }

      if (nextList.length < 3 && (nextList.length === 0 || Math.random() < 0.05)) {
        const spawned = createFallingItem();
        if (spawned) nextList.push(spawned);
      }

      itemsRef.current = nextList;
      setItems(nextList);

      if (clearedSelection) setSelectedId(null);
      if (fellItemName) {
        setTipMessage({
          text: `Se cayó sin clasificar: ${fellItemName}. ¡Sé más veloz!`,
          type: 'bad',
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [createFallingItem]);

  const handleSelectItem = (it: FallingItem) => {
    if (!isRunningRef.current) return;
    soundService.playClick();
    setSelectedId(it.id);
    setTipMessage({
      text: `Seleccionaste: ${it.item.name}. Toca el contenedor correcto.`,
      type: 'info',
    });
  };

  const handleSelectBin = (binKey: string) => {
    if (!isRunningRef.current) return;

    if (!selectedId) {
      soundService.playError();
      setTipMessage({
        text: 'Primero toca un residuo que esté cayendo para seleccionarlo.',
        type: 'bad',
      });
      return;
    }

    const currentItem = itemsRef.current.find((x) => x.id === selectedId);
    if (!currentItem) return;

    const remaining = itemsRef.current.filter((x) => x.id !== selectedId);
    itemsRef.current = remaining;
    setItems(remaining);
    setSelectedId(null);

    const isCorrect = currentItem.item.binKey === binKey;
    const correctBinInfo = CL_BINS[currentItem.item.binKey];

    if (isCorrect) {
      soundService.playSuccess();
      if (
        currentItem.item.word &&
        !unlockedWordsRef.current.find((x) => x.maya === currentItem.item.word!.maya)
      ) {
        unlockedWordsRef.current = [...unlockedWordsRef.current, currentItem.item.word];
      }

      const updated = classifiedRef.current + 1;
      classifiedRef.current = updated;
      setClassified(updated);

      setTipMessage({
        text: `✔ ¡Correcto! ${currentItem.item.name} va en ${correctBinInfo.name}.`,
        type: 'ok',
      });

      if (updated >= WIN_TARGET) {
        isRunningRef.current = false;
        soundService.playFanfare();
        onSuccessRef.current(unlockedWordsRef.current);
      }
    } else {
      soundService.playError();
      const chosenBinInfo = CL_BINS[binKey];
      const nextMistakes = mistakesRef.current + 1;
      if (nextMistakes >= MAX_MISTAKES) {
        mistakesRef.current = 0;
        soundService.playLifeLoss();
        const nextLives = livesRef.current - 1;
        livesRef.current = nextLives;
        setLives(nextLives);
        if (nextLives <= 0) {
          isRunningRef.current = false;
          onFailureRef.current('Te quedaste sin vidas escolares. Repasa los contenedores y vuelve a intentarlo.');
          return;
        }
      } else {
        mistakesRef.current = nextMistakes;
      }

      setTipMessage({
        text: `✘ Incorrecto: ${currentItem.item.name} no va en ${chosenBinInfo.name}. ${correctBinInfo.desc}`,
        type: 'bad',
      });
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-2.5">
      {/* School yard falling field */}
      <div
        ref={fieldRef}
        className="relative w-full h-[38dvh] min-h-[210px] max-h-[330px] rounded-2xl overflow-hidden border-3 sm:border-4 border-amber-400 bg-gradient-to-b from-sky-400 via-amber-100 to-amber-200 shadow-2xl select-none"
      >
        <div className="absolute inset-0 pointer-events-none opacity-35 flex items-center justify-center">
          <div className="text-7xl sm:text-8xl filter blur-[1px]">🏫</div>
        </div>

        {items.map((it) => {
          const isSelected = selectedId === it.id;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => handleSelectItem(it)}
              className={`absolute z-20 px-2.5 py-1.5 rounded-xl font-heading flex items-center gap-2 border-2 transition-colors cursor-pointer shadow-xl text-left ${
                isSelected
                  ? 'bg-amber-400 border-amber-600 text-slate-950 ring-4 ring-amber-300'
                  : 'bg-slate-900/95 border-amber-400/80 text-slate-100 hover:border-amber-300'
              }`}
              style={{ transform: `translate(${it.x}px, ${it.y}px)` }}
            >
              <span className="text-xl sm:text-2xl">{it.item.icon}</span>
              <div className="flex flex-col leading-tight">
                <span
                  className={`font-pixel text-[9px] sm:text-[11px] font-bold tracking-wide ${
                    isSelected ? 'text-amber-950' : 'text-amber-300'
                  }`}
                >
                  {it.item.mayaName}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] font-semibold whitespace-nowrap ${
                    isSelected ? 'text-slate-900' : 'text-slate-300'
                  }`}
                >
                  {it.item.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3 Classification Bins */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
        {Object.entries(CL_BINS).map(([key, bin]) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSelectBin(key)}
            className={`p-2.5 sm:p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 font-heading font-bold text-white shadow-xl transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[68px] ${bin.color} ${bin.border}`}
          >
            <span className="text-xl sm:text-2xl">{bin.icon}</span>
            <span className="text-[11px] sm:text-sm leading-tight text-center">{bin.name}</span>
          </button>
        ))}
      </div>

      {/* Educational Feedback Tip */}
      <div
        className={`w-full max-w-2xl px-3.5 py-2 rounded-xl text-center text-xs sm:text-sm font-semibold border transition-all ${
          tipMessage.type === 'ok'
            ? 'bg-emerald-950/85 border-emerald-400 text-emerald-200'
            : tipMessage.type === 'bad'
            ? 'bg-red-950/85 border-red-400 text-red-200'
            : 'bg-slate-900/80 border-amber-400/50 text-amber-200'
        }`}
      >
        {tipMessage.text}
      </div>
    </div>
  );
};
