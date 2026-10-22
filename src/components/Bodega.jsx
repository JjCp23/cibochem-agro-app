import React, { useMemo, useState } from 'react';
import { Search, X, AlertTriangle, Share2, RotateCcw, Warehouse, PackageSearch, Pencil, ChevronRight } from 'lucide-react';
import { COLORES, COLOR_CATEGORIA } from '../data/taxonomia.js';
import { PRODUCTOS } from '../data/productos.js';
import { BODEGA_PRIVADA } from '../data/bodegaPrivada.js';
import { usePersistente } from '../estado/memoria.js';
import { itemValorado, resumenDeBodega, formatearPesos, cantidadLegible, claveDeItem } from '../motores/bodega.js';
import { Chip, EstadoVacio, Hexagono } from './ui/Superficie.jsx';
import { ICONO_CATEGORIA } from './ui/Iconos.jsx';
import { MiniaturaProducto } from './ui/Presentacion.jsx';
import { HojaInferior } from './ui/Hoja.jsx';
import { NumeroAnimado } from './ui/Movimiento.jsx';
import { avisar, compartirTexto } from './ui/Avisos.jsx';

const FILTROS_BODEGA = [
  { id: 'todo', label: 'Todo' },
  { id: 'cibochem', label: 'Cibochem' },
  { id: 'otra', label: 'Otras marcas' },
  { id: 'sinprecio', label: 'Sin precio' },
];

const COLOR_LINEA_BODEGA = { ...COLOR_CATEGORIA, Otros: COLORES.gris };

/** Medalla del ítem: foto del producto Cibochem o el ícono de su línea. */
function MedallaItem({ item, tamano = 44 }) {
  const producto = item.productoId && PRODUCTOS.find((p) => p.id === item.productoId);
  const color = COLOR_LINEA_BODEGA[item.linea] || COLORES.gris;
  if (producto) return <MiniaturaProducto producto={producto} color={color} tamano={tamano} />;
  return <Hexagono icono={ICONO_CATEGORIA[item.linea] || PackageSearch} color={color} tamano={tamano} relleno={false} />;
}

