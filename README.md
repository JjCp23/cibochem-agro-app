# Cibochem Campo

Selector agronómico construido sobre el portafolio de productos Cibochem 2026.
Convierte una situación de campo — *"tengo mosca blanca en etapa vegetativa y la
última vez apliqué un neonicotinoide"* — en una lista corta de productos que
encajan, ordenada y explicada.

![Estado](https://img.shields.io/badge/verificaciones-4000%2B-brightgreen)
![PWA](https://img.shields.io/badge/funciona-sin%20se%C3%B1al-2B7FB8)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)

---

## Qué hace

| Módulo | Para qué sirve |
|---|---|
| **Diagnóstico por cultivo** | Escoges el cultivo y lo que ves en el lote (con nombre científico). La app arma una **recomendación técnica**: producto, acompañante, siguiente rotación, cómo aplicarlo, qué vas a ver y qué confirmar en la etiqueta. |
| **Diagnóstico** | Asistente por pasos: qué plaga, maleza o enfermedad, dónde, cuándo y qué aplicaste antes. Devuelve productos ordenados con la razón de cada uno y un **programa de rotación de 3 pases** que no repite sitio de acción. |
| **Catálogo** | Búsqueda por nombre comercial, ingrediente activo, familia química, código de grupo o **nombre de la plaga** ("mosca blanca", "coquito"), sin importar tildes. Filtros por línea, favoritos y disponibilidad, y comparador lado a lado. |
| **Rotación** | Escoges lo que acabas de aplicar —un producto Cibochem o **la molécula de otra casa**— y separa el portafolio en lo que **repite** el sitio de acción y lo que **sí sirve** para rotar, explicando por qué importa rotar ese grupo. |
| **Ciclo de vida** | Matriz de qué estadio de la plaga alcanza cada insecticida. Muchos fracasos de campo son el producto correcto en el estadio equivocado. |
| **Mezcla** | Calculadora multiproducto que **queda guardada en el teléfono**, calibración real del equipo, orden de carga, detección de modos de acción repetidos, **receta para enviar al operario** por WhatsApp y **lista de chequeo antes de aplicar**. |
| **Aprender** | El razonamiento agronómico completo: resistencia, translocación, biología de arvenses, hongos frente a oomicetos, ciclo de vida y calidad de aplicación. |

### Pensada para usarse en el lote

- **Funciona sin señal.** Se instala en el teléfono como una app (Android,
  iOS y escritorio) y guarda todo en el equipo desde la primera visita.
- **Buscador global** en el encabezado, desde cualquier sección.
- **Cada sección recuerda dónde ibas**: cambiar de pestaña no borra el
  diagnóstico a medias ni los filtros del catálogo.
- **Favoritos y vistos hace poco**, guardados en el teléfono, sin cuentas.
- **Ficha técnica en hoja deslizable**: se cierra arrastrando hacia abajo, con
  el botón atrás del teléfono, con Escape o tocando fuera. Desde la ficha se
  comparte el producto, se agrega a la mezcla o se abre su plan de rotación.
- **Animaciones cortas y con propósito** (de dónde viene un panel, qué número
  cambió). Quien activa "reducir movimiento" en su teléfono no ve ninguna.

---

## Los tres cerebros

La lógica está separada por responsabilidad. Cada motor responde una sola
pregunta y no sabe nada de las otras dos:

```
                 ┌──────────────────────────────┐
                 │        src/data/             │
                 │  productos · gruposMoA       │
                 │  taxonomia · conocimiento    │
                 └───────────────┬──────────────┘
                                 │
     ┌───────────────────────────┼───────────────────────────┐
     │                           │                           │
┌────▼─────────┐        ┌────────▼────────┐        ┌─────────▼────────┐
│ resistencia  │◄───────│   diagnostico   │        │    aplicacion    │
├──────────────┤        ├─────────────────┤        ├──────────────────┤
│ ¿Comparten   │        │ ¿Qué producto   │        │ ¿Cuánto producto,│
│ sitio de     │        │ encaja con esta │        │ cuántas bombas,  │
│ acción?      │        │ situación?      │        │ en qué orden?    │
│ ¿Con qué     │        │                 │        │                  │
│ roto?        │        │                 │        │                  │
└──────────────┘        └─────────────────┘        └──────────────────┘
                                 │
                 ┌───────────────▼──────────────┐
                 │      src/components/         │
                 │   solo pintan, no deciden    │
                 └──────────────────────────────┘
```

`diagnostico` consulta a `resistencia` para penalizar lo que repite el modo de
acción anterior, pero no reimplementa esa lógica. Los componentes importan
siempre desde `src/motores/index.js`, así el interior se puede reorganizar sin
tocar la interfaz.

---

## Criterio agronómico

Tres reglas gobiernan todo el comportamiento de la app:

**1. La rotación se compara por el número del grupo, no por la letra.**
IRAC es explícito: la alternancia se planifica con los grupos numerados. La
letra solo distingue la familia química dentro del mismo sitio de acción, así
que un 3A y un 3B comparten resistencia cruzada. Implementado en
`grupoDeRotacion()`.

**2. El objetivo es un filtro duro, no un criterio de puntaje.**
Un producto que no controla el organismo buscado nunca aparece, por bien que
encaje en cultivo y momento. Es la regla que evita recomendar un triazol para un
oomiceto, que no tiene ergosterol en su membrana.

**3. La app nunca inventa dosis ni cultivos registrados.**
Esa información sale de la etiqueta ICA vigente. La calculadora hace la
aritmética, no la recomendación.

Las mezclas comerciales (`"6 + 4A"`) se descomponen en sus códigos individuales,
así que el sistema detecta solapamiento parcial de modo de acción.

---

## Correr el proyecto

Necesitas [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Revisa el build localmente |
| `npm run verificar` | Pruebas de integridad y lógica agronómica |
| `npm run artefacto` | Genera la versión de un solo archivo |

El modo sin conexión solo se activa en el build publicado (`npm run build` y
`npm run preview`). En desarrollo se desactiva a propósito para no servir
versiones guardadas mientras se edita.

---

## Subirlo a GitHub

El repositorio ya está inicializado con un primer commit. Solo falta conectarlo:

```bash
# 1. Crea el repositorio vacío en github.com/new
#    (sin README, sin .gitignore, sin licencia: ya están aquí)

# 2. Conecta y sube
git remote add origin https://github.com/TU-USUARIO/cibochem-campo.git
git branch -M main
git push -u origin main
```

### Publicarlo en la web, gratis

En GitHub: **Settings → Pages → Source: GitHub Actions**. Con eso, cada push a
`main` construye y publica la app en
`https://TU-USUARIO.github.io/cibochem-campo/`.

El flujo corre `npm run verificar` antes de desplegar: si una prueba agronómica
falla, no publica. `vite.config.js` usa rutas relativas, así que funciona igual
en un subdirectorio de Pages o en un dominio propio.

---

## Estructura

```
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml       ← publica en Pages al hacer push a main
│   │   └── verificar.yml    ← corre pruebas en cada pull request
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── public/                  ← manifiesto e iconos de la app instalable
├── scripts/
│   ├── verificar.mjs        ← suite de pruebas, sin framework
│   ├── sw-plantilla.js      ← service worker; el build le escribe la lista de archivos
│   └── generar-artefacto.mjs
└── src/
    ├── data/
    │   ├── productos.js     ← BASE DE DATOS: aquí se agregan productos
    │   ├── gruposMoA.js     ← conocimiento por grupo IRAC/HRAC/FRAC
    │   ├── conocimiento.js  ← contenido del módulo Aprender
    │   ├── taxonomia.js     ← árbol de diagnóstico, colores, etiquetas
    │   ├── campo.js         ← ficha de campo por producto (guía + fichas técnicas)
    │   ├── gruposQuimicos.js← grupos, moléculas de otras casas, gemelos funcionales
    │   ├── cultivos.js      ← 18 cultivos con sus problemas y nombre científico
    │   └── iconosIlustrados.js ← qué ícono representa cada concepto
    ├── motores/
    │   ├── resistencia.js   ← cerebro 1
    │   ├── diagnostico.js   ← cerebro 2 (incluye la búsqueda)
    │   ├── aplicacion.js    ← cerebro 3 (incluye la receta de mezcla)
    │   └── index.js         ← punto único de entrada
    ├── estado/
    │   └── memoria.js       ← favoritos, recientes y mezcla guardados en el teléfono
    ├── components/
    │   ├── Diagnostico.jsx  · Catalogo.jsx   · Rotacion.jsx
    │   ├── CicloVida.jsx    · Mezcla.jsx     · Aprender.jsx
    │   ├── Buscador.jsx     · Comparador.jsx
    │   ├── FichaProducto.jsx · TarjetaProducto.jsx
    │   └── ui/
    │       ├── Movimiento.jsx       ← animaciones y estilos globales
    │       ├── Hoja.jsx             ← hoja inferior (ficha, buscador, selector)
    │       ├── SelectorProducto.jsx ← selector con búsqueda
    │       ├── Avisos.jsx           ← avisos breves y compartir
    │       ├── Superficie.jsx       ← encabezado, barra inferior, chips, logotipo
    │       ├── Iconos.jsx · Etiqueta.jsx · Ilustraciones.jsx
    └── App.jsx
```

### Por qué el conocimiento vive separado de los productos

El contenido técnico pesado (sitio de acción, bioquímica, translocación,
estadios afectados, motivo de rotación, precauciones) está en `gruposMoA.js`
indexado por grupo, **no repetido en los 83 productos**. Cada producto declara a
qué grupo pertenece y hereda todo:

- Si FRAC reclasifica un grupo, se corrige en un solo lugar.
- Un producto en mezcla (`"6 + 4A"`) hereda automáticamente las dos fichas.
- Agregar un producto de un grupo ya descrito no exige escribir nada técnico.

---

## Agregar un producto

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para el detalle. En resumen: todo va en
`src/data/productos.js`, y los valores de `objetivos`, `escenarios` y `momento`
deben existir en `src/data/taxonomia.js`. Después:

```bash
npm run verificar
```

---

## Fuentes de la clasificación

- **IRAC** Mode of Action Classification Scheme v11.5, incluida la regla de que
  la rotación se planifica con los grupos numerados.
- **HRAC Global**, numeración adoptada en 2020 en reemplazo de las letras. La
  app muestra el código legado entre paréntesis porque en campo sigue usándose.
- **FRAC** Code List 2025, incluidos los códigos M de multisitio.

---

## Siguientes versiones

- Guardar programas de aplicación por lote y exportarlos a PDF.
- Historial de aplicaciones por finca, para calcular la rotación contra las
  últimas 2–3 aplicaciones y no solo la anterior (la memoria local ya existe:
  `src/estado/memoria.js`).
- Umbrales de acción por plaga y cultivo.
- Costo por hectárea a partir de precio y dosis.

---

## Aviso

Herramienta de apoyo a la decisión, no sustituto de la etiqueta ni de la
asistencia técnica. Verifica siempre cultivo registrado, dosis, periodo de
carencia, periodo de reentrada y compatibilidad antes de aplicar.

Licencia [MIT](LICENSE).
