'use client';

import React, { useState } from 'react';
import { User, Droplet, Heart, Target, Save, CheckCircle2, Ruler, Weight, Utensils } from 'lucide-react';
import { useFitness } from '@/context/FitnessContext';
import { GoalType } from '@/types';

export const ProfileSection: React.FC = () => {
  const {
    profile,
    updateProfile,
    incrementWater,
    decrementWater,
    setActiveGoalFilter
  } = useFitness();

  const [formData, setFormData] = useState({
    name: profile.name,
    height: profile.height,
    weight: profile.weight,
    nutrition: profile.nutrition,
    primaryGoal: profile.primaryGoal as GoalType,
    waterTarget: profile.waterTarget,
    bio: profile.bio || ''
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      height: formData.height,
      weight: formData.weight,
      nutrition: formData.nutrition,
      primaryGoal: formData.primaryGoal,
      waterTarget: Number(formData.waterTarget) || 8,
      bio: formData.bio
    });
    setActiveGoalFilter(formData.primaryGoal);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Toast Notification */}
      {isSaved && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161622] border border-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">¡Tus datos fueron guardados exitosamente!</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#2c2c3e] text-xs font-semibold text-[#ff505d]">
          <User className="w-3.5 h-3.5 text-[#e50914]" />
          <span>Configuración y Personalización</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Mi perfil
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Ingresá tus datos para personalizar tu experiencia, planificar tu hidratación y registrar tus objetivos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Profile Card & Water Tracker */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* User Avatar Card */}
          <div className="bg-[#121218] border border-[#242434] rounded-2xl p-6 text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#e50914] to-[#ff4250] flex items-center justify-center text-3xl font-black text-white mx-auto shadow-xl shadow-[#e50914]/30 border-4 border-[#1b1b26]">
              {profile.name.charAt(0).toUpperCase() || 'Z'}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{profile.name}</h3>
              <p className="text-xs text-gray-400 mt-1">Objetivo: <span className="text-[#ff4b58] font-bold">{profile.primaryGoal}</span></p>
            </div>
            <div className="pt-2 border-t border-[#20202e] grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#181824] p-2.5 rounded-xl border border-[#28283a]">
                <span className="text-gray-400 block text-[10px] uppercase">Altura</span>
                <span className="font-bold text-white">{profile.height ? `${profile.height} cm` : '--'}</span>
              </div>
              <div className="bg-[#181824] p-2.5 rounded-xl border border-[#28283a]">
                <span className="text-gray-400 block text-[10px] uppercase">Peso</span>
                <span className="font-bold text-white">{profile.weight ? `${profile.weight} kg` : '--'}</span>
              </div>
            </div>
          </div>

          {/* Hydration Tracker */}
          <div className="bg-[#121218] border border-[#242434] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400">
                <Droplet className="w-5 h-5 fill-sky-400" />
                <h4 className="font-bold text-white text-sm uppercase">Hidratación Diaria</h4>
              </div>
              <span className="text-xs font-bold text-sky-400 bg-sky-950/40 px-2.5 py-0.5 rounded-full border border-sky-800/40">
                {profile.dailyWaterGlasses} / {profile.waterTarget} vasos
              </span>
            </div>

            <p className="text-xs text-gray-300">
              Tomar agua es fundamental para rendir al máximo en tus rutinas en casa.
            </p>

            {/* Glasses Visual Grid */}
            <div className="flex items-center justify-center gap-2 py-2 flex-wrap">
              {Array.from({ length: profile.waterTarget }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={idx < profile.dailyWaterGlasses ? decrementWater : incrementWater}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    idx < profile.dailyWaterGlasses
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-105'
                      : 'bg-[#181824] text-gray-600 border border-[#282838]'
                  }`}
                  title={`Vaso ${idx + 1}`}
                >
                  <Droplet className="w-4 h-4" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={decrementWater}
                className="px-3 py-1.5 rounded-lg bg-[#1a1a26] text-gray-300 hover:text-white text-xs font-semibold border border-[#2a2a3c] cursor-pointer"
              >
                - 1 Vaso
              </button>
              <button
                type="button"
                onClick={incrementWater}
                className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                + 1 Vaso de Agua
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-8 bg-[#121218] border border-[#242434] rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Field: Nombre */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Nombre de Usuario o Apodo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Alex, Lucas, Sofía..."
                  className="w-full bg-[#181822] text-white placeholder-gray-500 pl-11 pr-4 py-3 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm"
                />
              </div>
            </div>

            {/* Row: Altura y Peso */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Altura (cm)
                </label>
                <div className="relative">
                  <Ruler className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Ej: 175"
                    className="w-full bg-[#181822] text-white placeholder-gray-500 pl-11 pr-4 py-3 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Peso (kg)
                </label>
                <div className="relative">
                  <Weight className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Ej: 68"
                    className="w-full bg-[#181822] text-white placeholder-gray-500 pl-11 pr-4 py-3 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Objetivo Principal */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Objetivo Principal de Entrenamiento
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'Resistencia', title: 'Mejorar resistencia', desc: 'Cardio, energía y agilidad' },
                  { value: 'Fuerza', title: 'Ganar fuerza', desc: 'Músculos y firmeza con autocarga' },
                  { value: 'Mantenerse activo', title: 'Mantenerse activo', desc: 'Salud, movilidad y bienestar' },
                ].map((obj) => {
                  const isSelected = formData.primaryGoal === obj.value;
                  return (
                    <button
                      key={obj.value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, primaryGoal: obj.value as GoalType }))}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#221418] border-[#e50914] text-white shadow-md'
                          : 'bg-[#181822] border-[#2c2c3e] text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs uppercase text-white">{obj.title}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#e50914]" />}
                      </div>
                      <span className="text-[11px] text-gray-400 block">{obj.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Información sobre alimentación */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Información sobre tu Alimentación
              </label>
              <div className="relative">
                <textarea
                  name="nutrition"
                  rows={3}
                  value={formData.nutrition}
                  onChange={handleChange}
                  placeholder="Ej: Dieta balanceada, evito comida ultraprocesada, consumo 2 frutas al día..."
                  className="w-full bg-[#181822] text-white placeholder-gray-500 p-4 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm"
                />
              </div>
            </div>

            {/* Meta de Hidratación en Vasos */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Meta Diaria de Hidratación (Vasos de agua de 250ml)
              </label>
              <select
                name="waterTarget"
                value={formData.waterTarget}
                onChange={handleChange}
                className="w-full bg-[#181822] text-white p-3 rounded-xl border border-[#2c2c3e] focus:border-[#e50914] outline-none text-sm cursor-pointer"
              >
                <option value={6}>6 vasos (1.5 Litros)</option>
                <option value={8}>8 vasos (2 Litros - Recomendado)</option>
                <option value={10}>10 vasos (2.5 Litros)</option>
                <option value={12}>12 vasos (3 Litros)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#20202e] flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#e50914]/40 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>GUARDAR CAMBIOS</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
