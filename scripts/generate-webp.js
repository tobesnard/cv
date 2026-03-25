import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateWebp() {
    const url = 'http://localhost:5173/cv/'; // URL avec préfixe (/cv/)
    const tempPngPath = path.resolve(__dirname, '../public/temp-cv-capture.png');
    const outputPath = path.resolve(__dirname, '../public/cv-capture.webp');

    console.log(`Lancement du navigateur pour capturer ${url}...`);

    // On lance chromium
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // On définit le viewport
    await page.setViewportSize({ width: 1200, height: 1600 });

    try {
        await page.goto(url, { waitUntil: 'networkidle' });

        // Attendre un peu plus pour être sûr que tout soit rendu
        await page.waitForTimeout(2000);

        // Cibler la div.cv-content
        const cvContent = await page.$('.cv-content');
        if (!cvContent) {
            throw new Error('Élément .cv-content non trouvé dans la page');
        }

        // On capture en PNG temporairement (uniquement l'élément)
        console.log(`Capture de .cv-content en PNG...`);
        await cvContent.screenshot({
            path: tempPngPath,
            type: 'png'
        });

        // Conversion en WebP avec sharp
        console.log(`Conversion PNG vers WebP avec sharp...`);
        await sharp(tempPngPath)
            .webp({ quality: 90 })
            .toFile(outputPath);

        console.log(`Succès ! Image générée : ${outputPath}`);
    } catch (error) {
        console.error('Erreur lors de la capture :', error);
    } finally {
        await browser.close();
        if (fs.existsSync(tempPngPath)) {
            fs.unlinkSync(tempPngPath);
        }
    }
}

generateWebp();