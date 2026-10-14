import React, { useState, useMemo, useRef, useEffect } from 'react';
import { X, AlertTriangle, Check, Scale, ChevronRight, Info, Plus } from 'lucide-react';
import { PRODUCTOS } from '../data/productos.js';
import { COLORES, COLOR_CATEGORIA, FONDO_CATEGORIA, COLOR_RIESGO, etiquetaDe } from '../data/taxonomia.js';
import { TRANSLOCACION, ESTADIOS, fichasDeProducto } from '../data/gruposMoA.js';
import { CAMPO } from '../data/campo.js';
import { CULTIVOS } from '../data/cultivos.js';
import { GRUPOS_FUNCIONALES } from '../data/gruposQuimicos.js';
import {
  compartenModoDeAccion,
  explicarConflicto,
  estadiosDeProducto,
  gemelosDe,
  mismaMoleculaDe,
  gruposQuimicosDe,
  formulacionDe,
} from '../motores/index.js';
import { SelloGrupo, TextoMarcado } from './ui/Etiqueta.jsx';
import { SelectorProducto } from './ui/SelectorProducto.jsx';
import { EstadoVacio, Chip } from './ui/Superficie.jsx';
import { IconoIlustrado } from './ui/Iconos.jsx';

const MAXIMO_COMPARADOS = 3;
const ORDEN_RIESGO = { Nulo: 0, Bajo: 1, Medio: 2, Alto: 3 };
const TEXTO_MEJOR = '#2F6B1E';
const COLUMNAS_SM = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3' };
const NOMBRE_ESTADIO_PLURAL = { huevo: 'huevos', larva: 'larvas y ninfas', pupa: 'pupas', adulto: 'adultos' };

const SECCIONES_COMPARACION = [
  { id: 'producto', titulo: 'Producto' },
  { id: 'sirve', titulo: 'Para qué sirve' },
  { id: 'actua', titulo: 'Cómo actúa' },
  { id: 'elegir', titulo: 'Cómo elegirlo' },
  { id: 'presentacion', titulo: 'Presentación' },
];

/* ────────────────────────────────────────────────────────────────
   Funciones puras: datos → filas, resumen y sugerencias
   ──────────────────────────────────────────────────────────────── */

function sinDato(v) {
  return v == null || v === '' || (Array.isArray(v) && v.length === 0);
}

function claveDeValor(v) {
  return Array.isArray(v) ? [...v].sort().join('|') : String(v ?? '');
}

/** "A + B" y "B + A" son la misma mezcla: se comparan sin importar el orden. */
function claveSinOrden(texto) {
  return String(texto ?? '')
    .split('+')
    .map((x) => x.trim().toLowerCase())
    .sort()
    .join('+');
}

function minuscInicial(texto) {
  const t = String(texto || '');
  // Las siglas (dos mayúsculas seguidas) se dejan como están
  return /^[A-ZÁÉÍÓÚÑ]{2}/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1);
}

/** "arroz, papa y café"; usa "e" cuando la última palabra empieza por el sonido i. */
function unirLista(lista) {
  if (lista.length === 0) return '';
  if (lista.length === 1) return lista[0];
  const ultimo = lista[lista.length - 1];
  const conjuncion = /^\**h?i(?![aeou])/i.test(ultimo) ? 'e' : 'y';
  return `${lista.slice(0, -1).join(', ')} ${conjuncion} ${ultimo}`;
}

/** Nombre del cultivo sin el paréntesis: "Frutales andinos (mora, lulo…)" → "Frutales andinos". */
function nombreCortoDeCultivo(id) {
  const c = CULTIVOS.find((x) => x.id === id);
  return c ? c.nombre.replace(/\s*\([^)]*\)/g, '').trim() : etiquetaDe(id);
}

/**
 * Primera oración de un texto de la guía de campo, sin cortar en abreviaturas
 * ni en iniciales ("S. frugiperda") y con los **resaltados** bien cerrados.
 */
