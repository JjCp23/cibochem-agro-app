/**
 * Problemas principales de cada cultivo en Colombia: plagas, enfermedades y
 * malezas, con nombre científico y el objetivo del diagnóstico al que
 * corresponden. Es conocimiento agronómico general de referencia (ICA,
 * AGROSAVIA, Cenicafé, Fedearroz, Cenicaña, Fedepalma), no un registro de
 * etiqueta: el producto debe estar registrado para el cultivo.
 *
 * "objetivo" null significa que ningún producto del portafolio lo maneja
 * directamente (bacterias, virus, mosca de la fruta…): la app lo dice en vez
 * de forzar una recomendación.
 */
export const CULTIVOS = [
  {
    "id": "arroz",
    "nombre": "Arroz",
    "plagas": [
      {
        "comun": "Sogata",
        "cientifico": "Tagosodes orizicolus (vector del virus de la hoja blanca)",
        "objetivo": "chupadores"
      },
      {
        "comun": "Chinche vaneador de la espiga",
        "cientifico": "Oebalus insularis / Oebalus ypsilongriseus",
        "objetivo": "chupadores"
      },
      {
        "comun": "Gusano cogollero",
        "cientifico": "Spodoptera frugiperda",
        "objetivo": "cogolleros"
      },
      {
        "comun": "Barrenador del tallo",
        "cientifico": "Diatraea saccharalis",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Barrenador blanco del arroz",
        "cientifico": "Rupela albinella",
        "objetivo": "barrenadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Piricularia / quemazón (hoja, nudo, cuello de panícula)",
        "agente": "Pyricularia oryzae (Magnaporthe oryzae)",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Anublo de la vaina",
        "agente": "Rhizoctonia solani",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Mancha parda",
        "agente": "Bipolaris oryzae",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Escaldado de la hoja",
        "agente": "Monographella albescens",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Manchado del grano (complejo)",
        "agente": "Bipolaris oryzae, Curvularia spp., Sarocladium oryzae",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Hoja blanca",
        "agente": "Rice hoja blanca virus (RHBV)",
        "tipo": "virus",
        "objetivo": null
      }
    ],
    "malezas": [
      {
        "comun": "Liendre de puerco",
        "cientifico": "Echinochloa colona",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Paja / arrocillo",
        "cientifico": "Leptochloa filiformis",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Arroz rojo / arroz maleza",
        "cientifico": "Oryza sativa (biotipos)",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Cortadera / pelo de indio",
        "cientifico": "Cyperus iria",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Cortadera (Fimbristylis)",
        "cientifico": "Fimbristylis miliacea",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Clavito de agua",
        "cientifico": "Ludwigia spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Germinación y emergencia",
      "Plántula (V1-V3)",
      "Macollamiento",
      "Elongación del tallo / inicio de primordio",
      "Embuchamiento",
      "Floración y espigamiento",
      "Llenado de grano (lechoso - pastoso)",
      "Maduración y cosecha"
    ],
    "escenarioMalezas": "arroz",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://fedearroz.com.co/es/servicios-al-arrocero/eventos-tecnicos-fedearroz-fna/manejo-integrado-de-pyricularia-oryzae-en-el-cultivo-del-arroz/manejo-integrado-de-pyricularia-oryzae-en-el-cultivo-del-arroz/",
      "https://fedearroz.com.co/es/servicios-al-arrocero/eventos-tecnicos-fedearroz-fna/manejo-del-virus-de-hoja-blanca-y-su-vector-sogata/manejo-del-virus-de-hoja-blanca-y-su-vector-sogata/",
      "https://repository.agrosavia.co/server/api/core/bitstreams/ca7df215-c017-49c5-9fd9-66b1c1de0742/content"
    ]
  },
  {
    "id": "maiz",
    "nombre": "Maíz",
    "plagas": [
      {
        "comun": "Gusano cogollero",
        "cientifico": "Spodoptera frugiperda",
        "objetivo": "cogolleros"
      },
      {
        "comun": "Gusano trozador",
        "cientifico": "Agrotis ipsilon",
        "objetivo": "trozadores"
      },
      {
        "comun": "Gusano mazorquero",
        "cientifico": "Helicoverpa zea",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Barrenador del tallo",
        "cientifico": "Diatraea saccharalis",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Chicharrita del maíz",
        "cientifico": "Dalbulus maidis",
        "objetivo": "chupadores"
      },
      {
        "comun": "Chisas / gusanos de suelo",
        "cientifico": "Phyllophaga spp.",
        "objetivo": "coleopteros"
      }
    ],
    "enfermedades": [
      {
        "comun": "Mancha de asfalto (complejo)",
        "agente": "Phyllachora maydis + Monographella maydis",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Roya común",
        "agente": "Puccinia sorghi",
        "tipo": "hongo",
        "objetivo": "roya"
      },
      {
        "comun": "Helmintosporiosis / tizón foliar norteño",
        "agente": "Exserohilum turcicum",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Mancha gris de la hoja",
        "agente": "Cercospora zeae-maydis",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Pudrición de mazorca",
        "agente": "Fusarium verticillioides",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Achaparramiento del maíz (transmitido por D. maidis)",
        "agente": "Spiroplasma kunkelii",
        "tipo": "bacteria",
        "objetivo": null
      }
    ],
    "malezas": [
      {
        "comun": "Caminadora / paja peluda",
        "cientifico": "Rottboellia cochinchinensis",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Liendre de puerco",
        "cientifico": "Echinochloa colona",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Pasto guarda / garrapata",
        "cientifico": "Digitaria sanguinalis",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Bledo",
        "cientifico": "Amaranthus spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Batatilla / correhuela",
        "cientifico": "Ipomoea spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Siembra - emergencia (VE)",
      "Vegetativa temprana (V2-V6)",
      "Vegetativa rápida (V8-VT, definición del potencial)",
      "Espigamiento y floración (VT-R1)",
      "Llenado de grano (R2-R5)",
      "Madurez fisiológica (R6)",
      "Secado en campo y cosecha"
    ],
    "escenarioMalezas": "maiz",
    "escenarioEnfermedades": "general",
    "fuentes": []
  },
  {
    "id": "papa",
    "nombre": "Papa",
    "plagas": [
      {
        "comun": "Polilla guatemalteca",
        "cientifico": "Tecia solanivora",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Gusano blanco de la papa",
        "cientifico": "Premnotrypes vorax",
        "objetivo": "coleopteros"
      },
      {
        "comun": "Palomilla de la papa",
        "cientifico": "Phthorimaea operculella",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Chisas / curos",
        "cientifico": "Ancognatha scarabaeoides y otros escarabeidos",
        "objetivo": "coleopteros"
      },
      {
        "comun": "Mosca minadora",
        "cientifico": "Liriomyza huidobrensis",
        "objetivo": "minadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Gota / tizón tardío",
        "agente": "Phytophthora infestans",
        "tipo": "oomiceto",
        "objetivo": "oomicetos"
      },
      {
        "comun": "Sarna polvosa",
        "agente": "Spongospora subterranea f. sp. subterranea",
        "tipo": "protista",
        "objetivo": null
      },
      {
        "comun": "Rizoctoniasis / costra negra",
        "agente": "Rhizoctonia solani",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Tizón temprano",
        "agente": "Alternaria solani",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Pierna negra y pudrición blanda",
        "agente": "Pectobacterium spp. / Dickeya spp.",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Marchitez bacteriana",
        "agente": "Ralstonia solanacearum",
        "tipo": "bacteria",
        "objetivo": null
      }
    ],
    "malezas": [
      {
        "comun": "Kikuyo",
        "cientifico": "Cenchrus clandestinus (Pennisetum clandestinum)",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Poa",
        "cientifico": "Poa annua",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Lengua de vaca",
        "cientifico": "Rumex crispus",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Botón de oro / masiquia",
        "cientifico": "Bidens pilosa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Guasca / botón de soldado",
        "cientifico": "Galinsoga parviflora",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Pajarera / hierba de pollo",
        "cientifico": "Stellaria media",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Siembra y brotación",
      "Emergencia",
      "Desarrollo vegetativo / crecimiento del follaje",
      "Aporque",
      "Inicio de tuberización / estolonización",
      "Floración",
      "Llenado del tubérculo",
      "Senescencia, madurez y cosecha"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://www.potatopro.com/es/node/10232",
      "https://www.scielo.sa.cr/pdf/am/v33n3/1659-1321-am-33-03-00008.pdf",
      "https://revistas.unal.edu.co/index.php/agrocol/article/download/18069/18986/58322"
    ]
  },
  {
    "id": "cafe",
    "nombre": "Café",
    "plagas": [
      {
        "comun": "Broca del café",
        "cientifico": "Hypothenemus hampei",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Minador de la hoja",
        "cientifico": "Leucoptera coffeella",
        "objetivo": "minadores"
      },
      {
        "comun": "Cochinillas harinosas de la raíz",
        "cientifico": "Puto barberi y otras",
        "objetivo": "chupadores"
      },
      {
        "comun": "Araña roja / ácaro rojo",
        "cientifico": "Oligonychus yothersi",
        "objetivo": "acaros"
      },
      {
        "comun": "Chisas",
        "cientifico": "Phyllophaga spp.",
        "objetivo": "coleopteros"
      }
    ],
    "enfermedades": [
      {
        "comun": "Roya del cafeto",
        "agente": "Hemileia vastatrix",
        "tipo": "hongo",
        "objetivo": "roya"
      },
      {
        "comun": "Ojo de gallo / gotera",
        "agente": "Mycena citricolor",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Mancha de hierro",
        "agente": "Cercospora coffeicola",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Mal rosado",
        "agente": "Erythricium salmonicolor (Corticium salmonicolor)",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Llaga macana",
        "agente": "Ceratocystis fimbriata",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Llaga negra de la raíz",
        "agente": "Rosellinia bunodes",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      }
    ],
    "malezas": [
      {
        "comun": "Suelda con suelda",
        "cientifico": "Commelina diffusa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Sanguinaria / lengua de vaca menor",
        "cientifico": "Drymaria cordata",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Botón de oro",
        "cientifico": "Bidens pilosa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Pasto de rastrojo",
        "cientifico": "Digitaria horizontalis",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Pasto grama / gramalote",
        "cientifico": "Axonopus compressus / Paspalum spp.",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Cortadera",
        "cientifico": "Cyperus spp. / Kyllinga brevifolia",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      }
    ],
    "etapas": [
      "Almácigo / germinación y chapola",
      "Siembra y establecimiento del lote",
      "Crecimiento vegetativo y formación de ramas",
      "Floración (principal y mitaca)",
      "Desarrollo y llenado del fruto (periodo crítico de broca: 90-120 días después de la floración principal según Cenicafé)",
      "Maduración y cosecha (principal y traviesa)",
      "Renovación por zoca"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://cenicafe.org/es/index.php/cultivemos_cafe/manejo_integrado_de_plagas",
      "https://publicaciones.cenicafe.org/index.php/avances_tecnicos/article/view/214",
      "https://biblioteca.cenicafe.org/bitstream/10778/4340/1/cenbook-0026_24.pdf",
      "https://publicaciones.cenicafe.org/index.php/libros_manuales/article/view/833"
    ]
  },
  {
    "id": "platano-banano",
    "nombre": "Plátano y banano",
    "plagas": [
      {
        "comun": "Picudo negro",
        "cientifico": "Cosmopolites sordidus",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Picudo rayado",
        "cientifico": "Metamasius hemipterus",
        "objetivo": "coleopteros"
      },
      {
        "comun": "Trips de la mancha roja",
        "cientifico": "Chaetanaphothrips orchidii",
        "objetivo": "trips"
      },
      {
        "comun": "Nematodo barrenador",
        "cientifico": "Radopholus similis",
        "objetivo": null
      },
      {
        "comun": "Cochinilla harinosa",
        "cientifico": "Dysmicoccus brevipes",
        "objetivo": "chupadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Sigatoka negra",
        "agente": "Pseudocercospora fijiensis (Mycosphaerella fijiensis)",
        "tipo": "hongo",
        "objetivo": "sigatoka"
      },
      {
        "comun": "Sigatoka amarilla",
        "agente": "Pseudocercospora musae",
        "tipo": "hongo",
        "objetivo": "sigatoka"
      },
      {
        "comun": "Marchitez por Fusarium / mal de Panamá (raza 4 tropical, vigilancia ICA)",
        "agente": "Fusarium oxysporum f. sp. cubense",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Moko",
        "agente": "Ralstonia solanacearum raza 2",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Pudrición blanda del cormo",
        "agente": "Pectobacterium spp.",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Pudrición de corona",
        "agente": "Colletotrichum musae, Fusarium spp. (complejo)",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      }
    ],
    "malezas": [
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Caminadora",
        "cientifico": "Rottboellia cochinchinensis",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Gramalote",
        "cientifico": "Paspalum conjugatum / Axonopus compressus",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Suelda con suelda",
        "cientifico": "Commelina diffusa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Dormidera",
        "cientifico": "Mimosa pudica",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Bledo",
        "cientifico": "Amaranthus spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Siembra / establecimiento (colino o vitroplanta)",
      "Crecimiento vegetativo y emisión foliar",
      "Diferenciación floral",
      "Parición / emisión del racimo (floración)",
      "Llenado del racimo (embolse en banano)",
      "Cosecha",
      "Sucesión / hijo de reemplazo"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "banano-platano",
    "fuentes": [
      "https://www.ica.gov.co/areas/agricola/servicios/epidemiologia-agricola/fusarium-raza-4-tropical/material_divulgativo/acciones_prevencion_focr4t_caribecolombiano_2017-2.aspx",
      "https://www.portalfruticola.com/noticias/2023/06/19/con-exito-y-bajo-control-el-fusariumr4t-en-colombia/",
      "https://www.agronegocios.co/agricultura/ica-augura-y-asbama-firman-convenios-para-prevencion-y-manejo-del-fusarium-r4t-2906066",
      "https://www.agronegocios.co/produccion-de-platano"
    ]
  },
  {
    "id": "cana",
    "nombre": "Caña de azúcar",
    "plagas": [
      {
        "comun": "Barrenadores del tallo",
        "cientifico": "Diatraea saccharalis, D. busckella, D. tabernella",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Salivazo",
        "cientifico": "Aeneolamia varia",
        "objetivo": "chupadores"
      },
      {
        "comun": "Salivazo de la caña panelera",
        "cientifico": "Mahanarva bipars",
        "objetivo": "chupadores"
      },
      {
        "comun": "Chinche de encaje",
        "cientifico": "Leptodictya tabida",
        "objetivo": "chupadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Roya café",
        "agente": "Puccinia melanocephala",
        "tipo": "hongo",
        "objetivo": "roya"
      },
      {
        "comun": "Roya naranja",
        "agente": "Puccinia kuehnii",
        "tipo": "hongo",
        "objetivo": "roya"
      },
      {
        "comun": "Carbón",
        "agente": "Sporisorium scitamineum (Ustilago scitaminea)",
        "tipo": "hongo",
        "objetivo": null
      },
      {
        "comun": "Escaldadura de la hoja",
        "agente": "Xanthomonas albilineans",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Raquitismo de las socas",
        "agente": "Leifsonia xyli subsp. xyli",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Amarillamiento foliar",
        "agente": "Sugarcane yellow leaf virus (SCYLV)",
        "tipo": "virus",
        "objetivo": null
      }
    ],
    "malezas": [
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Pasto Johnson",
        "cientifico": "Sorghum halepense",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Caminadora",
        "cientifico": "Rottboellia cochinchinensis",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Liendre de puerco",
        "cientifico": "Echinochloa colona",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Batatilla / bejuco",
        "cientifico": "Ipomoea spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Bledo",
        "cientifico": "Amaranthus dubius",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Siembra y brotación",
      "Macollamiento",
      "Gran crecimiento / elongación del tallo",
      "Maduración (con o sin madurantes)",
      "Cosecha y corte",
      "Rebrote de soca"
    ],
    "escenarioMalezas": "cana",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://www.cenicana.org/estrategias-para-el-manejo-de-las-principales-plagas-de-la-cana-de-azucar/",
      "https://www.cenicana.org/pdf_privado/documentos_no_seriados/libro_el_cultivo_cana/libro_p265-293.pdf",
      "https://www.cenicana.org/pdf_privado/carta_trimestral/ct2010/ct3y4_10/ct3y4_10_p24-29.pdf",
      "https://www.cenicana.org/pdf_privado/serie_tecnica/st_30/st_30.pdf",
      "https://www.cenicana.org/pdf_privado/carta_trimestral/ct2002/ct3y4_02/ct3y4-2002.pdf"
    ]
  },
  {
    "id": "tomate",
    "nombre": "Tomate",
    "plagas": [
      {
        "comun": "Polilla del tomate",
        "cientifico": "Tuta absoluta",
        "objetivo": "minadores"
      },
      {
        "comun": "Mosca blanca",
        "cientifico": "Bemisia tabaci / Trialeurodes vaporariorum",
        "objetivo": "chupadores"
      },
      {
        "comun": "Perforador del fruto",
        "cientifico": "Neoleucinodes elegantalis",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Minador de la hoja",
        "cientifico": "Liriomyza huidobrensis",
        "objetivo": "minadores"
      },
      {
        "comun": "Araña roja",
        "cientifico": "Tetranychus urticae",
        "objetivo": "acaros"
      },
      {
        "comun": "Trips",
        "cientifico": "Frankliniella occidentalis",
        "objetivo": "trips"
      }
    ],
    "enfermedades": [
      {
        "comun": "Gota / tizón tardío",
        "agente": "Phytophthora infestans",
        "tipo": "oomiceto",
        "objetivo": "oomicetos"
      },
      {
        "comun": "Tizón temprano",
        "agente": "Alternaria solani",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Marchitez por Fusarium",
        "agente": "Fusarium oxysporum f. sp. lycopersici",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Moho de la hoja",
        "agente": "Passalora fulva (Cladosporium fulvum)",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Marchitez bacteriana",
        "agente": "Ralstonia solanacearum",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Enfermedades por begomovirus (transmitidas por mosca blanca)",
        "agente": "Begomovirus (complejo)",
        "tipo": "virus",
        "objetivo": null
      }
    ],
    "malezas": [
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Bledo",
        "cientifico": "Amaranthus spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Hierba mora",
        "cientifico": "Solanum nigrum",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Verdolaga",
        "cientifico": "Portulaca oleracea",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Liendre de puerco",
        "cientifico": "Echinochloa colona",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Pasto guarda",
        "cientifico": "Digitaria sanguinalis",
        "tipo": "graminea",
        "objetivo": "gramineas"
      }
    ],
    "etapas": [
      "Semillero y plántula",
      "Trasplante y establecimiento",
      "Crecimiento vegetativo (tutorado)",
      "Floración",
      "Cuajado del fruto",
      "Llenado y desarrollo del fruto",
      "Maduración y cosecha continua"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://repository.agrosavia.co/server/api/core/bitstreams/c3a9a26c-dd84-4bc4-824a-5239e71d0fb8/content",
      "https://vivo.agrosavia.co/display/proinv724",
      "https://repository.agrosavia.co/handle/20.500.12324/1172",
      "https://vivo.agrosavia.co/display/proinv39"
    ]
  },
  {
    "id": "hortalizas",
    "nombre": "Hortalizas de hoja y crucíferas",
    "plagas": [
      {
        "comun": "Palomilla dorso de diamante",
        "cientifico": "Plutella xylostella",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Falso medidor",
        "cientifico": "Trichoplusia ni",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Gusano ejército",
        "cientifico": "Spodoptera exigua",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Pulgón de la col",
        "cientifico": "Brevicoryne brassicae",
        "objetivo": "chupadores"
      },
      {
        "comun": "Pulgón verde del durazno",
        "cientifico": "Myzus persicae",
        "objetivo": "chupadores"
      },
      {
        "comun": "Minador de la hoja",
        "cientifico": "Liriomyza huidobrensis",
        "objetivo": "minadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Hernia de las crucíferas",
        "agente": "Plasmodiophora brassicae",
        "tipo": "protista",
        "objetivo": null
      },
      {
        "comun": "Mildeo velloso de las crucíferas",
        "agente": "Hyaloperonospora brassicae",
        "tipo": "oomiceto",
        "objetivo": "mildeo-velloso"
      },
      {
        "comun": "Mildeo velloso de la lechuga",
        "agente": "Bremia lactucae",
        "tipo": "oomiceto",
        "objetivo": "mildeo-velloso"
      },
      {
        "comun": "Alternariosis / mancha negra",
        "agente": "Alternaria brassicicola",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Pudrición negra",
        "agente": "Xanthomonas campestris pv. campestris",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Esclerotinia / moho blanco",
        "agente": "Sclerotinia sclerotiorum",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      }
    ],
    "malezas": [
      {
        "comun": "Guasca",
        "cientifico": "Galinsoga parviflora",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Pajarera / hierba de pollo",
        "cientifico": "Stellaria media",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Bledo",
        "cientifico": "Amaranthus spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Bolsa de pastor",
        "cientifico": "Capsella bursa-pastoris",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Poa",
        "cientifico": "Poa annua",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      }
    ],
    "etapas": [
      "Semillero",
      "Trasplante y establecimiento",
      "Desarrollo vegetativo (roseta)",
      "Formación de cabeza / pella / cogollo",
      "Madurez comercial y cosecha",
      "Espigado (floración prematura) en condiciones de estrés"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": []
  },
  {
    "id": "citricos",
    "nombre": "Cítricos",
    "plagas": [
      {
        "comun": "Psílido asiático de los cítricos (vector del HLB)",
        "cientifico": "Diaphorina citri",
        "objetivo": "chupadores"
      },
      {
        "comun": "Minador de la hoja de los cítricos",
        "cientifico": "Phyllocnistis citrella",
        "objetivo": "minadores"
      },
      {
        "comun": "Ácaro del tostado / de la herrumbre",
        "cientifico": "Phyllocoptruta oleivora",
        "objetivo": "acaros"
      },
      {
        "comun": "Ácaro blanco",
        "cientifico": "Polyphagotarsonemus latus",
        "objetivo": "acaros"
      },
      {
        "comun": "Moscas de la fruta",
        "cientifico": "Anastrepha spp.",
        "objetivo": null
      },
      {
        "comun": "Hormiga arriera",
        "cientifico": "Atta cephalotes",
        "objetivo": "masticadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Huanglongbing (HLB) / enverdecimiento",
        "agente": "Candidatus Liberibacter asiaticus",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Gomosis y pudrición de raíz",
        "agente": "Phytophthora parasitica / P. citrophthora",
        "tipo": "oomiceto",
        "objetivo": "oomicetos"
      },
      {
        "comun": "Antracnosis",
        "agente": "Colletotrichum gloeosporioides",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Mancha grasienta",
        "agente": "Mycosphaerella citri",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Sarna / verrugosis",
        "agente": "Elsinoe fawcettii",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Tristeza de los cítricos",
        "agente": "Citrus tristeza virus (CTV)",
        "tipo": "virus",
        "objetivo": null
      }
    ],
    "malezas": [
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Pasto bermuda",
        "cientifico": "Cynodon dactylon",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Gramalote",
        "cientifico": "Paspalum spp.",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Pasto Johnson",
        "cientifico": "Sorghum halepense",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Botón de oro",
        "cientifico": "Bidens pilosa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Bledo",
        "cientifico": "Amaranthus spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Vivero e injerto",
      "Establecimiento",
      "Brotación vegetativa (flush)",
      "Floración (azahar)",
      "Cuajado del fruto",
      "Crecimiento del fruto",
      "Maduración y cosecha"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://editorial.agrosavia.co/index.php/publicaciones/catalog/book/438",
      "https://vivo.agrosavia.co/display/cali489",
      "https://revistacta.agrosavia.co/html/1552/"
    ]
  },
  {
    "id": "aguacate",
    "nombre": "Aguacate",
    "plagas": [
      {
        "comun": "Barrenador del hueso / picudo del aguacate",
        "cientifico": "Heilipus lauri (y H. trifasciatus)",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Pasador del fruto",
        "cientifico": "Stenoma catenifer",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Trips del aguacate",
        "cientifico": "Heliothrips haemorrhoidalis",
        "objetivo": "trips"
      },
      {
        "comun": "Ácaro del aguacate",
        "cientifico": "Oligonychus punicae",
        "objetivo": "acaros"
      },
      {
        "comun": "Cochinilla de escama",
        "cientifico": "Hemiberlesia lataniae",
        "objetivo": "chupadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Pudrición radical / tristeza del aguacatero",
        "agente": "Phytophthora cinnamomi",
        "tipo": "oomiceto",
        "objetivo": "oomicetos"
      },
      {
        "comun": "Antracnosis",
        "agente": "Colletotrichum gloeosporioides (complejo)",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Roña / verrugosis",
        "agente": "Sphaceloma perseae",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Mancha angular / cercospora",
        "agente": "Pseudocercospora purpurea",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Pudrición del pedúnculo",
        "agente": "Lasiodiplodia theobromae",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      }
    ],
    "malezas": [
      {
        "comun": "Kikuyo",
        "cientifico": "Cenchrus clandestinus",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Gramalote",
        "cientifico": "Paspalum spp.",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Botón de oro",
        "cientifico": "Bidens pilosa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Lengua de vaca",
        "cientifico": "Rumex crispus",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Vivero e injerto",
      "Establecimiento y formación",
      "Brotación vegetativa (flush)",
      "Floración",
      "Cuajado",
      "Crecimiento del fruto",
      "Madurez fisiológica (materia seca) y cosecha"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://www.agronegocios.co/agricultura/conozca-y-controle-mas-de-10-plagas-que-invaden-el-cultivo-de-aguacate-2621871",
      "https://www.portalfruticola.com/?p=38199",
      "https://repository.unad.edu.co/jspui/bitstream/10596/21581/1/1026131225.pdf",
      "https://www.ica.gov.co/Areas/Agricola/Servicios/Epidemiologia-Agricola/BOLETINES/Departamentales/2012/BOLETIN_AGUACATE_TOLIMA.aspx"
    ]
  },
  {
    "id": "flores",
    "nombre": "Flores y ornamentales",
    "plagas": [
      {
        "comun": "Trips",
        "cientifico": "Frankliniella occidentalis",
        "objetivo": "trips"
      },
      {
        "comun": "Araña roja",
        "cientifico": "Tetranychus urticae",
        "objetivo": "acaros"
      },
      {
        "comun": "Mosca blanca",
        "cientifico": "Trialeurodes vaporariorum",
        "objetivo": "chupadores"
      },
      {
        "comun": "Minador",
        "cientifico": "Liriomyza huidobrensis",
        "objetivo": "minadores"
      },
      {
        "comun": "Pulgones",
        "cientifico": "Macrosiphum rosae / Myzus persicae",
        "objetivo": "chupadores"
      },
      {
        "comun": "Orugas defoliadoras",
        "cientifico": "Spodoptera spp.",
        "objetivo": "lepidopteros"
      }
    ],
    "enfermedades": [
      {
        "comun": "Botrytis / moho gris",
        "agente": "Botrytis cinerea",
        "tipo": "hongo",
        "objetivo": "botrytis"
      },
      {
        "comun": "Mildeo velloso de la rosa",
        "agente": "Peronospora sparsa",
        "tipo": "oomiceto",
        "objetivo": "mildeo-velloso"
      },
      {
        "comun": "Mildeo polvoso",
        "agente": "Podosphaera pannosa",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Marchitez vascular del clavel",
        "agente": "Fusarium oxysporum f. sp. dianthi",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Roya blanca del crisantemo",
        "agente": "Puccinia horiana",
        "tipo": "hongo",
        "objetivo": "roya"
      },
      {
        "comun": "Pudrición radical",
        "agente": "Pythium spp. / Phytophthora spp.",
        "tipo": "oomiceto",
        "objetivo": "oomicetos"
      }
    ],
    "malezas": [
      {
        "comun": "Pajarera",
        "cientifico": "Stellaria media",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Oxalis / trébol",
        "cientifico": "Oxalis spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Diente de león",
        "cientifico": "Taraxacum officinale",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Poa",
        "cientifico": "Poa annua",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Kikuyo (bordes y caminos)",
        "cientifico": "Cenchrus clandestinus",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Cortadera",
        "cientifico": "Cyperus spp.",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      }
    ],
    "etapas": [
      "Propagación y enraizamiento de esquejes",
      "Establecimiento",
      "Crecimiento vegetativo / pinch",
      "Inducción y formación de botón",
      "Apertura y punto de corte",
      "Poscosecha y cuarto frío"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11323744/"
    ]
  },
  {
    "id": "pastos",
    "nombre": "Pastos y potreros",
    "plagas": [
      {
        "comun": "Salivazo / mión de los pastos",
        "cientifico": "Aeneolamia varia, Zulia carbonaria",
        "objetivo": "chupadores"
      },
      {
        "comun": "Gusano cogollero / ejército",
        "cientifico": "Spodoptera frugiperda",
        "objetivo": "cogolleros"
      },
      {
        "comun": "Langosta brasilera (Llanos)",
        "cientifico": "Rhammatocerus schistocercoides",
        "objetivo": "masticadores"
      },
      {
        "comun": "Hormiga arriera",
        "cientifico": "Atta cephalotes",
        "objetivo": "masticadores"
      },
      {
        "comun": "Chisas",
        "cientifico": "Phyllophaga spp.",
        "objetivo": "coleopteros"
      }
    ],
    "enfermedades": [
      {
        "comun": "Tizón foliar por Rhizoctonia (Brachiaria)",
        "agente": "Rhizoctonia solani",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Royas de los pastos",
        "agente": "Puccinia spp.",
        "tipo": "hongo",
        "objetivo": "roya"
      },
      {
        "comun": "Manchas foliares",
        "agente": "Bipolaris spp. / Drechslera spp.",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Cornezuelo",
        "agente": "Claviceps spp.",
        "tipo": "hongo",
        "objetivo": null
      }
    ],
    "malezas": [
      {
        "comun": "Lengua de vaca",
        "cientifico": "Rumex crispus",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Escoba / escobilla",
        "cientifico": "Sida acuta",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Dormidera / zarza",
        "cientifico": "Mimosa pudica",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Helecho marranero (helecho, tratado como hoja ancha)",
        "cientifico": "Pteridium aquilinum",
        "tipo": "hoja-ancha",
        "objetivo": "helechos"
      },
      {
        "comun": "Cortadera / cebolleta",
        "cientifico": "Cyperus ferax / Cyperus spp.",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Rabo de zorro / paja",
        "cientifico": "Sporobolus indicus",
        "tipo": "graminea",
        "objetivo": "gramineas"
      }
    ],
    "etapas": [
      "Establecimiento (siembra y germinación)",
      "Macollamiento y cobertura",
      "Crecimiento / punto óptimo de pastoreo",
      "Floración y semillacion",
      "Pastoreo o corte",
      "Descanso y rebrote (rotación)",
      "Renovación o recuperación del potrero"
    ],
    "escenarioMalezas": "potreros",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://revistacta.agrosavia.co/index.php/revista/article/view/173",
      "https://www.cenicana.org/estrategias-para-el-manejo-de-las-principales-plagas-de-la-cana-de-azucar/"
    ]
  },
  {
    "id": "algodon",
    "nombre": "Algodón",
    "plagas": [
      {
        "comun": "Picudo del algodonero",
        "cientifico": "Anthonomus grandis",
        "objetivo": "coleopteros"
      },
      {
        "comun": "Gusano bellotero / capullero",
        "cientifico": "Helicoverpa zea",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Gusano rosado",
        "cientifico": "Pectinophora gossypiella",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Falso medidor",
        "cientifico": "Alabama argillacea",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Mosca blanca",
        "cientifico": "Bemisia tabaci",
        "objetivo": "chupadores"
      },
      {
        "comun": "Pulgón del algodonero",
        "cientifico": "Aphis gossypii",
        "objetivo": "chupadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Marchitez por Fusarium",
        "agente": "Fusarium oxysporum f. sp. vasinfectum",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Marchitez por Verticillium",
        "agente": "Verticillium dahliae",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Mancha angular / tizón bacteriano",
        "agente": "Xanthomonas citri pv. malvacearum",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Mancha foliar por Alternaria",
        "agente": "Alternaria macrospora",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Damping-off / mal de semilleros",
        "agente": "Rhizoctonia solani, Pythium spp.",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      }
    ],
    "malezas": [
      {
        "comun": "Liendre de puerco",
        "cientifico": "Echinochloa colona",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Pasto Johnson",
        "cientifico": "Sorghum halepense",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Bledo",
        "cientifico": "Amaranthus dubius",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Batatilla",
        "cientifico": "Ipomoea spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Verdolaga de playa / vidriosa",
        "cientifico": "Trianthema portulacastrum",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Siembra y emergencia",
      "Plántula",
      "Crecimiento vegetativo",
      "Aparición de botones florales (cuadros)",
      "Floración",
      "Formación de capsulas (bellotas)",
      "Apertura de capsulas",
      "Cosecha"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": []
  },
  {
    "id": "cacao",
    "nombre": "Cacao",
    "plagas": [
      {
        "comun": "Chinche del cacao / monalonion",
        "cientifico": "Monalonion dissimulatum",
        "objetivo": "chupadores"
      },
      {
        "comun": "Barrenador de la semilla / mazorca",
        "cientifico": "Carmenta foraseminis",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Trips del cacao",
        "cientifico": "Selenothrips rubrocinctus",
        "objetivo": "trips"
      },
      {
        "comun": "Escarabajos ambrosiales",
        "cientifico": "Xyleborus spp.",
        "objetivo": "coleopteros"
      },
      {
        "comun": "Hormiga arriera",
        "cientifico": "Atta cephalotes",
        "objetivo": "masticadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Moniliasis",
        "agente": "Moniliophthora roreri",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Escoba de bruja",
        "agente": "Moniliophthora perniciosa",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Mazorca negra",
        "agente": "Phytophthora palmivora / P. capsici",
        "tipo": "oomiceto",
        "objetivo": "oomicetos"
      },
      {
        "comun": "Mal del machete",
        "agente": "Ceratocystis cacaofunesta",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Muerte descendente",
        "agente": "Lasiodiplodia theobromae",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      }
    ],
    "malezas": [
      {
        "comun": "Gramalote",
        "cientifico": "Paspalum conjugatum",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Suelda con suelda",
        "cientifico": "Commelina diffusa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Guaco",
        "cientifico": "Mikania micrantha",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Escoba",
        "cientifico": "Sida acuta",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Cortadera",
        "cientifico": "Cyperus spp.",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      }
    ],
    "etapas": [
      "Vivero (almácigo)",
      "Establecimiento y sombrío",
      "Formación y poda",
      "Floración (cojines florales)",
      "Cuajado de frutos (cherelles)",
      "Desarrollo de la mazorca",
      "Maduración y cosecha",
      "Poda de mantenimiento"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://www.redjurista.com/Compilaciones2018/tablas_ProyectosNormas/2017/12/15/pr_ica_0005aj_2017.pdf"
    ]
  },
  {
    "id": "palma",
    "nombre": "Palma de aceite",
    "plagas": [
      {
        "comun": "Picudo de la palma",
        "cientifico": "Rhynchophorus palmarum",
        "objetivo": "coleopteros"
      },
      {
        "comun": "Chinche de encaje",
        "cientifico": "Leptopharsa gibbicarina",
        "objetivo": "chupadores"
      },
      {
        "comun": "Barrenador de raíces",
        "cientifico": "Sagalassa valida",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Escarabajo rinoceronte",
        "cientifico": "Strategus aloeus",
        "objetivo": "coleopteros"
      },
      {
        "comun": "Gusano cabrito / defoliador",
        "cientifico": "Opsiphanes cassina",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Gusano de la hoja (limacódido)",
        "cientifico": "Euprosterna elaeasa",
        "objetivo": "lepidopteros"
      }
    ],
    "enfermedades": [
      {
        "comun": "Pudrición del cogollo (PC)",
        "agente": "Phytophthora palmivora",
        "tipo": "oomiceto",
        "objetivo": "oomicetos"
      },
      {
        "comun": "Marchitez sorpresiva",
        "agente": "Phytomonas staheli",
        "tipo": "protista",
        "objetivo": null
      },
      {
        "comun": "Pestalotiopsis / mancha foliar",
        "agente": "Pestalotiopsis palmarum",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Pudrición basal del estípite",
        "agente": "Ganoderma zonatum",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      }
    ],
    "malezas": [
      {
        "comun": "Gramalote",
        "cientifico": "Paspalum conjugatum",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Pasto de mata",
        "cientifico": "Axonopus compressus",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Guaco",
        "cientifico": "Mikania micrantha",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Escoba",
        "cientifico": "Sida acuta",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Suelda con suelda",
        "cientifico": "Commelina diffusa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Previvero y vivero (12-14 meses aprox.)",
      "Siembra y establecimiento",
      "Etapa inmadura (crecimiento vegetativo)",
      "Inicio de cosecha (aprox. 24-36 meses)",
      "Producción adulta (racimos continuos)",
      "Renovación / resiembra"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://publicaciones.fedepalma.org/index.php/palmicultor/article/download/9180/9171",
      "https://publicaciones.fedepalma.org/index.php/boletines/article/download/10508/10498",
      "https://repositorio.fedepalma.org/server/api/core/bitstreams/b1649783-f6bf-4848-a4da-14192a4b6379/content",
      "https://publicaciones.fedepalma.org/index.php/palmas/article/download/1471/1471"
    ]
  },
  {
    "id": "frutales-andinos",
    "nombre": "Frutales andinos (mora, lulo, tomate de árbol)",
    "plagas": [
      {
        "comun": "Perforador del fruto",
        "cientifico": "Neoleucinodes elegantalis",
        "objetivo": "barrenadores"
      },
      {
        "comun": "Moscas de la fruta",
        "cientifico": "Anastrepha spp.",
        "objetivo": null
      },
      {
        "comun": "Trips",
        "cientifico": "Frankliniella occidentalis",
        "objetivo": "trips"
      },
      {
        "comun": "Araña roja",
        "cientifico": "Tetranychus urticae",
        "objetivo": "acaros"
      },
      {
        "comun": "Mosca blanca",
        "cientifico": "Trialeurodes vaporariorum",
        "objetivo": "chupadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Gota / tizón (lulo y tomate de árbol)",
        "agente": "Phytophthora infestans",
        "tipo": "oomiceto",
        "objetivo": "oomicetos"
      },
      {
        "comun": "Antracnosis",
        "agente": "Colletotrichum spp.",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Marchitez vascular",
        "agente": "Fusarium oxysporum",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Mildeo velloso de la mora",
        "agente": "Peronospora sparsa",
        "tipo": "oomiceto",
        "objetivo": "mildeo-velloso"
      },
      {
        "comun": "Moho gris de la mora",
        "agente": "Botrytis cinerea",
        "tipo": "hongo",
        "objetivo": "botrytis"
      }
    ],
    "malezas": [
      {
        "comun": "Kikuyo",
        "cientifico": "Cenchrus clandestinus",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Lengua de vaca",
        "cientifico": "Rumex crispus",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Botón de oro",
        "cientifico": "Bidens pilosa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Guasca",
        "cientifico": "Galinsoga parviflora",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Cortadera",
        "cientifico": "Cyperus / Kyllinga spp.",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      }
    ],
    "etapas": [
      "Vivero y siembra",
      "Establecimiento",
      "Crecimiento vegetativo y tutorado / poda de formación",
      "Floración",
      "Cuajado",
      "Desarrollo del fruto",
      "Maduración y cosecha escalonada"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://revistas.unal.edu.co/index.php/acta_agronomica/article/view/16273/17188",
      "https://encolombia.com/economia/noticias-agroindustria/variedades-resistentes-y-metodos-de-control-de-enfermedad-del-lulo/",
      "https://agris.fao.org/search/en/records/67dab60b677d8be0233b49c7"
    ]
  },
  {
    "id": "frijol",
    "nombre": "Fríjol",
    "plagas": [
      {
        "comun": "Chicharrita",
        "cientifico": "Empoasca kraemeri",
        "objetivo": "chupadores"
      },
      {
        "comun": "Mosca blanca",
        "cientifico": "Bemisia tabaci",
        "objetivo": "chupadores"
      },
      {
        "comun": "Trips",
        "cientifico": "Thrips palmi",
        "objetivo": "trips"
      },
      {
        "comun": "Picudo de la vaina",
        "cientifico": "Apion godmani",
        "objetivo": "coleopteros"
      },
      {
        "comun": "Araña roja",
        "cientifico": "Tetranychus urticae",
        "objetivo": "acaros"
      },
      {
        "comun": "Minador de la hoja",
        "cientifico": "Liriomyza huidobrensis",
        "objetivo": "minadores"
      }
    ],
    "enfermedades": [
      {
        "comun": "Antracnosis",
        "agente": "Colletotrichum lindemuthianum",
        "tipo": "hongo",
        "objetivo": "hongos-foliares"
      },
      {
        "comun": "Roya",
        "agente": "Uromyces appendiculatus",
        "tipo": "hongo",
        "objetivo": "roya"
      },
      {
        "comun": "Mancha angular",
        "agente": "Pseudocercospora griseola",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Bacteriosis común",
        "agente": "Xanthomonas axonopodis pv. phaseoli",
        "tipo": "bacteria",
        "objetivo": null
      },
      {
        "comun": "Pudriciones radicales",
        "agente": "Fusarium solani f. sp. phaseoli, Rhizoctonia solani",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Moho blanco",
        "agente": "Sclerotinia sclerotiorum",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      }
    ],
    "malezas": [
      {
        "comun": "Liendre de puerco",
        "cientifico": "Echinochloa colona",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Pasto guarda",
        "cientifico": "Digitaria sanguinalis",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      },
      {
        "comun": "Bledo",
        "cientifico": "Amaranthus spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Botón de oro",
        "cientifico": "Bidens pilosa",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Batatilla",
        "cientifico": "Ipomoea spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      }
    ],
    "etapas": [
      "Germinación y emergencia (V0-V1)",
      "Hojas primarias y trifoliadas (V2-V4)",
      "Prefloración (R5)",
      "Floración (R6)",
      "Formación de vainas (R7)",
      "Llenado de vainas (R8)",
      "Maduración y cosecha (R9)"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": [
      "https://editorial.agrosavia.co/index.php/publicaciones/catalog/book/195",
      "https://repository.agrosavia.co/items/ea24eb90-a17c-4700-91f7-a3515b9714f3",
      "https://vivo.agrosavia.co/display/rete2104"
    ]
  },
  {
    "id": "cebolla",
    "nombre": "Cebolla",
    "plagas": [
      {
        "comun": "Trips de la cebolla",
        "cientifico": "Thrips tabaci",
        "objetivo": "trips"
      },
      {
        "comun": "Mosca minadora",
        "cientifico": "Liriomyza huidobrensis",
        "objetivo": "minadores"
      },
      {
        "comun": "Gusano ejército",
        "cientifico": "Spodoptera exigua",
        "objetivo": "lepidopteros"
      },
      {
        "comun": "Gusano trozador",
        "cientifico": "Agrotis ipsilon",
        "objetivo": "trozadores"
      },
      {
        "comun": "Nematodo del tallo y bulbo",
        "cientifico": "Ditylenchus dipsaci",
        "objetivo": null
      }
    ],
    "enfermedades": [
      {
        "comun": "Mildeo velloso",
        "agente": "Peronospora destructor",
        "tipo": "oomiceto",
        "objetivo": "mildeo-velloso"
      },
      {
        "comun": "Mancha púrpura",
        "agente": "Alternaria porri",
        "tipo": "hongo",
        "objetivo": "manchas"
      },
      {
        "comun": "Pudrición blanca",
        "agente": "Sclerotium cepivorum",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Pudrición basal / marchitez por Fusarium",
        "agente": "Fusarium oxysporum f. sp. cepae",
        "tipo": "hongo",
        "objetivo": "raiz-suelo"
      },
      {
        "comun": "Roya de la cebolla",
        "agente": "Puccinia allii",
        "tipo": "hongo",
        "objetivo": "roya"
      },
      {
        "comun": "Moho gris / tizón de la hoja",
        "agente": "Botrytis squamosa",
        "tipo": "hongo",
        "objetivo": "botrytis"
      }
    ],
    "malezas": [
      {
        "comun": "Guasca",
        "cientifico": "Galinsoga parviflora",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Pajarera",
        "cientifico": "Stellaria media",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Bledo",
        "cientifico": "Amaranthus spp.",
        "tipo": "hoja-ancha",
        "objetivo": "hoja-ancha"
      },
      {
        "comun": "Poa",
        "cientifico": "Poa annua",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Kikuyo",
        "cientifico": "Cenchrus clandestinus",
        "tipo": "graminea",
        "objetivo": "gramineas"
      },
      {
        "comun": "Coquito",
        "cientifico": "Cyperus rotundus",
        "tipo": "ciperacea",
        "objetivo": "ciperaceas"
      }
    ],
    "etapas": [
      "Semillero / germinación",
      "Trasplante o siembra de hijuelos",
      "Crecimiento foliar (vegetativo)",
      "Inicio de bulbificación",
      "Engrosamiento del bulbo",
      "Madurez (doblado del follaje)",
      "Cosecha y curado"
    ],
    "escenarioMalezas": "cultivo-hoja-ancha",
    "escenarioEnfermedades": "general",
    "fuentes": []
  }
];
