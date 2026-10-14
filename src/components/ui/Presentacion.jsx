import React, { useState } from 'react';
import { Bug } from 'lucide-react';
import { COLORES, COLOR_CATEGORIA } from '../../data/taxonomia.js';
import { iconoDeProducto } from '../../data/iconosIlustrados.js';
import { fotoDeProducto } from '../../data/fotosProductos.js';
import { describirEnvase } from '../../motores/aplicacion.js';
import { Hexagono } from './Superficie.jsx';
import { ICONO_CATEGORIA } from './Iconos.jsx';

/** Cómo se le dice a cada envase en el mostrador. */
export const NOMBRE_ENVASE = {
  sobre: 'Sobre',
  bolsa: 'Bolsa',
  saco: 'Saco',
  frasco: 'Frasco',
  botella: 'Botella',
  garrafa: 'Garrafa',
  bidon: 'Bidón',
  caja: 'Caja',
};

/*
 * Envases dibujados en plano sobre una misma caja de 48 × 64 con la base en
 * y = 62: puestos en fila quedan alineados abajo y el tamaño se compara solo.
 * Cuerpo blanco, contorno y tapa del color de la línea, franja de etiqueta.
 */
const FORMAS_ENVASE = {
  sobre: {
    cuerpo: 'M14 38 l2.5 -2 l2.5 2 l2.5 -2 l2.5 2 l2.5 -2 l2.5 2 l2.5 -2 l2.5 2 V60 Q34 62 32 62 H16 Q14 62 14 60 Z',
    etiqueta: [16, 46, 16, 8],
  },
  bolsa: {
    cuerpo: 'M12 30 H36 V55 Q36 62 29 62 H19 Q12 62 12 55 Z',
    detalle: 'M12 35 H36',
    etiqueta: [15, 42, 18, 10],
  },
  saco: {
    cuerpo: 'M9 26 Q24 22 39 26 L41 58 Q24 64 7 58 Z',
    tapa: 'M18 25 L20 18 H28 L30 25 Z',
    etiqueta: [12, 36, 24, 13],
  },
  frasco: {
    cuerpo: 'M15 41 Q15 37 19 37 H29 Q33 37 33 41 V60 Q33 62 31 62 H17 Q15 62 15 60 Z',
    detalle: 'M20 33 H28 V37 H20 Z',
    tapa: 'M19 28 H29 V33 H19 Z',
    etiqueta: [17, 45, 14, 9],
  },
  botella: {
    cuerpo: 'M13 34 Q13 28 19 26 H29 Q35 28 35 34 V59 Q35 62 32 62 H16 Q13 62 13 59 Z',
    detalle: 'M20 21 H28 V26 H20 Z',
    tapa: 'M19 14 H29 V21 H19 Z',
    etiqueta: [15, 38, 18, 13],
  },
  garrafa: {
    cuerpo: 'M8 31 Q8 23 16 21 H32 Q40 23 40 31 V59 Q40 62 37 62 H11 Q8 62 8 59 Z',
    asa: 'M24 21 C24 11 37 11 37 24',
    tapa: 'M11 14 H20 V21 H11 Z',
    etiqueta: [11, 36, 26, 14],
  },
  bidon: {
    cuerpo: 'M6 17 H42 Q45 17 45 20 V59 Q45 62 42 62 H6 Q3 62 3 59 V20 Q3 17 6 17 Z',
    asa: 'M20 17 V9 H38 V17',
    tapa: 'M6 9 H15 V17 H6 Z',
    etiqueta: [7, 30, 34, 17],
  },
  caja: {
    cuerpo: 'M8 32 H40 V62 H8 Z',
    detalle: 'M8 32 L13 25 H35 L40 32',
    etiqueta: [11, 41, 26, 11],
  },
};