export function oracionInicialDeCampo(texto, maximo = 170) {
  const t = String(texto || '').replace(/\s+/g, ' ').trim();
  if (!t) return '';
  let corte = t.length;
  const fin = /[.!?]+["')»*]*(?=\s+[A-ZÁÉÍÓÚÑ¿¡*"«(\d]|\s*$)/g;
  let m = fin.exec(t);
  while (m) {
    const antes = t.slice(0, m.index);
    const abreviatura = /(?:^|[\s(])[A-ZÁÉÍÓÚÑ]$/.test(antes) || /\b(?:ej|etc|sp|spp|vs|aprox)$/i.test(antes);
    if (!abreviatura) {
      corte = m.index + m[0].length;
      break;
    }
    m = fin.exec(t);
  }
  let frase = t.slice(0, corte);
  if (frase.length > maximo) {
    frase = `${frase.slice(0, maximo).replace(/\s+\S*$/, '').replace(/[,;:—–(\s]+$/, '')}…`;
  }
  if ((frase.match(/\*\*/g) || []).length % 2) frase += '**';
  return frase;
}

function frasesDe(texto) {
  return (String(texto || '').match(/[^.!?]+[.!?]+/g) || []).map((x) => x.trim());
}

/** ¿La frase nombra a este producto (por id o por la primera palabra del nombre)? */
function mencionaProducto(frase, producto) {
  const f = frase.toLowerCase();
  return [producto.id, String(producto.nombre).split(' ')[0]].some((x) => x.length > 3 && f.includes(x.toLowerCase()));
}

/** Grupo funcional de un bioestimulante o regulador (los que no tienen modo de acción). */
function baseFuncionalDe(producto) {
  return GRUPOS_FUNCIONALES.find((g) => g.productos.includes(producto.id)) || null;
}

/** Un dato de cada sitio de acción del producto, sin repetidos y en orden fijo (las mezclas llevan dos). */
function porSitioDeAccion(producto, extraer) {
  return [...new Set(fichasDeProducto(producto).map(({ ficha }) => extraer(ficha)).filter(Boolean))].sort();
}

function movimientoDe(producto) {
  const lista = porSitioDeAccion(producto, (f) => {
    const tr = TRANSLOCACION[f.translocacion];
    return tr ? `${tr.icono} ${tr.nombre}` : null;
  });
  return lista.length ? lista.join(' + ') : producto.movimiento;
}

function velocidadDe(producto) {
  const lista = porSitioDeAccion(producto, (f) => f.velocidad);
  return lista.length ? lista.join(' + ') : null;
}

function cuandoElegirlo(producto) {
  const t = gruposQuimicosDe(producto)[0]?.recomiendaSi;
  if (!t) return null;
  const limpio = t.trim().replace(/[.;\s]+$/, '');
  return `${limpio.charAt(0).toUpperCase()}${limpio.slice(1)}.`;
}

/**
 * Las filas que se pueden comparar. Cada una dice cómo sacar su dato de un
 * producto (dato), cómo se dibuja (tipo) y, si se puede comparar de forma
 * objetiva, cómo puntuarlo (puntaje). "trivial" son las filas que casi nunca
 * explican la diferencia de fondo.
 */
const FILAS_COMPARACION = [
  {
    id: 'ia',
    etiqueta: 'Ingrediente activo',
    seccion: 'producto',
    tipo: 'texto',
    trivial: true,
    dato: (p) => p.ia,
    clave: claveSinOrden,
  },
  {
    id: 'formulacion',
    etiqueta: 'Formulación',
    seccion: 'producto',
    tipo: 'texto',
    trivial: true,
    dato: (p) => {
      const f = formulacionDe(p);
      return f ? `${f.nombre} (${f.sigla})` : null;
    },
  },
  {
    id: 'controla',
    etiqueta: 'Controla',
    seccion: 'sirve',
    tipo: 'etiquetas',
    unidad: ['objetivo', 'objetivos'],
    dato: (p) => (p.objetivos || []).map(etiquetaDe),
    puntaje: (v) => (v ? v.length : 0),
  },
  {
    id: 'cultivos',
    etiqueta: 'Cultivos',
    seccion: 'sirve',
    tipo: 'cultivos',
    unidad: ['cultivo', 'cultivos'],
    dato: (p) => CAMPO[p.id]?.cultivos || [],
    puntaje: (v) => (v ? v.length : 0),
  },
  {
    id: 'momento',
    etiqueta: 'Momento',
    seccion: 'sirve',
    tipo: 'etiquetas',
    dato: (p) => (p.momento || []).map(etiquetaDe),
  },
  {
    id: 'modo',
    etiqueta: 'Modo de acción',
    seccion: 'actua',
    tipo: 'sello',
    dato: (p) => (p.sistema ? `${p.sistema} ${p.grupo}` : null),
    clave: (v) => `${String(v).split(' ')[0]}|${claveSinOrden(String(v).replace(/^\S+\s+/, ''))}`,
  },
  {
    id: 'familia',
    etiqueta: 'Familia',
    seccion: 'actua',
    tipo: 'texto',
    dato: (p) => p.familia,
    clave: claveSinOrden,
  },
  { id: 'base', etiqueta: 'Base funcional', seccion: 'actua', tipo: 'texto', dato: (p) => baseFuncionalDe(p)?.nombre },
  {
    id: 'composicion',
    etiqueta: 'Composición',
    seccion: 'actua',
    tipo: 'largo',
    dato: (p) => CAMPO[p.id]?.etiqueta?.composicion,
  },
  { id: 'que', etiqueta: 'Qué hace', seccion: 'actua', tipo: 'largo', dato: (p) => baseFuncionalDe(p)?.que },
  { id: 'accion', etiqueta: 'Acción', seccion: 'actua', tipo: 'texto', dato: (p) => CAMPO[p.id]?.accion },
  { id: 'movimiento', etiqueta: 'Movimiento', seccion: 'actua', tipo: 'texto', dato: movimientoDe },
  {
    id: 'velocidad',
    etiqueta: 'Velocidad',
    seccion: 'actua',
    tipo: 'texto',
    dato: velocidadDe,
  },
  {
    id: 'estadios',
    etiqueta: 'Estadios',
    seccion: 'actua',
    tipo: 'estadios',
    dato: (p) => estadiosDeProducto(p),
    puntaje: (v) => (v ? v.length : 0),
  },
  {
    id: 'campo',
    etiqueta: 'Qué se ve en campo',
    seccion: 'actua',
    tipo: 'largo',
    dato: (p) => oracionInicialDeCampo(CAMPO[p.id]?.enCampo),
  },
  {
    id: 'riesgo',
    etiqueta: 'Riesgo de resistencia',
    seccion: 'elegir',
    tipo: 'riesgo',
    dato: (p) => p.riesgo,
    puntaje: (v) => ORDEN_RIESGO[v] ?? null,
    menorEsMejor: true,
  },
  { id: 'beneficos', etiqueta: 'Benéficos', seccion: 'elegir', tipo: 'texto', dato: (p) => p.beneficos },
  { id: 'cuando', etiqueta: 'Cuándo elegirlo', seccion: 'elegir', tipo: 'largo', dato: cuandoElegirlo },
  {
    id: 'presentaciones',
    etiqueta: 'Presentaciones',
    seccion: 'presentacion',
    tipo: 'texto',
    trivial: true,
    dato: (p) => (p.presentaciones || []).join(' · '),
  },
  { id: 'estado', etiqueta: 'Disponibilidad', seccion: 'presentacion', tipo: 'estado', trivial: true, dato: (p) => p.estado },
];

/**
 * Índices de los productos que ganan una fila. Si todos puntúan igual, o no
 * hay al menos dos con dato, nadie gana: no se marca nada.
 */
export function indicesMejores(valores, puntaje, menorEsMejor = false) {
  const puntos = valores.map((v) => {
    const x = puntaje(v);
    return x == null || Number.isNaN(x) ? null : x;
  });
  const validos = puntos.filter((x) => x != null);
  if (validos.length < 2) return [];
  const mejor = menorEsMejor ? Math.min(...validos) : Math.max(...validos);
  if (validos.every((x) => x === mejor)) return [];
  return puntos.map((x, i) => (x === mejor ? i : -1)).filter((i) => i >= 0);
}

/**
 * Evalúa todas las filas para los productos elegidos. Descarta las que no
 * tienen dato en ningún producto y marca las que dicen lo mismo en todos
 * (igual), cuáles son los ítems compartidos y quién gana la fila (mejores).
 */
export function evaluarFilasComparacion(elegidos) {
  const n = elegidos.length;
  const filas = [];
  FILAS_COMPARACION.forEach((fila) => {
    const valores = elegidos.map((p) => fila.dato(p));
    if (valores.every(sinDato)) return;
    const clave = fila.clave || claveDeValor;
    const igual = n > 1 && new Set(valores.map((v) => (sinDato(v) ? '' : clave(v)))).size === 1;
    const esLista = fila.tipo === 'etiquetas' || fila.tipo === 'cultivos';
    const compartidos =
      esLista && n > 1
        ? new Set((valores[0] || []).filter((x) => valores.every((v) => (v || []).includes(x))))
        : null;
    const mejores = n > 1 && fila.puntaje ? indicesMejores(valores, fila.puntaje, fila.menorEsMejor) : [];
    filas.push({ fila, valores, igual, compartidos, mejores });
  });
  return filas;
}

/**
 * "En resumen": entre 1 y 5 viñetas generadas con los datos de los productos
 * elegidos. Cada una trae tono ('alerta', 'bien' o 'info') y un texto con
 * **resaltados** para que lo pinte TextoMarcado.
 */
export function resumenDeComparacion(elegidos) {
  const n = elegidos.length;
  if (n < 2) return [];
  const negrita = (p) => `**${p.nombre}**`;
  const conSistema = elegidos.every((p) => p.sistema);
  const pares = [];
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) pares.push([elegidos[i], elegidos[j]]);
  }

  const esGemelo = ([a, b]) => gemelosDe(a).some((g) => g.id === b.id);
  const alertas = [];
  const rotacion = [];
  const riesgo = [];
  const parecidos = [];
  const estadios = [];
  const cultivos = [];
  const objetivos = [];
  const bases = [];

  // Marcas gemelas: mismo producto con otro nombre
  pares.filter(esGemelo).forEach(([a, b]) => {
    const nombres = unirLista([negrita(a), negrita(b)]);
    alertas.push({
      tono: conSistema ? 'alerta' : 'info',
      texto: conSistema
        ? `${nombres} son el mismo producto con otra marca: no sirven para rotar entre sí.`
        : `${nombres} son el mismo producto con otra marca. Cambia el nombre, no el efecto.`,
    });
  });

  // Mismo sitio de acción (sin contar a los gemelos, que ya salieron arriba)
  const choques = pares
    .filter((par) => !esGemelo(par) && compartenModoDeAccion(par[0], par[1]))
    .map(([a, b]) => ({ a, b, motivo: minuscInicial(explicarConflicto(a, b) || '') }));
  if (choques.length === 3 && new Set(choques.map((c) => c.motivo)).size === 1) {
    alertas.push({
      tono: 'alerta',
      texto: `${unirLista(elegidos.map(negrita))} no sirven para rotar entre sí: ${choques[0].motivo.replace(/^ambos/, 'los tres')}.`,
    });
  } else {
    choques.forEach((c) => {
      alertas.push({
        tono: 'alerta',
        texto: `${unirLista([negrita(c.a), negrita(c.b)])} no sirven para rotar entre sí: ${c.motivo}.`,
      });
    });
  }

  // Rotación posible
  if (conSistema) {
    const hayChoque = pares.some(([a, b]) => compartenModoDeAccion(a, b));
    if (!hayChoque) {
      rotacion.push({
        tono: 'bien',
        texto: 'Todos tienen sitios de acción distintos: sirven para armar una secuencia de rotación.',
      });
    } else {
      const libres = elegidos.filter((p) => !elegidos.some((q) => q !== p && compartenModoDeAccion(p, q)));
      if (libres.length === 1) {
        rotacion.push({ tono: 'bien', texto: `${negrita(libres[0])} sí sirve para rotar con los demás.` });
      }
    }
  }

  // Menor riesgo de resistencia
  const puntosRiesgo = elegidos.map((p) => ORDEN_RIESGO[p.riesgo] ?? null);
  const validosRiesgo = puntosRiesgo.filter((x) => x != null);
  if (validosRiesgo.length >= 2 && Math.min(...validosRiesgo) !== Math.max(...validosRiesgo)) {
    const minimo = Math.min(...validosRiesgo);
    const mejores = elegidos.filter((_, i) => puntosRiesgo[i] === minimo);
    riesgo.push({
      tono: 'bien',
      texto:
        mejores.length === 1
          ? `${negrita(mejores[0])} tiene el menor riesgo de resistencia: ${mejores[0].riesgo}.`
          : `${unirLista(mejores.map(negrita))} tienen el menor riesgo de resistencia: ${mejores[0].riesgo}.`,
    });
  }

  // Bioestimulantes y reguladores: mismo grupo, advertencias del grupo y bases distintas
  const paresDeGrupo = new Set();
  if (!conSistema) {
    const AVISO = /nunca|\bno\b|ojo|compite|antagonista/i;
    const avisos = new Map();
    pares.forEach(([a, b]) => {
      const ga = baseFuncionalDe(a);
      const gb = baseFuncionalDe(b);
      if (!ga || !gb || esGemelo([a, b])) return;
      if (ga.id === gb.id) {
        const nombres = unirLista([negrita(a), negrita(b)]);
        paresDeGrupo.add(`${a.id}|${b.id}`);
        const frase =
          frasesDe(ga.combinar).find((f) => mencionaProducto(f, a) && mencionaProducto(f, b)) ||
          oracionInicialDeCampo(ga.combinar);
        parecidos.push({
          tono: 'info',
          texto: `${nombres} son del mismo grupo (${minuscInicial(ga.nombre)}). ${frase}`,
        });
        return;
      }
      const candidatas = [
        ...frasesDe(ga.combinar).filter((f) => mencionaProducto(f, b)),
        ...frasesDe(gb.combinar).filter((f) => mencionaProducto(f, a)),
      ];
      const frase = candidatas.find((f) => AVISO.test(f)) || candidatas[0];
      if (frase) {
        // La misma advertencia puede salir de varios pares: se junta en una sola viñeta, por lados
        const lados = avisos.get(frase) || new Map();
        [[ga, a], [gb, b]].forEach(([g, p]) => lados.set(g.id, new Set([...(lados.get(g.id) || []), p])));
        avisos.set(frase, lados);
      }
    });
    avisos.forEach((lados, frase) => {
      const aviso = AVISO.test(frase);
      const textoLados = [...lados.values()].map((set) => unirLista(elegidos.filter((p) => set.has(p)).map(negrita)));
      alertas.push({
        tono: aviso ? 'alerta' : 'info',
        texto: `${aviso ? 'Ojo con ' : ''}${textoLados.join(aviso ? ' frente a ' : ' y ')}. ${frase}`,
      });
    });
    const grupos = elegidos.map(baseFuncionalDe);
    if (grupos.every(Boolean) && new Set(grupos.map((g) => g.id)).size > 1) {
      bases.push({
        tono: 'info',
        texto: `Bases distintas: ${elegidos.map((p, i) => `${negrita(p)}, ${minuscInicial(grupos[i].nombre)}`).join('; ')}.`,
      });
    }
  }

  // Misma molécula en otra concentración o formulación
  pares
    .filter(
      ([a, b]) =>
        !esGemelo([a, b]) && !paresDeGrupo.has(`${a.id}|${b.id}`) && mismaMoleculaDe(a).some((m) => m.id === b.id)
    )
    .forEach(([a, b]) => {
      parecidos.push({
        tono: 'info',
        texto: `${unirLista([negrita(a), negrita(b)])} llevan la misma molécula en otra concentración o formulación.`,
      });
    });

  // Estadios que solo alcanza uno de los productos
  const sets = elegidos.map((p) => estadiosDeProducto(p));
  if (sets.every((s) => s.length > 0)) {
    const exclusivos = elegidos.map(() => []);
    ESTADIOS.forEach((e) => {
      const quienes = sets.map((s, i) => (s.includes(e.id) ? i : -1)).filter((i) => i >= 0);
      if (quienes.length === 1) exclusivos[quienes[0]].push(NOMBRE_ESTADIO_PLURAL[e.id] || e.nombre.toLowerCase());
    });
    exclusivos.forEach((lista, i) => {
      if (lista.length === 0) return;
      estadios.push({
        tono: 'info',
        texto:
          n === 2
            ? `${negrita(elegidos[i])} alcanza también ${unirLista(lista)}.`
            : `Solo ${negrita(elegidos[i])} alcanza ${unirLista(lista)}.`,
      });
    });
  }

  // Cultivos y objetivos que solo tiene uno. Las marcas gemelas cuentan como
  // un solo producto: sus listas difieren por cómo se documentó cada marca.
  const familias = [];
  elegidos.forEach((p) => {
    const f = familias.find((fam) => fam.some((q) => esGemelo([p, q])));
    if (f) f.push(p);
    else familias.push([p]);
  });
  const exclusivosDe = (listaDe, nombreDe) => {
    if (familias.length < 2) return [];
    const listas = familias.map((fam) => [...new Set(fam.flatMap(listaDe))]);
    const salida = [];
    familias.forEach((fam, i) => {
      const propios = listas[i].filter((x) => listas.every((otra, j) => j === i || !otra.includes(x)));
      if (propios.length) salida.push({ fam, nombres: propios.map(nombreDe) });
    });
    return salida.sort((x, y) => y.nombres.length - x.nombres.length).slice(0, 2);
  };
  const recortar = (nombres) => {
    // Algunos nombres ya llevan una «y» ("Flores y ornamentales"): se separan con punto y coma
    const lista = nombres.length > 3 ? nombres.slice(0, 3) : nombres;
    const sobran = nombres.length - lista.length;
    if (lista.some((x) => x.includes(' y '))) return `${lista.join('; ')}${sobran ? ` (+${sobran})` : ''}`;
    return sobran ? `${lista.join(', ')} y ${sobran} más` : unirLista(lista);
  };
  const quienes = (fam) => unirLista(fam.map(negrita));
  exclusivosDe(
    (p) => CAMPO[p.id]?.cultivos || [],
    (id) => minuscInicial(nombreCortoDeCultivo(id))
  ).forEach(({ fam, nombres }) => {
    cultivos.push({
      tono: 'info',
      texto: `Solo ${quienes(fam)} ${fam.length > 1 ? 'incluyen' : 'incluye'} ${recortar(nombres)} entre sus cultivos.`,
    });
  });
  exclusivosDe(
    (p) => p.objetivos || [],
    (id) => minuscInicial(etiquetaDe(id))
  ).forEach(({ fam, nombres }) => {
    objetivos.push({
      tono: 'info',
      texto: `Solo ${quienes(fam)} ${conSistema ? (fam.length > 1 ? 'controlan' : 'controla') : fam.length > 1 ? 'sirven' : 'sirve'} ${
        conSistema ? '' : 'para '
      }${recortar(nombres)}.`,
    });
  });

  const puntos = [...alertas, ...rotacion, ...riesgo, ...parecidos, ...estadios, ...cultivos, ...objetivos, ...bases];
  if (puntos.length < 3) {
    const difieren = evaluarFilasComparacion(elegidos)
      .filter((f) => !f.igual && !f.fila.trivial)
      .map((f) => f.fila.etiqueta.toLowerCase());
    if (familias.length < 2) {
      // Todos son marcas del mismo producto: lo que cambia es cómo se documentó cada una
      const citados = evaluarFilasComparacion(elegidos)
        .filter((f) => !f.igual && (f.fila.id === 'cultivos' || f.fila.id === 'momento'))
        .map((f) => f.fila.etiqueta.toLowerCase());
      if (citados.length) {
        puntos.push({ tono: 'info', texto: `Cada marca cita ${unirLista(citados)} distintos: confirma en su etiqueta.` });
      }
      puntos.push({
        tono: 'info',
        texto: 'Escoger entre ellas es cuestión de presentación, precio y disponibilidad.',
      });
    } else {
      puntos.push({
        tono: 'info',
        texto: difieren.length
          ? `Se diferencian sobre todo en ${unirLista(difieren.slice(0, 4))}.`
          : 'No hay diferencias técnicas en los datos que se comparan.',
      });
    }
  }
  return puntos.slice(0, 5);
}

