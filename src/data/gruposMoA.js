/**
 * Conocimiento profundo por GRUPO de modo de acción.
 *
 * Decisión de arquitectura: el contenido técnico pesado (sitio de acción,
 * bioquímica, translocación, estadios afectados, motivo de rotación) vive aquí
 * y no repetido en cada uno de los 83 productos. Un producto declara a qué
 * grupo pertenece y hereda todo esto. Si mañana FRAC reclasifica un grupo, se
 * corrige en un solo lugar.
 *
 * Fuentes de la clasificación: IRAC MoA v11.5, HRAC Global (numeración 2020,
 * revisión 2026) y FRAC Code List 2025.
 */

/* ────────────────────────────────────────────────────────────────
   TIPOS DE TRANSLOCACIÓN
   Terminología estándar de redistribución de plaguicidas en planta.
   ──────────────────────────────────────────────────────────────── */
export const TRANSLOCACION = {
  contacto: {
    id: 'contacto',
    nombre: 'No translocado (contacto)',
    icono: '◍',
    descripcion:
      'El producto se queda donde cayó la gota. No entra a los vasos conductores ni se redistribuye.',
    implicacion:
      'La cobertura lo es todo: lo que la gota no toca, queda sin proteger. El crecimiento nuevo que salga después queda desprotegido y hay que volver a aplicar.',
  },
  translaminar: {
    id: 'translaminar',
    nombre: 'Translaminar (sistémico local)',
    icono: '◐',
    descripcion:
      'Penetra la cutícula y atraviesa el grosor de la hoja formando un depósito interno, pero no viaja lejos del punto de entrada.',
    implicacion:
      'Alcanza plagas del envés aunque se asperje por el haz, y llega a minadores dentro de la galería. No protege hojas nuevas.',
  },
  xilema: {
    id: 'xilema',
    nombre: 'Sistémico por xilema (acropetal)',
    icono: '↑',
    descripcion:
      'Se mueve con la corriente de transpiración: siempre hacia arriba y hacia afuera, desde la raíz o el punto de absorción hacia las puntas.',
    implicacion:
      'Protege el tejido nuevo que va emergiendo, por eso funciona en aplicación a semilla, suelo o drench. No baja a la raíz desde la hoja.',
  },
  floema: {
    id: 'floema',
    nombre: 'Sistémico por floema (basipetal)',
    icono: '↓',
    descripcion:
      'Viaja con los fotosintatos hacia los sumideros de la planta: raíces, rizomas, frutos y yemas.',
    implicacion:
      'Es lo que permite matar rizomas y estolones de malezas perennes desde una aspersión foliar. Exige que la planta esté fotosintetizando activamente.',
  },
  ambimobil: {
    id: 'ambimobil',
    nombre: 'Ambimóvil (xilema y floema)',
    icono: '↕',
    descripcion:
      'Verdadero sistémico: se mueve en ambas direcciones, subiendo por xilema y bajando por floema.',
    implicacion:
      'Protege la planta entera, de raíz a punta, desde cualquier punto de aplicación. Es la única movilidad que permite tratar una raíz asperjando la hoja.',
  },
  residual: {
    id: 'residual',
    nombre: 'Residual de suelo',
    icono: '▤',
    descripcion:
      'Permanece activo en la lámina superficial del suelo y lo absorbe la maleza al germinar.',
    implicacion:
      'Necesita humedad para activarse y un suelo bien preparado. Cuidado con la residualidad sobre el cultivo siguiente en la rotación.',
  },
};

/* ────────────────────────────────────────────────────────────────
   ESTADIOS DEL CICLO DE VIDA (insecticidas)
   ──────────────────────────────────────────────────────────────── */
export const ESTADIOS = [
  { id: 'huevo', nombre: 'Huevo', descripcion: 'Actividad ovicida' },
  { id: 'larva', nombre: 'Larva / Ninfa', descripcion: 'Estados inmaduros' },
  { id: 'pupa', nombre: 'Pupa', descripcion: 'Estado de transformación' },
  { id: 'adulto', nombre: 'Adulto', descripcion: 'Insecto formado' },
];

/* ────────────────────────────────────────────────────────────────
   GRUPOS DE MODO DE ACCIÓN
   ──────────────────────────────────────────────────────────────── */
