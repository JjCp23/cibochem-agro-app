import React, { useState } from 'react';
import { Stethoscope, BookOpen, RotateCcw, Beaker, Bug, GraduationCap } from 'lucide-react';
import { COLORES } from './data/taxonomia.js';
import { PRODUCTOS } from './data/productos.js';
import { Diagnostico } from './components/Diagnostico.jsx';
import { Catalogo } from './components/Catalogo.jsx';
import { Rotacion } from './components/Rotacion.jsx';
import { Mezcla } from './components/Mezcla.jsx';
import { CicloVida } from './components/CicloVida.jsx';
import { Aprender } from './components/Aprender.jsx';
import { FichaProducto } from './components/FichaProducto.jsx';

const PESTANAS = [
  { id: 'diagnostico', label: 'Diagnóstico', icono: Stethoscope },
  { id: 'catalogo', label: 'Catálogo', icono: BookOpen },
  { id: 'rotacion', label: 'Rotación', icono: RotateCcw },
  { id: 'ciclo', label: 'Ciclo de vida', icono: Bug },
  { id: 'mezcla', label: 'Mezcla', icono: Beaker },
  { id: 'aprender', label: 'Aprender', icono: GraduationCap },
];

export default function App() {
  const [pestana, setPestana] = useState('diagnostico');
  const [productoAbierto, setProductoAbierto] = useState(null);
  const [productoRotacion, setProductoRotacion] = useState(null);

  const irARotacion = (producto) => {
    setProductoRotacion(producto);
    setProductoAbierto(null);
    setPestana('rotacion');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORES.papel }}>
      <header style={{ backgroundColor: COLORES.tinta }}>
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded font-bold text-white"
              style={{ backgroundColor: COLORES.naranja }}
            >
              C
            </span>
            <div>
              <h1 className="text-lg font-bold leading-tight text-white">Cibochem Campo</h1>
              <p className="text-xs" style={{ color: '#9DB8C9' }}>
                Selector agronómico · {PRODUCTOS.length} productos · IRAC · HRAC · FRAC
              </p>
            </div>
          </div>
        </div>

        <nav className="mx-auto max-w-4xl px-4">
          <div className="flex gap-1 overflow-x-auto">
            {PESTANAS.map((p) => {
              const Icono = p.icono;
              const activo = pestana === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPestana(p.id)}
                  className="flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-semibold transition"
                  style={{
                    borderColor: activo ? COLORES.naranja : 'transparent',
                    color: activo ? '#fff' : '#9DB8C9',
                  }}
                >
                  <Icono size={15} />
                  {p.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {pestana === 'diagnostico' && <Diagnostico onAbrirProducto={setProductoAbierto} />}
        {pestana === 'catalogo' && <Catalogo onAbrirProducto={setProductoAbierto} />}
        {pestana === 'rotacion' && (
          <Rotacion onAbrirProducto={setProductoAbierto} productoInicial={productoRotacion} />
        )}
        {pestana === 'ciclo' && <CicloVida onAbrirProducto={setProductoAbierto} />}
        {pestana === 'mezcla' && <Mezcla />}
        {pestana === 'aprender' && <Aprender />}
      </main>

      <footer className="mx-auto max-w-4xl px-4 pb-8">
        <p
          className="border-t pt-4 text-xs leading-relaxed"
          style={{ borderColor: COLORES.borde, color: COLORES.textoSuave }}
        >
          Herramienta de apoyo a la decisión agronómica construida sobre el portafolio Cibochem 2026.
          Clasificación de modo de acción según IRAC, HRAC Global y FRAC. No reemplaza la etiqueta ICA
          ni la visita técnica: verifica siempre cultivo registrado, dosis, periodo de carencia y
          compatibilidad antes de aplicar.
        </p>
      </footer>

      {productoAbierto && (
        <FichaProducto
          producto={productoAbierto}
          onCerrar={() => setProductoAbierto(null)}
          onVerRotacion={irARotacion}
        />
      )}
    </div>
  );
}
