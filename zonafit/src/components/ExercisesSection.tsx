'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, RefreshCw, Eye, Dumbbell, Film } from 'lucide-react';
import { EXERCISES_DATA } from '@/data/exercises';
import { Exercise } from '@/types';
import { ExerciseModal } from './ExerciseModal';
import { useFitness } from '@/context/FitnessContext';

export const ExercisesSection: React.FC = () => {
  const { activeGoalFilter, setActiveGoalFilter } = useFitness();
  
  // Local filter states
  const [selectedGoal, setSelectedGoal] = useState<string>(activeGoalFilter || 'Todos');
  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Applied filters (triggered when clicking "BUSCAR")
  const [appliedFilters, setAppliedFilters] = useState({
    goal: activeGoalFilter || 'Todos',
    level: 'Todos',
    type: 'Todos',
    query: ''
  });

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Sync if context changed
  React.useEffect(() => {
    if (activeGoalFilter && activeGoalFilter !== appliedFilters.goal) {
      setSelectedGoal(activeGoalFilter);
      setAppliedFilters(prev => ({ ...prev, goal: activeGoalFilter }));
    }
  }, [activeGoalFilter]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      goal: selectedGoal,
      level: selectedLevel,
      type: selectedType,
      query: searchQuery.trim().toLowerCase()
    });
    setActiveGoalFilter(selectedGoal);
  };

  const handleReset = () => {
    setSelectedGoal('Todos');
    setSelectedLevel('Todos');
    setSelectedType('Todos');
    setSearchQuery('');
    setAppliedFilters({
      goal: 'Todos',
      level: 'Todos',
      type: 'Todos',
      query: ''
    });
    setActiveGoalFilter('Todos');
  };

  const filteredExercises = useMemo(() => {
    return EXERCISES_DATA.filter((item) => {
      const matchGoal = appliedFilters.goal === 'Todos' || item.goal === appliedFilters.goal;
      const matchLevel = appliedFilters.level === 'Todos' || item.level === appliedFilters.level;
      const matchType = appliedFilters.type === 'Todos' || item.type === appliedFilters.type;
      const matchQuery =
        !appliedFilters.query ||
        item.name.toLowerCase().includes(appliedFilters.query) ||
        item.description.toLowerCase().includes(appliedFilters.query);

      return matchGoal && matchLevel && matchType && matchQuery;
    });
  }, [appliedFilters]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#2c2c3e] text-xs font-semibold text-[#ff505d]">
          <Dumbbell className="w-3.5 h-3.5 text-[#e50914]" />
          <span>Catálogo de Ejercicios en Casa</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Encontrá tu ejercicio
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Elegí una categoría y encontrá ejercicios con demostración en video/GIF que se adapten a tu objetivo.
        </p>
      </div>

      {/* Filter Box: "Buscá el ejercicio que necesitás" */}
      <div className="bg-[#111116] border border-[#242434] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e50914]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#20202e]">
          <Filter className="w-5 h-5 text-[#e50914]" />
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
            Buscá el ejercicio que necesitás
          </h3>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-6">
          
          {/* Search bar input */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre (ej: sentadillas, plancha, flexiones...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181822] text-white placeholder-gray-500 pl-12 pr-4 py-3.5 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] outline-none text-sm transition-all"
            />
          </div>

          {/* Filters Grid: Objetivo, Nivel, Tipo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* 1. Objetivo */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Objetivo
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full bg-[#181822] text-gray-200 py-3 px-4 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm cursor-pointer"
              >
                <option value="Todos">Todos los objetivos</option>
                <option value="Resistencia">Resistencia</option>
                <option value="Fuerza">Fuerza</option>
                <option value="Mantenerse activo">Mantenerse activo</option>
              </select>
            </div>

            {/* 2. Nivel */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Nivel
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-[#181822] text-gray-200 py-3 px-4 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm cursor-pointer"
              >
                <option value="Todos">Todos los niveles</option>
                <option value="Fácil">Fácil (Principiante)</option>
                <option value="Medio">Medio (Intermedio)</option>
                <option value="Difícil">Difícil (Avanzado)</option>
              </select>
            </div>

            {/* 3. Tipo */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Tipo / Músculo
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#181822] text-gray-200 py-3 px-4 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm cursor-pointer"
              >
                <option value="Todos">Todos los tipos</option>
                <option value="Piernas">Piernas</option>
                <option value="Brazos">Brazos</option>
                <option value="Abdomen">Abdomen</option>
                <option value="Cuerpo completo">Cuerpo completo</option>
              </select>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1a1a24] hover:bg-[#242432] text-gray-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 border border-[#2a2a3a] transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Limpiar filtros</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-[#e50914]/40 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>BUSCAR</span>
            </button>
          </div>

        </form>
      </div>

      {/* Results Header / Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400 font-medium">
          Mostrando <span className="text-white font-bold">{filteredExercises.length}</span> ejercicios disponibles
        </p>
        {appliedFilters.goal !== 'Todos' && (
          <span className="text-xs bg-[#e50914]/20 border border-[#e50914]/40 text-[#ff505d] px-3 py-1 rounded-full font-semibold">
            Filtrado por: {appliedFilters.goal}
          </span>
        )}
      </div>

      {/* Exercise Cards Grid */}
      {filteredExercises.length === 0 ? (
        <div className="text-center py-16 bg-[#121218] border border-[#222230] rounded-2xl p-8 space-y-4">
          <Dumbbell className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No se encontraron ejercicios</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Probá cambiando los filtros o el término de búsqueda para ver más ejercicios disponibles.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-[#e50914] text-white font-bold text-xs uppercase"
          >
            Ver todos los ejercicios
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => {
            const displayImage = exercise.gif || exercise.image;

            return (
              <div
                key={exercise.id}
                className="group bg-[#13131a] border border-[#22222e] hover:border-[#e50914]/60 hover:shadow-xl hover:shadow-[#e50914]/10 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                {/* Exercise Image or GIF */}
                <div className="relative h-48 overflow-hidden bg-[#0d0d12]">
                  <img
                    src={displayImage}
                    alt={exercise.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-[#13131a]/30 to-transparent" />
                  
                  {/* Badges on top of card */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-[#e50914] text-white text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full shadow">
                      {exercise.goal}
                    </span>
                    
                    {exercise.gif ? (
                      <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow flex items-center gap-1 animate-pulse">
                        <Film className="w-3 h-3" />
                        <span>GIF DEMO</span>
                      </span>
                    ) : (
                      <span className="bg-black/60 backdrop-blur-md text-gray-200 text-[11px] font-medium px-2 py-0.5 rounded-full border border-white/10">
                        {exercise.level}
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-2 left-3 text-[11px] font-semibold text-gray-300 bg-[#161622]/90 px-2 py-0.5 rounded border border-[#2a2a3a]">
                    {exercise.type}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#ff4b58] transition-colors line-clamp-1">
                      {exercise.name}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {exercise.description}
                    </p>
                  </div>

                  {/* Bottom details & button */}
                  <div className="space-y-3 pt-2 border-t border-[#1e1e2c]">
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>Sugerido:</span>
                      <span className="font-semibold text-gray-200 truncate max-w-[130px]">
                        {exercise.durationOrReps.split(' ')[0]} {exercise.durationOrReps.split(' ')[1] || ''}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedExercise(exercise)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#e50914]/20 transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver ejercicio {exercise.gif ? '& GIF' : ''}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Exercise Modal Detail */}
      <ExerciseModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />

    </div>
  );
};
