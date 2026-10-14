import React, { useEffect, useId, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Droplet,
  Droplets,
  FlaskConical,
  Info,
  Package,
  Sparkles,
} from 'lucide-react';
import { COLORES } from '../data/taxonomia.js';

/* ────────────────────────────────────────────────────────────────
   GEOMETRÍA DE LA CANECA (unidades del viewBox)
   El cuerpo es un cilindro visto de frente y un poco desde arriba: la boca
   y la base son elipses de radios RADIO_X × RADIO_Y.
   ──────────────────────────────────────────────────────────────── */
const ANCHO_VISTA = 232;
const ALTO_VISTA = 316;
const CENTRO_X = 116;
const RADIO_X = 70;
const RADIO_Y = 19;
const Y_BOCA = 62;
const Y_BASE = 282;
// La cavidad es un poco más angosta que el cuerpo: el grosor de la lámina
const RADIO_X_INTERIOR = 65.5;
const RADIO_Y_INTERIOR = 17.8;
const Y_FONDO_INTERIOR = 280;
// Altura de la superficie del líquido con la caneca llena y vacía
const Y_LLENO = 71;
const Y_VACIO = 277;
// Aros de refuerzo del cuerpo
const Y_ARO_SUPERIOR = 137;
const Y_ARO_INFERIOR = 207;

/** Altura de la superficie del líquido para un nivel entre 0 y 1. */
const yDeNivel = (nivel) => Y_VACIO - nivel * (Y_VACIO - Y_LLENO);

/** Silueta del cuerpo y de la cavidad interior. */
const CONTORNO_CUERPO = `M${CENTRO_X - RADIO_X},${Y_BOCA} A${RADIO_X},${RADIO_Y} 0 0 1 ${CENTRO_X + RADIO_X},${Y_BOCA} L${CENTRO_X + RADIO_X},${Y_BASE} A${RADIO_X},${RADIO_Y} 0 0 1 ${CENTRO_X - RADIO_X},${Y_BASE} Z`;
const CONTORNO_CAVIDAD = `M${CENTRO_X - RADIO_X_INTERIOR},${Y_BOCA} A${RADIO_X_INTERIOR},${RADIO_Y_INTERIOR} 0 0 1 ${CENTRO_X + RADIO_X_INTERIOR},${Y_BOCA} L${CENTRO_X + RADIO_X_INTERIOR},${Y_FONDO_INTERIOR} A${RADIO_X_INTERIOR},${RADIO_Y_INTERIOR} 0 0 1 ${CENTRO_X - RADIO_X_INTERIOR},${Y_FONDO_INTERIOR} Z`;

/** Mitad frontal de la elipse a una altura y: las marcas que rodean el cuerpo. */
const arcoFrontal = (y) => `M${CENTRO_X - RADIO_X},${y} A${RADIO_X},${RADIO_Y} 0 0 0 ${CENTRO_X + RADIO_X},${y}`;
/** Banda curva de cierto alto que abraza el frente del cuerpo (los aros). */
const franjaFrontal = (y, alto) =>
  `M${CENTRO_X - RADIO_X},${y} A${RADIO_X},${RADIO_Y} 0 0 0 ${CENTRO_X + RADIO_X},${y} L${CENTRO_X + RADIO_X},${y + alto} A${RADIO_X},${RADIO_Y} 0 0 1 ${CENTRO_X - RADIO_X},${y + alto} Z`;

