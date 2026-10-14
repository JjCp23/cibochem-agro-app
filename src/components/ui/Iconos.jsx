import React, { useState } from 'react';
import { Bug, Sprout, Leaf, Droplets, Gauge } from 'lucide-react';
import { ICONO_3D } from '../../data/iconos3d.js';

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
 * Ícono 3D de un concepto (ver data/iconos3d.js). Si la imagen no carga —por
 * ejemplo en el artefacto de un solo archivo, que no lleva la carpeta de
 * íconos— muestra el ícono plano de respaldo, así nunca queda un hueco.
 */
export function Icono3D({ nombre, tamano = 40, respaldo: Respaldo, color, titulo, className = '' }) {
  const archivo = ICONO_3D[nombre] || null;
  const [falla, setFalla] = useState(!archivo);
  if (falla) {
    return Respaldo ? <Respaldo size={Math.round(tamano * 0.62)} color={color} strokeWidth={1.9} /> : null;
  }
  return (
    <img
      src={`./iconos/${archivo}.webp`}
      width={tamano}
      height={tamano}
      alt={titulo || ''}
      aria-hidden={titulo ? undefined : 'true'}
      loading="lazy"
      decoding="async"
      draggable="false"
      onError={() => setFalla(true)}
      className={`cc-icono3d ${className}`}
      style={{ width: tamano, height: tamano, objectFit: 'contain' }}
    />
  );
}

export default ICONO_CATEGORIA;
