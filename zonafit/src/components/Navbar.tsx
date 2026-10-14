'use client';

import React, { useState } from 'react';
import { Dumbbell, Menu, X, Flame, Target, Calendar, User, Activity, Timer, Dumbbell as DumbbellIcon } from 'lucide-react';
import { useFitness } from '@/context/FitnessContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profile } = useFitness();

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Flame },
    { id: 'ejercicios', label: 'Ejercicios', icon: DumbbellIcon },
    { id: 'rutinas', label: 'Rutinas', icon: Activity },
    { id: 'temporizador', label: 'Temporizador', icon: Timer },
    { id: 'calendario', label: 'Calendario', icon: Calendar },
    { id: 'progreso', label: 'Mi progreso', icon: Target },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0c10]/95 backdrop-blur-md border-b border-[#22222c] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#e50914] to-[#ff3b47] flex items-center justify-center shadow-md shadow-[#e50914]/30 group-hover:scale-105 transition-transform duration-200">
              <Dumbbell className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-white flex items-center gap-1 font-sans">
                ZONA<span className="text-[#e50914]">FIT</span>
              </span>
              <span className="block text-[10px] text-gray-400 font-medium tracking-widest uppercase -mt-1">
                Entrena en Casa
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/40 font-bold scale-102'
                      : 'text-gray-300 hover:text-white hover:bg-[#1c1c24]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User quick badge (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-[#242430]">
            <button 
              onClick={() => handleNavClick('perfil')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181822] border border-[#2c2c38] hover:border-[#e50914]/50 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#e50914] flex items-center justify-center text-xs font-bold text-white uppercase">
                {profile.name.charAt(0) || 'Z'}
              </div>
              <span className="text-xs font-medium text-gray-300 max-w-[100px] truncate">
                {profile.name}
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#181822] text-gray-300 hover:text-white hover:bg-[#222230] focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#e50914]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0e14] border-b border-[#262634] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-left transition-all ${
                  isActive
                    ? 'bg-[#e50914] text-white shadow-md'
                    : 'text-gray-300 hover:bg-[#1a1a24] hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