export const GRUPOS_MOA = {
  // ═══════════════ INSECTICIDAS (IRAC) ═══════════════
  'IRAC:1A': {
    nombre: 'Carbamatos',
    proceso: 'Sistema nervioso · Acetilcolinesterasa',
    sitioAccion: 'Enzima acetilcolinesterasa (AChE) en la hendidura sináptica',
    mecanismo:
      'La acetilcolina es el mensajero que salta de una neurona a otra. Después de transmitir la señal, la enzima AChE la destruye para que la neurona se apague. El carbamato bloquea esa enzima: la acetilcolina se acumula y la neurona queda disparando señales sin parar.',
    sintomas: 'Temblores en minutos, convulsiones, parálisis en 1–2 horas y muerte por agotamiento neuromuscular.',
    velocidad: 'Choque rápido (minutos a horas)',
    translocacion: 'contacto',
    estadios: ['huevo', 'larva', 'adulto'],
    espectro: 'Amplio sobre masticadores y trozadores; varios tienen efecto ovicida.',
    riesgo: 'Alto',
    rotacionMotivo:
      'Comparte sitio de acción exacto con los organofosforados: la resistencia a uno confiere resistencia al otro aunque sean familias químicas distintas. Es el caso clásico de resistencia cruzada que hay que saber explicar.',
    decision:
      'Se elige cuando se necesita choque inmediato y efecto ovicida en el mismo pase. No es un producto para usar de forma repetida.',
    precaucion: 'Alta toxicidad para fauna benéfica y aplicador. Extremar el equipo de protección.',
  },
  'IRAC:3A': {
    nombre: 'Piretroides',
    proceso: 'Sistema nervioso · Canal de sodio',
    sitioAccion: 'Canal de sodio dependiente de voltaje del axón',
    mecanismo:
      'El impulso nervioso viaja porque el canal de sodio se abre y se cierra muy rápido. El piretroide retrasa el cierre: el canal queda abierto más tiempo del debido y el axón se despolariza una y otra vez sin recibir estímulo nuevo.',
    sintomas: 'Volteo (knock-down) en minutos: temblor, incoordinación, parálisis.',
    velocidad: 'Muy rápida (minutos)',
    translocacion: 'contacto',
    estadios: ['larva', 'adulto'],
    espectro: 'Amplio sobre masticadores y adultos voladores. Débil sobre ácaros (puede incluso reventarlos).',
    riesgo: 'Alto',
    rotacionMotivo:
      'Es el grupo con más historial de uso masivo en el mundo, y por eso el que más poblaciones resistentes ha generado. Además, la resistencia metabólica que selecciona (esterasas y oxidasas) puede afectar a otros grupos.',
    decision:
      'Se elige por costo y por velocidad de volteo cuando hay que bajar una población adulta ya. No sirve como columna vertebral de un programa.',
    precaucion:
      'Muy tóxico para abejas y para ácaros depredadores. Su uso repetido puede causar brotes secundarios de ácaros al eliminar los benéficos.',
  },
  'IRAC:4A': {
    nombre: 'Neonicotinoides',
    proceso: 'Sistema nervioso · Receptor nicotínico',
    sitioAccion: 'Receptor nicotínico de acetilcolina (nAChR) postsináptico',
    mecanismo:
      'Imita a la acetilcolina y se pega al receptor, pero con una diferencia crítica: la enzima AChE no puede degradarlo. El receptor queda activado de forma permanente y la neurona se sobreestimula hasta colapsar.',
    sintomas: 'El insecto deja de alimentarse muy rápido (efecto antifeeding), luego parálisis progresiva en 24–48 h.',
    velocidad: 'Media (corta la alimentación en horas, mata en 1–2 días)',
    translocacion: 'xilema',
    estadios: ['larva', 'adulto'],
    espectro: 'Excelente sobre chupadores y raspadores. Poca actividad sobre ácaros y lepidópteros grandes.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Su sistemia por xilema deja residuos activos durante semanas, lo que significa presión de selección prolongada sobre varias generaciones de la plaga. En mosca blanca y áfidos ya hay resistencia documentada en varias regiones.',
    decision:
      'Es la herramienta cuando el objetivo es un chupador vector de virus: al cortar la alimentación rápido, reduce la transmisión. También la única vía práctica para proteger desde la semilla o el suelo.',
    precaucion:
      'Alto riesgo para polinizadores por residuo sistémico en néctar y polen. Evitar aplicaciones en floración.',
  },
  'IRAC:5': {
    nombre: 'Spinosinas',
    proceso: 'Sistema nervioso · Receptor nicotínico (sitio alostérico)',
    sitioAccion: 'Receptor nicotínico de acetilcolina, sitio alostérico distinto al del grupo 4A, más acción sobre receptores GABA',
    mecanismo:
      'Se une al receptor nicotínico en un punto diferente al de los neonicotinoides, provocando una activación prolongada, y además altera la señalización GABAérgica. El resultado son contracciones musculares involuntarias hasta la parálisis.',
    sintomas: 'Parálisis en horas, muerte en 1–2 días.',
    velocidad: 'Media',
    translocacion: 'translaminar',
    estadios: ['larva', 'adulto'],
    espectro: 'Muy fuerte sobre trips y lepidópteros; buena sobre minadores. Nula sobre chupadores como áfidos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Aunque toca el mismo receptor que el grupo 4A, lo hace en un sitio de unión distinto, por eso IRAC les da números diferentes y no hay resistencia cruzada entre ambos. Es un punto fino que vale la pena manejar bien.',
    decision:
      'Es la elección cuando hay que aplicar en floración o dentro de un programa con control biológico: origen fermentativo y alta selectividad con benéficos.',
    precaucion:
      'Tóxico para abejas mientras la aspersión está húmeda; una vez seca es seguro. Aplicar al atardecer.',
  },
  'IRAC:6': {
    nombre: 'Avermectinas y milbemicinas',
    proceso: 'Sistema nervioso · Canales de cloro',
    sitioAccion: 'Canales de cloro dependientes de glutamato (GluCl) en neuronas y músculo',
    mecanismo:
      'Mantiene abiertos los canales de cloro. La entrada masiva de cloro hiperpolariza la membrana, es decir, la deja tan cargada negativamente que ya no puede generar un impulso nervioso: la neurona queda apagada.',
    sintomas: 'Parálisis flácida. El insecto deja de alimentarse en horas pero puede tardar 2–4 días en morir.',
    velocidad: 'Lenta en mortalidad, rápida en cese de daño',
    translocacion: 'translaminar',
    estadios: ['larva', 'adulto'],
    espectro: 'Referente en ácaros, minadores y trips. Emamectina destaca en lepidópteros.',
    riesgo: 'Medio',
    rotacionMotivo:
      'El productor suele juzgarlo por la mortalidad visible y repite la aplicación pensando que falló, cuando en realidad la plaga ya dejó de comer. Esa sobreaplicación es la que acelera la resistencia en ácaros.',
    decision:
      'Se elige cuando la plaga está protegida: dentro de la galería del minador, en el envés de la hoja o en el cogollo. La translaminaridad es justo lo que la alcanza.',
    precaucion: 'Muy tóxico para ácaros depredadores y abejas en aspersión fresca.',
  },
  'IRAC:7C': {
    nombre: 'Mímicos de hormona juvenil',
    proceso: 'Regulación del crecimiento',
    sitioAccion: 'Vía de señalización de la hormona juvenil (receptor Met / factor Kr-h1)',
    mecanismo:
      'La hormona juvenil mantiene al insecto en estado inmaduro; para pasar a adulto, sus niveles deben caer. El producto imita esa hormona y la mantiene artificialmente alta, así que el insecto nunca completa la transformación a adulto fértil.',
    sintomas: 'Los huevos no eclosionan; las ninfas mueren al mudar o llegan a adultos deformes y estériles.',
    velocidad: 'Lenta (se mide en generaciones, no en días)',
    translocacion: 'contacto',
    estadios: ['huevo', 'larva', 'pupa'],
    espectro: 'Estados inmaduros de mosca blanca, escamas, trips y algunos lepidópteros. No mata adultos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Al no matar adultos, no genera la presión de selección brusca de un insecticida de choque, y su sitio de acción es exclusivo. Por eso es una de las mejores piezas de rotación disponibles.',
    decision:
      'Se elige para romper el ciclo poblacional, no para apagar un incendio. Si ya hay adultos volando y daño severo, este producto solo no resuelve: hay que combinarlo o preceder con un adulticida.',
    precaucion: 'Muy selectivo con benéficos adultos, compatible con programas MIPE.',
  },
  'IRAC:15': {
    nombre: 'Benzoilureas (inhibidores de síntesis de quitina, tipo 0)',
    proceso: 'Regulación del crecimiento · Quitina',
    sitioAccion: 'Enzima quitín-sintasa del epitelio cuticular',
    mecanismo:
      'El exoesqueleto del insecto es quitina y hay que fabricarlo de nuevo en cada muda. El producto bloquea la enzima que la sintetiza, así que la larva llega a la muda sin poder construir cutícula nueva y muere atrapada o se rompe.',
    sintomas: 'Muerte durante la muda, con cutícula incompleta o rota.',
    velocidad: 'Lenta (depende de cuándo mude la larva)',
    translocacion: 'contacto',
    estadios: ['huevo', 'larva'],
    espectro: 'Larvas de lepidóptero y coleóptero. Sin efecto sobre adultos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Sitio de acción exclusivo, sin resistencia cruzada conocida con los grupos neurotóxicos. Excelente para intercalar entre aplicaciones de grupos 3A o 4A.',
    decision:
      'Solo tiene sentido con larvas pequeñas y en crecimiento activo. Aplicado sobre larvas de último instar que ya no van a mudar, no hace nada.',
    precaucion: 'Selectivo con benéficos adultos; puede afectar inmaduros de depredadores.',
  },
  'IRAC:22A': {
    nombre: 'Oxadiazinas',
    proceso: 'Sistema nervioso · Canal de sodio (bloqueo)',
    sitioAccion: 'Canal de sodio dependiente de voltaje, sitio de bloqueo distinto al de los piretroides',
    mecanismo:
      'Es un proinsecticida: la enzima del propio insecto lo convierte en su forma activa. Esa forma bloquea el canal de sodio en posición cerrada, es decir, hace lo contrario del piretroide: en vez de dejarlo abierto, lo clausura y apaga la conducción nerviosa.',
    sintomas: 'Cesa la alimentación en horas, parálisis y muerte en 1–2 días.',
    velocidad: 'Media',
    translocacion: 'translaminar',
    estadios: ['larva', 'adulto'],
    espectro: 'Lepidópteros, especialmente los que se desplazan sobre el follaje. Actividad sobre coleópteros.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Aunque toca el mismo canal de sodio que los piretroides, lo hace en otro sitio y por otro mecanismo, así que IRAC lo separa: no hay resistencia cruzada con el grupo 3A. Es la salida cuando los piretroides ya fallan.',
    decision:
      'Es la respuesta a un historial de fallas con piretroides en lepidópteros, manteniendo un espectro parecido.',
    precaucion: 'Selectividad moderada con benéficos; menos agresivo que un piretroide.',
  },
  'IRAC:28': {
    nombre: 'Diamidas antranílicas',
    proceso: 'Sistema muscular · Receptor de rianodina',
    sitioAccion: 'Receptor de rianodina (RyR) del retículo sarcoplásmico del músculo',
    mecanismo:
      'El músculo se contrae cuando libera calcio de su almacén interno y se relaja cuando lo recupera. La diamida abre ese almacén de forma permanente: el calcio sale sin control, el músculo queda contraído y ya no puede relajarse.',
    sintomas: 'Parálisis muscular casi inmediata, la larva deja de moverse y de comer en horas.',
    velocidad: 'Rápida en cese de daño',
    translocacion: 'translaminar',
    estadios: ['huevo', 'larva'],
    espectro: 'Muy potente y específico sobre lepidópteros; actividad sobre coleópteros.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Sitio de acción exclusivo en el músculo, no en el sistema nervioso, así que no comparte resistencia con ningún grupo neurotóxico. Es la pieza moderna clave de rotación en lepidópteros, y justo por eso hay que cuidarla: ya hay resistencia reportada en Asia por sobreuso.',
    decision:
      'Se elige cuando se necesita alta eficacia sobre lepidópteros con mínimo impacto sobre benéficos y polinizadores, o cuando el programa exige un producto de bajo riesgo toxicológico cerca de cosecha.',
    precaucion: 'De los grupos más selectivos con fauna benéfica y abejas.',
  },

  // ═══════════════ HERBICIDAS (HRAC) ═══════════════
  'HRAC:1': {
    nombre: 'Inhibidores de la ACCasa',
    legado: 'Grupo A',
    proceso: 'Síntesis de lípidos',
    sitioAccion: 'Acetil-CoA carboxilasa (ACCasa), primer paso de la síntesis de ácidos grasos',
    mecanismo:
      'Sin ácidos grasos no hay membranas celulares nuevas. Los tejidos que más rápido se dividen, los meristemos, son los primeros que se quedan sin material para construir células.',
    sintomas: 'El cogollo de la gramínea se necrosa y se desprende al halarlo. Hojas nuevas cloróticas o rojizas.',
    velocidad: 'Lenta (1–2 semanas)',
    translocacion: 'floema',
    espectro: 'Solo gramíneas. La hoja ancha es naturalmente insensible.',
    riesgo: 'Medio',
    rotacionMotivo:
      'La selectividad no viene del metabolismo del cultivo sino de que la ACCasa de la hoja ancha tiene una estructura distinta que el herbicida no reconoce. Como es un sitio único, basta una mutación puntual en la gramínea para perder el control.',
    decision:
      'Es la herramienta para sacar gramíneas de un cultivo de hoja ancha sin dañarlo. Requiere maleza en crecimiento activo: sobre gramínea estresada por sequía, transloca mal.',
    precaucion: 'No aplicar sobre cultivos gramíneos: no hay selectividad posible.',
  },
  'HRAC:2': {
    nombre: 'Inhibidores de la ALS / AHAS',
    legado: 'Grupo B',
    proceso: 'Síntesis de aminoácidos ramificados',
    sitioAccion: 'Acetolactato sintasa (ALS/AHAS)',
    mecanismo:
      'Bloquea la primera enzima de la ruta que fabrica valina, leucina e isoleucina. Sin esos aminoácidos la planta no puede sintetizar proteínas nuevas y la división celular se detiene.',
    sintomas: 'La maleza se queda quieta a los pocos días (deja de crecer), luego clorosis, enrojecimiento y muerte lenta.',
    velocidad: 'Lenta (1–3 semanas)',
    translocacion: 'floema',
    espectro: 'Amplio: hoja ancha, ciperáceas y algunas gramíneas según la molécula.',
    riesgo: 'Alto',
    rotacionMotivo:
      'Es el grupo con más casos de resistencia documentados en el mundo. Actúa en dosis de gramos por hectárea sobre un sitio único, y la mutación que confiere resistencia no le cuesta nada a la planta en aptitud, así que se fija muy rápido en la población.',
    decision:
      'Se elige por potencia a dosis mínimas y amplitud de espectro, pero es el grupo que más disciplina de rotación exige. Nunca dos aplicaciones seguidas en el mismo lote.',
    precaucion:
      'Residualidad en suelo que puede afectar el cultivo siguiente. Verificar el periodo de espera antes de rotar el lote.',
  },
  'HRAC:4': {
    nombre: 'Auxinas sintéticas',
    legado: 'Grupo O',
    proceso: 'Señalización hormonal',
    sitioAccion: 'Receptores de auxina (TIR1/AFB) y desregulación de la señalización hormonal',
    mecanismo:
      'La auxina es la hormona que ordena el crecimiento. Una dosis sintética masiva desordena por completo ese mensaje: la planta crece de forma descontrolada, dispara etileno y ácido abscísico, y el floema colapsa.',
    sintomas: 'Epinastia: tallos y peciolos retorcidos en espiral, hojas acopadas, tallo agrietado. Muy característico.',
    velocidad: 'Síntoma en horas, muerte en 1–4 semanas',
    translocacion: 'floema',
    espectro: 'Hoja ancha herbácea y, según la molécula, leñosas y arbustivas.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Actúa sobre varios receptores y procesos a la vez, no sobre una sola enzima, y por eso la resistencia ha sido lenta en aparecer pese a más de 70 años de uso. Sigue siendo de los grupos más robustos.',
    decision:
      'Es el estándar de potreros porque respeta la gramínea forrajera y llega por floema hasta la raíz del rebrote leñoso. Exige maleza en crecimiento activo.',
    precaucion:
      'Deriva: cultivos de hoja ancha vecinos son extremadamente sensibles. El picloram además tiene residualidad prolongada en suelo.',
  },
  'HRAC:5': {
    nombre: 'Inhibidores del fotosistema II (sitio A)',
    legado: 'Grupo C1',
    proceso: 'Fotosíntesis',
    sitioAccion: 'Proteína D1 del fotosistema II, sitio de unión de la plastoquinona',
    mecanismo:
      'Se pega a la proteína D1 y corta el transporte de electrones. La energía que capta la clorofila ya no tiene a dónde ir, así que se disipa formando radicales libres que oxidan y revientan las membranas.',
    sintomas: 'Clorosis internerval que avanza a necrosis; el daño se acelera con sol fuerte.',
    velocidad: 'Días',
    translocacion: 'residual',
    espectro: 'Hoja ancha y gramíneas pequeñas, principalmente desde el suelo.',
    riesgo: 'Medio',
    rotacionMotivo:
      'La mutación clásica en la proteína D1 (Ser264Gly) confiere resistencia y está muy extendida en malezas de maíz y caña por décadas de uso continuo del mismo grupo.',
    decision:
      'Se elige por su residualidad: mantiene el lote limpio durante las primeras semanas críticas del cultivo. Necesita humedad de suelo para activarse.',
    precaucion: 'Residualidad que puede afectar cultivos sensibles en rotación. Riesgo de lixiviación en suelos arenosos.',
  },
  'HRAC:6': {
    nombre: 'Inhibidores del fotosistema II (sitio B)',
    legado: 'Grupo C3',
    proceso: 'Fotosíntesis',
    sitioAccion: 'Proteína D1 del fotosistema II, sitio de unión diferente al del grupo 5',
    mecanismo:
      'Bloquea el mismo transporte de electrones que las triazinas, pero uniéndose en otro punto de la misma proteína. Esa diferencia hace que una maleza resistente a triazinas pueda seguir siendo sensible a este grupo.',
    sintomas: 'Secado del tejido tratado en 2–5 días, sin translocación.',
    velocidad: 'Rápida (días)',
    translocacion: 'contacto',
    espectro: 'Hoja ancha y ciperáceas en postemergencia.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Comparte proteína blanco con el grupo 5 pero no siempre comparte resistencia, precisamente porque el sitio de unión es distinto. HRAC los numera aparte por esa razón.',
    decision:
      'Es la opción de contacto en arroz y maíz cuando se necesita control de hoja ancha y coquito sin residualidad de suelo.',
    precaucion: 'Al ser de contacto, la cobertura determina el resultado.',
  },
  'HRAC:9': {
    nombre: 'Inhibidores de la EPSPS',
    legado: 'Grupo G',
    proceso: 'Síntesis de aminoácidos aromáticos',
    sitioAccion: 'Enzima EPSP sintasa de la ruta del ácido shikímico',
    mecanismo:
      'Bloquea la ruta del shikimato, que fabrica fenilalanina, tirosina y triptófano. Esa ruta solo existe en plantas y microorganismos, no en animales, lo que explica su perfil toxicológico. Sin esos aminoácidos no hay proteínas ni metabolitos de defensa.',
    sintomas: 'Amarillamiento lento y progresivo desde los puntos de crecimiento; muerte total incluyendo órganos subterráneos.',
    velocidad: 'Lenta (1–3 semanas)',
    translocacion: 'floema',
    espectro: 'No selectivo: toda planta verde. Es el estándar para perennes con rizoma.',
    riesgo: 'Alto',
    rotacionMotivo:
      'Décadas de uso casi exclusivo lo convirtieron en el herbicida con más malezas resistentes del mundo. La resistencia aparece por amplificación del gen o por mutación del sitio, y una vez instalada en el lote es muy difícil revertirla.',
    decision:
      'Es insustituible para perennes: por floema llega a rizomas y estolones donde ningún herbicida de contacto alcanza. A cambio, exige alternar deliberadamente con el grupo 10 para no quemar la herramienta.',
    precaucion:
      'Antagonismo con agua dura: el calcio y el magnesio lo secuestran. Acondicionar el agua mejora mucho el resultado.',
  },
  'HRAC:10': {
    nombre: 'Inhibidores de la glutamina sintetasa',
    legado: 'Grupo H',
    proceso: 'Metabolismo del nitrógeno',
    sitioAccion: 'Enzima glutamina sintetasa',
    mecanismo:
      'La planta produce amonio constantemente en su metabolismo normal y lo recicla con la glutamina sintetasa. Al bloquear esa enzima, el amonio se acumula hasta niveles tóxicos, colapsa el pH celular y destruye las membranas.',
    sintomas: 'Secado tipo quemado en 2–4 días, muy visible.',
    velocidad: 'Rápida (2–4 días)',
    translocacion: 'contacto',
    espectro: 'No selectivo, amplio, mejor sobre maleza joven.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Es la alternativa práctica al glifosato en lotes con malezas resistentes al grupo 9. Justamente por eso conviene no quemarla también: rotar entre 9 y 10 en lugar de reemplazar uno por el otro de forma permanente.',
    decision:
      'Se elige cuando hace falta un secado rápido y visible, o cuando el lote ya tiene resistencia a glifosato. No espere control de rizomas: es de contacto.',
    precaucion:
      'Depende mucho de la luz y la humedad relativa alta para funcionar bien. Requiere volumen de agua suficiente para cobertura completa.',
  },
  'HRAC:14': {
    nombre: 'Inhibidores de la PPO',
    legado: 'Grupo E',
    proceso: 'Síntesis de clorofila',
    sitioAccion: 'Enzima protoporfirinógeno oxidasa (PPO)',
    mecanismo:
      'Al bloquear la PPO se acumula protoporfirinógeno IX, que en presencia de luz genera oxígeno singlete, una forma de oxígeno extremadamente reactiva que rompe las membranas celulares al instante.',
    sintomas: 'Necrosis en horas: es el modo de acción más rápido de todos, con aspecto de quemadura.',
    velocidad: 'Muy rápida (horas)',
    translocacion: 'contacto',
    espectro: 'Hoja ancha principalmente, ciperáceas y gramíneas pequeñas.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'La resistencia existe pero es poco frecuente porque la mutación en la PPO tiene un costo alto para la planta. Buena pieza de rotación frente a los grupos 2 y 9.',
    decision:
      'Se elige cuando se necesita un resultado inmediato y visible, o como socio residual en preemergencia. Al ser de contacto y depender de la luz, la calidad de la aplicación decide el resultado.',
    precaucion: 'Sin sistemia: la maleza rebrota si solo se quema la parte aérea de una perenne.',
  },
  'HRAC:27': {
    nombre: 'Inhibidores de la HPPD',
    legado: 'Grupo F2',
    proceso: 'Síntesis de carotenoides',
    sitioAccion: 'Enzima 4-hidroxifenilpiruvato dioxigenasa (HPPD)',
    mecanismo:
      'Los carotenoides son el escudo que protege a la clorofila de la propia luz. Sin HPPD no hay carotenoides, y la clorofila se destruye por fotooxidación en cuanto le da el sol.',
    sintomas: 'Blanqueamiento (bleaching) de las hojas nuevas, que salen blancas antes de necrosarse. Inconfundible.',
    velocidad: 'Días',
    translocacion: 'xilema',
    espectro: 'Hoja ancha, algunas gramíneas y ciperáceas.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Modo de acción relativamente moderno y con pocos casos de resistencia, lo que lo hace valioso para romper ciclos de grupos 2 y 5 en caña y maíz.',
    decision:
      'Su síntoma de blanqueamiento sirve como verificación de campo: si no aparece, hubo problema de cobertura o de dosis. Pocos herbicidas dan esa retroalimentación tan clara.',
    precaucion: 'Puede causar blanqueamiento transitorio en el cultivo si hay solapamiento de franjas.',
  },

  // ═══════════════ FUNGICIDAS (FRAC) ═══════════════
  'FRAC:1': {
    nombre: 'Benzimidazoles (MBC)',
    proceso: 'División celular',
    sitioAccion: 'Beta-tubulina durante la mitosis',
    mecanismo:
      'La tubulina forma el huso mitótico, el andamio que reparte los cromosomas al dividirse la célula. Sin él, el hongo no puede completar la mitosis ni crecer.',
    sintomas: 'Detiene la germinación de esporas y el avance del micelio.',
    accion: ['Preventivo', 'Curativo temprano'],
    velocidad: 'Media',
    translocacion: 'xilema',
    objetivo: 'hongos',
    espectro: 'Hongos verdaderos: ascomicetos principalmente. Sin efecto sobre oomicetos.',
    riesgo: 'Alto',
    rotacionMotivo:
      'Una sola mutación puntual en el gen de la beta-tubulina (posición 198 o 200) confiere resistencia total y de golpe, no gradual. Por eso el producto pasa de funcionar bien a no funcionar en absoluto en pocas campañas.',
    decision:
      'Producto de bajo costo y buen espectro, pero hoy debe usarse mezclado con un multisitio y con un máximo de dos aplicaciones por ciclo.',
    precaucion: 'Verificar que la población del patógeno no tenga ya resistencia declarada en la zona.',
  },
  'FRAC:3': {
    nombre: 'DMI · Triazoles',
    proceso: 'Biosíntesis de esteroles',
    sitioAccion: 'Enzima C14-alfa-demetilasa (CYP51) de la ruta del ergosterol',
    mecanismo:
      'El ergosterol es a la membrana del hongo lo que el colesterol a la nuestra: le da fluidez y estabilidad. Al bloquear su síntesis, la membrana queda defectuosa y el hongo no puede seguir creciendo.',
    sintomas: 'Detiene infecciones ya iniciadas antes de que se vean síntomas.',
    accion: ['Preventivo', 'Curativo'],
    velocidad: 'Media',
    translocacion: 'xilema',
    objetivo: 'hongos',
    espectro: 'Muy amplio en hongos verdaderos: royas, manchas, Sigatoka, oídios. Nulo sobre oomicetos, que no tienen ergosterol.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Su resistencia es poligénica y gradual: no se pierde el control de un día para otro, sino que hay que ir subiendo la dosis hasta que deja de ser rentable. Esa erosión lenta es traicionera porque se nota tarde.',
    decision:
      'Es la columna curativa de casi todo programa foliar: la única familia amplia que detiene una infección ya establecida. Limitar a 2–3 aplicaciones por ciclo y siempre alternando.',
    precaucion: 'Algunos triazoles tienen efecto regulador de crecimiento y pueden acortar entrenudos si se sobredosifica.',
  },
  'FRAC:7': {
    nombre: 'SDHI · Carboxamidas',
    proceso: 'Respiración',
    sitioAccion: 'Complejo II (succinato deshidrogenasa) de la cadena respiratoria mitocondrial',
    mecanismo:
      'Bloquea el Complejo II, un eslabón de la cadena que produce la energía del hongo. Sin ATP no hay germinación, ni crecimiento, ni esporulación.',
    sintomas: 'Frena germinación y crecimiento del micelio.',
    accion: ['Preventivo', 'Curativo'],
    velocidad: 'Media',
    translocacion: 'translaminar',
    objetivo: 'hongos',
    espectro: 'Amplio en hongos verdaderos, muy fuerte en Botrytis y manchas foliares.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Ataca la respiración igual que las estrobilurinas pero en un complejo distinto de la cadena, por eso no hay resistencia cruzada entre 7 y 11 y funcionan bien juntos en mezcla.',
    decision:
      'Se elige por su fuerza sobre Botrytis y manchas, casi siempre formulado con una estrobilurina para blindar ambos frentes de la respiración.',
    precaucion: 'Ya hay resistencia documentada en Botrytis por uso repetido. No usar en solitario.',
  },
  'FRAC:11': {
    nombre: 'QoI · Estrobilurinas',
    proceso: 'Respiración',
    sitioAccion: 'Complejo III, sitio Qo del citocromo bc1',
    mecanismo:
      'Bloquea el punto exacto donde el Complejo III recibe electrones. La producción de ATP se corta y el hongo se queda sin energía justo cuando más la necesita: al germinar la espora.',
    sintomas: 'Impide la germinación de esporas y frena fuertemente la esporulación.',
    accion: ['Preventivo', 'Antiesporulante'],
    velocidad: 'Media',
    translocacion: 'translaminar',
    objetivo: 'ambos',
    espectro:
      'Amplio: hongos verdaderos y, a diferencia de triazoles y benzimidazoles, también actividad sobre algunos oomicetos.',
    riesgo: 'Alto',
    rotacionMotivo:
      'La mutación G143A en el citocromo b confiere resistencia total de una sola vez, y se ha extendido en muchos patógenos por todo el mundo. Es el ejemplo de libro de resistencia monogénica: el producto funciona o no funciona, sin término medio.',
    decision:
      'Su fuerza está en lo preventivo: aplicado antes del inóculo es excelente, pero como curativo en solitario es débil. Por eso el mercado casi solo lo vende mezclado con un triazol.',
    precaucion: 'Nunca aplicar en solitario más de una vez seguida. Verificar historial de resistencia en la zona.',
  },
  'FRAC:28': {
    nombre: 'Carbamatos (propamocarb)',
    proceso: 'Síntesis de membranas',
    sitioAccion: 'Síntesis de fosfolípidos y permeabilidad de membrana',
    mecanismo:
      'Interfiere con la construcción de las membranas del oomiceto y con su permeabilidad, frenando la germinación de zoosporas y el crecimiento del micelio.',
    sintomas: 'Frena el avance del patógeno en raíz y cuello.',
    accion: ['Preventivo', 'Curativo temprano'],
    velocidad: 'Media',
    translocacion: 'xilema',
    objetivo: 'oomicetos',
    espectro: 'Específico de oomicetos: Pythium, Phytophthora y mildeos vellosos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Se usa sobre todo en drench y tratamiento de suelo, donde la presión de selección es menor que en aplicaciones foliares repetidas.',
    decision: 'Elección típica para damping off y pudriciones de raíz en semillero y trasplante.',
    precaucion: 'Verificar compatibilidad si se aplica junto con fertilizantes en drench.',
  },
  'FRAC:33': {
    nombre: 'Fosfonatos (fosetil aluminio)',
    proceso: 'Doble: acción directa e inducción de defensas',
    sitioAccion: 'Acción multisitio débil sobre el patógeno más activación de las defensas de la planta',
    mecanismo:
      'Tiene un efecto tóxico directo modesto, pero su verdadera fuerza es activar el sistema inmune de la planta: induce la producción de fitoalexinas y proteínas de defensa que frenan al oomiceto.',
    sintomas: 'Detiene el avance del patógeno, sobre todo en raíz y cuello.',
    accion: ['Preventivo', 'Curativo temprano'],
    velocidad: 'Media',
    translocacion: 'ambimobil',
    objetivo: 'oomicetos',
    espectro: 'Oomicetos: Phytophthora, Pythium, mildeos vellosos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Como parte de su efecto depende de la respuesta de la planta y no solo de un sitio bioquímico del patógeno, la resistencia es muy poco frecuente pese a décadas de uso.',
    decision:
      'Es de los poquísimos productos verdaderamente ambimóviles: se asperja la hoja y baja hasta la raíz. Esa propiedad lo hace insustituible en pudriciones radiculares donde el drench no es viable.',
    precaucion: 'Puede ser fitotóxico mezclado con productos de reacción ácida o con cobre.',
  },
  'FRAC:43': {
    nombre: 'Benzamidas (fluopicolide)',
    proceso: 'Citoesqueleto celular',
    sitioAccion: 'Proteínas del citoesqueleto (deslocalización de espectrina)',
    mecanismo:
      'Desorganiza el esqueleto interno de la célula del oomiceto. Sin esa estructura, la célula pierde forma y función en minutos.',
    sintomas: 'Efecto muy rápido sobre zoosporas móviles.',
    accion: ['Preventivo', 'Curativo'],
    velocidad: 'Rápida',
    translocacion: 'xilema',
    objetivo: 'oomicetos',
    espectro: 'Oomicetos, con acción destacada sobre zoosporas.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Sitio de acción novedoso y exclusivo, sin resistencia cruzada con fenilamidas ni con CAA. Por eso se formula con propamocarb: dos modos de acción distintos contra el mismo grupo de patógenos.',
    decision: 'Se elige cuando hay presión alta de oomicetos y se necesita cortar la fase de zoospora móvil.',
    precaucion: 'Usar siempre en mezcla o alternancia para proteger un modo de acción todavía nuevo.',
  },
  'FRAC:M03': {
    nombre: 'Ditiocarbamatos (multisitio)',
    proceso: 'Multisitio',
    sitioAccion: 'Múltiples enzimas con grupos sulfhidrilo (-SH) del metabolismo del hongo',
    mecanismo:
      'No tiene un blanco único: inactiva simultáneamente muchas enzimas distintas. El hongo tendría que mutar en varios genes a la vez para resistirlo, algo estadísticamente casi imposible.',
    sintomas: 'Barrera protectora que impide la germinación de la espora sobre la superficie.',
    accion: ['Preventivo'],
    velocidad: 'Inmediata como barrera',
    translocacion: 'contacto',
    objetivo: 'ambos',
    espectro: 'Muy amplio: hongos verdaderos y oomicetos.',
    riesgo: 'Nulo',
    rotacionMotivo:
      'Es el ancla de todo programa antirresistencia. No porque sea el más potente, sino porque nunca falla por resistencia y, mezclado con un producto de sitio único, reduce la presión de selección sobre ese socio.',
    decision:
      'Se aplica antes de que llegue el inóculo. No cura nada y no protege el tejido que crece después, así que el intervalo entre aplicaciones lo marca la tasa de crecimiento del cultivo y la lluvia.',
    precaucion: 'Requiere reaplicación tras lluvias fuertes. Cuidar el periodo de carencia.',
  },
  'FRAC:M05': {
    nombre: 'Cloronitrilos (multisitio)',
    proceso: 'Multisitio',
    sitioAccion: 'Múltiples enzimas del hongo por unión a grupos tiol',
    mecanismo:
      'Igual que los ditiocarbamatos, ataca muchos puntos del metabolismo a la vez, lo que hace prácticamente imposible la aparición de resistencia.',
    sintomas: 'Película protectora persistente sobre la superficie tratada.',
    accion: ['Preventivo'],
    velocidad: 'Inmediata como barrera',
    translocacion: 'contacto',
    objetivo: 'ambos',
    espectro: 'Amplio, con muy buena residualidad y resistencia al lavado.',
    riesgo: 'Nulo',
    rotacionMotivo:
      'Mismo papel que M03 en el programa: socio multisitio que protege la vida útil de los productos de sitio único.',
    decision: 'Se prefiere sobre otros multisitio cuando se necesita mayor persistencia bajo lluvia.',
    precaucion: 'Puede dejar residuo visible en fruto. Atención al periodo de carencia.',
  },
};

