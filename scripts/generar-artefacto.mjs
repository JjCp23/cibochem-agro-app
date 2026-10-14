/**
 * Genera una versión de un solo archivo de la app, uniendo todos los módulos.
 *
 * Sirve para pegar la app en entornos que solo aceptan un archivo (por ejemplo
 * una vista previa de artefacto) sin tener que mantener dos copias del código.
 *
 * Uso:  node scripts/generar-artefacto.mjs [ruta-de-salida]
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Orden de dependencias: cada módulo solo usa lo declarado antes que él.
const MODULOS = [
  'src/data/productos.js',
  'src/data/taxonomia.js',
  'src/data/gruposMoA.js',
  'src/data/conocimiento.js',
  'src/motores/resistencia.js',
  'src/motores/diagnostico.js',
  'src/motores/aplicacion.js',
  'src/estado/memoria.js',
  'src/components/ui/Movimiento.jsx',
  'src/components/ui/Etiqueta.jsx',
  'src/components/ui/Superficie.jsx',
  'src/components/ui/Iconos.jsx',
  'src/components/ui/Hoja.jsx',
  'src/components/ui/Avisos.jsx',
  'src/components/ui/SelectorProducto.jsx',
  'src/components/ui/Ilustraciones.jsx',
  'src/components/TarjetaProducto.jsx',
  'src/components/FichaProducto.jsx',
  'src/components/Buscador.jsx',
  'src/components/Diagnostico.jsx',
  'src/components/Comparador.jsx',
  'src/components/Catalogo.jsx',
  'src/components/Rotacion.jsx',
  'src/components/CicloVida.jsx',
  'src/components/Mezcla.jsx',
  'src/components/Aprender.jsx',
  'src/App.jsx',
];

/** Quita imports internos y convierte los export en declaraciones planas. */
function aplanar(codigo) {
  return codigo
    // fuera los import (incluidos los de varias líneas)
    .replace(/^import[\s\S]*?from\s+['"][^'"]+['"];\s*$/gm, '')
    .replace(/^import\s+['"][^'"]+['"];\s*$/gm, '')
    // fuera las re-exportaciones "export { a, b };"
    .replace(/^export\s*\{[^}]*\};\s*$/gm, '')
    // fuera los "export default Algo;" sueltos del final
    .replace(/^export default \w+;\s*$/gm, '')
    // export default function App -> function App
    .replace(/^export default function/gm, 'function')
    // export const / export function -> const / function
    .replace(/^export (const|function)/gm, '$1')
    .trim();
}

const iconos = new Set();
const hooks = new Set();
const partes = MODULOS.map((ruta) => {
  const bruto = readFileSync(resolve(raiz, ruta), 'utf8');

  // recolecta los iconos de lucide-react usados en todo el proyecto
  const m = bruto.match(/import\s*\{([^}]+)\}\s*from\s*'lucide-react'/);
  // (filter: los imports en varias líneas terminan en coma y dejarían un vacío)
  if (m) m[1].split(',').map((i) => i.trim()).filter(Boolean).forEach((i) => iconos.add(i));

  // recolecta los hooks de React. Antes esta lista estaba escrita a mano en el
  // encabezado y bastaba con que un módulo estrenara un hook para que el
  // artefacto fallara en tiempo de ejecución con "Can't find variable".
  const h = bruto.match(/import\s+React\s*,\s*\{([^}]+)\}\s*from\s*'react'/);
  if (h) h[1].split(',').map((x) => x.trim()).filter(Boolean).forEach((x) => hooks.add(x));

  return `// ${'═'.repeat(66)}\n// ${ruta}\n// ${'═'.repeat(66)}\n\n${aplanar(bruto)}`;
});

const encabezado = `/**
 * Cibochem Campo — versión de un solo archivo.
 *
 * ARCHIVO GENERADO AUTOMÁTICAMENTE. No lo edites a mano:
 * modifica los módulos en src/ y vuelve a correr
 *   node scripts/generar-artefacto.mjs
 */

import React, { ${[...hooks].sort().join(', ')} } from 'react';
import { ${[...iconos].sort().join(', ')} } from 'lucide-react';
`;

const salida = process.argv[2] || resolve(raiz, 'dist-artefacto/CibochemCampo.jsx');
const contenido = `${encabezado}\n${partes.join('\n\n')}\n\nexport default App;\n`;

mkdirSync(dirname(salida), { recursive: true });
writeFileSync(salida, contenido, 'utf8');
console.log(`Artefacto generado: ${salida}`);
console.log(`Hooks de React: ${[...hooks].sort().join(', ')}`);
console.log(`Iconos incluidos: ${[...iconos].sort().join(', ')}`);