/**
 * Productos de la misma línea para comparar con el primero, ordenados por
 * cuántos objetivos comparten. Las marcas gemelas salen marcadas y, a igual
 * número de objetivos, después de los que sí aportan una alternativa distinta.
 */
export function sugerenciasDeComparacion(base, idsElegidos = [], maximo = 5) {
  if (!base) return [];
  const mios = new Set(base.objetivos || []);
  const gemelos = new Set(gemelosDe(base).map((p) => p.id));
  const disponible = (p) => (p.estado === 'Disponible' ? 0 : 1);
  return PRODUCTOS.filter((p) => p.categoria === base.categoria && p.id !== base.id && !idsElegidos.includes(p.id))
    .map((producto) => ({
      producto,
      comunes: (producto.objetivos || []).filter((o) => mios.has(o)).length,
      gemelo: gemelos.has(producto.id),
    }))
    .sort(
      (a, b) =>
        b.comunes - a.comunes ||
        Number(a.gemelo) - Number(b.gemelo) ||
        disponible(a.producto) - disponible(b.producto) ||
        a.producto.nombre.localeCompare(b.producto.nombre, 'es')
    )
    .slice(0, maximo);
}

/* ────────────────────────────────────────────────────────────────
   Piezas visuales
   ──────────────────────────────────────────────────────────────── */

