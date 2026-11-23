import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Instagram,
  Facebook,
  RotateCcw,
  Volume2,
  VolumeX,
  GraduationCap,
  Lock,
  CheckCircle2,
  ChevronRight,
  User,
  Sparkles,
  MessageSquare,
  RefreshCw,
  Trophy,
  Play,
  Compass,
  X,
  AlertTriangle,
} from 'lucide-react';
import { LevelConfig, PlayerProfile } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';
import { soundService } from '../services/sound';
import { NPCAvatar } from './NPCAvatar';

interface MapSelectScreenProps {
  levels: LevelConfig[];
  completed: Record<string, boolean>;
  attemptsUsed: Record<string, number>;
  playerProfile: PlayerProfile;
  unlockedAchievements: string[];
  onUpdateProfile: (profile: PlayerProfile) => void;
  onResetProgress: () => void;
  onSelectLevel: (levelIndex: number) => void;
  onStartQuiz: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const AVATAR_OPTIONS = ['🧑🏽‍🌾', '🧝🏽', '🧑🏽', '👩🏽‍🌾', '🧒🏽', '🐆'];

const MAYAN_NPC_QUOTES = [
  {
    quote:
      "¡Bix a beel, noble Guardián! Cada palabra que aprendes en maaya t'aan mantiene encendido el fuego sagrado de nuestros abuelos.",
    tag: 'Lengua Maya',
  },
  {
    quote:
      "La Madre Tierra (Lu'um) no nos pertenece; nosotros pertenecemos a ella. Cuidar cada rincón del monte (K'áax) es honrar la vida.",
    tag: 'Cuidado de Lu’um',
  },
  {
    quote:
      "El agua (Ja') de los cenotes es la sangre del Mayab. Protege los ríos para que los peces (kay) naden en aguas limpias.",
    tag: "Protección del Ja'",
  },
  {
    quote:
      "Sembrar un árbol (Che') es dar tributo a la sagrada Ceiba (Ya'ax che'), el árbol cósmico que sostiene el cielo y la tierra.",
    tag: 'Reforestación',
  },
  {
    quote:
      "El jaguar (Báalam) y las especies del K'áax son nuestros hermanos. Cuidar su hábitat es preservar el equilibrio del mundo.",
    tag: 'Fauna del Monte',
  },
  {
    quote:
      "El maaya t'aan nació del viento (iik'), del trueno (cháak) y del canto de las aves (ch'íich'). ¡Pronúncialo con orgullo!",
    tag: 'Voz Ancestral',
  },
  {
    quote:
      "¡Ko'one'ex! Avanza con valentía por los 9 santuarios. Con cada reto superado, la selva recupera su esplendor.",
    tag: 'Ánimo de Guardián',
  },
];

export const MapSelectScreen: React.FC<MapSelectScreenProps> = ({
  levels,
  completed,
  attemptsUsed,
  playerProfile,
  unlockedAchievements = [],
  onUpdateProfile,
  onResetProgress,
  onSelectLevel,
  onStartQuiz,
  isMuted,
  onToggleMute,
}) => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [showContact, setShowContact] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(playerProfile.name || '');
  const [npcInput, setNpcInput] = useState(playerProfile.npcGuide || 'Ixchel');
  const [avatarChoice, setAvatarChoice] = useState(playerProfile.avatar || '🧑🏽‍🌾');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // NPC dialogue cycle state + speaking animation
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakTimeoutRef = useRef<number | null>(null);

