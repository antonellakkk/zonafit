import fs from 'fs';

const matched = JSON.parse(fs.readFileSync('matched_exercises.json', 'utf8'));

console.log('=== SQUATS (Bodyweight) ===');
console.log(matched.squat.filter(e => e.equipment === 'bodyweight'));

console.log('=== PUSH-UPS (Bodyweight) ===');
console.log(matched['push-up'].filter(e => e.equipment === 'bodyweight'));

console.log('=== BURPEES ===');
console.log(matched.burpee);

console.log('=== GLUTE BRIDGES ===');
console.log(matched.bridge.filter(e => e.equipment === 'bodyweight'));

console.log('=== LEG RAISES ===');
console.log(matched['leg-raise'].filter(e => e.equipment === 'bodyweight'));

console.log('=== CRUNCHES ===');
console.log(matched.crunch.filter(e => e.equipment === 'bodyweight'));

console.log('=== LUNGES ===');
console.log(matched.lunge.filter(e => e.equipment === 'bodyweight'));

console.log('=== PLANKS ===');
console.log(matched.plank.filter(e => e.equipment === 'bodyweight'));

console.log('=== JACKS ===');
console.log(matched.jack);

console.log('=== DIPS ===');
console.log(matched.dip.filter(e => e.equipment === 'bodyweight'));

console.log('=== CLIMBERS ===');
console.log(matched.climber);

console.log('=== STRETCHES ===');
console.log(matched.stretch.filter(e => e.equipment === 'bodyweight'));
