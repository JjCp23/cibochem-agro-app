import React from 'react';
import { Bug, Sprout, Leaf, Droplets, Gauge } from 'lucide-react';

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

export default ICONO_CATEGORIA;
