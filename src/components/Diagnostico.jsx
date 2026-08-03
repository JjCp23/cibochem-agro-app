import React, { useState, useMemo } from 'react';
import { ArrowLeft, Bug, Sprout, Leaf, Droplets, RotateCcw, SearchX } from 'lucide-react';
import { RAMAS, COLORES, COLOR_CATEGORIA } from '../data/taxonomia.js';
import { PRODUCTOS } from '../data/productos.js';
import { recomendar } from '../motores/index.js';
import { TarjetaProducto } from './TarjetaProducto.jsx';

const ICONOS = { insectos: Bug, malezas: Sprout, enfermedades: Leaf, nutricion: Droplets };

function Opcion({ label, ayuda, activo, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border p-3 text-left transition hover:shadow-sm"
      style={{
        borderColor: activo ? color : COLORES.borde,
        backgroundColor: activo ? `${color}12` : '#fff',
        boxShadow: activo ? `inset 0 0 0 1px ${color}` : undefined,
      }}
    >
      <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
        {label}
      </span>
      {ayuda && (
        <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
          {ayuda}
        </span>
      )}
    </button>
  );
}

function Paso({ numero, titulo, children }) {
  return (
    <section className="mt-6">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-xs font-bold" style={{ color: COLORES.naranja }}>
          {String(numero).padStart(2, '0')}
        </span>
        <h3 className="text-sm font-bold" style={{ color: COLORES.tinta }}>
          {titulo}
        </h3>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Asistente que traduce una situación de campo en una lista de productos. */
export function Diagnostico({ onAbrirProducto }) {
  const [rama, setRama] = useState(null);
  const [objetivo, setObjetivo] = useState(null);
  const [escenario, setEscenario] = useState(null);
  const [momento, setMomento] = useState(null);
  const [ultimoId, setUltimoId] = useState('');

  const ultimoUsado = useMemo(
    () => PRODUCTOS.find((p) => p.id === ultimoId) || null,
    [ultimoId]
  );

  const resultados = useMemo(() => {
    if (!rama || !objetivo) return [];
    return recomendar({
      categoria: rama.categoria,
      objetivo,
      escenario,
      momento,
      ultimoUsado,
    });
  }, [rama, objetivo, escenario, momento, ultimoUsado]);

  const reiniciar = () => {
    setRama(null);
    setObjetivo(null);
    setEscenario(null);
    setMomento(null);
    setUltimoId('');
  };

  // ── Pantalla inicial ────────────────────────────────────────────
  if (!rama) {
    return (
      <div>
        <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
          ¿Qué necesitas resolver?
        </h2>
        <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
          Responde tres preguntas y la app te arma la lista de productos que encajan, ordenada por
          qué tan bien responden a tu situación.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {RAMAS.map((r) => {
            const Icono = ICONOS[r.id];
            const color = COLOR_CATEGORIA[r.categoria];
            return (
              <button
                key={r.id}
                onClick={() => setRama(r)}
                className="flex items-start gap-3 rounded-lg border bg-white p-4 text-left transition hover:shadow-md"
                style={{ borderColor: COLORES.borde, borderTop: `3px solid ${color}` }}
              >
                <span className="rounded-lg p-2" style={{ backgroundColor: `${color}17` }}>
                  <Icono size={20} style={{ color }} />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold" style={{ color: COLORES.tinta }}>
                    {r.titulo}
                  </span>
                  <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
                    {r.resumen}
                  </span>
                  {r.sistema && (
                    <span className="mt-2 inline-block font-mono text-xs font-semibold" style={{ color }}>
                      {r.sistema}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const color = COLOR_CATEGORIA[rama.categoria];

  return (
    <div>
      <button
        onClick={reiniciar}
        className="flex items-center gap-1.5 text-sm font-medium transition hover:opacity-70"
        style={{ color: COLORES.textoSuave }}
      >
        <ArrowLeft size={15} /> Empezar de nuevo
      </button>

      <h2 className="mt-3 text-lg font-bold" style={{ color: COLORES.tinta }}>
        {rama.titulo}
      </h2>

      <Paso numero={1} titulo={rama.pregunta}>
        <div className="grid gap-2 sm:grid-cols-3">
          {rama.objetivos.map((o) => (
            <Opcion
              key={o.id}
              label={o.label}
              ayuda={o.ayuda}
              color={color}
              activo={objetivo === o.id}
              onClick={() => setObjetivo(objetivo === o.id ? null : o.id)}
            />
          ))}
        </div>
      </Paso>

      {objetivo && (
        <Paso numero={2} titulo={rama.preguntaEscenario}>
          <div className="grid gap-2 sm:grid-cols-3">
            {rama.escenarios.map((e) => (
              <Opcion
                key={e.id}
                label={e.label}
                color={color}
                activo={escenario === e.id}
                onClick={() => setEscenario(escenario === e.id ? null : e.id)}
              />
            ))}
          </div>
        </Paso>
      )}

      {objetivo && (
        <Paso numero={3} titulo={rama.preguntaMomento}>
          <div className="grid gap-2 sm:grid-cols-2">
            {rama.momentos.map((m) => (
              <Opcion
                key={m.id}
                label={m.label}
                ayuda={m.ayuda}
                color={color}
                activo={momento === m.id}
                onClick={() => setMomento(momento === m.id ? null : m.id)}
              />
            ))}
          </div>
        </Paso>
      )}

      {objetivo && rama.sistema && (
        <Paso numero={4} titulo="¿Qué aplicaste la vez anterior? (opcional)">
          <p className="mb-2 text-xs" style={{ color: COLORES.textoSuave }}>
            Si lo indicas, la app descarta los productos que repiten el mismo sitio de acción.
          </p>
          <select
            value={ultimoId}
            onChange={(e) => setUltimoId(e.target.value)}
            className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
            style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
          >
            <option value="">No apliqué nada o no recuerdo</option>
            {PRODUCTOS.filter((p) => p.categoria === rama.categoria).map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} — {p.sistema} {p.grupo}
              </option>
            ))}
          </select>
        </Paso>
      )}

      {/* Resultados */}
      {objetivo && (
        <section className="mt-8">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: COLORES.borde }}>
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: COLORES.tinta }}>
              {resultados.length} {resultados.length === 1 ? 'producto encaja' : 'productos encajan'}
            </h3>
            {ultimoUsado && (
              <span className="flex items-center gap-1 text-xs" style={{ color: COLORES.textoSuave }}>
                <RotateCcw size={12} /> Rotando desde {ultimoUsado.sistema} {ultimoUsado.grupo}
              </span>
            )}
          </div>

          {resultados.length === 0 ? (
            <div className="mt-6 flex flex-col items-center py-8 text-center">
              <SearchX size={28} style={{ color: COLORES.borde }} />
              <p className="mt-3 max-w-sm text-sm" style={{ color: COLORES.textoSuave }}>
                Ninguna combinación del portafolio cubre esos criterios. Prueba quitando el escenario o
                el momento para ampliar la búsqueda.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {resultados.map((p, i) => (
                <TarjetaProducto key={p.id} producto={p} orden={i + 1} onAbrir={onAbrirProducto} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Diagnostico;
