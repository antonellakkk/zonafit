import https from 'https';

https.get('https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/es/exercises.json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body).exercises;

    const slugs = [
      'bodyweight-squat',
      'push-up',
      'burpee',
      'bridge',
      'glute-bridge',
      'lying-leg-raise',
      'lying-straight-leg-raise',
      'crunch-floor',
      'forward-lunge-male',
      'front-plank',
      'plank',
      'jack-jump-male',
      'jumping-jack',
      'bench-dip-knees-bent',
      'bench-dip-on-floor',
      'triceps-dip-bench-leg',
      'mountain-climber',
      'world-greatest-stretch',
      'dynamic-chest-stretch-male'
    ];

    const found = data.filter(e => slugs.some(s => e.slug === s || e.slug.includes(s)));
    console.log('--- FOUND SLUGS ---');
    found.forEach(e => console.log(`${e.id} -> ${e.name} -> ${e.gifUrl}`));
  });
});
