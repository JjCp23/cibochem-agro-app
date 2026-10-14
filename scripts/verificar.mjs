/**
 * Pruebas de integridad y lógica agronómica.
 *
 * No usa framework a propósito: corre con `node scripts/verificar.mjs` sin
 * instalar nada extra, y es lo que ejecuta GitHub Actions antes de desplegar.
 *
 * Lo que se verifica aquí no es "que el código no explote", sino que las
 * decisiones agronómicas sigan siendo correctas: que la rotación compare por
 * número de grupo, que un triazol nunca se recomiende para un oomiceto y que
 * las cuentas de mezcla cuadren.
 */

import { readFileSync, existsSync } from 'node:fs';
import { PRODUCTOS } from '../src/data/productos.js';
import { RAMAS } from '../src/data/taxonomia.js';
import {
  GRUPOS_MOA,
  TRANSLOCACION,
  ESTADIOS,
  fichasDeProducto,
  grupoDeRotacion,
} from '../src/data/gruposMoA.js';
import { TEMAS, PREGUNTAS } from '../src/data/conocimiento.js';
import {
  recomendar,
  compartenModoDeAccion,
  construirPrograma,
  estadiosDeProducto,
  alternativasDeRotacion,
} from '../src/motores/index.js';
import {
  calcularMezcla,
  calcularCalibracion,
  unidadesSugeridas,
  UNIDADES,
  ORDEN_TANQUE,
  formulacionDe,
  analizarFormulaciones,
} from '../src/motores/aplicacion.js';

let fallos = 0;
let pruebas = 0;

function check(condicion, mensaje) {
  pruebas += 1;
  if (!condicion) {
    console.error(`  ✗ ${mensaje}`);
    fallos += 1;
  }
}

function seccion(titulo) {
  console.log(`\n${titulo}`);
}

const buscar = (id) => PRODUCTOS.find((p) => p.id === id);

// ────────────────────────────────────────────────────────────
seccion('Integridad de los datos de producto');
const REQUERIDOS = [
  'id', 'nombre', 'ia', 'categoria', 'grupo', 'familia',
  'mecanismo', 'movimiento', 'objetivos', 'escenarios',
  'momento', 'riesgo', 'presentaciones', 'estado',
];
const ids = new Set();
PRODUCTOS.forEach((p) => {
  REQUERIDOS.forEach((campo) => {
    const v = p[campo];
    const vacio = v == null || v === '' || (Array.isArray(v) && v.length === 0);
    check(!vacio, `${p.nombre}: falta "${campo}"`);
  });
  check(!ids.has(p.id), `id duplicado: ${p.id}`);
  ids.add(p.id);
  check(
    ['Insecticida', 'Herbicida', 'Fungicida', 'Bioestimulante', 'Regulador'].includes(p.categoria),
    `${p.nombre}: categoría inválida "${p.categoria}"`
  );
  check(['Alto', 'Medio', 'Bajo', 'Nulo'].includes(p.riesgo), `${p.nombre}: riesgo inválido`);
  check(['Disponible', 'Nuevo', 'Pronto'].includes(p.estado), `${p.nombre}: estado inválido`);
});

// ────────────────────────────────────────────────────────────
seccion('Integridad de las fichas de grupo');
Object.entries(GRUPOS_MOA).forEach(([clave, g]) => {
  ['nombre', 'sitioAccion', 'mecanismo', 'sintomas', 'translocacion', 'riesgo', 'rotacionMotivo'].forEach(
    (campo) => check(g[campo], `${clave}: falta "${campo}"`)
  );
  check(TRANSLOCACION[g.translocacion], `${clave}: translocación "${g.translocacion}" no existe`);
  if (clave.startsWith('IRAC')) {
    check(Array.isArray(g.estadios) && g.estadios.length > 0, `${clave}: sin estadios`);
  }
  g.estadios?.forEach((e) =>
    check(ESTADIOS.some((x) => x.id === e), `${clave}: estadio "${e}" desconocido`)
  );
});

