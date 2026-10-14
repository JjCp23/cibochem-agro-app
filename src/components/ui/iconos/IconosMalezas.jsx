import React from 'react';

/**
 * Íconos de los tipos de maleza del diagnóstico.
 *
 * Misma interfaz que los íconos de lucide-react (size, color, strokeWidth,
 * className), así el diagnóstico los pinta igual que cualquier otro ícono.
 * Se dibujan en una retícula de 48 × 48 con el trazo en el color de la rama y
 * rellenos translúcidos del mismo color, para que se lean bien a 30 px dentro
 * de los botones de opción.
 */

/** Hoja ancha (dicotiledóneas). */
export function IconoHojaAncha({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M24 6 C16 9 9 14 8 22 C7.2 29 11 35 16 36.5 C19 37.4 22 36.5 24 34 C26 36.5 29 37.4 32 36.5 C37 35 40.8 29 40 22 C39 14 32 9 24 6 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.7}
      />
      <path d="M24 34.2 C24.3 38 24.2 41 24 44.5" strokeWidth={strokeWidth * 1.5} />
      <path d="M24 33.6 C24.2 25 24.1 15 24 7.2" strokeWidth={strokeWidth * 1.1} />
      <path d="M24 29.5 C19 28 14 26.5 10.5 23.5" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 29.5 C29 28 34 26.5 37.5 23.5" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 22.5 C20 21 16 19.5 12.5 16.5" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 22.5 C28 21 32 19.5 35.5 16.5" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 15.5 C22 14.3 20 13 17.5 11.3" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 15.5 C26 14.3 28 13 30.5 11.3" strokeWidth={strokeWidth * 0.85} />
      <path d="M16.6 27 C18.2 25.2 18.7 22.4 18 20.2" strokeWidth={strokeWidth * 0.75} />
      <path d="M31.4 27 C29.8 25.2 29.3 22.4 30 20.2" strokeWidth={strokeWidth * 0.75} />
    </svg>
  );
}

/** Gramíneas (hoja angosta, pastos). */
export function IconoGramineas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M22.6 42.6 C17.5 40 11 37 3 31" strokeWidth={strokeWidth * 1.2} />
      <path d="M25.8 42.6 C31 40.5 37 38.5 44 34" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M22 42.4 C18.5 35 14 27.5 5 18 C12 30 15.5 36.5 19.6 42.6 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.5}
      />
      <path d="M20.6 42.4 C17 35.5 13 28 5.4 18.6" strokeWidth={strokeWidth * 0.8} />
      <path d="M23.4 42.4 C22 33 20.5 23 18.5 13" strokeWidth={strokeWidth * 1.15} />
      <path
        d="M22.8 42.4 C26 34 30.5 26 43 16.5 C33.5 28 30 35.5 27.4 42.6 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M24.2 42 C27 34.5 31 27 42.6 16.9" strokeWidth={strokeWidth * 0.8} />
      <path d="M26 42.2 C28.8 35 31.9 28.5 42.8 16.7" strokeWidth={strokeWidth * 0.8} />
      <path d="M24.2 42.4 C24.8 33 25.6 24 25.8 16 L24.8 4.5" strokeWidth={strokeWidth * 1.3} />
      <path d="M25.6 13.6 L21.6 11.4 M25.3 10.5 L21.9 8.2 M25.1 7.6 L22.4 5.3" strokeWidth={strokeWidth * 0.95} />
      <path d="M25.6 13.6 L29.4 11.6 M25.3 10.5 L29 8.4 M25.1 7.6 L28.2 5.5" strokeWidth={strokeWidth * 0.95} />
      <path d="M18.5 42.6 C21 41.2 27 41.2 29.5 42.6" strokeWidth={strokeWidth * 1.3} />
      <path
        d="M21.5 43.4 C20.5 44.8 19.5 45.6 18 46 M26.5 43.4 C27.6 44.8 28.8 45.6 30.5 46"
        strokeWidth={strokeWidth * 0.9}
      />
    </svg>
  );
}

