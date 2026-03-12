import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'etude-preliminaire/icone-profile.png';
const outputPath = 'public/og-image.png';

async function generateOptimizedOG() {
    try {
        console.log(`Processing: ${inputPath}...`);
        
        // Largeur cible basée sur votre ratio (2762x3480)
        // Mais adaptée à Facebook (1200x630)
        // On va créer un canevas 1200x630 et y placer l'image redimensionnée au ratio souhaité
        
        const targetWidth = 1200;
        const targetHeight = 630;
        
        // On redimensionne l'icone-profile pour qu'elle tienne dans la hauteur du rectangle OG
        // tout en gardant une marge de sécurité
        const iconSize = 580; 

        await sharp(inputPath)
            .resize(iconSize, iconSize, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
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
