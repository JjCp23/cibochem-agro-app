import React, { useEffect, useState } from 'react';
import { Sun } from 'lucide-react';
import { COLORES } from '../../data/taxonomia.js';

const CLAVE_MODO_CAMPO = 'cibochem-modo-campo';

/**
 * Modo campo: agranda toda la interfaz (texto y botones) para leer bajo el sol
 * o tocar con guantes. Se aplica como una clase en <html> que sube el tamaño de
 * letra base (ver index.css), así todo lo que está en rem crece en proporción.
 * La preferencia se recuerda en el teléfono entre visitas.
 */
function useModoCampo() {
  const [activo, setActivo] = useState(() => localStorage.getItem(CLAVE_MODO_CAMPO) === '1');
  useEffect(() => {
    document.documentElement.classList.toggle('modo-campo', activo);
    localStorage.setItem(CLAVE_MODO_CAMPO, activo ? '1' : '0');
  }, [activo]);
  return [activo, setActivo];
}

/**
 * Insignia hexagonal, el elemento gráfico que identifica cada línea del
 * portafolio. Se dibuja en SVG para que escale sin perder nitidez y para poder
 * teñirla con el color de la categoría.
 */
export function Hexagono({ icono: Icono, color = COLORES.azul, tamano = 56, relleno = true }) {
  const iconoTam = Math.round(tamano * 0.4);
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: tamano, height: tamano }}>
      <svg viewBox="0 0 100 100" width={tamano} height={tamano} aria-hidden="true">
        <polygon
          points="50,3 93,27 93,73 50,97 7,73 7,27"
          fill={relleno ? color : 'none'}
          stroke={color}
          strokeWidth={relleno ? 0 : 7}
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <Icono size={iconoTam} strokeWidth={1.8} color={relleno ? '#fff' : color} />
      </span>
    </span>
  );
}

/**
 * Fila de menú al estilo del portafolio: panel de color con el hexágono a la
 * izquierda, texto al centro y flecha a la derecha.
 */
export function FilaMenu({ icono, color, fondo, titulo, descripcion, onClick, insignia }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white text-left shadow-sm transition active:scale-[0.99]"
      style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}
    >
      <span
        className="flex w-24 shrink-0 items-center justify-center py-6 sm:w-28"
        style={{ backgroundColor: fondo }}
      >
        <Hexagono icono={icono} color={color} tamano={52} />
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-5">
        <span className="min-w-0">
          <span className="block text-base font-bold leading-tight" style={{ color: COLORES.tinta }}>
            {titulo}
          </span>
          {descripcion && (
            <span className="mt-1 block text-sm leading-snug" style={{ color: COLORES.textoSuave }}>
              {descripcion}
            </span>
          )}
          {insignia && <span className="mt-2 inline-block">{insignia}</span>}
        </span>
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" className="shrink-0">
          <path d="M1 1l8 8-8 8" stroke={COLORES.borde} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

/** Control segmentado en píldora, como el selector Productos / Datos de interés. */
export function Segmentado({ opciones, valor, onCambio, sobreOscuro = false }) {
  return (
    <div
      className="flex rounded-full p-1"
      style={{ backgroundColor: sobreOscuro ? 'rgba(255,255,255,0.18)' : '#E6EDF2' }}
    >
      {opciones.map((o) => {
        const activo = valor === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onCambio(o.id)}
            className="flex-1 rounded-full px-4 py-2 text-sm font-semibold transition"
            style={{
              backgroundColor: activo ? '#fff' : 'transparent',
              color: activo ? COLORES.tinta : sobreOscuro ? 'rgba(255,255,255,0.85)' : COLORES.textoSuave,
              boxShadow: activo ? '0 1px 3px rgba(11,36,49,0.12)' : 'none',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Barra de navegación inferior flotante. */
export function BarraInferior({ pestanas, activa, onCambio }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-2">
      <div
        className="mx-auto flex max-w-md items-center justify-around rounded-full p-1.5"
        style={{
          backgroundColor: '#E6EDF2',
          boxShadow: '0 4px 16px rgba(11,36,49,0.14)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {pestanas.map((p) => {
          const Icono = p.icono;
          const activo = activa === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onCambio(p.id)}
              aria-label={p.label}
              aria-current={activo ? 'page' : undefined}
              className="flex flex-1 flex-col items-center justify-center rounded-full py-2 transition"
              style={{ backgroundColor: activo ? '#fff' : 'transparent' }}
            >
              <Icono size={20} strokeWidth={activo ? 2.4 : 1.9} color={activo ? COLORES.azul : '#8FA3B0'} />
              <span
                className="mt-0.5 text-[10px] font-semibold leading-none"
                style={{ color: activo ? COLORES.azul : '#8FA3B0' }}
              >
                {p.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/**
 * Encabezado azul con el logotipo y, opcionalmente, un control segmentado.
 * El sol de la esquina activa el modo campo.
 */
export function Encabezado({ titulo, subtitulo, children }) {
  const [modoCampo, setModoCampo] = useModoCampo();
  return (
    <header style={{ backgroundColor: COLORES.azul }} className="relative">
      <button
        onClick={() => setModoCampo((v) => !v)}
        aria-pressed={modoCampo}
        aria-label={
          modoCampo
            ? 'Desactivar modo campo (texto y botones grandes)'
            : 'Activar modo campo: agranda texto y botones para leer bajo sol o tocar con guantes'
        }
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition"
        style={{
          backgroundColor: modoCampo ? '#fff' : 'rgba(255,255,255,0.16)',
          color: modoCampo ? COLORES.azul : '#fff',
        }}
      >
        <Sun size={18} strokeWidth={2} />
      </button>
      <div className="mx-auto max-w-3xl px-4 pb-4 pt-5 text-center">
        <p className="text-2xl font-extrabold tracking-tight text-white">
          Cibo<span className="font-light">CAMPO</span>
          <span className="ml-0.5 align-super text-xs">🌱</span>
        </p>
        {titulo && <p className="mt-1 text-lg font-bold text-white">{titulo}</p>}
        {subtitulo && (
          <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {subtitulo}
          </p>
        )}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </header>
  );
}

export default Hexagono;
