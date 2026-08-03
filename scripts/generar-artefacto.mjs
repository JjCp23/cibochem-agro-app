/**
 * Genera una versión de un solo archivo de la app, uniendo todos los módulos.
 *
 * Sirve para pegar la app en entornos que solo aceptan un archivo (por ejemplo
 * una vista previa de artefacto) sin tener que mantener dos copias del código.
 *
 * Uso:  node scripts/generar-artefacto.mjs [ruta-de-salida]
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Orden de dependencias: cada módulo solo usa lo declarado antes que él.
const MODULOS = [
  'src/data/productos.js',
  'src/data/taxonomia.js',
  'src/data/gruposMoA.js',
  'src/data/conocimiento.js',
  'src/lib/buscador.js',
  'src/lib/calculos.js',
  'src/components/ui/Etiqueta.jsx',
  'src/components/TarjetaProducto.jsx',
  'src/components/FichaProducto.jsx',
  'src/components/Diagnostico.jsx',
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
const partes = MODULOS.map((ruta) => {
  const bruto = readFileSync(resolve(raiz, ruta), 'utf8');

  // recolecta los iconos de lucide-react usados en todo el proyecto
  const m = bruto.match(/import\s*\{([^}]+)\}\s*from\s*'lucide-react'/);
  if (m) m[1].split(',').forEach((i) => iconos.add(i.trim()));

  return `// ${'═'.repeat(66)}\n// ${ruta}\n// ${'═'.repeat(66)}\n\n${aplanar(bruto)}`;
});

const encabezado = `/**
 * Cibochem Campo — versión de un solo archivo.
 *
 * ARCHIVO GENERADO AUTOMÁTICAMENTE. No lo edites a mano:
 * modifica los módulos en src/ y vuelve a correr
 *   node scripts/generar-artefacto.mjs
 */

import React, { useState, useMemo, useEffect } from 'react';
import { ${[...iconos].sort().join(', ')} } from 'lucide-react';
`;

const salida = process.argv[2] || resolve(raiz, 'dist-artefacto/CibochemCampo.jsx');
const contenido = `${encabezado}\n${partes.join('\n\n')}\n\nexport default App;\n`;

writeFileSync(salida, contenido, 'utf8');
console.log(`Artefacto generado: ${salida}`);
console.log(`Iconos incluidos: ${[...iconos].sort().join(', ')}`);
