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
  Eye,
  Crosshair,
  Lightbulb,
  Check,
  Ban,
  Copy,
  Sprout,
  Atom,
  Scale,
} from 'lucide-react';
import { COLORES, COLOR_CATEGORIA, COLOR_RIESGO, etiquetaDe } from '../data/taxonomia.js';
import { TRANSLOCACION, ESTADIOS, fichasDeProducto } from '../data/gruposMoA.js';
import { FAVORITOS, useAlmacen, alternarEnLista } from '../estado/memoria.js';
import { Etiqueta, SelloGrupo, TextoMarcado } from './ui/Etiqueta.jsx';
import { CAMPO } from '../data/campo.js';
import { CULTIVOS } from '../data/cultivos.js';
import { GRUPOS_FUNCIONALES } from '../data/gruposQuimicos.js';
import { PRODUCTOS } from '../data/productos.js';
import { HojaInferior } from './ui/Hoja.jsx';
import { Hexagono } from './ui/Superficie.jsx';
import { ICONO_CATEGORIA, IconoIlustrado } from './ui/Iconos.jsx';
import { iconoDeProducto } from '../data/iconosIlustrados.js';
import { avisar, compartirTexto } from './ui/Avisos.jsx';
import {
  alternativasDeRotacion,
  mismosModoDeAccion,
  gruposDeRotacion,
  estadiosDeProducto,
  gruposQuimicosDe,
  crucesQueConfundenDe,
  gemelosDe,
  mismaMoleculaDe,
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

/** Botón con el nombre de otro producto, para saltar a su ficha. */
function EnlaceProducto({ producto, onAbrir }) {
  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  return (
    <button
      onClick={() => onAbrir?.(producto)}
      className="cc-presionable mb-1 mr-1.5 inline-flex items-center gap-1 rounded-full border bg-white px-2.5 py-1 text-xs font-semibold"
      style={{ borderColor: `${color}55`, color }}
    >
      {producto.nombre}
    </button>
  );
}

/** Dominio legible de una URL de fuente. */
function dominioDe(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'fuente consultada';
  }
}

