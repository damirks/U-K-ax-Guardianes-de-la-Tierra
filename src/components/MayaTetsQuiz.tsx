import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, Trophy } from 'lucide-react';
import { UNIQUE_DICTIONARY } from '../data/dictionary';
import { soundService } from '../services/sound';
import { VocabWord } from '../types';
import { ParticleBurst } from './ParticleBurst';

interface MayaTetsQuizProps {
  onBack: () => void;
}

export const MayaTetsQuiz: React.FC<MayaTetsQuizProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<{
    word: VocabWord;
    options: string[];
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Generate question
  const loadQuestion = () => {
    const target = UNIQUE_DICTIONARY[Math.floor(Math.random() * UNIQUE_DICTIONARY.length)];
    const otherMeanings = [
      ...new Set(UNIQUE_DICTIONARY.map((w) => w.es).filter((e) => e !== target.es)),
    ];
    const shuffledOthers = otherMeanings.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [target.es, ...shuffledOthers].sort(() => Math.random() - 0.5);

    setCurrentQuestion({ word: target, options });
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleSelectOption = (chosenEs: string) => {
    if (isAnswered || !currentQuestion) return;
    setIsAnswered(true);
    setSelectedAnswer(chosenEs);

    const isCorrect = chosenEs === currentQuestion.word.es;
    if (isCorrect) {
      soundService.playSuccess();
      setScore((s) => s + 1);
    } else {
      soundService.playError();
    }
  };

  const handleNext = () => {
    soundService.playClick();
    if (currentIndex + 1 >= 10) {
      setIsFinished(true);
      soundService.playFanfare();
    } else {
      setCurrentIndex((i) => i + 1);
      loadQuestion();
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col items-center py-8 px-4">
      {/* Back to map button */}
      <div className="w-full max-w-xl flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => {
            soundService.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 border border-purple-400/50 text-purple-200 hover:bg-slate-700 text-xs font-heading font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a escenarios</span>
        </button>
        <div className="font-pixel text-[10px] text-amber-400">
          MayaTets · Quiz Maya
        </div>
      </div>

      <div className="relative overflow-hidden w-full max-w-xl p-6 md:p-8 rounded-3xl bg-slate-900/90 border-4 border-purple-400 shadow-2xl flex flex-col items-center text-center">
        {!isFinished && currentQuestion && isAnswered && selectedAnswer === currentQuestion.word.es && (
          <ParticleBurst key={`quiz-burst-${currentIndex}`} variant="burst" />
        )}
        {isFinished && score >= 5 && <ParticleBurst variant="rain" />}
        {!isFinished && currentQuestion ? (
          <>
            {/* Progress counter */}
            <div className="flex items-center justify-between w-full border-b border-purple-500/30 pb-3 mb-4">
              <span className="font-pixel text-xs text-purple-300">
                Pregunta {currentIndex + 1} de 10
              </span>
              <span className="font-pixel text-xs text-amber-300">
                Aciertos: {score}
              </span>
            </div>

            <h2 className="font-heading font-bold text-base md:text-lg text-slate-200 mb-2">
              ¿Qué significa en español la palabra maya?
            </h2>

            <div className="font-pixel text-2xl md:text-3xl text-amber-300 bg-amber-400/10 px-8 py-3 rounded-2xl border-2 border-amber-400 my-4 shadow-inner">
              «{currentQuestion.word.maya}»
            </div>

            {/* Multiple choice options */}
            <div className="flex flex-col gap-2.5 w-full my-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.word.es;

                let btnStyle = 'bg-slate-800 border-purple-400/50 hover:bg-slate-700 text-slate-100';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600 border-emerald-400 text-white font-bold ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-600 border-red-400 text-white font-bold';
                  } else {
                    btnStyle = 'bg-slate-900 border-slate-700 text-slate-400 opacity-50';
                  }
                }

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(option)}
                    className={`p-3.5 rounded-xl border-2 font-heading font-bold text-xs md:text-sm text-left transition-all cursor-pointer shadow-md flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-200 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Next question button */}
            {isAnswered && (
              <button
                type="button"
                onClick={handleNext}
                className="btn-pixel btn-pixel-gold w-full mt-2 py-3.5 text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg animate-bounce"
                style={{ animationDuration: '2s' }}
              >
                <span>{currentIndex + 1 >= 10 ? 'Ver resultado final' : 'Siguiente pregunta ▶'}</span>
              </button>
            )}
          </>
        ) : (
          /* Finished Quiz summary */
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h2 className="font-pixel text-base md:text-xl text-amber-300">
              ¡Quiz MayaTets Terminado!
            </h2>
            <div className="font-pixel text-3xl text-emerald-400 bg-emerald-950/60 px-6 py-3 rounded-2xl border-2 border-emerald-400">
              {score} / 10
            </div>
            <p className="font-heading font-bold text-sm md:text-base text-slate-300 max-w-md">
              {score >= 8
                ? '¡Extraordinario, Guardián Supremo del maaya t\'aan! Dominas la lengua sagrada.'
                : score >= 5
                ? '¡Muy buen esfuerzo! Cada palabra aprendida fortalece la cultura maya.'
                : '¡Buen intento! Sigue explorando los escenarios para dominar más palabras.'}
            </p>

            <button
              type="button"
              onClick={onBack}
              className="btn-pixel btn-pixel-gold px-8 py-3 text-xs rounded-xl mt-4 cursor-pointer"
            >
              Volver al mapa de escenarios
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
