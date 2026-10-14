/**
 * Fotos de la presentación comercial de cada producto.
 *
 * Son la referencia visual para quien reconoce el envase pero no recuerda el
 * nombre. Cada archivo vive en public/productos/ y se toma de la ficha oficial
 * del producto en cibochem.com.co (la fuente queda anotada). Un producto sin
 * foto muestra su medalla de línea y los envases dibujados a partir de sus
 * presentaciones, así que la app nunca muestra una imagen que no sea la real.
 *
 * Forma de cada entrada:
 *   id: { archivo: 'id.webp', fuente: 'https://cibochem.com.co/ficha/…' }
 */
export const FOTOS_PRODUCTOS = {};

export const HAY_FOTOS = Object.keys(FOTOS_PRODUCTOS).length > 0;

/** Ruta relativa de la foto del producto, o null si aún no la tiene. */
export function fotoDeProducto(producto) {
  const foto = producto && FOTOS_PRODUCTOS[producto.id];
  return foto ? `./productos/${foto.archivo}` : null;
}
