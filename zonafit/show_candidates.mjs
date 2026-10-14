import fs from 'fs';

const matched = JSON.parse(fs.readFileSync('matched_exercises.json', 'utf8'));

function show(category, list) {
  console.log(`\n=================== ${category} ===================`);
  list.forEach(e => {
    console.log(`- [${e.id}] ${e.name} (${e.equipment}): ${e.gifUrl}`);
  });
}

show('SQUATS', matched.squat.filter(e => e.equipment === 'bodyweight'));
show('PUSH-UPS', matched['push-up'].filter(e => e.equipment === 'bodyweight'));
show('BURPEES', matched.burpee);
show('GLUTE BRIDGE', matched.bridge.filter(e => e.equipment === 'bodyweight'));
show('LEG RAISES', matched['leg-raise'].filter(e => e.equipment === 'bodyweight'));
show('CRUNCHES', matched.crunch.filter(e => e.equipment === 'bodyweight'));
show('LUNGES', matched.lunge.filter(e => e.equipment === 'bodyweight'));
show('PLANKS', matched.plank.filter(e => e.equipment === 'bodyweight'));
show('JACKS', matched.jack);
show('DIPS', matched.dip.filter(e => e.equipment === 'bodyweight'));
show('MOUNTAIN CLIMBERS', matched.climber);
show('STRETCHES', matched.stretch.filter(e => e.equipment === 'bodyweight'));
