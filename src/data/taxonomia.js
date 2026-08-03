/**
 * Taxonomía agronómica que alimenta el diagnóstico guiado.
 *
 * El flujo del asistente es siempre el mismo:
 *   1. ¿Qué vas a manejar?   -> RAMAS
 *   2. ¿Qué exactamente?     -> rama.objetivos
 *   3. ¿Dónde / cuándo?      -> rama.escenarios y rama.momentos
 *
 * Los `id` de esta taxonomía son los mismos que llevan los productos
 * en sus campos objetivos / escenarios / momento.
 */

export const COLORES = {
  tinta: '#0B2431',
  azul: '#1F6FA5',
  azulClaro: '#DCEAF3',
  naranja: '#E8722C',
  naranjaClaro: '#FBE7D8',
  verde: '#3F7A5E',
  verdeClaro: '#DDECE4',
  teal: '#0F766E',
  tealClaro: '#D7EBE9',
  ambar: '#B45309',
  papel: '#F1F5F8',
  borde: '#CFDCE5',
  textoSuave: '#5A7183',
};

export const COLOR_CATEGORIA = {
  Insecticida: COLORES.azul,
  Herbicida: COLORES.naranja,
  Fungicida: COLORES.teal,
  Bioestimulante: COLORES.verde,
  Regulador: COLORES.ambar,
};

export const COLOR_RIESGO = {
  Alto: '#C2410C',
  Medio: '#B45309',
  Bajo: '#3F7A5E',
  Nulo: '#1F6FA5',
};

