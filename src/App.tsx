import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { GameScreen, LevelConfig, PlayerProfile, VocabWord, Achievement } from './types';
import { LEVELS } from './data/levels';
import { ACHIEVEMENTS } from './data/achievements';
import { soundService } from './services/sound';
import { TitleScreen } from './components/TitleScreen';
import { MapSelectScreen } from './components/MapSelectScreen';
import { LevelIntroModal } from './components/LevelIntroModal';
import { GameHUD } from './components/GameHUD';
import { CanoaGame } from './components/minigames/CanoaGame';
import { ClasificaGame } from './components/minigames/ClasificaGame';
import { SiembraGame } from './components/minigames/SiembraGame';
import { CadaGotaCuentaGame } from './components/minigames/CadaGotaCuentaGame';
import { RescateGame } from './components/minigames/RescateGame';
import { MemoriaGame } from './components/minigames/MemoriaGame';
import { ConstruyeGame } from './components/minigames/ConstruyeGame';
import { MercadoGame } from './components/minigames/MercadoGame';
import { TemploGame } from './components/minigames/TemploGame';
import { MayaTetsQuiz } from './components/MayaTetsQuiz';
import { VocabModal } from './components/VocabModal';
import { ResultModal } from './components/ResultModal';
import { VictoryScreen } from './components/VictoryScreen';
import { ParticleBurst } from './components/ParticleBurst';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('TITLE');
  const [isMuted, setIsMuted] = useState(false);

  // Persistence state
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('ukaax-completed') || '{}');
    } catch {
      return {};
    }
  });

  const [attemptsUsed, setAttemptsUsed] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem('ukaax-attempts') || '{}');
    } catch {
      return {};
    }
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ukaax-achievements') || '[]');
    } catch {
      return [];
    }
  });
  const [achievementToast, setAchievementToast] = useState<Achievement | null>(null);

  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>(() => {
    try {
      return {
        name: localStorage.getItem('ukaax-player-name') || '',
        avatar: localStorage.getItem('ukaax-player-avatar') || '🧑🏽‍🌾',
        npcGuide: localStorage.getItem('ukaax-npc-name') || 'Ixchel',
      };
    } catch {
      return { name: '', avatar: '🧑🏽‍🌾', npcGuide: 'Ixchel' };
    }
  });

  const [allGlossary, setAllGlossary] = useState<VocabWord[]>([]);

  // Current level play state
  const [activeLevelIndex, setActiveLevelIndex] = useState<number | null>(null);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [gameKey, setGameKey] = useState(1);

  // HUD stats for current game
  const [hudStats, setHudStats] = useState({
    lives: 3,
    maxLives: 3,
    goalCount: 0,
    goalTarget: 8,
    timeLeft: 60,
  });
  const [activeUnlockedWords, setActiveUnlockedWords] = useState<VocabWord[]>([]);

  // Modals inside gameplay
  const [showVocabModal, setShowVocabModal] = useState(false);
  const [failureMessage, setFailureMessage] = useState<string>('');
  const [resultModalData, setResultModalData] = useState<{
    won: boolean;
    message: string;
  } | null>(null);

  // Update profile and persist
  const handleUpdateProfile = (profile: PlayerProfile) => {
    setPlayerProfile(profile);
    try {
      localStorage.setItem('ukaax-player-name', profile.name);
      localStorage.setItem('ukaax-player-avatar', profile.avatar);
      localStorage.setItem('ukaax-npc-name', profile.npcGuide);
    } catch {}
  };

  // Unlock Guardian Achievement
  const unlockAchievement = useCallback((achId: string) => {
    setUnlockedAchievements((prev) => {
      if (prev.includes(achId)) return prev;
      const next = [...prev, achId];
      try {
        localStorage.setItem('ukaax-achievements', JSON.stringify(next));
      } catch {}
      const ach = ACHIEVEMENTS.find((a) => a.id === achId);
      if (ach) {
        soundService.playFanfare();
        setAchievementToast(ach);
        setTimeout(() => setAchievementToast(null), 4500);
      }
      return next;
    });
  }, []);

  // Reset all progress (confirmed via in-app modal in MapSelectScreen)
  const handleResetProgress = () => {
    try {
      localStorage.removeItem('ukaax-player-name');
      localStorage.removeItem('ukaax-player-avatar');
      localStorage.removeItem('ukaax-npc-name');
      localStorage.removeItem('ukaax-attempts');
      localStorage.removeItem('ukaax-completed');
      localStorage.removeItem('ukaax-achievements');
    } catch {}
    setCompleted({});
    setAttemptsUsed({});
    setUnlockedAchievements([]);
    setPlayerProfile({ name: '', avatar: '🧑🏽‍🌾', npcGuide: 'Ixchel' });
    setAllGlossary([]);
    setScreen('TITLE');
  };

  // Sound toggle
  const handleToggleMute = () => {
    const next = soundService.toggleMute();
    setIsMuted(next);
  };

  // Start and keep Ecos del Mayab looping from the very first screen (TitleScreen) across the whole game
  useEffect(() => {
    if (isMuted) return;

    let cancelled = false;
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'click', 'touchend', 'keydown'];

    const removeUnlockListeners = () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUnlock));
    };

    const tryStartMusic = async () => {
      if (cancelled || isMuted) return;
      const started = await soundService.playThemeMusic();
      if (started) {
        removeUnlockListeners();
      }
    };

    const handleUnlock = () => {
      soundService.init();
      void tryStartMusic();
    };

    events.forEach((evt) => window.addEventListener(evt, handleUnlock, { passive: true }));
    void tryStartMusic();

    return () => {
      cancelled = true;
      removeUnlockListeners();
    };
  }, [screen, isMuted]);

  // Start selected level flow
  const handleSelectLevel = (idx: number) => {
    setActiveLevelIndex(idx);
    setShowIntroModal(true);
  };

  // Launch into actual minigame play area
  const handleStartMinigameNow = () => {
    setShowIntroModal(false);
    setGameKey((k) => k + 1);
    setActiveUnlockedWords([]);
    setShowVocabModal(false);
    setResultModalData(null);
    setScreen('PLAYING');
  };

  // Callback when player updates HUD stats from within minigame
  const handleUpdateStats = useCallback(
    (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => {
      setHudStats((prev) => ({
        ...prev,
        lives,
        goalCount,
        goalTarget,
        timeLeft,
      }));
    },
    []
  );

  // Minigame won
  const handleMinigameSuccess = (unlockedWords: VocabWord[]) => {
    if (activeLevelIndex === null) return;
    const currentLevel = LEVELS[activeLevelIndex];

    const nextCompleted = { ...completed, [currentLevel.id]: true };
    setCompleted(nextCompleted);
    try {
      localStorage.setItem('ukaax-completed', JSON.stringify(nextCompleted));
    } catch {}

    // Check Guardian Achievement unlocks
    if (currentLevel.id === 'kaax') {
      unlockAchievement('rescate_maestro');
    } else if (currentLevel.id === 'casa') {
      unlockAchievement('rio_cristalino');
    } else if (currentLevel.id === 'escuela') {
      unlockAchievement('clasificador_experto');
    } else if (currentLevel.id === 'parque') {
      unlockAchievement('sembrador_ceiba');
    } else if (currentLevel.id === 'gotas') {
      unlockAchievement('guardian_del_agua');
    } else if (currentLevel.id === 'memoria') {
      unlockAchievement('memoria_ancestral');
    } else if (currentLevel.id === 'construye') {
      unlockAchievement('constructor_lengua');
    } else if (currentLevel.id === 'mercado') {
      unlockAchievement('comerciante_justo');
    } else if (currentLevel.id === 'templo') {
      unlockAchievement('sabio_mayatets');
    }

    // Add newly learned words to allGlossary
    setAllGlossary((prev) => {
      const merged = [...prev];
      unlockedWords.forEach((w) => {
        if (!merged.find((m) => m.maya === w.maya)) {
          merged.push(w);
        }
      });
      return merged;
    });

    setResultModalData({
      won: true,
      message: `¡Excelente trabajo, ${playerProfile.name || 'Guardián'}! Has superado ${currentLevel.name} y protegido la naturaleza.`,
    });
  };

  // Minigame failed / time out
  const handleMinigameFailure = (message: string) => {
    if (activeLevelIndex === null) return;
    const currentLevel = LEVELS[activeLevelIndex];

    const prevTries = attemptsUsed[currentLevel.id] || 0;
    const nextTries = Math.min(3, prevTries + 1);
    const updatedAttempts = { ...attemptsUsed, [currentLevel.id]: nextTries };
    setAttemptsUsed(updatedAttempts);
    try {
      localStorage.setItem('ukaax-attempts', JSON.stringify(updatedAttempts));
    } catch {}

    // Show vocab question modal from dictionary on loss of lives!
    setFailureMessage(message);
    setShowVocabModal(true);
  };

  const currentLevel = activeLevelIndex !== null ? LEVELS[activeLevelIndex] : null;
  const isFinalLevel = currentLevel?.id === LEVELS[LEVELS.length - 1].id;
  const allLevelsDone = LEVELS.every((l) => !!completed[l.id]);
  const isGrandFinale = isFinalLevel && allLevelsDone;

  // Global tactile touch/click ripple feedback
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useRef(0);

  const handleGlobalPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    const interactive = target?.closest('button, [role="button"], .btn-pixel');
    if (!interactive || (interactive as HTMLButtonElement).disabled) return;
    const id = ++rippleIdRef.current;
    const x = e.clientX;
    const y = e.clientY;
    setRipples((prev) => [...prev.slice(-4), { id, x, y }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 460);
  }, []);

  return (
    <div
      onPointerDown={handleGlobalPointerDown}
      className="relative min-h-screen w-full flex flex-col items-center justify-start bg-slate-950 font-body selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden"
    >
      {/* GLOBAL TACTILE RIPPLE OVERLAY */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="touch-ripple-ring"
          style={{ left: r.x, top: r.y }}
        />
      ))}

      {/* CELEBRATORY ACHIEVEMENT TOAST NOTIFICATION */}
      {achievementToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 border-3 border-amber-200 text-amber-950 font-pixel shadow-[0_0_40px_rgba(251,191,36,0.9)] flex items-center gap-3.5 animate-bounce pointer-events-none">
          <ParticleBurst variant="burst" className="!overflow-visible" />
          <span className="text-3xl filter drop-shadow">{achievementToast.icon}</span>
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase font-bold tracking-widest text-amber-950/80">
              🏆 ¡Nuevo Logro de Guardián!
            </span>
            <span className="text-xs sm:text-sm font-black text-amber-950">
              {achievementToast.title} · {achievementToast.mayaName}
            </span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* TITLE SCREEN */}
        {screen === 'TITLE' && (
          <motion.div
            key="TITLE"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <TitleScreen
              initialProfile={playerProfile}
              onStart={(profile) => {
                handleUpdateProfile(profile);
                soundService.init();
                setScreen('MAP_SELECT');
              }}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />
          </motion.div>
        )}

        {/* MAP / STAGE SELECT SCREEN */}
        {screen === 'MAP_SELECT' && (
          <motion.div
            key="MAP_SELECT"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <MapSelectScreen
              levels={LEVELS}
              completed={completed}
              attemptsUsed={attemptsUsed}
              playerProfile={playerProfile}
              unlockedAchievements={unlockedAchievements}
              onUpdateProfile={handleUpdateProfile}
              onResetProgress={handleResetProgress}
              onSelectLevel={handleSelectLevel}
              onStartQuiz={() => {
                unlockAchievement('sabio_mayatets');
                setScreen('MAYATETS_QUIZ');
              }}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />
          </motion.div>
        )}

        {/* ACTIVE MINIGAME PLAYING SCREEN */}
        {screen === 'PLAYING' && currentLevel && (
          <motion.div
            key={`PLAYING-${currentLevel.id}`}
            initial={{ opacity: 0, scale: 0.985, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: -10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-[100dvh] flex flex-col items-center px-2.5 py-2 sm:px-5 sm:py-3 bg-gradient-to-b from-slate-950 via-stone-950 to-slate-950"
          >
            {/* Universal Game HUD */}
            <GameHUD
              level={currentLevel}
              playerProfile={playerProfile}
              timeLeft={hudStats.timeLeft > 0 ? hudStats.timeLeft : null}
              lives={hudStats.lives}
              maxLives={hudStats.maxLives}
              goalCount={hudStats.goalCount}
              goalTarget={hudStats.goalTarget}
              attemptsLeft={Math.max(0, 3 - (attemptsUsed[currentLevel.id] || 0))}
              unlockedWords={activeUnlockedWords}
              onBackToSelect={() => setScreen('MAP_SELECT')}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />

            {/* Dedicated Minigame Play Area Viewport */}
            <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
              {currentLevel.type === 'rio' && (
                <CanoaGame
                  key={gameKey}
                  level={currentLevel}
                  onSuccess={handleMinigameSuccess}
                  onFailure={handleMinigameFailure}
                  onUpdateStats={handleUpdateStats}
                />
              )}
              {currentLevel.type === 'clasifica' && (
                <ClasificaGame
                  key={gameKey}
                  level={currentLevel}
                  onSuccess={handleMinigameSuccess}
                  onFailure={handleMinigameFailure}
                  onUpdateStats={handleUpdateStats}
                />
              )}
              {currentLevel.type === 'siembra' && (
                <SiembraGame
                  key={gameKey}
                  level={currentLevel}
                  onSuccess={handleMinigameSuccess}
                  onFailure={handleMinigameFailure}
                  onUpdateStats={handleUpdateStats}
                />
              )}
              {currentLevel.type === 'gotas' && (
                <CadaGotaCuentaGame
                  key={gameKey}
                  level={currentLevel}
                  onSuccess={handleMinigameSuccess}
                  onFailure={handleMinigameFailure}
                  onUpdateStats={handleUpdateStats}
                />
              )}
              {currentLevel.type === 'rescate' && (
                <RescateGame
                  key={gameKey}
                  level={currentLevel}
                  onSuccess={handleMinigameSuccess}
                  onFailure={handleMinigameFailure}
                  onUpdateStats={handleUpdateStats}
                />
              )}
              {currentLevel.type === 'memory' && (
                <MemoriaGame
                  key={gameKey}
                  level={currentLevel}
                  onSuccess={handleMinigameSuccess}
                  onFailure={handleMinigameFailure}
                  onUpdateStats={handleUpdateStats}
                />
              )}
              {currentLevel.type === 'spell' && (
                <ConstruyeGame
                  key={gameKey}
                  level={currentLevel}
                  onSuccess={handleMinigameSuccess}
                  onFailure={handleMinigameFailure}
                  onUpdateStats={handleUpdateStats}
                />
              )}
              {currentLevel.type === 'market' && (
                <MercadoGame
                  key={gameKey}
                  level={currentLevel}
                  onSuccess={handleMinigameSuccess}
                  onFailure={handleMinigameFailure}
                  onUpdateStats={handleUpdateStats}
                />
              )}
              {currentLevel.type === 'temple' && (
                <TemploGame
                  key={gameKey}
                  level={currentLevel}
                  onSuccess={handleMinigameSuccess}
                  onFailure={handleMinigameFailure}
                  onUpdateStats={handleUpdateStats}
                />
              )}
            </div>

            {/* Vocab Question Modal on Losing Lives */}
            {showVocabModal && currentLevel && (
              <VocabModal
                npcName={playerProfile.npcGuide}
                levelVocab={currentLevel.vocab}
                failureReason={failureMessage}
                attemptsLeft={Math.max(0, 3 - (attemptsUsed[currentLevel.id] || 0))}
                onContinue={(newWord) => {
                  setShowVocabModal(false);
                  if (newWord) {
                    setActiveUnlockedWords((prev) => {
                      if (prev.find((w) => w.maya === newWord.maya)) return prev;
                      return [...prev, newWord];
                    });
                    setAllGlossary((prev) => {
                      if (prev.find((w) => w.maya === newWord.maya)) return prev;
                      return [...prev, newWord];
                    });
                  }
                  const remaining = Math.max(0, 3 - (attemptsUsed[currentLevel.id] || 0));
                  if (remaining > 0) {
                    setGameKey((k) => k + 1);
                  } else {
                    setResultModalData({
                      won: false,
                      message: failureMessage || 'Has agotado tus 3 oportunidades en este santuario.',
                    });
                  }
                }}
                onBackToMap={() => {
                  setShowVocabModal(false);
                  setScreen('MAP_SELECT');
                }}
              />
            )}

            {/* Result / Victory / Retry Modal */}
            {resultModalData && (
              <ResultModal
                won={resultModalData.won}
                message={resultModalData.message}
                attemptsLeft={Math.max(0, 3 - (attemptsUsed[currentLevel.id] || 0))}
                isGrandFinale={isGrandFinale}
                onRetry={() => {
                  setResultModalData(null);
                  setGameKey((k) => k + 1);
                }}
                onContinue={() => {
                  setResultModalData(null);
                  if (isGrandFinale) {
                    setScreen('VICTORY');
                  } else {
                    setScreen('MAP_SELECT');
                  }
                }}
                onBackToMap={() => {
                  setResultModalData(null);
                  setScreen('MAP_SELECT');
                }}
              />
            )}
          </motion.div>
        )}

        {/* MAYATETS QUIZ SCREEN */}
        {screen === 'MAYATETS_QUIZ' && (
          <motion.div
            key="MAYATETS_QUIZ"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <MayaTetsQuiz onBack={() => setScreen('MAP_SELECT')} />
          </motion.div>
        )}

        {/* GRAND VICTORY CEREMONY */}
        {screen === 'VICTORY' && (
          <motion.div
            key="VICTORY"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <VictoryScreen
              playerName={playerProfile.name}
              totalLevels={LEVELS.length}
              allGlossary={allGlossary}
              onRestart={() => setScreen('MAP_SELECT')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEVEL INTRO CARD MODAL */}
      {showIntroModal && currentLevel && (
        <LevelIntroModal
          level={currentLevel}
          onStart={handleStartMinigameNow}
          onBack={() => setShowIntroModal(false)}
        />
      )}
    </div>
  );
}
