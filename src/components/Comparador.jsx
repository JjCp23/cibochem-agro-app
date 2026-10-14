import React, { useState, useMemo } from 'react';
import { X, AlertTriangle, Check, Minus, Scale } from 'lucide-react';
import { PRODUCTOS } from '../data/productos.js';
import { COLORES, COLOR_CATEGORIA, FONDO_CATEGORIA, COLOR_RIESGO } from '../data/taxonomia.js';
import { TRANSLOCACION, ESTADIOS, fichasDeProducto } from '../data/gruposMoA.js';
import { compartenModoDeAccion, explicarConflicto, estadiosDeProducto } from '../motores/index.js';
import { SelloGrupo } from './ui/Etiqueta.jsx';
import { SelectorProducto } from './ui/SelectorProducto.jsx';
import { EstadoVacio } from './ui/Superficie.jsx';

const MAXIMO = 3;

/**
 * Comparador lado a lado.
 *
 * Responde la pregunta que queda después del diagnóstico: la app propuso tres
 * productos válidos, ¿cuál escojo? Aquí se ven juntos los criterios que de
 * verdad diferencian: modo de acción, movimiento, velocidad, riesgo de
 * resistencia y selectividad con benéficos.
 */
export function Comparador({ onAbrirProducto }) {
  const [ids, setIds] = useState([]);

  const elegidos = useMemo(
    () => ids.map((id) => PRODUCTOS.find((p) => p.id === id)).filter(Boolean),
    [ids]
  );

  // Solo tiene sentido comparar dentro de la misma categoría
  const categoriaFijada = elegidos[0]?.categoria || null;
  const disponibles = PRODUCTOS.filter(
    (p) => !ids.includes(p.id) && (!categoriaFijada || p.categoria === categoriaFijada)
  );

  const conflictos = useMemo(() => {
    const lista = [];
    for (let i = 0; i < elegidos.length; i += 1) {
      for (let j = i + 1; j < elegidos.length; j += 1) {
        if (compartenModoDeAccion(elegidos[i], elegidos[j])) {
          lista.push({
            a: elegidos[i],
            b: elegidos[j],
            motivo: explicarConflicto(elegidos[i], elegidos[j]),
          });
        }
      }
    }
    return lista;
  }, [elegidos]);

  const agregar = (id) => {
    if (id && ids.length < MAXIMO) setIds([...ids, id]);
  };

  const filas = [
    {
      etiqueta: 'Modo de acción',
      valor: (p) =>
        p.sistema ? (
          <SelloGrupo sistema={p.sistema} grupo={p.grupo} color={COLOR_CATEGORIA[p.categoria]} />
        ) : (
          <span className="text-xs">{p.grupo}</span>
        ),
    },
    { etiqueta: 'Familia', valor: (p) => p.familia },
    {
      etiqueta: 'Movimiento',
      valor: (p) => {
        const f = fichasDeProducto(p)[0]?.ficha;
        const tr = f && TRANSLOCACION[f.translocacion];
        return tr ? (
          <span>
            <span className="mr-1 font-mono">{tr.icono}</span>
            {tr.nombre}
          </span>
        ) : (
          p.movimiento
        );
      },
    },
    {
      etiqueta: 'Velocidad',
      valor: (p) => fichasDeProducto(p)[0]?.ficha?.velocidad || '—',
    },
    {
      etiqueta: 'Riesgo de resistencia',
      valor: (p) => (
        <span className="font-bold" style={{ color: COLOR_RIESGO[p.riesgo] }}>
          {p.riesgo}
        </span>
      ),
    },
    {
      etiqueta: 'Benéficos',
      valor: (p) => p.beneficos || '—',
    },
    {
      etiqueta: 'Estadios',
      valor: (p) => {
        const e = estadiosDeProducto(p);
        if (e.length === 0) return '—';
        return ESTADIOS.filter((x) => e.includes(x.id))
          .map((x) => x.nombre)
          .join(', ');
      },
    },
    { etiqueta: 'Presentaciones', valor: (p) => p.presentaciones.join(' · ') },
    {
      etiqueta: 'Disponibilidad',
      valor: (p) =>
        p.estado === 'Pronto' ? (
          <span style={{ color: COLORES.naranja }}>Próximo lanzamiento</span>
        ) : (
          <span className="inline-flex items-center gap-1" style={{ color: COLORES.verde }}>
            <Check size={13} /> {p.estado}
          </span>
        ),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Comparar productos
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Cuando varios productos sirven, esto muestra lado a lado lo que de verdad los diferencia.
        Hasta {MAXIMO} de la misma línea.
      </p>

      {/* Selector */}
      {ids.length < MAXIMO && (
        <div className="mt-4">
          <SelectorProducto
            valor=""
            onCambio={agregar}
            productos={disponibles}
            titulo={ids.length === 0 ? 'Primer producto a comparar' : 'Agregar a la comparación'}
            marcador={
              ids.length === 0
                ? 'Escoge el primer producto…'
                : `Agregar otro ${categoriaFijada?.toLowerCase() || 'producto'} (${ids.length}/${MAXIMO})…`
            }
          />
        </div>
      )}

      {elegidos.length === 0 && (
        <EstadoVacio
          icono={Scale}
          imagen="comparar"
          titulo="Pon dos o tres productos frente a frente"
          texto="Cuando varios productos sirven, aquí ves lado a lado lo que de verdad los diferencia."
        />
      )}

      {elegidos.length > 0 && (
        <>
          {/* Encabezados */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse">
              <thead>
                <tr>
                  <th className="w-32" />
                  {elegidos.map((p) => {
                    const color = COLOR_CATEGORIA[p.categoria];
                    return (
                      <th key={p.id} className="p-1 align-top" style={{ width: `${70 / elegidos.length}%` }}>
                        <div
                          className="cc-pop relative rounded-xl p-3 text-left"
                          style={{ backgroundColor: FONDO_CATEGORIA[p.categoria] }}
                        >
                          <button
                            onClick={() => setIds(ids.filter((x) => x !== p.id))}
                            className="absolute right-1.5 top-1.5 rounded-full p-1 transition hover:bg-white/60"
                            aria-label={`Quitar ${p.nombre}`}
                          >
                            <X size={13} style={{ color }} />
                          </button>
                          <button onClick={() => onAbrirProducto(p)} className="text-left">
                            <span className="block pr-5 text-sm font-bold leading-tight" style={{ color: COLORES.tinta }}>
                              {p.nombre}
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-snug" style={{ color: COLORES.textoSuave }}>
                              {p.ia}
                            </span>
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filas.map((f, i) => (
                  <tr key={f.etiqueta} style={{ backgroundColor: i % 2 ? '#FAFCFD' : 'transparent' }}>
                    <td
                      className="p-2 align-top text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: COLORES.textoSuave }}
                    >
                      {f.etiqueta}
                    </td>
                    {elegidos.map((p) => (
                      <td
                        key={p.id}
                        className="p-2 align-top text-xs"
                        style={{ color: COLORES.tinta, borderTop: `1px solid ${COLORES.borde}` }}
                      >
                        {f.valor(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lectura de la comparación */}
          <div className="mt-5 space-y-2">
            {conflictos.length > 0 ? (
              conflictos.map((c, i) => (
                <div
                  key={i}
                  className="flex gap-2 rounded-xl p-3"
                  style={{ backgroundColor: '#FDF3EE', border: '1px solid #F0C9B4' }}
                >
                  <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: '#C2410C' }} />
                  <p className="text-sm" style={{ color: COLORES.tinta }}>
                    <strong>{c.a.nombre}</strong> y <strong>{c.b.nombre}</strong> no sirven para rotar
                    entre sí: {c.motivo.toLowerCase()}.
                  </p>
                </div>
              ))
            ) : elegidos.length > 1 ? (
              <div
                className="flex gap-2 rounded-xl p-3"
                style={{ backgroundColor: COLORES.verdeClaro }}
              >
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.verde }} />
                <p className="text-sm" style={{ color: COLORES.tinta }}>
                  Todos tienen sitios de acción distintos: sirven para armar una secuencia de rotación.
                </p>
              </div>
            ) : null}

            <div className="flex gap-2 rounded-xl p-3" style={{ backgroundColor: COLORES.papel }}>
              <Minus size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.textoSuave }} />
              <p className="text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
                La comparación no incluye dosis ni costo por hectárea porque dependen de la etiqueta y
                del precio del día. Con el modo de acción ya resuelto, esos dos datos deciden el resto.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Comparador;
