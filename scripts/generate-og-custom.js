import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'etude-preliminaire/icone-profile.png';
const outputPath = 'public/og-v5.png';

async function generateOptimizedOG() {
    try {
        console.log(`Processing: ${inputPath}...`);

        // Résolution optimisée pour Twitter tout en gardant exactement le ratio d'origine
        // 2762 / 3480 = ~0.793
        // 1110 / 1400 = ~0.792 (Correct)
        const targetWidth = 1110;
        const targetHeight = 1400;

        // On redimensionne l'icone-profile pour qu'elle tienne dans ce format vertical
        const iconSize = 1000;

        await sharp(inputPath)
            .resize(iconSize, iconSize, {
                fit: 'contain',
                background: { r: 13, g: 31, b: 60, alpha: 1 }
            })
            .extend({
                top: Math.floor((targetHeight - iconSize) / 2),
                bottom: Math.ceil((targetHeight - iconSize) / 2),
                left: Math.floor((targetWidth - iconSize) / 2),
                right: Math.ceil((targetWidth - iconSize) / 2),
                background: { r: 13, g: 31, b: 60, alpha: 1 } // Couleur bleu sombre du CV
            })
            .toFile(outputPath);

        console.log(`Success! Image generated at ${outputPath}`);
    } catch (err) {
        console.error('Error generating image:', err);
    }
}

generateOptimizedOG();
