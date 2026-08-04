/**
 * CEREBRO 3 — Aplicación
 *
 * Responsabilidad única: la aritmética de campo y la técnica de aplicación.
 * No sabe nada de plagas ni de resistencia.
 *
 * La app NUNCA propone una dosis: la dosis se lee de la etiqueta ICA. Lo que
 * hace este módulo es la aritmética de campo, que es donde se cometen los
 * errores caros, y el orden de carga del tanque, que es la causa más común de
 * grumos y boquillas tapadas.
 */

/** Unidades de dosis admitidas y cómo se interpretan. */
export const UNIDADES = {
  'L/ha': { tipo: 'area', base: 'L', factor: 1, etiqueta: 'L/ha' },
  'cc/ha': { tipo: 'area', base: 'L', factor: 0.001, etiqueta: 'cc/ha' },
  'Kg/ha': { tipo: 'area', base: 'Kg', factor: 1, etiqueta: 'Kg/ha' },
  'g/ha': { tipo: 'area', base: 'Kg', factor: 0.001, etiqueta: 'g/ha' },
  'cc/L': { tipo: 'volumen', base: 'L', factor: 0.001, etiqueta: 'cc/L de agua' },
  'g/L': { tipo: 'volumen', base: 'Kg', factor: 0.001, etiqueta: 'g/L de agua' },
};

/**
 * Deduce las unidades de dosis razonables para un producto a partir de su
 * presentación comercial: un producto en litros se dosifica en L o cc, uno en
 * kilos se dosifica en Kg o g. Evita que el usuario escoja una unidad que no
 * corresponde al envase.
 */
export function unidadesSugeridas(producto) {
  if (!producto) return Object.keys(UNIDADES);
  const texto = (producto.presentaciones || []).join(' ').toLowerCase();
  const esSolido = /kg|\bg\b|\bg$/.test(texto) && !/\bl\b|cc/.test(texto);
  return esSolido ? ['Kg/ha', 'g/ha', 'g/L'] : ['L/ha', 'cc/ha', 'cc/L'];
}

/**
 * Calcula la mezcla para un lote.
 *
 * @param {object} datos
 * @param {number} datos.dosis          valor leído en la etiqueta
 * @param {string} datos.unidad         clave de UNIDADES
 * @param {number} datos.area           hectáreas a tratar
 * @param {number} datos.volumenHa      litros de agua por hectárea
 * @param {number} datos.capacidadBomba litros por bomba o tanque
 */
export function calcularMezcla({ dosis, unidad, area, volumenHa, capacidadBomba }) {
  const u = UNIDADES[unidad];
  const d = Number(dosis) || 0;
  const a = Number(area) || 0;
  const vHa = Number(volumenHa) || 0;
  const cap = Number(capacidadBomba) || 0;

  if (!u || d <= 0 || a <= 0 || vHa <= 0 || cap <= 0) return null;

  const aguaTotal = vHa * a;
  const numeroBombas = aguaTotal / cap;
  const dosisBase = d * u.factor; // convertida a L o Kg

  let productoTotal;
  let productoPorBomba;

  if (u.tipo === 'volumen') {
    productoPorBomba = dosisBase * cap;
    productoTotal = dosisBase * aguaTotal;
  } else {
    productoTotal = dosisBase * a;
    productoPorBomba = (dosisBase * cap) / vHa;
  }

  return {
    base: u.base,
    aguaTotal,
    numeroBombas,
    bombasEnteras: Math.floor(numeroBombas),
    fraccionUltimaBomba: numeroBombas - Math.floor(numeroBombas),
    productoTotal,
    productoPorBomba,
    // dosis equivalente por hectárea, útil para comparar productos entre sí
    dosisPorHa: u.tipo === 'volumen' ? dosisBase * vHa : dosisBase,
  };
}

/**
 * Calibración: volumen real de aplicación a partir de una prueba de campo.
 * Se recorre una distancia conocida y se mide el gasto real de la bomba.
 */
export function calcularCalibracion({ gastoLitros, anchoFranja, distancia }) {
  const g = Number(gastoLitros) || 0;
  const ancho = Number(anchoFranja) || 0;
  const dist = Number(distancia) || 0;
  if (g <= 0 || ancho <= 0 || dist <= 0) return null;

  const areaTratada = ancho * dist; // m²
  const volumenHa = (g / areaTratada) * 10000;
  return { areaTratada, volumenHa };
}

/**
 * Orden recomendado de carga del tanque.
 * El orden correcto evita grumos, floculación y boquillas tapadas.
 */
export const ORDEN_TANQUE = [
  { paso: 1, que: 'Agua', detalle: 'Llenar la mitad del tanque con el agitador funcionando.' },
  { paso: 2, que: 'Acondicionador de agua', detalle: 'Corregir pH o dureza antes de agregar cualquier producto.' },
  { paso: 3, que: 'Polvos y granulados (WP, WG, SG)', detalle: 'Prediluir aparte en un balde y verter lentamente.' },
  { paso: 4, que: 'Suspensiones (SC, SL)', detalle: 'Agregar con el agitador andando.' },
  { paso: 5, que: 'Emulsionables (EC)', detalle: 'Van casi al final porque pueden romper suspensiones.' },
  { paso: 6, que: 'Coadyuvantes y aceites', detalle: 'Siempre de últimos, con el tanque casi lleno.' },
  { paso: 7, que: 'Completar agua', detalle: 'Terminar de llenar y mantener la agitación hasta terminar de aplicar.' },
];

/** Deduce el tipo de formulación desde el nombre comercial del producto. */
export function formulacionDe(producto) {
  const m = String(producto?.nombre || '').match(/\b(WG|WP|SG|SC|SL|EC|CE|WDG|TB)\b/i);
  if (!m) return null;
  const f = m[1].toUpperCase();
  const mapa = {
    WG: 'Granulado dispersable',
    WDG: 'Granulado dispersable',
    SG: 'Granulado soluble',
    WP: 'Polvo mojable',
    SC: 'Suspensión concentrada',
    SL: 'Concentrado soluble',
    EC: 'Concentrado emulsionable',
    CE: 'Concentrado emulsionable',
    TB: 'Tableta soluble',
  };
  const ordenCarga = { WP: 3, WG: 3, WDG: 3, SG: 3, TB: 3, SC: 4, SL: 4, EC: 5, CE: 5 };
  return { sigla: f, nombre: mapa[f] || f, ordenCarga: ordenCarga[f] || 4 };
}

/** Formatea a una cantidad legible en campo. */
export function formatear(valor, decimales = 2) {
  if (valor == null || Number.isNaN(valor)) return '—';
  if (valor >= 100) return valor.toFixed(0);
  if (valor >= 10) return valor.toFixed(1);
  return valor.toFixed(decimales);
}

/** Convierte a la unidad más cómoda de leer: 0.35 L → "350 cc". */
export function unidadAmigable(valor, base) {
  if (valor == null || Number.isNaN(valor)) return '—';
  if (base === 'L') return valor < 1 ? `${formatear(valor * 1000, 0)} cc` : `${formatear(valor)} L`;
  if (base === 'Kg') return valor < 1 ? `${formatear(valor * 1000, 0)} g` : `${formatear(valor)} Kg`;
  return formatear(valor);
}
