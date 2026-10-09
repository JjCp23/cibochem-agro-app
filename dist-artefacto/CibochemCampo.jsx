/**
 * Cibochem Campo — versión de un solo archivo.
 *
 * ARCHIVO GENERADO AUTOMÁTICAMENTE. No lo edites a mano:
 * modifica los módulos en src/ y vuelve a correr
 *   node scripts/generar-artefacto.mjs
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, AlertTriangle, ArrowLeft, Ban, Beaker, Bug, Calculator, Check, ChevronDown, Compass, Droplets, FileText, Gauge, GraduationCap, Info, LayoutList, Leaf, Lightbulb, ListOrdered, Minus, Move, Plus, RotateCcw, Ruler, Search, SearchX, ShieldAlert, ShieldCheck, SprayCan, Sprout, Stethoscope, Target, Trash2, X } from 'lucide-react';

// ══════════════════════════════════════════════════════════════════
// src/data/productos.js
// ══════════════════════════════════════════════════════════════════

/**
 * Base de datos del portafolio Cibochem 2026.
 *
 * Cada producto lleva el etiquetado agronómico que usa el motor de búsqueda:
 *  - sistema/grupo : clasificación de modo de acción (IRAC / HRAC / FRAC)
 *  - objetivos     : qué controla, en las categorías definidas en taxonomia.js
 *  - escenarios    : dónde/en qué contexto se usa
 *  - momento       : cuándo se aplica dentro del ciclo
 *  - movimiento    : cómo se desplaza dentro de la planta
 *  - riesgo        : riesgo de generar resistencia (Alto / Medio / Bajo / Nulo)
 *
 * IMPORTANTE: las dosis y los cultivos registrados NO se incluyen a propósito.
 * Deben leerse siempre de la etiqueta ICA vigente de cada producto.
 */

