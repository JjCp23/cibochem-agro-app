/**
 * Construye la guía de campo en un solo archivo HTML.
 *
 *   node docs/guia/build.mjs                 → docs/Portafolio_Cibochem_en_Campo.html
 *   node docs/guia/build.mjs --artefacto RUTA → además, la versión para publicar como Artifact
 *
 * Toma los datos de docs/guia/datos, las lecciones y los estadios por grupo del
 * app (src/data), valida que todo cuadre y deja el HTML ya escrito: la página se
 * lee completa aunque el navegador no ejecute JavaScript.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(raiz, '../..');
const leer = (f) => fs.readFileSync(path.join(raiz, f), 'utf8');
const errores = [];
const exigir = (cond, msg) => { if (!cond) errores.push(msg); };

/* ---------- datos ---------- */
const ctx = vm.createContext({ console });
vm.runInContext(['datos/productos.js', 'datos/grupos.js', 'datos/objetivos.js', 'datos/aprender.js', 'datos/faq.js'].map(leer).join('\n;\n'), ctx);
const { TEMAS, PREGUNTAS } = await import(pathToFileURL(path.join(repo, 'src/data/conocimiento.js')));
const { GRUPOS_MOA } = await import(pathToFileURL(path.join(repo, 'src/data/gruposMoA.js')));
ctx.TEMAS = TEMAS;
ctx.PREGAPP = PREGUNTAS;

/* Estadios y velocidad por grupo salen del app. El app usa algunos códigos con
   letra (IRAC:4A) y el fosetyl con su código anterior (FRAC:33). */
const EQUIV = { 'IRAC:1A': 'IRAC:1', 'IRAC:3A': 'IRAC:3', 'IRAC:4A': 'IRAC:4', 'IRAC:7C': 'IRAC:7', 'IRAC:22A': 'IRAC:22', 'FRAC:33': 'FRAC:P07' };
for (const [k, g] of Object.entries(GRUPOS_MOA)) {
  const kk = EQUIV[k] || k;
  exigir(ctx.GR[kk], `El app describe ${k} y la guía no tiene ${kk}`);
  if (!ctx.GR[kk]) continue;
  if (g.estadios && g.estadios.length) ctx.GR[kk].est = g.estadios;
  if (g.velocidad) ctx.GR[kk].vel = g.velocidad;
}

const { P, MOL, GR, GX, MOA, OUT, SAME, FG, OBJ, QUIZ, TIPS } = ctx;
const GORD = [];
['IRAC', 'FRAC', 'HRAC'].forEach((s) => MOA[s].forEach((c) => GORD.push(...c.g)));
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dup = {};
P.forEach((p) => { dup[p.m] = (dup[p.m] || 0) + 1; });

/* Cada producto hereda los grupos de las moléculas que lleva. */
const lite = P.map((p, i) => {
  const mols = MOL.filter((m) => m.re.test(p.ia));
  const k = [...new Set(mols.map((m) => m.k))].sort((a, b) => GORD.indexOf(a) - GORD.indexOf(b));
  const fg = FG.find((f) => f.p.includes(p.m));
  return {
    i, id: 'p-' + slug(p.m + ' ' + p.f), m: p.m, f: p.f, l: p.l, ia: p.ia, mov: p.mov, e: p.e || '',
    k, mol: mols.map((m) => m.id), fg: fg ? fg.id : '',
    nm: dup[p.m] > 1 ? p.m + ' ' + p.f.split(' ').slice(0, 2).join(' ') : p.m,
  };
});

