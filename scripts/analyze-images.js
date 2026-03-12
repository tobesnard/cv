import sharp from 'sharp';

const files = [
  'etude-preliminaire/visuel.png',
  'etude-preliminaire/icone-profile.png',
  'public/og-image.png'
];

async function analyze() {
  for (const file of files) {
    try {
      const metadata = await sharp(file).metadata();
      console.log(`File: ${file}`);
      console.log(`Dimensions: ${metadata.width}x${metadata.height}`);
      console.log(`Format: ${metadata.format}`);
      console.log(`Ratio: ${(metadata.width / metadata.height).toFixed(2)}`);
      console.log('---');
    } catch (error) {
      console.error(`Error analyzing ${file}:`, error.message);
    }
  }
}

analyze();