/** Ciperáceas (coquito, cortadera). */
export function IconoCiperaceas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M3 31 L45 31" strokeWidth={strokeWidth * 1.2} />
      <path d="M24 18 L18.5 31 L29.5 31 Z" fill={color} fillOpacity={0.18} strokeWidth={strokeWidth * 1.7} />
      <path d="M18.8 30.6 C14.5 27 10 21.5 7 14.5" strokeWidth={strokeWidth * 1.3} />
      <path d="M29.2 30.6 C33.5 27 38 21.5 41 14.5" strokeWidth={strokeWidth * 1.3} />
      <path d="M24 18.4 C21.5 13.5 19.5 9 18.5 4" strokeWidth={strokeWidth * 1.3} />
      <path d="M24 18 L24 10" strokeWidth={strokeWidth * 1.2} />
      <path d="M24 10 L20.5 5.5 M24 10 L25 3.6 M24 10 L29.5 6.5" strokeWidth={strokeWidth * 0.95} />
      <path d="M20.9 6.2 L20.2 5.1 M25 4.4 L25 3.3 M29.1 7.1 L29.8 6" strokeWidth={strokeWidth * 2.2} />
      <path
        d="M24 31 L24 34.4 C26.5 35.5 28.4 36.2 30 37 C32.6 38.3 34.4 39 36 40 C38.2 41.4 39.6 42.6 41 43.8 M24 34.4 C21.5 35.8 19.5 37.6 17.5 39.8"
        strokeWidth={strokeWidth * 1.2}
      />
      <circle cx="30" cy="37" r="2.5" fill={color} stroke="none" />
      <circle cx="36" cy="40" r="2.2" fill={color} stroke="none" />
      <circle cx="41" cy="43.8" r="2" fill={color} stroke="none" />
      <circle cx="17.5" cy="40.1" r="2.2" fill={color} stroke="none" />
    </svg>
  );
}

/** Leñosas y arbustivas (rebrote en potreros). */
export function IconoLenosas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M8 42.6 L40 42.6" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M19.6 42.2 C17 41.2 15 40.6 12.8 40.4 M28.4 42.2 C31 41.2 33 40.6 35.2 40.4"
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M19.6 42.4 L20.1 28.4 C20.1 30.7 27.9 30.7 27.9 28.4 L28.4 42.4 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 2}
      />
      <ellipse cx="24" cy="28.4" rx="3.9" ry="1.7" fill={color} fillOpacity={0.28} strokeWidth={strokeWidth * 1.6} />
      <path d="M20.5 28.5 L15.5 22.5 L11 15.5" strokeWidth={strokeWidth * 1.5} />
      <path d="M21.6 27.8 L19.5 20 L17 12" strokeWidth={strokeWidth * 1.5} />
      <path d="M26.4 27.8 L28.8 20.5 L27.2 11" strokeWidth={strokeWidth * 1.5} />
      <path d="M27.5 28.5 L33 23 L38.5 16.5" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M11.2 15.8 C7.4 14.6 5.2 11.4 5.6 8 C9.2 9 11.4 12.3 11.2 15.8 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M17 12.2 C14.6 9.6 14.2 5.8 16 2.8 C18.6 5 19.2 9 17 12.2 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M27.2 11.2 C27.8 7.8 30.4 5 33.6 4.4 C33.4 8 30.8 10.9 27.2 11.2 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M38.4 16.8 C39.4 13.8 42 11.6 44.8 11.4 C44.2 14.6 41.6 16.9 38.4 16.8 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
    </svg>
  );
}

/** Helechos (helecho marranero). */
export function IconoHelechos({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M11 45 C12 36.5 14.5 28 19.5 21.5 C23 16.9 28.5 15.6 33 17.2" strokeWidth={strokeWidth * 1.6} />
      <path
        d="M12 38.7 C9.9 36 7.2 34.8 3.8 35.2 C5.9 37.9 8.6 39.1 12 38.7 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M13.75 32.5 C16.9 33.5 19.8 32.9 22.2 30.6 C19 29.6 16.2 30.2 13.75 32.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M16.2 26.7 C13.7 24.5 10.8 23.9 7.6 24.8 C10.1 27 13 27.6 16.2 26.7 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M19.5 21.5 C22.3 23.2 25.1 23.3 28 21.8 C25.2 20.2 22.4 20.1 19.5 21.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M23.8 17.9 C23 14.6 21.1 12.3 18 11 C18.8 14.3 20.7 16.6 23.8 17.9 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M12 38.7 C9.4 37 6.8 35.9 4.2 35.3 M13.9 32.5 C16.6 31.9 19.4 31.6 21.9 30.7 M16.1 26.6 C13.5 25.9 10.7 25.5 7.9 24.9 M19.6 21.6 C22.4 21.7 25.2 21.8 27.7 21.8 M23.7 17.8 C22.1 15.9 20.6 13.9 18.3 11.4"
        strokeWidth={strokeWidth * 0.75}
      />
      <path
        d="M33 17.2 C35.9 17.2 37.9 14.7 37.9 12 C37.9 9.3 35.5 7.5 33 7.5 C30.5 7.5 29.2 9.9 29.2 12 C29.2 14.1 31.3 15 33 15 C34.7 15 35.2 13.2 35.2 12 C35.2 10.8 33.8 10.6 33 10.6"
        strokeWidth={strokeWidth * 1.45}
      />
      <path d="M7 45.4 C9 44.4 13 44.4 15.5 45.4" strokeWidth={strokeWidth * 1.2} />
    </svg>
  );
}

