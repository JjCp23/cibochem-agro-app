import React, { useMemo, useState } from 'react';
import { Search, X, Star, Clock, Sparkles, SearchX, Trash2 } from 'lucide-react';
import { PRODUCTOS } from '../data/productos.js';
import { COLORES } from '../data/taxonomia.js';
import { buscarTexto } from '../motores/index.js';
import { FAVORITOS, RECIENTES, useAlmacen, productosDeIds } from '../estado/memoria.js';
import { HojaInferior } from './ui/Hoja.jsx';
import { FilaProductoCompacta } from './ui/SelectorProducto.jsx';

// Búsquedas de ejemplo: enseñan que se puede buscar por plaga, ingrediente o
// grupo, no solo por nombre comercial.
const SUGERENCIAS = ['mosca blanca', 'roya', 'coquito', 'glifosato', 'IRAC 4A', 'enraizar', 'trips', 'sigatoka'];

function TituloLista({ icono: Icono, children, accion }) {
  return (
    <div className="flex items-center justify-between px-3 pb-1 pt-4">
      <p
        className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-wide"
        style={{ color: COLORES.textoSuave }}
      >
        <Icono size={12} /> {children}
      </p>
      {accion}
    </div>
  );
}

/**
 * Buscador global: se abre desde el encabezado en cualquier sección. Queda
 * debajo de la ficha que se abra, así que al cerrarla se vuelve a los mismos
 * resultados.
 */
export function Buscador({ onCerrar, onAbrirProducto, soloFavoritos = false }) {
  const [termino, setTermino] = useState('');
  const [favoritosIds] = useAlmacen(FAVORITOS);
  const [recientesIds, setRecientes] = useAlmacen(RECIENTES);

  const resultados = useMemo(() => buscarTexto(termino, PRODUCTOS), [termino]);
  const favoritos = useMemo(() => productosDeIds(favoritosIds, PRODUCTOS), [favoritosIds]);
  const recientes = useMemo(() => productosDeIds(recientesIds, PRODUCTOS), [recientesIds]);
  const hayTermino = termino.trim().length > 0;

  return (
    <HojaInferior
      etiqueta={soloFavoritos ? 'Tus favoritos' : 'Buscar en el portafolio'}
      completa
      onCerrar={onCerrar}
      cabecera={
        <div>
          <p className="text-base font-bold" style={{ color: COLORES.tinta }}>
            {soloFavoritos ? 'Tus favoritos' : 'Buscar en el portafolio'}
          </p>
          {!soloFavoritos && (
            <div className="relative mt-3">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: COLORES.azul }}
              />
              <input
                type="search"
                autoFocus
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
                placeholder="Producto, ingrediente, grupo o plaga…"
                enterKeyHint="search"
                className="w-full rounded-2xl border py-3 pl-10 pr-10 text-[0.9375rem] focus:outline-none focus:ring-2"
                style={{ borderColor: COLORES.borde, color: COLORES.tinta, backgroundColor: COLORES.papel }}
              />
              {termino && (
                <button
                  onClick={() => setTermino('')}
                  aria-label="Borrar búsqueda"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1"
                  style={{ backgroundColor: COLORES.grisClaro }}
                >
                  <X size={14} style={{ color: COLORES.textoSuave }} />
                </button>
              )}
            </div>
          )}
        </div>
      }
    >
      <div className="px-2 pb-10 pt-1">
        {hayTermino ? (
          resultados.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <SearchX size={30} style={{ color: COLORES.borde }} />
              <p className="mt-3 text-sm" style={{ color: COLORES.textoSuave }}>
                Nada coincide con «{termino}». Prueba con el ingrediente activo, el código del grupo o el
                nombre de la plaga.
              </p>
            </div>
          ) : (
            <>
              <TituloLista icono={Search}>
                {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
              </TituloLista>
              <div className="cc-escalonado">
                {resultados.map((p) => (
                  <FilaProductoCompacta key={p.id} producto={p} onClick={() => onAbrirProducto(p)} />
                ))}
              </div>
            </>
          )
        ) : (
          <>
            {!soloFavoritos && (
              <>
                <TituloLista icono={Sparkles}>Prueba buscar</TituloLista>
                <div className="flex flex-wrap gap-2 px-3 pb-1 pt-1">
                  {SUGERENCIAS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTermino(s)}
                      className="cc-presionable rounded-full border bg-white px-3 py-1.5 text-xs font-semibold"
                      style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}

            <TituloLista icono={Star}>Favoritos ({favoritos.length})</TituloLista>
            {favoritos.length === 0 ? (
              <p className="px-3 pb-2 text-sm leading-relaxed" style={{ color: COLORES.textoSuave }}>
                Toca la estrella en la ficha de un producto para tenerlo siempre a mano aquí.
              </p>
            ) : (
              <div className="cc-escalonado">
                {favoritos.map((p) => (
                  <FilaProductoCompacta key={`f-${p.id}`} producto={p} onClick={() => onAbrirProducto(p)} />
                ))}
              </div>
            )}

            {!soloFavoritos && recientes.length > 0 && (
              <>
                <TituloLista
                  icono={Clock}
                  accion={
                    <button
                      onClick={() => setRecientes([])}
                      className="flex items-center gap-1 text-[0.6875rem] font-semibold"
                      style={{ color: COLORES.textoSuave }}
                    >
                      <Trash2 size={12} /> Borrar
                    </button>
                  }
                >
                  Vistos hace poco
                </TituloLista>
                <div className="cc-escalonado">
                  {recientes.map((p) => (
                    <FilaProductoCompacta key={`r-${p.id}`} producto={p} onClick={() => onAbrirProducto(p)} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </HojaInferior>
  );
}

export default Buscador;
