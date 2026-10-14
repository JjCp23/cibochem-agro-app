import React, { useEffect, useMemo, useState } from 'react';
import { Beaker, ChevronLeft, ChevronRight, Droplets, X } from 'lucide-react';
import { COLORES } from '../data/taxonomia.js';

/**
 * Repaso rápido del orden de carga: cinco ideas clave para que no se corte la
 * mezcla. Cada diapositiva dice qué hacer y, aparte, por qué.
 */
const DIAPOSITIVAS = [
  {
    titulo: 'La regla, en una frase',
    cuerpo:
      'Agua → corrige el agua → sólidos → líquidos → fertilizantes → coadyuvantes → completa. Si respetas ese orden ya evitaste la mayoría de las mezclas cortadas.',
    porque:
      'Cada familia necesita una condición distinta del caldo para integrarse bien. Meterlas en desorden es lo que produce grumos, natas y capas que ya no se recuperan agitando.',
  },
  {
    titulo: 'Sólidos primero, y prediluidos',
    cuerpo:
      'Polvos y granulados (WP, WG, SG) nunca van secos al tanque: se disuelven aparte en un balde con agua y se vierten colados, con el agitador andando.',
    porque:
      'Un polvo seco que cae sobre un caldo ya cargado se aglomera y termina tapando boquillas o quedándose en el fondo sin aplicar. Necesita agua limpia y en movimiento para hidratarse.',
  },
  {
    titulo: 'Fertilizantes y coadyuvantes, de últimos',
    cuerpo:
      'Los foliares y micronutrientes entran después de los plaguicidas. Los coadyuvantes (tensioactivos, aceites, antideriva) van al final, con el tanque casi lleno.',
    porque:
      'Son sales concentradas y surfactantes: temprano hacen flocular lo que ya está suspendido, generan espuma durante toda la carga, y su dosis depende del volumen final que aún no conoces.',
  },
  {
    titulo: 'El orden no lo arregla todo',
    cuerpo:
      'Dos productos pueden ser incompatibles entre sí aunque los cargues bien: por antagonismo físico-químico (uno desestabiliza la formulación del otro) o biológico (uno le baja la eficacia al otro sin que se vea).',
    porque:
      'La etiqueta ICA es la fuente autorizada sobre las mezclas ya documentadas. Para combinaciones que no están en la etiqueta, no existe forma de saberlo por cálculo: hay que probarlo.',
  },
  {
    titulo: 'La prueba de frasco: 15 minutos',
    cuerpo:
      'Antes de mezclar dos productos por primera vez, combínalos en un frasco transparente en la misma proporción del tanque y espera 15 minutos. Si aparecen grumos, natas, separación en capas o calor, no los mezcles: aplícalos por separado.',
    porque:
      'Quince minutos en un frasco cuestan mucho menos que un tanque de 200 L cortado, una aplicación perdida y las boquillas tapadas a mitad del lote.',
  },
];

/** Tutorial en ventana sobre la pantalla, con flechas del teclado y Escape. */
export function TutorialMezcla({ onCerrar }) {
  const [indice, setIndice] = useState(0);
  const total = DIAPOSITIVAS.length;
  const diapositiva = DIAPOSITIVAS[indice];
  const esUltima = indice === total - 1;

  useEffect(() => {
    const conTecla = (e) => {
      if (e.key === 'Escape') onCerrar();
      if (e.key === 'ArrowRight') setIndice((i) => Math.min(i + 1, total - 1));
      if (e.key === 'ArrowLeft') setIndice((i) => Math.max(i - 1, 0));
    };
    document.addEventListener('keydown', conTecla);

    // Bloquear el desplazamiento del fondo mientras el tutorial está abierto
    const desplazamientoPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', conTecla);
      document.body.style.overflow = desplazamientoPrevio;
    };
  }, [onCerrar, total]);

  const puntos = useMemo(() => DIAPOSITIVAS.map((_, i) => i), []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
      onClick={onCerrar}
      role="presentation"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Tutorial: cómo armar una mezcla"
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: COLORES.borde }}>
          <span
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
            style={{ color: COLORES.textoSuave }}
          >
            <Beaker size={14} /> Tutorial · {indice + 1} de {total}
          </span>
          <button
            onClick={onCerrar}
            className="rounded-full p-1.5 transition hover:bg-slate-100"
            aria-label="Cerrar tutorial"
          >
            <X size={18} style={{ color: COLORES.textoSuave }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <h3 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
            {diapositiva.titulo}
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
            {diapositiva.cuerpo}
          </p>
          {diapositiva.porque && (
            <div className="mt-3 flex gap-2 rounded-lg p-3" style={{ backgroundColor: COLORES.azulClaro }}>
              <Droplets size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.azul }} />
              <p className="text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                <strong>¿Por qué?</strong> {diapositiva.porque}
              </p>
            </div>
          )}
        </div>

        <div className="border-t px-5 py-3" style={{ borderColor: COLORES.borde }}>
          {/* Puntos de avance: el actual se alarga */}
          <div className="flex items-center justify-center gap-1.5">
            {puntos.map((i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === indice ? 16 : 6, backgroundColor: i === indice ? COLORES.azul : COLORES.borde }}
              />
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setIndice((i) => Math.max(i - 1, 0))}
              disabled={indice === 0}
              className="flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-30"
              style={{ color: COLORES.tinta, border: `1px solid ${COLORES.borde}` }}
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            <button
              onClick={() => (esUltima ? onCerrar() : setIndice((i) => i + 1))}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: COLORES.tinta }}
            >
              {esUltima ? 'Listo' : 'Siguiente'} {!esUltima && <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialMezcla;