/* ---------- validaciones ---------- */
const num = (sys, c) => (sys === 'IRAC' ? c.replace(/[A-Z]$/, '') : c);
lite.forEach((x) => {
  const p = P[x.i];
  if (['INS', 'FUN', 'HER'].includes(p.l)) {
    exigir(x.mol.length, `Sin molécula reconocida: ${p.m} ${p.f}`);
    const sys = p.g.split(' ')[0];
    const declarados = [...new Set(p.g.slice(sys.length).split(/[+/]/).map((c) => c.trim()).filter(Boolean).map((c) => sys + ':' + num(sys, c)))].sort();
    exigir(declarados.join() === x.k.slice().sort().join(), `${p.m} ${p.f}: declara ${declarados} y sus moléculas dan ${x.k}`);
    exigir(p.ia.split('+').length === x.mol.length, `${p.m}: el ingrediente activo tiene ${p.ia.split('+').length} moléculas y se reconocieron ${x.mol}`);
  } else exigir(x.fg, `${p.m} no tiene grupo funcional`);
});
exigir(new Set(lite.map((x) => x.id)).size === lite.length, 'Hay dos productos con el mismo identificador');
MOL.forEach((m) => { exigir(GR[m.k], `Molécula ${m.id} con grupo inexistente ${m.k}`); exigir(lite.some((x) => x.mol.includes(m.id)), `Molécula ${m.id} sin producto`); });
Object.keys(GR).forEach((k) => exigir(GORD.filter((g) => g === k).length === 1, `El grupo ${k} debe aparecer una vez en MOA`));
OUT.forEach((o) => exigir(GR[o[2]] || GX[o[2]], `Molécula de otra casa con grupo inexistente: ${o[0]}`));
SAME.forEach((s) => [s[0], s[1]].forEach((k) => exigir(GR[k] || GX[k], `Par de mismo blanco con grupo inexistente: ${k}`)));
OBJ.forEach((o) => {
  exigir(['INS', 'FUN', 'HER'].includes(o.l), `Objetivo ${o.id} con línea inválida`);
  o.p.forEach((n) => {
    const ps = lite.filter((x) => x.m === n);
    exigir(ps.length, `Objetivo ${o.id}: no existe la marca ${n}`);
    ps.forEach((x) => exigir(x.l === o.l, `Objetivo ${o.id}: ${n} es de otra línea`));
  });
});
QUIZ.forEach((q, i) => exigir(q.a >= 0 && q.a < q.o.length, `Pregunta ${i + 1} con respuesta fuera de rango`));
const cuenta = (k) => lite.filter((x) => x.k.includes(k)).length;
exigir(cuenta('IRAC:4') === 8 && cuenta('IRAC:3') === 6 && cuenta('FRAC:3') === 9 && cuenta('FRAC:11') === 5 && cuenta('HRAC:4') === 12,
  'Los conteos citados en el texto (8, 6, 9, 5 y 12) ya no coinciden con los datos');

/* ---------- datos livianos que viajan con la página ---------- */
const D = {
  P: lite,
  GR: Object.fromEntries(Object.entries(GR).map(([k, g]) => [k, { n: g.n, c: g.c, r: g.r, est: g.est, vel: g.vel }])),
  GX, OUT, SAME,
  MOA: Object.fromEntries(Object.entries(MOA).map(([s, cs]) => [s, cs.map((c) => ({ n: c.n, g: c.g }))])),
  OBJ: OBJ.map((o) => ({ id: o.id, l: o.l, ic: o.ic, n: o.n, ej: o.ej, tip: o.tip, p: o.p.flatMap((n) => lite.filter((x) => x.m === n)).map((x) => x.i) })),
  QUIZ, TIPS,
};
ctx.D = JSON.parse(JSON.stringify(D));
vm.runInContext(leer('src/comun.js') + '\n;\n' + leer('src/estatico.js') + '\n;\n' + leer('src/videos.js'), ctx);

if (errores.length) {
  console.error('La guía no se construyó. Corrige esto:\n- ' + errores.join('\n- '));
  process.exit(1);
}

/* ---------- piezas ---------- */
const R = (code) => vm.runInContext(code, ctx);
const ref = (m, f) => 'p' + lite.find((x) => x.m === m && (!f || x.f.startsWith(f))).i;
const TIOXAM = ref('TIOXAM'), RIDDER = ref('RIDDER');
const ctas = { INS: 0, HER: 0, FUN: 0, BIO: 0, REG: 0 };
lite.forEach((x) => { ctas[x.l]++; });
const nuevos = lite.filter((x) => x.e === 'nuevo').length, prontos = lite.filter((x) => x.e === 'pronto').length;
const stat = (n, t) => `<div class="stat"><b>${n}</b><span>${t}</span></div>`;
const LINEAS = [['', 'Todo', lite.length], ['INS', 'Insecticidas', ctas.INS], ['HER', 'Herbicidas', ctas.HER], ['FUN', 'Fungicidas', ctas.FUN], ['BIO', 'Bio y reguladores', ctas.BIO + ctas.REG]];
const MOVS = [['contacto', 'Contacto'], ['translam', 'Translaminar'], ['xilema', 'Sistémico por xilema'], ['ambi', 'Xilema + floema'], ['raiz', 'Suelo / rizosfera']];
const fact = (k, n, txt) => `<a class="fact" href="#g-${k.replace(':', '-')}" data-g="${k}"><b>${n}</b><strong>${txt}</strong><span>${GR[k].n}: alternar entre ellas no es rotar.</span></a>`;
const hist = (refs) => refs.map((r, i) => { const x = R(`resolve(${JSON.stringify(r)})`); return `<span class="hchip" data-r="${r}"><small>${i === 0 ? 'Última' : 'Antes'}</small>${x.name} <button type="button" aria-label="Quitar ${x.name}" data-q="${i}">×</button></span>`; }).join('');
const parcial = (f) => leer('src/parciales/' + f);

