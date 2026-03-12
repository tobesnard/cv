import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'etude-preliminaire/icone-profile.png';
const outputPath = 'public/og-v7.png';

async function generateOptimizedOG() {
    try {
        console.log(`Processing: ${inputPath}...`);

        // Format standard paysage pour Twitter/X (1200x630)
        // On s'assure que l'image est bien reconnue avec un nouveau nom v7
        const targetWidth = 1200;
        const targetHeight = 630;

        // On réduit légèrement l'icône pour laisser des marges (safe zone)
        const iconSize = 600; 

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
                background: { r: 13, g: 31, b: 60, alpha: 1 }
            })
            .toFile(outputPath);

        console.log(`Success! Image generated at ${outputPath}`);
    } catch (err) {
        console.error('Error generating image:', err);
    }
}

generateOptimizedOG();
