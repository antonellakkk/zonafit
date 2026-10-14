'use client';

import React from 'react';
import { Dumbbell, Flame, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#09090d] border-t border-[#1a1a24] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        {/* Brand */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#e50914] flex items-center justify-center text-white">
              <Dumbbell className="w-5 h-5 -rotate-45" />
            </div>
            <span className="text-xl font-black text-white tracking-wider">
              ZONA<span className="text-[#e50914]">FIT</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
            Tu espacio digital para entrenar en casa, ganar fuerza, mejorar tu resistencia y construir hábitos saludables sin necesidad de gimnasio.
          </p>
        </div>

        {/* Quick Nav */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Navegación
          </h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <button onClick={() => onNavigate('inicio')} className="hover:text-white transition-colors cursor-pointer">
                Inicio
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ejercicios')} className="hover:text-white transition-colors cursor-pointer">
                Ejercicios
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('rutinas')} className="hover:text-white transition-colors cursor-pointer">
                Rutinas Guiadas
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('temporizador')} className="hover:text-white transition-colors cursor-pointer">
                Temporizador con Sonido
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('calendario')} className="hover:text-white transition-colors cursor-pointer">
                Calendario & Planificador
              </button>
            </li>
          </ul>
        </div>

        {/* Goals */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Objetivos
          </h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <button onClick={() => onNavigate('ejercicios')} className="hover:text-[#ff4b58] transition-colors cursor-pointer">
                Mejorar Resistencia
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ejercicios')} className="hover:text-[#ff4b58] transition-colors cursor-pointer">
                Ganar Fuerza
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ejercicios')} className="hover:text-[#ff4b58] transition-colors cursor-pointer">
                Mantenerse Activo
              </button>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#161622] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
        <p>© {new Date().getFullYear()} ZonaFit. Todos los derechos reservados.</p>
        <p className="flex items-center gap-1">
          Hecho con pasión por el movimiento y la vida activa.
        </p>
      </div>
    </footer>
  );
};
