import React, { useState, useMemo, useEffect } from 'react';
import { Ban, Check, RotateCcw } from 'lucide-react';
import { PRODUCTOS } from '../data/productos.js';
import { alternativasDeRotacion, mismosModoDeAccion, gruposDeRotacion } from '../motores/index.js';
import { fichasDeProducto } from '../data/gruposMoA.js';
import { COLORES, COLOR_CATEGORIA } from '../data/taxonomia.js';
import { TarjetaProducto } from './TarjetaProducto.jsx';
import { SelloGrupo } from './ui/Etiqueta.jsx';

/**
 * Planificador de rotación.
 *
 * La idea agronómica: la resistencia no se maneja cambiando de marca, se maneja
 * cambiando de sitio de acción. Esta vista lo hace visible.
 */
export function Rotacion({ onAbrirProducto, productoInicial }) {
  const [id, setId] = useState(productoInicial?.id || '');

  useEffect(() => {
    if (productoInicial?.id) setId(productoInicial.id);
  }, [productoInicial]);

  const producto = useMemo(() => PRODUCTOS.find((p) => p.id === id) || null, [id]);
  const bloqueados = useMemo(() => mismosModoDeAccion(producto), [producto]);
  const alternativas = useMemo(() => alternativasDeRotacion(producto), [producto]);

  const rotables = PRODUCTOS.filter((p) => p.sistema);
  const color = producto ? COLOR_CATEGORIA[producto.categoria] : COLORES.tinta;

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Plan de rotación
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Escoge lo que acabas de aplicar. La app separa el portafolio en lo que repite ese sitio de
        acción y lo que sirve para rotar.
      </p>

      <select
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mt-4 w-full rounded-lg border bg-white px-3 py-2.5 text-sm"
        style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
      >
        <option value="">Selecciona el producto aplicado…</option>
        {rotables.map((p) => (
          <option key={p.id} value={p.id}>
            {p.categoria} · {p.nombre} — {p.sistema} {p.grupo}
          </option>
        ))}
      </select>

      {!producto && (
        <div className="mt-8 rounded-lg border border-dashed p-8 text-center" style={{ borderColor: COLORES.borde }}>
          <RotateCcw size={26} className="mx-auto" style={{ color: COLORES.borde }} />
          <p className="mt-3 text-sm" style={{ color: COLORES.textoSuave }}>
            Selecciona un producto para ver con qué puedes rotar sin repetir modo de acción.
          </p>
        </div>
      )}

      {producto && (
        <>
          {/* Resumen del producto aplicado */}
          <div
            className="mt-5 rounded-lg p-4"
            style={{ backgroundColor: `${color}0F`, border: `1px solid ${color}33` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
              Ya aplicaste
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-base font-bold" style={{ color: COLORES.tinta }}>
                {producto.nombre}
              </span>
              <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
            </div>
            <p className="mt-2 text-sm" style={{ color: COLORES.tinta }}>
              Sitio de acción ocupado:{' '}
              <span className="font-mono font-semibold">
                {gruposDeRotacion(producto).join(' y ')}
              </span>{' '}
              ({producto.familia}).
            </p>
          </div>

          {/* Motivo del grupo */}
          {fichasDeProducto(producto).map(({ codigo, ficha }) => (
            ficha.rotacionMotivo && (
              <div key={codigo} className="mt-3 rounded-lg border p-3" style={{ borderColor: COLORES.borde, backgroundColor: '#fff' }}>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                  Por qué importa rotar el grupo {codigo}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  {ficha.rotacionMotivo}
                </p>
              </div>
            )
          ))}

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
              <div className="mt-3 flex flex-wrap gap-2">
                {bloqueados.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAbrirProducto(p)}
                    className="rounded-lg border px-3 py-1.5 text-left text-xs transition hover:shadow-sm"
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
            <div className="mt-3 space-y-3">
              {alternativas.slice(0, 12).map((p) => (
                <TarjetaProducto key={p.id} producto={p} onAbrir={onAbrirProducto} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Rotacion;
