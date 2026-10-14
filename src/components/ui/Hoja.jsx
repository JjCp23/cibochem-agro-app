import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { COLORES } from '../../data/taxonomia.js';
import { prefiereMenosMovimiento } from './Movimiento.jsx';

// ── Historial del navegador ──────────────────────────────────────────────
// Cada hoja abierta añade una entrada al historial para que el botón físico
// de atrás del teléfono la cierre en vez de sacar al usuario de la app. Las
// hojas pueden apilarse (buscador → ficha), así que se lleva una pila: atrás
// cierra siempre la de arriba.
const pilaDeHojas = [];
let popsPorIgnorar = 0;
let escuchandoHistorial = false;

function escucharHistorial() {
  if (escuchandoHistorial) return;
  escuchandoHistorial = true;
  window.addEventListener('popstate', () => {
    // Retroceso provocado por la propia app al cerrar con un botón
    if (popsPorIgnorar > 0) {
      popsPorIgnorar -= 1;
      return;
    }
    const cerrar = pilaDeHojas.pop();
    if (cerrar) cerrar();
  });
}

function registrarHoja(cerrar) {
  try {
    escucharHistorial();
    window.history.pushState({ hojaCibo: pilaDeHojas.length + 1 }, '');
    pilaDeHojas.push(cerrar);
  } catch {
    // Entornos sin historial (vista previa embebida): la hoja se cierra igual
    // con sus botones, la tecla Escape o tocando fuera.
  }
}

// Si se cierran varias hojas a la vez (ficha y buscador al saltar a otra
// sección), dos history.back() seguidos se fusionan en el navegador y dejan
// la cuenta descuadrada. Se agrupan en un solo retroceso de n pasos.
let retrocesosPendientes = 0;

function retirarHoja(cerrar) {
  const i = pilaDeHojas.lastIndexOf(cerrar);
  if (i === -1) return; // ya la retiró el botón atrás
  pilaDeHojas.splice(i, 1);
  retrocesosPendientes += 1;
  if (retrocesosPendientes > 1) return;
  Promise.resolve().then(() => {
    const pasos = retrocesosPendientes;
    retrocesosPendientes = 0;
    popsPorIgnorar += 1;
    window.history.go(-pasos);
  });
}

// Bloqueo del desplazamiento del fondo, contado para admitir hojas apiladas
let bloqueosDeScroll = 0;
let overflowPrevio = '';

