/**
 * CEREBRO 2 — Diagnóstico
 *
 * Responsabilidad única: traducir una situación de campo en una lista de
 * productos ordenada, con la razón de cada uno.
 *
 * Consulta al cerebro de resistencia para penalizar lo que repite el modo de
 * acción anterior, pero no reimplementa esa lógica.
 */

import { PRODUCTOS } from '../data/productos.js';
import { RAMAS } from '../data/taxonomia.js';
import { CAMPO } from '../data/campo.js';
import { CULTIVOS } from '../data/cultivos.js';
import { TRANSLOCACION, fichasDeProducto } from '../data/gruposMoA.js';
import { compartenModoDeAccion, explicarConflicto, gruposDeRotacion, gruposQuimicosDe } from './resistencia.js';

const PESOS = {
  base: 50,
  escenario: 22,
  escenarioGeneral: 8,
  momento: 24,
  disponible: 6,
  todera: 5,
  riesgoBajo: 8,
  rotacionOk: 30,
  rotacionMal: -100,
  cultivoEnFicha: 16,
  cultivoEnGuia: 10,
  etapaDesaconsejada: -25,
};

/** Nombre corto de un cultivo: "Frutales andinos (mora…)" → "Frutales andinos". */
export function nombreCultivo(id) {
  const c = CULTIVOS.find((x) => x.id === id);
  return c ? c.nombre.replace(/\s*\(.*\)/, '') : '';
}

/**
 * Recomienda productos según el criterio del diagnóstico guiado.
 *
 * El objetivo es un FILTRO DURO y no un criterio de puntaje: un producto que no
 * controla el organismo buscado nunca debe aparecer, por bien que encaje en
 * cultivo y momento. Es la regla que evita recomendar un triazol para un
 * oomiceto, que no tiene ergosterol en su membrana.
 */
export function recomendar(criterio) {
  const { categoria, categorias, objetivo, escenario, momento, ultimoUsado, cultivo, etapa } = criterio;
  const enFloracion = /flora/i.test(etapa || '');

  // Una rama del diagnóstico puede abarcar varias categorías de producto. La
  // rama de nutrición, por ejemplo, incluye bioestimulantes Y reguladores de
  // crecimiento: para el agricultor "alargar los brotes" es la misma pregunta,
  // aunque internamente sean dos familias distintas.
  const admitidas = categorias || (categoria ? [categoria] : null);

  const candidatos = PRODUCTOS.filter((p) => {
    if (admitidas && !admitidas.includes(p.categoria)) return false;
    if (objetivo && !p.objetivos?.includes(objetivo)) return false;
    return true;
  });

  const evaluados = candidatos.map((p) => {
    let puntaje = PESOS.base;
    const razones = ['Controla lo que buscas'];
    const alertas = [];

    if (escenario && p.escenarios?.includes(escenario)) {
      puntaje += PESOS.escenario;
      razones.push('Indicado para ese uso');
    } else if (p.escenarios?.includes('general')) {
      puntaje += PESOS.escenarioGeneral;
    }

    if (momento && p.momento?.includes(momento)) {
      puntaje += PESOS.momento;
      razones.push('Encaja en ese momento');
    }

    // El cultivo no filtra (la guía no es un registro), pero sí ordena: primero
    // lo que la ficha técnica menciona para ese cultivo, luego lo que la guía
    // de campo usa en él.
    if (cultivo) {
      const campo = CAMPO[p.id];
      if (campo?.etiqueta?.cultivos?.includes(cultivo)) {
        puntaje += PESOS.cultivoEnFicha;
        razones.push(`Uso en ${nombreCultivo(cultivo).toLowerCase()} según su ficha técnica`);
      } else if (campo?.cultivos?.includes(cultivo)) {
        puntaje += PESOS.cultivoEnGuia;
        razones.push(`Se usa en ${nombreCultivo(cultivo).toLowerCase()}`);
      }
    }

    // Grupos que la guía desaconseja en floración (polinizadores)
    if (enFloracion && gruposQuimicosDe(p).some((g) => /floraci/i.test(g.noRecomiendesSi || ''))) {
      puntaje += PESOS.etapaDesaconsejada;
      alertas.push('En floración no se recomienda este grupo químico: protege a los polinizadores');
    }

    if (p.estado === 'Disponible') puntaje += PESOS.disponible;
    if (p.todera) {
      puntaje += PESOS.todera;
      razones.push('Producto ancla del portafolio');
    }
    if (p.riesgo === 'Bajo' || p.riesgo === 'Nulo') {
      puntaje += PESOS.riesgoBajo;
      razones.push('Bajo riesgo de resistencia');
    }

    if (ultimoUsado) {
      const conflicto = explicarConflicto(p, ultimoUsado);
      if (conflicto) {
        puntaje += PESOS.rotacionMal;
        alertas.push(`${conflicto}: no rompe la presión de selección`);
      } else if (p.sistema && p.sistema === ultimoUsado.sistema) {
        puntaje += PESOS.rotacionOk;
        razones.push(
          `Rota bien: cambia de ${ultimoUsado.sistema} ${gruposDeRotacion(ultimoUsado).join('/')} a ${gruposDeRotacion(p).join('/')}`
        );
      }
    }

    if (p.riesgo === 'Alto') alertas.push('Alto riesgo de resistencia: no repetir el grupo en el ciclo');
    if (p.estado === 'Pronto') alertas.push('Próximo lanzamiento, aún no disponible');

    return { ...p, puntaje, razones, alertas };
  });

  return evaluados.filter((p) => p.puntaje > 0).sort((a, b) => b.puntaje - a.puntaje);
}

