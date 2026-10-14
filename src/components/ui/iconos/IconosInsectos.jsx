import React from 'react';

/**
 * Íconos de las plagas del diagnóstico: uno por objetivo de la rama de insectos.
 *
 * Misma interfaz que los íconos de lucide-react (size, color, strokeWidth,
 * className), así el diagnóstico los pinta igual que cualquier otro ícono.
 * Se dibujan en una retícula de 48 × 48 con el trazo en el color de la rama y
 * rellenos translúcidos del mismo color, para que se lean bien a 30 px dentro
 * de los botones de opción.
 */

/** Chupadores (mosca blanca, áfidos, escamas). */
export function IconoChupadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M2 34 C12 28 24 28.5 33 34 C39 37.7 43 42 45.5 46 L8 46 C6 42 3.5 38 2 34 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M3.5 35.5 C13 37.5 22 41 28 46" strokeWidth={strokeWidth * 0.75} />
      <path
        d="M11 23.5 C10.5 20 12.5 16.5 16 14.5 C21 11.6 26.5 13 27.8 17.5 C29 21.8 26 25.8 21 26.4 C16 27 11.6 26 11 23.5 Z"
        fill={color}
        fillOpacity={0.18}
        strokeWidth={strokeWidth * 1.8}
      />
      <path d="M24.6 14.2 L25.4 8.6 M27.6 16.5 L29.6 11.4" strokeWidth={strokeWidth * 1.05} />
      <path d="M15 26.4 L13.6 30 M20 26.9 L20 30.4 M24.3 25.6 L26.3 29.3" strokeWidth={strokeWidth * 0.85} />
      <path d="M11.3 24.8 C10.6 27 10.4 29.2 10.8 32.6" strokeWidth={strokeWidth * 0.9} />
      <circle cx="12.9" cy="23.2" r="1" fill={color} stroke="none" />
      <path
        d="M38 6.5 C42.5 9 45.5 14.5 45 19.5 C42.5 22.5 38 23.2 38 23.2 C38 23.2 33.5 22.5 31 19.5 C30.5 14.5 33.5 9 38 6.5 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M38 8.5 L38 22.8" strokeWidth={strokeWidth * 0.8} />
      <path d="M36.9 5.6 L34 2.8 M39.1 5.6 L42 2.8" strokeWidth={strokeWidth * 0.85} />
      <circle cx="38" cy="6.4" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

/** Masticadores (comedores de follaje). */
export function IconoMasticadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  const contornoHoja =
    'M23.5 44 C18 41.5 13.5 37 11 32 Q17 30.5 10 27.5 C8.8 22 10.5 13.5 16.5 8 C18.8 5.9 21 4.5 23.5 4 C29 5 33.5 9 36 14 Q27 17 36.5 20 C37 22 37.5 24 37.3 26 Q26.5 29.3 35 32.5 C33.5 36.5 29 41 23.5 44 Z';
  const agujero = 'M16 20.5 C18.5 19 21 20 21.3 22.3 C21.6 24.8 19.5 26.3 17.3 25.5 C15.3 24.8 14.5 21.7 16 20.5 Z';
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
      <path d={`${contornoHoja} ${agujero}`} fill={color} fillOpacity={0.16} fillRule="evenodd" stroke="none" />
      <path d={contornoHoja} strokeWidth={strokeWidth * 1.8} />
      <path d={agujero} strokeWidth={strokeWidth * 1.05} />
      <path d="M23.5 43 C22.9 33 22.8 18 23.5 5.5" strokeWidth={strokeWidth * 0.85} />
      <path
        d="M23.3 31 C26.8 29.4 30 27 32 24.5 M23.2 20.5 C26.5 18.8 29.8 16 31.8 13 M23.4 38 C21 36.6 18.5 34.8 16.8 32.8"
        strokeWidth={strokeWidth * 0.7}
      />
      <path d="M23.5 43.5 C23.6 45 23.7 45.8 23.8 46.5" strokeWidth={strokeWidth * 1.4} />
      <circle cx="33.4" cy="17.4" r="0.85" fill={color} stroke="none" />
      <circle cx="32.4" cy="30.1" r="0.75" fill={color} stroke="none" />
    </svg>
  );
}

