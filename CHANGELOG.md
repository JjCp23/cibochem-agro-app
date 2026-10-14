# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [1.7.0]

Unión de las dos líneas de desarrollo: la versión publicada en
https://cibochem-campo.pages.dev (recuperada en el portátil, ramas
`portatil-recuperada` y `portatil-v2`) y la 1.6.0 de este repositorio.

### Agregado
- **Caneca de 200 L como guía del orden de mezcla** (de la versión publicada).
  La pestaña Orden muestra una caneca que se llena paso a paso: cada paso deja
  su capa, dice qué formulaciones entran ahí, qué productos de tu mezcla van
  en ese paso con su dosis por bomba y por qué. El orden de carga pasó de 7 a
  13 pasos, cada uno con su explicación plegable.
- **Repaso rápido** de cinco ideas para que no se corte la mezcla, y
  **coadyuvantes: qué hace cada tipo**.
- **Semáforo de la mezcla** y aviso de **formulaciones distintas**: desde tres
  tipos de formulación en el tanque se marca riesgo de incompatibilidad.
  `formulacionDe` reconoce más siglas (WSB, WSP, DF, SP, SE, FL, EW) y
  `analizarFormulaciones` cuenta los tipos.
- **Fotos de empaque** de 64 de los 80 productos (WebP de 480 px, 1 MB en
  total): en la ficha, las tarjetas, el selector de producto y la vista
  «Fotos» del catálogo.
- **Presentaciones dibujadas**: la ficha muestra «Se vende en» con cada envase
  a escala (frasco, botella, garrafa, bidón, sobre, bolsa, saco) y su tamaño.
- **Íconos propios de cada objetivo** del diagnóstico (12 plagas, 7 tipos de
  maleza, 8 enfermedades), que reemplazan los emoji genéricos en esos casos.
- **Modo campo**: el sol del encabezado agranda texto y botones para leer bajo
  el sol o tocar con guantes. Se recuerda entre visitas.
- Atajos del ícono instalado y de URL: `?vista=diagnostico`, `?vista=mezcla`.

### Cambiado
- Los modos de acción repetidos en la mezcla se muestran en ámbar; el rojo
  queda para la incompatibilidad de formulaciones.
- El pie aclara que la decisión final y la aplicación en campo son
  responsabilidad de quien las ejecuta.

### Quitado
- El service worker fijo y el aviso de instalación de la versión publicada:
  los reemplazan el service worker que genera el build (con la lista exacta de
  archivos, fotos incluidas) y la invitación a instalar de la portada.

## [1.6.0]

### Agregado
- **Diagnóstico por cultivo.** 18 cultivos de Colombia con sus plagas,
  enfermedades y malezas principales, cada una con nombre científico y la
  categoría con la que la app busca producto. Lo que el portafolio no maneja
  (bacterias, virus, nematodos, mosca de la fruta) se dice con su razón.
- **Recomendación técnica**: producto principal y por qué, acompañante
  multisitio cuando el fungicida es de riesgo alto, siguiente aplicación con
  otro sitio de acción, cómo aplicarlo según su movimiento, qué se va a ver en
  campo y qué confirmar en la etiqueta. Se comparte en texto.
- **Guía de campo integrada** (de la guía del portafolio): para los 80
  productos, qué se ve en campo, cómo actúa, blancos con nombre científico,
  usos, consejo de campo y descripción del portafolio; para los grupos de
  resistencia, cuándo recomendar y cuándo no, y las moléculas de otras casas.
- **Usos en ficha técnica** de 35 productos, con fuente y nivel de confianza.
- **Verificador de cruces con otras casas**: en Rotación se escoge la
  molécula que se aplicó (más de cien de otras marcas) y la app la traduce a
  su grupo.
- **Marcas gemelas y versiones PRO** detectadas por composición, en la ficha
  y en un tema nuevo de Aprender; otro tema con las siete reglas para
  recomendar por grupo químico.
- **Íconos ilustrados** en 2D (Fluent Emoji de Microsoft, licencia MIT, más
  nueve dibujados para la app) para líneas, problemas, cultivos y
  herramientas.

- **Comparador útil con cualquier producto**: filas que se adaptan a la línea
  (controla, cultivos, momento, acción, formulación, qué se ve en campo,
  cuándo elegirlo; base funcional y composición en bioestimulantes),
  interruptor "Solo diferencias", la mejor opción marcada por fila, un "En
  resumen" con conflictos, gemelos y exclusivos, y sugerencias "Compárelo
  con". Se lee en el teléfono sin desplazarse de lado. Se abre desde el botón
  **Comparar** de cada ficha.
- **Mezcla explicada**: para qué sirve cada dato y cada resultado, envases a
  llevar por producto, botones − / +, aviso de qué dato falta, aviso de unidad
  cuando la dosis por hectárea es inusualmente alta y "Cómo se calcula".

