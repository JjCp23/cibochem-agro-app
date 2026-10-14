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

/**
 * Formatea a una cantidad legible en campo, sin ceros sobrantes: "20 bombas"
 * y no "20.0 bombas", "1.5 L" y no "1.50 L".
 */
export function formatear(valor, decimales = 2) {
  if (valor == null || Number.isNaN(valor)) return '—';
  const d = valor >= 100 ? 0 : valor >= 10 ? Math.min(1, decimales) : decimales;
  return String(Number(valor.toFixed(d)));
}

/**
 * Parte una cantidad en unidad base en número + unidad cómoda de leer:
 * 0.35 L → { numero: 350, unidad: 'cc' }. Sirve para animar el número y
 * dejar la unidad aparte. Devuelve null si el valor no es un número.
 */
export function partirCantidad(valor, base) {
  if (valor == null || Number.isNaN(valor)) return null;
  const chica = base === 'L' ? 'cc' : base === 'Kg' ? 'g' : null;
  if (chica && valor < 1) return { numero: valor * 1000, unidad: chica, decimales: 0 };
  return { numero: valor, unidad: base, decimales: 2 };
}

/** Convierte a la unidad más cómoda de leer: 0.35 L → "350 cc". */
export function unidadAmigable(valor, base) {
  if (valor == null || Number.isNaN(valor)) return '—';
  if (base !== 'L' && base !== 'Kg') return formatear(valor);
  const p = partirCantidad(valor, base);
  return `${formatear(p.numero, p.decimales)} ${p.unidad}`;
}

// Unidades que aparecen en las presentaciones comerciales y cuántas milésimas
// de la unidad base (L o Kg) vale cada una. Se trabaja en enteros (cc y g)
// para que las sumas no arrastren decimales.
const UNIDADES_DE_ENVASE = {
  cc: { base: 'L', mili: 1 },
  ml: { base: 'L', mili: 1 },
  l: { base: 'L', mili: 1000 },
  lt: { base: 'L', mili: 1000 },
  lts: { base: 'L', mili: 1000 },
  g: { base: 'Kg', mili: 1 },
  gr: { base: 'Kg', mili: 1 },
  kg: { base: 'Kg', mili: 1000 },
  kgs: { base: 'Kg', mili: 1000 },
};

/** "250 cc" → { etiqueta: '250 cc', base: 'L', mili: 250 }. Null si no es un envase medible ("Caja"). */
function leerPresentacionEnvase(texto) {
  const m = String(texto ?? '')
    .trim()
    .match(/^(\d+(?:[.,]\d+)?)\s*([a-zA-Z]+)\.?$/);
  if (!m) return null;
  const unidad = UNIDADES_DE_ENVASE[m[2].toLowerCase()];
  if (!unidad) return null;
  const mili = Math.round(Number(m[1].replace(',', '.')) * unidad.mili);
  if (!(mili > 0)) return null;
  return { etiqueta: `${m[1]} ${m[2]}`, base: unidad.base, mili };
}

/**
 * Qué envase es cada presentación comercial, para dibujarla: así quien no
 * recuerda el nombre del producto reconoce al menos el tamaño que compra.
 * "250 cc" → frasco, "1 L" → botella, "4 L" → garrafa, "20 L" → bidón,
 * "100 g" → sobre, "1 Kg" → bolsa, "5 Kg" → saco.
 */
export function describirEnvase(texto) {
  const envase = leerPresentacionEnvase(texto);
  if (!envase) {
    return { etiqueta: String(texto ?? '').trim(), tipo: 'caja', base: null, mili: null };
  }
  const { base, mili } = envase;
  let tipo;
  if (base === 'L') tipo = mili <= 500 ? 'frasco' : mili <= 1000 ? 'botella' : mili <= 10000 ? 'garrafa' : 'bidon';
  else tipo = mili <= 250 ? 'sobre' : mili <= 1000 ? 'bolsa' : 'saco';
  return { ...envase, tipo };
}

function maximoComunDivisor(a, b) {
  return b === 0 ? a : maximoComunDivisor(b, a % b);
}