/** Minúsculas y sin tildes: en campo se escribe rápido y sin acentos. */
export function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Texto de búsqueda de cada objetivo: su nombre y la ayuda, que es donde viven
// los nombres comunes ("mosca blanca", "arañita roja", "coquito").
const TEXTO_OBJETIVO = (() => {
  const mapa = {};
  RAMAS.forEach((r) =>
    r.objetivos.forEach((o) => {
      mapa[o.id] = `${mapa[o.id] || ''} ${o.label} ${o.ayuda || ''}`;
    })
  );
  return mapa;
})();

// Un código de grupo ("4a", "m03", "22") se compara por palabra completa al
// inicio, para que buscar el 4A no traiga el 14A.
const PARECE_CODIGO = /^m?\d+[a-z]?$/;

// "3" encuentra el 3A y el 3B (mismo sitio de acción), pero no el 30
function coincideCodigo(palabra, t) {
  return palabra === t || (palabra.startsWith(t) && /^[a-z]$/.test(palabra.slice(t.length)));
}

function palabrasDe(texto) {
  return normalizarTexto(texto).split(/[^a-z0-9]+/).filter(Boolean);
}

/**
 * Búsqueda libre por texto. Acepta varias palabras (todas deben aparecer),
 * ignora tildes y mayúsculas, y entiende nombres comunes de plagas y
 * enfermedades a través de los objetivos del producto. Devuelve la lista
 * ordenada por relevancia: primero lo que coincide con el nombre comercial.
 */
export function buscarTexto(termino, lista = PRODUCTOS) {
  const consulta = palabrasDe(termino);
  if (consulta.length === 0) return lista;

  const evaluados = [];
  lista.forEach((p, orden) => {
    const nombre = palabrasDe(p.nombre);
    const ia = palabrasDe(p.ia);
    const grupo = palabrasDe(p.grupo);
    const resto = palabrasDe(
      [p.familia, p.categoria, p.mecanismo, p.sistema, ...(p.objetivos || []).map((o) => TEXTO_OBJETIVO[o])]
        .filter(Boolean)
        .join(' ')
    );
    const textoCompleto = [...nombre, ...ia, ...grupo, ...resto].join(' ');

    let puntaje = 0;
    const todas = consulta.every((t, i) => {
      if (i === 0 && normalizarTexto(p.nombre).startsWith(t)) puntaje += 100;
      if (PARECE_CODIGO.test(t) && grupo.some((w) => coincideCodigo(w, t))) puntaje += 80;
      else if (nombre.some((w) => w.startsWith(t))) puntaje += 60;
      else if (grupo.includes(t)) puntaje += 50;
      else if (ia.some((w) => w.startsWith(t))) puntaje += 40;
      else if (resto.some((w) => w.startsWith(t))) puntaje += 20;
      else if (!PARECE_CODIGO.test(t) && textoCompleto.includes(t)) puntaje += 5;
      else return false;
      return true;
    });

    if (todas) evaluados.push({ p, puntaje, orden });
  });

  return evaluados.sort((a, b) => b.puntaje - a.puntaje || a.orden - b.orden).map((x) => x.p);
}

