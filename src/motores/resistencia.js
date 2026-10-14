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
import {
  GRUPOS_QUIMICOS,
  CRUCES_QUE_CONFUNDEN,
  MOLECULAS_PORTAFOLIO,
  MOLECULAS_OTRAS_CASAS,
} from '../data/gruposQuimicos.js';

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

// ── Grupos químicos, marcas gemelas y moléculas de otras casas ──────────

const CATEGORIA_DE_SISTEMA = { IRAC: 'Insecticida', FRAC: 'Fungicida', HRAC: 'Herbicida' };

/** Claves "COMITÉ:número" de los sitios de acción que ocupa un producto. */
export function clavesDeGrupo(producto) {
  return gruposDeRotacion(producto).map((g) => `${producto.sistema}:${g}`);
}

/** Ficha de grupo químico (riesgo, otras moléculas, cuándo sí y cuándo no) por cada sitio del producto. */
export function gruposQuimicosDe(producto) {
  return clavesDeGrupo(producto)
    .map((clave) => ({ clave, ...GRUPOS_QUIMICOS[clave] }))
    .filter((g) => g.nombre);
}

/** Pares de grupos que tocan el mismo blanco sin cruzarse, cuando el producto está en uno de ellos. */
export function crucesQueConfundenDe(producto) {
  const claves = clavesDeGrupo(producto);
  return CRUCES_QUE_CONFUNDEN.filter((c) => claves.includes(c.a) || claves.includes(c.b));
}

function sinTildes(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

/** "Abamectina 28 g/L + Imidacloprid 300 g/L" → [["abamectina", "28"], ["imidacloprid", "300"]] */
function ingredientes(producto) {
  return String(producto?.ia || '')
    .split('+')
    .map((parte) => {
      // Misma molécula escrita distinto: thiametoxam/tiametoxam, propiconazole/propiconazol
      const t = sinTildes(parte)
        .replace(/thiam/g, 'tiam')
        .replace(/(\w)ole\b/g, '$1ol')
        .replace(/\s+/g, ' ')
        .trim();
      const numero = (t.match(/(\d+(?:[.,]\d+)?)\s*(?:g|%|cc|ml)/) || [])[1] || '';
      const nombre = t
        .replace(/\(.*?\)/g, '')
        .replace(/\d+(?:[.,]\d+)?\s*(?:g\/kg|g\/l|%|cc\/l|ml\/l|g)?/g, '')
        // La sal o la forma química no cambian la molécula activa
        .replace(/\b(de|sal|equiv\.?|equivalente|acido|dimethylamine|dimethylammonium|dimetilamina|dimetilamonio|amina|amonio|isopropilamina|potasica|potasio|methyl|metil)\b/g, ' ')
        .replace(/[^a-z ]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return [nombre, numero.replace(',', '.')];
    })
    .filter(([nombre]) => nombre);
}

/**
 * Marcas gemelas: misma composición (moléculas y concentraciones) bajo otro
 * nombre. No son alternativas técnicas: son decisiones de canal.
 */
export function gemelosDe(producto) {
  const partes = ingredientes(producto);
  // Sin concentración declarada en cada ingrediente no se puede afirmar que
  // dos productos sean idénticos (pasa con extractos y kits).
  if (partes.length === 0 || partes.some(([, numero]) => !numero)) return [];
  const firma = partes.map((x) => x.join(':')).sort().join('+');
  return PRODUCTOS.filter(
    (p) => p.id !== producto.id && ingredientes(p).map((x) => x.join(':')).sort().join('+') === firma
  );
}

/** Misma(s) molécula(s) en otra concentración o formulación (por ejemplo, las versiones PRO). */
export function mismaMoleculaDe(producto) {
  const firma = ingredientes(producto).map((x) => x[0]).sort().join('+');
  if (!firma) return [];
  const gemelos = gemelosDe(producto).map((p) => p.id);
  return PRODUCTOS.filter(
    (p) =>
      p.id !== producto.id &&
      !gemelos.includes(p.id) &&
      ingredientes(p).map((x) => x[0]).sort().join('+') === firma
  );
}

/**
 * Convierte una molécula aplicada (del portafolio o de otra casa) en un
 * "producto" que el motor de rotación entiende. Así se puede responder
 * "apliqué clorpirifos de otra marca, ¿qué rota?".
 */
export function productoDesdeMolecula(molecula) {
  const [sistema, grupo] = String(molecula.grupo).split(':');
  return {
    id: `molecula:${sinTildes(molecula.nombre).replace(/[^a-z0-9]+/g, '-')}`,
    nombre: molecula.nombre,
    ia: molecula.nombre,
    categoria: CATEGORIA_DE_SISTEMA[sistema],
    sistema,
    grupo,
    familia: molecula.familia,
    externo: true,
  };
}

/** Todas las moléculas que se pueden escoger en el verificador, sin repetir. */
export const MOLECULAS_PARA_VERIFICAR = (() => {
  const vistas = new Set();
  return [...MOLECULAS_PORTAFOLIO, ...MOLECULAS_OTRAS_CASAS]
    .map((m) => ({ nombre: m.nombre, familia: m.familia, grupo: m.grupo, otraCasa: !m.id }))
    .filter((m) => {
      const k = sinTildes(m.nombre);
      if (vistas.has(k)) return false;
      vistas.add(k);
      return true;
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
})();
