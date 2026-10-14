import React, { useState, useMemo } from 'react';
import {
  Plus,
  Trash2,
  AlertTriangle,
  Ruler,
  ListOrdered,
  Beaker,
  ChevronDown,
  CircleCheck,
  GraduationCap,
  Info,
  OctagonAlert,
} from 'lucide-react';
import { COLORES, COLOR_CATEGORIA } from '../data/taxonomia.js';
import { PRODUCTOS } from '../data/productos.js';
import {
  UNIDADES,
  unidadesSugeridas,
  calcularMezcla,
  calcularCalibracion,
  formulacionDe,
  ORDEN_TANQUE,
  COADYUVANTES,
  analizarFormulaciones,
  formatear,
  unidadAmigable,
} from '../motores/index.js';
import { compartenModoDeAccion, explicarConflicto } from '../motores/index.js';
import { SelloGrupo } from './ui/Etiqueta.jsx';
import { TutorialMezcla } from './TutorialMezcla.jsx';
import { Caneca } from './Caneca.jsx';

const entrada = 'w-full rounded-xl border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2';

function Campo({ etiqueta, ayuda, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
        {etiqueta}
      </span>
      {ayuda && (
        <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
          {ayuda}
        </span>
      )}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

/**
 * Sección plegable: muestra el título y el resumen, y despliega la
 * explicación al tocar. Así la lista de pasos se puede leer de un vistazo.
 */
function Seccion({ titulo, subtitulo, children }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <div className="rounded-xl border bg-white" style={{ borderColor: COLORES.borde }}>
      <button
        onClick={() => setAbierta((v) => !v)}
        className="flex w-full items-center justify-between gap-3 p-3 text-left"
        aria-expanded={abierta}
      >
        <span className="min-w-0">
          <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
            {titulo}
          </span>
          {subtitulo && (
            <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
              {subtitulo}
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform"
          style={{ color: COLORES.textoSuave, transform: abierta ? 'rotate(180deg)' : 'none' }}
        />
      </button>
      {abierta && (
        <div className="border-t px-3 pb-3 pt-2.5" style={{ borderColor: COLORES.borde }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Pestanita({ activo, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg px-3 py-1.5 text-xs font-semibold transition"
      style={{
        backgroundColor: activo ? COLORES.tinta : '#fff',
        color: activo ? '#fff' : COLORES.textoSuave,
        border: `1px solid ${activo ? COLORES.tinta : COLORES.borde}`,
      }}
    >
      {children}
    </button>
  );
}

/** Una línea de producto dentro de la mezcla de tanque. */
function LineaProducto({ item, onCambiar, onQuitar, condiciones, indice }) {
  const producto = PRODUCTOS.find((p) => p.id === item.productoId) || null;
  const opciones = unidadesSugeridas(producto);
  const color = producto ? COLOR_CATEGORIA[producto.categoria] : COLORES.tinta;
  const formulacion = formulacionDe(producto);

  const resultado = useMemo(
    () =>
      calcularMezcla({
        dosis: item.dosis,
        unidad: item.unidad,
        area: condiciones.area,
        volumenHa: condiciones.volumenHa,
        capacidadBomba: condiciones.capacidadBomba,
      }),
    [item.dosis, item.unidad, condiciones]
  );

  return (
    <div
      className="rounded-xl border bg-white p-3"
      style={{ borderColor: COLORES.borde, borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-start gap-2">
        <span className="mt-2 font-mono text-xs font-bold" style={{ color: COLORES.textoSuave }}>
          {String(indice + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <select
            value={item.productoId}
            onChange={(e) => {
              const nuevo = PRODUCTOS.find((p) => p.id === e.target.value);
              const nuevasUnidades = unidadesSugeridas(nuevo);
              onCambiar({
                ...item,
                productoId: e.target.value,
                unidad: nuevasUnidades.includes(item.unidad) ? item.unidad : nuevasUnidades[0],
              });
            }}
            className={entrada}
            style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
          >
            <option value="">Selecciona un producto…</option>
            {PRODUCTOS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.categoria} · {p.nombre}
              </option>
            ))}
          </select>

          {producto && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {producto.sistema && (
                <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
              )}
              {formulacion && (
                <span className="text-xs" style={{ color: COLORES.textoSuave }}>
                  {formulacion.nombre}
                </span>
              )}
              <span className="text-xs" style={{ color: COLORES.textoSuave }}>
                Envases: {producto.presentaciones.join(' · ')}
              </span>
            </div>
          )}

          <div className="mt-2 flex gap-2">
            <input
              type="number"
              min="0"
              step="any"
              value={item.dosis}
              onChange={(e) => onCambiar({ ...item, dosis: e.target.value })}
              placeholder="Dosis"
              className={entrada}
              style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
            />
            <select
              value={item.unidad}
              onChange={(e) => onCambiar({ ...item, unidad: e.target.value })}
              className="shrink-0 rounded-xl border bg-white px-2 text-sm"
              style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
            >
              {opciones.map((u) => (
                <option key={u} value={u}>
                  {UNIDADES[u].etiqueta}
                </option>
              ))}
            </select>
          </div>

          {resultado && (
            <div
              className="mt-2 rounded p-2 text-sm"
              style={{ backgroundColor: COLORES.papel, color: COLORES.tinta }}
            >
              <span className="font-mono font-bold">
                {unidadAmigable(resultado.productoPorBomba, resultado.base)}
              </span>{' '}
              por bomba ·{' '}
              <span className="font-mono font-bold">
                {unidadAmigable(resultado.productoTotal, resultado.base)}
              </span>{' '}
              para el lote
            </div>
          )}
        </div>

        <button
          onClick={onQuitar}
          className="shrink-0 rounded p-1.5 transition hover:bg-slate-100"
          aria-label="Quitar producto de la mezcla"
        >
          <Trash2 size={15} style={{ color: COLORES.textoSuave }} />
        </button>
      </div>
    </div>
  );
}

/** Calculadora de mezcla, calibración y orden de carga. */
export function Mezcla() {
  const [vista, setVista] = useState('mezcla');
  const [verTutorial, setVerTutorial] = useState(false);
  const [pasoCaneca, setPasoCaneca] = useState(0);
  const [condiciones, setCondiciones] = useState({
    area: '1',
    volumenHa: '200',
    capacidadBomba: '20',
  });
  const [items, setItems] = useState([{ productoId: '', dosis: '', unidad: 'L/ha' }]);

  // calibración
  const [calib, setCalib] = useState({ gastoLitros: '', anchoFranja: '', distancia: '' });
  const resultadoCalib = useMemo(() => calcularCalibracion(calib), [calib]);

  const productosElegidos = items
    .map((i) => PRODUCTOS.find((p) => p.id === i.productoId))
    .filter(Boolean);

  // Choques de modo de acción dentro de la misma mezcla
  const choques = useMemo(() => {
    const lista = [];
    for (let i = 0; i < productosElegidos.length; i += 1) {
      for (let j = i + 1; j < productosElegidos.length; j += 1) {
        if (compartenModoDeAccion(productosElegidos[i], productosElegidos[j])) {
          lista.push({
            a: productosElegidos[i],
            b: productosElegidos[j],
            motivo: explicarConflicto(productosElegidos[i], productosElegidos[j]),
          });
        }
      }
    }
    return lista;
  }, [productosElegidos]);

  // Tipos de formulación distintos en el tanque
  const formulaciones = useMemo(() => analizarFormulaciones(productosElegidos), [productosElegidos]);

  // Semáforo de la mezcla: con dos o más productos dice de un vistazo si hay
  // riesgo de incompatibilidad física, choque de modo de acción o nada que
  // reportar. La incompatibilidad física va primero porque corta el tanque.
  const estadoMezcla = useMemo(() => {
    if (productosElegidos.length < 2) return null;
    if (formulaciones.riesgo) {
      const siglas = formulaciones.tipos.map((t) => t.sigla).join(', ');
      return {
        Icono: OctagonAlert,
        fondo: '#FDF3EE',
        borde: '#F0C9B4',
        texto: '#C2410C',
        mensaje: `Riesgo de incompatibilidad: ${formulaciones.distintas} formulaciones distintas en el tanque (${siglas})`,
      };
    }
    if (choques.length > 0) {
      return {
        Icono: AlertTriangle,
        fondo: COLORES.ambarClaro,
        borde: COLORES.ambar,
        texto: COLORES.ambar,
        mensaje: 'Hay modos de acción repetidos en la mezcla',
      };
    }
    return {
      Icono: CircleCheck,
      fondo: COLORES.verdeClaro,
      borde: COLORES.verde,
      texto: COLORES.verde,
      mensaje: 'Sin conflictos detectados entre los productos seleccionados',
    };
  }, [productosElegidos.length, formulaciones, choques.length]);

  // Orden de carga con los productos de la mezcla ubicados en su paso. Un
  // paso de formulación sin ningún producto de la mezcla queda como "no
  // aplica"; los pasos generales (agua, acondicionador, cierre) siempre aplican.
  const pasosCaneca = useMemo(() => {
    const porPaso = new Map();
    items.forEach((item) => {
      const producto = PRODUCTOS.find((p) => p.id === item.productoId);
      if (!producto) return;
      const f = formulacionDe(producto);
      const paso = f?.ordenCarga || 8;
      const calculo = calcularMezcla({
        dosis: item.dosis,
        unidad: item.unidad,
        area: condiciones.area,
        volumenHa: condiciones.volumenHa,
        capacidadBomba: condiciones.capacidadBomba,
      });
      if (!porPaso.has(paso)) porPaso.set(paso, []);
      porPaso.get(paso).push({
        id: producto.id,
        nombre: producto.nombre,
        sigla: f?.sigla || '—',
        dosis: calculo ? `${unidadAmigable(calculo.productoPorBomba, calculo.base)} por bomba` : 'falta la dosis',
      });
    });
    return ORDEN_TANQUE.map((p) => {
      const productos = porPaso.get(p.paso) || [];
      return { ...p, productos, aplica: p.siglas.length === 0 || productos.length > 0 };
    });
  }, [items, condiciones]);

  const resumen = useMemo(
    () =>
      calcularMezcla({
        dosis: 1,
        unidad: 'L/ha',
        area: condiciones.area,
        volumenHa: condiciones.volumenHa,
        capacidadBomba: condiciones.capacidadBomba,
      }),
    [condiciones]
  );

  const actualizar = (campo) => (e) => setCondiciones({ ...condiciones, [campo]: e.target.value });

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Mezcla y aplicación
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Toma la dosis de la etiqueta y calcula cuánto va por bomba. Si mezclas varios productos,
        revisa además el orden de carga y los choques de modo de acción.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Pestanita activo={vista === 'mezcla'} onClick={() => setVista('mezcla')}>
          <Beaker size={12} className="mr-1 inline" /> Mezcla
        </Pestanita>
        <Pestanita activo={vista === 'calibracion'} onClick={() => setVista('calibracion')}>
          <Ruler size={12} className="mr-1 inline" /> Calibración
        </Pestanita>
        <Pestanita activo={vista === 'orden'} onClick={() => setVista('orden')}>
          <ListOrdered size={12} className="mr-1 inline" /> Orden de carga
        </Pestanita>
      </div>

      {/* ───────────── MEZCLA ───────────── */}
      {vista === 'mezcla' && (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Campo etiqueta="Área" ayuda="Hectáreas">
              <input
                type="number" min="0" step="any"
                value={condiciones.area} onChange={actualizar('area')}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
            <Campo etiqueta="Volumen" ayuda="Litros de agua por hectárea">
              <input
                type="number" min="0" step="any"
                value={condiciones.volumenHa} onChange={actualizar('volumenHa')}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
            <Campo etiqueta="Bomba" ayuda="Litros por tanque">
              <input
                type="number" min="0" step="any"
                value={condiciones.capacidadBomba} onChange={actualizar('capacidadBomba')}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
          </div>

          {resumen && (
            <div
              className="mt-3 rounded-lg p-3 text-sm"
              style={{ backgroundColor: COLORES.tinta, color: '#fff' }}
            >
              <span className="font-mono text-lg font-bold">{formatear(resumen.numeroBombas, 1)}</span>{' '}
              bombas ·{' '}
              <span className="font-mono text-lg font-bold">{formatear(resumen.aguaTotal, 0)} L</span>{' '}
              de agua en total
              {resumen.fraccionUltimaBomba > 0.01 && (
                <span style={{ color: '#9DB8C9' }}>
                  {' '}
                  · la última al {Math.round(resumen.fraccionUltimaBomba * 100)}%
                </span>
              )}
            </div>
          )}

          {estadoMezcla && (
            <div
              className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold"
              style={{
                backgroundColor: estadoMezcla.fondo,
                border: `1px solid ${estadoMezcla.borde}`,
                color: estadoMezcla.texto,
              }}
            >
              <estadoMezcla.Icono size={16} className="shrink-0" />
              {estadoMezcla.mensaje}
            </div>
          )}

          <div className="mt-5 space-y-3">
            {items.map((item, i) => (
              <LineaProducto
                key={i}
                indice={i}
                item={item}
                condiciones={condiciones}
                onCambiar={(nuevo) => setItems(items.map((it, j) => (j === i ? nuevo : it)))}
                onQuitar={() => setItems(items.filter((_, j) => j !== i))}
              />
            ))}
          </div>

          <button
            onClick={() => setItems([...items, { productoId: '', dosis: '', unidad: 'L/ha' }])}
            className="mt-3 flex items-center gap-1.5 rounded-2xl border border-dashed px-4 py-2 text-sm font-semibold transition hover:bg-white"
            style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
          >
            <Plus size={15} /> Agregar producto a la mezcla
          </button>

          {choques.length > 0 && (
            <div
              className="mt-4 rounded-lg p-3"
              style={{ backgroundColor: COLORES.ambarClaro, border: `1px solid ${COLORES.ambar}` }}
            >
              <p className="flex items-center gap-2 text-sm font-bold" style={{ color: COLORES.ambar }}>
                <AlertTriangle size={15} /> Modos de acción repetidos en la mezcla
              </p>
              <ul className="mt-2 space-y-1">
                {choques.map((c, i) => (
                  <li key={i} className="text-sm" style={{ color: COLORES.tinta }}>
                    {c.a.nombre} y {c.b.nombre}: {c.motivo}.
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs" style={{ color: COLORES.textoSuave }}>
                Mezclar dos productos del mismo sitio de acción no amplía el espectro y sí duplica la
                presión de selección sobre ese blanco.
              </p>
            </div>
          )}

          {formulaciones.riesgo && (
            <div
              className="mt-4 rounded-lg p-3"
              style={{ backgroundColor: '#FDF3EE', border: '1px solid #F0C9B4' }}
            >
              <p className="flex items-center gap-2 text-sm font-bold" style={{ color: '#C2410C' }}>
                <OctagonAlert size={15} /> Formulaciones distintas en la misma mezcla
              </p>
              <p className="mt-2 text-sm" style={{ color: COLORES.tinta }}>
                Estás combinando {formulaciones.distintas} tipos de formulación:{' '}
                {formulaciones.tipos.map((t) => `${t.nombre} (${t.sigla})`).join(', ')}. Mientras más tipos
                entran al mismo tanque, más pasos delicados hay en el orden de carga y más riesgo de grumos o
                separación — revisa la pestaña "Orden de carga" y no te saltes la prueba de frasco.
              </p>
            </div>
          )}
        </>
      )}

      {/* ───────────── CALIBRACIÓN ───────────── */}
      {vista === 'calibracion' && (
        <>
          <p className="mt-5 text-sm" style={{ color: COLORES.textoSuave }}>
            Asperja una distancia conocida con agua, mide cuántos litros gastaste y obtén el volumen
            real por hectárea. Ese número es el que debes usar en la pestaña de mezcla, no el que
            supones.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Campo etiqueta="Gasto medido" ayuda="Litros gastados en la prueba">
              <input
                type="number" min="0" step="any" value={calib.gastoLitros}
                onChange={(e) => setCalib({ ...calib, gastoLitros: e.target.value })}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
            <Campo etiqueta="Ancho de franja" ayuda="Metros que cubre un pase">
              <input
                type="number" min="0" step="any" value={calib.anchoFranja}
                onChange={(e) => setCalib({ ...calib, anchoFranja: e.target.value })}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
            <Campo etiqueta="Distancia recorrida" ayuda="Metros">
              <input
                type="number" min="0" step="any" value={calib.distancia}
                onChange={(e) => setCalib({ ...calib, distancia: e.target.value })}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
          </div>

          {resultadoCalib ? (
            <div className="mt-4 rounded-lg p-4" style={{ backgroundColor: COLORES.tinta }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#9DB8C9' }}>
                Volumen real de aplicación
              </p>
              <p className="mt-1 font-mono text-3xl font-bold text-white">
                {formatear(resultadoCalib.volumenHa, 0)} L/ha
              </p>
              <p className="mt-2 text-xs" style={{ color: '#9DB8C9' }}>
                Área tratada en la prueba: {formatear(resultadoCalib.areaTratada, 0)} m²
              </p>
              <button
                onClick={() => {
                  setCondiciones({ ...condiciones, volumenHa: String(Math.round(resultadoCalib.volumenHa)) });
                  setVista('mezcla');
                }}
                className="mt-3 rounded-lg px-3 py-1.5 text-xs font-semibold"
                style={{ backgroundColor: COLORES.naranja, color: '#fff' }}
              >
                Usar este volumen en la mezcla
              </button>
            </div>
          ) : (
            <div
              className="mt-4 rounded-2xl border border-dashed p-6 text-center text-sm"
              style={{ borderColor: COLORES.borde, color: COLORES.textoSuave }}
            >
              Completa los tres datos de la prueba para calcular el volumen real.
            </div>
          )}
        </>
      )}

      {/* ───────────── ORDEN DE CARGA ───────────── */}
      {vista === 'orden' && (
        <>
          <button
            onClick={() => setVerTutorial(true)}
            className="mt-5 flex w-full items-center gap-3 rounded-2xl p-4 text-left transition hover:opacity-90"
            style={{ backgroundColor: COLORES.tinta }}
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <GraduationCap size={22} color="#fff" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-white">Repaso rápido: que no se corte la mezcla</span>
              <span className="mt-0.5 block text-xs" style={{ color: '#9DB8C9' }}>
                Cinco ideas clave en un minuto
              </span>
            </span>
          </button>

          {/* La caneca de 200 L se llena paso a paso con los productos de la mezcla */}
          <div className="mt-5">
            <Caneca
              pasos={pasosCaneca}
              indiceActivo={pasoCaneca}
              onCambiarPaso={setPasoCaneca}
              capacidadLitros={200}
              color={COLORES.azul}
            />
          </div>

          <h3 className="mt-6 text-sm font-bold" style={{ color: COLORES.tinta }}>
            Regla general de carga
          </h3>
          <p className="mt-1 text-xs" style={{ color: COLORES.textoSuave }}>
            Toca cada paso para ver por qué importa, no solo qué hacer.
          </p>
          <div className="mt-2 space-y-2">
            {ORDEN_TANQUE.map((p) => (
              <Seccion key={p.paso} titulo={`${p.paso}. ${p.que}`} subtitulo={p.detalle}>
                <p className="text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  <strong>¿Por qué?</strong> {p.porque}
                </p>
              </Seccion>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold" style={{ color: COLORES.tinta }}>
            Coadyuvantes: qué hace cada tipo
          </h3>
          <p className="mt-1 text-xs" style={{ color: COLORES.textoSuave }}>
            No son el ingrediente activo — cambian cómo se comporta la mezcla o la gota.
          </p>
          <div className="mt-2 space-y-2">
            {COADYUVANTES.map((c) => (
              <Seccion key={c.categoria} titulo={c.categoria}>
                <p className="text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  {c.quePasa}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                  Cuándo se usa
                </p>
                <p className="mt-0.5 text-sm" style={{ color: COLORES.tinta }}>
                  {c.cuando}
                </p>
              </Seccion>
            ))}
          </div>

          <div className="mt-6 flex gap-2 rounded-lg p-3" style={{ backgroundColor: COLORES.azulClaro }}>
            <Info size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.azul }} />
            <p className="text-xs leading-relaxed" style={{ color: COLORES.tinta }}>
              <strong>Por qué se corta una mezcla aun siguiendo el orden:</strong> puede haber antagonismo
              físico-químico (un producto desestabiliza la formulación del otro) o antagonismo biológico (uno reduce
              la eficacia del otro sin que se note a simple vista). La etiqueta ICA es la fuente autorizada sobre
              mezclas conocidas; para lo que no está documentado, la prueba de frasco (más abajo) es la única forma
              confiable de detectarlo en campo.
            </p>
          </div>

          {verTutorial && <TutorialMezcla onCerrar={() => setVerTutorial(false)} />}
        </>
      )}

      <div className="mt-6 flex gap-2 rounded-lg p-3" style={{ backgroundColor: COLORES.papel }}>
        <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.textoSuave }} />
        <p className="text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
          La dosis debe salir siempre de la etiqueta ICA del producto. Antes de mezclar dos productos
          por primera vez, haz una prueba de compatibilidad en un frasco con la misma proporción y
          espera 15 minutos: si hay grumos, natas o separación, no los mezcles en el tanque.
        </p>
      </div>
    </div>
  );
}

export default Mezcla;
