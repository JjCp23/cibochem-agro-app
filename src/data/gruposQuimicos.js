/**
 * Grupos químicos de resistencia (IRAC, FRAC, HRAC) tal como los resume la
 * guía de campo del portafolio: sitio de acción, riesgo, otras moléculas del
 * grupo que se venden con otras marcas, y cuándo recomendar o no.
 *
 * Clave "COMITÉ:número". Regla de cruce: comparten el número dentro del mismo
 * comité; la letra y la familia química no cambian eso.
 */
export const GRUPOS_QUIMICOS = {
  "IRAC:1": {
    "nombre": "Inhibidores de acetilcolinesterasa",
    "clase": "carbamatos y organofosforados",
    "subgrupos": "1A carbamatos · 1B organofosforados (no hay 1B en el portafolio)",
    "sitio": "Enzima acetilcolinesterasa (AChE), en la sinapsis",
    "como": "Bloquean la enzima que apaga la señal nerviosa: la acetilcolina se acumula y la neurona no deja de disparar. El carbamato se une de forma reversible y el organofosforado casi irreversible, pero el sitio es el mismo: la resistencia a uno alcanza al otro.",
    "riesgo": "alto",
    "otrasMoleculas": "organofosforados (1B) como clorpirifos, profenofos, acefato, dimetoato, malatión y diazinón; carbamatos (1A) como carbofurán, tiodicarb, carbaril y oxamil.",
    "recomiendaSi": "hay población alta y necesitas choque más efecto ovicida en un solo pase, como herramienta de rescate.",
    "noRecomiendesSi": "el lote viene de un organofosforado o de otro carbamato; es un programa MIP o hay benéficos que cuidar; no hay equipo de protección completo."
  },
  "IRAC:3": {
    "nombre": "Piretroides",
    "clase": "piretroides",
    "subgrupos": "3A piretroides y piretrinas",
    "sitio": "Canal de sodio del axón: lo mantiene abierto",
    "como": "Retrasan el cierre del canal y el nervio descarga sin parar: volteo en minutos. La mutación kdr del canal y la resistencia metabólica (esterasas, oxidasas) afectan a todo el grupo por igual: si falla uno, fallan todos.",
    "riesgo": "alto",
    "otrasMoleculas": "zeta-cipermetrina, alfa-cipermetrina, beta-ciflutrina, permetrina, esfenvalerato, fenpropatrín y piretrinas naturales.",
    "recomiendaSi": "necesitas derribar adultos, chinches, picudos o trozadores ya, y puedes aplicar en fresco (mañana o atardecer).",
    "noRecomiendesSi": "hay ácaros en el lote (brote secundario); Spodoptera con historia de piretroides; sol fuerte de mediodía; cerca de fuentes de agua."
  },
  "IRAC:4": {
    "nombre": "Neonicotinoides",
    "clase": "neonicotinoides",
    "subgrupos": "4A neonicotinoides · 4C sulfoximinas y 4D butenolidas cuentan como el mismo número",
    "sitio": "Receptor nicotínico de acetilcolina: lo ocupa como agonista",
    "como": "Se pegan al receptor como si fueran acetilcolina, pero no se degradan: excitación permanente. Suben por xilema y protegen el brote nuevo. La resistencia metabólica (P450) de mosca blanca y áfidos alcanza a todo el grupo.",
    "riesgo": "alto",
    "otrasMoleculas": "clotianidina, tiacloprid y nitenpiram (4A); sulfoxaflor (4C); flupiradifurona (4D).",
    "recomiendaSi": "el problema son chupadores —mosca blanca, áfidos, trips, psílidos, saltahojas— y quieres proteger el brote nuevo o aplicar al suelo.",
    "noRecomiendesSi": "la aplicación anterior llevó cualquier neonicotinoide, incluidas las mezclas TAGEO, FORXAM, RIDDER, FURIOSO o MULTA PRO; el cultivo está en floración; la mosca blanca ya no responde a imidacloprid (no saltes a otro 4)."
  },
  "IRAC:5": {
    "nombre": "Espinosinas",
    "clase": "espinosinas",
    "subgrupos": "Spinosad (natural) y spinetoram (semisintético)",
    "sitio": "Receptor nicotínico, en un sitio alostérico distinto al de los neonicotinoides",
    "como": "Tocan el mismo receptor que el grupo 4, pero en otro punto: por eso no hay resistencia cruzada con neonicotinoides. Entre spinosad y spinetoram sí la hay, completa.",
    "riesgo": "medio",
    "otrasMoleculas": "cualquier spinosad o spinetoram de otra casa; no hay otras espinosinas en el mercado.",
    "recomiendaSi": "trips, Prodiplosis (caracha), minadores o lepidópteros pequeños, en programas MIP y aplicando al atardecer.",
    "noRecomiendesSi": "vienes de TROSADOR, EVASOR o de cualquier espinosina; necesitas residualidad larga a pleno sol."
  },
  "IRAC:6": {
    "nombre": "Avermectinas",
    "clase": "avermectinas",
    "subgrupos": "Abamectina y emamectina benzoato",
    "sitio": "Canal de cloruro activado por glutamato: lo deja abierto",
    "como": "Entra cloruro en masa y la neurona queda silenciada: parálisis. Son translaminares, forman un depósito dentro de la hoja. La emamectina es un derivado de la abamectina y comparten resistencia.",
    "riesgo": "medio",
    "otrasMoleculas": "milbemectina y cualquier abamectina o emamectina de otra casa.",
    "recomiendaSi": "ácaros y minadores (abamectina); cogollero dentro del cogollo y otros lepidópteros (emamectina). Con coadyuvante y al final de la tarde.",
    "noRecomiendesSi": "la aplicación anterior tuvo avermectina sola o en mezcla (RIDDER, FURIOSO, MULTA PRO); Tetranychus o Spodoptera con historia de avermectinas."
  },
  "IRAC:7": {
    "nombre": "Análogos de hormona juvenil",
    "clase": "análogos de hormona juvenil",
    "subgrupos": "7C piriproxifén · 7A metopreno y 7B fenoxicarb cuentan como el mismo número",
    "sitio": "Receptor de hormona juvenil: impide la metamorfosis",
    "como": "Le da al insecto una señal falsa de «todavía eres joven»: el huevo no termina de formarse y la ninfa no llega a adulto. No mata adultos ni da choque.",
    "riesgo": "bajo",
    "otrasMoleculas": "fenoxicarb (7B) y metopreno (7A).",
    "recomiendaSi": "mosca blanca, escamas o cochinillas al inicio de la curva poblacional; huevos y ninfas; floración y MIP.",
    "noRecomiendesSi": "la presión es de adultos y el cliente espera choque; la población ya está disparada."
  },
  "IRAC:15": {
    "nombre": "Benzoilureas",
    "clase": "benzoilureas",
    "subgrupos": "Lufenurón",
    "sitio": "Síntesis de quitina (CHS1): falla la muda",
    "como": "La larva come y crece normal, pero no logra armar la cutícula nueva y muere al mudar. Todas las benzoilureas se cruzan entre sí. Buprofezina (16) y ciromazina (17) son grupos distintos.",
    "riesgo": "bajo",
    "otrasMoleculas": "novalurón, teflubenzurón, triflumurón, diflubenzurón, clorfluazurón y flufenoxurón.",
    "recomiendaSi": "larvas pequeñas (L1–L2) de lepidóptero, en programas MIP; también por su efecto ovicida y transovárico.",
    "noRecomiendesSi": "las larvas ya están grandes o la presión es de adultos; vienes de novalurón u otra benzoilurea."
  },
  "IRAC:22": {
    "nombre": "Oxadiazinas",
    "clase": "bloqueadores del canal de sodio",
    "subgrupos": "22A indoxacarb · 22B metaflumizona cuenta como el mismo número",
    "sitio": "Canal de sodio: lo bloquea, en un sitio distinto al del piretroide",
    "como": "Es un pro-insecticida que el propio insecto activa. Cierra el canal en vez de dejarlo abierto, y la mutación kdr de los piretroides no le afecta: por eso sí rota con el grupo 3.",
    "riesgo": "medio",
    "otrasMoleculas": "metaflumizona (22B).",
    "recomiendaSi": "lepidópteros —cogollero, Tuta, Plutella, pasador del fruto—, sobre todo donde los piretroides ya fallan.",
    "noRecomiendesSi": "lo aplicaste en la generación anterior de la plaga; vienes de metaflumizona."
  },
  "IRAC:28": {
    "nombre": "Diamidas",
    "clase": "diamidas",
    "subgrupos": "Clorantraniliprol (diamida antranílica)",
    "sitio": "Receptor de rianodina del músculo: vacía el calcio",
    "como": "Actúa en el músculo, no en el nervio, así que no se cruza con ningún neurotóxico. Pero todas las diamidas comparten el sitio: la resistencia de Tuta y Plutella alcanza a todas.",
    "riesgo": "medio",
    "otrasMoleculas": "ciantraniliprol, flubendiamida, ciclaniliprol y tetraniliprol.",
    "recomiendaSi": "lepidópteros y coleópteros que piden protección larga (14–21 días); MIP y floración.",
    "noRecomiendesSi": "vienes de cualquier diamida, incluidas las de otras casas; ya van dos aplicaciones seguidas en la misma generación."
  },
  "FRAC:M03": {
    "nombre": "Ditiocarbamatos",
    "clase": "multisitio",
    "subgrupos": "Mancozeb (aporta además manganeso y zinc)",
    "sitio": "Grupos sulfhidrilo (-SH) de muchas enzimas a la vez",
    "como": "Golpea tantos sitios al mismo tiempo que el hongo no logra resistencia con una mutación. No entra a la planta: protege solo lo que mojó y antes de la infección.",
    "riesgo": "bajo",
    "otrasMoleculas": "propineb, metiram, maneb, tiram y ziram.",
    "recomiendaSi": "siempre, como acompañante de cada sistémico de riesgo alto; preventivo en tizones, mildeos y Sigatoka.",
    "noRecomiendesSi": "esperas curar una infección establecida; viene lluvia fuerte antes de que seque."
  },
  "FRAC:M05": {
    "nombre": "Cloronitrilos",
    "clase": "multisitio",
    "subgrupos": "Clorotalonil",
    "sitio": "Grupos tiol de enzimas dependientes de glutatión",
    "como": "Multisitio protectante de alta residualidad y buena adherencia. Riesgo de resistencia muy bajo: por eso es, junto con el mancozeb, el seguro del programa.",
    "riesgo": "bajo",
    "otrasMoleculas": "no hay otro cloronitrilo de uso común; otros multisitios son cobre (M01), azufre (M02) y captan (M04).",
    "recomiendaSi": "necesitas protección larga y un acompañante para estrobilurinas, SDHI o benzimidazoles.",
    "noRecomiendesSi": "es fruta de exportación y no revisaste los LMR del destino; esperas efecto curativo."
  },
  "FRAC:11": {
    "nombre": "Estrobilurinas (QoI)",
    "clase": "estrobilurinas",
    "subgrupos": "Azoxystrobin (metoxiacrilato) y piraclostrobina (metoxicarbamato)",
    "sitio": "Citocromo bc1, sitio Qo: complejo III de la respiración",
    "como": "Dejan al hongo sin ATP justo cuando la espora germina. La mutación G143A da resistencia total y de un salto a todas las QoI, sin importar la familia química.",
    "riesgo": "alto",
    "otrasMoleculas": "trifloxistrobina, picoxistrobina, kresoxim-metil, famoxadona y fenamidona.",
    "recomiendaSi": "quieres proteger antes de la infección, con efecto verde, y lo acompañas con un multisitio.",
    "noRecomiendesSi": "la infección ya avanzó; vienes de otra QoI —TENAZ, BENEVOLO, DURABO, BENIGNO, BLINDAX o una trifloxistrobina—; ya van 2–3 QoI en el ciclo."
  },
  "FRAC:7": {
    "nombre": "Carboxamidas (SDHI)",
    "clase": "SDHI",
    "subgrupos": "Boscalid (piridina-carboxamida)",
    "sitio": "Succinato deshidrogenasa: complejo II de la respiración",
    "como": "Corta la respiración un paso antes que la estrobilurina. La resistencia cruzada entre SDHI depende de la mutación, pero en campo se manejan como un solo grupo.",
    "riesgo": "alto",
    "otrasMoleculas": "fluopyram, fluxapyroxad, benzovindiflupyr, penthiopyrad, bixafén, isopyrazam, carboxina y flutolanil.",
    "recomiendaSi": "Botrytis, Alternaria, Sclerotinia, oídio o Monilia, en mezcla, como viene en BLINDAX.",
    "noRecomiendesSi": "vienes de fluopyram, fluxapyroxad u otro SDHI; ya hay dos aplicaciones de BLINDAX en el ciclo."
  },
  "FRAC:3": {
    "nombre": "Triazoles (DMI)",
    "clase": "triazoles",
    "subgrupos": "Flutriafol, difenoconazol, propiconazol, tebuconazol y epoxiconazol",
    "sitio": "C14-desmetilasa (CYP51): síntesis de ergosterol",
    "como": "Sin ergosterol la membrana del hongo pierde integridad; frenan micelio ya establecido (curativos hasta 48–72 h). La resistencia es gradual y cruzada entre todos los DMI: si un triazol pierde eficacia, los demás también la van perdiendo.",
    "riesgo": "medio",
    "otrasMoleculas": "protioconazol, ciproconazol, hexaconazol, tetraconazol, metconazol, y los imidazoles procloraz e imazalil.",
    "recomiendaSi": "royas, Sigatoka, manchas foliares u oídios, sobre todo cuando la infección ya empezó.",
    "noRecomiendesSi": "es un oomiceto (gota, mildeo velloso), que no tiene ergosterol; ya van 2–3 DMI en el ciclo, contando BENEVOLO, DURABO y BENIGNO."
  },
  "FRAC:1": {
    "nombre": "Benzimidazoles (MBC)",
    "clase": "benzimidazoles",
    "subgrupos": "Carbendazim y benomil (el benomil se convierte en carbendazim dentro de la planta)",
    "sitio": "β-tubulina: impide que el núcleo se divida",
    "como": "Sin microtúbulos no hay mitosis y el micelio se detiene. Una sola mutación (E198A, F200Y) da resistencia completa a todo el grupo.",
    "riesgo": "alto",
    "otrasMoleculas": "tiofanato metílico (también se convierte en carbendazim) y tiabendazol.",
    "recomiendaSi": "Botrytis, Sclerotinia, Fusarium o antracnosis; drench en cuello y raíz; siempre en mezcla con un multisitio.",
    "noRecomiendesSi": "Sigatoka sin prueba de sensibilidad local; vienes de tiofanato metílico; el problema es un oomiceto."
  },
  "FRAC:43": {
    "nombre": "Piridinilmetil-benzamidas",
    "clase": "fluopicolide",
    "subgrupos": "Fluopicolide",
    "sitio": "Sitio exclusivo de oomicetos: desorganiza la célula del patógeno",
    "como": "Actúa rápido sobre las zoosporas. No tiene resistencia cruzada con metalaxil (4), dimetomorf o mandipropamid (40), cimoxanil (27) ni propamocarb (28).",
    "riesgo": "medio",
    "otrasMoleculas": "fluopimomida.",
    "recomiendaSi": "presión alta de gota, mildeo velloso o Pythium.",
    "noRecomiendesSi": "el problema es un hongo verdadero; lo repetirías sin intercalar otro anti-oomiceto."
  },
  "FRAC:28": {
    "nombre": "Carbamatos (fungicidas)",
    "clase": "propamocarb",
    "subgrupos": "Propamocarb",
    "sitio": "Permeabilidad de membrana y síntesis de fosfolípidos del oomiceto",
    "como": "Frena la formación de esporangios y la germinación de zoosporas. No tiene ninguna relación con IRAC 28: el número solo se compara dentro del mismo comité.",
    "riesgo": "medio",
    "otrasMoleculas": "cualquier propamocarb de otra casa.",
    "recomiendaSi": "damping-off, Pythium y Phytophthora en semillero y en drench.",
    "noRecomiendesSi": "el problema es un hongo verdadero (roya, mancha, oídio)."
  },
  "FRAC:P07": {
    "nombre": "Fosfonatos",
    "clase": "fosfonatos",
    "subgrupos": "Fosetyl-Al",
    "sitio": "Acción directa sobre el oomiceto más activación de las defensas de la planta",
    "como": "El único verdaderamente ambimóvil: baja de la hoja a la raíz. Los fosfitos de potasio que se venden como fertilizante son ácido fosforoso: el mismo grupo.",
    "riesgo": "bajo",
    "otrasMoleculas": "fosfito de potasio, ácido fosforoso y sus sales.",
    "recomiendaSi": "Phytophthora de raíz y cuello (aguacate, cítricos, piña), cuando el producto tiene que bajar desde la hoja.",
    "noRecomiendesSi": "lo cuentas como rotación frente a un fosfito; lo mezclas con cobre o con productos ácidos."
  },
  "HRAC:1": {
    "nombre": "Inhibidores de ACCasa",
    "clase": "graminicidas ACCasa",
    "subgrupos": "Ciclohexanodionas — DIM (clethodim)",
    "sitio": "Acetil-CoA carboxilasa: síntesis de lípidos",
    "como": "Solo mata gramíneas: la ACCasa de la hoja ancha no es sensible. FOP, DIM y DEN comparten sitio; clethodim aguanta mejor algunas mutaciones, pero cuenta como el mismo grupo.",
    "riesgo": "alto",
    "otrasMoleculas": "fluazifop, haloxifop, quizalofop, fenoxaprop y cihalofop (FOP); setoxidim y profoxidim (DIM); pinoxadén (DEN).",
    "recomiendaSi": "gramíneas en crecimiento activo dentro de cultivos de hoja ancha.",
    "noRecomiendesSi": "el objetivo es hoja ancha o coquito; la maleza está estresada; va en tanque con 2,4-D; el lote ya mostró fallas con un FOP."
  },
  "HRAC:2": {
    "nombre": "Inhibidores de ALS",
    "clase": "inhibidores de ALS",
    "subgrupos": "Sulfonilureas (halosulfurón, metsulfurón)",
    "sitio": "Acetolactato sintasa: aminoácidos ramificados",
    "como": "Gramos por hectárea sobre un sitio único. Es el grupo con más resistencia en el mundo: según la mutación, una sola cubre sulfonilureas, imidazolinonas, triazolopirimidinas y pirimidinil-benzoatos a la vez.",
    "riesgo": "alto",
    "otrasMoleculas": "bispiribac, penoxsulam y pirazosulfurón (arroz); nicosulfurón (maíz); imazapir, imazetapir e imazapic.",
    "recomiendaSi": "coquito (ACERTADO); helecho y mortiño (METSULFEX); romper la cadena de hormonales en potrero.",
    "noRecomiendesSi": "arroz con historia de bispiribac o penoxsulam y fallas; cultivo sensible en la rotación; otro ALS en la aplicación anterior."
  },
  "HRAC:9": {
    "nombre": "Glicinas",
    "clase": "glifosato",
    "subgrupos": "Glifosato (en cualquier sal)",
    "sitio": "EPSP sintasa: ruta del shikimato",
    "como": "Única molécula del grupo. La sal (isopropilamina, potásica, amónica) cambia la formulación, no el sitio: todo glifosato es el mismo grupo.",
    "riesgo": "alto",
    "otrasMoleculas": "cualquier glifosato de otra casa, en cualquier sal.",
    "recomiendaSi": "perennes con rizoma o estolón; preparación de lote; con el agua corregida.",
    "noRecomiendesSi": "hay malezas que ya escapan al glifosato (rota a HRAC 10 o 14); agua dura sin corrector; en tanque con quemantes rápidos."
  },
  "HRAC:4": {
    "nombre": "Auxinas sintéticas (hormonales)",
    "clase": "auxinas sintéticas",
    "subgrupos": "Fenoxi (2,4-D) · piridincarboxílicos (picloram) · piridiloxiacéticos (triclopyr, fluroxipir) · quinolincarboxílicos (quinclorac)",
    "sitio": "Receptores de auxina: crecimiento descontrolado",
    "como": "Cinco moléculas, cuatro familias, un solo sitio. Mezclar 2,4-D con picloram amplía el espectro pero no diversifica el sitio. Quinclorac actúa distinto en gramíneas (por eso algunas tablas le daban otro código), pero para rotar cuenta como 4.",
    "riesgo": "medio",
    "otrasMoleculas": "dicamba, MCPA, aminopiralid, clopiralid, halauxifén y florpirauxifén.",
    "recomiendaSi": "hoja ancha en potreros y gramíneas; leñosas y arbustos (picloram, triclopyr, fluroxipir); liendrepuerco en arroz (quinclorac).",
    "noRecomiendesSi": "hay cultivos sensibles cerca (deriva); el potrero tiene leguminosa asociada; el lote se va a rotar pronto (picloram); vienes de otro hormonal sin intercalar un HRAC 2."
  },
  "HRAC:5": {
    "nombre": "Inhibidores del fotosistema II · serina 264",
    "clase": "triazinas y afines",
    "subgrupos": "Triazinas: atrazina y ametrina",
    "sitio": "Proteína D1 del fotosistema II, unión en la serina 264",
    "como": "En la numeración HRAC vigente el grupo 5 incluye también ureas (diurón), triazinonas (metribuzina, hexazinona), uracilos y la amida propanil. La mutación Ser264Gly da resistencia alta a las triazinas.",
    "riesgo": "alto",
    "otrasMoleculas": "diurón, linurón y tebutiurón (ureas); metribuzina y hexazinona (triazinonas); bromacil; propanil; terbutilazina.",
    "recomiendaSi": "pre y postemergencia temprana en maíz, sorgo y caña, con humedad en el suelo.",
    "noRecomiendesSi": "el suelo está seco; hay cultivo sensible en la rotación; el lote viene de diurón, metribuzina o hexazinona."
  },
  "HRAC:6": {
    "nombre": "Inhibidores del fotosistema II · histidina 215",
    "clase": "bentazón",
    "subgrupos": "Benzotiadiazinonas: bentazón",
    "sitio": "Proteína D1 del fotosistema II, unión en la histidina 215",
    "como": "Mismo blanco que las triazinas pero otro punto de unión: una maleza resistente a atrazina por Ser264Gly sigue siendo sensible a bentazón. Es contacto puro.",
    "riesgo": "medio",
    "otrasMoleculas": "bromoxinil, ioxinil (nitrilos) y piridato.",
    "recomiendaSi": "hoja ancha y coquito jóvenes en arroz, maíz o leguminosas; malezas que ya escapan a las triazinas.",
    "noRecomiendesSi": "el día está nublado; la maleza ya es grande; no hay coadyuvante."
  },
  "HRAC:10": {
    "nombre": "Inhibidores de glutamina sintetasa",
    "clase": "glufosinato",
    "subgrupos": "Glufosinato de amonio",
    "sitio": "Glutamina sintetasa: metabolismo del nitrógeno",
    "como": "Nombre parecido al glifosato, enzima totalmente distinta: controla malezas resistentes al glifosato. Quema rápido y no llega a la raíz.",
    "riesgo": "medio",
    "otrasMoleculas": "cualquier glufosinato de otra casa.",
    "recomiendaSi": "quemar rápido y sembrar pronto; malezas que escapan al glifosato; postemergencia temprana.",
    "noRecomiendesSi": "el objetivo es matar rizoma o raíz de una perenne; el día está nublado y seco."
  },
  "HRAC:27": {
    "nombre": "Inhibidores de HPPD",
    "clase": "inhibidores de HPPD",
    "subgrupos": "Tricetonas: mesotrione",
    "sitio": "4-HPPD: síntesis de carotenoides (blanqueamiento)",
    "como": "Sitio único en el portafolio. Sin carotenoides, la luz destruye la clorofila y el tejido nuevo sale blanco. Tembotriona, topramezona e isoxaflutol son el mismo grupo.",
    "riesgo": "medio",
    "otrasMoleculas": "tembotriona (tricetona), topramezona (pirazolona) e isoxaflutol (isoxazol).",
    "recomiendaSi": "caña o maíz con malezas que escapan a triazinas o a ALS.",
    "noRecomiendesSi": "vienes de tembotriona o topramezona en el mismo ciclo."
  },
  "HRAC:14": {
    "nombre": "Inhibidores de PPO",
    "clase": "inhibidores de PPO",
    "subgrupos": "Difeniléteres: oxifluorfén",
    "sitio": "Protoporfirinógeno oxidasa: ruptura de membranas con luz",
    "como": "El herbicida más rápido del portafolio. Todas las familias PPO comparten sitio: difeniléteres, N-fenilimidas, triazolinonas y oxadiazoles.",
    "riesgo": "medio",
    "otrasMoleculas": "fomesafén y lactofén (difeniléteres); saflufenacil y flumioxazina (N-fenilimidas); carfentrazona y sulfentrazona (triazolinonas); oxadiazón.",
    "recomiendaSi": "quema rápida más barrera preemergente, en aplicación dirigida.",
    "noRecomiendesSi": "la gota puede tocar el cultivo; el suelo se va a remover; ya usaste saflufenacil o carfentrazona en la misma quema."
  },
  "IRAC:2": {
    "nombre": "Bloqueadores del canal de cloruro GABA",
    "clase": "fenilpirazoles",
    "fueraDelPortafolio": true
  },
  "IRAC:9": {
    "nombre": "Moduladores de órganos cordotonales",
    "clase": "pimetrozina y afines",
    "fueraDelPortafolio": true
  },
  "IRAC:10": {
    "nombre": "Inhibidores de crecimiento de ácaros",
    "clase": "acaricidas de crecimiento",
    "fueraDelPortafolio": true
  },
  "IRAC:11": {
    "nombre": "Disruptores microbianos del intestino (Bt)",
    "clase": "Bacillus thuringiensis",
    "fueraDelPortafolio": true
  },
  "IRAC:12": {
    "nombre": "Inhibidores de la ATP sintasa",
    "clase": "diafentiurón",
    "fueraDelPortafolio": true
  },
  "IRAC:13": {
    "nombre": "Desacopladores de la fosforilación oxidativa",
    "clase": "clorfenapir",
    "fueraDelPortafolio": true
  },
  "IRAC:14": {
    "nombre": "Bloqueadores del canal del receptor nicotínico",
    "clase": "nereistoxinas",
    "fueraDelPortafolio": true
  },
  "IRAC:16": {
    "nombre": "Inhibidores de quitina tipo 1",
    "clase": "buprofezina",
    "fueraDelPortafolio": true
  },
  "IRAC:17": {
    "nombre": "Disruptores de la muda en dípteros",
    "clase": "ciromazina",
    "fueraDelPortafolio": true
  },
  "IRAC:18": {
    "nombre": "Agonistas del receptor de ecdisona",
    "clase": "diacilhidrazinas",
    "fueraDelPortafolio": true
  },
  "IRAC:20": {
    "nombre": "Inhibidores del complejo III mitocondrial",
    "clase": "bifenazato",
    "fueraDelPortafolio": true
  },
  "IRAC:21": {
    "nombre": "Inhibidores del complejo I mitocondrial (METI)",
    "clase": "METI",
    "fueraDelPortafolio": true
  },
  "IRAC:23": {
    "nombre": "Inhibidores de acetil-CoA carboxilasa",
    "clase": "ácidos tetrónicos y tetrámicos",
    "fueraDelPortafolio": true
  },
  "IRAC:29": {
    "nombre": "Moduladores cordotonales, sitio no definido",
    "clase": "flonicamid",
    "fueraDelPortafolio": true
  },
  "FRAC:2": {
    "nombre": "Dicarboximidas",
    "clase": "dicarboximidas",
    "fueraDelPortafolio": true
  },
  "FRAC:4": {
    "nombre": "Fenilamidas",
    "clase": "fenilamidas",
    "fueraDelPortafolio": true
  },
  "FRAC:5": {
    "nombre": "Aminas (morfolinas, espirocetalaminas)",
    "clase": "aminas",
    "fueraDelPortafolio": true
  },
  "FRAC:9": {
    "nombre": "Anilinopirimidinas",
    "clase": "anilinopirimidinas",
    "fueraDelPortafolio": true
  },
  "FRAC:12": {
    "nombre": "Fenilpirroles",
    "clase": "fenilpirroles",
    "fueraDelPortafolio": true
  },
  "FRAC:17": {
    "nombre": "Hidroxianilidas",
    "clase": "hidroxianilidas",
    "fueraDelPortafolio": true
  },
  "FRAC:21": {
    "nombre": "Inhibidores del sitio Qi (QiI)",
    "clase": "QiI",
    "fueraDelPortafolio": true
  },
  "FRAC:24": {
    "nombre": "Antibióticos hexopiranosil",
    "clase": "kasugamicina",
    "fueraDelPortafolio": true
  },
  "FRAC:27": {
    "nombre": "Cianoacetamida-oximas",
    "clase": "cimoxanil",
    "fueraDelPortafolio": true
  },
  "FRAC:40": {
    "nombre": "Amidas del ácido carboxílico (CAA)",
    "clase": "CAA",
    "fueraDelPortafolio": true
  },
  "FRAC:49": {
    "nombre": "Inhibidores de la proteína de unión a oxiesteroles",
    "clase": "OSBPI",
    "fueraDelPortafolio": true
  },
  "FRAC:P01": {
    "nombre": "Benzotiadiazoles (inductores)",
    "clase": "acibenzolar",
    "fueraDelPortafolio": true
  },
  "FRAC:M01": {
    "nombre": "Cobres (multisitio)",
    "clase": "multisitio",
    "fueraDelPortafolio": true
  },
  "FRAC:M02": {
    "nombre": "Azufre (multisitio)",
    "clase": "multisitio",
    "fueraDelPortafolio": true
  },
  "FRAC:M04": {
    "nombre": "Ftalimidas (multisitio)",
    "clase": "multisitio",
    "fueraDelPortafolio": true
  },
  "HRAC:3": {
    "nombre": "Inhibidores del ensamblaje de microtúbulos",
    "clase": "dinitroanilinas",
    "fueraDelPortafolio": true
  },
  "HRAC:13": {
    "nombre": "Inhibidores de DXS",
    "clase": "clomazona",
    "fueraDelPortafolio": true
  },
  "HRAC:15": {
    "nombre": "Inhibidores de ácidos grasos de cadena muy larga",
    "clase": "cloroacetamidas",
    "fueraDelPortafolio": true
  },
  "HRAC:22": {
    "nombre": "Desviadores de electrones del fotosistema I",
    "clase": "bipiridilos",
    "fueraDelPortafolio": true
  },
  "HRAC:29": {
    "nombre": "Inhibidores de la síntesis de celulosa",
    "clase": "indaziflam",
    "fueraDelPortafolio": true
  }
};

