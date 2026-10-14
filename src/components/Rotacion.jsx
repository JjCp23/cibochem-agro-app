import React, { useState, useMemo, useEffect } from 'react';
import { Ban, Check, RotateCcw, ChevronDown, FlaskConical, Search, X } from 'lucide-react';
import { PRODUCTOS } from '../data/productos.js';
import {
  alternativasDeRotacion,
  mismosModoDeAccion,
  gruposDeRotacion,
  gruposQuimicosDe,
  productoDesdeMolecula,
  MOLECULAS_PARA_VERIFICAR,
  normalizarTexto,
} from '../motores/index.js';
import { fichasDeProducto } from '../data/gruposMoA.js';
import { COLORES, COLOR_CATEGORIA } from '../data/taxonomia.js';
import { TarjetaProducto } from './TarjetaProducto.jsx';
import { SelloGrupo } from './ui/Etiqueta.jsx';
import { EstadoVacio, Segmentado, Chip } from './ui/Superficie.jsx';
import { HojaInferior } from './ui/Hoja.jsx';
import { SelectorProducto } from './ui/SelectorProducto.jsx';
import { NumeroAnimado } from './ui/Movimiento.jsx';
import { MiniaturaProducto } from './ui/Presentacion.jsx';

const VISIBLES_AL_INICIO = 8;
const NOMBRE_SISTEMA = { IRAC: 'Insecticidas', FRAC: 'Fungicidas', HRAC: 'Herbicidas' };

/**
 * Selector de molécula: para cuando lo último que se aplicó fue de otra casa.
 * En campo la gente recuerda la marca de la competencia o el ingrediente; el
 * motor solo necesita el grupo, y esta lista hace esa traducción.
 */
