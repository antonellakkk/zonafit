import https from 'https';
import fs from 'fs';

https.get('https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/es/exercises.json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      const exercises = data.exercises || [];
      console.log('Total exercises:', exercises.length);

      const targets = [
        'squat',
        'push-up',
        'burpee',
        'bridge',
        'leg-raise',
        'crunch',
        'lunge',
        'plank',
        'jack',
        'dip',
        'climber',
        'stretch'
      ];

      const matches = {};
      for (const target of targets) {
        matches[target] = exercises.filter(e => 
          e.slug.includes(target) || 
          e.name.toLowerCase().includes(target) || 
          e.id.includes(target)
        ).map(e => ({
          id: e.id,
          slug: e.slug,
          name: e.name,
          equipment: e.equipment,
          gifUrl: e.gifUrl
        }));
      }

      fs.writeFileSync('matched_exercises.json', JSON.stringify(matches, null, 2));
      console.log('Saved matches to matched_exercises.json');
    } catch(err) {
      console.error('Error parsing JSON:', err);
    }
  });
}).on('error', err => console.error('Request error:', err));
