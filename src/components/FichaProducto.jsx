import React from 'react';
import {
  AlertTriangle,
  RotateCcw,
  Info,
  Target,
  Compass,
  ShieldAlert,
  Star,
  Share2,
  FlaskConical,
  Move,
  Zap,
  Users,
} from 'lucide-react';
import { COLORES, COLOR_CATEGORIA, COLOR_RIESGO, etiquetaDe } from '../data/taxonomia.js';
import { TRANSLOCACION, ESTADIOS, fichasDeProducto } from '../data/gruposMoA.js';
import { FAVORITOS, useAlmacen, alternarEnLista } from '../estado/memoria.js';
import { Etiqueta, SelloGrupo } from './ui/Etiqueta.jsx';
import { HojaInferior } from './ui/Hoja.jsx';
import { Hexagono } from './ui/Superficie.jsx';
import { ICONO_CATEGORIA } from './ui/Iconos.jsx';
import { iconoDeProducto } from '../data/iconos3d.js';
import { avisar, compartirTexto } from './ui/Avisos.jsx';
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

/** Texto plano de la ficha para mandarlo por WhatsApp o correo. */
export function resumenParaCompartir(producto) {
  const lineas = [
    `${producto.nombre} — ${producto.categoria}`,
    producto.ia,
    producto.sistema ? `Modo de acción: ${producto.sistema} ${producto.grupo} (${producto.familia})` : producto.familia,
    producto.objetivos?.length ? `Controla: ${producto.objetivos.map(etiquetaDe).join(', ')}` : null,
    producto.momento?.length ? `Momento: ${producto.momento.map(etiquetaDe).join(', ')}` : null,
    `Movimiento: ${producto.movimiento}`,
    producto.riesgo ? `Riesgo de resistencia: ${producto.riesgo}` : null,
    producto.presentaciones?.length ? `Presentaciones: ${producto.presentaciones.join(' · ')}` : null,
    '',
    'Confirma dosis, cultivo registrado y periodos de carencia y reentrada en la etiqueta ICA.',
    '— Enviado desde CiboCAMPO',
  ];
  return lineas.filter((l) => l != null).join('\n');
}

/** Dato clave en mosaico, para leer la ficha de un vistazo. */
function DatoClave({ icono: Icono, etiqueta, valor, color }) {
  return (
    <div className="rounded-2xl bg-white p-3" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.07)' }}>
      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
        <Icono size={12} /> {etiqueta}
      </span>
      <span className="mt-1 block text-[13px] font-semibold leading-snug" style={{ color: color || COLORES.tinta }}>
        {valor}
      </span>
    </div>
  );
}

/** Botón de acción rápida de la ficha. */
function AccionFicha({ icono: Icono, etiqueta, onClick, activo, color }) {
  return (
    <button
      onClick={onClick}
      className="cc-presionable flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2.5 text-[11px] font-semibold"
      style={{
        backgroundColor: activo ? `${color}1A` : COLORES.papel,
        color: activo ? color : COLORES.tinta,
      }}
    >
      <span key={String(activo)} className={activo ? 'cc-pop' : undefined}>
        <Icono size={19} fill={activo ? color : 'none'} color={activo ? color : COLORES.tinta} strokeWidth={2} />
      </span>
      {etiqueta}
    </button>
  );
}

