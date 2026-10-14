import React from 'react';
import { COLORES } from '../../data/taxonomia.js';

/** Etiqueta pequeña de texto, sólida o suave. */
export function Etiqueta({ texto, color = COLORES.azul, tono = 'suave', mono = false }) {
  const estilo =
    tono === 'solido'
      ? { backgroundColor: color, color: '#fff' }
      : { backgroundColor: `${color}1A`, color, border: `1px solid ${color}33` };

  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs leading-relaxed ${
        mono ? 'font-mono font-semibold tracking-tight' : 'font-medium'
      }`}
      style={estilo}
    >
      {texto}
    </span>
  );
}

/**
 * Sello de modo de acción: el dato que más se repite en toda la app.
 * Se muestra siempre en monoespaciada porque es un código, no una palabra.
 */
export function SelloGrupo({ sistema, grupo, color = COLORES.tinta, tamano = 'md' }) {
  if (!sistema) {
    return (
      <span
        className="inline-flex items-center rounded font-mono text-xs font-semibold px-2 py-1"
        style={{ backgroundColor: `${color}14`, color }}
      >
        {grupo}
      </span>
    );
  }
  const alto = tamano === 'lg' ? 'text-sm py-1.5' : 'text-xs py-1';
  return (
    <span className={`inline-flex items-stretch overflow-hidden rounded font-mono font-semibold ${alto}`}>
      <span className="px-2 text-white" style={{ backgroundColor: color }}>
        {sistema}
      </span>
      <span className="px-2" style={{ backgroundColor: `${color}1F`, color }}>
        {grupo}
      </span>
    </span>
  );
}

/**
 * Texto con **resaltados**: los datos de la guía de campo marcan así lo que
 * hay que retener de un vistazo.
 */
export function TextoMarcado({ texto }) {
  const partes = String(texto || '').split('**');
  return (
    <>
      {partes.map((parte, i) =>
        i % 2 ? (
          <strong key={i} style={{ color: COLORES.tinta }}>
            {parte}
          </strong>
        ) : (
          <React.Fragment key={i}>{parte}</React.Fragment>
        )
      )}
    </>
  );
}

export default Etiqueta;
