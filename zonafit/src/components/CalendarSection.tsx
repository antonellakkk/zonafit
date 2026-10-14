'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Activity, 
  Flame, 
  Clock, 
  Dumbbell, 
  Sparkles,
  Layers,
  CalendarDays
} from 'lucide-react';
import { useFitness } from '@/context/FitnessContext';
import { ROUTINES_DATA } from '@/data/routines';
import { EXERCISES_DATA } from '@/data/exercises';
import { sound } from '@/utils/audio';

export const CalendarSection: React.FC = () => {
  const {
    scheduledActivities,
    toggleScheduledActivity,
    addScheduledActivity,
    deleteScheduledActivity,
    completedWorkouts
  } = useFitness();

  const todayIso = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayIso);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [weekOffset, setWeekOffset] = useState<number>(0); // 0 = current week, 1 = next, -1 = prev
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [activityType, setActivityType] = useState<'routine' | 'exercise' | 'custom'>('routine');
  const [selectedRoutineId, setSelectedRoutineId] = useState(ROUTINES_DATA[0]?.id || '');
  const [selectedExerciseId, setSelectedExerciseId] = useState(EXERCISES_DATA[0]?.id || '');
  const [customActivityName, setCustomActivityName] = useState('');
  const [activityTimeSlot, setActivityTimeSlot] = useState('18:00');

  /* =========================================================================
     1. WEEK VIEW CALCULATIONS
     ========================================================================= */
  const getDaysOfWeek = () => {
    const base = new Date();
    // Apply week offset
    base.setDate(base.getDate() + weekOffset * 7);

    const currentDayOfWeek = base.getDay(); // 0 is Sunday, 1 is Monday...
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const monday = new Date(base);
    monday.setDate(base.getDate() + distanceToMonday);

    const week = [];
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      week.push({
        name: dayNames[i],
        dayNumber: d.getDate(),
        isoDate: iso,
        isToday: iso === todayIso
      });
    }
    return week;
  };

  const weekDays = getDaysOfWeek();

  /* =========================================================================
     2. MONTH VIEW CALCULATIONS
     ========================================================================= */
  const getDaysOfMonth = () => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    // Monday as start (0 is Monday, 6 is Sunday)
    const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;

    const days = [];

    // Empty slots before month start
    for (let i = 0; i < startDayIndex; i++) {
      days.push({ dayNumber: null, isoDate: '' });
    }

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const iso = d.toISOString().split('T')[0];
      days.push({
        dayNumber: i,
        isoDate: iso,
        isToday: iso === todayIso
      });
    }

    return days;
  };

  const monthDays = getDaysOfMonth();
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const handleResetToday = () => {
    setSelectedDate(todayIso);
    setWeekOffset(0);
    setCurrentMonthDate(new Date());
    sound.playClick();
  };

  /* =========================================================================
     3. ACTIVITIES & STREAK CALCULATIONS
     ========================================================================= */
  const activitiesForSelectedDate = scheduledActivities.filter(
    (act) => act.date === selectedDate
  );

  const workoutsCompletedOnDate = completedWorkouts.filter(
    (w) => w.completedAt.split('T')[0] === selectedDate
  );

  // Calculate workout streak
  const calculateStreak = () => {
    let streak = 0;
    const checkDate = new Date();
    
    // Check if user did something today or yesterday
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(checkDate.getDate() - i);
      const iso = d.toISOString().split('T')[0];

      const hasActivity = 
        scheduledActivities.some((a) => a.date === iso && a.completed) ||
        completedWorkouts.some((w) => w.completedAt.split('T')[0] === iso);

      if (hasActivity) {
        streak++;
      } else if (i > 0) {
        // Break streak if missed day (allow today to be empty without breaking yet)
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  const handleToggle = (id: string, currentlyCompleted: boolean) => {
    if (!currentlyCompleted) {
      sound.playBoxingBell();
    } else {
      sound.playClick();
    }
    toggleScheduledActivity(id);
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();

    let name = '';
    let targetId = 'custom';
    let type: 'routine' | 'exercise' = 'routine';

    if (activityType === 'routine') {
      const r = ROUTINES_DATA.find((item) => item.id === selectedRoutineId);
      name = r ? r.name : 'Rutina ZonaFit';
      targetId = selectedRoutineId;
      type = 'routine';
    } else if (activityType === 'exercise') {
      const ex = EXERCISES_DATA.find((item) => item.id === selectedExerciseId);
      name = ex ? `Ejercicio: ${ex.name}` : 'Ejercicio';
      targetId = selectedExerciseId;
      type = 'exercise';
    } else {
      name = customActivityName.trim() || 'Entrenamiento Libre';
      targetId = 'custom';
      type = 'routine';
    }

    if (activityTimeSlot) {
      name = `[${activityTimeSlot}] ${name}`;
    }

    addScheduledActivity({
      date: selectedDate,
      activityName: name,
      type,
      targetId
    });

    sound.playSuccessChime();
    setShowAddModal(false);
    setCustomActivityName('');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#2c2c3e] text-xs font-semibold text-[#ff505d]">
          <CalendarIcon className="w-3.5 h-3.5 text-[#e50914]" />
          <span>Planificador & Calendario de Entrenamientos</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Organizá tu semana
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Elegí los días y horarios en los que vas a entrenar y llevá el control de tu constancia.
        </p>
      </div>

      {/* Main Calendar Navigation Header */}
      <div className="bg-[#121218] border border-[#242434] rounded-3xl p-4 sm:p-6 shadow-xl space-y-6">
        
        {/* Top toolbar: View Switcher (Week / Month) & Today button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#20202e]">
          
          {/* Switch View Buttons */}
          <div className="flex items-center gap-1.5 bg-[#171722] p-1.5 rounded-2xl border border-[#262638]">
            <button
              onClick={() => { setViewMode('week'); sound.playClick(); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'week'
                  ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Vista Semanal</span>
            </button>

            <button
              onClick={() => { setViewMode('month'); sound.playClick(); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'month'
                  ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Vista Mensual</span>
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            {viewMode === 'week' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setWeekOffset((prev) => prev - 1); sound.playClick(); }}
                  className="p-2 rounded-xl bg-[#1a1a26] border border-[#2a2a3e] text-gray-300 hover:text-white hover:bg-[#222234] transition-all cursor-pointer"
                  title="Semana anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider px-2">
                  {weekOffset === 0 ? 'Esta Semana' : weekOffset > 0 ? `+${weekOffset} semanas` : `${weekOffset} semanas`}
                </span>

                <button
                  onClick={() => { setWeekOffset((prev) => prev + 1); sound.playClick(); }}
                  className="p-2 rounded-xl bg-[#1a1a26] border border-[#2a2a3e] text-gray-300 hover:text-white hover:bg-[#222234] transition-all cursor-pointer"
                  title="Semana siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl bg-[#1a1a26] border border-[#2a2a3e] text-gray-300 hover:text-white hover:bg-[#222234] transition-all cursor-pointer"
                  title="Mes anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-bold text-white uppercase tracking-wider px-2">
                  {monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
                </span>

                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl bg-[#1a1a26] border border-[#2a2a3e] text-gray-300 hover:text-white hover:bg-[#222234] transition-all cursor-pointer"
                  title="Mes siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={handleResetToday}
              className="px-3 py-1.5 rounded-xl bg-[#1e1418] border border-[#e50914]/40 hover:bg-[#e50914] text-[#ff505d] hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              Hoy
            </button>
          </div>

        </div>

        {/* =============================================================== */}
        {/* VIEW 1: WEEK ROW                                                */}
        {/* =============================================================== */}
        {viewMode === 'week' && (
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {weekDays.map((day) => {
              const isSelected = day.isoDate === selectedDate;
              const hasActivities = scheduledActivities.some((act) => act.date === day.isoDate);
              const hasCompleted =
                scheduledActivities.some((act) => act.date === day.isoDate && act.completed) ||
                completedWorkouts.some((w) => w.completedAt.split('T')[0] === day.isoDate);

              return (
                <button
                  key={day.isoDate}
                  onClick={() => { setSelectedDate(day.isoDate); sound.playClick(); }}
                  className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#e50914] text-white border-[#ff3b47] shadow-lg shadow-[#e50914]/40 scale-105 font-bold'
                      : day.isToday
                      ? 'bg-[#1e1e2c] text-white border-[#e50914]/60'
                      : 'bg-[#161620] text-gray-300 hover:bg-[#20202e] border-[#252536]'
                  }`}
                >
                  <span className={`text-[11px] uppercase font-bold ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                    {day.name}
                  </span>
                  <span className="text-lg sm:text-2xl font-black mt-1">
                    {day.dayNumber}
                  </span>

                  {/* Status Indicator Dots */}
                  <div className="mt-2 flex items-center gap-1">
                    {hasCompleted ? (
                      <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-400 shadow-sm'}`} title="Completado" />
                    ) : hasActivities ? (
                      <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#e50914]'}`} title="Pendiente" />
                    ) : (
                      <span className="w-2.5 h-2.5 opacity-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* =============================================================== */}
        {/* VIEW 2: FULL MONTH GRID                                         */}
        {/* =============================================================== */}
        {viewMode === 'month' && (
          <div className="space-y-2">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs uppercase text-gray-400 pb-2">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mié</span>
              <span>Jue</span>
              <span>Vie</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>

            {/* Month Day Cells */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {monthDays.map((cell, idx) => {
                if (!cell.dayNumber) {
                  return <div key={`empty-${idx}`} className="h-12 sm:h-16 rounded-xl bg-transparent" />;
                }

                const isSelected = cell.isoDate === selectedDate;
                const hasActivities = scheduledActivities.some((act) => act.date === cell.isoDate);
                const hasCompleted =
                  scheduledActivities.some((act) => act.date === cell.isoDate && act.completed) ||
                  completedWorkouts.some((w) => w.completedAt.split('T')[0] === cell.isoDate);

                return (
                  <button
                    key={cell.isoDate}
                    onClick={() => { setSelectedDate(cell.isoDate); sound.playClick(); }}
                    className={`h-12 sm:h-16 rounded-xl p-1.5 sm:p-2 border flex flex-col justify-between items-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#e50914] text-white border-[#ff3b47] shadow-md shadow-[#e50914]/40 font-bold scale-105 z-10'
                        : cell.isToday
                        ? 'bg-[#1c1c28] text-white border-[#e50914]/70'
                        : 'bg-[#15151e] border-[#222232] text-gray-300 hover:bg-[#1d1d2a]'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-black">{cell.dayNumber}</span>
                    <div className="flex items-center gap-1">
                      {hasCompleted && (
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-400'}`} />
                      )}
                      {hasActivities && !hasCompleted && (
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-[#e50914]'}`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Selected Day Schedule & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Scheduled List */}
        <div className="lg:col-span-8 bg-[#121218] border border-[#242434] rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#20202e]">
            <div>
              <span className="text-xs font-bold text-[#ff4b58] uppercase tracking-wider block">
                Detalles del día
              </span>
              <h3 className="text-xl font-black text-white">
                {selectedDate === todayIso ? `Hoy (${selectedDate})` : selectedDate}
              </h3>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#e50914]/30 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Programar Actividad</span>
            </button>
          </div>

          {/* Activities List */}
          {activitiesForSelectedDate.length === 0 && workoutsCompletedOnDate.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-[#161620] rounded-2xl border border-[#242434]">
              <CalendarIcon className="w-10 h-10 text-gray-600 mx-auto" />
              <p className="text-gray-300 font-medium text-sm">No tenés actividades programadas para este día.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs text-[#ff4b58] hover:underline font-bold cursor-pointer"
              >
                + Elegir rutina o ejercicio para este día
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {activitiesForSelectedDate.map((act) => (
                <div
                  key={act.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    act.completed
                      ? 'bg-[#15201a] border-emerald-500/40 text-gray-300'
                      : 'bg-[#171722] border-[#2a2a3c] text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggle(act.id, act.completed)}
                      className="cursor-pointer text-gray-400 hover:text-white"
                      title={act.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                    >
                      {act.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Circle className="w-6 h-6 hover:text-[#e50914]" />
                      )}
                    </button>
                    <div>
                      <h4 className={`text-sm font-bold ${act.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                        {act.activityName}
                      </h4>
                      <span className="text-[11px] text-gray-400">
                        {act.completed ? 'Completado ✓' : 'Pendiente de realizar'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => { deleteScheduledActivity(act.id); sound.playClick(); }}
                    className="p-2 text-gray-500 hover:text-[#e50914] rounded-lg transition-colors cursor-pointer"
                    title="Eliminar del calendario"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Workouts completed on this date */}
              {workoutsCompletedOnDate.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-2xl bg-[#1b1419] border border-[#e50914]/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#e50914]" />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {w.routineName}
                      </h4>
                      <span className="text-[11px] text-[#ff606d]">
                        Registrado como completado ({w.durationMinutes} min • {w.exercisesCount} ejercicios)
                      </span>
                    </div>
                  </div>
                  <span className="text-xs bg-[#e50914] text-white px-3 py-1 rounded-full font-bold">
                    Log
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Weekly Consistency, Streaks & Quick Stats */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Consistency Streak Banner */}
          <div className="bg-[#141216] border border-[#30222a] rounded-3xl p-6 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#e50914]">
                <Flame className="w-6 h-6 fill-[#e50914] animate-pulse" />
                <h4 className="font-black text-white text-sm uppercase">Racha de Constancia</h4>
              </div>
              <span className="text-2xl font-black text-[#ff4b58]">{currentStreak} {currentStreak === 1 ? 'Día' : 'Días'}</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {currentStreak > 0 
                ? `¡Imparable! Mantené el hábito activo sumando entrenamientos cada semana.`
                : `Completá una actividad hoy para iniciar tu racha de constancia.`}
            </p>
          </div>

          {/* Quick Tips */}
          <div className="bg-[#121218] border border-[#242434] rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-[#e50914]" />
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Hábito Inteligente</h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Programar un horario fijo (como <strong>08:00 AM</strong> o <strong>18:30 PM</strong>) triplica las posibilidades de cumplir tu entrenamiento diario.
            </p>
          </div>

          {/* Calendar Stats Summary */}
          <div className="bg-[#121218] border border-[#242434] rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Resumen General
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex justify-between py-2 border-b border-[#20202e]">
                <span>Total programadas:</span>
                <span className="font-bold text-white">{scheduledActivities.length}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#20202e]">
                <span>Completadas:</span>
                <span className="font-bold text-emerald-400">
                  {scheduledActivities.filter((a) => a.completed).length}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span>Sesiones registradas:</span>
                <span className="font-bold text-[#ff4b58]">{completedWorkouts.length}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121218] border border-[#2c2c3e] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div>
              <span className="text-xs font-bold text-[#ff4b58] uppercase tracking-wider">Planificador</span>
              <h3 className="text-xl font-black text-white">Programar Actividad para {selectedDate}</h3>
            </div>
            
            <form onSubmit={handleAddActivity} className="space-y-4">
              
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  ¿Qué querés programar?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActivityType('routine')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activityType === 'routine'
                        ? 'bg-[#e50914] text-white shadow-md'
                        : 'bg-[#181824] text-gray-400 hover:text-white border border-[#2a2a3c]'
                    }`}
                  >
                    Rutina
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivityType('exercise')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activityType === 'exercise'
                        ? 'bg-[#e50914] text-white shadow-md'
                        : 'bg-[#181824] text-gray-400 hover:text-white border border-[#2a2a3c]'
                    }`}
                  >
                    Ejercicio
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivityType('custom')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activityType === 'custom'
                        ? 'bg-[#e50914] text-white shadow-md'
                        : 'bg-[#181824] text-gray-400 hover:text-white border border-[#2a2a3c]'
                    }`}
                  >
                    Personalizado
                  </button>
                </div>
              </div>

              {/* Routine Select */}
              {activityType === 'routine' && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Elegí la rutina
                  </label>
                  <select
                    value={selectedRoutineId}
                    onChange={(e) => setSelectedRoutineId(e.target.value)}
                    className="w-full bg-[#181824] text-white p-3 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm"
                  >
                    {ROUTINES_DATA.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.goal} • {r.durationMinutes} min)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Exercise Select */}
              {activityType === 'exercise' && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Elegí el ejercicio
                  </label>
                  <select
                    value={selectedExerciseId}
                    onChange={(e) => setSelectedExerciseId(e.target.value)}
                    className="w-full bg-[#181824] text-white p-3 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm"
                  >
                    {EXERCISES_DATA.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.name} ({ex.type} • {ex.level})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Custom Input */}
              {activityType === 'custom' && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Nombre de la actividad
                  </label>
                  <input
                    type="text"
                    value={customActivityName}
                    onChange={(e) => setCustomActivityName(e.target.value)}
                    placeholder="Ej. Caminata 30 min, Yoga o Estiramientos"
                    className="w-full bg-[#181824] text-white p-3 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm"
                  />
                </div>
              )}

              {/* Time slot */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Horario sugerido
                </label>
                <div className="flex items-center gap-2">
                  {['08:00', '12:30', '18:30', '20:00'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setActivityTimeSlot(time)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        activityTimeSlot === time
                          ? 'bg-[#e50914] text-white'
                          : 'bg-[#181824] text-gray-400 hover:text-white border border-[#28283a]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                  <input
                    type="text"
                    value={activityTimeSlot}
                    onChange={(e) => setActivityTimeSlot(e.target.value)}
                    placeholder="Otro horario"
                    className="w-24 bg-[#181824] text-white p-1.5 rounded-lg border border-[#2c2c3e] text-xs text-center outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#20202e]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#1a1a24] text-gray-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white text-xs font-extrabold uppercase shadow-lg shadow-[#e50914]/30 cursor-pointer hover:scale-105 transition-all"
                >
                  Guardar en Calendario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
