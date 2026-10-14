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

import { readFileSync, existsSync, readdirSync } from 'node:fs';
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
  recetaDeMezcla,
  formatear,
  unidadAmigable,
  envasesNecesarios,
  partirCantidad,
} from '../src/motores/aplicacion.js';
import { buscarTexto, normalizarTexto } from '../src/motores/diagnostico.js';
import { codigosDeGrupo } from '../src/data/gruposMoA.js';
import { alternarEnLista, anteponerReciente, productosDeIds } from '../src/estado/memoria.js';
import { CAMPO } from '../src/data/campo.js';
import { CULTIVOS } from '../src/data/cultivos.js';
import { GRUPOS_QUIMICOS, GRUPOS_FUNCIONALES } from '../src/data/gruposQuimicos.js';
import { ICONO_ILUSTRADO } from '../src/data/iconosIlustrados.js';
import { recomendacionTecnica, recomendar as recomendarConCultivo } from '../src/motores/diagnostico.js';
import {
  gemelosDe,
  mismaMoleculaDe,
  productoDesdeMolecula,
  mismosModoDeAccion,
  clavesDeGrupo,
  MOLECULAS_PARA_VERIFICAR,
} from '../src/motores/resistencia.js';

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
seccion('Contenido de referencia');
check(TEMAS.length > 0, 'debe haber temas en el módulo Aprender');
TEMAS.forEach((t) => {
  check(t.id && t.titulo && t.resumen, `tema incompleto: ${t.id}`);
  check(t.secciones?.length > 0, `${t.id}: sin secciones`);
  t.secciones.forEach((s) => check(s.titulo && s.texto, `${t.id}: sección incompleta`));
});
PREGUNTAS.forEach((q) => check(q.p && q.r, 'pregunta frecuente incompleta'));

// ────────────────────────────────────────────────────────────
seccion('Búsqueda: sin tildes, varias palabras, nombres comunes y códigos');
check(normalizarTexto('Ácaros ÑAME') === 'acaros name', 'normalizar quita tildes y pasa a minúsculas');
check(buscarTexto('').length === PRODUCTOS.length, 'una búsqueda vacía devuelve todo');
check(buscarTexto('tioxam')[0]?.id === 'tioxam', 'el nombre comercial va primero');
check(
  buscarTexto('antranilicas').some((p) => p.familia === 'Diamidas antranílicas'),
  'buscar sin tilde encuentra la familia con tilde'
);
const moscaBlanca = buscarTexto('mosca blanca');
check(moscaBlanca.length > 0, '"mosca blanca" debe encontrar productos por su objetivo');
moscaBlanca.forEach((p) =>
  check(p.objetivos.includes('chupadores'), `${p.nombre} apareció en "mosca blanca" sin controlar chupadores`)
);
const grupo4A = buscarTexto('4a');
check(grupo4A.length > 0, 'buscar "4a" debe devolver neonicotinoides');
grupo4A.forEach((p) =>
  check(
    codigosDeGrupo(p.grupo).some((c) => c.toUpperCase() === '4A'),
    `buscar "4a" no debe traer ${p.nombre} (${p.grupo})`
  )
);
check(
  buscarTexto('3').some((p) => codigosDeGrupo(p.grupo).includes('3A')),
  'buscar el grupo 3 debe incluir el subgrupo 3A'
);
check(buscarTexto('zzzz').length === 0, 'una búsqueda sin sentido no devuelve nada');

// ────────────────────────────────────────────────────────────
seccion('Programa de rotación: arranca después de lo último aplicado');
const ultimo = buscar('lambdox');
const programaTrasUltimo = construirPrograma(
  { categoria: 'Insecticida', objetivo: 'chupadores', ultimoUsado: ultimo },
  3
);
check(programaTrasUltimo.length > 0, 'debe haber programa tras un piretroide');
programaTrasUltimo.forEach((p) =>
  check(!compartenModoDeAccion(p, ultimo), `${p.nombre} repite el sitio de acción de ${ultimo.nombre}`)
);

