import fs from 'fs';

const matched = JSON.parse(fs.readFileSync('matched_exercises.json', 'utf8'));

// Print all squats
console.log('--- ALL SQUATS ---');
for (const s of matched.squat) {
  console.log(`${s.id} | ${s.name} | ${s.equipment} | ${s.gifUrl}`);
}

console.log('--- ALL PUSHUPS ---');
for (const p of matched['push-up']) {
  console.log(`${p.id} | ${p.name} | ${p.equipment} | ${p.gifUrl}`);
}

console.log('--- ALL BURPEES ---');
for (const b of matched.burpee) {
  console.log(`${b.id} | ${b.name} | ${b.equipment} | ${b.gifUrl}`);
}
