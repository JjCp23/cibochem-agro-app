# Cómo contribuir

## Antes de tocar código

El proyecto tiene una regla que está por encima de cualquier otra:

> **La app nunca inventa dosis ni cultivos registrados.**

Esa información sale de la etiqueta ICA vigente. Un pull request que agregue
dosis "de referencia" o cultivos no verificados será rechazado, por bien
escrito que esté el código.

## Estructura mental del proyecto

Hay tres cerebros con responsabilidades separadas. Si una función no encaja
claramente en uno de ellos, probablemente está mal ubicada:

| Cerebro | Responde | Archivo |
|---|---|---|
| Resistencia | ¿Comparten sitio de acción? ¿Con qué roto? | `src/motores/resistencia.js` |
| Diagnóstico | ¿Qué producto encaja con esta situación? | `src/motores/diagnostico.js` |
| Aplicación | ¿Cuánto producto, cuántas bombas, en qué orden? | `src/motores/aplicacion.js` |

Los datos van en `src/data/`. Los componentes solo pintan: no deben contener
lógica agronómica.

## Agregar un producto

Todo en `src/data/productos.js`. Si el producto pertenece a un grupo de modo de
acción ya descrito en `gruposMoA.js`, no hay que escribir nada técnico: hereda
mecanismo, translocación, estadios, riesgo y motivo de rotación.

```js
{
  id: 'nuevo-producto',
  nombre: 'PRODUCTO 500 SC',
  ia: 'Ingrediente activo 500 g/L',
  categoria: 'Fungicida',
  sistema: 'FRAC',
  grupo: '11 + 3',        // " + " separa los sitios de acción de una mezcla
  familia: 'Estrobilurina + Triazol',
  mecanismo: 'Resumen corto.',
  movimiento: 'Sistémico + translaminar',
  objetivos: ['hongos-foliares'],   // ids de taxonomia.js
  escenarios: ['general'],
  momento: ['preventivo', 'curativo'],
  riesgo: 'Medio',
  presentaciones: ['1 L'],
  estado: 'Disponible',
}
```

Los valores de `objetivos`, `escenarios` y `momento` **deben existir** en
`src/data/taxonomia.js`. Si falta uno, agrégalo primero en la rama que
corresponda.

## Agregar un grupo de modo de acción

En `src/data/gruposMoA.js`, con la clave `SISTEMA:CODIGO` (por ejemplo
`FRAC:40`). Campos obligatorios: `nombre`, `sitioAccion`, `mecanismo`,
`sintomas`, `translocacion`, `riesgo`, `rotacionMotivo`. Para grupos IRAC además
`estadios`.

Cita la fuente en el commit: IRAC MoA Classification, HRAC Global o FRAC Code
List, con su versión.

## Antes de abrir el pull request

```bash
npm run verificar   # pruebas de integridad y lógica agronómica
npm run build       # debe compilar sin errores
```

## Estilo

- Código y comentarios en español, igual que el resto del proyecto.
- Los comentarios explican **por qué**, no **qué**. El qué se lee en el código.
- Nada de dependencias nuevas sin justificarlo en el pull request.
