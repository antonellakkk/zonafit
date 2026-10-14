'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, CompletedWorkout, ScheduledActivity, GoalType } from '@/types';

interface FitnessContextType {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  completedWorkouts: CompletedWorkout[];
  addCompletedWorkout: (workout: Omit<CompletedWorkout, 'id' | 'completedAt'>) => void;
  scheduledActivities: ScheduledActivity[];
  toggleScheduledActivity: (id: string) => void;
  addScheduledActivity: (activity: Omit<ScheduledActivity, 'id' | 'completed'>) => void;
  deleteScheduledActivity: (id: string) => void;
  incrementWater: () => void;
  decrementWater: () => void;
  activeGoalFilter: string;
  setActiveGoalFilter: (goal: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const defaultProfile: UserProfile = {
  name: 'Atleta ZonaFit',
  height: '175',
  weight: '70',
  nutrition: 'Alimentación balanceada rica en proteínas, frutas y vegetales.',
  dailyWaterGlasses: 5,
  waterTarget: 8,
  primaryGoal: 'Mantenerse activo',
  bio: 'Comprometido con entrenar en casa y mejorar mi salud día a día.'
};

const defaultWorkouts: CompletedWorkout[] = [
  {
    id: 'w1',
    routineId: 'cardio-express-resistencia',
    routineName: 'Cardio Resistencia Express',
    goal: 'Resistencia',
    completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    durationMinutes: 15,
    exercisesCount: 4,
    notes: '¡Gran inicio de semana con mucha energía!'
  },
  {
    id: 'w2',
    routineId: 'fuerza-total-casa',
    routineName: 'Fuerza Total en Casa',
    goal: 'Fuerza',
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    durationMinutes: 20,
    exercisesCount: 5,
    notes: 'Buen trabajo de piernas y abdomen.'
  }
];

const getInitialScheduled = (): ScheduledActivity[] => {
  const today = new Date();
  const format = (d: Date) => d.toISOString().split('T')[0];
  
  const d0 = new Date(today);
  const d1 = new Date(today);
  d1.setDate(today.getDate() + 1);
  const d2 = new Date(today);
  d2.setDate(today.getDate() + 3);

  return [
    {
      id: 's1',
      date: format(d0),
      activityName: 'Movilidad y Energía Diaria',
      type: 'routine',
      targetId: 'movilidad-activa-diaria',
      completed: true
    },
    {
      id: 's2',
      date: format(d1),
      activityName: 'Full Body HIIT Quema Grasa',
      type: 'routine',
      targetId: 'hiit-quema-grasa-pro',
      completed: false
    },
    {
      id: 's3',
      date: format(d2),
      activityName: 'Brazos y Core de Acero',
      type: 'routine',
      targetId: 'brazos-core-acero',
      completed: false
    }
  ];
};

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>(defaultWorkouts);
  const [scheduledActivities, setScheduledActivities] = useState<ScheduledActivity[]>([]);
  const [activeGoalFilter, setActiveGoalFilter] = useState<string>('Todos');
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('zonafit_profile');
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedWorkouts = localStorage.getItem('zonafit_workouts');
      if (savedWorkouts) setCompletedWorkouts(JSON.parse(savedWorkouts));

      const savedScheduled = localStorage.getItem('zonafit_scheduled');
      if (savedScheduled) {
        setScheduledActivities(JSON.parse(savedScheduled));
      } else {
        setScheduledActivities(getInitialScheduled());
      }
    } catch (e) {
      console.error('Error loading data from localStorage', e);
      setScheduledActivities(getInitialScheduled());
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('zonafit_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('zonafit_workouts', JSON.stringify(completedWorkouts));
    } catch (e) {
      console.error(e);
    }
  }, [completedWorkouts, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('zonafit_scheduled', JSON.stringify(scheduledActivities));
    } catch (e) {
      console.error(e);
    }
  }, [scheduledActivities, isLoaded]);

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const addCompletedWorkout = (workout: Omit<CompletedWorkout, 'id' | 'completedAt'>) => {
    const newWorkout: CompletedWorkout = {
      ...workout,
      id: 'w_' + Date.now(),
      completedAt: new Date().toISOString()
    };
    setCompletedWorkouts(prev => [newWorkout, ...prev]);

    // Also mark in calendar for today
    const todayStr = new Date().toISOString().split('T')[0];
    setScheduledActivities(prev => {
      const exists = prev.find(item => item.date === todayStr && item.activityName === workout.routineName);
      if (exists) {
        return prev.map(item => item.id === exists.id ? { ...item, completed: true } : item);
      }
      return [
        ...prev,
        {
          id: 's_' + Date.now(),
          date: todayStr,
          activityName: workout.routineName,
          type: 'routine',
          targetId: workout.routineId || '',
          completed: true
        }
      ];
    });
  };

  const toggleScheduledActivity = (id: string) => {
    setScheduledActivities(prev =>
      prev.map(act => act.id === id ? { ...act, completed: !act.completed } : act)
    );
  };

  const addScheduledActivity = (activity: Omit<ScheduledActivity, 'id' | 'completed'>) => {
    const newAct: ScheduledActivity = {
      ...activity,
      id: 'act_' + Date.now(),
      completed: false
    };
    setScheduledActivities(prev => [...prev, newAct]);
  };

  const deleteScheduledActivity = (id: string) => {
    setScheduledActivities(prev => prev.filter(act => act.id !== id));
  };

  const incrementWater = () => {
    setProfile(prev => ({
      ...prev,
      dailyWaterGlasses: Math.min(prev.dailyWaterGlasses + 1, 20)
    }));
  };

  const decrementWater = () => {
    setProfile(prev => ({
      ...prev,
      dailyWaterGlasses: Math.max(prev.dailyWaterGlasses - 1, 0)
    }));
  };

  return (
    <FitnessContext.Provider
      value={{
        profile,
        updateProfile,
        completedWorkouts,
        addCompletedWorkout,
        scheduledActivities,
        toggleScheduledActivity,
        addScheduledActivity,
        deleteScheduledActivity,
        incrementWater,
        decrementWater,
        activeGoalFilter,
        setActiveGoalFilter,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