/** Moléculas del portafolio y su grupo. "patron" reconoce la molécula en un texto. */
export const MOLECULAS_PORTAFOLIO = [
  {
    "id": "metomil",
    "nombre": "Metomil",
    "familia": "1A · carbamato",
    "grupo": "IRAC:1",
    "patron": "methomyl|metomil"
  },
  {
    "id": "cipermetrina",
    "nombre": "Cipermetrina",
    "familia": "3A · piretroide tipo II",
    "grupo": "IRAC:3",
    "patron": "cipermetr|cypermethr"
  },
  {
    "id": "deltametrina",
    "nombre": "Deltametrina",
    "familia": "3A · piretroide tipo II",
    "grupo": "IRAC:3",
    "patron": "deltametr"
  },
  {
    "id": "lambda",
    "nombre": "Lambdacihalotrina",
    "familia": "3A · piretroide tipo II",
    "grupo": "IRAC:3",
    "patron": "lambda"
  },
  {
    "id": "bifentrina",
    "nombre": "Bifentrina",
    "familia": "3A · piretroide",
    "grupo": "IRAC:3",
    "patron": "bifentr|bifenthr"
  },
  {
    "id": "tiametoxam",
    "nombre": "Thiametoxam",
    "familia": "4A · neonicotinoide",
    "grupo": "IRAC:4",
    "patron": "thiam|tiam"
  },
  {
    "id": "imidacloprid",
    "nombre": "Imidacloprid",
    "familia": "4A · neonicotinoide",
    "grupo": "IRAC:4",
    "patron": "imidaclo"
  },
  {
    "id": "dinotefuran",
    "nombre": "Dinotefuran",
    "familia": "4A · neonicotinoide",
    "grupo": "IRAC:4",
    "patron": "dinotefur"
  },
  {
    "id": "acetamiprid",
    "nombre": "Acetamiprid",
    "familia": "4A · neonicotinoide",
    "grupo": "IRAC:4",
    "patron": "acetamipr"
  },
  {
    "id": "spinosad",
    "nombre": "Spinosad",
    "familia": "5 · espinosina natural",
    "grupo": "IRAC:5",
    "patron": "spinosad"
  },
  {
    "id": "spinetoram",
    "nombre": "Spinetoram",
    "familia": "5 · espinosina semisintética",
    "grupo": "IRAC:5",
    "patron": "spinetoram"
  },
  {
    "id": "abamectina",
    "nombre": "Abamectina",
    "familia": "6 · avermectina",
    "grupo": "IRAC:6",
    "patron": "abamect"
  },
  {
    "id": "emamectina",
    "nombre": "Emamectina benzoato",
    "familia": "6 · avermectina",
    "grupo": "IRAC:6",
    "patron": "emamect"
  },
  {
    "id": "piriproxifen",
    "nombre": "Piriproxifén",
    "familia": "7C · análogo de hormona juvenil",
    "grupo": "IRAC:7",
    "patron": "pyriprox|piriprox"
  },
  {
    "id": "lufenuron",
    "nombre": "Lufenurón",
    "familia": "15 · benzoilurea",
    "grupo": "IRAC:15",
    "patron": "lufenur"
  },
  {
    "id": "indoxacarb",
    "nombre": "Indoxacarb",
    "familia": "22A · oxadiazina",
    "grupo": "IRAC:22",
    "patron": "indoxac"
  },
  {
    "id": "clorantraniliprol",
    "nombre": "Clorantraniliprol",
    "familia": "28 · diamida antranílica",
    "grupo": "IRAC:28",
    "patron": "clorantran|chlorantran"
  },
  {
    "id": "mancozeb",
    "nombre": "Mancozeb",
    "familia": "M03 · ditiocarbamato",
    "grupo": "FRAC:M03",
    "patron": "mancozeb"
  },
  {
    "id": "clorotalonil",
    "nombre": "Clorotalonil",
    "familia": "M05 · cloronitrilo",
    "grupo": "FRAC:M05",
    "patron": "chlorothal|clorotal"
  },
  {
    "id": "azoxystrobin",
    "nombre": "Azoxystrobin",
    "familia": "11 · metoxiacrilato",
    "grupo": "FRAC:11",
    "patron": "azoxystrob"
  },
  {
    "id": "piraclostrobina",
    "nombre": "Piraclostrobina",
    "familia": "11 · metoxicarbamato",
    "grupo": "FRAC:11",
    "patron": "pyraclostrob|piraclostrob"
  },
  {
    "id": "boscalid",
    "nombre": "Boscalid",
    "familia": "7 · piridina-carboxamida",
    "grupo": "FRAC:7",
    "patron": "boscalid"
  },
  {
    "id": "flutriafol",
    "nombre": "Flutriafol",
    "familia": "3 · triazol",
    "grupo": "FRAC:3",
    "patron": "flutriafol"
  },
  {
    "id": "difenoconazol",
    "nombre": "Difenoconazol",
    "familia": "3 · triazol",
    "grupo": "FRAC:3",
    "patron": "difenocon"
  },
  {
    "id": "propiconazol",
    "nombre": "Propiconazol",
    "familia": "3 · triazol",
    "grupo": "FRAC:3",
    "patron": "propicon"
  },
  {
    "id": "tebuconazol",
    "nombre": "Tebuconazol",
    "familia": "3 · triazol",
    "grupo": "FRAC:3",
    "patron": "tebucon"
  },
  {
    "id": "epoxiconazol",
    "nombre": "Epoxiconazol",
    "familia": "3 · triazol",
    "grupo": "FRAC:3",
    "patron": "epoxicon"
  },
  {
    "id": "carbendazim",
    "nombre": "Carbendazim",
    "familia": "1 · benzimidazol",
    "grupo": "FRAC:1",
    "patron": "carbendaz"
  },
  {
    "id": "benomil",
    "nombre": "Benomil",
    "familia": "1 · benzimidazol",
    "grupo": "FRAC:1",
    "patron": "benomil|benomyl"
  },
  {
    "id": "fluopicolide",
    "nombre": "Fluopicolide",
    "familia": "43 · piridinilmetil-benzamida",
    "grupo": "FRAC:43",
    "patron": "fluopicol"
  },
  {
    "id": "propamocarb",
    "nombre": "Propamocarb",
    "familia": "28 · carbamato",
    "grupo": "FRAC:28",
    "patron": "propamoc"
  },
  {
    "id": "fosetyl",
    "nombre": "Fosetyl-Al",
    "familia": "P07 · fosfonato",
    "grupo": "FRAC:P07",
    "patron": "fosetyl|fosetil"
  },
  {
    "id": "cletodim",
    "nombre": "Clethodim",
    "familia": "1 · ciclohexanodiona (DIM)",
    "grupo": "HRAC:1",
    "patron": "clethod|cletod"
  },
  {
    "id": "halosulfuron",
    "nombre": "Halosulfurón metil",
    "familia": "2 · sulfonilurea",
    "grupo": "HRAC:2",
    "patron": "halosulf"
  },
  {
    "id": "metsulfuron",
    "nombre": "Metsulfurón metil",
    "familia": "2 · sulfonilurea",
    "grupo": "HRAC:2",
    "patron": "metsulf"
  },
  {
    "id": "glifosato",
    "nombre": "Glifosato",
    "familia": "9 · glicina",
    "grupo": "HRAC:9",
    "patron": "glifos|glyphos"
  },
  {
    "id": "24d",
    "nombre": "2,4-D",
    "familia": "4 · fenoxicarboxílico",
    "grupo": "HRAC:4",
    "patron": "2,4-d"
  },
  {
    "id": "picloram",
    "nombre": "Picloram",
    "familia": "4 · piridincarboxílico",
    "grupo": "HRAC:4",
    "patron": "picloram"
  },
  {
    "id": "triclopyr",
    "nombre": "Triclopyr",
    "familia": "4 · piridiloxiacético",
    "grupo": "HRAC:4",
    "patron": "triclop"
  },
  {
    "id": "fluroxipir",
    "nombre": "Fluroxipir",
    "familia": "4 · piridiloxiacético",
    "grupo": "HRAC:4",
    "patron": "fluroxip"
  },
  {
    "id": "quinclorac",
    "nombre": "Quinclorac",
    "familia": "4 · quinolincarboxílico",
    "grupo": "HRAC:4",
    "patron": "quinclor"
  },
  {
    "id": "atrazina",
    "nombre": "Atrazina",
    "familia": "5 · triazina",
    "grupo": "HRAC:5",
    "patron": "atrazin"
  },
  {
    "id": "ametrina",
    "nombre": "Ametrina",
    "familia": "5 · triazina",
    "grupo": "HRAC:5",
    "patron": "\\bametrin"
  },
  {
    "id": "bentazon",
    "nombre": "Bentazón",
    "familia": "6 · benzotiadiazinona",
    "grupo": "HRAC:6",
    "patron": "bentaz"
  },
  {
    "id": "glufosinato",
    "nombre": "Glufosinato de amonio",
    "familia": "10 · ácido fosfínico",
    "grupo": "HRAC:10",
    "patron": "glufosin"
  },
  {
    "id": "oxifluorfen",
    "nombre": "Oxifluorfén",
    "familia": "14 · difeniléter",
    "grupo": "HRAC:14",
    "patron": "oxyfluor|oxifluor"
  },
  {
    "id": "mesotrione",
    "nombre": "Mesotrione",
    "familia": "27 · tricetona",
    "grupo": "HRAC:27",
    "patron": "mesotri"
  }
];