// ────────────────────────────────────────────────────────────
seccion('Cobertura: todo producto clasificado hereda su ficha');
PRODUCTOS.forEach((p) => {
  if (!p.sistema) return;
  const esperadas = String(p.grupo).split('+').length;
  check(
    fichasDeProducto(p).length === esperadas,
    `${p.nombre} (${p.sistema} ${p.grupo}): ${fichasDeProducto(p).length}/${esperadas} fichas`
  );
});

// ────────────────────────────────────────────────────────────
seccion('Etiquetas declaradas en la taxonomía');
const validas = new Set();
RAMAS.forEach((r) =>
  [...r.objetivos, ...r.escenarios, ...r.momentos].forEach((o) => validas.add(o.id))
);
PRODUCTOS.forEach((p) =>
  [...(p.objetivos || []), ...(p.escenarios || []), ...(p.momento || [])].forEach((t) =>
    check(validas.has(t), `${p.nombre}: etiqueta "${t}" no existe en taxonomia.js`)
  )
);

// ────────────────────────────────────────────────────────────
seccion('Ninguna opción del diagnóstico queda sin productos');
RAMAS.forEach((r) => {
  r.objetivos.forEach((o) => {
    const n = recomendar({ categorias: r.categorias, objetivo: o.id }).length;
    check(n > 0, `${r.titulo} → objetivo "${o.label}" no devuelve ningún producto`);
  });
  r.escenarios.forEach((e) => {
    const n = PRODUCTOS.filter(
      (p) => r.categorias.includes(p.categoria) && p.escenarios?.includes(e.id)
    ).length;
    check(n > 0, `${r.titulo} → escenario "${e.label}" sin productos`);
  });
  r.momentos.forEach((m) => {
    const n = PRODUCTOS.filter(
      (p) => r.categorias.includes(p.categoria) && p.momento?.includes(m.id)
    ).length;
    check(n > 0, `${r.titulo} → momento "${m.label}" sin productos`);
  });
});

// ────────────────────────────────────────────────────────────
seccion('Todo producto es alcanzable desde alguna rama del diagnóstico');
PRODUCTOS.forEach((p) => {
  const alcanzable = RAMAS.some(
    (r) =>
      r.categorias.includes(p.categoria) &&
      r.objetivos.some((o) => p.objetivos?.includes(o.id))
  );
  check(alcanzable, `${p.nombre} no se puede encontrar desde ninguna rama`);
});

// ────────────────────────────────────────────────────────────
seccion('Rotación: se compara por número de grupo, no por letra (regla IRAC)');
check(grupoDeRotacion('IRAC', '3A') === '3', '3A debe reducirse a 3');
check(grupoDeRotacion('IRAC', '22A') === '22', '22A debe reducirse a 22');
check(grupoDeRotacion('FRAC', 'M03') === 'M03', 'los códigos multisitio se conservan completos');
check(
  compartenModoDeAccion(buscar('cyper'), buscar('lambdox')),
  'dos piretroides (3A) deben chocar entre sí'
);
check(
  !compartenModoDeAccion(buscar('cyper'), buscar('eseoese')),
  '3A y 22A tocan el canal de sodio en sitios distintos: NO deben chocar'
);
check(
  compartenModoDeAccion(buscar('ridder'), buscar('tioxam')),
  'una mezcla 6+4A debe chocar con un 4A puro'
);
check(
  !compartenModoDeAccion(buscar('manconex'), buscar('cloropaz')),
  'M03 y M05 son grupos multisitio distintos'
);

// ────────────────────────────────────────────────────────────
seccion('El objetivo es filtro duro: un triazol no controla oomicetos');
const oomicetos = recomendar({ categoria: 'Fungicida', objetivo: 'oomicetos', momento: 'preventivo' });
check(oomicetos.length > 0, 'debe haber productos para oomicetos');
oomicetos.forEach((p) =>
  check(
    p.objetivos.includes('oomicetos'),
    `${p.nombre} apareció en oomicetos sin controlarlos`
  )
);
check(
  !oomicetos.some((p) => String(p.grupo).trim() === '3'),
  'un triazol puro (FRAC 3) no debe aparecer: el oomiceto no tiene ergosterol'
);

