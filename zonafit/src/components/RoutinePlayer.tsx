'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Check, ChevronRight, ChevronLeft, Award, Clock, Dumbbell, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Routine, Exercise } from '@/types';
import { EXERCISES_DATA } from '@/data/exercises';
import { useFitness } from '@/context/FitnessContext';
import confetti from 'canvas-confetti';

import { sound } from '@/utils/audio';

interface RoutinePlayerProps {
  routine: Routine | null;
  onClose: () => void;
  onFinish?: () => void;
}

export const RoutinePlayer: React.FC<RoutinePlayerProps> = ({ routine, onClose, onFinish }) => {
  const { addCompletedWorkout } = useFitness();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    setSoundEnabled(sound.isEnabled());
  }, []);

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  useEffect(() => {
    if (routine) {
      setCurrentStepIndex(0);
      setIsCompleted(false);
      setCompletedSteps({});
      setTimerSeconds(45);
      setIsTimerRunning(false);
    }
  }, [routine]);

  // Countdown timer effect with sound beeps
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 4 && prev > 1) {
            sound.playCountdownBeep();
          }
          if (prev <= 1) {
            sound.playBoxingBell();
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  if (!routine) return null;

  const currentRoutineExercise = routine.exercises[currentStepIndex];
  const exerciseData = EXERCISES_DATA.find((e) => e.id === currentRoutineExercise?.exerciseId);

  const toggleStepCompleted = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleNextStep = () => {
    if (currentStepIndex < routine.exercises.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setTimerSeconds(45);
      setIsTimerRunning(false);
    } else {
      handleCompleteWorkout();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setTimerSeconds(45);
      setIsTimerRunning(false);
    }
  };

  const handleCompleteWorkout = () => {
    setIsCompleted(true);
    addCompletedWorkout({
      routineId: routine.id,
      routineName: routine.name,
      goal: routine.goal,
      durationMinutes: routine.durationMinutes,
      exercisesCount: routine.exerciseCount,
      notes: `Rutina de ${routine.goal} completada con éxito.`
    });

    // Play victory audio chime
    sound.playSuccessChime();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e50914', '#ff3b47', '#ffffff', '#ffd700']
      });
    } catch (e) {
      console.error(e);
    }

    if (onFinish) onFinish();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#121218] border border-[#2c2c3e] rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header bar */}
        <div className="p-4 sm:p-5 bg-[#0e0e14] border-b border-[#20202e] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-[#e50914] text-white text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
              {routine.goal}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {routine.name}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#18261e] border-emerald-500/40 text-emerald-400'
                  : 'bg-[#20181b] border-rose-500/30 text-rose-400'
              }`}
              title={soundEnabled ? 'Silenciar audio' : 'Activar audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1c1c28] hover:bg-[#e50914] text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Completed State View */}
        {isCompleted ? (
          <div className="p-8 sm:p-12 text-center space-y-6 my-auto">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#e50914] to-[#ff4a58] flex items-center justify-center mx-auto shadow-xl shadow-[#e50914]/40 animate-bounce">
              <Award className="w-10 h-10 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
                ¡Felicitaciones, Rutina Completada!
              </h3>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                Registramos tu entrenamiento en <strong className="text-white">Mi progreso</strong> y en tu <strong className="text-white">Calendario</strong>. ¡Excelente constancia!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto bg-[#181824] p-4 rounded-xl border border-[#28283a]">
              <div>
                <span className="text-xs text-gray-400">Duración</span>
                <span className="block text-lg font-black text-white">{routine.durationMinutes} min</span>
              </div>
              <div>
                <span className="text-xs text-gray-400">Ejercicios</span>
                <span className="block text-lg font-black text-[#ff4b58]">{routine.exerciseCount} listos</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#e50914]/30 cursor-pointer"
              >
                Volver a Rutinas
              </button>
            </div>
          </div>
        ) : (
          /* Active Workout Step View */
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Progress Bar of Routine */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
                <span>
                  Ejercicio {currentStepIndex + 1} de {routine.exercises.length}
                </span>
                <span className="text-[#e50914]">
                  {Math.round(((currentStepIndex + 1) / routine.exercises.length) * 100)}% Completado
                </span>
              </div>
              <div className="w-full h-2 bg-[#1c1c28] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#e50914] to-[#ff3b47] transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / routine.exercises.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Exercise Card */}
            {exerciseData ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#171722] p-5 rounded-2xl border border-[#28283a]">
                
                {/* Image */}
                <div className="md:col-span-5 relative h-44 sm:h-52 rounded-xl overflow-hidden bg-black">
                  <img
                    src={exerciseData.image}
                    alt={exerciseData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 px-2.5 py-0.5 rounded text-[11px] font-bold text-white">
                    {exerciseData.type}
                  </div>
                </div>

                {/* Details & Target */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {exerciseData.name}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed">
                      {exerciseData.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-[#111118] p-3 rounded-xl border border-[#222230] text-center">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Series</span>
                      <span className="text-sm font-bold text-white">{currentRoutineExercise.sets}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Objetivo</span>
                      <span className="text-sm font-bold text-[#ff4b58]">{currentRoutineExercise.repsOrDuration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Descanso</span>
                      <span className="text-sm font-bold text-gray-200">{currentRoutineExercise.restSeconds}s</span>
                    </div>
                  </div>

                  {/* Checklist mark button */}
                  <button
                    onClick={() => toggleStepCompleted(currentStepIndex)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      completedSteps[currentStepIndex]
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-[#20202e] hover:bg-[#28283a] text-gray-300 border border-[#303044]'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${completedSteps[currentStepIndex] ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <span>{completedSteps[currentStepIndex] ? '✓ Ejercicio completado' : 'Marcar este ejercicio como realizado'}</span>
                  </button>
                </div>

              </div>
            ) : null}

            {/* Interactive Timer Widget */}
            <div className="bg-[#151520] p-4 sm:p-5 rounded-2xl border border-[#28283a] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#e50914]/20 border border-[#e50914]/40 flex items-center justify-center text-[#ff4b58]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Temporizador de serie / descanso</span>
                  <div className="text-2xl font-black text-white tracking-widest font-mono">
                    {formatTimer(timerSeconds)}
                  </div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase flex items-center gap-2 cursor-pointer transition-colors ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-[#e50914] hover:bg-[#ff2a39] text-white shadow-md shadow-[#e50914]/30'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pausar' : 'Iniciar Reloj'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(45);
                  }}
                  className="p-2.5 rounded-xl bg-[#20202e] hover:bg-[#28283a] text-gray-300 hover:text-white border border-[#303044] cursor-pointer"
                  title="Reiniciar a 45s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Steps Overview list */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Lista de Ejercicios en la Rutina
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {routine.exercises.map((item, idx) => {
                  const ex = EXERCISES_DATA.find((e) => e.id === item.exerciseId);
                  const isCurrent = idx === currentStepIndex;
                  const isDone = completedSteps[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentStepIndex(idx);
                        setTimerSeconds(45);
                        setIsTimerRunning(false);
                      }}
                      className={`p-2.5 rounded-xl text-left flex items-center justify-between border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#22161c] border-[#e50914] text-white'
                          : 'bg-[#14141c] border-[#222230] text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                          isDone ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-[#e50914] text-white' : 'bg-[#242434] text-gray-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold truncate">{ex?.name || item.exerciseId}</span>
                      </div>
                      <span className="text-[11px] text-gray-400 shrink-0">{item.repsOrDuration}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Footer Navigation */}
        {!isCompleted && (
          <div className="p-4 bg-[#0e0e14] border-t border-[#20202e] flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-[#1c1c28] disabled:opacity-40 hover:bg-[#252536] text-gray-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleCompleteWorkout}
              className="px-4 py-2.5 rounded-xl bg-[#1c1c28] hover:bg-[#2a2a3e] text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Finalizar y Guardar</span>
              <span className="sm:hidden">Finalizar</span>
            </button>

            <button
              onClick={handleNextStep}
              className="px-5 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#e50914]/30 transition-colors cursor-pointer"
            >
              <span>{currentStepIndex === routine.exercises.length - 1 ? 'Terminar' : 'Siguiente'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
