import React, { useState } from 'react';
import { ArrowLeft, Info, Share2, RotateCcw, Shield, Move, Eye, BadgeCheck, AlertTriangle, ChevronRight } from 'lucide-react';
import { COLORES, COLOR_CATEGORIA, FONDO_CATEGORIA, etiquetaDe } from '../data/taxonomia.js';
import { CULTIVOS } from '../data/cultivos.js';
import { nombreCultivo } from '../motores/index.js';
import { Segmentado, Hexagono } from './ui/Superficie.jsx';
import { IconoIlustrado, ICONO_CATEGORIA } from './ui/Iconos.jsx';
import { SelloGrupo, TextoMarcado } from './ui/Etiqueta.jsx';
import { compartirTexto } from './ui/Avisos.jsx';
import { iconoDeProducto } from '../data/iconosIlustrados.js';

// Qué rama del diagnóstico atiende cada tipo de problema del cultivo
export const RAMA_DE_PROBLEMA = { plagas: 'insectos', enfermedades: 'enfermedades', malezas: 'malezas' };

// Por qué un problema no tiene producto en el portafolio, dicho en una línea
const SIN_PRODUCTO = {
  bacteria:
    'Es una bacteria: los fungicidas no la controlan. Se maneja con material sano, desinfección de herramientas y eliminación de plantas enfermas.',
  virus:
    'Es un virus: no hay producto que lo cure. Se maneja controlando el insecto vector y sembrando material sano.',
  protista:
    'No es un hongo verdadero y los fungicidas del portafolio no lo controlan. Se maneja con rotación, drenaje y material sano.',
  hongo:
    'Ningún producto del portafolio está indicado para este problema. Se maneja con prácticas culturales y variedades tolerantes.',
  plaga:
    'Ningún producto del portafolio está indicado para esta plaga. Consulta con el técnico el manejo integrado (trampas, cebos, control biológico).',
};

/** Rejilla de cultivos con su ícono: el primer paso del diagnóstico por cultivo. */
export function SelectorCultivo({ onEscoger, compacto = false }) {
  return (
    <div className={compacto ? 'cc-sin-barra -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2' : 'cc-escalonado grid grid-cols-3 gap-2.5 sm:grid-cols-4'}>
      {CULTIVOS.map((c) => (
        <button
          key={c.id}
          onClick={() => onEscoger(c.id)}
          className={`cc-presionable flex flex-col items-center gap-1.5 rounded-2xl bg-white px-2 py-3 text-center ${
            compacto ? 'w-24 shrink-0' : ''
          }`}
          style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}
        >
          <IconoIlustrado nombre={c.id} tamano={compacto ? 34 : 40} />
          <span className="text-xs font-semibold leading-tight" style={{ color: COLORES.tinta }}>
            {nombreCultivo(c.id)}
          </span>
        </button>
      ))}
    </div>
  );
}