/** Color, fondo e ícono de cada familia de pasos del orden de carga. */
const ESTILO_CATEGORIA = {
  agua: { etiqueta: 'Agua', color: COLORES.azul, fondo: COLORES.azulClaro, Icono: Droplets },
  acondicionador: { etiqueta: 'Acondicionador', color: COLORES.teal, fondo: COLORES.tealClaro, Icono: FlaskConical },
  solido: { etiqueta: 'Sólidos', color: COLORES.ambar, fondo: COLORES.ambarClaro, Icono: Package },
  liquido: { etiqueta: 'Líquidos', color: COLORES.naranja, fondo: COLORES.naranjaClaro, Icono: Droplet },
  coadyuvante: { etiqueta: 'Coadyuvantes', color: COLORES.verde, fondo: COLORES.verdeClaro, Icono: Sparkles },
  cierre: { etiqueta: 'Cierre', color: COLORES.tinta, fondo: COLORES.grisClaro, Icono: CircleCheck },
};
const ESTILO_GENERICO = { etiqueta: 'Paso', color: COLORES.gris, fondo: COLORES.grisClaro, Icono: Droplets };
// El agua y su acondicionamiento siempre forman capa, aunque no haya producto
const CATEGORIAS_SIEMPRE_VISIBLES = ['agua', 'acondicionador'];
// Opacidades alternas para que capas vecinas se distingan dentro del líquido
const OPACIDAD_CAPAS = [0.14, 0.24, 0.18, 0.28, 0.16, 0.22, 0.12, 0.26];

const acotarNivel = (valor) => {
  const n = Number(valor);
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0;
};

/**
 * Caneca de 200 L que guía el orden de mezcla.
 *
 * Dibuja una caneca metálica que se va llenando paso a paso según
 * ORDEN_TANQUE: el líquido sube con una transición, cada paso que aporta algo
 * deja una capa visible y al lado se explica qué entra en ese paso, cuáles
 * productos de la mezcla del usuario van ahí y por qué.
 *
 * Props:
 *  - pasos: ORDEN_TANQUE con, en cada paso, productos (los de la mezcla que
 *    entran ahí) y aplica (false si el paso no tiene que ver con la mezcla).
 *  - indiceActivo / onCambiarPaso: paso mostrado; el componente es controlado.
 *  - capacidadLitros: capacidad que se rotula en la caneca.
 *  - color: color del líquido y de los acentos.
 *
 * Es tolerante con datos incompletos (pasos sin nivel, sin siglas, índice
 * fuera de rango) porque no debe romper la pestaña por un dato mal cargado.
 */
