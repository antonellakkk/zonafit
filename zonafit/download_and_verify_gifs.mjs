import fs from 'fs';
import path from 'path';
import https from 'https';

const gifs = {
  'sentadillas': 'https://media.giphy.com/media/1qgIPm9bmOhRjANGGF/giphy.gif',
  'flexiones': 'https://media.giphy.com/media/Kx82Lvb7wcYNO/giphy.gif',
  'burpees': 'https://media.giphy.com/media/23hPPMRgPxbNBlPQe3/giphy.gif',
  'puente-gluteos': 'https://media.giphy.com/media/26AHG5KGFxSkUWw1i/giphy.gif',
  'elevaciones-piernas': 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/lying-leg-raise-flat-bench.gif',
  'abdominales-crunches': 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/crunch-floor.gif',
  'zancadas': 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/forward-lunge-male.gif',
  'plancha': 'https://media.giphy.com/media/xT8qBff8cRRFf7G2u4/giphy.gif',
  'jumping-jacks': 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/jack-jump-male.gif',
  'fondos-triceps': 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/bench-dip-knees-bent.gif',
  'mountain-climbers': 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/mountain-climber.gif',
  'estiramiento-dinamico': 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dynamic-chest-stretch-male.gif'
};

const outputDir = path.join(process.cwd(), 'public', 'gifs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (targetUrl) => {
      https.get(targetUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          get(response.headers.location);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${targetUrl}: HTTP ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(dest));
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    get(url);
  });
}

async function run() {
  console.log('Downloading and verifying all 12 exercise GIFs...');
  for (const [id, url] of Object.entries(gifs)) {
    const dest = path.join(outputDir, `${id}.gif`);
    try {
      await download(url, dest);
      const stat = fs.statSync(dest);
      console.log(`✔ [${id}] downloaded successfully (${(stat.size / 1024).toFixed(1)} KB) from ${url}`);
    } catch (err) {
      console.error(`✘ [${id}] ERROR:`, err.message);
    }
  }
}

run();
