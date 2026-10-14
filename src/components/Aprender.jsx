import React, { useState } from 'react';
import { ChevronDown, Lightbulb, ArrowLeft, ArrowRight, ShieldCheck, Move, Sprout, Leaf, Bug, SprayCan, FileText, Target, Stethoscope, Clock } from 'lucide-react';
import { FilaMenu, Hexagono } from './ui/Superficie.jsx';
import { ILUSTRACIONES_POR_TEMA } from './ui/Ilustraciones.jsx';
import { TEMAS, PREGUNTAS } from '../data/conocimiento.js';
import { TRANSLOCACION } from '../data/gruposMoA.js';
import { COLORES, COLOR_CATEGORIA, FONDO_CATEGORIA } from '../data/taxonomia.js';

// Cada tema se identifica con un icono y el color de la línea con la que se
// relaciona, para que el módulo se lea igual que el resto de la app.
const ESTILO_TEMA = {
  resistencia: { icono: ShieldCheck, imagen: 'resistencia', color: COLORES.tinta, fondo: COLORES.grisClaro },
  translocacion: { icono: Move, imagen: 'translocacion', color: COLORES.azul, fondo: COLORES.azulClaro },
  arvenses: { icono: Sprout, imagen: 'arvenses', color: COLORES.naranja, fondo: COLORES.naranjaClaro },
  hongos: { icono: Leaf, imagen: 'hongos', color: COLORES.teal, fondo: COLORES.tealClaro },
  insectos: { icono: Bug, imagen: 'insectos', color: COLORES.azul, fondo: COLORES.azulClaro },
  aplicacion: { icono: SprayCan, imagen: 'aplicacion', color: COLORES.verde, fondo: COLORES.verdeClaro },
  etiqueta: { icono: FileText, imagen: 'etiqueta', color: COLORES.ambar, fondo: COLORES.ambarClaro },
  umbrales: { icono: Target, imagen: 'umbrales', color: COLORES.gris, fondo: COLORES.grisClaro },
  estres: { icono: Stethoscope, imagen: 'estres', color: COLORES.ambar, fondo: COLORES.ambarClaro },
};

/** Minutos de lectura de un tema, a unas 200 palabras por minuto. */
export function minutosDeLectura(tema) {
  const palabras = [tema.resumen, ...tema.secciones.map((x) => `${x.titulo} ${x.texto}`)]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

function Acordeon({ pregunta, respuesta }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: COLORES.borde }}>
      <button
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        className="flex w-full items-start justify-between gap-3 py-3.5 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: COLORES.tinta }}>
          {pregunta}
        </span>
        <span
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
          style={{ backgroundColor: abierto ? COLORES.naranjaClaro : COLORES.grisClaro }}
        >
          <ChevronDown
            size={15}
            className="transition-transform duration-300"
            style={{
              color: abierto ? COLORES.naranja : COLORES.textoSuave,
              transform: abierto ? 'rotate(180deg)' : 'none',
            }}
          />
        </span>
      </button>
      <div className="cc-pliegue" data-abierto={abierto}>
        <div>
          <p className="pb-4 text-sm leading-relaxed" style={{ color: COLORES.textoSuave }}>
            {respuesta}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Módulo de referencia: el "por qué" detrás de las recomendaciones. */
export function Aprender() {
  const [temaId, setTemaId] = useState(null);
  const tema = TEMAS.find((t) => t.id === temaId);

  const abrirTema = (id) => {
    setTemaId(id);
    window.scrollTo({ top: 0 });
  };

  if (tema) {
    const estilo = ESTILO_TEMA[tema.id] || ESTILO_TEMA.resistencia;
    const indice = TEMAS.findIndex((t) => t.id === tema.id);
    const siguiente = TEMAS[indice + 1];
    return (
      <div key={tema.id} className="cc-entrada">
        <button
          onClick={() => abrirTema(null)}
          className="flex items-center gap-1.5 text-sm font-medium transition hover:opacity-70"
          style={{ color: COLORES.textoSuave }}
        >
          <ArrowLeft size={15} /> Todos los temas
        </button>

        <div className="mt-3 flex items-start gap-3">
          <Hexagono icono={estilo.icono} imagen={estilo.imagen} color={estilo.color} tamano={54} />
          <div className="min-w-0">
            <h2 className="text-xl font-bold leading-tight" style={{ color: COLORES.tinta }}>
              {tema.titulo}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: COLORES.textoSuave }}>
              <Clock size={12} /> {minutosDeLectura(tema)} min de lectura · {tema.secciones.length} apartados
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm" style={{ color: COLORES.textoSuave }}>
          {tema.resumen}
        </p>

        <div className="cc-escalonado mt-5 space-y-4">
          {tema.secciones.map((s, i) => (
            <React.Fragment key={s.titulo}>
              <div
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: s.destacado ? COLORES.naranjaClaro : '#fff',
                  boxShadow: s.destacado ? 'none' : '0 1px 3px rgba(11,36,49,0.08)',
                  border: s.destacado ? `1px solid ${COLORES.naranja}55` : 'none',
                }}
              >
                <h3 className="flex items-baseline gap-2 text-sm font-bold" style={{ color: COLORES.tinta }}>
                  <span className="cc-num font-mono text-xs" style={{ color: estilo.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.titulo}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  {s.texto}
                </p>
              </div>
              {/* La ilustración va tras el primer apartado, cuando el lector ya
                  tiene el contexto pero antes de que el texto se haga denso. */}
              {i === 0 &&
                (ILUSTRACIONES_POR_TEMA[tema.id] || []).map((Ilustracion, k) => (
                  <Ilustracion key={k} />
                ))}
            </React.Fragment>
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
                  className="flex gap-3 rounded-xl border bg-white p-3"
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

        {siguiente && (
          <button
            onClick={() => abrirTema(siguiente.id)}
            className="cc-presionable mt-8 flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left"
            style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                Siguiente tema
              </span>
              <span className="block text-sm font-bold" style={{ color: COLORES.tinta }}>
                {siguiente.titulo}
              </span>
            </span>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: COLORES.azul }}
            >
              <ArrowRight size={17} color="#fff" />
            </span>
          </button>
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

      <div className="cc-escalonado mt-5 space-y-3">
        {TEMAS.map((t) => {
          const e = ESTILO_TEMA[t.id] || ESTILO_TEMA.resistencia;
          return (
            <FilaMenu
              key={t.id}
              icono={e.icono}
              imagen={e.imagen}
              color={e.color}
              fondo={e.fondo}
              titulo={t.titulo}
              descripcion={t.resumen}
              onClick={() => abrirTema(t.id)}
              insignia={
                <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: COLORES.textoSuave }}>
                  <Clock size={11} /> {minutosDeLectura(t)} min · {t.secciones.length} apartados
                </span>
              }
            />
          );
        })}
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
