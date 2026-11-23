import React, { useEffect, useState, useRef } from 'react';
import { Delete } from 'lucide-react';
import { LevelConfig, VocabWord } from '../../types';
import { soundService } from '../../services/sound';

interface ConstruyeGameProps {
  level: LevelConfig;
  onSuccess: (unlockedWords: VocabWord[]) => void;
  onFailure: (message: string) => void;
  onUpdateStats: (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => void;
}

const WORDS_TARGET = 6;
const TIME_LIMIT = 140;

export const ConstruyeGame: React.FC<ConstruyeGameProps> = ({
  level,
  onSuccess,
  onFailure,
  onUpdateStats,
}) => {
  const [wordList, setWordList] = useState<VocabWord[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [tiles, setTiles] = useState<{ char: string; isUsed: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ char: string; tileIndex: number }[]>([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  const isRunningRef = useRef(true);
  const unlockedWordsRef = useRef<VocabWord[]>([]);
  const stepTimeoutRef = useRef<number | null>(null);
  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  // Sync to HUD
  useEffect(() => {
    onUpdateStats(3, currentRound, WORDS_TARGET, timeLeft);
  }, [currentRound, timeLeft, onUpdateStats]);

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
    return () => {
      clearInterval(timer);
      if (stepTimeoutRef.current) window.clearTimeout(stepTimeoutRef.current);
    };
  }, []);

  // Pick 6 random words on start
  useEffect(() => {
    const shuffled = [...level.vocab].sort(() => Math.random() - 0.5).slice(0, WORDS_TARGET);
    setWordList(shuffled);
  }, [level.vocab]);

  // Setup current round word
  useEffect(() => {
    if (wordList.length === 0 || currentRound >= wordList.length) return;
    const currentWord = wordList[currentRound];
    const letters = [...currentWord.maya].sort(() => Math.random() - 0.5);

    if (letters.join('') === currentWord.maya && letters.length > 1) {
      const temp = letters[0];
      letters[0] = letters[1];
      letters[1] = temp;
    }

    setTiles(letters.map((char) => ({ char, isUsed: false })));
    setAnswer([]);
    setHintLevel(0);
    setFeedback(null);
  }, [currentRound, wordList]);

  const currentWord = wordList[currentRound];

  const handleTilePress = (char: string, tileIndex: number) => {
    if (!isRunningRef.current || !currentWord || feedback !== null) return;
    soundService.playClick();

    setTiles((prev) =>
      prev.map((t, idx) => (idx === tileIndex ? { ...t, isUsed: true } : t))
    );

    const nextAnswer = [...answer, { char, tileIndex }];
    setAnswer(nextAnswer);

    if (nextAnswer.length === currentWord.maya.length) {
      const built = nextAnswer.map((a) => a.char).join('');
      if (built === currentWord.maya) {
        soundService.playSuccess();
        setFeedback({
          text: `¡Correcto! ${currentWord.maya} = ${currentWord.es}`,
          isError: false,
        });

        if (!unlockedWordsRef.current.find((w) => w.maya === currentWord.maya)) {
          unlockedWordsRef.current = [...unlockedWordsRef.current, currentWord];
        }

        stepTimeoutRef.current = window.setTimeout(() => {
          if (!isRunningRef.current) return;
          const nextR = currentRound + 1;
          if (nextR >= WORDS_TARGET) {
            isRunningRef.current = false;
            soundService.playFanfare();
            onSuccessRef.current(unlockedWordsRef.current);
          } else {
            setCurrentRound(nextR);
          }
        }, 950);
      } else {
        soundService.playError();
        const nextHint = hintLevel + 1;
        setHintLevel(nextHint);
        const hintPrefix =
          currentWord.maya.slice(0, Math.min(nextHint, currentWord.maya.length - 1)) ||
          currentWord.maya[0];

        setFeedback({
          text: `Así no es. Pista: empieza con “${hintPrefix}…”`,
          isError: true,
        });

        stepTimeoutRef.current = window.setTimeout(() => {
          if (!isRunningRef.current) return;
          setAnswer([]);
          setTiles((prev) => prev.map((t) => ({ ...t, isUsed: false })));
          setFeedback(null);
        }, 1100);
      }
    }
  };

  const handleBackspace = () => {
    if (answer.length === 0 || feedback !== null) return;
    soundService.playClick();
    const last = answer[answer.length - 1];
    setAnswer((prev) => prev.slice(0, prev.length - 1));
    setTiles((prev) =>
      prev.map((t, idx) => (idx === last.tileIndex ? { ...t, isUsed: false } : t))
    );
  };

  if (!currentWord) return null;

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-2.5">
      <p className="font-heading font-bold text-xs sm:text-sm text-amber-200 text-center">
        Toca las letras en orden para formar la palabra maya de la ilustración.
      </p>

      <div className="w-full p-4 sm:p-5 rounded-3xl bg-slate-900/90 border-3 sm:border-4 border-amber-400 shadow-2xl flex flex-col items-center gap-3.5">
        <div className="flex items-center gap-4">
          <div className="text-5xl sm:text-6xl p-2.5 bg-amber-400/10 rounded-2xl border-2 border-amber-400/30 filter drop-shadow">
            {currentWord.img || '🔤'}
          </div>
          <div className="text-left">
            <span className="text-[11px] text-slate-400 block">Significado en español:</span>
            <span className="font-heading font-extrabold text-lg sm:text-xl text-emerald-400">
              {currentWord.es}
            </span>
          </div>
        </div>

        {/* Letter Slots */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap min-h-11">
          {Array.from({ length: currentWord.maya.length }).map((_, i) => {
            const letter = answer[i]?.char || '';
            return (
              <div
                key={i}
                className="w-9 h-11 sm:w-10 sm:h-12 rounded-lg bg-slate-950 border-b-4 border-amber-400 flex items-center justify-center font-pixel text-sm sm:text-base text-amber-200 shadow-inner"
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* Shuffled Letter Tiles */}
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-md">
          {tiles.map((t, idx) => (
            <button
              key={idx}
              type="button"
              disabled={t.isUsed || feedback !== null}
              onClick={() => handleTilePress(t.char, idx)}
              className={`w-10 h-11 sm:w-11 sm:h-12 rounded-xl font-pixel text-sm flex items-center justify-center border-2 transition-all cursor-pointer shadow-md ${
                t.isUsed
                  ? 'bg-slate-800 border-slate-700 text-slate-600 opacity-20 cursor-default scale-95'
                  : 'bg-amber-100 border-amber-600 text-stone-900 hover:bg-amber-200 hover:-translate-y-0.5 active:translate-y-0.5'
              }`}
            >
              {t.char}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleBackspace}
          disabled={answer.length === 0 || feedback !== null}
          className="btn-pixel text-[11px] py-2 px-4 rounded-lg flex items-center gap-2 bg-slate-800 text-amber-300 border-amber-400/60 cursor-pointer disabled:opacity-30 disabled:cursor-default"
        >
          <Delete className="w-4 h-4" />
          <span>Borrar letra</span>
        </button>

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
