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
 * Capacidad de la caneca de referencia con la que se explica el orden de
 * carga. Los litros de cada paso están pensados sobre esta caneca.
 */
const CAPACIDAD_CANECA = 200;

/**
 * Orden recomendado de carga del tanque.
 * El orden correcto evita grumos, floculación y boquillas tapadas.
 *
 * Cada paso dice qué hacer (que, detalle), por qué (porque), qué
 * formulaciones entran en él (siglas), a qué familia pertenece (categoria) y
 * hasta dónde llega el agua en la caneca de referencia al terminarlo
 * (litros). Con eso la caneca de la pestaña "Orden de carga" sube de nivel
 * paso a paso.
 */
const PASOS_CARGA = [
  {
    paso: 1,
    que: 'Agua hasta el 70%',
    detalle: 'Llenar la caneca hasta unos 140 L con el agitador ya funcionando.',
    porque:
      'Empezar con agua en movimiento evita que el primer producto que cae quede concentrado en el fondo sin diluir, que es la forma más común de generar el primer grumo. Se arranca al 70% para tener sitio de sobra: los productos suman poco volumen y el resto se completa con agua al final.',
    siglas: [],
    categoria: 'agua',
    litros: 140,
  },
  {
    paso: 2,
    que: 'Acondicionador de agua: dureza y pH',
    detalle: 'Corregir dureza y pH antes de agregar cualquier producto.',
    porque:
      'El agua dura (con calcio y magnesio disueltos) se une a moléculas de varios herbicidas —el caso más conocido es el glifosato— y baja su absorción por la planta. Un pH alto, por su parte, acelera la hidrólisis de insecticidas organofosforados y carbamatos: el ingrediente activo empieza a degradarse dentro del propio tanque antes de salir por la boquilla. Corregir esto primero evita perder eficacia sin que se note a simple vista.',
    siglas: [],
    categoria: 'acondicionador',
    litros: 140.2,
  },
  {
    paso: 3,
    que: 'Antiespumante, si hace falta',
    detalle: 'Un chorrito antes de los sólidos si el agua tiende a hacer espuma.',
    porque:
      'La agitación con productos que ya traen tensioactivos genera espuma. Si el tanque se llena de espuma, la bomba empieza a mover aire en vez de mezcla, el volumen real por hectárea deja de coincidir con el calculado y llenar el tanque se vuelve lento.',
    siglas: [],
    categoria: 'acondicionador',
    litros: 140.3,
  },
  {
    paso: 4,
    que: 'Bolsas hidrosolubles (WSB)',
    detalle: 'Echarlas enteras y esperar a que se disuelvan por completo.',
    porque:
      'La película de la bolsa necesita agua limpia y agitación para disolverse. Si entran cuando el caldo ya tiene sales, aceites o coadyuvantes, la película no abre bien y quedan restos de plástico y producto sin dispersar.',
    siglas: ['WSB', 'WSP'],
    categoria: 'solido',
    litros: 140.7,
  },
  {
    paso: 5,
    que: 'Granulados dispersables (WG, WDG, DF)',
    detalle: 'Prediluir en un balde aparte y verter lentamente, colando.',
    porque:
      'Están diseñados para dispersarse en agua abundante y limpia. Si caen secos sobre un caldo cargado se aglomeran en grumos que después tapan boquillas o quedan sin aplicar en el fondo.',
    siglas: ['WG', 'WDG', 'DF'],
    categoria: 'solido',
    litros: 141.2,
  },
  {
    paso: 6,
    que: 'Polvos mojables (WP)',
    detalle: 'También prediluidos en balde, nunca secos al tanque.',
    porque:
      'Son los más propensos a formar grumos porque su partícula no se disuelve, solo queda suspendida. Necesitan agua en movimiento y espacio para hidratarse antes de que entren los productos que aumentan la carga del caldo.',
    siglas: ['WP'],
    categoria: 'solido',
    litros: 141.7,
  },
  {
    paso: 7,
    que: 'Granulados y polvos solubles (SG, SP)',
    detalle: 'Agregar directo con el agitador andando.',
    porque:
      'Se disuelven de verdad en el agua, no quedan en suspensión, así que toleran entrar después de los que sí necesitan dispersarse. Aun así van antes que los líquidos para no competir con ellos por el agua disponible.',
    siglas: ['SG', 'SP', 'TB'],
    categoria: 'solido',
    litros: 142.1,
  },
  {
    paso: 8,
    que: 'Suspensiones concentradas (SC, SE, FL)',
    detalle: 'Agitar bien el envase antes de verter.',
    porque:
      'Vienen estables de fábrica, pero su estabilidad depende de que nada rompa la suspensión. Entran después de los sólidos para no competir con su dispersión y antes de los emulsionables, cuyo surfactante puede desestabilizarlas.',
    siglas: ['SC', 'SE', 'FL'],
    categoria: 'liquido',
    litros: 143.1,
  },
  {
    paso: 9,
    que: 'Concentrados solubles (SL)',
    detalle: 'Verter con el agitador funcionando.',
    porque:
      'Ya vienen disueltos, así que se integran sin esfuerzo. Se ubican después de las suspensiones porque algunos traen sales que, en agua muy cargada, pueden hacer flocular las partículas que ya están suspendidas.',
    siglas: ['SL'],
    categoria: 'liquido',
    litros: 144.3,
  },
  {
    paso: 10,
    que: 'Emulsiones y emulsionables (EW, EC)',
    detalle: 'Casi al final: pueden romper lo que ya está suspendido.',
    porque:
      'Los concentrados emulsionables traen su propio agente emulsionante. Si entran antes que las suspensiones presentes en el tanque, ese emulsionante puede desestabilizar las partículas y causar separación o "cortes" visibles —capas, natas o grumos que ya no se recuperan agitando.',
    siglas: ['EW', 'EC', 'CE'],
    categoria: 'liquido',
    litros: 145.3,
  },
  {
    paso: 11,
    que: 'Fertilizantes foliares y micronutrientes',
    detalle: 'Después de los plaguicidas, nunca antes.',
    porque:
      'Son sales concentradas. Agregadas temprano suben la fuerza iónica del caldo y hacen flocular suspensiones y emulsiones ya formadas. Los micronutrientes metálicos (hierro, zinc, manganeso, cobre) además pueden quelatar moléculas de plaguicida y bajarles la actividad.',
    siglas: [],
    categoria: 'liquido',
    litros: 147.3,
  },
  {
    paso: 12,
    que: 'Coadyuvantes: tensioactivos, aceites, antideriva',
    detalle: 'Siempre de últimos, con el tanque casi lleno.',
    porque:
      'Van al final para no interferir con la disolución de lo anterior y porque su dosis se calcula sobre el volumen final, que solo se conoce con el tanque casi lleno. Entrar temprano hace que generen espuma durante toda la carga.',
    siglas: [],
    categoria: 'coadyuvante',
    litros: 147.7,
  },
  {
    paso: 13,
    que: 'Completar agua y mantener la agitación',
    detalle: 'Terminar de llenar y no parar el agitador hasta vaciar el tanque.',
    porque:
      'Detener la agitación —incluso en una pausa corta— permite que las partículas sólidas se sedimenten y que las emulsiones empiecen a separarse en capas. Lo que sale por la boquilla al reanudar ya no es la misma mezcla que se armó. Aplica el caldo el mismo día: guardado de un día para otro se degrada y se separa.',
    siglas: [],
    categoria: 'cierre',
    litros: 200,
  },
];

