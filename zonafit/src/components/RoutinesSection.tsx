'use client';

import React, { useState } from 'react';
import { Activity, Clock, Flame, Play, Dumbbell, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ROUTINES_DATA } from '@/data/routines';
import { Routine, GoalType } from '@/types';
import { RoutinePlayer } from './RoutinePlayer';
import { useFitness } from '@/context/FitnessContext';

export const RoutinesSection: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('Todos');
  const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);
  const { addCompletedWorkout } = useFitness();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredRoutines = ROUTINES_DATA.filter((r) => {
    if (selectedGoal === 'Todos') return true;
    return r.goal === selectedGoal;
  });

  const handleQuickComplete = (routine: Routine, e: React.MouseEvent) => {
    e.stopPropagation();
    addCompletedWorkout({
      routineId: routine.id,
      routineName: routine.name,
      goal: routine.goal,
      durationMinutes: routine.durationMinutes,
      exercisesCount: routine.exerciseCount,
      notes: 'Marcada como completada rápidamente.'
    });
    setToastMessage(`¡Rutina "${routine.name}" registrada con éxito!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161622] border border-[#e50914] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-[#e50914]" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#2c2c3e] text-xs font-semibold text-[#ff505d]">
          <Activity className="w-3.5 h-3.5 text-[#e50914]" />
          <span>Rutinas Guiadas Paso a Paso</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Elegí tu rutina
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Encontrá una rutina y seguí los ejercicios paso a paso.
        </p>
      </div>

      {/* Goal Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
        {['Todos', 'Resistencia', 'Fuerza', 'Mantenerse activo'].map((goal) => {
          const isSelected = selectedGoal === goal;
          return (
            <button
              key={goal}
              onClick={() => setSelectedGoal(goal)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/40 scale-105'
                  : 'bg-[#15151e] text-gray-300 hover:bg-[#20202c] hover:text-white border border-[#262638]'
              }`}
            >
              {goal === 'Todos' ? 'Todas las Rutinas' : goal}
            </button>
          );
        })}
      </div>

      {/* Routines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredRoutines.map((routine) => (
          <div
            key={routine.id}
            className="group bg-[#121218] border border-[#242434] hover:border-[#e50914]/60 hover:shadow-2xl hover:shadow-[#e50914]/15 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer"
            onClick={() => setActiveRoutine(routine)}
          >
            {/* Routine banner with badge */}
            <div className="relative h-48 overflow-hidden bg-black">
              <img
                src={routine.image}
                alt={routine.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/40 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#e50914] text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                  {routine.goal}
                </span>
                <span className="bg-black/70 backdrop-blur-md text-gray-200 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
                  {routine.level}
                </span>
              </div>

              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                <div className="w-14 h-14 rounded-full bg-[#e50914] flex items-center justify-center text-white shadow-xl shadow-[#e50914]/50 scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Routine Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#ff4b58] transition-colors">
                  {routine.name}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {routine.description}
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-2 bg-[#171722] p-3 rounded-xl border border-[#222230] text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-[#e50914]" />
                  <span className="font-bold text-white">{routine.durationMinutes} min</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-300 border-l border-[#282838]">
                  <Dumbbell className="w-3.5 h-3.5 text-[#ff4b58]" />
                  <span className="font-bold text-white">{routine.exerciseCount} ejercicios</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setActiveRoutine(routine)}
                  className="w-full py-3 px-4 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#e50914]/25 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Ver rutina & Entrenar</span>
                </button>

                <button
                  onClick={(e) => handleQuickComplete(routine, e)}
                  className="w-full py-2 px-3 rounded-lg bg-[#181824] hover:bg-[#202030] text-gray-400 hover:text-emerald-400 text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Registrar si ya realizaste esta rutina"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Marcar como ya realizada hoy</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Routine Interactive Player Modal */}
      <RoutinePlayer
        routine={activeRoutine}
        onClose={() => setActiveRoutine(null)}
      />

    </div>
  );
};
