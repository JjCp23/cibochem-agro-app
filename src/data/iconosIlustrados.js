/**
 * Ícono ilustrado de cada concepto de la app: líneas, ramas del diagnóstico,
 * objetivos, cultivos, herramientas y temas.
 *
 * Son dibujos planos en SVG que viven en public/iconos/ (Fluent Emoji de
 * Microsoft en su versión plana, licencia MIT, más nueve dibujados para la
 * app: ver public/iconos/LICENCIA.md). Aquí solo se dice qué archivo
 * representa cada concepto, así que cambiar un ícono es cambiar una línea.
 */
export const ICONO_ILUSTRADO = {
  // Líneas del portafolio
  Insecticida: 'bug',
  Herbicida: 'herb',
  Fungicida: 'mushroom',
  Bioestimulante: 'seedling',
  Regulador: 'straight-ruler',

  // Ramas del diagnóstico
  insectos: 'bug',
  malezas: 'herb',
  enfermedades: 'mushroom',
  nutricion: 'seedling',
  ciclo: 'butterfly',

  // Insectos y ácaros
  chupadores: 'fly',
  masticadores: 'cricket',
  lepidopteros: 'butterfly',
  cogolleros: 'ear-of-corn',
  acaros: 'spider',
  trips: 'trips',
  raspadores: 'raspadores',
  minadores: 'minador',
  barrenadores: 'beetle',
  trozadores: 'worm',
  coleopteros: 'lady-beetle',
  'huevos-ninfas': 'egg',

  // Malezas
  'hoja-ancha': 'four-leaf-clover',
  gramineas: 'sheaf-of-rice',
  ciperaceas: 'ciperacea',
  lenosas: 'deciduous-tree',
  helechos: 'helecho',
  perennes: 'ginger-root',
  'no-selectivo': 'fire',

  // Enfermedades
  'hongos-foliares': 'brown-mushroom',
  manchas: 'fallen-leaf',
  roya: 'maple-leaf',
  sigatoka: 'banana',
  oomicetos: 'water-wave',
  'mildeo-velloso': 'mildeo',
  'raiz-suelo': 'rock',
  botrytis: 'grapes',

  // Nutrición y fisiología
  enraizamiento: 'potted-plant',
  'floracion-cuajado': 'blossom',
  'llenado-fruto': 'red-apple',
  estres: 'thermometer',
  'balance-hormonal': 'balance-scale',
  suelo: 'worm',
  'induccion-defensa': 'shield',
  elongacion: 'straight-ruler',
  brotacion: 'seedling',
  compactar: 'triangular-ruler',

  // Cultivos
  arroz: 'sheaf-of-rice',
  maiz: 'ear-of-corn',
  papa: 'potato',
  cafe: 'hot-beverage',
  'platano-banano': 'banana',
  cana: 'cana',
  tomate: 'tomato',
  hortalizas: 'leafy-green',
  cruciferas: 'broccoli',
  citricos: 'tangerine',
  aguacate: 'avocado',
  flores: 'rose',
  pastos: 'cow',
  algodon: 'algodon',
  cacao: 'chocolate-bar',
  palma: 'palm-tree',
  'frutales-andinos': 'blueberries',
  frijol: 'beans',
  cebolla: 'onion',
  pimenton: 'bell-pepper',
  mango: 'mango',
  pina: 'pineapple',
  fresa: 'strawberry',

  // Herramientas, aplicación y temas
  bidon: 'bidon',
  agua: 'droplet',
  bomba: 'bucket',
  calibrar: 'stopwatch',
  orden: 'clipboard',
  etiqueta: 'clipboard',
  epp: 'gloves',
  gafas: 'goggles',
  equipo: 'toolbox',
  viento: 'wind-face',
  lluvia: 'cloud-with-rain',
  hora: 'sun-behind-cloud',
  frasco: 'test-tube',
  envases: 'recycling-symbol',
  rotacion: 'repeat-button',
  comparar: 'balance-scale',
  catalogo: 'package',
  resistencia: 'shield',
  translocacion: 'droplet',
  arvenses: 'herb',
  hongos: 'mushroom',
  aplicacion: 'tractor',
  umbrales: 'magnifying-glass-tilted-left',
  alerta: 'warning',
  laboratorio: 'alembic',
  idea: 'light-bulb',
  campo: 'sunrise-over-mountains',
  sol: 'sun',
};

/** Ícono de un producto: el de su objetivo principal, o el de su línea. */
export function iconoDeProducto(producto) {
  const objetivo = producto?.objetivos?.find((o) => ICONO_ILUSTRADO[o]);
  return objetivo || producto?.categoria;
}