/** Larvas de lepidóptero (gusanos en general). */
export function IconoLepidopteros({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
      <path d="M3 40 C13 44.5 26 45 34 43 C39 41.8 43 40.5 45.5 39" strokeWidth={strokeWidth * 1.3} />
      <path
        d="M9 24.6 C11 19.6 17 17.6 23 17.9 C28 18.1 31.5 19.9 34 22.6 L34 29.6 C31.5 32.8 28 34.4 23 34.5 C17 34.6 11 33 9 30 A2.8 2.8 0 0 1 9 24.6 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.8}
      />
      <path
        d="M14 20.2 C15.6 25 15.4 29.5 14 33.4 M19.5 18.6 C21 24 21 29 19.7 34.2 M25 18 C26.5 23.5 26.5 29 25.3 34.4 M30 19.2 C31.4 24 31.4 29 30.4 33.6"
        strokeWidth={strokeWidth * 0.75}
      />
      <path d="M15.4 34.2 L15.1 38.2 M20.9 34.5 L20.7 38.6 M26.4 34.4 L26.3 38.4" strokeWidth={strokeWidth * 1.5} />
      <path d="M13.9 39.2 L16.3 39.2 M19.4 39.6 L21.9 39.6 M25.1 39.4 L27.5 39.4" strokeWidth={strokeWidth * 0.7} />
      <path d="M30.6 34 L30.1 37.4 M33.4 33.2 L33.6 36.6" strokeWidth={strokeWidth * 0.9} />
      <circle cx="38" cy="26" r="4.6" fill={color} fillOpacity={0.26} strokeWidth={strokeWidth * 1.7} />
      <circle cx="39.4" cy="24.4" r="1" fill={color} stroke="none" />
      <path d="M41.5 28.2 L44.2 29.2" strokeWidth={strokeWidth * 0.9} />
    </svg>
  );
}

/** Cogolleros (larva protegida en el cogollo). */
export function IconoCogolleros({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M21.5 37 C15 30 9.5 22.5 3.5 16 C6 25.5 11 34 18 41.5 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 1.6}
      />
      <path
        d="M26.5 37 C33 30 38.5 22.5 44.5 16 C42 25.5 37 34 30 41.5 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 1.6}
      />
      <path
        d="M17 16 C19 27 21 36 22.5 45 L25.5 45 C27 36 29 27 31 16"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.7}
      />
      <path
        d="M20 19.5 C21.5 28.5 22.7 36.5 23.6 45 M28 19.5 C26.5 28.5 25.3 36.5 24.4 45"
        strokeWidth={strokeWidth * 0.8}
      />
      <path d="M21.8 20 C21 16.5 23.3 14 25.8 15.3 C27.8 16.4 27.4 19.4 25.2 19.9" strokeWidth={strokeWidth * 1.2} />
      <circle cx="15.3" cy="35" r="1.3" strokeWidth={strokeWidth * 0.9} />
      <circle cx="12.8" cy="31" r="1.3" strokeWidth={strokeWidth * 0.9} />
      <circle cx="9.9" cy="26.3" r="1.2" strokeWidth={strokeWidth * 0.9} />
      <circle cx="23" cy="25" r="0.9" fill={color} stroke="none" />
      <circle cx="25.2" cy="28" r="0.85" fill={color} stroke="none" />
      <circle cx="22.8" cy="31" r="0.8" fill={color} stroke="none" />
      <circle cx="24.8" cy="34" r="0.75" fill={color} stroke="none" />
    </svg>
  );
}

/** Ácaros (arañita roja, blanca). */
export function IconoAcaros({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
      <path d="M3 10.5 C11 6.5 20 6 27 8.5 C34 11 40 11 45 8" strokeWidth={strokeWidth * 0.75} />
      <path d="M4 16 C12 12.5 20 12 27 14 C34 16 40 16.5 45 13.5" strokeWidth={strokeWidth * 0.75} />
      <path
        d="M11 8.2 L11.8 13.8 M20 6.6 L20.3 12.2 M28.5 8.9 L29 14.5 M37 10.9 L37.3 16.3"
        strokeWidth={strokeWidth * 0.7}
      />
      <path d="M24 14.4 C24.2 16.2 23.4 17.2 22.6 18.4" strokeWidth={strokeWidth * 0.7} />
      <path
        d="M14.5 22 L6.5 16.5 M13.2 25.5 L4.5 22.5 M13.2 30 L4.5 33 M14.8 33.5 L8 39 M29.5 22 L37.5 16.5 M30.8 25.5 L39.5 22.5 M30.8 30 L39.5 33 M29.2 33.5 L36 39"
        strokeWidth={strokeWidth * 1}
      />
      <ellipse cx="22" cy="27.5" rx="9" ry="8.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.8} />
      <circle cx="18.4" cy="26.2" r="2" fill={color} stroke="none" />
      <circle cx="25.6" cy="26.2" r="2" fill={color} stroke="none" />
    </svg>
  );
}

