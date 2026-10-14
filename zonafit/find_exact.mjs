import fs from 'fs';

const fullData = JSON.parse(fs.readFileSync('matched_exercises.json', 'utf8'));

// Let's read all exercises from https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/es/exercises.json
import https from 'https';

https.get('https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/es/exercises.json', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body).exercises;
    
    function search(terms) {
      return data.filter(e => {
        const str = (e.id + ' ' + e.slug + ' ' + e.name).toLowerCase();
        return terms.every(t => str.includes(t.toLowerCase()));
      });
    }

    console.log('1. SQUATS:', search(['squat', 'bodyweight']).map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('2. PUSHUPS:', search(['push-up']).filter(e => e.equipment === 'bodyweight').map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('3. BURPEE:', search(['burpee']).map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('4. BRIDGE (Glute):', search(['bridge']).filter(e => e.equipment === 'bodyweight').map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('5. LEG RAISE (Lying):', search(['leg-raise']).filter(e => e.equipment === 'bodyweight').map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('6. CRUNCH:', search(['crunch']).filter(e => e.equipment === 'bodyweight').map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('7. LUNGE:', search(['lunge']).filter(e => e.equipment === 'bodyweight').map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('8. PLANK:', search(['plank']).map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('9. JACK / JUMPING JACK:', search(['jack']).map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('10. TRICEP DIP:', search(['dip']).filter(e => e.equipment === 'bodyweight').map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('11. MOUNTAIN CLIMBER:', search(['climber']).map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
    console.log('12. STRETCH:', search(['stretch']).filter(e => e.equipment === 'bodyweight').slice(0, 10).map(e => ({id: e.id, name: e.name, gif: e.gifUrl})));
  });
});