function bloquearScroll() {
  if (bloqueosDeScroll === 0) {
    overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  bloqueosDeScroll += 1;
}

function liberarScroll() {
  bloqueosDeScroll = Math.max(0, bloqueosDeScroll - 1);
  if (bloqueosDeScroll === 0) document.body.style.overflow = overflowPrevio;
}

/**
 * Hoja que sube desde abajo en el teléfono y se centra como diálogo en
 * pantallas grandes.
 *
 * Se cierra de todas las formas que un usuario intenta por instinto: botón de
 * cerrar, tocar fuera, tecla Escape, botón atrás del teléfono y arrastrar la
 * agarradera hacia abajo. Siempre con animación de salida, para que se
 * entienda a dónde fue el panel.
 *
 * `children` puede ser una función que recibe `cerrar`, para que el contenido
 * pueda cerrar la hoja con animación (por ejemplo, al escoger una opción).
 */
export function HojaInferior({
  onCerrar,
  etiqueta,
  cabecera,
  children,
  completa = false,
  ancho = 'sm:max-w-2xl',
  fondo = '#fff',
}) {
  const panel = useRef(null);
  const onCerrarRef = useRef(onCerrar);
  onCerrarRef.current = onCerrar;
  const saliendoRef = useRef(false);
  const [saliendo, setSaliendo] = useState(false);
  const [arrastre, setArrastre] = useState(0);
  const inicioArrastre = useRef(null);

  const cerrar = () => {
    if (saliendoRef.current) return;
    saliendoRef.current = true;
    setSaliendo(true);
    setTimeout(() => onCerrarRef.current(), prefiereMenosMovimiento() ? 0 : 210);
  };
  const cerrarRef = useRef(cerrar);
  cerrarRef.current = cerrar;

  useEffect(() => {
    const desdeHistorial = () => cerrarRef.current();
    registrarHoja(desdeHistorial);
    bloquearScroll();
    const previo = document.activeElement;
    // Si el contenido ya tomó el foco (un buscador, por ejemplo), se respeta
    if (panel.current && !panel.current.contains(document.activeElement)) {
      panel.current.focus({ preventScroll: true });
    }

    const conEscape = (e) => {
      // Solo responde la hoja de arriba
      const arriba = pilaDeHojas[pilaDeHojas.length - 1];
      if (e.key === 'Escape' && (!arriba || arriba === desdeHistorial)) cerrarRef.current();
    };
    document.addEventListener('keydown', conEscape);

    return () => {
      document.removeEventListener('keydown', conEscape);
      retirarHoja(desdeHistorial);
      liberarScroll();
      if (previo && typeof previo.focus === 'function') previo.focus({ preventScroll: true });
    };
  }, []);

  // Arrastrar la agarradera hacia abajo para cerrar
  const alPresionar = (e) => {
    if (e.button != null && e.button !== 0) return;
    // Los botones de la cabecera deben seguir recibiendo su toque
    if (e.target.closest?.('button, a, input, select, textarea')) return;
    inicioArrastre.current = e.clientY;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const alMover = (e) => {
    if (inicioArrastre.current == null) return;
    setArrastre(Math.max(0, e.clientY - inicioArrastre.current));
  };
  const alSoltar = () => {
    if (inicioArrastre.current == null) return;
    inicioArrastre.current = null;
    if (arrastre > 90) cerrar();
    else setArrastre(0);
  };

  return (
    <div
      className="cc-velo fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
      data-saliendo={saliendo}
      onClick={cerrar}
      role="presentation"
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={etiqueta}
        onClick={(e) => e.stopPropagation()}
        data-saliendo={saliendo}
        className={`cc-hoja flex w-full flex-col overflow-hidden rounded-t-3xl outline-none sm:rounded-3xl ${ancho} ${
          completa ? 'h-[92vh]' : 'max-h-[92vh]'
        }`}
        style={{
          backgroundColor: fondo,
          boxShadow: '0 -8px 32px rgba(11,36,49,0.18)',
          transform: arrastre && !saliendo ? `translateY(${arrastre}px)` : undefined,
          transition: inicioArrastre.current == null ? 'transform .25s cubic-bezier(.2,.8,.2,1)' : 'none',
          '--cc-arrastre': `${arrastre}px`,
        }}
      >
        {/* Agarradera + cabecera: la zona que se puede arrastrar */}
        <div
          className="shrink-0 border-b"
          style={{ borderColor: COLORES.borde, backgroundColor: fondo, touchAction: 'none' }}
          onPointerDown={alPresionar}
          onPointerMove={alMover}
          onPointerUp={alSoltar}
          onPointerCancel={alSoltar}
        >
          <div className="flex justify-center pt-2.5 sm:hidden">
            <span className="h-1.5 w-10 rounded-full" style={{ backgroundColor: COLORES.borde }} />
          </div>
          <div className="flex items-start gap-3 px-5 pb-3 pt-2 sm:pt-4">
            <div className="min-w-0 flex-1">{typeof cabecera === 'function' ? cabecera(cerrar) : cabecera}</div>
            <button
              onClick={cerrar}
              className="cc-presionable -mr-1 shrink-0 rounded-full p-2"
              style={{ backgroundColor: COLORES.grisClaro }}
              aria-label="Cerrar"
            >
              <X size={18} style={{ color: COLORES.tinta }} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {typeof children === 'function' ? children(cerrar) : children}
        </div>
      </div>
    </div>
  );
}

export default HojaInferior;
