import React from 'react';
import { COLORES } from '../../data/taxonomia.js';

/**
 * Ilustraciones vectoriales originales.
 *
 * Se dibujan en SVG en vez de usar fotografías por dos razones: las fotos de
 * producto son material con derechos de la empresa, y un esquema explica mejor
 * un proceso invisible (cómo se mueve una molécula dentro de la planta) que una
 * foto del envase. Además escalan sin pesar ni pixelarse.
 */

function Marco({ titulo, pie, children, alto = 220 }) {
  return (
    <figure className="my-4 overflow-hidden rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.09)' }}>
      <div className="flex items-center justify-center px-3 pt-4" style={{ minHeight: alto }}>
        {children}
      </div>
      <figcaption className="px-4 pb-4 pt-2">
        <span className="block text-xs font-bold uppercase tracking-wide" style={{ color: COLORES.tinta }}>
          {titulo}
        </span>
        {pie && (
          <span className="mt-1 block text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
            {pie}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

/** Cómo se mueve un producto dentro de la planta. */
export function IlustracionTranslocacion() {
  const leyenda = [
    { color: COLORES.naranja, nombre: 'Contacto', nota: 'se queda donde cayó' },
    { color: COLORES.teal, nombre: 'Translaminar', nota: 'cruza la hoja' },
    { color: COLORES.azul, nombre: 'Xilema', nota: 'solo sube' },
    { color: '#8B5CF6', nombre: 'Floema', nota: 'baja hasta la raíz' },
  ];
  return (
    <Marco
      titulo="Movimiento dentro de la planta"
      pie="El contacto se queda donde cayó la gota. El translaminar cruza la hoja. El xilema solo sube, por eso protege el brote nuevo. El floema baja, por eso mata rizomas."
      alto={250}
    >
      <svg viewBox="0 0 340 220" className="w-full max-w-sm" role="img" aria-label="Esquema de movimiento del producto en la planta">
        {/* suelo */}
        <rect x="0" y="176" width="340" height="44" fill="#E8E1D6" />

        {/* raíz */}
        <path d="M96 176 L96 196 M96 187 L82 200 M96 187 L110 200"
              stroke="#A98F6F" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* tallo */}
        <line x1="96" y1="178" x2="96" y2="44" stroke={COLORES.verde} strokeWidth="5" strokeLinecap="round" />
        {/* hojas */}
        <path d="M96 138 Q58 126 46 146 Q68 162 96 148 Z" fill={COLORES.verde} opacity="0.75" />
        <path d="M96 100 Q134 88 146 108 Q124 124 96 110 Z" fill={COLORES.verde} opacity="0.75" />
        {/* brote nuevo */}
        <circle cx="96" cy="42" r="7" fill={COLORES.verde} />

        {/* gota de contacto sobre la hoja baja */}
        <circle cx="64" cy="144" r="5" fill={COLORES.naranja} />

        {/* translaminar: cruza el espesor de la hoja superior */}
        <path d="M124 98 L134 110" stroke={COLORES.teal} strokeWidth="2.5"
              strokeLinecap="round" markerEnd="url(#ptl)" />

        {/* xilema: sube por el tallo */}
        <path d="M88 172 L88 56" stroke={COLORES.azul} strokeWidth="2.5"
              strokeDasharray="5 4" markerEnd="url(#pxi)" />

        {/* floema: baja hasta la raíz */}
        <path d="M104 76 L104 192" stroke="#8B5CF6" strokeWidth="2.5"
              strokeDasharray="5 4" markerEnd="url(#pfl)" />

        {/* leyenda, separada del dibujo para que nada se solape */}
        {leyenda.map((l, i) => {
          const y = 46 + i * 38;
          return (
            <g key={l.nombre}>
              <rect x="176" y={y - 14} width="152" height="30" rx="8" fill="#F6F9FB" />
              <circle cx="192" cy={y + 1} r="5.5" fill={l.color} />
              <text x="206" y={y - 1} fontSize="10" fontWeight="800" fill={l.color}>{l.nombre}</text>
              <text x="206" y={y + 11} fontSize="8.5" fill={COLORES.textoSuave}>{l.nota}</text>
            </g>
          );
        })}

        <defs>
          <marker id="pxi" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill={COLORES.azul} />
          </marker>
          <marker id="pfl" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#8B5CF6" />
          </marker>
          <marker id="ptl" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill={COLORES.teal} />
          </marker>
        </defs>
      </svg>
    </Marco>
  );
}

/** Ciclo de vida con metamorfosis completa y dónde pega cada grupo. */
export function IlustracionCicloVida() {
  const etapas = [
    { x: 84, y: 46, r: 20, nombre: 'Huevo', nota: 'IRAC 7C · 15' },
    { x: 236, y: 46, r: 23, nombre: 'Larva', nota: 'IRAC 6 · 22A · 28' },
    { x: 236, y: 146, r: 20, nombre: 'Pupa', nota: 'poco vulnerable' },
    { x: 84, y: 146, r: 20, nombre: 'Adulto', nota: 'IRAC 1A · 3A · 4A' },
  ];
  return (
    <Marco
      titulo="Dónde pega cada grupo en el ciclo"
      pie="La larva pequeña es el eslabón más vulnerable y el más barato de controlar. La pupa casi no se puede tocar. Un regulador aplicado sobre adultos parece fallar, pero corta la generación siguiente."
      alto={230}
    >
      <svg viewBox="0 0 320 190" className="w-full max-w-sm" role="img" aria-label="Ciclo de vida del insecto y grupos que actúan en cada estadio">
        {/* flechas del ciclo */}
        <path d="M110 38 Q160 20 208 38" stroke={COLORES.borde} strokeWidth="2.5" fill="none" markerEnd="url(#f1)" />
        <path d="M262 66 Q280 96 262 126" stroke={COLORES.borde} strokeWidth="2.5" fill="none" markerEnd="url(#f1)" />
        <path d="M210 156 Q160 174 112 156" stroke={COLORES.borde} strokeWidth="2.5" fill="none" markerEnd="url(#f1)" />
        <path d="M58 126 Q40 96 58 66" stroke={COLORES.borde} strokeWidth="2.5" fill="none" markerEnd="url(#f1)" />

        {etapas.map((e, i) => (
          <g key={e.nombre}>
            <circle
              cx={e.x} cy={e.y} r={e.r}
              fill={i === 1 ? COLORES.azul : i === 2 ? COLORES.grisClaro : COLORES.azulClaro}
              stroke={i === 2 ? COLORES.borde : COLORES.azul}
              strokeWidth="2"
            />
            <text
              x={e.x} y={e.y + 4} fontSize="9.5" textAnchor="middle" fontWeight="700"
              fill={i === 1 ? '#fff' : COLORES.tinta}
            >
              {e.nombre}
            </text>
            <text
              x={e.x} y={e.y + e.r + 14} fontSize="8" textAnchor="middle"
              fill={i === 2 ? COLORES.textoSuave : COLORES.azul} fontWeight="600"
            >
              {e.nota}
            </text>
          </g>
        ))}
        <defs>
          <marker id="f1" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={COLORES.borde} />
          </marker>
        </defs>
      </svg>
    </Marco>
  );
}

/** Hongo verdadero frente a oomiceto. */
export function IlustracionHongoOomiceto() {
  return (
    <Marco
      titulo="Hongo verdadero frente a oomiceto"
      pie="El oomiceto no tiene ergosterol en la membrana, así que un triazol no encuentra blanco. Tampoco tiene quitina en la pared. Necesita grupos específicos: FRAC 28, 33 y 43."
      alto={210}
    >
      <svg viewBox="0 0 320 190" className="w-full max-w-sm" role="img" aria-label="Comparación entre hongo verdadero y oomiceto">
        {/* Hongo */}
        <g>
          <circle cx="80" cy="76" r="46" fill={COLORES.tealClaro} stroke={COLORES.teal} strokeWidth="3" />
          <circle cx="80" cy="76" r="34" fill="#fff" stroke={COLORES.teal} strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="80" cy="76" r="12" fill={COLORES.teal} opacity="0.35" />
          <text x="80" y="22" fontSize="11" textAnchor="middle" fontWeight="800" fill={COLORES.teal}>HONGO</text>
          <text x="80" y="140" fontSize="9" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Pared: quitina</text>
          <text x="80" y="152" fontSize="9" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Membrana: ergosterol</text>
          <text x="80" y="170" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>FRAC 1 · 3 · 7 · 11</text>
        </g>

        {/* separador */}
        <line x1="160" y1="30" x2="160" y2="164" stroke={COLORES.borde} strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Oomiceto */}
        <g>
          <circle cx="240" cy="76" r="46" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="3" />
          <circle cx="240" cy="76" r="34" fill="#fff" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="240" cy="76" r="12" fill="#8B5CF6" opacity="0.3" />
          {/* flagelo de la zoospora */}
          <path d="M278 96 q16 8 10 20 q-4 8 6 10" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="240" y="22" fontSize="11" textAnchor="middle" fontWeight="800" fill="#8B5CF6">OOMICETO</text>
          <text x="240" y="140" fontSize="9" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Pared: celulosa</text>
          <text x="240" y="152" fontSize="9" textAnchor="middle" fill="#C2410C" fontWeight="700">Sin ergosterol</text>
          <text x="240" y="170" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>FRAC 28 · 33 · 43</text>
        </g>
      </svg>
    </Marco>
  );
}

/** Los tres tipos de arvense y por qué responden distinto. */
export function IlustracionArvenses() {
  return (
    <Marco
      titulo="Los tres tipos de arvense"
      pie="La gramínea protege su meristemo en la base, por eso resiste el corte y las auxinas. La ciperácea guarda reservas en tubérculos, por eso rebrota si solo se quema la parte aérea."
      alto={215}
    >
      <svg viewBox="0 0 320 195" className="w-full max-w-sm" role="img" aria-label="Hoja ancha, gramínea y ciperácea">
        <rect x="0" y="150" width="320" height="45" fill="#E5DED4" />

        {/* Hoja ancha */}
        <g>
          <line x1="55" y1="150" x2="55" y2="80" stroke={COLORES.naranja} strokeWidth="3.5" />
          <path d="M55 108 Q28 96 20 114 Q38 128 55 116 Z" fill={COLORES.naranja} opacity="0.8" />
          <path d="M55 96 Q82 84 90 102 Q72 116 55 104 Z" fill={COLORES.naranja} opacity="0.8" />
          <circle cx="55" cy="76" r="6" fill={COLORES.naranja} />
          <text x="55" y="62" fontSize="9" textAnchor="middle" fontWeight="800" fill={COLORES.naranja}>HOJA ANCHA</text>
          <text x="55" y="168" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>Meristemo</text>
          <text x="55" y="178" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>expuesto</text>
          <text x="55" y="190" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>HRAC 4</text>
        </g>

        {/* Gramínea */}
        <g>
          <path d="M160 150 Q152 116 140 92" stroke={COLORES.verde} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M160 150 Q166 114 178 88" stroke={COLORES.verde} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M160 150 Q160 118 158 96" stroke={COLORES.verde} strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="160" cy="147" r="5" fill={COLORES.verde} />
          <text x="160" y="62" fontSize="9" textAnchor="middle" fontWeight="800" fill={COLORES.verde}>GRAMÍNEA</text>
          <text x="160" y="168" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>Meristemo</text>
          <text x="160" y="178" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>protegido</text>
          <text x="160" y="190" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>HRAC 1</text>
        </g>

        {/* Ciperácea */}
        <g>
          <path d="M262 150 L252 94 M262 150 L272 92 M262 150 L262 88" stroke="#0E7490" strokeWidth="3" strokeLinecap="round" />
          {/* tubérculo */}
          <ellipse cx="262" cy="168" rx="9" ry="7" fill="#8B5A2B" />
          <line x1="262" y1="150" x2="262" y2="162" stroke="#8B5A2B" strokeWidth="2.5" />
          <text x="262" y="62" fontSize="9" textAnchor="middle" fontWeight="800" fill="#0E7490">CIPERÁCEA</text>
          <text x="262" y="186" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>Tubérculo</text>
          <text x="262" y="190" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>HRAC 2</text>
        </g>
      </svg>
    </Marco>
  );
}

/** Cómo se instala la resistencia en una población. */
export function IlustracionResistencia() {
  const generaciones = [
    { titulo: 'Inicio', resistentes: 1, total: 16 },
    { titulo: 'Tras 1 uso', resistentes: 3, total: 12 },
    { titulo: 'Tras 3 usos', resistentes: 7, total: 9 },
    { titulo: 'Falla', resistentes: 12, total: 12 },
  ];
  return (
    <Marco
      titulo="Cómo se instala la resistencia"
      pie="El producto no crea individuos resistentes: ya existían por azar. Lo que hace el uso repetido del mismo sitio de acción es eliminar a los sensibles y dejar que los resistentes se queden con la población."
      alto={215}
    >
      <svg viewBox="0 0 320 195" className="w-full max-w-sm" role="img" aria-label="Selección de individuos resistentes generación tras generación">
        {generaciones.map((g, gi) => {
          const x0 = 12 + gi * 78;
          const puntos = [];
          for (let i = 0; i < g.total; i += 1) {
            const fila = Math.floor(i / 4);
            const col = i % 4;
            puntos.push({
              cx: x0 + 10 + col * 15,
              cy: 42 + fila * 16,
              res: i < g.resistentes,
            });
          }
          return (
            <g key={g.titulo}>
              <rect
                x={x0} y={22} width="66" height="86" rx="9"
                fill={gi === 3 ? '#FDF3EE' : '#F7FAFC'}
                stroke={gi === 3 ? '#E9A98A' : COLORES.borde}
                strokeWidth="1.5"
              />
              {puntos.map((p, i) => (
                <circle
                  key={i} cx={p.cx} cy={p.cy} r="4.5"
                  fill={p.res ? '#C2410C' : COLORES.azul}
                  opacity={p.res ? 1 : 0.55}
                />
              ))}
              <text x={x0 + 33} y={16} fontSize="9" textAnchor="middle" fontWeight="700" fill={COLORES.tinta}>
                {g.titulo}
              </text>
              {gi < 3 && (
                <path
                  d={`M${x0 + 68} 64 L${x0 + 76} 64`}
                  stroke={COLORES.borde} strokeWidth="2" markerEnd="url(#fr)"
                />
              )}
            </g>
          );
        })}
        {/* leyenda */}
        <circle cx="90" cy="140" r="5" fill={COLORES.azul} opacity="0.55" />
        <text x="102" y="144" fontSize="9" fill={COLORES.tinta}>Sensible</text>
        <circle cx="176" cy="140" r="5" fill="#C2410C" />
        <text x="188" y="144" fontSize="9" fill={COLORES.tinta}>Resistente</text>
        <text x="160" y="170" fontSize="9" textAnchor="middle" fontWeight="700" fill="#C2410C">
          Rotar el sitio de acción rompe esta secuencia
        </text>
        <defs>
          <marker id="fr" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={COLORES.borde} />
          </marker>
        </defs>
      </svg>
    </Marco>
  );
}

/** Preventivo, curativo y erradicante sobre la línea del tiempo de la infección. */
export function IlustracionMomentoFungicida() {
  const hitos = [
    { x: 40, label: 'Espora', sub: 'llega' },
    { x: 120, label: 'Germina', sub: 'penetra' },
    { x: 200, label: 'Coloniza', sub: 'sin síntoma' },
    { x: 278, label: 'Lesión', sub: 'esporula' },
  ];
  return (
    <Marco
      titulo="Cuándo actúa cada fungicida"
      pie="La ventana curativa es corta y ocurre antes de que se vea nada. Cuando la lesión ya es visible, casi ningún producto la revierte: lo que se evalúa es si aparecen lesiones nuevas."
      alto={195}
    >
      <svg viewBox="0 0 320 175" className="w-full max-w-sm" role="img" aria-label="Línea de tiempo de la infección y ventanas de acción">
        <line x1="20" y1="70" x2="300" y2="70" stroke={COLORES.borde} strokeWidth="2.5" />
        {hitos.map((h) => (
          <g key={h.label}>
            <circle cx={h.x} cy="70" r="6" fill="#fff" stroke={COLORES.teal} strokeWidth="2.5" />
            <text x={h.x} y="52" fontSize="9" textAnchor="middle" fontWeight="700" fill={COLORES.tinta}>{h.label}</text>
            <text x={h.x} y="42" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>{h.sub}</text>
          </g>
        ))}

        {/* bandas de acción */}
        <rect x="20" y="88" width="92" height="20" rx="10" fill={COLORES.tealClaro} />
        <text x="66" y="102" fontSize="9" textAnchor="middle" fontWeight="700" fill={COLORES.teal}>PREVENTIVO</text>

        <rect x="118" y="114" width="90" height="20" rx="10" fill={COLORES.azulClaro} />
        <text x="163" y="128" fontSize="9" textAnchor="middle" fontWeight="700" fill={COLORES.azul}>CURATIVO</text>

        <rect x="214" y="140" width="90" height="20" rx="10" fill="#FBE3D4" />
        <text x="259" y="154" fontSize="9" textAnchor="middle" fontWeight="700" fill="#C2410C">ERRADICANTE</text>
        <text x="259" y="172" fontSize="7.5" textAnchor="middle" fill={COLORES.textoSuave}>muy pocos lo logran</text>
      </svg>
    </Marco>
  );
}

/* ────────────────────────────────────────────────────────────────
   RECONOCER EL ESTRÉS EN CAMPO
   Diagnóstico diferencial: antes de decidir qué aplicar hay que saber
   qué se está viendo, y muchas veces la respuesta es no aplicar nada.
   ──────────────────────────────────────────────────────────────── */

/** Silueta de hoja reutilizable para los esquemas de daño. */
function Hoja({ x, y, children, color = '#7FB069' }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 -34 C24 -24 34 -4 30 18 C26 36 10 44 0 44 C-10 44 -26 36 -30 18 C-34 -4 -24 -24 0 -34 Z"
        fill={color}
      />
      <line x1="0" y1="-30" x2="0" y2="42" stroke="#5C8F4B" strokeWidth="1.6" />
      <path
        d="M0 -14 L-16 -4 M0 -14 L16 -4 M0 4 L-18 14 M0 4 L18 14 M0 20 L-14 28 M0 20 L14 28"
        stroke="#5C8F4B" strokeWidth="1" fill="none" opacity="0.6"
      />
      {children}
    </g>
  );
}

/** Cuatro causas distintas que se confunden en campo. */
export function IlustracionPatronesDano() {
  return (
    <Marco
      titulo="Cuatro causas que se confunden"
      pie="Antes de escoger producto hay que saber qué se está viendo. Un borde comido no se trata igual que una clorosis internerval, y la fitotoxicidad no se trata en absoluto: se corrige la práctica."
      alto={250}
    >
      <svg viewBox="0 0 340 210" className="w-full max-w-sm" role="img" aria-label="Daño por plaga, enfermedad, deficiencia y fitotoxicidad">
        {/* PLAGA: tejido faltante en bordes */}
        <Hoja x={48} y={62}>
          <path d="M-30 6 q10 -12 20 -2 q-10 10 -20 2 Z" fill="#fff" />
          <path d="M30 -2 q-12 -10 -20 2 q10 10 20 -2 Z" fill="#fff" />
          <circle cx="6" cy="26" r="7" fill="#fff" />
        </Hoja>
        <text x="48" y="122" fontSize="9.5" textAnchor="middle" fontWeight="800" fill={COLORES.azul}>PLAGA</text>
        <text x="48" y="136" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Tejido faltante,</text>
        <text x="48" y="146" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>bordes irregulares</text>
        <text x="48" y="162" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Insecticida</text>

        {/* ENFERMEDAD: lesión con halo */}
        <Hoja x={130} y={62}>
          <circle cx="-8" cy="-4" r="8" fill="#B08968" />
          <circle cx="-8" cy="-4" r="11" fill="none" stroke="#D9C05A" strokeWidth="2.5" opacity="0.85" />
          <circle cx="12" cy="20" r="6" fill="#B08968" />
          <circle cx="12" cy="20" r="9" fill="none" stroke="#D9C05A" strokeWidth="2" opacity="0.85" />
        </Hoja>
        <text x="130" y="122" fontSize="9.5" textAnchor="middle" fontWeight="800" fill={COLORES.teal}>ENFERMEDAD</text>
        <text x="130" y="136" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Lesión definida</text>
        <text x="130" y="146" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>con halo</text>
        <text x="130" y="162" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Fungicida</text>

        {/* DEFICIENCIA: clorosis internerval con nervadura verde */}
        <Hoja x={212} y={62} color="#E3D45C">
          <line x1="0" y1="-30" x2="0" y2="42" stroke="#5C8F4B" strokeWidth="3" />
          <path
            d="M0 -14 L-16 -4 M0 -14 L16 -4 M0 4 L-18 14 M0 4 L18 14 M0 20 L-14 28 M0 20 L14 28"
            stroke="#5C8F4B" strokeWidth="2.4" fill="none"
          />
        </Hoja>
        <text x="212" y="122" fontSize="9.5" textAnchor="middle" fontWeight="800" fill="#B45309">DEFICIENCIA</text>
        <text x="212" y="136" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Amarillo entre</text>
        <text x="212" y="146" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>nervaduras verdes</text>
        <text x="212" y="162" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Nutrición</text>

        {/* FITOTOXICIDAD: quema de borde y punta */}
        <Hoja x={294} y={62}>
          <path
            d="M0 -34 C24 -24 34 -4 30 18 C26 36 10 44 0 44 C-10 44 -26 36 -30 18 C-34 -4 -24 -24 0 -34 Z"
            fill="none" stroke="#A0522D" strokeWidth="6" opacity="0.85"
          />
          <path d="M-16 34 q16 12 32 0 q-16 8 -32 0 Z" fill="#A0522D" />
        </Hoja>
        <text x="294" y="122" fontSize="9" textAnchor="middle" fontWeight="800" fill="#C2410C">FITOTOXICIDAD</text>
        <text x="294" y="136" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Quema de borde</text>
        <text x="294" y="146" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>y punta, uniforme</text>
        <text x="294" y="162" fontSize="8.5" textAnchor="middle" fill="#C2410C" fontWeight="700">No aplicar</text>

        <line x1="12" y1="180" x2="328" y2="180" stroke={COLORES.borde} strokeWidth="1" />
        <text x="170" y="196" fontSize="8.5" textAnchor="middle" fill={COLORES.textoSuave}>
          La misma hoja amarilla puede ser cuatro problemas distintos
        </text>
      </svg>
    </Marco>
  );
}

/** El patrón en el lote distingue causa biótica de abiótica. */
export function IlustracionPatronLote() {
  const foco = [[52, 52], [64, 60], [46, 66], [58, 74], [120, 96], [130, 104]];
  return (
    <Marco
      titulo="El patrón en el lote es la primera pista"
      pie="Un daño en focos que se expande indica algo vivo que se reproduce y se mueve. Un daño uniforme o que sigue la topografía suele ser agua, suelo, nutrición o una aplicación mal hecha."
      alto={225}
    >
      <svg viewBox="0 0 340 200" className="w-full max-w-sm" role="img" aria-label="Patrón en focos frente a patrón por zonas en el lote">
        {/* Lote con focos */}
        <rect x="16" y="26" width="140" height="110" rx="6" fill="#EAF2E4" stroke="#B9CDAD" strokeWidth="1.5" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={16 + i * 20} y1="26" x2={16 + i * 20} y2="136" stroke="#D3E0C9" strokeWidth="1" />
        ))}
        {foco.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" fill="#C2410C" opacity="0.55" />
        ))}
        <circle cx="56" cy="62" r="26" fill="none" stroke="#C2410C" strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="86" y="18" fontSize="9.5" textAnchor="middle" fontWeight="800" fill="#C2410C">EN FOCOS</text>
        <text x="86" y="152" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Plaga o enfermedad</text>
        <text x="86" y="164" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Se expande desde un punto</text>
        <text x="86" y="180" fontSize="8" textAnchor="middle" fill={COLORES.verde} fontWeight="700">Tratar el foco primero</text>

        {/* Lote por zonas */}
        <rect x="184" y="26" width="140" height="110" rx="6" fill="#EAF2E4" stroke="#B9CDAD" strokeWidth="1.5" />
        <path d="M184 96 L324 76 L324 136 L184 136 Z" fill="#D9A441" opacity="0.45" />
        <path d="M184 96 L324 76" stroke="#B4832B" strokeWidth="1.6" strokeDasharray="5 3" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={184 + i * 20} y1="26" x2={184 + i * 20} y2="136" stroke="#D3E0C9" strokeWidth="1" />
        ))}
        <text x="254" y="18" fontSize="9.5" textAnchor="middle" fontWeight="800" fill="#B45309">POR ZONAS</text>
        <text x="254" y="152" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Suelo, agua o nutrición</text>
        <text x="254" y="164" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Sigue la parte baja o el tipo de suelo</text>
        <text x="254" y="180" fontSize="8" textAnchor="middle" fill="#C2410C" fontWeight="700">Un plaguicida no lo corrige</text>
      </svg>
    </Marco>
  );
}