### Cambiado
- El cultivo ordena las recomendaciones: primero lo que su ficha técnica
  menciona para ese cultivo. En floración se penalizan los grupos que afectan
  a los polinizadores.
- Portada con paisaje animado.

### Corregido
- TIOXAM tenía "prevención" entre sus objetivos (es un momento de
  aplicación); hay una prueba que lo impide en adelante.
- PROTECSOL pasa de FRAC 33 a **FRAC P07**, según la reclasificación de los
  fosfonatos.
- La búsqueda reconocía "Propiconazol" y "Propiconazole" como moléculas
  distintas.

### Notas
- No se muestran dosis ni periodos de carencia o reentrada tomados de
  internet: las fuentes no coincidían entre sí. Se leen en la etiqueta ICA.

## [1.5.0]

### Agregado
- **Funciona sin señal y se instala en el teléfono.** Manifiesto, icono propio
  y service worker generado en el build con la lista exacta de archivos. La
  página se pide primero a la red (máximo 3 s) y si no hay señal se sirve la
  guardada. Aviso "Lista para usar sin conexión" y tarjeta para instalar.
- **Buscador global** en el encabezado. La búsqueda ignora tildes, acepta
  varias palabras, entiende nombres comunes de plagas ("mosca blanca",
  "arañita", "coquito") y trata los códigos como grupos: "3" trae 3A y 3B,
  "4a" ya no trae el 14A.
- **Favoritos y vistos hace poco**, guardados en el teléfono.
- **Programa de rotación sugerido** en el diagnóstico: tres pases sin repetir
  sitio de acción, que arranca después de lo último aplicado.
- **Mezcla guardada**, tamaños de bomba de un toque, **receta para enviar al
  operario** y **lista de chequeo antes de aplicar** (etiqueta, EPP, viento,
  lluvia, hora, compatibilidad, envases).
- Ficha con datos clave en mosaico y acciones rápidas: favorito, compartir,
  agregar a la mezcla y ver rotación.
- Aprender con tiempo de lectura, apartados numerados y "siguiente tema".

### Cambiado
- **Rediseño de la interfaz**: encabezado fijo y compacto con logotipo,
  asistente de diagnóstico por pasos con barra de avance, selector de
  producto con búsqueda en lugar de desplegables de 80 opciones, catálogo con
  filtros fijos al desplazarse y conteo por línea, contadores en rotación.
- **Animaciones** de entrada, listas escalonadas, indicadores que se deslizan,
  números que cuentan al cambiar y hojas que suben desde abajo; todas se
  apagan con "reducir movimiento".
- La ficha y los selectores usan una hoja inferior que se cierra arrastrando,
  con atrás, Escape o tocando fuera, y admite hojas apiladas.
- Los números ya no llevan ceros sobrantes ("20 bombas", no "20.0 bombas").
- **Cada sección conserva su estado y su posición** al cambiar de pestaña: el
  diagnóstico a medias sigue ahí al volver de Mezcla. Tocar la pestaña activa
  vuelve a su inicio, como en las apps nativas.

### Corregido
- **La versión publicada era la 1.1.** La 1.4.1 se había subido dentro de
  "App CicoCampo/" y GitHub Pages seguía construyendo el código viejo de la
  raíz. Ahora la raíz tiene la versión vigente y se eliminó la copia.
- El generador del artefacto dejaba un nombre vacío en la lista de iconos
  cuando un import ocupaba varias líneas. Ahora se filtra y hay una prueba.

## [1.4.1]

### Corregido
- **El artefacto de un solo archivo fallaba al abrir una ficha de producto**
  con "Can't find variable: useRef". El generador traía la lista de hooks de
  React escrita a mano en el encabezado, así que bastó con que la ficha
  estrenara `useRef` para romperlo. Ahora los hooks se detectan solos leyendo
  los módulos, igual que ya se hacía con los iconos.
- Se añadió una verificación que compara los identificadores usados en el
  artefacto contra los importados. Este tipo de fallo no aparece al compilar
  sino en tiempo de ejecución, así que necesitaba una prueba propia.

## [1.4.0]

### Corregido
- **La ficha de producto bloqueaba la aplicación.** Se abría a pantalla completa
  sin una salida clara y había que cerrar y reabrir la app. Ahora se cierra de
  cinco formas: botón "Volver" arriba, botón "Cerrar ficha" al final, tecla
  Escape, toque fuera del panel y botón físico de atrás del teléfono, que además
  ya no saca al usuario de la aplicación. También se bloquea el desplazamiento
  del fondo mientras la ficha está abierta.
- **Catálogo depurado contra el portafolio impreso 2026.** Se retiraron TAGEO
  247 SC, DETRIN BRIO 50 EC y la variante DIFENEX Gold, que ya no aparecen. El
  catálogo queda en 80 productos.
