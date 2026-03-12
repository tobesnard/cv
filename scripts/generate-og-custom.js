import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'etude-preliminaire/icone-profile.png';
const outputPath = 'public/og-v6.png';

async function generateOptimizedOG() {
    try {
        console.log(`Processing: ${inputPath}...`);

        // Format standard LinkedIn/Facebook (Ratio ~1.91:1)
        // 1200x630 est le format universel pour éviter les troncatures
        const targetWidth = 1200;
        const targetHeight = 630;

        // On réduit l'icône pour qu'elle soit entièrement visible dans ce rectangle 
        // avec des marges de sécurité
        const iconSize = 580;

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
                background: { r: 13, g: 31, b: 60, alpha: 1 } // Bleu sombre
            })
            .toFile(outputPath);

        console.log(`Success! Image generated at ${outputPath}`);
    } catch (err) {
        console.error('Error generating image:', err);
    }
}

generateOptimizedOG();