// ────────────────────────────────────────────────────────────
seccion('Programa de rotación: ningún pase repite modo de acción');
const programa = construirPrograma(
  { categoria: 'Insecticida', objetivo: 'lepidopteros', momento: 'larvas-activas' },
  4
);
check(programa.length >= 3, 'debe encontrar al menos 3 pases distintos');
for (let i = 0; i < programa.length; i += 1) {
  for (let j = i + 1; j < programa.length; j += 1) {
    check(
      !compartenModoDeAccion(programa[i], programa[j]),
      `el programa repite modo de acción: ${programa[i].nombre} y ${programa[j].nombre}`
    );
  }
}

// ────────────────────────────────────────────────────────────
seccion('Alternativas de rotación: nunca comparten sitio de acción');
['ridder', 'reddi', 'benevolo'].forEach((id) => {
  const p = buscar(id);
  alternativasDeRotacion(p).forEach((alt) =>
    check(!compartenModoDeAccion(p, alt), `${alt.nombre} no debería ser alternativa de ${p.nombre}`)
  );
});

// ────────────────────────────────────────────────────────────
seccion('Ciclo de vida: los reguladores no alcanzan adultos');
check(!estadiosDeProducto(buscar('acarisil')).includes('adulto'), 'IRAC 7C no mata adultos');
check(!estadiosDeProducto(buscar('zutano')).includes('adulto'), 'IRAC 15 no mata adultos');
check(estadiosDeProducto(buscar('cyper')).includes('adulto'), 'un piretroide sí mata adultos');

// ────────────────────────────────────────────────────────────
seccion('Calculadora de mezcla');
const m1 = calcularMezcla({ dosis: 1, unidad: 'L/ha', area: 2, volumenHa: 200, capacidadBomba: 20 });
check(m1.numeroBombas === 20, '2 ha a 200 L/ha con bomba de 20 L son 20 bombas');
check(m1.productoTotal === 2, '1 L/ha en 2 ha son 2 L');
check(
  Math.abs(m1.productoPorBomba * m1.numeroBombas - m1.productoTotal) < 1e-9,
  'producto por bomba × número de bombas debe igualar el total'
);

const m2 = calcularMezcla({ dosis: 2, unidad: 'cc/L', area: 1, volumenHa: 200, capacidadBomba: 20 });
check(Math.abs(m2.productoPorBomba - 0.04) < 1e-9, '2 cc/L en bomba de 20 L son 40 cc');

const m3 = calcularMezcla({ dosis: 500, unidad: 'g/ha', area: 1, volumenHa: 200, capacidadBomba: 20 });
check(Math.abs(m3.productoTotal - 0.5) < 1e-9, '500 g/ha en 1 ha son 0.5 Kg');

check(
  calcularMezcla({ dosis: 0, unidad: 'L/ha', area: 1, volumenHa: 200, capacidadBomba: 20 }) === null,
  'una dosis de cero no debe producir resultado'
);

const cal = calcularCalibracion({ gastoLitros: 4, anchoFranja: 2, distancia: 100 });
check(cal.volumenHa === 200, '4 L en una franja de 2 m × 100 m son 200 L/ha');

// ────────────────────────────────────────────────────────────
seccion('Unidades sugeridas según el envase');
PRODUCTOS.forEach((p) => {
  const u = unidadesSugeridas(p);
  check(u.length > 0, `${p.nombre}: sin unidades sugeridas`);
  u.forEach((x) => check(UNIDADES[x], `${p.nombre}: unidad inválida "${x}"`));
});