/** Trips (raspadores del follaje). */
export function IconoTrips({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M30.5 21.2 C24 16.8 15 14.4 7 15 C15 16.6 24 19.2 30.5 21.2 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.05}
      />
      <path
        d="M26.5 17.4 L27.3 13.4 M22 15.9 L22.5 11.8 M17 14.8 L17.2 10.7 M11.5 14.7 L11.2 10.7"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M30.5 26.8 C24 31.2 15 33.6 7 33 C15 31.4 24 28.8 30.5 26.8 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.05}
      />
      <path
        d="M26.5 30.6 L27.3 34.6 M22 32.1 L22.5 36.2 M17 33.2 L17.2 37.3 M11.5 33.3 L11.2 37.3"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M6.5 24 C10.5 20.8 16 20.3 24 20.5 C30.5 20.7 34.5 22.1 34.5 24 C34.5 25.9 30.5 27.3 24 27.5 C16 27.7 10.5 27.2 6.5 24 Z"
        fill={color}
        fillOpacity={0.18}
        strokeWidth={strokeWidth * 1.7}
      />
      <path d="M12 21.9 L12 26.3 M16.5 21 L16.5 27 M21 20.7 L21 27.3" strokeWidth={strokeWidth * 0.7} />
      <circle cx="37" cy="24" r="3.3" fill={color} fillOpacity={0.2} strokeWidth={strokeWidth * 1.5} />
      <path d="M39 21.5 L43.5 18.5 M39.5 25.6 L44 27.6" strokeWidth={strokeWidth * 0.9} />
      <circle cx="38.1" cy="22.9" r="0.9" fill={color} stroke="none" />
    </svg>
  );
}

/** Raspadores (daño superficial en hoja y fruto). */
export function IconoRaspadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
      <circle cx="22.5" cy="29" r="13.5" fill={color} fillOpacity={0.1} strokeWidth={strokeWidth * 1.8} />
      <path d="M13.5 24 C14.5 19.5 17.5 16.5 21 15.8" strokeWidth={strokeWidth * 0.7} />
      <path d="M22.5 15.5 C22.8 12 22.5 9.5 22 7" strokeWidth={strokeWidth * 1.4} />
      <path
        d="M22.4 10.5 C25.5 5.5 32 4.5 34.5 7 C33 11.5 27 13.5 22.6 11.2 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 1.3}
      />
      <path
        d="M23.5 21.5 C29 19.5 34.5 22 34.8 27.5 C35.1 33.5 30.5 38 25.5 37.5 C20.5 37 18.5 31.5 20 26.5 C20.7 24 21.8 22.1 23.5 21.5 Z"
        fill={color}
        fillOpacity={0.2}
        strokeWidth={strokeWidth * 0.95}
      />
      <path
        d="M23.5 25.5 L24.8 25.2 M27.5 23.8 L28.8 23.6 M31.5 26.5 L32.7 26.3 M22.8 29.5 L24 29.3 M26.5 28.5 L27.8 28.3 M30.5 30 L31.8 29.8 M23.5 33.5 L24.7 33.3 M27.5 32.5 L28.8 32.3 M31 34 L32.2 33.8 M25.5 36 L26.7 35.8"
        strokeWidth={strokeWidth * 0.8}
      />
      <circle cx="29" cy="26.2" r="0.7" fill={color} stroke="none" />
      <circle cx="26" cy="31.4" r="0.65" fill={color} stroke="none" />
    </svg>
  );
}

