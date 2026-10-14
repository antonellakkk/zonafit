import fs from 'fs';

const matched = JSON.parse(fs.readFileSync('matched_exercises.json', 'utf8'));

for (const [key, items] of Object.entries(matched)) {
  console.log(`=== KEY: ${key} (${items.length} items) ===`);
  items.slice(0, 15).forEach(e => {
    console.log(`  id: "${e.id}", name: "${e.name}", eq: "${e.equipment}", url: "${e.gifUrl}"`);
  });
}
