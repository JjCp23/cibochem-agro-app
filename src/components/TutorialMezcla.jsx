import React, { useEffect, useMemo, useState } from 'react';
import { Beaker, ChevronLeft, ChevronRight, Droplets } from 'lucide-react';
import { COLORES } from '../data/taxonomia.js';
import { HojaInferior } from './ui/Hoja.jsx';

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

/**
 * Tutorial en hoja inferior: se cierra con el botón atrás del teléfono,
 * Escape, arrastrando hacia abajo o tocando fuera, igual que las fichas.
 * Las flechas del teclado pasan de diapositiva.
 */
export function TutorialMezcla({ onCerrar }) {
  const [indice, setIndice] = useState(0);
  const total = DIAPOSITIVAS.length;
  const diapositiva = DIAPOSITIVAS[indice];
  const esUltima = indice === total - 1;

  useEffect(() => {
    const conTecla = (e) => {
      if (e.key === 'ArrowRight') setIndice((i) => Math.min(i + 1, total - 1));
      if (e.key === 'ArrowLeft') setIndice((i) => Math.max(i - 1, 0));
    };
    document.addEventListener('keydown', conTecla);
    return () => document.removeEventListener('keydown', conTecla);
  }, [total]);

  const puntos = useMemo(() => DIAPOSITIVAS.map((_, i) => i), []);

  return (
    <HojaInferior
      etiqueta="Repaso rápido: cómo armar una mezcla"
      onCerrar={onCerrar}
      ancho="sm:max-w-lg"
      cabecera={
        <span
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
          style={{ color: COLORES.textoSuave }}
        >
          <Beaker size={14} /> Repaso rápido · {indice + 1} de {total}
        </span>
      }
    >
      {(cerrar) => (
        <>
          <div key={indice} className="cc-entrada px-5 py-5">
            <h3 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
              {diapositiva.titulo}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
              {diapositiva.cuerpo}
            </p>
            {diapositiva.porque && (
              <div className="mt-3 flex gap-2 rounded-2xl p-3" style={{ backgroundColor: COLORES.azulClaro }}>
                <Droplets size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.azul }} />
                <p className="text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  <strong>¿Por qué?</strong> {diapositiva.porque}
                </p>
              </div>
            )}
          </div>

          <div className="border-t px-5 pb-5 pt-3" style={{ borderColor: COLORES.borde }}>
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
                className="cc-presionable flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-30"
                style={{ color: COLORES.tinta, border: `1px solid ${COLORES.borde}` }}
              >
                <ChevronLeft size={16} /> Anterior
              </button>
              <button
                onClick={() => (esUltima ? cerrar() : setIndice((i) => i + 1))}
                className="cc-presionable flex flex-1 items-center justify-center gap-1 rounded-xl py-2.5 text-sm font-bold text-white"
                style={{ backgroundColor: COLORES.tinta }}
              >
                {esUltima ? 'Listo' : 'Siguiente'} {!esUltima && <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        </>
      )}
    </HojaInferior>
  );
}

export default TutorialMezcla;
