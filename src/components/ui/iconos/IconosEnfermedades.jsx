import React from 'react';

/**
 * Íconos de las enfermedades del diagnóstico.
 *
 * Misma interfaz que los íconos de lucide-react (size, color, strokeWidth,
 * className), así el diagnóstico los pinta igual que cualquier otro ícono.
 * Se dibujan en una retícula de 48 × 48 con el trazo en el color de la rama y
 * rellenos translúcidos del mismo color, para que se lean bien a 30 px dentro
 * de los botones de opción.
 *
 * Están en dos grupos: los síntomas foliares generales y las enfermedades con
 * un cuadro propio (sigatoka, oomicetos, raíz y suelo, botrytis). El
 * diagnóstico los une en un solo mapa por id de objetivo.
 */

/** Trazo de un anillo (círculo con hueco) para las lesiones de mancha foliar. */
function anillo(cx, cy, radioExterior, radioInterior) {
  return `M${cx - radioExterior} ${cy} A ${radioExterior} ${radioExterior} 0 1 1 ${cx + radioExterior} ${cy} A ${radioExterior} ${radioExterior} 0 1 1 ${cx - radioExterior} ${cy} Z M${cx - radioInterior} ${cy} A ${radioInterior} ${radioInterior} 0 1 1 ${cx + radioInterior} ${cy} A ${radioInterior} ${radioInterior} 0 1 1 ${cx - radioInterior} ${cy} Z`;
}

/** Hongos foliares (tizones, antracnosis). */
export function IconoHongosFoliares({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
      <g transform="rotate(-30 24 24)">
        <path
          d="M24 5 L28.4 9.5 L27.2 13.5 L32.8 17.5 L31.2 21.5 L36 25.5 L33.6 29.5 L34.4 33.5 L30 37 L29 40 L24 43 L18.8 40 L19.8 36.5 L13.8 33 L15.6 29 L12 25 L15.6 21 L15.4 16.5 L20 12 L20 9 Z"
          fill={color}
          fillOpacity={0.1}
          strokeWidth={strokeWidth * 1.6}
        />
        <path d="M24 43 L24 47" strokeWidth={strokeWidth * 1.6} />
        <path d="M24 42 L24 6.5" strokeWidth={strokeWidth * 0.95} />
        <path d="M24 31.5 L32.6 30.6 M24 20.5 L31 20.2" strokeWidth={strokeWidth * 0.7} />
        <path
          d="M15.4 16.5 L19.6 14.8 L23.8 16.6 L26.4 20.4 L22 22.2 L23.6 26.4 L18.2 27.8 L19.4 32 L13.8 33 L15.6 29 L12 25 L15.6 21 Z"
          fill={color}
          fillOpacity={0.28}
          strokeWidth={strokeWidth * 0.9}
        />
        <path
          d="M16.6 35.2 L21.6 34.2 L20.4 28.6 L26 27 L24.4 21.4 L28.8 19.2 L25 13.4 L21 11.5"
          strokeWidth={strokeWidth * 0.75}
        />
        <path
          d="M27.6 34 L30.6 33.2 L31.4 35.8 L28.4 36.6 Z"
          fill={color}
          fillOpacity={0.22}
          strokeWidth={strokeWidth * 0.75}
        />
      </g>
    </svg>
  );
}

/** Manchas foliares (lesiones definidas en hoja). */
export function IconoManchas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M24 3.5 C33.5 10 40 20 40 28.5 C40 37.5 32.8 44.5 24 45 C15.2 44.5 8 37.5 8 28.5 C8 20 14.5 10 24 3.5 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M24 6 L24 44" strokeWidth={strokeWidth * 1.05} />
      <path
        d="M24 14 C20.5 15.5 17.5 17.5 15 20 M24 14 C27.5 15.5 30.5 17.5 33 20 M24 27 C20.5 28.5 17 31 14.5 34 M24 27 C27.5 28.5 31 31 33.5 34"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d={anillo(16.5, 19.5, 5.6, 2.7)}
        fillRule="evenodd"
        fill={color}
        fillOpacity={0.34}
        strokeWidth={strokeWidth * 1.15}
      />
      <circle cx="16.5" cy="19.5" r="1.1" fill={color} stroke="none" />
      <path
        d={anillo(31.5, 25, 4.8, 2.3)}
        fillRule="evenodd"
        fill={color}
        fillOpacity={0.34}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d={anillo(21, 35, 5.2, 2.5)}
        fillRule="evenodd"
        fill={color}
        fillOpacity={0.34}
        strokeWidth={strokeWidth * 1.15}
      />
      <circle cx="21" cy="35" r="1.05" fill={color} stroke="none" />
    </svg>
  );
}

