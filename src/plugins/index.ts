import type { App } from 'vue';
import pinia from './pinia';
import i18n from './i18n';

/**
 * Configure et installe tous les plugins de l'application.
 * Cette centralisation permet de garder le main.ts propre et modulaire.
 * @param app - L'instance de l'application Vue
 */
export function registerPlugins(app: App): void {
    app.use(pinia);
    app.use(i18n);
}

export { pinia, i18n };
