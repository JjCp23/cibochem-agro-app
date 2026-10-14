import React, { useEffect, useState } from 'react';
import { Download, RefreshCw, WifiOff, X } from 'lucide-react';
import { COLORES } from '../data/taxonomia.js';

/**
 * Avisos de la aplicación instalable (PWA), bajo el encabezado.
 *
 *  - Sin conexión: la app se usa en finca, donde la señal falla. Se avisa que
 *    sigue funcionando completa, para que nadie crea que se dañó.
 *  - Versión nueva: el service worker ya descargó una actualización. Al tocar
 *    se activa y se recarga la página.
 *  - Instalar: el navegador ofrece instalar la app en el teléfono. Se puede
 *    ocultar si no interesa.
 */
export function AvisosApp() {
  const [eventoInstalar, setEventoInstalar] = useState(null);
  const [descartado, setDescartado] = useState(false);
  const [sinConexion, setSinConexion] = useState(!navigator.onLine);
  const [nuevaVersion, setNuevaVersion] = useState(null);

  useEffect(() => {
    const alPedirInstalacion = (evento) => {
      // Se guarda el evento para mostrar el aviso propio en vez del del navegador
      evento.preventDefault();
      setEventoInstalar(evento);
    };
    const alInstalar = () => setEventoInstalar(null);
    const alConectar = () => setSinConexion(false);
    const alDesconectar = () => setSinConexion(true);

    window.addEventListener('beforeinstallprompt', alPedirInstalacion);
    window.addEventListener('appinstalled', alInstalar);
    window.addEventListener('online', alConectar);
    window.addEventListener('offline', alDesconectar);

    // Una versión nueva queda "instalada" pero en espera mientras haya una
    // pestaña con la anterior. Solo se avisa si ya había un service worker
    // controlando la página: en la primera visita no hay nada que actualizar.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registro) => {
          registro.addEventListener('updatefound', () => {
            const trabajador = registro.installing;
            trabajador?.addEventListener('statechange', () => {
              if (trabajador.state === 'installed' && navigator.serviceWorker.controller) {
                setNuevaVersion(trabajador);
              }
            });
          });
        })
        .catch(() => {});
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', alPedirInstalacion);
      window.removeEventListener('appinstalled', alInstalar);
      window.removeEventListener('online', alConectar);
      window.removeEventListener('offline', alDesconectar);
    };
  }, []);

  const instalar = async () => {
    if (!eventoInstalar) return;
    eventoInstalar.prompt();
    await eventoInstalar.userChoice;
    setEventoInstalar(null);
  };

  const actualizar = () => {
    // sw.js escucha este mensaje y se activa de inmediato (skipWaiting)
    nuevaVersion?.postMessage?.('activar-actualizacion');
    navigator.serviceWorker.controller?.postMessage('activar-actualizacion');
    window.location.reload();
  };

  return (
    <>
      {sinConexion && (
        <div
          className="flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-semibold"
          style={{ backgroundColor: COLORES.ambarClaro, color: '#8A5200' }}
          role="status"
        >
          <WifiOff size={13} />
          Sin conexión · la app funciona completa, todo el contenido está guardado
        </div>
      )}

      {nuevaVersion && (
        <button
          onClick={actualizar}
          className="flex w-full items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white"
          style={{ backgroundColor: COLORES.verde }}
        >
          <RefreshCw size={13} /> Hay una versión nueva · toca para actualizar
        </button>
      )}

      {eventoInstalar && !descartado && (
        <div
          className="mx-4 mt-4 flex items-center gap-3 rounded-2xl p-3"
          style={{ backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(11,36,49,0.1)' }}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: COLORES.azulClaro }}
          >
            <Download size={18} style={{ color: COLORES.azul }} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold" style={{ color: COLORES.tinta }}>
              Instalar en el teléfono
            </span>
            <span className="block text-xs" style={{ color: COLORES.textoSuave }}>
              Se abre a pantalla completa y funciona en finca sin señal
            </span>
          </span>
          <button
            onClick={instalar}
            className="shrink-0 rounded-lg px-3 py-2 text-xs font-bold text-white"
            style={{ backgroundColor: COLORES.azul }}
          >
            Instalar
          </button>
          <button
            onClick={() => setDescartado(true)}
            className="shrink-0 rounded-full p-1.5"
            aria-label="Ocultar aviso de instalación"
          >
            <X size={15} style={{ color: COLORES.textoSuave }} />
          </button>
        </div>
      )}
    </>
  );
}

export default AvisosApp;
