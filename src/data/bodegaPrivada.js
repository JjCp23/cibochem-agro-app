/**
 * Inventario de la bodega con sus precios.
 *
 * Son datos del negocio: viven en src/data/privado/bodega.json, que no se sube
 * al repositorio (.gitignore). Si el archivo existe al construir, la app lo
 * trae; si no, el módulo Bodega aparece vacío y explica cómo cargarlo.
 */
let archivosDeBodega = {};
try {
  archivosDeBodega = import.meta.glob('./privado/bodega.json', { eager: true, import: 'default' });
} catch {
  // Fuera de Vite (pruebas en Node, artefacto de un solo archivo): sin datos
}

export const BODEGA_PRIVADA = Object.values(archivosDeBodega)[0] || null;
