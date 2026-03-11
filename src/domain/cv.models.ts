/**
 * @file cv.models.js
 * @description Modèles de données et types pour le domaine du CV.
 * Définit la structure attendue des entités métier.
 */

/**
 * @typedef {Object} ContactInfo
 * @property {string} nom
 * @property {string} adresse
 * @property {string} telephone
 * @property {string} email
 * @property {string} github - URL du profil GitHub
 */

/**
 * @typedef {Object} Experience
 * @property {string} titre
 * @property {string} entreprise
 * @property {string} periode
 * @property {string} description
 */

/**
 * @typedef {Object} Formation
 * @property {string} annee
 * @property {string} diplome
 * @property {string} etablissement
 */

/**
 * @typedef {Object} SkillCategory
 * @property {Object.<string, string[]>} categories - Nom catégorie -> Liste de compétences
 */

/**
 * @typedef {Object} CvData
 * @property {string} titre
 * @property {string} subtitle
 * @property {string} profil
 * @property {ContactInfo} entete
 * @property {Object.<string, SkillCategory>} competences
 * @property {Experience[]} experience_professionnelle
 * @property {Formation[]} formation
 * @property {string} centres_d_interets
 */
