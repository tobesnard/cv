import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'etude-preliminaire/icone-profile.png';
const outputPath = 'public/og-image.png';

async function generateOptimizedOG() {
    try {
        console.log(`Processing: ${inputPath}...`);
        
        // Largeur cible basée sur votre demande précise (ratio 2762x3480)
        const targetWidth = 2762;
        const targetHeight = 3480;
        
        // On redimensionne l'icone-profile pour qu'elle tienne dans ce format vertical
        const iconSize = 2500; 

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