- Nombres, presentaciones y sellos comerciales ajustados al material impreso:
  BRAIN es alga + K2O 34% y no NPK; FRUTTOX va en 1 L y 4 L y FORTTEX en 100 g
  y 1 Kg (estaban intercambiados); Fertilita COMPPLEX se escribe con doble P.

### Agregado
- Tema **Reconocer el estrés en campo** con tres ilustraciones: cuatro causas
  que se confunden en la hoja, el patrón en el lote como primera pista, y los
  cuatro tipos de estrés abiótico con su respuesta agronómica.

## [1.3.0]

### Agregado
- **Seis ilustraciones vectoriales originales** intercaladas en el módulo
  Aprender: movimiento dentro de la planta, ciclo de vida del insecto y grupos
  que actúan en cada estadio, hongo verdadero frente a oomiceto, tipos de
  arvense, selección de resistencia generación a generación, y ventanas de
  acción preventiva, curativa y erradicante. Se dibujan en SVG y no con
  fotografías: las fotos de producto son material con derechos, y un esquema
  explica mejor un proceso invisible.
- **Comparador de productos** dentro del catálogo: hasta tres de la misma línea
  enfrentados por modo de acción, movimiento, velocidad, riesgo de resistencia,
  selectividad con benéficos y estadios que alcanzan. Avisa si dos de los
  comparados comparten sitio de acción y por tanto no sirven para rotar entre sí.

### Corregido
- Las puntas de flecha de los esquemas heredaban el grosor del trazo por no
  fijar `markerUnits`, y salían desproporcionadas; además apuntaban de lado
  porque con `orient="auto"` el marcador debe dibujarse hacia el eje +x.

## [1.2.0]

### Corregido
- **Nombres comerciales verificados contra el registro PLM/DEAQ Colombia de
  CIBOCHEM SAS.** 22 productos tenían el nombre mal transcrito desde el PDF del
  portafolio, donde el logotipo circular delante del nombre se leía como parte
  del texto. El caso más claro: "OROMECTIN" era en realidad **ROMECTIN 1.8 EC**.
  También se corrigieron ECIAMINA, GHAZA 200 SL, LAFIRMA, STOPWEST, CYPERWEST,
  METOMIL VASCAL, MEPIQUAT VASCAL, CARBENDAZIM 500 HXS, POWEREX, RIDDER 328 SC,
  LEILI ALGA 600, ALGA SOIL, LEILI 2000, entre otros.
- **Opciones de diagnóstico sin productos.** La rama de nutrición estaba fijada
  a la categoría Bioestimulante, así que "alargar brotes", "estimular brotación"
  y "compactar la planta" no devolvían nada: GIBOX y MEPIQUAT son reguladores de
  crecimiento, otra categoría. Ahora una rama puede abarcar varias categorías,
  porque para quien consulta es la misma pregunta.

### Agregado
- Rediseño visual alineado con la identidad de la app oficial: insignias
  hexagonales por línea, filas de menú con panel de color, barra de navegación
  inferior y paleta corporativa.
- Dos temas nuevos en Aprender: **Leer la etiqueta ICA** (cultivo registrado,
  periodo de carencia, periodo de reentrada, categoría toxicológica) y
  **Monitoreo y umbrales** (cuándo aplicar y cuándo no).
- Pruebas que garantizan que ninguna opción del diagnóstico quede vacía y que
  todo producto sea alcanzable desde alguna rama.

## [1.1.0]

### Corregido
- **Rotación por número de grupo.** La versión anterior comparaba el código
  completo del grupo, tratando IRAC 3A y 3B como sitios de acción distintos.
  IRAC especifica que la alternancia se planifica con los grupos numerados: la
  letra solo distingue la familia química dentro del mismo sitio. Corregido en
  `grupoDeRotacion()`.

### Agregado
- Capa de conocimiento por grupo de modo de acción (`gruposMoA.js`): sitio de
  acción, mecanismo, síntomas, translocación, estadios, motivo de rotación,
  criterio de elección y precauciones para 27 grupos IRAC, HRAC y FRAC.
- Módulo **Ciclo de vida**: matriz de qué estadio de la plaga alcanza cada
  insecticida.
- Módulo **Aprender**: seis temas de referencia agronómica y preguntas de campo.
- Calculadora multiproducto con calibración real del equipo, orden de carga del
  tanque y detección de modos de acción repetidos dentro de la misma mezcla.
- Separación de la lógica en tres motores con responsabilidad única.

## [1.0.0]

### Agregado
- Base de datos de 83 productos del portafolio Cibochem 2026.
- Diagnóstico guiado, catálogo con búsqueda, planificador de rotación y
  calculadora de mezcla.

### Corregido
- **Filtro duro de objetivo.** La primera versión sumaba puntos por cultivo y
  momento aunque el producto no controlara el organismo buscado, lo que llegó a
  recomendar triazoles para oomicetos. El objetivo pasó a ser filtro y no
  puntaje.
