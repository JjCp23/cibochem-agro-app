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
import { compartenModoDeAccion, explicarConflicto, gruposDeRotacion } from './resistencia.js';

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
};

/**
 * Recomienda productos según el criterio del diagnóstico guiado.
 *
 * El objetivo es un FILTRO DURO y no un criterio de puntaje: un producto que no
 * controla el organismo buscado nunca debe aparecer, por bien que encaje en
 * cultivo y momento. Es la regla que evita recomendar un triazol para un
 * oomiceto, que no tiene ergosterol en su membrana.
 */
export function recomendar(criterio) {
  const { categoria, categorias, objetivo, escenario, momento, ultimoUsado } = criterio;

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

/** Búsqueda libre por texto sobre los campos identificatorios del producto. */
export function buscarTexto(termino, lista = PRODUCTOS) {
  const t = termino.trim().toLowerCase();
  if (!t) return lista;
  return lista.filter((p) =>
    [p.nombre, p.ia, p.familia, p.grupo, p.categoria, p.mecanismo, p.sistema]
      .filter(Boolean)
      .some((campo) => campo.toLowerCase().includes(t))
  );
}

/**
 * Construye un programa de varios pases escogiendo en cada paso el mejor
 * candidato que no repita ningún sitio de acción ya usado en el programa.
 * Es la unión de los dos cerebros: recomendación + resistencia.
 */
export function construirPrograma(criterio, pases = 3) {
  const usados = [];
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
