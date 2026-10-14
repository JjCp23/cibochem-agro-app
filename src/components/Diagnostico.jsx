import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  ArrowDown,
  RotateCcw,
  SearchX,
  Activity,
  Search,
  Check,
  Star,
  Clock,
  Pencil,
  ShieldCheck,
  Egg,
  Bug,
  Siren,
  Repeat,
  Sprout,
  Leaf,
  Tractor,
  HeartPulse,
  Shovel,
  Flower2,
  Apple,
  ThermometerSun,
  Route,
  Download,
} from 'lucide-react';
import { RAMAS, COLORES, COLOR_CATEGORIA, FONDO_CATEGORIA } from '../data/taxonomia.js';
import { PRODUCTOS } from '../data/productos.js';
import { recomendar, construirPrograma } from '../motores/index.js';
import {
  FAVORITOS,
  RECIENTES,
  INSTALACION,
  useAlmacen,
  usePersistente,
  productosDeIds,
} from '../estado/memoria.js';
import { FilaMenu, Hexagono, Chip, EstadoVacio } from './ui/Superficie.jsx';
import { SelloGrupo } from './ui/Etiqueta.jsx';
import { ICONO_RAMA, ICONO_CATEGORIA, Icono3D } from './ui/Iconos.jsx';
import { iconoDeProducto } from '../data/iconos3d.js';
import { NumeroAnimado, useEnPantalla, llevarA } from './ui/Movimiento.jsx';
import { SelectorProducto } from './ui/SelectorProducto.jsx';
import { TarjetaProducto } from './TarjetaProducto.jsx';

// Un icono por momento ayuda a ubicar la opción sin leerla entera
const ICONO_MOMENTO = {
  'preventivo-vector': ShieldCheck,
  'larvas-tempranas': Egg,
  'larvas-activas': Bug,
  'poblacion-establecida': Siren,
  'preventivo-poblacional': Repeat,
  siembra: Sprout,
  preemergente: ShieldCheck,
  'postemergente-temprana': Sprout,
  postemergente: Leaf,
  'preparacion-lote': Tractor,
  preventivo: ShieldCheck,
  curativo: HeartPulse,
  trasplante: Shovel,
  brotacion: Sprout,
  vegetativo: Leaf,
  floracion: Flower2,
  llenado: Apple,
  estres: ThermometerSun,
};