/**
 * Construye un programa de varios pases escogiendo en cada paso el mejor
 * candidato que no repita ningún sitio de acción ya usado en el programa.
 * Es la unión de los dos cerebros: recomendación + resistencia.
 */
export function construirPrograma(criterio, pases = 3) {
  // Si se sabe qué se aplicó antes, el programa arranca después de eso y
  // tampoco puede repetir su sitio de acción.
  const usados = criterio.ultimoUsado ? [criterio.ultimoUsado] : [];
  const programa = [];

  for (let i = 0; i < pases; i += 1) {
    const candidatos = recomendar(criterio).filter(
      // "Nuevo" ya está en el mercado; solo se excluye lo que aún no sale
      (p) => p.estado !== 'Pronto' && !usados.some((u) => compartenModoDeAccion(p, u))
    );
    if (candidatos.length === 0) break;
    programa.push(candidatos[0]);
    usados.push(candidatos[0]);
  }

  return programa;
}

/**
 * La oración que dice qué se observa en campo ("ves", "vas a ver"…); si
 * ninguna lo dice, la primera.
 */
function oracionDeCampo(texto) {
  const oraciones = String(texto || '').match(/[^.!?]+[.!?]+/g) || [String(texto || '')];
  const observacion = oraciones.find((o) => /\b(ves|verás|vas a ver|se ve|notas|aparece|dejó de|deja de)\b/i.test(o));
  return (observacion || oraciones[0]).trim();
}

/**
 * Recomendación técnica para una situación concreta: el producto principal y
 * todo lo que un agrónomo diría al recomendarlo. Con qué rotar después, si
 * necesita un acompañante multisitio, cómo aplicarlo según su movimiento,
 * qué se va a ver en campo y si la ficha técnica lo menciona para el cultivo.
 */
export function recomendacionTecnica(criterio) {
  const lista = recomendar(criterio).filter((p) => p.estado !== 'Pronto');
  if (lista.length === 0) return null;
  const principal = lista[0];

  // Siguiente pase: el mejor candidato que no comparta sitio con el principal.
  // En herbicidas además tiene que servir en el mismo escenario: un no
  // selectivo no es rotación dentro de un cultivo establecido.
  const sirveEnEscenario = (p) =>
    p.categoria !== 'Herbicida' || !criterio.escenario || p.escenarios?.includes(criterio.escenario);
  const siguiente =
    principal.sistema &&
    lista.find((p) => p.id !== principal.id && !compartenModoDeAccion(p, principal) && sirveEnEscenario(p));

  // Regla de fungicidas: los de riesgo alto nunca van solos, van con un multisitio
  let acompanante = null;
  const riesgoAlto = gruposQuimicosDe(principal).some((g) => g.riesgo === 'alto');
  const esMultisitio = /^M/.test(String(principal.grupo));
  if (principal.categoria === 'Fungicida' && riesgoAlto && !esMultisitio) {
    const multisitios = lista.filter((p) => /^M/.test(String(p.grupo)));
    acompanante = multisitios[0] || null;
  }

  const ficha = fichasDeProducto(principal)[0]?.ficha;
  const movimiento = ficha && TRANSLOCACION[ficha.translocacion];
  const campo = CAMPO[principal.id] || {};

  return {
    principal,
    siguiente: siguiente || null,
    acompanante,
    movimiento: movimiento || null,
    enCampo: oracionDeCampo(campo.enCampo),
    consejo: campo.consejo || '',
    fichaMencionaCultivo: Boolean(criterio.cultivo && campo.etiqueta?.cultivos?.includes(criterio.cultivo)),
    fuente: campo.etiqueta?.fuente || null,
    alternativas: lista.slice(1, 4),
  };
}
