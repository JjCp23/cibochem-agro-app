import React, { useState, useMemo, useEffect } from 'react';
import { Ban, Check, RotateCcw, ChevronDown } from 'lucide-react';
import { PRODUCTOS } from '../data/productos.js';
import { alternativasDeRotacion, mismosModoDeAccion, gruposDeRotacion } from '../motores/index.js';
import { fichasDeProducto } from '../data/gruposMoA.js';
import { COLORES, COLOR_CATEGORIA } from '../data/taxonomia.js';
import { TarjetaProducto } from './TarjetaProducto.jsx';
import { SelloGrupo } from './ui/Etiqueta.jsx';
import { Hexagono, EstadoVacio } from './ui/Superficie.jsx';
import { SelectorProducto } from './ui/SelectorProducto.jsx';
import { ICONO_CATEGORIA } from './ui/Iconos.jsx';
import { iconoDeProducto } from '../data/iconos3d.js';
import { NumeroAnimado } from './ui/Movimiento.jsx';

const VISIBLES_AL_INICIO = 8;

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
  const [id, setId] = useState(productoInicial?.id || '');
  const [verTodas, setVerTodas] = useState(false);

  useEffect(() => {
    if (productoInicial?.id) setId(productoInicial.id);
  }, [productoInicial]);

  useEffect(() => setVerTodas(false), [id]);

  const producto = useMemo(() => PRODUCTOS.find((p) => p.id === id) || null, [id]);
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
        <SelectorProducto
          valor={id}
          onCambio={setId}
          productos={rotables}
          titulo="¿Qué acabas de aplicar?"
          marcador="Selecciona el producto aplicado…"
        />
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
              <Hexagono icono={ICONO_CATEGORIA[producto.categoria]} imagen={iconoDeProducto(producto)} color={color} tamano={48} />
              <div className="min-w-0">
                <button
                  onClick={() => onAbrirProducto(producto)}
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