/** Moléculas de otras casas comerciales, para traducir a grupo lo que se aplicó antes. */
export const MOLECULAS_OTRAS_CASAS = [
  {
    "nombre": "Clorpirifos",
    "familia": "organofosforado, 1B",
    "grupo": "IRAC:1"
  },
  {
    "nombre": "Profenofos",
    "familia": "organofosforado, 1B",
    "grupo": "IRAC:1"
  },
  {
    "nombre": "Acefato",
    "familia": "organofosforado, 1B",
    "grupo": "IRAC:1"
  },
  {
    "nombre": "Dimetoato",
    "familia": "organofosforado, 1B",
    "grupo": "IRAC:1"
  },
  {
    "nombre": "Malatión",
    "familia": "organofosforado, 1B",
    "grupo": "IRAC:1"
  },
  {
    "nombre": "Carbofurán",
    "familia": "carbamato, 1A",
    "grupo": "IRAC:1"
  },
  {
    "nombre": "Tiodicarb",
    "familia": "carbamato, 1A",
    "grupo": "IRAC:1"
  },
  {
    "nombre": "Fipronil",
    "familia": "fenilpirazol, 2B",
    "grupo": "IRAC:2"
  },
  {
    "nombre": "Zeta-cipermetrina",
    "familia": "piretroide, 3A",
    "grupo": "IRAC:3"
  },
  {
    "nombre": "Alfa-cipermetrina",
    "familia": "piretroide, 3A",
    "grupo": "IRAC:3"
  },
  {
    "nombre": "Permetrina",
    "familia": "piretroide, 3A",
    "grupo": "IRAC:3"
  },
  {
    "nombre": "Beta-ciflutrina",
    "familia": "piretroide, 3A",
    "grupo": "IRAC:3"
  },
  {
    "nombre": "Clotianidina",
    "familia": "neonicotinoide, 4A",
    "grupo": "IRAC:4"
  },
  {
    "nombre": "Tiacloprid",
    "familia": "neonicotinoide, 4A",
    "grupo": "IRAC:4"
  },
  {
    "nombre": "Sulfoxaflor",
    "familia": "sulfoximina, 4C",
    "grupo": "IRAC:4"
  },
  {
    "nombre": "Flupiradifurona",
    "familia": "butenolida, 4D",
    "grupo": "IRAC:4"
  },
  {
    "nombre": "Milbemectina",
    "familia": "milbemicina, 6",
    "grupo": "IRAC:6"
  },
  {
    "nombre": "Pimetrozina",
    "familia": "piridina azometina, 9B",
    "grupo": "IRAC:9"
  },
  {
    "nombre": "Afidopiropen",
    "familia": "pyropene, 9D",
    "grupo": "IRAC:9"
  },
  {
    "nombre": "Hexitiazox",
    "familia": "acaricida, 10A",
    "grupo": "IRAC:10"
  },
  {
    "nombre": "Etoxazol",
    "familia": "acaricida, 10B",
    "grupo": "IRAC:10"
  },
  {
    "nombre": "Bacillus thuringiensis",
    "familia": "Bt, 11A",
    "grupo": "IRAC:11"
  },
  {
    "nombre": "Diafentiurón",
    "familia": "tiourea, 12A",
    "grupo": "IRAC:12"
  },
  {
    "nombre": "Clorfenapir",
    "familia": "pirrol, 13",
    "grupo": "IRAC:13"
  },
  {
    "nombre": "Cartap",
    "familia": "nereistoxina, 14",
    "grupo": "IRAC:14"
  },
  {
    "nombre": "Novalurón",
    "familia": "benzoilurea, 15",
    "grupo": "IRAC:15"
  },
  {
    "nombre": "Teflubenzurón",
    "familia": "benzoilurea, 15",
    "grupo": "IRAC:15"
  },
  {
    "nombre": "Buprofezina",
    "familia": "tiadiazinona, 16",
    "grupo": "IRAC:16"
  },
  {
    "nombre": "Ciromazina",
    "familia": "triazina, 17",
    "grupo": "IRAC:17"
  },
  {
    "nombre": "Metoxifenozida",
    "familia": "diacilhidrazina, 18",
    "grupo": "IRAC:18"
  },
  {
    "nombre": "Bifenazato",
    "familia": "acaricida, 20D",
    "grupo": "IRAC:20"
  },
  {
    "nombre": "Fenpiroximato",
    "familia": "METI, 21A",
    "grupo": "IRAC:21"
  },
  {
    "nombre": "Piridabén",
    "familia": "METI, 21A",
    "grupo": "IRAC:21"
  },
  {
    "nombre": "Metaflumizona",
    "familia": "semicarbazona, 22B",
    "grupo": "IRAC:22"
  },
  {
    "nombre": "Espirotetramat",
    "familia": "ácido tetrámico, 23",
    "grupo": "IRAC:23"
  },
  {
    "nombre": "Espiromesifeno",
    "familia": "ácido tetrónico, 23",
    "grupo": "IRAC:23"
  },
  {
    "nombre": "Ciantraniliprol",
    "familia": "diamida, 28",
    "grupo": "IRAC:28"
  },
  {
    "nombre": "Flubendiamida",
    "familia": "diamida ftálica, 28",
    "grupo": "IRAC:28"
  },
  {
    "nombre": "Flonicamid",
    "familia": "flonicamid, 29",
    "grupo": "IRAC:29"
  },
  {
    "nombre": "Metalaxil / mefenoxam",
    "familia": "fenilamida, 4",
    "grupo": "FRAC:4"
  },
  {
    "nombre": "Tiofanato metílico",
    "familia": "benzimidazol, 1",
    "grupo": "FRAC:1"
  },
  {
    "nombre": "Iprodiona",
    "familia": "dicarboximida, 2",
    "grupo": "FRAC:2"
  },
  {
    "nombre": "Protioconazol",
    "familia": "triazolintiona (DMI), 3",
    "grupo": "FRAC:3"
  },
  {
    "nombre": "Ciproconazol",
    "familia": "triazol (DMI), 3",
    "grupo": "FRAC:3"
  },
  {
    "nombre": "Hexaconazol",
    "familia": "triazol (DMI), 3",
    "grupo": "FRAC:3"
  },
  {
    "nombre": "Procloraz",
    "familia": "imidazol (DMI), 3",
    "grupo": "FRAC:3"
  },
  {
    "nombre": "Espiroxamina",
    "familia": "espirocetalamina, 5",
    "grupo": "FRAC:5"
  },
  {
    "nombre": "Fenpropimorf",
    "familia": "morfolina, 5",
    "grupo": "FRAC:5"
  },
  {
    "nombre": "Fluopyram",
    "familia": "SDHI, 7",
    "grupo": "FRAC:7"
  },
  {
    "nombre": "Fluxapyroxad",
    "familia": "SDHI, 7",
    "grupo": "FRAC:7"
  },
  {
    "nombre": "Benzovindiflupyr",
    "familia": "SDHI, 7",
    "grupo": "FRAC:7"
  },
  {
    "nombre": "Pirimetanil",
    "familia": "anilinopirimidina, 9",
    "grupo": "FRAC:9"
  },
  {
    "nombre": "Ciprodinil",
    "familia": "anilinopirimidina, 9",
    "grupo": "FRAC:9"
  },
  {
    "nombre": "Trifloxistrobina",
    "familia": "estrobilurina, 11",
    "grupo": "FRAC:11"
  },
  {
    "nombre": "Picoxistrobina",
    "familia": "estrobilurina, 11",
    "grupo": "FRAC:11"
  },
  {
    "nombre": "Famoxadona",
    "familia": "oxazolidinadiona (QoI), 11",
    "grupo": "FRAC:11"
  },
  {
    "nombre": "Fludioxonil",
    "familia": "fenilpirrol, 12",
    "grupo": "FRAC:12"
  },
  {
    "nombre": "Fenhexamida",
    "familia": "hidroxianilida, 17",
    "grupo": "FRAC:17"
  },
  {
    "nombre": "Ciazofamida",
    "familia": "QiI, 21",
    "grupo": "FRAC:21"
  },
  {
    "nombre": "Kasugamicina",
    "familia": "antibiótico, 24",
    "grupo": "FRAC:24"
  },
  {
    "nombre": "Cimoxanil",
    "familia": "cianoacetamida-oxima, 27",
    "grupo": "FRAC:27"
  },
  {
    "nombre": "Dimetomorf",
    "familia": "CAA, 40",
    "grupo": "FRAC:40"
  },
  {
    "nombre": "Mandipropamid",
    "familia": "CAA, 40",
    "grupo": "FRAC:40"
  },
  {
    "nombre": "Oxatiapiprolin",
    "familia": "OSBPI, 49",
    "grupo": "FRAC:49"
  },
  {
    "nombre": "Fosfito de potasio",
    "familia": "fosfonato, P07",
    "grupo": "FRAC:P07"
  },
  {
    "nombre": "Acibenzolar-S-metil",
    "familia": "inductor, P01",
    "grupo": "FRAC:P01"
  },
  {
    "nombre": "Cobre (oxicloruro, hidróxido)",
    "familia": "multisitio, M01",
    "grupo": "FRAC:M01"
  },
  {
    "nombre": "Azufre",
    "familia": "multisitio, M02",
    "grupo": "FRAC:M02"
  },
  {
    "nombre": "Propineb",
    "familia": "ditiocarbamato, M03",
    "grupo": "FRAC:M03"
  },
  {
    "nombre": "Captan",
    "familia": "ftalimida, M04",
    "grupo": "FRAC:M04"
  },
  {
    "nombre": "Fluazifop-p-butil",
    "familia": "FOP, 1",
    "grupo": "HRAC:1"
  },
  {
    "nombre": "Haloxifop",
    "familia": "FOP, 1",
    "grupo": "HRAC:1"
  },
  {
    "nombre": "Cihalofop-butil",
    "familia": "FOP, 1",
    "grupo": "HRAC:1"
  },
  {
    "nombre": "Fenoxaprop-p-etil",
    "familia": "FOP, 1",
    "grupo": "HRAC:1"
  },
  {
    "nombre": "Bispiribac sodio",
    "familia": "pirimidinil-benzoato, 2",
    "grupo": "HRAC:2"
  },
  {
    "nombre": "Penoxsulam",
    "familia": "triazolopirimidina, 2",
    "grupo": "HRAC:2"
  },
  {
    "nombre": "Pirazosulfurón",
    "familia": "sulfonilurea, 2",
    "grupo": "HRAC:2"
  },
  {
    "nombre": "Nicosulfurón",
    "familia": "sulfonilurea, 2",
    "grupo": "HRAC:2"
  },
  {
    "nombre": "Imazapir / imazetapir",
    "familia": "imidazolinona, 2",
    "grupo": "HRAC:2"
  },
  {
    "nombre": "Pendimetalina",
    "familia": "dinitroanilina, 3",
    "grupo": "HRAC:3"
  },
  {
    "nombre": "Dicamba",
    "familia": "ácido benzoico, 4",
    "grupo": "HRAC:4"
  },
  {
    "nombre": "MCPA",
    "familia": "fenoxi, 4",
    "grupo": "HRAC:4"
  },
  {
    "nombre": "Aminopiralid",
    "familia": "piridincarboxílico, 4",
    "grupo": "HRAC:4"
  },
  {
    "nombre": "Florpirauxifén",
    "familia": "arilpicolinato, 4",
    "grupo": "HRAC:4"
  },
  {
    "nombre": "Diurón",
    "familia": "urea, 5",
    "grupo": "HRAC:5"
  },
  {
    "nombre": "Linurón",
    "familia": "urea, 5",
    "grupo": "HRAC:5"
  },
  {
    "nombre": "Metribuzina",
    "familia": "triazinona, 5",
    "grupo": "HRAC:5"
  },
  {
    "nombre": "Hexazinona",
    "familia": "triazinona, 5",
    "grupo": "HRAC:5"
  },
  {
    "nombre": "Propanil",
    "familia": "amida, 5",
    "grupo": "HRAC:5"
  },
  {
    "nombre": "Bromoxinil",
    "familia": "nitrilo, 6",
    "grupo": "HRAC:6"
  },
  {
    "nombre": "Clomazona",
    "familia": "isoxazolidinona, 13",
    "grupo": "HRAC:13"
  },
  {
    "nombre": "Saflufenacil",
    "familia": "N-fenilimida, 14",
    "grupo": "HRAC:14"
  },
  {
    "nombre": "Carfentrazona",
    "familia": "triazolinona, 14",
    "grupo": "HRAC:14"
  },
  {
    "nombre": "Fomesafén",
    "familia": "difeniléter, 14",
    "grupo": "HRAC:14"
  },
  {
    "nombre": "Oxadiazón",
    "familia": "oxadiazol, 14",
    "grupo": "HRAC:14"
  },
  {
    "nombre": "S-metolacloro",
    "familia": "cloroacetamida, 15",
    "grupo": "HRAC:15"
  },
  {
    "nombre": "Butacloro / pretilacloro",
    "familia": "cloroacetamida, 15",
    "grupo": "HRAC:15"
  },
  {
    "nombre": "Paraquat",
    "familia": "bipiridilo, 22",
    "grupo": "HRAC:22"
  },
  {
    "nombre": "Diquat",
    "familia": "bipiridilo, 22",
    "grupo": "HRAC:22"
  },
  {
    "nombre": "Tembotriona",
    "familia": "tricetona, 27",
    "grupo": "HRAC:27"
  },
  {
    "nombre": "Topramezona",
    "familia": "pirazolona, 27",
    "grupo": "HRAC:27"
  },
  {
    "nombre": "Indaziflam",
    "familia": "alquilazina, 29",
    "grupo": "HRAC:29"
  }
];