// ────────────────────────────────────────────────────────────
seccion('Orden de carga del tanque');
// La caneca de la pestaña "Orden de carga" se llena con estos niveles: nunca
// pueden bajar de un paso al siguiente y el último deja la caneca llena.
ORDEN_TANQUE.forEach((p, i) => {
  check(p.paso === i + 1, `el paso ${p.paso} está fuera de orden`);
  check(p.nivel > 0 && p.nivel <= 1, `paso ${p.paso}: nivel fuera de rango`);
  if (i > 0) check(p.nivel >= ORDEN_TANQUE[i - 1].nivel, `paso ${p.paso}: el nivel baja respecto al anterior`);
});
check(ORDEN_TANQUE[ORDEN_TANQUE.length - 1].nivel === 1, 'el último paso debe dejar la caneca llena');
const wg = formulacionDe({ nombre: 'PRUEBA 80 WG' });
const ec = formulacionDe({ nombre: 'PRUEBA 20 EC' });
check(wg && ec && wg.ordenCarga < ec.ordenCarga, 'un granulado dispersable (WG) entra antes que un emulsionable (EC)');
check(
  analizarFormulaciones([{ nombre: 'A WG' }, { nombre: 'B SC' }, { nombre: 'C EC' }]).riesgo,
  'tres formulaciones distintas en el tanque deben marcar riesgo de incompatibilidad'
);
check(
  !analizarFormulaciones([{ nombre: 'A EC' }, { nombre: 'B EC' }]).riesgo,
  'dos productos de la misma formulación no son riesgo por formulación'
);

// ────────────────────────────────────────────────────────────
seccion('Contenido de referencia');
check(TEMAS.length > 0, 'debe haber temas en el módulo Aprender');
TEMAS.forEach((t) => {
  check(t.id && t.titulo && t.resumen, `tema incompleto: ${t.id}`);
  check(t.secciones?.length > 0, `${t.id}: sin secciones`);
  t.secciones.forEach((s) => check(s.titulo && s.texto, `${t.id}: sección incompleta`));
});
PREGUNTAS.forEach((q) => check(q.p && q.r, 'pregunta frecuente incompleta'));

// ────────────────────────────────────────────────────────────
seccion('Artefacto de un solo archivo: nada usado sin importar');
const rutaArtefacto = 'dist-artefacto/CibochemCampo.jsx';
if (!existsSync(rutaArtefacto)) {
  console.log('  (no generado todavía; corre npm run artefacto)');
} else {
  const src = readFileSync(rutaArtefacto, 'utf8');
  const importados = new Set(['React']);
  for (const m of src.matchAll(/import\s+(?:React\s*,\s*)?\{([^}]+)\}\s*from/g)) {
    m[1].split(',').forEach((x) => importados.add(x.trim()));
  }
  const declarados = new Set();
  for (const m of src.matchAll(/^(?:export\s+)?(?:function|const|let|class)\s+(\w+)/gm)) {
    declarados.add(m[1]);
  }
  // El encabezado del artefacto se genera solo; si un módulo estrena un hook y
  // no queda importado, la app falla en tiempo de ejecución y no al compilar.
  const hooks = ['useState', 'useEffect', 'useMemo', 'useRef', 'useCallback', 'useReducer', 'useContext', 'useLayoutEffect'];
  hooks.forEach((h) => {
    const seUsa = new RegExp('[^.\\w]' + h + '\\s*\\(').test(src);
    check(
      !seUsa || importados.has(h) || declarados.has(h) || src.includes('React.' + h),
      `el artefacto usa ${h} sin importarlo`
    );
  });
}

// ────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(56)}`);
if (fallos === 0) {
  console.log(`✓ ${pruebas} verificaciones pasaron`);
  console.log(
    `  ${PRODUCTOS.length} productos · ${Object.keys(GRUPOS_MOA).length} grupos de modo de acción · ${TEMAS.length} temas`
  );
  process.exit(0);
} else {
  console.error(`✗ ${fallos} de ${pruebas} verificaciones fallaron`);
  process.exit(1);
}
