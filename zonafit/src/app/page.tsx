'use client';

import React from 'react';
import { FitnessProvider, useFitness } from '@/context/FitnessContext';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ExercisesSection } from '@/components/ExercisesSection';
import { RoutinesSection } from '@/components/RoutinesSection';
import { TimerSection } from '@/components/TimerSection';
import { CalendarSection } from '@/components/CalendarSection';
import { ProgressSection } from '@/components/ProgressSection';
import { ProfileSection } from '@/components/ProfileSection';
import { Footer } from '@/components/Footer';

function MainAppContent() {
  const { activeTab, setActiveTab, setActiveGoalFilter } = useFitness();

  const handleNavigate = (tab: string, goalFilter?: string) => {
    if (goalFilter) {
      setActiveGoalFilter(goalFilter);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0a0a0c] text-white">
      <div>
        {/* Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Views / Sections */}
        <main className="w-full">
          {activeTab === 'inicio' && (
            <div className="space-y-12">
              <HeroSection onNavigate={handleNavigate} />
              <div className="border-t border-[#1a1a24]">
                <ExercisesSection />
              </div>
            </div>
          )}

          {activeTab === 'ejercicios' && <ExercisesSection />}

          {activeTab === 'rutinas' && <RoutinesSection />}

          {activeTab === 'temporizador' && <TimerSection />}

          {activeTab === 'calendario' && <CalendarSection />}

          {activeTab === 'progreso' && <ProgressSection />}

          {activeTab === 'perfil' && <ProfileSection />}
        </main>
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function HomePage() {
  return (
    <FitnessProvider>
      <MainAppContent />
    </FitnessProvider>
  );
}
