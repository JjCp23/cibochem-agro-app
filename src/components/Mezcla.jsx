import React, { useState, useMemo } from 'react';
import {
  Plus,
  Trash2,
  AlertTriangle,
  Ruler,
  ListOrdered,
  FlaskConical,
  ClipboardCheck,
  Droplets,
  Container,
  Share2,
  Eraser,
  Check,
  PartyPopper,
  ArrowRight,
  Minus,
  ChevronDown,
  Calculator,
  Lightbulb,
  Package,
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
  formatear,
  unidadAmigable,
  partirCantidad,
  envasesNecesarios,
  recetaDeMezcla,
  compartenModoDeAccion,
  explicarConflicto,
} from '../motores/index.js';
import { MEZCLA_PRODUCTOS, useAlmacen, usePersistente } from '../estado/memoria.js';
import { SelloGrupo } from './ui/Etiqueta.jsx';
import { Segmentado, Chip, EstadoVacio } from './ui/Superficie.jsx';
import { SelectorProducto } from './ui/SelectorProducto.jsx';
import { NumeroAnimado } from './ui/Movimiento.jsx';
import { compartirTexto, avisar } from './ui/Avisos.jsx';
import { IconoIlustrado } from './ui/Iconos.jsx';

const entrada = 'w-full rounded-xl border bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2';

// Tamaños de equipo más comunes en campo, para no tener que escribirlos
const PRESETS_BOMBA = [
  { litros: '20', label: 'Espalda 20 L' },
  { litros: '200', label: 'Estacionaria 200 L' },
  { litros: '400', label: 'Tractor 400 L' },
  { litros: '600', label: 'Tractor 600 L' },
];

/**
 * Lista de chequeo antes de salir a aplicar. Son las buenas prácticas que
 * evitan los errores caros: deriva, lavado por lluvia, mezclas incompatibles
 * e intoxicaciones. No reemplaza lo que diga la etiqueta.
 */
const ITEMS_CHEQUEO = [
  { id: 'etiqueta', imagen: 'etiqueta', titulo: 'Leí la etiqueta ICA', detalle: 'Dosis, cultivo registrado, periodo de carencia y de reentrada.' },
  { id: 'epp', imagen: 'epp', titulo: 'Equipo de protección completo', detalle: 'Guantes de nitrilo, careta o gafas, respirador, overol y botas.' },
  { id: 'equipo', imagen: 'equipo', titulo: 'Equipo calibrado y sin fugas', detalle: 'Boquillas revisadas y del tipo correcto; filtros limpios.' },
  { id: 'viento', imagen: 'viento', titulo: 'Viento suave', detalle: 'Se mueven las hojas, no las ramas. Con viento fuerte hay deriva; con calma total puede haber inversión térmica.' },
  { id: 'lluvia', imagen: 'lluvia', titulo: 'Sin lluvia cercana', detalle: 'Revisa en la etiqueta cuántas horas sin lluvia necesita el producto.' },
  { id: 'hora', imagen: 'hora', titulo: 'Horas frescas', detalle: 'Temprano o al final de la tarde: con calor fuerte y aire seco la gota se evapora antes de llegar.' },
  { id: 'frasco', imagen: 'frasco', titulo: 'Prueba de compatibilidad', detalle: 'Si mezclas, prueba en un frasco con la misma proporción y espera 15 minutos.' },
  { id: 'agua', imagen: 'agua', titulo: 'Agua limpia', detalle: 'Sin barro ni materia orgánica; corrige pH o dureza si la etiqueta lo pide.' },
  { id: 'envases', imagen: 'envases', titulo: 'Plan para envases y sobrantes', detalle: 'Triple lavado, perforar el envase y entregarlo al punto de acopio.' },
];

// Los tres datos de la prueba de calibración y para qué sirve cada uno
const CAMPOS_CALIBRACION = [
  {
    id: 'gastoLitros',
    etiqueta: 'Gasto medido',
    ayuda: 'litros',
    placeholder: 'Ej. 4',
    uso: 'Agua que gastó el equipo en la prueba: lo que falta en el tanque al terminar.',
  },
  {
    id: 'anchoFranja',
    etiqueta: 'Ancho de franja',
    ayuda: 'metros',
    placeholder: 'Ej. 3',
    uso: 'Lo que moja un solo pase. Con él se sabe qué área cubriste.',
  },
  {
    id: 'distancia',
    etiqueta: 'Distancia recorrida',
    ayuda: 'metros',
    placeholder: 'Ej. 50',
    uso: 'Lo que caminaste asperjando. Ancho × distancia es el área mojada.',
  },
];

function nuevaLinea(producto = null) {
  const unidades = unidadesSugeridas(producto);
  return {
    clave: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    productoId: producto?.id || '',
    dosis: '',
    unidad: unidades[0],
  };
}

