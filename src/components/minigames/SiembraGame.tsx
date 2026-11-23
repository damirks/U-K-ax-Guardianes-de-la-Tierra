import React, { useEffect, useRef, useState } from 'react';
import { LevelConfig, VocabWord } from '../../types';
import { soundService } from '../../services/sound';

interface SiembraGameProps {
  level: LevelConfig;
  onSuccess: (unlockedWords: VocabWord[]) => void;
  onFailure: (message: string) => void;
  onUpdateStats: (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => void;
}

interface CellState {
  id: number;
  hasTree: boolean;
  isLit: boolean;
}

interface Mission {
  text: string;
  goal: number;
  durationMs: number;
  gapMs: number;
  maxActive: number;
}

const MISSIONS: Mission[] = [
  { text: 'Misión 1 · Planta 3 árboles en los cuadros con ⭐', goal: 3, durationMs: 2600, gapMs: 2000, maxActive: 1 },
  { text: 'Misión 2 · Planta 4 árboles, el campo florece', goal: 4, durationMs: 2200, gapMs: 1700, maxActive: 2 },
  { text: 'Misión 3 · Planta 5 árboles para completar la reforestación', goal: 5, durationMs: 1800, gapMs: 1400, maxActive: 2 },
];

const TOTAL_TREES_TARGET = 3 + 4 + 5; // 12
const ROWS = 3;
const COLS = 5;
const TIME_LIMIT = 150;

export const SiembraGame: React.FC<SiembraGameProps> = ({
  level,
  onSuccess,
  onFailure,
  onUpdateStats,
}) => {
  const [missionIndex, setMissionIndex] = useState(0);
  const [missionProgress, setMissionProgress] = useState(0);
  const [totalTrees, setTotalTrees] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [cells, setCells] = useState<CellState[]>(() =>
    Array.from({ length: ROWS * COLS }, (_, i) => ({
      id: i,
      hasTree: false,
      isLit: false,
    }))
  );
  const [tipMessage, setTipMessage] = useState<{ text: string; type: 'info' | 'ok' | 'bad' }>({
    text: 'Toca los cuadros de suelo fértil con ⭐ antes de que se apaguen.',
    type: 'info',
  });

  const isRunningRef = useRef(true);
  const cellsRef = useRef(cells);
  cellsRef.current = cells;
  const cellTimersRef = useRef<Set<number>>(new Set());
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  const clearCellTimers = () => {
    cellTimersRef.current.forEach((id) => window.clearTimeout(id));
    cellTimersRef.current.clear();
  };

  // Sync to HUD
  useEffect(() => {
    onUpdateStats(3, totalTrees, TOTAL_TREES_TARGET, timeLeft);
  }, [totalTrees, timeLeft, onUpdateStats]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRunningRef.current) return;
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          isRunningRef.current = false;
          clearCellTimers();
          soundService.playLifeLoss();
          onFailureRef.current('Se acabó el tiempo de siembra. ¡Vuelve a intentarlo!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
      clearCellTimers();
    };
  }, []);

  // Spawning stars logic
  useEffect(() => {
    clearCellTimers();
    const currentMission = MISSIONS[missionIndex];

    const lightOne = () => {
      if (!isRunningRef.current) return;
      const activeLit = cellsRef.current.filter((c) => c.isLit).length;
      if (activeLit >= currentMission.maxActive) return;

      const freeCells = cellsRef.current.filter((c) => !c.isLit && !c.hasTree);
      if (freeCells.length === 0) return;

      const chosen = freeCells[Math.floor(Math.random() * freeCells.length)];

      setCells((prev) =>
        prev.map((c) => (c.id === chosen.id ? { ...c, isLit: true } : c))
      );

      const timerId = window.setTimeout(() => {
        cellTimersRef.current.delete(timerId);
        if (!isRunningRef.current) return;
        setCells((prev) =>
          prev.map((c) => (c.id === chosen.id && c.isLit ? { ...c, isLit: false } : c))
        );
      }, currentMission.durationMs);

      cellTimersRef.current.add(timerId);
    };

    const interval = setInterval(lightOne, currentMission.gapMs);
    lightOne();

    return () => {
      clearInterval(interval);
      clearCellTimers();
    };
  }, [missionIndex]);

  const handleCellTap = (cell: CellState) => {
    if (!isRunningRef.current) return;

    if (!cell.isLit) {
      soundService.playClick();
      setTipMessage({
        text: cell.hasTree
          ? 'Ahí ya plantaste un árbol. Busca un cuadro fértil con ⭐.'
          : 'Ese cuadro todavía no está listo. Espera la ⭐.',
        type: 'bad',
      });
      return;
    }

    soundService.playPickup();
    setCells((prev) =>
      prev.map((c) => (c.id === cell.id ? { ...c, isLit: false, hasTree: true } : c))
    );

    const nextMissionProg = missionProgress + 1;
    const nextTotalTrees = totalTrees + 1;
    setMissionProgress(nextMissionProg);
    setTotalTrees(nextTotalTrees);

    setTipMessage({
      text: '🌳 ¡Árbol plantado! La tierra se regenera.',
      type: 'ok',
    });

    const currentMission = MISSIONS[missionIndex];
    if (nextMissionProg >= currentMission.goal) {
      const nextMission = missionIndex + 1;
      if (nextMission >= MISSIONS.length) {
        isRunningRef.current = false;
        clearCellTimers();
        soundService.playFanfare();
        onSuccess(level.vocab);
      } else {
        soundService.playSuccess();
        clearCellTimers();
        setMissionIndex(nextMission);
        setMissionProgress(0);
        setCells((prev) => prev.map((c) => ({ ...c, isLit: false, hasTree: false })));
        setTipMessage({
          text: `🎉 ¡Misión completada! ${MISSIONS[nextMission].text}`,
          type: 'ok',
        });
      }
    }
  };

  const currentMission = MISSIONS[missionIndex];

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-2.5">
      {/* Sky & Field Landscape View */}
      <div className="relative w-full rounded-2xl overflow-hidden border-3 sm:border-4 border-amber-400 shadow-2xl flex flex-col select-none">
        {/* Animated Sky */}
        <div className="relative h-11 sm:h-14 shrink-0 bg-gradient-to-b from-sky-400 to-sky-200 overflow-hidden flex items-center justify-between px-5">
          <div className="text-2xl sm:text-3xl animate-pulse">☀️</div>
          <div className="flex gap-10">
            <div className="text-xl sm:text-2xl opacity-90 animate-float">☁️</div>
            <div className="text-lg sm:text-xl opacity-80 animate-float" style={{ animationDelay: '1.2s' }}>
              ☁️
            </div>
          </div>
        </div>

        {/* Farmland Grid within Fence */}
        <div className="relative bg-gradient-to-b from-lime-600 via-green-700 to-emerald-900 py-3 px-3 sm:py-4 sm:px-6 flex items-center justify-center">
          <div className="hidden sm:block absolute top-2 left-4 text-xl filter drop-shadow">🐄</div>
          <div className="hidden sm:block absolute top-2 right-4 text-xl filter drop-shadow">🐑</div>
          <div className="hidden sm:block absolute bottom-2 left-6 text-xl filter drop-shadow">🐔</div>
          <div className="hidden sm:block absolute bottom-2 right-6 text-xl filter drop-shadow">🐴</div>

          <div className="relative w-full max-w-[320px] sm:max-w-[360px] p-2 sm:p-2.5 rounded-2xl bg-amber-950/45 border-3 sm:border-4 border-amber-800 shadow-inner">
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {cells.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleCellTap(c)}
                  className={`aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-xl sm:text-2xl transition-all cursor-pointer shadow-md ${
                    c.hasTree
                      ? 'bg-emerald-700 border-emerald-500 shadow-emerald-900/50 scale-100'
                      : c.isLit
                      ? 'bg-amber-300 border-amber-400 text-amber-950 scale-105 animate-bounce shadow-lg shadow-amber-400/50'
                      : 'bg-amber-900/80 border-amber-950 text-amber-800 hover:border-amber-700'
                  }`}
                >
                  {c.hasTree ? '🌳' : c.isLit ? '⭐' : '🟫'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Status Header */}
      <div className="w-full max-w-xl px-3.5 py-2.5 rounded-xl bg-slate-900/90 border-2 border-amber-400 text-center flex flex-col gap-0.5">
        <h4 className="font-pixel text-[10px] sm:text-xs text-amber-300">
          {currentMission.text} ({missionProgress}/{currentMission.goal})
        </h4>
        <p className={`text-xs ${tipMessage.type === 'ok' ? 'text-emerald-300' : tipMessage.type === 'bad' ? 'text-red-300' : 'text-slate-300'}`}>
          {tipMessage.text}
        </p>
      </div>
    </div>
  );
};
