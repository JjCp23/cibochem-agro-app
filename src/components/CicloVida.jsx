import React, { useMemo, useState } from 'react';
import { Check, Info, ArrowLeft } from 'lucide-react';
import { PRODUCTOS } from '../data/productos.js';
import { ESTADIOS } from '../data/gruposMoA.js';
import { estadiosDeProducto } from '../motores/index.js';
import { COLORES, COLOR_CATEGORIA } from '../data/taxonomia.js';
import { SelloGrupo } from './ui/Etiqueta.jsx';
import { IlustracionCicloVida } from './ui/Ilustraciones.jsx';
import { Chip } from './ui/Superficie.jsx';

/**
 * Matriz de ciclo de vida.
 *
 * Responde una pregunta que el catálogo por sí solo no responde: si la plaga
 * está en huevo o en larva pequeña, ¿qué productos sirven realmente? Muchos
 * fracasos de campo son productos correctos aplicados al estadio equivocado.
 */
export function CicloVida({ onAbrirProducto, onVolver }) {
  const [filtro, setFiltro] = useState(null);
  const color = COLOR_CATEGORIA.Insecticida;

  const filas = useMemo(
    () =>
      PRODUCTOS.filter((p) => p.categoria === 'Insecticida')
        .map((p) => ({ producto: p, estadios: estadiosDeProducto(p) }))
        .filter((f) => (filtro ? f.estadios.includes(filtro) : true))
        .sort((a, b) => b.estadios.length - a.estadios.length),
    [filtro]
  );

  return (
    <div>
      {onVolver && (
        <button
          onClick={onVolver}
          className="mb-3 flex items-center gap-1.5 text-sm font-medium transition hover:opacity-70"
          style={{ color: COLORES.textoSuave }}
        >
          <ArrowLeft size={15} /> Volver
        </button>
      )}
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Ciclo de vida
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Qué estadio de la plaga alcanza cada insecticida. Un producto correcto aplicado al estadio
        equivocado se ve igual que una falla de control.
      </p>

      <IlustracionCicloVida />

      {/* Filtro por estadio */}
      <div className="cc-sin-barra -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <Chip label="Todos" activo={!filtro} onClick={() => setFiltro(null)} />
        {ESTADIOS.map((e) => (
          <Chip
            key={e.id}
            label={e.nombre}
            color={color}
            activo={filtro === e.id}
            onClick={() => setFiltro(filtro === e.id ? null : e.id)}
          />
        ))}
      </div>

      {filtro && (
        <p className="mt-3 flex items-start gap-2 text-sm" style={{ color: COLORES.textoSuave }}>
          <Info size={14} className="mt-0.5 shrink-0" />
          {filas.length} productos del portafolio actúan sobre{' '}
          {ESTADIOS.find((e) => e.id === filtro)?.nombre.toLowerCase()}.
        </p>
      )}

      {/* Matriz */}
      <div className="mt-4 overflow-x-auto rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}>
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr>
              <th
                className="sticky left-0 z-10 bg-white p-2 text-left text-xs font-bold uppercase tracking-wide"
                style={{ color: COLORES.textoSuave }}
              >
                Producto
              </th>
              {ESTADIOS.map((e) => (
                <th
                  key={e.id}
                  className="p-2 text-center text-xs font-bold"
                  style={{ color: COLORES.tinta }}
                >
                  {e.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map(({ producto, estadios }, i) => (
              <tr
                key={producto.id}
                className="cursor-pointer transition hover:bg-slate-50"
                onClick={() => onAbrirProducto(producto)}
                style={{ backgroundColor: i % 2 ? '#FAFCFD' : '#fff' }}
              >
                <td
                  className="sticky left-0 z-10 p-2"
                  style={{ borderTop: `1px solid ${COLORES.borde}`, backgroundColor: i % 2 ? '#FAFCFD' : '#fff' }}
                >
                  <span className="block font-semibold" style={{ color: COLORES.tinta }}>
                    {producto.nombre}
                  </span>
                  <span className="mt-1 inline-block">
                    <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
                  </span>
                </td>
                {ESTADIOS.map((e) => {
                  const activo = estadios.includes(e.id);
                  return (
                    <td
                      key={e.id}
                      className="p-2 text-center"
                      style={{ borderTop: `1px solid ${COLORES.borde}` }}
                    >
                      {activo ? (
                        <span
                          className="cc-pop inline-flex h-6 w-6 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${color}1F` }}
                        >
                          <Check size={13} style={{ color }} />
                        </span>
                      ) : (
                        <span style={{ color: COLORES.borde }}>·</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lectura agronómica */}
      <div className="mt-5 space-y-2">
        {ESTADIOS.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border bg-white p-3"
            style={{ borderColor: COLORES.borde }}
          >
            <span className="text-sm font-bold" style={{ color: COLORES.tinta }}>
              {e.nombre}
            </span>
            <span className="ml-2 text-xs" style={{ color: COLORES.textoSuave }}>
              {e.descripcion}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-4 flex gap-2 rounded-lg p-3"
        style={{ backgroundColor: COLORES.naranjaClaro }}
      >
        <Info size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.naranja }} />
        <p className="text-xs leading-relaxed" style={{ color: COLORES.tinta }}>
          Los reguladores de crecimiento (IRAC 7C) y los inhibidores de quitina (IRAC 15) no matan
          adultos. Aplicados con la población adulta ya volando parecen fallar, pero están cortando la
          generación siguiente: son productos de estrategia, no de emergencia.
        </p>
      </div>
    </div>
  );
}

export default CicloVida;
