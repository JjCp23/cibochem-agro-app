import React, { useState } from 'react';
import { ChevronDown, Lightbulb, ArrowLeft } from 'lucide-react';
import { TEMAS, PREGUNTAS } from '../data/conocimiento.js';
import { TRANSLOCACION } from '../data/gruposMoA.js';
import { COLORES } from '../data/taxonomia.js';

function Acordeon({ pregunta, respuesta }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: COLORES.borde }}>
      <button
        onClick={() => setAbierto(!abierto)}
        className="flex w-full items-start justify-between gap-3 py-3 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: COLORES.tinta }}>
          {pregunta}
        </span>
        <ChevronDown
          size={16}
          className="mt-0.5 shrink-0 transition"
          style={{
            color: COLORES.textoSuave,
            transform: abierto ? 'rotate(180deg)' : 'none',
          }}
        />
      </button>
      {abierto && (
        <p className="pb-3 text-sm leading-relaxed" style={{ color: COLORES.textoSuave }}>
          {respuesta}
        </p>
      )}
    </div>
  );
}

/** Módulo de referencia: el "por qué" detrás de las recomendaciones. */
export function Aprender() {
  const [temaId, setTemaId] = useState(null);
  const tema = TEMAS.find((t) => t.id === temaId);

  if (tema) {
    return (
      <div>
        <button
          onClick={() => setTemaId(null)}
          className="flex items-center gap-1.5 text-sm font-medium transition hover:opacity-70"
          style={{ color: COLORES.textoSuave }}
        >
          <ArrowLeft size={15} /> Todos los temas
        </button>

        <h2 className="mt-3 text-xl font-bold" style={{ color: COLORES.tinta }}>
          {tema.titulo}
        </h2>
        <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
          {tema.resumen}
        </p>

        <div className="mt-5 space-y-4">
          {tema.secciones.map((s) => (
            <div
              key={s.titulo}
              className="rounded-lg border p-4"
              style={{
                borderColor: s.destacado ? COLORES.naranja : COLORES.borde,
                backgroundColor: s.destacado ? COLORES.naranjaClaro : '#fff',
              }}
            >
              <h3 className="text-sm font-bold" style={{ color: COLORES.tinta }}>
                {s.titulo}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                {s.texto}
              </p>
            </div>
          ))}
        </div>

        {/* Referencia visual de translocación dentro del tema correspondiente */}
        {tema.id === 'translocacion' && (
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: COLORES.tinta }}>
              Referencia rápida
            </h3>
            <div className="mt-3 space-y-2">
              {Object.values(TRANSLOCACION).map((t) => (
                <div
                  key={t.id}
                  className="flex gap-3 rounded-lg border bg-white p-3"
                  style={{ borderColor: COLORES.borde }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-lg"
                    style={{ backgroundColor: COLORES.azulClaro, color: COLORES.azul }}
                  >
                    {t.icono}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold" style={{ color: COLORES.tinta }}>
                      {t.nombre}
                    </span>
                    <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
                      {t.implicacion}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Aprender
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        El razonamiento agronómico detrás de cada recomendación de la app.
      </p>

      <div className="mt-5 space-y-2">
        {TEMAS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setTemaId(t.id)}
            className="flex w-full items-center gap-3 rounded-lg border bg-white p-4 text-left transition hover:shadow-md"
            style={{ borderColor: COLORES.borde }}
          >
            <span className="font-mono text-xs font-bold" style={{ color: COLORES.naranja }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold" style={{ color: COLORES.tinta }}>
                {t.titulo}
              </span>
              <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
                {t.resumen}
              </span>
            </span>
            <span className="shrink-0 font-mono text-xs" style={{ color: COLORES.borde }}>
              {t.secciones.length}
            </span>
          </button>
        ))}
      </div>

      <h3
        className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wide"
        style={{ color: COLORES.tinta }}
      >
        <Lightbulb size={15} style={{ color: COLORES.naranja }} /> Preguntas de campo
      </h3>
      <div className="mt-2">
        {PREGUNTAS.map((q) => (
          <Acordeon key={q.p} pregunta={q.p} respuesta={q.r} />
        ))}
      </div>
    </div>
  );
}

export default Aprender;