/** Grupos distintos que tocan el mismo blanco: sí rotan, aunque parezcan iguales. */
export const CRUCES_QUE_CONFUNDEN = [
  {
    "a": "IRAC:3",
    "b": "IRAC:22",
    "blanco": "el canal de sodio"
  },
  {
    "a": "IRAC:4",
    "b": "IRAC:5",
    "blanco": "el receptor nicotínico"
  },
  {
    "a": "IRAC:4",
    "b": "IRAC:14",
    "blanco": "el receptor nicotínico"
  },
  {
    "a": "IRAC:15",
    "b": "IRAC:16",
    "blanco": "la síntesis de quitina"
  },
  {
    "a": "HRAC:5",
    "b": "HRAC:6",
    "blanco": "la proteína D1 del fotosistema II"
  },
  {
    "a": "FRAC:7",
    "b": "FRAC:11",
    "blanco": "la cadena respiratoria"
  },
  {
    "a": "FRAC:11",
    "b": "FRAC:21",
    "blanco": "el citocromo bc1 (complejo III)"
  },
  {
    "a": "FRAC:3",
    "b": "FRAC:5",
    "blanco": "la ruta del ergosterol"
  }
];

/** Bioestimulantes por base funcional: qué hacen, cómo combinarlos y cuándo. */
export const GRUPOS_FUNCIONALES = [
  {
    "id": "alga",
    "nombre": "Extractos de alga parda",
    "base": "Sargassum hemiphyllum",
    "productos": [
      "alga600",
      "algasoil",
      "brain",
      "leili2000"
    ],
    "que": "Señalizadores hormonales (citoquininas, auxinas y giberelinas en trazas) más betaínas y alginatos. Modulan el balance hormonal y la respuesta a estrés; no nutren.",
    "combinar": "Son la misma base en dos vías: foliar (Alga600, Leili2000) y suelo (Algasoil, BRAIN). No dupliques dos algas foliares en el mismo pase; sí combina una foliar con una de suelo.",
    "cuando": "estrés previsible, prefloración y cuaje (foliar); trasplante y arranque de raíz (suelo)."
  },
  {
    "id": "amino",
    "nombre": "Aminoácidos libres",
    "base": "L-aminoácidos de origen vegetal",
    "productos": [
      "amino43",
      "amino80"
    ],
    "que": "Ahorro energético: la planta recibe el aminoácido ya armado. Quelatan micronutrientes y aportan precursores de osmoprotectores.",
    "combinar": "Mismo grupo en dos concentraciones (43 % y 80 %): se escoge uno, no se suman. Son buen acompañante de los micronutrientes y de cualquier aplicación en un momento de estrés.",
    "cuando": "después de un golpe: granizo, sequía, fitotoxicidad, frío o trasplante."
  },
  {
    "id": "nutri",
    "nombre": "Nutrientes acomplejados con aminoácidos",
    "base": "Calcio, boro, molibdeno, potasio y micronutrientes",
    "productos": [
      "grosso",
      "complex",
      "fruttox",
      "forttex"
    ],
    "que": "El aminoácido funciona como transportador: ayuda a que el nutriente atraviese la cutícula y no se bloquee.",
    "combinar": "Ojo con la competencia de cationes: el potasio (FRUTTOX) compite con el calcio (GROSSO, FORTTEX). Calcio en cuaje y división celular, potasio en llenado; no juntos a dosis altas.",
    "cuando": "GROSSO en floración y cuaje · FORTTEX para firmeza · FRUTTOX en llenado · COMPPLEX con análisis foliar en la mano."
  },
  {
    "id": "humic",
    "nombre": "Sustancias húmicas",
    "base": "Ácido húmico y ácido fúlvico",
    "productos": [
      "humox",
      "fulvox"
    ],
    "que": "El húmico (alto peso molecular) se queda en el suelo y sube la CIC; el fúlvico (bajo peso molecular) entra a la planta y quela micronutrientes.",
    "combinar": "No compiten, se complementan: húmico de fondo, fúlvico con cada fertirriego y cada aplicación de micronutrientes.",
    "cuando": "suelos degradados, arenosos o con poca materia orgánica; programas de fertirriego."
  },
  {
    "id": "elic",
    "nombre": "Elicitores (inductores de defensa)",
    "base": "Oligosacáridos de quitosano",
    "productos": [
      "softguard"
    ],
    "que": "La planta lo reconoce como pared de hongo y se pone en alerta (priming): fitoalexinas, proteínas PR, señalización por ácido salicílico y jasmónico.",
    "combinar": "Trabaja con la misma lógica que PROTECSOL (FRAC P07), que también induce defensas: se complementan. No reemplaza a un fungicida en una epidemia declarada.",
    "cuando": "preventivo y programado: semilleros, trasplante, cultivos de alto valor o con exigencia de residuos bajos."
  },
  {
    "id": "ga",
    "nombre": "Giberelinas",
    "base": "Ácido giberélico (GA3)",
    "productos": [
      "gibox",
      "giboxpro"
    ],
    "que": "Elongación celular, ruptura de latencia y movilización de reservas.",
    "combinar": "Misma molécula en polvo y en tableta: es un solo grupo. Es el opuesto exacto de MEPEX.",
    "cuando": "brotación, alargamiento de racimo, calibre de fruto o ruptura de dormancia, con dosis en gramos."
  },
  {
    "id": "antiga",
    "nombre": "Retardantes (anti-giberelinas)",
    "base": "Cloruro de mepiquat",
    "productos": [
      "mepex"
    ],
    "que": "Bloquea la síntesis de giberelinas: entrenudos cortos y planta compacta.",
    "combinar": "Antagonista de GIBOX: nunca en la misma ventana del cultivo, porque uno anula al otro.",
    "cuando": "algodón con crecimiento vegetativo excesivo, según altura y relación de entrenudos."
  }
];

