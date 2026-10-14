export type GoalType = 'Resistencia' | 'Fuerza' | 'Mantenerse activo';
export type LevelType = 'Fácil' | 'Medio' | 'Difícil';
export type MuscleType = 'Piernas' | 'Brazos' | 'Abdomen' | 'Cuerpo completo';

export interface Exercise {
  id: string;
  name: string;
  goal: GoalType;
  level: LevelType;
  type: MuscleType;
  description: string;
  image: string;
  gif?: string;
  durationOrReps: string;
  restTime: string;
  steps: string[];
  tips: string[];
  benefits: string[];
}

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  repsOrDuration: string;
  restSeconds: number;
}

export interface Routine {
  id: string;
  name: string;
  goal: GoalType;
  level: LevelType;
  durationMinutes: number;
  exerciseCount: number;
  description: string;
  image: string;
  exercises: RoutineExercise[];
}

export interface UserProfile {
  name: string;
  height: string;
  weight: string;
  nutrition: string;
  dailyWaterGlasses: number;
  waterTarget: number;
  primaryGoal: GoalType;
  bio?: string;
}

export interface CompletedWorkout {
  id: string;
  routineId?: string;
  routineName: string;
  goal: GoalType;
  completedAt: string;
  durationMinutes: number;
  exercisesCount: number;
  notes?: string;
}

export interface ScheduledActivity {
  id: string;
  date: string;
  activityName: string;
  type: 'routine' | 'exercise';
  targetId: string;
  completed: boolean;
}