/** Perennes con rizoma (rebrotan desde la raíz). */
export function IconoPerennes({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <rect x="2" y="21.5" width="44" height="24" rx="2.5" fill={color} fillOpacity={0.1} stroke="none" />
      <path d="M3 21.5 L45 21.5" strokeWidth={strokeWidth * 1.4} />
      <path
        d="M5 34 C9.5 31.8 13.5 31.2 17.5 31.8 C22.5 32.5 26.5 34.2 31.5 33.6 C35.5 33.1 39 31.2 43 29.8"
        strokeWidth={strokeWidth * 1.7}
      />
      <circle cx="17.5" cy="31.8" r="1.8" fill={color} stroke="none" />
      <circle cx="31.5" cy="33.6" r="1.8" fill={color} stroke="none" />
      <path
        d="M17.5 32.4 C16.8 35.5 15.5 38.5 13.8 41.5 M17.5 32.4 C18.4 35.2 19 38 19.2 41 M17.5 32.4 C19.8 34.6 21.5 36.8 22.8 39.2 M31.5 34.2 C30.8 36.8 29.8 39.2 28.4 41.6 M31.5 34.2 C32.6 36.6 33.6 38.8 34.2 41.8"
        strokeWidth={strokeWidth * 0.9}
      />
      <path d="M17.5 31.2 C17.2 27.5 16.9 24 16.9 18.6" strokeWidth={strokeWidth * 1.4} />
      <path d="M13.6 19.8 L20.4 17.2" strokeWidth={strokeWidth * 1.2} />
      <path d="M31.5 33 C31.3 27 31.2 20 30.6 13 C30.4 10 30.2 8 30 6" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M30.9 17.5 C29 14.7 26.4 13.4 23 13.5 C24.9 16.3 27.5 17.6 30.9 17.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M30.4 11.5 C33.6 11.9 36.3 10.9 38.5 8.5 C35.3 8.1 32.6 9.1 30.4 11.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M30.1 7.5 C29.4 5.3 27.8 3.9 25.5 3.5 C26.2 5.7 27.8 7.1 30.1 7.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path d="M8.3 32.4 C8 29.5 8.2 27.5 9 25.8" strokeWidth={strokeWidth * 1.1} />
      <circle cx="9.1" cy="25.2" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

/** Todo lo verde (limpieza total del lote). */
export function IconoNoSelectivo({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M3 43.5 L45 43.5" strokeWidth={strokeWidth * 1.2} />
      <path d="M10 43.5 C9.8 36 10 30 10.4 24" strokeWidth={strokeWidth * 1.4} />
      <path
        d="M10.5 24 C6 21.5 5 16 8 12.5 C9 11.4 10 11 10.5 11 C11 11 12 11.4 13 12.5 C16 16 15 21.5 10.5 24 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M10.5 23 L10.5 12.4" strokeWidth={strokeWidth * 0.8} />
      <path
        d="M24 43.5 C22 35 20.5 28 19 20 M24 43.5 C23.6 34 23.4 26 23.4 17 M24 43.5 C25.8 34.5 27.5 27 29 20 M24 43.5 C26.5 37.5 29 33.5 32 30.5"
        strokeWidth={strokeWidth * 1.3}
      />
      <path d="M38 43.5 L38 32 M38 32 L33.5 26 L32.7 20.5 M38 32 L42 26.5 L42.6 21.5" strokeWidth={strokeWidth * 1.7} />
      <path
        d="M32.7 20.5 C32.7 18.3 31.8 16.6 29.8 15.5 C29.8 17.8 30.7 19.4 32.7 20.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.1}
      />
      <path
        d="M42.6 21.5 C44.5 20.4 45.4 18.7 45.2 16.5 C44.2 16 43.3 17.6 42.6 21.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.1}
      />
      <path
        d="M2.5 24 C13 19.5 27 16.5 45.5 15 L45.5 20 C27 21.5 13 24.5 2.5 29 Z"
        fill={color}
        fillOpacity={0.2}
        strokeWidth={strokeWidth * 0.9}
      />
    </svg>
  );
}

/** Ícono por id de objetivo de la rama de malezas (ver taxonomia.js). */
export const ICONOS_MALEZAS = {
  'hoja-ancha': IconoHojaAncha,
  gramineas: IconoGramineas,
  ciperaceas: IconoCiperaceas,
  lenosas: IconoLenosas,
  helechos: IconoHelechos,
  perennes: IconoPerennes,
  'no-selectivo': IconoNoSelectivo,
};