/** Minadores (galerías dentro de la hoja). */
export function IconoMinadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M24 45 C15 39.5 9 30.5 9 21.5 C9 12 15.5 4.5 24 3.5 C32.5 4.5 39 12 39 21.5 C39 30.5 33 39.5 24 45 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.8}
      />
      <path d="M24 43.5 C23.6 33 23.6 15 24 5.5" strokeWidth={strokeWidth * 0.75} />
      <path
        d="M23.9 33 C26.8 31.4 29.5 29.6 31.2 27.8 M23.9 24 C27 22 30 19.4 31.8 17 M23.9 15 C26.4 13.6 28.6 12 30 10.6"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M14.5 37.5 C19 35 19 31 15 28.3 C10.8 25.4 12.2 20.8 17 19.4 C19.8 18.6 20.8 16.6 20.5 14.5"
        strokeWidth={strokeWidth * 0.9}
      />
      <path d="M15 28.3 C10.8 25.4 12.2 20.8 17 19.4 C19.8 18.6 20.8 16.6 20.5 14.5" strokeWidth={strokeWidth * 1.6} />
      <path d="M17 19.4 C19.8 18.6 20.8 16.6 20.5 14.5" strokeWidth={strokeWidth * 2.4} />
      <path
        d="M18.3 12.8 C18.1 10 19.4 8.2 21.2 8.3 C23 8.4 24 10.2 23.7 12.8 C23.4 15.2 22.2 16.4 20.9 16.3 C19.5 16.2 18.5 15 18.3 12.8 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 1.2}
      />
      <path d="M18.7 11 L23.4 11.2 M18.6 13.3 L23.5 13.2" strokeWidth={strokeWidth * 0.7} />
    </svg>
  );
}

/** Barrenadores (perforan tallo o fruto). */
export function IconoBarrenadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M17.6 0.5 C16.6 16 16.6 32 17.1 47.5 L30.4 47.5 C30.9 32 30.9 16 29.9 0.5 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.8}
      />
      <path d="M17 15 C21 17 27 17 30.7 15 M17 34 C21 36 27 36 30.6 34" strokeWidth={strokeWidth * 1.1} />
      <path d="M24 20 C25.5 15.5 22.5 12 24.5 7.5" strokeWidth={strokeWidth * 0.75} />
      <circle cx="24" cy="24.5" r="4.6" fill={color} fillOpacity={0.3} strokeWidth={strokeWidth * 1.5} />
      <circle cx="24" cy="24.5" r="2.1" fill={color} stroke="none" />
      <path d="M21.5 28.4 L20.3 30.8 M26.5 28.4 L27.8 30.6" strokeWidth={strokeWidth * 0.8} />
      <circle cx="24.3" cy="30.6" r="0.95" fill={color} stroke="none" />
      <circle cx="26.8" cy="32.8" r="0.85" fill={color} stroke="none" />
      <circle cx="22.2" cy="33.4" r="0.9" fill={color} stroke="none" />
      <circle cx="25.3" cy="36" r="0.8" fill={color} stroke="none" />
      <circle cx="22.9" cy="38.6" r="0.85" fill={color} stroke="none" />
      <circle cx="31.4" cy="35.2" r="0.75" fill={color} stroke="none" />
    </svg>
  );
}

/** Trozadores (cortan plántulas a ras). */
export function IconoTrozadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M2 30.5 C10 28 18 28.8 26 30.2 C34 31.6 41 31 46 28.5 L46 47 L2 47 Z"
        fill={color}
        fillOpacity={0.12}
        stroke="none"
      />
      <path d="M2 30.5 C10 28 18 28.8 26 30.2 C34 31.6 41 31 46 28.5" strokeWidth={strokeWidth * 1.6} />
      <path
        d="M32.5 35.4 L34 35.2 M38.5 39.4 L40 39.2 M43 33.4 L44.4 33.2 M35 43.9 L36.4 43.7"
        strokeWidth={strokeWidth * 0.7}
      />
      <path d="M16 29 L16.2 23.5" strokeWidth={strokeWidth * 1.8} />
      <path d="M14.2 23.9 L18.2 22.6" strokeWidth={strokeWidth * 1.1} />
      <path d="M19.5 28.2 C25 26.8 30 25.4 34.5 24" strokeWidth={strokeWidth * 1.6} />
      <path d="M18.6 26.8 L20.4 29.4" strokeWidth={strokeWidth * 1} />
      <path
        d="M34.5 24 C36.5 19.6 41.5 18.2 44 20 C43.2 23.8 38.3 25.8 34.5 24 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.3}
      />
      <path
        d="M34.5 24 C36.2 27.4 40.8 29.2 43.2 27.2 C41.8 24 37.6 22.5 34.5 24 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.3}
      />
      <path
        d="M6.48 35.6 A5.8 5.8 0 1 1 6.48 41.4 L8.99 39.95 A2.9 2.9 0 1 0 8.99 37.05 Z"
        fill={color}
        fillOpacity={0.18}
        strokeWidth={strokeWidth * 1.4}
      />
      <path d="M11.5 32.9 L11.5 35.7 M16.8 38.5 L14.6 38.5 M11.5 43.9 L11.5 41.8" strokeWidth={strokeWidth * 0.75} />
      <circle cx="7.7" cy="36.3" r="1.1" fill={color} stroke="none" />
    </svg>
  );
}