/** Hoja de un ítem: detalle del cálculo y ajuste de cantidad o precio. */
function HojaItem({ item, ajuste, onGuardar, onRestablecer, onAbrirProducto, onCerrar }) {
  const [cantidad, setCantidad] = useState(String(item.cantidad ?? ''));
  const [valor, setValor] = useState(String(item.precio?.valor ?? ''));
  const [presentacion, setPresentacion] = useState(String(item.precio?.presentacion ?? item.tamanoEnvase ?? ''));
  const producto = item.productoId && PRODUCTOS.find((p) => p.id === item.productoId);
  const unidad = item.base || 'cc';
  const entrada = 'w-full rounded-xl border bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2';
  const estilo = { borderColor: COLORES.borde, color: COLORES.tinta };

  return (
    <HojaInferior
      etiqueta={`Bodega: ${item.nombre}`}
      onCerrar={onCerrar}
      fondo={COLORES.papel}
      cabecera={
        <div className="flex items-center gap-3">
          <MedallaItem item={item} tamano={50} />
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
              {item.marca === 'cibochem' ? 'Cibochem' : 'Otra marca'} · {item.linea}
            </p>
            <h2 className="text-lg font-bold leading-tight" style={{ color: COLORES.tinta }}>
              {item.nombre}
            </h2>
          </div>
        </div>
      }
    >
      {(cerrar) => (
        <div className="space-y-4 px-5 pb-8 pt-4">
          <div className="rounded-2xl p-4" style={{ backgroundColor: COLORES.tinta }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#9DB8C9' }}>
              Valor en bodega
            </p>
            <p className="mt-1 font-mono text-3xl font-bold text-white">{formatearPesos(item.valor)}</p>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: '#9DB8C9' }}>
              {item.valor == null
                ? 'Falta el precio: escríbelo abajo y el valor se calcula al instante.'
                : `${cantidadLegible(item.cantidad, unidad)} × ${formatearPesos(item.precioUnidad)} el ${unidad} (${formatearPesos(
                    item.precio.valor
                  )} por ${cantidadLegible(item.precio.presentacion, unidad)}${item.precio.referencia ? `, «${item.precio.referencia}»` : ''}).`}
            </p>
          </div>

          {item.nota && (
            <p className="flex gap-2 rounded-2xl p-3 text-xs leading-relaxed" style={{ backgroundColor: COLORES.ambarClaro, color: COLORES.tinta }}>
              <AlertTriangle size={15} className="mt-0.5 shrink-0" style={{ color: COLORES.ambar }} />
              {item.nota}.
            </p>
          )}

          <div className="rounded-2xl bg-white p-4" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.07)' }}>
            <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: COLORES.tinta }}>
              <Pencil size={14} /> Ajustar en este teléfono
            </p>
            <p className="mt-0.5 text-xs" style={{ color: COLORES.textoSuave }}>
              Inventario inicial: {item.envases ?? '—'} envase(s)
              {item.tamanoEnvase ? ` de ${cantidadLegible(item.tamanoEnvase, unidad)}` : ''}.
            </p>
            <label className="mt-3 block text-xs font-semibold" style={{ color: COLORES.textoSuave }}>
              Cantidad que hay ({unidad})
              <input type="number" inputMode="decimal" min="0" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className={`${entrada} mt-1`} style={estilo} />
            </label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block text-xs font-semibold" style={{ color: COLORES.textoSuave }}>
                Precio (pesos)
                <input type="number" inputMode="numeric" min="0" value={valor} onChange={(e) => setValor(e.target.value)} className={`${entrada} mt-1`} style={estilo} />
              </label>
              <label className="block text-xs font-semibold" style={{ color: COLORES.textoSuave }}>
                Por cuántos {unidad}
                <input type="number" inputMode="decimal" min="0" value={presentacion} onChange={(e) => setPresentacion(e.target.value)} className={`${entrada} mt-1`} style={estilo} />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const igual =
                    cantidad === String(item.cantidad ?? '') &&
                    valor === String(item.precio?.valor ?? '') &&
                    presentacion === String(item.precio?.presentacion ?? item.tamanoEnvase ?? '');
                  if (igual) return cerrar();
                  onGuardar({
                    cantidad: cantidad === '' ? null : Number(cantidad),
                    valor: valor === '' ? null : Number(valor),
                    presentacion: presentacion === '' ? null : Number(presentacion),
                  });
                  cerrar();
                }}
                className="cc-presionable flex-1 rounded-xl py-2.5 text-sm font-bold text-white"
                style={{ backgroundColor: COLORES.azul }}
              >
                Guardar
              </button>
              {ajuste && (
                <button
                  onClick={() => {
                    onRestablecer();
                    cerrar();
                  }}
                  className="cc-presionable flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-semibold"
                  style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
                >
                  <RotateCcw size={14} /> Original
                </button>
              )}
            </div>
          </div>

          {producto && (
            <button
              onClick={() => onAbrirProducto(producto)}
              className="cc-presionable flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left text-sm font-semibold"
              style={{ color: COLORES.azul, boxShadow: '0 1px 3px rgba(11,36,49,0.07)' }}
            >
              Ver la ficha de {producto.nombre} <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}
    </HojaInferior>
  );
}

/**
 * Bodega: inventario con su valor estimado. Responde cuánto vale lo que hay,
 * qué pesa más y qué falta por valorar, y deja corregir cantidades y precios
 * a medida que la bodega se mueve.
 */