// ────────────────────────────────────────────────────────────
seccion('Receta de mezcla para compartir');
const receta = recetaDeMezcla({
  area: 2,
  volumenHa: 200,
  capacidadBomba: 20,
  lineas: [
    { producto: buscar('cyper'), dosis: 300, unidad: 'cc/ha' },
    { producto: buscar('tioxam'), dosis: 200, unidad: 'g/ha' },
    { producto: null, dosis: 1, unidad: 'L/ha' },
  ],
});
check(typeof receta === 'string', 'con productos y dosis válidos debe haber receta');
check(receta.includes('30 cc'), '300 cc/ha con bomba de 20 L a 200 L/ha son 30 cc por bomba');
check(receta.includes('400 g'), '200 g/ha en 2 ha son 400 g para el lote');
check(
  receta.indexOf('TIOXAM 250 WG (WG)') < receta.indexOf('CYPER West 200 EC (EC)'),
  'en el orden de carga el granulado (WG) va antes que el emulsionable (EC)'
);
check(
  recetaDeMezcla({ area: 1, volumenHa: 200, capacidadBomba: 20, lineas: [] }) === null,
  'sin líneas no hay receta'
);
check(formatear(20) === '20' && formatear(1.5) === '1.5', 'los números no llevan ceros sobrantes');
check(unidadAmigable(0.35, 'L') === '350 cc', '0.35 L se muestra como 350 cc');

// ────────────────────────────────────────────────────────────
seccion('Envases a llevar');
{
  const e1 = envasesNecesarios(1.5, 'L', ['250 cc', '1 L', '4 L']);
  check(e1.texto === '1 × 1 L + 2 × 250 cc' && e1.sobrante === 0, '1.5 L se cubre exacto con 1 L y dos de 250 cc');
  const e2 = envasesNecesarios(0.9, 'Kg', ['100 g', '1 Kg']);
  check(e2.texto === '1 × 1 Kg', 'si sobra poco, mejor una bolsa de 1 Kg que nueve sobres de 100 g');
  const e3 = envasesNecesarios(3.1, 'L', ['250 cc', '1 L', '4 L']);
  check(e3.texto === '3 × 1 L + 1 × 250 cc', '3.1 L: sobrar 2.9 L con un galón es demasiado');
  check(envasesNecesarios(0.1, 'L', ['4 L']).texto === '1 × 4 L', 'con un solo envase posible, se lleva ese');
  check(
    envasesNecesarios(1.5, 'L', ['100 g', '1 Kg']) === null &&
      envasesNecesarios(1, 'L', ['Caja']) === null &&
      envasesNecesarios(0, 'L', ['1 L']) === null,
    'base distinta, envase sin medida o cantidad cero no dan resultado'
  );
  PRODUCTOS.forEach((p) => {
    const base = unidadesSugeridas(p)[0].startsWith('K') || unidadesSugeridas(p)[0].startsWith('g') ? 'Kg' : 'L';
    const r = envasesNecesarios(2.3, base, p.presentaciones);
    if (r) check(r.cubierto >= 2.3 - 1e-9, `${p.nombre}: los envases deben cubrir lo necesario`);
  });
  check(partirCantidad(0.35, 'L').unidad === 'cc' && unidadAmigable(1.234, 'L') === '1.23 L', 'las cantidades se muestran igual que antes');
}

// ────────────────────────────────────────────────────────────
seccion('Memoria local: favoritos y recientes');
check(alternarEnLista(['a'], 'b').join() === 'a,b', 'alternar agrega lo que no está');
check(alternarEnLista(['a', 'b'], 'a').join() === 'b', 'alternar quita lo que ya está');
check(anteponerReciente(['a', 'b', 'c'], 'c').join() === 'c,a,b', 'lo reciente va primero sin duplicarse');
check(anteponerReciente(['a', 'b', 'c'], 'd', 3).join() === 'd,a,b', 'la lista de recientes tiene tope');
check(
  productosDeIds(['tioxam', 'ya-no-existe'], PRODUCTOS).length === 1,
  'los ids de productos retirados del portafolio se ignoran'
);

