import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { escucharInstalacion } from './estado/memoria.js';
import { avisar } from './components/ui/Avisos.jsx';
import './index.css';

// Se escucha antes de pintar: el navegador puede ofrecer la instalación apenas
// carga la página.
escucharInstalacion();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Modo sin conexión: solo en el build publicado. En desarrollo el service
// worker guardaría versiones viejas y confundiría al editar.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const yaHabiaVersion = Boolean(navigator.serviceWorker.controller);
    navigator.serviceWorker
      .register('./sw.js')
      .then((registro) => {
        registro.addEventListener('updatefound', () => {
          const nuevo = registro.installing;
          nuevo?.addEventListener('statechange', () => {
            if (nuevo.state !== 'activated') return;
            avisar(
              yaHabiaVersion
                ? 'Actualización descargada: se verá al volver a abrir la app'
                : 'Lista para usar sin conexión',
              'ok'
            );
          });
        });
      })
      .catch(() => {
        // Sin service worker la app funciona igual, solo que necesita señal
      });
  });
}
