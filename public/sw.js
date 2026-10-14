/**
 * Service worker de Cibochem Campo.
 *
 * Objetivo agronómico: la app se usa en finca, donde la señal falla. Todo el
 * contenido (los 80 productos, las fichas de modo de acción, las ilustraciones
 * y las calculadoras) viaja dentro del paquete y no necesita servidor, así que
 * basta con cachear el shell y los assets para que funcione completa sin datos.
 *
 * Estrategias:
 *  - Navegación: red primero con respaldo en caché. Así se ve la versión nueva
 *    cuando hay señal, y la última conocida cuando no la hay.
 *  - Assets con hash: caché primero. El nombre incluye el hash del contenido,
 *    así que si cambia el archivo cambia la URL y nunca se sirve algo obsoleto.
 */

const VERSION = 'cibochem-campo-v1';
const SHELL = `${VERSION}-shell`;
const ASSETS = `${VERSION}-assets`;

// Rutas relativas: la app funciona igual en la raíz de un dominio que en un
// subdirectorio, y el service worker debe respetar eso.
const BASE = new URL('./', self.registration.scope).pathname;

const PRECARGA = [BASE, `${BASE}index.html`, `${BASE}manifest.webmanifest`];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(PRECARGA))
      // Si algún recurso del shell falla, no bloquear la instalación: la app
      // sigue sirviendo desde la red y cachea en la primera visita.
      .catch(() => undefined)
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((nombres) =>
        Promise.all(
          nombres
            .filter((n) => n.startsWith('cibochem-campo-') && !n.startsWith(VERSION))
            .map((n) => caches.delete(n))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const peticion = evento.request;

  // Solo se cachean lecturas propias del sitio
  if (peticion.method !== 'GET') return;
  const url = new URL(peticion.url);
  if (url.origin !== self.location.origin) return;

  // ── Navegación: red primero, caché como respaldo ──
  if (peticion.mode === 'navigate') {
    evento.respondWith(
      fetch(peticion)
        .then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(SHELL).then((cache) => cache.put(`${BASE}index.html`, copia));
          return respuesta;
        })
        .catch(() =>
          caches
            .match(`${BASE}index.html`)
            .then((cacheada) => cacheada || caches.match(BASE))
        )
    );
    return;
  }

  // ── Assets con hash: caché primero ──
  // /productos/ entra en la misma estrategia: son las fotos de empaque de
  // cada producto, y el catálogo debe verse completo también sin señal.
  if (
    url.pathname.includes('/assets/') ||
    url.pathname.includes('/iconos/') ||
    url.pathname.includes('/productos/')
  ) {
    evento.respondWith(
      caches.match(peticion).then(
        (cacheada) =>
          cacheada ||
          fetch(peticion).then((respuesta) => {
            if (respuesta.ok) {
              const copia = respuesta.clone();
              caches.open(ASSETS).then((cache) => cache.put(peticion, copia));
            }
            return respuesta;
          })
      )
    );
  }
});

// Permite que la página pida activar de inmediato una versión nueva
self.addEventListener('message', (evento) => {
  if (evento.data === 'activar-actualizacion') self.skipWaiting();
});
