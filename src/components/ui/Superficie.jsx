import React, { useEffect, useRef, useState } from 'react';
import { Sun } from 'lucide-react';
import { COLORES } from '../../data/taxonomia.js';
import { IconoIlustrado } from './Iconos.jsx';

/**
 * Insignia hexagonal, el elemento gráfico que identifica cada línea del
 * portafolio. Se dibuja en SVG para que escale sin perder nitidez y para poder
 * teñirla con el color de la categoría.
 */
export function Hexagono({ icono: Icono, imagen, color = COLORES.azul, tamano = 56, relleno = true }) {
  const iconoTam = Math.round(tamano * 0.4);
  // Con imagen: hexágono claro con el ícono ilustrado adentro, como una medalla
  if (imagen) {
    return (
      <span
        className="cc-medalla relative inline-flex shrink-0 items-center justify-center"
        style={{ width: tamano, height: tamano }}
      >
        <svg viewBox="0 0 100 100" width={tamano} height={tamano} aria-hidden="true" style={{ overflow: 'visible' }}>
          <polygon
            points="50,3 93,27 93,73 50,97 7,73 7,27"
            fill="#fff"
            stroke={color}
            strokeOpacity=".35"
            strokeWidth="4"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 3px 4px ${color}33)` }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <IconoIlustrado nombre={imagen} tamano={Math.round(tamano * 0.64)} respaldo={Icono} color={color} />
        </span>
      </span>
    );
  }
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
 * Logotipo: el hexágono de las líneas con un brote. Es el mismo dibujo del
 * icono de la app instalada en el teléfono.
 */
export function Logotipo({ tamano = 34, animado = false }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={tamano}
      height={tamano}
      aria-hidden="true"
      className={animado ? 'cc-brote' : undefined}
    >
      <polygon points="50,3 93,27 93,73 50,97 7,73 7,27" fill="#fff" />
      <path d="M50 80 V50" stroke="#4E8A31" strokeWidth="7" strokeLinecap="round" />
      <path d="M50 54 C49 38 38 29 22 30 C22 46 33 55 50 54 Z" fill="#5C9A3D" />
      <path d="M50 48 C51 32 63 23 79 24 C79 40 67 49 50 48 Z" fill="#8CC152" />
      <circle cx="50" cy="80" r="4" fill="#E8722C" />
    </svg>
  );
}

/**
 * Fila de menú al estilo del portafolio: panel de color con el hexágono a la
 * izquierda, texto al centro y flecha a la derecha.
 */
export function FilaMenu({ icono, imagen, color, fondo, titulo, descripcion, onClick, insignia, contador }) {
  return (
    <button
      onClick={onClick}
      className="cc-presionable group flex w-full items-stretch overflow-hidden rounded-2xl bg-white text-left"
      style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}
    >
      <span
        className="flex w-20 shrink-0 items-center justify-center py-5 sm:w-24"
        style={{ backgroundColor: fondo }}
      >
        <Hexagono icono={icono} imagen={imagen} color={color} tamano={imagen ? 56 : 48} />
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-4">
        <span className="min-w-0">
          <span className="block text-base font-bold leading-tight" style={{ color: COLORES.tinta }}>
            {titulo}
          </span>
          {descripcion && (
            <span className="mt-1 block text-sm leading-snug" style={{ color: COLORES.textoSuave }}>
              {descripcion}
            </span>
          )}
          {(insignia || contador != null) && (
            <span className="mt-2 flex flex-wrap items-center gap-2">
              {insignia}
              {contador != null && (
                <span className="text-[0.6875rem] font-semibold" style={{ color: COLORES.textoSuave }}>
                  {contador}
                </span>
              )}
            </span>
          )}
        </span>
        <svg
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <path d="M1 1l8 8-8 8" stroke={COLORES.borde} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

/**
 * Control segmentado en píldora. La pieza blanca se desliza hasta la opción
 * escogida, así se ve de dónde a dónde cambió la vista. La variante vertical
 * pone el icono sobre el texto, para cuatro opciones o más en un teléfono.
 */
export function Segmentado({ opciones, valor, onCambio, sobreOscuro = false, vertical = false }) {
  const indice = Math.max(0, opciones.findIndex((o) => o.id === valor));
  const redondeo = vertical ? 'rounded-2xl' : 'rounded-full';
  return (
    <div
      className={`relative flex p-1 ${redondeo}`}
      role="tablist"
      style={{ backgroundColor: sobreOscuro ? 'rgba(255,255,255,0.18)' : '#E6EDF2' }}
    >
      <span
        aria-hidden="true"
        className={`cc-deslizar absolute bottom-1 left-1 top-1 bg-white ${vertical ? 'rounded-xl' : 'rounded-full'}`}
        style={{
          width: `calc((100% - 8px) / ${opciones.length})`,
          transform: `translateX(${indice * 100}%)`,
          boxShadow: '0 1px 3px rgba(11,36,49,0.14)',
        }}
      />
      {opciones.map((o) => {
        const activo = valor === o.id;
        const Icono = o.icono;
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={activo}
            onClick={() => onCambio(o.id)}
            className={`relative z-10 flex flex-1 items-center justify-center font-semibold transition-colors ${
              vertical
                ? 'flex-col gap-0.5 rounded-xl px-1 py-1.5 text-[0.6875rem]'
                : 'gap-1.5 rounded-full px-2 py-2 text-sm'
            }`}
            style={{
              color: activo
                ? vertical
                  ? COLORES.azul
                  : COLORES.tinta
                : sobreOscuro
                ? 'rgba(255,255,255,0.85)'
                : COLORES.textoSuave,
            }}
          >
            {Icono && (
              <span key={activo ? 'activo' : 'inactivo'} className={activo ? 'cc-pop' : undefined}>
                <Icono size={vertical ? 18 : 15} strokeWidth={activo ? 2.4 : 2} />
              </span>
            )}
            <span className="truncate">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Ficha de filtro en píldora, con icono y conteo opcionales. */
export function Chip({ label, icono: Icono, activo, onClick, color = COLORES.tinta, cuenta }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={activo}
      className="cc-presionable flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
      style={{
        borderColor: activo ? color : COLORES.borde,
        backgroundColor: activo ? color : '#fff',
        color: activo ? '#fff' : COLORES.textoSuave,
        boxShadow: activo ? `0 2px 8px ${color}40` : 'none',
      }}
    >
      {Icono && <Icono size={13} strokeWidth={2.2} />}
      {label}
      {cuenta != null && (
        <span
          className="cc-num rounded-full px-1.5 text-[0.625rem] leading-4"
          style={{
            backgroundColor: activo ? 'rgba(255,255,255,0.25)' : COLORES.grisClaro,
            color: activo ? '#fff' : COLORES.textoSuave,
          }}
        >
          {cuenta}
        </span>
      )}
    </button>
  );
}

/** Estado vacío con icono flotante: dice qué falta y cómo seguir. */
export function EstadoVacio({ icono: Icono, imagen, titulo, texto, accion, color = COLORES.azul }) {
  return (
    <div
      className="cc-entrada mt-6 flex flex-col items-center rounded-3xl border border-dashed px-6 py-9 text-center"
      style={{ borderColor: COLORES.borde, backgroundColor: '#ffffff99' }}
    >
      <span
        className="cc-flotar flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}14` }}
      >
        {imagen ? (
          <IconoIlustrado nombre={imagen} tamano={44} respaldo={Icono} color={color} />
        ) : (
          <Icono size={28} style={{ color }} strokeWidth={1.8} />
        )}
      </span>
      {titulo && (
        <p className="mt-4 text-base font-bold" style={{ color: COLORES.tinta }}>
          {titulo}
        </p>
      )}
      {texto && (
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed" style={{ color: COLORES.textoSuave }}>
          {texto}
        </p>
      )}
      {accion && <div className="mt-4">{accion}</div>}
    </div>
  );
}

