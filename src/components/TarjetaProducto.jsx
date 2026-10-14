import React from 'react';
import { Check, AlertTriangle, Bug, Star, ChevronRight } from 'lucide-react';
import { COLORES, COLOR_CATEGORIA, FONDO_CATEGORIA } from '../data/taxonomia.js';
import { FAVORITOS, useAlmacen } from '../estado/memoria.js';
import { Etiqueta, SelloGrupo } from './ui/Etiqueta.jsx';
import { Hexagono } from './ui/Superficie.jsx';
import { ICONO_CATEGORIA } from './ui/Iconos.jsx';

/**
 * Tarjeta de producto. Se usa en resultados, catálogo y rotación, así que
 * muestra razones y alertas solo cuando el motor de búsqueda las entrega.
 */
export function TarjetaProducto({ producto, onAbrir, orden }) {
  const [favoritos] = useAlmacen(FAVORITOS);
  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const fondo = FONDO_CATEGORIA[producto.categoria] || COLORES.azulClaro;
  const Icono = ICONO_CATEGORIA[producto.categoria] || Bug;
  const esFavorito = favoritos.includes(producto.id);

  return (
    <button
      onClick={() => onAbrir(producto)}
      className="cc-presionable flex w-full items-stretch overflow-hidden rounded-2xl bg-white text-left"
      style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.09)' }}
    >
      {/* Panel de color con el hexágono de la línea */}
      <span
        className="relative flex w-[68px] shrink-0 flex-col items-center justify-center gap-1 py-4"
        style={{ backgroundColor: fondo }}
      >
        <Hexagono icono={Icono} color={color} tamano={40} />
        {orden != null && (
          <span className="cc-num font-mono text-[10px] font-bold" style={{ color }}>
            {String(orden).padStart(2, '0')}
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1 px-4 py-3.5">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-bold leading-tight" style={{ color: COLORES.tinta }}>
            {producto.nombre}
          </span>
          {esFavorito && (
            <Star size={14} className="cc-pop shrink-0" fill="#F5A524" color="#F5A524" aria-label="Favorito" />
          )}
          {producto.estado !== 'Disponible' && (
            <Etiqueta
              texto={producto.estado}
              color={producto.estado === 'Nuevo' ? COLORES.verde : COLORES.naranja}
            />
          )}
        </span>

        <span className="mt-0.5 block text-[13px]" style={{ color: COLORES.textoSuave }}>
          {producto.ia}
        </span>

        <span className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
          <Etiqueta texto={producto.movimiento} color={COLORES.gris} />
        </span>

        {producto.razones?.length > 0 && (
          <span className="mt-2.5 block space-y-1">
            {producto.razones.slice(0, 3).map((r) => (
              <span key={r} className="flex items-start gap-1.5 text-xs" style={{ color: COLORES.verde }}>
                <Check size={13} className="mt-0.5 shrink-0" />
                <span>{r}</span>
              </span>
            ))}
          </span>
        )}

        {producto.alertas?.length > 0 && (
          <span className="mt-2 block space-y-1">
            {producto.alertas.map((a) => (
              <span key={a} className="flex items-start gap-1.5 text-xs" style={{ color: '#C2410C' }}>
                <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                <span>{a}</span>
              </span>
            ))}
          </span>
        )}
      </span>

      <span className="flex shrink-0 items-center pr-3">
        <ChevronRight size={18} style={{ color: COLORES.borde }} />
      </span>
    </button>
  );
}

export default TarjetaProducto;