/**
 * Agrega un producto a la mezcla en curso desde cualquier parte de la app (la
 * ficha técnica, por ejemplo). Si hay una línea vacía, la ocupa. Devuelve
 * false si el producto ya estaba en la mezcla.
 */
export function agregarProductoAMezcla(producto) {
  if (MEZCLA_PRODUCTOS.obtener().some((l) => l.productoId === producto.id)) return false;
  MEZCLA_PRODUCTOS.fijar((lista) => {
    const vacia = lista.findIndex((l) => !l.productoId);
    if (vacia !== -1) {
      const copia = [...lista];
      copia[vacia] = { ...nuevaLinea(producto), clave: lista[vacia].clave };
      return copia;
    }
    return [...lista, nuevaLinea(producto)];
  });
  return true;
}

const sombraSuave = '0 1px 3px rgba(11,36,49,0.08)';

/** Une una lista en español: "el área, el volumen y la bomba". */
function unirConY(lista) {
  if (lista.length <= 1) return lista.join('');
  return `${lista.slice(0, -1).join(', ')} y ${lista[lista.length - 1]}`;
}

const valorPositivo = (v) => Number(v) > 0;

/** Qué datos del lote faltan para poder calcular bombas y agua. */
function datosFaltantesDelLote(c) {
  const falta = [];
  if (!valorPositivo(c.area)) falta.push({ id: 'area', texto: 'el área del lote' });
  if (!valorPositivo(c.volumenHa)) falta.push({ id: 'volumenHa', texto: 'el volumen de agua por hectárea' });
  if (!valorPositivo(c.capacidadBomba)) falta.push({ id: 'capacidadBomba', texto: 'los litros de tu bomba' });
  return falta;
}

/** Qué datos faltan para calcular el volumen real de la calibración. */
function datosFaltantesDeCalibracion(c) {
  const falta = [];
  if (!valorPositivo(c.gastoLitros)) falta.push('el gasto medido');
  if (!valorPositivo(c.anchoFranja)) falta.push('el ancho de franja');
  if (!valorPositivo(c.distancia)) falta.push('la distancia recorrida');
  return falta;
}

/** Suma o resta un paso y devuelve texto limpio, sin decimales flotantes ni negativos. */
function ajustarNumero(valor, delta) {
  const nuevo = Math.max(0, (Number(valor) || 0) + delta);
  return String(Number(nuevo.toFixed(4)));
}

/** Campo con etiqueta y una línea que explica para qué sirve el dato. */
function Campo({ id, etiqueta, ayuda, uso, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-wide"
        style={{ color: COLORES.textoSuave }}
      >
        {etiqueta}
        {ayuda && <span className="ml-1.5 font-medium normal-case tracking-normal">· {ayuda}</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {uso && (
        <p className="mt-1.5 text-xs leading-snug" style={{ color: COLORES.textoSuave }}>
          {uso}
        </p>
      )}
    </div>
  );
}

/**
 * Dato del lote con botones − / + para ajustar rápido con el pulgar y una
 * línea que dice para qué sirve. Todo lo que se escribe se recalcula al instante.
 */
function CondicionLote({ id, etiqueta, unidad, uso, valor, onCambio, paso, placeholder, falta, extra }) {
  const sinValor = !valorPositivo(valor);
  const boton = 'cc-presionable flex h-11 w-11 shrink-0 items-center justify-center rounded-xl disabled:opacity-40';
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="min-w-0">
          <span className="block text-sm font-bold" style={{ color: COLORES.tinta }}>
            {etiqueta}
          </span>
          <span className="block text-xs font-semibold" style={{ color: COLORES.textoSuave }}>
            {unidad}
          </span>
        </label>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => onCambio(ajustarNumero(valor, -paso))}
            disabled={sinValor}
            aria-label={`Bajar ${etiqueta.toLowerCase()} en ${paso}`}
            className={boton}
            style={{ backgroundColor: COLORES.grisClaro, color: COLORES.tinta }}
          >
            <Minus size={18} strokeWidth={2.5} />
          </button>
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={valor}
            onChange={(e) => onCambio(e.target.value)}
            placeholder={placeholder}
            className="h-11 w-[84px] rounded-xl border bg-white px-1 text-center font-mono text-base font-bold focus:outline-none focus:ring-2"
            style={{ borderColor: falta ? COLORES.ambar : COLORES.borde, color: COLORES.tinta }}
          />
          <button
            type="button"
            onClick={() => onCambio(ajustarNumero(valor, paso))}
            aria-label={`Subir ${etiqueta.toLowerCase()} en ${paso}`}
            className={boton}
            style={{ backgroundColor: COLORES.azulClaro, color: COLORES.tinta }}
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
      <p className="mt-1.5 text-xs leading-snug" style={{ color: COLORES.textoSuave }}>
        {uso}
      </p>
      {extra}
    </div>
  );
}

