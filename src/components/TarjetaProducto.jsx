import React from 'react';
import { Check, AlertTriangle, ChevronRight } from 'lucide-react';
import { COLORES, COLOR_CATEGORIA } from '../data/taxonomia.js';
import { Etiqueta, SelloGrupo } from './ui/Etiqueta.jsx';

/**
 * Tarjeta de producto. Se usa en tres sitios distintos, así que muestra
 * razones y alertas solo cuando el motor de búsqueda las entrega.
 */
export function TarjetaProducto({ producto, onAbrir, orden }) {
  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;

  return (
    <button
      onClick={() => onAbrir(producto)}
      className="group w-full rounded-lg border bg-white p-4 text-left transition hover:shadow-md focus:outline-none focus:ring-2"
      style={{ borderColor: COLORES.borde, borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {orden != null && (
              <span
                className="font-mono text-xs font-bold"
                style={{ color: COLORES.textoSuave }}
              >
                {String(orden).padStart(2, '0')}
              </span>
            )}
            <h3 className="text-base font-bold" style={{ color: COLORES.tinta }}>
              {producto.nombre}
            </h3>
            {producto.estado !== 'Disponible' && (
              <Etiqueta
                texto={producto.estado}
                color={producto.estado === 'Nuevo' ? COLORES.verde : COLORES.naranja}
              />
            )}
          </div>

          <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
            {producto.ia}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
            <Etiqueta texto={producto.movimiento} color={COLORES.tinta} />
          </div>

          {producto.razones?.length > 0 && (
            <ul className="mt-3 space-y-1">
              {producto.razones.slice(0, 3).map((r) => (
                <li key={r} className="flex items-start gap-1.5 text-xs" style={{ color: COLORES.verde }}>
                  <Check size={13} className="mt-0.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          )}

          {producto.alertas?.length > 0 && (
            <ul className="mt-2 space-y-1">
              {producto.alertas.map((a) => (
                <li key={a} className="flex items-start gap-1.5 text-xs" style={{ color: '#C2410C' }}>
                  <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ChevronRight
          size={18}
          className="mt-1 shrink-0 transition group-hover:translate-x-0.5"
          style={{ color: COLORES.borde }}
        />
      </div>
    </button>
  );
}

export default TarjetaProducto;
