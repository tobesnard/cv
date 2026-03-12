import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function optimizePdf() {
    const inputPath = 'etude-preliminaire/Tony BESNARD _ Lead Développeur Full-Stack .NET & Chef de Projet.pdf';
    const outputPath = 'etude-preliminaire/Tony_BESNARD_CV_Optimized.pdf';

    try {
        console.log(`Lecture du fichier : ${inputPath}...`);
        const existingPdfBytes = fs.readFileSync(inputPath);

        // Charger le PDF
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Le charger et le sauvegarder avec pdf-lib permet souvent de supprimer
        // les métadonnées inutiles et de reconstruire la structure de manière plus compacte.
        const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

        fs.writeFileSync(outputPath, pdfBytes);

        const oldSize = (existingPdfBytes.length / 1024 / 1024).toFixed(2);
        const newSize = (pdfBytes.length / 1024 / 1024).toFixed(2);

        console.log(`Succès !`);
        console.log(`Ancienne taille : ${oldSize} Mo`);
        console.log(`Nouvelle taille : ${newSize} Mo`);
        console.log(`Fichier généré : ${outputPath}`);
    } catch (error) {
        console.error('Erreur lors de l\'optimisation du PDF :', error);
    }
}

optimizePdf();