/** Aviso amable: guía cuando falta un dato o llama la atención sin asustar. */
function AvisoAmable({ tono = 'info', imagen, className = '', children }) {
  const ojo = tono === 'ojo';
  const Icono = ojo ? AlertTriangle : Lightbulb;
  const color = ojo ? COLORES.ambar : COLORES.azul;
  return (
    <div
      role="status"
      className={`cc-entrada flex items-start gap-2.5 rounded-2xl px-3 py-2.5 ${className}`}
      style={{ backgroundColor: ojo ? COLORES.ambarClaro : `${COLORES.azul}14` }}
    >
      {imagen ? (
        <IconoIlustrado nombre={imagen} tamano={30} respaldo={Icono} color={color} className="shrink-0" />
      ) : (
        <Icono size={16} className="mt-0.5 shrink-0" style={{ color }} />
      )}
      <p className="min-w-0 text-xs leading-snug sm:text-sm" style={{ color: COLORES.tinta }}>
        {children}
      </p>
    </div>
  );
}

/** Número en grande para el resumen de la mezcla, con su uso práctico. */
function Cifra({ icono: Icono, valor, unidad, etiqueta, uso, decimales = 1 }) {
  return (
    <div className="flex-1 rounded-2xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#9DB8C9' }}>
        <Icono size={13} /> {etiqueta}
      </span>
      <span className="mt-1 block font-mono text-2xl font-bold text-white">
        <NumeroAnimado valor={valor} formato={(n) => formatear(n, decimales)} />
        {unidad && <span className="ml-1 text-sm font-semibold">{unidad}</span>}
      </span>
      {uso && (
        <span className="mt-1.5 block text-[11px] leading-snug" style={{ color: '#9DB8C9' }}>
          {uso}
        </span>
      )}
    </div>
  );
}

/** Cantidad de producto con el número animado y la unidad cómoda (350 cc, 1.5 L). */
function Cantidad({ valor, base }) {
  const p = partirCantidad(valor, base);
  if (!p) return <>—</>;
  return (
    <>
      {/* la clave evita animar de 350 cc a 1.2 L pasando por números sin sentido */}
      <NumeroAnimado key={p.unidad} valor={p.numero} formato={(n) => formatear(n, p.decimales)} /> {p.unidad}
    </>
  );
}

