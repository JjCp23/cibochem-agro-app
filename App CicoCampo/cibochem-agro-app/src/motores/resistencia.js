/**
 * CEREBRO 1 — Resistencia
 *
 * Responsabilidad única: decidir si dos productos comparten sitio de acción y,
 * a partir de ahí, qué sirve para rotar y qué no.
 *
 * Regla central: IRAC especifica que la alternancia debe planificarse con los
 * grupos NUMERADOS. La letra del subgrupo solo distingue la familia química
 * dentro del mismo sitio de acción, así que un 3A y un 3B comparten resistencia
 * cruzada y no sirven para rotar entre sí.
 */

import { PRODUCTOS } from '../data/productos.js';
import { codigosDeGrupo, grupoDeRotacion, fichaGrupo } from '../data/gruposMoA.js';

export { codigosDeGrupo, grupoDeRotacion };

/** Sitios de acción que ocupa un producto. Una mezcla ocupa todos los de sus componentes. */
export function gruposDeRotacion(producto) {
  if (!producto?.sistema) return [];
  return codigosDeGrupo(producto.grupo).map((c) => grupoDeRotacion(producto.sistema, c));
}

/** ¿Dos productos comparten sitio de acción? */
export function compartenModoDeAccion(a, b) {
  if (!a || !b) return false;
  if (a.sistema !== b.sistema) return false;
  const ga = gruposDeRotacion(a);
  const gb = gruposDeRotacion(b);
  return ga.some((c) => gb.includes(c));
}

/** Explica en texto por qué dos productos chocan. Devuelve null si no chocan. */
export function explicarConflicto(a, b) {
  if (!compartenModoDeAccion(a, b)) return null;
  const comunes = gruposDeRotacion(a).filter((c) => gruposDeRotacion(b).includes(c));
  return `Ambos ocupan el sitio de acción ${a.sistema} ${comunes.join(' y ')}`;
}

/**
 * Alternativas de rotación: misma categoría, sin sitio de acción compartido,
 * ordenadas por menor riesgo de resistencia y disponibilidad comercial.
 */
export function alternativasDeRotacion(producto) {
  if (!producto) return [];
  const orden = { Nulo: 0, Bajo: 1, Medio: 2, Alto: 3 };
  return PRODUCTOS.filter(
    (p) =>
      p.id !== producto.id &&
      p.categoria === producto.categoria &&
      !compartenModoDeAccion(p, producto)
  ).sort((a, b) => {
    const dif = (orden[a.riesgo] ?? 9) - (orden[b.riesgo] ?? 9);
    if (dif !== 0) return dif;
    if (a.estado !== b.estado) return a.estado === 'Disponible' ? -1 : 1;
    return a.nombre.localeCompare(b.nombre);
  });
}

/** Productos que comparten sitio de acción: los que NO sirven para rotar. */
export function mismosModoDeAccion(producto) {
  if (!producto) return [];
  return PRODUCTOS.filter((p) => p.id !== producto.id && compartenModoDeAccion(p, producto));
}

/**
 * Estadios del ciclo de vida que cubre un producto, heredados de las fichas de
 * sus grupos de modo de acción.
 */
export function estadiosDeProducto(producto) {
  if (!producto || producto.categoria !== 'Insecticida') return [];
  const set = new Set();
  codigosDeGrupo(producto.grupo).forEach((c) => {
    const f = fichaGrupo(producto.sistema, c);
    f?.estadios?.forEach((e) => set.add(e));
  });
  return [...set];
}