export const RAMAS = [
  {
    id: 'insectos',
    titulo: 'Insectos y ácaros',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    resumen: 'Plagas que se alimentan del cultivo',
    pregunta: '¿Qué tipo de plaga estás viendo?',
    objetivos: [
      { id: 'chupadores', label: 'Chupadores', ayuda: 'Mosca blanca, áfidos, escamas' },
      { id: 'masticadores', label: 'Masticadores', ayuda: 'Comedores de follaje' },
      { id: 'lepidopteros', label: 'Larvas de lepidóptero', ayuda: 'Gusanos en general' },
      { id: 'cogolleros', label: 'Cogolleros', ayuda: 'Larva protegida en el cogollo' },
      { id: 'acaros', label: 'Ácaros', ayuda: 'Arañita roja, blanca' },
      { id: 'trips', label: 'Trips', ayuda: 'Raspadores del follaje' },
      { id: 'raspadores', label: 'Raspadores', ayuda: 'Daño superficial en hoja y fruto' },
      { id: 'minadores', label: 'Minadores', ayuda: 'Galerías dentro de la hoja' },
      { id: 'barrenadores', label: 'Barrenadores', ayuda: 'Perforan tallo o fruto' },
      { id: 'trozadores', label: 'Trozadores', ayuda: 'Cortan plántulas a ras' },
      { id: 'coleopteros', label: 'Coleópteros', ayuda: 'Escarabajos y picudos' },
      { id: 'huevos-ninfas', label: 'Huevos y ninfas', ayuda: 'Control poblacional temprano' },
    ],
    preguntaEscenario: '¿Cómo vas a aplicar?',
    escenarios: [
      { id: 'general', label: 'Aspersión foliar' },
      { id: 'semilla-suelo', label: 'Semilla o suelo' },
    ],
    preguntaMomento: '¿En qué momento estás?',
    momentos: [
      { id: 'preventivo-vector', label: 'Prevención', ayuda: 'Aún no hay daño; protejo el cultivo' },
      { id: 'larvas-tempranas', label: 'Población inicial', ayuda: 'Primeros individuos, larvas pequeñas' },
      { id: 'larvas-activas', label: 'Larvas alimentándose', ayuda: 'Ya hay daño en follaje' },
      { id: 'poblacion-establecida', label: 'Población establecida', ayuda: 'Daño visible, necesito choque' },
      { id: 'preventivo-poblacional', label: 'Cortar el ciclo', ayuda: 'Bajar la siguiente generación' },
      { id: 'siembra', label: 'En siembra', ayuda: 'Tratamiento a semilla o suelo' },
    ],
  },
  {
    id: 'malezas',
    titulo: 'Malezas',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    resumen: 'Competencia por luz, agua y nutrientes',
    pregunta: '¿Qué tipo de maleza vas a controlar?',
    objetivos: [
      { id: 'hoja-ancha', label: 'Hoja ancha', ayuda: 'Dicotiledóneas' },
      { id: 'gramineas', label: 'Gramíneas', ayuda: 'Hoja angosta, pastos' },
      { id: 'ciperaceas', label: 'Ciperáceas', ayuda: 'Coquito, cortadera' },
      { id: 'lenosas', label: 'Leñosas y arbustivas', ayuda: 'Rebrote en potreros' },
      { id: 'helechos', label: 'Helechos', ayuda: 'Helecho marranero' },
      { id: 'perennes', label: 'Perennes con rizoma', ayuda: 'Rebrotan desde la raíz' },
      { id: 'no-selectivo', label: 'Todo lo verde', ayuda: 'Limpieza total del lote' },
    ],
    preguntaEscenario: '¿Dónde vas a aplicar?',
    escenarios: [
      { id: 'potreros', label: 'Potreros y pastos' },
      { id: 'arroz', label: 'Arroz' },
      { id: 'maiz', label: 'Maíz' },
      { id: 'cana', label: 'Caña de azúcar' },
      { id: 'cultivo-hoja-ancha', label: 'Cultivo de hoja ancha' },
      { id: 'barbecho', label: 'Barbecho o preparación' },
      { id: 'calles-cultivo', label: 'Calles del cultivo' },
    ],
    preguntaMomento: '¿Cuándo vas a aplicar?',
    momentos: [
      { id: 'preemergente', label: 'Preemergente', ayuda: 'Antes de que nazca la maleza' },
      { id: 'postemergente-temprana', label: 'Postemergente temprana', ayuda: 'Maleza pequeña y tierna' },
      { id: 'postemergente', label: 'Postemergente', ayuda: 'Maleza ya desarrollada' },
      { id: 'preparacion-lote', label: 'Preparación de lote', ayuda: 'Limpieza antes de sembrar' },
    ],
  },
  {
    id: 'enfermedades',
    titulo: 'Enfermedades',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    resumen: 'Hongos verdaderos y oomicetos',
    pregunta: '¿Qué tipo de enfermedad estás manejando?',
    objetivos: [
      { id: 'hongos-foliares', label: 'Hongos foliares', ayuda: 'Tizones, antracnosis' },
      { id: 'manchas', label: 'Manchas foliares', ayuda: 'Lesiones definidas en hoja' },
      { id: 'roya', label: 'Roya', ayuda: 'Pústulas anaranjadas' },
      { id: 'sigatoka', label: 'Sigatoka', ayuda: 'Banano y plátano' },
      { id: 'oomicetos', label: 'Oomicetos', ayuda: 'Phytophthora, Pythium' },
      { id: 'mildeo-velloso', label: 'Mildeo velloso', ayuda: 'Oomiceto foliar' },
      { id: 'raiz-suelo', label: 'Raíz y suelo', ayuda: 'Pudriciones, damping off' },
      { id: 'botrytis', label: 'Botrytis y pudriciones', ayuda: 'Moho gris en flor y fruto' },
    ],
    preguntaEscenario: '¿En qué cultivo?',
    escenarios: [
      { id: 'general', label: 'Uso general' },
      { id: 'banano-platano', label: 'Banano y plátano' },
    ],
    preguntaMomento: '¿En qué punto está la enfermedad?',
    momentos: [
      { id: 'preventivo', label: 'Todavía no aparece', ayuda: 'Quiero proteger antes del inóculo' },
      { id: 'curativo', label: 'Ya hay síntomas', ayuda: 'Necesito detener la infección' },
    ],
  },
  {
    id: 'nutricion',
    titulo: 'Nutrición y estrés',
    categoria: 'Bioestimulante',
    sistema: null,
    resumen: 'Fisiología, desarrollo y recuperación',
    pregunta: '¿Qué necesita la planta?',
    objetivos: [
      { id: 'enraizamiento', label: 'Enraizar mejor', ayuda: 'Siembra o trasplante' },
      { id: 'floracion-cuajado', label: 'Floración y cuajado', ayuda: 'Reducir caída de flor' },
      { id: 'llenado-fruto', label: 'Llenado de fruto', ayuda: 'Calibre y peso' },
      { id: 'estres', label: 'Recuperar de estrés', ayuda: 'Sequía, calor, fitotoxicidad' },
      { id: 'balance-hormonal', label: 'Balance hormonal', ayuda: 'Desarrollo equilibrado' },
      { id: 'suelo', label: 'Mejorar el suelo', ayuda: 'Estructura y vida microbiana' },
      { id: 'induccion-defensa', label: 'Activar defensas', ayuda: 'Preparar a la planta' },
      { id: 'elongacion', label: 'Alargar brotes', ayuda: 'Giberelinas' },
      { id: 'brotacion', label: 'Estimular brotación', ayuda: 'Romper latencia de yemas' },
      { id: 'compactar', label: 'Compactar la planta', ayuda: 'Frenar crecimiento vegetativo' },
    ],
    preguntaEscenario: '¿En qué cultivo?',
    escenarios: [
      { id: 'general', label: 'Uso general' },
      { id: 'algodon', label: 'Algodón' },
    ],
    preguntaMomento: '¿En qué etapa está el cultivo?',
    momentos: [
      { id: 'siembra', label: 'Siembra' },
      { id: 'trasplante', label: 'Trasplante' },
      { id: 'brotacion', label: 'Brotación' },
      { id: 'vegetativo', label: 'Desarrollo vegetativo' },
      { id: 'floracion', label: 'Floración' },
      { id: 'llenado', label: 'Llenado y cosecha' },
      { id: 'estres', label: 'Bajo estrés' },
    ],
  },
];

/** Etiquetas legibles para mostrar los códigos internos en la interfaz. */
export const ETIQUETAS = (() => {
  const mapa = {};
  RAMAS.forEach((r) => {
    [...r.objetivos, ...r.escenarios, ...r.momentos].forEach((o) => {
      mapa[o.id] = o.label;
    });
  });
  return mapa;
})();

/**
 * Devuelve el nombre legible de una etiqueta. Si algún producto usa un código
 * que todavía no existe en la taxonomía, lo muestra de forma presentable en vez
 * de dejar ver el identificador interno.
 */
export function etiquetaDe(id) {
  if (!id) return '';
  if (ETIQUETAS[id]) return ETIQUETAS[id];
  const texto = String(id).replace(/-/g, ' ');
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const CATEGORIAS = ['Insecticida', 'Herbicida', 'Fungicida', 'Bioestimulante', 'Regulador'];