/** Lista de problemas de un tipo, con nombre científico y la categoría que atiende la app. */
function ListaProblemas({ items, tipo, color, onEscoger }) {
  const [abierto, setAbierto] = useState(null);
  return (
    <div className="cc-escalonado mt-4 space-y-2">
      {items.map((x) => {
        const sinProducto = x.objetivo === null;
        const cientifico = x.cientifico || x.agente;
        const clave = `${x.comun}-${cientifico}`;
        return (
          <div key={clave}>
            <button
              onClick={() => (sinProducto ? setAbierto(abierto === clave ? null : clave) : onEscoger(x))}
              className="cc-presionable flex w-full items-center gap-3 rounded-2xl border bg-white p-3 text-left"
              style={{ borderColor: COLORES.borde, opacity: sinProducto ? 0.75 : 1 }}
            >
              <IconoIlustrado nombre={x.objetivo || 'alerta'} tamano={34} className="shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold leading-snug" style={{ color: COLORES.tinta }}>
                  {x.comun}
                </span>
                {cientifico && (
                  <span className="block truncate text-xs italic" style={{ color: COLORES.textoSuave }}>
                    {cientifico}
                  </span>
                )}
                <span
                  className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                  style={{
                    backgroundColor: sinProducto ? COLORES.grisClaro : `${color}14`,
                    color: sinProducto ? COLORES.textoSuave : color,
                  }}
                >
                  {sinProducto ? 'Sin producto en el portafolio' : etiquetaDe(x.objetivo)}
                </span>
              </span>
              {!sinProducto && <ChevronRight size={18} className="shrink-0" style={{ color: COLORES.borde }} />}
            </button>
            {sinProducto && abierto === clave && (
              <p className="cc-entrada mx-2 mt-1 flex gap-2 rounded-xl p-3 text-xs leading-relaxed" style={{ backgroundColor: COLORES.grisClaro, color: COLORES.tinta }}>
                <Info size={14} className="mt-0.5 shrink-0" style={{ color: COLORES.textoSuave }} />
                {SIN_PRODUCTO[x.tipo] || SIN_PRODUCTO[tipo === 'plagas' ? 'plaga' : 'hongo']}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Segundo paso del diagnóstico por cultivo: qué se está viendo en el lote.
 * Cada problema lleva su nombre científico y la categoría con la que la app
 * busca producto; los que el portafolio no maneja lo dicen con su razón.
 */
export function ProblemasDeCultivo({ cultivoId, onEscoger, onVolver }) {
  const cultivo = CULTIVOS.find((c) => c.id === cultivoId);
  const [tipo, setTipo] = useState('plagas');
  if (!cultivo) return null;
  const color = { plagas: COLOR_CATEGORIA.Insecticida, enfermedades: COLOR_CATEGORIA.Fungicida, malezas: COLOR_CATEGORIA.Herbicida }[tipo];

  return (
    <div>
      <button onClick={onVolver} className="flex items-center gap-1.5 text-sm font-medium transition hover:opacity-70" style={{ color: COLORES.textoSuave }}>
        <ArrowLeft size={15} /> Inicio
      </button>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}>
          <IconoIlustrado nombre={cultivo.id} tamano={40} />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight" style={{ color: COLORES.tinta }}>
            {cultivo.nombre}
          </h2>
          <p className="text-xs" style={{ color: COLORES.textoSuave }}>
            ¿Qué estás viendo en el lote?
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Segmentado
          opciones={[
            { id: 'plagas', label: `Plagas (${cultivo.plagas.length})` },
            { id: 'enfermedades', label: `Enfermedades (${cultivo.enfermedades.length})` },
            { id: 'malezas', label: `Malezas (${cultivo.malezas.length})` },
          ]}
          valor={tipo}
          onCambio={setTipo}
        />
      </div>

      <ListaProblemas
        key={tipo}
        items={cultivo[tipo]}
        tipo={tipo}
        color={color}
        onEscoger={(x) => onEscoger({ ...x, tipoProblema: tipo })}
      />

      <p className="mt-4 text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
        Problemas principales del cultivo en Colombia, como referencia. Si no ves el tuyo, vuelve al inicio y busca por
        tipo de problema.
      </p>
    </div>
  );
}

/** Texto de la recomendación para compartir con el productor o el operario. */
export function textoRecomendacion(rec, contexto) {
  const p = rec.principal;
  const lineas = [
    'RECOMENDACIÓN TÉCNICA',
    [contexto.cultivo, contexto.problema].filter(Boolean).join(' · '),
    contexto.etapa ? `Etapa: ${contexto.etapa}` : null,
    '',
    `Producto: ${p.nombre} (${p.ia})`,
    p.sistema ? `Modo de acción: ${p.sistema} ${p.grupo} · ${p.familia}` : p.familia,
    rec.acompanante ? `Acompañar con: ${rec.acompanante.nombre} (multisitio, protege contra la resistencia)` : null,
    rec.siguiente ? `Siguiente aplicación: ${rec.siguiente.nombre} (${rec.siguiente.sistema} ${rec.siguiente.grupo}) para rotar el sitio de acción` : null,
    rec.movimiento ? `Cómo aplicarlo: ${rec.movimiento.implicacion}` : null,
    '',
    'Dosis, cultivo registrado y periodos de carencia y reentrada: según la etiqueta ICA vigente.',
    '— CiboCAMPO',
  ];
  return lineas.filter((l) => l !== null).join('\n').replace(/\*\*/g, '');
}

function FilaRecomendacion({ icono: Icono, titulo, children, color = COLORES.tinta }) {
  return (
    <div className="flex gap-3 border-t py-3" style={{ borderColor: COLORES.borde }}>
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${color}14` }}>
        <Icono size={14} style={{ color }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
          {titulo}
        </p>
        <div className="mt-0.5 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function BotonProducto({ producto, onAbrir }) {
  return (
    <button onClick={() => onAbrir(producto)} className="font-bold underline-offset-2 hover:underline" style={{ color: COLOR_CATEGORIA[producto.categoria] }}>
      {producto.nombre}
    </button>
  );
}

/**
 * La recomendación como la daría un agrónomo: qué aplicar, con qué
 * acompañarlo, qué sigue para rotar, cómo aplicarlo, qué se va a ver y qué
 * hay que confirmar en la etiqueta.
 */
export function TarjetaRecomendacion({ rec, contexto, onAbrirProducto }) {
  if (!rec) return null;
  const p = rec.principal;
  const color = COLOR_CATEGORIA[p.categoria];

  return (
    <div className="cc-entrada mt-4 overflow-hidden rounded-3xl bg-white" style={{ boxShadow: '0 4px 18px rgba(11,36,49,0.10)' }}>
      <div className="flex items-center gap-3 px-4 pb-3 pt-4" style={{ backgroundColor: FONDO_CATEGORIA[p.categoria] }}>
        <Hexagono icono={ICONO_CATEGORIA[p.categoria]} imagen={iconoDeProducto(p)} color={color} tamano={52} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
            Recomendación técnica
          </p>
          <button onClick={() => onAbrirProducto(p)} className="block text-left text-lg font-extrabold leading-tight" style={{ color: COLORES.tinta }}>
            {p.nombre}
          </button>
          <p className="truncate text-xs" style={{ color: COLORES.textoSuave }}>
            {p.ia}
          </p>
        </div>
      </div>

      <div className="px-4">
        <div className="flex flex-wrap items-center gap-1.5 py-3">
          {p.sistema && <SelloGrupo sistema={p.sistema} grupo={p.grupo} color={color} />}
          {[contexto.cultivo, contexto.problema, contexto.etapa].filter(Boolean).map((t) => (
            <span key={t} className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: COLORES.grisClaro, color: COLORES.tinta }}>
              {t}
            </span>
          ))}
        </div>

        <FilaRecomendacion icono={BadgeCheck} titulo="Por qué este" color={COLORES.verde}>
          {p.razones.join(' · ')}.
        </FilaRecomendacion>

        {rec.acompanante && (
          <FilaRecomendacion icono={Shield} titulo="Acompáñalo con un multisitio" color={COLORES.teal}>
            <BotonProducto producto={rec.acompanante} onAbrir={onAbrirProducto} /> en la misma mezcla. Su grupo es de
            riesgo alto: el multisitio protege la molécula de la resistencia.
          </FilaRecomendacion>
        )}

        {p.sistema && (
          <FilaRecomendacion icono={RotateCcw} titulo="Para la siguiente aplicación" color={COLORES.azul}>
            {rec.siguiente ? (
              <>
                <BotonProducto producto={rec.siguiente} onAbrir={onAbrirProducto} /> ({rec.siguiente.sistema} {rec.siguiente.grupo}): cambia de
                sitio de acción y controla el mismo problema.
              </>
            ) : (
              'No hay otro producto del portafolio para este caso con un sitio de acción distinto. Alterna con manejo cultural y no repitas el grupo en el ciclo.'
            )}
          </FilaRecomendacion>
        )}

        {rec.movimiento && (
          <FilaRecomendacion icono={Move} titulo={`Cómo aplicarlo · ${rec.movimiento.nombre}`} color={COLORES.ambar}>
            {rec.movimiento.implicacion}
          </FilaRecomendacion>
        )}

        {rec.enCampo && (
          <FilaRecomendacion icono={Eye} titulo="Qué vas a ver" color={COLORES.azul}>
            <TextoMarcado texto={rec.enCampo} />
          </FilaRecomendacion>
        )}

        <FilaRecomendacion icono={AlertTriangle} titulo="Antes de aplicar" color={COLORES.naranja}>
          {rec.fichaMencionaCultivo ? (
            <>
              Su ficha técnica lo menciona para {contexto.cultivo?.toLowerCase()}.{' '}
            </>
          ) : contexto.cultivo ? (
            <>Confirma que esté registrado para {contexto.cultivo.toLowerCase()}. </>
          ) : null}
          Dosis, carencia y reentrada: en la etiqueta ICA vigente.
        </FilaRecomendacion>
      </div>

      <div className="flex gap-2 border-t p-3" style={{ borderColor: COLORES.borde }}>
        <button
          onClick={() => compartirTexto('Recomendación técnica', textoRecomendacion(rec, contexto))}
          className="cc-presionable flex flex-1 items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-bold text-white"
          style={{ backgroundColor: COLORES.verde }}
        >
          <Share2 size={15} /> Compartir recomendación
        </button>
        <button
          onClick={() => onAbrirProducto(p)}
          className="cc-presionable rounded-2xl border px-4 py-2.5 text-sm font-semibold"
          style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
        >
          Ver ficha
        </button>
      </div>
    </div>
  );
}

export default SelectorCultivo;