/** Ficha técnica completa. Combina datos del producto con la ficha de su grupo. */
export function FichaProducto({ producto, onCerrar, onVerRotacion, onAgregarAMezcla }) {
  const [favoritos, setFavoritos] = useAlmacen(FAVORITOS);
  if (!producto) return null;

  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const fichas = fichasDeProducto(producto);
  const conflictos = mismosModoDeAccion(producto);
  const alternativas = alternativasDeRotacion(producto);
  const estadios = estadiosDeProducto(producto);
  const esFavorito = favoritos.includes(producto.id);
  const tr = fichas[0] && TRANSLOCACION[fichas[0].ficha.translocacion];

  const alternarFavorito = () => {
    setFavoritos((l) => alternarEnLista(l, producto.id));
    avisar(esFavorito ? 'Quitado de favoritos' : 'Guardado en favoritos', esFavorito ? 'info' : 'favorito');
  };

  return (
    <HojaInferior
      etiqueta={`Ficha de ${producto.nombre}`}
      onCerrar={onCerrar}
      fondo={COLORES.papel}
      cabecera={
        <div className="flex items-start gap-3">
          <Hexagono icono={ICONO_CATEGORIA[producto.categoria]} imagen={iconoDeProducto(producto)} color={color} tamano={54} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <Etiqueta texto={producto.categoria} color={color} tono="solido" />
              {producto.estado !== 'Disponible' && (
                <Etiqueta
                  texto={producto.estado}
                  color={producto.estado === 'Nuevo' ? COLORES.verde : COLORES.naranja}
                />
              )}
              {producto.todera && <Etiqueta texto="Producto ancla" color={COLORES.verde} />}
            </div>
            <h2 className="mt-1.5 text-xl font-bold leading-tight" style={{ color: COLORES.tinta }}>
              {producto.nombre}
            </h2>
            <p className="text-sm" style={{ color: COLORES.textoSuave }}>
              {producto.ia}
            </p>
          </div>
        </div>
      }
    >
      {(cerrar) => (
        <>
        {/* Acciones rápidas */}
        <div className="flex gap-2 px-5 pt-4">
          <AccionFicha
            icono={Star}
            etiqueta={esFavorito ? 'Guardado' : 'Favorito'}
            activo={esFavorito}
            color="#F5A524"
            onClick={alternarFavorito}
          />
          <AccionFicha
            icono={Share2}
            etiqueta="Compartir"
            onClick={() => compartirTexto(producto.nombre, resumenParaCompartir(producto))}
          />
          {onAgregarAMezcla && (
            <AccionFicha icono={FlaskConical} etiqueta="A la mezcla" onClick={() => onAgregarAMezcla(producto)} />
          )}
          {producto.sistema && onVerRotacion && (
            <AccionFicha icono={RotateCcw} etiqueta="Rotación" onClick={() => onVerRotacion(producto)} />
          )}
        </div>

        {/* Lo esencial de un vistazo */}
        <div className="cc-escalonado grid grid-cols-2 gap-2 px-5 pt-3">
          <DatoClave
            icono={Move}
            etiqueta="Movimiento"
            valor={tr ? `${tr.icono} ${tr.nombre}` : producto.movimiento}
          />
          <DatoClave
            icono={ShieldAlert}
            etiqueta="Riesgo de resistencia"
            valor={producto.riesgo || '—'}
            color={COLOR_RIESGO[producto.riesgo]}
          />
          <DatoClave icono={Zap} etiqueta="Velocidad" valor={fichas[0]?.ficha?.velocidad || producto.sintoma || '—'} />
          <DatoClave icono={Users} etiqueta="Benéficos" valor={producto.beneficos || '—'} />
        </div>

        <div className="px-5 pb-8">
          {/* ── Modo de acción por cada grupo de la mezcla ── */}
          {fichas.map(({ codigo, ficha }) => {
            const tr = TRANSLOCACION[ficha.translocacion];
            return (
              <div
                key={codigo}
                className="cc-entrada mt-4 rounded-2xl bg-white p-4"
                style={{ borderLeft: `4px solid ${color}`, boxShadow: '0 1px 3px rgba(11,36,49,0.07)' }}
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

                <div className="mt-3 rounded-xl p-2.5" style={{ backgroundColor: `${color}0D` }}>
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
                  <div className="mt-3 flex gap-3 rounded-xl p-2.5" style={{ backgroundColor: `${color}0D` }}>
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
              className="cc-entrada mt-4 rounded-2xl bg-white p-4"
              style={{ borderLeft: `4px solid ${color}`, boxShadow: '0 1px 3px rgba(11,36,49,0.07)' }}
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
                      className="mb-2 rounded-2xl p-3 text-sm leading-relaxed"
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
                      className="mb-2 rounded-2xl border bg-white p-3"
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
              {onVerRotacion && (
                <button
                  onClick={() => onVerRotacion(producto)}
                  className="cc-presionable mt-3 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: COLORES.tinta }}
                >
                  <RotateCcw size={15} /> Ver plan de rotación
                </button>
              )}
            </Bloque>
          )}

          {/* ── Datos agronómicos ── */}
          <Bloque icono={Info} titulo="Datos">
            <dl className="rounded-2xl bg-white px-4 pb-1" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.07)' }}>
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
                      className="mb-2 rounded-2xl p-3 text-sm"
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

          <div className="mt-5 flex gap-2 rounded-2xl bg-white p-3">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.textoSuave }} />
            <p className="text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
              Confirma el cultivo registrado, la dosis, el periodo de carencia y el de reentrada en la
              etiqueta ICA vigente antes de recomendar o aplicar.
            </p>
          </div>

          {/* Cierre al final: tras una ficha larga, el botón de arriba queda lejos */}
          <button
            onClick={cerrar}
            className="cc-presionable mt-5 w-full rounded-2xl py-3.5 text-sm font-bold text-white"
            style={{ backgroundColor: COLORES.tinta }}
          >
            Cerrar ficha
          </button>
        </div>
        </>
      )}
    </HojaInferior>
  );
}

export default FichaProducto;