function saludoDelDia(fecha = new Date()) {
  const h = fecha.getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

function Opcion({ label, ayuda, activo, onClick, color, icono: Icono, imagen }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={activo}
      className="cc-presionable relative flex items-start gap-2.5 rounded-2xl border bg-white p-3 text-left"
      style={{
        borderColor: activo ? color : COLORES.borde,
        backgroundColor: activo ? `${color}12` : '#fff',
        boxShadow: activo ? `inset 0 0 0 1px ${color}` : undefined,
      }}
    >
      {imagen && <Icono3D nombre={imagen} tamano={38} respaldo={Icono} color={color} className="shrink-0" />}
      {Icono && !imagen && (
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: activo ? color : `${color}14` }}
        >
          <Icono size={14} color={activo ? '#fff' : color} strokeWidth={2.2} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block pr-4 text-sm font-semibold leading-snug" style={{ color: COLORES.tinta }}>
          {label}
        </span>
        {ayuda && (
          <span className="mt-0.5 block text-xs leading-snug" style={{ color: COLORES.textoSuave }}>
            {ayuda}
          </span>
        )}
      </span>
      {activo && (
        <span
          className="cc-pop absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full"
          style={{ backgroundColor: color }}
        >
          <Check size={12} color="#fff" strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

function Paso({ numero, titulo, nota, children, color }) {
  return (
    <section className="cc-entrada mt-6">
      <div className="flex items-center gap-2">
        <span
          className="cc-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {numero}
        </span>
        <h3 className="text-sm font-bold" style={{ color: COLORES.tinta }}>
          {titulo}
        </h3>
        {nota && (
          <span className="text-[11px] font-medium" style={{ color: COLORES.textoSuave }}>
            {nota}
          </span>
        )}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Barra de avance del asistente: objetivo → afinar → resultados. */
function Progreso({ etapa, color }) {
  const etapas = ['Objetivo', 'Afinar', 'Resultados'];
  return (
    <div className="mt-4">
      <div className="flex gap-1.5">
        {etapas.map((e, i) => (
          <span key={e} className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: COLORES.borde }}>
            <span
              className="cc-barra-progreso block h-full rounded-full"
              style={{ width: i < etapa ? '100%' : '0%', backgroundColor: color }}
            />
          </span>
        ))}
      </div>
      <div className="mt-1.5 flex">
        {etapas.map((e, i) => (
          <span
            key={e}
            className="flex-1 text-[10px] font-bold uppercase tracking-wide transition-colors"
            style={{ color: i < etapa ? color : COLORES.textoSuave }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Programa de rotación sugerido: el motor arma una secuencia de pases donde
 * ninguno repite sitio de acción con los anteriores (ni con lo último que se
 * aplicó, si se indicó).
 */
function ProgramaSugerido({ programa, color, onAbrirProducto, ultimoUsado }) {
  return (
    <div className="cc-entrada mt-4 rounded-3xl bg-white p-4" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}>
      <p className="flex items-center gap-2 text-sm font-bold" style={{ color: COLORES.tinta }}>
        <Route size={16} style={{ color }} /> Programa de rotación sugerido
      </p>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
        {programa.length} pases sin repetir sitio de acción
        {ultimoUsado ? `, empezando después de ${ultimoUsado.nombre}` : ''}. Toca uno para ver su ficha.
      </p>
      <ol className="cc-escalonado mt-3">
        {programa.map((p, i) => (
          <li key={p.id} className="relative flex gap-3 pb-3 last:pb-0">
            {i < programa.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-[15px] top-8 w-0.5"
                style={{ backgroundColor: `${color}33` }}
              />
            )}
            <span
              className="cc-num relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: color }}
            >
              {i + 1}
            </span>
            <button
              onClick={() => onAbrirProducto(p)}
              className="cc-presionable min-w-0 flex-1 rounded-2xl border px-3 py-2 text-left"
              style={{ borderColor: COLORES.borde }}
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold" style={{ color: COLORES.tinta }}>
                  {p.nombre}
                </span>
                <SelloGrupo sistema={p.sistema} grupo={p.grupo} color={color} />
              </span>
              <span className="mt-0.5 block truncate text-xs" style={{ color: COLORES.textoSuave }}>
                Pase {i + 1} · {p.familia}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Invitación a instalar la app. Solo aparece cuando el navegador lo permite
 * (Android y escritorio) y se puede descartar para siempre.
 */
function TarjetaInstalar() {
  const [evento, setEvento] = useAlmacen(INSTALACION);
  const [descartada, setDescartada] = usePersistente('cibo:instalar:descartada', false);
  if (!evento || descartada) return null;

  const instalar = async () => {
    evento.prompt();
    try {
      await evento.userChoice;
    } finally {
      setEvento(null);
    }
  };

  return (
    <div
      className="cc-entrada mt-4 flex items-center gap-3 rounded-3xl bg-white p-4"
      style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}
    >
      <span
        className="cc-latido flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
        style={{ backgroundColor: COLORES.azul }}
      >
        <Download size={20} color="#fff" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold" style={{ color: COLORES.tinta }}>
          Instálala en tu teléfono
        </span>
        <span className="block text-xs leading-snug" style={{ color: COLORES.textoSuave }}>
          Se abre como una app y funciona en el lote sin señal.
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1">
        <button
          onClick={instalar}
          className="cc-presionable rounded-full px-3.5 py-1.5 text-xs font-bold text-white"
          style={{ backgroundColor: COLORES.azul }}
        >
          Instalar
        </button>
        <button
          onClick={() => setDescartada(true)}
          className="text-[11px] font-semibold"
          style={{ color: COLORES.textoSuave }}
        >
          Ahora no
        </button>
      </span>
    </div>
  );
}

/** Pantalla de inicio: saludo, buscador, ramas del diagnóstico y accesos. */
function InicioDiagnostico({ onEscogerRama, onVerCiclo, onBuscar, onAbrirProducto }) {
  const [favoritosIds] = useAlmacen(FAVORITOS);
  const [recientesIds] = useAlmacen(RECIENTES);
  const favoritos = useMemo(() => productosDeIds(favoritosIds, PRODUCTOS), [favoritosIds]);
  const recientes = useMemo(() => productosDeIds(recientesIds, PRODUCTOS).slice(0, 6), [recientesIds]);

  return (
    <div>
      {/* Bienvenida con buscador */}
      <div
        className="cc-entrada relative overflow-hidden rounded-3xl p-5"
        style={{ background: `linear-gradient(140deg, ${COLORES.azulClaro} 0%, #EAF4E3 100%)` }}
      >
        {/* Paisaje decorativo: sol arriba a la derecha y lomas al pie */}
        <span
          aria-hidden="true"
          className="cc-flotar pointer-events-none absolute right-6 top-5 h-9 w-9 rounded-full"
          style={{ backgroundColor: '#FFD27A', boxShadow: '0 0 0 8px #FFD27A33' }}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full opacity-70"
        >
          <path d="M0 22 Q50 6 100 18 T200 12 V40 H0Z" fill="#CFE3BF" />
          <path d="M0 32 Q60 18 120 28 T200 24 V40 H0Z" fill="#B5D69C" />
        </svg>
        <p className="relative text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.azul }}>
          {saludoDelDia()}
        </p>
        <h2 className="relative mt-1 text-xl font-extrabold leading-tight" style={{ color: COLORES.tinta }}>
          ¿Qué necesitas resolver hoy?
        </h2>
        <button
          onClick={onBuscar}
          className="cc-presionable relative mb-3 mt-4 flex w-full items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-left text-sm"
          style={{ color: COLORES.textoSuave, boxShadow: '0 2px 8px rgba(11,36,49,0.08)' }}
        >
          <Search size={17} style={{ color: COLORES.azul }} />
          Producto, ingrediente, grupo o plaga…
        </button>
      </div>

      <TarjetaInstalar />

      <h3
        className="mt-7 text-xs font-bold uppercase tracking-wide"
        style={{ color: COLORES.textoSuave }}
      >
        Diagnóstico guiado · responde 1 a 3 preguntas
      </h3>
      <div className="cc-escalonado mt-3 space-y-3">
        {RAMAS.map((r) => {
          const cat = r.categorias[0];
          const total = PRODUCTOS.filter((p) => r.categorias.includes(p.categoria)).length;
          return (
            <FilaMenu
              key={r.id}
              icono={ICONO_RAMA[r.id]}
              imagen={r.id}
              color={COLOR_CATEGORIA[cat]}
              fondo={FONDO_CATEGORIA[cat]}
              titulo={r.titulo}
              descripcion={r.resumen}
              onClick={() => onEscogerRama(r)}
              contador={`${total} productos`}
              insignia={
                r.sistema ? (
                  <span
                    className="rounded px-2 py-0.5 font-mono text-[11px] font-bold"
                    style={{ backgroundColor: FONDO_CATEGORIA[cat], color: COLOR_CATEGORIA[cat] }}
                  >
                    {r.sistema}
                  </span>
                ) : null
              }
            />
          );
        })}

        {onVerCiclo && (
          <FilaMenu
            icono={Activity}
            imagen="ciclo"
            color={COLORES.gris}
            fondo={COLORES.grisClaro}
            titulo="Ciclo de vida"
            descripcion="Qué estadio de la plaga alcanza cada insecticida"
            onClick={onVerCiclo}
          />
        )}
      </div>

      {favoritos.length > 0 && (
        <section className="mt-7">
          <h3
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
            style={{ color: COLORES.textoSuave }}
          >
            <Star size={13} fill="#F5A524" color="#F5A524" /> Tus favoritos
          </h3>
          <div className="cc-sin-barra cc-escalonado -mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-2">
            {favoritos.map((p) => {
              const color = COLOR_CATEGORIA[p.categoria];
              return (
                <button
                  key={p.id}
                  onClick={() => onAbrirProducto(p)}
                  className="cc-presionable w-36 shrink-0 rounded-2xl bg-white p-3 text-left"
                  style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.09)' }}
                >
                  <Hexagono icono={ICONO_CATEGORIA[p.categoria]} imagen={iconoDeProducto(p)} color={color} tamano={40} />
                  <span className="mt-2 block truncate text-sm font-bold" style={{ color: COLORES.tinta }}>
                    {p.nombre}
                  </span>
                  <span className="block truncate text-[11px]" style={{ color: COLORES.textoSuave }}>
                    {p.sistema ? `${p.sistema} ${p.grupo}` : p.categoria}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {recientes.length > 0 && (
        <section className="mt-6">
          <h3
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
            style={{ color: COLORES.textoSuave }}
          >
            <Clock size={13} /> Vistos hace poco
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {recientes.map((p) => (
              <Chip
                key={p.id}
                label={p.nombre}
                icono={ICONO_CATEGORIA[p.categoria]}
                onClick={() => onAbrirProducto(p)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/** Asistente que traduce una situación de campo en una lista de productos. */
export function Diagnostico({ onAbrirProducto, onVerCiclo, onBuscar }) {
  const [rama, setRama] = useState(null);
  const [objetivo, setObjetivo] = useState(null);
  const [escenario, setEscenario] = useState(null);
  const [momento, setMomento] = useState(null);
  const [ultimoId, setUltimoId] = useState('');

  const refAfinar = useRef(null);
  const refResultados = useRef(null);
  const resultadosALaVista = useEnPantalla(refResultados, Boolean(objetivo));

  const ultimoUsado = useMemo(
    () => PRODUCTOS.find((p) => p.id === ultimoId) || null,
    [ultimoId]
  );

  const criterio = useMemo(
    () => (rama && objetivo ? { categorias: rama.categorias, objetivo, escenario, momento, ultimoUsado } : null),
    [rama, objetivo, escenario, momento, ultimoUsado]
  );
  const resultados = useMemo(() => (criterio ? recomendar(criterio) : []), [criterio]);
  const programa = useMemo(
    () => (criterio && rama.sistema ? construirPrograma(criterio, 3) : []),
    [criterio, rama]
  );

  const reiniciar = () => {
    setRama(null);
    setObjetivo(null);
    setEscenario(null);
    setMomento(null);
    setUltimoId('');
    window.scrollTo({ top: 0 });
  };

  const escogerObjetivo = (id) => {
    setObjetivo(id);
    // Lleva al siguiente paso cuando ya se pintó
    setTimeout(() => llevarA(refAfinar.current), 60);
  };

  // ── Pantalla inicial ────────────────────────────────────────────
  if (!rama) {
    return (
      <InicioDiagnostico
        onEscogerRama={(r) => {
          setRama(r);
          window.scrollTo({ top: 0 });
        }}
        onVerCiclo={onVerCiclo}
        onBuscar={onBuscar}
        onAbrirProducto={onAbrirProducto}
      />
    );
  }

  const color = COLOR_CATEGORIA[rama.categorias[0]];
  const objetivoElegido = rama.objetivos.find((o) => o.id === objetivo);
  const etapa = !objetivo ? 1 : escenario || momento || ultimoId ? 3 : 2;

  return (
    <div className="pb-6">
      <button
        onClick={reiniciar}
        className="flex items-center gap-1.5 text-sm font-medium transition hover:opacity-70"
        style={{ color: COLORES.textoSuave }}
      >
        <ArrowLeft size={15} /> Inicio
      </button>

      <div className="mt-3 flex items-center gap-3">
        <Hexagono icono={ICONO_RAMA[rama.id]} imagen={rama.id} color={color} tamano={52} />
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight" style={{ color: COLORES.tinta }}>
            {rama.titulo}
          </h2>
          <p className="text-xs" style={{ color: COLORES.textoSuave }}>
            {rama.resumen}
          </p>
        </div>
      </div>

      <Progreso etapa={etapa} color={color} />

      {/* Paso 1: objetivo. Al escogerlo se pliega en un resumen editable. */}
      {!objetivoElegido ? (
        <Paso numero={1} titulo={rama.pregunta} color={color}>
          <div className="cc-escalonado grid grid-cols-2 gap-2 sm:grid-cols-3">
            {rama.objetivos.map((o) => (
              <Opcion
                key={o.id}
                label={o.label}
                ayuda={o.ayuda}
                color={color}
                imagen={o.id}
                activo={false}
                onClick={() => escogerObjetivo(o.id)}
              />
            ))}
          </div>
        </Paso>
      ) : (
        <button
          onClick={() => setObjetivo(null)}
          className="cc-entrada cc-presionable mt-5 flex w-full items-center gap-3 rounded-2xl border p-3 text-left"
          style={{ borderColor: `${color}55`, backgroundColor: `${color}0F` }}
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: color }}
          >
            <Check size={16} color="#fff" strokeWidth={3} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
              {rama.pregunta.replace(/[¿?]/g, '')}
            </span>
            <span className="block text-sm font-bold" style={{ color: COLORES.tinta }}>
              {objetivoElegido.label}
              {objetivoElegido.ayuda && (
                <span className="font-normal" style={{ color: COLORES.textoSuave }}>
                  {' '}
                  · {objetivoElegido.ayuda}
                </span>
              )}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold" style={{ color }}>
            <Pencil size={13} /> Cambiar
          </span>
        </button>
      )}

      {objetivo && (
        <div ref={refAfinar}>
          <Paso numero={2} titulo={rama.preguntaEscenario} nota="opcional" color={color}>
            <div className="flex flex-wrap gap-2">
              {rama.escenarios.map((e) => (
                <Chip
                  key={e.id}
                  label={e.label}
                  color={color}
                  activo={escenario === e.id}
                  onClick={() => setEscenario(escenario === e.id ? null : e.id)}
                />
              ))}
            </div>
          </Paso>

          <Paso numero={3} titulo={rama.preguntaMomento} nota="opcional" color={color}>
            <div className="grid grid-cols-2 gap-2">
              {rama.momentos.map((m) => (
                <Opcion
                  key={m.id}
                  label={m.label}
                  ayuda={m.ayuda}
                  color={color}
                  icono={ICONO_MOMENTO[m.id]}
                  activo={momento === m.id}
                  onClick={() => setMomento(momento === m.id ? null : m.id)}
                />
              ))}
            </div>
          </Paso>

          {rama.sistema && (
            <Paso numero={4} titulo="¿Qué aplicaste la vez anterior?" nota="opcional" color={color}>
              <p className="mb-2 text-xs" style={{ color: COLORES.textoSuave }}>
                Si lo indicas, la app baja los productos que repiten el mismo sitio de acción y arma la
                rotación a partir de ahí.
              </p>
              <SelectorProducto
                valor={ultimoId}
                onCambio={setUltimoId}
                productos={PRODUCTOS.filter((p) => rama.categorias.includes(p.categoria))}
                titulo="¿Qué aplicaste la vez anterior?"
                marcador="No apliqué nada o no recuerdo"
                opcionVacia="No apliqué nada o no recuerdo"
              />
            </Paso>
          )}
        </div>
      )}

      {/* Resultados */}
      {objetivo && (
        <section className="mt-8" ref={refResultados}>
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: COLORES.borde }}>
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: COLORES.tinta }}>
              <NumeroAnimado valor={resultados.length} />{' '}
              {resultados.length === 1 ? 'producto encaja' : 'productos encajan'}
            </h3>
            {ultimoUsado && (
              <span className="flex items-center gap-1 text-xs" style={{ color: COLORES.textoSuave }}>
                <RotateCcw size={12} /> Rotando desde {ultimoUsado.sistema} {ultimoUsado.grupo}
              </span>
            )}
          </div>

          {programa.length >= 2 && (
            <ProgramaSugerido
              programa={programa}
              color={color}
              onAbrirProducto={onAbrirProducto}
              ultimoUsado={ultimoUsado}
            />
          )}

          {resultados.length === 0 ? (
            <EstadoVacio
              icono={SearchX}
              color={color}
              titulo="Sin coincidencias"
              texto="Ninguna combinación del portafolio cubre esos criterios. Quita el uso o el momento para ampliar la búsqueda."
              accion={
                <button
                  onClick={() => {
                    setEscenario(null);
                    setMomento(null);
                  }}
                  className="cc-presionable rounded-full px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: color }}
                >
                  Quitar filtros opcionales
                </button>
              }
            />
          ) : (
            <div className="cc-escalonado mt-4 space-y-3">
              {resultados.map((p, i) => (
                <TarjetaProducto key={p.id} producto={p} orden={i + 1} onAbrir={onAbrirProducto} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Atajo flotante a los resultados mientras se responden las preguntas */}
      {objetivo && !resultadosALaVista && resultados.length > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-24 z-30 flex justify-center">
          <button
            onClick={() => llevarA(refResultados.current)}
            className="cc-entrada cc-presionable pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white"
            style={{ backgroundColor: color, boxShadow: `0 8px 24px ${color}66` }}
          >
            <ArrowDown size={16} className="cc-latido" />
            Ver {resultados.length} {resultados.length === 1 ? 'producto' : 'productos'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Diagnostico;
