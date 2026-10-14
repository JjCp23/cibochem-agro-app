# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [1.5.0]

Versión recuperada de la publicada en https://cibochem-campo.pages.dev, que
iba por delante del código de GitHub (1.4.1). Se reconstruyó el fuente a partir
del paquete publicado; el build resultante coincide con él salvo los nombres
que asigna el minificador. Los datos (80 productos, fichas de grupo,
taxonomía y temas de Aprender) ya eran iguales.

### Agregado
- **Caneca de 200 L como guía del orden de mezcla.** La pestaña "Orden de
  carga" muestra una caneca que se llena paso a paso con animación: cada paso
  deja su capa, dice qué formulaciones entran ahí, cuáles productos de la
  mezcla van en ese paso con su dosis por bomba y por qué se hace. El orden de
  carga pasó de 7 a 13 pasos, cada uno con su explicación.
- **Repaso rápido** de cinco ideas para que no se corte la mezcla, en ventana
  con flechas del teclado.
- **Coadyuvantes: qué hace cada tipo**, en secciones plegables, junto con los
  pasos del orden de carga.
- **Semáforo de la mezcla** y aviso de **formulaciones distintas**: desde tres
  tipos de formulación en el tanque se marca riesgo de incompatibilidad.
  `formulacionDe` reconoce más siglas (WSB, WSP, DF, SP, SE, FL, EW) y ubica
  cada una en su paso; nueva `analizarFormulaciones`.
- **Íconos ilustrados** para cada objetivo del diagnóstico: 12 plagas, 7 tipos
  de maleza y 8 enfermedades, dibujados en SVG con la interfaz de lucide-react.
- **Fotos de empaque** en la tarjeta y la ficha de producto (64 de los 80; si
  un producto no tiene foto, la imagen se oculta sin dejar hueco).
- **Aplicación instalable (PWA)**: manifest con atajos a Diagnóstico y Mezcla,
  service worker que deja la app completa sin señal, aviso de "sin conexión",
  aviso de versión nueva que actualiza y recarga, e invitación a instalar.
- Atajos de URL `?vista=diagnostico`, `?vista=mezcla` (y las demás pestañas).
- **Modo campo**: botón de sol en el encabezado que agranda texto y botones
  para leer bajo el sol o tocar con guantes. Se recuerda entre visitas.

### Cambiado
- Los choques de modo de acción en la mezcla se muestran en ámbar; el rojo
  queda para la incompatibilidad de formulaciones.
- El aviso del pie aclara que la decisión final y la aplicación en campo son
  responsabilidad de quien las ejecuta.

### Corregido
- La ficha de producto se cierra siempre a través del historial, así "atrás",
  Escape y los botones consumen la misma entrada; y el toque que abre la ficha
  ya no la cierra al caer sobre el fondo.
- El generador del artefacto producía `import { , ... }` cuando un import de
  lucide-react ocupaba varias líneas con coma final.

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