/** Un envase dibujado. `alto` en píxeles; el ancho sale de la proporción 3:4. */
export function EnvaseDibujo({ tipo, color = COLORES.azul, alto = 64, titulo }) {
  const forma = FORMAS_ENVASE[tipo] || FORMAS_ENVASE.caja;
  const [x, y, w, h] = forma.etiqueta;
  return (
    <svg
      viewBox="0 0 48 64"
      width={Math.round((alto * 48) / 64)}
      height={alto}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : 'true'}
      style={{ overflow: 'visible' }}
    >
      {forma.asa && <path d={forma.asa} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />}
      {forma.tapa && <path d={forma.tapa} fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />}
      <path d={forma.cuerpo} fill="#fff" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {forma.detalle && (
        <path d={forma.detalle} fill="#fff" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      )}
      <rect x={x} y={y} width={w} height={h} rx="1.5" fill={color} opacity=".85" />
      <rect x={x + 2} y={y + h / 2 - 0.9} width={w * 0.55} height="1.8" rx=".9" fill="#fff" opacity=".9" />
    </svg>
  );
}

/**
 * Las presentaciones comerciales del producto dibujadas a escala relativa,
 * de la más pequeña a la más grande, con su tamaño debajo.
 */
export function PresentacionesProducto({ producto, color, alto = 62 }) {
  const tono = color || COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const envases = (producto.presentaciones || []).map(describirEnvase);
  if (envases.length === 0) return null;
  return (
    <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
      {envases.map((e) => (
        <div key={e.etiqueta} className="cc-pop flex flex-col items-center gap-1">
          <EnvaseDibujo tipo={e.tipo} color={tono} alto={alto} titulo={`${NOMBRE_ENVASE[e.tipo]} de ${e.etiqueta}`} />
          <span className="font-mono text-xs font-bold leading-none" style={{ color: COLORES.tinta }}>
            {e.etiqueta}
          </span>
          <span className="text-[0.625rem] leading-none" style={{ color: COLORES.textoSuave }}>
            {NOMBRE_ENVASE[e.tipo]}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Foto real del envase. Si no carga, no deja un hueco: avisa con `onFalla`. */
export function FotoProducto({ producto, alto = 160, className = '', onFalla }) {
  const [fallo, setFallo] = useState(false);
  const ruta = fotoDeProducto(producto);
  if (!ruta || fallo) return null;
  return (
    <img
      src={ruta}
      alt={`Envase de ${producto.nombre}`}
      loading="lazy"
      decoding="async"
      draggable="false"
      className={`cc-entrada block object-contain ${className}`}
      style={{ height: alto, maxWidth: '100%' }}
      onError={() => {
        setFallo(true);
        if (onFalla) onFalla();
      }}
    />
  );
}

/**
 * Miniatura para listas: la foto del envase cuando existe y, si no, la medalla
 * de la línea con su ícono. Mismo tamaño en los dos casos para no mover filas.
 */
export function MiniaturaProducto({ producto, color, tamano = 46 }) {
  const [sinFoto, setSinFoto] = useState(false);
  const tono = color || COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const ruta = fotoDeProducto(producto);
  if (ruta && !sinFoto) {
    return (
      <span
        className="cc-medalla inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white"
        style={{ width: tamano, height: tamano, boxShadow: `0 0 0 1.5px ${tono}33, 0 3px 6px ${tono}22` }}
      >
        <img
          src={ruta}
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
          className="h-full w-full object-contain p-0.5"
          onError={() => setSinFoto(true)}
        />
      </span>
    );
  }
  return (
    <Hexagono
      icono={ICONO_CATEGORIA[producto.categoria] || Bug}
      imagen={iconoDeProducto(producto)}
      color={tono}
      tamano={tamano}
    />
  );
}

/** Envase principal del producto (el más vendido suele ser el primero de 1 L o 1 Kg). */
export function envasePrincipal(producto) {
  const envases = (producto.presentaciones || []).map(describirEnvase);
  return (
    envases.find((e) => e.mili === 1000) ||
    envases.find((e) => e.tipo !== 'caja') ||
    envases[0] || { etiqueta: '', tipo: 'caja' }
  );
}
