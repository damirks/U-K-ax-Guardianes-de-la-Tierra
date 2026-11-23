import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LevelConfig, VocabWord } from '../../types';
import { CL_POOL, CL_BINS, WasteItem } from '../../data/levels';
import { soundService } from '../../services/sound';

interface CanoaGameProps {
  level: LevelConfig;
  onSuccess: (unlockedWords: VocabWord[]) => void;
  onFailure: (message: string) => void;
  onUpdateStats: (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => void;
}

interface RiverItem {
  id: number;
  x: number;
  y: number;
  icon: string;
  name: string;
  binKey?: string;
  isFish: boolean;
  word?: VocabWord;
}

const WIN_TARGET = 12;
const MAX_LIVES = 3;
const TIME_LIMIT = 120;
const BOAT_SPEED = 4.2;

export const CanoaGame: React.FC<CanoaGameProps> = ({
  onSuccess,
  onFailure,
  onUpdateStats,
}) => {
  const riverRef = useRef<HTMLDivElement>(null);
  const [boatPos, setBoatPos] = useState({ x: 40, y: 110 });
  const [objects, setObjects] = useState<RiverItem[]>([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [collected, setCollected] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [tipMessage, setTipMessage] = useState<{ text: string; type: 'info' | 'ok' | 'bad' }>({
    text: 'Mueve tu barco por el agua y atrapa la basura. ¡Evita a los peces sagrados (kay)!',
    type: 'info',
  });

  const boatRef = useRef(boatPos);
  boatRef.current = boatPos;
  const collectedRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const unlockedWordsRef = useRef<VocabWord[]>([]);
  const objectsRef = useRef<RiverItem[]>([]);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const touchDirRef = useRef<{ [key: string]: boolean }>({});
  const targetPosRef = useRef<{ x: number; y: number } | null>(null);
  const isRunningRef = useRef(true);
  const nextIdRef = useRef(1);

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  // Sync state to parent HUD
  useEffect(() => {
    onUpdateStats(lives, collected, WIN_TARGET, timeLeft);
  }, [lives, collected, timeLeft, onUpdateStats]);

  // Countdown timer
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
    return () => clearInterval(timer);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['arrowup', 'w', 'arrowdown', 's', 'arrowleft', 'a', 'arrowright', 'd'].includes(key)) {
        e.preventDefault();
        keysRef.current[key] = true;
        targetPosRef.current = null;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Spawn a single river item
  const createItem = useCallback((startX?: number): RiverItem => {
    const isFish = Math.random() < 0.25;
    const poolItem = isFish
      ? { icon: '🐟', name: 'Pez (kay)', isFish: true, word: undefined }
      : { ...CL_POOL[Math.floor(Math.random() * CL_POOL.length)], isFish: false };

    const riverH = riverRef.current?.clientHeight || 280;
    const riverW = riverRef.current?.clientWidth || 600;

    return {
      id: nextIdRef.current++,
      x: startX !== undefined ? startX : riverW + 20 + Math.random() * 80,
      y: 22 + Math.random() * Math.max(50, riverH - 74),
      icon: poolItem.icon,
      name: poolItem.name,
      binKey: (poolItem as WasteItem).binKey,
      isFish,
      word: (poolItem as WasteItem).word,
    };
  }, []);

  // Initial population of river items on start
  useEffect(() => {
    const riverW = riverRef.current?.clientWidth || 600;
    const initialItems: RiverItem[] = [
      createItem(riverW * 0.45),
      createItem(riverW * 0.7),
      createItem(riverW * 0.95),
      createItem(riverW * 1.2),
      createItem(riverW * 1.45),
    ];
    objectsRef.current = initialItems;
    setObjects(initialItems);
  }, [createItem]);

  // Main game tick (stable interval using refs so pickups never stutter)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRunningRef.current || !riverRef.current) return;

      const riverW = riverRef.current.clientWidth;
      const riverH = riverRef.current.clientHeight;

      // 1. Move boat
      let dx = 0;
      let dy = 0;
      if (keysRef.current['arrowright'] || keysRef.current['d'] || touchDirRef.current['right']) dx += 1;
      if (keysRef.current['arrowleft'] || keysRef.current['a'] || touchDirRef.current['left']) dx -= 1;
      if (keysRef.current['arrowdown'] || keysRef.current['s'] || touchDirRef.current['down']) dy += 1;
      if (keysRef.current['arrowup'] || keysRef.current['w'] || touchDirRef.current['up']) dy -= 1;

      if (targetPosRef.current && dx === 0 && dy === 0) {
        const diffX = targetPosRef.current.x - boatRef.current.x;
        const diffY = targetPosRef.current.y - boatRef.current.y;
        if (Math.abs(diffX) > BOAT_SPEED) dx = Math.sign(diffX);
        if (Math.abs(diffY) > BOAT_SPEED) dy = Math.sign(diffY);
        if (dx === 0 && dy === 0) targetPosRef.current = null;
      }

      const nextBoatX = Math.max(8, Math.min(riverW - 76, boatRef.current.x + dx * BOAT_SPEED));
      const nextBoatY = Math.max(10, Math.min(riverH - 58, boatRef.current.y + dy * BOAT_SPEED));
      boatRef.current = { x: nextBoatX, y: nextBoatY };
      setBoatPos({ x: nextBoatX, y: nextBoatY });

      // 2. Move river objects & detect collisions
      const currentSpeed = 2.4 + collectedRef.current * 0.14;
      const boatCenter = { x: nextBoatX + 36, y: nextBoatY + 26 };
      const updatedList: RiverItem[] = [];

      for (const obj of objectsRef.current) {
        if (!isRunningRef.current) break;
        const nextX = obj.x - currentSpeed;
        const objCenter = { x: nextX + 18, y: obj.y + 18 };
        const dist = Math.hypot(boatCenter.x - objCenter.x, boatCenter.y - objCenter.y);

        if (dist < 42) {
          if (obj.isFish) {
            soundService.playLifeLoss();
            const nextLives = livesRef.current - 1;
            livesRef.current = nextLives;
            setLives(nextLives);
            setTipMessage({
              text: '¡Ese era un pez! Kay significa pez: no lo atrapes. Pierdes una vida.',
              type: 'bad',
            });
            if (nextLives <= 0) {
              isRunningRef.current = false;
              onFailureRef.current('Te quedaste sin vidas. Recuerda: ¡no atrapes a los peces sagrados (kay)!');
            }
          } else {
            soundService.playPickup();
            if (obj.word && !unlockedWordsRef.current.find((x) => x.maya === obj.word!.maya)) {
              unlockedWordsRef.current = [...unlockedWordsRef.current, obj.word];
            }

            const nextScore = collectedRef.current + 1;
            collectedRef.current = nextScore;
            setCollected(nextScore);

            const binName = obj.binKey ? CL_BINS[obj.binKey]?.name : 'su contenedor';
            setTipMessage({
              text: `✔ ${obj.name} recogido (va en ${binName}).`,
              type: 'ok',
            });

            if (nextScore >= WIN_TARGET) {
              isRunningRef.current = false;
              soundService.playFanfare();
              onSuccessRef.current(unlockedWordsRef.current);
            }
          }
          continue;
        }

        if (nextX > -70) {
          updatedList.push({ ...obj, x: nextX });
        }
      }

      if (updatedList.length < 6 && isRunningRef.current) {
        updatedList.push(createItem(riverW + 30 + Math.random() * 90));
      }

      objectsRef.current = updatedList;
      setObjects(updatedList);
    }, 35);

    return () => clearInterval(interval);
  }, [createItem]);

  const handleRiverPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!riverRef.current) return;
    const rect = riverRef.current.getBoundingClientRect();
    targetPosRef.current = {
      x: e.clientX - rect.left - 34,
      y: e.clientY - rect.top - 24,
    };
  };

  const stopDir = (dir: string) => () => {
    touchDirRef.current[dir] = false;
  };
  const startDir = (dir: string) => () => {
    targetPosRef.current = null;
    touchDirRef.current[dir] = true;
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-2.5">
      {/* Play Area: River with flowing waste and swimming fish */}
      <div
        ref={riverRef}
        onPointerDown={handleRiverPointerDown}
        className="relative w-full h-[42dvh] min-h-[230px] max-h-[360px] rounded-2xl overflow-hidden border-3 sm:border-4 border-amber-400 shadow-2xl river-pattern cursor-crosshair select-none touch-none"
      >
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-emerald-800 to-transparent opacity-85 pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-emerald-800 to-transparent opacity-85 pointer-events-none z-10" />

        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <div className="absolute top-1/4 left-1/4 w-28 h-1 bg-white/70 rounded-full animate-pulse" />
          <div className="absolute top-2/3 right-1/4 w-36 h-1 bg-white/70 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-2/3 w-20 h-1 bg-white/70 rounded-full animate-pulse" />
        </div>

        {/* Animated Sailboat */}
        <div
          className="absolute z-30 transition-transform duration-75 flex items-center justify-center pointer-events-none filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.65)]"
          style={{ transform: `translate(${boatPos.x}px, ${boatPos.y}px)` }}
        >
          <div className="relative anim-boat-float flex items-center">
            <div className="absolute -left-6 top-9 flex items-center gap-1.5 opacity-80 pointer-events-none">
              <span className="w-5 h-1.5 bg-white/80 rounded-full animate-pulse" />
              <span className="w-2.5 h-1 bg-cyan-200/90 rounded-full animate-ping" />
            </div>

            <svg
              className="w-20 sm:w-28 h-14 sm:h-20 overflow-visible"
              viewBox="0 0 140 94"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="hullPlankGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="45%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
                <linearGradient id="cabinWoodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#78350f" />
                  <stop offset="100%" stopColor="#451a03" />
                </linearGradient>
                <linearGradient id="sailAmberGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="40%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              <ellipse cx="68" cy="80" rx="56" ry="6" fill="#024970" opacity="0.45" />
              <path d="M18 64 C26 80, 108 80, 126 56 L123 53 C106 73, 30 73, 18 64 Z" fill="#78350f" />
              <path
                d="M18 64 C35 77, 105 77, 126 56 C115 54, 88 53, 30 53 C22 53, 19 58, 18 64 Z"
                fill="url(#hullPlankGrad)"
                stroke="#92400e"
                strokeWidth="1.2"
              />
              <path d="M20 62 C38 71, 102 71, 122 58" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M23 67 C42 74, 96 74, 116 63" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M16 60 Q70 65 128 53 L126 50 Q70 62 18 57 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
              <rect x="36" y="50" width="44" height="12" rx="2" fill="url(#cabinWoodGrad)" stroke="#451a03" strokeWidth="1" />
              <rect x="34" y="48" width="48" height="3" rx="1.5" fill="#d97706" />
              <g>
                <circle cx="43" cy="56" r="3" fill="#fde047" stroke="#451a03" strokeWidth="1" />
                <circle cx="51" cy="56" r="3" fill="#fde047" stroke="#451a03" strokeWidth="1" />
                <circle cx="59" cy="56" r="3" fill="#fde047" stroke="#451a03" strokeWidth="1" />
                <circle cx="67" cy="56" r="3" fill="#fde047" stroke="#451a03" strokeWidth="1" />
              </g>
              <g transform="translate(100, 60)">
                <circle cx="0" cy="0" r="6.5" fill="#ffffff" stroke="#b91c1c" strokeWidth="3" />
                <circle cx="0" cy="0" r="2.8" fill="#b91c1c" />
                <line x1="-5.5" y1="0" x2="-2.8" y2="0" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="2.8" y1="0" x2="5.5" y2="0" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="0" y1="-5.5" x2="0" y2="-2.8" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="0" y1="2.8" x2="0" y2="5.5" stroke="#ffffff" strokeWidth="1.5" />
              </g>
              <line x1="74" y1="6" x2="74" y2="50" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="74" y1="8" x2="124" y2="52" stroke="#d97706" strokeWidth="0.9" opacity="0.8" />
              <line x1="74" y1="8" x2="20" y2="58" stroke="#d97706" strokeWidth="0.9" opacity="0.8" />
              <path d="M74 6 L94 10 L74 14 Z" fill="#dc2626" />
              <path d="M72 18 C52 32, 28 42, 16 56 C38 52, 60 48, 72 46 Z" fill="url(#sailAmberGrad)" stroke="#b45309" strokeWidth="1" />
              <path d="M66 24 C52 34, 32 43, 24 52 C38 48, 56 46, 66 43 Z" fill="#dc2626" />
              <path d="M71 13 C61 25, 51 37, 47 48 C56 48, 66 48, 72 47 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.9" />
              <path d="M68 19 C65 22, 62 25, 60 27 L64 27 C66 25, 68 22, 70 19 Z" fill="#dc2626" />
              <path d="M63 30 C60 34, 57 37, 55 39 L61 39 C62 36, 64 33, 66 30 Z" fill="#dc2626" />
              <path d="M55 41 C53 44, 51 45, 50 47 L57 47 C58 45, 59 43, 60 41 Z" fill="#dc2626" />
              <path d="M76 16 C92 28, 108 38, 116 50 C102 48, 88 47, 76 46 Z" fill="url(#sailAmberGrad)" stroke="#b45309" strokeWidth="1" />
              <path d="M80 22 C92 31, 102 38, 108 46 C98 45, 88 44, 80 43 Z" fill="#dc2626" />
            </svg>
          </div>
        </div>

        {/* River Floating Items */}
        {objects.map((obj) => (
          <div
            key={obj.id}
            className={`absolute z-20 text-2xl sm:text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pointer-events-none ${
              obj.isFish ? 'animate-pulse' : ''
            }`}
            style={{ transform: `translate(${obj.x}px, ${obj.y}px)` }}
          >
            {obj.icon}
          </div>
        ))}
      </div>

      {/* Bottom Dock: Feedback Banner + Compact Arcade D-Pad */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div
          className={`flex-1 w-full px-3.5 py-2.5 rounded-xl text-center sm:text-left text-xs sm:text-sm font-semibold border transition-all ${
            tipMessage.type === 'ok'
              ? 'bg-emerald-950/85 border-emerald-400 text-emerald-200'
              : tipMessage.type === 'bad'
              ? 'bg-red-950/85 border-red-400 text-red-200'
              : 'bg-slate-900/85 border-amber-400/50 text-amber-200'
          }`}
        >
          <p>{tipMessage.text}</p>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Toca el agua, usa WASD/flechas o el control direccional.
          </span>
        </div>

        {/* Compact Tactile Arcade D-Pad */}
        <div className="grid grid-cols-3 gap-1.5 w-36 shrink-0">
          <div />
          <button
            type="button"
            aria-label="Mover arriba"
            onPointerDown={startDir('up')}
            onPointerUp={stopDir('up')}
            onPointerLeave={stopDir('up')}
            onPointerCancel={stopDir('up')}
            className="h-10 rounded-xl bg-slate-800 active:bg-amber-500 border-2 border-amber-400 text-amber-200 active:text-slate-950 flex items-center justify-center font-bold text-base shadow-md active:translate-y-0.5 transition-all touch-none cursor-pointer"
          >
            ▲
          </button>
          <div />

          <button
            type="button"
            aria-label="Mover izquierda"
            onPointerDown={startDir('left')}
            onPointerUp={stopDir('left')}
            onPointerLeave={stopDir('left')}
            onPointerCancel={stopDir('left')}
            className="h-10 rounded-xl bg-slate-800 active:bg-amber-500 border-2 border-amber-400 text-amber-200 active:text-slate-950 flex items-center justify-center font-bold text-base shadow-md active:translate-y-0.5 transition-all touch-none cursor-pointer"
          >
            ◀
          </button>
          <button
            type="button"
            aria-label="Mover abajo"
            onPointerDown={startDir('down')}
            onPointerUp={stopDir('down')}
            onPointerLeave={stopDir('down')}
            onPointerCancel={stopDir('down')}
            className="h-10 rounded-xl bg-slate-800 active:bg-amber-500 border-2 border-amber-400 text-amber-200 active:text-slate-950 flex items-center justify-center font-bold text-base shadow-md active:translate-y-0.5 transition-all touch-none cursor-pointer"
          >
            ▼
          </button>
          <button
            type="button"
            aria-label="Mover derecha"
            onPointerDown={startDir('right')}
            onPointerUp={stopDir('right')}
            onPointerLeave={stopDir('right')}
            onPointerCancel={stopDir('right')}
            className="h-10 rounded-xl bg-slate-800 active:bg-amber-500 border-2 border-amber-400 text-amber-200 active:text-slate-950 flex items-center justify-center font-bold text-base shadow-md active:translate-y-0.5 transition-all touch-none cursor-pointer"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