  // Subtle mouse parallax offset for jungle depth
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 16;
    const ny = (e.clientY / window.innerHeight - 0.5) * 10;
    setParallax({ x: nx, y: ny });
  };

  useEffect(() => {
    soundService.init();
    if (!isMuted) {
      soundService.playJungleAmbience();
    }
    return () => {
      soundService.stopJungleAmbience();
    };
  }, [isMuted]);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MAYAN_NPC_QUOTES.length);
    }, 11000);
    return () => {
      clearInterval(quoteTimer);
      if (speakTimeoutRef.current) window.clearTimeout(speakTimeoutRef.current);
    };
  }, []);

  const handleNextQuote = () => {
    soundService.playClick();
    setQuoteIndex((prev) => (prev + 1) % MAYAN_NPC_QUOTES.length);
    setIsSpeaking(true);
    if (speakTimeoutRef.current) window.clearTimeout(speakTimeoutRef.current);
    speakTimeoutRef.current = window.setTimeout(() => setIsSpeaking(false), 600);
  };

  const isLevelUnlocked = (idx: number) => {
    if (idx === 0) return true;
    return levels.slice(0, idx).every((l) => !!completed[l.id]);
  };

  const completedCount = levels.filter((l) => completed[l.id]).length;
  const nextLevelIndex = levels.findIndex((l) => !completed[l.id]);
  const nextLevel = nextLevelIndex >= 0 ? levels[nextLevelIndex] : null;
  const progressPct = Math.round((completedCount / levels.length) * 100);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nameInput.trim().slice(0, 22);
    if (!cleanName) return;
    soundService.playSuccess();
    onUpdateProfile({
      ...playerProfile,
      name: cleanName,
      avatar: avatarChoice,
      npcGuide: npcInput.trim().slice(0, 22) || 'Ixchel',
    });
    setIsEditingProfile(false);
  };

  const currentQuote = MAYAN_NPC_QUOTES[quoteIndex];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] w-full bg-gradient-to-b from-[#091f16] via-[#05140e] to-[#020906] text-slate-100 flex flex-col items-center pb-8 pt-4 px-3 sm:px-5 select-none overflow-x-hidden"
    >
      {/* AMBIENT JUNGLE BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-72 rounded-full bg-emerald-500/10 blur-3xl transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${parallax.x * -0.4}px, ${parallax.y * -0.4}px, 0)` }}
        />
        <div className="anim-map-cloud absolute top-14 left-[6%] w-48 h-10 rounded-full bg-emerald-300/5 blur-xl" />
        <div
          className="anim-map-cloud absolute top-28 right-[8%] w-64 h-12 rounded-full bg-amber-200/5 blur-xl"
          style={{ animationDelay: '-11s' }}
        />
        <div
          className="absolute bottom-0 inset-x-0 h-44 opacity-25 transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.35}px, 0)` }}
        >
          <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-full fill-[#0d3522]">
            <path d="M0,220 L0,130 Q120,75 260,135 T540,120 T820,145 T1100,105 T1360,135 L1440,120 L1440,220 Z" />
            <polygon points="690,135 725,75 760,135" fill="#13422b" />
            <rect x="717" y="67" width="16" height="10" fill="#13422b" />
          </svg>
        </div>
        <div
          className="absolute bottom-0 inset-x-0 h-28 opacity-35 transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${parallax.x * 1.1}px, ${parallax.y * 0.6}px, 0)` }}
        >
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-full fill-[#072115]">
            <path d="M0,160 L0,90 Q180,30 360,95 T720,85 T1080,95 T1440,75 L1440,160 Z" />
          </svg>
        </div>
        <span className="anim-map-firefly absolute top-[24%] left-[14%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#fde047]" />
        <span
          className="anim-map-firefly absolute top-[42%] left-[8%] w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_#6ee7b7]"
          style={{ animationDelay: '1.4s' }}
        />
        <span
          className="anim-map-firefly absolute top-[32%] right-[12%] w-2 h-2 rounded-full bg-yellow-200 shadow-[0_0_10px_#fef08a]"
          style={{ animationDelay: '2.2s' }}
        />
        <span
          className="anim-map-firefly absolute bottom-[22%] left-[24%] w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_#fde047]"
          style={{ animationDelay: '3.1s' }}
        />
      </div>

      {/* Mayan stepped top accent bar */}
      <div className="fixed top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 z-50 pointer-events-none shadow-md" />

      {/* ======================================================================
          3-ZONE NAVIGATION HEADER BAR
          ====================================================================== */}
      <header className="relative z-10 w-full max-w-6xl flex items-center justify-between gap-2 pb-3 mb-4 border-b border-emerald-800/50">
        {/* Left: Brand & Sanctuary Subtitle */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-amber-600 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
              <Compass className="w-4 h-4 text-amber-300" />
            </div>
          </div>
          <div className="min-w-0">
            <span className="font-pixel text-[10px] sm:text-xs text-amber-300 uppercase tracking-wider block truncate">
              U K'áax
            </span>
            <span className="text-[11px] text-emerald-300/80 hidden sm:block truncate">
              Aldea Maya de los Guardianes
            </span>
          </div>
        </div>

        {/* Center: Overall Sanctuary Progress Meter */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-2xl bg-slate-950/75 border border-emerald-500/35">
          <span className="text-[11px] font-semibold text-emerald-200 whitespace-nowrap">
            Santuarios: <strong className="text-amber-300 font-mono">{completedCount}/{levels.length}</strong>
          </span>
          <div className="w-28 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-300">{progressPct}%</span>
        </div>

        {/* Right: Single-line Utility Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundService.playClick();
              setShowContact(true);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-900/85 border border-amber-500/45 text-amber-200 hover:border-amber-400 hover:bg-slate-800 transition-colors text-xs font-heading font-bold whitespace-nowrap cursor-pointer min-h-[38px]"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Contacto</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundService.playClick();
              setShowAchievementsModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-400/75 text-amber-200 hover:bg-amber-500/25 transition-all text-xs font-pixel whitespace-nowrap cursor-pointer min-h-[38px]"
            title="Sagrario de Logros de Guardián"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold">
              {unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            className="p-2 rounded-xl bg-slate-900/85 border border-emerald-500/45 text-amber-300 hover:border-amber-400 transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-300" />
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT SHELL */}
      <main className="relative z-10 w-full max-w-6xl flex flex-col gap-5">
        {/* ====================================================================
            2-COLUMN HUB HERO: PROFILE + QUICK PLAY (LEFT) | REAL NPC GUIDE (RIGHT)
            ==================================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* LEFT: GUARDIAN PROFILE CARD */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#0e2d1f]/95 via-[#081d13]/95 to-[#0b271a]/95 border-2 border-emerald-500/45 p-4 sm:p-5 shadow-xl backdrop-blur-md flex flex-col justify-between gap-3.5">
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    <h2 className="font-pixel text-[11px] text-amber-300">Editar Guardián</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="text-xs text-slate-400 hover:text-amber-300 cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>

                <div>
                  <label htmlFor="pname" className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Tu nombre:
                  </label>
                  <input
                    id="pname"
                    type="text"
                    maxLength={22}
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-emerald-500/60 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-slate-300 mb-1">Tu avatar:</span>
                  <div className="grid grid-cols-6 gap-1.5">
                    {AVATAR_OPTIONS.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => setAvatarChoice(av)}
                        className={`text-xl p-1 rounded-lg border-2 transition-all cursor-pointer ${
                          avatarChoice === av
                            ? 'border-amber-400 bg-amber-400/20 scale-105'
                            : 'border-slate-700 bg-slate-800/60 hover:border-slate-500'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <NPCAvatar variant="guide" size="xs" name={npcInput} />
                  <div className="flex-1">
                    <label htmlFor="pnpc" className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                      Nombre de tu Guía Maya:
                    </label>
                    <input
                      id="pnpc"
                      type="text"
                      maxLength={22}
                      value={npcInput}
                      onChange={(e) => setNpcInput(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-emerald-500/60 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-pixel btn-pixel-emerald w-full py-2.5 text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Guardar cambios</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400/60 flex items-center justify-center text-3xl shadow-inner shrink-0">
                      {playerProfile.avatar}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300/80 block">
                        Guardián del Mayab
                      </span>
                      <h2 className="font-heading font-extrabold text-lg sm:text-xl text-amber-200 truncate">
                        {playerProfile.name || 'Guardián'}
                      </h2>
                      <p className="text-xs text-slate-300 mt-0.5 truncate">
                        Progreso: <strong className="text-emerald-300">{completedCount}/{levels.length} santuarios</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playClick();
                        setIsEditingProfile(true);
                      }}
                      className="px-2.5 py-1.5 text-[11px] text-amber-300 hover:text-amber-200 font-semibold cursor-pointer rounded-xl bg-slate-900/60 border border-amber-400/35 hover:border-amber-400 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playClick();
                        setShowResetConfirm(true);
                      }}
                      title="Reiniciar progreso"
                      aria-label="Reiniciar progreso"
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors cursor-pointer rounded-xl bg-slate-900/60 border border-slate-700/70 hover:border-red-400/50"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Quick-Launch CTA */}
                <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between gap-3">
                  {nextLevel ? (
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playClick();
                        onSelectLevel(nextLevelIndex);
                      }}
                      className="btn-pixel btn-pixel-gold card-shimmer w-full py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <Play className="w-4 h-4 shrink-0 fill-current" />
                        <span className="truncate">
                          Jugar: {nextLevel.name}
                        </span>
                      </span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playClick();
                        onStartQuiz();
                      }}
                      className="btn-pixel btn-pixel-emerald card-shimmer w-full py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 shrink-0" />
                        <span>¡Todo protegido! Desafío MayaTets</span>
                      </span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* RIGHT: REAL ILLUSTRATED NPC GUIDE BANNER */}
          <div
            onClick={handleNextQuote}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNextQuote();
              }
            }}
            className="lg:col-span-7 group rounded-3xl bg-gradient-to-r from-[#123824]/95 via-[#0c2719]/95 to-[#153e28]/95 border-2 border-emerald-500/50 hover:border-emerald-400 p-4 sm:p-5 shadow-xl backdrop-blur-md flex items-center gap-4 cursor-pointer transition-all"
          >
            <div className="flex flex-col items-center shrink-0">
              <div className="relative anim-npc-guide">
                <NPCAvatar
                  variant="guide"
                  size="lg"
                  name={playerProfile.npcGuide || 'Ixchel'}
                  speaking={isSpeaking}
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 font-pixel text-[8px] text-amber-300 bg-slate-950/95 px-2.5 py-0.5 rounded-full border border-amber-400/80 whitespace-nowrap shadow-md"
                >
                  {playerProfile.npcGuide || 'Ixchel'}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between gap-2 text-left">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-pixel text-[9px] sm:text-[10px] text-amber-300 uppercase tracking-wider">
                    Guía Ancestral Maya
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-200 px-2.5 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-500/40 whitespace-nowrap">
                  {currentQuote.tag}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-100 font-heading font-medium leading-relaxed">
                "{currentQuote.quote}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-amber-300/85 pt-2 border-t border-emerald-500/20 gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-amber-400" />
                  <span>
                    Consejo {quoteIndex + 1}/{MAYAN_NPC_QUOTES.length}
                  </span>
                </span>
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <RefreshCw className="w-3 h-3 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Toca para otro consejo</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            CLEAN SEGMENTED SECTION TABS
            ==================================================================== */}
        <nav
          aria-label="Secciones de la aldea"
          className="flex items-center justify-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-emerald-700/50 shadow-inner">
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                setActiveTab(0);
              }}
              className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
                activeTab === 0
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md'
                  : 'text-emerald-200/75 hover:text-emerald-100 hover:bg-emerald-950/60'
              }`}
            >
              01. Santuarios 1–6
            </button>

            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                setActiveTab(1);
              }}
              className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
                activeTab === 1
                  ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md'
                  : 'text-emerald-200/75 hover:text-emerald-100 hover:bg-emerald-950/60'
              }`}
            >
              02. Gran Templo y MayaTets
            </button>

            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                setActiveTab(2);
              }}
              className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                activeTab === 2
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-700 text-white shadow-md'
                  : 'text-emerald-200/75 hover:text-emerald-100 hover:bg-emerald-950/60'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>
                03. Logros ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
              </span>
            </button>
          </div>
        </nav>

        {/* ====================================================================
            TAB 0 & 1: SANCTUARY LEVEL GRID
            ==================================================================== */}
        {(activeTab === 0 || activeTab === 1) && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
            {levels.map((lvl, index) => {
              const isVisible = activeTab === 0 ? index < 6 : index >= 6;
              if (!isVisible) return null;

              const unlocked = isLevelUnlocked(index);
              const isDone = !!completed[lvl.id];
              const tries = Math.max(0, 3 - (attemptsUsed[lvl.id] || 0));
              const stageNum = String(index + 1).padStart(2, '0');
              const imgFailed = !!failedImages[lvl.id];

              return (
                <button
                  key={lvl.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => {
                    soundService.playClick();
                    onSelectLevel(index);
                  }}
                  className={`group relative text-left p-4 rounded-3xl border-2 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                    unlocked
                      ? 'mayan-stone-card card-shimmer hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/50 hover:border-emerald-400/80 cursor-pointer'
                      : 'bg-[#040e09]/85 border-emerald-950/60 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {/* Top metadata row: Stage Index + Status */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-mono text-[11px] font-bold text-amber-300/90 tracking-wider">
                      SANTUARIO {stageNum}
                    </span>
                    {isDone ? (
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 font-pixel text-[8px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Protegido</span>
                      </span>
                    ) : unlocked ? (
                      <span className="text-[11px] text-slate-300 font-semibold">
                        Intentos: <strong className="text-amber-300 font-mono">{tries}/3</strong>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Bloqueado
                      </span>
                    )}
                  </div>

                  {/* Level Artwork Frame */}
                  <div className="relative w-full h-36 mb-3 rounded-2xl overflow-hidden bg-gradient-to-b from-[#030e08] via-[#05170e] to-[#04120a] flex items-center justify-center border border-emerald-800/45 group-hover:border-emerald-500/60 transition-colors shadow-inner">
                    {unlocked && !imgFailed ? (
                      <img
                        src={lvl.art}
                        alt={lvl.name}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [lvl.id]: true }))
                        }
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      />
                    ) : unlocked && imgFailed ? (
                      <span className="text-5xl">{lvl.icon}</span>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-slate-400">
                        <Lock className="w-8 h-8 text-amber-500/70" />
                        <span className="text-[9px] font-pixel uppercase tracking-widest">
                          Supera el nivel anterior
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Level Copy */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-heading font-extrabold text-base text-amber-200 group-hover:text-amber-100 truncate">
                        {lvl.name}
                      </h3>
                      <span className="text-lg shrink-0" aria-hidden="true">
                        {lvl.icon}
                      </span>
                    </div>
                    <p className="font-heading font-bold text-xs text-emerald-400 mb-1">
                      {lvl.minigame}
                    </p>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {lvl.tagline}
                    </p>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-3 pt-2.5 border-t border-emerald-800/40 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 truncate">
                      {lvl.vocab.length} palabras mayas
                    </span>
                    {unlocked && (
                      <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:from-emerald-400 group-hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1 whitespace-nowrap">
                        <span>{isDone ? 'Rejugar' : 'Entrar'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </section>
        )}

        {/* MAYATETS QUIZ CARD IN TAB 1 */}
        {activeTab === 1 && (
          <section className="w-full max-w-2xl mx-auto p-5 rounded-3xl bg-gradient-to-r from-purple-950/90 via-slate-900/95 to-emerald-950/90 border-2 border-amber-400/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-amber-300 border border-purple-400/40 shrink-0">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-pixel text-xs sm:text-sm text-amber-300 mb-1">
                  MayaTets · Gran Quiz de Vocabulario
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                  Demuestra tu dominio del maaya t'aan con 10 preguntas del diccionario de los sabios mayas.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                onStartQuiz();
              }}
              className="btn-pixel btn-pixel-gold px-6 py-3 text-xs rounded-xl cursor-pointer whitespace-nowrap shrink-0"
            >
              Comenzar MayaTets
            </button>
          </section>
        )}

        {/* ====================================================================
            TAB 2: SAGRARIO DE LOGROS
            ==================================================================== */}
        {activeTab === 2 && (
          <section className="w-full flex flex-col items-center gap-5">
            <div className="w-full p-5 rounded-3xl bg-gradient-to-r from-[#173824]/90 via-[#0c2417]/90 to-[#1b3d29]/90 border-2 border-emerald-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-emerald-950/70 text-amber-400 border border-emerald-400/40 shrink-0">
                  <Trophy className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-amber-200">
                    Sagrario de Logros del Guardián
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Supera los desafíos en cada santuario para grabar tu nombre en la historia maya.
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-emerald-950/80 border border-emerald-400/50 text-center shrink-0">
                <span className="font-pixel text-xs text-amber-300 font-bold block">
                  {unlockedAchievements.length} / {ACHIEVEMENTS.length}
                </span>
                <span className="text-[10px] text-emerald-300 font-semibold">Desbloqueados</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {ACHIEVEMENTS.map((ach) => {
                const isUnlocked = unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-3xl border-2 transition-all flex items-start gap-3 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-[#1d3822] via-[#122b1b] to-[#0a1f13] border-emerald-400/70 shadow-lg'
                        : 'bg-[#040e09]/80 border-emerald-950/60 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 shrink-0 rounded-2xl border-2 flex items-center justify-center text-2xl shadow-md ${
                        isUnlocked
                          ? 'bg-gradient-to-b from-amber-400/30 to-emerald-900/50 border-amber-400'
                          : 'bg-slate-900 border-slate-700 text-slate-600'
                      }`}
                    >
                      {isUnlocked ? ach.icon : '🔒'}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4
                          className={`font-pixel text-[11px] truncate ${
                            isUnlocked ? 'text-amber-300' : 'text-slate-400'
                          }`}
                        >
                          {ach.title}
                        </h4>
                        <span className="text-[10px] font-semibold text-amber-300/80 shrink-0">
                          {ach.mayaName}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-snug mb-2">
                        {ach.description}
                      </p>
                      <div className="text-[10px] font-pixel">
                        {isUnlocked ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Desbloqueado</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>Por superar</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* ======================================================================
          RESET PROGRESS CONFIRMATION MODAL (No native window.confirm)
          ====================================================================== */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-slate-900 border-4 border-red-400/80 shadow-2xl text-slate-100 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-400/40 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-pixel text-xs sm:text-sm text-amber-300">
                  ¿Reiniciar Aventura?
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Esta acción no se puede deshacer.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/75 p-3.5 rounded-2xl border border-slate-800">
              Se borrarán tu nombre, avatar, santuarios completados y logros guardados para comenzar desde cero.
            </p>
            <div className="flex items-center gap-2.5 justify-end">
              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  soundService.playLifeLoss();
                  setShowResetConfirm(false);
                  onResetProgress();
                }}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 border border-red-400 text-xs font-bold text-white cursor-pointer"
              >
                Sí, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          CREATOR CONTACT MODAL
          ====================================================================== */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-slate-900 border-4 border-amber-400 shadow-2xl text-slate-100 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                setShowContact(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-amber-300 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/40">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-pixel text-sm text-amber-300">
                  Contacto con Creadores
                </h3>
                <p className="text-xs text-slate-400">
                  ¿Tienes una idea o sugerencia para el juego?
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
              ¡Nos encantará leer tus opiniones para enriquecer los santuarios de U K'áax y la preservación del maaya t'aan!
            </p>

            <div className="space-y-2">
              <a
                href="mailto:Kdamir733@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/60 transition-all text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Kdamir733@gmail.com</span>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-400/60 transition-all text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
              >
                <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Facebook: Damir Iuit</span>
              </a>
              <a
                href="https://www.instagram.com/dam_iuit/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-pink-400/60 transition-all text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <span>Instagram: @dam_iuit</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                setShowContact(false);
              }}
              className="btn-pixel btn-pixel-gold w-full py-3 text-xs rounded-xl mt-1 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ======================================================================
          DEDICATED SAGRARIO DE LOGROS MODAL
          ====================================================================== */}
      {showAchievementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-3xl max-h-[90vh] p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0e2c1c] via-[#071910] to-[#030c07] border-2 border-emerald-500/60 shadow-[0_15px_60px_rgba(4,120,87,0.4)] text-slate-100 flex flex-col animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/30 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-950/80 text-amber-400 border border-emerald-400/40">
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-amber-200">
                    Sagrario de Logros del Guardián
                  </h3>
                  <p className="text-xs text-emerald-300/80 font-medium">
                    {unlockedAchievements.length} de {ACHIEVEMENTS.length} Desafíos Superados
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  setShowAchievementsModal(false);
                }}
                className="p-2 text-slate-400 hover:text-amber-300 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Cerrar modal de logros"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full bg-slate-950 p-3 rounded-2xl border border-slate-800 mb-4 flex flex-col gap-1.5 shrink-0">
              <div className="flex justify-between text-xs text-amber-300 font-pixel">
                <span>Progreso Sagrado</span>
                <span>{Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-amber-500/30">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="overflow-y-auto pr-1 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ACHIEVEMENTS.map((ach) => {
                const isUnlocked = unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-[#1d3822] via-[#122b1b] to-[#0a1f13] border-amber-400 shadow-md'
                        : 'bg-slate-950/80 border-slate-800 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 shrink-0 rounded-2xl border-2 flex items-center justify-center text-2xl shadow-inner ${
                        isUnlocked
                          ? 'bg-gradient-to-b from-amber-400/30 to-emerald-900/50 border-amber-400'
                          : 'bg-slate-900 border-slate-700 text-slate-600'
                      }`}
                    >
                      {isUnlocked ? ach.icon : '🔒'}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4
                          className={`font-pixel text-[11px] truncate ${
                            isUnlocked ? 'text-amber-300' : 'text-slate-400'
                          }`}
                        >
                          {ach.title}
                        </h4>
                        <span className="font-pixel text-[8px] text-amber-300/80 shrink-0">
                          {ach.mayaName}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug line-clamp-2 mb-1.5 font-medium">
                        {ach.description}
                      </p>
                      <div className="text-[10px] font-pixel">
                        {isUnlocked ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Desbloqueado</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>Por desbloquear</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-amber-500/20 mt-3 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  setShowAchievementsModal(false);
                }}
                className="btn-pixel btn-pixel-gold px-6 py-2.5 text-xs rounded-xl cursor-pointer"
              >
                Volver a Santuarios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