/** Roya (pústulas anaranjadas). */
export function IconoRoya({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
      <path d="M4.5 7 L13 15" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M13 15 C22.5 15.5 32 21.5 38 29.5 C42 35 43.5 40.5 43.5 45.5 C38 44.5 32 41.5 26.5 36.5 C19.5 30.5 14.5 23 13 15 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M14 16 C21.5 23.5 31.5 33.5 42.4 44.8" strokeWidth={strokeWidth * 0.95} />
      <path d="M25 23 C28.5 22.2 31.5 22 34 22.4 M32 32 C34.8 31.2 37.2 31 39.4 31.4" strokeWidth={strokeWidth * 0.7} />
      <path
        d="M20 25.5 C24.5 25 27.5 28 27.5 32.5 C27.5 37 24 39.5 20.2 38.4 C16.6 37.3 15.2 33.6 16.4 29.6 C17.2 27 18.4 25.6 20 25.5 Z"
        fill={color}
        fillOpacity={0.22}
        strokeWidth={strokeWidth * 0.8}
      />
      <circle cx="19" cy="29.5" r="2.1" fill={color} stroke="none" />
      <circle cx="23.5" cy="30.5" r="2.2" fill={color} stroke="none" />
      <circle cx="19.5" cy="34" r="2" fill={color} stroke="none" />
      <circle cx="23.8" cy="34.8" r="2.1" fill={color} stroke="none" />
      <circle cx="21.5" cy="26.5" r="1.6" fill={color} stroke="none" />
      <circle cx="17" cy="21.5" r="1.5" fill={color} stroke="none" />
      <circle cx="20" cy="22.5" r="1.3" fill={color} stroke="none" />
      <circle cx="29" cy="30" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}

/** Mildeo velloso (oomiceto foliar). */
export function IconoMildeoVelloso({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M24 33 C21.4 36 17.6 38.4 13.6 38 C9.4 37.6 6 35.2 6.5 32 C8 29.2 10.8 26 13.5 23.5 C11.6 20.6 9.8 16 10 12.6 C10.2 9.4 12.6 8.6 14.8 10.6 C16.4 12 18.2 13.2 19.5 14.5 C20 11 21.6 6.8 24 4 C26.4 6.8 28 11 28.5 14.5 C29.8 13.2 31.6 12 33.2 10.6 C35.4 8.6 37.8 9.4 38 12.6 C38.2 16 36.4 20.6 34.5 23.5 C37.2 26 40 29.2 41.5 32 C42 35.2 38.6 37.6 34.4 38 C30.4 38.4 26.6 36 24 33 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M24 33 L24 43.6" strokeWidth={strokeWidth * 1.6} />
      <path
        d="M24 33 L9.6 30.4 M24 33 L13.4 15.4 M24 33 L24 7.5 M24 33 L34.6 15.4 M24 33 L38.4 30.4"
        strokeWidth={strokeWidth * 0.85}
      />
      <path d="M20.3 26.8 L24 25.3 M17.6 22.4 L24 17.2 M31.2 27 L35.8 26.6" strokeWidth={strokeWidth * 0.7} />
      <path
        d="M20.3 26.8 L24 25.3 L24 17.2 L17.6 22.4 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 0.9}
        strokeLinejoin="miter"
      />
      <path
        d="M30.6 31.8 L34.8 31 L35.8 26.6 L31.2 27 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 0.9}
        strokeLinejoin="miter"
      />
      <path
        d="M17 31.7 L13 31 L12.4 27.2 L16.4 27.6 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 0.9}
        strokeLinejoin="miter"
      />
      <path
        d="M24.6 13.4 L26.6 14 L26 10.4 L24.2 10.8 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 0.9}
        strokeLinejoin="miter"
      />
      <path
        d="M20.8 27 C20.5 28.2 21 28.8 20.4 30 M22.2 26.5 C21.9 27.7 22.4 28.3 21.8 29.5 M23.6 26 C23.3 27.2 23.8 27.8 23.2 29 M31.6 31.8 C31.4 32.8 31.9 33.3 31.4 34.3 M33.4 31.5 C33.2 32.5 33.7 33 33.2 34"
        strokeWidth={strokeWidth * 0.8}
      />
    </svg>
  );
}

/** Síntomas foliares generales, por id de objetivo. */
export const ICONOS_ENFERMEDADES_FOLIARES = {
  'hongos-foliares': IconoHongosFoliares,
  manchas: IconoManchas,
  roya: IconoRoya,
  'mildeo-velloso': IconoMildeoVelloso,
};
/** Sigatoka (banano y plátano). */
export function IconoSigatoka({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M4 38 C12.3 21.6 25.7 12.6 44 11 C35.2 26.6 21.8 35.6 4 38 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M4.6 37.6 L2 40.8" strokeWidth={strokeWidth * 1.6} />
      <path d="M5 37.4 C17 30 30 21 43.4 11.6" strokeWidth={strokeWidth * 0.95} />
      <path
        d="M11.8 31.9 L10.3 27.6 M16.6 28.7 L14.8 23.6 M21.4 25.4 L19.6 20.2 M26.2 22.2 L24.5 17.3 M31 18.9 L29.5 14.7 M35.8 15.7 L34.7 12.6 M10.5 34.5 L13.5 37.1 M15.3 31.2 L19.3 34.6 M20.1 28 L24.4 31.6 M24.9 24.7 L29.1 28.3 M29.7 21.5 L33.4 24.7 M34.5 18.3 L37.4 20.8"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M14.1 30.2 L13 27 M18.9 26.8 L17.6 23 M18 29.8 L21 32.4 M22.8 26.6 L25.5 28.9"
        strokeWidth={strokeWidth * 1.3}
      />
      <path d="M23.7 23.6 L22.3 19.6 M27.5 23.2 L30.6 25.9" strokeWidth={strokeWidth * 2.4} />
      <g transform="rotate(-19 28.6 19.9)">
        <ellipse cx="28.6" cy="19.9" rx="3.2" ry="4.8" fill={color} fillOpacity={0.1} stroke="none" />
        <path
          d="M26.2 19.9 a2.4 4.1 0 1 0 4.8 0 a2.4 4.1 0 1 0 -4.8 0 Z M27.6 19.9 a1 2 0 1 0 2 0 a1 2 0 1 0 -2 0 Z"
          fillRule="evenodd"
          fill={color}
          fillOpacity={0.3}
          strokeWidth={strokeWidth * 0.9}
        />
      </g>
      <g transform="rotate(-49 33.7 20.8)">
        <path
          d="M31.6 20.8 a2.1 3.1 0 1 0 4.2 0 a2.1 3.1 0 1 0 -4.2 0 Z M32.85 20.8 a0.85 1.4 0 1 0 1.7 0 a0.85 1.4 0 1 0 -1.7 0 Z"
          fillRule="evenodd"
          fill={color}
          fillOpacity={0.3}
          strokeWidth={strokeWidth * 0.9}
        />
      </g>
      <ellipse
        cx="32.9"
        cy="15.8"
        rx="1.9"
        ry="2.3"
        transform="rotate(-19 32.9 15.8)"
        fill={color}
        fillOpacity={0.26}
        strokeWidth={strokeWidth * 0.9}
      />
    </svg>
  );
}

/** Oomicetos (Phytophthora, Pythium). */
export function IconoOomicetos({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M3 12.6 C7 10.2 10.4 14.8 14.4 12.6 C18.4 10.4 21.8 14.8 25.8 12.6 C29.8 10.4 33.2 14.8 37.2 12.6 C40 11.1 42.6 12.2 45 13.4 L45 19.4 L3 19.4 Z"
        fill={color}
        fillOpacity={0.14}
        stroke="none"
      />
      <path
        d="M3 12.6 C7 10.2 10.4 14.8 14.4 12.6 C18.4 10.4 21.8 14.8 25.8 12.6 C29.8 10.4 33.2 14.8 37.2 12.6 C40 11.1 42.6 12.2 45 13.4"
        strokeWidth={strokeWidth * 1.4}
      />
      <path d="M3 19.4 L45 19.4" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M5.4 23.6 L8.6 23.6 M39.4 22.4 L42.6 22.4 M6.2 36.4 L9.4 36.4 M39 37.6 L42.2 37.6"
        strokeWidth={strokeWidth * 0.8}
      />
      <path
        d="M21.5 19.6 C22 15.6 22.6 10.6 22.9 7.4 C23.2 5.6 24.8 5.6 25.1 7.4 C25.4 10.6 26 15.6 26.5 19.6 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.5}
      />
      <path
        d="M21.5 19.6 C21.8 17.4 22.05 15.8 22.3 14.4 C23.4 15.5 24.7 14 25.7 14.6 C25.95 16 26.2 17.6 26.5 19.6 Z"
        fill={color}
        fillOpacity={0.3}
        strokeWidth={strokeWidth * 0.9}
      />
      <path
        d="M21.6 19.6 C21.8 21.8 22 23.8 22.2 25.6 L25.8 25.6 C26 23.8 26.2 21.8 26.4 19.6 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.4}
      />
      <path
        d="M21.9 21.6 C19.4 22.2 17.2 23.6 15.6 25.8 M26.2 22.4 C28.8 23 31 24.4 32.6 26.6 M21.7 24 C19.7 25.2 18.3 26.8 17.5 28.8 M26 24.2 C27.6 25.2 28.8 26.6 29.6 28.4"
        strokeWidth={strokeWidth * 0.9}
      />
      <path
        d="M22.2 25.6 C23.3 26.7 24.7 24.7 25.8 25.6 C25.6 28.4 25.3 31.2 24.9 33.6 L23.2 33.6 C22.8 31.2 22.5 28.4 22.2 25.6 Z"
        fill={color}
        fillOpacity={0.28}
        strokeWidth={strokeWidth * 1.1}
      />
      <path
        d="M25.4 28 C27.8 29 29.6 30.8 30.6 33.4 M22.7 30.6 C20.4 31.8 18.6 33.6 17.6 36.2"
        strokeWidth={strokeWidth * 1.5}
      />
      <path
        d="M22.6 32.8 C20.5 35.2 20.5 38.4 22.8 40.4 C23 38 22.4 35.2 23.7 33.2 Z"
        fill={color}
        fillOpacity={0.2}
        strokeWidth={strokeWidth * 0.85}
      />
      <path d="M24.1 33.4 C24.1 36.6 23.9 39.4 23.5 42.2" strokeWidth={strokeWidth * 0.75} />
      <path
        d="M11.8 24.4 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M10.4 29.2 a0.9 0.9 0 1 0 1.8 0 a0.9 0.9 0 1 0 -1.8 0 Z M33.8 28.4 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z M35.9 33 a0.85 0.85 0 1 0 1.7 0 a0.85 0.85 0 1 0 -1.7 0 Z M13.6 33.4 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z"
        fill={color}
        stroke="none"
      />
    </svg>
  );
}

/** Raíz y suelo (pudriciones, damping off). */
export function IconoRaizSuelo({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
      <path d="M3 34 L45 34" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M5.5 39 L8.5 39 M28 38 L31 38 M34.5 42 L37.5 42 M40 38.5 L43 38.5 M11 43 L14 43"
        strokeWidth={strokeWidth * 0.8}
      />
      <path d="M9 34 L9 27.5" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M9 27.5 C7.4 25.4 5.2 24.8 3.8 25.8 C5 28 7.4 28.7 9 27.5 Z M9 27.5 C10.6 25.4 12.8 24.8 14.2 25.8 C13 28 10.6 28.7 9 27.5 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.1}
      />
      <path d="M22 34 C22 37 21.8 39.5 21.5 42.5" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M21.9 36.5 C20.4 37.4 19.3 38.6 18.6 40.2 M21.75 39 C23.3 39.8 24.4 40.9 25 42.4"
        strokeWidth={strokeWidth * 0.85}
      />
      <path
        d="M20.4 34.6 C20.7 36.2 21 37.6 21.2 38.8 C22.5 38.9 23.2 38.9 23.9 38.8 C23.6 37.4 23.2 36 22.8 34.6 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M20.9 33.4 C21.6 30.4 23 26.6 25.2 22.8 C26.9 19.9 28.8 17.5 30.6 15.8 C31.7 16.8 32.2 17.7 31.9 18.6 C30 20.4 28.2 22.7 26.8 25.2 C25 28.4 23.8 31 23.3 33.4 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.4}
      />
      <path
        d="M20.7 32 C21.4 32.5 22.6 32.5 23.5 32 C23.4 33 23.3 33.6 23.3 34.3 C23.4 35.2 23.6 36.2 23.9 37.2 C22.9 36.7 21.7 36.7 20.9 37.2 C20.6 36.2 20.4 35.2 20.35 34.3 C20.35 33.6 20.5 33 20.7 32 Z"
        fill={color}
        fillOpacity={0.32}
        strokeWidth={strokeWidth * 0.9}
      />
      <path
        d="M31.2 16.2 C33.6 13.4 37.2 12.8 39.8 14.6 C37.8 17.8 34 18.4 31.2 16.2 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.3}
      />
      <path
        d="M30.9 15.8 C30.2 12.2 32 8.8 35.4 7.8 C36.2 11.4 34.4 14.8 30.9 15.8 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.3}
      />
    </svg>
  );
}

