import React, { useMemo, useState } from 'react';
import { Search, ChevronDown, Check, X, Clock, Ban } from 'lucide-react';
import { PRODUCTOS } from '../../data/productos.js';
import { COLORES, COLOR_CATEGORIA, CATEGORIAS } from '../../data/taxonomia.js';
import { buscarTexto } from '../../motores/index.js';
import { RECIENTES, useAlmacen, productosDeIds } from '../../estado/memoria.js';
import { HojaInferior } from './Hoja.jsx';
import { Hexagono, Chip } from './Superficie.jsx';
import { SelloGrupo } from './Etiqueta.jsx';
import { ICONO_CATEGORIA } from './Iconos.jsx';
import { iconoDeProducto } from '../../data/iconos3d.js';

/** ¿Pantalla táctil? Ahí no se abre el teclado solo: tapa media lista. */
function esTactil() {
  try {
    return window.matchMedia('(pointer: coarse)').matches;
  } catch {
    return false;
  }
}

/** Fila compacta de producto para listas de selección y búsqueda. */
export function FilaProductoCompacta({ producto, activo, onClick }) {
  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const Icono = ICONO_CATEGORIA[producto.categoria];
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors"
      style={{ backgroundColor: activo ? `${color}14` : 'transparent' }}
    >
      <Hexagono icono={Icono} imagen={iconoDeProducto(producto)} color={color} tamano={38} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold" style={{ color: COLORES.tinta }}>
          {producto.nombre}
        </span>
        <span className="block truncate text-xs" style={{ color: COLORES.textoSuave }}>
          {producto.ia}
        </span>
      </span>
      {producto.sistema && <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />}
      {activo && <Check size={18} className="cc-pop shrink-0" style={{ color }} />}
    </button>
  );
}

/**
 * Selector de producto con buscador. Reemplaza al desplegable nativo, que con
 * 80 productos obliga a recorrer una lista interminable en el teléfono: aquí se
 * escribe parte del nombre, del ingrediente o del grupo, o se filtra por línea.
 */