/** Grupos ordenados por el proceso vital que atacan. */
export const PROCESOS = {
  "IRAC": [
    {
      "nombre": "Sistema nervioso y muscular",
      "descripcion": "Matan o paralizan rápido, de minutos a pocos días. Aquí está la mayor parte del portafolio de insecticidas, y también la mayor parte de la resistencia.",
      "grupos": [
        "IRAC:1",
        "IRAC:3",
        "IRAC:4",
        "IRAC:5",
        "IRAC:6",
        "IRAC:22",
        "IRAC:28"
      ]
    },
    {
      "nombre": "Crecimiento y desarrollo",
      "descripcion": "No dan choque: cortan la siguiente muda o la siguiente generación. Se posicionan temprano, antes de que la población se dispare.",
      "grupos": [
        "IRAC:7",
        "IRAC:15"
      ]
    }
  ],
  "FRAC": [
    {
      "nombre": "Multisitio",
      "descripcion": "Tocan muchas enzimas a la vez y el hongo no logra resistencia. Son el seguro de todo el programa: van acompañando a los sistémicos, no reemplazándolos.",
      "grupos": [
        "FRAC:M03",
        "FRAC:M05"
      ]
    },
    {
      "nombre": "Respiración del hongo",
      "descripcion": "Dejan al hongo sin energía. Riesgo alto: una sola mutación basta para perder el grupo completo.",
      "grupos": [
        "FRAC:11",
        "FRAC:7"
      ]
    },
    {
      "nombre": "Síntesis de esteroles (membrana)",
      "descripcion": "Rompen la membrana del hongo verdadero. Curativos tempranos, con resistencia gradual.",
      "grupos": [
        "FRAC:3"
      ]
    },
    {
      "nombre": "División celular y citoesqueleto",
      "descripcion": "Impiden que la célula del patógeno se divida o se organice. Uno sirve para hongos verdaderos y el otro solo para oomicetos.",
      "grupos": [
        "FRAC:1",
        "FRAC:43"
      ]
    },
    {
      "nombre": "Membrana de oomicetos",
      "descripcion": "Específico para Phytophthora, Pythium y mildeos vellosos, que no son hongos verdaderos.",
      "grupos": [
        "FRAC:28"
      ]
    },
    {
      "nombre": "Defensas de la planta",
      "descripcion": "Actúa sobre el patógeno y, además, pone a la planta en alerta.",
      "grupos": [
        "FRAC:P07"
      ]
    }
  ],
  "HRAC": [
    {
      "nombre": "Síntesis de lípidos",
      "descripcion": "Solo gramíneas. No tocan hoja ancha ni ciperáceas.",
      "grupos": [
        "HRAC:1"
      ]
    },
    {
      "nombre": "Síntesis de aminoácidos",
      "descripcion": "Lentos —10 a 25 días— pero profundos: translocan a la raíz y al rizoma.",
      "grupos": [
        "HRAC:2",
        "HRAC:9"
      ]
    },
    {
      "nombre": "Regulación del crecimiento",
      "descripcion": "Epinastia en horas y muerte en semanas. El grupo más usado en potrero, y el más repetido del portafolio.",
      "grupos": [
        "HRAC:4"
      ]
    },
    {
      "nombre": "Fotosíntesis · fotosistema II",
      "descripcion": "Necesitan luz. Mismo blanco, dos puntos de unión distintos: por eso son dos grupos y sí rotan entre sí.",
      "grupos": [
        "HRAC:5",
        "HRAC:6"
      ]
    },
    {
      "nombre": "Metabolismo del nitrógeno",
      "descripcion": "Quema rápida, sin control de raíz.",
      "grupos": [
        "HRAC:10"
      ]
    },
    {
      "nombre": "Síntesis de pigmentos",
      "descripcion": "El síntoma es inconfundible: el tejido nuevo sale blanco.",
      "grupos": [
        "HRAC:27"
      ]
    },
    {
      "nombre": "Ruptura de membranas",
      "descripcion": "Quema en horas con sol, más una película residual sobre el suelo.",
      "grupos": [
        "HRAC:14"
      ]
    }
  ]
};
