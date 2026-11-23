import React, { useEffect, useState, useRef } from 'react';
import { Delete } from 'lucide-react';
import { LevelConfig, VocabWord } from '../../types';
import { LEVELS } from '../../data/levels';
import { soundService } from '../../services/sound';

interface TemploGameProps {
  level: LevelConfig;
  onSuccess: (unlockedWords: VocabWord[]) => void;
  onFailure: (message: string) => void;
  onUpdateStats: (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => void;
}

const DOOR_NAMES = [
  'Puerta 1: Significado',
  'Puerta 2: Glifos y Letras',
  'Puerta 3: Imágenes Sagradas',
  'Puerta 4: Gran Prueba Final',
];

export const TemploGame: React.FC<TemploGameProps> = ({
  onSuccess,
  onFailure,
  onUpdateStats,
}) => {
  const [door, setDoor] = useState(0);
  const [lives, setLives] = useState(3);
  const [finalCorrectCount, setFinalCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  const [meaningQuestion, setMeaningQuestion] = useState<{ word: VocabWord; options: string[] } | null>(null);
  const [spellWord, setSpellWord] = useState<VocabWord | null>(null);
  const [spellTiles, setSpellTiles] = useState<{ char: string; isUsed: boolean }[]>([]);
  const [spellAnswer, setSpellAnswer] = useState<{ char: string; tileIndex: number }[]>([]);
  const [imageQuestion, setImageQuestion] = useState<{ word: VocabWord; options: string[] } | null>(null);

  const isRunningRef = useRef(true);
  const doorRef = useRef(0);
  const livesRef = useRef(3);
  const unlockedWordsRef = useRef<VocabWord[]>([]);
  const stepTimerRef = useRef<number | null>(null);
  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  const vocabPool = useRef<VocabWord[]>([]);
  const imgPool = useRef<VocabWord[]>([]);

  useEffect(() => {
    const seen = new Set<string>();
    const pool: VocabWord[] = [];
    LEVELS.filter((l) => l.id !== 'templo').forEach((l) => {
      l.vocab.forEach((w) => {
        const k = w.maya.toLowerCase();
        if (!seen.has(k)) {
          seen.add(k);
          pool.push(w);
        }
      });
    });
    vocabPool.current = pool;

    const construye = LEVELS.find((l) => l.id === 'construye');
    const mercado = LEVELS.find((l) => l.id === 'mercado');
    imgPool.current = [...(construye?.vocab || []), ...(mercado?.vocab || [])];

    return () => {
      if (stepTimerRef.current) window.clearTimeout(stepTimerRef.current);
    };
  }, []);

  // Sync to HUD
  useEffect(() => {
    onUpdateStats(lives, door, 4, 0);
  }, [door, lives, onUpdateStats]);

  const handleLoseLife = (customMsg?: string) => {
    soundService.playLifeLoss();
    const nextLives = livesRef.current - 1;
    livesRef.current = nextLives;
    setLives(nextLives);
    if (nextLives <= 0) {
      isRunningRef.current = false;
      onFailureRef.current(customMsg || 'Las puertas del templo se han cerrado. ¡Vuelve a intentarlo!');
      return true;
    }
    return false;
  };

  const handleDoorAdvance = () => {
    if (!isRunningRef.current) return;
    soundService.playSuccess();
    setFeedback(null);
    const nextDoor = doorRef.current + 1;
    if (nextDoor >= 4) {
      isRunningRef.current = false;
      soundService.playFanfare();
      onSuccessRef.current(unlockedWordsRef.current);
    } else {
      doorRef.current = nextDoor;
      setDoor(nextDoor);
    }
  };

  // Setup challenge according to door
  useEffect(() => {
    if (vocabPool.current.length === 0) return;
    setFeedback(null);

    if (door === 0 || door === 3) {
      const pool = vocabPool.current;
      const target = pool[Math.floor(Math.random() * pool.length)];
      const otherMeanings = [...new Set(pool.map((w) => w.es).filter((e) => e !== target.es))];
      const shuffledOthers = otherMeanings.sort(() => Math.random() - 0.5).slice(0, 3);
      const opts = [target.es, ...shuffledOthers].sort(() => Math.random() - 0.5);
      setMeaningQuestion({ word: target, options: opts });
    } else if (door === 1) {
      const pool = imgPool.current.length > 0 ? imgPool.current : vocabPool.current;
      const target = pool[Math.floor(Math.random() * pool.length)];
      setSpellWord(target);

      const letters = [...target.maya].sort(() => Math.random() - 0.5);
      // Prevent accidentally pre-solved word on Door 1
      if (letters.join('') === target.maya && letters.length > 1) {
        const tmp = letters[0];
        letters[0] = letters[1];
        letters[1] = tmp;
      }
      setSpellTiles(letters.map((char) => ({ char, isUsed: false })));
      setSpellAnswer([]);
    } else if (door === 2) {
      const pool = imgPool.current.length > 0 ? imgPool.current : vocabPool.current;
      const target = pool[Math.floor(Math.random() * pool.length)];
      const otherWords = [...new Set(pool.map((w) => w.maya).filter((m) => m !== target.maya))];
      const shuffledOthers = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
      const opts = [target.maya, ...shuffledOthers].sort(() => Math.random() - 0.5);
      setImageQuestion({ word: target, options: opts });
    }
  }, [door, finalCorrectCount]);

  const handleMeaningOption = (selectedEs: string) => {
    if (!meaningQuestion || feedback !== null || !isRunningRef.current) return;
    const isCorrect = selectedEs === meaningQuestion.word.es;

    if (isCorrect) {
      soundService.playSuccess();
      setFeedback({ text: '¡Correcto!', isError: false });

      if (!unlockedWordsRef.current.find((w) => w.maya === meaningQuestion.word.maya)) {
        unlockedWordsRef.current = [...unlockedWordsRef.current, meaningQuestion.word];
      }

      if (door === 3) {
        const nextCorrect = finalCorrectCount + 1;
        if (nextCorrect >= 3) {
          setFinalCorrectCount(nextCorrect);
          stepTimerRef.current = window.setTimeout(handleDoorAdvance, 750);
        } else {
          stepTimerRef.current = window.setTimeout(() => {
            if (!isRunningRef.current) return;
            setFinalCorrectCount(nextCorrect);
          }, 700);
        }
      } else {
        stepTimerRef.current = window.setTimeout(handleDoorAdvance, 750);
      }
    } else {
      soundService.playError();
      setFeedback({
        text: `Incorrecto. La respuesta era: ${meaningQuestion.word.es}`,
        isError: true,
      });
      if (handleLoseLife()) return;

      stepTimerRef.current = window.setTimeout(() => {
        if (!isRunningRef.current) return;
        setFeedback(null);
        const pool = vocabPool.current;
        const target = pool[Math.floor(Math.random() * pool.length)];
        const otherMeanings = [...new Set(pool.map((w) => w.es).filter((e) => e !== target.es))];
        const opts = [target.es, ...otherMeanings.sort(() => Math.random() - 0.5).slice(0, 3)].sort(
          () => Math.random() - 0.5
        );
        setMeaningQuestion({ word: target, options: opts });
      }, 1100);
    }
  };

  const handleSpellTilePress = (char: string, tileIndex: number) => {
    if (!spellWord || feedback !== null || !isRunningRef.current) return;
    soundService.playClick();

    setSpellTiles((prev) =>
      prev.map((t, idx) => (idx === tileIndex ? { ...t, isUsed: true } : t))
    );

    const nextAns = [...spellAnswer, { char, tileIndex }];
    setSpellAnswer(nextAns);

    if (nextAns.length === spellWord.maya.length) {
      const built = nextAns.map((a) => a.char).join('');
      if (built === spellWord.maya) {
        soundService.playSuccess();
        setFeedback({ text: `¡Correcto! ${spellWord.maya} = ${spellWord.es}`, isError: false });
        if (!unlockedWordsRef.current.find((w) => w.maya === spellWord.maya)) {
          unlockedWordsRef.current = [...unlockedWordsRef.current, spellWord];
        }
        stepTimerRef.current = window.setTimeout(handleDoorAdvance, 850);
      } else {
        soundService.playError();
        setFeedback({ text: 'Palabra incorrecta.', isError: true });
        if (handleLoseLife()) return;

        stepTimerRef.current = window.setTimeout(() => {
          if (!isRunningRef.current) return;
          setSpellAnswer([]);
          setSpellTiles((prev) => prev.map((t) => ({ ...t, isUsed: false })));
          setFeedback(null);
        }, 1000);
      }
    }
  };

  const handleImageOption = (selectedMaya: string) => {
    if (!imageQuestion || feedback !== null || !isRunningRef.current) return;
    const isCorrect = selectedMaya === imageQuestion.word.maya;

    if (isCorrect) {
      soundService.playSuccess();
      setFeedback({ text: `¡Correcto! Significa: ${imageQuestion.word.es}`, isError: false });
      if (!unlockedWordsRef.current.find((w) => w.maya === imageQuestion.word.maya)) {
        unlockedWordsRef.current = [...unlockedWordsRef.current, imageQuestion.word];
      }
      stepTimerRef.current = window.setTimeout(handleDoorAdvance, 850);
    } else {
      soundService.playError();
      setFeedback({ text: `La palabra correcta era “${imageQuestion.word.maya}”.`, isError: true });
      if (handleLoseLife()) return;

      stepTimerRef.current = window.setTimeout(() => {
        if (!isRunningRef.current) return;
        setFeedback(null);
      }, 1100);
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      <div className="w-full p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-stone-900 via-amber-950 to-stone-950 border-3 sm:border-4 border-amber-500 shadow-2xl text-slate-100 flex flex-col items-center gap-3.5 select-none">
        {/* Door Progress Stepper */}
        <div className="w-full grid grid-cols-4 gap-1.5 border-b border-amber-500/30 pb-2.5">
          {DOOR_NAMES.map((name, idx) => (
            <div
              key={name}
              className={`py-1.5 px-1 rounded-lg text-center font-pixel text-[8px] sm:text-[10px] transition-all border ${
                idx < door
                  ? 'bg-emerald-600/80 border-emerald-400 text-white'
                  : idx === door
                  ? 'bg-amber-500 border-amber-300 text-slate-950 font-bold shadow-md shadow-amber-500/40'
                  : 'bg-stone-900 border-stone-800 text-stone-500'
              }`}
            >
              P.{idx + 1}
            </div>
          ))}
        </div>

        <h3 className="font-pixel text-xs sm:text-sm text-amber-300 text-center">
          {DOOR_NAMES[door]}
        </h3>

        {/* Door 0 or 3: Multiple choice meaning */}
        {(door === 0 || door === 3) && meaningQuestion && (
          <div className="w-full flex flex-col items-center gap-2.5">
            <p className="font-heading font-bold text-xs sm:text-sm text-amber-100 text-center">
              {door === 3 && `Prueba final (${finalCorrectCount}/3) — `}
              ¿Qué significa la palabra maya?
            </p>

            <div className="font-pixel text-base sm:text-xl text-amber-300 bg-amber-400/10 px-5 py-2 rounded-2xl border-2 border-amber-400 shadow-inner">
              «{meaningQuestion.word.maya}»
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-1">
              {meaningQuestion.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  disabled={feedback !== null}
                  onClick={() => handleMeaningOption(opt)}
                  className="p-3 rounded-xl bg-slate-900/90 hover:bg-amber-400 hover:text-slate-950 border-2 border-amber-500/60 font-heading font-bold text-xs sm:text-sm text-left transition-all cursor-pointer shadow-md"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Door 1: Spell challenge */}
        {door === 1 && spellWord && (
          <div className="w-full flex flex-col items-center gap-3">
            <div className="text-5xl p-2 bg-amber-400/10 rounded-2xl border border-amber-400/30">
              {spellWord.img || '🏛️'}
            </div>
            <p className="text-xs font-semibold text-amber-200 text-center">
              Forma la palabra maya que corresponde a la ilustración:
            </p>

            <div className="flex items-center justify-center gap-1.5 flex-wrap min-h-11">
              {Array.from({ length: spellWord.maya.length }).map((_, i) => (
                <div
                  key={i}
                  className="w-9 h-11 rounded-lg bg-slate-950 border-b-4 border-amber-400 flex items-center justify-center font-pixel text-sm text-amber-200"
                >
                  {spellAnswer[i]?.char || ''}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              {spellTiles.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={t.isUsed || feedback !== null}
                  onClick={() => handleSpellTilePress(t.char, idx)}
                  className={`w-10 h-11 rounded-xl font-pixel text-sm flex items-center justify-center border-2 transition-all cursor-pointer ${
                    t.isUsed
                      ? 'bg-slate-800 border-slate-700 opacity-20'
                      : 'bg-amber-100 border-amber-600 text-stone-900 hover:bg-amber-200'
                  }`}
                >
                  {t.char}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                if (spellAnswer.length === 0 || feedback !== null) return;
                const last = spellAnswer[spellAnswer.length - 1];
                setSpellAnswer((prev) => prev.slice(0, prev.length - 1));
                setSpellTiles((prev) =>
                  prev.map((t, idx) => (idx === last.tileIndex ? { ...t, isUsed: false } : t))
                );
              }}
              disabled={spellAnswer.length === 0 || feedback !== null}
              className="text-xs text-amber-300 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-30"
            >
              <Delete className="w-3.5 h-3.5" /> Borrar letra
            </button>
          </div>
        )}

        {/* Door 2: Image challenge */}
        {door === 2 && imageQuestion && (
          <div className="w-full flex flex-col items-center gap-3">
            <div className="text-5xl p-2 bg-amber-400/10 rounded-2xl border border-amber-400/30">
              {imageQuestion.word.img || '❓'}
            </div>
            <p className="font-heading font-bold text-xs sm:text-sm text-amber-200 text-center">
              Elige la palabra maya que describe esta imagen:
            </p>

            <div className="grid grid-cols-2 gap-2.5 w-full">
              {imageQuestion.options.map((maya) => (
                <button
                  key={maya}
                  type="button"
                  disabled={feedback !== null}
                  onClick={() => handleImageOption(maya)}
                  className="p-3 rounded-xl bg-slate-900 border-2 border-amber-500/70 hover:bg-amber-400 hover:text-slate-950 font-pixel text-xs text-center transition-all cursor-pointer shadow-md"
                >
                  {maya}
                </button>
              ))}
            </div>
          </div>
        )}

        {feedback && (
          <div
            className={`w-full px-3.5 py-2 rounded-xl text-center text-xs font-pixel animate-in fade-in zoom-in duration-150 ${
              feedback.isError
                ? 'bg-red-950/90 text-red-300 border border-red-500'
                : 'bg-emerald-950/90 text-emerald-300 border border-emerald-500'
            }`}
          >
            {feedback.text}
          </div>
        )}
      </div>
    </div>
  );
};
