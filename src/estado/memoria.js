/**
 * Memoria local de la app: favoritos, vistos recientemente y la mezcla en
 * curso.
 *
 * Todo se guarda en el propio teléfono (localStorage). No hay cuentas ni
 * servidor: lo que se marca en campo sigue ahí al volver a abrir la app, aun
 * sin señal. Si el navegador no deja guardar (modo privado, vista previa
 * embebida), la app funciona igual y solo olvida al cerrarse.
 */

import React, { useState, useEffect, useSyncExternalStore } from 'react';

function leerMemoria(clave, inicial) {
  try {
    const crudo = window.localStorage.getItem(clave);
    return crudo == null ? inicial : JSON.parse(crudo);
  } catch {
    return inicial;
  }
}

function guardarMemoria(clave, valor) {
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Sin almacenamiento disponible: se conserva solo mientras la app esté abierta
  }
}

/**
 * Almacén compartido entre componentes. Cuando la ficha marca un favorito, el
 * catálogo y el inicio se enteran sin pasar el dato de mano en mano.
 */
export function crearAlmacen(clave, inicial) {
  let valor = leerMemoria(clave, inicial);
  const oyentes = new Set();
  return {
    obtener: () => valor,
    fijar(nuevo) {
      valor = typeof nuevo === 'function' ? nuevo(valor) : nuevo;
      guardarMemoria(clave, valor);
      oyentes.forEach((f) => f());
    },
    suscribir(f) {
      oyentes.add(f);
      return () => oyentes.delete(f);
    },
  };
}

/** Lee un almacén y se vuelve a pintar cada vez que cambia. */
export function useAlmacen(almacen) {
  const valor = useSyncExternalStore(almacen.suscribir, almacen.obtener, almacen.obtener);
  return [valor, almacen.fijar];
}

/** Como useState, pero el valor sobrevive al cerrar la app. */
export function usePersistente(clave, inicial) {
  const [valor, setValor] = useState(() => leerMemoria(clave, inicial));
  useEffect(() => {
    guardarMemoria(clave, valor);
  }, [clave, valor]);
  return [valor, setValor];
}

/** Agrega el id si no está y lo quita si ya estaba. */
export function alternarEnLista(lista, id) {
  return lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id];
}

/** Pone el id de primero, sin duplicados y con un tope de elementos. */
export function anteponerReciente(lista, id, maximo = 8) {
  return [id, ...lista.filter((x) => x !== id)].slice(0, maximo);
}

/**
 * Convierte una lista de ids guardada en productos. Ignora los ids que ya no
 * existen, por si un producto sale del portafolio entre una versión y otra.
 */
export function productosDeIds(ids, productos) {
  return (ids || []).map((id) => productos.find((p) => p.id === id)).filter(Boolean);
}

export const FAVORITOS = crearAlmacen('cibo:favoritos', []);
export const RECIENTES = crearAlmacen('cibo:recientes', []);
export const MEZCLA_PRODUCTOS = crearAlmacen('cibo:mezcla:productos', []);

/** Almacén que vive solo mientras la app está abierta (no se guarda). */
export function crearAlmacenVolatil(inicial) {
  let valor = inicial;
  const oyentes = new Set();
  return {
    obtener: () => valor,
    fijar(nuevo) {
      valor = typeof nuevo === 'function' ? nuevo(valor) : nuevo;
      oyentes.forEach((f) => f());
    },
    suscribir(f) {
      oyentes.add(f);
      return () => oyentes.delete(f);
    },
  };
}

/**
 * Invitación del navegador a instalar la app (Android y escritorio). Se guarda
 * para mostrar el botón "Instalar" en el momento oportuno, no en un aviso que
 * aparece solo al abrir.
 */
export const INSTALACION = crearAlmacenVolatil(null);

/** Productos en comparación: sobreviven a ir y volver entre Buscar y Comparar. */
export const COMPARACION = crearAlmacenVolatil([]);

/** Sub-vista de Mezcla (mezcla, calibración, orden, chequeo). */
export const VISTA_MEZCLA = crearAlmacenVolatil('mezcla');

export function escucharInstalacion() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    INSTALACION.fijar(e);
  });
  window.addEventListener('appinstalled', () => INSTALACION.fijar(null));
}
