import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'src/assets/images';
const outputDir = 'public/images'; // Ou garder dans src, ici on automatise

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
    const files = fs.readdirSync(inputDir);

    for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
            const inputPath = path.join(inputDir, file);
            const outputName = file.split('.')[0] + '.webp';
            const outputPath = path.join(outputDir, outputName);

            console.log(`Optimizing: ${file} -> ${outputName}`);

            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
        }
    }
}

optimizeImages().catch(err => console.error('Error optimizing images:', err));
