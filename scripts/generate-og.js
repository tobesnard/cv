import sharp from 'sharp';

async function generateOgImage() {
    const source = 'etude-preliminaire/icone-profile.png';
    const target = 'public/og-image.png';

    // Dimensions recommandées pour l'Open Graph Facebook (1.91:1)
    const width = 1200;
    const height = 630;

    try {
        // On extrait la couleur dominante pour le fond (optionnel, on peut aussi utiliser blanc ou transparent)
        // Ici on va utiliser un fond blanc propre ou transparent selon le besoin.
        // L'utilisateur mentionne la couleur dominante, essayons de l'extraire ou d'utiliser transparent.

        await sharp({
            create: {
                width: width,
                height: height,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 0 } // Fond transparent
            }
        })
            .composite([
                {
                    input: await sharp(source).resize({ height: 500 }).toBuffer(), // On redimensionne un peu l'icône
                    gravity: 'center'
                }
            ])
            .png()
            .toFile(target);

        console.log(`Successfully created ${target} with dimensions ${width}x${height}`);
    } catch (error) {
        console.error('Error generating OG image:', error);
    }
}

generateOgImage();
