import React, { useEffect, useState } from 'react';
import { CheckCircle2, Info, Star, AlertTriangle } from 'lucide-react';
import { COLORES } from '../../data/taxonomia.js';

const EVENTO_AVISO = 'cibo:aviso';

const ICONO_AVISO = {
  ok: { icono: CheckCircle2, color: '#9BE07A' },
  info: { icono: Info, color: '#9DD3F5' },
  favorito: { icono: Star, color: '#FFC86B' },
  error: { icono: AlertTriangle, color: '#FFB199' },
};

/**
 * Muestra un aviso breve en la parte baja de la pantalla. Se puede llamar
 * desde cualquier parte de la app sin pasar funciones de componente en
 * componente: viaja como evento del navegador.
 */
export function avisar(texto, tipo = 'ok') {
  try {
    window.dispatchEvent(
      new CustomEvent(EVENTO_AVISO, { detail: { texto, tipo, id: `${Date.now()}-${Math.random()}` } })
    );
  } catch {
    // Sin ventana (pruebas en Node): el aviso no es necesario
  }
}

/**
 * Comparte un texto con la hoja nativa del teléfono (WhatsApp, correo…). Donde
 * no existe, lo copia al portapapeles y lo avisa.
 */
export async function compartirTexto(titulo, texto) {
  try {
    if (navigator.share) {
      await navigator.share({ title: titulo, text: texto });
      return 'compartido';
    }
  } catch (e) {
    if (e?.name === 'AbortError') return 'cancelado';
  }
  try {
    await navigator.clipboard.writeText(texto);
    avisar('Copiado: pégalo en WhatsApp o en un mensaje', 'ok');
    return 'copiado';
  } catch {
    avisar('No se pudo copiar en este navegador', 'error');
    return 'error';
  }
}

/** Contenedor de avisos. Va una sola vez en la raíz de la app. */
export function Avisos() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const temporizadores = [];
    const alRecibir = (e) => {
      const aviso = e.detail;
      setLista((l) => [...l.slice(-2), aviso]);
      temporizadores.push(setTimeout(() => setLista((l) => l.filter((x) => x.id !== aviso.id)), 2600));
    };
    window.addEventListener(EVENTO_AVISO, alRecibir);
    return () => {
      window.removeEventListener(EVENTO_AVISO, alRecibir);
      temporizadores.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4"
    >
      {lista.map((a) => {
        const estilo = ICONO_AVISO[a.tipo] || ICONO_AVISO.ok;
        const Icono = estilo.icono;
        return (
          <div
            key={a.id}
            className="cc-entrada flex max-w-sm items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: COLORES.tinta, boxShadow: '0 10px 30px rgba(11,36,49,0.3)' }}
          >
            <Icono size={18} className="cc-pop shrink-0" style={{ color: estilo.color }} />
            <span>{a.texto}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Avisos;
