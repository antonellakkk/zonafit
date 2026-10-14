import { Routine } from '@/types';

export const ROUTINES_DATA: Routine[] = [
  {
    id: 'cardio-express-resistencia',
    name: 'Cardio Resistencia Express',
    goal: 'Resistencia',
    level: 'Fácil',
    durationMinutes: 15,
    exerciseCount: 4,
    description: 'Rutina ágil e intensa para elevar pulsaciones, quemar calorías y potenciar tu resistencia pulmonar desde casa.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    exercises: [
      { exerciseId: 'jumping-jacks', sets: 3, repsOrDuration: '45 segs', restSeconds: 20 },
      { exerciseId: 'mountain-climbers', sets: 3, repsOrDuration: '30 segs', restSeconds: 30 },
      { exerciseId: 'sentadillas', sets: 3, repsOrDuration: '15 reps', restSeconds: 25 },
      { exerciseId: 'plancha', sets: 3, repsOrDuration: '30 segs', restSeconds: 30 }
    ]
  },
  {
    id: 'hiit-quema-grasa-pro',
    name: 'Full Body HIIT Quema Grasa',
    goal: 'Resistencia',
    level: 'Difícil',
    durationMinutes: 25,
    exerciseCount: 6,
    description: 'Para los que quieren darlo todo: combinación de intervalos de alta intensidad que maximiza el consumo calórico post-entrenamiento.',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',
    exercises: [
      { exerciseId: 'burpees', sets: 4, repsOrDuration: '10 reps', restSeconds: 40 },
      { exerciseId: 'mountain-climbers', sets: 4, repsOrDuration: '40 segs', restSeconds: 30 },
      { exerciseId: 'zancadas', sets: 3, repsOrDuration: '12 reps x pierna', restSeconds: 30 },
      { exerciseId: 'flexiones', sets: 3, repsOrDuration: '10 reps', restSeconds: 40 },
      { exerciseId: 'jumping-jacks', sets: 4, repsOrDuration: '50 segs', restSeconds: 20 },
      { exerciseId: 'plancha', sets: 3, repsOrDuration: '45 segs', restSeconds: 30 }
    ]
  },
  {
    id: 'fuerza-total-casa',
    name: 'Fuerza Total en Casa',
    goal: 'Fuerza',
    level: 'Medio',
    durationMinutes: 20,
    exerciseCount: 5,
    description: 'Rutina completa con peso corporal para fortalecer pectorales, brazos, abdomen y piernas sin aparatos.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    exercises: [
      { exerciseId: 'sentadillas', sets: 4, repsOrDuration: '15 reps', restSeconds: 40 },
      { exerciseId: 'flexiones', sets: 3, repsOrDuration: '10 reps', restSeconds: 45 },
      { exerciseId: 'fondos-triceps', sets: 3, repsOrDuration: '12 reps', restSeconds: 35 },
      { exerciseId: 'elevaciones-piernas', sets: 3, repsOrDuration: '12 reps', restSeconds: 35 },
      { exerciseId: 'plancha', sets: 3, repsOrDuration: '40 segs', restSeconds: 30 }
    ]
  },
  {
    id: 'brazos-core-acero',
    name: 'Brazos y Core de Acero',
    goal: 'Fuerza',
    level: 'Medio',
    durationMinutes: 18,
    exerciseCount: 4,
    description: 'Enfocada en tonificar el tren superior (pecho, tríceps, hombros) y marcar el abdomen con ejercicios de alta eficacia.',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    exercises: [
      { exerciseId: 'flexiones', sets: 4, repsOrDuration: '10-12 reps', restSeconds: 45 },
      { exerciseId: 'fondos-triceps', sets: 3, repsOrDuration: '12 reps', restSeconds: 40 },
      { exerciseId: 'elevaciones-piernas', sets: 3, repsOrDuration: '14 reps', restSeconds: 35 },
      { exerciseId: 'abdominales-crunches', sets: 3, repsOrDuration: '20 reps', restSeconds: 30 }
    ]
  },
  {
    id: 'movilidad-activa-diaria',
    name: 'Movilidad y Energía Diaria',
    goal: 'Mantenerse activo',
    level: 'Fácil',
    durationMinutes: 12,
    exerciseCount: 4,
    description: 'Perfecta para iniciar el día con vitalidad o desconectar tras estudiar o trabajar. Fácil, agradable y revitalizante.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    exercises: [
      { exerciseId: 'estiramiento-dinamico', sets: 2, repsOrDuration: '5 min', restSeconds: 15 },
      { exerciseId: 'puente-gluteos', sets: 3, repsOrDuration: '15 reps', restSeconds: 25 },
      { exerciseId: 'abdominales-crunches', sets: 2, repsOrDuration: '15 reps', restSeconds: 25 },
      { exerciseId: 'jumping-jacks', sets: 2, repsOrDuration: '30 segs', restSeconds: 20 }
    ]
  },
  {
    id: 'piernas-gluteos-foco',
    name: 'Piernas y Glúteos Tonificados',
    goal: 'Fuerza',
    level: 'Medio',
    durationMinutes: 20,
    exerciseCount: 4,
    description: 'Trabajo focalizado en tren inferior para tonificar cuádriceps, glúteos e isquiotibiales y ganar firmeza.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    exercises: [
      { exerciseId: 'sentadillas', sets: 4, repsOrDuration: '15 reps', restSeconds: 40 },
      { exerciseId: 'zancadas', sets: 3, repsOrDuration: '12 reps x pierna', restSeconds: 40 },
      { exerciseId: 'puente-gluteos', sets: 4, repsOrDuration: '15 reps', restSeconds: 30 },
      { exerciseId: 'plancha', sets: 3, repsOrDuration: '35 segs', restSeconds: 30 }
    ]
  }
];
