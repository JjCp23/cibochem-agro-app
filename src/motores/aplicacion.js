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
export function analizarFormulaciones(productos) {
  const porSigla = new Map();
  (productos || []).forEach((p) => {
    const f = formulacionDe(p);
    if (f && !porSigla.has(f.sigla)) porSigla.set(f.sigla, f);
  });
  const tipos = [...porSigla.values()];
  return { tipos, distintas: tipos.length, riesgo: tipos.length >= 3 };
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