/** Orden de carga con el nivel de la caneca (0 a 1) al terminar cada paso. */
export const ORDEN_TANQUE = PASOS_CARGA.map((p) => ({ ...p, nivel: p.litros / CAPACIDAD_CANECA }));

/** Qué hace cada tipo de coadyuvante y cuándo se usa. */
export const COADYUVANTES = [
  {
    categoria: 'Tensioactivos / humectantes',
    quePasa:
      'Bajan la tensión superficial del agua para que la gota se extienda sobre la hoja en vez de escurrir, sobre todo en hojas cerosas o pubescentes donde el agua sola rueda sin mojar.',
    cuando: 'Frecuente en post-emergentes de contacto y en aplicaciones foliares en general.',
  },
  {
    categoria: 'Acidificantes / corrector de pH',
    quePasa:
      'Bajan el pH del agua de mezcla cuando sale alcalina de la fuente, para que los ingredientes activos sensibles a la hidrólisis no se degraden dentro del tanque.',
    cuando: 'Se agregan en el paso 2, antes de cualquier otro producto.',
  },
  {
    categoria: 'Acondicionadores de agua dura',
    quePasa:
      'Secuestran el calcio y el magnesio disueltos en el agua para que no se unan a moléculas aniónicas del herbicida —el glifosato es el caso más conocido— y le resten absorción.',
    cuando: 'Se agregan en el paso 2, antes de cualquier otro producto, igual que el corrector de pH.',
  },
  {
    categoria: 'Antiespumantes',
    quePasa:
      'Reducen la espuma que genera la agitación mecánica, más notoria con productos que ya traen tensioactivos fuertes. Espuma excesiva puede hacer que la bomba dosifique aire en vez de mezcla.',
    cuando: 'Se agregan al final, junto con los demás coadyuvantes.',
  },
  {
    categoria: 'Aceites agrícolas (minerales o vegetales)',
    quePasa:
      'Mejoran la penetración a través de la cutícula de la hoja y alargan el tiempo que la gota permanece húmeda sobre la superficie.',
    cuando: 'Comunes con graminicidas post-emergentes y algunos insecticidas de contacto.',
  },
  {
    categoria: 'Coadyuvantes antideriva',
    quePasa:
      'Modifican el tamaño de gota o forman una película que retarda la evaporación, reduciendo la deriva por viento sin cambiar la química del ingrediente activo.',
    cuando: 'Útiles en aplicaciones con viento variable o boquillas que generan gota muy fina.',
  },
  {
    categoria: 'Colorantes / marcadores',
    quePasa:
      'No tienen función agronómica: solo marcan visualmente por dónde ya pasó el aspersor, para evitar traslapes o franjas sin cubrir.',
    cuando: 'Útiles en lotes grandes o irregulares donde es difícil ver el avance a simple vista.',
  },
];

