/**
 * Cerebro de la bodega: cuánto hay de cada producto y cuánto vale.
 *
 * Cada ítem trae la cantidad total en g o cc (los envases abiertos cuentan por
 * lo que les queda) y el precio comercial de una presentación. El valor sale de
 * la cantidad por el precio de cada g o cc. Los ajustes hechos en el teléfono
 * (cantidad o precio corregidos) se aplican encima sin tocar los datos.
 */
import { PRODUCTOS } from '../data/productos.js';

/** Línea del ítem: la del producto Cibochem, o la del registro de precios. */
export function lineaDeItem(item) {
  const p = item.productoId && PRODUCTOS.find((x) => x.id === item.productoId);
  if (p) return p.categoria;
  const l = String(item.precio?.linea || '').toLowerCase();
  if (l.includes('insect')) return 'Insecticida';
  if (l.includes('fung')) return 'Fungicida';
  if (l.includes('herb')) return 'Herbicida';
  if (l.includes('bioest') || l.includes('fertil')) return 'Bioestimulante';
  return 'Otros';
}

/** Clave estable de un ítem (el nombre se repite cuando hay dos presentaciones). */
export function claveDeItem(item, i) {
  return `${item.marca}:${item.nombre}:${item.tamanoEnvase ?? ''}:${i}`;
}

/** Ítem con los ajustes del teléfono aplicados y su valor calculado. */
export function itemValorado(item, ajuste = {}) {
  const cantidad = ajuste.cantidad != null ? Number(ajuste.cantidad) : item.cantidad;
  const precio =
    ajuste.valor != null && ajuste.presentacion != null
      ? { ...item.precio, valor: Number(ajuste.valor), presentacion: Number(ajuste.presentacion), ajustado: true }
      : item.precio;
  const precioUnidad = precio && precio.presentacion > 0 ? precio.valor / precio.presentacion : null;
  const valor = precioUnidad != null && cantidad != null ? cantidad * precioUnidad : null;
  return { ...item, cantidad, precio, precioUnidad, valor, linea: lineaDeItem(item), ajustado: Boolean(ajuste.cantidad != null || precio?.ajustado) };
}

/** Totales de la bodega: valor, conteos y reparto por marca y por línea. */
export function resumenDeBodega(items) {
  const res = { valor: 0, conPrecio: 0, sinPrecio: 0, porMarca: {}, porLinea: {} };
  items.forEach((it) => {
    if (it.valor == null) {
      res.sinPrecio += 1;
      return;
    }
    res.conPrecio += 1;
    res.valor += it.valor;
    res.porMarca[it.marca] = (res.porMarca[it.marca] || 0) + it.valor;
    res.porLinea[it.linea] = (res.porLinea[it.linea] || 0) + it.valor;
  });
  return res;
}

/** $ 1.234.567 (pesos colombianos, sin decimales). */
export function formatearPesos(valor) {
  if (valor == null || Number.isNaN(valor)) return '—';
  return `$ ${Math.round(valor).toLocaleString('es-CO')}`;
}

/** 8470 g → "8.47 Kg"; 250 cc → "250 cc". */
export function cantidadLegible(cantidad, base) {
  if (cantidad == null) return '—';
  if (cantidad >= 1000) return `${Number((cantidad / 1000).toFixed(2))} ${base === 'g' ? 'Kg' : 'L'}`;
  return `${Number(cantidad.toFixed(1))} ${base || ''}`.trim();
}
