import React, { useEffect, useRef, useState, useMemo } from 'react';
import { LevelConfig, VocabWord } from '../../types';
import { soundService } from '../../services/sound';
import { Flame, Sparkles } from 'lucide-react';

interface RescateGameProps {
  level: LevelConfig;
  onSuccess: (unlockedWords: VocabWord[]) => void;
  onFailure: (message: string) => void;
  onUpdateStats: (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => void;
}

interface EndangeredAnimalDef {
  id: string;
  name: string;
  mayaName: string;
  emoji: string;
  xPct: number;
  yPct: number;
  word?: VocabWord;
}

interface EndangeredAnimal extends EndangeredAnimalDef {
  x: number;
  y: number;
  isRescued: boolean;
}

interface PlantedTorch {
  id: string;
  xPct: number;
  yPct: number;
  x: number;
  y: number;
  animalName: string;
  mayaName: string;
  animalEmoji: string;
}

// Responsive percentage placements so every animal is reachable on mobile & desktop
const SANCTUARY_ANIMALS: EndangeredAnimalDef[] = [
  {
    id: 'baalam',
    name: 'Jaguar',
    mayaName: 'Báalam',
    emoji: '🐆',
    xPct: 0.18,
    yPct: 0.25,
    word: { maya: 'báalam', es: 'jaguar', img: '🐆' },
  },
  {
    id: 'kook',
    name: 'Guacamaya roja',
    mayaName: "K'óok'",
    emoji: '🦜',
    xPct: 0.80,
    yPct: 0.22,
    word: { maya: "k'óok'", es: 'guacamaya roja', img: '🦜' },
  },
  {
    id: 'maax',
    name: 'Mono araña',
    mayaName: "Ma'ax",
    emoji: '🐒',
    xPct: 0.50,
    yPct: 0.48,
    word: { maya: "ma'ax", es: 'mono araña', img: '🐒' },
  },
  {
    id: 'kuuts',
    name: 'Pavo ocelado',
    mayaName: 'Kuuts',
    emoji: '🦃',
    xPct: 0.22,
    yPct: 0.76,
    word: { maya: 'kuuts', es: 'pavo de monte', img: '🦃' },
  },
  {
    id: 'aak',
    name: 'Tortuga',
    mayaName: 'Áak',
    emoji: '🐢',
    xPct: 0.78,
    yPct: 0.77,
    word: { maya: 'áak', es: 'tortuga', img: '🐢' },
  },
];

const RESCUE_TARGET = SANCTUARY_ANIMALS.length;
const TIME_LIMIT = 90;
const RANGER_SPEED = 5.2;

export const RescateGame: React.FC<RescateGameProps> = ({
  onSuccess,
  onFailure,
  onUpdateStats,
}) => {
  const jungleRef = useRef<HTMLDivElement>(null);
  const [arenaSize, setArenaSize] = useState({ width: 640, height: 320 });
  const [rangerPos, setRangerPos] = useState({ x: 320, y: 165 });
  const [rescuedIds, setRescuedIds] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [tipMessage, setTipMessage] = useState<{ text: string; type: 'info' | 'ok' | 'bad' }>({
    text: 'Explora la selva y rescata a las 5 especies encendiendo sus antorchas.',
    type: 'info',
  });

  const isRunningRef = useRef(true);
  const arenaSizeRef = useRef(arenaSize);
  const rangerRef = useRef({ x: 320, y: 165 });
  const hasCenteredRef = useRef(false);
  const rescuedIdsRef = useRef<string[]>([]);
  const unlockedWordsRef = useRef<VocabWord[]>([]);
  const targetPosRef = useRef<{ x: number; y: number } | null>(null);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const touchDirRef = useRef<{ [key: string]: boolean }>({});
  const winTimeoutRef = useRef<number | null>(null);

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  // Measure arena live via ResizeObserver so animals & ranger scale to any mobile/desktop viewport
  useEffect(() => {
    const el = jungleRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const nextSize = { width: rect.width, height: rect.height };
        arenaSizeRef.current = nextSize;
        setArenaSize(nextSize);
        if (!hasCenteredRef.current) {
          hasCenteredRef.current = true;
          const startPos = { x: rect.width * 0.5, y: rect.height * 0.52 };
          rangerRef.current = startPos;
          setRangerPos(startPos);
        } else {
          const clampedX = Math.max(28, Math.min(rect.width - 28, rangerRef.current.x));
          const clampedY = Math.max(28, Math.min(rect.height - 28, rangerRef.current.y));
          rangerRef.current = { x: clampedX, y: clampedY };
          setRangerPos({ x: clampedX, y: clampedY });
        }
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Derive responsive pixel coordinates for animals and torches from arenaSize
  const animals: EndangeredAnimal[] = useMemo(
    () =>
      SANCTUARY_ANIMALS.map((a) => ({
        ...a,
        x: Math.round(a.xPct * arenaSize.width),
        y: Math.round(a.yPct * arenaSize.height),
        isRescued: rescuedIds.includes(a.id),
      })),
    [arenaSize, rescuedIds]
  );

  const torches: PlantedTorch[] = useMemo(
    () =>
      SANCTUARY_ANIMALS.filter((a) => rescuedIds.includes(a.id)).map((a) => ({
        id: a.id,
        xPct: a.xPct,
        yPct: a.yPct,
        x: Math.round(a.xPct * arenaSize.width),
        y: Math.round(a.yPct * arenaSize.height),
        animalName: a.name,
        mayaName: a.mayaName,
        animalEmoji: a.emoji,
      })),
    [arenaSize, rescuedIds]
  );

  const rescuedCount = rescuedIds.length;

  const ambientDarknessOpacity = useMemo(() => {
    const fraction = rescuedCount / RESCUE_TARGET;
    return Math.max(0.06, 0.94 - fraction * 0.88);
  }, [rescuedCount]);

  useEffect(() => {
    onUpdateStats(3, rescuedCount, RESCUE_TARGET, timeLeft);
  }, [rescuedCount, timeLeft, onUpdateStats]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRunningRef.current) return;
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          isRunningRef.current = false;
          soundService.playLifeLoss();
          onFailureRef.current('Se agotó el tiempo. ¡Los animales de la selva aún necesitan que enciendas sus antorchas!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
      if (winTimeoutRef.current) window.clearTimeout(winTimeoutRef.current);
    };
  }, []);

  // Keyboard navigation
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

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main game tick loop (stable interval with ref-based coordinates)
  useEffect(() => {
    const tickInterval = setInterval(() => {
      if (!isRunningRef.current || !jungleRef.current) return;
      const { width: W, height: H } = arenaSizeRef.current;

      let dx = 0;
      let dy = 0;
      if (keysRef.current['arrowright'] || keysRef.current['d'] || touchDirRef.current['right']) dx += 1;
      if (keysRef.current['arrowleft'] || keysRef.current['a'] || touchDirRef.current['left']) dx -= 1;
      if (keysRef.current['arrowdown'] || keysRef.current['s'] || touchDirRef.current['down']) dy += 1;
      if (keysRef.current['arrowup'] || keysRef.current['w'] || touchDirRef.current['up']) dy -= 1;

      if (targetPosRef.current && dx === 0 && dy === 0) {
        const diffX = targetPosRef.current.x - rangerRef.current.x;
        const diffY = targetPosRef.current.y - rangerRef.current.y;
        if (Math.abs(diffX) > RANGER_SPEED) dx = Math.sign(diffX);
        if (Math.abs(diffY) > RANGER_SPEED) dy = Math.sign(diffY);
        if (dx === 0 && dy === 0) targetPosRef.current = null;
      }

      const nextX = Math.max(26, Math.min(W - 26, rangerRef.current.x + dx * RANGER_SPEED));
      const nextY = Math.max(26, Math.min(H - 26, rangerRef.current.y + dy * RANGER_SPEED));
      rangerRef.current = { x: nextX, y: nextY };
      setRangerPos({ x: nextX, y: nextY });

      for (const an of SANCTUARY_ANIMALS) {
        if (rescuedIdsRef.current.includes(an.id)) continue;

        const ax = an.xPct * W;
        const ay = an.yPct * H;
        const dist = Math.hypot(ax - nextX, ay - nextY);
        const rescueRadius = Math.max(40, Math.min(56, W * 0.08));

        if (dist < rescueRadius) {
          soundService.playSuccess();
          const nextRescued = [...rescuedIdsRef.current, an.id];
          rescuedIdsRef.current = nextRescued;
          setRescuedIds(nextRescued);

          let msg = `🔥 ¡Antorcha plantada! ${an.emoji} ${an.name} (${an.mayaName}) a salvo.`;
          if (an.word) {
            msg += ` En maya: ${an.word.maya} = ${an.word.es}.`;
            if (!unlockedWordsRef.current.find((x) => x.maya === an.word!.maya)) {
              unlockedWordsRef.current = [...unlockedWordsRef.current, an.word];
            }
          }
          setTipMessage({ text: msg, type: 'ok' });

          if (nextRescued.length >= RESCUE_TARGET) {
            isRunningRef.current = false;
            soundService.playFanfare();
            winTimeoutRef.current = window.setTimeout(() => {
              onSuccessRef.current(unlockedWordsRef.current);
            }, 950);
          }
          break;
        }
      }
    }, 36);

    return () => clearInterval(tickInterval);
  }, []);

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!jungleRef.current) return;
    const rect = jungleRef.current.getBoundingClientRect();
    targetPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const stopDir = (dir: string) => () => {
    touchDirRef.current[dir] = false;
  };
  const startDir = (dir: string) => () => {
    targetPosRef.current = null;
    touchDirRef.current[dir] = true;
  };

