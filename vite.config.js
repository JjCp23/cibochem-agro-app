import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { createHash } from 'node:crypto';

/**
 * Genera el service worker al final del build con la lista exacta de archivos
 * publicados. Así la app queda guardada completa en el teléfono desde la
 * primera visita y funciona en finca sin señal, sin agregar dependencias.
 *
 * La versión del caché es un hash del contenido: si nada cambió, el teléfono
 * no vuelve a descargar nada; si cambió algo, se renueva todo de una vez.
 */
function serviceWorkerSinConexion() {
  let raiz = process.cwd();
  let salida = 'dist';
  return {
    name: 'cibocampo-sin-conexion',
    apply: 'build',
    configResolved(config) {
      raiz = config.root;
      salida = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const archivos = [];
      const recorrer = (dir) => {
        readdirSync(dir).forEach((nombre) => {
          const ruta = join(dir, nombre);
          if (statSync(ruta).isDirectory()) recorrer(ruta);
          else archivos.push(ruta);
        });
      };
      recorrer(salida);

      const huella = createHash('sha256');
      const lista = archivos
        .map((ruta) => {
          huella.update(readFileSync(ruta));
          return `./${relative(salida, ruta).split('\\').join('/')}`;
        })
        .filter((r) => r !== './sw.js' && !r.endsWith('.map'))
        .sort();

      const plantilla = readFileSync(resolve(raiz, 'scripts/sw-plantilla.js'), 'utf8');
      const sw = plantilla
        .replace('__VERSION__', huella.digest('hex').slice(0, 12))
        .replace('__ARCHIVOS__', JSON.stringify(['./', ...lista], null, 2));
      writeFileSync(join(salida, 'sw.js'), sw);
    },
  };
}

export default defineConfig({
  plugins: [react(), serviceWorkerSinConexion()],
  // Rutas relativas: así el build funciona igual servido desde la raíz de un
  // dominio propio o desde el subdirectorio /nombre-del-repo/ de GitHub Pages,
  // sin tener que configurar el nombre del repositorio en ningún lado.
  base: './',
  server: { port: 5173, open: true },
});