/** Tipos de estrés abiótico y la respuesta agronómica de cada uno. */
export function IlustracionEstresAbiotico() {
  // Los iconos se dibujan con primitivas SVG y no con glifos unicode: si la
  // fuente del dispositivo no tiene el carácter, queda un hueco vacío.
  const casos = [
    {
      x: 46,
      color: '#D97706',
      t: 'Calor',
      sintoma: ['Hoja acopada,', 'estomas cerrados'],
      respuesta: ['Aminoácidos', 'y calcio'],
      icono: (
        <g>
          <circle cx="0" cy="0" r="7" fill="#D97706" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={a}
              x1={9 * Math.cos((a * Math.PI) / 180)}
              y1={9 * Math.sin((a * Math.PI) / 180)}
              x2={13 * Math.cos((a * Math.PI) / 180)}
              y2={13 * Math.sin((a * Math.PI) / 180)}
              stroke="#D97706"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </g>
      ),
    },
    {
      x: 132,
      color: '#0E7490',
      t: 'Déficit hídrico',
      sintoma: ['Marchitez que', 'revive de noche'],
      respuesta: ['Riego, algas', 'y potasio'],
      icono: <path d="M0 -13 C7 -4 11 2 11 6 A11 11 0 0 1 -11 6 C-11 2 -7 -4 0 -13 Z" fill="#0E7490" />,
    },
    {
      x: 218,
      color: '#6366F1',
      t: 'Frío',
      sintoma: ['Tonos morados,', 'crecimiento lento'],
      respuesta: ['Aminoácidos', 'y fósforo'],
      icono: (
        <g stroke="#6366F1" strokeWidth="2" strokeLinecap="round">
          {[0, 60, 120].map((a) => (
            <line
              key={a}
              x1={-12 * Math.cos((a * Math.PI) / 180)}
              y1={-12 * Math.sin((a * Math.PI) / 180)}
              x2={12 * Math.cos((a * Math.PI) / 180)}
              y2={12 * Math.sin((a * Math.PI) / 180)}
            />
          ))}
        </g>
      ),
    },
    {
      x: 304,
      color: '#92400E',
      t: 'Salinidad',
      sintoma: ['Quema de punta,', 'raíz corta'],
      respuesta: ['Lavado', 'y húmicos'],
      icono: (
        <g fill="#92400E">
          <rect x="-11" y="-9" width="7" height="7" rx="1.5" />
          <rect x="2" y="-11" width="6" height="6" rx="1.5" />
          <rect x="-6" y="2" width="8" height="8" rx="1.5" />
          <rect x="5" y="1" width="5" height="5" rx="1.5" />
        </g>
      ),
    },
  ];

  return (
    <Marco
      titulo="Estrés abiótico: qué se ve y qué hacer"
      pie="El estrés abiótico no se controla con un plaguicida: se corrige la causa y se acompaña la recuperación. Aplicar un fitosanitario sobre planta estresada suele empeorar el cuadro por fitotoxicidad."
      alto={240}
    >
      <svg viewBox="0 0 340 205" className="w-full max-w-sm" role="img" aria-label="Tipos de estrés abiótico, síntoma y respuesta agronómica">
        {casos.map((c) => (
          <g key={c.t}>
            <circle cx={c.x} cy="32" r="21" fill="#fff" stroke={c.color} strokeWidth="2" />
            <g transform={`translate(${c.x} 32)`}>{c.icono}</g>

            <text x={c.x} y="70" fontSize="9" textAnchor="middle" fontWeight="800" fill={c.color}>
              {c.t}
            </text>

            {c.sintoma.map((linea, i) => (
              <text key={linea} x={c.x} y={86 + i * 11} fontSize="7.5" textAnchor="middle" fill={COLORES.textoSuave}>
                {linea}
              </text>
            ))}

            <rect x={c.x - 38} y="114" width="76" height="34" rx="8" fill="#EAF2E4" />
            {c.respuesta.map((linea, i) => (
              <text key={linea} x={c.x} y={130 + i * 11} fontSize="8" textAnchor="middle" fontWeight="700" fill="#3F6B33">
                {linea}
              </text>
            ))}
          </g>
        ))}

        <line x1="12" y1="166" x2="328" y2="166" stroke={COLORES.borde} strokeWidth="1" />
        <text x="170" y="184" fontSize="8.5" textAnchor="middle" fill={COLORES.textoSuave}>
          Corregir la causa primero; el bioestimulante acompaña, no sustituye
        </text>
      </svg>
    </Marco>
  );
}

/** Mapa de ilustraciones por tema del módulo Aprender. */
export const ILUSTRACIONES_POR_TEMA = {
  resistencia: [IlustracionResistencia],
  translocacion: [IlustracionTranslocacion],
  arvenses: [IlustracionArvenses],
  hongos: [IlustracionHongoOomiceto, IlustracionMomentoFungicida],
  insectos: [IlustracionCicloVida],
  estres: [IlustracionPatronesDano, IlustracionPatronLote, IlustracionEstresAbiotico],
};

export default ILUSTRACIONES_POR_TEMA;
