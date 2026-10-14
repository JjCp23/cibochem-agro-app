/**
 * Fotos de la presentación comercial (empaque) de cada producto.
 *
 * Son la referencia visual para quien reconoce el envase pero no recuerda el
 * nombre. Cada archivo vive en public/productos/ en WebP de 480 px. Vienen de
 * la versión publicada de la app (empaques oficiales de Cibochem) o del
 * portafolio 2025 en PDF; las que se agreguen después deben salir de una fuente
 * oficial de Cibochem, anotada en `fuente`. Un producto sin foto
 * muestra su medalla de línea y los envases dibujados a partir de sus
 * presentaciones: la app nunca muestra una imagen que no sea la real.
 */
const ORIGEN_PUBLICADA = 'Versión publicada de CiboCAMPO (empaque oficial Cibochem)';
const ORIGEN_PORTAFOLIO = 'Portafolio de productos Cibochem 2025 (PDF)';

export const FOTOS_PRODUCTOS = {
  acarisil: { archivo: 'acarisil.webp', fuente: ORIGEN_PUBLICADA },
  acertado: { archivo: 'acertado.webp', fuente: ORIGEN_PUBLICADA },
  alga600: { archivo: 'alga600.webp', fuente: ORIGEN_PUBLICADA },
  algasoil: { archivo: 'algasoil.webp', fuente: ORIGEN_PUBLICADA },
  amino43: { archivo: 'amino43.webp', fuente: ORIGEN_PUBLICADA },
  amino80: { archivo: 'amino80.webp', fuente: `${ORIGEN_PORTAFOLIO}, página 8` },
  benevolo: { archivo: 'benevolo.webp', fuente: ORIGEN_PUBLICADA },
  benigno: { archivo: 'benigno.webp', fuente: ORIGEN_PUBLICADA },
  benoagro: { archivo: 'benoagro.webp', fuente: ORIGEN_PUBLICADA },
  brain: { archivo: 'brain.webp', fuente: ORIGEN_PUBLICADA },
  carbendazim: { archivo: 'carbendazim.webp', fuente: ORIGEN_PUBLICADA },
  cloropaz: { archivo: 'cloropaz.webp', fuente: ORIGEN_PUBLICADA },
  complex: { archivo: 'complex.webp', fuente: ORIGEN_PUBLICADA },
  concentrina: { archivo: 'concentrina.webp', fuente: ORIGEN_PUBLICADA },
  cyper: { archivo: 'cyper.webp', fuente: ORIGEN_PUBLICADA },
  difenex: { archivo: 'difenex.webp', fuente: ORIGEN_PUBLICADA },
  durab: { archivo: 'durab.webp', fuente: ORIGEN_PUBLICADA },
  egiamina: { archivo: 'egiamina.webp', fuente: ORIGEN_PUBLICADA },
  eseoese: { archivo: 'eseoese.webp', fuente: ORIGEN_PUBLICADA },
  experto: { archivo: 'experto.webp', fuente: ORIGEN_PUBLICADA },
  flutri: { archivo: 'flutri.webp', fuente: ORIGEN_PUBLICADA },
  forttex: { archivo: 'forttex.webp', fuente: ORIGEN_PUBLICADA },
  fruttox: { archivo: 'fruttox.webp', fuente: ORIGEN_PUBLICADA },
  fulvox: { archivo: 'fulvox.webp', fuente: ORIGEN_PUBLICADA },
  furioso: { archivo: 'furioso.webp', fuente: ORIGEN_PUBLICADA },
  ghaza: { archivo: 'ghaza.webp', fuente: ORIGEN_PUBLICADA },
  gibox: { archivo: 'gibox.webp', fuente: ORIGEN_PUBLICADA },
  grosso: { archivo: 'grosso.webp', fuente: ORIGEN_PUBLICADA },
  herbimex: { archivo: 'herbimex.webp', fuente: ORIGEN_PUBLICADA },
  herbimexpro: { archivo: 'herbimexpro.webp', fuente: ORIGEN_PUBLICADA },
  humox: { archivo: 'humox.webp', fuente: ORIGEN_PUBLICADA },
  insectoprid: { archivo: 'insectoprid.webp', fuente: ORIGEN_PUBLICADA },
  kanero: { archivo: 'kanero.webp', fuente: ORIGEN_PUBLICADA },
  lafirma: { archivo: 'lafirma.webp', fuente: ORIGEN_PUBLICADA },
  lambdox: { archivo: 'lambdox.webp', fuente: ORIGEN_PUBLICADA },
  leili2000: { archivo: 'leili2000.webp', fuente: ORIGEN_PUBLICADA },
  limpion: { archivo: 'limpion.webp', fuente: ORIGEN_PUBLICADA },
  limpionpro: { archivo: 'limpionpro.webp', fuente: ORIGEN_PUBLICADA },
  manconex: { archivo: 'manconex.webp', fuente: ORIGEN_PUBLICADA },
  mepex: { archivo: 'mepex.webp', fuente: `${ORIGEN_PORTAFOLIO}, página 17` },
  mesotriol: { archivo: 'mesotriol.webp', fuente: ORIGEN_PUBLICADA },
  metomil216: { archivo: 'metomil216.webp', fuente: ORIGEN_PUBLICADA },
  metomil40: { archivo: 'metomil40.webp', fuente: ORIGEN_PUBLICADA },
  metsulfex: { archivo: 'metsulfex.webp', fuente: ORIGEN_PUBLICADA },
  multa: { archivo: 'multa.webp', fuente: ORIGEN_PUBLICADA },
  multapro: { archivo: 'multapro.webp', fuente: ORIGEN_PUBLICADA },
  mutantex: { archivo: 'mutantex.webp', fuente: ORIGEN_PUBLICADA },
  oromectin: { archivo: 'oromectin.webp', fuente: ORIGEN_PUBLICADA },
  pastrol: { archivo: 'pastrol.webp', fuente: ORIGEN_PUBLICADA },
  pasturex: { archivo: 'pasturex.webp', fuente: ORIGEN_PUBLICADA },
  pasturexpro: { archivo: 'pasturexpro.webp', fuente: ORIGEN_PUBLICADA },
  powerplus: { archivo: 'powerplus.webp', fuente: ORIGEN_PUBLICADA },
  promax: { archivo: 'promax.webp', fuente: ORIGEN_PUBLICADA },
  quinclorac: { archivo: 'quinclorac.webp', fuente: ORIGEN_PUBLICADA },
  ridder: { archivo: 'ridder.webp', fuente: ORIGEN_PUBLICADA },
  robendazim: { archivo: 'robendazim.webp', fuente: ORIGEN_PUBLICADA },
  sakarin: { archivo: 'sakarin.webp', fuente: ORIGEN_PUBLICADA },
  stoppro: { archivo: 'stoppro.webp', fuente: ORIGEN_PUBLICADA },
  stopwest: { archivo: 'stopwest.webp', fuente: ORIGEN_PUBLICADA },
  tebunex: { archivo: 'tebunex.webp', fuente: ORIGEN_PUBLICADA },
  tenaz: { archivo: 'tenaz.webp', fuente: ORIGEN_PUBLICADA },
  tioxam: { archivo: 'tioxam.webp', fuente: ORIGEN_PUBLICADA },
  triasol: { archivo: 'triasol.webp', fuente: ORIGEN_PUBLICADA },
  trosador: { archivo: 'trosador.webp', fuente: ORIGEN_PUBLICADA },
  undazol: { archivo: 'undazol.webp', fuente: ORIGEN_PUBLICADA },
  vipper: { archivo: 'vipper.webp', fuente: ORIGEN_PUBLICADA },
};

export const HAY_FOTOS = Object.keys(FOTOS_PRODUCTOS).length > 0;

/** Ruta relativa de la foto del producto, o null si aún no la tiene. */
export function fotoDeProducto(producto) {
  const foto = producto && FOTOS_PRODUCTOS[producto.id];
  return foto ? `./productos/${foto.archivo}` : null;
}
