import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
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
import { EstilosApp, prefiereMenosMovimiento } from './components/ui/Movimiento.jsx';
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

/**
 * Pestaña con la que abre la app. Los atajos del ícono instalado
 * (manifest.webmanifest) entran con ?vista=diagnostico o ?vista=mezcla.
 */
function vistaInicial() {
  try {
    const vista = new URLSearchParams(window.location.search).get('vista');
    return PESTANAS.some((p) => p.id === vista) ? vista : 'diagnostico';
  } catch {
    return 'diagnostico';
  }
}

export default function App() {
  const [pestana, setPestana] = useState(vistaInicial);
  const [productoAbierto, setProductoAbierto] = useState(null);
  const [productoRotacion, setProductoRotacion] = useState(null);
  const [verCiclo, setVerCiclo] = useState(false);
  const [buscador, setBuscador] = useState(null); // null | 'buscar' | 'favoritos'
  const [pedidoComparar, setPedidoComparar] = useState(null);
  const [favoritos] = useAlmacen(FAVORITOS);

  const actual = PESTANAS.find((p) => p.id === pestana);

  // Cada sección conserva su estado y su posición al cambiar de pestaña, como
  // en una app nativa: el diagnóstico a medias sigue ahí al volver de Mezcla.
  const vista = pestana === 'diagnostico' && verCiclo ? 'ciclo' : pestana;
  const posiciones = useRef({});
  const vistaAnterior = useRef(vista);
  const contenido = useRef(null);

  const recordarPosicion = () => {
    posiciones.current[vista] = window.scrollY;
  };

  useLayoutEffect(() => {
    if (vistaAnterior.current === vista) return;
    vistaAnterior.current = vista;
    window.scrollTo({ top: posiciones.current[vista] || 0 });
    if (!prefiereMenosMovimiento() && contenido.current?.animate) {
      contenido.current.animate(
        [
          { opacity: 0, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 280, easing: 'cubic-bezier(.2,.8,.2,1)' }
      );
    }
  }, [vista]);

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
    recordarPosicion();
    posiciones.current.rotacion = 0;
    // Copia nueva: aunque sea el mismo producto, Rotación vuelve a cargarlo
    setProductoRotacion({ ...producto });
    setProductoAbierto(null);
    setBuscador(null);
    setPestana('rotacion');
  };

  const agregarAMezcla = (producto) => {
    const agregado = agregarProductoAMezcla(producto);
    recordarPosicion();
    posiciones.current.mezcla = 0;
    setProductoAbierto(null);
    setBuscador(null);
    setPestana('mezcla');
    avisar(
      agregado ? `${producto.nombre} agregado a la mezcla` : `${producto.nombre} ya estaba en la mezcla`,
      agregado ? 'ok' : 'info'
    );
  };

  const compararProducto = (producto) => {
    recordarPosicion();
    posiciones.current.catalogo = 0;
    setProductoAbierto(null);
    setBuscador(null);
    setPedidoComparar({ id: producto.id, vez: Date.now() });
    setPestana('catalogo');
  };

  const cambiarPestana = (id) => {
    if (id === pestana) {
      // Tocar la pestaña activa vuelve a su inicio, como en las apps nativas
      if (verCiclo) verCicloDeVida(false);
      else window.scrollTo({ top: 0, behavior: prefiereMenosMovimiento() ? 'auto' : 'smooth' });
      return;
    }
    try {
      navigator.vibrate?.(8);
    } catch {
      // Sin vibración disponible
    }
    recordarPosicion();
    setPestana(id);
  };

  const verCicloDeVida = (activo) => {
    recordarPosicion();
    if (activo) posiciones.current.ciclo = 0;
    setVerCiclo(activo);
  };

  return (
    <div className="min-h-screen pb-28" style={{ backgroundColor: COLORES.papel }}>
      <EstilosApp />

      <Encabezado
        titulo={vista === 'ciclo' ? 'Ciclo de vida de la plaga' : actual.titulo}
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

      <main ref={contenido} className="mx-auto max-w-3xl px-4 py-5">
        <section hidden={vista !== 'diagnostico'}>
          <Diagnostico
            onAbrirProducto={abrirProducto}
            onVerCiclo={() => verCicloDeVida(true)}
            onBuscar={() => setBuscador('buscar')}
          />
        </section>
        {verCiclo && (
          <section hidden={vista !== 'ciclo'}>
            <CicloVida onAbrirProducto={abrirProducto} onVolver={() => verCicloDeVida(false)} />
          </section>
        )}
        <section hidden={vista !== 'catalogo'}>
          <Catalogo onAbrirProducto={abrirProducto} pedidoComparar={pedidoComparar} />
        </section>
        <section hidden={vista !== 'rotacion'}>
          <Rotacion onAbrirProducto={abrirProducto} productoInicial={productoRotacion} />
        </section>
        <section hidden={vista !== 'mezcla'}>
          <Mezcla onAbrirProducto={abrirProducto} />
        </section>
        <section hidden={vista !== 'aprender'}>
          <Aprender />
        </section>

        <p
          className="mt-10 border-t pt-4 text-center text-xs leading-relaxed"
          style={{ borderColor: COLORES.borde, color: COLORES.textoSuave }}
        >
          Herramienta de apoyo a la decisión sobre el portafolio Cibochem 2026.
          No reemplaza la etiqueta ICA ni la visita técnica: la decisión final y la aplicación en campo son
          responsabilidad del profesional o usuario que las ejecuta.
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
          key={productoAbierto.id}
          producto={productoAbierto}
          onAbrirProducto={abrirProducto}
          onCerrar={cerrarProducto}
          onVerRotacion={irARotacion}
          onAgregarAMezcla={agregarAMezcla}
          onComparar={compararProducto}
        />
      )}

      <Avisos />
    </div>
  );
}
