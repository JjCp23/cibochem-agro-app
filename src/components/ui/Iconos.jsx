import React, { useState } from 'react';
import { Bug, Sprout, Leaf, Droplets, Gauge } from 'lucide-react';
import { ICONO_ILUSTRADO } from '../../data/iconosIlustrados.js';
import { COLORES } from '../../data/taxonomia.js';
import { ICONOS_INSECTOS } from './iconos/IconosInsectos.jsx';
import { ICONOS_MALEZAS } from './iconos/IconosMalezas.jsx';
import { ICONOS_ENFERMEDADES_FOLIARES, ICONOS_ENFERMEDADES_OTRAS } from './iconos/IconosEnfermedades.jsx';

/**
 * Dibujos propios de cada objetivo del diagnóstico (plaga, maleza o
 * enfermedad), hechos para la app: dicen más del problema que un emoji
 * genérico (los oomicetos en la raíz, la maleza quemada de "todo lo verde").
 * Tienen prioridad sobre el ícono ilustrado del mismo concepto.
 */
const DIBUJO_DE_OBJETIVO = {
  ...ICONOS_INSECTOS,
  ...ICONOS_MALEZAS,
  ...ICONOS_ENFERMEDADES_FOLIARES,
  ...ICONOS_ENFERMEDADES_OTRAS,
};

/** Icono de cada línea del portafolio. Uno solo para toda la app. */
export const ICONO_CATEGORIA = {
  Insecticida: Bug,
  Herbicida: Sprout,
  Fungicida: Leaf,
  Bioestimulante: Droplets,
  Regulador: Gauge,
};

/** Icono de cada rama del diagnóstico, alineado con su línea. */
export const ICONO_RAMA = {
  insectos: Bug,
  malezas: Sprout,
  enfermedades: Leaf,
  nutricion: Droplets,
};

/**
 * Ícono ilustrado de un concepto (ver data/iconosIlustrados.js). Si la imagen no carga —por
 * ejemplo en el artefacto de un solo archivo, que no lleva la carpeta de
 * íconos— muestra el ícono plano de respaldo, así nunca queda un hueco.
 */
export function IconoIlustrado({ nombre, tamano = 40, respaldo: Respaldo, color, titulo, className = '' }) {
  const archivo = ICONO_ILUSTRADO[nombre] || null;
  const [falla, setFalla] = useState(!archivo);
  const Dibujo = DIBUJO_DE_OBJETIVO[nombre];
  if (Dibujo) {
    return (
      <Dibujo
        size={tamano}
        color={color || COLORES.azul}
        strokeWidth={1.8}
        role={titulo ? 'img' : undefined}
        aria-label={titulo}
        aria-hidden={titulo ? undefined : 'true'}
        className={`cc-icono-ilustrado ${className}`}
      />
    );
  }
  if (falla) {
    return Respaldo ? <Respaldo size={Math.round(tamano * 0.62)} color={color} strokeWidth={1.9} /> : null;
  }
  return (
    <img
      src={`./iconos/${archivo}.svg`}
      width={tamano}
      height={tamano}
      alt={titulo || ''}
      aria-hidden={titulo ? undefined : 'true'}
      loading="lazy"
      decoding="async"
      draggable="false"
      onError={() => setFalla(true)}
      className={`cc-icono-ilustrado ${className}`}
      style={{ width: tamano, height: tamano, objectFit: 'contain' }}
    />
  );
}

export default ICONO_CATEGORIA;
