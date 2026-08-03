/**
 * Contenido de referencia del módulo "Aprender".
 *
 * Es la parte de la app que responde el "por qué" detrás de cada recomendación:
 * biología de arvenses, diferencia entre hongos y oomicetos, ciclo de vida de
 * los insectos y principios de manejo de resistencia.
 */

export const TEMAS = [
  // ════════════════════════════════════════════════════════════
  {
    id: 'resistencia',
    titulo: 'Cómo se maneja la resistencia',
    resumen: 'El principio que gobierna todas las decisiones de la app',
    secciones: [
      {
        titulo: 'Rotar es cambiar de sitio de acción, no de marca',
        texto:
          'La resistencia aparece cuando una población recibe presión repetida sobre el mismo blanco bioquímico. Los individuos que por azar tienen una mutación en ese blanco sobreviven, se reproducen y en pocas generaciones dominan la población. Cambiar de nombre comercial o de familia química no cambia nada si el sitio de acción es el mismo.',
      },
      {
        titulo: 'El número del grupo manda; la letra no',
        texto:
          'IRAC es explícito: la rotación se planifica con el número del grupo, no con la letra del subgrupo. Un producto 3A y uno 3B tocan el mismo canal de sodio, así que rotar de uno a otro no rompe la presión de selección. Las letras solo distinguen familias químicas dentro del mismo sitio de acción. Esta app aplica esa regla al calcular la rotación.',
        destacado: true,
      },
      {
        titulo: 'Sitio único frente a multisitio',
        texto:
          'Un producto de sitio único ataca una sola enzima: es potente y selectivo, pero una mutación puntual basta para anularlo. Un multisitio golpea muchas enzimas a la vez, así que el patógeno tendría que mutar en varios genes simultáneamente, algo estadísticamente casi imposible. Por eso los multisitio (FRAC M03, M05) tienen riesgo prácticamente nulo y son el ancla de cualquier programa.',
      },
      {
        titulo: 'Resistencia monogénica frente a poligénica',
        texto:
          'Hay dos formas de perder un producto. La monogénica es de golpe: una sola mutación, como la G143A de las estrobilurinas, y el producto pasa de funcionar bien a no funcionar. La poligénica es una erosión lenta, como en los triazoles: hay que ir subiendo la dosis hasta que deja de ser rentable. La segunda es más traicionera porque se detecta tarde.',
      },
      {
        titulo: 'La ventana de generación',
        texto:
          'La regla práctica es no usar el mismo grupo en generaciones consecutivas de la plaga. En un insecto con generaciones de tres semanas, dos aplicaciones del mismo grupo separadas por un mes ya son presión sobre generaciones distintas y eso está bien; separadas por una semana, es presión sobre la misma cohorte y eso selecciona resistencia.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'translocacion',
    titulo: 'Cómo se mueve el producto en la planta',
    resumen: 'Determina dónde protege, qué alcanza y cómo hay que aplicarlo',
    secciones: [
      {
        titulo: 'La movilidad decide la técnica de aplicación',
        texto:
          'Saber si un producto es de contacto o sistémico no es un dato de catálogo: cambia el volumen de agua, la boquilla, el momento y la expectativa de resultado. Un producto de contacto mal cubierto simplemente no funciona; un sistémico aplicado sobre planta estresada tampoco, porque no transloca.',
      },
      {
        titulo: 'Contacto (no translocado)',
        texto:
          'Se queda donde cayó la gota. Exige cobertura total y volumen de agua suficiente. Todo el crecimiento posterior a la aplicación queda sin proteger, así que el intervalo entre aplicaciones lo marca qué tan rápido crece el cultivo. Ejemplos: mancozeb, chlorothalonil, piretroides, glufosinato, oxyfluorfen.',
      },
      {
        titulo: 'Translaminar (sistémico local)',
        texto:
          'Atraviesa el grosor de la hoja y forma un depósito interno, pero no viaja lejos. Es lo que permite alcanzar ácaros del envés asperjando por el haz, o llegar a un minador dentro de su galería. No protege hojas nuevas. Ejemplos: abamectina, spinosad, estrobilurinas, clorantraniliprol.',
      },
      {
        titulo: 'Xilema (acropetal, hacia arriba)',
        texto:
          'Sube con la corriente de transpiración, siempre hacia las puntas y hojas nuevas, nunca hacia abajo. Es la movilidad que permite tratar semilla o suelo y que la planta se proteja sola mientras crece. Como depende de la transpiración, una planta con estrés hídrico transloca mal. Ejemplos: neonicotinoides, triazoles, mesotrione.',
      },
      {
        titulo: 'Floema (basipetal, hacia abajo)',
        texto:
          'Viaja con los azúcares hacia los sumideros: raíces, rizomas, frutos y yemas. Es lo que permite matar el rizoma de una maleza perenne desde una aspersión foliar. Exige planta fotosintetizando activamente: sobre maleza agostada o cortada recientemente, el glifosato falla por esta razón. Ejemplos: glifosato, 2,4-D, picloram, clethodim.',
      },
      {
        titulo: 'Ambimóvil (xilema y floema)',
        texto:
          'Verdadero sistémico en ambos sentidos: protege desde la raíz hasta la punta sin importar dónde se aplique. Es una propiedad rara y valiosa. El fosetil aluminio es el ejemplo clásico: se asperja al follaje y llega a controlar patógenos de raíz.',
        destacado: true,
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'arvenses',
    titulo: 'Arvenses: biología y momento de control',
    resumen: 'Por qué el mismo herbicida funciona o falla según cuándo se aplique',
    secciones: [
      {
        titulo: 'Hoja ancha, gramíneas y ciperáceas',
        texto:
          'La primera decisión es botánica. Las de hoja ancha (dicotiledóneas) tienen nervadura ramificada, meristemo apical expuesto y responden a las auxinas sintéticas. Las gramíneas tienen nervadura paralela, meristemo protegido en la base y son insensibles a las auxinas, por eso el 2,4-D respeta el pasto. Las ciperáceas parecen gramíneas pero tienen tallo triangular y macizo, y muchas se reproducen por tubérculos, lo que las hace difíciles de erradicar con productos de contacto.',
      },
      {
        titulo: 'Anuales frente a perennes: la diferencia decisiva',
        texto:
          'Una anual completa su ciclo en una temporada y muere; controlarla antes de que semille rompe el ciclo. Una perenne sobrevive por rizomas, estolones o tubérculos, y ahí es donde un herbicida de contacto fracasa: quema la parte aérea y la planta rebrota en dos semanas. Para perennes se necesita movilidad por floema que baje hasta el órgano de reserva.',
        destacado: true,
      },
      {
        titulo: 'El banco de semillas',
        texto:
          'El suelo guarda semillas viables durante años y no germinan todas a la vez. Por eso un solo control postemergente nunca limpia un lote de forma definitiva: solo elimina la cohorte que ya nació. La combinación de un residual de suelo con un postemergente ataca las dos poblaciones, la presente y la que viene.',
      },
      {
        titulo: 'El periodo crítico de competencia',
        texto:
          'No hay que mantener el lote limpio todo el ciclo, sino durante la ventana en que la competencia realmente reduce el rendimiento, que en la mayoría de los cultivos anuales va de las 2 a las 6–8 semanas después de la emergencia. Una maleza que nace después del cierre del dosel compite poco. Esto define cuándo vale la pena gastar en control.',
      },
      {
        titulo: 'Tamaño de la maleza y translocación',
        texto:
          'La regla de campo: maleza pequeña y en crecimiento activo se controla con menos dosis y mejor resultado. Una maleza grande tiene más área foliar pero también cutícula más gruesa, menor proporción de tejido en crecimiento y a menudo estrés hídrico, lo que reduce la translocación justo cuando más se necesita.',
      },
      {
        titulo: 'Pre y postemergencia',
        texto:
          'Preemergente actúa sobre la semilla que germina y necesita humedad de suelo para activarse y un suelo bien preparado, sin terrones ni rastrojo que intercepten el producto. Postemergente actúa sobre la planta ya nacida y necesita cobertura y hoja receptiva. Aplicar un preemergente sin humedad prevista es tirar el producto.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'hongos',
    titulo: 'Hongos verdaderos y oomicetos',
    resumen: 'La distinción que más errores de recomendación evita',
    secciones: [
      {
        titulo: 'No son parientes',
        texto:
          'Los oomicetos parecen hongos y causan enfermedades parecidas, pero pertenecen a un linaje completamente distinto, más cercano a las algas pardas. Esa diferencia evolutiva tiene consecuencias prácticas directas sobre qué fungicida funciona.',
        destacado: true,
      },
      {
        titulo: 'Las tres diferencias que importan',
        texto:
          'Primera: la pared celular del hongo verdadero es de quitina, la del oomiceto es de celulosa. Segunda: la membrana del hongo contiene ergosterol, la del oomiceto no. Tercera: el oomiceto produce zoosporas móviles con flagelo que nadan en la película de agua del suelo o la hoja.',
      },
      {
        titulo: 'Por qué un triazol no controla Phytophthora',
        texto:
          'Los triazoles (FRAC 3) bloquean la síntesis de ergosterol. Si el oomiceto no tiene ergosterol en su membrana, el producto simplemente no tiene blanco. Lo mismo ocurre con los benzimidazoles. Es el error de recomendación más común y más caro en enfermedades de raíz.',
        destacado: true,
      },
      {
        titulo: 'Qué sí controla oomicetos',
        texto:
          'Los grupos específicos: FRAC 28 (propamocarb), FRAC 33 (fosetil aluminio), FRAC 43 (fluopicolide), FRAC 4 (fenilamidas) y FRAC 40 (CAA). Además, los multisitio M03 y M05 tienen actividad sobre ambos linajes, y las estrobilurinas (FRAC 11) tienen actividad parcial sobre algunos oomicetos.',
      },
      {
        titulo: 'La pista de campo: el agua',
        texto:
          'Los oomicetos necesitan agua libre para que naden sus zoosporas. Si el problema aparece tras riegos pesados, lluvias prolongadas, en las partes bajas del lote o en suelos con drenaje deficiente, y ataca cuello y raíz, la sospecha de oomiceto es alta. El manejo del agua es tan importante como el fungicida.',
      },
      {
        titulo: 'Preventivo, curativo y erradicante',
        texto:
          'Preventivo actúa antes de que la espora germine y debe estar puesto antes del inóculo. Curativo detiene una infección ya iniciada pero todavía sin síntomas visibles. Erradicante actúa sobre lesiones ya establecidas y esporulando. La mayoría de fungicidas son buenos preventivos y regulares curativos; casi ninguno es un buen erradicante, y esa es la razón por la que un programa se construye hacia adelante y no a la reacción.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'insectos',
    titulo: 'Ciclo de vida y momento de control',
    resumen: 'Cada producto pega en una parte distinta del ciclo',
    secciones: [
      {
        titulo: 'Metamorfosis completa e incompleta',
        texto:
          'Los lepidópteros y coleópteros tienen metamorfosis completa: huevo, larva, pupa y adulto, y la larva es la que come y hace el daño. Los chupadores como áfidos, mosca blanca y trips tienen metamorfosis incompleta: la ninfa se parece al adulto y ambos dañan. Esto define a qué estadio hay que apuntar.',
      },
      {
        titulo: 'El estadio larval decide el resultado',
        texto:
          'Las larvas pequeñas (primeros instares) son mucho más sensibles y están más expuestas. Las de últimos instares tienen cutícula más gruesa, comen más pero mueren menos, y muchas se han refugiado dentro del fruto, el cogollo o el tallo, donde ningún contacto llega. El monitoreo existe justamente para no perder esa ventana.',
        destacado: true,
      },
      {
        titulo: 'Productos que no matan adultos',
        texto:
          'Los reguladores de crecimiento (IRAC 7C) y los inhibidores de quitina (IRAC 15) actúan sobre huevos y estados inmaduros. Aplicarlos con la población adulta ya volando da la sensación de que fallaron, cuando en realidad están cortando la generación siguiente. Son productos de estrategia, no de emergencia.',
      },
      {
        titulo: 'Por qué los huevos son el eslabón más barato',
        texto:
          'Un ovicida o un regulador aplicado sobre la postura evita toda una generación de daño con una sola intervención. Es la aplicación más eficiente del ciclo, pero exige monitoreo: hay que estar viendo posturas, no daño.',
      },
      {
        titulo: 'Chupadores y transmisión de virus',
        texto:
          'Con vectores de virus el objetivo no es solo matar el insecto sino cortar la alimentación rápido, antes de que inocule. Por eso en mosca blanca y áfidos vectores se prefieren productos sistémicos que actúan al alimentarse y tienen efecto antifeeding, y por eso la protección desde la semilla o el suelo tiene tanto sentido en las primeras semanas del cultivo.',
      },
      {
        titulo: 'Umbral de acción',
        texto:
          'Aplicar por calendario es la vía más rápida a la resistencia y al gasto innecesario. El umbral de acción es la densidad de plaga a partir de la cual el daño esperado supera el costo del control. Por debajo de ese umbral, la mejor decisión agronómica es no aplicar y dejar trabajar a los benéficos.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'aplicacion',
    titulo: 'Calidad de aplicación',
    resumen: 'La variable que más explica una falla de control',
    secciones: [
      {
        titulo: 'Antes de culpar al producto',
        texto:
          'Cuando un control falla, la causa suele estar en la aplicación y no en la molécula: cobertura insuficiente, volumen mal calibrado, agua inadecuada, momento equivocado o plaga en un estadio que ese producto no toca. Revisar eso primero evita cambiar de producto sin necesidad y evita atribuir a resistencia lo que fue un problema de técnica.',
        destacado: true,
      },
      {
        titulo: 'Volumen y cobertura',
        texto:
          'Un sistémico tolera menos volumen porque se redistribuye solo. Un contacto necesita volumen y buena atomización porque solo protege lo que moja. Subir la dosis no compensa una cobertura deficiente: lo que hace es aumentar el costo y la presión de selección.',
      },
      {
        titulo: 'Calidad del agua',
        texto:
          'El pH y la dureza afectan a varias moléculas. El glifosato es el caso clásico: el calcio y el magnesio del agua dura lo secuestran y reducen su eficacia, y por eso acondicionar el agua mejora el resultado sin subir la dosis. Aguas muy alcalinas hidrolizan algunos insecticidas en el tanque en cuestión de horas.',
      },
      {
        titulo: 'Momento del día',
        texto:
          'Temperaturas altas y humedad relativa baja secan la gota antes de que penetre y aumentan la deriva por evaporación. Las primeras horas de la mañana y el final de la tarde suelen dar mejor absorción. Además, aplicar al atardecer reduce la exposición de polinizadores.',
      },
      {
        titulo: 'Orden de mezcla en el tanque',
        texto:
          'El orden habitual es: llenar la mitad del tanque con agua y el agitador andando, luego los productos en polvo o granulados dispersables, después las suspensiones, luego los solubles y por último los concentrados emulsionables y coadyuvantes. Invertir el orden es la causa más frecuente de grumos y de boquillas tapadas.',
      },
    ],
  },
];

/** Preguntas frecuentes de campo, con respuesta directa. */
export const PREGUNTAS = [
  {
    p: '¿Por qué el glifosato no me controló el coquito?',
    r: 'El coquito (ciperácea) se reproduce por tubérculos subterráneos. El glifosato sí transloca por floema, pero si la planta estaba pequeña o estresada no bajó suficiente producto al tubérculo. Se necesita maleza en crecimiento activo, con área foliar suficiente para absorber, y en general más de una aplicación.',
  },
  {
    p: '¿Puedo mezclar un piretroide con un neonicotinoide?',
    r: 'Sí, de hecho varias formulaciones comerciales del portafolio ya vienen así, y aporta choque más sistemia. Pero para el manejo de resistencia esa mezcla cuenta como haber usado ambos grupos: en la siguiente aplicación hay que salir de 3A y de 4A.',
  },
  {
    p: 'Apliqué un fungicida y la mancha siguió creciendo. ¿Falló?',
    r: 'Depende de qué se esperaba. La mayoría de fungicidas son preventivos y curativos tempranos, no erradicantes: una lesión ya formada no desaparece. Lo que hay que evaluar es si aparecieron lesiones nuevas después de la aplicación, no si las viejas se borraron.',
  },
  {
    p: '¿Por qué la abamectina "no mató" los ácaros?',
    r: 'La abamectina causa parálisis flácida: el ácaro deja de alimentarse en horas pero puede tardar días en morir, y el cadáver queda en la hoja. Evaluar por movilidad y por daño nuevo, no por conteo de individuos presentes.',
  },
  {
    p: '¿Cada cuánto puedo repetir el mismo producto?',
    r: 'La referencia es no repetir el mismo número de grupo en generaciones consecutivas de la plaga ni más de dos veces por ciclo en el caso de los grupos de alto riesgo. Si hay que aplicar seguido, se alterna el grupo, no la marca.',
  },
  {
    p: '¿El bioestimulante reemplaza al fertilizante?',
    r: 'No. El bioestimulante actúa sobre procesos fisiológicos en dosis bajas: mejora la eficiencia con la que la planta usa lo que ya tiene. Si falta nitrógeno, hay que aplicar nitrógeno. Sobre un cultivo mal nutrido, el bioestimulante rinde poco.',
  },
];
