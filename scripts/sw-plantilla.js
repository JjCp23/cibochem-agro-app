/**
 * Service worker de CiboCAMPO. ARCHIVO GENERADO en cada build desde
 * scripts/sw-plantilla.js: no lo edites en dist/.
 *
 * Estrategia:
 *  - Al instalarse guarda toda la app (la lista la escribe el build).
 *  - La página principal se pide primero a la red, para recibir la última
 *    versión con señal; si la red falla o tarda más de 3 s, se sirve la
 *    guardada. En campo, una señal débil no deja la pantalla en blanco.
 *  - El resto (JS, CSS, iconos) lleva hash en el nombre: se sirve del caché.
 */
const VERSION = '__VERSION__';
const CACHE = `cibocampo-${VERSION}`;
const ARCHIVOS = __ARCHIVOS__;
const ESPERA_RED_MS = 3000;

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((claves) =>
        Promise.all(
          claves.filter((c) => c.startsWith('cibocampo-') && c !== CACHE).map((c) => caches.delete(c))
        )
      )
      .then(() => self.clients.claim())
  );
});

async function paginaPrincipal(peticion) {
  const cache = await caches.open(CACHE);
  const guardada = await cache.match('./index.html');
  const red = fetch(peticion).then((respuesta) => {
    if (respuesta.ok) cache.put('./index.html', respuesta.clone());
    return respuesta;
  });
  if (!guardada) return red;
  red.catch(() => {}); // si falla después de servir la guardada, no importa
  const tiempo = new Promise((_, rechazar) => setTimeout(() => rechazar(new Error('red lenta')), ESPERA_RED_MS));
  try {
    return await Promise.race([red, tiempo]);
  } catch {
    return guardada;
  }
}

async function archivoEstatico(peticion) {
  const guardado = await caches.match(peticion);
  if (guardado) return guardado;
  const respuesta = await fetch(peticion);
  if (respuesta.ok) {
    const cache = await caches.open(CACHE);
    cache.put(peticion, respuesta.clone());
  }
  return respuesta;
}

self.addEventListener('fetch', (evento) => {
  const { request } = evento;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  evento.respondWith(request.mode === 'navigate' ? paginaPrincipal(request) : archivoEstatico(request));
});