export function Caneca({ pasos, indiceActivo = 0, onCambiarPaso, capacidadLitros = 200, color = COLORES.azul }) {
  const pasosValidos = Array.isArray(pasos) ? pasos.filter((p) => p && typeof p == 'object') : [];
  const total = pasosValidos.length;
  const pedido = Number(indiceActivo);
  const indice = total ? Math.min(Math.max(Number.isFinite(pedido) ? Math.trunc(pedido) : 0, 0), total - 1) : 0;
  const [verPorque, setVerPorque] = useState(false);
  const idReact = useId();
  // Prefijo único para los id de los degradados y recortes del SVG: si hay
  // dos canecas en la página no se pisan entre sí.
  const prefijo = `bm${String(idReact).replace(/[^a-zA-Z0-9]/g, '')}`;

  // Al cambiar de paso se cierra la explicación del anterior
  useEffect(() => {
    setVerPorque(false);
  }, [indice]);
  if (total === 0) return null;
  const colorAcento = typeof color == 'string' && color.trim() ? color : COLORES.azul;
  const capacidad =
    Number.isFinite(Number(capacidadLitros)) && Number(capacidadLitros) > 0 ? Number(capacidadLitros) : 200;
  const niveles = [];
  const capas = [];
  // El nivel nunca baja de un paso al siguiente. Cada paso que aporta algo a
  // la mezcla deja una capa entre el nivel anterior y el suyo.
  let nivelPrevio = 0;
  pasosValidos.forEach((paso, i) => {
    const nivel = Math.max(acotarNivel(paso.nivel), nivelPrevio);
    niveles.push(nivel);
    const productos = Array.isArray(paso.productos) ? paso.productos : [];
    const dejaCapa =
      paso.aplica !== false && (productos.length > 0 || CATEGORIAS_SIEMPRE_VISIBLES.indexOf(paso.categoria) !== -1);
    const yTope = yDeNivel(nivel);
    const yPiso = yDeNivel(nivelPrevio);
    if (dejaCapa && yPiso - yTope > 0.4) capas.push({ clave: i, y: yTope, alto: yPiso - yTope, visible: i <= indice });
    nivelPrevio = nivel;
  });
  const actual = pasosValidos[indice];
  const nivelActual = niveles[indice];
  const yLiquido = yDeNivel(nivelActual);
  const litros = nivelActual * capacidad;
  // Litros enteros cuando lo son; si no, un decimal con coma
  const litrosTexto =
    Math.abs(litros - Math.round(litros)) < 0.05 ? String(Math.round(litros)) : litros.toFixed(1).replace('.', ',');
  const porcentaje = Math.round(nivelActual * 100);
  const estilo = ESTILO_CATEGORIA[actual.categoria] || ESTILO_GENERICO;
  const IconoPaso = estilo.Icono;
  const aplica = actual.aplica !== false;
  const productosPaso = Array.isArray(actual.productos) ? actual.productos : [];
  const siglasPaso = Array.isArray(actual.siglas) ? actual.siglas.filter(Boolean) : [];
  const numeroPaso = Number.isFinite(Number(actual.paso)) ? actual.paso : indice + 1;
  const irA = (i) => {
    if (typeof onCambiarPaso != 'function') return;
    if (!Number.isFinite(i) || i < 0 || i > total - 1) return;
    onCambiarPaso(i);
  };

  // El líquido se dibuja con la superficie en y = 0 y se desplaza entero hasta
  // el nivel: así la subida es una sola transición de transform. Las capas van
  // dentro con el desplazamiento contrario para quedarse quietas en su sitio.
  const moverLiquido = { transform: `translate(0px, ${yLiquido}px)` };
  const compensarLiquido = { transform: `translate(0px, ${-yLiquido}px)` };
  const MARCAS = [0.25, 0.5, 0.75, 1];
  return (
    <section>
      <style>{`
        .${prefijo}-anim { transition: transform 620ms cubic-bezier(.33,.02,.15,1); }
        .${prefijo}-fade { transition: opacity 620ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .${prefijo}-anim, .${prefijo}-fade { transition: none; }
        }
      `}</style>
      <div className="grid gap-4 sm:grid-cols-5">
        <div
          className="rounded-2xl border p-3 sm:col-span-2"
          style={{
            borderColor: COLORES.borde,
            backgroundColor: '#fff',
            backgroundImage: `linear-gradient(180deg, #fff 0%, ${COLORES.papel} 100%)`,
            boxShadow: '0 1px 3px rgba(11,36,49,0.08)',
          }}
        >
          <svg
            viewBox={`0 0 ${ANCHO_VISTA} ${ALTO_VISTA}`}
            width="100%"
            className="mx-auto block h-auto"
            style={{ maxWidth: 300 }}
            role="img"
            aria-label={`Caneca de ${capacidad} litros con ${litrosTexto} litros de mezcla, ${porcentaje} por ciento de su capacidad`}
          >
            <defs>
              <linearGradient id={`${prefijo}-acero`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2E3B46" />
                <stop offset="5%" stopColor="#4A5A66" />
                <stop offset="16%" stopColor="#7E919E" />
                <stop offset="28%" stopColor="#C2D0D9" />
                <stop offset="37%" stopColor="#A8B8C3" />
                <stop offset="52%" stopColor="#82949F" />
                <stop offset="68%" stopColor="#63737F" />
                <stop offset="84%" stopColor="#47555F" />
                <stop offset="94%" stopColor="#6E7E89" />
                <stop offset="100%" stopColor="#37444E" />
              </linearGradient>
              <linearGradient id={`${prefijo}-aceroFrente`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2E3B46" stopOpacity="1" />
                <stop offset="7%" stopColor="#4A5A66" stopOpacity="0.94" />
                <stop offset="16%" stopColor="#7E919E" stopOpacity="0.6" />
                <stop offset="28%" stopColor="#C2D0D9" stopOpacity="0.3" />
                <stop offset="41%" stopColor="#A8B8C3" stopOpacity="0.16" />
                <stop offset="56%" stopColor="#8B9DA9" stopOpacity="0.17" />
                <stop offset="69%" stopColor="#63737F" stopOpacity="0.29" />
                <stop offset="83%" stopColor="#4A5862" stopOpacity="0.62" />
                <stop offset="94%" stopColor="#6E7E89" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#37444E" stopOpacity="1" />
              </linearGradient>
              <linearGradient id={`${prefijo}-aro`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3A4854" stopOpacity="1" />
                <stop offset="8%" stopColor="#5E6E7A" stopOpacity="0.96" />
                <stop offset="20%" stopColor="#93A5B1" stopOpacity="0.74" />
                <stop offset="30%" stopColor="#D2DEE6" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#9FB0BB" stopOpacity="0.34" />
                <stop offset="70%" stopColor="#71818D" stopOpacity="0.46" />
                <stop offset="86%" stopColor="#4E5C67" stopOpacity="0.78" />
                <stop offset="100%" stopColor="#3A4854" stopOpacity="1" />
              </linearGradient>
              <linearGradient id={`${prefijo}-metal`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B4A55" />
                <stop offset="16%" stopColor="#8FA2AE" />
                <stop offset="30%" stopColor="#DCE7EE" />
                <stop offset="48%" stopColor="#A3B4BF" />
                <stop offset="70%" stopColor="#6A7A86" />
                <stop offset="88%" stopColor="#9DAFBA" />
                <stop offset="100%" stopColor="#3B4A55" />
              </linearGradient>
              <linearGradient id={`${prefijo}-interior`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#788996" />
                <stop offset="16%" stopColor="#4E5D69" />
                <stop offset="55%" stopColor="#323F49" />
                <stop offset="100%" stopColor="#1E2932" />
              </linearGradient>
              <linearGradient id={`${prefijo}-interiorLados`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0A1218" stopOpacity="0.85" />
                <stop offset="24%" stopColor="#0A1218" stopOpacity="0.16" />
                <stop offset="50%" stopColor="#0A1218" stopOpacity="0" />
                <stop offset="78%" stopColor="#0A1218" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0A1218" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id={`${prefijo}-modelado`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000" stopOpacity="0.46" />
                <stop offset="10%" stopColor="#000" stopOpacity="0.26" />
                <stop offset="26%" stopColor="#fff" stopOpacity="0.34" />
                <stop offset="36%" stopColor="#fff" stopOpacity="0.14" />
                <stop offset="52%" stopColor="#fff" stopOpacity="0" />
                <stop offset="72%" stopColor="#000" stopOpacity="0.18" />
                <stop offset="88%" stopColor="#000" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id={`${prefijo}-superficie`} cx="38%" cy="30%" r="78%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="45%" stopColor="#fff" stopOpacity="0.16" />
                <stop offset="78%" stopColor="#fff" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.16" />
              </radialGradient>
              <radialGradient id={`${prefijo}-brillo`} cx="50%" cy="40%" r="52%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="55%" stopColor="#fff" stopOpacity="0.11" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`${prefijo}-rebote`} cx="50%" cy="52%" r="55%">
                <stop offset="0%" stopColor="#E6F1F8" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#E6F1F8" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`${prefijo}-sombraBoca`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A1218" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#0A1218" stopOpacity="0" />
              </linearGradient>
              <linearGradient id={`${prefijo}-sombraBase`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A1218" stopOpacity="0" />
                <stop offset="100%" stopColor="#0A1218" stopOpacity="0.34" />
              </linearGradient>
              <radialGradient id={`${prefijo}-piso`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0B2431" stopOpacity="0.32" />
                <stop offset="62%" stopColor="#0B2431" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#0B2431" stopOpacity="0" />
              </radialGradient>
              <clipPath id={`${prefijo}-recorteCuerpo`}>
                <path d={CONTORNO_CUERPO} />
              </clipPath>
              <clipPath id={`${prefijo}-recorteCavidad`}>
                <path d={CONTORNO_CAVIDAD} />
              </clipPath>
              <clipPath id={`${prefijo}-bajoSuperficie`}>
                <rect x="-400" y="0" width="1000" height="700" />
              </clipPath>
            </defs>
            <title>{`Caneca de ${capacidad} L llena al ${porcentaje} %`}</title>
            {/* sombra en el piso */}
            <ellipse cx={CENTRO_X} cy={303} rx={86} ry={12} fill={`url(#${prefijo}-piso)`} />
            {/* tapa con sus dos tapones, apoyada detrás */}
            <g opacity="0.95">
              <ellipse cx={CENTRO_X} cy={33} rx={62} ry={26} fill={`url(#${prefijo}-metal)`} />
              <ellipse cx={CENTRO_X} cy={32} rx={55} ry={21} fill={`url(#${prefijo}-acero)`} />
              <ellipse
                cx={CENTRO_X}
                cy={32}
                rx={42}
                ry={15.5}
                fill="none"
                stroke="#fff"
                strokeOpacity="0.16"
                strokeWidth="1.2"
              />
              <ellipse cx={92} cy={25} rx={11.5} ry={6} fill="#8B9CA8" />
              <ellipse cx={92} cy={23.4} rx={9.8} ry={5} fill={`url(#${prefijo}-metal)`} />
              <path d="M85.5,23.2 h13" stroke="#3B4A55" strokeOpacity="0.55" strokeWidth="1.4" />
              <ellipse cx={146} cy={28} rx={7.6} ry={4.2} fill="#8B9CA8" />
              <ellipse cx={146} cy={26.9} rx={6.2} ry={3.4} fill={`url(#${prefijo}-metal)`} />
              <path d="M142.2,26.8 h7.6" stroke="#3B4A55" strokeOpacity="0.55" strokeWidth="1.2" />
            </g>
            {/* cuerpo y cavidad, con el líquido adentro */}
            <path d={CONTORNO_CUERPO} fill={`url(#${prefijo}-acero)`} />
            <g clipPath={`url(#${prefijo}-recorteCavidad)`}>
              <path d={CONTORNO_CAVIDAD} fill={`url(#${prefijo}-interior)`} />
              <path d={CONTORNO_CAVIDAD} fill={`url(#${prefijo}-interiorLados)`} />
              <g className={`${prefijo}-anim`} style={moverLiquido}>
                <rect
                  x={CENTRO_X - RADIO_X_INTERIOR}
                  y={0}
                  width={RADIO_X_INTERIOR * 2}
                  height={330}
                  fill={colorAcento}
                />
                <rect
                  x={CENTRO_X - RADIO_X_INTERIOR}
                  y={0}
                  width={RADIO_X_INTERIOR * 2}
                  height={330}
                  fill={`url(#${prefijo}-modelado)`}
                />
                <g clipPath={`url(#${prefijo}-bajoSuperficie)`}>
                  <g className={`${prefijo}-anim`} style={compensarLiquido}>
                    {capas.map((capa, i) => (
                      <g key={capa.clave} className={`${prefijo}-fade`} style={{ opacity: capa.visible ? 1 : 0 }}>
                        <rect
                          x={CENTRO_X - RADIO_X_INTERIOR}
                          y={capa.y}
                          width={RADIO_X_INTERIOR * 2}
                          height={capa.alto}
                          fill={colorAcento}
                          opacity={OPACIDAD_CAPAS[i % OPACIDAD_CAPAS.length]}
                        />
                        <rect
                          x={CENTRO_X - RADIO_X_INTERIOR}
                          y={capa.y}
                          width={RADIO_X_INTERIOR * 2}
                          height={0.9}
                          fill="#fff"
                          opacity="0.3"
                        />
                      </g>
                    ))}
                  </g>
                </g>
                {/* superficie del líquido */}
                <ellipse cx={CENTRO_X} cy={0} rx={RADIO_X_INTERIOR} ry={RADIO_Y_INTERIOR} fill={colorAcento} />
                <ellipse
                  cx={CENTRO_X}
                  cy={0}
                  rx={RADIO_X_INTERIOR}
                  ry={RADIO_Y_INTERIOR}
                  fill={`url(#${prefijo}-superficie)`}
                />
                <ellipse
                  cx={CENTRO_X}
                  cy={0}
                  rx={RADIO_X_INTERIOR}
                  ry={RADIO_Y_INTERIOR}
                  fill="none"
                  stroke="#fff"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
              </g>
            </g>
            {/* pared frontal translúcida, aros y marcas de nivel */}
            <path d={CONTORNO_CUERPO} fill={`url(#${prefijo}-aceroFrente)`} />
            <g clipPath={`url(#${prefijo}-recorteCuerpo)`}>
              <rect
                x={CENTRO_X - RADIO_X}
                y={Y_BOCA}
                width={RADIO_X * 2}
                height={30}
                fill={`url(#${prefijo}-sombraBoca)`}
              />
              <rect
                x={CENTRO_X - RADIO_X}
                y={Y_BASE - 34}
                width={RADIO_X * 2}
                height={34 + RADIO_Y}
                fill={`url(#${prefijo}-sombraBase)`}
              />
              {[Y_ARO_SUPERIOR, Y_ARO_INFERIOR].map((y) => (
                <g key={y}>
                  <path d={franjaFrontal(y - 5, 10)} fill={`url(#${prefijo}-aro)`} />
                  <path d={arcoFrontal(y - 5)} fill="none" stroke="#0F1A22" strokeOpacity="0.4" strokeWidth="1" />
                  <path d={arcoFrontal(y - 3.4)} fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />
                  <path d={arcoFrontal(y + 5)} fill="none" stroke="#0F1A22" strokeOpacity="0.34" strokeWidth="1" />
                </g>
              ))}
              {MARCAS.map((marca) => {
                const y = yDeNivel(marca);
                return (
                  <g key={marca}>
                    <path d={arcoFrontal(y)} fill="none" stroke="#0B141B" strokeOpacity="0.26" strokeWidth="1" />
                    <path d={arcoFrontal(y + 1.3)} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1" />
                  </g>
                );
              })}
              <rect
                x={70}
                y={Y_BOCA - RADIO_Y}
                width={30}
                height={Y_BASE - Y_BOCA + RADIO_Y * 2}
                fill={`url(#${prefijo}-brillo)`}
              />
              <rect
                x={167}
                y={Y_BOCA - RADIO_Y}
                width={15}
                height={Y_BASE - Y_BOCA + RADIO_Y * 2}
                fill={`url(#${prefijo}-rebote)`}
              />
            </g>
            {/* contorno, base y borde de la boca */}
            <path d={CONTORNO_CUERPO} fill="none" stroke="#16232D" strokeOpacity="0.45" strokeWidth="1.2" />
            <path d={arcoFrontal(Y_BASE)} fill="none" stroke={`url(#${prefijo}-metal)`} strokeWidth="4.5" />
            <path d={arcoFrontal(Y_BASE - 2.6)} fill="none" stroke="#0F1A22" strokeOpacity="0.3" strokeWidth="1" />
            <ellipse
              cx={CENTRO_X}
              cy={Y_BOCA}
              rx={RADIO_X}
              ry={RADIO_Y}
              fill="none"
              stroke={`url(#${prefijo}-metal)`}
              strokeWidth="6.5"
            />
            <ellipse
              cx={CENTRO_X}
              cy={Y_BOCA - 1.4}
              rx={RADIO_X - 1.8}
              ry={RADIO_Y - 1.8}
              fill="none"
              stroke="#fff"
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            <ellipse
              cx={CENTRO_X}
              cy={Y_BOCA}
              rx={RADIO_X_INTERIOR}
              ry={RADIO_Y_INTERIOR}
              fill="none"
              stroke="#0A121A"
              strokeOpacity="0.55"
              strokeWidth="1.6"
            />
            {/* rótulos de litros a la derecha */}
            {MARCAS.map((marca, i) => {
              const y = yDeNivel(marca);
              return (
                <g key={`etq-${marca}`}>
                  <path
                    d={`M${CENTRO_X + RADIO_X},${y} h6`}
                    stroke={COLORES.borde}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <text
                    x={CENTRO_X + RADIO_X + 9}
                    y={y + 3.4}
                    fontSize="9.5"
                    fontWeight="700"
                    fill={COLORES.textoSuave}
                  >
                    {Math.round(marca * capacidad)}
                    {i === MARCAS.length - 1 ? ' L' : ''}
                  </text>
                </g>
              );
            })}
            {/* indicador de litros que acompaña a la superficie */}
            <g className={`${prefijo}-anim`} style={moverLiquido}>
              <path
                d={`M10,0 H${CENTRO_X - RADIO_X_INTERIOR}`}
                stroke={colorAcento}
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.6"
              />
              <rect x={2} y={-9.5} width={44} height={19} rx={6.5} fill={colorAcento} />
              <text x={24} y={4.2} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
                {litrosTexto} L
              </text>
            </g>
          </svg>
          <div className="mt-1 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
              Nivel del tanque
            </p>
            <p className="mt-0.5" style={{ color: COLORES.tinta }}>
              <span className="font-mono text-3xl font-bold">{litrosTexto}</span>
              <span className="ml-1 text-base font-bold">L</span>
            </p>
            <p className="mt-0.5 text-xs" style={{ color: COLORES.textoSuave }}>
              de {capacidad} L · {porcentaje} % de la caneca
            </p>
          </div>
        </div>
        {/* Explicación del paso actual */}
        <div className="sm:col-span-3">
          <div aria-live="polite">
            <div
              className="rounded-2xl border bg-white p-4 transition"
              style={{
                borderColor: COLORES.borde,
                borderLeft: `4px solid ${aplica ? estilo.color : COLORES.borde}`,
                boxShadow: '0 1px 3px rgba(11,36,49,0.08)',
                opacity: aplica ? 1 : 0.58,
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold text-white"
                  style={{ backgroundColor: aplica ? estilo.color : COLORES.gris }}
                >
                  {numeroPaso}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color: aplica ? estilo.color : COLORES.textoSuave }}
                  >
                    <IconoPaso size={13} strokeWidth={2.2} />
                    {estilo.etiqueta}
                  </p>
                  <h3 className="mt-0.5 break-words text-base font-bold leading-tight" style={{ color: COLORES.tinta }}>
                    {actual.que}
                  </h3>
                  {actual.detalle && (
                    <p className="mt-1 break-words text-sm leading-snug" style={{ color: COLORES.textoSuave }}>
                      {actual.detalle}
                    </p>
                  )}
                </div>
              </div>
              {(siglasPaso.length > 0 || !aplica) && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {siglasPaso.map((sigla) => (
                    <span
                      key={sigla}
                      className="rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold"
                      style={{ backgroundColor: estilo.fondo, color: estilo.color }}
                    >
                      {sigla}
                    </span>
                  ))}
                  {!aplica && (
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                      style={{ backgroundColor: COLORES.grisClaro, color: COLORES.textoSuave }}
                    >
                      No aplica a tu mezcla
                    </span>
                  )}
                </div>
              )}
              <p
                className="mt-3 text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: COLORES.textoSuave }}
              >
                Qué entra aquí
              </p>
              {productosPaso.length > 0 ? (
                <ul className="mt-1.5 space-y-1.5">
                  {productosPaso.map((pr, i) => (
                    <li
                      key={pr && pr.id ? pr.id : `pr-${i}`}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                      style={{ backgroundColor: COLORES.papel }}
                    >
                      <span
                        className="min-w-0 flex-1 truncate text-sm font-semibold"
                        style={{ color: COLORES.tinta }}
                        title={pr && pr.nombre ? pr.nombre : ''}
                      >
                        {pr && pr.nombre ? pr.nombre : 'Producto'}
                      </span>
                      {pr && pr.sigla && (
                        <span
                          className="shrink-0 rounded font-mono text-[10px] font-bold"
                          style={{ color: COLORES.textoSuave }}
                        >
                          {pr.sigla}
                        </span>
                      )}
                      {pr && pr.dosis && (
                        <span className="shrink-0 font-mono text-sm font-bold" style={{ color: colorAcento }}>
                          {pr.dosis}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className="mt-1.5 rounded-lg border border-dashed px-3 py-2 text-xs"
                  style={{ borderColor: COLORES.borde, color: COLORES.textoSuave }}
                >
                  Ningún producto de tu mezcla entra en este paso.
                </p>
              )}
              {actual.porque && (
                <>
                  <button
                    type="button"
                    onClick={() => setVerPorque((v) => !v)}
                    aria-expanded={verPorque}
                    aria-label={
                      verPorque
                        ? `Ocultar la explicación del paso ${numeroPaso}`
                        : `Ver por qué se hace el paso ${numeroPaso}`
                    }
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition"
                    style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
                  >
                    <Info size={13} style={{ color: estilo.color }} />
                    ¿Por qué?
                    <ChevronDown
                      size={14}
                      className="transition-transform"
                      style={{ color: COLORES.textoSuave, transform: verPorque ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  {verPorque && (
                    <div
                      className="mt-2 max-h-44 overflow-y-auto overscroll-contain rounded-xl p-3"
                      style={{ backgroundColor: COLORES.papel }}
                    >
                      <p className="break-words text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                        {actual.porque}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => irA(indice - 1)}
              disabled={indice === 0}
              aria-label="Ir al paso anterior de la carga"
              className="flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{ borderColor: COLORES.borde, backgroundColor: '#fff', color: COLORES.tinta }}
            >
              <ChevronLeft size={16} />
              Anterior
            </button>
            <span
              className="flex-1 text-center text-[11px] font-semibold uppercase tracking-wide"
              style={{ color: COLORES.textoSuave }}
            >
              Paso {indice + 1} de {total}
            </span>
            <button
              type="button"
              onClick={() => irA(indice + 1)}
              disabled={indice === total - 1}
              aria-label="Ir al siguiente paso de la carga"
              className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: colorAcento }}
            >
              Siguiente
              <ChevronRight size={16} />
            </button>
          </div>
          {/* Riel con todos los pasos; los que no aplican a la mezcla se atenúan */}
          <nav aria-label="Pasos del orden de carga" className="mt-3">
            <ol className="grid gap-1" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
              {pasosValidos.map((paso, i) => {
                const aplicaPaso = paso.aplica !== false;
                const esActual = i === indice;
                const yaPaso = i < indice;
                const colorRiel = esActual
                  ? colorAcento
                  : aplicaPaso
                    ? yaPaso
                      ? colorAcento
                      : COLORES.borde
                    : COLORES.grisClaro;
                return (
                  <li key={`riel-${i}`} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => irA(i)}
                      aria-current={esActual ? 'step' : undefined}
                      aria-label={`Paso ${Number.isFinite(Number(paso.paso)) ? paso.paso : i + 1}: ${paso.que || 'sin título'}${aplicaPaso ? '' : ' (no aplica a tu mezcla)'}`}
                      className="block w-full rounded-md px-0.5 pb-0.5 pt-1 text-center transition"
                      style={{ opacity: aplicaPaso ? 1 : 0.4 }}
                    >
                      <span
                        className="block rounded-full transition-all"
                        style={{
                          height: esActual ? 6 : 4,
                          backgroundColor: colorRiel,
                          opacity: yaPaso && !esActual ? 0.45 : 1,
                        }}
                      />
                      <span
                        className="mt-1 block font-mono text-[10px] font-bold leading-none"
                        style={{ color: esActual ? colorAcento : COLORES.textoSuave }}
                      >
                        {Number.isFinite(Number(paso.paso)) ? paso.paso : i + 1}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Caneca;