  const flashlightRadius = Math.max(95, Math.min(135, arenaSize.width * 0.22));
  const torchLightRadius = Math.max(115, Math.min(155, arenaSize.width * 0.25));

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-2.5 select-none">
      {/* Dark Jungle Play Area */}
      <div
        ref={jungleRef}
        onPointerDown={handlePointer}
        onPointerMove={(e) => {
          if (e.buttons > 0) handlePointer(e);
        }}
        className="relative w-full h-[44dvh] min-h-[245px] max-h-[370px] rounded-2xl sm:rounded-3xl overflow-hidden border-3 border-emerald-500/60 bg-gradient-to-b from-[#062014] via-[#04160d] to-[#020b06] shadow-2xl touch-none cursor-crosshair"
      >
        {/* Background Jungle Environment Details */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-30 flex flex-col items-center">
            <span className="text-4xl sm:text-5xl text-amber-500/40">𓉞</span>
            <span className="font-pixel text-[8px] sm:text-[9px] text-emerald-400/50">K'ÁAX SAGRADO</span>
          </div>
          <div className="absolute top-6 left-8 text-3xl opacity-50">🌴</div>
          <div className="absolute top-12 right-10 text-3xl opacity-50">🌿</div>
          <div className="absolute bottom-8 left-12 text-3xl opacity-50">🍃</div>
          <div className="absolute bottom-10 right-14 text-3xl opacity-50">🌴</div>
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-amber-300 rounded-full animate-ping" />
          <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-emerald-300 rounded-full animate-ping" style={{ animationDelay: '1.2s' }} />
        </div>

        {/* Stationary Endangered Animals */}
        {animals.map((an) => {
          if (an.isRescued) return null;
          const distToRanger = Math.hypot(an.x - rangerPos.x, an.y - rangerPos.y);
          const isNearTorch = torches.some((t) => Math.hypot(an.x - t.x, an.y - t.y) < torchLightRadius);
          const isSpotted = distToRanger < flashlightRadius + 10 || isNearTorch || ambientDarknessOpacity < 0.45;

          return (
            <div
              key={an.id}
              className={`absolute z-20 transition-all duration-300 pointer-events-none flex flex-col items-center ${
                isSpotted ? 'opacity-100 scale-105' : 'opacity-0 scale-75'
              }`}
              style={{
                left: `${an.x}px`,
                top: `${an.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative text-3xl sm:text-4xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] animate-bounce" style={{ animationDuration: '2.5s' }}>
                <span>{an.emoji}</span>
                <span className="absolute -top-2.5 -right-2 text-xs animate-ping">🐾</span>
              </div>
              <span className="mt-0.5 font-pixel text-[8px] px-2 py-0.5 rounded-full bg-slate-950/90 text-amber-300 border border-amber-400/60 whitespace-nowrap shadow-md">
                {an.mayaName}
              </span>
            </div>
          );
        })}

        {/* Planted Static Torches */}
        {torches.map((torch) => (
          <div
            key={torch.id}
            className="absolute z-[25] pointer-events-none flex flex-col items-center animate-in zoom-in-75 duration-300"
            style={{
              left: `${torch.x}px`,
              top: `${torch.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute -inset-12 bg-amber-400/25 rounded-full blur-xl animate-pulse pointer-events-none" />
            <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-slate-950/90 border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]">
              <span className="text-lg sm:text-xl anim-torch-fire">🔥</span>
              <span className="text-xl sm:text-2xl">{torch.animalEmoji}</span>
              <span className="font-pixel text-[7px] sm:text-[8px] text-emerald-300 whitespace-nowrap hidden sm:inline">
                {torch.mayaName}
              </span>
            </div>
          </div>
        ))}

        {/* Dynamic SVG Darkness Mask */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30">
          <defs>
            <radialGradient id="flashlight-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="1" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="torch-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="1" />
              <stop offset="75%" stopColor="#000000" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </radialGradient>
            <mask id="jungle-fog-mask">
              <rect width="100%" height="100%" fill="#ffffff" />
              <circle cx={rangerPos.x} cy={rangerPos.y} r={flashlightRadius} fill="url(#flashlight-grad)" />
              {torches.map((t) => (
                <circle key={t.id} cx={t.x} cy={t.y} r={torchLightRadius} fill="url(#torch-grad)" />
              ))}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#020a05"
            opacity={ambientDarknessOpacity}
            mask="url(#jungle-fog-mask)"
            className="transition-opacity duration-700"
          />
        </svg>

        {/* Flashlight Glow Ring around Player */}
        <div
          className="absolute z-[35] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none border border-amber-300/30 shadow-[0_0_35px_rgba(254,240,138,0.22)]"
          style={{
            left: `${rangerPos.x}px`,
            top: `${rangerPos.y}px`,
            width: `${flashlightRadius * 2}px`,
            height: `${flashlightRadius * 2}px`,
          }}
        />

        {/* Ranger / Player Character */}
        <div
          className="absolute z-40 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] pointer-events-none flex flex-col items-center"
          style={{ left: `${rangerPos.x}px`, top: `${rangerPos.y}px` }}
        >
          <span>🧑🏽‍🌾</span>
          <span className="font-pixel text-[7px] text-amber-300 bg-slate-950/90 px-1.5 py-0.5 rounded-full border border-amber-400/50">
            Guardián
          </span>
        </div>
      </div>

      {/* Bottom Dock: Info Banner + Torches + Compact D-Pad */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex-1 w-full flex flex-col gap-1.5">
          <div
            className={`px-3.5 py-2 rounded-xl text-center sm:text-left text-xs sm:text-sm font-semibold border-2 transition-all shadow-md ${
              tipMessage.type === 'ok'
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200'
                : tipMessage.type === 'bad'
                ? 'bg-red-950/90 border-red-400 text-red-200'
                : 'bg-slate-900/90 border-emerald-600/50 text-slate-200'
            }`}
          >
            {tipMessage.text}
          </div>

          <div className="flex items-center justify-between gap-2 text-[11px] text-emerald-300/80 px-1">
            <span>Toca la selva, usa WASD/flechas o los botones:</span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-400/70 text-amber-200 font-pixel text-[10px] shrink-0">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>
                {torches.length}/{RESCUE_TARGET}
              </span>
              {torches.length === RESCUE_TARGET && <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />}
            </span>
          </div>
        </div>

        {/* Compact D-Pad */}
        <div className="grid grid-cols-3 gap-1.5 w-36 shrink-0">
          <div />
          <button
            type="button"
            aria-label="Mover arriba"
            onPointerDown={startDir('up')}
            onPointerUp={stopDir('up')}
            onPointerLeave={stopDir('up')}
            onPointerCancel={stopDir('up')}
            className="h-10 rounded-xl bg-slate-800/90 active:bg-emerald-600 border-2 border-emerald-500/60 active:border-amber-400 text-emerald-200 active:text-white flex items-center justify-center font-bold text-base shadow-md active:scale-95 transition-all touch-none cursor-pointer"
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
            className="h-10 rounded-xl bg-slate-800/90 active:bg-emerald-600 border-2 border-emerald-500/60 active:border-amber-400 text-emerald-200 active:text-white flex items-center justify-center font-bold text-base shadow-md active:scale-95 transition-all touch-none cursor-pointer"
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
            className="h-10 rounded-xl bg-slate-800/90 active:bg-emerald-600 border-2 border-emerald-500/60 active:border-amber-400 text-emerald-200 active:text-white flex items-center justify-center font-bold text-base shadow-md active:scale-95 transition-all touch-none cursor-pointer"
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
            className="h-10 rounded-xl bg-slate-800/90 active:bg-emerald-600 border-2 border-emerald-500/60 active:border-amber-400 text-emerald-200 active:text-white flex items-center justify-center font-bold text-base shadow-md active:scale-95 transition-all touch-none cursor-pointer"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
