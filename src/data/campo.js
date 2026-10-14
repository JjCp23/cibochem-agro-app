/**
 * Ficha de campo de cada producto, indexada por id.
 *
 * Origen:
 *  - Guía de campo del portafolio (docs/Portafolio_Cibochem_en_Campo.html,
 *    rama claude/practical-turing-s0r1zt): mecanismo, qué se ve en campo,
 *    blancos, usos, consejo y descripción del portafolio.
 *  - "etiqueta": usos por cultivo leídos en fichas técnicas y en el vademécum
 *    PLM/DEAQ (octubre de 2026), solo los de confianza media o alta y con su
 *    fuente. No se incluyen dosis ni periodos de carencia o reentrada: esos
 *    datos se leen siempre en la etiqueta ICA vigente.
 *  - "cultivos": ids de cultivo detectados en los dos textos anteriores;
 *    "etiqueta.cultivos" son solo los que aparecen en la ficha técnica.
 *
 * El texto entre **dobles asteriscos** se muestra resaltado.
 */
export const CAMPO = {
  "eseoese": {
    "descripcion": "Insecticida que actúa por contacto e ingestión, ideal para el control de lepidópteros que se desplazan sobre el follaje.",
    "mecanismo": "Es un pro-insecticida: entra inactivo y son las propias enzimas del insecto (esterasas y amidasas) las que lo convierten en su forma tóxica, DCJW. Esa forma bloquea el canal de sodio dependiente de voltaje —pero lo bloquea, no lo mantiene abierto como el piretroide—. El impulso nervioso deja de propagarse y el insecto queda con parálisis flácida.",
    "enCampo": "Lo primero que ves no es la larva muerta: es que **dejó de comer**. El cese de alimentación ocurre en las primeras 0 a 4 horas, mientras que la muerte tarda de 24 a 60 horas. Si al día siguiente revisas y encuentras larvas vivas pero inmóviles y el cogollo sin daño nuevo, el producto está funcionando. Es el error más común con esta molécula: se descarta porque 'no mató rápido'.",
    "blancos": "Complejo de lepidópteros: Spodoptera frugiperda (cogollero), Helicoverpa, Tuta absoluta, Plutella xylostella, Neoleucinodes (pasador del fruto), Diatraea.",
    "usos": "Hortalizas, tomate, maíz, algodón, crucíferas, ornamentales. Buen perfil de selectividad con benéficos y polinizadores comparado con piretroides y carbamatos.",
    "consejo": "Grupo IRAC 22A: es un modo de acción único en todo el portafolio, no comparte sitio de acción con ningún otro insecticida de Cibochem. Eso lo vuelve la pieza más valiosa del programa de rotación contra lepidópteros. No lo quemes en aplicaciones consecutivas.",
    "accion": "Contacto e ingestión",
    "cultivos": [
      "maiz",
      "tomate",
      "hortalizas",
      "flores",
      "algodon"
    ]
  },
  "forxam": {
    "descripcion": "Insecticida de amplio espectro que controla insectos masticadores, chupadores y raspadores en diversos cultivos.",
    "mecanismo": "Idéntica composición a TAGEO 247 SC. Piretroide que fuerza el canal de sodio a quedarse abierto (choque) más neonicotinoide agonista del receptor nicotínico que sube por xilema y sostiene el control.",
    "enCampo": "Mismo comportamiento que TAGEO: derribe en la primera hora, residualidad sistémica de 10 a 14 días sobre el crecimiento nuevo. Bajo sol fuerte y temperatura alta el piretroide pierde eficacia —los piretroides tienen coeficiente de temperatura negativo, funcionan mejor en fresco—; por eso rinde más aplicado al final de la tarde.",
    "blancos": "Masticadores, chupadores y raspadores: trips, mosca blanca, áfidos, cogollero, picudos, chinches.",
    "usos": "Amplio: arroz, maíz, hortalizas, frutales, pastos, algodón.",
    "consejo": "Gemelo de TAGEO. Si un cliente te dice que uno le funcionó y el otro no, el problema estuvo en la aplicación o en la plaga, no en el producto: son la misma química en la misma concentración.",
    "accion": "Contacto, ingestión y sistémico",
    "cultivos": [
      "arroz",
      "maiz",
      "hortalizas",
      "pastos",
      "algodon"
    ]
  },
  "metelon": {
    "descripcion": "Insecticida sistémico de amplio espectro que actúa por contacto e ingestión contra insectos chupadores, comedores de follaje, barrenadores y minadores.",
    "mecanismo": "Neonicotinoide de tercera generación. Mismo sitio de acción que thiametoxam e imidacloprid —agonista del receptor nicotínico de acetilcolina— pero con una diferencia física decisiva: es el neonicotinoide más soluble en agua de todos (alrededor de 39.800 mg/L). Esa solubilidad es la que le da un movimiento xilemático muy superior.",
    "enCampo": "Es el que mejor se ve en aplicación al suelo. En drench o por riego, sube y se distribuye por toda la planta en 24 a 48 horas —más rápido que imidacloprid, que es mucho menos soluble—. En campo eso significa control de chupadores en la parte alta de la planta aplicando abajo, y protección de hoja nueva por 14 a 21 días.",
    "blancos": "Chupadores, comedores de follaje, barrenadores y minadores: mosca blanca, áfidos, saltahojas, psílidos, escamas, minador de la hoja.",
    "usos": "Hortalizas, frutales, arroz, café, cítricos, ornamentales. Muy fuerte en cultivo protegido con riego por goteo.",
    "consejo": "Sirve donde el imidacloprid ya falla por resistencia metabólica en mosca blanca, pero sigue siendo IRAC 4A: no cuenta como rotación real frente a TIOXAM, INSECTOPRID o la parte neonicotinoide de TAGEO/FORXAM/RIDDER/FURIOSO/MULTA PRO. Alta toxicidad para abejas por vía sistémica —no aplicar en floración.",
    "accion": "Contacto, ingestión y sistémico",
    "cultivos": [
      "arroz",
      "cafe",
      "hortalizas",
      "citricos",
      "flores"
    ]
  },
  "zutano": {
    "descripcion": "Insecticida que actúa por contacto e ingestión afectando el desarrollo de larvas de lepidópteros al inhibir la síntesis de quitina.",
    "mecanismo": "Regulador de crecimiento. Inhibe la quitina sintasa tipo 1, la enzima que construye la nueva cutícula del insecto. La larva sigue comiendo y creciendo normal, pero cuando le toca mudar no logra formar el exoesqueleto nuevo: se rompe en la muda y muere deshidratada o atrapada en la exuvia.",
    "enCampo": "No esperes insectos muertos al día siguiente: **el efecto se ve en la muda**, entre 3 y 7 días. Encuentras larvas muertas a medio mudar, con la cabeza cápsula vieja pegada. También hay efecto ovicida y transovárico: las hembras que lo tocan ponen huevos que no eclosionan. Solo funciona bien si se aplica temprano, sobre larvas pequeñas (L1–L2). Sobre larvas grandes llegas tarde.",
    "blancos": "Larvas de lepidópteros: Spodoptera, Tuta absoluta, Plutella, Phthorimaea, minadores. También sirve contra picudos y algunos coleópteros.",
    "usos": "Hortalizas, tomate, papa, algodón, frutales, cítricos.",
    "consejo": "Muy selectivo con adultos de benéficos —no afecta parasitoides ni depredadores adultos—, lo que lo vuelve ideal para programas de MIP. Pero recuerda: no mata adultos de la plaga. Si la presión es de adultos, necesitas otra cosa en la mezcla.",
    "accion": "Ingestión y contacto",
    "cultivos": [
      "papa",
      "tomate",
      "hortalizas",
      "citricos",
      "algodon"
    ]
  },
  "acelerex": {
    "descripcion": "Insecticida que actúa por contacto e ingestión con una alta eficacia sobre lepidópteros y coleópteros.",
    "mecanismo": "Modulador del receptor de rianodina. Fuerza la apertura de los canales de calcio del retículo sarcoplásmico del músculo: el calcio almacenado se vacía sin control, la contracción muscular se vuelve imposible de sostener y el insecto queda en parálisis flácida irreversible. Es un sitio de acción exclusivo de las diamidas.",
    "enCampo": "El **cese de alimentación es casi inmediato** —minutos a pocas horas—, mucho antes de la muerte, que puede tardar 1 a 3 días. En campo se ve como larvas contraídas, encogidas en forma de C, todavía en la planta pero sin causar daño. La residualidad es larga: 14 a 21 días de protección real. Y tiene movimiento xilemático y translaminar, así que alcanza larvas dentro del cogollo.",
    "blancos": "Lepidópteros y coleópteros: cogollero, Helicoverpa, Tuta absoluta, Neoleucinodes, Diatraea, minador de los cítricos, escarabajos.",
    "usos": "Maíz, arroz, hortalizas, tomate, frutales, caña, cítricos.",
    "consejo": "Es de los insecticidas más selectivos que existen con polinizadores, parasitoides y depredadores: encaja perfecto en MIP. Su sitio de acción IRAC 28 es único en el portafolio —cuídalo—. Ya hay resistencia documentada en Tuta absoluta y Plutella en varias regiones por uso repetido: máximo dos aplicaciones consecutivas y rotar.",
    "accion": "Contacto e ingestión",
    "cultivos": [
      "arroz",
      "maiz",
      "cana",
      "tomate",
      "hortalizas",
      "citricos"
    ]
  },
  "cyper": {
    "descripcion": "Insecticida de amplio espectro que controla efectivamente adultos y larvas de insectos defoliadores y trozadores.",
    "mecanismo": "Piretroide clásico: mantiene abierto el canal de sodio del axón, generando descargas nerviosas repetitivas hasta el colapso. Actúa sobre adultos y larvas por igual, siempre que haya contacto directo con la gota o con el residuo fresco.",
    "enCampo": "Efecto de choque en minutos, muy visible: el productor lo valora justamente por eso. La residualidad real sobre follaje es corta, de 3 a 5 días, y cae más rápido con sol fuerte y lluvia. Como no penetra, el insecto que estaba en el envés o dentro del cogollo cuando aplicaste sigue vivo.",
    "blancos": "Defoliadores y trozadores: Spodoptera, Agrotis (trozador), crisomélidos, chinches, áfidos, picudos.",
    "usos": "Amplio: maíz, arroz, pastos, hortalizas, café, frutales, algodón.",
    "consejo": "Producto de choque, no de programa. Su uso repetido es la causa número uno de resistencia por kdr en Spodoptera en Colombia, y de brotes secundarios de ácaros y mosca blanca por eliminación de enemigos naturales. Úsalo como herramienta puntual de alta población, no como base de la rotación.",
    "accion": "Contacto e ingestión",
    "cultivos": [
      "arroz",
      "maiz",
      "cafe",
      "hortalizas",
      "pastos",
      "algodon"
    ]
  },
  "metomil40": {
    "descripcion": "Insecticida con efecto de choque sobre insectos defoliadores, trozadores y con efecto ovicida.",
    "mecanismo": "Inhibidor de la acetilcolinesterasa. Se une a la enzima que debe degradar la acetilcolina en la sinapsis; sin esa degradación, el neurotransmisor se acumula y la señal nerviosa no se apaga nunca. La unión del carbamato es reversible —a diferencia del organofosforado—, por eso la acción es muy rápida pero también más corta.",
    "enCampo": "Choque violento en menos de una hora, con efecto ovicida adicional que es su gran diferencial: **mata huevos ya puestos**, algo que casi ningún otro producto del portafolio hace. Residualidad corta, de 2 a 4 días. Si a los cinco días hay reinfestación, no es que 'no sirvió': es su perfil normal.",
    "blancos": "Defoliadores y trozadores, huevos y larvas de lepidópteros, áfidos, trips, minadores, mosca blanca.",
    "usos": "Hortalizas, algodón, maíz, tomate, papa, flores.",
    "consejo": "Categoría toxicológica alta —banda roja—: exige equipo de protección completo, periodos de reentrada estrictos y mucho cuidado en el manejo del envase. Es el producto del portafolio con el que más rigurosa debe ser la recomendación de seguridad. Devastador para benéficos.",
    "accion": "Contacto, ingestión y sistémico local",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Papa",
          "blancos": [
            "Pulguilla (Epitrix cucumeris)"
          ]
        }
      ],
      "fuente": "https://pfcinsumosagricolas.com/doc/FT/CIBOCHEM/METOMIL%20FT.pdf",
      "confianza": "media",
      "cultivos": [
        "papa"
      ]
    },
    "cultivos": [
      "maiz",
      "papa",
      "tomate",
      "hortalizas",
      "flores",
      "algodon"
    ]
  },
  "metomil216": {
    "descripcion": "Insecticida con efecto de choque sobre insectos defoliadores, trozadores y con efecto ovicida.",
    "mecanismo": "Misma molécula que la presentación 40 SP, formulada como líquido soluble. Inhibición reversible de la acetilcolinesterasa: acumulación de acetilcolina, hiperexcitación y muerte rápida del insecto.",
    "enCampo": "Idéntico comportamiento: choque en menos de una hora, ovicida, residualidad de 2 a 4 días. La ventaja de la formulación SL es la facilidad de dosificación y mezcla en equipos grandes, sin polvo en suspensión al cargar.",
    "blancos": "Complejo de defoliadores, trozadores, huevos de lepidóptero, áfidos, trips.",
    "usos": "Hortalizas, algodón, maíz, arroz, flores. La presentación de 20 L está dirigida a operaciones grandes.",
    "consejo": "Misma advertencia de toxicidad que la presentación sólida. La diferencia entre las dos es logística y de manejo, no de eficacia: es el mismo IRAC 1A y no constituyen rotación entre sí.",
    "accion": "Contacto, ingestión y sistémico local",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Papa",
          "blancos": [
            "Mosca minadora (Liriomyza huidobrensis)"
          ]
        }
      ],
      "fuente": "http://agroquimicos-organicosplm.com/colombia/metomil_vascal_216_sl/436/1/17008/13/3",
      "confianza": "media",
      "cultivos": [
        "papa"
      ]
    },
    "cultivos": [
      "arroz",
      "maiz",
      "papa",
      "hortalizas",
      "flores",
      "algodon"
    ]
  },
  "tioxam": {
    "descripcion": "Insecticida de alta sistemia para el control efectivo de insectos raspadores y chupadores.",
    "mecanismo": "Agonista del receptor nicotínico de acetilcolina. Se une al receptor postsináptico y no se degrada, provocando excitación continua, temblores y parálisis. Dentro de la planta se metaboliza parcialmente a clotianidina, que es igualmente activa: por eso su efecto se prolonga más de lo que sugiere su propia vida media.",
    "enCampo": "Es el sistémico de referencia del portafolio. Aplicado al suelo o por goteo sube por el xilema y en 2 a 3 días ya está en las hojas nuevas; en foliar el efecto es más rápido pero menos duradero. Sobre trips y mosca blanca se ve la reducción de población entre el día 2 y el día 4, con protección del brote por 14 a 21 días.",
    "blancos": "Raspadores y chupadores: trips, mosca blanca, áfidos, saltahojas, minadores, psílidos, escamas jóvenes.",
    "usos": "Arroz, papa, hortalizas, café, cítricos, frutales, flores. Excelente en tratamiento al suelo y en semillero.",
    "consejo": "Producto ancla de la línea. Recuerda que 4A se comparte con METELON, INSECTOPRID, RIDDER, FURIOSO, MULTA PRO, TAGEO y FORXAM: ocho referencias del portafolio pisan el mismo sitio de acción. Alternar entre ellas no es rotar. Y por ser sistémico y persistente en néctar y polen, evítalo en floración.",
    "accion": "Contacto, ingestión y sistémico",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Tomate",
          "blancos": [
            "Prodiplosis (Prodiplosis longifila)"
          ]
        }
      ],
      "fuente": "http://agroquimicos-organicosplm.com/colombia/tioxam_250_wg/436/1/17022/230/3",
      "confianza": "alta",
      "cultivos": [
        "tomate"
      ]
    },
    "cultivos": [
      "arroz",
      "papa",
      "cafe",
      "tomate",
      "hortalizas",
      "citricos",
      "flores"
    ]
  },
  "insectoprid": {
    "descripcion": "Insecticida con un efecto sobre insectos chupadores, raspadores y comedores de follaje.",
    "mecanismo": "El neonicotinoide original: agonista del receptor nicotínico de acetilcolina en el sistema nervioso central del insecto. Su afinidad por el receptor de insecto es mucho mayor que por el de mamífero, lo que explica su perfil toxicológico favorable frente a los carbamatos.",
    "enCampo": "Menos soluble que thiametoxam y dinotefuran, así que su movimiento en el suelo es más lento y requiere más agua de incorporación: en drench el efecto se ve entre el día 3 y el 5. En foliar tiene buena actividad translaminar. Muy fuerte en insectos de suelo y en chupadores de savia; su residualidad de 21 a 30 días en aplicación al suelo es de las más largas del portafolio.",
    "blancos": "Chupadores, raspadores y comedores de follaje: áfidos, mosca blanca, trips, chinches, gusanos de suelo, picudos, saltahojas.",
    "usos": "Café (broca y chupadores), arroz, papa, hortalizas, caña, frutales, pastos, banano.",
    "consejo": "Es el neonicotinoide con más resistencia documentada en mosca blanca (Bemisia tabaci) y áfidos en Colombia, precisamente por ser el más antiguo y el más usado. Si un cliente reporta que 'ya no le funciona', esa es la explicación probable, y la salida no es subir dosis sino cambiar de grupo IRAC.",
    "accion": "Contacto, ingestión y sistémico",
    "cultivos": [
      "arroz",
      "papa",
      "cafe",
      "platano-banano",
      "cana",
      "hortalizas",
      "pastos"
    ]
  },
  "concentrina": {
    "descripcion": "Insecticida de acción de choque sobre insectos adultos, chupadores, defoliadores y trozadores.",
    "mecanismo": "Piretroide que actúa sobre el canal de sodio del axón, igual que cipermetrina y deltametrina, pero con dos particularidades: tiene actividad acaricida real —cosa rara en el grupo— y una afinidad altísima por las ceras de la cutícula vegetal, lo que le da una residualidad muy superior a la del resto de piretroides.",
    "enCampo": "Choque rápido más residualidad larga: es el piretroide que más días de control da sobre superficie. Se adhiere tanto a la cera de la hoja que resiste bien el lavado por lluvia una vez seco. Muy usado en tratamientos perimetrales y de suelo por su persistencia.",
    "blancos": "Adultos chupadores, defoliadores y trozadores; también ácaros y plagas de suelo como Agrotis y gusanos alambre.",
    "usos": "Pastos, maíz, algodón, hortalizas, frutales, banano. También en tratamientos de estructura y bodega.",
    "consejo": "Su persistencia es una ventaja y un riesgo: prolonga el control pero también prolonga el daño a la fauna benéfica, lo que favorece brotes secundarios de ácaros. Muy tóxico para organismos acuáticos: máximo cuidado con deriva y lavado de equipos cerca de fuentes de agua.",
    "accion": "Contacto e ingestión",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Pastos",
          "blancos": [
            "Chinche de los pastos (Collaria scenica)"
          ]
        }
      ],
      "fuente": "https://agroquimicos-organicosplm.com/colombia/concentrina_100_ec/436/1/16986/11/3",
      "confianza": "media",
      "cultivos": [
        "pastos"
      ]
    },
    "cultivos": [
      "maiz",
      "platano-banano",
      "hortalizas",
      "pastos",
      "algodon"
    ]
  },
  "oromectin": {
    "descripcion": "Insecticida de residualidad media para el control de ácaros, trips y minadores en diversos cultivos.",
    "mecanismo": "Agonista alostérico de los canales de cloruro activados por glutamato —y en menor medida por GABA—. Abre esos canales y los deja abiertos: entra cloruro masivamente a la neurona, que queda hiperpolarizada y no puede transmitir. El resultado es parálisis y muerte, sin que exista ese canal en vertebrados de la misma forma.",
    "enCampo": "Aquí el **movimiento translaminar lo es todo**. Aplicas al haz y la molécula forma un reservorio dentro del mesófilo, donde queda protegida de la luz. Eso permite matar al minador dentro de su galería y al ácaro del envés, sin ser sistémico. Los ácaros dejan de moverse en pocas horas y mueren en 2 a 4 días. Punto crítico: es **muy fotodegradable** en superficie, así que aplicar al final de la tarde cambia radicalmente el resultado.",
    "blancos": "Ácaros (Tetranychus, Polyphagotarsonemus, Aculops), trips, minadores (Liriomyza), psílidos.",
    "usos": "Hortalizas, flores, tomate, frutales, cítricos, banano, aguacate.",
    "consejo": "Siempre con coadyuvante o aceite agrícola: la penetración translaminar depende de él. Y no lo apliques al mediodía. La resistencia en Tetranychus es frecuente donde se usa sin rotación; alternar con ACARISIL (IRAC 7C) es una buena estrategia porque atacan estados distintos.",
    "accion": "Contacto e ingestión",
    "cultivos": [
      "platano-banano",
      "tomate",
      "hortalizas",
      "citricos",
      "aguacate",
      "flores"
    ]
  },
  "lambdox": {
    "descripcion": "Insecticida con efecto de choque sobre insectos defoliadores y trozadores.",
    "mecanismo": "Piretroide de alta potencia sobre el canal de sodio, con marcado efecto repelente e irritante además del efecto letal. Esa irritancia hace que el insecto abandone la superficie tratada antes de recibir la dosis letal, lo que en algunos casos protege el cultivo incluso sin matar.",
    "enCampo": "Derribe en minutos y un efecto de repelencia que se nota en el comportamiento: los adultos vuelan de la planta tratada. La residualidad en follaje es de 5 a 7 días. Como todo piretroide, rinde mucho más aplicado en fresco —temprano en la mañana o al atardecer— que bajo sol pleno.",
    "blancos": "Defoliadores y trozadores, chinches, áfidos, trips adultos, picudos, crisomélidos.",
    "usos": "Arroz, maíz, pastos, hortalizas, café, algodón, frutales.",
    "consejo": "Es el mismo ingrediente que va dentro de TAGEO y FORXAM. Si vas a rotar, ten presente que esas tres referencias comparten IRAC 3A. En zonas con historial de piretroides, revisa primero la eficacia con un ensayo pequeño antes de recomendar lotes completos.",
    "accion": "Contacto e ingestión",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Tomate",
          "blancos": [
            "Gusano del fruto del tomate (Neoleucinodes elegantalis)"
          ]
        }
      ],
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/lambdox_50_ec/436/1/17000/11/3",
      "confianza": "media",
      "cultivos": [
        "tomate"
      ]
    },
    "cultivos": [
      "arroz",
      "maiz",
      "cafe",
      "tomate",
      "hortalizas",
      "pastos",
      "algodon"
    ]
  },
  "ridder": {
    "descripcion": "Insecticida que controla efectivamente ácaros, minadores y chupadores, con un efecto residual de larga duración.",
    "mecanismo": "Combina dos rutas complementarias: la abamectina entra a la hoja y actúa por vía translaminar sobre lo que está dentro y en el envés; el imidacloprid sube por el xilema y protege sistémicamente el crecimiento nuevo. Uno cubre el presente, el otro cubre las dos o tres semanas siguientes.",
    "enCampo": "Es de las mezclas más completas del portafolio en términos de cobertura espacial. Sobre ácaros y minadores ves efecto en 2 a 4 días por la abamectina; sobre chupadores el control se sostiene 15 a 21 días por el imidacloprid. Aplicado al suelo pierdes la parte de abamectina —que no es sistémica— y quedas solo con el neonicotinoide.",
    "blancos": "Ácaros, minadores, mosca blanca, áfidos, trips, psílidos, escamas.",
    "usos": "Hortalizas, tomate, flores, frutales, cítricos, banano, café.",
    "consejo": "Es la misma mezcla que FURIOSO 328 SC —otra pareja de marcas gemelas del portafolio—. Y como trae imidacloprid, entra al conteo de aplicaciones de IRAC 4A del programa; no sirve para alternar con TIOXAM o INSECTOPRID.",
    "accion": "Contacto, ingestión y sistémico",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Aguacate",
          "blancos": [
            "Escama verde"
          ]
        },
        {
          "cultivo": "Arroz",
          "blancos": [
            "Chinche de la panícula"
          ]
        },
        {
          "cultivo": "Rosas",
          "blancos": [
            "Acaros"
          ]
        }
      ],
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/ridder_328_sc/436/1/17016/58/3",
      "confianza": "media",
      "cultivos": [
        "arroz",
        "aguacate",
        "flores"
      ]
    },
    "cultivos": [
      "arroz",
      "cafe",
      "platano-banano",
      "tomate",
      "hortalizas",
      "citricos",
      "aguacate",
      "flores"
    ]
  },
  "multa": {
    "descripcion": "Insecticida contundente en el control de larvas de lepidópteros como cogolleros y comedores de follaje en diversos cultivos.",
    "mecanismo": "Derivado semisintético de la abamectina, optimizado para lepidópteros. Igual que ella, abre los canales de cloruro activados por glutamato y GABA, provocando entrada masiva de cloruro, hiperpolarización neuronal y parálisis irreversible. Su afinidad por larvas de lepidóptero es notablemente mayor que la de abamectina.",
    "enCampo": "Su virtud es entrar a la hoja y quedarse ahí: por eso **alcanza al cogollero dentro del cogollo**, que es donde el producto de contacto no llega. La larva deja de comer en pocas horas, queda paralizada y muere en 2 a 4 días. Aplicado en maíz, el signo de que funcionó es que las hojas que van saliendo del cartucho ya no traen daño nuevo.",
    "blancos": "Larvas de lepidópteros: Spodoptera frugiperda (cogollero), Helicoverpa, Tuta absoluta, Plutella, comedores de follaje.",
    "usos": "Maíz, hortalizas, tomate, brócoli, arroz, flores, frutales.",
    "consejo": "Ya hay resistencia documentada a emamectina en poblaciones de Spodoptera frugiperda por knockdown del gen del canal de cloruro. Es una molécula que hay que cuidar: aplicar sobre larvas pequeñas, con buen cubrimiento del cogollo y rotando con IRAC 22A (ESE O ESE) o IRAC 28 (ACELEREX).",
    "accion": "Ingestión y contacto",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Tomate",
          "blancos": [
            "Tuta absoluta (listada en la fuente como 'Gusano cogollero')"
          ]
        }
      ],
      "fuente": "https://pfcinsumosagricolas.com/doc/FT/CIBOCHEM/MULTA%20FT.pdf",
      "confianza": "media",
      "cultivos": [
        "tomate"
      ]
    },
    "cultivos": [
      "arroz",
      "maiz",
      "tomate",
      "hortalizas",
      "flores"
    ]
  },
  "multapro": {
    "descripcion": "Insecticida de amplio espectro para el control efectivo de chupadores, minadores y larvas comedoras de follaje.",
    "mecanismo": "La emamectina cubre larvas de lepidóptero por vía translaminar; el acetamiprid, neonicotinoide de segunda generación, cubre chupadores por vía sistémica. El acetamiprid tiene además una particularidad útil: es el neonicotinoide con mejor movimiento translaminar y menor toxicidad relativa para abejas dentro de su grupo.",
    "enCampo": "Una sola pasada para dos complejos: larvas en el cogollo y chupadores en el follaje. En maíz y hortalizas se ve como control de cogollero más caída de áfidos y mosca blanca en la misma semana. La protección sistémica del acetamiprid se sostiene 10 a 14 días.",
    "blancos": "Chupadores, minadores y larvas comedoras de follaje: cogollero, Helicoverpa, áfidos, mosca blanca, minadores, psílidos.",
    "usos": "Maíz, hortalizas, tomate, papa, cítricos, frutales.",
    "consejo": "Versión 'PRO' de MULTA: misma emamectina más el neonicotinoide. La ventaja es cobertura; el costo es que consume un turno de IRAC 4A del programa. Cuando la plaga es solo lepidóptero, MULTA simple es la decisión técnicamente más limpia.",
    "accion": "Contacto, ingestión y sistémico",
    "cultivos": [
      "maiz",
      "papa",
      "tomate",
      "hortalizas",
      "citricos"
    ]
  },
  "furioso": {
    "descripcion": "Insecticida que controla efectivamente ácaros, trips, minadores y chupadores, con un efecto residual de larga duración.",
    "mecanismo": "Composición idéntica a RIDDER 328 SC. Imidacloprid sistémico por xilema sobre chupadores, más abamectina translaminar sobre ácaros, minadores y lo que esté en el envés.",
    "enCampo": "Doble ventana de control: efecto sobre ácaros y minadores en 2 a 4 días, y protección sistémica de chupadores por 15 a 21 días. Igual que RIDDER, exige coadyuvante para que la abamectina penetre, y rinde más aplicado a última hora de la tarde.",
    "blancos": "Ácaros, trips, minadores y chupadores en general.",
    "usos": "Hortalizas, frutales, flores, cítricos, café, banano.",
    "consejo": "Gemelo de RIDDER. En una conversación con cliente, la pregunta útil no es cuál de los dos es mejor sino cuál está disponible y a qué precio —químicamente son el mismo producto.",
    "accion": "Contacto, ingestión y sistémico",
    "cultivos": [
      "cafe",
      "platano-banano",
      "hortalizas",
      "citricos",
      "flores"
    ]
  },
  "acarisil": {
    "descripcion": "Insecticida que controla efectivamente estados de huevos y ninfas en insectos raspadores, chupadores y minadores, con alta selectividad sobre abejas.",
    "mecanismo": "Imita a la hormona juvenil del insecto. Mientras esa hormona esté presente en niveles altos, el insecto no puede completar la metamorfosis: el huevo no termina su embriogénesis, la ninfa no llega a adulto y la hembra adulta expuesta pone huevos inviables. No es un veneno nervioso; es una señal falsa de desarrollo.",
    "enCampo": "No vas a ver insectos muertos: **vas a ver que no aparece la siguiente generación**. Los huevos quedan blanquecinos y no eclosionan, las ninfas se quedan detenidas en su estado. Es una molécula de manejo poblacional, no de emergencia. Si el cliente espera choque, va a decir que no sirvió. Se posiciona preventivamente o al inicio de la curva poblacional.",
    "blancos": "Mosca blanca (huevos y ninfas), escamas, cochinillas, psílidos, trips en estados inmaduros, minadores.",
    "usos": "Hortalizas, tomate, cítricos, café, algodón, flores, frutales.",
    "consejo": "Alta selectividad con abejas y con enemigos naturales adultos —el portafolio lo destaca y es cierto—, lo que lo vuelve una pieza clave en MIP y en cultivos con polinización. IRAC 7C es un modo de acción único en el portafolio: excelente compañero de rotación para mosca blanca frente a los 4A.",
    "accion": "Contacto (ovicida y larvicida)",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Tomate",
          "blancos": [
            "Mosca blanca"
          ]
        }
      ],
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/acarisil_100_ec/436/1/18325/11/3",
      "confianza": "media",
      "cultivos": [
        "tomate"
      ]
    },
    "cultivos": [
      "cafe",
      "tomate",
      "hortalizas",
      "citricos",
      "flores",
      "algodon"
    ]
  },
  "trosador": {
    "descripcion": "Insecticida de origen natural con potente acción por ingestión y contacto, ideal para el control de trips y larvas de lepidópteros.",
    "mecanismo": "Producto de fermentación de la bacteria del suelo Saccharopolyspora spinosa. Actúa como modulador alostérico del receptor nicotínico de acetilcolina —en un sitio distinto al de los neonicotinoides— y además sobre receptores GABA. Provoca excitación neuronal involuntaria, parálisis y muerte, con una velocidad poco común para un producto de origen biológico.",
    "enCampo": "La actividad es mucho mayor por ingestión que por contacto: el insecto tiene que comer del tejido tratado. Sobre trips el efecto se ve en 24 a 48 horas —es de lo mejor que hay para trips—, sobre larvas de lepidóptero en 1 a 2 días. Se degrada rápido por luz, así que su residualidad es corta y la aplicación al atardecer rinde bastante más.",
    "blancos": "Trips (su fuerte), larvas de lepidópteros, minadores, moscas de la fruta.",
    "usos": "Hortalizas, cebolla, flores, frutales, tomate, aguacate, cítricos. Aceptado en varios esquemas de producción orgánica certificada.",
    "consejo": "Es tóxico para abejas mientras el depósito está húmedo; una vez seco el riesgo baja mucho. De ahí la recomendación de aplicar al atardecer, que además protege la molécula de la fotodegradación. Comparte IRAC 5 con EVASOR: no son rotación entre sí.",
    "accion": "Ingestión y contacto",
    "cultivos": [
      "tomate",
      "hortalizas",
      "citricos",
      "aguacate",
      "flores",
      "cebolla"
    ]
  },
  "evasor": {
    "descripcion": "Insecticida derivado de un proceso natural para el control eficaz de lepidópteros, caracha o Prodiplosis, trips y minadores, con bajo impacto sobre la fauna benéfica.",
    "mecanismo": "Espinosina de segunda generación: se parte de la fermentación natural y se modifica químicamente para aumentar potencia y persistencia. Mismo sitio de acción que spinosad —modulador alostérico del receptor nicotínico más actividad sobre GABA— pero con mayor eficacia intrínseca y mayor estabilidad a la luz.",
    "enCampo": "Más potente y más residual que spinosad, con muy buen movimiento translaminar. El portafolio lo posiciona específicamente contra **Prodiplosis longifila (caracha o negrita)**, y esa es la clave de su valor: la larva de Prodiplosis vive escondida en el cogollo, en los brotes tiernos y dentro de la flor, donde el producto de contacto no llega. Un translaminar potente sí la alcanza.",
    "blancos": "Prodiplosis longifila (caracha), trips, minadores, lepidópteros de tamaño pequeño y medio.",
    "usos": "Tomate, ají, hortalizas, maracuyá, cítricos, frutales, espárrago, flores.",
    "consejo": "Bajo impacto sobre fauna benéfica, que el portafolio destaca correctamente. En Prodiplosis el control químico solo funciona si se aplica sobre brotes y flores con buen volumen y en la ventana de actividad de la plaga; el producto es excelente pero no compensa una aplicación mal dirigida. Comparte IRAC 5 con TROSADOR.",
    "accion": "Ingestión y contacto",
    "cultivos": [
      "tomate",
      "hortalizas",
      "citricos",
      "flores",
      "frutales-andinos"
    ]
  },
  "triasol": {
    "descripcion": "Herbicida pre y postemergente de malezas gramíneas y hoja ancha en maíz.",
    "mecanismo": "Inhibidor del fotosistema II. Se une al sitio QB de la proteína D1 en la membrana del tilacoide y bloquea el transporte de electrones. La energía lumínica que la planta sigue capturando ya no tiene a dónde ir y genera oxígeno singlete y radicales libres que destruyen las membranas: la maleza se mata con su propia luz.",
    "enCampo": "La absorción es principalmente radicular y el movimiento es por xilema, así que el producto sube y se acumula en las hojas donde más transpira la planta. Por eso **los síntomas aparecen primero en las hojas viejas**: clorosis entre las nervaduras, luego bordes quemados, luego necrosis. Tarda 7 a 14 días. Sin humedad de suelo después de aplicar, simplemente no se activa.",
    "blancos": "Malezas de hoja ancha y gramíneas anuales en germinación y plántula.",
    "usos": "Maíz, sorgo y caña. El maíz lo tolera porque tiene una enzima que lo detoxifica rápido; esa selectividad es metabólica, no de posición.",
    "consejo": "Tiene residualidad larga en suelo: cuidado con la rotación a cultivos sensibles como hortalizas, fríjol o papa en el siguiente ciclo. Es una de las moléculas con más presión regulatoria en el mundo; conviene conocer el estado del registro cuando hables con clientes de exportación.",
    "accion": "Pre y postemergente",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Maíz",
          "blancos": [
            "Yerba socialista",
            "Pega pega",
            "Bledo",
            "Verdolaga",
            "Coquito"
          ]
        }
      ],
      "momento": "Aplicación al suelo; control en preemergencia y postemergencia temprana de malezas gramíneas y de hoja ancha anuales y algunas perennes (movimiento sistémico acropétalo por xilema).",
      "selectividad": "Herbicida selectivo al cultivo de maíz.",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/triasol_80_wp/436/1/17023/101/3",
      "confianza": "media",
      "cultivos": [
        "maiz"
      ]
    },
    "cultivos": [
      "maiz",
      "cana"
    ]
  },
  "pastrol": {
    "descripcion": "Herbicida de control efectivo sobre malezas gramíneas en activo crecimiento.",
    "mecanismo": "Inhibidor de la acetil-CoA carboxilasa (ACCasa), la enzima que arranca la síntesis de ácidos grasos. Las gramíneas tienen una forma de ACCasa sensible; las hojas anchas tienen otra que no lo es. De ahí su selectividad absoluta: **solo mata gramíneas**, no toca hoja ancha ni ciperáceas.",
    "enCampo": "Se transloca por floema y se acumula en los meristemos —los nudos y el punto de crecimiento—. La señal de campo clásica aparece a los 5 a 7 días: el cogollo de la gramínea **se desprende con un tirón suave**, y la base del cogollo se ve acuosa y podrida. Luego viene el amarillamiento desde el centro hacia afuera y la muerte en 10 a 21 días. Es lento, pero es completo: mata también el rizoma.",
    "blancos": "Gramíneas anuales y perennes en crecimiento activo: paja guinea, pasto argentino, sorgo de alepo, falsa caminadora, rebrotes de gramíneas.",
    "usos": "Cultivos de hoja ancha: soya, fríjol, algodón, hortalizas, papa, café, frutales, ornamentales.",
    "consejo": "Dos claves: siempre con coadyuvante aceitoso, y sobre gramínea en **crecimiento activo** —sobre maleza estresada por sequía no funciona—. Y no lo mezcles con hormonales como 2,4-D: hay antagonismo documentado que le baja la eficacia. Si necesitas ambos, sepáralos 7 días.",
    "accion": "Postemergente sistémico",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Fríjol",
          "blancos": [
            "Pata de gallina (Eleusine indica)",
            "Pasto conejo (Chloris radiata)",
            "Pasto corona (Paspalum sp.)"
          ]
        }
      ],
      "momento": "Postemergente (gramíneas anuales y perennes).",
      "selectividad": "Herbicida selectivo y sistémico (inhibidor de ACCasa). La tabla de uso de la ficha solo registra fríjol. La ficha dice que no es fitotóxico bajo las recomendaciones, y sugiere ensayo previo en variedades o híbridos nuevos.",
      "fuente": "https://agroquimicos-organicosplm.com/colombia/pastrol_240_ec/436/1/18331/72/3",
      "confianza": "alta",
      "cultivos": [
        "frijol"
      ]
    },
    "cultivos": [
      "papa",
      "cafe",
      "hortalizas",
      "flores",
      "algodon",
      "frijol"
    ]
  },
  "ghaza": {
    "descripcion": "Herbicida postemergente y de contacto que controla malezas de hoja ancha y angosta en cultivos anuales y perennes.",
    "mecanismo": "Inhibe la glutamina sintetasa, la enzima que fija el amonio en glutamina. Al bloquearla pasan dos cosas al tiempo: se acumula amonio hasta niveles tóxicos y se detiene la fotorrespiración. La combinación genera una explosión de especies reactivas de oxígeno que destruye las membranas celulares en horas.",
    "enCampo": "Es un herbicida que **necesita luz y humedad relativa alta** para expresarse: aplicado en día nublado y fresco es notablemente más lento. La quema es visible en 2 a 4 días y completa en 7 a 10. Su translocación es muy limitada —apenas un 11% llega a raíz—, así que en malezas perennes con rizoma **vas a ver rebrote**. Eso no es falla del producto: es su modo de acción.",
    "blancos": "Malezas de hoja ancha y angosta en postemergencia, anuales y perennes en su parte aérea.",
    "usos": "Cultivos anuales y perennes, en aplicación dirigida. Frutales, cítricos, banano, café, palma, áreas no cultivadas.",
    "consejo": "Su gran diferencial frente al glifosato es la velocidad —efecto máximo en 3 a 5 días contra 7 a 10 del glifosato— y que no deja residualidad en suelo. Su límite es que no mata raíz. Para el productor la regla práctica es: glufosinato para limpiar rápido, glifosato para acabar con la maleza perenne.",
    "accion": "Postemergente de contacto",
    "etiqueta": {
      "momento": "Postemergente, aspersión dirigida con malezas en crecimiento activo (1-3 hojas); una aplicación por ciclo de cultivo.",
      "selectividad": "No selectivo; acción de contacto con cierta acción sistémica; controla malezas anuales y perennes. La ficha recuperada no nombra cultivos.",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/ghaza_200_sl/436/1/17970/13/3",
      "confianza": "media"
    },
    "cultivos": [
      "cafe",
      "platano-banano",
      "citricos",
      "palma"
    ]
  },
  "egiamina": {
    "descripcion": "Herbicida hormonal de acción sistémica que controla eficazmente malezas de hoja ancha en potreros.",
    "mecanismo": "Auxina sintética. Imita a la hormona natural de crecimiento pero la planta no la puede degradar, así que queda una señal de crecimiento permanente y descontrolada. Se disparan la síntesis de etileno y de ABA, el transporte se desorganiza y el floema colapsa. La planta literalmente se crece hasta morir.",
    "enCampo": "Los síntomas son inconfundibles y aparecen rápido, en horas: **epinastia** —los tallos se tuercen y se enrollan—, hojas en forma de copa o de cuchara, tallos engrosados y agrietados, raíces deformadas. La muerte llega en 7 a 21 días. Las gramíneas lo toleran porque degradan la molécula rápido; por eso es el herbicida del potrero.",
    "blancos": "Malezas de hoja ancha en potreros y cultivos de gramíneas.",
    "usos": "Pastos, potreros, maíz, arroz, caña, áreas no cultivadas.",
    "consejo": "El riesgo número uno es la **deriva**: cultivos sensibles como tomate, tabaco, algodón, uva, flores o cítricos muestran daño con dosis mínimas, incluso a cientos de metros. Usar boquillas antideriva, baja presión y no aplicar con viento ni en horas de inversión térmica. Es el reclamo más frecuente del mercado con esta molécula.",
    "accion": "Postemergente sistémico",
    "cultivos": [
      "arroz",
      "maiz",
      "cana",
      "pastos"
    ]
  },
  "quinclorac": {
    "descripcion": "Herbicida de amplio espectro en el cultivo del arroz para el control en pre y postemergencia de malezas de hoja ancha, gramíneas y ciperáceas.",
    "mecanismo": "Doble comportamiento según la maleza. En hoja ancha actúa como auxina sintética clásica. En gramíneas —y ese es su valor en arroz— induce acumulación de cianuro por estímulo de la ACC sintasa y bloquea la síntesis de pared celular, un mecanismo distinto que le permite controlar liendrepuerco, algo raro para un hormonal.",
    "enCampo": "En arroz es el herbicida del control de **liendrepuerco (Echinochloa)** más ciperáceas más hoja ancha en un solo producto. Los síntomas son mixtos: epinastia en la hoja ancha y detención del crecimiento con clorosis en las gramíneas. Actúa tanto por raíz como por follaje, y tarda 7 a 14 días en expresarse.",
    "blancos": "Echinochloa (liendrepuerco), ciperáceas, malezas de hoja ancha.",
    "usos": "Arroz, en pre y postemergencia.",
    "consejo": "Tiene residualidad en suelo y algunos cultivos de rotación son sensibles —tomate, tabaco, remolacha—. La resistencia de Echinochloa a quinclorac es un problema real y creciente en zonas arroceras; conviene preguntar por el historial del lote antes de recomendarlo como única herramienta.",
    "accion": "Pre y postemergente",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Arroz",
          "blancos": [
            "Echinochloa colona",
            "Cyperus ferax"
          ]
        }
      ],
      "momento": "Pre y postemergente (gramíneas, hoja ancha y ciperáceas); más eficaz en malezas en crecimiento activo y en estados tempranos.",
      "selectividad": "Herbicida selectivo (ficha Cibochem de Quinclorac); uso registrado en arroz.",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/quinclorac_250_hxs/436/1/17015/58/3",
      "confianza": "media",
      "cultivos": [
        "arroz"
      ]
    },
    "cultivos": [
      "arroz"
    ]
  },
  "lafirma": {
    "descripcion": "Herbicida selectivo sistémico que controla malezas de hoja ancha en potreros.",
    "mecanismo": "Auxina sintética con afinidad especial por especies leñosas. Igual que el 2,4-D altera el balance hormonal y desorganiza el crecimiento, pero su estructura le permite translocarse mejor por el floema hacia las raíces y coronas de arbustos y árboles pequeños.",
    "enCampo": "Es el producto para el **arbusto y la maleza leñosa del potrero** que el 2,4-D no termina de matar. Ves rebrotes retorcidos y epinásticos, defoliación progresiva y muerte de la corona en 3 a 6 semanas. En aplicaciones al tocón funciona muy bien para evitar rebrote de especies invasoras.",
    "blancos": "Malezas leñosas, semileñosas y arbustivas de potrero: mora, helecho marranero, escobilla, chilca, zarzas.",
    "usos": "Pastos y potreros, áreas no cultivadas, mantenimiento de vías y linderos.",
    "consejo": "Respeta las gramíneas forrajeras, por eso sirve en potrero establecido. Pero es muy activo sobre leguminosas: si el potrero tiene kudzú, maní forrajero u otra leguminosa asociada, la vas a perder. Confírmalo antes de recomendar.",
    "accion": "Postemergente sistémico",
    "etiqueta": {
      "momento": "Postemergencia.",
      "fuente": "https://cibochem.com.co/ficha/la-firma-480-ec",
      "confianza": "media"
    },
    "cultivos": [
      "pastos"
    ]
  },
  "acertado": {
    "descripcion": "Herbicida de acción sistémica de amplio espectro para el control de malezas de hoja ancha y ciperáceas en potreros.",
    "mecanismo": "Inhibidor de la acetolactato sintasa (ALS), la primera enzima en la ruta de los aminoácidos ramificados: valina, leucina e isoleucina. Sin esos aminoácidos la planta no sintetiza proteínas y la división celular se detiene en los meristemos. Las dosis son bajísimas —gramos por hectárea— porque la enzima es extremadamente sensible.",
    "enCampo": "Es el especialista en **coquito (Cyperus)**, y su virtud es que se transloca al tubérculo: no solo quema la parte aérea, mata la estructura de reproducción bajo tierra. Pero los síntomas son lentos: 10 a 20 días. Primero se detiene el crecimiento, luego aparece clorosis en la hoja nueva y enrojecimiento de nervaduras, y después la necrosis. Si el cliente espera quema en 3 días, va a pensar que falló.",
    "blancos": "Ciperáceas —coquito, cortadera— y malezas de hoja ancha.",
    "usos": "Potreros, caña, maíz, arroz, áreas no cultivadas.",
    "consejo": "Los HRAC 2 son el grupo con más casos de resistencia registrados en el mundo: una sola mutación puntual en el gen de la ALS confiere resistencia total. Nunca lo uses solo y repetido en el mismo lote. En este portafolio comparte grupo con METSULFEX y con la parte de metsulfuron de los dos COMBO.",
    "accion": "Postemergente sistémico",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Potreros (pasturas)",
          "blancos": [
            "Cabezoncillo (Cyperus luzulae)",
            "Kyllinga (Kyllinga brevifolia)",
            "Estrellita (Rhynchospora blepharophora)",
            "Coquito (Cyperus rotundus)"
          ]
        }
      ],
      "momento": "Postemergente; recomendado en la etapa de recuperación de potreros; una aplicación por ciclo.",
      "selectividad": "Herbicida selectivo y sistémico (sulfonilurea, inhibidor de ALS) para control de ciperáceas en potreros.",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/acertado_750_wg/436/1/17530/230/3",
      "confianza": "media",
      "cultivos": [
        "pastos"
      ]
    },
    "cultivos": [
      "arroz",
      "maiz",
      "cana",
      "pastos"
    ]
  },
  "toconex": {
    "descripcion": "Herbicida selectivo de acción postemergente para el control de malezas de hoja ancha, herbáceas y arbustivas que crecen en potreros.",
    "mecanismo": "Dos auxinas sintéticas con perfiles complementarios. El 2,4-D actúa rápido sobre hoja ancha herbácea; el picloram es mucho más persistente, se transloca mejor al sistema radicular y es el que realmente liquida la maleza leñosa y semileñosa.",
    "enCampo": "Es el estándar del potrero colombiano. Ves epinastia en 24 a 48 horas, luego marchitez progresiva y muerte de arbustos en 3 a 8 semanas según el tamaño. Sobre maleza leñosa establecida el picloram sigue trabajando desde el suelo durante meses, controlando la germinación de nuevas plántulas.",
    "blancos": "Hoja ancha herbácea, semileñosa y arbustiva de potrero.",
    "usos": "Pastos y potreros establecidos de gramíneas.",
    "consejo": "Doble advertencia sobre el picloram: es **muy residual en suelo** —restringe la rotación por varios meses— y **pasa por el tracto digestivo del ganado sin degradarse**, así que el estiércol de animales que pastorearon en potrero tratado puede dañar cultivos si se usa como abono. Es la misma mezcla de VIPPER 304 SL.",
    "accion": "Postemergente sistémico",
    "cultivos": [
      "pastos"
    ]
  },
  "reddi": {
    "descripcion": "Herbicida sistémico no selectivo para el control de malezas de hoja ancha y angosta en cultivos anuales y perennes.",
    "mecanismo": "Inhibe la EPSP sintasa de la ruta del shikimato, bloqueando la producción de los aminoácidos aromáticos —fenilalanina, tirosina, triptófano— que la planta necesita para proteínas, lignina y defensas. Esa ruta no existe en animales, lo que explica su perfil toxicológico.",
    "enCampo": "Su gran virtud es que **se mueve por el floema hasta rizomas, estolones y raíces**: mata la maleza completa, no solo lo que se ve. El costo es la lentitud: amarillamiento en 5 a 7 días y muerte en 10 a 21. En maleza perenne, aplicar cuando esté en crecimiento activo y con buena área foliar —translocar requiere que la planta esté moviendo azúcares hacia abajo.",
    "blancos": "Malezas de hoja ancha y angosta, anuales y perennes, incluyendo gramíneas rizomatosas.",
    "usos": "Cultivos anuales y perennes en aplicación dirigida, preparación de lotes, control en calles, áreas no cultivadas.",
    "consejo": "Se inactiva con agua dura: el calcio y el magnesio del agua de aspersión secuestran la molécula. Corregir con sulfato de amonio cambia el resultado de forma notoria. No mezclar con hormonales ni con productos de contacto rápido: si quemas la hoja antes de que transloque, pierdes el control de la raíz.",
    "accion": "Postemergente no selectivo"
  },
  "limpion": {
    "descripcion": "Herbicida de amplio espectro que controla malezas de hoja ancha y angosta en postemergencia temprana.",
    "mecanismo": "Inhibición de la glutamina sintetasa: se acumula amonio, se detiene la fotorrespiración y se disparan especies reactivas de oxígeno que revientan las membranas. Es el mismo ingrediente activo de GHAZA, en la misma concentración.",
    "enCampo": "Quema visible en 2 a 4 días, con dependencia fuerte de la luz y de la humedad relativa: aplicado en la mañana de un día soleado rinde mucho más que en una tarde nublada. Movilidad limitada, así que no mata raíz de perennes. El portafolio lo posiciona correctamente para **postemergencia temprana**, que es donde su perfil de contacto rinde mejor: maleza pequeña, cubrimiento fácil.",
    "blancos": "Hoja ancha y angosta en postemergencia temprana.",
    "usos": "Frutales, cítricos, café, banano, palma, caña, áreas no cultivadas, aplicación dirigida en anuales.",
    "consejo": "No deja residualidad en suelo —a diferencia del glifosato— y se puede sembrar poco después, lo que es una ventaja real en rotaciones cortas y en preparación de camas. Es el producto que Cibochem muestra como imagen de la línea de herbicidas.",
    "accion": "Postemergente de contacto",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Sorgo",
          "blancos": []
        },
        {
          "cultivo": "Arroz",
          "blancos": []
        },
        {
          "cultivo": "Cafeto",
          "blancos": []
        },
        {
          "cultivo": "Palma aceitera",
          "blancos": []
        }
      ],
      "momento": "Postemergente, dirigido a malezas anuales y perennes en estados iniciales; una aplicación por ciclo de cultivo.",
      "selectividad": "No selectivo; acción de contacto con leve acción sistémica; sin efecto en el suelo. Controla malezas de hoja ancha y gramíneas.",
      "fuente": "https://cibochem.com.co/ficha/limpion",
      "confianza": "media",
      "cultivos": [
        "arroz",
        "cafe",
        "palma"
      ]
    },
    "cultivos": [
      "arroz",
      "cafe",
      "platano-banano",
      "cana",
      "citricos",
      "palma"
    ]
  },
  "limpionpro": {
    "descripcion": "Herbicida postemergente y de contacto que controla malezas de hoja ancha y angosta en cultivos anuales y perennes.",
    "mecanismo": "Misma inhibición de la glutamina sintetasa, pero formulado como granulado soluble al 80%: cuatro veces la concentración del LIMPION 200 SL. La química es idéntica; lo que cambia es la logística.",
    "enCampo": "Comportamiento en campo igual al de la formulación líquida: quema en 2 a 4 días, dependiente de luz y humedad, sin control de raíz. La diferencia práctica está en el transporte y el almacenamiento: un kilo de este reemplaza cuatro litros del SL, lo que baja costo de flete y espacio en bodega —argumento comercial fuerte en zonas alejadas.",
    "blancos": "Hoja ancha y angosta, anuales y perennes en su parte aérea.",
    "usos": "Frutales, café, banano, palma, cítricos, caña, áreas no cultivadas.",
    "consejo": "La lógica 'PRO' del portafolio es esa: misma molécula, presentación sólida más concentrada. Aplica igual a STOP West PRO, PASTUREX PRO y HERBIMEX PRO. Al dosificar hay que tener cuidado de no trasladar la dosis del líquido al sólido sin recalcular.",
    "accion": "Postemergente de contacto",
    "etiqueta": {
      "momento": "Postemergente; sin actividad residual en el suelo.",
      "selectividad": "No selectivo, acción de contacto; controla gramíneas, hoja ancha y ciperáceas.",
      "fuente": "https://agroquimicos-organicosplm.com/colombia/limpion_pro_800_sg/436/1/18329/231/3",
      "confianza": "media"
    },
    "cultivos": [
      "cafe",
      "platano-banano",
      "cana",
      "citricos",
      "palma"
    ]
  },
  "metsulfex": {
    "descripcion": "Herbicida de acción sistémica, de amplio espectro para el control de malezas de hoja ancha, en especial helechos y mortiños en potreros.",
    "mecanismo": "Inhibidor de la ALS: bloquea la síntesis de valina, leucina e isoleucina y con ello la división celular en los meristemos. Se absorbe por hoja y por raíz, y se transloca en las dos direcciones, lo que le permite llegar a rizomas y coronas.",
    "enCampo": "El portafolio lo posiciona en **helechos y mortiños**, que son las dos malezas que más resisten al hormonal clásico en potreros de ladera. Los síntomas son lentos —15 a 25 días—: el helecho deja de emitir báculos nuevos, los existentes se vuelven cloróticos desde el ápice y se secan. Muy bajas dosis por hectárea, del orden de gramos.",
    "blancos": "Helecho marranero, mortiño, malezas de hoja ancha y semileñosas de potrero.",
    "usos": "Pastos y potreros, áreas no cultivadas.",
    "consejo": "Residual en suelo y con efecto sobre cultivos sensibles en rotación, sobre todo en suelos de pH alto donde se degrada más lento. Y comparte HRAC 2 con ACERTADO y con la parte de metsulfuron de los COMBO: si los usas seguidos en el mismo potrero estás forzando resistencia sobre el mismo sitio de acción.",
    "accion": "Postemergente sistémico",
    "cultivos": [
      "pastos"
    ]
  },
  "stopwest": {
    "descripcion": "Herbicida sistémico no selectivo para el control de malezas de hoja ancha y angosta en cultivos anuales y perennes.",
    "mecanismo": "Inhibición de la EPSP sintasa en la ruta del shikimato. Sin aminoácidos aromáticos la planta no puede fabricar proteínas ni lignina, y muere lentamente desde los meristemos.",
    "enCampo": "El herbicida sistémico por excelencia: se mueve con los azúcares hacia los sumideros y **mata rizoma, estolón y corona**. Amarillamiento progresivo desde el cogollo a los 5 a 7 días, muerte completa a los 10 a 21. Lento pero definitivo. En maleza estresada por sequía la translocación se frena y el control queda a medias.",
    "blancos": "Todo tipo de maleza de hoja ancha y angosta, anual y perenne.",
    "usos": "Aplicación dirigida en cultivos perennes, preparación de lotes, control de calles y linderos, áreas no cultivadas.",
    "consejo": "Mismo ingrediente y concentración que REDDI 480 SL: son marcas gemelas. Tres reglas prácticas que cambian el resultado: corregir la dureza del agua con sulfato de amonio, no bajar el pH excesivamente, y no mezclarlo con productos de quema rápida porque cortan la translocación.",
    "accion": "Postemergente no selectivo"
  },
  "stoppro": {
    "descripcion": "Herbicida sistémico no selectivo para el control de malezas de hoja ancha y angosta en cultivos anuales y perennes.",
    "mecanismo": "Glifosato formulado como sal amónica en granulado soluble al 75,7%. Misma inhibición de la EPSP sintasa; la sal amónica aporta además una ventaja práctica sobre la calidad del agua de aspersión.",
    "enCampo": "Mismo comportamiento sistémico y misma velocidad que la formulación líquida. La diferencia útil en campo es que la sal amónica **ayuda a contrarrestar la dureza del agua**, que es el problema silencioso más frecuente en aplicaciones de glifosato en Colombia: aguas con mucho calcio inactivan parte del producto antes de que llegue a la hoja.",
    "blancos": "Malezas de hoja ancha y angosta, anuales y perennes.",
    "usos": "Aplicación dirigida en perennes, preparación de lotes, áreas no cultivadas.",
    "consejo": "Ventaja logística clara: 1 kg equivale aproximadamente a 1,5 L del 480 SL en ingrediente activo, con mucho menos peso y volumen que transportar. Buen argumento para fincas alejadas o aplicaciones con equipos de espalda en ladera.",
    "accion": "Postemergente no selectivo",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Maíz",
          "blancos": [
            "Venadillo (Erigeron bonariensis)",
            "Pata de gallina (Eleusine indica)",
            "Pasto conejo (Chloris radiata)",
            "Pasto estrella (Cynodon dactylon)",
            "Siempreviva (Commelina diffusa)",
            "Batatilla (Ipomoea sp.)"
          ]
        }
      ],
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/stopwest_pro_757_sg/436/1/17535/231/3",
      "confianza": "media",
      "cultivos": [
        "maiz"
      ]
    },
    "cultivos": [
      "maiz"
    ]
  },
  "pasturex": {
    "descripcion": "Herbicida de acción sistémica para el control de malezas de hoja ancha en potreros con un amplio espectro sobre malezas herbáceas y semileñosas.",
    "mecanismo": "Auxina sintética de la familia de las piridinas, con una translocación por floema muy superior a la del 2,4-D y una persistencia en suelo mucho mayor. Se acumula en meristemos y raíces y desorganiza por completo el crecimiento.",
    "enCampo": "Es el que **mata el arbusto de raíz**. Epinastia y retorcimiento en 2 a 5 días, defoliación en semanas y muerte de la corona en 1 a 3 meses en especies leñosas. Además, al quedar activo en el suelo, controla la germinación de nuevas plántulas durante meses: el potrero se mantiene limpio más tiempo.",
    "blancos": "Malezas herbáceas, semileñosas y leñosas de potrero: mora, chilca, escobilla, zarza, rabo de zorro, arbustivas invasoras.",
    "usos": "Pastos y potreros de gramíneas establecidos.",
    "consejo": "Las dos advertencias de manejo que hay que saber de memoria: residualidad larga en suelo que limita la rotación —no siembres hortalizas, fríjol ni leguminosas después—, y persistencia en el **estiércol del ganado** que pastoreó el potrero tratado, lo que puede afectar cultivos si ese estiércol se usa como abono. Esto genera reclamos reales.",
    "accion": "Postemergente sistémico",
    "cultivos": [
      "pastos"
    ]
  },
  "pasturexpro": {
    "descripcion": "Herbicida de acción sistémica para el control de malezas de hoja ancha en potreros con un amplio espectro sobre herbáceas y semileñosas.",
    "mecanismo": "Picloram en granulado soluble al 40%. Mismo auxínico sistémico de alta translocación al floema y alta persistencia en suelo, en presentación sólida concentrada.",
    "enCampo": "Idéntico al 240 SL en velocidad y en síntomas: epinastia temprana, defoliación y muerte de coronas leñosas en semanas a meses, más control residual de la germinación. La presentación sólida facilita el transporte a potreros de difícil acceso y reduce el riesgo de derrames.",
    "blancos": "Malezas herbáceas, semileñosas y leñosas de potrero.",
    "usos": "Pastos y potreros establecidos.",
    "consejo": "Mismas advertencias de residualidad en suelo y de persistencia en estiércol que PASTUREX 240 SL. Al ser más concentrado, un error de dosificación tiene consecuencias mayores: insistir en calibración y en medición por peso, no por volumen.",
    "accion": "Postemergente sistémico",
    "cultivos": [
      "pastos"
    ]
  },
  "herbimex": {
    "descripcion": "Herbicida sistémico para el control de malezas de hoja ancha en potreros.",
    "mecanismo": "2,4-D en forma de sal dimetilamina, más concentrado que ECIAMINA. La forma de sal amina es menos volátil que la forma éster, lo que reduce el riesgo de daño por vapor a cultivos vecinos —aunque no elimina el riesgo por deriva de gotas.",
    "enCampo": "Síntomas hormonales clásicos y rápidos: epinastia en horas, hojas acopadas, tallos engrosados y agrietados, muerte en 1 a 3 semanas. Las gramíneas del potrero no se afectan porque metabolizan la molécula rápidamente.",
    "blancos": "Malezas de hoja ancha en potrero.",
    "usos": "Pastos, potreros, cultivos de gramíneas, áreas no cultivadas.",
    "consejo": "Misma molécula que ECIAMINA 48 SL pero un 50% más concentrada, y misma base activa que va dentro de VIPPER, TOCONEX y los dos COMBO. En un lote donde se rotan todas esas marcas, en realidad se está aplicando HRAC 4 una y otra vez. Ese es el hallazgo más importante para la conversación de manejo de resistencia en potreros.",
    "accion": "Postemergente sistémico",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Pasturas (potreros)",
          "blancos": []
        },
        {
          "cultivo": "Caña de azúcar y otros cultivos gramíneos",
          "blancos": []
        }
      ],
      "momento": "Postemergente temprana o tardía, con malezas en vigoroso crecimiento.",
      "selectividad": "Herbicida hormonal sistémico de baja volatilidad; control de malezas de hoja ancha (PLM: hoja ancha y ciperáceas en pasturas; Cibochem: caña de azúcar y otros cultivos gramíneos).",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/herbimex_720_sl/436/1/16997/13/3",
      "confianza": "media",
      "cultivos": [
        "cana",
        "pastos"
      ]
    },
    "cultivos": [
      "cana",
      "pastos"
    ]
  },
  "herbimexpro": {
    "descripcion": "Herbicida sistémico de baja volatilidad para el control de malezas de hoja ancha en potreros.",
    "mecanismo": "2,4-D sal de dimetilamonio en granulado soluble al 80%. Misma acción auxínica sistémica, en la formulación de **menor volatilidad** de toda la familia.",
    "enCampo": "Los mismos síntomas hormonales, con una ventaja operativa concreta: al ser sal sólida de baja volatilidad, el riesgo de daño por vapor sobre cultivos sensibles vecinos —tomate, tabaco, uva, flores— baja de forma significativa frente a los ésteres. Sigue siendo obligatorio el manejo antideriva de las gotas.",
    "blancos": "Malezas de hoja ancha en potreros y gramíneas.",
    "usos": "Pastos, potreros, áreas no cultivadas.",
    "consejo": "El argumento técnico de venta aquí es la baja volatilidad, y es real: es el 2,4-D más recomendable en zonas con cultivos sensibles alrededor. Es el mismo caso 'PRO' que LIMPION, STOP West y PASTUREX: sólido concentrado de la misma molécula.",
    "accion": "Postemergente sistémico",
    "cultivos": [
      "pastos"
    ]
  },
  "vipper": {
    "descripcion": "Herbicida de amplio espectro y versátil para el efectivo control de malezas de hoja ancha en potreros.",
    "mecanismo": "La mezcla estándar del potrero: 2,4-D para acción rápida sobre hoja ancha herbácea, picloram para translocación profunda y control de leñosas más residualidad en suelo.",
    "enCampo": "Epinastia visible en 24 a 48 horas, marchitez de arbustos en semanas, y limpieza sostenida del potrero durante meses gracias al residual del picloram. Es el producto que el ganadero reconoce por resultado visual rápido más efecto prolongado.",
    "blancos": "Hoja ancha herbácea, semileñosa y leñosa de potrero.",
    "usos": "Pastos y potreros establecidos de gramíneas.",
    "consejo": "Es la misma mezcla que TOCONEX 304 SL. Aplican las dos advertencias del picloram: rotación restringida por residualidad y persistencia en el estiércol del ganado. Ambos activos son HRAC 4, así que este producto no diversifica el sitio de acción: lo concentra.",
    "accion": "Postemergente sistémico",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Potreros (pasturas)",
          "blancos": []
        }
      ],
      "momento": "Postemergente en fases tempranas de la maleza y con buen vigor; la ficha PLM indica que puede aplicarse en pre y postemergencia según cultivo y especie; sin lluvia por al menos 4 horas tras aplicar.",
      "selectividad": "Herbicida selectivo y sistémico; para malezas de hoja ancha, herbáceas y arbustivas en potreros; selectivo con gramíneas.",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/vipper_304_sl/436/1/17536/13/3",
      "confianza": "media",
      "cultivos": [
        "pastos"
      ]
    },
    "cultivos": [
      "pastos"
    ]
  },
  "kanero": {
    "descripcion": "Herbicida de efectos preemergentes y postemergencia temprana en malezas de hoja ancha y gramíneas en el cultivo de la caña de azúcar.",
    "mecanismo": "Inhibidor del fotosistema II, misma familia y mismo sitio de unión que la atrazina. Bloquea el transporte de electrones en la proteína D1 y la energía lumínica acumulada destruye las membranas por estrés oxidativo.",
    "enCampo": "Se absorbe por raíz y por hoja y sube por xilema, acumulándose en los bordes y puntas de las hojas más viejas —ahí es donde se ve primero la clorosis y luego la quema—. En caña, su ventaja es que combina control preemergente con acción sobre maleza recién emergida. Requiere humedad en el suelo para activarse.",
    "blancos": "Malezas de hoja ancha y gramíneas en germinación y estados tempranos.",
    "usos": "Caña de azúcar, principalmente. También piña y algunos frutales en aplicación dirigida.",
    "consejo": "Comparte HRAC 5 con TRIASOL (atrazina): tienen el mismo sitio de acción, así que alternarlos no constituye rotación. Y como todo inhibidor del PSII, la resistencia aparece por mutación en el gen psbA de la D1, ya documentada en varias malezas de caña.",
    "accion": "Pre y postemergencia temprana",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Caña de azúcar",
          "blancos": []
        }
      ],
      "momento": "Pre y postemergencia.",
      "selectividad": "Herbicida sistémico y de contacto del grupo de las triazinas; su persistencia en el suelo depende del contenido de arcilla y materia orgánica.",
      "fuente": "https://cibochem.com.co/ficha/kanero",
      "confianza": "media",
      "cultivos": [
        "cana"
      ]
    },
    "cultivos": [
      "cana"
    ]
  },
  "experto": {
    "descripcion": "Herbicidas en mezcla con selectividad en pastos para el control de malezas de hoja ancha.",
    "mecanismo": "Tres activos en un kit: dos auxinas sintéticas (2,4-D y picloram) que desorganizan el crecimiento, más una sulfonilurea (metsulfuron) que corta la síntesis de aminoácidos ramificados. Al combinar dos sitios de acción distintos —HRAC 4 y HRAC 2— amplía el espectro sobre malezas que resisten al hormonal solo.",
    "enCampo": "El portafolio lo posiciona por su **selectividad en pastos**: limpia hoja ancha sin tumbar la gramínea forrajera. Ves la respuesta hormonal rápida de los dos auxínicos en 24 a 48 horas, y encima el efecto más lento pero más profundo del metsulfuron sobre las especies difíciles, entre 15 y 25 días.",
    "blancos": "Malezas de hoja ancha en potrero, incluyendo especies tolerantes al 2,4-D solo.",
    "usos": "Pastos y potreros establecidos.",
    "consejo": "Al mezclar tres residuales, la restricción de rotación del lote se alarga: picloram y metsulfuron persisten ambos en suelo. Verifica qué se va a sembrar después antes de recomendarlo. La presentación en caja obliga a explicar bien el orden de mezcla en el tanque.",
    "accion": "Postemergente sistémico",
    "cultivos": [
      "pastos"
    ]
  },
  "promax": {
    "descripcion": "Herbicidas en combinación para el control efectivo de malezas en potreros; combina los hormonales y las sulfonilureas de más amplio espectro sobre leñosas, semileñosas y herbáceas.",
    "mecanismo": "Misma lógica de tres activos que el COMBO EXPERTO, posicionado por el portafolio hacia el extremo más duro del espectro: leñosas, semileñosas y herbáceas en un solo pase, combinando los hormonales con la sulfonilurea de mayor espectro.",
    "enCampo": "La combinación cubre el rango completo del potrero degradado: respuesta hormonal inmediata sobre lo herbáceo, translocación profunda del picloram a las coronas leñosas, y el metsulfuron alcanzando las especies que los auxínicos no terminan, como helechos. El resultado se consolida entre la tercera y la sexta semana.",
    "blancos": "Malezas leñosas, semileñosas y herbáceas de potrero.",
    "usos": "Pastos y potreros establecidos, recuperación de praderas degradadas.",
    "consejo": "Es la versión de mayor espectro entre los dos kits. Advertencias acumuladas: residualidad de picloram más residualidad de metsulfuron, persistencia en estiércol, y restricción fuerte de rotación. Excelente para recuperar un potrero perdido; mala idea si el lote va a cambiar de uso pronto.",
    "accion": "Postemergente sistémico",
    "cultivos": [
      "pastos"
    ]
  },
  "sakarin": {
    "descripcion": "Herbicida sistémico y selectivo en potreros para el control efectivo de malezas leñosas en activo crecimiento.",
    "mecanismo": "Auxina sintética de la familia de las piridinas, formulada como éster —lo que le da muy buena penetración a través de la cutícula cerosa de las hojas leñosas y de los bejucos, que es justamente donde otros hormonales se quedan por fuera.",
    "enCampo": "Actúa sobre malezas **en crecimiento activo**: ahí es donde más translocación hay y donde el resultado es contundente. Epinastia y retorcimiento en 1 a 3 días, seguidos de necrosis y muerte en 2 a 4 semanas. Es especialmente bueno en bejucos, enredaderas y especies leñosas que rebrotan después del 2,4-D.",
    "blancos": "Malezas leñosas, bejucos, enredaderas y hoja ancha difícil de potrero.",
    "usos": "Pastos y potreros, áreas no cultivadas, mantenimiento de linderos.",
    "consejo": "Tiene menos residualidad en suelo que el picloram, lo que es una ventaja real cuando el lote va a rotarse pronto: consigues control de leñosas sin hipotecar el siguiente cultivo. Es la alternativa técnica a PASTUREX cuando la restricción de rotación importa.",
    "accion": "Postemergente sistémico",
    "etiqueta": {
      "momento": "Una aplicación por ciclo de cultivo; la ficha recuperada no precisa el momento.",
      "selectividad": "Actúa como auxina sintética (afecta crecimiento y elongación celular).",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/sakarin_200_ec/436/1/17019/11/3",
      "confianza": "media"
    },
    "cultivos": [
      "pastos"
    ]
  },
  "mesotriol": {
    "descripcion": "Herbicida de efectos postemergentes en malezas de hoja ancha, gramíneas y ciperáceas en el cultivo de la caña.",
    "mecanismo": "Inhibidor de la HPPD (4-hidroxifenilpiruvato dioxigenasa). Al bloquearla se corta la síntesis de plastoquinona, que es cofactor obligatorio para producir carotenoides. Sin carotenoides, la clorofila queda sin su protección contra la fotooxidación y se destruye con la luz.",
    "enCampo": "Produce el síntoma más característico y fácil de reconocer de todos los herbicidas: **blanqueamiento**. El tejido nuevo emerge literalmente blanco o rosado pálido, no amarillo, en 5 a 7 días; después se necrosa y la planta muere en 2 a 3 semanas. Cuando el productor ve ese blanqueo, sabe que el producto entró.",
    "blancos": "Hoja ancha, algunas gramíneas y ciperáceas.",
    "usos": "Caña de azúcar, maíz.",
    "consejo": "HRAC 27 es un sitio de acción único en todo el portafolio de herbicidas: es la pieza más valiosa para romper ciclos de resistencia a triazinas (HRAC 5) y a ALS (HRAC 2) en caña. Ese es su verdadero argumento técnico, más allá del espectro.",
    "accion": "Postemergente",
    "cultivos": [
      "maiz",
      "cana"
    ]
  },
  "elmacho": {
    "descripcion": "Herbicida de contacto ideal para el control postemergente de malezas de hoja ancha y ciperáceas en cultivos de arroz y maíz.",
    "mecanismo": "Inhibidor del fotosistema II, pero en un sitio de unión distinto al de las triazinas —de ahí que sea grupo 6 y no 5—. Bloquea el transporte de electrones y desencadena daño oxidativo. A diferencia de la atrazina, **no se transloca**: el daño ocurre exactamente donde cayó la gota.",
    "enCampo": "Manchas necróticas en las hojas mojadas, visibles en 2 a 5 días con sol. Como no se mueve, **el cubrimiento lo es todo**: exige volumen de agua suficiente, coadyuvante y maleza pequeña. Sobre maleza grande solo quema lo de arriba y rebrota desde el cogollo. En arroz y maíz la selectividad depende de que el cultivo lo metabolice más rápido que la maleza.",
    "blancos": "Malezas de hoja ancha anuales y coquito (Cyperus) en estado joven.",
    "usos": "Arroz, maíz, fríjol, soya y otras leguminosas de grano grande.",
    "consejo": "Aplicar con luz y temperatura —el efecto depende de la fotosíntesis activa—, nunca en día nublado. Y siempre con coadyuvante. Es una buena herramienta de rotación porque HRAC 6 es un sitio de acción que ningún otro herbicida del portafolio usa.",
    "accion": "Postemergente de contacto",
    "cultivos": [
      "arroz",
      "maiz",
      "frijol"
    ]
  },
  "desmalexe": {
    "descripcion": "Herbicida de contacto y efecto residual prolongado, actúa en pre y postemergencia temprana controlando eficazmente malezas de hoja ancha, ciperáceas y gramíneas.",
    "mecanismo": "Inhibidor de la protoporfirinógeno oxidasa (PPO). Al bloquear esa enzima se acumula protoporfirinógeno IX, que sale del cloroplasto y en presencia de luz y oxígeno genera oxígeno singlete en cantidades masivas. Las membranas celulares se peroxidan en cuestión de horas.",
    "enCampo": "Es el herbicida más rápido del portafolio: **con sol se ven manchas necróticas en pocas horas** y la maleza pequeña queda quemada el mismo día. El aspecto es de salpicadura o quemadura por fuego, no de amarillamiento progresivo. Además deja una barrera residual en la superficie del suelo que impide la emergencia de nuevas plántulas por varias semanas —siempre que esa película no se rompa con labranza.",
    "blancos": "Hoja ancha, ciperáceas y gramíneas en germinación y plántula.",
    "usos": "Aplicación dirigida en frutales, cítricos, café, banano, caña, cebolla, ajo y áreas no cultivadas.",
    "consejo": "Por ser de contacto puro y tan rápido, cualquier gota que toque el cultivo deja lesión visible: es obligatoria la aplicación dirigida con campana. El residual funciona solo si el suelo queda quieto; si se cultiva o se remueve después, rompes la película y pierdes el efecto preemergente.",
    "accion": "Pre y postemergencia temprana",
    "cultivos": [
      "cafe",
      "platano-banano",
      "cana",
      "citricos",
      "cebolla"
    ]
  },
  "benevolo": {
    "descripcion": "Fungicida con una mezcla de acción protectante y curativa de larga duración, recomendado para el control de un amplio espectro de enfermedades en diversos cultivos.",
    "mecanismo": "Dos ataques a la fisiología del hongo. La azoxystrobina bloquea el complejo III de la cadena respiratoria en el sitio Qo del citocromo bc1: el hongo se queda sin ATP justo cuando más lo necesita, en la germinación de la espora. El flutriafol inhibe la C14-desmetilasa (CYP51) y con ello la síntesis de ergosterol, el esterol que da integridad a la membrana del hongo.",
    "enCampo": "Es la mezcla que cubre las dos ventanas: la estrobilurina impide que la espora germine —protección— y el triazol detiene el micelio que ya está creciendo dentro del tejido —curación hasta 48-72 horas después de la infección—. En campo se traduce en que puedes entrar un poco tarde y todavía frenar la epidemia. Movimiento por xilema y translaminar, así que protege hacia arriba y hacia afuera.",
    "blancos": "Amplio espectro: royas, manchas foliares, antracnosis, cercosporas, oídios, Sigatoka.",
    "usos": "Arroz, café, banano, frutales, hortalizas, papa, caña, aguacate.",
    "consejo": "Combina un FRAC 11 (alto riesgo de resistencia por la mutación G143A) con un FRAC 3 (riesgo medio). La mezcla es precisamente la estrategia anti-resistencia recomendada, pero solo funciona si además limitas el número de aplicaciones de estrobilurina por ciclo —típicamente máximo 2 a 3, nunca consecutivas.",
    "accion": "Preventivo y curativo",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Fresa",
          "blancos": [
            "Moho gris (Botrytis cinerea)"
          ]
        },
        {
          "cultivo": "Tomate",
          "blancos": [
            "Tizón temprano (Alternaria solani)"
          ]
        }
      ],
      "fuente": "https://agroquimicos-organicosplm.com/colombia/benevolo_250_sc/436/1/16982/58/3",
      "confianza": "media",
      "cultivos": [
        "tomate"
      ]
    },
    "cultivos": [
      "arroz",
      "papa",
      "cafe",
      "platano-banano",
      "cana",
      "tomate",
      "hortalizas",
      "aguacate"
    ]
  },
  "carbendazim": {
    "descripcion": "Fungicida con amplio espectro de control sobre enfermedades foliares.",
    "mecanismo": "Se une a la beta-tubulina e impide el ensamblaje de los microtúbulos. Sin microtúbulos el hongo no puede formar el huso mitótico: la división nuclear se detiene y el micelio deja de crecer. Es un mecanismo de sitio único, muy eficaz y muy vulnerable a la resistencia.",
    "enCampo": "Sistémico ascendente por xilema, absorbido por hoja y por raíz. Detiene el avance de la lesión en pocos días, pero no borra la lesión existente: lo que se ve es que **la mancha deja de crecer** y no aparecen manchas nuevas. Muy usado en aplicaciones al suelo para patógenos de raíz y cuello.",
    "blancos": "Enfermedades foliares y de suelo: Botrytis, Fusarium, Sclerotinia, Cercospora, antracnosis, manchas foliares.",
    "usos": "Arroz, café, hortalizas, flores, frutales, banano, cereales.",
    "consejo": "Riesgo de resistencia **alto**: una sola mutación puntual (E198A o F200Y en la beta-tubulina) confiere resistencia completa y cruzada a todos los benzimidazoles. En Colombia ya hay resistencia documentada de Mycosphaerella fijiensis a benomil, que es el mismo grupo. Nunca aplicar solo y repetido; siempre en mezcla o alternado con multisitios.",
    "accion": "Sistémico preventivo y curativo",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Arroz",
          "blancos": [
            "Complejo de manchado del grano (Helminthosporium oryzae, Cercospora oryzae, Alternaria padwikii)"
          ]
        },
        {
          "cultivo": "Tomate",
          "blancos": [
            "Moho gris (Botrytis cinerea)"
          ]
        }
      ],
      "fuente": "http://agroquimicos-organicosplm.com/colombia/carbendazim_500_hxs/436/1/16984/242/3",
      "confianza": "media",
      "cultivos": [
        "arroz",
        "tomate"
      ]
    },
    "cultivos": [
      "arroz",
      "cafe",
      "platano-banano",
      "tomate",
      "hortalizas",
      "flores"
    ]
  },
  "manconex": {
    "descripcion": "Fungicida protectante y de contacto para el control preventivo de todo tipo de enfermedades foliares causadas por hongos.",
    "mecanismo": "Multisitio: inactiva los grupos sulfhidrilo de múltiples enzimas del hongo simultáneamente, interfiriendo con la respiración, el metabolismo de aminoácidos y la producción de ATP. Al atacar muchos sitios a la vez, el hongo no puede desarrollar resistencia con una sola mutación.",
    "enCampo": "Es una **película protectora sobre la superficie**. No entra a la planta, así que solo protege lo que quedó cubierto y solo antes de que el hongo penetre. Se lava con lluvia fuerte y el crecimiento nuevo sale desprotegido. Lo que ves cuando funciona es ausencia de lesiones nuevas, nunca curación de las existentes. Aporta además manganeso y zinc, que es un beneficio nutricional real.",
    "blancos": "Preventivo de amplio espectro: tizones, mildeos, royas, antracnosis, manchas foliares, Sigatoka.",
    "usos": "Papa, tomate, hortalizas, banano, café, frutales, cereales.",
    "consejo": "Es la **pieza anti-resistencia más importante del portafolio de fungicidas**: FRAC M03 tiene riesgo de resistencia muy bajo. La práctica correcta es acompañar con mancozeb cada aplicación de estrobilurina o triazol, no usarlo solo como reemplazo barato.",
    "accion": "Protectante de contacto",
    "cultivos": [
      "papa",
      "cafe",
      "platano-banano",
      "tomate",
      "hortalizas"
    ]
  },
  "tenaz": {
    "descripcion": "Fungicida de acción translaminar, curativa y antiesporulante para el control de un amplio espectro de hongos.",
    "mecanismo": "Inhibidor de la quinona externa: se une al sitio Qo del citocromo bc1 en el complejo III mitocondrial y detiene el transporte de electrones. El hongo no produce ATP. El momento del ciclo en que más se nota es la germinación de la espora, que es la fase de mayor demanda energética.",
    "enCampo": "Su fuerte es la **protección**, no la curación: aplicado antes de la infección es de lo mejor que hay. Se mueve translaminar y por xilema, así que cubre la hoja completa y las hojas nuevas. Tiene además el llamado 'efecto verde': retrasa la senescencia de la hoja y mejora la eficiencia del uso del nitrógeno, lo que el productor percibe como un cultivo más verde y más sano aunque no haya presión de enfermedad.",
    "blancos": "Royas, manchas foliares, antracnosis, mildeos, Rhizoctonia, Sigatoka, oídios.",
    "usos": "Arroz, café, banano, papa, hortalizas, frutales, caña, aguacate.",
    "consejo": "Riesgo de resistencia **alto**: la mutación G143A en el citocromo b confiere resistencia total y de un salto, no gradual. En Sigatoka negra hay pérdida de sensibilidad documentada en Colombia y Centroamérica. Regla: máximo 2-3 aplicaciones por ciclo, siempre en mezcla con multisitio, nunca consecutivas.",
    "accion": "Preventivo, translaminar",
    "cultivos": [
      "arroz",
      "papa",
      "cafe",
      "platano-banano",
      "cana",
      "hortalizas",
      "aguacate"
    ]
  },
  "cloropaz": {
    "descripcion": "Fungicida con una acción protectante de alta residualidad.",
    "mecanismo": "Multisitio. Se une a los grupos tiol de las enzimas del hongo —especialmente las que dependen de glutatión— y desactiva su metabolismo respiratorio en varios puntos a la vez. Impide la germinación de esporas por contacto directo.",
    "enCampo": "Protectante puro de **alta residualidad**: es de los que más días de cobertura da sobre superficie, con muy buena adherencia y resistencia al lavado. No se mueve nada dentro de la planta. Por eso, en cultivos de crecimiento rápido, la ventana de reaplicación la marca el crecimiento nuevo, no la degradación del producto.",
    "blancos": "Tizones, mildeos, antracnosis, manchas foliares, Botrytis, Alternaria, Sigatoka.",
    "usos": "Papa, tomate, hortalizas, banano, cebolla, frutales, flores.",
    "consejo": "El otro multisitio del portafolio junto con mancozeb, y por lo tanto la otra pieza clave de la estrategia anti-resistencia. Su riesgo de resistencia es muy bajo. Importante: tiene restricciones regulatorias en varios mercados de exportación —conviene verificar LMR antes de recomendarlo en fruta de exportación.",
    "accion": "Protectante de contacto",
    "cultivos": [
      "papa",
      "platano-banano",
      "tomate",
      "hortalizas",
      "flores",
      "cebolla"
    ]
  },
  "flutri": {
    "descripcion": "Fungicida altamente sistémico para el control de un amplio espectro de enfermedades en diversos cultivos.",
    "mecanismo": "Inhibidor de la desmetilación: bloquea la enzima C14-desmetilasa (CYP51) en la ruta de síntesis del ergosterol. Sin ergosterol la membrana celular del hongo pierde integridad y fluidez, el micelio no puede seguir creciendo y la esporulación se detiene.",
    "enCampo": "Es de los triazoles con **mayor sistemia** del portafolio: se mueve muy bien por xilema y se redistribuye por toda la hoja. Su ventana curativa es real —hasta 48 a 72 horas después de la infección— y eso es lo que lo hace valioso cuando llegas tarde. Lo que ves es la detención del avance de la lesión y la ausencia de esporulación en las manchas existentes.",
    "blancos": "Royas (su fuerte), manchas foliares, oídios, cercosporas, Sigatoka.",
    "usos": "Arroz, café, banano, caña, cereales, soya, frutales.",
    "consejo": "Riesgo de resistencia medio: en los DMI la resistencia es gradual —se acumula por mutaciones en CYP51 y sobreexpresión del gen—, lo que significa que primero notas pérdida parcial de eficacia, no falla total. Esa señal temprana es una oportunidad de corregir el programa antes de perder la molécula.",
    "accion": "Sistémico preventivo y curativo",
    "cultivos": [
      "arroz",
      "cafe",
      "platano-banano",
      "cana"
    ]
  },
  "benoagro": {
    "descripcion": "Fungicida efectivo en el control de enfermedades foliares que combina la acción preventiva y curativa.",
    "mecanismo": "Se convierte en carbendazim dentro de la planta y actúa igual: se une a la beta-tubulina, impide el ensamblaje del huso mitótico y detiene la división nuclear del hongo. Sistémico ascendente por xilema.",
    "enCampo": "Combina acción preventiva y curativa con buena movilidad. Absorbido también por raíz, lo que lo hace útil en aplicaciones al suelo contra patógenos vasculares y de cuello. En campo el efecto es la detención del avance de la lesión y del crecimiento del micelio en 3 a 5 días.",
    "blancos": "Fusarium, Botrytis, Sclerotinia, Verticillium, antracnosis, manchas foliares, moho gris.",
    "usos": "Flores, hortalizas, frutales, café, banano, arroz.",
    "consejo": "Mismo grupo y misma resistencia cruzada que CARBENDAZIM y ROBENDAZIM: son tres marcas sobre FRAC 1. Hay resistencia documentada de Mycosphaerella fijiensis a benomil en Colombia desde hace años. No usar en programas de Sigatoka sin verificar sensibilidad local.",
    "accion": "Sistémico preventivo y curativo",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Arroz (Oryza sativa)",
          "blancos": [
            "Pyricularia oryzae"
          ]
        }
      ],
      "fuente": "https://cdn.prod.website-files.com/62a8d97630e75f4fd68412e3/633fbefe28f7af2b7054f46c_BENOAGRO%2050%20WP%20-%20Ficha%20t%C3%A9cnica.pdf",
      "confianza": "alta",
      "cultivos": [
        "arroz"
      ]
    },
    "cultivos": [
      "arroz",
      "cafe",
      "platano-banano",
      "hortalizas",
      "flores"
    ]
  },
  "durab": {
    "descripcion": "Fungicida de amplio espectro con acción prolongada y erradicante de larga duración.",
    "mecanismo": "Azoxystrobina sobre el complejo III mitocondrial —corta el ATP en la germinación de esporas— más difenoconazol inhibiendo la síntesis de ergosterol para frenar el micelio ya establecido. Es la combinación preventivo + curativo más usada del mundo.",
    "enCampo": "Cobertura de todas las fases del ciclo del hongo: impide germinación, frena penetración, detiene crecimiento del micelio y suprime esporulación. El resultado práctico es una ventana de control larga —hasta 21 días según cultivo y presión— y la posibilidad de rescatar una situación donde la infección ya comenzó.",
    "blancos": "Amplio espectro: royas, manchas foliares, antracnosis, cercospora, oídios, Alternaria, Sigatoka.",
    "usos": "Arroz, papa, hortalizas, café, banano, frutales, caña, cebolla.",
    "consejo": "Es la misma mezcla, en las mismas concentraciones, que BENIGNO 325 SC: otra pareja de marcas gemelas del portafolio. Y contiene una estrobilurina, así que cuenta dentro del límite de aplicaciones de FRAC 11 del ciclo.",
    "accion": "Preventivo, curativo y erradicante",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Rosas",
          "blancos": [
            "Mildeo polvoso"
          ]
        },
        {
          "cultivo": "Cebolla de bulbo",
          "blancos": [
            "Mancha púrpura"
          ]
        }
      ],
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/durab_325_sc/436/1/16989/58/3",
      "confianza": "media",
      "cultivos": [
        "flores",
        "cebolla"
      ]
    },
    "cultivos": [
      "arroz",
      "papa",
      "cafe",
      "platano-banano",
      "cana",
      "hortalizas",
      "flores",
      "cebolla"
    ]
  },
  "difenex": {
    "descripcion": "Fungicida de amplio espectro con acción preventiva y curativa.",
    "mecanismo": "Triazol inhibidor de la C14-desmetilasa: corta la síntesis de ergosterol y con ello la construcción de la membrana del hongo. Tiene además un efecto notable sobre la formación de haustorios y sobre la esporulación.",
    "enCampo": "Sistémico ascendente con muy buena distribución en la hoja. Su ventaja frente a otros triazoles es la amplitud del espectro y la buena tolerancia del cultivo —es de los DMI menos propensos a causar efectos de regulación de crecimiento—. Detiene el avance de la mancha y frena la producción de esporas, que es lo que corta la epidemia.",
    "blancos": "Manchas foliares, royas, antracnosis, Alternaria, Cercospora, Septoria, sarna, Sigatoka.",
    "usos": "Hortalizas, papa, tomate, cebolla, frutales, café, banano, arroz, flores.",
    "consejo": "En el portafolio aparece dos veces, con dos versiones de logo y la misma composición: vale la pena preguntar internamente si son dos presentaciones comerciales o una duplicación del material. Como DMI, comparte FRAC 3 con FLUTRI, UNDAZOL, POWEREX, TEBUNEX, MUTANTEX y la parte triazol de BENEVOLO, DURABO y BENIGNO.",
    "accion": "Sistémico preventivo y curativo",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Tomate",
          "blancos": [
            "Tizón temprano (Alternaria solani)"
          ]
        }
      ],
      "fuente": "https://agroquimicos-organicosplm.com/colombia/difenex_250_ec/436/1/16988/11/3",
      "confianza": "media",
      "cultivos": [
        "tomate"
      ]
    },
    "cultivos": [
      "arroz",
      "papa",
      "cafe",
      "platano-banano",
      "tomate",
      "hortalizas",
      "flores",
      "cebolla"
    ]
  },
  "undazol": {
    "descripcion": "Fungicida de alta sistematicidad ideal para el control de hongos como la Sigatoka negra y amarilla en cultivos de banano y plátano.",
    "mecanismo": "Triazol de alta sistemia que inhibe la C14-desmetilasa y bloquea la síntesis de ergosterol. Su alta movilidad en el xilema es la razón por la que funciona tan bien en plantas de gran porte como el banano y el plátano.",
    "enCampo": "El portafolio lo posiciona específicamente en **Sigatoka negra y amarilla**, y es correcto: en banano se aplica con aceite agrícola en aplicación aérea o terrestre, y la molécula se distribuye por toda la hoja nueva. Lo que se evalúa en campo no es la desaparición de la mancha sino la **detención del avance del estado evolutivo** de la lesión y la protección de las hojas 1 a 4, que son las que sostienen el racimo.",
    "blancos": "Sigatoka negra (Mycosphaerella fijiensis) y amarilla, royas, manchas foliares, oídios.",
    "usos": "Banano y plátano principalmente; también arroz, café, caña, cereales.",
    "consejo": "Hay pérdida de sensibilidad de M. fijiensis a triazoles documentada en México, Centroamérica y Suramérica. En Sigatoka el manejo obliga a alternar grupos FRAC estrictamente y a acompañar con multisitios (mancozeb, chlorothalonil) y con las prácticas culturales —deshoje y drenaje—. Es el mismo activo de POWEREX 250 EC.",
    "accion": "Sistémico preventivo y curativo",
    "cultivos": [
      "arroz",
      "cafe",
      "platano-banano",
      "cana"
    ]
  },
  "benigno": {
    "descripcion": "Fungicida de acción sistémica, preventiva, curativa y antiesporulante de enfermedades causadas por hongos.",
    "mecanismo": "Composición idéntica a DURABO 325 SC. La estrobilurina corta la respiración mitocondrial del hongo en germinación; el triazol bloquea la síntesis de ergosterol del micelio establecido.",
    "enCampo": "Actúa sobre cuatro momentos del ciclo del patógeno: germinación de la espora, penetración, crecimiento del micelio y esporulación. Esa última —el efecto antiesporulante— es la que más importa en epidemias policíclicas como la Sigatoka o la roya: si el hongo no esporula, no hay siguiente ciclo de infección.",
    "blancos": "Amplio espectro de hongos foliares: royas, cercosporas, antracnosis, manchas, Sigatoka.",
    "usos": "Café, banano, arroz, hortalizas, frutales, papa, caña.",
    "consejo": "Gemelo de DURABO. Si ambos están en el portafolio, la diferencia es de marca y canal, no de química. Ninguno de los dos cuenta como rotación frente al otro ni frente a TENAZ (misma estrobilurina).",
    "accion": "Sistémico, preventivo, curativo y antiesporulante",
    "cultivos": [
      "arroz",
      "papa",
      "cafe",
      "platano-banano",
      "cana",
      "hortalizas"
    ]
  },
  "tebunex": {
    "descripcion": "Fungicida de acción sistémica con un alto efecto sobre las esporulaciones de los hongos.",
    "mecanismo": "Triazol inhibidor de la C14-desmetilasa con una característica destacada: un efecto **antiesporulante** muy marcado. Además de frenar el crecimiento del micelio, inhibe específicamente la formación de conidios.",
    "enCampo": "Ese efecto sobre la esporulación es lo que se ve en campo: las lesiones existentes se quedan 'secas', sin el polvillo de esporas que normalmente las cubre. En una epidemia policíclica eso equivale a cortar la fuente de inóculo, y el efecto sobre la curva de enfermedad en las siguientes dos semanas es mayor que el que sugiere la lesión visible.",
    "blancos": "Royas, Sigatoka, manchas foliares, oídios, Fusarium, cercosporas.",
    "usos": "Café, banano, arroz, cereales, frutales, caña, hortalizas.",
    "consejo": "Algunos triazoles, tebuconazole entre ellos, tienen efecto regulador de crecimiento a dosis altas —acortamiento de entrenudos— porque los DMI también tocan la ruta de los esteroles vegetales. Es un efecto secundario a vigilar en cultivos en desarrollo activo.",
    "accion": "Sistémico preventivo y curativo",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Plátano (Musa sp.)",
          "blancos": [
            "Sigatoka negra (Mycosphaerella fijiensis)"
          ]
        }
      ],
      "fuente": "https://agroquimicos-organicosplm.com/colombia/tebunex_250_ec/436/1/17021/11/3",
      "confianza": "media",
      "cultivos": [
        "platano-banano"
      ]
    },
    "cultivos": [
      "arroz",
      "cafe",
      "platano-banano",
      "cana",
      "hortalizas"
    ]
  },
  "mutantex": {
    "descripcion": "Fungicida sistémico para el control de enfermedades en cultivos anuales.",
    "mecanismo": "Triazol inhibidor de la biosíntesis de ergosterol vía CYP51, con afinidad especialmente alta por la enzima de hongos basidiomicetos y ascomicetos causantes de royas y manchas en cereales y cultivos anuales.",
    "enCampo": "Alta sistemia y persistencia: se redistribuye bien en la hoja y sostiene el control por 14 a 21 días. Es de los triazoles con mejor actividad sobre royas. En campo el resultado se ve como detención de nuevas pústulas y hojas que se mantienen verdes y funcionales más tiempo que el testigo.",
    "blancos": "Royas, manchas foliares, cercosporas, oídios, escaldadura.",
    "usos": "Arroz, cereales, caña, café, cultivos anuales.",
    "consejo": "Está bajo restricción regulatoria en la Unión Europea, lo cual es relevante si el cliente exporta. Como todos los DMI del portafolio —nueve referencias llevan FRAC 3, seis solas y tres en mezcla— hay que contar las aplicaciones del grupo completo, no las de cada marca por separado.",
    "accion": "Sistémico preventivo y curativo",
    "cultivos": [
      "arroz",
      "cafe",
      "cana"
    ]
  },
  "robendazim": {
    "descripcion": "Fungicida con amplio espectro de control sobre enfermedades foliares.",
    "mecanismo": "Carbendazim en suspensión concentrada: se une a la beta-tubulina, bloquea el ensamblaje de microtúbulos y detiene la mitosis del hongo. Sistémico por xilema, absorbido por hoja y raíz.",
    "enCampo": "Mismo perfil que CARBENDAZIM 500 HXS: frena el avance de las lesiones y la formación de nuevas, con buen desempeño contra patógenos de suelo aplicado en drench. La formulación SC facilita la mezcla y reduce sedimentación frente a otras presentaciones.",
    "blancos": "Botrytis, Fusarium, Sclerotinia, antracnosis, manchas foliares, moho gris.",
    "usos": "Flores, hortalizas, frutales, arroz, café, banano.",
    "consejo": "Tercera referencia del portafolio sobre FRAC 1 junto con CARBENDAZIM 500 HXS y BENOAGRO. Riesgo de resistencia alto y cruzada dentro del grupo: rotarlas entre sí no aporta nada. En cultivos con historial de uso intensivo, verificar eficacia antes de comprometer un programa.",
    "accion": "Sistémico preventivo y curativo",
    "cultivos": [
      "arroz",
      "cafe",
      "platano-banano",
      "hortalizas",
      "flores"
    ]
  },
  "powerplus": {
    "descripcion": "Fungicida de alta sistematicidad ideal para el control de hongos como la Sigatoka negra y amarilla en cultivos de banano y plátano.",
    "mecanismo": "Propiconazol: inhibición de la C14-desmetilasa y bloqueo de la síntesis de ergosterol. Alta sistemia por xilema, que es lo que permite que funcione en plantas grandes donde el producto debe recorrer distancias largas.",
    "enCampo": "Igual que UNDAZOL, está posicionado en **Sigatoka negra y amarilla** en banano y plátano. En programa se aplica en mezcla con aceite agrícola, que cumple dos funciones: mejora la penetración del triazol y tiene por sí mismo un efecto supresor sobre el desarrollo del hongo en la superficie foliar.",
    "blancos": "Sigatoka negra y amarilla, royas, manchas foliares, oídios.",
    "usos": "Banano, plátano, arroz, café, caña, cereales.",
    "consejo": "Mismo ingrediente y concentración que UNDAZOL 250 SC —marcas gemelas—. En un programa de Sigatoka hay que contarlos como una sola aplicación de FRAC 3, junto con cualquier otro triazol del portafolio.",
    "accion": "Sistémico preventivo y curativo",
    "cultivos": [
      "arroz",
      "cafe",
      "platano-banano",
      "cana"
    ]
  },
  "kurax": {
    "descripcion": "Fungicida que combina dos ingredientes activos para el control efectivo de oomicetos. Con efecto antiesporulante y curativo.",
    "mecanismo": "Dos modos de acción específicos contra oomicetos, que no son hongos verdaderos y por eso no responden a la mayoría de los fungicidas. El fluopicolide —reclasificado por FRAC como inhibidor de la V-ATPasa— desorganiza el citoesqueleto y el transporte de protones del oomiceto. El propamocarb altera la permeabilidad de la membrana y frena la síntesis de fosfolípidos, inhibiendo la formación de esporangios y la germinación de zoosporas.",
    "enCampo": "Es la herramienta específica para **Phytophthora, Pythium, Peronospora, Plasmopara y Bremia**: gota, mildeo velloso, damping-off, pudriciones de raíz y cuello. Actúa sobre varias fases del ciclo, incluida la movilidad de las zoosporas, que es lo que explica su efecto en condiciones de suelo húmedo. Se aplica tanto foliar como en drench.",
    "blancos": "Oomicetos: Phytophthora infestans (gota de la papa), Pythium, Peronospora, Plasmopara, Bremia.",
    "usos": "Papa, tomate, hortalizas, cebolla, lechuga, cucurbitáceas, aguacate.",
    "consejo": "Es de los pocos productos del portafolio que sirve contra oomicetos —los triazoles no los controlan, porque los oomicetos no producen ergosterol, y las estrobilurinas solo tienen actividad parcial sobre ellos y con riesgo alto de resistencia—. Ese es el punto técnico que hay que tener claro: no es un fungicida más, cubre un hueco que el resto del portafolio no cubre.",
    "accion": "Sistémico, preventivo y curativo",
    "cultivos": [
      "papa",
      "tomate",
      "hortalizas",
      "aguacate",
      "cebolla"
    ]
  },
  "blindax": {
    "descripcion": "Fungicida sistémico y translaminar con acción curativa y protectante sobre enfermedades ocasionadas por hongos, con un efecto de choque y larga protección.",
    "mecanismo": "Dos golpes a la respiración del hongo en puntos distintos de la cadena. El boscalid es un SDHI: inhibe la succinato deshidrogenasa, el complejo II. La pyraclostrobina es un QoI: inhibe el complejo III. Bloquear dos complejos consecutivos de la misma cadena respiratoria es una estrategia muy eficaz y además dificulta la aparición de resistencia.",
    "enCampo": "El portafolio lo describe como de **efecto de choque y larga protección**, y eso es exactamente lo que se ve: freno inmediato del desarrollo del hongo más residualidad prolongada. La pyraclostrobina aporta además un marcado efecto fisiológico sobre la planta —mayor actividad de la nitrato reductasa, retraso de la senescencia— que se percibe como follaje más verde y más tiempo de área foliar activa.",
    "blancos": "Botrytis, Sclerotinia, Alternaria, antracnosis, oídios, royas, manchas foliares, Monilia.",
    "usos": "Hortalizas, frutales, papa, tomate, flores, aguacate, cítricos.",
    "consejo": "Trae dos grupos de **alto riesgo** de resistencia —FRAC 7 y FRAC 11—, así que la mezcla no exime de rotar: limitar a 2 aplicaciones por ciclo y alternar con multisitios. En Botrytis hay resistencia a SDHI documentada en varios países.",
    "accion": "Sistémico y translaminar, curativo y protectante",
    "cultivos": [
      "papa",
      "tomate",
      "hortalizas",
      "citricos",
      "aguacate",
      "flores"
    ]
  },
  "protecsol": {
    "descripcion": "Fungicida altamente sistémico con acción preventiva y curativa, que controla muy bien enfermedades que atacan las partes subterráneas de la planta.",
    "mecanismo": "Tiene una acción doble y poco común: por un lado inhibe directamente al oomiceto, y por otro **induce las defensas de la planta** —estimula la producción de fitoalexinas y compuestos fenólicos—. Por eso FRAC lo clasifica en el grupo P, el de los inductores de resistencia del hospedero.",
    "enCampo": "Aquí está la particularidad que más vale la pena entender: es **el único producto del portafolio con movimiento verdaderamente ambidireccional** —sube por xilema y baja por floema—. Eso significa que una aplicación foliar llega a las raíces. Es la razón por la que controla pudriciones radiculares y de cuello aplicándolo a la hoja, algo que ningún sistémico de xilema puede hacer.",
    "blancos": "Phytophthora (incluida P. cinnamomi y P. palmivora), Pythium, mildeos vellosos, pudriciones de raíz y cuello.",
    "usos": "Aguacate (pudrición radicular), cítricos, piña, hortalizas, frutales, palma, ornamentales.",
    "consejo": "En aguacate es prácticamente el estándar para Phytophthora cinnamomi, aplicado tanto foliar como por inyección al tronco. Riesgo de resistencia bajo. Si en la reunión te preguntan cuál es el producto más 'sistémico' del portafolio, este es la respuesta correcta —no los triazoles.",
    "accion": "Sistémico verdadero, preventivo y curativo",
    "cultivos": [
      "hortalizas",
      "citricos",
      "aguacate",
      "flores",
      "palma"
    ]
  },
  "alga600": {
    "descripcion": "Bioestimulante orgánico para el balance hormonal natural.",
    "mecanismo": "Los extractos de alga parda no son fertilizantes: son **señalizadores hormonales**. Aportan citoquininas, auxinas y giberelinas en concentraciones muy bajas, más betaínas, alginatos, manitol y polifenoles. Lo que hacen es modular el balance hormonal endógeno de la planta y activar genes de respuesta a estrés, no nutrir.",
    "enCampo": "El efecto que se ve es de **equilibrio**, no de empuje: mejor cuaje, menos aborto floral, hojas que se mantienen turgentes en días de calor, recuperación más rápida después de un estrés. Las betaínas actúan como osmoprotectores, lo que se traduce en que la planta cierra estomas más tarde y sigue fotosintetizando cuando el testigo ya se frenó. No esperes un salto de color como con nitrógeno.",
    "blancos": "—",
    "usos": "Todos los cultivos. Se posiciona en momentos de alta demanda: prefloración, cuaje, llenado, y antes o después de un estrés previsible.",
    "consejo": "La etiqueta indica que es para venta y aplicación con base en análisis de suelo o tejido foliar y prescripción de un ingeniero agrónomo. El argumento técnico honesto es el de la modulación hormonal y el manejo del estrés, no el de la nutrición: el aporte de nutrientes por hectárea es mínimo.",
    "accion": "Foliar",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Uva",
          "blancos": []
        },
        {
          "cultivo": "Pastos",
          "blancos": []
        },
        {
          "cultivo": "Tomate",
          "blancos": []
        },
        {
          "cultivo": "Maíz",
          "blancos": []
        },
        {
          "cultivo": "Aguacate",
          "blancos": []
        },
        {
          "cultivo": "Caña de azúcar",
          "blancos": []
        }
      ],
      "composicion": "Según PLM (producto 'LEILI ALGA 600', presentaciones 100 g/250 g/1 kg que coinciden con Alga600): nitrógeno total 1,2 %; K2O 17,0 %; azufre total 1,22 %; carbono orgánico oxidable 24,5 %; SiO2 total 1,14 %. Cibochem: extracto de alga sargassum con 3 ingredientes patentados (Algene, Minecal, Kelmost).",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/leili_alga_600/436/1/17002/48/3",
      "confianza": "media",
      "cultivos": [
        "maiz",
        "cana",
        "tomate",
        "aguacate",
        "pastos"
      ]
    },
    "cultivos": [
      "maiz",
      "cana",
      "tomate",
      "aguacate",
      "pastos"
    ]
  },
  "algasoil": {
    "descripcion": "Bioestimulante granulado de raíz, suelo y activador de microorganismo.",
    "mecanismo": "Extracto de alga en formulación granulada para suelo. Los alginatos y los oligosacáridos derivados del alga actúan de dos maneras en la rizosfera: estimulan directamente la formación de raíces —hay actividad documentada de los oligómeros de alginato sobre crecimiento radicular— y sirven de sustrato de carbono para la microbiota del suelo.",
    "enCampo": "Es el producto de **arranque** y de recuperación de suelo. Lo que se ve es un sistema radicular con más raíces finas y más pelos absorbentes en las primeras semanas —hay que arrancar la planta y mirar, no se ve desde arriba—. En suelos compactados o degradados el efecto sobre la agregación y la actividad microbiana es la parte más valiosa.",
    "blancos": "—",
    "usos": "Todos. Se aplica al trasplante, en siembra, o en renovación de cultivos perennes.",
    "consejo": "El NPK 2-2-2 es marginal desde el punto de vista nutricional —no reemplaza fertilización—. Su valor real está en el alga y en el aporte de carbono orgánico a la rizosfera. Venderlo como fertilizante es un error técnico que se cae en la primera pregunta de un agrónomo.",
    "accion": "Aplicación al suelo",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Todos los cultivos (según ficha PLM)",
          "blancos": []
        }
      ],
      "composicion": "Fertilizante orgánico a base de extracto de algas marinas; sustancias listadas: azufre, calcio, carbono orgánico, hierro, magnesio y silicio; CIC 63,55 meq/100 g. No se recuperaron porcentajes de NPK.",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/alga_soil/436/1/16979/23/3",
      "confianza": "media"
    }
  },
  "brain": {
    "descripcion": "Bioestimulante promotor de raíces absorbentes.",
    "mecanismo": "Combina la señalización hormonal del alga —donde las citoquininas y las auxinas favorecen la iniciación de raíces adventicias— con un aporte alto de potasio, que es el nutriente que gobierna el movimiento de agua, la apertura estomática y el transporte de azúcares hacia la raíz.",
    "enCampo": "El portafolio lo llama promotor de **raíces absorbentes**, y esa distinción importa: no busca raíces gruesas de anclaje sino la raíz fina y los pelos radiculares, que son los que efectivamente toman agua y nutrientes. Se ve en la recuperación después del trasplante y en cultivos que vienen de un periodo de encharcamiento o de estrés hídrico.",
    "blancos": "—",
    "usos": "Todos, especialmente en trasplante, establecimiento y recuperación de sistema radicular.",
    "consejo": "Buena herramienta para acompañar aplicaciones de PROTECSOL o KURAX en problemas de raíz: mientras el fungicida controla el patógeno, este ayuda a que la planta reponga raíz. Ese argumento de solución conjunta es de los más sólidos para armar una propuesta completa.",
    "accion": "Foliar y al suelo"
  },
  "leili2000": {
    "descripcion": "Bioestimulante para activar fotosíntesis y la acumulación de reservas energéticas.",
    "mecanismo": "Extracto de alga con NPK dirigido a la **eficiencia fotosintética**. Los extractos de alga aumentan el contenido de clorofila y la actividad de la Rubisco, y mejoran la conductancia estomática bajo condiciones subóptimas. El resultado es más carbono fijado por unidad de área foliar.",
    "enCampo": "Se posiciona para activar fotosíntesis y acumular reservas energéticas, y ahí es donde tiene sentido: aplicado antes de una etapa de alta demanda —diferenciación floral, llenado de fruto—, la planta llega con más carbohidratos disponibles. Lo que se observa en campo es un follaje de verde más profundo y sostenido, y mejor uniformidad de llenado.",
    "blancos": "—",
    "usos": "Todos. Momento clave: antes y durante las etapas de máxima demanda energética.",
    "consejo": "Leili es una marca internacional reconocida en extractos de alga —Alga600 lleva también ese sello en el empaque—. Es un punto de credibilidad útil: el respaldo del fabricante vale en una conversación con un cliente técnico.",
    "accion": "Foliar",
    "etiqueta": {
      "composicion": "Fertilizante a base de extracto de algas marinas concentrado con micronutrientes quelados; sustancias listadas: calcio, cobre, hierro, magnesio, manganeso, fósforo, zinc, más alga, azufre, nitrógeno y potasio (sin porcentajes recuperados).",
      "fuente": "https://agroquimicos-organicosplm.com/colombia/leili_2000/436/1/17001/13/3",
      "confianza": "media"
    }
  },
  "amino43": {
    "descripcion": "Bioestimulante a base de aminoácidos de rápida asimilación, ideal para etapas de alta demanda energética para mejorar la respuesta ante situaciones de estrés.",
    "mecanismo": "Los aminoácidos libres se absorben directamente por hoja y raíz y se translocan por el floema. Su valor es energético: sintetizar un aminoácido desde nitrato le cuesta a la planta mucho ATP y poder reductor. Al recibirlos ya formados, ese ahorro se redirige a crecimiento o a defensa. Actúan además como quelatantes naturales de micronutrientes y como precursores de osmoprotectores.",
    "enCampo": "El momento de mayor impacto visible es **después de un estrés**: granizada, sequía, aplicación fitotóxica, trasplante, frío. La planta que recibe aminoácidos retoma crecimiento notoriamente antes que el testigo. La prolina y la glicina betaína protegen la membrana y mantienen el estado hídrico; en campo eso se ve como hojas que no se marchitan a la misma hora del día.",
    "blancos": "—",
    "usos": "Todos. Etapas de alta demanda energética y situaciones de estrés abiótico.",
    "consejo": "Lo que distingue a un buen producto de aminoácidos es que sean **libres** y de origen vegetal (L-aminoácidos): los hidrolizados con péptidos largos se absorben mucho peor. Mezclarlos con micronutrientes mejora la absorción de estos por el efecto quelatante. No mezclar con productos de pH muy alcalino.",
    "accion": "Foliar y fertirriego",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Todos los cultivos (según Cibochem)",
          "blancos": []
        },
        {
          "cultivo": "Uva",
          "blancos": []
        },
        {
          "cultivo": "Tomate",
          "blancos": []
        },
        {
          "cultivo": "Aguacate",
          "blancos": []
        },
        {
          "cultivo": "Pastos",
          "blancos": []
        },
        {
          "cultivo": "Maíz",
          "blancos": []
        }
      ],
      "composicion": "Aminoácidos libres 43,0 % (16 aminoácidos libres); nitrógeno total 17,0 %; carbono orgánico oxidable total 15,0 %; silicio total 0,90 %; pH (10 %) 4,7; CE 4,56 dS/m; humedad 3,27 %.",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/fertilita_amino_43/436/1/16991/48/3",
      "confianza": "media",
      "cultivos": [
        "maiz",
        "tomate",
        "aguacate",
        "pastos"
      ]
    },
    "cultivos": [
      "maiz",
      "tomate",
      "aguacate",
      "pastos"
    ]
  },
  "amino80": {
    "descripcion": "Bioestimulante para brindar energía a la planta a base de aminoácidos.",
    "mecanismo": "La versión de máxima concentración: 18 aminoácidos libres al 80%. El principio es el mismo que AMINO43 —ahorro energético, quelatación, precursores de osmoprotectores y de defensas— pero con casi el doble de contenido, lo que permite dosis menores por hectárea.",
    "enCampo": "Aplicaciones de rescate y de alta demanda: es el que se usa cuando la planta viene de un golpe fuerte y hay que reactivarla rápido. La respuesta de recuperación se nota entre 3 y 7 días como reanudación del crecimiento del ápice y recuperación de turgencia.",
    "blancos": "—",
    "usos": "Todos. Recuperación de estrés severo, etapas críticas, cultivos de alto valor.",
    "consejo": "Al ser sólido y muy concentrado, el costo por hectárea suele ser competitivo frente a los líquidos, y el flete es mucho menor. Verificar siempre la solubilidad y el orden de mezcla en el tanque: los aminoácidos sólidos se disuelven mejor en premezcla con agua tibia.",
    "accion": "Foliar y fertirriego"
  },
  "grosso": {
    "descripcion": "Bioestimulante a base de calcio, boro y molibdeno acomplejados con aminoácidos que estimulan la floración y el cuajado de frutos.",
    "mecanismo": "Tres nutrientes que gobiernan la reproducción, acomplejados con aminoácidos para mejorar su entrada y su movilidad. El boro es indispensable para la germinación del grano de polen y el crecimiento del tubo polínico; el calcio estructura la pared celular y estabiliza la membrana; el molibdeno es cofactor de la nitrato reductasa. El aminoácido actúa como quelatante y transportador.",
    "enCampo": "Se posiciona en **floración y cuaje**, que es exactamente donde estos tres elementos deciden el resultado. Lo que se ve: menos aborto floral, mayor porcentaje de cuaje, frutos más uniformes. El calcio es particularmente crítico porque se mueve solo por xilema —no baja ni se redistribuye—, así que el fruto joven depende de que llegue en el momento exacto de división celular.",
    "blancos": "—",
    "usos": "Frutales, hortalizas, tomate, aguacate, cítricos, café. Aplicación en prefloración, floración y cuaje.",
    "consejo": "Punto fisiológico clave para la reunión: **el calcio no se transloca por floema**. Por eso los problemas de calcio en fruto —pudrición apical en tomate, bitter pit en manzana— no se corrigen con aplicaciones tardías. Hay que aplicar durante la división celular del fruto, en las primeras semanas post-cuaje.",
    "accion": "Foliar",
    "cultivos": [
      "cafe",
      "tomate",
      "hortalizas",
      "citricos",
      "aguacate"
    ]
  },
  "fruttox": {
    "descripcion": "Bioestimulante a base de potasio acomplejado con aminoácidos que optimiza el balance nutricional, favoreciendo el llenado de los frutos.",
    "mecanismo": "Potasio acomplejado con aminoácidos para la fase de llenado. El potasio no forma parte de ninguna estructura de la planta: su trabajo es regular el potencial osmótico, la apertura estomática y sobre todo **el transporte de azúcares por el floema** hacia el fruto. Sin potasio suficiente, la planta produce carbohidratos pero no los mueve al sumidero.",
    "enCampo": "Se posiciona en el **llenado de frutos**, y ahí es donde se mide: calibre, peso, sólidos solubles, color y firmeza. Un cultivo con potasio adecuado en llenado da fruta más grande y con mejor postcosecha. La deficiencia se ve como necrosis en el borde de las hojas viejas —porque el potasio sí se transloca y la planta lo saca de las hojas maduras para mandarlo al fruto.",
    "blancos": "—",
    "usos": "Frutales, hortalizas, tomate, papa, aguacate, cítricos, banano. Fase de llenado y maduración.",
    "consejo": "Ojo con la competencia catiónica: exceso de potasio induce deficiencia de calcio y de magnesio, porque compiten por los mismos sitios de absorción. Por eso GROSSO (calcio) va en cuaje y FRUTTOX (potasio) en llenado, y no al revés ni juntos a dosis altas. Esa secuencia es un buen argumento de programa.",
    "accion": "Foliar",
    "cultivos": [
      "papa",
      "platano-banano",
      "tomate",
      "hortalizas",
      "citricos",
      "aguacate"
    ]
  },
  "forttex": {
    "descripcion": "Bioestimulante a base de calcio acomplejado con aminoácidos que promueve el fortalecimiento de los tejidos y aumenta la tolerancia al estrés abiótico y biótico.",
    "mecanismo": "Calcio acomplejado con aminoácidos. El calcio cumple dos funciones que explican todo su valor: es el cemento de la pared celular —forma los pectatos de calcio de la lámina media— y es el mensajero secundario de las señales de estrés: cuando la planta detecta un patógeno o un choque, la primera respuesta es un flujo de calcio al citosol.",
    "enCampo": "Por eso el portafolio lo posiciona en **fortalecimiento de tejidos y tolerancia al estrés abiótico y biótico**, y es correcto: una pared celular con buen calcio es físicamente más difícil de penetrar para un hongo o un insecto. En campo se ve como fruta más firme, menos rajado, mejor vida de anaquel y menos entrada de patógenos por heridas.",
    "blancos": "—",
    "usos": "Frutales, hortalizas, tomate, aguacate, cítricos, flores.",
    "consejo": "Recordar siempre: el calcio se mueve por xilema, sigue el flujo de transpiración, y **no se redistribuye**. El fruto transpira poco comparado con la hoja, así que compite mal por el calcio. De ahí que la aplicación foliar dirigida al fruto joven sea más eficiente que subir el calcio del suelo.",
    "accion": "Foliar",
    "etiqueta": {
      "composicion": "Bioestimulante foliar orgánico a base de calcio con concentración balanceada de 18 aminoácidos (sin porcentajes garantizados recuperados).",
      "fuente": "https://cibochem.com.co/ficha/fertilita-forttex",
      "confianza": "media"
    },
    "cultivos": [
      "tomate",
      "hortalizas",
      "citricos",
      "aguacate",
      "flores"
    ]
  },
  "complex": {
    "descripcion": "Bioestimulante a base de elementos secundarios y menores, acomplejados con aminoácidos, que estimulan el crecimiento y desarrollo equilibrado de la planta.",
    "mecanismo": "Micronutrientes —hierro, zinc, manganeso, cobre, boro, molibdeno— acomplejados con aminoácidos. El quelato con aminoácido tiene dos ventajas sobre la sal mineral suelta: atraviesa mejor la cutícula porque el transportador es una molécula orgánica reconocida por la hoja, y evita que el micronutriente se precipite o se bloquee en la solución del suelo.",
    "enCampo": "Corrige deficiencias que se ven en el tejido nuevo, porque los micronutrientes —salvo excepciones— son **poco móviles en la planta**: la clorosis internerval de hierro y zinc siempre aparece primero en las hojas jóvenes, no en las viejas. Esa es la clave diagnóstica en campo: si la clorosis está arriba, piensa en micro; si está abajo, piensa en nitrógeno o magnesio.",
    "blancos": "—",
    "usos": "Todos, especialmente en suelos de pH alto o muy bajo donde los micronutrientes quedan bloqueados.",
    "consejo": "El diagnóstico correcto exige análisis foliar: aplicar micros a ciegas puede causar desbalances o incluso toxicidad —sobre todo con boro, cuyo rango entre deficiencia y toxicidad es estrechísimo. Es un producto que conviene recomendar con análisis en la mano.",
    "accion": "Foliar y fertirriego"
  },
  "humox": {
    "descripcion": "Acondicionador orgánico para aplicación al suelo que mejora sus condiciones y la disponibilidad de nutrientes.",
    "mecanismo": "Los ácidos húmicos son moléculas grandes —hasta 50.000 de peso molecular— con muchos grupos carboxilo y fenólicos. Esa carga es la que aumenta la **capacidad de intercambio catiónico** del suelo: el suelo retiene más calcio, magnesio, potasio y amonio en forma disponible en lugar de perderlos por lixiviación. Mejoran además la agregación y la retención de agua.",
    "enCampo": "El efecto es sobre el **suelo**, no sobre la planta directamente, y por eso es más lento y más duradero. Lo que se observa en el mediano plazo: suelo que se desmorona en agregados en lugar de terrones, mejor infiltración, menos encostramiento, y fertilizante que rinde más porque se pierde menos. En suelos arenosos o degradados es donde más se nota.",
    "blancos": "—",
    "usos": "Todos, especialmente suelos degradados, arenosos, salinos o con baja materia orgánica.",
    "consejo": "La diferencia clave con el ácido fúlvico: el húmico es de alto peso molecular, actúa más lento y se queda en el suelo mejorando estructura y CIC. El fúlvico es pequeño, entra a la planta y actúa rápido. No compiten, se complementan —y ese es el argumento para vender HUMOX y FULVOX juntos.",
    "accion": "Aplicación al suelo",
    "etiqueta": {
      "composicion": "Acondicionador húmico orgánico elaborado a base de leonardita; sustancias listadas: carbono orgánico y potasio; K2O soluble 0,08 %; sodio total 0,92 %; CIC 50,58 meq/100 g; pH 4,5; CE 0,15 dS/m.",
      "fuente": "https://agroquimicos-organicosplm.com/colombia/humox/436/1/17534/48/3",
      "confianza": "media"
    }
  },
  "fulvox": {
    "descripcion": "Acondicionador orgánico para aplicación al suelo que estimula el desarrollo de las raíces y mejora la asimilación de nutrientes.",
    "mecanismo": "Los ácidos fúlvicos tienen peso molecular bajo —por debajo de 5.000— y son solubles en todo el rango de pH. Eso les permite atravesar membranas celulares y entrar a la planta, cosa que los húmicos no hacen. Actúan como **quelatantes de micronutrientes** —hierro, manganeso, zinc, cobre— y los transportan hasta la raíz y dentro de ella.",
    "enCampo": "Su efecto es más rápido y más visible que el del húmico: estimulación del crecimiento radicular en días, y mejor respuesta a la fertilización aplicada al mismo tiempo. Es el compañero ideal del fertirriego y de las aplicaciones de micronutrientes, porque evita que se precipiten en el agua o se bloqueen en el suelo.",
    "blancos": "—",
    "usos": "Todos. Especialmente útil en fertirriego, en suelos calcáreos y en programas de corrección de micronutrientes.",
    "consejo": "La regla práctica es: ácido fúlvico con cada aplicación de micronutrientes y con cada fertirriego; ácido húmico en las aplicaciones de fondo y en enmienda de suelo. Ambos se complementan y ese programa combinado es fácil de sustentar técnicamente.",
    "accion": "Suelo y fertirriego",
    "etiqueta": {
      "composicion": "Carbono orgánico oxidable total 26 %; pH 4,8; CE 2,37 dS/m; humedad 3,83 %; CIC 231,9 meq/100 g. No se recuperó un % garantizado de ácidos fúlvicos para este producto.",
      "fuente": "https://www.agroquimicos-organicosplm.com/colombia/fulvox_80/436/1/16996/48/3",
      "confianza": "media"
    }
  },
  "softguard": {
    "descripcion": "Vacuna vegetal radicular contra hongos, bacterias y virus.",
    "mecanismo": "El quitosano es un **elicitor**: la planta lo reconoce como si fuera la pared celular de un hongo —es el mismo polímero de la quitina— y dispara su sistema inmune. Se activan la entrada de calcio al citosol, las MAP-quinasas, la explosión oxidativa, la deposición de callosa, la síntesis de fitoalexinas y de proteínas PR, y la señalización por ácido salicílico y jasmónico. La planta queda en estado de alerta, o 'primed'.",
    "enCampo": "El portafolio lo llama **vacuna vegetal radicular**, y la analogía es técnicamente acertada: no mata al patógeno, entrena a la planta para responder más rápido cuando llegue. Por eso es preventivo y su efecto no se mide en control inmediato sino en menor incidencia y severidad en las semanas siguientes. La ventaja del 'priming' es que la planta no gasta energía en defensa hasta que hay ataque real.",
    "blancos": "Preventivo frente a hongos, bacterias y virus de suelo y raíz.",
    "usos": "Hortalizas, tomate, aguacate, frutales, cultivos de alto valor, semilleros.",
    "consejo": "Es un concepto distinto al de un fungicida y hay que explicarlo así, o el cliente lo va a evaluar mal. No sustituye al fungicida en una epidemia declarada; se usa antes, de forma programada. Encaja muy bien con PROTECSOL, que también trabaja induciendo defensas, y en programas con exigencia de residuos bajos.",
    "accion": "Drench radicular",
    "cultivos": [
      "tomate",
      "hortalizas",
      "aguacate"
    ]
  },
  "gibox": {
    "descripcion": "Regulador de crecimiento que promueve el desarrollo vegetativo de brotes al inducir la elongación celular.",
    "mecanismo": "Giberelina exógena. Su efecto central es inducir la **elongación celular**: activa enzimas que aflojan la pared celular y permiten que la célula se estire con la entrada de agua. También rompe latencia de semillas y yemas, y moviliza reservas del endospermo activando la alfa-amilasa.",
    "enCampo": "Los efectos son rápidos y muy visibles —3 a 7 días—: entrenudos más largos, brotes que se estiran, racimos que se alargan y se aflojan, frutos de mayor calibre en uva y cítricos. También adelanta y uniformiza la brotación. Es de los productos donde la dosis importa muchísimo: pasarse produce plantas ahiladas, débiles y con entrenudos exagerados.",
    "blancos": "—",
    "usos": "Uva, cítricos, caña, papa (ruptura de dormancia), flores, hortalizas, semilleros.",
    "consejo": "Dosis en gramos por hectárea, no en kilos: la presentación de 10 g no es un error, es la escala real de la molécula. Es muy sensible a la degradación por pH y por luz: preparar la mezcla fresca y no dejarla en el tanque de un día para otro.",
    "accion": "Foliar",
    "etiqueta": {
      "usos": [
        {
          "cultivo": "Pasto kikuyo (Pennisetum clandestinum)",
          "blancos": []
        }
      ],
      "composicion": "Ácido giberélico (GA3) 100 g/kg.",
      "momento": "Regulador hormonal de acción sistémica local; penetra por las hojas.",
      "fuente": "https://agroquimicos-organicosplm.com/colombia/gibox_10_sp/436/1/17112/48/3",
      "confianza": "media",
      "cultivos": [
        "pastos"
      ]
    },
    "cultivos": [
      "papa",
      "cana",
      "hortalizas",
      "citricos",
      "flores",
      "pastos"
    ]
  },
  "giboxpro": {
    "descripcion": "Regulador de crecimiento que acelera el crecimiento y desarrollo vegetativo de brotes o yemas.",
    "mecanismo": "Ácido giberélico al 12,5% en presentación de tableta. Mismo mecanismo: elongación celular, ruptura de dormancia, movilización de reservas y aceleración del desarrollo vegetativo de brotes y yemas.",
    "enCampo": "Mismos efectos que GIBOX, con una ventaja operativa importante: la **tableta elimina el error de dosificación**. En una molécula que se aplica en gramos por hectárea y donde pasarse arruina el cultivo, dosificar por unidades en vez de por peso es una mejora real de seguridad de uso en campo.",
    "blancos": "—",
    "usos": "Uva, cítricos, papa, caña, flores, hortalizas, semilleros.",
    "consejo": "El argumento de venta es la precisión de dosis, no la potencia. Para un aplicador que no tiene balanza de precisión en la finca —que son casi todos— la tableta es la diferencia entre aplicar bien y arruinar un lote.",
    "accion": "Foliar",
    "cultivos": [
      "papa",
      "cana",
      "hortalizas",
      "citricos",
      "flores"
    ]
  },
  "mepex": {
    "descripcion": "Regulador de crecimiento que reduce el crecimiento vegetativo longitudinal en el cultivo de algodón.",
    "mecanismo": "Hace exactamente lo contrario de GIBOX: **inhibe la biosíntesis de giberelinas**, bloqueando las enzimas ent-copalil difosfato sintasa y ent-kaureno sintasa en los primeros pasos de la ruta. Con menos giberelina endógena, la célula no se elonga y el entrenudo queda corto. Además aumenta la actividad de las H+-ATPasas de la membrana de la raíz, lo que mejora la toma de potasio.",
    "enCampo": "En algodón el efecto es inconfundible: **planta más compacta**, entrenudos cortos, menor altura y un dosel más abierto que deja entrar luz a la parte baja. Eso tiene dos consecuencias prácticas: más fotosíntesis en las hojas bajas —que son las que llenan las cápsulas inferiores— y mejores condiciones para la cosecha mecánica. La energía que no se va a tallo se va a fruto.",
    "blancos": "—",
    "usos": "Algodón principalmente. También se usa en otros cultivos para controlar crecimiento vegetativo excesivo.",
    "consejo": "El momento de aplicación es todo: aplicado muy temprano limita el desarrollo del cultivo, y muy tarde no logra el efecto de arquitectura. Se maneja por altura de planta y por relación de entrenudos. Es el único producto del portafolio que se usa para **frenar** la planta, y conviene tenerlo claro para no confundirlo con GIBOX en la conversación.",
    "accion": "Foliar",
    "cultivos": [
      "algodon"
    ]
  }
};