function SelectorMolecula({ valor, onCambio }) {
  const [abierto, setAbierto] = useState(false);
  const [termino, setTermino] = useState('');
  const [sistema, setSistema] = useState(null);
  const elegida = MOLECULAS_PARA_VERIFICAR.find((m) => m.nombre === valor) || null;

  const lista = useMemo(() => {
    const t = normalizarTexto(termino).trim();
    return MOLECULAS_PARA_VERIFICAR.filter(
      (m) =>
        (!sistema || m.grupo.startsWith(sistema)) &&
        (!t || normalizarTexto(`${m.nombre} ${m.familia} ${m.grupo.replace(':', ' ')}`).includes(t))
    );
  }, [termino, sistema]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setTermino('');
          setAbierto(true);
        }}
        className="cc-presionable flex w-full items-center gap-3 rounded-2xl border bg-white px-3 py-2.5 text-left"
        style={{ borderColor: elegida ? `${COLORES.azul}66` : COLORES.borde }}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: elegida ? COLORES.azulClaro : COLORES.grisClaro }}
        >
          <FlaskConical size={17} style={{ color: elegida ? COLORES.azul : COLORES.textoSuave }} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold" style={{ color: elegida ? COLORES.tinta : COLORES.textoSuave }}>
            {elegida ? elegida.nombre : 'Escoge la molécula que se aplicó…'}
          </span>
          {elegida && (
            <span className="block truncate text-xs" style={{ color: COLORES.textoSuave }}>
              {elegida.grupo.replace(':', ' ')} · {elegida.familia}
            </span>
          )}
        </span>
        <ChevronDown size={18} style={{ color: COLORES.textoSuave }} />
      </button>

      {abierto && (
        <HojaInferior
          etiqueta="Molécula aplicada"
          completa
          onCerrar={() => setAbierto(false)}
          cabecera={
            <div>
              <p className="text-base font-bold" style={{ color: COLORES.tinta }}>
                ¿Qué molécula se aplicó?
              </p>
              <p className="text-xs" style={{ color: COLORES.textoSuave }}>
                Del portafolio o de cualquier otra casa. Búscala por nombre, familia o grupo.
              </p>
              <div className="relative mt-3">
                <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORES.textoSuave }} />
                <input
                  type="search"
                  value={termino}
                  onChange={(e) => setTermino(e.target.value)}
                  placeholder="Clorpirifos, tebuconazol, IRAC 4…"
                  className="w-full rounded-xl border py-2.5 pl-10 pr-9 text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: COLORES.borde, color: COLORES.tinta, backgroundColor: COLORES.papel }}
                />
                {termino && (
                  <button onClick={() => setTermino('')} aria-label="Borrar búsqueda" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1">
                    <X size={15} style={{ color: COLORES.textoSuave }} />
                  </button>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                <Chip label="Todas" activo={!sistema} onClick={() => setSistema(null)} />
                {Object.entries(NOMBRE_SISTEMA).map(([k, n]) => (
                  <Chip key={k} label={n} activo={sistema === k} color={COLORES.azul} onClick={() => setSistema(sistema === k ? null : k)} />
                ))}
              </div>
            </div>
          }
        >
          {(cerrar) => (
            <div className="px-2 pb-8 pt-2">
              {lista.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm" style={{ color: COLORES.textoSuave }}>
                  No está en la lista. Busca el ingrediente activo que dice la etiqueta del producto.
                </p>
              ) : (
                lista.map((m) => (
                  <button
                    key={m.nombre}
                    onClick={() => {
                      onCambio(m.nombre);
                      cerrar();
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors"
                    style={{ backgroundColor: m.nombre === valor ? COLORES.azulClaro : 'transparent' }}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold" style={{ color: COLORES.tinta }}>
                        {m.nombre}
                      </span>
                      <span className="block truncate text-xs" style={{ color: COLORES.textoSuave }}>
                        {m.familia}
                        {m.otraCasa ? ' · otra casa' : ' · en el portafolio'}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-md px-2 py-1 font-mono text-[11px] font-bold" style={{ backgroundColor: COLORES.grisClaro, color: COLORES.tinta }}>
                      {m.grupo.replace(':', ' ')}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </HojaInferior>
      )}
    </>
  );
}

/** Contador grande de la decisión: cuántos repiten y cuántos sirven. */
function Contador({ icono: Icono, valor, etiqueta, color, fondo }) {
  return (
    <div className="flex-1 rounded-2xl p-3" style={{ backgroundColor: fondo }}>
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color }}>
        <Icono size={13} strokeWidth={2.6} /> {etiqueta}
      </span>
      <span className="mt-0.5 block font-mono text-3xl font-bold" style={{ color }}>
        <NumeroAnimado valor={valor} />
      </span>
    </div>
  );
}

/**
 * Planificador de rotación.
 *
 * La idea agronómica: la resistencia no se maneja cambiando de marca, se maneja
 * cambiando de sitio de acción. Esta vista lo hace visible.
 */
export function Rotacion({ onAbrirProducto, productoInicial }) {
  const [modo, setModo] = useState('portafolio');
  const [id, setId] = useState(productoInicial?.id || '');
  const [molecula, setMolecula] = useState('');
  const [verTodas, setVerTodas] = useState(false);

  useEffect(() => {
    if (productoInicial?.id) {
      setModo('portafolio');
      setId(productoInicial.id);
    }
  }, [productoInicial]);

  useEffect(() => setVerTodas(false), [id, molecula, modo]);

  const producto = useMemo(() => {
    if (modo === 'molecula') {
      const m = MOLECULAS_PARA_VERIFICAR.find((x) => x.nombre === molecula);
      return m ? productoDesdeMolecula(m) : null;
    }
    return PRODUCTOS.find((p) => p.id === id) || null;
  }, [modo, id, molecula]);
  const grupoTraducido = producto?.externo ? gruposQuimicosDe(producto)[0] : null;
  const bloqueados = useMemo(() => mismosModoDeAccion(producto), [producto]);
  const alternativas = useMemo(() => alternativasDeRotacion(producto), [producto]);
  const rotables = useMemo(() => PRODUCTOS.filter((p) => p.sistema), []);

  const color = producto ? COLOR_CATEGORIA[producto.categoria] : COLORES.tinta;
  const visibles = verTodas ? alternativas : alternativas.slice(0, VISIBLES_AL_INICIO);

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Plan de rotación
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Escoge lo que acabas de aplicar. La app separa el portafolio en lo que repite ese sitio de
        acción y lo que sirve para rotar.
      </p>

      <div className="mt-4">
        <Segmentado
          opciones={[
            { id: 'portafolio', label: 'Producto Cibochem' },
            { id: 'molecula', label: 'De otra casa' },
          ]}
          valor={modo}
          onCambio={setModo}
        />
      </div>

      <div className="mt-3">
        {modo === 'portafolio' ? (
          <SelectorProducto
            valor={id}
            onCambio={setId}
            productos={rotables}
            titulo="¿Qué acabas de aplicar?"
            marcador="Selecciona el producto aplicado…"
          />
        ) : (
          <SelectorMolecula valor={molecula} onCambio={setMolecula} />
        )}
      </div>

      {!producto && (
        <EstadoVacio
          icono={RotateCcw}
          imagen="rotacion"
          titulo="Rota el sitio de acción, no la marca"
          texto="Selecciona un producto para ver con qué puedes rotar sin repetir modo de acción."
        />
      )}

      {producto && (
        <div key={producto.id} className="cc-entrada">
          {/* Resumen del producto aplicado */}
          <div
            className="mt-5 rounded-3xl bg-white p-4"
            style={{ borderTop: `4px solid ${color}`, boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}
          >
            <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
              Ya aplicaste
            </p>
            <div className="mt-2 flex items-center gap-3">
              <MiniaturaProducto producto={producto} color={color} tamano={48} />
              <div className="min-w-0">
                <button
                  onClick={() => !producto.externo && onAbrirProducto(producto)}
                  className="block text-left text-base font-bold leading-tight hover:underline"
                  style={{ color: COLORES.tinta }}
                >
                  {producto.nombre}
                </button>
                <span className="mt-1 inline-block">
                  <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm" style={{ color: COLORES.tinta }}>
              Sitio de acción ocupado:{' '}
              <span className="font-mono font-semibold">
                {producto.sistema} {gruposDeRotacion(producto).join(' y ')}
              </span>{' '}
              ({producto.familia}).
            </p>
            {grupoTraducido && (
              <p className="mt-2 rounded-xl p-2.5 text-xs leading-relaxed" style={{ backgroundColor: COLORES.azulClaro, color: COLORES.tinta }}>
                <strong>Traducido a grupo:</strong> {grupoTraducido.nombre}
                {grupoTraducido.sitio ? ` · ${grupoTraducido.sitio}` : ''}.
                {grupoTraducido.fueraDelPortafolio
                  ? ' Ningún producto del portafolio está en este grupo, así que todo lo de la misma línea sirve para rotar.'
                  : ''}
              </p>
            )}

            <div className="mt-3 flex gap-2">
              <Contador icono={Ban} valor={bloqueados.length} etiqueta="Repiten" color="#C2410C" fondo="#FDF3EE" />
              <Contador icono={Check} valor={alternativas.length} etiqueta="Sirven" color={COLORES.verde} fondo={COLORES.verdeClaro} />
            </div>
          </div>

          {/* Motivo del grupo */}
          {fichasDeProducto(producto).map(
            ({ codigo, ficha }) =>
              ficha.rotacionMotivo && (
                <div key={codigo} className="mt-3 rounded-2xl bg-white p-3" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.06)' }}>
                  <p className="text-xs font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                    Por qué importa rotar el grupo {codigo}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                    {ficha.rotacionMotivo}
                  </p>
                </div>
              )
          )}

          {/* No rotar con */}
          <section className="mt-6">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: '#C2410C' }}>
              <Ban size={15} /> No rotar con estos ({bloqueados.length})
            </h3>
            <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
              Comparten el número de grupo, que es lo que define la resistencia cruzada. Aunque cambie el
              nombre comercial o la letra del subgrupo, la presión de selección es la misma.
            </p>
            {bloqueados.length === 0 ? (
              <p className="mt-3 text-sm italic" style={{ color: COLORES.textoSuave }}>
                Ningún otro producto del portafolio usa este sitio de acción.
              </p>
            ) : (
              <div className="cc-escalonado mt-3 flex flex-wrap gap-2">
                {bloqueados.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAbrirProducto(p)}
                    className="cc-presionable rounded-xl border px-3 py-1.5 text-left text-xs"
                    style={{ borderColor: '#F0C9B4', backgroundColor: '#FDF3EE' }}
                  >
                    <span className="block font-semibold line-through" style={{ color: '#C2410C' }}>
                      {p.nombre}
                    </span>
                    <span className="font-mono" style={{ color: COLORES.textoSuave }}>
                      {p.sistema} {p.grupo}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Sí rotar con */}
          <section className="mt-7">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: COLORES.verde }}>
              <Check size={15} /> Sirven para rotar ({alternativas.length})
            </h3>
            <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
              Ordenados por menor riesgo de resistencia primero.
            </p>
            <div className="cc-escalonado mt-3 space-y-3">
              {visibles.map((p) => (
                <TarjetaProducto key={p.id} producto={p} onAbrir={onAbrirProducto} />
              ))}
            </div>
            {alternativas.length > VISIBLES_AL_INICIO && (
              <button
                onClick={() => setVerTodas(!verTodas)}
                className="cc-presionable mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl border bg-white py-3 text-sm font-semibold"
                style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              >
                {verTodas ? 'Mostrar menos' : `Ver las ${alternativas.length} alternativas`}
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300"
                  style={{ transform: verTodas ? 'rotate(180deg)' : 'none' }}
                />
              </button>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default Rotacion;
