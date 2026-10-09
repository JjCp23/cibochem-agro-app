/**
 * Punto único de entrada a los tres cerebros de la app.
 *
 *   resistencia  → ¿comparten sitio de acción? ¿con qué puedo rotar?
 *   diagnostico  → ¿qué producto encaja con esta situación de campo?
 *   aplicacion   → ¿cuánto producto, en cuántas bombas, en qué orden?
 *
 * Los componentes importan siempre desde aquí, no de los archivos sueltos:
 * así se puede reorganizar el interior sin tocar la interfaz.
 */

export * from './resistencia.js';
export * from './diagnostico.js';
export * from './aplicacion.js';
