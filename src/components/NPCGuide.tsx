import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, RefreshCw, Flame } from 'lucide-react';
import { soundService } from '../services/sound';
import { NPCAvatar } from './NPCAvatar';

export interface MayanQuote {
  text: string;
  mayaKeyword: string;
  meaning: string;
  theme: string;
}

export const MAYAN_INSPIRATIONAL_QUOTES: MayanQuote[] = [
  {
    text: "¡Bix a beel! Cada palabra en maaya t'aan que aprendes mantiene encendida la memoria viva de nuestros ancestros.",
    mayaKeyword: "Maaya t'aan",
    meaning: "Lengua maya",
    theme: "Herencia Lingüística",
  },
  {
    text: "La Madre Tierra (Lu'um) es nuestro hogar sagrado. Cuidar el monte (K'áax) no es una tarea, es un pacto de respeto.",
    mayaKeyword: "Lu'um / K'áax",
    meaning: "Tierra y Selva",
    theme: "Protección Ambiental",
  },
  {
    text: "El agua (Ja') de los cenotes es el corazón del Mayab. No arrojes plásticos ni basura a los arroyos para que los peces (kay) vivan libres.",
    mayaKeyword: "Ja' / Kay",
    meaning: "Agua y Pez",
    theme: "Cuidado de los Cenotes",
  },
  {
    text: "Sembrar un árbol (Che') es honrar a la gran Ceiba (Ya'ax che'), el pilar cósmico que sostiene el cielo de los mayas.",
    mayaKeyword: "Ya'ax che'",
    meaning: "Ceiba sagrada",
    theme: "Reforestación Sagrada",
  },
  {
    text: "El jaguar (Báalam) y las aves (ch'íich') son los guardianes de la selva. Proteger su hábitat preserva el equilibrio cósmico.",
    mayaKeyword: "Báalam",
    meaning: "Jaguar",
    theme: "Fauna Protegida",
  },
  {
    text: "El maaya t'aan nació del murmullo del viento (iik'), del trueno (cháak) y del rocío de la selva. ¡Hablémoslo con orgullo!",
    mayaKeyword: "Iik' / Cháak",
    meaning: "Viento y Lluvia",
    theme: "Sonidos de la Naturaleza",
  },
  {
    text: "¡Ko'one'ex, noble Guardián! Con tu sabiduría en cada santuario, nuestra cultura y la naturaleza vuelven a florecer.",
    mayaKeyword: "Ko'one'ex",
    meaning: "¡Vamos!",
    theme: "Fuerza y Esperanza",
  },
];

interface NPCGuideProps {
  guideName?: string;
  onQuoteChange?: (quote: MayanQuote) => void;
  className?: string;
}

export const NPCGuide: React.FC<NPCGuideProps> = ({
  guideName = 'Ixchel',
  onQuoteChange,
  className = '',
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-rotate dialogue every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      cycleToNextQuote(false);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const cycleToNextQuote = (playSound = true) => {
    if (playSound) {
      soundService.playClick();
    }
    setIsSpeaking(true);
    setQuoteIndex((prev) => {
      const nextIdx = (prev + 1) % MAYAN_INSPIRATIONAL_QUOTES.length;
      if (onQuoteChange) {
        onQuoteChange(MAYAN_INSPIRATIONAL_QUOTES[nextIdx]);
      }
      return nextIdx;
    });

    setTimeout(() => {
      setIsSpeaking(false);
    }, 450);
  };

  const currentQuote = MAYAN_INSPIRATIONAL_QUOTES[quoteIndex];

  return (
    <div
      onClick={() => cycleToNextQuote(true)}
      className={`group w-full max-w-3xl p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#173824]/95 via-[#0f281a]/95 to-[#1c3224]/95 border-2 border-amber-400/70 shadow-[0_6px_30px_rgba(16,185,129,0.2)] flex items-start sm:items-center gap-3.5 sm:gap-5 cursor-pointer hover:border-amber-300 transition-all backdrop-blur-md relative select-none ${className}`}
      role="region"
      aria-label="Guía Ancestral Maya"
    >
      {/* ======================================================================
          REAL ILLUSTRATED PIXEL-ART MAYAN NPC PORTRAIT
          ====================================================================== */}
      <div className="flex flex-col items-center shrink-0">
        <div className="relative anim-npc-guide">
          <NPCAvatar variant="guide" name={guideName} size="lg" speaking={isSpeaking} />
          <span className="absolute -top-2 -right-2 text-base sm:text-lg anim-torch-fire pointer-events-none">
            🔥
          </span>
        </div>

        {/* Name Tag Banner */}
        <div className="font-pixel text-[8px] sm:text-[9px] text-amber-300 bg-slate-950/95 px-2.5 py-0.5 rounded-full border border-amber-500/80 mt-2 whitespace-nowrap shadow-md flex items-center gap-1">
          <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
          <span>{guideName}</span>
        </div>
      </div>

      {/* ======================================================================
          DYNAMIC SPEECH BUBBLE WITH ROTATING QUOTE
          ====================================================================== */}
      <div className="flex-1 text-left flex flex-col justify-between min-w-0">
        {/* Category kicker and sound indicator */}
        <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-pixel text-[9px] sm:text-[10px] text-amber-300 uppercase tracking-wider">
              Voz del Guía Ancestral
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/50">
              {currentQuote.theme}
            </span>
            <span className="text-[9px] font-bold text-amber-300/90 px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 hidden sm:inline">
              Maya: <em>{currentQuote.mayaKeyword}</em>
            </span>
          </div>
        </div>

        {/* Quote text with smooth appearance */}
        <div className="my-1">
          <p className="text-xs sm:text-sm text-slate-100 font-heading font-semibold leading-relaxed tracking-wide drop-shadow-sm">
            "{currentQuote.text}"
          </p>
        </div>

        {/* Footer info: cycle counter and prompt to click */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-amber-300/80 pt-1.5 border-t border-amber-500/20">
          <span className="flex items-center gap-1 font-medium">
            <MessageSquare className="w-3 h-3 text-amber-400" />
            <span>Palabra sagrada: <strong>{currentQuote.meaning}</strong></span>
          </span>
          <span className="flex items-center gap-1 text-amber-300 group-hover:translate-x-1 transition-transform font-bold">
            <RefreshCw className="w-3 h-3 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden sm:inline">Toca para escuchar otro consejo</span>
            <span className="sm:hidden">Siguiente</span>
          </span>
        </div>
      </div>
    </div>
  );
};
