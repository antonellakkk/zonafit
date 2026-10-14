'use client';

import React from 'react';
import { ArrowRight, Zap, Shield, Sparkles, CheckCircle2, ChevronRight, Timer } from 'lucide-react';
import { useFitness } from '@/context/FitnessContext';

interface HeroSectionProps {
  onNavigate: (tab: string, goalFilter?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { setActiveGoalFilter } = useFitness();

  const handleSelectGoal = (goal: string) => {
    setActiveGoalFilter(goal);
    onNavigate('ejercicios', goal);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#e50914]/20 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Main Hero Header */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Youth Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1418] border border-[#e50914]/40 text-xs font-semibold text-[#ff505d]">
              <Sparkles className="w-4 h-4 text-[#e50914]" />
              <span>Plataforma 100% Gratuita para Jóvenes</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
              Empezá a moverte <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] via-[#ff3b47] to-[#ff7b85]">
                desde casa
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Elegí tu objetivo, encontrá tu rutina y empezá a entrenar.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap gap-3 justify-center lg:justify-start items-center">
              <button
                onClick={() => onNavigate('ejercicios')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-extrabold text-base tracking-wider uppercase shadow-lg shadow-[#e50914]/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>EMPEZAR AHORA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('rutinas')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#181820] hover:bg-[#22222e] text-gray-200 border border-[#2d2d3d] hover:border-gray-500 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Rutinas</span>
              </button>

              <button
                onClick={() => onNavigate('temporizador')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#1a151b] hover:bg-[#241a20] text-[#ff4b58] border border-[#e50914]/40 hover:border-[#e50914] font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Timer className="w-4 h-4 text-[#e50914]" />
                <span>Temporizador HIIT</span>
              </button>
            </div>

            {/* Feature Pills */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-400 font-medium">
              <div className="flex items-center gap-2 bg-[#121218] p-2.5 rounded-lg border border-[#20202c]">
                <CheckCircle2 className="w-4 h-4 text-[#e50914] shrink-0" />
                <span>Sin aparatos ni pesas</span>
              </div>
              <div className="flex items-center gap-2 bg-[#121218] p-2.5 rounded-lg border border-[#20202c]">
                <CheckCircle2 className="w-4 h-4 text-[#e50914] shrink-0" />
                <span>Para todos los niveles</span>
              </div>
              <div className="flex items-center gap-2 bg-[#121218] p-2.5 rounded-lg border border-[#20202c] col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#e50914] shrink-0" />
                <span>Seguimiento semanal</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#2a2a38] shadow-2xl bg-[#121218] group">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
                alt="Joven entrenando en casa con ZonaFit"
                className="w-full h-[380px] sm:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/40 to-transparent" />
              
              {/* Floating motivational badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#161620]/90 backdrop-blur-md border border-[#2c2c3e] shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e50914] flex items-center justify-center text-white">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Entrená a tu propio ritmo</h4>
                      <p className="text-xs text-gray-400">15 - 25 minutos al día son suficientes</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#ff4b58] bg-[#e50914]/15 px-2.5 py-1 rounded-full border border-[#e50914]/30">
                    Activo
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Main Goal Cards Presentation */}
      <section className="py-12 bg-[#0c0c11] border-y border-[#1c1c26] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Elegí tu objetivo principal
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Cada objetivo cuenta con ejercicios adaptados para que progreses desde tu nivel actual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Resistencia */}
          <div className="group rounded-2xl bg-[#13131a] border border-[#22222e] hover:border-[#e50914]/60 hover:shadow-xl hover:shadow-[#e50914]/10 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
                alt="Objetivo Resistencia"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-[#13131a]/30 to-transparent" />
              <span className="absolute top-4 left-4 bg-[#e50914] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                Cardio & Energía
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#ff4b58] transition-colors">
                  Resistencia
                </h3>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                  Ejercicios destinados a realizar actividades que permitan trabajar la resistencia pulmonar y cardiovascular, quemar calorías y ganar agilidad.
                </p>
              </div>
              <button
                onClick={() => handleSelectGoal('Resistencia')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1e1e28] group-hover:bg-[#e50914] text-gray-200 group-hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
              >
                <span>Ver Ejercicios de Resistencia</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Fuerza */}
          <div className="group rounded-2xl bg-[#13131a] border border-[#22222e] hover:border-[#e50914]/60 hover:shadow-xl hover:shadow-[#e50914]/10 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80"
                alt="Objetivo Fuerza"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-[#13131a]/30 to-transparent" />
              <span className="absolute top-4 left-4 bg-[#e50914] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                Tono & Potencia
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#ff4b58] transition-colors">
                  Fuerza
                </h3>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                  Diferentes ejercicios para trabajar la fuerza muscular de brazos, abdomen y piernas utilizando el propio peso de tu cuerpo.
                </p>
              </div>
              <button
                onClick={() => handleSelectGoal('Fuerza')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1e1e28] group-hover:bg-[#e50914] text-gray-200 group-hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
              >
                <span>Ver Ejercicios de Fuerza</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Mantenerse activo */}
          <div className="group rounded-2xl bg-[#13131a] border border-[#22222e] hover:border-[#e50914]/60 hover:shadow-xl hover:shadow-[#e50914]/10 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
                alt="Objetivo Mantenerse Activo"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-[#13131a]/30 to-transparent" />
              <span className="absolute top-4 left-4 bg-[#e50914] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                Salud & Movilidad
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#ff4b58] transition-colors">
                  Mantenerse activo
                </h3>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                  Actividades para incorporar movimiento, mejorar la flexibilidad, aliviar tensiones y mantener una rutina saludable y constante.
                </p>
              </div>
              <button
                onClick={() => handleSelectGoal('Mantenerse activo')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1e1e28] group-hover:bg-[#e50914] text-gray-200 group-hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
              >
                <span>Ver Ejercicios de Movilidad</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