/** Fórmulas en lenguaje simple, plegables, con los números del lote cuando ya están. */
function ComoSeCalcula({ condiciones, resumen }) {
  const [abierto, setAbierto] = useState(false);
  const pasos = [
    {
      formula: 'Dosis por hectárea × área = total del lote',
      nota: 'Sirve para las dosis en L/ha, cc/ha, Kg/ha y g/ha. Es lo que sacas de bodega.',
    },
    {
      formula: 'Total del lote ÷ número de bombas = por bomba',
      nota: 'Es lo que mides y echas en cada tanque.',
    },
    {
      formula: 'Agua total ÷ litros de la bomba = número de bombas',
      nota: 'El agua total es el volumen por hectárea × el área.',
    },
    {
      formula: 'Dosis por litro × litros del tanque = por bomba',
      nota: 'Sirve para las dosis en cc/L y g/L de agua.',
    },
  ];
  return (
    <div className="mt-4 rounded-2xl bg-white" style={{ boxShadow: sombraSuave }}>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        <Calculator size={18} style={{ color: COLORES.azul }} className="shrink-0" />
        <span className="flex-1 text-sm font-semibold" style={{ color: COLORES.tinta }}>
          Cómo se calcula
        </span>
        <ChevronDown
          size={16}
          className="shrink-0 transition-transform duration-300"
          style={{ color: COLORES.textoSuave, transform: abierto ? 'rotate(180deg)' : 'none' }}
        />
      </button>
      <div className="cc-pliegue" data-abierto={abierto}>
        <div>
          <ul className="space-y-3 px-3 pb-3">
            {pasos.map((p) => (
              <li key={p.formula}>
                <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
                  {p.formula}
                </span>
                <span className="block text-xs leading-snug" style={{ color: COLORES.textoSuave }}>
                  {p.nota}
                </span>
              </li>
            ))}
            {resumen && (
              <li className="rounded-xl p-2.5 text-xs leading-snug" style={{ backgroundColor: COLORES.papel, color: COLORES.tinta }}>
                Con tus datos: {formatear(Number(condiciones.area))} ha × {formatear(Number(condiciones.volumenHa), 0)} L/ha ={' '}
                {formatear(resumen.aguaTotal, 0)} L de agua ÷ {formatear(Number(condiciones.capacidadBomba), 0)} L ={' '}
                {formatear(resumen.numeroBombas, 1)} bombas.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Por encima de esta dosis por hectárea (en L o Kg) se pide revisar la unidad
const DOSIS_ALTA_POR_HA = 50;

/** Una línea de producto dentro de la mezcla de tanque. */
function LineaProducto({ item, onCambiar, onQuitar, condiciones, indice, onAbrirProducto }) {
  const producto = PRODUCTOS.find((p) => p.id === item.productoId) || null;
  const opciones = unidadesSugeridas(producto);
  const color = producto ? COLOR_CATEGORIA[producto.categoria] : COLORES.borde;
  const formulacion = formulacionDe(producto);
  const dosisValida = valorPositivo(item.dosis);

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

  // Envases comerciales que cubren todo el lote con el menor sobrante
  const envases = useMemo(
    () =>
      resultado && producto
        ? envasesNecesarios(resultado.productoTotal, resultado.base, producto.presentaciones)
        : null,
    [resultado, producto]
  );

  const etiquetaResultado = 'block text-[10px] font-bold uppercase tracking-wide';
  const usoResultado = 'mt-0.5 block text-[11px] leading-snug';

  return (
    <div
      className="cc-entrada rounded-2xl bg-white p-3"
      style={{ borderLeft: `4px solid ${color}`, boxShadow: sombraSuave }}
    >
      <div className="flex items-start gap-2">
        <span
          className="cc-num mt-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
          style={{ backgroundColor: COLORES.grisClaro, color: COLORES.textoSuave }}
        >
          {indice + 1}
        </span>
        <div className="min-w-0 flex-1">
          <SelectorProducto
            valor={item.productoId}
            titulo="Producto para la mezcla"
            onCambio={(id) => {
              const nuevo = PRODUCTOS.find((p) => p.id === id);
              const nuevasUnidades = unidadesSugeridas(nuevo);
              onCambiar({
                ...item,
                productoId: id,
                unidad: nuevasUnidades.includes(item.unidad) ? item.unidad : nuevasUnidades[0],
              });
            }}
          />

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
              <button
                onClick={() => onAbrirProducto?.(producto)}
                className="text-xs font-semibold underline-offset-2 hover:underline"
                style={{ color: COLORES.azul }}
              >
                Ver ficha
              </button>
            </div>
          )}

          <div className="mt-2 flex gap-2">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={item.dosis}
              onChange={(e) => onCambiar({ ...item, dosis: e.target.value })}
              placeholder="De la etiqueta"
              aria-label="Dosis"
              className={entrada}
              style={{ borderColor: producto && !dosisValida ? COLORES.ambar : COLORES.borde, color: COLORES.tinta }}
            />
            <select
              value={item.unidad}
              onChange={(e) => onCambiar({ ...item, unidad: e.target.value })}
              aria-label="Unidad de la dosis"
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
          <p className="mt-1.5 text-xs leading-snug" style={{ color: COLORES.textoSuave }}>
            Cópiala de la etiqueta ICA con su misma unidad: con ella se calcula todo lo demás.
          </p>

          {resultado ? (
            <>
              <div
                className="cc-entrada mt-2 rounded-xl p-2.5 text-sm"
                style={{ backgroundColor: `${color}12`, color: COLORES.tinta }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <span>
                    <span className={etiquetaResultado} style={{ color: COLORES.textoSuave }}>
                      Por bomba
                    </span>
                    <span className="block font-mono text-base font-bold">
                      <Cantidad valor={resultado.productoPorBomba} base={resultado.base} />
                    </span>
                    <span className={usoResultado} style={{ color: COLORES.textoSuave }}>
                      Lo que mides y echas en cada tanque.
                    </span>
                  </span>
                  <span>
                    <span className={etiquetaResultado} style={{ color: COLORES.textoSuave }}>
                      Todo el lote
                    </span>
                    <span className="block font-mono text-base font-bold">
                      <Cantidad valor={resultado.productoTotal} base={resultado.base} />
                    </span>
                    <span className={usoResultado} style={{ color: COLORES.textoSuave }}>
                      Lo que sacas de bodega o compras.
                    </span>
                  </span>
                </div>

                {envases && (
                  <div className="mt-2.5 flex items-start gap-2.5 border-t pt-2.5" style={{ borderColor: `${color}33` }}>
                    <IconoIlustrado nombre="envases" tamano={30} respaldo={Package} color={color} className="shrink-0" />
                    <span className="min-w-0">
                      <span className={etiquetaResultado} style={{ color: COLORES.textoSuave }}>
                        Envases a llevar
                      </span>
                      <span key={envases.texto} className="cc-pop block origin-left font-mono text-base font-bold">
                        {envases.texto}
                      </span>
                      <span className={usoResultado} style={{ color: COLORES.textoSuave }}>
                        Lo que cargas para cubrir el lote.{' '}
                        {envases.exacto
                          ? 'No sobra nada.'
                          : `Sobran ${unidadAmigable(envases.sobrante, envases.base)}.`}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {resultado.dosisPorHa > DOSIS_ALTA_POR_HA && (
                <AvisoAmable tono="ojo" className="mt-2">
                  Es una dosis inusualmente alta: revisa que la unidad sea la de la etiqueta (por ejemplo
                  cc/ha o g/ha).
                </AvisoAmable>
              )}
            </>
          ) : (
            <AvisoAmable className="mt-2">
              {!dosisValida
                ? producto
                  ? 'Escribe la dosis de la etiqueta para ver cuánto va por bomba.'
                  : 'Elige el producto y escribe la dosis de su etiqueta.'
                : 'Completa los datos del lote de arriba para ver cuánto va por bomba.'}
            </AvisoAmable>
          )}
        </div>

        <button
          onClick={onQuitar}
          className="cc-presionable shrink-0 rounded-full p-2"
          aria-label="Quitar producto de la mezcla"
        >
          <Trash2 size={16} style={{ color: COLORES.textoSuave }} />
        </button>
      </div>
    </div>
  );
}

/** Lista de chequeo antes de aplicar, con avance y celebración al terminar. */
function ChequeoPrevio() {
  const [hechos, setHechos] = usePersistente('cibo:chequeo', []);
  const total = ITEMS_CHEQUEO.length;
  const listos = ITEMS_CHEQUEO.filter((i) => hechos.includes(i.id)).length;
  const completo = listos === total;

  const alternar = (id) =>
    setHechos((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  return (
    <div className="mt-5">
      <div className="rounded-3xl bg-white p-4" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold" style={{ color: COLORES.tinta }}>
            Antes de salir a aplicar
          </p>
          <span className="cc-num text-sm font-bold" style={{ color: completo ? COLORES.verde : COLORES.textoSuave }}>
            {listos} / {total}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ backgroundColor: COLORES.grisClaro }}>
          <div
            className="cc-barra-progreso h-full rounded-full"
            style={{ width: `${(listos / total) * 100}%`, backgroundColor: completo ? COLORES.verde : COLORES.azul }}
          />
        </div>
        {completo && (
          <div className="cc-entrada mt-3 flex items-center gap-3 rounded-2xl p-3" style={{ backgroundColor: COLORES.verdeClaro }}>
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <span className="cc-onda absolute inset-0 rounded-full" style={{ backgroundColor: COLORES.verde }} />
              <PartyPopper size={22} className="cc-pop relative" style={{ color: COLORES.verde }} />
            </span>
            <p className="text-sm font-semibold" style={{ color: COLORES.tinta }}>
              Todo listo para aplicar. ¡Buena jornada!
            </p>
          </div>
        )}
      </div>

      <ul className="cc-escalonado mt-3 space-y-2">
        {ITEMS_CHEQUEO.map((item) => {
          const hecho = hechos.includes(item.id);
          return (
            <li key={item.id}>
              <button
                onClick={() => alternar(item.id)}
                aria-pressed={hecho}
                className="cc-presionable flex w-full items-start gap-3 rounded-2xl border bg-white p-3 text-left"
                style={{
                  borderColor: hecho ? `${COLORES.verde}66` : COLORES.borde,
                  backgroundColor: hecho ? '#F4FAF0' : '#fff',
                }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors"
                  style={{
                    borderColor: hecho ? COLORES.verde : COLORES.borde,
                    backgroundColor: hecho ? COLORES.verde : '#fff',
                  }}
                >
                  {hecho && <Check key="hecho" size={15} color="#fff" strokeWidth={3} className="cc-pop" />}
                </span>
                <IconoIlustrado nombre={item.imagen} tamano={34} className="shrink-0" />
                <span className="min-w-0">
                  <span
                    className="block text-sm font-semibold transition-colors"
                    style={{ color: hecho ? COLORES.verde : COLORES.tinta }}
                  >
                    {item.titulo}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug" style={{ color: COLORES.textoSuave }}>
                    {item.detalle}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {listos > 0 && (
        <button
          onClick={() => setHechos([])}
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: COLORES.textoSuave }}
        >
          <Eraser size={13} /> Empezar una nueva lista
        </button>
      )}
    </div>
  );
}

/** Calculadora de mezcla, calibración, orden de carga y chequeo previo. */
export function Mezcla({ onAbrirProducto }) {
  const [vista, setVista] = useState('mezcla');
  const [condiciones, setCondiciones] = usePersistente('cibo:mezcla:condiciones', {
    area: '1',
    volumenHa: '200',
    capacidadBomba: '20',
  });
  const [items, setItems] = useAlmacen(MEZCLA_PRODUCTOS);

  // calibración
  const [calib, setCalib] = useState({ gastoLitros: '', anchoFranja: '', distancia: '' });
  const resultadoCalib = useMemo(() => calcularCalibracion(calib), [calib]);

  const productosElegidos = useMemo(
    () => items.map((i) => PRODUCTOS.find((p) => p.id === i.productoId)).filter(Boolean),
    [items]
  );

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

  // Orden de carga sugerido para los productos elegidos
  const ordenCarga = useMemo(
    () =>
      productosElegidos
        .map((p) => ({ producto: p, f: formulacionDe(p) }))
        .filter((x) => x.f)
        .sort((a, b) => a.f.ordenCarga - b.f.ordenCarga),
    [productosElegidos]
  );

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

  const receta = useMemo(
    () =>
      recetaDeMezcla({
        ...condiciones,
        lineas: items.map((i) => ({
          producto: PRODUCTOS.find((p) => p.id === i.productoId),
          dosis: i.dosis,
          unidad: i.unidad,
        })),
      }),
    [condiciones, items]
  );

  const faltantes = useMemo(() => datosFaltantesDelLote(condiciones), [condiciones]);
  const falta = (id) => faltantes.some((f) => f.id === id);
  const faltanCalib = useMemo(() => datosFaltantesDeCalibracion(calib), [calib]);

  const cambiarCondicion = (campo) => (valor) => setCondiciones((c) => ({ ...c, [campo]: valor }));

  const vaciar = () => {
    setItems([]);
    avisar('Mezcla vaciada', 'info');
  };

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Mezcla y aplicación
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Escribe los datos del lote y la dosis de la etiqueta: los resultados cambian al instante. Tu
        mezcla queda guardada en el teléfono, aun sin señal.
      </p>

      <div className="mt-4">
        <Segmentado
          vertical
          opciones={[
            { id: 'mezcla', label: 'Mezcla', icono: FlaskConical },
            { id: 'calibracion', label: 'Calibrar', icono: Ruler },
            { id: 'orden', label: 'Orden', icono: ListOrdered },
            { id: 'chequeo', label: 'Chequeo', icono: ClipboardCheck },
          ]}
          valor={vista}
          onCambio={setVista}
        />
      </div>

      {/* ───────────── MEZCLA ───────────── */}
      {vista === 'mezcla' && (
        <div key="mezcla" className="cc-entrada">
          <div className="mt-5 rounded-3xl bg-white p-4" style={{ boxShadow: sombraSuave }}>
            <p className="text-sm font-bold" style={{ color: COLORES.tinta }}>
              Datos del lote
            </p>
            <p className="mt-0.5 text-xs" style={{ color: COLORES.textoSuave }}>
              Cambia cualquiera con los botones − y + o escribiéndolo: todo se recalcula al instante.
            </p>

            <div className="mt-4 space-y-5">
              <CondicionLote
                id="mezcla-area"
                etiqueta="Área"
                unidad="hectáreas"
                paso={0.5}
                placeholder="Ej. 2.5"
                uso="Tamaño del lote que vas a aplicar. Define cuánta agua y cuánto producto necesitas."
                valor={condiciones.area}
                onCambio={cambiarCondicion('area')}
                falta={falta('area')}
              />
              <CondicionLote
                id="mezcla-volumen"
                etiqueta="Volumen"
                unidad="L de agua por ha"
                paso={10}
                placeholder="Ej. 200"
                uso="Litros de agua que tu equipo gasta por hectárea. Si no lo sabes, mídelo en Calibrar."
                valor={condiciones.volumenHa}
                onCambio={cambiarCondicion('volumenHa')}
                falta={falta('volumenHa')}
                extra={
                  <button
                    type="button"
                    onClick={() => setVista('calibracion')}
                    className="mt-1 flex items-center gap-1 text-xs font-semibold"
                    style={{ color: COLORES.azul }}
                  >
                    Ir a Calibrar <ArrowRight size={12} />
                  </button>
                }
              />
              <CondicionLote
                id="mezcla-bomba"
                etiqueta="Bomba"
                unidad="L por tanque"
                paso={1}
                placeholder="Ej. 20"
                uso="Litros que caben en tu equipo. Define cuántas veces lo llenas y cuánto producto echas en cada tanque."
                valor={condiciones.capacidadBomba}
                onCambio={cambiarCondicion('capacidadBomba')}
                falta={falta('capacidadBomba')}
              />
            </div>

            <p className="mt-5 text-xs font-semibold" style={{ color: COLORES.textoSuave }}>
              Equipos comunes
            </p>
            <div className="cc-sin-barra -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1">
              {PRESETS_BOMBA.map((b) => (
                <Chip
                  key={b.litros}
                  label={b.label}
                  icono={Container}
                  color={COLORES.azul}
                  activo={String(condiciones.capacidadBomba) === b.litros}
                  onClick={() => setCondiciones((c) => ({ ...c, capacidadBomba: b.litros }))}
                />
              ))}
            </div>
          </div>

          {resumen ? (
            <div className="mt-4 rounded-3xl p-3" style={{ backgroundColor: COLORES.tinta }}>
              <div className="flex gap-2">
                <Cifra
                  icono={Container}
                  valor={resumen.numeroBombas}
                  etiqueta="Bombas"
                  uso="Cuántas veces llenas el tanque: planea el tiempo y el agua."
                  decimales={1}
                />
                <Cifra
                  icono={Droplets}
                  valor={resumen.aguaTotal}
                  unidad="L"
                  etiqueta="Agua total"
                  uso="Lo que debes tener disponible en el lote."
                  decimales={0}
                />
              </div>
              {resumen.fraccionUltimaBomba > 0.01 && (
                <p className="mt-2 px-1 text-xs" style={{ color: '#9DB8C9' }}>
                  {resumen.bombasEnteras} bombas llenas y la última al{' '}
                  {Math.round(resumen.fraccionUltimaBomba * 100)}%.
                </p>
              )}
            </div>
          ) : (
            <AvisoAmable imagen="idea" className="mt-4">
              Escribe {unirConY(faltantes.map((f) => f.texto))} para ver cuántas bombas necesitas y
              cuánta agua llevar.
            </AvisoAmable>
          )}

          {items.length === 0 ? (
            <EstadoVacio
              icono={FlaskConical}
              imagen="bidon"
              titulo="Tu mezcla está vacía"
              texto="Agrega los productos que vas a aplicar. También puedes hacerlo desde la ficha de cualquier producto."
              accion={
                <button
                  onClick={() => setItems([nuevaLinea()])}
                  className="cc-presionable flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: COLORES.azul }}
                >
                  <Plus size={15} /> Agregar producto
                </button>
              }
            />
          ) : (
            <>
              <div className="mt-5 space-y-3">
                {items.map((item, i) => (
                  <LineaProducto
                    key={item.clave || i}
                    indice={i}
                    item={item}
                    condiciones={condiciones}
                    onAbrirProducto={onAbrirProducto}
                    onCambiar={(nuevo) => setItems(items.map((it, j) => (j === i ? nuevo : it)))}
                    onQuitar={() => setItems(items.filter((_, j) => j !== i))}
                  />
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setItems([...items, nuevaLinea()])}
                  className="cc-presionable flex items-center gap-1.5 rounded-2xl border border-dashed bg-white px-4 py-2.5 text-sm font-semibold"
                  style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
                >
                  <Plus size={15} /> Agregar producto
                </button>
                <button
                  onClick={vaciar}
                  className="cc-presionable flex items-center gap-1.5 rounded-2xl px-3 py-2.5 text-sm font-semibold"
                  style={{ color: COLORES.textoSuave }}
                >
                  <Eraser size={15} /> Vaciar
                </button>
              </div>
            </>
          )}

          {choques.length > 0 && (
            <div
              className="cc-entrada mt-4 rounded-2xl p-3"
              style={{ backgroundColor: '#FDF3EE', border: '1px solid #F0C9B4' }}
            >
              <p className="flex items-center gap-2 text-sm font-bold" style={{ color: '#C2410C' }}>
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

          {receta && (
            <div className="cc-entrada mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => compartirTexto('Mezcla de tanque', receta)}
                className="cc-presionable flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white"
                style={{ backgroundColor: COLORES.verde, boxShadow: `0 6px 16px ${COLORES.verde}55` }}
              >
                <Share2 size={16} /> Enviar receta al operario
              </button>
              {ordenCarga.length > 1 && (
                <button
                  onClick={() => setVista('orden')}
                  className="cc-presionable flex items-center justify-center gap-2 rounded-2xl border bg-white px-4 py-3 text-sm font-semibold"
                  style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
                >
                  Ver orden de carga <ArrowRight size={15} />
                </button>
              )}
            </div>
          )}

          <ComoSeCalcula condiciones={condiciones} resumen={resumen} />
        </div>
      )}

      {/* ───────────── CALIBRACIÓN ───────────── */}
      {vista === 'calibracion' && (
        <div key="calibracion" className="cc-entrada">
          <p className="mt-5 text-sm" style={{ color: COLORES.textoSuave }}>
            Asperja una distancia conocida con agua, mide cuántos litros gastaste y obtén el volumen
            real por hectárea. Ese número es el que debes usar en la mezcla, no el que supones.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {CAMPOS_CALIBRACION.map((c) => (
              <Campo key={c.id} id={`calibrar-${c.id}`} etiqueta={c.etiqueta} ayuda={c.ayuda} uso={c.uso}>
                <input
                  id={`calibrar-${c.id}`}
                  type="number" inputMode="decimal" min="0" step="any" value={calib[c.id]}
                  onChange={(e) => setCalib({ ...calib, [c.id]: e.target.value })}
                  placeholder={c.placeholder}
                  className={entrada}
                  style={{ borderColor: valorPositivo(calib[c.id]) ? COLORES.borde : COLORES.ambar, color: COLORES.tinta }}
                />
              </Campo>
            ))}
          </div>

          {resultadoCalib ? (
            <div className="cc-entrada mt-4 rounded-3xl p-4" style={{ backgroundColor: COLORES.tinta }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#9DB8C9' }}>
                Volumen real de aplicación
              </p>
              <p className="mt-1 font-mono text-3xl font-bold text-white">
                <NumeroAnimado valor={resultadoCalib.volumenHa} formato={(n) => formatear(n, 0)} /> L/ha
              </p>
              <p className="mt-2 text-xs leading-snug" style={{ color: '#9DB8C9' }}>
                Es lo que gasta de verdad tu equipo por hectárea. Úsalo como volumen en la mezcla y la
                dosis por bomba saldrá ajustada a tu equipo.
              </p>
              <p className="mt-2 text-xs leading-snug" style={{ color: '#9DB8C9' }}>
                Cómo sale: gasto ÷ área mojada × 10 000 m². En la prueba mojaste{' '}
                {formatear(resultadoCalib.areaTratada, 0)} m² (ancho × distancia).
              </p>
              <button
                onClick={() => {
                  setCondiciones({ ...condiciones, volumenHa: String(Math.round(resultadoCalib.volumenHa)) });
                  setVista('mezcla');
                  avisar(`Volumen de ${Math.round(resultadoCalib.volumenHa)} L/ha aplicado a la mezcla`);
                }}
                className="cc-presionable mt-3 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold"
                style={{ backgroundColor: COLORES.naranja, color: '#fff' }}
              >
                Usar este volumen en la mezcla <ArrowRight size={13} />
              </button>
            </div>
          ) : (
            <EstadoVacio
              icono={Ruler}
              imagen="calibrar"
              titulo="Faltan datos de la prueba"
              texto={`Escribe ${unirConY(faltanCalib)} para ver el volumen real de tu equipo.`}
            />
          )}
        </div>
      )}

      {/* ───────────── ORDEN DE CARGA ───────────── */}
      {vista === 'orden' && (
        <div key="orden" className="cc-entrada">
          {ordenCarga.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-bold" style={{ color: COLORES.tinta }}>
                Orden para tu mezcla
              </h3>
              <ol className="cc-escalonado mt-2 space-y-2">
                {ordenCarga.map(({ producto, f }, i) => (
                  <li
                    key={producto.id}
                    className="flex items-center gap-3 rounded-2xl bg-white p-3"
                    style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}
                  >
                    <span
                      className="cc-num flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: COLORES.naranja }}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
                        {producto.nombre}
                      </span>
                      <span className="text-xs" style={{ color: COLORES.textoSuave }}>
                        {f.nombre} ({f.sigla})
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <h3 className="mt-6 text-sm font-bold" style={{ color: COLORES.tinta }}>
            Regla general de carga
          </h3>
          <ol className="cc-escalonado mt-3">
            {ORDEN_TANQUE.map((p, i) => (
              <li key={p.paso} className="relative flex gap-3 pb-4 last:pb-0">
                {i < ORDEN_TANQUE.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[11px] top-7 w-0.5"
                    style={{ backgroundColor: COLORES.azulClaro }}
                  />
                )}
                <span
                  className="cc-num relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ backgroundColor: COLORES.azulClaro, color: COLORES.tinta }}
                >
                  {p.paso}
                </span>
                <span>
                  <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
                    {p.que}
                  </span>
                  <span className="text-xs" style={{ color: COLORES.textoSuave }}>
                    {p.detalle}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ───────────── CHEQUEO ───────────── */}
      {vista === 'chequeo' && (
        <div key="chequeo" className="cc-entrada">
          <ChequeoPrevio />
        </div>
      )}

      <div className="mt-6 flex gap-2 rounded-2xl bg-white p-3">
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
