'use client';

import React from 'react';
import { Target, Trophy, Flame, Dumbbell, CalendarCheck, Clock, Award, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useFitness } from '@/context/FitnessContext';

export const ProgressSection: React.FC = () => {
  const { completedWorkouts, profile } = useFitness();

  const totalRoutines = completedWorkouts.length;
  const totalExercises = completedWorkouts.reduce((acc, curr) => acc + curr.exercisesCount, 0);
  const totalMinutes = completedWorkouts.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  // Calculate unique active days
  const uniqueDays = new Set(
    completedWorkouts.map((w) => w.completedAt.split('T')[0])
  ).size;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#2c2c3e] text-xs font-semibold text-[#ff505d]">
          <Target className="w-3.5 h-3.5 text-[#e50914]" />
          <span>Seguimiento y Constancia</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Mi progreso
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Observá el registro de las actividades que fuiste realizando y mantené tu constancia semana tras semana.
        </p>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Rutinas Realizadas */}
        <div className="bg-[#121218] border border-[#242434] p-6 rounded-2xl relative overflow-hidden group hover:border-[#e50914]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-gray-400">Rutinas Realizadas</span>
            <div className="w-10 h-10 rounded-xl bg-[#e50914]/20 flex items-center justify-center text-[#ff4b58]">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-black text-white">{totalRoutines}</span>
            <span className="text-xs text-gray-400 block mt-1">sesiones completadas</span>
          </div>
        </div>

        {/* Metric 2: Ejercicios Completados */}
        <div className="bg-[#121218] border border-[#242434] p-6 rounded-2xl relative overflow-hidden group hover:border-[#e50914]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-gray-400">Ejercicios Completados</span>
            <div className="w-10 h-10 rounded-xl bg-[#e50914]/20 flex items-center justify-center text-[#ff4b58]">
              <Dumbbell className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-black text-white">{totalExercises}</span>
            <span className="text-xs text-gray-400 block mt-1">ejercicios ejecutados</span>
          </div>
        </div>

        {/* Metric 3: Días de Actividad */}
        <div className="bg-[#121218] border border-[#242434] p-6 rounded-2xl relative overflow-hidden group hover:border-[#e50914]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-gray-400">Días de Actividad</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-black text-white">{uniqueDays}</span>
            <span className="text-xs text-gray-400 block mt-1">días con entrenamiento</span>
          </div>
        </div>

        {/* Metric 4: Objetivo Seleccionado */}
        <div className="bg-[#121218] border border-[#242434] p-6 rounded-2xl relative overflow-hidden group hover:border-[#e50914]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-gray-400">Objetivo Actual</span>
            <div className="w-10 h-10 rounded-xl bg-[#e50914]/20 flex items-center justify-center text-[#ff4b58]">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl sm:text-2xl font-black text-[#ff4b58] truncate block">
              {profile.primaryGoal}
            </span>
            <span className="text-xs text-gray-400 block mt-1">configurado en tu perfil</span>
          </div>
        </div>

      </div>

      {/* Highlights & Minutes Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Workout History Table / List */}
        <div className="lg:col-span-8 bg-[#121218] border border-[#242434] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#20202e]">
            <div>
              <h3 className="text-lg font-bold text-white">Historial de Entrenamientos</h3>
              <p className="text-xs text-gray-400">Registro detallado de tus últimas sesiones realizadas</p>
            </div>
            <span className="text-xs bg-[#1a1a26] text-gray-300 px-3 py-1 rounded-full border border-[#2e2e40]">
              {completedWorkouts.length} registros
            </span>
          </div>

          {completedWorkouts.length === 0 ? (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <Award className="w-10 h-10 mx-auto text-gray-600" />
              <p className="text-sm font-medium">Aún no has registrado entrenamientos.</p>
              <p className="text-xs text-gray-500">Completá una rutina o marcala desde la sección de Rutinas.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedWorkouts.map((w) => {
                const dateObj = new Date(w.completedAt);
                const formattedDate = dateObj.toLocaleDateString('es-AR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });

                return (
                  <div
                    key={w.id}
                    className="p-4 rounded-xl bg-[#161620] border border-[#262638] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-gray-600 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#e50914] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                          {w.goal}
                        </span>
                        <h4 className="text-sm font-bold text-white">{w.routineName}</h4>
                      </div>
                      <p className="text-xs text-gray-400">
                        {w.notes || 'Entrenamiento completado.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-300 self-end sm:self-center shrink-0">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#e50914]" />
                        <span>{w.durationMinutes} min</span>
                      </div>
                      <span className="text-gray-400">{formattedDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Constancy & Total Time Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-[#181216] via-[#14141c] to-[#121218] border border-[#e50914]/40 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#e50914]">
              <TrendingUp className="w-5 h-5" />
              <h4 className="text-sm font-bold text-white uppercase">Tiempo Total de Actividad</h4>
            </div>

            <div className="py-2">
              <span className="text-4xl font-black text-white">{totalMinutes}</span>
              <span className="text-sm text-gray-400 ml-2">minutos acumulados</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Cada minuto de ejercicio ayuda a mejorar tu capacidad cardiovascular, fortalecer tus músculos y liberar endorfinas. ¡Mantené el ritmo!
            </p>
          </div>

          <div className="bg-[#121218] border border-[#242434] rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Nivel de Constancia
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Progreso Semanal</span>
                <span className="text-[#ff4b58] font-bold">
                  {Math.min(uniqueDays * 25, 100)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#1e1e2c] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#e50914] to-[#ff4b58]"
                  style={{ width: `${Math.min(uniqueDays * 25, 100)}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-400 block pt-1">
                Meta recomendada: Al menos 3 a 4 días por semana.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