function SelloMejor() {
  return (
    <span
      className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-px text-[10px] font-bold leading-4"
      style={{ backgroundColor: COLORES.verdeClaro, color: TEXTO_MEJOR }}
    >
      <Check size={10} strokeWidth={3} />
      mejor
    </span>
  );
}

/** Sello IRAC/FRAC/HRAC que se parte en dos líneas cuando la columna es angosta. */
function SelloCompacto({ sistema, grupo, color }) {
  return (
    <span className="inline-flex max-w-full flex-wrap items-stretch overflow-hidden rounded font-mono text-xs font-semibold">
      <span className="px-1.5 py-0.5 text-white" style={{ backgroundColor: color }}>
        {sistema}
      </span>
      <span className="break-words px-1.5 py-0.5" style={{ backgroundColor: `${color}1F`, color }}>
        {grupo}
      </span>
    </span>
  );
}

/** Texto largo recortado a unas líneas, con «Ver más» solo cuando de verdad se corta. */
function TextoRecortable({ texto, lineas = 4 }) {
  const [abierto, setAbierto] = useState(false);
  const [recortado, setRecortado] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || abierto) return undefined;
    const medir = () => setRecortado(el.scrollHeight > el.clientHeight + 1);
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [texto, abierto]);

  return (
    <div>
      <p
        ref={ref}
        className="text-xs leading-relaxed"
        style={
          abierto
            ? { color: COLORES.tinta }
            : {
                color: COLORES.tinta,
                display: '-webkit-box',
                WebkitLineClamp: lineas,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
        }
      >
        <TextoMarcado texto={texto} />
      </p>
      {(recortado || abierto) && (
        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          className="mt-1 py-1 text-[11px] font-bold"
          style={{ color: '#1F6FA5' }}
        >
          {abierto ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </div>
  );
}

/** Ítems en chips. Lo que no tienen todos los productos va resaltado. */
function ListaComparada({ fila, valor, compartidos, producto, esMejor }) {
  const color = COLOR_CATEGORIA[producto.categoria];
  const cuenta = fila.unidad ? valor.length : null;
  return (
    <div>
      {cuenta != null && (
        <p className="cc-num mb-1 flex flex-wrap items-center gap-1 text-[11px] font-bold" style={{ color: COLORES.tinta }}>
          {cuenta} {cuenta === 1 ? fila.unidad[0] : fila.unidad[1]}
          {esMejor && <SelloMejor />}
        </p>
      )}
      <div className="flex flex-wrap gap-1">
        {valor.map((item) => {
          const destaca = compartidos && !compartidos.has(item);
          return (
            <span
              key={item}
              className="inline-flex max-w-full items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] leading-tight"
              style={{
                color: COLORES.tinta,
                backgroundColor: destaca ? FONDO_CATEGORIA[producto.categoria] : '#fff',
                borderColor: destaca ? `${color}66` : COLORES.borde,
                fontWeight: destaca ? 600 : 400,
              }}
            >
              {fila.tipo === 'cultivos' ? (
                <>
                  <IconoIlustrado nombre={item} tamano={16} />
                  <span className="min-w-0 break-words">{nombreCortoDeCultivo(item)}</span>
                </>
              ) : (
                <span className="min-w-0 break-words">{item}</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function EstadiosComparados({ valor, producto, esMejor }) {
  const color = COLOR_CATEGORIA[producto.categoria];
  return (
    <div>
      <p className="cc-num mb-1 flex flex-wrap items-center gap-1 text-[11px] font-bold" style={{ color: COLORES.tinta }}>
        {valor.length} de {ESTADIOS.length}
        {esMejor && <SelloMejor />}
      </p>
      <div className="flex flex-wrap gap-1">
        {ESTADIOS.map((e) => {
          const alcanza = valor.includes(e.id);
          return (
            <span
              key={e.id}
              className="inline-flex items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-[11px] leading-tight"
              style={
                alcanza
                  ? { backgroundColor: FONDO_CATEGORIA[producto.categoria], borderColor: `${color}66`, color: COLORES.tinta, fontWeight: 600 }
                  : { borderColor: COLORES.borde, color: COLORES.textoSuave, textDecoration: 'line-through' }
              }
            >
              {alcanza && <Check size={10} strokeWidth={3} />}
              {e.nombre}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function CeldaComparada({ fila, valor, compartidos, producto, esMejor }) {
  if (sinDato(valor)) {
    return (
      <span className="text-xs" style={{ color: COLORES.textoSuave }} aria-label="Sin dato">
        —
      </span>
    );
  }
  switch (fila.tipo) {
    case 'sello':
      return <SelloCompacto sistema={producto.sistema} grupo={producto.grupo} color={COLOR_CATEGORIA[producto.categoria]} />;
    case 'riesgo':
      return (
        <div>
          <span className="text-sm font-bold" style={{ color: COLOR_RIESGO[valor] || COLORES.tinta }}>
            {valor}
          </span>
          {esMejor && (
            <div className="mt-1">
              <SelloMejor />
            </div>
          )}
        </div>
      );
    case 'etiquetas':
    case 'cultivos':
      return <ListaComparada fila={fila} valor={valor} compartidos={compartidos} producto={producto} esMejor={esMejor} />;
    case 'estadios':
      return <EstadiosComparados valor={valor} producto={producto} esMejor={esMejor} />;
    case 'largo':
      return <TextoRecortable texto={valor} />;
    case 'estado':
      return valor === 'Pronto' ? (
        <span className="text-xs font-semibold" style={{ color: '#B45309' }}>
          Próximo lanzamiento
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: '#3F7A2A' }}>
          <Check size={13} /> {valor}
        </span>
      );
    default:
      return (
        <span className="block break-words text-xs leading-snug" style={{ color: COLORES.tinta }}>
          {valor}
        </span>
      );
  }
}

/**
 * Una fila de la comparación. La etiqueta va arriba y cada producto ocupa una
 * mini-columna, así nada obliga a desplazarse de lado. Los textos largos se
 * apilan en el teléfono (cada producto con su nombre) y pasan a columnas desde
 * 640 px. Si todos dicen lo mismo, el dato se muestra una sola vez.
 */
function FilaComparada({ item, elegidos, primera }) {
  const { fila, valores, igual, compartidos, mejores } = item;
  const n = elegidos.length;
  // Los textos largos no caben en una mini-columna de 100 px: se apilan, cada uno con su producto
  const largo = fila.tipo === 'largo' || (fila.tipo === 'texto' && valores.some((v) => String(v ?? '').length > 38));
  return (
    <div className="px-3 py-2.5" style={{ borderTop: primera ? 'none' : `1px solid ${COLORES.borde}` }}>
      <p
        className="flex flex-wrap items-baseline gap-x-2 text-[11px] font-bold uppercase tracking-wide"
        style={{ color: COLORES.textoSuave }}
      >
        {fila.etiqueta}
        {igual && <span className="text-[10px] font-semibold normal-case tracking-normal">igual en todos</span>}
      </p>
      {igual ? (
        <div className="mt-1.5">
          <CeldaComparada fila={fila} valor={valores[0]} compartidos={null} producto={elegidos[0]} esMejor={false} />
        </div>
      ) : (
        <div
          className={`mt-1.5 grid ${largo ? `grid-cols-1 gap-3 ${COLUMNAS_SM[n]}` : 'gap-2'}`}
          style={largo ? undefined : { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {elegidos.map((p, i) => (
            <div
              key={`${p.id}-${n}`}
              className={`min-w-0 ${largo && n > 1 ? 'border-l-2 pl-2 sm:border-l-0 sm:pl-0' : ''}`}
              style={largo && n > 1 ? { borderColor: `${COLOR_CATEGORIA[p.categoria]}66` } : undefined}
            >
              {largo && n > 1 && (
                <p className="mb-0.5 text-[11px] font-bold sm:hidden" style={{ color: COLOR_CATEGORIA[p.categoria] }}>
                  {p.nombre}
                </p>
              )}
              <CeldaComparada
                fila={fila}
                valor={valores[i]}
                compartidos={compartidos}
                producto={p}
                esMejor={mejores.includes(i)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Encabezados fijos: se quedan pegados bajo la barra superior al bajar por las filas. */
function CabeceraComparada({ elegidos, onQuitar, onAbrir, debajoDe }) {
  return (
    <div className="sticky z-20 pb-2 pt-1" style={{ top: debajoDe - 1, backgroundColor: COLORES.papel }}>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${elegidos.length}, minmax(0, 1fr))` }}>
        {elegidos.map((p) => {
          const color = COLOR_CATEGORIA[p.categoria];
          return (
            <div
              key={p.id}
              className="cc-pop relative min-w-0 rounded-xl"
              style={{ backgroundColor: FONDO_CATEGORIA[p.categoria] }}
            >
              <button
                type="button"
                onClick={() => onAbrir(p)}
                className="cc-presionable block w-full rounded-xl py-2 pl-2.5 pr-7 text-left"
                aria-label={`Abrir ficha de ${p.nombre}`}
              >
                <span className="line-clamp-2 break-words text-[13px] font-bold leading-tight" style={{ color: COLORES.tinta }}>
                  {p.nombre}
                  <ChevronRight size={12} className="ml-0.5 inline align-[-2px]" style={{ color }} />
                </span>
              </button>
              <button
                type="button"
                onClick={() => onQuitar(p.id)}
                className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/60"
                aria-label={`Quitar ${p.nombre}`}
              >
                <X size={14} style={{ color }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InterruptorSoloDiferencias({ activo, onCambio }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      onClick={() => onCambio(!activo)}
      className="cc-presionable flex min-h-[44px] items-center gap-2.5 text-left"
    >
      <span
        className="relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
        style={{ backgroundColor: activo ? COLORES.azul : '#C5D0D8' }}
      >
        <span
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all duration-200"
          style={{ left: activo ? 18 : 2, boxShadow: '0 1px 2px rgba(11,36,49,0.3)' }}
        />
      </span>
      <span className="text-sm font-semibold" style={{ color: COLORES.tinta }}>
        Solo diferencias
      </span>
    </button>
  );
}

const ICONO_TONO = { alerta: AlertTriangle, bien: Check, info: Info };
const COLOR_TONO = { alerta: '#C2410C', bien: COLORES.verde, info: COLORES.azul };

function ResumenComparacion({ puntos }) {
  if (puntos.length === 0) return null;
  return (
    <div className="cc-entrada mt-5 rounded-2xl bg-white p-3" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}>
      <h3 className="px-1 text-sm font-bold" style={{ color: COLORES.tinta }}>
        En resumen
      </h3>
      <ul className="cc-escalonado mt-2 space-y-1.5">
        {puntos.map((pt) => {
          const Icono = ICONO_TONO[pt.tono] || Info;
          const alerta = pt.tono === 'alerta';
          return (
            <li
              key={pt.texto}
              className="flex gap-2 rounded-xl px-2.5 py-2"
              style={alerta ? { backgroundColor: '#FDF3EE', border: '1px solid #F0C9B4' } : undefined}
            >
              <Icono size={16} className="mt-0.5 shrink-0" style={{ color: COLOR_TONO[pt.tono] }} />
              <p className="text-[13px] leading-snug" style={{ color: COLORES.tinta }}>
                <TextoMarcado texto={pt.texto} />
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SugerenciasComparacion({ sugerencias, color, onElegir }) {
  if (sugerencias.length === 0) return null;
  return (
    <div className="cc-entrada mt-4">
      <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
        Compárelo con
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {sugerencias.map(({ producto, comunes, gemelo }) => (
          <Chip
            key={producto.id}
            icono={Plus}
            color={color}
            onClick={() => onElegir(producto.id)}
            label={
              <span className="text-left leading-tight">
                {producto.nombre}
                <span className="block text-[10px] font-normal" style={{ opacity: 0.8 }}>
                  {gemelo
                    ? 'mismo producto'
                    : comunes === 0
                      ? 'sin objetivos en común'
                      : `${comunes} ${comunes === 1 ? 'objetivo' : 'objetivos'} en común`}
                </span>
              </span>
            }
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Comparador lado a lado.
 *
 * Responde la pregunta que queda después del diagnóstico: la app propuso tres
 * productos válidos, ¿cuál escojo? Arriba resume en pocas viñetas qué los
 * separa; abajo pone cada dato en su fila, con una mini-columna por producto,
 * y marca la mejor opción donde se puede decir de forma objetiva.
 */
export function Comparador({ onAbrirProducto, pedido }) {
  const [ids, setIds] = useState(pedido?.id ? [pedido.id] : []);

  // Desde la ficha de un producto: empezar la comparación con él
  useEffect(() => {
    if (pedido?.id) setIds([pedido.id]);
  }, [pedido]);
  const [soloDiferencias, setSoloDiferencias] = useState(false);
  // Alto de la barra superior fija (incluye la zona segura del teléfono): de ahí cuelgan los encabezados
  const [altoBarra, setAltoBarra] = useState(60);

  useEffect(() => {
    const medir = () => {
      const barra = document.querySelector('header');
      if (barra) setAltoBarra(Math.round(barra.getBoundingClientRect().height));
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);

  const elegidos = useMemo(
    () => ids.map((id) => PRODUCTOS.find((p) => p.id === id)).filter(Boolean),
    [ids]
  );
  const n = elegidos.length;

  // Solo tiene sentido comparar dentro de la misma categoría
  const categoriaFijada = elegidos[0]?.categoria || null;
  const disponibles = PRODUCTOS.filter(
    (p) => !ids.includes(p.id) && (!categoriaFijada || p.categoria === categoriaFijada)
  );

  const resumen = useMemo(() => resumenDeComparacion(elegidos), [elegidos]);
  const filas = useMemo(() => evaluarFilasComparacion(elegidos), [elegidos]);
  const sugerencias = useMemo(
    () => (elegidos[0] && n < MAXIMO_COMPARADOS ? sugerenciasDeComparacion(elegidos[0], ids) : []),
    [elegidos, ids, n]
  );

  const iguales = filas.filter((f) => f.igual).length;
  const visibles = soloDiferencias && n > 1 ? filas.filter((f) => !f.igual) : filas;
  const secciones = SECCIONES_COMPARACION.map((s) => ({
    ...s,
    filas: visibles.filter((f) => f.fila.seccion === s.id),
  })).filter((s) => s.filas.length > 0);

  const agregar = (id) => {
    if (id && ids.length < MAXIMO_COMPARADOS && !ids.includes(id)) setIds([...ids, id]);
  };

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Comparar productos
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Cuando varios productos sirven, esto muestra lado a lado lo que de verdad los diferencia.
        Hasta {MAXIMO_COMPARADOS} de la misma línea.
      </p>

      {/* Selector */}
      {ids.length < MAXIMO_COMPARADOS && (
        <div className="mt-4">
          <SelectorProducto
            valor=""
            onCambio={agregar}
            productos={disponibles}
            titulo={ids.length === 0 ? 'Primer producto a comparar' : 'Agregar a la comparación'}
            marcador={
              ids.length === 0
                ? 'Escoge el primer producto…'
                : `Agregar otro ${categoriaFijada?.toLowerCase() || 'producto'} (${ids.length}/${MAXIMO_COMPARADOS})…`
            }
          />
        </div>
      )}

      {n === 0 && (
        <EstadoVacio
          icono={Scale}
          imagen="comparar"
          titulo="Pon dos o tres productos frente a frente"
          texto="Cuando varios productos sirven, aquí ves lado a lado lo que de verdad los diferencia."
        />
      )}

      {n > 0 && (
        <>
          <SugerenciasComparacion
            sugerencias={sugerencias}
            color={COLOR_CATEGORIA[categoriaFijada]}
            onElegir={agregar}
          />

          <ResumenComparacion puntos={resumen} />

          {/* Controles de la tabla */}
          {n > 1 && (
            <div className="mt-3">
              <div className="flex items-center justify-between gap-3">
                <InterruptorSoloDiferencias activo={soloDiferencias} onCambio={setSoloDiferencias} />
                {iguales > 0 && (
                  <span className="cc-num text-right text-xs" style={{ color: COLORES.textoSuave }}>
                    {iguales} {iguales === 1 ? 'fila igual' : 'filas iguales'}
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-snug" style={{ color: COLORES.textoSuave }}>
                «Mejor» marca el menor riesgo o el que cubre más. Lo resaltado en Controla y Cultivos no lo
                tienen todos.
              </p>
            </div>
          )}

          {/* Tabla: encabezados fijos y una mini-columna por producto */}
          <div className="mt-3">
            <CabeceraComparada
              elegidos={elegidos}
              onQuitar={(id) => setIds(ids.filter((x) => x !== id))}
              onAbrir={onAbrirProducto}
              debajoDe={altoBarra}
            />
            <div className="overflow-hidden rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}>
              {secciones.length === 0 ? (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm font-semibold" style={{ color: COLORES.tinta }}>
                    Estos productos coinciden en todo lo que se compara.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSoloDiferencias(false)}
                    className="mt-2 py-2 text-sm font-bold"
                    style={{ color: '#1F6FA5' }}
                  >
                    Ver todas las filas
                  </button>
                </div>
              ) : (
                secciones.map((s) => (
                  <section key={s.id}>
                    <h3
                      className="px-3 py-1.5 text-xs font-bold"
                      style={{ backgroundColor: COLORES.grisClaro, color: COLORES.tinta }}
                    >
                      {s.titulo}
                    </h3>
                    {s.filas.map((f, i) => (
                      <FilaComparada key={f.fila.id} item={f} elegidos={elegidos} primera={i === 0} />
                    ))}
                  </section>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-2 rounded-xl p-3" style={{ backgroundColor: COLORES.papel }}>
            <Info size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.textoSuave }} />
            <p className="text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
              No incluye dosis ni precio por hectárea: dependen de la etiqueta y del precio del día. Con el
              modo de acción resuelto, esos datos deciden el resto. Los cultivos son de referencia: confirma
              el registro en la etiqueta ICA vigente.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Comparador;