/** Coleópteros (escarabajos y picudos). */
export function IconoColeopteros({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
        d="M13.6 24.5 L7.5 20.8 M12.6 31 L6 30.5 M14.2 37.8 L8.6 41.8 M34.4 24.5 L40.5 20.8 M35.4 31 L42 30.5 M33.8 37.8 L39.4 41.8"
        strokeWidth={strokeWidth * 1.1}
      />
      <path
        d="M24 17.5 C31 17.5 35.5 23.5 35.5 31 C35.5 38.8 30.5 44.5 24 44.5 C17.5 44.5 12.5 38.8 12.5 31 C12.5 23.5 17 17.5 24 17.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.8}
      />
      <path d="M24 18 L24 44.2" strokeWidth={strokeWidth * 1} />
      <path d="M19 20 C17 25.5 17 36 18.6 42 M29 20 C31 25.5 31 36 29.4 42" strokeWidth={strokeWidth * 0.7} />
      <path
        d="M19.3 17.8 C19.8 13.2 21.6 11 24 11 C26.4 11 28.2 13.2 28.7 17.8 Z"
        fill={color}
        fillOpacity={0.2}
        strokeWidth={strokeWidth * 1.4}
      />
      <path d="M24 11.2 C23.5 8 23.3 5 23.6 2.5" strokeWidth={strokeWidth * 1.7} />
      <path d="M23.75 7 L19.5 8.8 L17.6 12.4 M23.9 7 L28.2 8.8 L30.1 12.4" strokeWidth={strokeWidth * 0.9} />
      <circle cx="17.3" cy="13.2" r="1.2" fill={color} stroke="none" />
      <circle cx="30.4" cy="13.2" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}

/** Huevos y ninfas (control poblacional temprano). */
export function IconoHuevosNinfas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
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
      <path d="M3 39 C11 42 20 42.5 27.5 41 C35 39.5 41 37 45.5 33.5" strokeWidth={strokeWidth * 1.5} />
      <ellipse cx="12.5" cy="22" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="19.5" cy="22" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="9" cy="29" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="16" cy="29" rx="3" ry="3.5" fill={color} fillOpacity={0.3} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="23" cy="29" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="12.5" cy="36" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="19.5" cy="36" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <path
        d="M32.2 27.5 L28.5 25.8 M31.9 31.5 L28 32 M32.8 35 L29.6 38 M40.8 27.5 L44.5 25.8 M41.1 31.5 L45 32 M40.2 35 L43.4 38"
        strokeWidth={strokeWidth * 0.9}
      />
      <ellipse cx="36.5" cy="31" rx="4.6" ry="6" fill={color} fillOpacity={0.18} strokeWidth={strokeWidth * 1.5} />
      <path d="M32.6 32.5 L40.4 32.5 M33.4 35.4 L39.6 35.4" strokeWidth={strokeWidth * 0.65} />
      <ellipse cx="36" cy="23.5" rx="3" ry="2.6" fill={color} fillOpacity={0.18} strokeWidth={strokeWidth * 1.3} />
      <path d="M33.6 22 L30.4 19 M38.4 22 L41.6 19" strokeWidth={strokeWidth * 0.85} />
      <circle cx="34.9" cy="23" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

/** Ícono por id de objetivo de la rama de insectos (ver taxonomia.js). */
export const ICONOS_INSECTOS = {
  chupadores: IconoChupadores,
  masticadores: IconoMasticadores,
  lepidopteros: IconoLepidopteros,
  cogolleros: IconoCogolleros,
  acaros: IconoAcaros,
  trips: IconoTrips,
  raspadores: IconoRaspadores,
  minadores: IconoMinadores,
  barrenadores: IconoBarrenadores,
  trozadores: IconoTrozadores,
  coleopteros: IconoColeopteros,
  'huevos-ninfas': IconoHuevosNinfas,
};