/** Ficha técnica completa. Combina datos del producto con la ficha de su grupo. */
export function FichaProducto({ producto, onCerrar, onVerRotacion, onAgregarAMezcla, onAbrirProducto, onComparar }) {
  const [favoritos, setFavoritos] = useAlmacen(FAVORITOS);
  if (!producto) return null;

  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const fichas = fichasDeProducto(producto);
  const conflictos = mismosModoDeAccion(producto);
  const alternativas = alternativasDeRotacion(producto);
  const estadios = estadiosDeProducto(producto);
  const esFavorito = favoritos.includes(producto.id);
  const tr = fichas[0] && TRANSLOCACION[fichas[0].ficha.translocacion];
  const campo = CAMPO[producto.id] || {};
  const gruposQ = gruposQuimicosDe(producto);
  const cruces = crucesQueConfundenDe(producto);
  const gemelos = gemelosDe(producto);
  const misma = mismaMoleculaDe(producto);
  const cultivosDelProducto = (campo.cultivos || [])
    .map((id) => CULTIVOS.find((c) => c.id === id))
    .filter(Boolean);
  const funcional = GRUPOS_FUNCIONALES.find((g) => g.productos.includes(producto.id));
  const tarjeta = { boxShadow: '0 1px 3px rgba(11,36,49,0.07)' };

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
          {onComparar && <AccionFicha icono={Scale} etiqueta="Comparar" onClick={() => onComparar(producto)} />}
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
          {campo.descripcion && (
            <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm italic leading-relaxed" style={{ color: COLORES.textoSuave, ...tarjeta }}>
              «{campo.descripcion}»
              <span className="mt-1 block text-[10px] font-bold uppercase not-italic tracking-wide">
                Así lo presenta el portafolio
              </span>
            </p>
          )}

          {/* ── Lo que se ve en campo: la mejor forma de saber si funcionó ── */}
          {campo.enCampo && (
            <Bloque icono={Eye} titulo="Qué vas a ver en campo" color={COLORES.azul}>
              <p className="rounded-2xl bg-white p-3 text-sm leading-relaxed" style={{ color: COLORES.tinta, ...tarjeta }}>
                <TextoMarcado texto={campo.enCampo} />
              </p>
            </Bloque>
          )}

          {campo.mecanismo && (
            <Bloque icono={Atom} titulo="Cómo actúa">
              <p className="rounded-2xl bg-white p-3 text-sm leading-relaxed" style={{ color: COLORES.tinta, ...tarjeta }}>
                <TextoMarcado texto={campo.mecanismo} />
              </p>
            </Bloque>
          )}

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

                {!campo.mecanismo && (
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                    {ficha.mecanismo}
                  </p>
                )}

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

          {/* ── Contra qué y dónde ── */}
          {(campo.blancos || campo.usos || cultivosDelProducto.length > 0 || campo.etiqueta) && (
            <Bloque icono={Crosshair} titulo="Contra qué y en qué cultivos">
              <div className="space-y-2">
                {campo.blancos && (
                  <div className="rounded-2xl bg-white p-3" style={tarjeta}>
                    <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                      Blancos
                    </p>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                      <TextoMarcado texto={campo.blancos} />
                    </p>
                  </div>
                )}
                {cultivosDelProducto.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {cultivosDelProducto.map((c) => (
                      <span
                        key={c.id}
                        className="inline-flex items-center gap-1.5 rounded-full border bg-white py-1 pl-1.5 pr-2.5 text-xs font-semibold"
                        style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
                      >
                        <IconoIlustrado nombre={c.id} tamano={18} />
                        {c.nombre.replace(/\s*\(.*\)/, '')}
                      </span>
                    ))}
                  </div>
                )}
                {campo.usos && (
                  <p className="rounded-2xl bg-white p-3 text-sm leading-relaxed" style={{ color: COLORES.tinta, ...tarjeta }}>
                    <TextoMarcado texto={campo.usos} />
                  </p>
                )}
                {campo.etiqueta && (
                  <div className="rounded-2xl border bg-white p-3" style={{ borderColor: COLORES.borde }}>
                    <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                      Lo que dice la ficha técnica consultada
                    </p>
                    {campo.etiqueta.usos && (
                      <ul className="mt-1.5 space-y-1">
                        {campo.etiqueta.usos.map((u) => (
                          <li key={u.cultivo} className="text-sm" style={{ color: COLORES.tinta }}>
                            <strong>{u.cultivo}</strong>
                            {u.blancos.length > 0 && <span style={{ color: COLORES.textoSuave }}>: {u.blancos.join(', ')}</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                    {campo.etiqueta.composicion && (
                      <p className="mt-1.5 text-sm" style={{ color: COLORES.tinta }}>
                        <strong>Composición:</strong> {campo.etiqueta.composicion}
                      </p>
                    )}
                    {campo.etiqueta.selectividad && (
                      <p className="mt-1.5 text-sm" style={{ color: COLORES.tinta }}>
                        <strong>Selectividad:</strong> {campo.etiqueta.selectividad}
                      </p>
                    )}
                    <p className="mt-2 text-[11px] leading-snug" style={{ color: COLORES.textoSuave }}>
                      Fuente:{' '}
                      <a href={campo.etiqueta.fuente} target="_blank" rel="noreferrer" className="font-semibold underline" style={{ color: COLORES.azul }}>
                        {dominioDe(campo.etiqueta.fuente)}
                      </a>{' '}
                      · confianza {campo.etiqueta.confianza}. Confirma el cultivo registrado, la dosis y los periodos de
                      carencia y reentrada en la etiqueta ICA vigente.
                    </p>
                  </div>
                )}
              </div>
            </Bloque>
          )}

          {/* ── Cuándo elegirlo ── */}
          {(fichas.some((f) => f.ficha.decision) || gruposQ.some((g) => g.recomiendaSi || g.noRecomiendesSi)) && (
            <Bloque icono={Compass} titulo="Cuándo elegirlo" color={COLORES.verde}>
              {gruposQ.map(
                (g) =>
                  (g.recomiendaSi || g.noRecomiendesSi) && (
                    <div key={g.clave} className="mb-2 space-y-1.5">
                      {gruposQ.length > 1 && (
                        <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                          {g.clave.replace(':', ' ')} · {g.nombre}
                        </p>
                      )}
                      {g.recomiendaSi && (
                        <p className="flex gap-2 rounded-2xl bg-white p-3 text-sm leading-relaxed" style={{ color: COLORES.tinta, ...tarjeta }}>
                          <Check size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.verde }} />
                          <span>
                            <strong>Recomiéndalo si</strong> <TextoMarcado texto={g.recomiendaSi} />
                          </span>
                        </p>
                      )}
                      {g.noRecomiendesSi && (
                        <p className="flex gap-2 rounded-2xl p-3 text-sm leading-relaxed" style={{ color: COLORES.tinta, backgroundColor: '#FDF3EE' }}>
                          <Ban size={16} className="mt-0.5 shrink-0" style={{ color: '#C2410C' }} />
                          <span>
                            <strong>No lo recomiendes si</strong> <TextoMarcado texto={g.noRecomiendesSi} />
                          </span>
                        </p>
                      )}
                    </div>
                  )
              )}
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

          {campo.consejo && (
            <div className="mt-5 flex gap-3 rounded-2xl p-4" style={{ backgroundColor: COLORES.ambarClaro }}>
              <IconoIlustrado nombre="idea" tamano={30} respaldo={Lightbulb} color={COLORES.ambar} className="shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: COLORES.ambar }}>
                  Consejo de campo
                </p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  <TextoMarcado texto={campo.consejo} />
                </p>
              </div>
            </div>
          )}

          {/* ── Marcas gemelas y la misma molécula en otra presentación ── */}
          {(gemelos.length > 0 || misma.length > 0) && (
            <Bloque icono={Copy} titulo="La misma química en el portafolio">
              <div className="space-y-2 rounded-2xl bg-white p-3" style={tarjeta}>
                {gemelos.length > 0 && (
                  <div>
                    <p className="text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                      <strong>Misma composición y concentración</strong> que estas marcas. No son alternativas entre
                      sí: escoger una u otra es cuestión de presentación o de canal.
                    </p>
                    <div className="mt-1.5">
                      {gemelos.map((p) => (
                        <EnlaceProducto key={p.id} producto={p} onAbrir={onAbrirProducto} />
                      ))}
                    </div>
                  </div>
                )}
                {misma.length > 0 && (
                  <div>
                    <p className="text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                      <strong>Misma molécula</strong> en otra concentración o formulación. Tampoco rotan entre sí.
                    </p>
                    <div className="mt-1.5">
                      {misma.map((p) => (
                        <EnlaceProducto key={p.id} producto={p} onAbrir={onAbrirProducto} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Bloque>
          )}

          {/* ── Base funcional de los bioestimulantes ── */}
          {funcional && (
            <Bloque icono={Sprout} titulo={`Base funcional: ${funcional.nombre}`} color={COLORES.verde}>
              <div className="space-y-2 rounded-2xl bg-white p-3 text-sm leading-relaxed" style={{ color: COLORES.tinta, ...tarjeta }}>
                <p>
                  <strong>Qué hace.</strong> <TextoMarcado texto={funcional.que} />
                </p>
                <p>
                  <strong>Cómo combinar.</strong> <TextoMarcado texto={funcional.combinar} />
                </p>
                <p>
                  <strong>Cuándo.</strong> <TextoMarcado texto={funcional.cuando} />
                </p>
                {funcional.productos.length > 1 && (
                  <div className="pt-1">
                    {funcional.productos
                      .filter((id) => id !== producto.id)
                      .map((id) => PRODUCTOS.find((p) => p.id === id))
                      .filter(Boolean)
                      .map((p) => (
                        <EnlaceProducto key={p.id} producto={p} onAbrir={onAbrirProducto} />
                      ))}
                  </div>
                )}
              </div>
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
              {gruposQ.map(
                (g) =>
                  g.otrasMoleculas && (
                    <p key={`o-${g.clave}`} className="mb-2 rounded-2xl bg-white p-3 text-xs leading-relaxed" style={{ color: COLORES.textoSuave, ...tarjeta }}>
                      <strong style={{ color: COLORES.tinta }}>Otras casas venden el mismo grupo ({g.clave.replace(':', ' ')}):</strong>{' '}
                      {g.otrasMoleculas} Si el lote viene de alguna de ellas, este producto no es rotación.
                    </p>
                  )
              )}
              {cruces.map((c) => (
                <p key={`${c.a}-${c.b}`} className="mb-2 rounded-2xl p-3 text-xs leading-relaxed" style={{ color: COLORES.tinta, backgroundColor: COLORES.azulClaro }}>
                  <strong>Cruce que confunde:</strong> {c.a.replace(':', ' ')} y {c.b.replace(':', ' ')} actúan sobre {c.blanco},
                  pero en sitios distintos: sí sirven para rotar entre sí.
                </p>
              ))}
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