export function Bodega({ onAbrirProducto }) {
  const [ajustes, setAjustes] = usePersistente('cibo:bodega:ajustes', {});
  const [filtro, setFiltro] = useState('todo');
  const [termino, setTermino] = useState('');
  const [abierto, setAbierto] = useState(null);

  const items = useMemo(
    () => (BODEGA_PRIVADA?.items || []).map((it, i) => ({ ...itemValorado(it, ajustes[claveDeItem(it, i)]), clave: claveDeItem(it, i) })),
    [ajustes]
  );
  const resumen = useMemo(() => resumenDeBodega(items), [items]);

  const visibles = useMemo(() => {
    const t = termino.trim().toLowerCase();
    return items
      .filter((it) => (filtro === 'sinprecio' ? it.valor == null : filtro === 'todo' || it.marca === filtro))
      .filter((it) => !t || it.nombre.toLowerCase().includes(t) || it.linea.toLowerCase().includes(t))
      .sort((a, b) => (b.valor ?? -1) - (a.valor ?? -1));
  }, [items, filtro, termino]);

  if (!BODEGA_PRIVADA) {
    return (
      <EstadoVacio
        icono={Warehouse}
        titulo="La bodega aún no tiene inventario"
        texto="El inventario y los precios son datos del negocio: se cargan en la versión privada de la app y no viajan al repositorio público."
      />
    );
  }

  const lineas = Object.entries(resumen.porLinea).sort((a, b) => b[1] - a[1]);
  const abiertoItem = abierto && items.find((it) => it.clave === abierto);

  const compartir = () =>
    compartirTexto(
      `Bodega ${BODEGA_PRIVADA.bodega}`,
      [
        `BODEGA ${BODEGA_PRIVADA.bodega.toUpperCase()}`,
        `Valor estimado: ${formatearPesos(resumen.valor)} (${resumen.conPrecio} productos con precio, ${resumen.sinPrecio} sin precio)`,
        `Cibochem: ${formatearPesos(resumen.porMarca.cibochem)} · Otras marcas: ${formatearPesos(resumen.porMarca.otra)}`,
        '',
        ...lineas.map(([l, v]) => `${l}: ${formatearPesos(v)}`),
        '',
        'Lo que más pesa:',
        ...items
          .filter((it) => it.valor != null)
          .sort((a, b) => b.valor - a.valor)
          .slice(0, 5)
          .map((it, i) => `${i + 1}. ${it.nombre}: ${formatearPesos(it.valor)}`),
        '— Calculado con CiboCAMPO',
      ].join('\n')
    );

  return (
    <div>
      {/* Valor total: la cifra que se quiere ver primero */}
      <div className="cc-entrada rounded-3xl p-5" style={{ background: `linear-gradient(135deg, ${COLORES.tinta} 0%, #16384A 100%)` }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#9DB8C9' }}>
              Bodega {BODEGA_PRIVADA.bodega} · valor estimado
            </p>
            <p className="mt-1 font-mono text-3xl font-bold text-white">
              <NumeroAnimado valor={resumen.valor} duracion={900} formato={formatearPesos} />
            </p>
          </div>
          <button onClick={compartir} aria-label="Compartir resumen de bodega" className="cc-presionable rounded-full p-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            <Share2 size={17} color="#fff" />
          </button>
        </div>
        <p className="mt-1 text-xs" style={{ color: '#9DB8C9' }}>
          {items.length} productos · {resumen.conPrecio} con precio · {resumen.sinPrecio} sin precio
        </p>

        {/* Reparto por línea en una sola barra */}
        <div className="mt-4 flex h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
          {lineas.map(([l, v]) => (
            <span key={l} style={{ width: `${(v / resumen.valor) * 100}%`, backgroundColor: COLOR_LINEA_BODEGA[l] || COLORES.gris }} title={l} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {lineas.map(([l, v]) => (
            <span key={l} className="flex items-center justify-between gap-2 text-xs text-white">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: COLOR_LINEA_BODEGA[l] || COLORES.gris }} />
                <span className="truncate">{l}</span>
              </span>
              <span className="font-mono" style={{ color: '#9DB8C9' }}>
                {Math.round((v / resumen.valor) * 100)}%
              </span>
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            ['Cibochem', resumen.porMarca.cibochem],
            ['Otras marcas', resumen.porMarca.otra],
          ].map(([t, v]) => (
            <div key={t} className="rounded-2xl px-3 py-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide" style={{ color: '#9DB8C9' }}>
                {t}
              </p>
              <p className="font-mono text-sm font-bold text-white">{formatearPesos(v || 0)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-4">
        <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORES.azul }} />
        <input
          type="search"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          placeholder="Buscar en la bodega…"
          className="w-full rounded-2xl border bg-white py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2"
          style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
        />
        {termino && (
          <button onClick={() => setTermino('')} aria-label="Borrar búsqueda" className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1" style={{ backgroundColor: COLORES.grisClaro }}>
            <X size={14} style={{ color: COLORES.textoSuave }} />
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {FILTROS_BODEGA.map((f) => (
          <Chip
            key={f.id}
            label={f.label}
            activo={filtro === f.id}
            color={f.id === 'sinprecio' ? COLORES.ambar : COLORES.tinta}
            cuenta={f.id === 'sinprecio' ? resumen.sinPrecio : f.id === 'todo' ? items.length : items.filter((it) => it.marca === f.id).length}
            onClick={() => setFiltro(f.id)}
          />
        ))}
      </div>

      <div className="cc-escalonado mt-4 space-y-2">
        {visibles.map((it) => (
          <button
            key={it.clave}
            onClick={() => setAbierto(it.clave)}
            className="cc-presionable flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left"
            style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}
          >
            <MedallaItem item={it} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-sm font-bold" style={{ color: COLORES.tinta }}>
                  {it.nombre}
                </span>
                {(it.nota || it.ajustado) && (
                  <span className="shrink-0 rounded-full px-1.5 text-[0.625rem] font-bold" style={{ backgroundColor: it.ajustado ? COLORES.azulClaro : COLORES.ambarClaro, color: it.ajustado ? COLORES.azul : COLORES.ambar }}>
                    {it.ajustado ? 'ajustado' : 'revisar'}
                  </span>
                )}
              </span>
              <span className="block text-xs" style={{ color: COLORES.textoSuave }}>
                {cantidadLegible(it.cantidad, it.base)} · {it.linea}
                {it.precioUnidad != null ? ` · ${formatearPesos(it.precioUnidad)}/${it.base}` : ''}
              </span>
            </span>
            <span className="shrink-0 text-right font-mono text-sm font-bold" style={{ color: it.valor == null ? COLORES.ambar : COLORES.tinta }}>
              {it.valor == null ? 'sin precio' : formatearPesos(it.valor)}
            </span>
          </button>
        ))}
        {visibles.length === 0 && <EstadoVacio icono={PackageSearch} titulo="Nada coincide" texto="Prueba con otro nombre o quita el filtro." />}
      </div>

      <p className="mt-4 text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
        Valor estimado con el inventario de {BODEGA_PRIVADA.fuenteInventario} y los precios de «{BODEGA_PRIVADA.fuentePrecios}».
        Los envases abiertos cuentan por lo que les queda. Los ajustes quedan solo en este teléfono.
      </p>

      {abiertoItem && (
        <HojaItem
          key={abiertoItem.clave}
          item={abiertoItem}
          ajuste={ajustes[abiertoItem.clave]}
          onCerrar={() => setAbierto(null)}
          onAbrirProducto={onAbrirProducto}
          onGuardar={(a) => {
            setAjustes((prev) => ({ ...prev, [abiertoItem.clave]: a }));
            avisar('Ajuste guardado en este teléfono');
          }}
          onRestablecer={() => {
            setAjustes((prev) => {
              const { [abiertoItem.clave]: _, ...resto } = prev;
              return resto;
            });
            avisar('Volvió al inventario original', 'info');
          }}
        />
      )}
    </div>
  );
}

export default Bodega;