const piezas = {
  stats: stat(lite.length, 'referencias') + stat(ctas.INS, 'insecticidas') + stat(ctas.HER, 'herbicidas') + stat(ctas.FUN, 'fungicidas') + stat(ctas.BIO + ctas.REG, 'bio y reguladores') + stat(Object.keys(GR).length, 'grupos de resistencia') + stat(nuevos + prontos, 'novedades'),
  heroVideo: R('videoCerradura()'),
  tipTema: TIPS[0].t,
  tipTxt: TIPS[0].x,
  facts: fact('IRAC:4', cuenta('IRAC:4'), 'insecticidas llevan neonicotinoide') + fact('HRAC:4', cuenta('HRAC:4'), 'herbicidas llevan un hormonal') + fact('FRAC:3', cuenta('FRAC:3'), 'fungicidas llevan un triazol'),
  catLin: LINEAS.map(([l, n, c]) => `<button type="button" class="fchip" data-l="${l}" aria-pressed="${l === ''}">${n} <span>${c}</span></button>`).join(''),
  catGrp: R('rFiltroGrupos()'),
  movleg: MOVS.map(([k, n]) => `<span class="mov" style="--mc:var(--mov-${k})"><i></i>${n}</span>`).join(''),
  catalogo: R('rCatalogo()'),
  objetivos: R('rObjetivos("mosca-blanca")'),
  recOpts: R(`rOpcionesP(${JSON.stringify(TIOXAM)})+rOpcionesO("")`),
  recOut: R(`rRecomendar({o:"mosca-blanca",u:${JSON.stringify(TIOXAM)},e:""})`),
  ckHist: hist([TIOXAM]),
  ckOptsAll: R('rOpcionesP("")+rOpcionesO("")'),
  ckOptsP: R(`rOpcionesP(${JSON.stringify(RIDDER)})`),
  ckOut: R(`rCruces({h:[${JSON.stringify(TIOXAM)}],c:${JSON.stringify(RIDDER)}})`),
  mxINS: R('rMatriz("INS")'),
  mxFUN: R('rMatriz("FUN")'),
  mxHER: R('rMatriz("HER")'),
  pares: parcial('pares.html'),
  escalera: parcial('escalera.html').replace('<figure>', '<figure class="grupos-fig">'),
  conc: R('rConc()'),
  grupos: R('rGrupos()'),
  videos: R('videosTodos()'),
  simBtns: R('rSimBtns()'),
  simSeq: R('rSimSeq(SIM_PRE.rep)'),
  simChart: R('rSimChart(SIM_PRE.rep.map(function(i){ return SIM_P[i].g; }),SIM_G.map(function(g){ return g.k; }),SIM_G.map(function(g){ return code(g.k); }))'),
  simLeg: R('rSimLeg()'),
  simNote: R('rSimNota(SIM_PRE.rep)'),
  rutas: parcial('rutas.html'),
  lecciones: R('rLecciones()'),
  tarjetas: R('rTarjetas()'),
  quizNoJS: R('rQuizNoJS()'),
  tips: R('rTips()'),
  glosario: R('rGlosario()'),
  reunion: parcial('reunion.html').replace('<!--@faq-->', R('rFaq()')),
};
piezas.css = leer('src/estilos.css') + '\n/* animaciones de los mini-videos */\n' + ctx.VKF.join('\n');
piezas.js = 'var D=' + JSON.stringify(D) + ';\n' + leer('src/comun.js') + '\n' + leer('src/app.js');

let html = leer('src/plantilla.html');
html = html.replace('/*@css*/', () => piezas.css).replace('/*@js*/', () => piezas.js.replace(/<\/script/gi, '<\\/script'));
html = html.replace(/<!--@([a-zA-Z]+)-->/g, (m, k) => {
  if (!(k in piezas)) throw new Error('Pieza desconocida en la plantilla: ' + k);
  return piezas[k];
});
const sobrantes = html.match(/<!--@[a-zA-Z]+-->/g);
if (sobrantes) throw new Error('Quedaron marcas sin reemplazar: ' + sobrantes.join(', '));

/* ---------- salidas ---------- */
const corte = html.indexOf('<script>document.documentElement');
const completo = '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
  + html.slice(0, corte) + '</head>\n<body>\n' + html.slice(corte) + '</body>\n</html>\n';
const destino = path.join(repo, 'docs/Portafolio_Cibochem_en_Campo.html');
fs.writeFileSync(destino, completo);
const i = process.argv.indexOf('--artefacto');
if (i > -1) fs.writeFileSync(path.resolve(process.argv[i + 1]), html);
console.log(`Guía construida: ${path.relative(repo, destino)} · ${(completo.length / 1024).toFixed(0)} KB · ${lite.length} productos · ${Object.keys(GR).length} grupos · ${OBJ.length} objetivos · ${ctx.VKF.length / 2} animaciones`);