/** Barra de navegación inferior flotante, con indicador que se desliza. */
export function BarraInferior({ pestanas, activa, onCambio }) {
  const indice = Math.max(0, pestanas.findIndex((p) => p.id === activa));
  return (
    <nav className="cc-abajo-seguro pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pt-2" aria-label="Secciones">
      <div
        className="pointer-events-auto relative mx-auto flex max-w-md items-center rounded-full p-1.5"
        style={{
          backgroundColor: 'rgba(230,237,242,0.92)',
          boxShadow: '0 6px 24px rgba(11,36,49,0.18)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <span
          aria-hidden="true"
          className="cc-deslizar absolute bottom-1.5 left-1.5 top-1.5 rounded-full bg-white"
          style={{
            width: `calc((100% - 12px) / ${pestanas.length})`,
            transform: `translateX(${indice * 100}%)`,
            boxShadow: '0 2px 6px rgba(11,36,49,0.12)',
          }}
        />
        {pestanas.map((p) => {
          const Icono = p.icono;
          const activo = activa === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onCambio(p.id)}
              aria-label={p.label}
              aria-current={activo ? 'page' : undefined}
              className="relative z-10 flex flex-1 flex-col items-center justify-center rounded-full py-2"
            >
              <span key={activo ? 'activo' : 'inactivo'} className={activo ? 'cc-pop' : undefined}>
                <Icono
                  size={21}
                  strokeWidth={activo ? 2.4 : 1.9}
                  color={activo ? COLORES.azul : '#8FA3B0'}
                />
              </span>
              <span
                className="mt-0.5 text-[0.625rem] font-semibold leading-none transition-colors"
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
 * Encabezado fijo y compacto: logotipo, nombre de la sección y acciones
 * rápidas (buscar, favoritos). Toma sombra al desplazarse para separarse del
 * contenido.
 */
export function Encabezado({ titulo, acciones, children }) {
  const [conSombra, setConSombra] = useState(false);
  const refEncabezado = useRef(null);

  // Publica el alto real del encabezado (cambia con el modo campo y la zona
  // segura del teléfono) para que los paneles fijos se cuelguen justo debajo
  useEffect(() => {
    const barra = refEncabezado.current;
    if (!barra || typeof ResizeObserver === 'undefined') return undefined;
    const publicar = () =>
      document.documentElement.style.setProperty('--alto-encabezado', `${Math.round(barra.getBoundingClientRect().height)}px`);
    publicar();
    const observador = new ResizeObserver(publicar);
    observador.observe(barra);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const alDesplazar = () => setConSombra(window.scrollY > 4);
    alDesplazar();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, []);

  return (
    <header
      ref={refEncabezado}
      className="cc-arriba-seguro sticky top-0 z-30 transition-shadow duration-300"
      style={{
        background: `linear-gradient(135deg, ${COLORES.azul} 0%, #1F6FA5 100%)`,
        boxShadow: conSombra ? '0 4px 18px rgba(11,36,49,0.22)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5">
        <Logotipo tamano={36} animado />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[0.9375rem] font-extrabold tracking-tight text-white">
            Cibo<span className="font-light">CAMPO</span>
          </p>
          {titulo && (
            <p key={titulo} className="cc-entrada truncate text-xs font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {titulo}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <BotonModoCampo />
          {acciones}
        </div>
      </div>
      {children && <div className="mx-auto max-w-3xl px-4 pb-3">{children}</div>}
    </header>
  );
}

const CLAVE_MODO_CAMPO = 'cibochem-modo-campo';

/**
 * Modo campo: agranda la interfaz (texto y botones) para leer bajo el sol o
 * tocar con guantes. Pone una clase en <html> que sube el tamaño de letra base
 * (ver index.css), así todo lo medido en rem crece en proporción. La
 * preferencia se recuerda en el teléfono entre visitas.
 */
function useModoCampo() {
  const [activo, setActivo] = useState(() => {
    try {
      return window.localStorage.getItem(CLAVE_MODO_CAMPO) === '1';
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.documentElement.classList.toggle('modo-campo', activo);
    try {
      window.localStorage.setItem(CLAVE_MODO_CAMPO, activo ? '1' : '0');
    } catch {
      // Sin almacenamiento: el modo dura mientras la app esté abierta
    }
  }, [activo]);
  return [activo, setActivo];
}

/** Sol del encabezado: activa y desactiva el modo campo. */
function BotonModoCampo() {
  const [activo, setActivo] = useModoCampo();
  return (
    <button
      onClick={() => setActivo((v) => !v)}
      aria-pressed={activo}
      aria-label={activo ? 'Desactivar modo campo' : 'Modo campo: letra y botones grandes para el sol o con guantes'}
      title={activo ? 'Desactivar modo campo' : 'Modo campo: letra y botones grandes'}
      className="cc-presionable relative flex h-10 w-10 items-center justify-center rounded-full transition-colors"
      style={{ backgroundColor: activo ? '#fff' : 'rgba(255,255,255,0.16)' }}
    >
      <Sun size={19} color={activo ? COLORES.azul : '#fff'} strokeWidth={2.2} />
    </button>
  );
}

/** Botón redondo traslúcido para las acciones del encabezado. */
export function BotonEncabezado({ icono: Icono, etiqueta, onClick, contador }) {
  return (
    <button
      onClick={onClick}
      aria-label={etiqueta}
      title={etiqueta}
      className="cc-presionable relative flex h-10 w-10 items-center justify-center rounded-full"
      style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}
    >
      <Icono size={19} color="#fff" strokeWidth={2.2} />
      {contador > 0 && (
        <span
          key={contador}
          className="cc-pop cc-num absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[0.625rem] font-bold text-white"
          style={{ backgroundColor: COLORES.naranja, boxShadow: '0 0 0 2px #2179B0' }}
        >
          {contador}
        </span>
      )}
    </button>
  );
}

export default Hexagono;