const PRODUCTOS = [
  // ══════════════════════════ INSECTICIDAS ══════════════════════════
  {
    id: 'eseoese',
    nombre: 'ESEOESE 300 WG',
    ia: 'Indoxacarb 300 g/Kg',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '22A',
    familia: 'Oxadiazinas',
    mecanismo: 'Bloquea el canal de sodio del axón en un sitio distinto al de los piretroides, deteniendo la conducción del impulso nervioso.',
    sintoma: 'Cesa la alimentación rápido; parálisis en pocas horas.',
    movimiento: 'Contacto e ingestión',
    objetivos: ['masticadores', 'lepidopteros'],
    escenarios: ['general'],
    momento: ['larvas-activas'],
    riesgo: 'Bajo',
    beneficos: 'Moderada',
    nota: 'Sin resistencia cruzada con piretroides: buena pieza de rotación cuando el grupo 3A ya falla.',
    presentaciones: ['150 g', '1 Kg'],
    estado: 'Pronto',
  },
  {
    id: 'forxam',
    nombre: 'FORXAM',
    ia: 'Lambdacihalotrina 106 g/L + Thiametoxam 141 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '3A + 4A',
    familia: 'Piretroide + Neonicotinoide',
    mecanismo: 'Doble sitio: canal de sodio del axón y receptor nicotínico de acetilcolina.',
    sintoma: 'Choque inmediato con residualidad sistémica posterior.',
    movimiento: 'Sistémico + contacto',
    objetivos: ['chupadores', 'masticadores', 'raspadores'],
    escenarios: ['general'],
    momento: ['poblacion-establecida'],
    riesgo: 'Medio',
    beneficos: 'Baja',
    nota: 'Amplio espectro para situaciones donde conviven masticadores y chupadores.',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Pronto',
  },
  {
    id: 'metelon',
    nombre: 'METELON 800 WG',
    ia: 'Dinotefuran 800 g/Kg',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '4A',
    familia: 'Neonicotinoides',
    mecanismo: 'Agonista permanente del receptor nicotínico de acetilcolina.',
    sintoma: 'El insecto deja de alimentarse rápido; parálisis en 24-48 h.',
    movimiento: 'Sistémico (xilema)',
    objetivos: ['chupadores', 'masticadores', 'minadores', 'barrenadores'],
    escenarios: ['general'],
    momento: ['poblacion-establecida', 'preventivo-vector'],
    riesgo: 'Medio',
    beneficos: 'Baja',
    nota: 'Sistémico de amplio espectro, útil cuando la plaga está protegida dentro del tejido.',
    presentaciones: ['40 g', '1 Kg'],
    estado: 'Pronto',
  },
  {
    id: 'zutano',
    nombre: 'ZUTANO 50 EC',
    ia: 'Lufenuron 50 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '15',
    familia: 'Benzoilureas',
    mecanismo: 'Bloquea la quitín-sintasa: la larva no puede formar cutícula nueva y muere al mudar.',
    sintoma: 'Efecto retardado, visible en la siguiente muda.',
    movimiento: 'Ingestión',
    objetivos: ['lepidopteros', 'huevos-ninfas'],
    escenarios: ['general'],
    momento: ['larvas-tempranas', 'preventivo-poblacional'],
    riesgo: 'Bajo',
    beneficos: 'Alta',
    nota: 'Solo actúa sobre larvas: aplícalo temprano, no sirve para adultos ni para una explosión ya establecida.',
    presentaciones: ['1 L'],
    estado: 'Pronto',
  },
  {
    id: 'acelerex',
    nombre: 'ACELEREX 200 SC',
    ia: 'Clorantraniliprol 200 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '28',
    familia: 'Diamidas antranílicas',
    mecanismo: 'Activa el receptor de rianodina liberando el calcio muscular sin control.',
    sintoma: 'Parálisis muscular casi inmediata; deja de comer en horas.',
    movimiento: 'Ingestión + translaminar',
    objetivos: ['lepidopteros', 'masticadores', 'coleopteros'],
    escenarios: ['general'],
    momento: ['larvas-tempranas', 'larvas-activas'],
    riesgo: 'Bajo',
    beneficos: 'Alta',
    nota: 'Muy selectivo con polinizadores y benéficos: pieza clave en programas MIPE.',
    presentaciones: ['100 cc', '200 cc', '1 L'],
    estado: 'Pronto',
  },
  {
    id: 'cyper',
    nombre: 'CYPER West 200 EC',
    ia: 'Cipermetrina 200 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '3A',
    familia: 'Piretroides',
    mecanismo: 'Mantiene abierto el canal de sodio del axón, generando descargas nerviosas continuas.',
    sintoma: 'Knock-down en minutos.',
    movimiento: 'Contacto e ingestión',
    objetivos: ['masticadores', 'trozadores', 'lepidopteros'],
    escenarios: ['general'],
    momento: ['poblacion-establecida'],
    riesgo: 'Alto',
    beneficos: 'Baja',
    nota: 'Bajo costo y choque inmediato; es el piretroide base de muchos programas económicos.',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
    todera: true,
  },
  {
    id: 'metomil40',
    nombre: 'METOMIL 40 SP',
    ia: 'Methomyl 400 g/Kg',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '1A',
    familia: 'Carbamatos',
    mecanismo: 'Inhibe la acetilcolinesterasa: la acetilcolina se acumula y sobreestimula la neurona.',
    sintoma: 'Temblores en minutos, parálisis en 1-2 horas.',
    movimiento: 'Contacto e ingestión',
    objetivos: ['masticadores', 'trozadores', 'huevos-ninfas'],
    escenarios: ['general'],
    momento: ['poblacion-establecida'],
    riesgo: 'Alto',
    beneficos: 'Baja',
    nota: 'Tiene efecto ovicida. Resistencia cruzada con organofosforados.',
    presentaciones: ['135 g', '1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'metomil216',
    nombre: 'METOMIL 216 SL',
    ia: 'Methomyl 216 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '1A',
    familia: 'Carbamatos',
    mecanismo: 'Inhibe la acetilcolinesterasa en la sinapsis nerviosa.',
    sintoma: 'Choque rápido con efecto ovicida.',
    movimiento: 'Contacto e ingestión',
    objetivos: ['masticadores', 'trozadores', 'huevos-ninfas'],
    escenarios: ['general'],
    momento: ['poblacion-establecida'],
    riesgo: 'Alto',
    beneficos: 'Baja',
    nota: 'Formulación líquida del mismo activo que METOMIL 40 SP.',
    presentaciones: ['1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'tioxam',
    nombre: 'TIOXAM 250 WG',
    ia: 'Thiametoxam 250 g/Kg',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '4A',
    familia: 'Neonicotinoides',
    mecanismo: 'Agonista permanente del receptor nicotínico de acetilcolina.',
    sintoma: 'Corta la alimentación rápido (efecto antifeeding).',
    movimiento: 'Sistémico (xilema)',
    objetivos: ['chupadores', 'raspadores', 'preventivo-vector'],
    escenarios: ['general', 'semilla-suelo'],
    momento: ['preventivo-vector', 'poblacion-establecida', 'siembra'],
    riesgo: 'Medio',
    beneficos: 'Baja',
    nota: 'Alta sistemia: protege tejido nuevo y sirve en tratamiento a semilla o suelo. Clave para vectores de virus.',
    presentaciones: ['100 g', '1 Kg'],
    estado: 'Disponible',
    todera: true,
  },
  {
    id: 'insectoprid',
    nombre: 'INSECTOPRID 350 SC',
    ia: 'Imidacloprid 350 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '4A',
    familia: 'Neonicotinoides',
    mecanismo: 'Activa de forma irreversible el receptor nicotínico postsináptico.',
    sintoma: 'Parálisis progresiva en 24-48 h.',
    movimiento: 'Sistémico (xilema)',
    objetivos: ['chupadores', 'raspadores', 'masticadores'],
    escenarios: ['general', 'semilla-suelo'],
    momento: ['preventivo-vector', 'poblacion-establecida'],
    riesgo: 'Medio',
    beneficos: 'Baja',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
  },
  {
    id: 'concentrina',
    nombre: 'CONCENTRINA 100 EC',
    ia: 'Bifentrina 100 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '3A',
    familia: 'Piretroides',
    mecanismo: 'Modula el canal de sodio del axón provocando despolarización continua.',
    sintoma: 'Acción de choque sobre adultos.',
    movimiento: 'Contacto e ingestión',
    objetivos: ['masticadores', 'chupadores', 'trozadores', 'acaros'],
    escenarios: ['general'],
    momento: ['poblacion-establecida'],
    riesgo: 'Alto',
    beneficos: 'Baja',
    presentaciones: ['250 cc', '1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'oromectin',
    nombre: 'ROMECTIN 1.8 EC',
    ia: 'Abamectina 18 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '6',
    familia: 'Avermectinas',
    mecanismo: 'Abre los canales de cloro dependientes de glutamato: hiperpolariza la neurona.',
    sintoma: 'Parálisis flácida; deja de comer en horas y muere en 2-4 días.',
    movimiento: 'Translaminar',
    objetivos: ['acaros', 'trips', 'minadores'],
    escenarios: ['general'],
    momento: ['poblacion-establecida'],
    riesgo: 'Medio',
    beneficos: 'Moderada',
    nota: 'Penetra la hoja y forma un reservorio interno: alcanza minadores y ácaros del envés.',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
  },
  {
    id: 'lambdox',
    nombre: 'LAMBDOX 50 EC',
    ia: 'Lambdacihalotrina 50 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '3A',
    familia: 'Piretroides',
    mecanismo: 'Mantiene abierto el canal de sodio del axón.',
    sintoma: 'Knock-down rápido.',
    movimiento: 'Contacto e ingestión',
    objetivos: ['masticadores', 'minadores'],
    escenarios: ['general'],
    momento: ['poblacion-establecida'],
    riesgo: 'Alto',
    beneficos: 'Baja',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
  },
  {
    id: 'ridder',
    nombre: 'RIDDER 328 SC',
    ia: 'Abamectina 28 g/L + Imidacloprid 300 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '6 + 4A',
    familia: 'Avermectina + Neonicotinoide',
    mecanismo: 'Combina apertura de canales de cloro (parálisis flácida) con activación permanente del receptor nicotínico.',
    sintoma: 'Control simultáneo de ácaros y chupadores, con residualidad larga.',
    movimiento: 'Translaminar + sistémico',
    objetivos: ['acaros', 'chupadores', 'minadores', 'trips'],
    escenarios: ['general'],
    momento: ['poblacion-establecida', 'preventivo-vector'],
    riesgo: 'Medio',
    beneficos: 'Baja',
    nota: 'El más versátil de la línea: resuelve complejos de ácaros + chupadores en una sola aplicación.',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
    todera: true,
  },
  {
    id: 'multa',
    nombre: 'MULTA 50 SG',
    ia: 'Emamectin benzoato 50 g/Kg',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '6',
    familia: 'Avermectinas',
    mecanismo: 'Abre canales de cloro glutamato-dependientes en neuronas y músculo.',
    sintoma: 'Contundente sobre cogolleros y comedores de follaje: la larva deja de alimentarse casi de inmediato.',
    movimiento: 'Translaminar',
    objetivos: ['lepidopteros', 'masticadores', 'cogolleros'],
    escenarios: ['general'],
    momento: ['larvas-tempranas', 'larvas-activas'],
    riesgo: 'Medio',
    beneficos: 'Moderada',
    nota: 'Muy usado contra cogolleros por su capacidad de alcanzar la larva dentro del cogollo.',
    presentaciones: ['100 g', '500 g'],
    estado: 'Disponible',
  },
  {
    id: 'multapro',
    nombre: 'MULTA PRO 290 SG',
    ia: 'Emamectin benzoato 50 g/Kg + Acetamiprid 240 g/Kg',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '6 + 4A',
    familia: 'Avermectina + Neonicotinoide',
    mecanismo: 'Parálisis flácida por canales de cloro más sobreestimulación del receptor nicotínico.',
    sintoma: 'Cubre larvas y chupadores en el mismo tanque.',
    movimiento: 'Translaminar + sistémico',
    objetivos: ['lepidopteros', 'chupadores', 'minadores', 'cogolleros'],
    escenarios: ['general'],
    momento: ['larvas-activas', 'poblacion-establecida'],
    riesgo: 'Medio',
    beneficos: 'Baja',
    nota: 'Opción para cultivos con complejo mixto de plagas en la misma ventana.',
    presentaciones: ['200 g', '1 Kg'],
    estado: 'Nuevo',
    todera: true,
  },
  {
    id: 'furioso',
    nombre: 'FURIOSO 328 SC',
    ia: 'Imidacloprid 300 g/L + Abamectina 28 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '4A + 6',
    familia: 'Neonicotinoide + Avermectina',
    mecanismo: 'Misma combinación de RÍDDER en distinta proporción de formulación.',
    sintoma: 'Control de ácaros, trips y chupadores con efecto residual largo.',
    movimiento: 'Sistémico + translaminar',
    objetivos: ['acaros', 'trips', 'minadores', 'chupadores'],
    escenarios: ['general'],
    momento: ['poblacion-establecida'],
    riesgo: 'Medio',
    beneficos: 'Baja',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
  },
  {
    id: 'acarisil',
    nombre: 'ACARISIL 100 EC',
    ia: 'Pyriproxifen 100 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '7C',
    familia: 'Mímicos de hormona juvenil',
    mecanismo: 'Mantiene niveles altos de hormona juvenil e impide completar la metamorfosis a adulto fértil.',
    sintoma: 'No mata al instante: los huevos no eclosionan y las ninfas mueren al mudar.',
    movimiento: 'Contacto e ingestión',
    objetivos: ['huevos-ninfas', 'chupadores', 'trips'],
    escenarios: ['general'],
    momento: ['preventivo-poblacional', 'larvas-tempranas'],
    riesgo: 'Bajo',
    beneficos: 'Alta',
    nota: 'Rompe el ciclo poblacional de mosca blanca. Alta selectividad con abejas.',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
  },
  {
    id: 'trosador',
    nombre: 'TROSADOR 120 SC',
    ia: 'Spinosad 120 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '5',
    familia: 'Spinosinas',
    mecanismo: 'Hiperactiva el receptor nicotínico en un sitio alostérico distinto al de los neonicotinoides y altera la vía GABA.',
    sintoma: 'Parálisis en horas; molécula de origen fermentativo.',
    movimiento: 'Ingestión + translaminar',
    objetivos: ['trips', 'minadores', 'lepidopteros'],
    escenarios: ['general'],
    momento: ['larvas-activas', 'poblacion-establecida'],
    riesgo: 'Bajo',
    beneficos: 'Alta',
    nota: 'Origen natural y alta selectividad: encaja en programas con control biológico y en ventanas de floración.',
    presentaciones: ['250 cc'],
    estado: 'Disponible',
  },
  {
    id: 'evasor',
    nombre: 'EVASOR 60 SC',
    ia: 'Spinetoram 60 g/L',
    categoria: 'Insecticida',
    sistema: 'IRAC',
    grupo: '5',
    familia: 'Spinosinas',
    mecanismo: 'Segunda generación de spinosinas: mayor potencia y residualidad sobre el mismo sitio de acción.',
    sintoma: 'Derivado de un proceso natural; eficaz sobre lepidópteros, caracha o Prodiplosis, trips y minadores, con bajo impacto sobre fauna benéfica.',
    movimiento: 'Ingestión + translaminar',
    objetivos: ['trips', 'lepidopteros', 'minadores'],
    escenarios: ['general'],
    momento: ['larvas-activas', 'poblacion-establecida'],
    riesgo: 'Bajo',
    beneficos: 'Alta',
    presentaciones: ['100 cc', '500 cc', '1 L'],
    estado: 'Pronto',
  },

  // ══════════════════════════ HERBICIDAS ══════════════════════════
  {
    id: 'triasol',
    nombre: 'TRIASOL 80 WP',
    ia: 'Atrazina 800 g/Kg',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '5',
    familia: 'Triazinas',
    mecanismo: 'Bloquea la proteína D1 del fotosistema II: se acumulan radicales libres que oxidan las membranas.',
    sintoma: 'Clorosis internerval y luego necrosis "quemada" en días.',
    movimiento: 'Absorción radicular, residual de suelo',
    objetivos: ['hoja-ancha', 'gramineas'],
    escenarios: ['maiz'],
    momento: ['preemergente', 'postemergente-temprana'],
    riesgo: 'Medio',
    presentaciones: ['1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'pastrol',
    nombre: 'PASTROL 240 EC',
    ia: 'Clethodim 240 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '1',
    familia: 'Inhibidores de ACCasa',
    mecanismo: 'Bloquea la Acetil-CoA carboxilasa, primer paso de la síntesis de lípidos de membrana.',
    sintoma: 'Necrosis del meristemo apical: "se sale el cogollo" de la gramínea.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['gramineas'],
    escenarios: ['cultivo-hoja-ancha'],
    momento: ['postemergente'],
    riesgo: 'Medio',
    nota: 'Graminicida selectivo: se puede aplicar sobre cultivos de hoja ancha sin dañarlos.',
    presentaciones: ['250 cc', '1 L', '4 L'],
    estado: 'Disponible',
  },
  {
    id: 'ghaza',
    nombre: 'GHAZA 200 SL',
    ia: 'Glufosinato de amonio 200 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '10',
    familia: 'Inhibidores de glutamina sintetasa',
    mecanismo: 'Bloquea la glutamina sintetasa: el amonio se acumula a niveles tóxicos y rompe las membranas.',
    sintoma: 'Secado tipo "quemado" en 2-4 días.',
    movimiento: 'Contacto',
    objetivos: ['hoja-ancha', 'gramineas', 'no-selectivo'],
    escenarios: ['barbecho', 'calles-cultivo'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'egiamina',
    nombre: 'ECIAMINA 48 SL',
    ia: '2,4-D 480 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Auxinas sintéticas',
    mecanismo: 'Mimetiza la auxina natural y desregula el crecimiento: epinastia y colapso del floema.',
    sintoma: 'Tallos y hojas retorcidos; muerte en 1-4 semanas.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['hoja-ancha'],
    escenarios: ['potreros', 'maiz', 'cana'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    nota: 'Selectivo a gramíneas: no afecta pastos ni cultivos de hoja angosta.',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'quinclorac',
    nombre: 'QUINCLORAC 250 HXS',
    ia: 'Quinclorac 250 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Ácidos quinolín-carboxílicos',
    mecanismo: 'Acción tipo auxínica sobre hoja ancha; en gramíneas induce acumulación de cianuro que detiene el crecimiento.',
    sintoma: 'Epinastia en hoja ancha y detención del crecimiento en gramíneas.',
    movimiento: 'Sistémico',
    objetivos: ['hoja-ancha', 'gramineas', 'ciperaceas'],
    escenarios: ['arroz'],
    momento: ['preemergente', 'postemergente'],
    riesgo: 'Medio',
    presentaciones: ['1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'lafirma',
    nombre: 'LA FIRMA 480 EC',
    ia: 'Triclopyr 480 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Auxinas sintéticas',
    mecanismo: 'Auxina sintética con afinidad especial por especies leñosas.',
    sintoma: 'Retorcimiento y muerte del tejido vascular de arbustivas.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['hoja-ancha', 'lenosas'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'acertado',
    nombre: 'ACERTADO 750 WG',
    ia: 'Halosulfuron methyl 750 g/Kg',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '2',
    familia: 'Sulfonilureas',
    mecanismo: 'Bloquea la ALS/AHAS, deteniendo la síntesis de aminoácidos ramificados.',
    sintoma: 'Detención del crecimiento en días; muerte lenta en 1-3 semanas.',
    movimiento: 'Sistémico (xilema y floema)',
    objetivos: ['hoja-ancha', 'ciperaceas'],
    escenarios: ['potreros', 'cana'],
    momento: ['postemergente'],
    riesgo: 'Alto',
    nota: 'Muy potente en dosis de gramos por hectárea. Alto riesgo de resistencia: no repetir el grupo 2 en el mismo lote.',
    presentaciones: ['15 g', '150 g', '600 g'],
    estado: 'Disponible',
  },
  {
    id: 'toconex',
    nombre: 'TOCONEX 304 SL',
    ia: '2,4-D 240 g/L + Picloram 64 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Auxinas sintéticas',
    mecanismo: 'Dos auxinas sintéticas complementarias: el picloram aporta residualidad y acción sobre leñosas.',
    sintoma: 'Epinastia severa y muerte de rebrotes desde la raíz.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['hoja-ancha', 'lenosas'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    nota: 'El combo estándar de renovación de potreros.',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Pronto',
    todera: true,
  },
  {
    id: 'reddi',
    nombre: 'REDDI 480 SL',
    ia: 'Glifosato 480 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '9',
    familia: 'Inhibidores de EPSPS',
    mecanismo: 'Bloquea la EPSP sintasa de la ruta del shikimato: sin aminoácidos aromáticos no hay proteínas nuevas.',
    sintoma: 'Amarillamiento progresivo en 1-3 semanas; mata también raíces y rizomas.',
    movimiento: 'Sistémico (floema, bidireccional)',
    objetivos: ['hoja-ancha', 'gramineas', 'no-selectivo', 'perennes'],
    escenarios: ['barbecho', 'calles-cultivo'],
    momento: ['postemergente', 'preparacion-lote'],
    riesgo: 'Alto',
    nota: 'Llega a rizomas y estolones: es la herramienta para perennes de difícil manejo.',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Pronto',
    todera: true,
  },
  {
    id: 'limpion',
    nombre: 'LIMPION 200 SL',
    ia: 'Glufosinato de amonio 200 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '10',
    familia: 'Inhibidores de glutamina sintetasa',
    mecanismo: 'Acumulación tóxica de amonio que colapsa membranas y cloroplastos.',
    sintoma: 'Secado rápido en 2-4 días.',
    movimiento: 'Contacto',
    objetivos: ['hoja-ancha', 'gramineas', 'no-selectivo'],
    escenarios: ['barbecho', 'calles-cultivo'],
    momento: ['postemergente-temprana'],
    riesgo: 'Bajo',
    nota: 'La alternativa de rotación al glifosato cuando hay malezas resistentes al grupo 9.',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
    todera: true,
  },
  {
    id: 'limpionpro',
    nombre: 'LIMPION PRO 800 SG',
    ia: 'Glufosinato de amonio 800 g/Kg',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '10',
    familia: 'Inhibidores de glutamina sintetasa',
    mecanismo: 'Mismo mecanismo que LIMPION en formulación sólida concentrada.',
    sintoma: 'Secado rápido del tejido tratado.',
    movimiento: 'Contacto',
    objetivos: ['hoja-ancha', 'gramineas', 'no-selectivo'],
    escenarios: ['barbecho', 'calles-cultivo'],
    momento: ['postemergente-temprana'],
    riesgo: 'Bajo',
    presentaciones: ['50 g', '200 g', '1 Kg', '5 Kg'],
    estado: 'Nuevo',
  },
  {
    id: 'metsulfex',
    nombre: 'METSULFEX 60 WG',
    ia: 'Metsulfuron methyl 60%',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '2',
    familia: 'Sulfonilureas',
    mecanismo: 'Bloquea la ALS/AHAS deteniendo la síntesis de valina, leucina e isoleucina.',
    sintoma: 'Cese del crecimiento y clorosis progresiva.',
    movimiento: 'Sistémico (xilema y floema)',
    objetivos: ['hoja-ancha', 'helechos', 'lenosas'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Alto',
    nota: 'Especialmente eficaz sobre helechos y morticos en potreros.',
    presentaciones: ['20 g', '100 g', '1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'stopwest',
    nombre: 'STOP West 48 SL',
    ia: 'Glifosato 480 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '9',
    familia: 'Inhibidores de EPSPS',
    mecanismo: 'Inhibe la EPSP sintasa de la ruta del shikimato.',
    sintoma: 'Amarillamiento lento y muerte total incluyendo órganos subterráneos.',
    movimiento: 'Sistémico (floema, bidireccional)',
    objetivos: ['hoja-ancha', 'gramineas', 'no-selectivo', 'perennes'],
    escenarios: ['barbecho', 'calles-cultivo'],
    momento: ['postemergente', 'preparacion-lote'],
    riesgo: 'Alto',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'stoppro',
    nombre: 'STOP West PRO 757 SG',
    ia: 'Glifosato 757 g/Kg',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '9',
    familia: 'Inhibidores de EPSPS',
    mecanismo: 'Inhibe la EPSP sintasa; formulación sólida de alta concentración.',
    sintoma: 'Amarillamiento progresivo y muerte total de la planta.',
    movimiento: 'Sistémico (floema, bidireccional)',
    objetivos: ['hoja-ancha', 'gramineas', 'no-selectivo', 'perennes'],
    escenarios: ['barbecho', 'calles-cultivo'],
    momento: ['postemergente', 'preparacion-lote'],
    riesgo: 'Alto',
    nota: 'Formulación granulada: menor costo de transporte y almacenamiento por hectárea tratada.',
    presentaciones: ['50 g', '1 Kg', '5 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'pasturex',
    nombre: 'PASTUREX 240 SL',
    ia: 'Picloram 240 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Auxinas sintéticas',
    mecanismo: 'Auxina sintética de alta residualidad en suelo y fuerte acción sobre semileñosas.',
    sintoma: 'Epinastia y muerte progresiva desde el rebrote.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['hoja-ancha', 'lenosas'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    nota: 'Residualidad alta: cuidado con cultivos sensibles en rotación posterior.',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'pasturexpro',
    nombre: 'PASTUREX PRO 400 SG',
    ia: 'Picloram 400 g/Kg',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Auxinas sintéticas',
    mecanismo: 'Mismo mecanismo auxínico en formulación sólida concentrada.',
    sintoma: 'Control de herbáceas y semileñosas de potrero.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['hoja-ancha', 'lenosas'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    presentaciones: ['1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'herbimex',
    nombre: 'HERBIMEX 720 SL',
    ia: '2,4-D Dimethylamine sal 720 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Auxinas sintéticas',
    mecanismo: 'Auxina sintética que desregula el crecimiento de la hoja ancha.',
    sintoma: 'Epinastia y colapso vascular.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['hoja-ancha'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    nota: 'Formulación amina: menor volatilidad que las formulaciones éster, más segura cerca de cultivos sensibles.',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'herbimexpro',
    nombre: 'HERBIMEX PRO 800 SG',
    ia: '2,4-D Dimethylammonium 800 g/Kg',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Auxinas sintéticas',
    mecanismo: 'Auxina sintética en formulación granulada dispersable.',
    sintoma: 'Retorcimiento y muerte de malezas de hoja ancha.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['hoja-ancha'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    presentaciones: ['1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'vipper',
    nombre: 'VIPPER 304 SL',
    ia: '2,4-D 240 g/L + Picloram 64 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Auxinas sintéticas',
    mecanismo: 'Combinación auxínica de amplio espectro sobre hoja ancha y arbustivas.',
    sintoma: 'Epinastia severa; controla también rebrote de leñosas.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['hoja-ancha', 'lenosas'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
    todera: true,
  },
  {
    id: 'kanero',
    nombre: 'KANERO 500 SC',
    ia: 'Ametrina 500 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '5',
    familia: 'Triazinas',
    mecanismo: 'Bloquea el fotosistema II generando radicales libres que destruyen las membranas.',
    sintoma: 'Clorosis y quemado del tejido expuesto al sol.',
    movimiento: 'Absorción radicular y foliar, residual de suelo',
    objetivos: ['hoja-ancha', 'gramineas'],
    escenarios: ['cana'],
    momento: ['preemergente', 'postemergente-temprana'],
    riesgo: 'Medio',
    presentaciones: ['1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'experto',
    nombre: 'COMBO EXPERTO',
    ia: '2,4-D + Picloram + Metsulfuron methyl',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4 + 2',
    familia: 'Auxinas + Sulfonilurea',
    mecanismo: 'Combina desregulación hormonal con bloqueo de la síntesis de aminoácidos ramificados.',
    sintoma: 'Epinastia inicial seguida de detención total del crecimiento.',
    movimiento: 'Sistémico (floema y xilema)',
    objetivos: ['hoja-ancha', 'lenosas'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Medio',
    nota: 'Dos modos de acción en un solo combo: amplía espectro y reduce presión de selección.',
    presentaciones: ['Caja'],
    estado: 'Disponible',
  },
  {
    id: 'promax',
    nombre: 'COMBO PRO MAX',
    ia: '2,4-D + Picloram + Metsulfuron methyl',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4 + 2',
    familia: 'Auxinas + Sulfonilurea',
    mecanismo: 'Mezcla hormonal y de sulfonilurea de amplio espectro sobre leñosas y semileñosas.',
    sintoma: 'Control combinado de herbáceas, semileñosas y leñosas.',
    movimiento: 'Sistémico (floema y xilema)',
    objetivos: ['hoja-ancha', 'lenosas'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Medio',
    presentaciones: ['Caja'],
    estado: 'Nuevo',
  },
  {
    id: 'sakarin',
    nombre: 'SAKARIN 200 EC',
    ia: 'Fluroxipir 200 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '4',
    familia: 'Auxinas sintéticas',
    mecanismo: 'Auxina sintética con acción marcada sobre especies leñosas en crecimiento activo.',
    sintoma: 'Retorcimiento y muerte del rebrote leñoso.',
    movimiento: 'Sistémico (floema)',
    objetivos: ['hoja-ancha', 'lenosas'],
    escenarios: ['potreros'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    nota: 'Requiere que la maleza esté en crecimiento activo para translocar bien.',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'mesotriol',
    nombre: 'MESOTRIOL 480 SC',
    ia: 'Mesotrione 480 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '27',
    familia: 'Inhibidores de HPPD',
    mecanismo: 'Bloquea la HPPD e impide sintetizar carotenoides: la clorofila se destruye por fotooxidación.',
    sintoma: 'Blanqueamiento característico de las hojas nuevas antes de necrosarse.',
    movimiento: 'Sistémico (xilema)',
    objetivos: ['hoja-ancha', 'gramineas', 'ciperaceas'],
    escenarios: ['cana'],
    momento: ['postemergente'],
    riesgo: 'Medio',
    nota: 'Su síntoma de blanqueamiento es inconfundible en campo y sirve para verificar cobertura.',
    presentaciones: ['1 L'],
    estado: 'Disponible',
  },
  {
    id: 'elmacho',
    nombre: 'EL MACHO 480 SL',
    ia: 'Bentazon 480 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '6',
    familia: 'Benzotiadiazinonas',
    mecanismo: 'Bloquea el fotosistema II por vía foliar de contacto, en un sitio distinto al de las triazinas.',
    sintoma: 'Secado del tejido tratado en 2-5 días.',
    movimiento: 'Contacto',
    objetivos: ['hoja-ancha', 'ciperaceas'],
    escenarios: ['arroz', 'maiz'],
    momento: ['postemergente'],
    riesgo: 'Bajo',
    presentaciones: ['1 L', '4 L'],
    estado: 'Pronto',
  },
  {
    id: 'desmalexe',
    nombre: 'DESMALEXE 480 SC',
    ia: 'Oxyfluorfen 480 g/L',
    categoria: 'Herbicida',
    sistema: 'HRAC',
    grupo: '14',
    familia: 'Inhibidores de PPO',
    mecanismo: 'Bloquea la PPO; con luz se genera oxígeno singlete que rompe las membranas celulares.',
    sintoma: 'Necrosis en horas: el modo de acción más rápido de todos.',
    movimiento: 'Contacto (requiere luz)',
    objetivos: ['hoja-ancha', 'ciperaceas', 'gramineas'],
    escenarios: ['arroz', 'maiz'],
    momento: ['preemergente', 'postemergente-temprana'],
    riesgo: 'Bajo',
    nota: 'Sin sistemia: la cobertura de aplicación lo es todo.',
    presentaciones: ['250 cc', '500 cc', '1 L', '4 L'],
    estado: 'Pronto',
  },

  // ══════════════════════════ FUNGICIDAS ══════════════════════════
  {
    id: 'benevolo',
    nombre: 'Benevolo 250 SC',
    ia: 'Azoxystrobin 125 g/L + Flutriafol 125 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '11 + 3',
    familia: 'Estrobilurina + Triazol',
    mecanismo: 'Bloquea la respiración mitocondrial (Complejo III) y la síntesis de ergosterol de membrana.',
    sintoma: 'Detiene infecciones activas y previene nuevas por varias semanas.',
    movimiento: 'Sistémico + translaminar',
    accion: ['Preventivo', 'Curativo'],
    objetivos: ['hongos-foliares', 'manchas', 'roya'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    nota: 'Mezcla de dos sitios de acción: cubre el ciclo de infección completo.',
    presentaciones: ['250 cc', '1 L', '20 L'],
    estado: 'Disponible',
    todera: true,
  },
  {
    id: 'carbendazim',
    nombre: 'CARBENDAZIM 500 HXS',
    ia: 'Carbendazim 500 g/L equiv.',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '1',
    familia: 'Benzimidazoles',
    mecanismo: 'Impide el ensamblaje de la beta-tubulina: el hongo no puede completar la mitosis.',
    sintoma: 'Detiene la germinación de esporas y el crecimiento del micelio.',
    movimiento: 'Sistémico (xilema)',
    accion: ['Preventivo', 'Curativo temprano'],
    objetivos: ['hongos-foliares', 'manchas'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Alto',
    nota: 'Resistencia por mutación puntual: máximo 2 aplicaciones seguidas.',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'manconex',
    nombre: 'MANCONEX 80 WP',
    ia: 'Mancozeb 800 g/Kg',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: 'M03',
    familia: 'Ditiocarbamatos (multisitio)',
    mecanismo: 'Ataca simultáneamente múltiples enzimas con grupos sulfhidrilo del hongo.',
    sintoma: 'Forma una barrera protectora que impide la germinación de esporas.',
    movimiento: 'Contacto (sin sistemia)',
    accion: ['Preventivo'],
    objetivos: ['hongos-foliares', 'manchas', 'oomicetos'],
    escenarios: ['general'],
    momento: ['preventivo'],
    riesgo: 'Nulo',
    nota: 'Base de cualquier programa de rotación: al no tener un blanco único, no genera resistencia.',
    presentaciones: ['1 Kg'],
    estado: 'Disponible',
    todera: true,
  },
  {
    id: 'tenaz',
    nombre: 'TENAZ 250 SC',
    ia: 'Azoxystrobin 250 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '11',
    familia: 'Estrobilurinas (QoI)',
    mecanismo: 'Bloquea el Complejo III de la cadena respiratoria: el hongo se queda sin ATP.',
    sintoma: 'Fuerte efecto preventivo y antiesporulante.',
    movimiento: 'Translaminar y sistémico',
    accion: ['Preventivo', 'Antiesporulante'],
    objetivos: ['hongos-foliares', 'manchas', 'roya'],
    escenarios: ['general'],
    momento: ['preventivo'],
    riesgo: 'Alto',
    nota: 'No usar sola de forma repetida (mutación G143A): alterna o mezcla con otro sitio de acción.',
    presentaciones: ['250 cc', '1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'cloropaz',
    nombre: 'CLOROPAZ 720 SC',
    ia: 'Chlorothalonil 720 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: 'M05',
    familia: 'Cloronitrilos (multisitio)',
    mecanismo: 'Inactiva múltiples enzimas del metabolismo del hongo a la vez.',
    sintoma: 'Película protectante de alta residualidad sobre la superficie foliar.',
    movimiento: 'Contacto (sin sistemia)',
    accion: ['Preventivo'],
    objetivos: ['hongos-foliares', 'manchas', 'oomicetos'],
    escenarios: ['general'],
    momento: ['preventivo'],
    riesgo: 'Nulo',
    presentaciones: ['250 cc', '1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'flutri',
    nombre: 'FLUTRI 250 SC',
    ia: 'Flutriafol 250 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '3',
    familia: 'Triazoles (DMI)',
    mecanismo: 'Bloquea la C14-demetilasa: sin ergosterol la membrana del hongo queda defectuosa.',
    sintoma: 'Detiene infecciones ya iniciadas antes de que aparezcan síntomas.',
    movimiento: 'Sistémico (xilema)',
    accion: ['Preventivo', 'Curativo'],
    objetivos: ['hongos-foliares', 'manchas', 'roya'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    presentaciones: ['250 cc', '1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'benoagro',
    nombre: 'BENOAGRO 50 WP',
    ia: 'Benomil 500 g/Kg',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '1',
    familia: 'Benzimidazoles',
    mecanismo: 'Bloquea la división celular del hongo interfiriendo con la tubulina.',
    sintoma: 'Detiene el avance del micelio en tejido infectado.',
    movimiento: 'Sistémico (xilema)',
    accion: ['Preventivo', 'Curativo temprano'],
    objetivos: ['hongos-foliares', 'manchas'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Alto',
    presentaciones: ['100 g', '1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'durab',
    nombre: 'DURAB 325 SC',
    ia: 'Azoxystrobin 200 g/L + Difenoconazol 125 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '11 + 3',
    familia: 'Estrobilurina + Triazol',
    mecanismo: 'Doble bloqueo: respiración mitocondrial y síntesis de ergosterol.',
    sintoma: 'Acción prolongada con capacidad erradicante.',
    movimiento: 'Sistémico + translaminar',
    accion: ['Preventivo', 'Curativo', 'Erradicante'],
    objetivos: ['hongos-foliares', 'manchas', 'roya'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    presentaciones: ['250 cc', '1 L', '20 L'],
    estado: 'Disponible',
    todera: true,
  },
  {
    id: 'difenex',
    nombre: 'DIFENEX 250 EC',
    ia: 'Difenoconazole 250 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '3',
    familia: 'Triazoles (DMI)',
    mecanismo: 'Inhibe la síntesis de ergosterol de la membrana del hongo.',
    sintoma: 'Preventivo y curativo de amplio espectro.',
    movimiento: 'Sistémico (xilema)',
    accion: ['Preventivo', 'Curativo'],
    objetivos: ['hongos-foliares', 'manchas', 'roya'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Nuevo',
  },
  {
    id: 'undazol',
    nombre: 'UNDAZOL 250 SC',
    ia: 'Propiconazol 250 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '3',
    familia: 'Triazoles (DMI)',
    mecanismo: 'Bloquea la síntesis de ergosterol; alta movilidad sistémica.',
    sintoma: 'Control de Sigatoka negra y amarilla.',
    movimiento: 'Sistémico (xilema)',
    accion: ['Preventivo', 'Curativo'],
    objetivos: ['hongos-foliares', 'sigatoka', 'manchas'],
    escenarios: ['banano-platano'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    presentaciones: ['250 cc', '1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'benigno',
    nombre: 'BENIGNO 325 SC',
    ia: 'Azoxystrobin 200 g/L + Difenoconazol 125 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '11 + 3',
    familia: 'Estrobilurina + Triazol',
    mecanismo: 'Bloquea respiración mitocondrial y síntesis de ergosterol simultáneamente.',
    sintoma: 'Preventivo, curativo y antiesporulante.',
    movimiento: 'Sistémico + translaminar',
    accion: ['Preventivo', 'Curativo', 'Antiesporulante'],
    objetivos: ['hongos-foliares', 'manchas', 'roya'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    presentaciones: ['250 cc', '1 L', '20 L'],
    estado: 'Disponible',
    todera: true,
  },
  {
    id: 'tebunex',
    nombre: 'TEBUNEX 250 EC',
    ia: 'Tebuconazole 250 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '3',
    familia: 'Triazoles (DMI)',
    mecanismo: 'Inhibe la síntesis de ergosterol de membrana.',
    sintoma: 'Alto efecto sobre la esporulación del hongo.',
    movimiento: 'Sistémico (xilema)',
    accion: ['Preventivo', 'Curativo', 'Antiesporulante'],
    objetivos: ['hongos-foliares', 'manchas', 'roya'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
  },
  {
    id: 'mutantex',
    nombre: 'MUTANTEX 125 SC',
    ia: 'Epoxiconazol 125 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '3',
    familia: 'Triazoles (DMI)',
    mecanismo: 'Bloquea la C14-demetilasa en la ruta del ergosterol.',
    sintoma: 'Control sistémico en cultivos anuales.',
    movimiento: 'Sistémico (xilema)',
    accion: ['Preventivo', 'Curativo'],
    objetivos: ['hongos-foliares', 'manchas', 'roya'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
  },
  {
    id: 'robendazim',
    nombre: 'ROBENDAZIM 500 SC',
    ia: 'Carbendazim 500 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '1',
    familia: 'Benzimidazoles',
    mecanismo: 'Interfiere con la tubulina y bloquea la mitosis del hongo.',
    sintoma: 'Amplio espectro sobre enfermedades foliares.',
    movimiento: 'Sistémico (xilema)',
    accion: ['Preventivo', 'Curativo temprano'],
    objetivos: ['hongos-foliares', 'manchas'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Alto',
    presentaciones: ['1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'powerplus',
    nombre: 'POWEREX 250 EC',
    ia: 'Propiconazole 250 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '3',
    familia: 'Triazoles (DMI)',
    mecanismo: 'Inhibe la síntesis de ergosterol con alta sistemia.',
    sintoma: 'Ideal para Sigatoka en banano y plátano.',
    movimiento: 'Sistémico (xilema)',
    accion: ['Preventivo', 'Curativo'],
    objetivos: ['hongos-foliares', 'sigatoka'],
    escenarios: ['banano-platano'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    presentaciones: ['250 cc', '1 L'],
    estado: 'Disponible',
  },
  {
    id: 'kurax',
    nombre: 'KURAX PRO 680 SC',
    ia: 'Fluopicolide 62.5 g/L + Propamocarb 625 g/L',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '43 + 28',
    familia: 'Benzamida + Carbamato',
    mecanismo: 'Desorganiza el citoesqueleto del oomiceto e impide la síntesis de fosfolípidos de membrana.',
    sintoma: 'Frena germinación de zoosporas, crecimiento de micelio y esporulación.',
    movimiento: 'Sistémico',
    accion: ['Preventivo', 'Curativo'],
    objetivos: ['oomicetos', 'mildeo-velloso', 'raiz-suelo'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    nota: 'Específico para oomicetos (Phytophthora, Pythium): no funciona igual sobre hongos verdaderos.',
    presentaciones: ['1 L'],
    estado: 'Pronto',
  },
  {
    id: 'blindax',
    nombre: 'Blindax 380 WG',
    ia: 'Boscalid 252 g/Kg + Pyraclostrobin 128 g/Kg',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '7 + 11',
    familia: 'SDHI + Estrobilurina',
    mecanismo: 'Doble bloqueo de la respiración mitocondrial: Complejo II y Complejo III.',
    sintoma: 'Efecto de choque más protección prolongada.',
    movimiento: 'Sistémico + translaminar',
    accion: ['Preventivo', 'Curativo'],
    objetivos: ['hongos-foliares', 'manchas', 'botrytis'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Medio',
    nota: 'Dos puntos distintos de la cadena respiratoria: muy baja probabilidad de resistencia cruzada interna.',
    presentaciones: ['250 g', '500 g', '1 Kg'],
    estado: 'Pronto',
  },
  {
    id: 'protecsol',
    nombre: 'PROTECSOL 800 WP',
    ia: 'Fosetil aluminio 800 g/Kg',
    categoria: 'Fungicida',
    sistema: 'FRAC',
    grupo: '33',
    familia: 'Fosfonatos',
    mecanismo: 'Efecto fungitóxico directo más activación de las defensas naturales de la planta (fitoalexinas).',
    sintoma: 'Protege partes subterráneas y frena el avance de oomicetos en raíz.',
    movimiento: 'Sistémico bidireccional (xilema y floema)',
    accion: ['Preventivo', 'Curativo temprano'],
    objetivos: ['oomicetos', 'raiz-suelo', 'mildeo-velloso'],
    escenarios: ['general'],
    momento: ['preventivo', 'curativo'],
    riesgo: 'Bajo',
    nota: 'De los pocos productos que baja hacia la raíz con la misma facilidad con la que sube.',
    presentaciones: ['500 g', '1 Kg'],
    estado: 'Pronto',
  },

  // ══════════════════════ BIOESTIMULANTES ══════════════════════
  {
    id: 'alga600',
    nombre: 'Alga600',
    ia: 'Extracto de alga Sargassum hemiphyllum',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Algas',
    familia: 'Extracto algal',
    mecanismo: 'Aporta citoquininas, auxinas y betaínas naturales que regulan el balance hormonal de la planta.',
    sintoma: 'Mejora la respuesta al estrés osmótico y activa meristemos.',
    movimiento: 'Foliar y radicular',
    objetivos: ['estres', 'balance-hormonal', 'enraizamiento'],
    escenarios: ['general'],
    momento: ['vegetativo', 'estres'],
    riesgo: 'Nulo',
    presentaciones: ['100 g', '250 g', '1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'algasoil',
    nombre: 'Algasoil',
    ia: 'Alga Sargassum hemiphyllum + NPK 2-2-2',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Algas',
    familia: 'Granulado activador de suelo',
    mecanismo: 'Los polisacáridos del alga estimulan la proliferación de microorganismos benéficos de la rizósfera.',
    sintoma: 'Suelo biológicamente más activo.',
    movimiento: 'Aplicación al suelo',
    objetivos: ['suelo', 'enraizamiento'],
    escenarios: ['general'],
    momento: ['siembra', 'vegetativo'],
    riesgo: 'Nulo',
    presentaciones: ['1 Kg', '5 Kg', '20 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'brain',
    nombre: 'BRAIN',
    ia: 'Alga Sargassum hemiphyllum + K2O 34%',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Algas',
    familia: 'Promotor radicular',
    mecanismo: 'El potasio del alga junto con sus fitohormonas promueve la formación y elongación de raíces absorbentes.',
    sintoma: 'Mayor volumen radicular y área de absorción.',
    movimiento: 'Radicular',
    objetivos: ['enraizamiento', 'suelo'],
    escenarios: ['general'],
    momento: ['siembra', 'trasplante', 'vegetativo'],
    riesgo: 'Nulo',
    presentaciones: ['1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'leili2000',
    nombre: 'LEILI2000',
    ia: 'Alga Sargassum hemiphyllum + NPK',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Algas',
    familia: 'Activador fotosintético',
    mecanismo: 'Activa complejos enzimáticos fotosintéticos y la acumulación de reservas energéticas.',
    sintoma: 'Mejor llenado y acumulación de carbohidratos.',
    movimiento: 'Foliar',
    objetivos: ['estres', 'llenado-fruto', 'balance-hormonal'],
    escenarios: ['general'],
    momento: ['vegetativo', 'llenado'],
    riesgo: 'Nulo',
    presentaciones: ['250 cc', '1 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'amino43',
    nombre: 'Fertilita AMINO43',
    ia: '16 aminoácidos libres al 43%',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Aminoácidos',
    familia: 'Aminoácidos libres',
    mecanismo: 'Aminoácidos L de absorción inmediata: ahorran a la planta la energía de sintetizarlos.',
    sintoma: 'Recuperación rápida tras estrés o en etapas de alta demanda.',
    movimiento: 'Foliar',
    objetivos: ['estres', 'balance-hormonal'],
    escenarios: ['general'],
    momento: ['estres', 'floracion', 'llenado'],
    riesgo: 'Nulo',
    presentaciones: ['100 g', '250 g', '1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'amino80',
    nombre: 'Fertilita AMINO80',
    ia: '18 aminoácidos libres al 80%',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Aminoácidos',
    familia: 'Aminoácidos libres',
    mecanismo: 'Aporte energético concentrado para recuperación bajo estrés abiótico severo.',
    sintoma: 'Reactiva el metabolismo tras golpes de calor, sequía o fitotoxicidad.',
    movimiento: 'Foliar',
    objetivos: ['estres'],
    escenarios: ['general'],
    momento: ['estres'],
    riesgo: 'Nulo',
    presentaciones: ['100 g', '1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'grosso',
    nombre: 'Fertilita GROSSO',
    ia: 'CaB-Mo + Aminoácidos libres',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Nutrición compleja',
    familia: 'Calcio-Boro-Molibdeno',
    mecanismo: 'El calcio estabiliza pared y membrana en frutos jóvenes; el boro mejora el transporte de azúcares y la viabilidad del polen.',
    sintoma: 'Mejora el amarre de flor y el cuajado de frutos.',
    movimiento: 'Foliar',
    objetivos: ['floracion-cuajado'],
    escenarios: ['general'],
    momento: ['floracion'],
    riesgo: 'Nulo',
    presentaciones: ['1 L', '4 L', '20 L'],
    estado: 'Disponible',
  },
  {
    id: 'fruttox',
    nombre: 'Fertilita FRUTTOX',
    ia: 'K2O + Aminoácidos libres',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Nutrición compleja',
    familia: 'Potasio complejado',
    mecanismo: 'El potasio activa el transporte floemático de azúcares hacia el fruto.',
    sintoma: 'Mejor llenado, calibre y contenido de sólidos solubles.',
    movimiento: 'Foliar',
    objetivos: ['llenado-fruto'],
    escenarios: ['general'],
    momento: ['llenado'],
    riesgo: 'Nulo',
    presentaciones: ['1 L', '4 L'],
    estado: 'Disponible',
  },
  {
    id: 'forttex',
    nombre: 'Fertilita FORTTEX',
    ia: 'CaO + Aminoácidos libres',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Nutrición compleja',
    familia: 'Calcio complejado',
    mecanismo: 'Refuerza la pared celular, aumentando la resistencia mecánica del tejido.',
    sintoma: 'Fortalece el fruto y el tejido, con mejor vida poscosecha.',
    movimiento: 'Foliar',
    objetivos: ['estres', 'llenado-fruto'],
    escenarios: ['general'],
    momento: ['llenado', 'estres'],
    riesgo: 'Nulo',
    presentaciones: ['100 g', '1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'complex',
    nombre: 'Fertilita COMPPLEX',
    ia: 'Elementos menores + Aminoácidos',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Nutrición compleja',
    familia: 'Microelementos quelatados',
    mecanismo: 'Corrige deficiencias de Zn, Mn, Fe y Cu, cofactores de enzimas clave del metabolismo.',
    sintoma: 'Corrige clorosis y desbalances de crecimiento.',
    movimiento: 'Foliar',
    objetivos: ['balance-hormonal', 'estres'],
    escenarios: ['general'],
    momento: ['vegetativo'],
    riesgo: 'Nulo',
    presentaciones: ['100 g', '1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'humox',
    nombre: 'HUMOX',
    ia: 'Ácido húmico',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Acondicionadores',
    familia: 'Sustancias húmicas',
    mecanismo: 'Mejora la agregación del suelo y aumenta la capacidad de intercambio catiónico (CIC).',
    sintoma: 'Suelo con mejor estructura y retención de nutrientes.',
    movimiento: 'Aplicación al suelo',
    objetivos: ['suelo', 'enraizamiento'],
    escenarios: ['general'],
    momento: ['siembra', 'vegetativo'],
    riesgo: 'Nulo',
    presentaciones: ['1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'fulvox',
    nombre: 'FulVOX 80',
    ia: 'Ácido fúlvico',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Acondicionadores',
    familia: 'Sustancias húmicas',
    mecanismo: 'Bajo peso molecular: penetra rápido en la raíz y mejora la permeabilidad de membrana.',
    sintoma: 'Mejor asimilación de nutrientes aplicados.',
    movimiento: 'Radicular y foliar',
    objetivos: ['suelo', 'enraizamiento'],
    escenarios: ['general'],
    momento: ['siembra', 'vegetativo'],
    riesgo: 'Nulo',
    nota: 'Buen quelatante natural: mejora la eficiencia de los fertilizantes en mezcla.',
    presentaciones: ['1 Kg'],
    estado: 'Disponible',
  },
  {
    id: 'softguard',
    nombre: 'SOFTGUARD',
    ia: 'Oligosacáridos de quitosano + K2O',
    categoria: 'Bioestimulante',
    sistema: null,
    grupo: 'Inductores',
    familia: 'Quitosano',
    mecanismo: 'Activa la resistencia sistémica adquirida (SAR) por las vías del ácido salicílico y jasmónico.',
    sintoma: 'La planta responde más rápido ante hongos, bacterias y virus.',
    movimiento: 'Foliar',
    objetivos: ['induccion-defensa', 'estres'],
    escenarios: ['general'],
    momento: ['vegetativo', 'siembra'],
    riesgo: 'Nulo',
    nota: 'No es un fungicida: prepara las defensas de la planta, no mata al patógeno.',
    presentaciones: ['1 L'],
    estado: 'Pronto',
  },

  // ══════════════════ REGULADORES DE CRECIMIENTO ══════════════════
  {
    id: 'gibox',
    nombre: 'GIBOX 10% SP',
    ia: 'Ácido giberélico 100 g/Kg',
    categoria: 'Regulador',
    sistema: null,
    grupo: 'Giberelinas',
    familia: 'GA3',
    mecanismo: 'Promueve la elongación celular relajando los enlaces de pectina de la pared.',
    sintoma: 'Brotes y entrenudos más largos; rompe latencia de yemas.',
    movimiento: 'Sistémico',
    objetivos: ['elongacion', 'brotacion'],
    escenarios: ['general'],
    momento: ['vegetativo', 'brotacion'],
    riesgo: 'Nulo',
    presentaciones: ['10 g'],
    estado: 'Disponible',
  },
  {
    id: 'giboxpro',
    nombre: 'GIBOX PRO 12.5% TB',
    ia: 'Ácido giberélico 125 g/Kg',
    categoria: 'Regulador',
    sistema: null,
    grupo: 'Giberelinas',
    familia: 'GA3',
    mecanismo: 'Mismo mecanismo del GA3 en mayor concentración, en tableta soluble.',
    sintoma: 'Acelera el desarrollo de brotes y yemas.',
    movimiento: 'Sistémico',
    objetivos: ['elongacion', 'brotacion'],
    escenarios: ['general'],
    momento: ['vegetativo', 'brotacion'],
    riesgo: 'Nulo',
    presentaciones: ['10 g'],
    estado: 'Pronto',
  },
  {
    id: 'mepex',
    nombre: 'MEPEX 50 SL',
    ia: 'Cloruro de mepiquat 50 g/L',
    categoria: 'Regulador',
    sistema: null,
    grupo: 'Antigiberelinas',
    familia: 'Retardante de crecimiento',
    mecanismo: 'Bloquea la síntesis de giberelinas: acorta entrenudos y compacta la planta.',
    sintoma: 'Menor crecimiento longitudinal y mejor reparto hacia órganos reproductivos.',
    movimiento: 'Sistémico',
    objetivos: ['compactar', 'elongacion'],
    escenarios: ['algodon'],
    momento: ['vegetativo'],
    riesgo: 'Nulo',
    nota: 'Efecto contrario al de GIBOX: se usa cuando la planta se está yendo en vegetativo.',
    presentaciones: ['1 L'],
    estado: 'Pronto',
  },
];

// ══════════════════════════════════════════════════════════════════
// src/data/taxonomia.js
// ══════════════════════════════════════════════════════════════════

/**
 * Taxonomía agronómica que alimenta el diagnóstico guiado.
 *
 * El flujo del asistente es siempre el mismo:
 *   1. ¿Qué vas a manejar?   -> RAMAS
 *   2. ¿Qué exactamente?     -> rama.objetivos
 *   3. ¿Dónde / cuándo?      -> rama.escenarios y rama.momentos
 *
 * Los `id` de esta taxonomía son los mismos que llevan los productos
 * en sus campos objetivos / escenarios / momento.
 */

const COLORES = {
  tinta: '#33424E',
  azul: '#2B7FB8',
  azulClaro: '#D6E7F2',
  naranja: '#E8722C',
  naranjaClaro: '#FBE3D4',
  verde: '#5C9A3D',
  verdeClaro: '#E2EFD8',
  teal: '#177E8E',
  tealClaro: '#D5EAEE',
  ambar: '#C2760E',
  ambarClaro: '#FBEBD2',
  gris: '#6E7B85',
  grisClaro: '#EDF0F2',
  papel: '#F5F8FA',
  borde: '#D8E1E8',
  textoSuave: '#6C7C88',
};

/** Fondo suave asociado a cada color de categoría, para los paneles laterales. */
const FONDO_CATEGORIA = {
  Insecticida: '#D6E7F2',
  Herbicida: '#FBE3D4',
  Fungicida: '#D5EAEE',
  Bioestimulante: '#E2EFD8',
  Regulador: '#FBEBD2',
};

const COLOR_CATEGORIA = {
  Insecticida: COLORES.azul,
  Herbicida: COLORES.naranja,
  Fungicida: COLORES.teal,
  Bioestimulante: COLORES.verde,
  Regulador: COLORES.ambar,
};

const COLOR_RIESGO = {
  Alto: '#C2410C',
  Medio: '#B45309',
  Bajo: '#3F7A5E',
  Nulo: '#1F6FA5',
};

const RAMAS = [
  {
    id: 'insectos',
    titulo: 'Insectos y ácaros',
    categorias: ['Insecticida'],
    sistema: 'IRAC',
    resumen: 'Plagas que se alimentan del cultivo',
    pregunta: '¿Qué tipo de plaga estás viendo?',
    objetivos: [
      { id: 'chupadores', label: 'Chupadores', ayuda: 'Mosca blanca, áfidos, escamas' },
      { id: 'masticadores', label: 'Masticadores', ayuda: 'Comedores de follaje' },
      { id: 'lepidopteros', label: 'Larvas de lepidóptero', ayuda: 'Gusanos en general' },
      { id: 'cogolleros', label: 'Cogolleros', ayuda: 'Larva protegida en el cogollo' },
      { id: 'acaros', label: 'Ácaros', ayuda: 'Arañita roja, blanca' },
      { id: 'trips', label: 'Trips', ayuda: 'Raspadores del follaje' },
      { id: 'raspadores', label: 'Raspadores', ayuda: 'Daño superficial en hoja y fruto' },
      { id: 'minadores', label: 'Minadores', ayuda: 'Galerías dentro de la hoja' },
      { id: 'barrenadores', label: 'Barrenadores', ayuda: 'Perforan tallo o fruto' },
      { id: 'trozadores', label: 'Trozadores', ayuda: 'Cortan plántulas a ras' },
      { id: 'coleopteros', label: 'Coleópteros', ayuda: 'Escarabajos y picudos' },
      { id: 'huevos-ninfas', label: 'Huevos y ninfas', ayuda: 'Control poblacional temprano' },
    ],
    preguntaEscenario: '¿Cómo vas a aplicar?',
    escenarios: [
      { id: 'general', label: 'Aspersión foliar' },
      { id: 'semilla-suelo', label: 'Semilla o suelo' },
    ],
    preguntaMomento: '¿En qué momento estás?',
    momentos: [
      { id: 'preventivo-vector', label: 'Prevención', ayuda: 'Aún no hay daño; protejo el cultivo' },
      { id: 'larvas-tempranas', label: 'Población inicial', ayuda: 'Primeros individuos, larvas pequeñas' },
      { id: 'larvas-activas', label: 'Larvas alimentándose', ayuda: 'Ya hay daño en follaje' },
      { id: 'poblacion-establecida', label: 'Población establecida', ayuda: 'Daño visible, necesito choque' },
      { id: 'preventivo-poblacional', label: 'Cortar el ciclo', ayuda: 'Bajar la siguiente generación' },
      { id: 'siembra', label: 'En siembra', ayuda: 'Tratamiento a semilla o suelo' },
    ],
  },
  {
    id: 'malezas',
    titulo: 'Malezas',
    categorias: ['Herbicida'],
    sistema: 'HRAC',
    resumen: 'Competencia por luz, agua y nutrientes',
    pregunta: '¿Qué tipo de maleza vas a controlar?',
    objetivos: [
      { id: 'hoja-ancha', label: 'Hoja ancha', ayuda: 'Dicotiledóneas' },
      { id: 'gramineas', label: 'Gramíneas', ayuda: 'Hoja angosta, pastos' },
      { id: 'ciperaceas', label: 'Ciperáceas', ayuda: 'Coquito, cortadera' },
      { id: 'lenosas', label: 'Leñosas y arbustivas', ayuda: 'Rebrote en potreros' },
      { id: 'helechos', label: 'Helechos', ayuda: 'Helecho marranero' },
      { id: 'perennes', label: 'Perennes con rizoma', ayuda: 'Rebrotan desde la raíz' },
      { id: 'no-selectivo', label: 'Todo lo verde', ayuda: 'Limpieza total del lote' },
    ],
    preguntaEscenario: '¿Dónde vas a aplicar?',
    escenarios: [
      { id: 'potreros', label: 'Potreros y pastos' },
      { id: 'arroz', label: 'Arroz' },
      { id: 'maiz', label: 'Maíz' },
      { id: 'cana', label: 'Caña de azúcar' },
      { id: 'cultivo-hoja-ancha', label: 'Cultivo de hoja ancha' },
      { id: 'barbecho', label: 'Barbecho o preparación' },
      { id: 'calles-cultivo', label: 'Calles del cultivo' },
    ],
    preguntaMomento: '¿Cuándo vas a aplicar?',
    momentos: [
      { id: 'preemergente', label: 'Preemergente', ayuda: 'Antes de que nazca la maleza' },
      { id: 'postemergente-temprana', label: 'Postemergente temprana', ayuda: 'Maleza pequeña y tierna' },
      { id: 'postemergente', label: 'Postemergente', ayuda: 'Maleza ya desarrollada' },
      { id: 'preparacion-lote', label: 'Preparación de lote', ayuda: 'Limpieza antes de sembrar' },
    ],
  },
  {
    id: 'enfermedades',
    titulo: 'Enfermedades',
    categorias: ['Fungicida'],
    sistema: 'FRAC',
    resumen: 'Hongos verdaderos y oomicetos',
    pregunta: '¿Qué tipo de enfermedad estás manejando?',
    objetivos: [
      { id: 'hongos-foliares', label: 'Hongos foliares', ayuda: 'Tizones, antracnosis' },
      { id: 'manchas', label: 'Manchas foliares', ayuda: 'Lesiones definidas en hoja' },
      { id: 'roya', label: 'Roya', ayuda: 'Pústulas anaranjadas' },
      { id: 'sigatoka', label: 'Sigatoka', ayuda: 'Banano y plátano' },
      { id: 'oomicetos', label: 'Oomicetos', ayuda: 'Phytophthora, Pythium' },
      { id: 'mildeo-velloso', label: 'Mildeo velloso', ayuda: 'Oomiceto foliar' },
      { id: 'raiz-suelo', label: 'Raíz y suelo', ayuda: 'Pudriciones, damping off' },
      { id: 'botrytis', label: 'Botrytis y pudriciones', ayuda: 'Moho gris en flor y fruto' },
    ],
    preguntaEscenario: '¿En qué cultivo?',
    escenarios: [
      { id: 'general', label: 'Uso general' },
      { id: 'banano-platano', label: 'Banano y plátano' },
    ],
    preguntaMomento: '¿En qué punto está la enfermedad?',
    momentos: [
      { id: 'preventivo', label: 'Todavía no aparece', ayuda: 'Quiero proteger antes del inóculo' },
      { id: 'curativo', label: 'Ya hay síntomas', ayuda: 'Necesito detener la infección' },
    ],
  },
  {
    id: 'nutricion',
    titulo: 'Nutrición y estrés',
    categorias: ['Bioestimulante', 'Regulador'],
    sistema: null,
    resumen: 'Fisiología, desarrollo y recuperación',
    pregunta: '¿Qué necesita la planta?',
    objetivos: [
      { id: 'enraizamiento', label: 'Enraizar mejor', ayuda: 'Siembra o trasplante' },
      { id: 'floracion-cuajado', label: 'Floración y cuajado', ayuda: 'Reducir caída de flor' },
      { id: 'llenado-fruto', label: 'Llenado de fruto', ayuda: 'Calibre y peso' },
      { id: 'estres', label: 'Recuperar de estrés', ayuda: 'Sequía, calor, fitotoxicidad' },
      { id: 'balance-hormonal', label: 'Balance hormonal', ayuda: 'Desarrollo equilibrado' },
      { id: 'suelo', label: 'Mejorar el suelo', ayuda: 'Estructura y vida microbiana' },
      { id: 'induccion-defensa', label: 'Activar defensas', ayuda: 'Preparar a la planta' },
      { id: 'elongacion', label: 'Alargar brotes', ayuda: 'Giberelinas' },
      { id: 'brotacion', label: 'Estimular brotación', ayuda: 'Romper latencia de yemas' },
      { id: 'compactar', label: 'Compactar la planta', ayuda: 'Frenar crecimiento vegetativo' },
    ],
    preguntaEscenario: '¿En qué cultivo?',
    escenarios: [
      { id: 'general', label: 'Uso general' },
      { id: 'algodon', label: 'Algodón' },
    ],
    preguntaMomento: '¿En qué etapa está el cultivo?',
    momentos: [
      { id: 'siembra', label: 'Siembra' },
      { id: 'trasplante', label: 'Trasplante' },
      { id: 'brotacion', label: 'Brotación' },
      { id: 'vegetativo', label: 'Desarrollo vegetativo' },
      { id: 'floracion', label: 'Floración' },
      { id: 'llenado', label: 'Llenado y cosecha' },
      { id: 'estres', label: 'Bajo estrés' },
    ],
  },
];

/** Etiquetas legibles para mostrar los códigos internos en la interfaz. */
const ETIQUETAS = (() => {
  const mapa = {};
  RAMAS.forEach((r) => {
    [...r.objetivos, ...r.escenarios, ...r.momentos].forEach((o) => {
      mapa[o.id] = o.label;
    });
  });
  return mapa;
})();

/**
 * Devuelve el nombre legible de una etiqueta. Si algún producto usa un código
 * que todavía no existe en la taxonomía, lo muestra de forma presentable en vez
 * de dejar ver el identificador interno.
 */
function etiquetaDe(id) {
  if (!id) return '';
  if (ETIQUETAS[id]) return ETIQUETAS[id];
  const texto = String(id).replace(/-/g, ' ');
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const CATEGORIAS = ['Insecticida', 'Herbicida', 'Fungicida', 'Bioestimulante', 'Regulador'];

// ══════════════════════════════════════════════════════════════════
// src/data/gruposMoA.js
// ══════════════════════════════════════════════════════════════════

/**
 * Conocimiento profundo por GRUPO de modo de acción.
 *
 * Decisión de arquitectura: el contenido técnico pesado (sitio de acción,
 * bioquímica, translocación, estadios afectados, motivo de rotación) vive aquí
 * y no repetido en cada uno de los 83 productos. Un producto declara a qué
 * grupo pertenece y hereda todo esto. Si mañana FRAC reclasifica un grupo, se
 * corrige en un solo lugar.
 *
 * Fuentes de la clasificación: IRAC MoA v11.5, HRAC Global (numeración 2020,
 * revisión 2026) y FRAC Code List 2025.
 */

/* ────────────────────────────────────────────────────────────────
   TIPOS DE TRANSLOCACIÓN
   Terminología estándar de redistribución de plaguicidas en planta.
   ──────────────────────────────────────────────────────────────── */
const TRANSLOCACION = {
  contacto: {
    id: 'contacto',
    nombre: 'No translocado (contacto)',
    icono: '◍',
    descripcion:
      'El producto se queda donde cayó la gota. No entra a los vasos conductores ni se redistribuye.',
    implicacion:
      'La cobertura lo es todo: lo que la gota no toca, queda sin proteger. El crecimiento nuevo que salga después queda desprotegido y hay que volver a aplicar.',
  },
  translaminar: {
    id: 'translaminar',
    nombre: 'Translaminar (sistémico local)',
    icono: '◐',
    descripcion:
      'Penetra la cutícula y atraviesa el grosor de la hoja formando un depósito interno, pero no viaja lejos del punto de entrada.',
    implicacion:
      'Alcanza plagas del envés aunque se asperje por el haz, y llega a minadores dentro de la galería. No protege hojas nuevas.',
  },
  xilema: {
    id: 'xilema',
    nombre: 'Sistémico por xilema (acropetal)',
    icono: '↑',
    descripcion:
      'Se mueve con la corriente de transpiración: siempre hacia arriba y hacia afuera, desde la raíz o el punto de absorción hacia las puntas.',
    implicacion:
      'Protege el tejido nuevo que va emergiendo, por eso funciona en aplicación a semilla, suelo o drench. No baja a la raíz desde la hoja.',
  },
  floema: {
    id: 'floema',
    nombre: 'Sistémico por floema (basipetal)',
    icono: '↓',
    descripcion:
      'Viaja con los fotosintatos hacia los sumideros de la planta: raíces, rizomas, frutos y yemas.',
    implicacion:
      'Es lo que permite matar rizomas y estolones de malezas perennes desde una aspersión foliar. Exige que la planta esté fotosintetizando activamente.',
  },
  ambimobil: {
    id: 'ambimobil',
    nombre: 'Ambimóvil (xilema y floema)',
    icono: '↕',
    descripcion:
      'Verdadero sistémico: se mueve en ambas direcciones, subiendo por xilema y bajando por floema.',
    implicacion:
      'Protege la planta entera, de raíz a punta, desde cualquier punto de aplicación. Es la única movilidad que permite tratar una raíz asperjando la hoja.',
  },
  residual: {
    id: 'residual',
    nombre: 'Residual de suelo',
    icono: '▤',
    descripcion:
      'Permanece activo en la lámina superficial del suelo y lo absorbe la maleza al germinar.',
    implicacion:
      'Necesita humedad para activarse y un suelo bien preparado. Cuidado con la residualidad sobre el cultivo siguiente en la rotación.',
  },
};

/* ────────────────────────────────────────────────────────────────
   ESTADIOS DEL CICLO DE VIDA (insecticidas)
   ──────────────────────────────────────────────────────────────── */
const ESTADIOS = [
  { id: 'huevo', nombre: 'Huevo', descripcion: 'Actividad ovicida' },
  { id: 'larva', nombre: 'Larva / Ninfa', descripcion: 'Estados inmaduros' },
  { id: 'pupa', nombre: 'Pupa', descripcion: 'Estado de transformación' },
  { id: 'adulto', nombre: 'Adulto', descripcion: 'Insecto formado' },
];

/* ────────────────────────────────────────────────────────────────
   GRUPOS DE MODO DE ACCIÓN
   ──────────────────────────────────────────────────────────────── */
const GRUPOS_MOA = {
  // ═══════════════ INSECTICIDAS (IRAC) ═══════════════
  'IRAC:1A': {
    nombre: 'Carbamatos',
    proceso: 'Sistema nervioso · Acetilcolinesterasa',
    sitioAccion: 'Enzima acetilcolinesterasa (AChE) en la hendidura sináptica',
    mecanismo:
      'La acetilcolina es el mensajero que salta de una neurona a otra. Después de transmitir la señal, la enzima AChE la destruye para que la neurona se apague. El carbamato bloquea esa enzima: la acetilcolina se acumula y la neurona queda disparando señales sin parar.',
    sintomas: 'Temblores en minutos, convulsiones, parálisis en 1–2 horas y muerte por agotamiento neuromuscular.',
    velocidad: 'Choque rápido (minutos a horas)',
    translocacion: 'contacto',
    estadios: ['huevo', 'larva', 'adulto'],
    espectro: 'Amplio sobre masticadores y trozadores; varios tienen efecto ovicida.',
    riesgo: 'Alto',
    rotacionMotivo:
      'Comparte sitio de acción exacto con los organofosforados: la resistencia a uno confiere resistencia al otro aunque sean familias químicas distintas. Es el caso clásico de resistencia cruzada que hay que saber explicar.',
    decision:
      'Se elige cuando se necesita choque inmediato y efecto ovicida en el mismo pase. No es un producto para usar de forma repetida.',
    precaucion: 'Alta toxicidad para fauna benéfica y aplicador. Extremar el equipo de protección.',
  },
  'IRAC:3A': {
    nombre: 'Piretroides',
    proceso: 'Sistema nervioso · Canal de sodio',
    sitioAccion: 'Canal de sodio dependiente de voltaje del axón',
    mecanismo:
      'El impulso nervioso viaja porque el canal de sodio se abre y se cierra muy rápido. El piretroide retrasa el cierre: el canal queda abierto más tiempo del debido y el axón se despolariza una y otra vez sin recibir estímulo nuevo.',
    sintomas: 'Volteo (knock-down) en minutos: temblor, incoordinación, parálisis.',
    velocidad: 'Muy rápida (minutos)',
    translocacion: 'contacto',
    estadios: ['larva', 'adulto'],
    espectro: 'Amplio sobre masticadores y adultos voladores. Débil sobre ácaros (puede incluso reventarlos).',
    riesgo: 'Alto',
    rotacionMotivo:
      'Es el grupo con más historial de uso masivo en el mundo, y por eso el que más poblaciones resistentes ha generado. Además, la resistencia metabólica que selecciona (esterasas y oxidasas) puede afectar a otros grupos.',
    decision:
      'Se elige por costo y por velocidad de volteo cuando hay que bajar una población adulta ya. No sirve como columna vertebral de un programa.',
    precaucion:
      'Muy tóxico para abejas y para ácaros depredadores. Su uso repetido puede causar brotes secundarios de ácaros al eliminar los benéficos.',
  },
  'IRAC:4A': {
    nombre: 'Neonicotinoides',
    proceso: 'Sistema nervioso · Receptor nicotínico',
    sitioAccion: 'Receptor nicotínico de acetilcolina (nAChR) postsináptico',
    mecanismo:
      'Imita a la acetilcolina y se pega al receptor, pero con una diferencia crítica: la enzima AChE no puede degradarlo. El receptor queda activado de forma permanente y la neurona se sobreestimula hasta colapsar.',
    sintomas: 'El insecto deja de alimentarse muy rápido (efecto antifeeding), luego parálisis progresiva en 24–48 h.',
    velocidad: 'Media (corta la alimentación en horas, mata en 1–2 días)',
    translocacion: 'xilema',
    estadios: ['larva', 'adulto'],
    espectro: 'Excelente sobre chupadores y raspadores. Poca actividad sobre ácaros y lepidópteros grandes.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Su sistemia por xilema deja residuos activos durante semanas, lo que significa presión de selección prolongada sobre varias generaciones de la plaga. En mosca blanca y áfidos ya hay resistencia documentada en varias regiones.',
    decision:
      'Es la herramienta cuando el objetivo es un chupador vector de virus: al cortar la alimentación rápido, reduce la transmisión. También la única vía práctica para proteger desde la semilla o el suelo.',
    precaucion:
      'Alto riesgo para polinizadores por residuo sistémico en néctar y polen. Evitar aplicaciones en floración.',
  },
  'IRAC:5': {
    nombre: 'Spinosinas',
    proceso: 'Sistema nervioso · Receptor nicotínico (sitio alostérico)',
    sitioAccion: 'Receptor nicotínico de acetilcolina, sitio alostérico distinto al del grupo 4A, más acción sobre receptores GABA',
    mecanismo:
      'Se une al receptor nicotínico en un punto diferente al de los neonicotinoides, provocando una activación prolongada, y además altera la señalización GABAérgica. El resultado son contracciones musculares involuntarias hasta la parálisis.',
    sintomas: 'Parálisis en horas, muerte en 1–2 días.',
    velocidad: 'Media',
    translocacion: 'translaminar',
    estadios: ['larva', 'adulto'],
    espectro: 'Muy fuerte sobre trips y lepidópteros; buena sobre minadores. Nula sobre chupadores como áfidos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Aunque toca el mismo receptor que el grupo 4A, lo hace en un sitio de unión distinto, por eso IRAC les da números diferentes y no hay resistencia cruzada entre ambos. Es un punto fino que vale la pena manejar bien.',
    decision:
      'Es la elección cuando hay que aplicar en floración o dentro de un programa con control biológico: origen fermentativo y alta selectividad con benéficos.',
    precaucion:
      'Tóxico para abejas mientras la aspersión está húmeda; una vez seca es seguro. Aplicar al atardecer.',
  },
  'IRAC:6': {
    nombre: 'Avermectinas y milbemicinas',
    proceso: 'Sistema nervioso · Canales de cloro',
    sitioAccion: 'Canales de cloro dependientes de glutamato (GluCl) en neuronas y músculo',
    mecanismo:
      'Mantiene abiertos los canales de cloro. La entrada masiva de cloro hiperpolariza la membrana, es decir, la deja tan cargada negativamente que ya no puede generar un impulso nervioso: la neurona queda apagada.',
    sintomas: 'Parálisis flácida. El insecto deja de alimentarse en horas pero puede tardar 2–4 días en morir.',
    velocidad: 'Lenta en mortalidad, rápida en cese de daño',
    translocacion: 'translaminar',
    estadios: ['larva', 'adulto'],
    espectro: 'Referente en ácaros, minadores y trips. Emamectina destaca en lepidópteros.',
    riesgo: 'Medio',
    rotacionMotivo:
      'El productor suele juzgarlo por la mortalidad visible y repite la aplicación pensando que falló, cuando en realidad la plaga ya dejó de comer. Esa sobreaplicación es la que acelera la resistencia en ácaros.',
    decision:
      'Se elige cuando la plaga está protegida: dentro de la galería del minador, en el envés de la hoja o en el cogollo. La translaminaridad es justo lo que la alcanza.',
    precaucion: 'Muy tóxico para ácaros depredadores y abejas en aspersión fresca.',
  },
  'IRAC:7C': {
    nombre: 'Mímicos de hormona juvenil',
    proceso: 'Regulación del crecimiento',
    sitioAccion: 'Vía de señalización de la hormona juvenil (receptor Met / factor Kr-h1)',
    mecanismo:
      'La hormona juvenil mantiene al insecto en estado inmaduro; para pasar a adulto, sus niveles deben caer. El producto imita esa hormona y la mantiene artificialmente alta, así que el insecto nunca completa la transformación a adulto fértil.',
    sintomas: 'Los huevos no eclosionan; las ninfas mueren al mudar o llegan a adultos deformes y estériles.',
    velocidad: 'Lenta (se mide en generaciones, no en días)',
    translocacion: 'contacto',
    estadios: ['huevo', 'larva', 'pupa'],
    espectro: 'Estados inmaduros de mosca blanca, escamas, trips y algunos lepidópteros. No mata adultos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Al no matar adultos, no genera la presión de selección brusca de un insecticida de choque, y su sitio de acción es exclusivo. Por eso es una de las mejores piezas de rotación disponibles.',
    decision:
      'Se elige para romper el ciclo poblacional, no para apagar un incendio. Si ya hay adultos volando y daño severo, este producto solo no resuelve: hay que combinarlo o preceder con un adulticida.',
    precaucion: 'Muy selectivo con benéficos adultos, compatible con programas MIPE.',
  },
  'IRAC:15': {
    nombre: 'Benzoilureas (inhibidores de síntesis de quitina, tipo 0)',
    proceso: 'Regulación del crecimiento · Quitina',
    sitioAccion: 'Enzima quitín-sintasa del epitelio cuticular',
    mecanismo:
      'El exoesqueleto del insecto es quitina y hay que fabricarlo de nuevo en cada muda. El producto bloquea la enzima que la sintetiza, así que la larva llega a la muda sin poder construir cutícula nueva y muere atrapada o se rompe.',
    sintomas: 'Muerte durante la muda, con cutícula incompleta o rota.',
    velocidad: 'Lenta (depende de cuándo mude la larva)',
    translocacion: 'contacto',
    estadios: ['huevo', 'larva'],
    espectro: 'Larvas de lepidóptero y coleóptero. Sin efecto sobre adultos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Sitio de acción exclusivo, sin resistencia cruzada conocida con los grupos neurotóxicos. Excelente para intercalar entre aplicaciones de grupos 3A o 4A.',
    decision:
      'Solo tiene sentido con larvas pequeñas y en crecimiento activo. Aplicado sobre larvas de último instar que ya no van a mudar, no hace nada.',
    precaucion: 'Selectivo con benéficos adultos; puede afectar inmaduros de depredadores.',
  },
  'IRAC:22A': {
    nombre: 'Oxadiazinas',
    proceso: 'Sistema nervioso · Canal de sodio (bloqueo)',
    sitioAccion: 'Canal de sodio dependiente de voltaje, sitio de bloqueo distinto al de los piretroides',
    mecanismo:
      'Es un proinsecticida: la enzima del propio insecto lo convierte en su forma activa. Esa forma bloquea el canal de sodio en posición cerrada, es decir, hace lo contrario del piretroide: en vez de dejarlo abierto, lo clausura y apaga la conducción nerviosa.',
    sintomas: 'Cesa la alimentación en horas, parálisis y muerte en 1–2 días.',
    velocidad: 'Media',
    translocacion: 'translaminar',
    estadios: ['larva', 'adulto'],
    espectro: 'Lepidópteros, especialmente los que se desplazan sobre el follaje. Actividad sobre coleópteros.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Aunque toca el mismo canal de sodio que los piretroides, lo hace en otro sitio y por otro mecanismo, así que IRAC lo separa: no hay resistencia cruzada con el grupo 3A. Es la salida cuando los piretroides ya fallan.',
    decision:
      'Es la respuesta a un historial de fallas con piretroides en lepidópteros, manteniendo un espectro parecido.',
    precaucion: 'Selectividad moderada con benéficos; menos agresivo que un piretroide.',
  },
  'IRAC:28': {
    nombre: 'Diamidas antranílicas',
    proceso: 'Sistema muscular · Receptor de rianodina',
    sitioAccion: 'Receptor de rianodina (RyR) del retículo sarcoplásmico del músculo',
    mecanismo:
      'El músculo se contrae cuando libera calcio de su almacén interno y se relaja cuando lo recupera. La diamida abre ese almacén de forma permanente: el calcio sale sin control, el músculo queda contraído y ya no puede relajarse.',
    sintomas: 'Parálisis muscular casi inmediata, la larva deja de moverse y de comer en horas.',
    velocidad: 'Rápida en cese de daño',
    translocacion: 'translaminar',
    estadios: ['huevo', 'larva'],
    espectro: 'Muy potente y específico sobre lepidópteros; actividad sobre coleópteros.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Sitio de acción exclusivo en el músculo, no en el sistema nervioso, así que no comparte resistencia con ningún grupo neurotóxico. Es la pieza moderna clave de rotación en lepidópteros, y justo por eso hay que cuidarla: ya hay resistencia reportada en Asia por sobreuso.',
    decision:
      'Se elige cuando se necesita alta eficacia sobre lepidópteros con mínimo impacto sobre benéficos y polinizadores, o cuando el programa exige un producto de bajo riesgo toxicológico cerca de cosecha.',
    precaucion: 'De los grupos más selectivos con fauna benéfica y abejas.',
  },

  // ═══════════════ HERBICIDAS (HRAC) ═══════════════
  'HRAC:1': {
    nombre: 'Inhibidores de la ACCasa',
    legado: 'Grupo A',
    proceso: 'Síntesis de lípidos',
    sitioAccion: 'Acetil-CoA carboxilasa (ACCasa), primer paso de la síntesis de ácidos grasos',
    mecanismo:
      'Sin ácidos grasos no hay membranas celulares nuevas. Los tejidos que más rápido se dividen, los meristemos, son los primeros que se quedan sin material para construir células.',
    sintomas: 'El cogollo de la gramínea se necrosa y se desprende al halarlo. Hojas nuevas cloróticas o rojizas.',
    velocidad: 'Lenta (1–2 semanas)',
    translocacion: 'floema',
    espectro: 'Solo gramíneas. La hoja ancha es naturalmente insensible.',
    riesgo: 'Medio',
    rotacionMotivo:
      'La selectividad no viene del metabolismo del cultivo sino de que la ACCasa de la hoja ancha tiene una estructura distinta que el herbicida no reconoce. Como es un sitio único, basta una mutación puntual en la gramínea para perder el control.',
    decision:
      'Es la herramienta para sacar gramíneas de un cultivo de hoja ancha sin dañarlo. Requiere maleza en crecimiento activo: sobre gramínea estresada por sequía, transloca mal.',
    precaucion: 'No aplicar sobre cultivos gramíneos: no hay selectividad posible.',
  },
  'HRAC:2': {
    nombre: 'Inhibidores de la ALS / AHAS',
    legado: 'Grupo B',
    proceso: 'Síntesis de aminoácidos ramificados',
    sitioAccion: 'Acetolactato sintasa (ALS/AHAS)',
    mecanismo:
      'Bloquea la primera enzima de la ruta que fabrica valina, leucina e isoleucina. Sin esos aminoácidos la planta no puede sintetizar proteínas nuevas y la división celular se detiene.',
    sintomas: 'La maleza se queda quieta a los pocos días (deja de crecer), luego clorosis, enrojecimiento y muerte lenta.',
    velocidad: 'Lenta (1–3 semanas)',
    translocacion: 'floema',
    espectro: 'Amplio: hoja ancha, ciperáceas y algunas gramíneas según la molécula.',
    riesgo: 'Alto',
    rotacionMotivo:
      'Es el grupo con más casos de resistencia documentados en el mundo. Actúa en dosis de gramos por hectárea sobre un sitio único, y la mutación que confiere resistencia no le cuesta nada a la planta en aptitud, así que se fija muy rápido en la población.',
    decision:
      'Se elige por potencia a dosis mínimas y amplitud de espectro, pero es el grupo que más disciplina de rotación exige. Nunca dos aplicaciones seguidas en el mismo lote.',
    precaucion:
      'Residualidad en suelo que puede afectar el cultivo siguiente. Verificar el periodo de espera antes de rotar el lote.',
  },
  'HRAC:4': {
    nombre: 'Auxinas sintéticas',
    legado: 'Grupo O',
    proceso: 'Señalización hormonal',
    sitioAccion: 'Receptores de auxina (TIR1/AFB) y desregulación de la señalización hormonal',
    mecanismo:
      'La auxina es la hormona que ordena el crecimiento. Una dosis sintética masiva desordena por completo ese mensaje: la planta crece de forma descontrolada, dispara etileno y ácido abscísico, y el floema colapsa.',
    sintomas: 'Epinastia: tallos y peciolos retorcidos en espiral, hojas acopadas, tallo agrietado. Muy característico.',
    velocidad: 'Síntoma en horas, muerte en 1–4 semanas',
    translocacion: 'floema',
    espectro: 'Hoja ancha herbácea y, según la molécula, leñosas y arbustivas.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Actúa sobre varios receptores y procesos a la vez, no sobre una sola enzima, y por eso la resistencia ha sido lenta en aparecer pese a más de 70 años de uso. Sigue siendo de los grupos más robustos.',
    decision:
      'Es el estándar de potreros porque respeta la gramínea forrajera y llega por floema hasta la raíz del rebrote leñoso. Exige maleza en crecimiento activo.',
    precaucion:
      'Deriva: cultivos de hoja ancha vecinos son extremadamente sensibles. El picloram además tiene residualidad prolongada en suelo.',
  },
  'HRAC:5': {
    nombre: 'Inhibidores del fotosistema II (sitio A)',
    legado: 'Grupo C1',
    proceso: 'Fotosíntesis',
    sitioAccion: 'Proteína D1 del fotosistema II, sitio de unión de la plastoquinona',
    mecanismo:
      'Se pega a la proteína D1 y corta el transporte de electrones. La energía que capta la clorofila ya no tiene a dónde ir, así que se disipa formando radicales libres que oxidan y revientan las membranas.',
    sintomas: 'Clorosis internerval que avanza a necrosis; el daño se acelera con sol fuerte.',
    velocidad: 'Días',
    translocacion: 'residual',
    espectro: 'Hoja ancha y gramíneas pequeñas, principalmente desde el suelo.',
    riesgo: 'Medio',
    rotacionMotivo:
      'La mutación clásica en la proteína D1 (Ser264Gly) confiere resistencia y está muy extendida en malezas de maíz y caña por décadas de uso continuo del mismo grupo.',
    decision:
      'Se elige por su residualidad: mantiene el lote limpio durante las primeras semanas críticas del cultivo. Necesita humedad de suelo para activarse.',
    precaucion: 'Residualidad que puede afectar cultivos sensibles en rotación. Riesgo de lixiviación en suelos arenosos.',
  },
  'HRAC:6': {
    nombre: 'Inhibidores del fotosistema II (sitio B)',
    legado: 'Grupo C3',
    proceso: 'Fotosíntesis',
    sitioAccion: 'Proteína D1 del fotosistema II, sitio de unión diferente al del grupo 5',
    mecanismo:
      'Bloquea el mismo transporte de electrones que las triazinas, pero uniéndose en otro punto de la misma proteína. Esa diferencia hace que una maleza resistente a triazinas pueda seguir siendo sensible a este grupo.',
    sintomas: 'Secado del tejido tratado en 2–5 días, sin translocación.',
    velocidad: 'Rápida (días)',
    translocacion: 'contacto',
    espectro: 'Hoja ancha y ciperáceas en postemergencia.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Comparte proteína blanco con el grupo 5 pero no siempre comparte resistencia, precisamente porque el sitio de unión es distinto. HRAC los numera aparte por esa razón.',
    decision:
      'Es la opción de contacto en arroz y maíz cuando se necesita control de hoja ancha y coquito sin residualidad de suelo.',
    precaucion: 'Al ser de contacto, la cobertura determina el resultado.',
  },
  'HRAC:9': {
    nombre: 'Inhibidores de la EPSPS',
    legado: 'Grupo G',
    proceso: 'Síntesis de aminoácidos aromáticos',
    sitioAccion: 'Enzima EPSP sintasa de la ruta del ácido shikímico',
    mecanismo:
      'Bloquea la ruta del shikimato, que fabrica fenilalanina, tirosina y triptófano. Esa ruta solo existe en plantas y microorganismos, no en animales, lo que explica su perfil toxicológico. Sin esos aminoácidos no hay proteínas ni metabolitos de defensa.',
    sintomas: 'Amarillamiento lento y progresivo desde los puntos de crecimiento; muerte total incluyendo órganos subterráneos.',
    velocidad: 'Lenta (1–3 semanas)',
    translocacion: 'floema',
    espectro: 'No selectivo: toda planta verde. Es el estándar para perennes con rizoma.',
    riesgo: 'Alto',
    rotacionMotivo:
      'Décadas de uso casi exclusivo lo convirtieron en el herbicida con más malezas resistentes del mundo. La resistencia aparece por amplificación del gen o por mutación del sitio, y una vez instalada en el lote es muy difícil revertirla.',
    decision:
      'Es insustituible para perennes: por floema llega a rizomas y estolones donde ningún herbicida de contacto alcanza. A cambio, exige alternar deliberadamente con el grupo 10 para no quemar la herramienta.',
    precaucion:
      'Antagonismo con agua dura: el calcio y el magnesio lo secuestran. Acondicionar el agua mejora mucho el resultado.',
  },
  'HRAC:10': {
    nombre: 'Inhibidores de la glutamina sintetasa',
    legado: 'Grupo H',
    proceso: 'Metabolismo del nitrógeno',
    sitioAccion: 'Enzima glutamina sintetasa',
    mecanismo:
      'La planta produce amonio constantemente en su metabolismo normal y lo recicla con la glutamina sintetasa. Al bloquear esa enzima, el amonio se acumula hasta niveles tóxicos, colapsa el pH celular y destruye las membranas.',
    sintomas: 'Secado tipo quemado en 2–4 días, muy visible.',
    velocidad: 'Rápida (2–4 días)',
    translocacion: 'contacto',
    espectro: 'No selectivo, amplio, mejor sobre maleza joven.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Es la alternativa práctica al glifosato en lotes con malezas resistentes al grupo 9. Justamente por eso conviene no quemarla también: rotar entre 9 y 10 en lugar de reemplazar uno por el otro de forma permanente.',
    decision:
      'Se elige cuando hace falta un secado rápido y visible, o cuando el lote ya tiene resistencia a glifosato. No espere control de rizomas: es de contacto.',
    precaucion:
      'Depende mucho de la luz y la humedad relativa alta para funcionar bien. Requiere volumen de agua suficiente para cobertura completa.',
  },
  'HRAC:14': {
    nombre: 'Inhibidores de la PPO',
    legado: 'Grupo E',
    proceso: 'Síntesis de clorofila',
    sitioAccion: 'Enzima protoporfirinógeno oxidasa (PPO)',
    mecanismo:
      'Al bloquear la PPO se acumula protoporfirinógeno IX, que en presencia de luz genera oxígeno singlete, una forma de oxígeno extremadamente reactiva que rompe las membranas celulares al instante.',
    sintomas: 'Necrosis en horas: es el modo de acción más rápido de todos, con aspecto de quemadura.',
    velocidad: 'Muy rápida (horas)',
    translocacion: 'contacto',
    espectro: 'Hoja ancha principalmente, ciperáceas y gramíneas pequeñas.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'La resistencia existe pero es poco frecuente porque la mutación en la PPO tiene un costo alto para la planta. Buena pieza de rotación frente a los grupos 2 y 9.',
    decision:
      'Se elige cuando se necesita un resultado inmediato y visible, o como socio residual en preemergencia. Al ser de contacto y depender de la luz, la calidad de la aplicación decide el resultado.',
    precaucion: 'Sin sistemia: la maleza rebrota si solo se quema la parte aérea de una perenne.',
  },
  'HRAC:27': {
    nombre: 'Inhibidores de la HPPD',
    legado: 'Grupo F2',
    proceso: 'Síntesis de carotenoides',
    sitioAccion: 'Enzima 4-hidroxifenilpiruvato dioxigenasa (HPPD)',
    mecanismo:
      'Los carotenoides son el escudo que protege a la clorofila de la propia luz. Sin HPPD no hay carotenoides, y la clorofila se destruye por fotooxidación en cuanto le da el sol.',
    sintomas: 'Blanqueamiento (bleaching) de las hojas nuevas, que salen blancas antes de necrosarse. Inconfundible.',
    velocidad: 'Días',
    translocacion: 'xilema',
    espectro: 'Hoja ancha, algunas gramíneas y ciperáceas.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Modo de acción relativamente moderno y con pocos casos de resistencia, lo que lo hace valioso para romper ciclos de grupos 2 y 5 en caña y maíz.',
    decision:
      'Su síntoma de blanqueamiento sirve como verificación de campo: si no aparece, hubo problema de cobertura o de dosis. Pocos herbicidas dan esa retroalimentación tan clara.',
    precaucion: 'Puede causar blanqueamiento transitorio en el cultivo si hay solapamiento de franjas.',
  },

  // ═══════════════ FUNGICIDAS (FRAC) ═══════════════
  'FRAC:1': {
    nombre: 'Benzimidazoles (MBC)',
    proceso: 'División celular',
    sitioAccion: 'Beta-tubulina durante la mitosis',
    mecanismo:
      'La tubulina forma el huso mitótico, el andamio que reparte los cromosomas al dividirse la célula. Sin él, el hongo no puede completar la mitosis ni crecer.',
    sintomas: 'Detiene la germinación de esporas y el avance del micelio.',
    accion: ['Preventivo', 'Curativo temprano'],
    velocidad: 'Media',
    translocacion: 'xilema',
    objetivo: 'hongos',
    espectro: 'Hongos verdaderos: ascomicetos principalmente. Sin efecto sobre oomicetos.',
    riesgo: 'Alto',
    rotacionMotivo:
      'Una sola mutación puntual en el gen de la beta-tubulina (posición 198 o 200) confiere resistencia total y de golpe, no gradual. Por eso el producto pasa de funcionar bien a no funcionar en absoluto en pocas campañas.',
    decision:
      'Producto de bajo costo y buen espectro, pero hoy debe usarse mezclado con un multisitio y con un máximo de dos aplicaciones por ciclo.',
    precaucion: 'Verificar que la población del patógeno no tenga ya resistencia declarada en la zona.',
  },
  'FRAC:3': {
    nombre: 'DMI · Triazoles',
    proceso: 'Biosíntesis de esteroles',
    sitioAccion: 'Enzima C14-alfa-demetilasa (CYP51) de la ruta del ergosterol',
    mecanismo:
      'El ergosterol es a la membrana del hongo lo que el colesterol a la nuestra: le da fluidez y estabilidad. Al bloquear su síntesis, la membrana queda defectuosa y el hongo no puede seguir creciendo.',
    sintomas: 'Detiene infecciones ya iniciadas antes de que se vean síntomas.',
    accion: ['Preventivo', 'Curativo'],
    velocidad: 'Media',
    translocacion: 'xilema',
    objetivo: 'hongos',
    espectro: 'Muy amplio en hongos verdaderos: royas, manchas, Sigatoka, oídios. Nulo sobre oomicetos, que no tienen ergosterol.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Su resistencia es poligénica y gradual: no se pierde el control de un día para otro, sino que hay que ir subiendo la dosis hasta que deja de ser rentable. Esa erosión lenta es traicionera porque se nota tarde.',
    decision:
      'Es la columna curativa de casi todo programa foliar: la única familia amplia que detiene una infección ya establecida. Limitar a 2–3 aplicaciones por ciclo y siempre alternando.',
    precaucion: 'Algunos triazoles tienen efecto regulador de crecimiento y pueden acortar entrenudos si se sobredosifica.',
  },
  'FRAC:7': {
    nombre: 'SDHI · Carboxamidas',
    proceso: 'Respiración',
    sitioAccion: 'Complejo II (succinato deshidrogenasa) de la cadena respiratoria mitocondrial',
    mecanismo:
      'Bloquea el Complejo II, un eslabón de la cadena que produce la energía del hongo. Sin ATP no hay germinación, ni crecimiento, ni esporulación.',
    sintomas: 'Frena germinación y crecimiento del micelio.',
    accion: ['Preventivo', 'Curativo'],
    velocidad: 'Media',
    translocacion: 'translaminar',
    objetivo: 'hongos',
    espectro: 'Amplio en hongos verdaderos, muy fuerte en Botrytis y manchas foliares.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Ataca la respiración igual que las estrobilurinas pero en un complejo distinto de la cadena, por eso no hay resistencia cruzada entre 7 y 11 y funcionan bien juntos en mezcla.',
    decision:
      'Se elige por su fuerza sobre Botrytis y manchas, casi siempre formulado con una estrobilurina para blindar ambos frentes de la respiración.',
    precaucion: 'Ya hay resistencia documentada en Botrytis por uso repetido. No usar en solitario.',
  },
  'FRAC:11': {
    nombre: 'QoI · Estrobilurinas',
    proceso: 'Respiración',
    sitioAccion: 'Complejo III, sitio Qo del citocromo bc1',
    mecanismo:
      'Bloquea el punto exacto donde el Complejo III recibe electrones. La producción de ATP se corta y el hongo se queda sin energía justo cuando más la necesita: al germinar la espora.',
    sintomas: 'Impide la germinación de esporas y frena fuertemente la esporulación.',
    accion: ['Preventivo', 'Antiesporulante'],
    velocidad: 'Media',
    translocacion: 'translaminar',
    objetivo: 'ambos',
    espectro:
      'Amplio: hongos verdaderos y, a diferencia de triazoles y benzimidazoles, también actividad sobre algunos oomicetos.',
    riesgo: 'Alto',
    rotacionMotivo:
      'La mutación G143A en el citocromo b confiere resistencia total de una sola vez, y se ha extendido en muchos patógenos por todo el mundo. Es el ejemplo de libro de resistencia monogénica: el producto funciona o no funciona, sin término medio.',
    decision:
      'Su fuerza está en lo preventivo: aplicado antes del inóculo es excelente, pero como curativo en solitario es débil. Por eso el mercado casi solo lo vende mezclado con un triazol.',
    precaucion: 'Nunca aplicar en solitario más de una vez seguida. Verificar historial de resistencia en la zona.',
  },
  'FRAC:28': {
    nombre: 'Carbamatos (propamocarb)',
    proceso: 'Síntesis de membranas',
    sitioAccion: 'Síntesis de fosfolípidos y permeabilidad de membrana',
    mecanismo:
      'Interfiere con la construcción de las membranas del oomiceto y con su permeabilidad, frenando la germinación de zoosporas y el crecimiento del micelio.',
    sintomas: 'Frena el avance del patógeno en raíz y cuello.',
    accion: ['Preventivo', 'Curativo temprano'],
    velocidad: 'Media',
    translocacion: 'xilema',
    objetivo: 'oomicetos',
    espectro: 'Específico de oomicetos: Pythium, Phytophthora y mildeos vellosos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Se usa sobre todo en drench y tratamiento de suelo, donde la presión de selección es menor que en aplicaciones foliares repetidas.',
    decision: 'Elección típica para damping off y pudriciones de raíz en semillero y trasplante.',
    precaucion: 'Verificar compatibilidad si se aplica junto con fertilizantes en drench.',
  },
  'FRAC:33': {
    nombre: 'Fosfonatos (fosetil aluminio)',
    proceso: 'Doble: acción directa e inducción de defensas',
    sitioAccion: 'Acción multisitio débil sobre el patógeno más activación de las defensas de la planta',
    mecanismo:
      'Tiene un efecto tóxico directo modesto, pero su verdadera fuerza es activar el sistema inmune de la planta: induce la producción de fitoalexinas y proteínas de defensa que frenan al oomiceto.',
    sintomas: 'Detiene el avance del patógeno, sobre todo en raíz y cuello.',
    accion: ['Preventivo', 'Curativo temprano'],
    velocidad: 'Media',
    translocacion: 'ambimobil',
    objetivo: 'oomicetos',
    espectro: 'Oomicetos: Phytophthora, Pythium, mildeos vellosos.',
    riesgo: 'Bajo',
    rotacionMotivo:
      'Como parte de su efecto depende de la respuesta de la planta y no solo de un sitio bioquímico del patógeno, la resistencia es muy poco frecuente pese a décadas de uso.',
    decision:
      'Es de los poquísimos productos verdaderamente ambimóviles: se asperja la hoja y baja hasta la raíz. Esa propiedad lo hace insustituible en pudriciones radiculares donde el drench no es viable.',
    precaucion: 'Puede ser fitotóxico mezclado con productos de reacción ácida o con cobre.',
  },
  'FRAC:43': {
    nombre: 'Benzamidas (fluopicolide)',
    proceso: 'Citoesqueleto celular',
    sitioAccion: 'Proteínas del citoesqueleto (deslocalización de espectrina)',
    mecanismo:
      'Desorganiza el esqueleto interno de la célula del oomiceto. Sin esa estructura, la célula pierde forma y función en minutos.',
    sintomas: 'Efecto muy rápido sobre zoosporas móviles.',
    accion: ['Preventivo', 'Curativo'],
    velocidad: 'Rápida',
    translocacion: 'xilema',
    objetivo: 'oomicetos',
    espectro: 'Oomicetos, con acción destacada sobre zoosporas.',
    riesgo: 'Medio',
    rotacionMotivo:
      'Sitio de acción novedoso y exclusivo, sin resistencia cruzada con fenilamidas ni con CAA. Por eso se formula con propamocarb: dos modos de acción distintos contra el mismo grupo de patógenos.',
    decision: 'Se elige cuando hay presión alta de oomicetos y se necesita cortar la fase de zoospora móvil.',
    precaucion: 'Usar siempre en mezcla o alternancia para proteger un modo de acción todavía nuevo.',
  },
  'FRAC:M03': {
    nombre: 'Ditiocarbamatos (multisitio)',
    proceso: 'Multisitio',
    sitioAccion: 'Múltiples enzimas con grupos sulfhidrilo (-SH) del metabolismo del hongo',
    mecanismo:
      'No tiene un blanco único: inactiva simultáneamente muchas enzimas distintas. El hongo tendría que mutar en varios genes a la vez para resistirlo, algo estadísticamente casi imposible.',
    sintomas: 'Barrera protectora que impide la germinación de la espora sobre la superficie.',
    accion: ['Preventivo'],
    velocidad: 'Inmediata como barrera',
    translocacion: 'contacto',
    objetivo: 'ambos',
    espectro: 'Muy amplio: hongos verdaderos y oomicetos.',
    riesgo: 'Nulo',
    rotacionMotivo:
      'Es el ancla de todo programa antirresistencia. No porque sea el más potente, sino porque nunca falla por resistencia y, mezclado con un producto de sitio único, reduce la presión de selección sobre ese socio.',
    decision:
      'Se aplica antes de que llegue el inóculo. No cura nada y no protege el tejido que crece después, así que el intervalo entre aplicaciones lo marca la tasa de crecimiento del cultivo y la lluvia.',
    precaucion: 'Requiere reaplicación tras lluvias fuertes. Cuidar el periodo de carencia.',
  },
  'FRAC:M05': {
    nombre: 'Cloronitrilos (multisitio)',
    proceso: 'Multisitio',
    sitioAccion: 'Múltiples enzimas del hongo por unión a grupos tiol',
    mecanismo:
      'Igual que los ditiocarbamatos, ataca muchos puntos del metabolismo a la vez, lo que hace prácticamente imposible la aparición de resistencia.',
    sintomas: 'Película protectora persistente sobre la superficie tratada.',
    accion: ['Preventivo'],
    velocidad: 'Inmediata como barrera',
    translocacion: 'contacto',
    objetivo: 'ambos',
    espectro: 'Amplio, con muy buena residualidad y resistencia al lavado.',
    riesgo: 'Nulo',
    rotacionMotivo:
      'Mismo papel que M03 en el programa: socio multisitio que protege la vida útil de los productos de sitio único.',
    decision: 'Se prefiere sobre otros multisitio cuando se necesita mayor persistencia bajo lluvia.',
    precaucion: 'Puede dejar residuo visible en fruto. Atención al periodo de carencia.',
  },
};

/* ────────────────────────────────────────────────────────────────
   AYUDAS DE CONSULTA
   ──────────────────────────────────────────────────────────────── */

/** Separa un grupo compuesto ("6 + 4A") en códigos individuales. */
function codigosDeGrupo(grupo) {
  if (!grupo) return [];
  return String(grupo)
    .split('+')
    .map((g) => g.trim().toUpperCase())
    .filter(Boolean);
}

/**
 * Grupo de rotación de un código.
 *
 * IRAC es explícito: la rotación debe basarse en el NÚMERO del grupo, no en la
 * letra de subgrupo. 3A y 3B comparten sitio de acción y por lo tanto comparten
 * resistencia cruzada. En FRAC los códigos multisitio (M03, M05) se conservan
 * completos porque identifican grupos químicos distintos.
 */
function grupoDeRotacion(sistema, codigo) {
  if (!codigo) return null;
  const c = String(codigo).trim().toUpperCase();
  if (c.startsWith('M') || c.startsWith('U') || c.startsWith('P')) return c;
  const numero = c.match(/^\d+/);
  return numero ? numero[0] : c;
}

/** Devuelve la ficha del grupo de modo de acción, si existe. */
function fichaGrupo(sistema, codigo) {
  if (!sistema || !codigo) return null;
  return GRUPOS_MOA[`${sistema}:${String(codigo).trim().toUpperCase()}`] || null;
}

/** Todas las fichas de grupo de un producto (una por cada código de la mezcla). */
function fichasDeProducto(producto) {
  if (!producto?.sistema) return [];
  return codigosDeGrupo(producto.grupo)
    .map((c) => ({ codigo: c, ficha: fichaGrupo(producto.sistema, c) }))
    .filter((x) => x.ficha);
}

// ══════════════════════════════════════════════════════════════════
// src/data/conocimiento.js
// ══════════════════════════════════════════════════════════════════

/**
 * Contenido de referencia del módulo "Aprender".
 *
 * Es la parte de la app que responde el "por qué" detrás de cada recomendación:
 * biología de arvenses, diferencia entre hongos y oomicetos, ciclo de vida de
 * los insectos y principios de manejo de resistencia.
 */

const TEMAS = [
  // ════════════════════════════════════════════════════════════
  {
    id: 'resistencia',
    titulo: 'Cómo se maneja la resistencia',
    resumen: 'El principio que gobierna todas las decisiones de la app',
    secciones: [
      {
        titulo: 'Rotar es cambiar de sitio de acción, no de marca',
        texto:
          'La resistencia aparece cuando una población recibe presión repetida sobre el mismo blanco bioquímico. Los individuos que por azar tienen una mutación en ese blanco sobreviven, se reproducen y en pocas generaciones dominan la población. Cambiar de nombre comercial o de familia química no cambia nada si el sitio de acción es el mismo.',
      },
      {
        titulo: 'El número del grupo manda; la letra no',
        texto:
          'IRAC es explícito: la rotación se planifica con el número del grupo, no con la letra del subgrupo. Un producto 3A y uno 3B tocan el mismo canal de sodio, así que rotar de uno a otro no rompe la presión de selección. Las letras solo distinguen familias químicas dentro del mismo sitio de acción. Esta app aplica esa regla al calcular la rotación.',
        destacado: true,
      },
      {
        titulo: 'Sitio único frente a multisitio',
        texto:
          'Un producto de sitio único ataca una sola enzima: es potente y selectivo, pero una mutación puntual basta para anularlo. Un multisitio golpea muchas enzimas a la vez, así que el patógeno tendría que mutar en varios genes simultáneamente, algo estadísticamente casi imposible. Por eso los multisitio (FRAC M03, M05) tienen riesgo prácticamente nulo y son el ancla de cualquier programa.',
      },
      {
        titulo: 'Resistencia monogénica frente a poligénica',
        texto:
          'Hay dos formas de perder un producto. La monogénica es de golpe: una sola mutación, como la G143A de las estrobilurinas, y el producto pasa de funcionar bien a no funcionar. La poligénica es una erosión lenta, como en los triazoles: hay que ir subiendo la dosis hasta que deja de ser rentable. La segunda es más traicionera porque se detecta tarde.',
      },
      {
        titulo: 'La ventana de generación',
        texto:
          'La regla práctica es no usar el mismo grupo en generaciones consecutivas de la plaga. En un insecto con generaciones de tres semanas, dos aplicaciones del mismo grupo separadas por un mes ya son presión sobre generaciones distintas y eso está bien; separadas por una semana, es presión sobre la misma cohorte y eso selecciona resistencia.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'translocacion',
    titulo: 'Cómo se mueve el producto en la planta',
    resumen: 'Determina dónde protege, qué alcanza y cómo hay que aplicarlo',
    secciones: [
      {
        titulo: 'La movilidad decide la técnica de aplicación',
        texto:
          'Saber si un producto es de contacto o sistémico no es un dato de catálogo: cambia el volumen de agua, la boquilla, el momento y la expectativa de resultado. Un producto de contacto mal cubierto simplemente no funciona; un sistémico aplicado sobre planta estresada tampoco, porque no transloca.',
      },
      {
        titulo: 'Contacto (no translocado)',
        texto:
          'Se queda donde cayó la gota. Exige cobertura total y volumen de agua suficiente. Todo el crecimiento posterior a la aplicación queda sin proteger, así que el intervalo entre aplicaciones lo marca qué tan rápido crece el cultivo. Ejemplos: mancozeb, chlorothalonil, piretroides, glufosinato, oxyfluorfen.',
      },
      {
        titulo: 'Translaminar (sistémico local)',
        texto:
          'Atraviesa el grosor de la hoja y forma un depósito interno, pero no viaja lejos. Es lo que permite alcanzar ácaros del envés asperjando por el haz, o llegar a un minador dentro de su galería. No protege hojas nuevas. Ejemplos: abamectina, spinosad, estrobilurinas, clorantraniliprol.',
      },
      {
        titulo: 'Xilema (acropetal, hacia arriba)',
        texto:
          'Sube con la corriente de transpiración, siempre hacia las puntas y hojas nuevas, nunca hacia abajo. Es la movilidad que permite tratar semilla o suelo y que la planta se proteja sola mientras crece. Como depende de la transpiración, una planta con estrés hídrico transloca mal. Ejemplos: neonicotinoides, triazoles, mesotrione.',
      },
      {
        titulo: 'Floema (basipetal, hacia abajo)',
        texto:
          'Viaja con los azúcares hacia los sumideros: raíces, rizomas, frutos y yemas. Es lo que permite matar el rizoma de una maleza perenne desde una aspersión foliar. Exige planta fotosintetizando activamente: sobre maleza agostada o cortada recientemente, el glifosato falla por esta razón. Ejemplos: glifosato, 2,4-D, picloram, clethodim.',
      },
      {
        titulo: 'Ambimóvil (xilema y floema)',
        texto:
          'Verdadero sistémico en ambos sentidos: protege desde la raíz hasta la punta sin importar dónde se aplique. Es una propiedad rara y valiosa. El fosetil aluminio es el ejemplo clásico: se asperja al follaje y llega a controlar patógenos de raíz.',
        destacado: true,
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'arvenses',
    titulo: 'Arvenses: biología y momento de control',
    resumen: 'Por qué el mismo herbicida funciona o falla según cuándo se aplique',
    secciones: [
      {
        titulo: 'Hoja ancha, gramíneas y ciperáceas',
        texto:
          'La primera decisión es botánica. Las de hoja ancha (dicotiledóneas) tienen nervadura ramificada, meristemo apical expuesto y responden a las auxinas sintéticas. Las gramíneas tienen nervadura paralela, meristemo protegido en la base y son insensibles a las auxinas, por eso el 2,4-D respeta el pasto. Las ciperáceas parecen gramíneas pero tienen tallo triangular y macizo, y muchas se reproducen por tubérculos, lo que las hace difíciles de erradicar con productos de contacto.',
      },
      {
        titulo: 'Anuales frente a perennes: la diferencia decisiva',
        texto:
          'Una anual completa su ciclo en una temporada y muere; controlarla antes de que semille rompe el ciclo. Una perenne sobrevive por rizomas, estolones o tubérculos, y ahí es donde un herbicida de contacto fracasa: quema la parte aérea y la planta rebrota en dos semanas. Para perennes se necesita movilidad por floema que baje hasta el órgano de reserva.',
        destacado: true,
      },
      {
        titulo: 'El banco de semillas',
        texto:
          'El suelo guarda semillas viables durante años y no germinan todas a la vez. Por eso un solo control postemergente nunca limpia un lote de forma definitiva: solo elimina la cohorte que ya nació. La combinación de un residual de suelo con un postemergente ataca las dos poblaciones, la presente y la que viene.',
      },
      {
        titulo: 'El periodo crítico de competencia',
        texto:
          'No hay que mantener el lote limpio todo el ciclo, sino durante la ventana en que la competencia realmente reduce el rendimiento, que en la mayoría de los cultivos anuales va de las 2 a las 6–8 semanas después de la emergencia. Una maleza que nace después del cierre del dosel compite poco. Esto define cuándo vale la pena gastar en control.',
      },
      {
        titulo: 'Tamaño de la maleza y translocación',
        texto:
          'La regla de campo: maleza pequeña y en crecimiento activo se controla con menos dosis y mejor resultado. Una maleza grande tiene más área foliar pero también cutícula más gruesa, menor proporción de tejido en crecimiento y a menudo estrés hídrico, lo que reduce la translocación justo cuando más se necesita.',
      },
      {
        titulo: 'Pre y postemergencia',
        texto:
          'Preemergente actúa sobre la semilla que germina y necesita humedad de suelo para activarse y un suelo bien preparado, sin terrones ni rastrojo que intercepten el producto. Postemergente actúa sobre la planta ya nacida y necesita cobertura y hoja receptiva. Aplicar un preemergente sin humedad prevista es tirar el producto.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'hongos',
    titulo: 'Hongos verdaderos y oomicetos',
    resumen: 'La distinción que más errores de recomendación evita',
    secciones: [
      {
        titulo: 'No son parientes',
        texto:
          'Los oomicetos parecen hongos y causan enfermedades parecidas, pero pertenecen a un linaje completamente distinto, más cercano a las algas pardas. Esa diferencia evolutiva tiene consecuencias prácticas directas sobre qué fungicida funciona.',
        destacado: true,
      },
      {
        titulo: 'Las tres diferencias que importan',
        texto:
          'Primera: la pared celular del hongo verdadero es de quitina, la del oomiceto es de celulosa. Segunda: la membrana del hongo contiene ergosterol, la del oomiceto no. Tercera: el oomiceto produce zoosporas móviles con flagelo que nadan en la película de agua del suelo o la hoja.',
      },
      {
        titulo: 'Por qué un triazol no controla Phytophthora',
        texto:
          'Los triazoles (FRAC 3) bloquean la síntesis de ergosterol. Si el oomiceto no tiene ergosterol en su membrana, el producto simplemente no tiene blanco. Lo mismo ocurre con los benzimidazoles. Es el error de recomendación más común y más caro en enfermedades de raíz.',
        destacado: true,
      },
      {
        titulo: 'Qué sí controla oomicetos',
        texto:
          'Los grupos específicos: FRAC 28 (propamocarb), FRAC 33 (fosetil aluminio), FRAC 43 (fluopicolide), FRAC 4 (fenilamidas) y FRAC 40 (CAA). Además, los multisitio M03 y M05 tienen actividad sobre ambos linajes, y las estrobilurinas (FRAC 11) tienen actividad parcial sobre algunos oomicetos.',
      },
      {
        titulo: 'La pista de campo: el agua',
        texto:
          'Los oomicetos necesitan agua libre para que naden sus zoosporas. Si el problema aparece tras riegos pesados, lluvias prolongadas, en las partes bajas del lote o en suelos con drenaje deficiente, y ataca cuello y raíz, la sospecha de oomiceto es alta. El manejo del agua es tan importante como el fungicida.',
      },
      {
        titulo: 'Preventivo, curativo y erradicante',
        texto:
          'Preventivo actúa antes de que la espora germine y debe estar puesto antes del inóculo. Curativo detiene una infección ya iniciada pero todavía sin síntomas visibles. Erradicante actúa sobre lesiones ya establecidas y esporulando. La mayoría de fungicidas son buenos preventivos y regulares curativos; casi ninguno es un buen erradicante, y esa es la razón por la que un programa se construye hacia adelante y no a la reacción.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'insectos',
    titulo: 'Ciclo de vida y momento de control',
    resumen: 'Cada producto pega en una parte distinta del ciclo',
    secciones: [
      {
        titulo: 'Metamorfosis completa e incompleta',
        texto:
          'Los lepidópteros y coleópteros tienen metamorfosis completa: huevo, larva, pupa y adulto, y la larva es la que come y hace el daño. Los chupadores como áfidos, mosca blanca y trips tienen metamorfosis incompleta: la ninfa se parece al adulto y ambos dañan. Esto define a qué estadio hay que apuntar.',
      },
      {
        titulo: 'El estadio larval decide el resultado',
        texto:
          'Las larvas pequeñas (primeros instares) son mucho más sensibles y están más expuestas. Las de últimos instares tienen cutícula más gruesa, comen más pero mueren menos, y muchas se han refugiado dentro del fruto, el cogollo o el tallo, donde ningún contacto llega. El monitoreo existe justamente para no perder esa ventana.',
        destacado: true,
      },
      {
        titulo: 'Productos que no matan adultos',
        texto:
          'Los reguladores de crecimiento (IRAC 7C) y los inhibidores de quitina (IRAC 15) actúan sobre huevos y estados inmaduros. Aplicarlos con la población adulta ya volando da la sensación de que fallaron, cuando en realidad están cortando la generación siguiente. Son productos de estrategia, no de emergencia.',
      },
      {
        titulo: 'Por qué los huevos son el eslabón más barato',
        texto:
          'Un ovicida o un regulador aplicado sobre la postura evita toda una generación de daño con una sola intervención. Es la aplicación más eficiente del ciclo, pero exige monitoreo: hay que estar viendo posturas, no daño.',
      },
      {
        titulo: 'Chupadores y transmisión de virus',
        texto:
          'Con vectores de virus el objetivo no es solo matar el insecto sino cortar la alimentación rápido, antes de que inocule. Por eso en mosca blanca y áfidos vectores se prefieren productos sistémicos que actúan al alimentarse y tienen efecto antifeeding, y por eso la protección desde la semilla o el suelo tiene tanto sentido en las primeras semanas del cultivo.',
      },
      {
        titulo: 'Umbral de acción',
        texto:
          'Aplicar por calendario es la vía más rápida a la resistencia y al gasto innecesario. El umbral de acción es la densidad de plaga a partir de la cual el daño esperado supera el costo del control. Por debajo de ese umbral, la mejor decisión agronómica es no aplicar y dejar trabajar a los benéficos.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'etiqueta',
    titulo: 'Leer la etiqueta ICA',
    resumen: 'El único documento que manda sobre la aplicación',
    secciones: [
      {
        titulo: 'La etiqueta es ley, no sugerencia',
        texto:
          'En Colombia la etiqueta aprobada por el ICA es el documento legal del producto. Lo que dice sobre cultivo, dosis, plaga blanco y periodos define el uso autorizado. Aplicar en un cultivo no registrado es un uso por fuera de etiqueta, con consecuencias en certificación, exportación y responsabilidad legal si hay daño.',
        destacado: true,
      },
      {
        titulo: 'Cultivo y plaga registrados',
        texto:
          'Un producto puede ser técnicamente eficaz contra una plaga y aun así no estar registrado para ese cultivo. Esta app le dice qué modo de acción encaja agronómicamente; la etiqueta le dice si puede usarlo ahí. Son dos preguntas distintas y ambas tienen que dar sí.',
      },
      {
        titulo: 'Periodo de carencia (PC)',
        texto:
          'Días que deben pasar entre la última aplicación y la cosecha para que el residuo quede por debajo del límite máximo permitido. Es la variable que más se pasa por alto cerca de cosecha y la que más rechazos genera en exportación. Si faltan menos días que el PC, ese producto queda descartado por más que sea el mejor técnicamente.',
        destacado: true,
      },
      {
        titulo: 'Periodo de reentrada (PR)',
        texto:
          'Horas que deben pasar antes de que alguien vuelva a entrar al lote sin equipo de protección. Protege al trabajador, no al cultivo, y hay que planificarlo junto con las labores de campo: no sirve aplicar en la mañana si en la tarde entra la cuadrilla a cosechar.',
      },
      {
        titulo: 'Categoría toxicológica',
        texto:
          'Va de I a IV, de mayor a menor peligrosidad, con banda de color en el empaque: roja para I y II, amarilla para III y verde o azul para IV. Determina el equipo de protección obligatorio y las restricciones de manejo. A igual eficacia, escoger la categoría menos tóxica es una mejor decisión agronómica y comercial.',
      },
      {
        titulo: 'Lo que la app deliberadamente no trae',
        texto:
          'Esta herramienta no incluye dosis ni cultivos registrados, y eso es una decisión de diseño, no una carencia. Los registros cambian, varían por formulación y equivocarse ahí tiene consecuencias reales. La app le ayuda a elegir el modo de acción correcto; el número final lo pone la etiqueta que tiene en la mano.',
        destacado: true,
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'umbrales',
    titulo: 'Monitoreo y umbrales',
    resumen: 'Cuándo vale la pena aplicar y cuándo no',
    secciones: [
      {
        titulo: 'La decisión más rentable suele ser no aplicar',
        texto:
          'Aplicar por calendario garantiza gasto, presión de selección y daño a los benéficos, sin garantizar beneficio. El umbral de acción es la densidad de plaga a partir de la cual el daño esperado supera el costo del control. Por debajo de ese punto, la mejor decisión es monitorear y dejar trabajar al control biológico.',
        destacado: true,
      },
      {
        titulo: 'Umbral económico y nivel de daño',
        texto:
          'El nivel de daño económico es la densidad a la que la pérdida iguala el costo de controlarla. El umbral de acción se fija por debajo, porque hay que aplicar antes de llegar ahí para alcanzar a evitar el daño. Esa diferencia es el margen de reacción y depende de qué tan rápido crezca la población.',
      },
      {
        titulo: 'Muestreo que sirve',
        texto:
          'Recorrer el lote en zigzag o en equis, no solo por los bordes ni siempre en el mismo sitio. Revisar un número fijo de plantas por punto para poder comparar entre fechas. Contar la plaga y también los benéficos: una relación alta de depredadores puede justificar esperar. Anotar siempre, porque la tendencia entre dos fechas informa más que un solo conteo.',
      },
      {
        titulo: 'Distinguir daño viejo de daño activo',
        texto:
          'Una hoja perforada es evidencia de que hubo una larva, no de que siga ahí. Aplicar por daño acumulado es el error más común: se trata una plaga que ya pasó. Lo que decide es la presencia de individuos vivos y de daño fresco en el tejido nuevo.',
        destacado: true,
      },
      {
        titulo: 'La etapa del cultivo cambia el umbral',
        texto:
          'La misma densidad de plaga tolera distinto según el momento. Un cultivo en desarrollo vegetativo compensa defoliación que en floración o llenado sería irreversible. Y una plaga que ataca directamente el órgano cosechado tiene umbral mucho más bajo que una que solo come hoja.',
      },
      {
        titulo: 'Evaluar después de aplicar',
        texto:
          'Volver al lote a los pocos días con el mismo método de muestreo es lo que permite saber si funcionó, y lo que distingue una falla de producto de una falla de aplicación o de un producto de acción lenta. Sin esa evaluación no hay forma de aprender del ciclo ni de detectar resistencia a tiempo.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'estres',
    titulo: 'Reconocer el estrés en campo',
    resumen: 'Qué estoy viendo y si de verdad hay que aplicar algo',
    secciones: [
      {
        titulo: 'La pregunta antes de escoger producto',
        texto:
          'Toda la app sirve para elegir bien el modo de acción, pero eso solo importa si el diagnóstico es correcto. Una hoja amarilla puede ser plaga, enfermedad, deficiencia nutricional, exceso de agua o fitotoxicidad de la aplicación anterior. Cuatro de esas cinco causas no se resuelven con un plaguicida, y en una de ellas aplicar empeora el cuadro.',
        destacado: true,
      },
      {
        titulo: 'El patrón en el lote decide antes que el síntoma en la hoja',
        texto:
          'Lo vivo se reproduce y se mueve, así que deja focos que se expanden desde un punto y bordes de avance. Lo abiótico afecta a todas las plantas expuestas a la misma condición, así que aparece uniforme o siguiendo la topografía, el tipo de suelo o la trayectoria del aspersor. Antes de bajarse a mirar la hoja, conviene mirar el lote completo.',
        destacado: true,
      },
      {
        titulo: 'Estrés hídrico por déficit y por exceso',
        texto:
          'El déficit da marchitez que se recupera en la noche, hojas más pequeñas y cierre estomático que frena la fotosíntesis. El exceso da un amarillamiento parecido pero con raíz oscura y olor a fermentado, porque la raíz se asfixia. Se distinguen sacando una planta: el diagnóstico está abajo, no arriba.',
      },
      {
        titulo: 'Estrés térmico',
        texto:
          'El calor alto cierra estomas y detiene la fotosíntesis aunque haya agua disponible, y sobre floración causa aborto de flor y polen inviable. El frío frena la absorción de fósforo y da tonos morados en hojas viejas. En ambos casos la planta no está enferma: está gastando energía en defenderse.',
      },
      {
        titulo: 'Fitotoxicidad: el daño que uno mismo causó',
        texto:
          'Se reconoce porque es uniforme dentro de la franja tratada, respeta el borde no asperjado, aparece uno o dos días después de aplicar y suele quemar bordes y puntas. Las causas típicas son sobredosis, mezcla incompatible, aplicar a mediodía con calor, agua muy alcalina o solapamiento de franjas. La respuesta es corregir la práctica, no aplicar algo encima.',
        destacado: true,
      },
      {
        titulo: 'Deficiencia nutricional: dónde aparece importa',
        texto:
          'Los elementos móviles en la planta (nitrógeno, fósforo, potasio, magnesio) se retiran de las hojas viejas para alimentar las nuevas, así que el síntoma aparece primero abajo. Los inmóviles (calcio, boro, hierro, zinc) no se pueden reubicar, así que el síntoma aparece en las hojas nuevas y en los puntos de crecimiento. Esa sola observación reduce a la mitad las posibilidades.',
      },
      {
        titulo: 'Estrés y ventana de aplicación',
        texto:
          'Una planta estresada transloca mal, tiene la cutícula alterada y menor capacidad de metabolizar la molécula. Eso significa dos cosas: los sistémicos funcionan peor justo cuando más se necesitan, y el riesgo de fitotoxicidad sube. Si el cultivo está en estrés severo, muchas veces la mejor decisión es aliviar la causa, esperar y aplicar después.',
        destacado: true,
      },
      {
        titulo: 'Qué aporta un bioestimulante y qué no',
        texto:
          'Acompaña la recuperación: aminoácidos que ahorran energía de síntesis, algas con fitohormonas que reactivan meristemos, calcio que estabiliza membranas, potasio que regula la apertura estomática. No corrige la causa. Sobre un lote encharcado o con salinidad alta, el bioestimulante ayuda poco si no se arregla primero el drenaje o el lavado de sales.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════
  {
    id: 'aplicacion',
    titulo: 'Calidad de aplicación',
    resumen: 'La variable que más explica una falla de control',
    secciones: [
      {
        titulo: 'Antes de culpar al producto',
        texto:
          'Cuando un control falla, la causa suele estar en la aplicación y no en la molécula: cobertura insuficiente, volumen mal calibrado, agua inadecuada, momento equivocado o plaga en un estadio que ese producto no toca. Revisar eso primero evita cambiar de producto sin necesidad y evita atribuir a resistencia lo que fue un problema de técnica.',
        destacado: true,
      },
      {
        titulo: 'Volumen y cobertura',
        texto:
          'Un sistémico tolera menos volumen porque se redistribuye solo. Un contacto necesita volumen y buena atomización porque solo protege lo que moja. Subir la dosis no compensa una cobertura deficiente: lo que hace es aumentar el costo y la presión de selección.',
      },
      {
        titulo: 'Calidad del agua',
        texto:
          'El pH y la dureza afectan a varias moléculas. El glifosato es el caso clásico: el calcio y el magnesio del agua dura lo secuestran y reducen su eficacia, y por eso acondicionar el agua mejora el resultado sin subir la dosis. Aguas muy alcalinas hidrolizan algunos insecticidas en el tanque en cuestión de horas.',
      },
      {
        titulo: 'Momento del día',
        texto:
          'Temperaturas altas y humedad relativa baja secan la gota antes de que penetre y aumentan la deriva por evaporación. Las primeras horas de la mañana y el final de la tarde suelen dar mejor absorción. Además, aplicar al atardecer reduce la exposición de polinizadores.',
      },
      {
        titulo: 'Orden de mezcla en el tanque',
        texto:
          'El orden habitual es: llenar la mitad del tanque con agua y el agitador andando, luego los productos en polvo o granulados dispersables, después las suspensiones, luego los solubles y por último los concentrados emulsionables y coadyuvantes. Invertir el orden es la causa más frecuente de grumos y de boquillas tapadas.',
      },
    ],
  },
];

/** Preguntas frecuentes de campo, con respuesta directa. */
const PREGUNTAS = [
  {
    p: '¿Puedo aplicar un producto en un cultivo que no está en la etiqueta?',
    r: 'Técnicamente puede funcionar, pero es un uso por fuera de etiqueta: sin respaldo legal, sin periodo de carencia validado para ese cultivo y con riesgo de rechazo en certificación o exportación. La app le dice qué modo de acción encaja; la etiqueta le dice si puede usarlo ahí.',
  },
  {
    p: 'Faltan pocos días para cosechar, ¿qué reviso primero?',
    r: 'El periodo de carencia, antes que la eficacia. Si el PC es mayor que los días que faltan, ese producto queda descartado sin importar qué tan bien encaje técnicamente. Es el filtro que hay que aplicar de primero cerca de cosecha.',
  },
  {
    p: 'La plaga bajó pero no desapareció. ¿Aplico otra vez?',
    r: 'Depende del umbral, no de si quedó cero. Rara vez el objetivo es erradicar: es mantener la población por debajo del nivel donde el daño cuesta más que el control. Si está por debajo del umbral y hay benéficos activos, repetir solo suma costo y presión de selección.',
  },
  {
    p: '¿Por qué el glifosato no me controló el coquito?',
    r: 'El coquito (ciperácea) se reproduce por tubérculos subterráneos. El glifosato sí transloca por floema, pero si la planta estaba pequeña o estresada no bajó suficiente producto al tubérculo. Se necesita maleza en crecimiento activo, con área foliar suficiente para absorber, y en general más de una aplicación.',
  },
  {
    p: '¿Puedo mezclar un piretroide con un neonicotinoide?',
    r: 'Sí, de hecho varias formulaciones comerciales del portafolio ya vienen así, y aporta choque más sistemia. Pero para el manejo de resistencia esa mezcla cuenta como haber usado ambos grupos: en la siguiente aplicación hay que salir de 3A y de 4A.',
  },
  {
    p: 'Apliqué un fungicida y la mancha siguió creciendo. ¿Falló?',
    r: 'Depende de qué se esperaba. La mayoría de fungicidas son preventivos y curativos tempranos, no erradicantes: una lesión ya formada no desaparece. Lo que hay que evaluar es si aparecieron lesiones nuevas después de la aplicación, no si las viejas se borraron.',
  },
  {
    p: '¿Por qué la abamectina "no mató" los ácaros?',
    r: 'La abamectina causa parálisis flácida: el ácaro deja de alimentarse en horas pero puede tardar días en morir, y el cadáver queda en la hoja. Evaluar por movilidad y por daño nuevo, no por conteo de individuos presentes.',
  },
  {
    p: '¿Cada cuánto puedo repetir el mismo producto?',
    r: 'La referencia es no repetir el mismo número de grupo en generaciones consecutivas de la plaga ni más de dos veces por ciclo en el caso de los grupos de alto riesgo. Si hay que aplicar seguido, se alterna el grupo, no la marca.',
  },
  {
    p: '¿El bioestimulante reemplaza al fertilizante?',
    r: 'No. El bioestimulante actúa sobre procesos fisiológicos en dosis bajas: mejora la eficiencia con la que la planta usa lo que ya tiene. Si falta nitrógeno, hay que aplicar nitrógeno. Sobre un cultivo mal nutrido, el bioestimulante rinde poco.',
  },
];

// ══════════════════════════════════════════════════════════════════
// src/motores/resistencia.js
// ══════════════════════════════════════════════════════════════════

/**
 * CEREBRO 1 — Resistencia
 *
 * Responsabilidad única: decidir si dos productos comparten sitio de acción y,
 * a partir de ahí, qué sirve para rotar y qué no.
 *
 * Regla central: IRAC especifica que la alternancia debe planificarse con los
 * grupos NUMERADOS. La letra del subgrupo solo distingue la familia química
 * dentro del mismo sitio de acción, así que un 3A y un 3B comparten resistencia
 * cruzada y no sirven para rotar entre sí.
 */




/** Sitios de acción que ocupa un producto. Una mezcla ocupa todos los de sus componentes. */
function gruposDeRotacion(producto) {
  if (!producto?.sistema) return [];
  return codigosDeGrupo(producto.grupo).map((c) => grupoDeRotacion(producto.sistema, c));
}

/** ¿Dos productos comparten sitio de acción? */
function compartenModoDeAccion(a, b) {
  if (!a || !b) return false;
  if (a.sistema !== b.sistema) return false;
  const ga = gruposDeRotacion(a);
  const gb = gruposDeRotacion(b);
  return ga.some((c) => gb.includes(c));
}

/** Explica en texto por qué dos productos chocan. Devuelve null si no chocan. */
function explicarConflicto(a, b) {
  if (!compartenModoDeAccion(a, b)) return null;
  const comunes = gruposDeRotacion(a).filter((c) => gruposDeRotacion(b).includes(c));
  return `Ambos ocupan el sitio de acción ${a.sistema} ${comunes.join(' y ')}`;
}

/**
 * Alternativas de rotación: misma categoría, sin sitio de acción compartido,
 * ordenadas por menor riesgo de resistencia y disponibilidad comercial.
 */
function alternativasDeRotacion(producto) {
  if (!producto) return [];
  const orden = { Nulo: 0, Bajo: 1, Medio: 2, Alto: 3 };
  return PRODUCTOS.filter(
    (p) =>
      p.id !== producto.id &&
      p.categoria === producto.categoria &&
      !compartenModoDeAccion(p, producto)
  ).sort((a, b) => {
    const dif = (orden[a.riesgo] ?? 9) - (orden[b.riesgo] ?? 9);
    if (dif !== 0) return dif;
    if (a.estado !== b.estado) return a.estado === 'Disponible' ? -1 : 1;
    return a.nombre.localeCompare(b.nombre);
  });
}

/** Productos que comparten sitio de acción: los que NO sirven para rotar. */
function mismosModoDeAccion(producto) {
  if (!producto) return [];
  return PRODUCTOS.filter((p) => p.id !== producto.id && compartenModoDeAccion(p, producto));
}

/**
 * Estadios del ciclo de vida que cubre un producto, heredados de las fichas de
 * sus grupos de modo de acción.
 */
function estadiosDeProducto(producto) {
  if (!producto || producto.categoria !== 'Insecticida') return [];
  const set = new Set();
  codigosDeGrupo(producto.grupo).forEach((c) => {
    const f = fichaGrupo(producto.sistema, c);
    f?.estadios?.forEach((e) => set.add(e));
  });
  return [...set];
}

// ══════════════════════════════════════════════════════════════════
// src/motores/diagnostico.js
// ══════════════════════════════════════════════════════════════════

/**
 * CEREBRO 2 — Diagnóstico
 *
 * Responsabilidad única: traducir una situación de campo en una lista de
 * productos ordenada, con la razón de cada uno.
 *
 * Consulta al cerebro de resistencia para penalizar lo que repite el modo de
 * acción anterior, pero no reimplementa esa lógica.
 */



const PESOS = {
  base: 50,
  escenario: 22,
  escenarioGeneral: 8,
  momento: 24,
  disponible: 6,
  todera: 5,
  riesgoBajo: 8,
  rotacionOk: 30,
  rotacionMal: -100,
};

/**
 * Recomienda productos según el criterio del diagnóstico guiado.
 *
 * El objetivo es un FILTRO DURO y no un criterio de puntaje: un producto que no
 * controla el organismo buscado nunca debe aparecer, por bien que encaje en
 * cultivo y momento. Es la regla que evita recomendar un triazol para un
 * oomiceto, que no tiene ergosterol en su membrana.
 */
function recomendar(criterio) {
  const { categoria, categorias, objetivo, escenario, momento, ultimoUsado } = criterio;

  // Una rama del diagnóstico puede abarcar varias categorías de producto. La
  // rama de nutrición, por ejemplo, incluye bioestimulantes Y reguladores de
  // crecimiento: para el agricultor "alargar los brotes" es la misma pregunta,
  // aunque internamente sean dos familias distintas.
  const admitidas = categorias || (categoria ? [categoria] : null);

  const candidatos = PRODUCTOS.filter((p) => {
    if (admitidas && !admitidas.includes(p.categoria)) return false;
    if (objetivo && !p.objetivos?.includes(objetivo)) return false;
    return true;
  });

  const evaluados = candidatos.map((p) => {
    let puntaje = PESOS.base;
    const razones = ['Controla lo que buscas'];
    const alertas = [];

    if (escenario && p.escenarios?.includes(escenario)) {
      puntaje += PESOS.escenario;
      razones.push('Indicado para ese uso');
    } else if (p.escenarios?.includes('general')) {
      puntaje += PESOS.escenarioGeneral;
    }

    if (momento && p.momento?.includes(momento)) {
      puntaje += PESOS.momento;
      razones.push('Encaja en ese momento');
    }

    if (p.estado === 'Disponible') puntaje += PESOS.disponible;
    if (p.todera) {
      puntaje += PESOS.todera;
      razones.push('Producto ancla del portafolio');
    }
    if (p.riesgo === 'Bajo' || p.riesgo === 'Nulo') {
      puntaje += PESOS.riesgoBajo;
      razones.push('Bajo riesgo de resistencia');
    }

    if (ultimoUsado) {
      const conflicto = explicarConflicto(p, ultimoUsado);
      if (conflicto) {
        puntaje += PESOS.rotacionMal;
        alertas.push(`${conflicto}: no rompe la presión de selección`);
      } else if (p.sistema && p.sistema === ultimoUsado.sistema) {
        puntaje += PESOS.rotacionOk;
        razones.push(
          `Rota bien: cambia de ${ultimoUsado.sistema} ${gruposDeRotacion(ultimoUsado).join('/')} a ${gruposDeRotacion(p).join('/')}`
        );
      }
    }

    if (p.riesgo === 'Alto') alertas.push('Alto riesgo de resistencia: no repetir el grupo en el ciclo');
    if (p.estado === 'Pronto') alertas.push('Próximo lanzamiento, aún no disponible');

    return { ...p, puntaje, razones, alertas };
  });

  return evaluados.filter((p) => p.puntaje > 0).sort((a, b) => b.puntaje - a.puntaje);
}

/** Búsqueda libre por texto sobre los campos identificatorios del producto. */
function buscarTexto(termino, lista = PRODUCTOS) {
  const t = termino.trim().toLowerCase();
  if (!t) return lista;
  return lista.filter((p) =>
    [p.nombre, p.ia, p.familia, p.grupo, p.categoria, p.mecanismo, p.sistema]
      .filter(Boolean)
      .some((campo) => campo.toLowerCase().includes(t))
  );
}

/**
 * Construye un programa de varios pases escogiendo en cada paso el mejor
 * candidato que no repita ningún sitio de acción ya usado en el programa.
 * Es la unión de los dos cerebros: recomendación + resistencia.
 */
function construirPrograma(criterio, pases = 3) {
  const usados = [];
  const programa = [];

  for (let i = 0; i < pases; i += 1) {
    const candidatos = recomendar(criterio).filter(
      // "Nuevo" ya está en el mercado; solo se excluye lo que aún no sale
      (p) => p.estado !== 'Pronto' && !usados.some((u) => compartenModoDeAccion(p, u))
    );
    if (candidatos.length === 0) break;
    programa.push(candidatos[0]);
    usados.push(candidatos[0]);
  }

  return programa;
}

// ══════════════════════════════════════════════════════════════════
// src/motores/aplicacion.js
// ══════════════════════════════════════════════════════════════════

/**
 * CEREBRO 3 — Aplicación
 *
 * Responsabilidad única: la aritmética de campo y la técnica de aplicación.
 * No sabe nada de plagas ni de resistencia.
 *
 * La app NUNCA propone una dosis: la dosis se lee de la etiqueta ICA. Lo que
 * hace este módulo es la aritmética de campo, que es donde se cometen los
 * errores caros, y el orden de carga del tanque, que es la causa más común de
 * grumos y boquillas tapadas.
 */

/** Unidades de dosis admitidas y cómo se interpretan. */
const UNIDADES = {
  'L/ha': { tipo: 'area', base: 'L', factor: 1, etiqueta: 'L/ha' },
  'cc/ha': { tipo: 'area', base: 'L', factor: 0.001, etiqueta: 'cc/ha' },
  'Kg/ha': { tipo: 'area', base: 'Kg', factor: 1, etiqueta: 'Kg/ha' },
  'g/ha': { tipo: 'area', base: 'Kg', factor: 0.001, etiqueta: 'g/ha' },
  'cc/L': { tipo: 'volumen', base: 'L', factor: 0.001, etiqueta: 'cc/L de agua' },
  'g/L': { tipo: 'volumen', base: 'Kg', factor: 0.001, etiqueta: 'g/L de agua' },
};

/**
 * Deduce las unidades de dosis razonables para un producto a partir de su
 * presentación comercial: un producto en litros se dosifica en L o cc, uno en
 * kilos se dosifica en Kg o g. Evita que el usuario escoja una unidad que no
 * corresponde al envase.
 */
function unidadesSugeridas(producto) {
  if (!producto) return Object.keys(UNIDADES);
  const texto = (producto.presentaciones || []).join(' ').toLowerCase();
  const esSolido = /kg|\bg\b|\bg$/.test(texto) && !/\bl\b|cc/.test(texto);
  return esSolido ? ['Kg/ha', 'g/ha', 'g/L'] : ['L/ha', 'cc/ha', 'cc/L'];
}

/**
 * Calcula la mezcla para un lote.
 *
 * @param {object} datos
 * @param {number} datos.dosis          valor leído en la etiqueta
 * @param {string} datos.unidad         clave de UNIDADES
 * @param {number} datos.area           hectáreas a tratar
 * @param {number} datos.volumenHa      litros de agua por hectárea
 * @param {number} datos.capacidadBomba litros por bomba o tanque
 */
function calcularMezcla({ dosis, unidad, area, volumenHa, capacidadBomba }) {
  const u = UNIDADES[unidad];
  const d = Number(dosis) || 0;
  const a = Number(area) || 0;
  const vHa = Number(volumenHa) || 0;
  const cap = Number(capacidadBomba) || 0;

  if (!u || d <= 0 || a <= 0 || vHa <= 0 || cap <= 0) return null;

  const aguaTotal = vHa * a;
  const numeroBombas = aguaTotal / cap;
  const dosisBase = d * u.factor; // convertida a L o Kg

  let productoTotal;
  let productoPorBomba;

  if (u.tipo === 'volumen') {
    productoPorBomba = dosisBase * cap;
    productoTotal = dosisBase * aguaTotal;
  } else {
    productoTotal = dosisBase * a;
    productoPorBomba = (dosisBase * cap) / vHa;
  }

  return {
    base: u.base,
    aguaTotal,
    numeroBombas,
    bombasEnteras: Math.floor(numeroBombas),
    fraccionUltimaBomba: numeroBombas - Math.floor(numeroBombas),
    productoTotal,
    productoPorBomba,
    // dosis equivalente por hectárea, útil para comparar productos entre sí
    dosisPorHa: u.tipo === 'volumen' ? dosisBase * vHa : dosisBase,
  };
}

/**
 * Calibración: volumen real de aplicación a partir de una prueba de campo.
 * Se recorre una distancia conocida y se mide el gasto real de la bomba.
 */
function calcularCalibracion({ gastoLitros, anchoFranja, distancia }) {
  const g = Number(gastoLitros) || 0;
  const ancho = Number(anchoFranja) || 0;
  const dist = Number(distancia) || 0;
  if (g <= 0 || ancho <= 0 || dist <= 0) return null;

  const areaTratada = ancho * dist; // m²
  const volumenHa = (g / areaTratada) * 10000;
  return { areaTratada, volumenHa };
}

/**
 * Orden recomendado de carga del tanque.
 * El orden correcto evita grumos, floculación y boquillas tapadas.
 */
const ORDEN_TANQUE = [
  { paso: 1, que: 'Agua', detalle: 'Llenar la mitad del tanque con el agitador funcionando.' },
  { paso: 2, que: 'Acondicionador de agua', detalle: 'Corregir pH o dureza antes de agregar cualquier producto.' },
  { paso: 3, que: 'Polvos y granulados (WP, WG, SG)', detalle: 'Prediluir aparte en un balde y verter lentamente.' },
  { paso: 4, que: 'Suspensiones (SC, SL)', detalle: 'Agregar con el agitador andando.' },
  { paso: 5, que: 'Emulsionables (EC)', detalle: 'Van casi al final porque pueden romper suspensiones.' },
  { paso: 6, que: 'Coadyuvantes y aceites', detalle: 'Siempre de últimos, con el tanque casi lleno.' },
  { paso: 7, que: 'Completar agua', detalle: 'Terminar de llenar y mantener la agitación hasta terminar de aplicar.' },
];

/** Deduce el tipo de formulación desde el nombre comercial del producto. */
function formulacionDe(producto) {
  const m = String(producto?.nombre || '').match(/\b(WG|WP|SG|SC|SL|EC|CE|WDG|TB)\b/i);
  if (!m) return null;
  const f = m[1].toUpperCase();
  const mapa = {
    WG: 'Granulado dispersable',
    WDG: 'Granulado dispersable',
    SG: 'Granulado soluble',
    WP: 'Polvo mojable',
    SC: 'Suspensión concentrada',
    SL: 'Concentrado soluble',
    EC: 'Concentrado emulsionable',
    CE: 'Concentrado emulsionable',
    TB: 'Tableta soluble',
  };
  const ordenCarga = { WP: 3, WG: 3, WDG: 3, SG: 3, TB: 3, SC: 4, SL: 4, EC: 5, CE: 5 };
  return { sigla: f, nombre: mapa[f] || f, ordenCarga: ordenCarga[f] || 4 };
}

/** Formatea a una cantidad legible en campo. */
function formatear(valor, decimales = 2) {
  if (valor == null || Number.isNaN(valor)) return '—';
  if (valor >= 100) return valor.toFixed(0);
  if (valor >= 10) return valor.toFixed(1);
  return valor.toFixed(decimales);
}

/** Convierte a la unidad más cómoda de leer: 0.35 L → "350 cc". */
function unidadAmigable(valor, base) {
  if (valor == null || Number.isNaN(valor)) return '—';
  if (base === 'L') return valor < 1 ? `${formatear(valor * 1000, 0)} cc` : `${formatear(valor)} L`;
  if (base === 'Kg') return valor < 1 ? `${formatear(valor * 1000, 0)} g` : `${formatear(valor)} Kg`;
  return formatear(valor);
}

// ══════════════════════════════════════════════════════════════════
// src/components/ui/Etiqueta.jsx
// ══════════════════════════════════════════════════════════════════

/** Etiqueta pequeña de texto, sólida o suave. */
function Etiqueta({ texto, color = COLORES.azul, tono = 'suave', mono = false }) {
  const estilo =
    tono === 'solido'
      ? { backgroundColor: color, color: '#fff' }
      : { backgroundColor: `${color}1A`, color, border: `1px solid ${color}33` };

  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs leading-relaxed ${
        mono ? 'font-mono font-semibold tracking-tight' : 'font-medium'
      }`}
      style={estilo}
    >
      {texto}
    </span>
  );
}

/**
 * Sello de modo de acción: el dato que más se repite en toda la app.
 * Se muestra siempre en monoespaciada porque es un código, no una palabra.
 */
function SelloGrupo({ sistema, grupo, color = COLORES.tinta, tamano = 'md' }) {
  if (!sistema) {
    return (
      <span
        className="inline-flex items-center rounded font-mono text-xs font-semibold px-2 py-1"
        style={{ backgroundColor: `${color}14`, color }}
      >
        {grupo}
      </span>
    );
  }
  const alto = tamano === 'lg' ? 'text-sm py-1.5' : 'text-xs py-1';
  return (
    <span className={`inline-flex items-stretch overflow-hidden rounded font-mono font-semibold ${alto}`}>
      <span className="px-2 text-white" style={{ backgroundColor: color }}>
        {sistema}
      </span>
      <span className="px-2" style={{ backgroundColor: `${color}1F`, color }}>
        {grupo}
      </span>
    </span>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/ui/Superficie.jsx
// ══════════════════════════════════════════════════════════════════

/**
 * Insignia hexagonal, el elemento gráfico que identifica cada línea del
 * portafolio. Se dibuja en SVG para que escale sin perder nitidez y para poder
 * teñirla con el color de la categoría.
 */
function Hexagono({ icono: Icono, color = COLORES.azul, tamano = 56, relleno = true }) {
  const iconoTam = Math.round(tamano * 0.4);
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: tamano, height: tamano }}>
      <svg viewBox="0 0 100 100" width={tamano} height={tamano} aria-hidden="true">
        <polygon
          points="50,3 93,27 93,73 50,97 7,73 7,27"
          fill={relleno ? color : 'none'}
          stroke={color}
          strokeWidth={relleno ? 0 : 7}
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <Icono size={iconoTam} strokeWidth={1.8} color={relleno ? '#fff' : color} />
      </span>
    </span>
  );
}

/**
 * Fila de menú al estilo del portafolio: panel de color con el hexágono a la
 * izquierda, texto al centro y flecha a la derecha.
 */
function FilaMenu({ icono, color, fondo, titulo, descripcion, onClick, insignia }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white text-left shadow-sm transition active:scale-[0.99]"
      style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.08)' }}
    >
      <span
        className="flex w-24 shrink-0 items-center justify-center py-6 sm:w-28"
        style={{ backgroundColor: fondo }}
      >
        <Hexagono icono={icono} color={color} tamano={52} />
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-5">
        <span className="min-w-0">
          <span className="block text-base font-bold leading-tight" style={{ color: COLORES.tinta }}>
            {titulo}
          </span>
          {descripcion && (
            <span className="mt-1 block text-sm leading-snug" style={{ color: COLORES.textoSuave }}>
              {descripcion}
            </span>
          )}
          {insignia && <span className="mt-2 inline-block">{insignia}</span>}
        </span>
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" className="shrink-0">
          <path d="M1 1l8 8-8 8" stroke={COLORES.borde} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

/** Control segmentado en píldora, como el selector Productos / Datos de interés. */
function Segmentado({ opciones, valor, onCambio, sobreOscuro = false }) {
  return (
    <div
      className="flex rounded-full p-1"
      style={{ backgroundColor: sobreOscuro ? 'rgba(255,255,255,0.18)' : '#E6EDF2' }}
    >
      {opciones.map((o) => {
        const activo = valor === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onCambio(o.id)}
            className="flex-1 rounded-full px-4 py-2 text-sm font-semibold transition"
            style={{
              backgroundColor: activo ? '#fff' : 'transparent',
              color: activo ? COLORES.tinta : sobreOscuro ? 'rgba(255,255,255,0.85)' : COLORES.textoSuave,
              boxShadow: activo ? '0 1px 3px rgba(11,36,49,0.12)' : 'none',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Barra de navegación inferior flotante. */
function BarraInferior({ pestanas, activa, onCambio }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-2">
      <div
        className="mx-auto flex max-w-md items-center justify-around rounded-full p-1.5"
        style={{
          backgroundColor: '#E6EDF2',
          boxShadow: '0 4px 16px rgba(11,36,49,0.14)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {pestanas.map((p) => {
          const Icono = p.icono;
          const activo = activa === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onCambio(p.id)}
              aria-label={p.label}
              aria-current={activo ? 'page' : undefined}
              className="flex flex-1 flex-col items-center justify-center rounded-full py-2 transition"
              style={{ backgroundColor: activo ? '#fff' : 'transparent' }}
            >
              <Icono size={20} strokeWidth={activo ? 2.4 : 1.9} color={activo ? COLORES.azul : '#8FA3B0'} />
              <span
                className="mt-0.5 text-[10px] font-semibold leading-none"
                style={{ color: activo ? COLORES.azul : '#8FA3B0' }}
              >
                {p.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** Encabezado azul con el logotipo y, opcionalmente, un control segmentado. */
function Encabezado({ titulo, subtitulo, children }) {
  return (
    <header style={{ backgroundColor: COLORES.azul }}>
      <div className="mx-auto max-w-3xl px-4 pb-4 pt-5 text-center">
        <p className="text-2xl font-extrabold tracking-tight text-white">
          Cibo<span className="font-light">CAMPO</span>
          <span className="ml-0.5 align-super text-xs">🌱</span>
        </p>
        {titulo && <p className="mt-1 text-lg font-bold text-white">{titulo}</p>}
        {subtitulo && (
          <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {subtitulo}
          </p>
        )}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/ui/Ilustraciones.jsx
// ══════════════════════════════════════════════════════════════════

/**
 * Ilustraciones vectoriales originales.
 *
 * Se dibujan en SVG en vez de usar fotografías por dos razones: las fotos de
 * producto son material con derechos de la empresa, y un esquema explica mejor
 * un proceso invisible (cómo se mueve una molécula dentro de la planta) que una
 * foto del envase. Además escalan sin pesar ni pixelarse.
 */

function Marco({ titulo, pie, children, alto = 220 }) {
  return (
    <figure className="my-4 overflow-hidden rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.09)' }}>
      <div className="flex items-center justify-center px-3 pt-4" style={{ minHeight: alto }}>
        {children}
      </div>
      <figcaption className="px-4 pb-4 pt-2">
        <span className="block text-xs font-bold uppercase tracking-wide" style={{ color: COLORES.tinta }}>
          {titulo}
        </span>
        {pie && (
          <span className="mt-1 block text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
            {pie}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

/** Cómo se mueve un producto dentro de la planta. */
function IlustracionTranslocacion() {
  const leyenda = [
    { color: COLORES.naranja, nombre: 'Contacto', nota: 'se queda donde cayó' },
    { color: COLORES.teal, nombre: 'Translaminar', nota: 'cruza la hoja' },
    { color: COLORES.azul, nombre: 'Xilema', nota: 'solo sube' },
    { color: '#8B5CF6', nombre: 'Floema', nota: 'baja hasta la raíz' },
  ];
  return (
    <Marco
      titulo="Movimiento dentro de la planta"
      pie="El contacto se queda donde cayó la gota. El translaminar cruza la hoja. El xilema solo sube, por eso protege el brote nuevo. El floema baja, por eso mata rizomas."
      alto={250}
    >
      <svg viewBox="0 0 340 220" className="w-full max-w-sm" role="img" aria-label="Esquema de movimiento del producto en la planta">
        {/* suelo */}
        <rect x="0" y="176" width="340" height="44" fill="#E8E1D6" />

        {/* raíz */}
        <path d="M96 176 L96 196 M96 187 L82 200 M96 187 L110 200"
              stroke="#A98F6F" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* tallo */}
        <line x1="96" y1="178" x2="96" y2="44" stroke={COLORES.verde} strokeWidth="5" strokeLinecap="round" />
        {/* hojas */}
        <path d="M96 138 Q58 126 46 146 Q68 162 96 148 Z" fill={COLORES.verde} opacity="0.75" />
        <path d="M96 100 Q134 88 146 108 Q124 124 96 110 Z" fill={COLORES.verde} opacity="0.75" />
        {/* brote nuevo */}
        <circle cx="96" cy="42" r="7" fill={COLORES.verde} />

        {/* gota de contacto sobre la hoja baja */}
        <circle cx="64" cy="144" r="5" fill={COLORES.naranja} />

        {/* translaminar: cruza el espesor de la hoja superior */}
        <path d="M124 98 L134 110" stroke={COLORES.teal} strokeWidth="2.5"
              strokeLinecap="round" markerEnd="url(#ptl)" />

        {/* xilema: sube por el tallo */}
        <path d="M88 172 L88 56" stroke={COLORES.azul} strokeWidth="2.5"
              strokeDasharray="5 4" markerEnd="url(#pxi)" />

        {/* floema: baja hasta la raíz */}
        <path d="M104 76 L104 192" stroke="#8B5CF6" strokeWidth="2.5"
              strokeDasharray="5 4" markerEnd="url(#pfl)" />

        {/* leyenda, separada del dibujo para que nada se solape */}
        {leyenda.map((l, i) => {
          const y = 46 + i * 38;
          return (
            <g key={l.nombre}>
              <rect x="176" y={y - 14} width="152" height="30" rx="8" fill="#F6F9FB" />
              <circle cx="192" cy={y + 1} r="5.5" fill={l.color} />
              <text x="206" y={y - 1} fontSize="10" fontWeight="800" fill={l.color}>{l.nombre}</text>
              <text x="206" y={y + 11} fontSize="8.5" fill={COLORES.textoSuave}>{l.nota}</text>
            </g>
          );
        })}

        <defs>
          <marker id="pxi" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill={COLORES.azul} />
          </marker>
          <marker id="pfl" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#8B5CF6" />
          </marker>
          <marker id="ptl" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill={COLORES.teal} />
          </marker>
        </defs>
      </svg>
    </Marco>
  );
}

/** Ciclo de vida con metamorfosis completa y dónde pega cada grupo. */
function IlustracionCicloVida() {
  const etapas = [
    { x: 84, y: 46, r: 20, nombre: 'Huevo', nota: 'IRAC 7C · 15' },
    { x: 236, y: 46, r: 23, nombre: 'Larva', nota: 'IRAC 6 · 22A · 28' },
    { x: 236, y: 146, r: 20, nombre: 'Pupa', nota: 'poco vulnerable' },
    { x: 84, y: 146, r: 20, nombre: 'Adulto', nota: 'IRAC 1A · 3A · 4A' },
  ];
  return (
    <Marco
      titulo="Dónde pega cada grupo en el ciclo"
      pie="La larva pequeña es el eslabón más vulnerable y el más barato de controlar. La pupa casi no se puede tocar. Un regulador aplicado sobre adultos parece fallar, pero corta la generación siguiente."
      alto={230}
    >
      <svg viewBox="0 0 320 190" className="w-full max-w-sm" role="img" aria-label="Ciclo de vida del insecto y grupos que actúan en cada estadio">
        {/* flechas del ciclo */}
        <path d="M110 38 Q160 20 208 38" stroke={COLORES.borde} strokeWidth="2.5" fill="none" markerEnd="url(#f1)" />
        <path d="M262 66 Q280 96 262 126" stroke={COLORES.borde} strokeWidth="2.5" fill="none" markerEnd="url(#f1)" />
        <path d="M210 156 Q160 174 112 156" stroke={COLORES.borde} strokeWidth="2.5" fill="none" markerEnd="url(#f1)" />
        <path d="M58 126 Q40 96 58 66" stroke={COLORES.borde} strokeWidth="2.5" fill="none" markerEnd="url(#f1)" />

        {etapas.map((e, i) => (
          <g key={e.nombre}>
            <circle
              cx={e.x} cy={e.y} r={e.r}
              fill={i === 1 ? COLORES.azul : i === 2 ? COLORES.grisClaro : COLORES.azulClaro}
              stroke={i === 2 ? COLORES.borde : COLORES.azul}
              strokeWidth="2"
            />
            <text
              x={e.x} y={e.y + 4} fontSize="9.5" textAnchor="middle" fontWeight="700"
              fill={i === 1 ? '#fff' : COLORES.tinta}
            >
              {e.nombre}
            </text>
            <text
              x={e.x} y={e.y + e.r + 14} fontSize="8" textAnchor="middle"
              fill={i === 2 ? COLORES.textoSuave : COLORES.azul} fontWeight="600"
            >
              {e.nota}
            </text>
          </g>
        ))}
        <defs>
          <marker id="f1" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={COLORES.borde} />
          </marker>
        </defs>
      </svg>
    </Marco>
  );
}

/** Hongo verdadero frente a oomiceto. */
function IlustracionHongoOomiceto() {
  return (
    <Marco
      titulo="Hongo verdadero frente a oomiceto"
      pie="El oomiceto no tiene ergosterol en la membrana, así que un triazol no encuentra blanco. Tampoco tiene quitina en la pared. Necesita grupos específicos: FRAC 28, 33 y 43."
      alto={210}
    >
      <svg viewBox="0 0 320 190" className="w-full max-w-sm" role="img" aria-label="Comparación entre hongo verdadero y oomiceto">
        {/* Hongo */}
        <g>
          <circle cx="80" cy="76" r="46" fill={COLORES.tealClaro} stroke={COLORES.teal} strokeWidth="3" />
          <circle cx="80" cy="76" r="34" fill="#fff" stroke={COLORES.teal} strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="80" cy="76" r="12" fill={COLORES.teal} opacity="0.35" />
          <text x="80" y="22" fontSize="11" textAnchor="middle" fontWeight="800" fill={COLORES.teal}>HONGO</text>
          <text x="80" y="140" fontSize="9" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Pared: quitina</text>
          <text x="80" y="152" fontSize="9" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Membrana: ergosterol</text>
          <text x="80" y="170" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>FRAC 1 · 3 · 7 · 11</text>
        </g>

        {/* separador */}
        <line x1="160" y1="30" x2="160" y2="164" stroke={COLORES.borde} strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Oomiceto */}
        <g>
          <circle cx="240" cy="76" r="46" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="3" />
          <circle cx="240" cy="76" r="34" fill="#fff" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="240" cy="76" r="12" fill="#8B5CF6" opacity="0.3" />
          {/* flagelo de la zoospora */}
          <path d="M278 96 q16 8 10 20 q-4 8 6 10" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="240" y="22" fontSize="11" textAnchor="middle" fontWeight="800" fill="#8B5CF6">OOMICETO</text>
          <text x="240" y="140" fontSize="9" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Pared: celulosa</text>
          <text x="240" y="152" fontSize="9" textAnchor="middle" fill="#C2410C" fontWeight="700">Sin ergosterol</text>
          <text x="240" y="170" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>FRAC 28 · 33 · 43</text>
        </g>
      </svg>
    </Marco>
  );
}

/** Los tres tipos de arvense y por qué responden distinto. */
function IlustracionArvenses() {
  return (
    <Marco
      titulo="Los tres tipos de arvense"
      pie="La gramínea protege su meristemo en la base, por eso resiste el corte y las auxinas. La ciperácea guarda reservas en tubérculos, por eso rebrota si solo se quema la parte aérea."
      alto={215}
    >
      <svg viewBox="0 0 320 195" className="w-full max-w-sm" role="img" aria-label="Hoja ancha, gramínea y ciperácea">
        <rect x="0" y="150" width="320" height="45" fill="#E5DED4" />

        {/* Hoja ancha */}
        <g>
          <line x1="55" y1="150" x2="55" y2="80" stroke={COLORES.naranja} strokeWidth="3.5" />
          <path d="M55 108 Q28 96 20 114 Q38 128 55 116 Z" fill={COLORES.naranja} opacity="0.8" />
          <path d="M55 96 Q82 84 90 102 Q72 116 55 104 Z" fill={COLORES.naranja} opacity="0.8" />
          <circle cx="55" cy="76" r="6" fill={COLORES.naranja} />
          <text x="55" y="62" fontSize="9" textAnchor="middle" fontWeight="800" fill={COLORES.naranja}>HOJA ANCHA</text>
          <text x="55" y="168" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>Meristemo</text>
          <text x="55" y="178" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>expuesto</text>
          <text x="55" y="190" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>HRAC 4</text>
        </g>

        {/* Gramínea */}
        <g>
          <path d="M160 150 Q152 116 140 92" stroke={COLORES.verde} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M160 150 Q166 114 178 88" stroke={COLORES.verde} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M160 150 Q160 118 158 96" stroke={COLORES.verde} strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="160" cy="147" r="5" fill={COLORES.verde} />
          <text x="160" y="62" fontSize="9" textAnchor="middle" fontWeight="800" fill={COLORES.verde}>GRAMÍNEA</text>
          <text x="160" y="168" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>Meristemo</text>
          <text x="160" y="178" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>protegido</text>
          <text x="160" y="190" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>HRAC 1</text>
        </g>

        {/* Ciperácea */}
        <g>
          <path d="M262 150 L252 94 M262 150 L272 92 M262 150 L262 88" stroke="#0E7490" strokeWidth="3" strokeLinecap="round" />
          {/* tubérculo */}
          <ellipse cx="262" cy="168" rx="9" ry="7" fill="#8B5A2B" />
          <line x1="262" y1="150" x2="262" y2="162" stroke="#8B5A2B" strokeWidth="2.5" />
          <text x="262" y="62" fontSize="9" textAnchor="middle" fontWeight="800" fill="#0E7490">CIPERÁCEA</text>
          <text x="262" y="186" fontSize="8" textAnchor="middle" fill={COLORES.tinta}>Tubérculo</text>
          <text x="262" y="190" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>HRAC 2</text>
        </g>
      </svg>
    </Marco>
  );
}

/** Cómo se instala la resistencia en una población. */
function IlustracionResistencia() {
  const generaciones = [
    { titulo: 'Inicio', resistentes: 1, total: 16 },
    { titulo: 'Tras 1 uso', resistentes: 3, total: 12 },
    { titulo: 'Tras 3 usos', resistentes: 7, total: 9 },
    { titulo: 'Falla', resistentes: 12, total: 12 },
  ];
  return (
    <Marco
      titulo="Cómo se instala la resistencia"
      pie="El producto no crea individuos resistentes: ya existían por azar. Lo que hace el uso repetido del mismo sitio de acción es eliminar a los sensibles y dejar que los resistentes se queden con la población."
      alto={215}
    >
      <svg viewBox="0 0 320 195" className="w-full max-w-sm" role="img" aria-label="Selección de individuos resistentes generación tras generación">
        {generaciones.map((g, gi) => {
          const x0 = 12 + gi * 78;
          const puntos = [];
          for (let i = 0; i < g.total; i += 1) {
            const fila = Math.floor(i / 4);
            const col = i % 4;
            puntos.push({
              cx: x0 + 10 + col * 15,
              cy: 42 + fila * 16,
              res: i < g.resistentes,
            });
          }
          return (
            <g key={g.titulo}>
              <rect
                x={x0} y={22} width="66" height="86" rx="9"
                fill={gi === 3 ? '#FDF3EE' : '#F7FAFC'}
                stroke={gi === 3 ? '#E9A98A' : COLORES.borde}
                strokeWidth="1.5"
              />
              {puntos.map((p, i) => (
                <circle
                  key={i} cx={p.cx} cy={p.cy} r="4.5"
                  fill={p.res ? '#C2410C' : COLORES.azul}
                  opacity={p.res ? 1 : 0.55}
                />
              ))}
              <text x={x0 + 33} y={16} fontSize="9" textAnchor="middle" fontWeight="700" fill={COLORES.tinta}>
                {g.titulo}
              </text>
              {gi < 3 && (
                <path
                  d={`M${x0 + 68} 64 L${x0 + 76} 64`}
                  stroke={COLORES.borde} strokeWidth="2" markerEnd="url(#fr)"
                />
              )}
            </g>
          );
        })}
        {/* leyenda */}
        <circle cx="90" cy="140" r="5" fill={COLORES.azul} opacity="0.55" />
        <text x="102" y="144" fontSize="9" fill={COLORES.tinta}>Sensible</text>
        <circle cx="176" cy="140" r="5" fill="#C2410C" />
        <text x="188" y="144" fontSize="9" fill={COLORES.tinta}>Resistente</text>
        <text x="160" y="170" fontSize="9" textAnchor="middle" fontWeight="700" fill="#C2410C">
          Rotar el sitio de acción rompe esta secuencia
        </text>
        <defs>
          <marker id="fr" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={COLORES.borde} />
          </marker>
        </defs>
      </svg>
    </Marco>
  );
}

/** Preventivo, curativo y erradicante sobre la línea del tiempo de la infección. */
function IlustracionMomentoFungicida() {
  const hitos = [
    { x: 40, label: 'Espora', sub: 'llega' },
    { x: 120, label: 'Germina', sub: 'penetra' },
    { x: 200, label: 'Coloniza', sub: 'sin síntoma' },
    { x: 278, label: 'Lesión', sub: 'esporula' },
  ];
  return (
    <Marco
      titulo="Cuándo actúa cada fungicida"
      pie="La ventana curativa es corta y ocurre antes de que se vea nada. Cuando la lesión ya es visible, casi ningún producto la revierte: lo que se evalúa es si aparecen lesiones nuevas."
      alto={195}
    >
      <svg viewBox="0 0 320 175" className="w-full max-w-sm" role="img" aria-label="Línea de tiempo de la infección y ventanas de acción">
        <line x1="20" y1="70" x2="300" y2="70" stroke={COLORES.borde} strokeWidth="2.5" />
        {hitos.map((h) => (
          <g key={h.label}>
            <circle cx={h.x} cy="70" r="6" fill="#fff" stroke={COLORES.teal} strokeWidth="2.5" />
            <text x={h.x} y="52" fontSize="9" textAnchor="middle" fontWeight="700" fill={COLORES.tinta}>{h.label}</text>
            <text x={h.x} y="42" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>{h.sub}</text>
          </g>
        ))}

        {/* bandas de acción */}
        <rect x="20" y="88" width="92" height="20" rx="10" fill={COLORES.tealClaro} />
        <text x="66" y="102" fontSize="9" textAnchor="middle" fontWeight="700" fill={COLORES.teal}>PREVENTIVO</text>

        <rect x="118" y="114" width="90" height="20" rx="10" fill={COLORES.azulClaro} />
        <text x="163" y="128" fontSize="9" textAnchor="middle" fontWeight="700" fill={COLORES.azul}>CURATIVO</text>

        <rect x="214" y="140" width="90" height="20" rx="10" fill="#FBE3D4" />
        <text x="259" y="154" fontSize="9" textAnchor="middle" fontWeight="700" fill="#C2410C">ERRADICANTE</text>
        <text x="259" y="172" fontSize="7.5" textAnchor="middle" fill={COLORES.textoSuave}>muy pocos lo logran</text>
      </svg>
    </Marco>
  );
}

/* ────────────────────────────────────────────────────────────────
   RECONOCER EL ESTRÉS EN CAMPO
   Diagnóstico diferencial: antes de decidir qué aplicar hay que saber
   qué se está viendo, y muchas veces la respuesta es no aplicar nada.
   ──────────────────────────────────────────────────────────────── */

/** Silueta de hoja reutilizable para los esquemas de daño. */
function Hoja({ x, y, children, color = '#7FB069' }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 -34 C24 -24 34 -4 30 18 C26 36 10 44 0 44 C-10 44 -26 36 -30 18 C-34 -4 -24 -24 0 -34 Z"
        fill={color}
      />
      <line x1="0" y1="-30" x2="0" y2="42" stroke="#5C8F4B" strokeWidth="1.6" />
      <path
        d="M0 -14 L-16 -4 M0 -14 L16 -4 M0 4 L-18 14 M0 4 L18 14 M0 20 L-14 28 M0 20 L14 28"
        stroke="#5C8F4B" strokeWidth="1" fill="none" opacity="0.6"
      />
      {children}
    </g>
  );
}

/** Cuatro causas distintas que se confunden en campo. */
function IlustracionPatronesDano() {
  return (
    <Marco
      titulo="Cuatro causas que se confunden"
      pie="Antes de escoger producto hay que saber qué se está viendo. Un borde comido no se trata igual que una clorosis internerval, y la fitotoxicidad no se trata en absoluto: se corrige la práctica."
      alto={250}
    >
      <svg viewBox="0 0 340 210" className="w-full max-w-sm" role="img" aria-label="Daño por plaga, enfermedad, deficiencia y fitotoxicidad">
        {/* PLAGA: tejido faltante en bordes */}
        <Hoja x={48} y={62}>
          <path d="M-30 6 q10 -12 20 -2 q-10 10 -20 2 Z" fill="#fff" />
          <path d="M30 -2 q-12 -10 -20 2 q10 10 20 -2 Z" fill="#fff" />
          <circle cx="6" cy="26" r="7" fill="#fff" />
        </Hoja>
        <text x="48" y="122" fontSize="9.5" textAnchor="middle" fontWeight="800" fill={COLORES.azul}>PLAGA</text>
        <text x="48" y="136" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Tejido faltante,</text>
        <text x="48" y="146" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>bordes irregulares</text>
        <text x="48" y="162" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Insecticida</text>

        {/* ENFERMEDAD: lesión con halo */}
        <Hoja x={130} y={62}>
          <circle cx="-8" cy="-4" r="8" fill="#B08968" />
          <circle cx="-8" cy="-4" r="11" fill="none" stroke="#D9C05A" strokeWidth="2.5" opacity="0.85" />
          <circle cx="12" cy="20" r="6" fill="#B08968" />
          <circle cx="12" cy="20" r="9" fill="none" stroke="#D9C05A" strokeWidth="2" opacity="0.85" />
        </Hoja>
        <text x="130" y="122" fontSize="9.5" textAnchor="middle" fontWeight="800" fill={COLORES.teal}>ENFERMEDAD</text>
        <text x="130" y="136" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Lesión definida</text>
        <text x="130" y="146" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>con halo</text>
        <text x="130" y="162" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Fungicida</text>

        {/* DEFICIENCIA: clorosis internerval con nervadura verde */}
        <Hoja x={212} y={62} color="#E3D45C">
          <line x1="0" y1="-30" x2="0" y2="42" stroke="#5C8F4B" strokeWidth="3" />
          <path
            d="M0 -14 L-16 -4 M0 -14 L16 -4 M0 4 L-18 14 M0 4 L18 14 M0 20 L-14 28 M0 20 L14 28"
            stroke="#5C8F4B" strokeWidth="2.4" fill="none"
          />
        </Hoja>
        <text x="212" y="122" fontSize="9.5" textAnchor="middle" fontWeight="800" fill="#B45309">DEFICIENCIA</text>
        <text x="212" y="136" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Amarillo entre</text>
        <text x="212" y="146" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>nervaduras verdes</text>
        <text x="212" y="162" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Nutrición</text>

        {/* FITOTOXICIDAD: quema de borde y punta */}
        <Hoja x={294} y={62}>
          <path
            d="M0 -34 C24 -24 34 -4 30 18 C26 36 10 44 0 44 C-10 44 -26 36 -30 18 C-34 -4 -24 -24 0 -34 Z"
            fill="none" stroke="#A0522D" strokeWidth="6" opacity="0.85"
          />
          <path d="M-16 34 q16 12 32 0 q-16 8 -32 0 Z" fill="#A0522D" />
        </Hoja>
        <text x="294" y="122" fontSize="9" textAnchor="middle" fontWeight="800" fill="#C2410C">FITOTOXICIDAD</text>
        <text x="294" y="136" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Quema de borde</text>
        <text x="294" y="146" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>y punta, uniforme</text>
        <text x="294" y="162" fontSize="8.5" textAnchor="middle" fill="#C2410C" fontWeight="700">No aplicar</text>

        <line x1="12" y1="180" x2="328" y2="180" stroke={COLORES.borde} strokeWidth="1" />
        <text x="170" y="196" fontSize="8.5" textAnchor="middle" fill={COLORES.textoSuave}>
          La misma hoja amarilla puede ser cuatro problemas distintos
        </text>
      </svg>
    </Marco>
  );
}

/** El patrón en el lote distingue causa biótica de abiótica. */
function IlustracionPatronLote() {
  const foco = [[52, 52], [64, 60], [46, 66], [58, 74], [120, 96], [130, 104]];
  return (
    <Marco
      titulo="El patrón en el lote es la primera pista"
      pie="Un daño en focos que se expande indica algo vivo que se reproduce y se mueve. Un daño uniforme o que sigue la topografía suele ser agua, suelo, nutrición o una aplicación mal hecha."
      alto={225}
    >
      <svg viewBox="0 0 340 200" className="w-full max-w-sm" role="img" aria-label="Patrón en focos frente a patrón por zonas en el lote">
        {/* Lote con focos */}
        <rect x="16" y="26" width="140" height="110" rx="6" fill="#EAF2E4" stroke="#B9CDAD" strokeWidth="1.5" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={16 + i * 20} y1="26" x2={16 + i * 20} y2="136" stroke="#D3E0C9" strokeWidth="1" />
        ))}
        {foco.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" fill="#C2410C" opacity="0.55" />
        ))}
        <circle cx="56" cy="62" r="26" fill="none" stroke="#C2410C" strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="86" y="18" fontSize="9.5" textAnchor="middle" fontWeight="800" fill="#C2410C">EN FOCOS</text>
        <text x="86" y="152" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Plaga o enfermedad</text>
        <text x="86" y="164" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Se expande desde un punto</text>
        <text x="86" y="180" fontSize="8" textAnchor="middle" fill={COLORES.verde} fontWeight="700">Tratar el foco primero</text>

        {/* Lote por zonas */}
        <rect x="184" y="26" width="140" height="110" rx="6" fill="#EAF2E4" stroke="#B9CDAD" strokeWidth="1.5" />
        <path d="M184 96 L324 76 L324 136 L184 136 Z" fill="#D9A441" opacity="0.45" />
        <path d="M184 96 L324 76" stroke="#B4832B" strokeWidth="1.6" strokeDasharray="5 3" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={184 + i * 20} y1="26" x2={184 + i * 20} y2="136" stroke="#D3E0C9" strokeWidth="1" />
        ))}
        <text x="254" y="18" fontSize="9.5" textAnchor="middle" fontWeight="800" fill="#B45309">POR ZONAS</text>
        <text x="254" y="152" fontSize="8.5" textAnchor="middle" fill={COLORES.tinta} fontWeight="700">Suelo, agua o nutrición</text>
        <text x="254" y="164" fontSize="8" textAnchor="middle" fill={COLORES.textoSuave}>Sigue la parte baja o el tipo de suelo</text>
        <text x="254" y="180" fontSize="8" textAnchor="middle" fill="#C2410C" fontWeight="700">Un plaguicida no lo corrige</text>
      </svg>
    </Marco>
  );
}

/** Tipos de estrés abiótico y la respuesta agronómica de cada uno. */
function IlustracionEstresAbiotico() {
  // Los iconos se dibujan con primitivas SVG y no con glifos unicode: si la
  // fuente del dispositivo no tiene el carácter, queda un hueco vacío.
  const casos = [
    {
      x: 46,
      color: '#D97706',
      t: 'Calor',
      sintoma: ['Hoja acopada,', 'estomas cerrados'],
      respuesta: ['Aminoácidos', 'y calcio'],
      icono: (
        <g>
          <circle cx="0" cy="0" r="7" fill="#D97706" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={a}
              x1={9 * Math.cos((a * Math.PI) / 180)}
              y1={9 * Math.sin((a * Math.PI) / 180)}
              x2={13 * Math.cos((a * Math.PI) / 180)}
              y2={13 * Math.sin((a * Math.PI) / 180)}
              stroke="#D97706"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </g>
      ),
    },
    {
      x: 132,
      color: '#0E7490',
      t: 'Déficit hídrico',
      sintoma: ['Marchitez que', 'revive de noche'],
      respuesta: ['Riego, algas', 'y potasio'],
      icono: <path d="M0 -13 C7 -4 11 2 11 6 A11 11 0 0 1 -11 6 C-11 2 -7 -4 0 -13 Z" fill="#0E7490" />,
    },
    {
      x: 218,
      color: '#6366F1',
      t: 'Frío',
      sintoma: ['Tonos morados,', 'crecimiento lento'],
      respuesta: ['Aminoácidos', 'y fósforo'],
      icono: (
        <g stroke="#6366F1" strokeWidth="2" strokeLinecap="round">
          {[0, 60, 120].map((a) => (
            <line
              key={a}
              x1={-12 * Math.cos((a * Math.PI) / 180)}
              y1={-12 * Math.sin((a * Math.PI) / 180)}
              x2={12 * Math.cos((a * Math.PI) / 180)}
              y2={12 * Math.sin((a * Math.PI) / 180)}
            />
          ))}
        </g>
      ),
    },
    {
      x: 304,
      color: '#92400E',
      t: 'Salinidad',
      sintoma: ['Quema de punta,', 'raíz corta'],
      respuesta: ['Lavado', 'y húmicos'],
      icono: (
        <g fill="#92400E">
          <rect x="-11" y="-9" width="7" height="7" rx="1.5" />
          <rect x="2" y="-11" width="6" height="6" rx="1.5" />
          <rect x="-6" y="2" width="8" height="8" rx="1.5" />
          <rect x="5" y="1" width="5" height="5" rx="1.5" />
        </g>
      ),
    },
  ];

  return (
    <Marco
      titulo="Estrés abiótico: qué se ve y qué hacer"
      pie="El estrés abiótico no se controla con un plaguicida: se corrige la causa y se acompaña la recuperación. Aplicar un fitosanitario sobre planta estresada suele empeorar el cuadro por fitotoxicidad."
      alto={240}
    >
      <svg viewBox="0 0 340 205" className="w-full max-w-sm" role="img" aria-label="Tipos de estrés abiótico, síntoma y respuesta agronómica">
        {casos.map((c) => (
          <g key={c.t}>
            <circle cx={c.x} cy="32" r="21" fill="#fff" stroke={c.color} strokeWidth="2" />
            <g transform={`translate(${c.x} 32)`}>{c.icono}</g>

            <text x={c.x} y="70" fontSize="9" textAnchor="middle" fontWeight="800" fill={c.color}>
              {c.t}
            </text>

            {c.sintoma.map((linea, i) => (
              <text key={linea} x={c.x} y={86 + i * 11} fontSize="7.5" textAnchor="middle" fill={COLORES.textoSuave}>
                {linea}
              </text>
            ))}

            <rect x={c.x - 38} y="114" width="76" height="34" rx="8" fill="#EAF2E4" />
            {c.respuesta.map((linea, i) => (
              <text key={linea} x={c.x} y={130 + i * 11} fontSize="8" textAnchor="middle" fontWeight="700" fill="#3F6B33">
                {linea}
              </text>
            ))}
          </g>
        ))}

        <line x1="12" y1="166" x2="328" y2="166" stroke={COLORES.borde} strokeWidth="1" />
        <text x="170" y="184" fontSize="8.5" textAnchor="middle" fill={COLORES.textoSuave}>
          Corregir la causa primero; el bioestimulante acompaña, no sustituye
        </text>
      </svg>
    </Marco>
  );
}

/** Mapa de ilustraciones por tema del módulo Aprender. */
const ILUSTRACIONES_POR_TEMA = {
  resistencia: [IlustracionResistencia],
  translocacion: [IlustracionTranslocacion],
  arvenses: [IlustracionArvenses],
  hongos: [IlustracionHongoOomiceto, IlustracionMomentoFungicida],
  insectos: [IlustracionCicloVida],
  estres: [IlustracionPatronesDano, IlustracionPatronLote, IlustracionEstresAbiotico],
};

// ══════════════════════════════════════════════════════════════════
// src/components/TarjetaProducto.jsx
// ══════════════════════════════════════════════════════════════════

const ICONO_CATEGORIA = {
  Insecticida: Bug,
  Herbicida: Sprout,
  Fungicida: Leaf,
  Bioestimulante: Droplets,
  Regulador: Gauge,
};

/**
 * Tarjeta de producto. Se usa en resultados, catálogo y rotación, así que
 * muestra razones y alertas solo cuando el motor de búsqueda las entrega.
 */
function TarjetaProducto({ producto, onAbrir, orden }) {
  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const fondo = FONDO_CATEGORIA[producto.categoria] || COLORES.azulClaro;
  const Icono = ICONO_CATEGORIA[producto.categoria] || Bug;

  return (
    <button
      onClick={() => onAbrir(producto)}
      className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white text-left transition active:scale-[0.995]"
      style={{ boxShadow: '0 1px 3px rgba(11,36,49,0.09)' }}
    >
      {/* Panel de color con el hexágono de la línea */}
      <span
        className="relative flex w-[68px] shrink-0 flex-col items-center justify-center gap-1 py-4"
        style={{ backgroundColor: fondo }}
      >
        <Hexagono icono={Icono} color={color} tamano={40} />
        {orden != null && (
          <span className="font-mono text-[10px] font-bold" style={{ color }}>
            {String(orden).padStart(2, '0')}
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1 px-4 py-3.5">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-bold leading-tight" style={{ color: COLORES.tinta }}>
            {producto.nombre}
          </span>
          {producto.estado !== 'Disponible' && (
            <Etiqueta
              texto={producto.estado}
              color={producto.estado === 'Nuevo' ? COLORES.verde : COLORES.naranja}
            />
          )}
        </span>

        <span className="mt-0.5 block text-[13px]" style={{ color: COLORES.textoSuave }}>
          {producto.ia}
        </span>

        <span className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
          <Etiqueta texto={producto.movimiento} color={COLORES.gris} />
        </span>

        {producto.razones?.length > 0 && (
          <span className="mt-2.5 block space-y-1">
            {producto.razones.slice(0, 3).map((r) => (
              <span key={r} className="flex items-start gap-1.5 text-xs" style={{ color: COLORES.verde }}>
                <Check size={13} className="mt-0.5 shrink-0" />
                <span>{r}</span>
              </span>
            ))}
          </span>
        )}

        {producto.alertas?.length > 0 && (
          <span className="mt-2 block space-y-1">
            {producto.alertas.map((a) => (
              <span key={a} className="flex items-start gap-1.5 text-xs" style={{ color: '#C2410C' }}>
                <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                <span>{a}</span>
              </span>
            ))}
          </span>
        )}
      </span>
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/FichaProducto.jsx
// ══════════════════════════════════════════════════════════════════

function Bloque({ icono: Icono, titulo, children, color = COLORES.tinta }) {
  return (
    <section className="mt-5">
      <h3
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide"
        style={{ color }}
      >
        <Icono size={14} /> {titulo}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Dato({ etiqueta, children }) {
  return (
    <div
      className="grid grid-cols-1 gap-1 border-b py-2.5 sm:grid-cols-[8rem_1fr] sm:gap-4"
      style={{ borderColor: COLORES.borde }}
    >
      <dt className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
        {etiqueta}
      </dt>
      <dd className="text-sm" style={{ color: COLORES.tinta }}>
        {children}
      </dd>
    </div>
  );
}

/** Ficha técnica completa. Combina datos del producto con la ficha de su grupo. */
function FichaProducto({ producto, onCerrar, onVerRotacion }) {
  const panel = useRef(null);

  // La ficha se abre sobre toda la pantalla, así que tiene que poder cerrarse
  // sin buscar el botón: tecla Escape, botón físico de atrás del teléfono, o
  // tocando fuera del panel.
  useEffect(() => {
    if (!producto) return undefined;

    const conEscape = (e) => {
      if (e.key === 'Escape') onCerrar();
    };
    const conAtras = () => onCerrar();

    document.addEventListener('keydown', conEscape);
    window.addEventListener('popstate', conAtras);
    // Entrada en el historial para que el botón atrás cierre la ficha en vez
    // de sacar al usuario de la aplicación.
    window.history.pushState({ ficha: true }, '');

    // Bloquear el desplazamiento del fondo mientras la ficha está abierta
    const desplazamientoPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();

    return () => {
      document.removeEventListener('keydown', conEscape);
      window.removeEventListener('popstate', conAtras);
      document.body.style.overflow = desplazamientoPrevio;
      // Si se cerró con el botón y no con "atrás", limpiar la entrada añadida
      if (window.history.state?.ficha) window.history.back();
    };
  }, [producto, onCerrar]);

  if (!producto) return null;

  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const fichas = fichasDeProducto(producto);
  const conflictos = mismosModoDeAccion(producto);
  const alternativas = alternativasDeRotacion(producto);
  const estadios = estadiosDeProducto(producto);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
      onClick={onCerrar}
      role="presentation"
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`Ficha de ${producto.nombre}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white outline-none sm:rounded-2xl"
      >
        {/* Encabezado */}
        <div
          className="sticky top-0 z-10 border-b bg-white px-5 py-4"
          style={{ borderColor: COLORES.borde }}
        >
          <button
            onClick={onCerrar}
            className="mb-2 flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70"
            style={{ color: COLORES.azul }}
          >
            <ArrowLeft size={16} /> Volver
          </button>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Etiqueta texto={producto.categoria} color={color} tono="solido" />
                {producto.estado !== 'Disponible' && (
                  <Etiqueta
                    texto={producto.estado}
                    color={producto.estado === 'Nuevo' ? COLORES.verde : COLORES.naranja}
                  />
                )}
                {producto.todera && <Etiqueta texto="Producto ancla" color={COLORES.verde} />}
              </div>
              <h2 className="mt-2 text-xl font-bold leading-tight" style={{ color: COLORES.tinta }}>
                {producto.nombre}
              </h2>
              <p className="text-sm" style={{ color: COLORES.textoSuave }}>
                {producto.ia}
              </p>
            </div>
            <button
              onClick={onCerrar}
              className="shrink-0 rounded-full p-2 transition hover:bg-slate-100"
              aria-label="Cerrar ficha"
            >
              <X size={20} style={{ color: COLORES.textoSuave }} />
            </button>
          </div>
        </div>

        <div className="px-5 pb-8">
          {/* ── Modo de acción por cada grupo de la mezcla ── */}
          {fichas.map(({ codigo, ficha }) => {
            const tr = TRANSLOCACION[ficha.translocacion];
            return (
              <div
                key={codigo}
                className="mt-4 rounded-lg p-4"
                style={{ backgroundColor: `${color}0D`, border: `1px solid ${color}30` }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <SelloGrupo sistema={producto.sistema} grupo={codigo} color={color} tamano="lg" />
                  <span className="text-sm font-bold" style={{ color: COLORES.tinta }}>
                    {ficha.nombre}
                  </span>
                  {ficha.legado && (
                    <span className="font-mono text-xs" style={{ color: COLORES.textoSuave }}>
                      (antes {ficha.legado})
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                  {ficha.proceso}
                </p>

                <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  {ficha.mecanismo}
                </p>

                <div className="mt-3 rounded p-2.5" style={{ backgroundColor: '#ffffffAA' }}>
                  <p className="text-xs" style={{ color: COLORES.textoSuave }}>
                    <strong style={{ color: COLORES.tinta }}>Sitio de acción:</strong> {ficha.sitioAccion}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: COLORES.textoSuave }}>
                    <strong style={{ color: COLORES.tinta }}>Qué se ve:</strong> {ficha.sintomas}{' '}
                    <em>({ficha.velocidad})</em>
                  </p>
                </div>

                {/* Translocación */}
                {tr && (
                  <div className="mt-3 flex gap-3 rounded p-2.5" style={{ backgroundColor: '#ffffffAA' }}>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded font-mono"
                      style={{ backgroundColor: `${color}1F`, color }}
                    >
                      {tr.icono}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold" style={{ color: COLORES.tinta }}>
                        {tr.nombre}
                      </span>
                      <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
                        {tr.implicacion}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Si no hay ficha de grupo (bioestimulantes y reguladores) */}
          {fichas.length === 0 && (
            <div
              className="mt-4 rounded-lg p-4"
              style={{ backgroundColor: `${color}0D`, border: `1px solid ${color}30` }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} tamano="lg" />
                <span className="text-sm font-bold" style={{ color: COLORES.tinta }}>
                  {producto.familia}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                {producto.mecanismo}
              </p>
              {producto.sintoma && (
                <p className="mt-1.5 text-sm italic" style={{ color: COLORES.textoSuave }}>
                  {producto.sintoma}
                </p>
              )}
            </div>
          )}

          {/* ── Ciclo de vida ── */}
          {estadios.length > 0 && (
            <Bloque icono={Target} titulo="Estadios que alcanza">
              <div className="flex flex-wrap gap-2">
                {ESTADIOS.map((e) => {
                  const activo = estadios.includes(e.id);
                  return (
                    <span
                      key={e.id}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                      style={{
                        backgroundColor: activo ? `${color}1A` : '#F4F6F8',
                        color: activo ? color : COLORES.borde,
                        border: `1px solid ${activo ? `${color}44` : COLORES.borde}`,
                        textDecoration: activo ? 'none' : 'line-through',
                      }}
                    >
                      {e.nombre}
                    </span>
                  );
                })}
              </div>
            </Bloque>
          )}

          {/* ── Cuándo elegirlo ── */}
          {fichas.some((f) => f.ficha.decision) && (
            <Bloque icono={Compass} titulo="Cuándo elegirlo" color={COLORES.verde}>
              {fichas.map(
                ({ codigo, ficha }) =>
                  ficha.decision && (
                    <p
                      key={codigo}
                      className="mb-2 rounded-lg p-3 text-sm leading-relaxed"
                      style={{ backgroundColor: COLORES.verdeClaro, color: COLORES.tinta }}
                    >
                      {ficha.decision}
                    </p>
                  )
              )}
            </Bloque>
          )}

          {/* ── Motivo de rotación ── */}
          {fichas.some((f) => f.ficha.rotacionMotivo) && (
            <Bloque icono={RotateCcw} titulo="Por qué rotarlo">
              {fichas.map(
                ({ codigo, ficha }) =>
                  ficha.rotacionMotivo && (
                    <div
                      key={codigo}
                      className="mb-2 rounded-lg border p-3"
                      style={{ borderColor: COLORES.borde }}
                    >
                      <div className="flex items-center gap-2">
                        <SelloGrupo sistema={producto.sistema} grupo={codigo} color={color} />
                        <span
                          className="text-xs font-bold uppercase"
                          style={{ color: COLOR_RIESGO[ficha.riesgo] }}
                        >
                          Riesgo {ficha.riesgo}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                        {ficha.rotacionMotivo}
                      </p>
                    </div>
                  )
              )}
              <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
                Ocupa el sitio de acción{' '}
                <span className="font-mono font-semibold">
                  {producto.sistema} {gruposDeRotacion(producto).join(' y ')}
                </span>
                . En el portafolio hay {conflictos.length} productos que lo repiten y{' '}
                {alternativas.length} que sirven para rotar.
              </p>
              <button
                onClick={() => onVerRotacion(producto)}
                className="mt-3 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: COLORES.tinta }}
              >
                Ver plan de rotación
              </button>
            </Bloque>
          )}

          {/* ── Datos agronómicos ── */}
          <Bloque icono={Info} titulo="Datos">
            <dl>
              <Dato etiqueta="Controla">
                <div className="flex flex-wrap gap-1.5">
                  {producto.objetivos?.map((o) => (
                    <Etiqueta key={o} texto={etiquetaDe(o)} color={color} />
                  ))}
                </div>
              </Dato>
              <Dato etiqueta="Momento">
                <div className="flex flex-wrap gap-1.5">
                  {producto.momento?.map((m) => (
                    <Etiqueta key={m} texto={etiquetaDe(m)} color={COLORES.tinta} />
                  ))}
                </div>
              </Dato>
              {fichas[0]?.ficha?.espectro && <Dato etiqueta="Espectro">{fichas[0].ficha.espectro}</Dato>}
              {fichas[0]?.ficha?.accion && (
                <Dato etiqueta="Tipo de acción">{fichas[0].ficha.accion.join(' · ')}</Dato>
              )}
              <Dato etiqueta="Riesgo">
                <span className="font-semibold" style={{ color: COLOR_RIESGO[producto.riesgo] }}>
                  {producto.riesgo}
                </span>
              </Dato>
              {producto.beneficos && <Dato etiqueta="Benéficos">{producto.beneficos}</Dato>}
              <Dato etiqueta="Presentaciones">{producto.presentaciones?.join(' · ')}</Dato>
            </dl>
          </Bloque>

          {/* ── Precauciones ── */}
          {fichas.some((f) => f.ficha.precaucion) && (
            <Bloque icono={ShieldAlert} titulo="Precauciones" color="#C2410C">
              {fichas.map(
                ({ codigo, ficha }) =>
                  ficha.precaucion && (
                    <p
                      key={codigo}
                      className="mb-2 rounded-lg p-3 text-sm"
                      style={{ backgroundColor: '#FDF3EE', color: COLORES.tinta }}
                    >
                      {ficha.precaucion}
                    </p>
                  )
              )}
            </Bloque>
          )}

          {producto.nota && (
            <div
              className="mt-4 flex gap-2 rounded-lg p-3"
              style={{ backgroundColor: COLORES.naranjaClaro }}
            >
              <Info size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.naranja }} />
              <p className="text-sm" style={{ color: COLORES.tinta }}>
                {producto.nota}
              </p>
            </div>
          )}

          <div className="mt-5 flex gap-2 rounded-xl p-3" style={{ backgroundColor: COLORES.papel }}>
            <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.textoSuave }} />
            <p className="text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
              Confirma el cultivo registrado, la dosis, el periodo de carencia y el de reentrada en la
              etiqueta ICA vigente antes de recomendar o aplicar.
            </p>
          </div>

          {/* Cierre al final: tras una ficha larga, el botón de arriba queda lejos */}
          <button
            onClick={onCerrar}
            className="mt-5 w-full rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: COLORES.tinta }}
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/Diagnostico.jsx
// ══════════════════════════════════════════════════════════════════

const ICONOS = { insectos: Bug, malezas: Sprout, enfermedades: Leaf, nutricion: Droplets };

function Opcion({ label, ayuda, activo, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border p-3 text-left transition hover:shadow-sm"
      style={{
        borderColor: activo ? color : COLORES.borde,
        backgroundColor: activo ? `${color}12` : '#fff',
        boxShadow: activo ? `inset 0 0 0 1px ${color}` : undefined,
      }}
    >
      <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
        {label}
      </span>
      {ayuda && (
        <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
          {ayuda}
        </span>
      )}
    </button>
  );
}

function Paso({ numero, titulo, children }) {
  return (
    <section className="mt-6">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-xs font-bold" style={{ color: COLORES.naranja }}>
          {String(numero).padStart(2, '0')}
        </span>
        <h3 className="text-sm font-bold" style={{ color: COLORES.tinta }}>
          {titulo}
        </h3>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Asistente que traduce una situación de campo en una lista de productos. */
function Diagnostico({ onAbrirProducto, onVerCiclo }) {
  const [rama, setRama] = useState(null);
  const [objetivo, setObjetivo] = useState(null);
  const [escenario, setEscenario] = useState(null);
  const [momento, setMomento] = useState(null);
  const [ultimoId, setUltimoId] = useState('');

  const ultimoUsado = useMemo(
    () => PRODUCTOS.find((p) => p.id === ultimoId) || null,
    [ultimoId]
  );

  const resultados = useMemo(() => {
    if (!rama || !objetivo) return [];
    return recomendar({
      categorias: rama.categorias,
      objetivo,
      escenario,
      momento,
      ultimoUsado,
    });
  }, [rama, objetivo, escenario, momento, ultimoUsado]);

  const reiniciar = () => {
    setRama(null);
    setObjetivo(null);
    setEscenario(null);
    setMomento(null);
    setUltimoId('');
  };

  // ── Pantalla inicial ────────────────────────────────────────────
  if (!rama) {
    return (
      <div>
        <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
          ¿Qué necesitas resolver?
        </h2>
        <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
          Responde tres preguntas y la app te arma la lista de productos que encajan, ordenada por
          qué tan bien responden a tu situación.
        </p>
        <div className="mt-5 space-y-3">
          {RAMAS.map((r) => {
            const cat = r.categorias[0];
            return (
              <FilaMenu
                key={r.id}
                icono={ICONOS[r.id]}
                color={COLOR_CATEGORIA[cat]}
                fondo={FONDO_CATEGORIA[cat]}
                titulo={r.titulo}
                descripcion={r.resumen}
                onClick={() => setRama(r)}
                insignia={
                  r.sistema ? (
                    <span
                      className="rounded px-2 py-0.5 font-mono text-[11px] font-bold"
                      style={{ backgroundColor: FONDO_CATEGORIA[cat], color: COLOR_CATEGORIA[cat] }}
                    >
                      {r.sistema}
                    </span>
                  ) : null
                }
              />
            );
          })}

          {onVerCiclo && (
            <FilaMenu
              icono={Activity}
              color={COLORES.gris}
              fondo={COLORES.grisClaro}
              titulo="Ciclo de vida"
              descripcion="Qué estadio de la plaga alcanza cada insecticida"
              onClick={onVerCiclo}
            />
          )}
        </div>
      </div>
    );
  }

  const color = COLOR_CATEGORIA[rama.categorias[0]];

  return (
    <div>
      <button
        onClick={reiniciar}
        className="flex items-center gap-1.5 text-sm font-medium transition hover:opacity-70"
        style={{ color: COLORES.textoSuave }}
      >
        <ArrowLeft size={15} /> Empezar de nuevo
      </button>

      <h2 className="mt-3 text-lg font-bold" style={{ color: COLORES.tinta }}>
        {rama.titulo}
      </h2>

      <Paso numero={1} titulo={rama.pregunta}>
        <div className="grid gap-2 sm:grid-cols-3">
          {rama.objetivos.map((o) => (
            <Opcion
              key={o.id}
              label={o.label}
              ayuda={o.ayuda}
              color={color}
              activo={objetivo === o.id}
              onClick={() => setObjetivo(objetivo === o.id ? null : o.id)}
            />
          ))}
        </div>
      </Paso>

      {objetivo && (
        <Paso numero={2} titulo={rama.preguntaEscenario}>
          <div className="grid gap-2 sm:grid-cols-3">
            {rama.escenarios.map((e) => (
              <Opcion
                key={e.id}
                label={e.label}
                color={color}
                activo={escenario === e.id}
                onClick={() => setEscenario(escenario === e.id ? null : e.id)}
              />
            ))}
          </div>
        </Paso>
      )}

      {objetivo && (
        <Paso numero={3} titulo={rama.preguntaMomento}>
          <div className="grid gap-2 sm:grid-cols-2">
            {rama.momentos.map((m) => (
              <Opcion
                key={m.id}
                label={m.label}
                ayuda={m.ayuda}
                color={color}
                activo={momento === m.id}
                onClick={() => setMomento(momento === m.id ? null : m.id)}
              />
            ))}
          </div>
        </Paso>
      )}

      {objetivo && rama.sistema && (
        <Paso numero={4} titulo="¿Qué aplicaste la vez anterior? (opcional)">
          <p className="mb-2 text-xs" style={{ color: COLORES.textoSuave }}>
            Si lo indicas, la app descarta los productos que repiten el mismo sitio de acción.
          </p>
          <select
            value={ultimoId}
            onChange={(e) => setUltimoId(e.target.value)}
            className="w-full rounded-xl border bg-white px-3 py-2 text-sm"
            style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
          >
            <option value="">No apliqué nada o no recuerdo</option>
            {PRODUCTOS.filter((p) => rama.categorias.includes(p.categoria)).map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} — {p.sistema} {p.grupo}
              </option>
            ))}
          </select>
        </Paso>
      )}

      {/* Resultados */}
      {objetivo && (
        <section className="mt-8">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: COLORES.borde }}>
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: COLORES.tinta }}>
              {resultados.length} {resultados.length === 1 ? 'producto encaja' : 'productos encajan'}
            </h3>
            {ultimoUsado && (
              <span className="flex items-center gap-1 text-xs" style={{ color: COLORES.textoSuave }}>
                <RotateCcw size={12} /> Rotando desde {ultimoUsado.sistema} {ultimoUsado.grupo}
              </span>
            )}
          </div>

          {resultados.length === 0 ? (
            <div className="mt-6 flex flex-col items-center py-8 text-center">
              <SearchX size={28} style={{ color: COLORES.borde }} />
              <p className="mt-3 max-w-sm text-sm" style={{ color: COLORES.textoSuave }}>
                Ninguna combinación del portafolio cubre esos criterios. Prueba quitando el escenario o
                el momento para ampliar la búsqueda.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {resultados.map((p, i) => (
                <TarjetaProducto key={p.id} producto={p} orden={i + 1} onAbrir={onAbrirProducto} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/Comparador.jsx
// ══════════════════════════════════════════════════════════════════

const MAXIMO = 3;

/**
 * Comparador lado a lado.
 *
 * Responde la pregunta que queda después del diagnóstico: la app propuso tres
 * productos válidos, ¿cuál escojo? Aquí se ven juntos los criterios que de
 * verdad diferencian: modo de acción, movimiento, velocidad, riesgo de
 * resistencia y selectividad con benéficos.
 */
function Comparador({ onAbrirProducto }) {
  const [ids, setIds] = useState([]);

  const elegidos = useMemo(
    () => ids.map((id) => PRODUCTOS.find((p) => p.id === id)).filter(Boolean),
    [ids]
  );

  // Solo tiene sentido comparar dentro de la misma categoría
  const categoriaFijada = elegidos[0]?.categoria || null;
  const disponibles = PRODUCTOS.filter(
    (p) => !ids.includes(p.id) && (!categoriaFijada || p.categoria === categoriaFijada)
  );

  const conflictos = useMemo(() => {
    const lista = [];
    for (let i = 0; i < elegidos.length; i += 1) {
      for (let j = i + 1; j < elegidos.length; j += 1) {
        if (compartenModoDeAccion(elegidos[i], elegidos[j])) {
          lista.push({
            a: elegidos[i],
            b: elegidos[j],
            motivo: explicarConflicto(elegidos[i], elegidos[j]),
          });
        }
      }
    }
    return lista;
  }, [elegidos]);

  const agregar = (id) => {
    if (id && ids.length < MAXIMO) setIds([...ids, id]);
  };

  const filas = [
    {
      etiqueta: 'Modo de acción',
      valor: (p) =>
        p.sistema ? (
          <SelloGrupo sistema={p.sistema} grupo={p.grupo} color={COLOR_CATEGORIA[p.categoria]} />
        ) : (
          <span className="text-xs">{p.grupo}</span>
        ),
    },
    { etiqueta: 'Familia', valor: (p) => p.familia },
    {
      etiqueta: 'Movimiento',
      valor: (p) => {
        const f = fichasDeProducto(p)[0]?.ficha;
        const tr = f && TRANSLOCACION[f.translocacion];
        return tr ? (
          <span>
            <span className="mr-1 font-mono">{tr.icono}</span>
            {tr.nombre}
          </span>
        ) : (
          p.movimiento
        );
      },
    },
    {
      etiqueta: 'Velocidad',
      valor: (p) => fichasDeProducto(p)[0]?.ficha?.velocidad || '—',
    },
    {
      etiqueta: 'Riesgo de resistencia',
      valor: (p) => (
        <span className="font-bold" style={{ color: COLOR_RIESGO[p.riesgo] }}>
          {p.riesgo}
        </span>
      ),
    },
    {
      etiqueta: 'Benéficos',
      valor: (p) => p.beneficos || '—',
    },
    {
      etiqueta: 'Estadios',
      valor: (p) => {
        const e = estadiosDeProducto(p);
        if (e.length === 0) return '—';
        return ESTADIOS.filter((x) => e.includes(x.id))
          .map((x) => x.nombre)
          .join(', ');
      },
    },
    { etiqueta: 'Presentaciones', valor: (p) => p.presentaciones.join(' · ') },
    {
      etiqueta: 'Disponibilidad',
      valor: (p) =>
        p.estado === 'Pronto' ? (
          <span style={{ color: COLORES.naranja }}>Próximo lanzamiento</span>
        ) : (
          <span className="inline-flex items-center gap-1" style={{ color: COLORES.verde }}>
            <Check size={13} /> {p.estado}
          </span>
        ),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Comparar productos
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Cuando varios productos sirven, esto muestra lado a lado lo que de verdad los diferencia.
        Hasta {MAXIMO} de la misma línea.
      </p>

      {/* Selector */}
      {ids.length < MAXIMO && (
        <select
          value=""
          onChange={(e) => agregar(e.target.value)}
          className="mt-4 w-full rounded-xl border bg-white px-3 py-2.5 text-sm"
          style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
        >
          <option value="">
            {ids.length === 0 ? 'Escoge el primer producto…' : 'Agregar otro para comparar…'}
          </option>
          {disponibles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.categoria} · {p.nombre}
            </option>
          ))}
        </select>
      )}

      {elegidos.length === 0 && (
        <div
          className="mt-6 rounded-2xl border border-dashed p-8 text-center"
          style={{ borderColor: COLORES.borde }}
        >
          <Plus size={26} className="mx-auto" style={{ color: COLORES.borde }} />
          <p className="mt-3 text-sm" style={{ color: COLORES.textoSuave }}>
            Escoge dos o tres productos para verlos enfrentados.
          </p>
        </div>
      )}

      {elegidos.length > 0 && (
        <>
          {/* Encabezados */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse">
              <thead>
                <tr>
                  <th className="w-32" />
                  {elegidos.map((p) => {
                    const color = COLOR_CATEGORIA[p.categoria];
                    return (
                      <th key={p.id} className="p-1 align-top" style={{ width: `${70 / elegidos.length}%` }}>
                        <div
                          className="relative rounded-xl p-3 text-left"
                          style={{ backgroundColor: FONDO_CATEGORIA[p.categoria] }}
                        >
                          <button
                            onClick={() => setIds(ids.filter((x) => x !== p.id))}
                            className="absolute right-1.5 top-1.5 rounded-full p-1 transition hover:bg-white/60"
                            aria-label={`Quitar ${p.nombre}`}
                          >
                            <X size={13} style={{ color }} />
                          </button>
                          <button onClick={() => onAbrirProducto(p)} className="text-left">
                            <span className="block pr-5 text-sm font-bold leading-tight" style={{ color: COLORES.tinta }}>
                              {p.nombre}
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-snug" style={{ color: COLORES.textoSuave }}>
                              {p.ia}
                            </span>
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filas.map((f, i) => (
                  <tr key={f.etiqueta} style={{ backgroundColor: i % 2 ? '#FAFCFD' : 'transparent' }}>
                    <td
                      className="p-2 align-top text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: COLORES.textoSuave }}
                    >
                      {f.etiqueta}
                    </td>
                    {elegidos.map((p) => (
                      <td
                        key={p.id}
                        className="p-2 align-top text-xs"
                        style={{ color: COLORES.tinta, borderTop: `1px solid ${COLORES.borde}` }}
                      >
                        {f.valor(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lectura de la comparación */}
          <div className="mt-5 space-y-2">
            {conflictos.length > 0 ? (
              conflictos.map((c, i) => (
                <div
                  key={i}
                  className="flex gap-2 rounded-xl p-3"
                  style={{ backgroundColor: '#FDF3EE', border: '1px solid #F0C9B4' }}
                >
                  <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: '#C2410C' }} />
                  <p className="text-sm" style={{ color: COLORES.tinta }}>
                    <strong>{c.a.nombre}</strong> y <strong>{c.b.nombre}</strong> no sirven para rotar
                    entre sí: {c.motivo.toLowerCase()}.
                  </p>
                </div>
              ))
            ) : elegidos.length > 1 ? (
              <div
                className="flex gap-2 rounded-xl p-3"
                style={{ backgroundColor: COLORES.verdeClaro }}
              >
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.verde }} />
                <p className="text-sm" style={{ color: COLORES.tinta }}>
                  Todos tienen sitios de acción distintos: sirven para armar una secuencia de rotación.
                </p>
              </div>
            ) : null}

            <div className="flex gap-2 rounded-xl p-3" style={{ backgroundColor: COLORES.papel }}>
              <Minus size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.textoSuave }} />
              <p className="text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
                La comparación no incluye dosis ni costo por hectárea porque dependen de la etiqueta y
                del precio del día. Con el modo de acción ya resuelto, esos dos datos deciden el resto.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/Catalogo.jsx
// ══════════════════════════════════════════════════════════════════

function Filtro({ label, activo, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
      style={{
        borderColor: activo ? color : COLORES.borde,
        backgroundColor: activo ? color : '#fff',
        color: activo ? '#fff' : COLORES.textoSuave,
      }}
    >
      {label}
    </button>
  );
}

/** Catálogo completo del portafolio con búsqueda y filtros. */
function Catalogo({ onAbrirProducto }) {
  const [vista, setVista] = useState('lista');
  const [termino, setTermino] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  const lista = useMemo(() => {
    let base = PRODUCTOS;
    if (categoria) base = base.filter((p) => p.categoria === categoria);
    if (soloDisponibles) base = base.filter((p) => p.estado === 'Disponible');
    return buscarTexto(termino, base);
  }, [termino, categoria, soloDisponibles]);

  const porCategoria = useMemo(() => {
    const mapa = {};
    lista.forEach((p) => {
      mapa[p.categoria] = mapa[p.categoria] || [];
      mapa[p.categoria].push(p);
    });
    return mapa;
  }, [lista]);

  return (
    <div>
      <Segmentado
        opciones={[
          { id: 'lista', label: 'Buscar' },
          { id: 'comparar', label: 'Comparar' },
        ]}
        valor={vista}
        onCambio={setVista}
      />

      {vista === 'comparar' ? (
        <div className="mt-5">
          <Comparador onAbrirProducto={onAbrirProducto} />
        </div>
      ) : (
      <div className="mt-5">
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Catálogo
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Busca por nombre comercial, ingrediente activo, familia química o código de grupo.
      </p>

      {/* Buscador */}
      <div className="relative mt-4">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: COLORES.textoSuave }}
        />
        <input
          type="text"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          placeholder="Abamectina, TIOXAM, triazol, 4A…"
          className="w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2"
          style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
        />
      </div>

      {/* Filtros */}
      <div className="mt-3 flex flex-wrap gap-2">
        <Filtro
          label="Todo"
          activo={!categoria}
          color={COLORES.tinta}
          onClick={() => setCategoria(null)}
        />
        {CATEGORIAS.map((c) => (
          <Filtro
            key={c}
            label={c}
            activo={categoria === c}
            color={COLOR_CATEGORIA[c]}
            onClick={() => setCategoria(categoria === c ? null : c)}
          />
        ))}
        <Filtro
          label="Solo disponibles"
          activo={soloDisponibles}
          color={COLORES.verde}
          onClick={() => setSoloDisponibles(!soloDisponibles)}
        />
      </div>

      <p className="mt-4 font-mono text-xs" style={{ color: COLORES.textoSuave }}>
        {lista.length} de {PRODUCTOS.length} productos
      </p>

      {lista.length === 0 ? (
        <div className="mt-8 flex flex-col items-center py-8 text-center">
          <SearchX size={28} style={{ color: COLORES.borde }} />
          <p className="mt-3 text-sm" style={{ color: COLORES.textoSuave }}>
            Nada coincide con «{termino}». Prueba con el ingrediente activo o el código del grupo.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-6">
          {Object.entries(porCategoria).map(([cat, items]) => (
            <div key={cat}>
              <h3
                className="mb-2 text-xs font-bold uppercase tracking-wide"
                style={{ color: COLOR_CATEGORIA[cat] }}
              >
                {cat} · {items.length}
              </h3>
              <div className="space-y-3">
                {items.map((p) => (
                  <TarjetaProducto key={p.id} producto={p} onAbrir={onAbrirProducto} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/Rotacion.jsx
// ══════════════════════════════════════════════════════════════════

/**
 * Planificador de rotación.
 *
 * La idea agronómica: la resistencia no se maneja cambiando de marca, se maneja
 * cambiando de sitio de acción. Esta vista lo hace visible.
 */
function Rotacion({ onAbrirProducto, productoInicial }) {
  const [id, setId] = useState(productoInicial?.id || '');

  useEffect(() => {
    if (productoInicial?.id) setId(productoInicial.id);
  }, [productoInicial]);

  const producto = useMemo(() => PRODUCTOS.find((p) => p.id === id) || null, [id]);
  const bloqueados = useMemo(() => mismosModoDeAccion(producto), [producto]);
  const alternativas = useMemo(() => alternativasDeRotacion(producto), [producto]);

  const rotables = PRODUCTOS.filter((p) => p.sistema);
  const color = producto ? COLOR_CATEGORIA[producto.categoria] : COLORES.tinta;

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Plan de rotación
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Escoge lo que acabas de aplicar. La app separa el portafolio en lo que repite ese sitio de
        acción y lo que sirve para rotar.
      </p>

      <select
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mt-4 w-full rounded-xl border bg-white px-3 py-2.5 text-sm"
        style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
      >
        <option value="">Selecciona el producto aplicado…</option>
        {rotables.map((p) => (
          <option key={p.id} value={p.id}>
            {p.categoria} · {p.nombre} — {p.sistema} {p.grupo}
          </option>
        ))}
      </select>

      {!producto && (
        <div className="mt-8 rounded-2xl border border-dashed p-8 text-center" style={{ borderColor: COLORES.borde }}>
          <RotateCcw size={26} className="mx-auto" style={{ color: COLORES.borde }} />
          <p className="mt-3 text-sm" style={{ color: COLORES.textoSuave }}>
            Selecciona un producto para ver con qué puedes rotar sin repetir modo de acción.
          </p>
        </div>
      )}

      {producto && (
        <>
          {/* Resumen del producto aplicado */}
          <div
            className="mt-5 rounded-lg p-4"
            style={{ backgroundColor: `${color}0F`, border: `1px solid ${color}33` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
              Ya aplicaste
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-base font-bold" style={{ color: COLORES.tinta }}>
                {producto.nombre}
              </span>
              <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
            </div>
            <p className="mt-2 text-sm" style={{ color: COLORES.tinta }}>
              Sitio de acción ocupado:{' '}
              <span className="font-mono font-semibold">
                {gruposDeRotacion(producto).join(' y ')}
              </span>{' '}
              ({producto.familia}).
            </p>
          </div>

          {/* Motivo del grupo */}
          {fichasDeProducto(producto).map(({ codigo, ficha }) => (
            ficha.rotacionMotivo && (
              <div key={codigo} className="mt-3 rounded-lg border p-3" style={{ borderColor: COLORES.borde, backgroundColor: '#fff' }}>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                  Por qué importa rotar el grupo {codigo}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  {ficha.rotacionMotivo}
                </p>
              </div>
            )
          ))}

          {/* No rotar con */}
          <section className="mt-6">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: '#C2410C' }}>
              <Ban size={15} /> No rotar con estos ({bloqueados.length})
            </h3>
            <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
              Comparten el número de grupo, que es lo que define la resistencia cruzada. Aunque cambie el
              nombre comercial o la letra del subgrupo, la presión de selección es la misma.
            </p>
            {bloqueados.length === 0 ? (
              <p className="mt-3 text-sm italic" style={{ color: COLORES.textoSuave }}>
                Ningún otro producto del portafolio usa este sitio de acción.
              </p>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {bloqueados.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAbrirProducto(p)}
                    className="rounded-lg border px-3 py-1.5 text-left text-xs transition hover:shadow-sm"
                    style={{ borderColor: '#F0C9B4', backgroundColor: '#FDF3EE' }}
                  >
                    <span className="block font-semibold line-through" style={{ color: '#C2410C' }}>
                      {p.nombre}
                    </span>
                    <span className="font-mono" style={{ color: COLORES.textoSuave }}>
                      {p.sistema} {p.grupo}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Sí rotar con */}
          <section className="mt-7">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide" style={{ color: COLORES.verde }}>
              <Check size={15} /> Sirven para rotar ({alternativas.length})
            </h3>
            <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
              Ordenados por menor riesgo de resistencia primero.
            </p>
            <div className="mt-3 space-y-3">
              {alternativas.slice(0, 12).map((p) => (
                <TarjetaProducto key={p.id} producto={p} onAbrir={onAbrirProducto} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/CicloVida.jsx
// ══════════════════════════════════════════════════════════════════

/**
 * Matriz de ciclo de vida.
 *
 * Responde una pregunta que el catálogo por sí solo no responde: si la plaga
 * está en huevo o en larva pequeña, ¿qué productos sirven realmente? Muchos
 * fracasos de campo son productos correctos aplicados al estadio equivocado.
 */
function CicloVida({ onAbrirProducto, onVolver }) {
  const [filtro, setFiltro] = useState(null);
  const color = COLOR_CATEGORIA.Insecticida;

  const filas = useMemo(
    () =>
      PRODUCTOS.filter((p) => p.categoria === 'Insecticida')
        .map((p) => ({ producto: p, estadios: estadiosDeProducto(p) }))
        .filter((f) => (filtro ? f.estadios.includes(filtro) : true))
        .sort((a, b) => b.estadios.length - a.estadios.length),
    [filtro]
  );

  return (
    <div>
      {onVolver && (
        <button
          onClick={onVolver}
          className="mb-3 flex items-center gap-1.5 text-sm font-medium transition hover:opacity-70"
          style={{ color: COLORES.textoSuave }}
        >
          <ArrowLeft size={15} /> Volver
        </button>
      )}
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Ciclo de vida
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Qué estadio de la plaga alcanza cada insecticida. Un producto correcto aplicado al estadio
        equivocado se ve igual que una falla de control.
      </p>

      <IlustracionCicloVida />

      {/* Filtro por estadio */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFiltro(null)}
          className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
          style={{
            borderColor: !filtro ? COLORES.tinta : COLORES.borde,
            backgroundColor: !filtro ? COLORES.tinta : '#fff',
            color: !filtro ? '#fff' : COLORES.textoSuave,
          }}
        >
          Todos
        </button>
        {ESTADIOS.map((e) => (
          <button
            key={e.id}
            onClick={() => setFiltro(filtro === e.id ? null : e.id)}
            className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
            style={{
              borderColor: filtro === e.id ? color : COLORES.borde,
              backgroundColor: filtro === e.id ? color : '#fff',
              color: filtro === e.id ? '#fff' : COLORES.textoSuave,
            }}
          >
            {e.nombre}
          </button>
        ))}
      </div>

      {filtro && (
        <p className="mt-3 flex items-start gap-2 text-sm" style={{ color: COLORES.textoSuave }}>
          <Info size={14} className="mt-0.5 shrink-0" />
          {filas.length} productos del portafolio actúan sobre{' '}
          {ESTADIOS.find((e) => e.id === filtro)?.nombre.toLowerCase()}.
        </p>
      )}

      {/* Matriz */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr>
              <th
                className="sticky left-0 bg-white p-2 text-left text-xs font-bold uppercase tracking-wide"
                style={{ color: COLORES.textoSuave }}
              >
                Producto
              </th>
              {ESTADIOS.map((e) => (
                <th
                  key={e.id}
                  className="p-2 text-center text-xs font-bold"
                  style={{ color: COLORES.tinta }}
                >
                  {e.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map(({ producto, estadios }, i) => (
              <tr
                key={producto.id}
                className="cursor-pointer transition hover:bg-slate-50"
                onClick={() => onAbrirProducto(producto)}
                style={{ backgroundColor: i % 2 ? '#FAFCFD' : '#fff' }}
              >
                <td className="p-2" style={{ borderTop: `1px solid ${COLORES.borde}` }}>
                  <span className="block font-semibold" style={{ color: COLORES.tinta }}>
                    {producto.nombre}
                  </span>
                  <span className="mt-1 inline-block">
                    <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
                  </span>
                </td>
                {ESTADIOS.map((e) => {
                  const activo = estadios.includes(e.id);
                  return (
                    <td
                      key={e.id}
                      className="p-2 text-center"
                      style={{ borderTop: `1px solid ${COLORES.borde}` }}
                    >
                      {activo ? (
                        <span
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${color}1F` }}
                        >
                          <Check size={13} style={{ color }} />
                        </span>
                      ) : (
                        <span style={{ color: COLORES.borde }}>·</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lectura agronómica */}
      <div className="mt-5 space-y-2">
        {ESTADIOS.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border bg-white p-3"
            style={{ borderColor: COLORES.borde }}
          >
            <span className="text-sm font-bold" style={{ color: COLORES.tinta }}>
              {e.nombre}
            </span>
            <span className="ml-2 text-xs" style={{ color: COLORES.textoSuave }}>
              {e.descripcion}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-4 flex gap-2 rounded-lg p-3"
        style={{ backgroundColor: COLORES.naranjaClaro }}
      >
        <Info size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.naranja }} />
        <p className="text-xs leading-relaxed" style={{ color: COLORES.tinta }}>
          Los reguladores de crecimiento (IRAC 7C) y los inhibidores de quitina (IRAC 15) no matan
          adultos. Aplicados con la población adulta ya volando parecen fallar, pero están cortando la
          generación siguiente: son productos de estrategia, no de emergencia.
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/Mezcla.jsx
// ══════════════════════════════════════════════════════════════════

const entrada = 'w-full rounded-xl border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2';

function Campo({ etiqueta, ayuda, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
        {etiqueta}
      </span>
      {ayuda && (
        <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
          {ayuda}
        </span>
      )}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Pestanita({ activo, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg px-3 py-1.5 text-xs font-semibold transition"
      style={{
        backgroundColor: activo ? COLORES.tinta : '#fff',
        color: activo ? '#fff' : COLORES.textoSuave,
        border: `1px solid ${activo ? COLORES.tinta : COLORES.borde}`,
      }}
    >
      {children}
    </button>
  );
}

/** Una línea de producto dentro de la mezcla de tanque. */
function LineaProducto({ item, onCambiar, onQuitar, condiciones, indice }) {
  const producto = PRODUCTOS.find((p) => p.id === item.productoId) || null;
  const opciones = unidadesSugeridas(producto);
  const color = producto ? COLOR_CATEGORIA[producto.categoria] : COLORES.tinta;
  const formulacion = formulacionDe(producto);

  const resultado = useMemo(
    () =>
      calcularMezcla({
        dosis: item.dosis,
        unidad: item.unidad,
        area: condiciones.area,
        volumenHa: condiciones.volumenHa,
        capacidadBomba: condiciones.capacidadBomba,
      }),
    [item.dosis, item.unidad, condiciones]
  );

  return (
    <div
      className="rounded-xl border bg-white p-3"
      style={{ borderColor: COLORES.borde, borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-start gap-2">
        <span className="mt-2 font-mono text-xs font-bold" style={{ color: COLORES.textoSuave }}>
          {String(indice + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <select
            value={item.productoId}
            onChange={(e) => {
              const nuevo = PRODUCTOS.find((p) => p.id === e.target.value);
              const nuevasUnidades = unidadesSugeridas(nuevo);
              onCambiar({
                ...item,
                productoId: e.target.value,
                unidad: nuevasUnidades.includes(item.unidad) ? item.unidad : nuevasUnidades[0],
              });
            }}
            className={entrada}
            style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
          >
            <option value="">Selecciona un producto…</option>
            {PRODUCTOS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.categoria} · {p.nombre}
              </option>
            ))}
          </select>

          {producto && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {producto.sistema && (
                <SelloGrupo sistema={producto.sistema} grupo={producto.grupo} color={color} />
              )}
              {formulacion && (
                <span className="text-xs" style={{ color: COLORES.textoSuave }}>
                  {formulacion.nombre}
                </span>
              )}
              <span className="text-xs" style={{ color: COLORES.textoSuave }}>
                Envases: {producto.presentaciones.join(' · ')}
              </span>
            </div>
          )}

          <div className="mt-2 flex gap-2">
            <input
              type="number"
              min="0"
              step="any"
              value={item.dosis}
              onChange={(e) => onCambiar({ ...item, dosis: e.target.value })}
              placeholder="Dosis"
              className={entrada}
              style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
            />
            <select
              value={item.unidad}
              onChange={(e) => onCambiar({ ...item, unidad: e.target.value })}
              className="shrink-0 rounded-xl border bg-white px-2 text-sm"
              style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
            >
              {opciones.map((u) => (
                <option key={u} value={u}>
                  {UNIDADES[u].etiqueta}
                </option>
              ))}
            </select>
          </div>

          {resultado && (
            <div
              className="mt-2 rounded p-2 text-sm"
              style={{ backgroundColor: COLORES.papel, color: COLORES.tinta }}
            >
              <span className="font-mono font-bold">
                {unidadAmigable(resultado.productoPorBomba, resultado.base)}
              </span>{' '}
              por bomba ·{' '}
              <span className="font-mono font-bold">
                {unidadAmigable(resultado.productoTotal, resultado.base)}
              </span>{' '}
              para el lote
            </div>
          )}
        </div>

        <button
          onClick={onQuitar}
          className="shrink-0 rounded p-1.5 transition hover:bg-slate-100"
          aria-label="Quitar producto de la mezcla"
        >
          <Trash2 size={15} style={{ color: COLORES.textoSuave }} />
        </button>
      </div>
    </div>
  );
}

/** Calculadora de mezcla, calibración y orden de carga. */
function Mezcla() {
  const [vista, setVista] = useState('mezcla');
  const [condiciones, setCondiciones] = useState({
    area: '1',
    volumenHa: '200',
    capacidadBomba: '20',
  });
  const [items, setItems] = useState([{ productoId: '', dosis: '', unidad: 'L/ha' }]);

  // calibración
  const [calib, setCalib] = useState({ gastoLitros: '', anchoFranja: '', distancia: '' });
  const resultadoCalib = useMemo(() => calcularCalibracion(calib), [calib]);

  const productosElegidos = items
    .map((i) => PRODUCTOS.find((p) => p.id === i.productoId))
    .filter(Boolean);

  // Choques de modo de acción dentro de la misma mezcla
  const choques = useMemo(() => {
    const lista = [];
    for (let i = 0; i < productosElegidos.length; i += 1) {
      for (let j = i + 1; j < productosElegidos.length; j += 1) {
        if (compartenModoDeAccion(productosElegidos[i], productosElegidos[j])) {
          lista.push({
            a: productosElegidos[i],
            b: productosElegidos[j],
            motivo: explicarConflicto(productosElegidos[i], productosElegidos[j]),
          });
        }
      }
    }
    return lista;
  }, [productosElegidos]);

  // Orden de carga sugerido para los productos elegidos
  const ordenCarga = useMemo(
    () =>
      productosElegidos
        .map((p) => ({ producto: p, f: formulacionDe(p) }))
        .filter((x) => x.f)
        .sort((a, b) => a.f.ordenCarga - b.f.ordenCarga),
    [productosElegidos]
  );

  const resumen = useMemo(
    () =>
      calcularMezcla({
        dosis: 1,
        unidad: 'L/ha',
        area: condiciones.area,
        volumenHa: condiciones.volumenHa,
        capacidadBomba: condiciones.capacidadBomba,
      }),
    [condiciones]
  );

  const actualizar = (campo) => (e) => setCondiciones({ ...condiciones, [campo]: e.target.value });

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Mezcla y aplicación
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        Toma la dosis de la etiqueta y calcula cuánto va por bomba. Si mezclas varios productos,
        revisa además el orden de carga y los choques de modo de acción.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Pestanita activo={vista === 'mezcla'} onClick={() => setVista('mezcla')}>
          <Beaker size={12} className="mr-1 inline" /> Mezcla
        </Pestanita>
        <Pestanita activo={vista === 'calibracion'} onClick={() => setVista('calibracion')}>
          <Ruler size={12} className="mr-1 inline" /> Calibración
        </Pestanita>
        <Pestanita activo={vista === 'orden'} onClick={() => setVista('orden')}>
          <ListOrdered size={12} className="mr-1 inline" /> Orden de carga
        </Pestanita>
      </div>

      {/* ───────────── MEZCLA ───────────── */}
      {vista === 'mezcla' && (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Campo etiqueta="Área" ayuda="Hectáreas">
              <input
                type="number" min="0" step="any"
                value={condiciones.area} onChange={actualizar('area')}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
            <Campo etiqueta="Volumen" ayuda="Litros de agua por hectárea">
              <input
                type="number" min="0" step="any"
                value={condiciones.volumenHa} onChange={actualizar('volumenHa')}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
            <Campo etiqueta="Bomba" ayuda="Litros por tanque">
              <input
                type="number" min="0" step="any"
                value={condiciones.capacidadBomba} onChange={actualizar('capacidadBomba')}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
          </div>

          {resumen && (
            <div
              className="mt-3 rounded-lg p-3 text-sm"
              style={{ backgroundColor: COLORES.tinta, color: '#fff' }}
            >
              <span className="font-mono text-lg font-bold">{formatear(resumen.numeroBombas, 1)}</span>{' '}
              bombas ·{' '}
              <span className="font-mono text-lg font-bold">{formatear(resumen.aguaTotal, 0)} L</span>{' '}
              de agua en total
              {resumen.fraccionUltimaBomba > 0.01 && (
                <span style={{ color: '#9DB8C9' }}>
                  {' '}
                  · la última al {Math.round(resumen.fraccionUltimaBomba * 100)}%
                </span>
              )}
            </div>
          )}

          <div className="mt-5 space-y-3">
            {items.map((item, i) => (
              <LineaProducto
                key={i}
                indice={i}
                item={item}
                condiciones={condiciones}
                onCambiar={(nuevo) => setItems(items.map((it, j) => (j === i ? nuevo : it)))}
                onQuitar={() => setItems(items.filter((_, j) => j !== i))}
              />
            ))}
          </div>

          <button
            onClick={() => setItems([...items, { productoId: '', dosis: '', unidad: 'L/ha' }])}
            className="mt-3 flex items-center gap-1.5 rounded-2xl border border-dashed px-4 py-2 text-sm font-semibold transition hover:bg-white"
            style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
          >
            <Plus size={15} /> Agregar producto a la mezcla
          </button>

          {choques.length > 0 && (
            <div
              className="mt-4 rounded-lg p-3"
              style={{ backgroundColor: '#FDF3EE', border: '1px solid #F0C9B4' }}
            >
              <p className="flex items-center gap-2 text-sm font-bold" style={{ color: '#C2410C' }}>
                <AlertTriangle size={15} /> Modos de acción repetidos en la mezcla
              </p>
              <ul className="mt-2 space-y-1">
                {choques.map((c, i) => (
                  <li key={i} className="text-sm" style={{ color: COLORES.tinta }}>
                    {c.a.nombre} y {c.b.nombre}: {c.motivo}.
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs" style={{ color: COLORES.textoSuave }}>
                Mezclar dos productos del mismo sitio de acción no amplía el espectro y sí duplica la
                presión de selección sobre ese blanco.
              </p>
            </div>
          )}
        </>
      )}

      {/* ───────────── CALIBRACIÓN ───────────── */}
      {vista === 'calibracion' && (
        <>
          <p className="mt-5 text-sm" style={{ color: COLORES.textoSuave }}>
            Asperja una distancia conocida con agua, mide cuántos litros gastaste y obtén el volumen
            real por hectárea. Ese número es el que debes usar en la pestaña de mezcla, no el que
            supones.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Campo etiqueta="Gasto medido" ayuda="Litros gastados en la prueba">
              <input
                type="number" min="0" step="any" value={calib.gastoLitros}
                onChange={(e) => setCalib({ ...calib, gastoLitros: e.target.value })}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
            <Campo etiqueta="Ancho de franja" ayuda="Metros que cubre un pase">
              <input
                type="number" min="0" step="any" value={calib.anchoFranja}
                onChange={(e) => setCalib({ ...calib, anchoFranja: e.target.value })}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
            <Campo etiqueta="Distancia recorrida" ayuda="Metros">
              <input
                type="number" min="0" step="any" value={calib.distancia}
                onChange={(e) => setCalib({ ...calib, distancia: e.target.value })}
                className={entrada} style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
              />
            </Campo>
          </div>

          {resultadoCalib ? (
            <div className="mt-4 rounded-lg p-4" style={{ backgroundColor: COLORES.tinta }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#9DB8C9' }}>
                Volumen real de aplicación
              </p>
              <p className="mt-1 font-mono text-3xl font-bold text-white">
                {formatear(resultadoCalib.volumenHa, 0)} L/ha
              </p>
              <p className="mt-2 text-xs" style={{ color: '#9DB8C9' }}>
                Área tratada en la prueba: {formatear(resultadoCalib.areaTratada, 0)} m²
              </p>
              <button
                onClick={() => {
                  setCondiciones({ ...condiciones, volumenHa: String(Math.round(resultadoCalib.volumenHa)) });
                  setVista('mezcla');
                }}
                className="mt-3 rounded-lg px-3 py-1.5 text-xs font-semibold"
                style={{ backgroundColor: COLORES.naranja, color: '#fff' }}
              >
                Usar este volumen en la mezcla
              </button>
            </div>
          ) : (
            <div
              className="mt-4 rounded-2xl border border-dashed p-6 text-center text-sm"
              style={{ borderColor: COLORES.borde, color: COLORES.textoSuave }}
            >
              Completa los tres datos de la prueba para calcular el volumen real.
            </div>
          )}
        </>
      )}

      {/* ───────────── ORDEN DE CARGA ───────────── */}
      {vista === 'orden' && (
        <>
          {ordenCarga.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-bold" style={{ color: COLORES.tinta }}>
                Orden para tu mezcla
              </h3>
              <ol className="mt-2 space-y-2">
                {ordenCarga.map(({ producto, f }, i) => (
                  <li
                    key={producto.id}
                    className="flex items-center gap-3 rounded-xl border bg-white p-3"
                    style={{ borderColor: COLORES.borde }}
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
                      style={{ backgroundColor: COLORES.naranja }}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
                        {producto.nombre}
                      </span>
                      <span className="text-xs" style={{ color: COLORES.textoSuave }}>
                        {f.nombre} ({f.sigla})
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <h3 className="mt-6 text-sm font-bold" style={{ color: COLORES.tinta }}>
            Regla general de carga
          </h3>
          <ol className="mt-2 space-y-2">
            {ORDEN_TANQUE.map((p) => (
              <li key={p.paso} className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold"
                  style={{ backgroundColor: COLORES.azulClaro, color: COLORES.tinta }}
                >
                  {p.paso}
                </span>
                <span>
                  <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
                    {p.que}
                  </span>
                  <span className="text-xs" style={{ color: COLORES.textoSuave }}>
                    {p.detalle}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </>
      )}

      <div className="mt-6 flex gap-2 rounded-lg p-3" style={{ backgroundColor: COLORES.papel }}>
        <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.textoSuave }} />
        <p className="text-xs leading-relaxed" style={{ color: COLORES.textoSuave }}>
          La dosis debe salir siempre de la etiqueta ICA del producto. Antes de mezclar dos productos
          por primera vez, haz una prueba de compatibilidad en un frasco con la misma proporción y
          espera 15 minutos: si hay grumos, natas o separación, no los mezcles en el tanque.
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/Aprender.jsx
// ══════════════════════════════════════════════════════════════════

// Cada tema se identifica con un icono y el color de la línea con la que se
// relaciona, para que el módulo se lea igual que el resto de la app.
const ESTILO_TEMA = {
  resistencia: { icono: ShieldCheck, color: COLORES.tinta, fondo: COLORES.grisClaro },
  translocacion: { icono: Move, color: COLORES.azul, fondo: COLORES.azulClaro },
  arvenses: { icono: Sprout, color: COLORES.naranja, fondo: COLORES.naranjaClaro },
  hongos: { icono: Leaf, color: COLORES.teal, fondo: COLORES.tealClaro },
  insectos: { icono: Bug, color: COLORES.azul, fondo: COLORES.azulClaro },
  aplicacion: { icono: SprayCan, color: COLORES.verde, fondo: COLORES.verdeClaro },
  etiqueta: { icono: FileText, color: COLORES.ambar, fondo: COLORES.ambarClaro },
  umbrales: { icono: Target, color: COLORES.gris, fondo: COLORES.grisClaro },
  estres: { icono: Stethoscope, color: COLORES.ambar, fondo: COLORES.ambarClaro },
};

function Acordeon({ pregunta, respuesta }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: COLORES.borde }}>
      <button
        onClick={() => setAbierto(!abierto)}
        className="flex w-full items-start justify-between gap-3 py-3 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: COLORES.tinta }}>
          {pregunta}
        </span>
        <ChevronDown
          size={16}
          className="mt-0.5 shrink-0 transition"
          style={{
            color: COLORES.textoSuave,
            transform: abierto ? 'rotate(180deg)' : 'none',
          }}
        />
      </button>
      {abierto && (
        <p className="pb-3 text-sm leading-relaxed" style={{ color: COLORES.textoSuave }}>
          {respuesta}
        </p>
      )}
    </div>
  );
}

/** Módulo de referencia: el "por qué" detrás de las recomendaciones. */
function Aprender() {
  const [temaId, setTemaId] = useState(null);
  const tema = TEMAS.find((t) => t.id === temaId);

  if (tema) {
    return (
      <div>
        <button
          onClick={() => setTemaId(null)}
          className="flex items-center gap-1.5 text-sm font-medium transition hover:opacity-70"
          style={{ color: COLORES.textoSuave }}
        >
          <ArrowLeft size={15} /> Todos los temas
        </button>

        <h2 className="mt-3 text-xl font-bold" style={{ color: COLORES.tinta }}>
          {tema.titulo}
        </h2>
        <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
          {tema.resumen}
        </p>

        <div className="mt-5 space-y-4">
          {tema.secciones.map((s, i) => (
            <React.Fragment key={s.titulo}>
              <div
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: s.destacado ? COLORES.naranjaClaro : '#fff',
                  boxShadow: s.destacado ? 'none' : '0 1px 3px rgba(11,36,49,0.08)',
                  border: s.destacado ? `1px solid ${COLORES.naranja}55` : 'none',
                }}
              >
                <h3 className="text-sm font-bold" style={{ color: COLORES.tinta }}>
                  {s.titulo}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  {s.texto}
                </p>
              </div>
              {/* La ilustración va tras el primer apartado, cuando el lector ya
                  tiene el contexto pero antes de que el texto se haga denso. */}
              {i === 0 &&
                (ILUSTRACIONES_POR_TEMA[tema.id] || []).map((Ilustracion, k) => (
                  <Ilustracion key={k} />
                ))}
            </React.Fragment>
          ))}
        </div>

        {/* Referencia visual de translocación dentro del tema correspondiente */}
        {tema.id === 'translocacion' && (
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: COLORES.tinta }}>
              Referencia rápida
            </h3>
            <div className="mt-3 space-y-2">
              {Object.values(TRANSLOCACION).map((t) => (
                <div
                  key={t.id}
                  className="flex gap-3 rounded-xl border bg-white p-3"
                  style={{ borderColor: COLORES.borde }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-lg"
                    style={{ backgroundColor: COLORES.azulClaro, color: COLORES.azul }}
                  >
                    {t.icono}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold" style={{ color: COLORES.tinta }}>
                      {t.nombre}
                    </span>
                    <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
                      {t.implicacion}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
        Aprender
      </h2>
      <p className="mt-1 text-sm" style={{ color: COLORES.textoSuave }}>
        El razonamiento agronómico detrás de cada recomendación de la app.
      </p>

      <div className="mt-5 space-y-3">
        {TEMAS.map((t) => {
          const e = ESTILO_TEMA[t.id] || ESTILO_TEMA.resistencia;
          return (
            <FilaMenu
              key={t.id}
              icono={e.icono}
              color={e.color}
              fondo={e.fondo}
              titulo={t.titulo}
              descripcion={t.resumen}
              onClick={() => setTemaId(t.id)}
              insignia={
                <span className="text-[11px] font-semibold" style={{ color: COLORES.textoSuave }}>
                  {t.secciones.length} apartados
                </span>
              }
            />
          );
        })}
      </div>

      <h3
        className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wide"
        style={{ color: COLORES.tinta }}
      >
        <Lightbulb size={15} style={{ color: COLORES.naranja }} /> Preguntas de campo
      </h3>
      <div className="mt-2">
        {PREGUNTAS.map((q) => (
          <Acordeon key={q.p} pregunta={q.p} respuesta={q.r} />
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/App.jsx
// ══════════════════════════════════════════════════════════════════

// La barra inferior se queda con cinco entradas: más de eso deja de leerse
// bien en un teléfono. "Ciclo de vida" vive dentro de Diagnóstico.
const PESTANAS = [
  { id: 'diagnostico', label: 'Diagnóstico', icono: Stethoscope, titulo: 'Contenido' },
  { id: 'catalogo', label: 'Catálogo', icono: LayoutList, titulo: 'Portafolio' },
  { id: 'rotacion', label: 'Rotación', icono: RotateCcw, titulo: 'Manejo de resistencia' },
  { id: 'mezcla', label: 'Mezcla', icono: Calculator, titulo: 'Calculadoras' },
  { id: 'aprender', label: 'Aprender', icono: GraduationCap, titulo: 'Datos de interés' },
];

function App() {
  const [pestana, setPestana] = useState('diagnostico');
  const [productoAbierto, setProductoAbierto] = useState(null);
  const [productoRotacion, setProductoRotacion] = useState(null);
  const [verCiclo, setVerCiclo] = useState(false);

  const actual = PESTANAS.find((p) => p.id === pestana);

  const irARotacion = (producto) => {
    setProductoRotacion(producto);
    setProductoAbierto(null);
    setVerCiclo(false);
    setPestana('rotacion');
  };

  const cambiarPestana = (id) => {
    setVerCiclo(false);
    setPestana(id);
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: COLORES.papel }}>
      <Encabezado
        titulo={verCiclo ? 'Ciclo de vida' : actual.titulo}
        subtitulo={`${PRODUCTOS.length} productos · IRAC · HRAC · FRAC`}
      />

      <main className="mx-auto max-w-3xl px-4 py-5">
        {pestana === 'diagnostico' &&
          (verCiclo ? (
            <CicloVida onAbrirProducto={setProductoAbierto} onVolver={() => setVerCiclo(false)} />
          ) : (
            <Diagnostico onAbrirProducto={setProductoAbierto} onVerCiclo={() => setVerCiclo(true)} />
          ))}
        {pestana === 'catalogo' && <Catalogo onAbrirProducto={setProductoAbierto} />}
        {pestana === 'rotacion' && (
          <Rotacion onAbrirProducto={setProductoAbierto} productoInicial={productoRotacion} />
        )}
        {pestana === 'mezcla' && <Mezcla />}
        {pestana === 'aprender' && <Aprender />}

        <p
          className="mt-8 border-t pt-4 text-center text-xs leading-relaxed"
          style={{ borderColor: COLORES.borde, color: COLORES.textoSuave }}
        >
          Herramienta de apoyo a la decisión sobre el portafolio Cibochem 2026.
          No reemplaza la etiqueta ICA ni la visita técnica.
        </p>
      </main>

      <BarraInferior pestanas={PESTANAS} activa={pestana} onCambio={cambiarPestana} />

      {productoAbierto && (
        <FichaProducto
          producto={productoAbierto}
          onCerrar={() => setProductoAbierto(null)}
          onVerRotacion={irARotacion}
        />
      )}
    </div>
  );
}

export default App;
