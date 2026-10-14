import fs from 'fs';

const matched = JSON.parse(fs.readFileSync('matched_exercises.json', 'utf8'));

console.log('--- ALL PLANKS ---');
for (const p of matched.plank) {
  console.log(`${p.id} | ${p.name} | ${p.equipment} | ${p.gifUrl}`);
}