/** Botrytis y pudriciones (moho gris en flor y fruto). */
export function IconoBotrytis({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M19 19.8 C25.6 19.8 29.8 24.6 29.6 30.4 C29.4 36.8 24.8 41.8 19 42.2 C13.2 41.8 8.6 36.8 8.4 30.4 C8.2 24.6 12.4 19.8 19 19.8 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path
        d="M12.7 26 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z M15.4 29.5 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z M12 32.5 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z M14.6 36 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z M17.7 32.8 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z"
        fill={color}
        stroke="none"
      />
      <path d="M19 20 L19 13.4" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M19 19.8 C16.2 19.6 13.6 18.2 12.2 15.8 C15.2 15.2 18.2 16.8 19 19.8 Z M19 19.8 C21.8 19.6 24.4 18.2 25.8 15.8 C22.8 15.2 19.8 16.8 19 19.8 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M25.4 22.8 C28.2 24.8 29.2 28.2 29 31.2 C28.8 35.6 25.4 40 21.8 41.2 C20.2 38.4 20 34 21.2 30.2 C22.2 26.8 23.6 23.8 25.4 22.8 Z"
        fill={color}
        fillOpacity={0.26}
        strokeWidth={strokeWidth * 0.95}
      />
      <path
        d="M26.4 25.8 C27.6 28.6 27.2 32.8 25.4 36 C24.6 37.4 23.6 38.6 22.6 39.4"
        strokeWidth={strokeWidth * 0.7}
      />
      <circle cx="25.6" cy="24.6" r="1.4" fill={color} stroke="none" />
      <path
        d="M27.6 22 C27.2 18.8 30.4 16.6 32.8 18.2 C34.8 15.8 38.4 17 38.6 19.8 C41.4 20.4 41.8 24 39.4 25.6 C40.4 28.4 37.6 30.8 35 29.6 C33.4 31.8 29.8 31.4 29 28.8 C26.6 28.4 25.8 24.8 27.6 22 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 0.85}
      />
      <path
        d="M30.4 17.8 C29.4 15 28.4 12.6 27.6 10.6 M35.8 17.2 C36.2 14.6 36.6 12 37 9.8 M39.6 21.6 C41.2 19.6 42.4 17.6 43.4 15.6 M35.2 30.2 C36.4 31.9 37.6 33.7 38.6 35.4"
        strokeWidth={strokeWidth * 0.85}
      />
      <path
        d="M27.6 10.6 L24.6 8.2 M27.6 10.6 L29.8 7.8 M37 9.8 L34.2 7.2 M37 9.8 L40.2 7.8 M43.4 15.6 L41.6 12.2 M43.4 15.6 L45.8 13.4 M38.6 35.4 L36.6 38.4 M38.6 35.4 L41.6 37.4"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M22.8 7.7 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M29.2 7.3 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M32.4 6.7 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M39.6 7.3 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M39.9 11.5 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z M45.1 13 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z M34.85 39.2 a1.15 1.15 0 1 0 2.3 0 a1.15 1.15 0 1 0 -2.3 0 Z M41.05 37.7 a1.15 1.15 0 1 0 2.3 0 a1.15 1.15 0 1 0 -2.3 0 Z"
        fill={color}
        stroke="none"
      />
    </svg>
  );
}

/** Enfermedades con cuadro propio, por id de objetivo. */
export const ICONOS_ENFERMEDADES_OTRAS = {
  sigatoka: IconoSigatoka,
  oomicetos: IconoOomicetos,
  'raiz-suelo': IconoRaizSuelo,
  botrytis: IconoBotrytis,
};

