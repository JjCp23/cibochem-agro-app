import React, { useState, useMemo } from 'react';
import { Search, SearchX } from 'lucide-react';
import { PRODUCTOS } from '../data/productos.js';
import { buscarTexto } from '../motores/index.js';
import { COLORES, COLOR_CATEGORIA, CATEGORIAS } from '../data/taxonomia.js';
import { TarjetaProducto } from './TarjetaProducto.jsx';
import { Segmentado } from './ui/Superficie.jsx';
import { Comparador } from './Comparador.jsx';

function Filtro({ label, activo, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
      style={{
        borderColor: activo ? color : COLORES.borde,
        backgroundColor: activo ? color : '#fff',
        color: activo ? '#fff' : COLORES.textoSuave,
      }}
    >
      {label}
    </button>
  );
}

/** Catálogo completo del portafolio con búsqueda y filtros. */
export function Catalogo({ onAbrirProducto }) {
  const [vista, setVista] = useState('lista');
  const [termino, setTermino] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  const lista = useMemo(() => {
    let base = PRODUCTOS;
    if (categoria) base = base.filter((p) => p.categoria === categoria);
    if (soloDisponibles) base = base.filter((p) => p.estado === 'Disponible');
    return buscarTexto(termino, base);
  }, [termino, categoria, soloDisponibles]);

  const porCategoria = useMemo(() => {
    const mapa = {};
    lista.forEach((p) => {
      mapa[p.categoria] = mapa[p.categoria] || [];
      mapa[p.categoria].push(p);
    });
    return mapa;
  }, [lista]);

  return (
    <div>
      <Segmentado
        opciones={[
          { id: 'lista', label: 'Buscar' },
          { id: 'comparar', label: 'Comparar' },
        ]}
        valor={vista}
        onCambio={setVista}
      />

      {vista === 'comparar' ? (
        <div className="mt-5">
          <Comparador onAbrirProducto={onAbrirProducto} />
        </div>
      ) : (
      <div className="mt-5">
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Catálogo
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Busca por nombre comercial, ingrediente activo, familia química o código de grupo.
      </p>

      {/* Buscador */}
      <div className="relative mt-4">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: COLORES.textoSuave }}
        />
        <input
          type="text"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          placeholder="Abamectina, TIOXAM, triazol, 4A…"
          className="w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2"
          style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
        />
      </div>

      {/* Filtros */}
      <div className="mt-3 flex flex-wrap gap-2">
        <Filtro
          label="Todo"
          activo={!categoria}
          color={COLORES.tinta}
          onClick={() => setCategoria(null)}
        />
        {CATEGORIAS.map((c) => (
          <Filtro
            key={c}
            label={c}
            activo={categoria === c}
            color={COLOR_CATEGORIA[c]}
            onClick={() => setCategoria(categoria === c ? null : c)}
          />
        ))}
        <Filtro
          label="Solo disponibles"
          activo={soloDisponibles}
          color={COLORES.verde}
          onClick={() => setSoloDisponibles(!soloDisponibles)}
        />
      </div>

      <p className="mt-4 font-mono text-xs" style={{ color: COLORES.textoSuave }}>
        {lista.length} de {PRODUCTOS.length} productos
      </p>

      {lista.length === 0 ? (
        <div className="mt-8 flex flex-col items-center py-8 text-center">
          <SearchX size={28} style={{ color: COLORES.borde }} />
          <p className="mt-3 text-sm" style={{ color: COLORES.textoSuave }}>
            Nada coincide con «{termino}». Prueba con el ingrediente activo o el código del grupo.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-6">
          {Object.entries(porCategoria).map(([cat, items]) => (
            <div key={cat}>
              <h3
                className="mb-2 text-xs font-bold uppercase tracking-wide"
                style={{ color: COLOR_CATEGORIA[cat] }}
              >
                {cat} · {items.length}
              </h3>
              <div className="space-y-3">
                {items.map((p) => (
                  <TarjetaProducto key={p.id} producto={p} onAbrir={onAbrirProducto} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      )}
    </div>
  );
}

export default Catalogo;
