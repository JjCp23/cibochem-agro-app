import React, { useEffect, useRef, useState } from 'react';
import { X, AlertTriangle, RotateCcw, Info, Target, Compass, ShieldAlert, ArrowLeft } from 'lucide-react';
import { COLORES, COLOR_CATEGORIA, COLOR_RIESGO, etiquetaDe } from '../data/taxonomia.js';
import { TRANSLOCACION, ESTADIOS, fichasDeProducto } from '../data/gruposMoA.js';
import { Etiqueta, SelloGrupo } from './ui/Etiqueta.jsx';
import {
  alternativasDeRotacion,
  mismosModoDeAccion,
  gruposDeRotacion,
  estadiosDeProducto,
} from '../motores/index.js';

function Bloque({ icono: Icono, titulo, children, color = COLORES.tinta }) {
  return (
    <section className="mt-5">
      <h3
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide"
        style={{ color }}
      >
        <Icono size={14} /> {titulo}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Dato({ etiqueta, children }) {
  return (
    <div
      className="grid grid-cols-1 gap-1 border-b py-2.5 sm:grid-cols-[8rem_1fr] sm:gap-4"
      style={{ borderColor: COLORES.borde }}
    >
      <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
        {etiqueta}
      </dt>
      <dd className="text-sm" style={{ color: COLORES.tinta }}>
        {children}
      </dd>
    </div>
  );
}

/** Ficha técnica completa. Combina datos del producto con la ficha de su grupo. */
export function FichaProducto({ producto, onCerrar, onVerRotacion }) {
  const panel = useRef(null);
  const [sinFoto, setSinFoto] = useState(false);

  // onCerrar se lee desde una referencia para que el efecto del historial no
  // se vuelva a ejecutar (y no apile otra entrada) cada vez que el padre se
  // vuelve a pintar con una función nueva.
  const cerrarRef = useRef(onCerrar);
  cerrarRef.current = onCerrar;

  // Cada producto puede tener o no foto de empaque: se vuelve a intentar al
  // cambiar de ficha.
  useEffect(() => {
    setSinFoto(false);
  }, [producto?.id]);

  const idProducto = producto?.id;

  // La ficha se abre sobre toda la pantalla, así que tiene que poder cerrarse
  // sin buscar el botón: tecla Escape, botón físico de atrás del teléfono, o
  // tocando fuera del panel.
  useEffect(() => {
    if (!idProducto) return;

    const conEscape = (e) => {
      if (e.key === 'Escape') window.history.back();
    };
    const conAtras = () => cerrarRef.current();

    document.addEventListener('keydown', conEscape);
    window.addEventListener('popstate', conAtras);
    // Entrada en el historial para que el botón atrás cierre la ficha en vez
    // de sacar al usuario de la aplicación.
    window.history.pushState({ ficha: true }, '');

    // Bloquear el desplazamiento del fondo mientras la ficha está abierta
    const desplazamientoPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();

    return () => {
      document.removeEventListener('keydown', conEscape);
      window.removeEventListener('popstate', conAtras);
      document.body.style.overflow = desplazamientoPrevio;
    };
  }, [idProducto]);

  // Todos los cierres pasan por el historial: así la entrada que se añadió al
  // abrir siempre se consume, y "atrás" y los botones se comportan igual.
  const cerrar = () => window.history.back();

  // El fondo no acepta toques hasta el cuadro siguiente a la apertura: el
  // mismo toque que abrió la ficha podía caer sobre el fondo y cerrarla al
  // instante.
  const [listo, setListo] = useState(false);
  useEffect(() => {
    if (!idProducto) return;
    setListo(false);
    const cuadro = requestAnimationFrame(() => setListo(true));
    return () => cancelAnimationFrame(cuadro);
  }, [idProducto]);

  if (!producto) return null;

  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const fichas = fichasDeProducto(producto);
  const conflictos = mismosModoDeAccion(producto);
  const alternativas = alternativasDeRotacion(producto);
  const estadios = estadiosDeProducto(producto);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
      onClick={listo ? cerrar : undefined}
      role="presentation"
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`Ficha de ${producto.nombre}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white outline-none sm:rounded-2xl"
      >
        {/* Encabezado */}
        <div
          className="sticky top-0 z-10 border-b bg-white px-5 py-4"
          style={{ borderColor: COLORES.borde }}
        >
          <button
            onClick={cerrar}
            className="mb-2 flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70"
            style={{ color: COLORES.azul }}
          >
            <ArrowLeft size={16} /> Volver
          </button>
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              {/* Foto del empaque; si el producto no tiene, se omite sin dejar hueco */}
              {!sinFoto && (
                <img
                  src={`/productos/${producto.id}.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                  style={{ border: `1px solid ${COLORES.borde}` }}
                  onError={() => setSinFoto(true)}
                />
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Etiqueta texto={producto.categoria} color={color} tono="solido" />
                  {producto.estado !== 'Disponible' && (
                    <Etiqueta
                      texto={producto.estado}
                      color={producto.estado === 'Nuevo' ? COLORES.verde : COLORES.naranja}
                    />
                  )}
                  {producto.todera && <Etiqueta texto="Producto ancla" color={COLORES.verde} />}
                </div>
                <h2 className="mt-2 text-xl font-bold leading-tight" style={{ color: COLORES.tinta }}>
                  {producto.nombre}
                </h2>
                <p className="text-sm" style={{ color: COLORES.textoSuave }}>
                  {producto.ia}
                </p>
              </div>
            </div>
            <button
              onClick={cerrar}
              className="shrink-0 rounded-full p-2 transition hover:bg-slate-100"
              aria-label="Cerrar ficha"
            >
              <X size={20} style={{ color: COLORES.textoSuave }} />
            </button>
          </div>
        </div>

        <div className="px-5 pb-8">
          {/* ── Modo de acción por cada grupo de la mezcla ── */}
          {fichas.map(({ codigo, ficha }) => {
            const tr = TRANSLOCACION[ficha.translocacion];
            return (
              <div
                key={codigo}
                className="mt-4 rounded-lg p-4"
                style={{ backgroundColor: `${color}0D`, border: `1px solid ${color}30` }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <SelloGrupo sistema={producto.sistema} grupo={codigo} color={color} tamano="lg" />
                  <span className="text-sm font-bold" style={{ color: COLORES.tinta }}>
                    {ficha.nombre}
                  </span>
                  {ficha.legado && (
                    <span className="font-mono text-xs" style={{ color: COLORES.textoSuave }}>
                      (antes {ficha.legado})
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                  {ficha.proceso}
                </p>

                <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  {ficha.mecanismo}
                </p>

                <div className="mt-3 rounded p-2.5" style={{ backgroundColor: '#ffffffAA' }}>
                  <p className="text-xs" style={{ color: COLORES.textoSuave }}>
                    <strong style={{ color: COLORES.tinta }}>Sitio de acción:</strong> {ficha.sitioAccion}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: COLORES.textoSuave }}>
                    <strong style={{ color: COLORES.tinta }}>Qué se ve:</strong> {ficha.sintomas}{' '}
                    <em>({ficha.velocidad})</em>
                  </p>
                </div>

                {/* Translocación */}
                {tr && (
                  <div className="mt-3 flex gap-3 rounded p-2.5" style={{ backgroundColor: '#ffffffAA' }}>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded font-mono"
                      style={{ backgroundColor: `${color}1F`, color }}
                    >
                      {tr.icono}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold" style={{ color: COLORES.tinta }}>
                        {tr.nombre}
                      </span>
                      <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
                        {tr.implicacion}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Si no hay ficha de grupo (bioestimulantes y reguladores) */}
          {fichas.length === 0 && (
            <div
              className="mt-4 rounded-lg p-4"
              style={{ backgroundColor: `${color}0D`, border: `1px solid ${color}30` }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} tamano="lg" />
                <span className="text-sm font-bold" style={{ color: COLORES.tinta }}>
                  {producto.familia}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                {producto.mecanismo}
              </p>
              {producto.sintoma && (
                <p className="mt-1.5 text-sm italic" style={{ color: COLORES.textoSuave }}>
                  {producto.sintoma}
                </p>
              )}
            </div>
          )}

          {/* ── Ciclo de vida ── */}
          {estadios.length > 0 && (
            <Bloque icono={Target} titulo="Estadios que alcanza">
              <div className="flex flex-wrap gap-2">
                {ESTADIOS.map((e) => {
                  const activo = estadios.includes(e.id);
                  return (
                    <span
                      key={e.id}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                      style={{
                        backgroundColor: activo ? `${color}1A` : '#F4F6F8',
                        color: activo ? color : COLORES.borde,
                        border: `1px solid ${activo ? `${color}44` : COLORES.borde}`,
                        textDecoration: activo ? 'none' : 'line-through',
                      }}
                    >
                      {e.nombre}
                    </span>
                  );
                })}
              </div>
            </Bloque>
          )}

          {/* ── Cuándo elegirlo ── */}
          {fichas.some((f) => f.ficha.decision) && (
            <Bloque icono={Compass} titulo="Cuándo elegirlo" color={COLORES.verde}>
              {fichas.map(
                ({ codigo, ficha }) =>
                  ficha.decision && (
                    <p
                      key={codigo}
                      className="mb-2 rounded-lg p-3 text-sm leading-relaxed"
                      style={{ backgroundColor: COLORES.verdeClaro, color: COLORES.tinta }}
                    >
                      {ficha.decision}
                    </p>
                  )
              )}
            </Bloque>
          )}

          {/* ── Motivo de rotación ── */}
          {fichas.some((f) => f.ficha.rotacionMotivo) && (
            <Bloque icono={RotateCcw} titulo="Por qué rotarlo">
              {fichas.map(
                ({ codigo, ficha }) =>
                  ficha.rotacionMotivo && (
                    <div
                      key={codigo}
                      className="mb-2 rounded-lg border p-3"
                      style={{ borderColor: COLORES.borde }}
                    >
                      <div className="flex items-center gap-2">
                        <SelloGrupo sistema={producto.sistema} grupo={codigo} color={color} />
                        <span
                          className="text-xs font-bold uppercase"
                          style={{ color: COLOR_RIESGO[ficha.riesgo] }}
                        >
                          Riesgo {ficha.riesgo}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                        {ficha.rotacionMotivo}
                      </p>
                    </div>
                  )
              )}
              <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
                Ocupa el sitio de acción{' '}
                <span className="font-mono font-semibold">
                  {producto.sistema} {gruposDeRotacion(producto).join(' y ')}
                </span>
                . En el portafolio hay {conflictos.length} productos que lo repiten y{' '}
                {alternativas.length} que sirven para rotar.
              </p>
              <button
                onClick={() => onVerRotacion(producto)}
                className="mt-3 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: COLORES.tinta }}
              >
                Ver plan de rotación
              </button>
            </Bloque>
          )}

          {/* ── Datos agronómicos ── */}
          <Bloque icono={Info} titulo="Datos">
            <dl>
              <Dato etiqueta="Controla">
                <div className="flex flex-wrap gap-1.5">
                  {producto.objetivos?.map((o) => (
                    <Etiqueta key={o} texto={etiquetaDe(o)} color={color} />
                  ))}
                </div>
              </Dato>
              <Dato etiqueta="Momento">
                <div className="flex flex-wrap gap-1.5">
                  {producto.momento?.map((m) => (
                    <Etiqueta key={m} texto={etiquetaDe(m)} color={COLORES.tinta} />
                  ))}
                </div>
              </Dato>
              {fichas[0]?.ficha?.espectro && <Dato etiqueta="Espectro">{fichas[0].ficha.espectro}</Dato>}
              {fichas[0]?.ficha?.accion && (
                <Dato etiqueta="Tipo de acción">{fichas[0].ficha.accion.join(' · ')}</Dato>
              )}
              <Dato etiqueta="Riesgo">
                <span className="font-semibold" style={{ color: COLOR_RIESGO[producto.riesgo] }}>
                  {producto.riesgo}
                </span>
              </Dato>
              {producto.beneficos && <Dato etiqueta="Benéficos">{producto.beneficos}</Dato>}
              <Dato etiqueta="Presentaciones">{producto.presentaciones?.join(' · ')}</Dato>
            </dl>
          </Bloque>

          {/* ── Precauciones ── */}
          {fichas.some((f) => f.ficha.precaucion) && (
            <Bloque icono={ShieldAlert} titulo="Precauciones" color="#C2410C">
              {fichas.map(
                ({ codigo, ficha }) =>
                  ficha.precaucion && (
                    <p
                      key={codigo}
                      className="mb-2 rounded-lg p-3 text-sm"
                      style={{ backgroundColor: '#FDF3EE', color: COLORES.tinta }}
                    >
                      {ficha.precaucion}
                    </p>
                  )
              )}
            </Bloque>
          )}

          {producto.nota && (
            <div
              className="mt-4 flex gap-2 rounded-lg p-3"
              style={{ backgroundColor: COLORES.naranjaClaro }}
            >
              <Info size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.naranja }} />
              <p className="text-sm" style={{ color: COLORES.tinta }}>
                {producto.nota}
              </p>
            </div>
          )}

          <div className="mt-5 flex gap-2 rounded-xl p-3" style={{ backgroundColor: COLORES.papel }}>
            <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.textoSuave }} />
            <p className="text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
              Confirma el cultivo registrado, la dosis, el periodo de carencia y el de reentrada en la
              etiqueta ICA vigente antes de recomendar o aplicar.
            </p>
          </div>

          {/* Cierre al final: tras una ficha larga, el botón de arriba queda lejos */}
          <button
            onClick={cerrar}
            className="mt-5 w-full rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: COLORES.tinta }}
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
}

export default FichaProducto;
