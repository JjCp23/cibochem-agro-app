# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

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
