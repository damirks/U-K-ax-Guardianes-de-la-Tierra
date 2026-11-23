import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Play, User, Compass, Shield, ArrowLeft, Check } from 'lucide-react';
import { PlayerProfile } from '../types';
import { soundService } from '../services/sound';
import { NPCAvatar } from './NPCAvatar';

interface TitleScreenProps {
  initialProfile: PlayerProfile;
  onStart: (profile: PlayerProfile) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const AVATAR_OPTIONS = ['🧑🏽‍🌾', '🧝🏽', '🧑🏽', '👩🏽‍🌾', '🧒🏽', '🐆'];

export const TitleScreen: React.FC<TitleScreenProps> = ({
  initialProfile,
  onStart,
  isMuted,
  onToggleMute,
}) => {
  // Step 1: title screen, Step 2: registration form
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState(initialProfile.name || '');
  const [avatar, setAvatar] = useState(initialProfile.avatar || '🧑🏽‍🌾');
  const [npcGuide, setNpcGuide] = useState(initialProfile.npcGuide || 'Ixchel');

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (showRegister && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showRegister]);

  // Handle Enter key for Step 1 -> Step 2 -> Game Map
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!showRegister) {
          // Advance from title screen to registration
          soundService.playSuccess();
          soundService.playThemeMusic();
          setShowRegister(true);
        } else {
          // Submit registration and start the game
          handleSubmit();
        }
      } else if (e.key === 'Escape' && showRegister) {
        setShowRegister(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showRegister, name, avatar, npcGuide]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = name.trim().slice(0, 22) || 'Guardián';
    const finalNpc = npcGuide.trim().slice(0, 22) || 'Ixchel';

    soundService.playFanfare();
    onStart({
      name: finalName,
      avatar,
      npcGuide: finalNpc,
    });
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between overflow-x-hidden bg-gradient-to-b from-sky-400 via-sky-300 via-emerald-200 to-green-950 text-slate-900 py-2.5 sm:py-4 px-3 select-none">
      {/* Sound toggle button */}
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-slate-900/85 backdrop-blur-md border-2 border-amber-400 text-amber-300 shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />}
      </button>

      {/* ======================================================================
          DYNAMIC AMBIENT SKY: Sun, Clouds, Birds, Floating Fireflies & Butterflies
          ====================================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Pixel Golden Sun with pulsing aura */}
        <div className="absolute top-5 right-8 md:right-24 w-20 md:w-28 h-20 md:h-28 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-yellow-100 anim-sun" />

        {/* Pixel Cloud 1 */}
        <div className="absolute top-10 left-6 md:left-24 anim-cloud-1 opacity-90">
          <div className="relative w-28 md:w-40 h-7 md:h-9 bg-white/95 rounded-sm shadow-sm" />
          <div className="absolute -top-4 left-6 w-14 md:w-20 h-5 md:h-7 bg-white/95 rounded-sm" />
          <div className="absolute -top-2 left-16 w-10 md:w-16 h-4 md:h-5 bg-white/95 rounded-sm" />
        </div>

        {/* Pixel Cloud 2 */}
        <div className="absolute top-20 right-1/4 anim-cloud-2 opacity-80">
          <div className="relative w-24 md:w-36 h-6 md:h-8 bg-white/90 rounded-sm shadow-sm" />
          <div className="absolute -top-3 left-5 w-12 md:w-18 h-5 md:h-6 bg-white/90 rounded-sm" />
        </div>

        {/* Flying Pixel Birds */}
        <div className="absolute top-14 left-1/3 anim-bird-1 text-slate-800 text-lg font-bold">
          ◆
        </div>
        <div className="absolute top-10 right-1/3 anim-bird-2 text-slate-700 text-sm font-bold">
          ◆
        </div>

        {/* Floating Tropical Butterflies */}
        <div className="absolute top-44 left-[15%] anim-butterfly-1 text-2xl md:text-3xl filter drop-shadow-md">
          🦋
        </div>
        <div className="absolute top-52 right-[18%] anim-butterfly-2 text-xl md:text-2xl filter drop-shadow-md">
          🦋
        </div>

        {/* Twinkling Pixel Stars in Upper Sky */}
        <div className="absolute top-6 left-[12%] text-amber-200 text-xs anim-star-twinkle" style={{ animationDelay: '0s' }}>✦</div>
        <div className="absolute top-14 left-[22%] text-yellow-100 text-[10px] anim-star-twinkle" style={{ animationDelay: '0.7s' }}>★</div>
        <div className="absolute top-8 left-[45%] text-amber-100 text-xs anim-star-twinkle" style={{ animationDelay: '1.3s' }}>✦</div>
        <div className="absolute top-16 right-[38%] text-yellow-200 text-[10px] anim-star-twinkle" style={{ animationDelay: '1.9s' }}>✦</div>
        <div className="absolute top-6 right-[16%] text-amber-100 text-xs anim-star-twinkle" style={{ animationDelay: '0.4s' }}>★</div>

        {/* Glowing Fireflies floating from grass */}
        <div className="absolute bottom-28 left-[28%] w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_10px_#fde047] anim-firefly-1" />
        <div className="absolute bottom-36 right-[30%] w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_10px_#86efac] anim-firefly-2" />
        <div className="absolute bottom-20 left-[48%] w-2 h-2 rounded-full bg-yellow-200 shadow-[0_0_10px_#fef08a] anim-firefly-3" />
        <div className="absolute bottom-40 left-[12%] w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_10px_#fde047] anim-firefly-2" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 right-[12%] w-2.5 h-2.5 rounded-full bg-lime-200 shadow-[0_0_10px_#bef264] anim-firefly-1" style={{ animationDelay: '1.7s' }} />
        <div className="absolute bottom-48 left-[65%] w-1.5 h-1.5 rounded-full bg-yellow-100 shadow-[0_0_8px_#fef9c3] anim-firefly-3" style={{ animationDelay: '2.5s' }} />

        {/* Swaying Giant Tropical Leaves on screen edges */}
        <div className="absolute bottom-12 -left-4 text-7xl md:text-9xl anim-leaves-left opacity-90 filter drop-shadow-lg">
          🌿
        </div>
        <div className="absolute bottom-12 -right-4 text-7xl md:text-9xl anim-leaves-right opacity-90 filter drop-shadow-lg">
          🌿
        </div>

        {/* Ambient jungle mist near ground */}
        <div className="absolute bottom-16 inset-x-0 h-16 bg-gradient-to-t from-white/30 to-transparent anim-mist pointer-events-none" />
      </div>

      {/* ======================================================================
          TOP HEADER: Eyebrow + Big Arcade Logo
          ====================================================================== */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-2 pt-2">
        {/* Eyebrow Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/75 border border-amber-400/80 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-pixel text-[8px] md:text-[10px] text-amber-200 uppercase tracking-widest">
            ✦ UNA AVENTURA PARA CUIDAR NUESTRO MUNDO ✦
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* Game Title Logo */}
        <header className="anim-logo-title flex flex-col items-center text-center my-0.5">
          <div className="text-2xl md:text-3xl tracking-widest filter drop-shadow-[0_4px_0_#143a25] mb-[-6px]">
            🌿 🍃 🌿
          </div>
          <div className="logo-scanline-wrap">
            <h1 className="m-0 font-pixel text-4xl sm:text-6xl md:text-7xl font-black text-amber-400 tracking-tight leading-none filter drop-shadow-[0_5px_0_#854d0e] [text-shadow:3px_3px_0_#78350f,6px_6px_0_#451a03,0_0_25px_rgba(251,191,36,0.6)]">
              U K'áax
            </h1>
          </div>
          <div className="retro-wood-plank px-5 md:px-8 py-2 md:py-2.5 rounded-lg mt-2 text-center">
            <span className="font-pixel text-xs sm:text-sm md:text-lg tracking-wider text-amber-100 font-extrabold uppercase">
              GUARDIANES DE LA TIERRA
            </span>
          </div>
          <div className="font-pixel text-[8px] md:text-[10px] text-emerald-950 font-bold tracking-widest mt-1.5 uppercase drop-shadow-[0_1px_0_#fff]">
            APRENDE · EXPLORA · PROTEGE · EN MAAYA T'AAN
          </div>
        </header>
      </div>

      {/* ======================================================================
          CENTRAL ANIMATED LANDSCAPE: Mountains, Mayan Pyramid, Scenery & Guardian
          ====================================================================== */}
      <div className="relative z-10 w-full max-w-4xl h-[175px] sm:h-[225px] md:h-[255px] my-1.5 flex items-end justify-center overflow-hidden rounded-2xl border-4 border-emerald-900/60 shadow-2xl bg-gradient-to-b from-sky-300 via-emerald-100 to-emerald-200">
        {/* Parallax Mountains */}
        <div className="absolute bottom-10 left-[10%] pixel-mountain-back opacity-60 scale-90" />
        <div className="absolute bottom-10 right-[12%] pixel-mountain-front opacity-75 scale-95" />

        {/* Central Mayan Pyramid with glowing sunbeams and doorway */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-32 sm:h-44 retro-pyramid z-10 flex flex-col items-center justify-end">
          {/* Glowing Temple Doorway */}
          <div className="w-6 sm:w-8 h-9 sm:h-12 bg-amber-950 border-2 border-amber-600 rounded-t-sm shadow-[0_0_16px_rgba(251,191,36,0.95)] relative">
            <div className="absolute inset-x-0 bottom-0 h-5 bg-amber-400/80 animate-pulse" />
          </div>
        </div>

        {/* Scenery Miniatures scattered dynamically with gentle floating */}
        <div className="absolute bottom-9 left-[2%] sm:left-[5%] z-20 w-16 sm:w-22 anim-scenery-bob hover:scale-110 transition-transform">
          <img
            src="./assets/aistudio/CHEEM__Aventura_sobre_el_agua_e41c5e12.png"
            alt="Cheém"
            className="w-full h-auto filter drop-shadow-[0_5px_4px_rgba(0,0,0,0.55)] rounded-lg"
          />
        </div>

        <div
          className="absolute bottom-7 left-[20%] sm:left-[23%] z-20 w-18 sm:w-26 anim-scenery-bob hover:scale-110 transition-transform"
          style={{ animationDelay: '0.8s' }}
        >
          <img
            src="./assets/escenarios/kaax.png"
            alt="K'áax"
            className="w-full h-auto filter drop-shadow-[0_5px_4px_rgba(0,0,0,0.55)] image-rendering-pixelated"
          />
        </div>

        <div
          className="absolute bottom-7 right-[20%] sm:right-[23%] z-20 w-18 sm:w-26 anim-scenery-bob hover:scale-110 transition-transform"
          style={{ animationDelay: '1.4s' }}
        >
          <img
            src="./assets/escenarios/parque.png"
            alt="Parque"
            className="w-full h-auto filter drop-shadow-[0_5px_4px_rgba(0,0,0,0.55)] image-rendering-pixelated"
          />
        </div>

        <div
          className="absolute bottom-9 right-[2%] sm:right-[5%] z-20 w-16 sm:w-22 anim-scenery-bob hover:scale-110 transition-transform"
          style={{ animationDelay: '2.1s' }}
        >
          <img
            src="./assets/escenarios/escuela.png"
            alt="Escuela"
            className="w-full h-auto filter drop-shadow-[0_5px_4px_rgba(0,0,0,0.55)] image-rendering-pixelated"
          />
        </div>

        {/* Retro Pixel Ground Layer */}
        <div className="absolute bottom-0 inset-x-0 h-8 retro-pixel-ground z-20" />
        <div className="absolute -bottom-4 inset-x-0 h-4 retro-pixel-dirt z-20" />

        {/* Stone Path to Pyramid */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-9 retro-stone-path z-20" />

        {/* Animated Guardian Character on the Path */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 anim-guardian flex flex-col items-center">
          <span className="text-3xl sm:text-4xl filter drop-shadow-[0_4px_3px_rgba(0,0,0,0.6)]">
            {avatar}
          </span>
          <span className="font-pixel text-[7px] text-amber-200 bg-slate-900/90 px-1.5 py-0.5 rounded border border-amber-400 mt-[-3px] whitespace-nowrap shadow-md">
            {name.trim() || 'Guardián'}
          </span>
        </div>
      </div>

      {/* ======================================================================
          STEP 1: INITIAL START ACTION BUTTON (FULL VIEW)
          ====================================================================== */}
      {!showRegister && (
        <div className="relative z-20 w-full max-w-md flex flex-col items-center gap-3 my-2">
          {/* Big arcade pulsing start button */}
          <button
            type="button"
            id="start-tap"
            onClick={() => {
              soundService.playSuccess();
              soundService.playThemeMusic();
              setShowRegister(true);
            }}
            className="anim-enter-btn card-shimmer w-full py-4 sm:py-5 px-6 rounded-2xl border-4 border-amber-300 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 text-amber-950 font-pixel text-xs sm:text-base font-black flex items-center justify-center gap-3 cursor-pointer shadow-2xl hover:brightness-110 active:translate-y-1 transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>▶ ENTER PARA INICIAR</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-400/50 backdrop-blur-md text-amber-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Presiona [Enter] o toca el botón para comenzar tu aventura</span>
          </div>
        </div>
      )}

      {/* ======================================================================
          STEP 2: MODAL DE REGISTRO DE INFO DEL GUARDIÁN (DESPUÉS DEL PRIMER ENTER)
          ====================================================================== */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form
            onSubmit={handleSubmit}
            className="anim-modal-pop w-full max-w-md p-5 sm:p-6 rounded-2xl bg-slate-900 border-4 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.35)] text-left flex flex-col gap-3.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/40">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                <h2 className="font-pixel text-xs sm:text-sm text-amber-300">
                  REGISTRO DEL GUARDIÁN
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                className="text-xs text-slate-400 hover:text-slate-100 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Configura tu personaje para iniciar la travesía por los 8 escenarios de <strong className="text-amber-300">U K'áax</strong>:
            </p>

            {/* Guardian Name */}
            <div>
              <label htmlFor="modal-pname" className="block text-xs font-bold text-slate-200 mb-1">
                Nombre de tu Usuario / Guardián:
              </label>
              <input
                ref={inputRef}
                id="modal-pname"
                type="text"
                maxLength={22}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Damir, Guardián..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border-2 border-emerald-500/70 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors font-medium shadow-inner"
              />
            </div>

            {/* Avatar Selection */}
            <div>
              <span className="block text-xs font-bold text-slate-200 mb-1.5">
                Elige tu Avatar:
              </span>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`text-2xl sm:text-3xl p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center ${
                      avatar === av
                        ? 'border-amber-400 bg-amber-400/30 scale-110 shadow-lg shadow-amber-400/50 ring-2 ring-amber-300'
                        : 'border-slate-700 bg-slate-800/80 hover:border-slate-500 hover:scale-105'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* NPC Guide Name with Real Portrait */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 border border-emerald-500/40">
              <NPCAvatar variant="guide" name={npcGuide || 'Ixchel'} size="sm" />
              <div className="flex-1 min-w-0">
                <label htmlFor="modal-pnpc" className="block text-xs font-bold text-slate-200 mb-1">
                  Nombre de tu Guía Ancestral (NPC):
                </label>
                <input
                  id="modal-pnpc"
                  type="text"
                  maxLength={22}
                  value={npcGuide}
                  onChange={(e) => setNpcGuide(e.target.value)}
                  placeholder="Ixchel"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-emerald-500/70 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors font-medium shadow-inner"
                />
              </div>
            </div>

            {/* Enter Button to Map */}
            <button
              type="submit"
              className="anim-enter-btn w-full mt-2 py-3.5 sm:py-4 rounded-xl border-3 border-amber-300 bg-gradient-to-b from-emerald-500 via-emerald-600 to-green-800 text-white font-pixel text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:brightness-110 active:translate-y-1 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>▶ ENTER PARA ENTRAR AL MAPA</span>
            </button>

            <span className="text-[10px] text-center text-slate-400">
              Presiona [Enter] para acceder a todos los minijuegos
            </span>
          </form>
        </div>
      )}

      {/* ======================================================================
          FOOTER TAGLINE & INSTRUCTIONS
          ====================================================================== */}
      <footer className="relative z-10 w-full max-w-xl text-center flex flex-col items-center gap-1 pt-1 pb-2">
        <div className="font-pixel text-[8px] md:text-[9px] text-emerald-950 font-bold">
          <span>🌱</span> CADA RESPUESTA TE ACERCA A UN MUNDO MEJOR <span>🌎</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-emerald-900 font-semibold">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-emerald-800" />
            <span>Presiona [Enter] en tu teclado para comenzar</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-800" />
            <span>8 Minijuegos y MayaTets</span>
          </span>
        </div>
      </footer>
    </div>
  );
};
