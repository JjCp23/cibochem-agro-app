import React, { useCallback, useState } from 'react';
import { Stethoscope, LayoutList, RotateCcw, Calculator, GraduationCap, Bug } from 'lucide-react';
import { COLORES } from './data/taxonomia.js';
import { PRODUCTOS } from './data/productos.js';
import { Diagnostico } from './components/Diagnostico.jsx';
import { Catalogo } from './components/Catalogo.jsx';
import { Rotacion } from './components/Rotacion.jsx';
import { Mezcla } from './components/Mezcla.jsx';
import { CicloVida } from './components/CicloVida.jsx';
import { Aprender } from './components/Aprender.jsx';
import { FichaProducto } from './components/FichaProducto.jsx';
import { AvisosApp } from './components/AvisosApp.jsx';
import { BarraInferior, Encabezado } from './components/ui/Superficie.jsx';

// La barra inferior se queda con cinco entradas: más de eso deja de leerse
// bien en un teléfono. "Ciclo de vida" vive dentro de Diagnóstico.
const PESTANAS = [
  { id: 'diagnostico', label: 'Diagnóstico', icono: Stethoscope, titulo: 'Contenido' },
  { id: 'catalogo', label: 'Catálogo', icono: LayoutList, titulo: 'Portafolio' },
  { id: 'rotacion', label: 'Rotación', icono: RotateCcw, titulo: 'Manejo de resistencia' },
  { id: 'mezcla', label: 'Mezcla', icono: Calculator, titulo: 'Calculadoras' },
  { id: 'aprender', label: 'Aprender', icono: GraduationCap, titulo: 'Datos de interés' },
];

const VISTAS = ['diagnostico', 'catalogo', 'rotacion', 'mezcla', 'aprender'];

/**
 * Pestaña con la que abre la app. Los atajos del ícono instalado
 * (manifest.webmanifest) entran con ?vista=diagnostico o ?vista=mezcla.
 */
function vistaInicial() {
  const vista = new URLSearchParams(window.location.search).get('vista');
  return VISTAS.includes(vista) ? vista : 'diagnostico';
}

export default function App() {
  const [pestana, setPestana] = useState(vistaInicial);
  const [productoAbierto, setProductoAbierto] = useState(null);
  const [productoRotacion, setProductoRotacion] = useState(null);
  const [verCiclo, setVerCiclo] = useState(false);

  const actual = PESTANAS.find((p) => p.id === pestana);

  // Función estable: la ficha la guarda en una referencia y no debe cambiar
  // en cada pintado.
  const cerrarFicha = useCallback(() => setProductoAbierto(null), []);

  const irARotacion = (producto) => {
    // La ficha abierta dejó una entrada en el historial: se consume para que
    // "atrás" no vuelva a una ficha que ya no está.
    if (window.history.state?.ficha) window.history.back();
    setProductoRotacion(producto);
    setProductoAbierto(null);
    setVerCiclo(false);
    setPestana('rotacion');
  };

  const cambiarPestana = (id) => {
    setVerCiclo(false);
    setPestana(id);
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: COLORES.papel }}>
      <Encabezado
        titulo={verCiclo ? 'Ciclo de vida' : actual.titulo}
        subtitulo={`${PRODUCTOS.length} productos · IRAC · HRAC · FRAC`}
      />

      <div className="mx-auto max-w-3xl">
        <AvisosApp />
      </div>

      <main className="mx-auto max-w-3xl px-4 py-5">
        {pestana === 'diagnostico' &&
          (verCiclo ? (
            <CicloVida onAbrirProducto={setProductoAbierto} onVolver={() => setVerCiclo(false)} />
          ) : (
            <Diagnostico onAbrirProducto={setProductoAbierto} onVerCiclo={() => setVerCiclo(true)} />
          ))}
        {pestana === 'catalogo' && <Catalogo onAbrirProducto={setProductoAbierto} />}
        {pestana === 'rotacion' && (
          <Rotacion onAbrirProducto={setProductoAbierto} productoInicial={productoRotacion} />
        )}
        {pestana === 'mezcla' && <Mezcla />}
        {pestana === 'aprender' && <Aprender />}

        <p
          className="mt-8 border-t pt-4 text-center text-xs leading-relaxed"
          style={{ borderColor: COLORES.borde, color: COLORES.textoSuave }}
        >
          Herramienta de apoyo a la decisión sobre el portafolio Cibochem 2026.
          No reemplaza la etiqueta ICA ni la visita técnica: la decisión final y la aplicación en campo son
          responsabilidad del profesional o usuario que las ejecuta.
        </p>
      </main>

      <BarraInferior pestanas={PESTANAS} activa={pestana} onCambio={cambiarPestana} />

      {productoAbierto && (
        <FichaProducto
          producto={productoAbierto}
          onCerrar={cerrarFicha}
          onVerRotacion={irARotacion}
        />
      )}
    </div>
  );
}