/** Nombre de cada formulación por su sigla en la etiqueta. */
const NOMBRE_FORMULACION = {
  WSB: 'Bolsa hidrosoluble',
  WSP: 'Bolsa hidrosoluble',
  WG: 'Granulado dispersable',
  WDG: 'Granulado dispersable',
  DF: 'Granulado dispersable',
  WP: 'Polvo mojable',
  SG: 'Granulado soluble',
  SP: 'Polvo soluble',
  TB: 'Tableta soluble',
  SC: 'Suspensión concentrada',
  SE: 'Suspoemulsión',
  FL: 'Suspensión concentrada',
  SL: 'Concentrado soluble',
  EW: 'Emulsión aceite en agua',
  EC: 'Concentrado emulsionable',
  CE: 'Concentrado emulsionable',
};

/** Paso del orden de carga en el que entra cada sigla de formulación. */
const PASO_POR_SIGLA = ORDEN_TANQUE.reduce((mapa, p) => {
  p.siglas.forEach((sigla) => {
    mapa[sigla] = p.paso;
  });
  return mapa;
}, {});

const SIGLAS = Object.keys(NOMBRE_FORMULACION).join('|');

/**
 * Deduce el tipo de formulación desde el nombre comercial del producto.
 * ordenCarga es el número de paso de ORDEN_TANQUE en el que se agrega; si la
 * sigla no aparece en ningún paso, se ubica con las suspensiones (paso 8).
 */
export function formulacionDe(producto) {
  const m = String(producto?.nombre || '').match(new RegExp(`\\b(${SIGLAS})\\b`, 'i'));
  if (!m) return null;
  const f = m[1].toUpperCase();
  return { sigla: f, nombre: NOMBRE_FORMULACION[f] || f, ordenCarga: PASO_POR_SIGLA[f] || 8 };
}

/**
 * Cuántos tipos de formulación distintos entran en una mezcla. Desde tres
 * tipos se considera riesgo de incompatibilidad: más pasos delicados en el
 * orden de carga y más probabilidad de grumos o separación.
 */
/**
 * Paso del orden de carga (ORDEN_TANQUE) en el que entra un producto. Si la
 * formulación no se puede deducir, paso es null: mejor decir "revisa la
 * etiqueta" que ubicarlo donde no va.
 */
export function pasoDeCarga(producto) {
  const f = formulacionDe(producto);
  if (f) return { paso: f.ordenCarga, sigla: f.sigla, identificada: true };
  // Los bioestimulantes y nutrientes van con los fertilizantes foliares, después
  // de los plaguicidas, aunque su nombre comercial no traiga la sigla.
  if (producto?.categoria === 'Bioestimulante') return { paso: 11, sigla: null, identificada: true };
  return { paso: null, sigla: null, identificada: false };
}

export function analizarFormulaciones(productos) {
  const porSigla = new Map();
  (productos || []).forEach((p) => {
    const f = formulacionDe(p);
    if (f && !porSigla.has(f.sigla)) porSigla.set(f.sigla, f);
  });
  const tipos = [...porSigla.values()];
  return { tipos, distintas: tipos.length, riesgo: tipos.length >= 3 };
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
  if (chica && valor < 1) {
    // Bajo 10 g o 10 cc un redondeo a entero cambia mucho la dosis real
    // (0,6 g no son 1 g): se muestran uno o dos decimales.
    const numero = valor * 1000;
    return { numero, unidad: chica, decimales: numero < 1 ? 2 : numero < 10 ? 1 : 0 };
  }
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
  const conPaso = calculadas.map((l) => ({ ...l, carga: pasoDeCarga(l.producto) }));
  const orden = conPaso
    .filter((l) => l.carga.paso != null)
    .sort((a, b) => a.carga.paso - b.carga.paso)
    .map((l) => (l.carga.sigla ? `${l.producto.nombre} (${l.carga.sigla})` : l.producto.nombre));
  const sinPaso = conPaso.filter((l) => l.carga.paso == null).map((l) => l.producto.nombre);

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
    `Orden de carga: agua al 70 % → ${orden.join(' → ')} → completar agua`,
    ...(sinPaso.length
      ? [`Revisar en la etiqueta en qué paso va: ${sinPaso.join(', ')} (formulación no identificada).`]
      : []),
    'Prueba de compatibilidad en frasco antes de mezclar. Dosis según etiqueta ICA.',
    '— Calculado con CiboCAMPO',
  ].join('\n');
}