// ────────────────────────────────────────────────────────────
seccion('Guía de campo: datos por producto y grupos químicos');
const idsProductos = new Set(PRODUCTOS.map((p) => p.id));
Object.keys(CAMPO).forEach((id) => check(idsProductos.has(id), `CAMPO tiene un producto que no existe: ${id}`));
check(Object.keys(CAMPO).length === PRODUCTOS.length, 'cada producto debe tener su ficha de campo');
const idsCultivo = new Set(CULTIVOS.map((c) => c.id));
Object.entries(CAMPO).forEach(([id, c]) => {
  (c.cultivos || []).forEach((cu) => check(idsCultivo.has(cu), `${id}: cultivo desconocido ${cu}`));
  if (c.etiqueta) {
    check(/^https?:\/\//.test(c.etiqueta.fuente || ''), `${id}: dato de etiqueta sin URL de fuente`);
    check(['alta', 'media'].includes(c.etiqueta.confianza), `${id}: dato de etiqueta de confianza baja`);
    const texto = JSON.stringify(c.etiqueta);
    check(!/pc_dias|pr_horas|dosis/i.test(texto), `${id}: la app no muestra dosis ni periodos de carencia o reentrada`);
  }
});
PRODUCTOS.filter((p) => p.sistema).forEach((p) =>
  clavesDeGrupo(p).forEach((k) => check(GRUPOS_QUIMICOS[k], `${p.nombre}: sin ficha de grupo químico ${k}`))
);
GRUPOS_FUNCIONALES.forEach((g) => g.productos.forEach((id) => check(idsProductos.has(id), `grupo funcional ${g.id}: producto ${id} no existe`)));
check(buscar('protecsol').grupo === 'P07', 'los fosfonatos son FRAC P07 desde la reclasificación de FRAC');

seccion('Datos que usan el comparador y el diagnóstico');
{
  const objetivosValidos = new Set(RAMAS.flatMap((r) => r.objetivos.map((o) => o.id)));
  const momentosValidos = new Set(RAMAS.flatMap((r) => r.momentos.map((o) => o.id)));
  PRODUCTOS.forEach((p) => {
    p.objetivos.forEach((o) => check(objetivosValidos.has(o), `${p.nombre}: "${o}" no es un objetivo (¿es un momento?)`));
    (p.momento || []).forEach((m) => check(momentosValidos.has(m), `${p.nombre}: "${m}" no es un momento válido`));
    check(CAMPO[p.id]?.enCampo && CAMPO[p.id]?.accion, `${p.nombre}: faltan "qué se ve en campo" o el tipo de acción`);
    (CAMPO[p.id]?.cultivos || []).forEach((c) =>
      check(CULTIVOS.some((x) => x.id === c) && ICONO_ILUSTRADO[c], `${p.nombre}: el cultivo ${c} no tiene nombre o ícono`)
    );
  });
  PRODUCTOS.filter((p) => !p.sistema).forEach((p) =>
    check(GRUPOS_FUNCIONALES.filter((g) => g.productos.includes(p.id)).length === 1, `${p.nombre}: debe tener una sola base funcional`)
  );
  check(
    !/overflow-x-auto|min-w-\[3\d/.test(readFileSync('src/components/Comparador.jsx', 'utf8')),
    'el comparador no debe obligar a desplazarse de lado en el teléfono'
  );
}

seccion('Marcas gemelas y misma molécula');
check(gemelosDe(buscar('ridder')).some((p) => p.id === 'furioso'), 'RIDDER y FURIOSO son la misma composición');
check(gemelosDe(buscar('undazol')).some((p) => p.id === 'powerplus'), 'UNDAZOL y POWEREX son propiconazol 250 g/L');
check(gemelosDe(buscar('algasoil')).length === 0, 'sin concentración declarada no se afirma que dos productos sean idénticos');
check(mismaMoleculaDe(buscar('limpion')).some((p) => p.id === 'limpionpro'), 'LIMPION PRO es la misma molécula que LIMPION');
PRODUCTOS.forEach((p) =>
  gemelosDe(p).forEach((g) => check(!p.sistema || compartenModoDeAccion(p, g), `${p.nombre} y ${g.nombre} son gemelos pero no comparten grupo`))
);

seccion('Verificador de cruces con moléculas de otras casas');
check(MOLECULAS_PARA_VERIFICAR.length > 100, 'debe haber más de cien moléculas para escoger');
const clorpirifos = productoDesdeMolecula(MOLECULAS_PARA_VERIFICAR.find((m) => m.nombre === 'Clorpirifos'));
check(clorpirifos.sistema === 'IRAC' && clorpirifos.grupo === '1', 'el clorpirifos se traduce a IRAC 1');
check(mismosModoDeAccion(clorpirifos).some((p) => p.id === 'metomil40'), 'después de clorpirifos, METOMIL no es rotación');
MOLECULAS_PARA_VERIFICAR.forEach((m) => check(/^(IRAC|FRAC|HRAC):/.test(m.grupo), `${m.nombre}: grupo con formato inválido`));

seccion('Cultivos: cada problema apunta a un objetivo del diagnóstico');
const objetivosValidos = new Set(RAMAS.flatMap((r) => r.objetivos.map((o) => o.id)));
CULTIVOS.forEach((c) => {
  check(ICONO_ILUSTRADO[c.id], `${c.nombre}: sin ícono`);
  [...c.plagas, ...c.enfermedades, ...c.malezas].forEach((x) =>
    check(x.objetivo === null || objetivosValidos.has(x.objetivo), `${c.nombre} · ${x.comun}: objetivo inválido ${x.objetivo}`)
  );
  c.enfermedades
    .filter((e) => ['bacteria', 'virus', 'protista'].includes(e.tipo))
    .forEach((e) => check(e.objetivo === null, `${c.nombre} · ${e.comun}: ${e.tipo} no se maneja con fungicida`));
});
check(
  CULTIVOS.find((c) => c.id === 'arroz').enfermedades.find((e) => /piricularia/i.test(e.comun)).objetivo === 'hongos-foliares',
  'la piricularia del arroz es un hongo foliar'
);

// ────────────────────────────────────────────────────────────
seccion('Diagnóstico por cultivo y recomendación técnica');
{
  const arroz = recomendacionTecnica({ categorias: ['Fungicida'], objetivo: 'hongos-foliares', cultivo: 'arroz' });
  check(arroz?.principal, 'arroz con hongos foliares debe tener recomendación');
  check(arroz.principal.objetivos.includes('hongos-foliares'), 'la recomendación respeta el filtro duro del objetivo');
  check(
    !arroz.acompanante || /^M/.test(String(arroz.acompanante.grupo)),
    'el acompañante de un fungicida de riesgo alto es un multisitio'
  );
  check(
    !arroz.siguiente || !compartenModoDeAccion(arroz.siguiente, arroz.principal),
    'la siguiente aplicación no repite sitio de acción'
  );
  const maleza = recomendacionTecnica({ categorias: ['Herbicida'], objetivo: 'gramineas', escenario: 'arroz', cultivo: 'arroz' });
  check(
    !maleza.siguiente || maleza.siguiente.escenarios.includes('arroz'),
    'en herbicidas, la rotación sugerida sirve en el mismo cultivo'
  );
  const enFlor = recomendarConCultivo({ categorias: ['Insecticida'], objetivo: 'chupadores', etapa: 'Floración' });
  const neonic = enFlor.find((p) => p.id === 'tioxam');
  check(
    neonic && neonic.alertas.some((a) => /floración/i.test(a)),
    'en floración los neonicotinoides llevan alerta por los polinizadores'
  );
  const papa = recomendarConCultivo({ categorias: ['Insecticida'], objetivo: 'masticadores', cultivo: 'papa' });
  const metomil = papa.find((p) => p.id === 'metomil40');
  check(!metomil || metomil.razones.some((r) => /papa/.test(r)), 'el cultivo de la ficha técnica aparece como razón');
}

// ────────────────────────────────────────────────────────────
seccion('App instalable: manifiesto, iconos y service worker');
let manifiesto = null;
try {
  manifiesto = JSON.parse(readFileSync('public/manifest.webmanifest', 'utf8'));
} catch {
  check(false, 'public/manifest.webmanifest debe existir y ser JSON válido');
}
if (manifiesto) {
  check(manifiesto.name && manifiesto.short_name, 'el manifiesto necesita nombre y nombre corto');
  check(manifiesto.start_url === './' && manifiesto.scope === './', 'rutas relativas para servir desde Pages');
  check(manifiesto.display === 'standalone', 'la app instalada se abre sin barra del navegador');
  ['192x192', '512x512'].forEach((t) =>
    check(manifiesto.icons.some((i) => i.sizes === t), `falta el icono de ${t}`)
  );
  check(manifiesto.icons.some((i) => i.purpose === 'maskable'), 'falta el icono adaptable (maskable)');
  manifiesto.icons.forEach((i) => check(existsSync(`public/${i.src}`), `no existe el icono ${i.src}`));
}
const plantillaSw = existsSync('scripts/sw-plantilla.js') ? readFileSync('scripts/sw-plantilla.js', 'utf8') : '';
check(
  plantillaSw.includes('__VERSION__') && plantillaSw.includes('__ARCHIVOS__'),
  'la plantilla del service worker debe tener los marcadores que llena el build'
);

// ────────────────────────────────────────────────────────────
seccion('Artefacto de un solo archivo: todos los módulos en la lista del generador');
{
  const generador = readFileSync('scripts/generar-artefacto.mjs', 'utf8');
  const listados = new Set([...generador.matchAll(/'(src\/[^']+)'/g)].map((m) => m[1]));
  const recorrer = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? recorrer(`${dir}/${e.name}`) : [`${dir}/${e.name}`]
    );
  recorrer('src')
    .filter((f) => /\.(js|jsx)$/.test(f) && !['src/main.jsx', 'src/motores/index.js'].includes(f))
    .forEach((f) => check(listados.has(f), `${f} no está en la lista de módulos de generar-artefacto.mjs`));
}

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
  for (const m of src.matchAll(/import\s+(?:React\s*,\s*)?\{([^}]+)\}\s*from/g)) {
    check(
      m[1].split(',').every((x) => x.trim()),
      'el encabezado del artefacto tiene un nombre vacío en un import'
    );
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