export function SelectorProducto({
  valor,
  onCambio,
  productos = PRODUCTOS,
  titulo = 'Escoge un producto',
  marcador = 'Selecciona un producto…',
  opcionVacia,
}) {
  const [abierto, setAbierto] = useState(false);
  const [termino, setTermino] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [recientesIds] = useAlmacen(RECIENTES);

  const elegido = productos.find((p) => p.id === valor) || null;
  const categorias = useMemo(
    () => CATEGORIAS.filter((c) => productos.some((p) => p.categoria === c)),
    [productos]
  );

  const lista = useMemo(() => {
    const base = categoria ? productos.filter((p) => p.categoria === categoria) : productos;
    return buscarTexto(termino, base);
  }, [productos, termino, categoria]);

  const recientes = useMemo(
    () => productosDeIds(recientesIds, productos).slice(0, 4),
    [recientesIds, productos]
  );
  const mostrarRecientes = !termino && !categoria && recientes.length > 0;

  const abrir = () => {
    setTermino('');
    setCategoria(null);
    setAbierto(true);
  };

  const color = elegido ? COLOR_CATEGORIA[elegido.categoria] : COLORES.textoSuave;

  return (
    <>
      <button
        type="button"
        onClick={abrir}
        className="cc-presionable flex w-full items-center gap-3 rounded-2xl border bg-white px-3 py-2.5 text-left"
        style={{ borderColor: elegido ? `${color}66` : COLORES.borde }}
      >
        {elegido ? (
          <Hexagono icono={ICONO_CATEGORIA[elegido.categoria]} imagen={iconoDeProducto(elegido)} color={color} tamano={36} />
        ) : (
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: COLORES.grisClaro }}
          >
            <Search size={15} style={{ color: COLORES.textoSuave }} />
          </span>
        )}
        <span className="min-w-0 flex-1">
          {elegido ? (
            <>
              <span className="block truncate text-sm font-bold" style={{ color: COLORES.tinta }}>
                {elegido.nombre}
              </span>
              <span className="block truncate text-xs" style={{ color: COLORES.textoSuave }}>
                {elegido.sistema ? `${elegido.sistema} ${elegido.grupo} · ` : ''}
                {elegido.ia}
              </span>
            </>
          ) : (
            <span className="block truncate text-sm" style={{ color: COLORES.textoSuave }}>
              {marcador}
            </span>
          )}
        </span>
        <ChevronDown size={18} className="shrink-0" style={{ color: COLORES.textoSuave }} />
      </button>

      {abierto && (
        <HojaInferior
          etiqueta={titulo}
          completa
          onCerrar={() => setAbierto(false)}
          cabecera={
            <div>
              <p className="text-base font-bold" style={{ color: COLORES.tinta }}>
                {titulo}
              </p>
              <div className="relative mt-3">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: COLORES.textoSuave }}
                />
                <input
                  type="search"
                  value={termino}
                  autoFocus={!esTactil()}
                  onChange={(e) => setTermino(e.target.value)}
                  placeholder="Nombre, ingrediente, grupo o plaga…"
                  className="w-full rounded-xl border py-2.5 pl-10 pr-9 text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: COLORES.borde, color: COLORES.tinta, backgroundColor: COLORES.papel }}
                />
                {termino && (
                  <button
                    onClick={() => setTermino('')}
                    aria-label="Borrar búsqueda"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1"
                  >
                    <X size={15} style={{ color: COLORES.textoSuave }} />
                  </button>
                )}
              </div>
              {categorias.length > 1 && (
                <div className="cc-sin-barra -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-0.5">
                  <Chip label="Todo" activo={!categoria} onClick={() => setCategoria(null)} />
                  {categorias.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      icono={ICONO_CATEGORIA[c]}
                      color={COLOR_CATEGORIA[c]}
                      activo={categoria === c}
                      onClick={() => setCategoria(categoria === c ? null : c)}
                    />
                  ))}
                </div>
              )}
            </div>
          }
        >
          {(cerrar) => {
            const escoger = (id) => {
              onCambio(id);
              cerrar();
            };
            return (
              <div className="px-2 pb-8 pt-2">
                {opcionVacia && !termino && (
                  <button
                    onClick={() => escoger('')}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left"
                    style={{ backgroundColor: !valor ? COLORES.grisClaro : 'transparent' }}
                  >
                    <span
                      className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: COLORES.grisClaro }}
                    >
                      <Ban size={16} style={{ color: COLORES.textoSuave }} />
                    </span>
                    <span className="flex-1 text-sm font-semibold" style={{ color: COLORES.tinta }}>
                      {opcionVacia}
                    </span>
                    {!valor && <Check size={18} style={{ color: COLORES.tinta }} />}
                  </button>
                )}

                {mostrarRecientes && (
                  <>
                    <p
                      className="flex items-center gap-1.5 px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: COLORES.textoSuave }}
                    >
                      <Clock size={12} /> Vistos hace poco
                    </p>
                    {recientes.map((p) => (
                      <FilaProductoCompacta key={`r-${p.id}`} producto={p} activo={p.id === valor} onClick={() => escoger(p.id)} />
                    ))}
                    <p
                      className="px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: COLORES.textoSuave }}
                    >
                      Todos ({lista.length})
                    </p>
                  </>
                )}

                {lista.length === 0 ? (
                  <p className="px-4 py-10 text-center text-sm" style={{ color: COLORES.textoSuave }}>
                    Nada coincide con «{termino}». Prueba con el ingrediente activo o el código del grupo.
                  </p>
                ) : (
                  lista.map((p) => (
                    <FilaProductoCompacta key={p.id} producto={p} activo={p.id === valor} onClick={() => escoger(p.id)} />
                  ))
                )}
              </div>
            );
          }}
        </HojaInferior>
      )}
    </>
  );
}

export default SelectorProducto;