/* ────────────────────────────────────────────────────────────────
   AYUDAS DE CONSULTA
   ──────────────────────────────────────────────────────────────── */

/** Separa un grupo compuesto ("6 + 4A") en códigos individuales. */
export function codigosDeGrupo(grupo) {
  if (!grupo) return [];
  return String(grupo)
    .split('+')
    .map((g) => g.trim().toUpperCase())
    .filter(Boolean);
}

/**
 * Grupo de rotación de un código.
 *
 * IRAC es explícito: la rotación debe basarse en el NÚMERO del grupo, no en la
 * letra de subgrupo. 3A y 3B comparten sitio de acción y por lo tanto comparten
 * resistencia cruzada. En FRAC los códigos multisitio (M03, M05) se conservan
 * completos porque identifican grupos químicos distintos.
 */
export function grupoDeRotacion(sistema, codigo) {
  if (!codigo) return null;
  const c = String(codigo).trim().toUpperCase();
  if (c.startsWith('M') || c.startsWith('U') || c.startsWith('P')) return c;
  const numero = c.match(/^\d+/);
  return numero ? numero[0] : c;
}

/** Devuelve la ficha del grupo de modo de acción, si existe. */
export function fichaGrupo(sistema, codigo) {
  if (!sistema || !codigo) return null;
  return GRUPOS_MOA[`${sistema}:${String(codigo).trim().toUpperCase()}`] || null;
}

/** Todas las fichas de grupo de un producto (una por cada código de la mezcla). */
export function fichasDeProducto(producto) {
  if (!producto?.sistema) return [];
  return codigosDeGrupo(producto.grupo)
    .map((c) => ({ codigo: c, ficha: fichaGrupo(producto.sistema, c) }))
    .filter((x) => x.ficha);
}
