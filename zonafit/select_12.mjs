import fs from 'fs';

const data = JSON.parse(fs.readFileSync('matched_exercises.json', 'utf8'));

console.log('--- 1. SENTADILLAS ---');
console.log(data.squat.filter(e => e.equipment === 'bodyweight' || e.slug.includes('bodyweight')));

console.log('--- 2. PUSHUPS ---');
console.log(data['push-up'].filter(e => e.equipment === 'bodyweight' && (e.slug === 'push-up' || e.slug.includes('standard') || e.slug.includes('classic') || e.slug === 'pushups')));

console.log('--- 3. BURPEES ---');
console.log(data.burpee);

console.log('--- 4. GLUTE BRIDGE ---');
console.log(data.bridge.filter(e => e.slug.includes('glute') || e.slug.includes('butt') || e.slug === 'bridge' || e.slug.includes('hip-raise')));

console.log('--- 5. LEG RAISES ---');
console.log(data['leg-raise'].filter(e => e.equipment === 'bodyweight'));

console.log('--- 6. CRUNCHES ---');
console.log(data.crunch.filter(e => e.equipment === 'bodyweight' && (e.slug === 'crunch' || e.slug === 'crunches' || e.slug.includes('basic') || e.slug.includes('floor'))));

console.log('--- 7. LUNGES ---');
console.log(data.lunge.filter(e => e.equipment === 'bodyweight' && (e.slug === 'bodyweight-lunge' || e.slug === 'lunges' || e.slug.includes('forward'))));

console.log('--- 8. PLANKS ---');
console.log(data.plank.filter(e => e.equipment === 'bodyweight' && (e.slug === 'front-plank' || e.slug === 'plank' || e.slug.includes('elbow'))));

console.log('--- 9. JUMPING JACKS ---');
console.log(data.jack);

console.log('--- 10. TRICEPS DIPS ---');
console.log(data.dip.filter(e => e.slug.includes('bench') || e.slug.includes('chair') || e.slug.includes('triceps-dip') || e.slug === 'dips-between-chairs'));

console.log('--- 11. MOUNTAIN CLIMBERS ---');
console.log(data.climber);

console.log('--- 12. STRETCHES ---');
console.log(data.stretch.filter(e => e.slug.includes('dynamic') || e.slug.includes('world') || e.slug.includes('full-body')));
