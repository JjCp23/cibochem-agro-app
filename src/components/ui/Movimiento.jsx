import React, { useEffect, useRef, useState } from 'react';

/**
 * Animaciones y estilos globales de la app.
 *
 * Viven aquí y no en index.css por una razón práctica: el artefacto de un solo
 * archivo no carga hojas de estilo propias, solo Tailwind estándar. Inyectando
 * el CSS desde un componente, la versión web y el artefacto se ven y se mueven
 * igual.
 *
 * Criterio de movimiento: rápido (menos de 400 ms), con una curva que frena al
 * final, y siempre al servicio de la orientación —de dónde viene un panel, qué
 * cambió— y no como adorno. Quien pide movimiento reducido en su teléfono no
 * ve ninguna animación.
 */
export const ESTILOS_APP = `
/* Las entradas usan fill-mode backwards: al terminar sueltan el transform,
   así el efecto de presión y los centrados con translate siguen funcionando. */
@keyframes cc-subir { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes cc-aparecer { from { opacity: 0; } to { opacity: 1; } }
@keyframes cc-hoja-entra { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes cc-hoja-sale { from { transform: translateY(var(--cc-arrastre, 0px)); } to { transform: translateY(100%); } }
@keyframes cc-modal-entra { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: none; } }
@keyframes cc-modal-sale { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(16px) scale(.97); } }
@keyframes cc-pop { 0% { opacity: 0; transform: scale(.4); } 60% { opacity: 1; transform: scale(1.15); } 100% { transform: scale(1); } }
@keyframes cc-onda { from { opacity: .55; transform: scale(.6); } to { opacity: 0; transform: scale(2.4); } }
@keyframes cc-latido { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
@keyframes cc-flotar { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes cc-girar { to { transform: rotate(-360deg); } }
@keyframes cc-brote { 0% { transform: scale(.2) rotate(-12deg); opacity: 0; } 70% { transform: scale(1.08) rotate(3deg); opacity: 1; } 100% { transform: none; } }

.cc-entrada { animation: cc-subir .32s cubic-bezier(.2,.8,.2,1) backwards; }
.cc-aparecer { animation: cc-aparecer .25s ease-out backwards; }
.cc-escalonado > * { animation: cc-subir .38s cubic-bezier(.2,.8,.2,1) backwards; }
.cc-escalonado > *:nth-child(2) { animation-delay: 40ms; }
.cc-escalonado > *:nth-child(3) { animation-delay: 80ms; }
.cc-escalonado > *:nth-child(4) { animation-delay: 120ms; }
.cc-escalonado > *:nth-child(5) { animation-delay: 160ms; }
.cc-escalonado > *:nth-child(6) { animation-delay: 200ms; }
.cc-escalonado > *:nth-child(7) { animation-delay: 240ms; }
.cc-escalonado > *:nth-child(n+8) { animation-delay: 280ms; }

.cc-velo { animation: cc-aparecer .25s ease-out backwards; }
.cc-velo[data-saliendo="true"] { animation: cc-aparecer .22s ease-in reverse both; }
/* backwards y no both: al terminar, el panel vuelve a obedecer su transform
   en línea, que es el que mueve el gesto de arrastrar para cerrar. */
.cc-hoja { animation: cc-hoja-entra .34s cubic-bezier(.2,.9,.25,1) backwards; }
.cc-hoja[data-saliendo="true"] { animation: cc-hoja-sale .22s ease-in both; }
@media (min-width: 640px) {
  .cc-hoja { animation-name: cc-modal-entra; animation-duration: .26s; }
  .cc-hoja[data-saliendo="true"] { animation-name: cc-modal-sale; animation-duration: .18s; }
}

.cc-pop { animation: cc-pop .32s cubic-bezier(.3,1.4,.5,1) backwards; }
.cc-onda { animation: cc-onda .7s ease-out both; }
.cc-latido { animation: cc-latido 1.8s ease-in-out infinite; }
.cc-flotar { animation: cc-flotar 3s ease-in-out infinite; }
.cc-girar { animation: cc-girar .6s cubic-bezier(.3,1.2,.5,1); }
.cc-brote { animation: cc-brote .5s cubic-bezier(.3,1.3,.5,1) backwards; }

.cc-presionable { transition: transform .16s ease, box-shadow .2s ease, background-color .2s ease, border-color .2s ease; }
.cc-presionable:active { transform: scale(.975); }
@media (hover: hover) {
  .cc-presionable:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(11,36,49,.12) !important; }
  .cc-presionable:active { transform: scale(.985); }
}

/* Íconos 3D vivos: se asoman al tocar o pasar el mouse por su tarjeta */
.cc-icono3d { transition: transform .35s cubic-bezier(.3,1.5,.5,1); will-change: transform; }
.cc-presionable:hover .cc-icono3d, .cc-presionable:active .cc-icono3d { transform: translateY(-3px) rotate(-6deg) scale(1.08); }
.cc-medalla { transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
.cc-presionable:hover .cc-medalla { transform: rotate(4deg); }

.cc-pliegue { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s cubic-bezier(.2,.8,.2,1); }
.cc-pliegue[data-abierto="true"] { grid-template-rows: 1fr; }
.cc-pliegue > div { overflow: hidden; }

.cc-deslizar { transition: transform .38s cubic-bezier(.3,1.25,.5,1), width .3s ease; }
.cc-barra-progreso { transition: width .45s cubic-bezier(.2,.8,.2,1), background-color .3s ease; }

.cc-sin-barra { scrollbar-width: none; }
.cc-sin-barra::-webkit-scrollbar { display: none; }
.cc-num { font-variant-numeric: tabular-nums; }
.cc-abajo-seguro { padding-bottom: max(12px, env(safe-area-inset-bottom)); }
.cc-arriba-seguro { padding-top: env(safe-area-inset-top); }

button, a, label { -webkit-tap-highlight-color: transparent; }
:focus-visible { outline: 2px solid #E8722C; outline-offset: 2px; }
input[type=number] { -moz-appearance: textfield; }
input[type=search]::-webkit-search-cancel-button { -webkit-appearance: none; display: none; }
input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

/** Inyecta los estilos de animación una sola vez en la raíz de la app. */
export function EstilosApp() {
  return <style>{ESTILOS_APP}</style>;
}

/** ¿El usuario pidió reducir el movimiento en su sistema? */
export function prefiereMenosMovimiento() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/**
 * Número que recorre el camino desde su valor anterior hasta el nuevo. Hace
 * evidente que un resultado cambió al tocar un filtro, sin tener que releerlo.
 */
export function NumeroAnimado({ valor, duracion = 450, formato = (n) => Math.round(n) }) {
  const [mostrado, setMostrado] = useState(valor);
  const desde = useRef(valor);

  useEffect(() => {
    const inicio = desde.current;
    if (inicio === valor || prefiereMenosMovimiento()) {
      desde.current = valor;
      setMostrado(valor);
      return undefined;
    }
    let cuadro;
    const t0 = performance.now();
    const paso = (t) => {
      const avance = Math.min(1, (t - t0) / duracion);
      const suave = 1 - (1 - avance) ** 3;
      const actual = inicio + (valor - inicio) * suave;
      desde.current = actual;
      setMostrado(actual);
      if (avance < 1) cuadro = requestAnimationFrame(paso);
    };
    cuadro = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(cuadro);
  }, [valor, duracion]);

  return <span className="cc-num">{formato(mostrado)}</span>;
}

/**
 * Observa si un elemento está a la vista. Sirve para mostrar atajos flotantes
 * ("Ver 9 productos") solo cuando lo que señalan quedó fuera de la pantalla.
 */
export function useEnPantalla(ref, activo = true) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!activo || !ref.current || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: '0px 0px -80px 0px',
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, activo]);
  return visible;
}

/** Desplaza suavemente hasta un elemento dejando libre el encabezado fijo. */
export function llevarA(elemento, margen = 76) {
  if (!elemento) return;
  const y = elemento.getBoundingClientRect().top + window.scrollY - margen;
  window.scrollTo({ top: Math.max(0, y), behavior: prefiereMenosMovimiento() ? 'auto' : 'smooth' });
}

export default EstilosApp;
