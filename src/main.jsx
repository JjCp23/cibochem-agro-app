import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service worker: deja la app funcionando sin señal (ver public/sw.js). La
// ruta se resuelve contra la página y no contra la raíz del dominio, igual que
// el resto del build (base: './'), para que funcione también en un subdirectorio.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(new URL('sw.js', document.baseURI).href, { scope: './' }).catch(() => {});
  });
}
