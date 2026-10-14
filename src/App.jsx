import React, { useState, useEffect, useCallback } from 'react';
import { Stethoscope, LayoutList, RotateCcw, FlaskConical, GraduationCap, Search, Star } from 'lucide-react';
import { COLORES } from './data/taxonomia.js';
import { PRODUCTOS } from './data/productos.js';
import { FAVORITOS, RECIENTES, useAlmacen, anteponerReciente } from './estado/memoria.js';
import { Diagnostico } from './components/Diagnostico.jsx';
import { Catalogo } from './components/Catalogo.jsx';
import { Rotacion } from './components/Rotacion.jsx';
import { Mezcla, agregarProductoAMezcla } from './components/Mezcla.jsx';
import { CicloVida } from './components/CicloVida.jsx';
import { Aprender } from './components/Aprender.jsx';
import { FichaProducto } from './components/FichaProducto.jsx';
import { Buscador } from './components/Buscador.jsx';
import { BarraInferior, Encabezado, BotonEncabezado } from './components/ui/Superficie.jsx';
import { EstilosApp } from './components/ui/Movimiento.jsx';
import { Avisos, avisar } from './components/ui/Avisos.jsx';

// La barra inferior se queda con cinco entradas: más de eso deja de leerse
// bien en un teléfono. "Ciclo de vida" vive dentro de Diagnóstico.
const PESTANAS = [
  { id: 'diagnostico', label: 'Diagnóstico', icono: Stethoscope, titulo: 'Diagnóstico de campo' },
  { id: 'catalogo', label: 'Catálogo', icono: LayoutList, titulo: `Portafolio 2026 · ${PRODUCTOS.length} productos` },
  { id: 'rotacion', label: 'Rotación', icono: RotateCcw, titulo: 'Manejo de resistencia' },
  { id: 'mezcla', label: 'Mezcla', icono: FlaskConical, titulo: 'Mezcla y aplicación' },
  { id: 'aprender', label: 'Aprender', icono: GraduationCap, titulo: 'El porqué de cada recomendación' },
];

export default function App() {
  const [pestana, setPestana] = useState('diagnostico');
  const [productoAbierto, setProductoAbierto] = useState(null);
  const [productoRotacion, setProductoRotacion] = useState(null);
  const [verCiclo, setVerCiclo] = useState(false);
  const [buscador, setBuscador] = useState(null); // null | 'buscar' | 'favoritos'
  const [favoritos] = useAlmacen(FAVORITOS);

  const actual = PESTANAS.find((p) => p.id === pestana);

  // Avisar cuando se pierde la señal: con la app instalada todo sigue
  // funcionando, y conviene que el usuario lo sepa en vez de cerrar la app.
  useEffect(() => {
    const sinRed = () => avisar('Sin conexión: la app sigue funcionando', 'info');
    const conRed = () => avisar('Conexión recuperada', 'ok');
    window.addEventListener('offline', sinRed);
    window.addEventListener('online', conRed);
    return () => {
      window.removeEventListener('offline', sinRed);
      window.removeEventListener('online', conRed);
    };
  }, []);

  const abrirProducto = useCallback((producto) => {
    if (!producto) return;
    RECIENTES.fijar((l) => anteponerReciente(l, producto.id));
    setProductoAbierto(producto);
  }, []);

  const cerrarProducto = useCallback(() => setProductoAbierto(null), []);

  const irARotacion = (producto) => {
    setProductoRotacion(producto);
    setProductoAbierto(null);
    setBuscador(null);
    setVerCiclo(false);
    setPestana('rotacion');
    window.scrollTo({ top: 0 });
  };

  const agregarAMezcla = (producto) => {
    agregarProductoAMezcla(producto);
    setProductoAbierto(null);
    setBuscador(null);
    setVerCiclo(false);
    setPestana('mezcla');
    window.scrollTo({ top: 0 });
    avisar(`${producto.nombre} agregado a la mezcla`, 'ok');
  };

  const cambiarPestana = (id) => {
    if (id === pestana && !verCiclo) {
      // Tocar la pestaña activa sube al inicio, como en las apps nativas
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    try {
      navigator.vibrate?.(8);
    } catch {
      // Sin vibración disponible
    }
    setVerCiclo(false);
    setPestana(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen pb-28" style={{ backgroundColor: COLORES.papel }}>
      <EstilosApp />

      <Encabezado
        titulo={verCiclo ? 'Ciclo de vida de la plaga' : actual.titulo}
        acciones={
          <>
            <BotonEncabezado
              icono={Star}
              etiqueta="Favoritos"
              contador={favoritos.length}
              onClick={() => setBuscador('favoritos')}
            />
            <BotonEncabezado icono={Search} etiqueta="Buscar producto" onClick={() => setBuscador('buscar')} />
          </>
        }
      />

      <main key={`${pestana}-${verCiclo}`} className="cc-entrada mx-auto max-w-3xl px-4 py-5">
        {pestana === 'diagnostico' &&
          (verCiclo ? (
            <CicloVida onAbrirProducto={abrirProducto} onVolver={() => setVerCiclo(false)} />
          ) : (
            <Diagnostico
              onAbrirProducto={abrirProducto}
              onVerCiclo={() => {
                setVerCiclo(true);
                window.scrollTo({ top: 0 });
              }}
              onBuscar={() => setBuscador('buscar')}
            />
          ))}
        {pestana === 'catalogo' && <Catalogo onAbrirProducto={abrirProducto} />}
        {pestana === 'rotacion' && (
          <Rotacion onAbrirProducto={abrirProducto} productoInicial={productoRotacion} />
        )}
        {pestana === 'mezcla' && <Mezcla onAbrirProducto={abrirProducto} />}
        {pestana === 'aprender' && <Aprender />}

        <p
          className="mt-10 border-t pt-4 text-center text-xs leading-relaxed"
          style={{ borderColor: COLORES.borde, color: COLORES.textoSuave }}
        >
          Herramienta de apoyo a la decisión sobre el portafolio Cibochem 2026.
          No reemplaza la etiqueta ICA ni la visita técnica.
        </p>
      </main>

      <BarraInferior pestanas={PESTANAS} activa={pestana} onCambio={cambiarPestana} />

      {/* El buscador va antes que la ficha: así la ficha queda encima y al
          cerrarla se vuelve a los mismos resultados. */}
      {buscador && (
        <Buscador
          soloFavoritos={buscador === 'favoritos'}
          onCerrar={() => setBuscador(null)}
          onAbrirProducto={abrirProducto}
        />
      )}

      {productoAbierto && (
        <FichaProducto
          producto={productoAbierto}
          onCerrar={cerrarProducto}
          onVerRotacion={irARotacion}
          onAgregarAMezcla={agregarAMezcla}
        />
      )}

      <Avisos />
    </div>
  );
}
