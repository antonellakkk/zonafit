'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Lightbulb, Clock, Dumbbell, Flame, Plus, Film, Image as ImageIcon } from 'lucide-react';
import { Exercise } from '@/types';
import { useFitness } from '@/context/FitnessContext';

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({ exercise, onClose }) => {
  const { addScheduledActivity } = useFitness();
  const [addedToday, setAddedToday] = useState(false);
  const [showGif, setShowGif] = useState(true);

  if (!exercise) return null;

  const currentMediaUrl = showGif && exercise.gif ? exercise.gif : exercise.image;

  const handleScheduleToday = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    addScheduledActivity({
      date: todayStr,
      activityName: exercise.name,
      type: 'exercise',
      targetId: exercise.id
    });
    setAddedToday(true);
    setTimeout(() => setAddedToday(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#121218] border border-[#2c2c3e] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Media with overlay */}
        <div className="relative h-64 sm:h-72 shrink-0 overflow-hidden bg-black">
          <img
            src={currentMediaUrl}
            alt={exercise.name}
            className="w-full h-full object-cover object-center transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-[#e50914] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 shadow-lg"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Toggle Media Button (GIF vs Photo) */}
          {exercise.gif && (
            <div className="absolute top-4 left-4">
              <button
                type="button"
                onClick={() => setShowGif(!showGif)}
                className="px-3 py-1.5 rounded-full bg-black/70 hover:bg-[#e50914] text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 backdrop-blur-md transition-all shadow-md cursor-pointer"
              >
                {showGif ? (
                  <>
                    <Film className="w-3.5 h-3.5 text-[#ff4b58]" />
                    <span>Viendo GIF Animado</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-3.5 h-3.5 text-gray-300" />
                    <span>Ver GIF Explicativo</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Badges & Title */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-[#e50914] text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                {exercise.goal}
              </span>
              <span className="bg-[#242434] text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Nivel: {exercise.level}
              </span>
              <span className="bg-[#1f2937] text-gray-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Enfoque: {exercise.type}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{exercise.name}</h2>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#181822] p-3 rounded-xl border border-[#262638] flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#e50914]" />
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">Volumen sugerido</span>
                <span className="text-xs sm:text-sm font-bold text-white">{exercise.durationOrReps}</span>
              </div>
            </div>
            <div className="bg-[#181822] p-3 rounded-xl border border-[#262638] flex items-center gap-3">
              <Flame className="w-5 h-5 text-[#ff4b58]" />
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">Descanso entre series</span>
                <span className="text-xs sm:text-sm font-bold text-white">{exercise.restTime}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-white font-bold text-base mb-1">Descripción</h3>
            <p className="text-gray-300 leading-relaxed">{exercise.description}</p>
          </div>

          {/* Step by Step instructions */}
          <div>
            <h3 className="text-white font-bold text-base mb-3 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#e50914]" />
              <span>Cómo realizarlo paso a paso</span>
            </h3>
            <div className="space-y-2.5">
              {exercise.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#171720] p-3 rounded-xl border border-[#222230]">
                  <span className="w-6 h-6 rounded-full bg-[#e50914] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-gray-200 leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips / Errores a evitar */}
          {exercise.tips.length > 0 && (
            <div className="bg-[#1a1418] border border-[#e50914]/30 p-4 rounded-xl space-y-2">
              <h4 className="text-[#ff505d] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#ff505d]" />
                <span>Consejos clave y postura</span>
              </h4>
              <ul className="space-y-1 text-xs text-gray-300">
                {exercise.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e50914]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {exercise.benefits.length > 0 && (
            <div>
              <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#e50914]" />
                <span>Beneficios principales</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {exercise.benefits.map((benefit, idx) => (
                  <div key={idx} className="text-xs text-gray-300 bg-[#161622] p-2.5 rounded-lg border border-[#222230] flex items-center gap-2">
                    <span className="text-[#e50914] font-bold">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#0e0e14] border-t border-[#20202c] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleScheduleToday}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1e1e2c] hover:bg-[#28283a] text-white text-xs font-bold border border-[#343448] flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4 text-[#e50914]" />
            <span>{addedToday ? '✓ ¡Agregado a hoy!' : 'Planificar para hoy'}</span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-[#e50914]/30"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
