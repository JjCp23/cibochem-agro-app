import React, { useState, useMemo } from 'react';
import { Search, SearchX, X, Star, CheckCircle2, Scale, LayoutList } from 'lucide-react';
import { PRODUCTOS } from '../data/productos.js';
import { buscarTexto } from '../motores/index.js';
import { COLORES, COLOR_CATEGORIA, CATEGORIAS } from '../data/taxonomia.js';
import { FAVORITOS, useAlmacen } from '../estado/memoria.js';
import { TarjetaProducto } from './TarjetaProducto.jsx';
import { Segmentado, Chip, EstadoVacio } from './ui/Superficie.jsx';
import { ICONO_CATEGORIA } from './ui/Iconos.jsx';
import { NumeroAnimado } from './ui/Movimiento.jsx';
import { Comparador } from './Comparador.jsx';

/** Catálogo completo del portafolio con búsqueda y filtros. */
export function Catalogo({ onAbrirProducto }) {
  const [vista, setVista] = useState('lista');
  const [termino, setTermino] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [favoritos] = useAlmacen(FAVORITOS);

  // Lo que coincide con el texto y los filtros de estado, antes de la línea:
  // así cada chip de categoría muestra cuántos encontraría.
  const coincidencias = useMemo(() => {
    let base = PRODUCTOS;
    if (soloDisponibles) base = base.filter((p) => p.estado === 'Disponible');
    if (soloFavoritos) base = base.filter((p) => favoritos.includes(p.id));
    return buscarTexto(termino, base);
  }, [termino, soloDisponibles, soloFavoritos, favoritos]);

  const lista = useMemo(
    () => (categoria ? coincidencias.filter((p) => p.categoria === categoria) : coincidencias),
    [coincidencias, categoria]
  );

  const conteo = useMemo(() => {
    const mapa = {};
    coincidencias.forEach((p) => {
      mapa[p.categoria] = (mapa[p.categoria] || 0) + 1;
    });
    return mapa;
  }, [coincidencias]);

  const porCategoria = useMemo(() => {
    const mapa = {};
    lista.forEach((p) => {
      mapa[p.categoria] = mapa[p.categoria] || [];
      mapa[p.categoria].push(p);
    });
    return mapa;
  }, [lista]);

  const hayFiltros = termino || categoria || soloDisponibles || soloFavoritos;
  const limpiar = () => {
    setTermino('');
    setCategoria(null);
    setSoloDisponibles(false);
    setSoloFavoritos(false);
  };

  return (
    <div>
      <Segmentado
        opciones={[
          { id: 'lista', label: 'Buscar', icono: LayoutList },
          { id: 'comparar', label: 'Comparar', icono: Scale },
        ]}
        valor={vista}
        onCambio={setVista}
      />

      {vista === 'comparar' ? (
        <div key="comparar" className="cc-entrada mt-5">
          <Comparador onAbrirProducto={onAbrirProducto} />
        </div>
      ) : (
        <div key="lista" className="cc-entrada mt-4">
          {/* Buscador y filtros: quedan fijos arriba al recorrer la lista */}
          <div
            className="sticky z-20 -mx-4 px-4 pb-3 pt-2"
            style={{
              top: 'calc(56px + env(safe-area-inset-top))',
              backgroundColor: 'rgba(245,248,250,0.94)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: COLORES.azul }}
              />
              <input
                type="search"
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
                placeholder="Nombre, ingrediente, grupo o plaga…"
                enterKeyHint="search"
                className="w-full rounded-2xl border bg-white py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: COLORES.borde, color: COLORES.tinta, boxShadow: '0 1px 3px rgba(11,36,49,0.06)' }}
              />
              {termino && (
                <button
                  onClick={() => setTermino('')}
                  aria-label="Borrar búsqueda"
                  className="cc-pop absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1"
                  style={{ backgroundColor: COLORES.grisClaro }}
                >
                  <X size={14} style={{ color: COLORES.textoSuave }} />
                </button>
              )}
            </div>

            <div className="cc-sin-barra -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
              <Chip
                label="Todo"
                cuenta={coincidencias.length}
                activo={!categoria}
                onClick={() => setCategoria(null)}
              />
              {CATEGORIAS.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  icono={ICONO_CATEGORIA[c]}
                  cuenta={conteo[c] || 0}
                  activo={categoria === c}
                  color={COLOR_CATEGORIA[c]}
                  onClick={() => setCategoria(categoria === c ? null : c)}
                />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip
                label="Favoritos"
                icono={Star}
                cuenta={favoritos.length}
                activo={soloFavoritos}
                color="#E09612"
                onClick={() => setSoloFavoritos(!soloFavoritos)}
              />
              <Chip
                label="Solo disponibles"
                icono={CheckCircle2}
                activo={soloDisponibles}
                color={COLORES.verde}
                onClick={() => setSoloDisponibles(!soloDisponibles)}
              />
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between">
            <p className="font-mono text-xs" style={{ color: COLORES.textoSuave }}>
              <NumeroAnimado valor={lista.length} /> de {PRODUCTOS.length} productos
            </p>
            {hayFiltros && (
              <button onClick={limpiar} className="text-xs font-semibold" style={{ color: COLORES.azul }}>
                Limpiar filtros
              </button>
            )}
          </div>

          {lista.length === 0 ? (
            <EstadoVacio
              icono={soloFavoritos && favoritos.length === 0 ? Star : SearchX}
              titulo={soloFavoritos && favoritos.length === 0 ? 'Aún no tienes favoritos' : 'Sin coincidencias'}
              texto={
                soloFavoritos && favoritos.length === 0
                  ? 'Abre la ficha de un producto y toca la estrella para guardarlo aquí.'
                  : termino
                  ? `Nada coincide con «${termino}». Prueba con el ingrediente activo, el código del grupo o el nombre de la plaga.`
                  : 'Ningún producto cumple esos filtros.'
              }
              accion={
                <button
                  onClick={limpiar}
                  className="cc-presionable rounded-full px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: COLORES.azul }}
                >
                  Ver todo el portafolio
                </button>
              }
            />
          ) : (
            <div className="mt-4 space-y-6">
              {Object.entries(porCategoria).map(([cat, items]) => {
                const Icono = ICONO_CATEGORIA[cat];
                return (
                  <div key={cat}>
                    <h3
                      className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
                      style={{ color: COLOR_CATEGORIA[cat] }}
                    >
                      <Icono size={14} /> {cat} · {items.length}
                    </h3>
                    <div className="cc-escalonado space-y-3">
                      {items.map((p) => (
                        <TarjetaProducto key={p.id} producto={p} onAbrir={onAbrirProducto} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Catalogo;