/** Compara dos listas de números en orden: la primera diferencia decide. */
function compararClaves(a, b) {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

/**
 * Cuántos envases hay que llevar para cubrir una cantidad de producto.
 *
 * Si sobra poco (hasta el 10 % de lo necesario o un envase pequeño) escoge la
 * combinación con menos envases: 0.9 Kg con [100 g, 1 Kg] → "1 × 1 Kg". Si no,
 * la de menor sobrante: 1.5 L con [250 cc, 1 L, 4 L] → "1 × 1 L + 2 × 250 cc".
 * Ignora las presentaciones de otra base (L frente a Kg) y las que no se pueden
 * medir (como "Caja"). Devuelve null si la cantidad no es válida o si no queda
 * ninguna presentación compatible.
 *
 * @param {number} cantidad       producto necesario, en la unidad base
 * @param {string} base           'L' o 'Kg'
 * @param {string[]} presentaciones  p. ej. ['250 cc', '1 L', '4 L']
 * @returns {null | {combinacion: Array<{presentacion: string, cantidad: number, tamano: number}>,
 *   totalEnvases: number, cubierto: number, sobrante: number, exacto: boolean, base: string, texto: string}}
 */
export function envasesNecesarios(cantidad, base, presentaciones) {
  const q = Number(cantidad);
  if (!Number.isFinite(q) || q <= 0) return null;
  const baseNormal = /^l$/i.test(String(base).trim()) ? 'L' : /^kg$/i.test(String(base).trim()) ? 'Kg' : null;
  if (!baseNormal) return null;

  const tamanos = [];
  const vistos = new Set();
  for (const texto of presentaciones || []) {
    const envase = leerPresentacionEnvase(texto);
    if (!envase || envase.base !== baseNormal || vistos.has(envase.mili)) continue;
    vistos.add(envase.mili);
    tamanos.push(envase);
  }
  if (tamanos.length === 0) return null;
  tamanos.sort((a, b) => b.mili - a.mili); // del más grande al más pequeño

  // Se trabaja en "pasos" (el máximo común divisor de los tamaños) para que la
  // búsqueda sea corta: con 250 cc, 1 L y 4 L, 1.5 L son solo 6 pasos.
  const paso = tamanos.reduce((acc, e) => maximoComunDivisor(acc, e.mili), 0);
  const pasos = tamanos.map((e) => e.mili / paso);
  const mayor = pasos[0];
  let meta = Math.max(1, Math.ceil((q * 1000 - 1e-6) / paso));

  // Cantidades enormes: se descuentan envases grandes de entrada para acotar la búsqueda.
  const LIMITE_BUSQUEDA = 20000;
  const adelantados = meta > LIMITE_BUSQUEDA ? Math.floor((meta - LIMITE_BUSQUEDA) / mayor) : 0;
  meta -= adelantados * mayor;

  // minimo[s] = menos envases que suman exactamente s pasos.
  // Cualquier suma óptima cae entre meta y meta + mayor - 1: más allá se podría
  // quitar un envase y aún cubrir la cantidad.
  const tope = meta + mayor;
  const SIN_SOLUCION = 1e9;
  const minimo = new Int32Array(tope).fill(SIN_SOLUCION);
  minimo[0] = 0;
  for (let s = 1; s < tope; s += 1) {
    for (const p of pasos) {
      if (p <= s && minimo[s - p] + 1 < minimo[s]) minimo[s] = minimo[s - p] + 1;
    }
  }
  // Criterio de campo: si sobra poco (hasta el 10 % de lo necesario o un
  // envase pequeño), se prefieren menos envases —una bolsa de 1 Kg antes que
  // nueve sobres de 100 g—; si no, el menor sobrante.
  const necesarios = (q * 1000) / paso - adelantados * mayor;
  const tolerancia = Math.max(q * 1000 * 0.1, tamanos[tamanos.length - 1].mili) / paso;
  let suma = -1;
  let mejorClave = null;
  for (let s = meta; s < tope; s += 1) {
    if (minimo[s] >= SIN_SOLUCION) continue;
    const sobra = s - necesarios;
    const clave = sobra <= tolerancia + 1e-9 ? [0, minimo[s], s] : [1, s, minimo[s]];
    if (!mejorClave || compararClaves(clave, mejorClave) < 0) {
      mejorClave = clave;
      suma = s;
    }
  }
  if (suma < 0) return null; // no debería pasar: siempre hay una suma que cubre

  // Reconstruye prefiriendo los envases grandes cuando hay empate.
  const cuentas = tamanos.map(() => 0);
  let resto = suma;
  while (resto > 0) {
    const i = pasos.findIndex((p) => p <= resto && minimo[resto - p] + 1 === minimo[resto]);
    cuentas[i] += 1;
    resto -= pasos[i];
  }
  cuentas[0] += adelantados;

  const combinacion = tamanos
    .map((e, i) => ({ presentacion: e.etiqueta, cantidad: cuentas[i], tamano: e.mili / 1000 }))
    .filter((c) => c.cantidad > 0);
  const cubiertoMili = tamanos.reduce((acc, e, i) => acc + cuentas[i] * e.mili, 0);
  const sobrante = Math.max(0, Number(((cubiertoMili - q * 1000) / 1000).toFixed(6)));

  return {
    combinacion,
    totalEnvases: combinacion.reduce((acc, c) => acc + c.cantidad, 0),
    cubierto: cubiertoMili / 1000,
    sobrante,
    exacto: sobrante === 0,
    base: baseNormal,
    texto: combinacion.map((c) => `${c.cantidad} × ${c.presentacion}`).join(' + '),
  };
}

/**
 * Receta de la mezcla en texto plano, lista para mandar por WhatsApp al
 * operario: condiciones del lote, cuánto va por bomba y en el lote completo,
 * y en qué orden se carga el tanque. Devuelve null si no hay ninguna línea con
 * producto y dosis válidos.
 *
 * @param {object} datos
 * @param {Array<{producto: object, dosis: number|string, unidad: string}>} datos.lineas
 */
export function recetaDeMezcla({ area, volumenHa, capacidadBomba, lineas }) {
  const calculadas = (lineas || [])
    .filter((l) => l.producto)
    .map((l) => ({
      ...l,
      calculo: calcularMezcla({ dosis: l.dosis, unidad: l.unidad, area, volumenHa, capacidadBomba }),
      formulacion: formulacionDe(l.producto),
    }))
    .filter((l) => l.calculo);
  if (calculadas.length === 0) return null;

  const general = calculadas[0].calculo;
  const ultima =
    general.fraccionUltimaBomba > 0.01 ? ` (la última al ${Math.round(general.fraccionUltimaBomba * 100)}%)` : '';

  const porBomba = calculadas.map(
    (l, i) =>
      `${i + 1}. ${l.producto.nombre}: ${unidadAmigable(l.calculo.productoPorBomba, l.calculo.base)} ` +
      `(dosis ${l.dosis} ${UNIDADES[l.unidad]?.etiqueta || l.unidad})`
  );
  const total = calculadas.map(
    (l, i) => `${i + 1}. ${l.producto.nombre}: ${unidadAmigable(l.calculo.productoTotal, l.calculo.base)}`
  );
  const orden = [...calculadas]
    .sort((a, b) => (a.formulacion?.ordenCarga ?? 4) - (b.formulacion?.ordenCarga ?? 4))
    .map((l) => (l.formulacion ? `${l.producto.nombre} (${l.formulacion.sigla})` : l.producto.nombre));

  return [
    'MEZCLA DE TANQUE',
    `Lote: ${formatear(Number(area))} ha · ${formatear(Number(volumenHa), 0)} L de agua/ha · bomba de ${formatear(Number(capacidadBomba), 0)} L`,
    `Agua total: ${formatear(general.aguaTotal, 0)} L · ${formatear(general.numeroBombas, 1)} bombas${ultima}`,
    '',
    'POR BOMBA',
    ...porBomba,
    '',
    'PARA TODO EL LOTE',
    ...total,
    '',
    `Orden de carga: agua a la mitad → ${orden.join(' → ')} → completar agua`,
    'Prueba de compatibilidad en frasco antes de mezclar. Dosis según etiqueta ICA.',
    '— Calculado con CiboCAMPO',
  ].join('\n');
}
