import { Exercise } from '@/types';

export const EXERCISES_DATA: Exercise[] = [
  {
    id: 'sentadillas',
    name: 'Sentadillas',
    goal: 'Fuerza',
    level: 'Fácil',
    type: 'Piernas',
    description: 'Ejercicio fundamental para fortalecer cuádriceps, glúteos y mejorar la movilidad de la cadera.',
    image: '/images/exercises/sentadillas.jpg',
    durationOrReps: '3 series de 12 a 15 repeticiones',
    restTime: '45 segundos',
    steps: [
      'Parate erguido con los pies separados al ancho de los hombros y las puntas ligeramente hacia afuera.',
      'Mantené la espalda recta y el pecho levantado en todo momento.',
      'Flexioná las rodillas y empujá las caderas hacia atrás, como si te fueras a sentar en una silla.',
      'Bajá hasta que tus muslos queden paralelos al suelo (o hasta donde tu movilidad lo permita sin curvar la espalda).',
      'Empujá con los talones firmemente contra el suelo para volver a la posición inicial.'
    ],
    tips: [
      'Evitá que las rodillas se cierren hacia adentro durante la bajada.',
      'No despegues los talones del suelo.',
      'Mantené el abdomen activo en todo momento.'
    ],
    benefits: [
      'Fortalece piernas y glúteos.',
      'Aumenta la quema calórica.',
      'Mejora la postura y el equilibrio general.'
    ]
  },
  {
    id: 'flexiones',
    name: 'Flexiones de Brazos',
    goal: 'Fuerza',
    level: 'Medio',
    type: 'Brazos',
    description: 'Ejercicio clásico de peso corporal para desarrollar el pecho, hombros, tríceps y estabilidad del core.',
    image: '/images/exercises/flexiones.jpg',
    durationOrReps: '3 series de 8 a 12 repeticiones',
    restTime: '60 segundos',
    steps: [
      'Colocate boca abajo en el suelo y apoyá las palmas al ancho de los hombros.',
      'Extendé las piernas hacia atrás apoyándote en las puntas de los pies, formando una línea recta de la cabeza a los talones (si sos principiante, podés apoyar las rodillas).',
      'Flexioná los codos en un ángulo de aproximadamente 45° respecto al torso para descender el pecho cerca del suelo.',
      'Empujá fuerte con las palmas para regresar a la posición inicial sin arquear la espalda.'
    ],
    tips: [
      'No dejes caer las caderas ni eleves demasiado los glúteos.',
      'Mantené el cuello neutral mirando hacia el suelo.',
      'Controlá la velocidad al bajar.'
    ],
    benefits: [
      'Tonifica pectorales, deltoides y tríceps.',
      'Desarrolla fuerza funcional de empuje.',
      'Refuerza la musculatura central (core).'
    ]
  },
  {
    id: 'burpees',
    name: 'Burpees',
    goal: 'Resistencia',
    level: 'Difícil',
    type: 'Cuerpo completo',
    description: 'Movimiento dinámico de alta intensidad que combina sentadilla, flexión y salto para potenciar la resistencia cardiovascular.',
    image: '/images/exercises/burpees.jpg',
    gif: '/gifs/burpees.gif',
    durationOrReps: '4 series de 8 a 10 repeticiones',
    restTime: '60 segundos',
    steps: [
      'Comenzá de pie con los pies a la anchura de los hombros.',
      'Bajá en posición de sentadilla y apoyá las palmas de las manos en el suelo.',
      'De un salto ligero hacia atrás, extendé las piernas para quedar en posición de plancha alta.',
      'Realizá una flexión de brazos (opcional si estás empezando).',
      'Llevá los pies de vuelta hacia las manos de un salto.',
      'Levantate con un salto vertical explosivo aplaudiendo o estirando los brazos arriba.'
    ],
    tips: [
      'Aterrizá suavemente flexionando las rodillas para amortiguar el impacto.',
      'Mantené una respiración constante y rítmica.',
      'Si te fatigás, hacé el paso hacia atrás pierna por pierna sin saltar.'
    ],
    benefits: [
      'Máxima quema de calorías y aceleración metabólica.',
      'Trabajo integral de casi todos los grupos musculares.',
      'Gran mejora en la resistencia aeróbica y anaeróbica.'
    ]
  },
  {
    id: 'puente-gluteos',
    name: 'Puente de Glúteos',
    goal: 'Mantenerse activo',
    level: 'Fácil',
    type: 'Piernas',
    description: 'Excelente ejercicio para activar la cadena posterior, fortalecer glúteos e isquiotibiales y proteger la zona lumbar.',
    image: '/images/exercises/puente-gluteos.jpg',
    durationOrReps: '3 series de 15 repeticiones',
    restTime: '30 segundos',
    steps: [
      'Acostate boca arriba con las rodillas flexionadas y los pies apoyados en el suelo al ancho de las caderas.',
      'Colocá los brazos a los costados con las palmas hacia abajo.',
      'Apretá los glúteos y empujá con los talones para levantar las caderas hasta que el cuerpo forme una línea recta desde los hombros hasta las rodillas.',
      'Mantené la contracción arriba durante 1 o 2 segundos.',
      'Descendé de manera controlada sin dejar caer el peso de golpe.'
    ],
    tips: [
      'Evitá hiper-extender la espalda lumbar al llegar arriba.',
      'La fuerza debe provenir de los glúteos y talones, no del cuello.',
      'Exhalá al subir e inhalá al bajar.'
    ],
    benefits: [
      'Alivia y previene dolores lumbares causados por pasar mucho tiempo sentado.',
      'Aumenta la firmeza y fuerza en los glúteos.',
      'Mejora la estabilidad pélvica.'
    ]
  },
  {
    id: 'elevaciones-piernas',
    name: 'Elevaciones de Piernas',
    goal: 'Fuerza',
    level: 'Medio',
    type: 'Abdomen',
    description: 'Enfocado en el abdomen bajo y flexores de cadera, esencial para lograr un core firme y definido.',
    image: '/images/exercises/elevaciones-piernas.jpg',
    gif: '/gifs/elevaciones-piernas.gif',
    durationOrReps: '3 series de 10 a 14 repeticiones',
    restTime: '45 segundos',
    steps: [
      'Acostate boca arriba sobre una colchoneta con las piernas completamente extendidas.',
      'Colocá las manos debajo de los glúteos o a los costados para mayor soporte lumbar.',
      'Con el abdomen apretado y las piernas juntas, elevalas lentamente hacia el techo hasta formar un ángulo de 90° con tu torso.',
      'Bajá las piernas despacio y con control, deteniéndote justo antes de que toquen el suelo.',
      'Repetí el movimiento manteniendo la tensión en la zona abdominal.'
    ],
    tips: [
      'No arquees la zona baja de la espalda al descender las piernas.',
      'Si sentís molestias en la espalda baja, flexioná ligeramente las rodillas.',
      'Controlá la bajada, no dejes caer las piernas por gravedad.'
    ],
    benefits: [
      'Tonifica intensamente la zona baja del abdomen.',
      'Mejora el control motor y la postura corporal.',
      'Aumenta la estabilidad del tronco.'
    ]
  },
  {
    id: 'abdominales-crunches',
    name: 'Abdominales Clásicos (Crunches)',
    goal: 'Mantenerse activo',
    level: 'Fácil',
    type: 'Abdomen',
    description: 'Movimiento básico y seguro para fortalecer la parte superior del recto abdominal sin sobrecargar la espalda.',
    image: '/images/exercises/abdominales-crunches.jpg',
    gif: '/gifs/abdominales-crunches.gif',
    durationOrReps: '3 series de 15 a 20 repeticiones',
    restTime: '30 segundos',
    steps: [
      'Acostate boca arriba con las rodillas flexionadas y los pies planos sobre el piso.',
      'Ubicá las puntas de los dedos detrás de las orejas o cruzá los brazos sobre el pecho.',
      'Contrae el abdomen para despegar los hombros y la parte superior de la espalda del piso unos 10 a 15 cm.',
      'Mantené la contracción en el punto más alto durante 1 segundo exhalando el aire.',
      'Volvé a descender suavemente sin apoyar completamente la cabeza.'
    ],
    tips: [
      'Nunca tires del cuello con las manos.',
      'Fijá la mirada en un punto diagonal en el techo para mantener el cuello alineado.',
      'El movimiento debe ser corto y concentrado en el abdomen.'
    ],
    benefits: [
      'Fortalecimiento progresivo del core.',
      'Fácil de realizar en cualquier espacio reducido.',
      'Ideal para crear el hábito del ejercicio diario.'
    ]
  },
  {
    id: 'zancadas',
    name: 'Zancadas (Lunges)',
    goal: 'Fuerza',
    level: 'Medio',
    type: 'Piernas',
    description: 'Ejercicio unilateral para desarrollar potencia, equilibrio y simetría en piernas y glúteos.',
    image: '/images/exercises/zancadas.jpg',
    gif: '/gifs/zancadas.gif',
    durationOrReps: '3 series de 10 repeticiones por pierna',
    restTime: '45 segundos',
    steps: [
      'Parate erguido con los pies juntos y las manos en la cintura.',
      'Da un paso amplio hacia adelante con una pierna.',
      'Flexioná ambas rodillas hasta que la pierna delantera forme un ángulo de 90° y la rodilla trasera casi toque el suelo.',
      'Empujá con el pie delantero para volver a la posición de inicio.',
      'Repetí con la pierna contraria o completá la serie de un lado antes de alternar.'
    ],
    tips: [
      'El torso debe permanecer perpendicular al suelo, sin inclinarte hacia adelante.',
      'La rodilla delantera no debe sobrepasar excesivamente la punta del pie.',
      'Mantené la vista al frente para cuidar el balance.'
    ],
    benefits: [
      'Corrige desbalances de fuerza entre ambas piernas.',
      'Estimula intensamente cuádriceps, femorales y glúteos.',
      'Mejora la coordinación y la propiocepción.'
    ]
  },
  {
    id: 'plancha',
    name: 'Plancha Isométrica',
    goal: 'Resistencia',
    level: 'Medio',
    type: 'Abdomen',
    description: 'El rey de los ejercicios estáticos para la resistencia del core, tonificando abdomen, hombros y glúteos.',
    image: '/images/exercises/plancha.jpg',
    durationOrReps: '3 series de 30 a 45 segundos',
    restTime: '45 segundos',
    steps: [
      'Apoyá los antebrazos en el suelo alineando los codos directamente debajo de los hombros.',
      'Extendé las piernas hacia atrás apoyándote en la punta de los pies.',
      'Alineá el cuerpo de modo que forme una línea recta continua desde la cabeza hasta los talones.',
      'Apretá fuertemente el abdomen y los glúteos, empujando el suelo con los antebrazos.',
      'Sostené la postura respirando con calma sin dejar caer la pelvis.'
    ],
    tips: [
      'Evitá arquear la cintura hacia abajo o levantar la cola en forma de carpa.',
      'Respirá rítmicamente; no aguantes la respiración.',
      'Mirá hacia tus manos para no forzar las cervicales.'
    ],
    benefits: [
      'Desarrolla resistencia muscular profunda en el abdomen.',
      'Protege la columna vertebral contra lesiones.',
      'Mejora la resistencia mental y el enfoque.'
    ]
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    goal: 'Mantenerse activo',
    level: 'Fácil',
    type: 'Cuerpo completo',
    description: 'Ejercicio cardiovascular clásico, divertido y perfecto para entrar en calor y quemar calorías en poco tiempo.',
    image: '/images/exercises/jumping-jacks.jpg',
    gif: '/gifs/jumping-jacks.gif',
    durationOrReps: '3 series de 45 segundos',
    restTime: '30 segundos',
    steps: [
      'Comenzá de pie con las piernas juntas y los brazos pegados a los costados del cuerpo.',
      'Da un salto abriendo las piernas más allá del ancho de los hombros y elevá los brazos por encima de la cabeza hasta dar una palmada.',
      'De otro salto ágil, volvé a la posición inicial uniendo los pies y bajando los brazos.',
      'Mantené un ritmo fluido y constante durante todo el tiempo estipulado.'
    ],
    tips: [
      'Amortiguá el salto cayendo sobre la parte delantera de los pies con las rodillas ligeramente flexionadas.',
      'Mantené el torso firme.',
      'Si buscás bajo impacto, podés abrir un pie a la vez sin despegar ambos del suelo.'
    ],
    benefits: [
      'Aumenta la frecuencia cardíaca y estimula la circulación.',
      'Mejora la coordinación y agilidad corporal.',
      'Excelente activador de energía para cualquier momento del día.'
    ]
  },
  {
    id: 'fondos-triceps',
    name: 'Fondos de Tríceps en Silla',
    goal: 'Fuerza',
    level: 'Medio',
    type: 'Brazos',
    description: 'Utilizando una silla firme o el borde de la cama, este ejercicio fortalece los tríceps y la parte posterior de los brazos.',
    image: '/images/exercises/fondos-triceps.jpg',
    gif: '/gifs/fondos-triceps.gif',
    durationOrReps: '3 series de 10 a 12 repeticiones',
    restTime: '45 segundos',
    steps: [
      'Sentate en el borde de una silla estable y apoyá las palmas al lado de tus caderas sujetando el borde.',
      'Deslizá los glúteos hacia adelante fuera del asiento manteniendo los talones en el suelo con las rodillas flexionadas a 90°.',
      'Flexioná los codos hacia atrás para bajar el torso hasta que los brazos formen un ángulo de 90°.',
      'Empujá con las palmas de las manos para regresar a la posición inicial extendiendo los brazos.'
    ],
    tips: [
      'Mantené la espalda cerca de la silla durante todo el recorrido.',
      'No abras los codos hacia los lados; mantenelos apuntando hacia atrás.',
      'Para mayor dificultad, extendé las piernas completamente al frente.'
    ],
    benefits: [
      'Aísla y tonifica la musculatura del tríceps.',
      'Aumenta la fuerza de extensión del brazo.',
      'No requiere pesas ni equipamiento costoso.'
    ]
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers (Escaladores)',
    goal: 'Resistencia',
    level: 'Medio',
    type: 'Abdomen',
    description: 'Ejercicio de alta intensidad que desafía la resistencia cardiovascular y la fuerza del abdomen al mismo tiempo.',
    image: '/images/exercises/mountain-climbers.jpg',
    gif: '/gifs/mountain-climbers.gif',
    durationOrReps: '3 series de 30 a 45 segundos',
    restTime: '45 segundos',
    steps: [
      'Iniciá en posición de plancha alta con las palmas debajo de los hombros y el cuerpo alineado.',
      'Llevá la rodilla derecha hacia el pecho de forma enérgica sin tocar el suelo con ese pie.',
      'Regresá la pierna derecha atrás mientras de manera coordinada llevás la rodilla izquierda hacia el pecho.',
      'Alterná el movimiento de forma continua, como si estuvieras corriendo en el lugar en posición horizontal.'
    ],
    tips: [
      'Mantené las caderas bajas, alineadas con la espalda.',
      'Empujá el suelo firmemente para no hundir los omóplatos.',
      'Priorizá la técnica antes de buscar demasiada velocidad.'
    ],
    benefits: [
      'Fuerte impacto en la quema de grasas.',
      'Fortalecimiento integral del core y hombros.',
      'Mejora de la resistencia anaeróbica.'
    ]
  },
  {
    id: 'estiramiento-dinamico',
    name: 'Movilidad y Estiramiento Activo',
    goal: 'Mantenerse activo',
    level: 'Fácil',
    type: 'Cuerpo completo',
    description: 'Secuencia suave de movilidad articular y elongación activa para descontracturar el cuerpo y ganar flexibilidad.',
    image: '/images/exercises/estiramiento-dinamico.jpg',
    gif: '/gifs/estiramiento-dinamico.gif',
    durationOrReps: '2 vueltas de 5 minutos',
    restTime: '20 segundos',
    steps: [
      'Realizá giros suaves de cuello, hombros y caderas en ambos sentidos.',
      'De pie, flexioná el torso hacia adelante intentando tocar los tobillos suavemente.',
      'Hacé la postura del gato-vaca en cuatro apoyos para movilizar la columna.',
      'Abrí los brazos en cruz inhalando profundamente y cruzalos al exhalar abrazándote.'
    ],
    tips: [
      'Movete de forma fluida y sin rebotes bruscos.',
      'Conectá con una respiración profunda y pausada.',
      'Ideal para hacer al levantarse o antes de dormir.'
    ],
    benefits: [
      'Reduce la rigidez y tensión muscular.',
      'Aumenta el rango de movimiento de las articulaciones.',
      'Favorece el bienestar general y disminuye el estrés.'
    ]
  }
];
