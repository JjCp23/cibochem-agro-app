/**
 * Cibochem Campo — versión de un solo archivo.
 *
 * ARCHIVO GENERADO AUTOMÁTICAMENTE. No lo edites a mano:
 * modifica los módulos en src/ y vuelve a correr
 *   node scripts/generar-artefacto.mjs
 */

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Activity, AlertTriangle, ArrowLeft, Ban, Beaker, Bug, Calculator, Check, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, Compass, Download, Droplet, Droplets, FileText, FlaskConical, Gauge, GraduationCap, Info, LayoutList, Leaf, Lightbulb, ListOrdered, Minus, Move, OctagonAlert, Package, Plus, RefreshCw, RotateCcw, Ruler, Search, SearchX, ShieldAlert, ShieldCheck, Sparkles, SprayCan, Sprout, Stethoscope, Sun, Target, Trash2, WifiOff, X } from 'lucide-react';

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
 * Capacidad de la caneca de referencia con la que se explica el orden de
 * carga. Los litros de cada paso están pensados sobre esta caneca.
 */
const CAPACIDAD_CANECA = 200;

/**
 * Orden recomendado de carga del tanque.
 * El orden correcto evita grumos, floculación y boquillas tapadas.
 *
 * Cada paso dice qué hacer (que, detalle), por qué (porque), qué
 * formulaciones entran en él (siglas), a qué familia pertenece (categoria) y
 * hasta dónde llega el agua en la caneca de referencia al terminarlo
 * (litros). Con eso la caneca de la pestaña "Orden de carga" sube de nivel
 * paso a paso.
 */
const PASOS_CARGA = [
  {
    paso: 1,
    que: 'Agua hasta el 70%',
    detalle: 'Llenar la caneca hasta unos 140 L con el agitador ya funcionando.',
    porque:
      'Empezar con agua en movimiento evita que el primer producto que cae quede concentrado en el fondo sin diluir, que es la forma más común de generar el primer grumo. Se arranca al 70% para tener sitio de sobra: los productos suman poco volumen y el resto se completa con agua al final.',
    siglas: [],
    categoria: 'agua',
    litros: 140,
  },
  {
    paso: 2,
    que: 'Acondicionador de agua: dureza y pH',
    detalle: 'Corregir dureza y pH antes de agregar cualquier producto.',
    porque:
      'El agua dura (con calcio y magnesio disueltos) se une a moléculas de varios herbicidas —el caso más conocido es el glifosato— y baja su absorción por la planta. Un pH alto, por su parte, acelera la hidrólisis de insecticidas organofosforados y carbamatos: el ingrediente activo empieza a degradarse dentro del propio tanque antes de salir por la boquilla. Corregir esto primero evita perder eficacia sin que se note a simple vista.',
    siglas: [],
    categoria: 'acondicionador',
    litros: 140.2,
  },
  {
    paso: 3,
    que: 'Antiespumante, si hace falta',
    detalle: 'Un chorrito antes de los sólidos si el agua tiende a hacer espuma.',
    porque:
      'La agitación con productos que ya traen tensioactivos genera espuma. Si el tanque se llena de espuma, la bomba empieza a mover aire en vez de mezcla, el volumen real por hectárea deja de coincidir con el calculado y llenar el tanque se vuelve lento.',
    siglas: [],
    categoria: 'acondicionador',
    litros: 140.3,
  },
  {
    paso: 4,
    que: 'Bolsas hidrosolubles (WSB)',
    detalle: 'Echarlas enteras y esperar a que se disuelvan por completo.',
    porque:
      'La película de la bolsa necesita agua limpia y agitación para disolverse. Si entran cuando el caldo ya tiene sales, aceites o coadyuvantes, la película no abre bien y quedan restos de plástico y producto sin dispersar.',
    siglas: ['WSB', 'WSP'],
    categoria: 'solido',
    litros: 140.7,
  },
  {
    paso: 5,
    que: 'Granulados dispersables (WG, WDG, DF)',
    detalle: 'Prediluir en un balde aparte y verter lentamente, colando.',
    porque:
      'Están diseñados para dispersarse en agua abundante y limpia. Si caen secos sobre un caldo cargado se aglomeran en grumos que después tapan boquillas o quedan sin aplicar en el fondo.',
    siglas: ['WG', 'WDG', 'DF'],
    categoria: 'solido',
    litros: 141.2,
  },
  {
    paso: 6,
    que: 'Polvos mojables (WP)',
    detalle: 'También prediluidos en balde, nunca secos al tanque.',
    porque:
      'Son los más propensos a formar grumos porque su partícula no se disuelve, solo queda suspendida. Necesitan agua en movimiento y espacio para hidratarse antes de que entren los productos que aumentan la carga del caldo.',
    siglas: ['WP'],
    categoria: 'solido',
    litros: 141.7,
  },
  {
    paso: 7,
    que: 'Granulados y polvos solubles (SG, SP)',
    detalle: 'Agregar directo con el agitador andando.',
    porque:
      'Se disuelven de verdad en el agua, no quedan en suspensión, así que toleran entrar después de los que sí necesitan dispersarse. Aun así van antes que los líquidos para no competir con ellos por el agua disponible.',
    siglas: ['SG', 'SP', 'TB'],
    categoria: 'solido',
    litros: 142.1,
  },
  {
    paso: 8,
    que: 'Suspensiones concentradas (SC, SE, FL)',
    detalle: 'Agitar bien el envase antes de verter.',
    porque:
      'Vienen estables de fábrica, pero su estabilidad depende de que nada rompa la suspensión. Entran después de los sólidos para no competir con su dispersión y antes de los emulsionables, cuyo surfactante puede desestabilizarlas.',
    siglas: ['SC', 'SE', 'FL'],
    categoria: 'liquido',
    litros: 143.1,
  },
  {
    paso: 9,
    que: 'Concentrados solubles (SL)',
    detalle: 'Verter con el agitador funcionando.',
    porque:
      'Ya vienen disueltos, así que se integran sin esfuerzo. Se ubican después de las suspensiones porque algunos traen sales que, en agua muy cargada, pueden hacer flocular las partículas que ya están suspendidas.',
    siglas: ['SL'],
    categoria: 'liquido',
    litros: 144.3,
  },
  {
    paso: 10,
    que: 'Emulsiones y emulsionables (EW, EC)',
    detalle: 'Casi al final: pueden romper lo que ya está suspendido.',
    porque:
      'Los concentrados emulsionables traen su propio agente emulsionante. Si entran antes que las suspensiones presentes en el tanque, ese emulsionante puede desestabilizar las partículas y causar separación o "cortes" visibles —capas, natas o grumos que ya no se recuperan agitando.',
    siglas: ['EW', 'EC', 'CE'],
    categoria: 'liquido',
    litros: 145.3,
  },
  {
    paso: 11,
    que: 'Fertilizantes foliares y micronutrientes',
    detalle: 'Después de los plaguicidas, nunca antes.',
    porque:
      'Son sales concentradas. Agregadas temprano suben la fuerza iónica del caldo y hacen flocular suspensiones y emulsiones ya formadas. Los micronutrientes metálicos (hierro, zinc, manganeso, cobre) además pueden quelatar moléculas de plaguicida y bajarles la actividad.',
    siglas: [],
    categoria: 'liquido',
    litros: 147.3,
  },
  {
    paso: 12,
    que: 'Coadyuvantes: tensioactivos, aceites, antideriva',
    detalle: 'Siempre de últimos, con el tanque casi lleno.',
    porque:
      'Van al final para no interferir con la disolución de lo anterior y porque su dosis se calcula sobre el volumen final, que solo se conoce con el tanque casi lleno. Entrar temprano hace que generen espuma durante toda la carga.',
    siglas: [],
    categoria: 'coadyuvante',
    litros: 147.7,
  },
  {
    paso: 13,
    que: 'Completar agua y mantener la agitación',
    detalle: 'Terminar de llenar y no parar el agitador hasta vaciar el tanque.',
    porque:
      'Detener la agitación —incluso en una pausa corta— permite que las partículas sólidas se sedimenten y que las emulsiones empiecen a separarse en capas. Lo que sale por la boquilla al reanudar ya no es la misma mezcla que se armó. Aplica el caldo el mismo día: guardado de un día para otro se degrada y se separa.',
    siglas: [],
    categoria: 'cierre',
    litros: 200,
  },
];

/** Orden de carga con el nivel de la caneca (0 a 1) al terminar cada paso. */
const ORDEN_TANQUE = PASOS_CARGA.map((p) => ({ ...p, nivel: p.litros / CAPACIDAD_CANECA }));

/** Qué hace cada tipo de coadyuvante y cuándo se usa. */
const COADYUVANTES = [
  {
    categoria: 'Tensioactivos / humectantes',
    quePasa:
      'Bajan la tensión superficial del agua para que la gota se extienda sobre la hoja en vez de escurrir, sobre todo en hojas cerosas o pubescentes donde el agua sola rueda sin mojar.',
    cuando: 'Frecuente en post-emergentes de contacto y en aplicaciones foliares en general.',
  },
  {
    categoria: 'Acidificantes / corrector de pH',
    quePasa:
      'Bajan el pH del agua de mezcla cuando sale alcalina de la fuente, para que los ingredientes activos sensibles a la hidrólisis no se degraden dentro del tanque.',
    cuando: 'Se agregan en el paso 2, antes de cualquier otro producto.',
  },
  {
    categoria: 'Acondicionadores de agua dura',
    quePasa:
      'Secuestran el calcio y el magnesio disueltos en el agua para que no se unan a moléculas aniónicas del herbicida —el glifosato es el caso más conocido— y le resten absorción.',
    cuando: 'Se agregan en el paso 2, antes de cualquier otro producto, igual que el corrector de pH.',
  },
  {
    categoria: 'Antiespumantes',
    quePasa:
      'Reducen la espuma que genera la agitación mecánica, más notoria con productos que ya traen tensioactivos fuertes. Espuma excesiva puede hacer que la bomba dosifique aire en vez de mezcla.',
    cuando: 'Se agregan al final, junto con los demás coadyuvantes.',
  },
  {
    categoria: 'Aceites agrícolas (minerales o vegetales)',
    quePasa:
      'Mejoran la penetración a través de la cutícula de la hoja y alargan el tiempo que la gota permanece húmeda sobre la superficie.',
    cuando: 'Comunes con graminicidas post-emergentes y algunos insecticidas de contacto.',
  },
  {
    categoria: 'Coadyuvantes antideriva',
    quePasa:
      'Modifican el tamaño de gota o forman una película que retarda la evaporación, reduciendo la deriva por viento sin cambiar la química del ingrediente activo.',
    cuando: 'Útiles en aplicaciones con viento variable o boquillas que generan gota muy fina.',
  },
  {
    categoria: 'Colorantes / marcadores',
    quePasa:
      'No tienen función agronómica: solo marcan visualmente por dónde ya pasó el aspersor, para evitar traslapes o franjas sin cubrir.',
    cuando: 'Útiles en lotes grandes o irregulares donde es difícil ver el avance a simple vista.',
  },
];

/** Nombre de cada formulación por su sigla en la etiqueta. */
const NOMBRE_FORMULACION = {
  WSB: 'Bolsa hidrosoluble',
  WSP: 'Bolsa hidrosoluble',
  WG: 'Granulado dispersable',
  WDG: 'Granulado dispersable',
  DF: 'Granulado dispersable',
  WP: 'Polvo mojable',
  SG: 'Granulado soluble',
  SP: 'Polvo soluble',
  TB: 'Tableta soluble',
  SC: 'Suspensión concentrada',
  SE: 'Suspoemulsión',
  FL: 'Suspensión concentrada',
  SL: 'Concentrado soluble',
  EW: 'Emulsión aceite en agua',
  EC: 'Concentrado emulsionable',
  CE: 'Concentrado emulsionable',
};

/** Paso del orden de carga en el que entra cada sigla de formulación. */
const PASO_POR_SIGLA = ORDEN_TANQUE.reduce((mapa, p) => {
  p.siglas.forEach((sigla) => {
    mapa[sigla] = p.paso;
  });
  return mapa;
}, {});

const SIGLAS = Object.keys(NOMBRE_FORMULACION).join('|');

/**
 * Deduce el tipo de formulación desde el nombre comercial del producto.
 * ordenCarga es el número de paso de ORDEN_TANQUE en el que se agrega; si la
 * sigla no aparece en ningún paso, se ubica con las suspensiones (paso 8).
 */
function formulacionDe(producto) {
  const m = String(producto?.nombre || '').match(new RegExp(`\\b(${SIGLAS})\\b`, 'i'));
  if (!m) return null;
  const f = m[1].toUpperCase();
  return { sigla: f, nombre: NOMBRE_FORMULACION[f] || f, ordenCarga: PASO_POR_SIGLA[f] || 8 };
}

/**
 * Cuántos tipos de formulación distintos entran en una mezcla. Desde tres
 * tipos se considera riesgo de incompatibilidad: más pasos delicados en el
 * orden de carga y más probabilidad de grumos o separación.
 */
function analizarFormulaciones(productos) {
  const porSigla = new Map();
  (productos || []).forEach((p) => {
    const f = formulacionDe(p);
    if (f && !porSigla.has(f.sigla)) porSigla.set(f.sigla, f);
  });
  const tipos = [...porSigla.values()];
  return { tipos, distintas: tipos.length, riesgo: tipos.length >= 3 };
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

const CLAVE_MODO_CAMPO = 'cibochem-modo-campo';

/**
 * Modo campo: agranda toda la interfaz (texto y botones) para leer bajo el sol
 * o tocar con guantes. Se aplica como una clase en <html> que sube el tamaño de
 * letra base (ver index.css), así todo lo que está en rem crece en proporción.
 * La preferencia se recuerda en el teléfono entre visitas.
 */
function useModoCampo() {
  const [activo, setActivo] = useState(() => localStorage.getItem(CLAVE_MODO_CAMPO) === '1');
  useEffect(() => {
    document.documentElement.classList.toggle('modo-campo', activo);
    localStorage.setItem(CLAVE_MODO_CAMPO, activo ? '1' : '0');
  }, [activo]);
  return [activo, setActivo];
}

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

/**
 * Encabezado azul con el logotipo y, opcionalmente, un control segmentado.
 * El sol de la esquina activa el modo campo.
 */
function Encabezado({ titulo, subtitulo, children }) {
  const [modoCampo, setModoCampo] = useModoCampo();
  return (
    <header style={{ backgroundColor: COLORES.azul }} className="relative">
      <button
        onClick={() => setModoCampo((v) => !v)}
        aria-pressed={modoCampo}
        aria-label={
          modoCampo
            ? 'Desactivar modo campo (texto y botones grandes)'
            : 'Activar modo campo: agranda texto y botones para leer bajo sol o tocar con guantes'
        }
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition"
        style={{
          backgroundColor: modoCampo ? '#fff' : 'rgba(255,255,255,0.16)',
          color: modoCampo ? COLORES.azul : '#fff',
        }}
      >
        <Sun size={18} strokeWidth={2} />
      </button>
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
// src/components/ui/iconos/IconosInsectos.jsx
// ══════════════════════════════════════════════════════════════════

/**
 * Íconos de las plagas del diagnóstico: uno por objetivo de la rama de insectos.
 *
 * Misma interfaz que los íconos de lucide-react (size, color, strokeWidth,
 * className), así el diagnóstico los pinta igual que cualquier otro ícono.
 * Se dibujan en una retícula de 48 × 48 con el trazo en el color de la rama y
 * rellenos translúcidos del mismo color, para que se lean bien a 30 px dentro
 * de los botones de opción.
 */

/** Chupadores (mosca blanca, áfidos, escamas). */
function IconoChupadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M2 34 C12 28 24 28.5 33 34 C39 37.7 43 42 45.5 46 L8 46 C6 42 3.5 38 2 34 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M3.5 35.5 C13 37.5 22 41 28 46" strokeWidth={strokeWidth * 0.75} />
      <path
        d="M11 23.5 C10.5 20 12.5 16.5 16 14.5 C21 11.6 26.5 13 27.8 17.5 C29 21.8 26 25.8 21 26.4 C16 27 11.6 26 11 23.5 Z"
        fill={color}
        fillOpacity={0.18}
        strokeWidth={strokeWidth * 1.8}
      />
      <path d="M24.6 14.2 L25.4 8.6 M27.6 16.5 L29.6 11.4" strokeWidth={strokeWidth * 1.05} />
      <path d="M15 26.4 L13.6 30 M20 26.9 L20 30.4 M24.3 25.6 L26.3 29.3" strokeWidth={strokeWidth * 0.85} />
      <path d="M11.3 24.8 C10.6 27 10.4 29.2 10.8 32.6" strokeWidth={strokeWidth * 0.9} />
      <circle cx="12.9" cy="23.2" r="1" fill={color} stroke="none" />
      <path
        d="M38 6.5 C42.5 9 45.5 14.5 45 19.5 C42.5 22.5 38 23.2 38 23.2 C38 23.2 33.5 22.5 31 19.5 C30.5 14.5 33.5 9 38 6.5 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M38 8.5 L38 22.8" strokeWidth={strokeWidth * 0.8} />
      <path d="M36.9 5.6 L34 2.8 M39.1 5.6 L42 2.8" strokeWidth={strokeWidth * 0.85} />
      <circle cx="38" cy="6.4" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

/** Masticadores (comedores de follaje). */
function IconoMasticadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  const contornoHoja =
    'M23.5 44 C18 41.5 13.5 37 11 32 Q17 30.5 10 27.5 C8.8 22 10.5 13.5 16.5 8 C18.8 5.9 21 4.5 23.5 4 C29 5 33.5 9 36 14 Q27 17 36.5 20 C37 22 37.5 24 37.3 26 Q26.5 29.3 35 32.5 C33.5 36.5 29 41 23.5 44 Z';
  const agujero = 'M16 20.5 C18.5 19 21 20 21.3 22.3 C21.6 24.8 19.5 26.3 17.3 25.5 C15.3 24.8 14.5 21.7 16 20.5 Z';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d={`${contornoHoja} ${agujero}`} fill={color} fillOpacity={0.16} fillRule="evenodd" stroke="none" />
      <path d={contornoHoja} strokeWidth={strokeWidth * 1.8} />
      <path d={agujero} strokeWidth={strokeWidth * 1.05} />
      <path d="M23.5 43 C22.9 33 22.8 18 23.5 5.5" strokeWidth={strokeWidth * 0.85} />
      <path
        d="M23.3 31 C26.8 29.4 30 27 32 24.5 M23.2 20.5 C26.5 18.8 29.8 16 31.8 13 M23.4 38 C21 36.6 18.5 34.8 16.8 32.8"
        strokeWidth={strokeWidth * 0.7}
      />
      <path d="M23.5 43.5 C23.6 45 23.7 45.8 23.8 46.5" strokeWidth={strokeWidth * 1.4} />
      <circle cx="33.4" cy="17.4" r="0.85" fill={color} stroke="none" />
      <circle cx="32.4" cy="30.1" r="0.75" fill={color} stroke="none" />
    </svg>
  );
}

/** Larvas de lepidóptero (gusanos en general). */
function IconoLepidopteros({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M3 40 C13 44.5 26 45 34 43 C39 41.8 43 40.5 45.5 39" strokeWidth={strokeWidth * 1.3} />
      <path
        d="M9 24.6 C11 19.6 17 17.6 23 17.9 C28 18.1 31.5 19.9 34 22.6 L34 29.6 C31.5 32.8 28 34.4 23 34.5 C17 34.6 11 33 9 30 A2.8 2.8 0 0 1 9 24.6 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.8}
      />
      <path
        d="M14 20.2 C15.6 25 15.4 29.5 14 33.4 M19.5 18.6 C21 24 21 29 19.7 34.2 M25 18 C26.5 23.5 26.5 29 25.3 34.4 M30 19.2 C31.4 24 31.4 29 30.4 33.6"
        strokeWidth={strokeWidth * 0.75}
      />
      <path d="M15.4 34.2 L15.1 38.2 M20.9 34.5 L20.7 38.6 M26.4 34.4 L26.3 38.4" strokeWidth={strokeWidth * 1.5} />
      <path d="M13.9 39.2 L16.3 39.2 M19.4 39.6 L21.9 39.6 M25.1 39.4 L27.5 39.4" strokeWidth={strokeWidth * 0.7} />
      <path d="M30.6 34 L30.1 37.4 M33.4 33.2 L33.6 36.6" strokeWidth={strokeWidth * 0.9} />
      <circle cx="38" cy="26" r="4.6" fill={color} fillOpacity={0.26} strokeWidth={strokeWidth * 1.7} />
      <circle cx="39.4" cy="24.4" r="1" fill={color} stroke="none" />
      <path d="M41.5 28.2 L44.2 29.2" strokeWidth={strokeWidth * 0.9} />
    </svg>
  );
}

/** Cogolleros (larva protegida en el cogollo). */
function IconoCogolleros({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M21.5 37 C15 30 9.5 22.5 3.5 16 C6 25.5 11 34 18 41.5 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 1.6}
      />
      <path
        d="M26.5 37 C33 30 38.5 22.5 44.5 16 C42 25.5 37 34 30 41.5 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 1.6}
      />
      <path
        d="M17 16 C19 27 21 36 22.5 45 L25.5 45 C27 36 29 27 31 16"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.7}
      />
      <path
        d="M20 19.5 C21.5 28.5 22.7 36.5 23.6 45 M28 19.5 C26.5 28.5 25.3 36.5 24.4 45"
        strokeWidth={strokeWidth * 0.8}
      />
      <path d="M21.8 20 C21 16.5 23.3 14 25.8 15.3 C27.8 16.4 27.4 19.4 25.2 19.9" strokeWidth={strokeWidth * 1.2} />
      <circle cx="15.3" cy="35" r="1.3" strokeWidth={strokeWidth * 0.9} />
      <circle cx="12.8" cy="31" r="1.3" strokeWidth={strokeWidth * 0.9} />
      <circle cx="9.9" cy="26.3" r="1.2" strokeWidth={strokeWidth * 0.9} />
      <circle cx="23" cy="25" r="0.9" fill={color} stroke="none" />
      <circle cx="25.2" cy="28" r="0.85" fill={color} stroke="none" />
      <circle cx="22.8" cy="31" r="0.8" fill={color} stroke="none" />
      <circle cx="24.8" cy="34" r="0.75" fill={color} stroke="none" />
    </svg>
  );
}

/** Ácaros (arañita roja, blanca). */
function IconoAcaros({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M3 10.5 C11 6.5 20 6 27 8.5 C34 11 40 11 45 8" strokeWidth={strokeWidth * 0.75} />
      <path d="M4 16 C12 12.5 20 12 27 14 C34 16 40 16.5 45 13.5" strokeWidth={strokeWidth * 0.75} />
      <path
        d="M11 8.2 L11.8 13.8 M20 6.6 L20.3 12.2 M28.5 8.9 L29 14.5 M37 10.9 L37.3 16.3"
        strokeWidth={strokeWidth * 0.7}
      />
      <path d="M24 14.4 C24.2 16.2 23.4 17.2 22.6 18.4" strokeWidth={strokeWidth * 0.7} />
      <path
        d="M14.5 22 L6.5 16.5 M13.2 25.5 L4.5 22.5 M13.2 30 L4.5 33 M14.8 33.5 L8 39 M29.5 22 L37.5 16.5 M30.8 25.5 L39.5 22.5 M30.8 30 L39.5 33 M29.2 33.5 L36 39"
        strokeWidth={strokeWidth * 1}
      />
      <ellipse cx="22" cy="27.5" rx="9" ry="8.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.8} />
      <circle cx="18.4" cy="26.2" r="2" fill={color} stroke="none" />
      <circle cx="25.6" cy="26.2" r="2" fill={color} stroke="none" />
    </svg>
  );
}

/** Trips (raspadores del follaje). */
function IconoTrips({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M30.5 21.2 C24 16.8 15 14.4 7 15 C15 16.6 24 19.2 30.5 21.2 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.05}
      />
      <path
        d="M26.5 17.4 L27.3 13.4 M22 15.9 L22.5 11.8 M17 14.8 L17.2 10.7 M11.5 14.7 L11.2 10.7"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M30.5 26.8 C24 31.2 15 33.6 7 33 C15 31.4 24 28.8 30.5 26.8 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.05}
      />
      <path
        d="M26.5 30.6 L27.3 34.6 M22 32.1 L22.5 36.2 M17 33.2 L17.2 37.3 M11.5 33.3 L11.2 37.3"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M6.5 24 C10.5 20.8 16 20.3 24 20.5 C30.5 20.7 34.5 22.1 34.5 24 C34.5 25.9 30.5 27.3 24 27.5 C16 27.7 10.5 27.2 6.5 24 Z"
        fill={color}
        fillOpacity={0.18}
        strokeWidth={strokeWidth * 1.7}
      />
      <path d="M12 21.9 L12 26.3 M16.5 21 L16.5 27 M21 20.7 L21 27.3" strokeWidth={strokeWidth * 0.7} />
      <circle cx="37" cy="24" r="3.3" fill={color} fillOpacity={0.2} strokeWidth={strokeWidth * 1.5} />
      <path d="M39 21.5 L43.5 18.5 M39.5 25.6 L44 27.6" strokeWidth={strokeWidth * 0.9} />
      <circle cx="38.1" cy="22.9" r="0.9" fill={color} stroke="none" />
    </svg>
  );
}

/** Raspadores (daño superficial en hoja y fruto). */
function IconoRaspadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <circle cx="22.5" cy="29" r="13.5" fill={color} fillOpacity={0.1} strokeWidth={strokeWidth * 1.8} />
      <path d="M13.5 24 C14.5 19.5 17.5 16.5 21 15.8" strokeWidth={strokeWidth * 0.7} />
      <path d="M22.5 15.5 C22.8 12 22.5 9.5 22 7" strokeWidth={strokeWidth * 1.4} />
      <path
        d="M22.4 10.5 C25.5 5.5 32 4.5 34.5 7 C33 11.5 27 13.5 22.6 11.2 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 1.3}
      />
      <path
        d="M23.5 21.5 C29 19.5 34.5 22 34.8 27.5 C35.1 33.5 30.5 38 25.5 37.5 C20.5 37 18.5 31.5 20 26.5 C20.7 24 21.8 22.1 23.5 21.5 Z"
        fill={color}
        fillOpacity={0.2}
        strokeWidth={strokeWidth * 0.95}
      />
      <path
        d="M23.5 25.5 L24.8 25.2 M27.5 23.8 L28.8 23.6 M31.5 26.5 L32.7 26.3 M22.8 29.5 L24 29.3 M26.5 28.5 L27.8 28.3 M30.5 30 L31.8 29.8 M23.5 33.5 L24.7 33.3 M27.5 32.5 L28.8 32.3 M31 34 L32.2 33.8 M25.5 36 L26.7 35.8"
        strokeWidth={strokeWidth * 0.8}
      />
      <circle cx="29" cy="26.2" r="0.7" fill={color} stroke="none" />
      <circle cx="26" cy="31.4" r="0.65" fill={color} stroke="none" />
    </svg>
  );
}

/** Minadores (galerías dentro de la hoja). */
function IconoMinadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M24 45 C15 39.5 9 30.5 9 21.5 C9 12 15.5 4.5 24 3.5 C32.5 4.5 39 12 39 21.5 C39 30.5 33 39.5 24 45 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.8}
      />
      <path d="M24 43.5 C23.6 33 23.6 15 24 5.5" strokeWidth={strokeWidth * 0.75} />
      <path
        d="M23.9 33 C26.8 31.4 29.5 29.6 31.2 27.8 M23.9 24 C27 22 30 19.4 31.8 17 M23.9 15 C26.4 13.6 28.6 12 30 10.6"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M14.5 37.5 C19 35 19 31 15 28.3 C10.8 25.4 12.2 20.8 17 19.4 C19.8 18.6 20.8 16.6 20.5 14.5"
        strokeWidth={strokeWidth * 0.9}
      />
      <path d="M15 28.3 C10.8 25.4 12.2 20.8 17 19.4 C19.8 18.6 20.8 16.6 20.5 14.5" strokeWidth={strokeWidth * 1.6} />
      <path d="M17 19.4 C19.8 18.6 20.8 16.6 20.5 14.5" strokeWidth={strokeWidth * 2.4} />
      <path
        d="M18.3 12.8 C18.1 10 19.4 8.2 21.2 8.3 C23 8.4 24 10.2 23.7 12.8 C23.4 15.2 22.2 16.4 20.9 16.3 C19.5 16.2 18.5 15 18.3 12.8 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 1.2}
      />
      <path d="M18.7 11 L23.4 11.2 M18.6 13.3 L23.5 13.2" strokeWidth={strokeWidth * 0.7} />
    </svg>
  );
}

/** Barrenadores (perforan tallo o fruto). */
function IconoBarrenadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M17.6 0.5 C16.6 16 16.6 32 17.1 47.5 L30.4 47.5 C30.9 32 30.9 16 29.9 0.5 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.8}
      />
      <path d="M17 15 C21 17 27 17 30.7 15 M17 34 C21 36 27 36 30.6 34" strokeWidth={strokeWidth * 1.1} />
      <path d="M24 20 C25.5 15.5 22.5 12 24.5 7.5" strokeWidth={strokeWidth * 0.75} />
      <circle cx="24" cy="24.5" r="4.6" fill={color} fillOpacity={0.3} strokeWidth={strokeWidth * 1.5} />
      <circle cx="24" cy="24.5" r="2.1" fill={color} stroke="none" />
      <path d="M21.5 28.4 L20.3 30.8 M26.5 28.4 L27.8 30.6" strokeWidth={strokeWidth * 0.8} />
      <circle cx="24.3" cy="30.6" r="0.95" fill={color} stroke="none" />
      <circle cx="26.8" cy="32.8" r="0.85" fill={color} stroke="none" />
      <circle cx="22.2" cy="33.4" r="0.9" fill={color} stroke="none" />
      <circle cx="25.3" cy="36" r="0.8" fill={color} stroke="none" />
      <circle cx="22.9" cy="38.6" r="0.85" fill={color} stroke="none" />
      <circle cx="31.4" cy="35.2" r="0.75" fill={color} stroke="none" />
    </svg>
  );
}

/** Trozadores (cortan plántulas a ras). */
function IconoTrozadores({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M2 30.5 C10 28 18 28.8 26 30.2 C34 31.6 41 31 46 28.5 L46 47 L2 47 Z"
        fill={color}
        fillOpacity={0.12}
        stroke="none"
      />
      <path d="M2 30.5 C10 28 18 28.8 26 30.2 C34 31.6 41 31 46 28.5" strokeWidth={strokeWidth * 1.6} />
      <path
        d="M32.5 35.4 L34 35.2 M38.5 39.4 L40 39.2 M43 33.4 L44.4 33.2 M35 43.9 L36.4 43.7"
        strokeWidth={strokeWidth * 0.7}
      />
      <path d="M16 29 L16.2 23.5" strokeWidth={strokeWidth * 1.8} />
      <path d="M14.2 23.9 L18.2 22.6" strokeWidth={strokeWidth * 1.1} />
      <path d="M19.5 28.2 C25 26.8 30 25.4 34.5 24" strokeWidth={strokeWidth * 1.6} />
      <path d="M18.6 26.8 L20.4 29.4" strokeWidth={strokeWidth * 1} />
      <path
        d="M34.5 24 C36.5 19.6 41.5 18.2 44 20 C43.2 23.8 38.3 25.8 34.5 24 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.3}
      />
      <path
        d="M34.5 24 C36.2 27.4 40.8 29.2 43.2 27.2 C41.8 24 37.6 22.5 34.5 24 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.3}
      />
      <path
        d="M6.48 35.6 A5.8 5.8 0 1 1 6.48 41.4 L8.99 39.95 A2.9 2.9 0 1 0 8.99 37.05 Z"
        fill={color}
        fillOpacity={0.18}
        strokeWidth={strokeWidth * 1.4}
      />
      <path d="M11.5 32.9 L11.5 35.7 M16.8 38.5 L14.6 38.5 M11.5 43.9 L11.5 41.8" strokeWidth={strokeWidth * 0.75} />
      <circle cx="7.7" cy="36.3" r="1.1" fill={color} stroke="none" />
    </svg>
  );
}

/** Coleópteros (escarabajos y picudos). */
function IconoColeopteros({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M13.6 24.5 L7.5 20.8 M12.6 31 L6 30.5 M14.2 37.8 L8.6 41.8 M34.4 24.5 L40.5 20.8 M35.4 31 L42 30.5 M33.8 37.8 L39.4 41.8"
        strokeWidth={strokeWidth * 1.1}
      />
      <path
        d="M24 17.5 C31 17.5 35.5 23.5 35.5 31 C35.5 38.8 30.5 44.5 24 44.5 C17.5 44.5 12.5 38.8 12.5 31 C12.5 23.5 17 17.5 24 17.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.8}
      />
      <path d="M24 18 L24 44.2" strokeWidth={strokeWidth * 1} />
      <path d="M19 20 C17 25.5 17 36 18.6 42 M29 20 C31 25.5 31 36 29.4 42" strokeWidth={strokeWidth * 0.7} />
      <path
        d="M19.3 17.8 C19.8 13.2 21.6 11 24 11 C26.4 11 28.2 13.2 28.7 17.8 Z"
        fill={color}
        fillOpacity={0.2}
        strokeWidth={strokeWidth * 1.4}
      />
      <path d="M24 11.2 C23.5 8 23.3 5 23.6 2.5" strokeWidth={strokeWidth * 1.7} />
      <path d="M23.75 7 L19.5 8.8 L17.6 12.4 M23.9 7 L28.2 8.8 L30.1 12.4" strokeWidth={strokeWidth * 0.9} />
      <circle cx="17.3" cy="13.2" r="1.2" fill={color} stroke="none" />
      <circle cx="30.4" cy="13.2" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}

/** Huevos y ninfas (control poblacional temprano). */
function IconoHuevosNinfas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M3 39 C11 42 20 42.5 27.5 41 C35 39.5 41 37 45.5 33.5" strokeWidth={strokeWidth * 1.5} />
      <ellipse cx="12.5" cy="22" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="19.5" cy="22" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="9" cy="29" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="16" cy="29" rx="3" ry="3.5" fill={color} fillOpacity={0.3} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="23" cy="29" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="12.5" cy="36" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <ellipse cx="19.5" cy="36" rx="3" ry="3.5" fill={color} fillOpacity={0.16} strokeWidth={strokeWidth * 1.1} />
      <path
        d="M32.2 27.5 L28.5 25.8 M31.9 31.5 L28 32 M32.8 35 L29.6 38 M40.8 27.5 L44.5 25.8 M41.1 31.5 L45 32 M40.2 35 L43.4 38"
        strokeWidth={strokeWidth * 0.9}
      />
      <ellipse cx="36.5" cy="31" rx="4.6" ry="6" fill={color} fillOpacity={0.18} strokeWidth={strokeWidth * 1.5} />
      <path d="M32.6 32.5 L40.4 32.5 M33.4 35.4 L39.6 35.4" strokeWidth={strokeWidth * 0.65} />
      <ellipse cx="36" cy="23.5" rx="3" ry="2.6" fill={color} fillOpacity={0.18} strokeWidth={strokeWidth * 1.3} />
      <path d="M33.6 22 L30.4 19 M38.4 22 L41.6 19" strokeWidth={strokeWidth * 0.85} />
      <circle cx="34.9" cy="23" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

/** Ícono por id de objetivo de la rama de insectos (ver taxonomia.js). */
const ICONOS_INSECTOS = {
  chupadores: IconoChupadores,
  masticadores: IconoMasticadores,
  lepidopteros: IconoLepidopteros,
  cogolleros: IconoCogolleros,
  acaros: IconoAcaros,
  trips: IconoTrips,
  raspadores: IconoRaspadores,
  minadores: IconoMinadores,
  barrenadores: IconoBarrenadores,
  trozadores: IconoTrozadores,
  coleopteros: IconoColeopteros,
  'huevos-ninfas': IconoHuevosNinfas,
};

// ══════════════════════════════════════════════════════════════════
// src/components/ui/iconos/IconosMalezas.jsx
// ══════════════════════════════════════════════════════════════════

/**
 * Íconos de los tipos de maleza del diagnóstico.
 *
 * Misma interfaz que los íconos de lucide-react (size, color, strokeWidth,
 * className), así el diagnóstico los pinta igual que cualquier otro ícono.
 * Se dibujan en una retícula de 48 × 48 con el trazo en el color de la rama y
 * rellenos translúcidos del mismo color, para que se lean bien a 30 px dentro
 * de los botones de opción.
 */

/** Hoja ancha (dicotiledóneas). */
function IconoHojaAncha({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M24 6 C16 9 9 14 8 22 C7.2 29 11 35 16 36.5 C19 37.4 22 36.5 24 34 C26 36.5 29 37.4 32 36.5 C37 35 40.8 29 40 22 C39 14 32 9 24 6 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.7}
      />
      <path d="M24 34.2 C24.3 38 24.2 41 24 44.5" strokeWidth={strokeWidth * 1.5} />
      <path d="M24 33.6 C24.2 25 24.1 15 24 7.2" strokeWidth={strokeWidth * 1.1} />
      <path d="M24 29.5 C19 28 14 26.5 10.5 23.5" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 29.5 C29 28 34 26.5 37.5 23.5" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 22.5 C20 21 16 19.5 12.5 16.5" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 22.5 C28 21 32 19.5 35.5 16.5" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 15.5 C22 14.3 20 13 17.5 11.3" strokeWidth={strokeWidth * 0.85} />
      <path d="M24 15.5 C26 14.3 28 13 30.5 11.3" strokeWidth={strokeWidth * 0.85} />
      <path d="M16.6 27 C18.2 25.2 18.7 22.4 18 20.2" strokeWidth={strokeWidth * 0.75} />
      <path d="M31.4 27 C29.8 25.2 29.3 22.4 30 20.2" strokeWidth={strokeWidth * 0.75} />
    </svg>
  );
}

/** Gramíneas (hoja angosta, pastos). */
function IconoGramineas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M22.6 42.6 C17.5 40 11 37 3 31" strokeWidth={strokeWidth * 1.2} />
      <path d="M25.8 42.6 C31 40.5 37 38.5 44 34" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M22 42.4 C18.5 35 14 27.5 5 18 C12 30 15.5 36.5 19.6 42.6 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.5}
      />
      <path d="M20.6 42.4 C17 35.5 13 28 5.4 18.6" strokeWidth={strokeWidth * 0.8} />
      <path d="M23.4 42.4 C22 33 20.5 23 18.5 13" strokeWidth={strokeWidth * 1.15} />
      <path
        d="M22.8 42.4 C26 34 30.5 26 43 16.5 C33.5 28 30 35.5 27.4 42.6 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M24.2 42 C27 34.5 31 27 42.6 16.9" strokeWidth={strokeWidth * 0.8} />
      <path d="M26 42.2 C28.8 35 31.9 28.5 42.8 16.7" strokeWidth={strokeWidth * 0.8} />
      <path d="M24.2 42.4 C24.8 33 25.6 24 25.8 16 L24.8 4.5" strokeWidth={strokeWidth * 1.3} />
      <path d="M25.6 13.6 L21.6 11.4 M25.3 10.5 L21.9 8.2 M25.1 7.6 L22.4 5.3" strokeWidth={strokeWidth * 0.95} />
      <path d="M25.6 13.6 L29.4 11.6 M25.3 10.5 L29 8.4 M25.1 7.6 L28.2 5.5" strokeWidth={strokeWidth * 0.95} />
      <path d="M18.5 42.6 C21 41.2 27 41.2 29.5 42.6" strokeWidth={strokeWidth * 1.3} />
      <path
        d="M21.5 43.4 C20.5 44.8 19.5 45.6 18 46 M26.5 43.4 C27.6 44.8 28.8 45.6 30.5 46"
        strokeWidth={strokeWidth * 0.9}
      />
    </svg>
  );
}

/** Ciperáceas (coquito, cortadera). */
function IconoCiperaceas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M3 31 L45 31" strokeWidth={strokeWidth * 1.2} />
      <path d="M24 18 L18.5 31 L29.5 31 Z" fill={color} fillOpacity={0.18} strokeWidth={strokeWidth * 1.7} />
      <path d="M18.8 30.6 C14.5 27 10 21.5 7 14.5" strokeWidth={strokeWidth * 1.3} />
      <path d="M29.2 30.6 C33.5 27 38 21.5 41 14.5" strokeWidth={strokeWidth * 1.3} />
      <path d="M24 18.4 C21.5 13.5 19.5 9 18.5 4" strokeWidth={strokeWidth * 1.3} />
      <path d="M24 18 L24 10" strokeWidth={strokeWidth * 1.2} />
      <path d="M24 10 L20.5 5.5 M24 10 L25 3.6 M24 10 L29.5 6.5" strokeWidth={strokeWidth * 0.95} />
      <path d="M20.9 6.2 L20.2 5.1 M25 4.4 L25 3.3 M29.1 7.1 L29.8 6" strokeWidth={strokeWidth * 2.2} />
      <path
        d="M24 31 L24 34.4 C26.5 35.5 28.4 36.2 30 37 C32.6 38.3 34.4 39 36 40 C38.2 41.4 39.6 42.6 41 43.8 M24 34.4 C21.5 35.8 19.5 37.6 17.5 39.8"
        strokeWidth={strokeWidth * 1.2}
      />
      <circle cx="30" cy="37" r="2.5" fill={color} stroke="none" />
      <circle cx="36" cy="40" r="2.2" fill={color} stroke="none" />
      <circle cx="41" cy="43.8" r="2" fill={color} stroke="none" />
      <circle cx="17.5" cy="40.1" r="2.2" fill={color} stroke="none" />
    </svg>
  );
}

/** Leñosas y arbustivas (rebrote en potreros). */
function IconoLenosas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M8 42.6 L40 42.6" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M19.6 42.2 C17 41.2 15 40.6 12.8 40.4 M28.4 42.2 C31 41.2 33 40.6 35.2 40.4"
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M19.6 42.4 L20.1 28.4 C20.1 30.7 27.9 30.7 27.9 28.4 L28.4 42.4 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 2}
      />
      <ellipse cx="24" cy="28.4" rx="3.9" ry="1.7" fill={color} fillOpacity={0.28} strokeWidth={strokeWidth * 1.6} />
      <path d="M20.5 28.5 L15.5 22.5 L11 15.5" strokeWidth={strokeWidth * 1.5} />
      <path d="M21.6 27.8 L19.5 20 L17 12" strokeWidth={strokeWidth * 1.5} />
      <path d="M26.4 27.8 L28.8 20.5 L27.2 11" strokeWidth={strokeWidth * 1.5} />
      <path d="M27.5 28.5 L33 23 L38.5 16.5" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M11.2 15.8 C7.4 14.6 5.2 11.4 5.6 8 C9.2 9 11.4 12.3 11.2 15.8 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M17 12.2 C14.6 9.6 14.2 5.8 16 2.8 C18.6 5 19.2 9 17 12.2 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M27.2 11.2 C27.8 7.8 30.4 5 33.6 4.4 C33.4 8 30.8 10.9 27.2 11.2 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M38.4 16.8 C39.4 13.8 42 11.6 44.8 11.4 C44.2 14.6 41.6 16.9 38.4 16.8 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
    </svg>
  );
}

/** Helechos (helecho marranero). */
function IconoHelechos({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M11 45 C12 36.5 14.5 28 19.5 21.5 C23 16.9 28.5 15.6 33 17.2" strokeWidth={strokeWidth * 1.6} />
      <path
        d="M12 38.7 C9.9 36 7.2 34.8 3.8 35.2 C5.9 37.9 8.6 39.1 12 38.7 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M13.75 32.5 C16.9 33.5 19.8 32.9 22.2 30.6 C19 29.6 16.2 30.2 13.75 32.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M16.2 26.7 C13.7 24.5 10.8 23.9 7.6 24.8 C10.1 27 13 27.6 16.2 26.7 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M19.5 21.5 C22.3 23.2 25.1 23.3 28 21.8 C25.2 20.2 22.4 20.1 19.5 21.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M23.8 17.9 C23 14.6 21.1 12.3 18 11 C18.8 14.3 20.7 16.6 23.8 17.9 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d="M12 38.7 C9.4 37 6.8 35.9 4.2 35.3 M13.9 32.5 C16.6 31.9 19.4 31.6 21.9 30.7 M16.1 26.6 C13.5 25.9 10.7 25.5 7.9 24.9 M19.6 21.6 C22.4 21.7 25.2 21.8 27.7 21.8 M23.7 17.8 C22.1 15.9 20.6 13.9 18.3 11.4"
        strokeWidth={strokeWidth * 0.75}
      />
      <path
        d="M33 17.2 C35.9 17.2 37.9 14.7 37.9 12 C37.9 9.3 35.5 7.5 33 7.5 C30.5 7.5 29.2 9.9 29.2 12 C29.2 14.1 31.3 15 33 15 C34.7 15 35.2 13.2 35.2 12 C35.2 10.8 33.8 10.6 33 10.6"
        strokeWidth={strokeWidth * 1.45}
      />
      <path d="M7 45.4 C9 44.4 13 44.4 15.5 45.4" strokeWidth={strokeWidth * 1.2} />
    </svg>
  );
}

/** Perennes con rizoma (rebrotan desde la raíz). */
function IconoPerennes({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <rect x="2" y="21.5" width="44" height="24" rx="2.5" fill={color} fillOpacity={0.1} stroke="none" />
      <path d="M3 21.5 L45 21.5" strokeWidth={strokeWidth * 1.4} />
      <path
        d="M5 34 C9.5 31.8 13.5 31.2 17.5 31.8 C22.5 32.5 26.5 34.2 31.5 33.6 C35.5 33.1 39 31.2 43 29.8"
        strokeWidth={strokeWidth * 1.7}
      />
      <circle cx="17.5" cy="31.8" r="1.8" fill={color} stroke="none" />
      <circle cx="31.5" cy="33.6" r="1.8" fill={color} stroke="none" />
      <path
        d="M17.5 32.4 C16.8 35.5 15.5 38.5 13.8 41.5 M17.5 32.4 C18.4 35.2 19 38 19.2 41 M17.5 32.4 C19.8 34.6 21.5 36.8 22.8 39.2 M31.5 34.2 C30.8 36.8 29.8 39.2 28.4 41.6 M31.5 34.2 C32.6 36.6 33.6 38.8 34.2 41.8"
        strokeWidth={strokeWidth * 0.9}
      />
      <path d="M17.5 31.2 C17.2 27.5 16.9 24 16.9 18.6" strokeWidth={strokeWidth * 1.4} />
      <path d="M13.6 19.8 L20.4 17.2" strokeWidth={strokeWidth * 1.2} />
      <path d="M31.5 33 C31.3 27 31.2 20 30.6 13 C30.4 10 30.2 8 30 6" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M30.9 17.5 C29 14.7 26.4 13.4 23 13.5 C24.9 16.3 27.5 17.6 30.9 17.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M30.4 11.5 C33.6 11.9 36.3 10.9 38.5 8.5 C35.3 8.1 32.6 9.1 30.4 11.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M30.1 7.5 C29.4 5.3 27.8 3.9 25.5 3.5 C26.2 5.7 27.8 7.1 30.1 7.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path d="M8.3 32.4 C8 29.5 8.2 27.5 9 25.8" strokeWidth={strokeWidth * 1.1} />
      <circle cx="9.1" cy="25.2" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

/** Todo lo verde (limpieza total del lote). */
function IconoNoSelectivo({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M3 43.5 L45 43.5" strokeWidth={strokeWidth * 1.2} />
      <path d="M10 43.5 C9.8 36 10 30 10.4 24" strokeWidth={strokeWidth * 1.4} />
      <path
        d="M10.5 24 C6 21.5 5 16 8 12.5 C9 11.4 10 11 10.5 11 C11 11 12 11.4 13 12.5 C16 16 15 21.5 10.5 24 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M10.5 23 L10.5 12.4" strokeWidth={strokeWidth * 0.8} />
      <path
        d="M24 43.5 C22 35 20.5 28 19 20 M24 43.5 C23.6 34 23.4 26 23.4 17 M24 43.5 C25.8 34.5 27.5 27 29 20 M24 43.5 C26.5 37.5 29 33.5 32 30.5"
        strokeWidth={strokeWidth * 1.3}
      />
      <path d="M38 43.5 L38 32 M38 32 L33.5 26 L32.7 20.5 M38 32 L42 26.5 L42.6 21.5" strokeWidth={strokeWidth * 1.7} />
      <path
        d="M32.7 20.5 C32.7 18.3 31.8 16.6 29.8 15.5 C29.8 17.8 30.7 19.4 32.7 20.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.1}
      />
      <path
        d="M42.6 21.5 C44.5 20.4 45.4 18.7 45.2 16.5 C44.2 16 43.3 17.6 42.6 21.5 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.1}
      />
      <path
        d="M2.5 24 C13 19.5 27 16.5 45.5 15 L45.5 20 C27 21.5 13 24.5 2.5 29 Z"
        fill={color}
        fillOpacity={0.2}
        strokeWidth={strokeWidth * 0.9}
      />
    </svg>
  );
}

/** Ícono por id de objetivo de la rama de malezas (ver taxonomia.js). */
const ICONOS_MALEZAS = {
  'hoja-ancha': IconoHojaAncha,
  gramineas: IconoGramineas,
  ciperaceas: IconoCiperaceas,
  lenosas: IconoLenosas,
  helechos: IconoHelechos,
  perennes: IconoPerennes,
  'no-selectivo': IconoNoSelectivo,
};

// ══════════════════════════════════════════════════════════════════
// src/components/ui/iconos/IconosEnfermedades.jsx
// ══════════════════════════════════════════════════════════════════

/**
 * Íconos de las enfermedades del diagnóstico.
 *
 * Misma interfaz que los íconos de lucide-react (size, color, strokeWidth,
 * className), así el diagnóstico los pinta igual que cualquier otro ícono.
 * Se dibujan en una retícula de 48 × 48 con el trazo en el color de la rama y
 * rellenos translúcidos del mismo color, para que se lean bien a 30 px dentro
 * de los botones de opción.
 *
 * Están en dos grupos: los síntomas foliares generales y las enfermedades con
 * un cuadro propio (sigatoka, oomicetos, raíz y suelo, botrytis). El
 * diagnóstico los une en un solo mapa por id de objetivo.
 */

/** Trazo de un anillo (círculo con hueco) para las lesiones de mancha foliar. */
function anillo(cx, cy, radioExterior, radioInterior) {
  return `M${cx - radioExterior} ${cy} A ${radioExterior} ${radioExterior} 0 1 1 ${cx + radioExterior} ${cy} A ${radioExterior} ${radioExterior} 0 1 1 ${cx - radioExterior} ${cy} Z M${cx - radioInterior} ${cy} A ${radioInterior} ${radioInterior} 0 1 1 ${cx + radioInterior} ${cy} A ${radioInterior} ${radioInterior} 0 1 1 ${cx - radioInterior} ${cy} Z`;
}

/** Hongos foliares (tizones, antracnosis). */
function IconoHongosFoliares({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <g transform="rotate(-30 24 24)">
        <path
          d="M24 5 L28.4 9.5 L27.2 13.5 L32.8 17.5 L31.2 21.5 L36 25.5 L33.6 29.5 L34.4 33.5 L30 37 L29 40 L24 43 L18.8 40 L19.8 36.5 L13.8 33 L15.6 29 L12 25 L15.6 21 L15.4 16.5 L20 12 L20 9 Z"
          fill={color}
          fillOpacity={0.1}
          strokeWidth={strokeWidth * 1.6}
        />
        <path d="M24 43 L24 47" strokeWidth={strokeWidth * 1.6} />
        <path d="M24 42 L24 6.5" strokeWidth={strokeWidth * 0.95} />
        <path d="M24 31.5 L32.6 30.6 M24 20.5 L31 20.2" strokeWidth={strokeWidth * 0.7} />
        <path
          d="M15.4 16.5 L19.6 14.8 L23.8 16.6 L26.4 20.4 L22 22.2 L23.6 26.4 L18.2 27.8 L19.4 32 L13.8 33 L15.6 29 L12 25 L15.6 21 Z"
          fill={color}
          fillOpacity={0.28}
          strokeWidth={strokeWidth * 0.9}
        />
        <path
          d="M16.6 35.2 L21.6 34.2 L20.4 28.6 L26 27 L24.4 21.4 L28.8 19.2 L25 13.4 L21 11.5"
          strokeWidth={strokeWidth * 0.75}
        />
        <path
          d="M27.6 34 L30.6 33.2 L31.4 35.8 L28.4 36.6 Z"
          fill={color}
          fillOpacity={0.22}
          strokeWidth={strokeWidth * 0.75}
        />
      </g>
    </svg>
  );
}

/** Manchas foliares (lesiones definidas en hoja). */
function IconoManchas({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M24 3.5 C33.5 10 40 20 40 28.5 C40 37.5 32.8 44.5 24 45 C15.2 44.5 8 37.5 8 28.5 C8 20 14.5 10 24 3.5 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M24 6 L24 44" strokeWidth={strokeWidth * 1.05} />
      <path
        d="M24 14 C20.5 15.5 17.5 17.5 15 20 M24 14 C27.5 15.5 30.5 17.5 33 20 M24 27 C20.5 28.5 17 31 14.5 34 M24 27 C27.5 28.5 31 31 33.5 34"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d={anillo(16.5, 19.5, 5.6, 2.7)}
        fillRule="evenodd"
        fill={color}
        fillOpacity={0.34}
        strokeWidth={strokeWidth * 1.15}
      />
      <circle cx="16.5" cy="19.5" r="1.1" fill={color} stroke="none" />
      <path
        d={anillo(31.5, 25, 4.8, 2.3)}
        fillRule="evenodd"
        fill={color}
        fillOpacity={0.34}
        strokeWidth={strokeWidth * 1.15}
      />
      <path
        d={anillo(21, 35, 5.2, 2.5)}
        fillRule="evenodd"
        fill={color}
        fillOpacity={0.34}
        strokeWidth={strokeWidth * 1.15}
      />
      <circle cx="21" cy="35" r="1.05" fill={color} stroke="none" />
    </svg>
  );
}

/** Roya (pústulas anaranjadas). */
function IconoRoya({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M4.5 7 L13 15" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M13 15 C22.5 15.5 32 21.5 38 29.5 C42 35 43.5 40.5 43.5 45.5 C38 44.5 32 41.5 26.5 36.5 C19.5 30.5 14.5 23 13 15 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M14 16 C21.5 23.5 31.5 33.5 42.4 44.8" strokeWidth={strokeWidth * 0.95} />
      <path d="M25 23 C28.5 22.2 31.5 22 34 22.4 M32 32 C34.8 31.2 37.2 31 39.4 31.4" strokeWidth={strokeWidth * 0.7} />
      <path
        d="M20 25.5 C24.5 25 27.5 28 27.5 32.5 C27.5 37 24 39.5 20.2 38.4 C16.6 37.3 15.2 33.6 16.4 29.6 C17.2 27 18.4 25.6 20 25.5 Z"
        fill={color}
        fillOpacity={0.22}
        strokeWidth={strokeWidth * 0.8}
      />
      <circle cx="19" cy="29.5" r="2.1" fill={color} stroke="none" />
      <circle cx="23.5" cy="30.5" r="2.2" fill={color} stroke="none" />
      <circle cx="19.5" cy="34" r="2" fill={color} stroke="none" />
      <circle cx="23.8" cy="34.8" r="2.1" fill={color} stroke="none" />
      <circle cx="21.5" cy="26.5" r="1.6" fill={color} stroke="none" />
      <circle cx="17" cy="21.5" r="1.5" fill={color} stroke="none" />
      <circle cx="20" cy="22.5" r="1.3" fill={color} stroke="none" />
      <circle cx="29" cy="30" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}

/** Mildeo velloso (oomiceto foliar). */
function IconoMildeoVelloso({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M24 33 C21.4 36 17.6 38.4 13.6 38 C9.4 37.6 6 35.2 6.5 32 C8 29.2 10.8 26 13.5 23.5 C11.6 20.6 9.8 16 10 12.6 C10.2 9.4 12.6 8.6 14.8 10.6 C16.4 12 18.2 13.2 19.5 14.5 C20 11 21.6 6.8 24 4 C26.4 6.8 28 11 28.5 14.5 C29.8 13.2 31.6 12 33.2 10.6 C35.4 8.6 37.8 9.4 38 12.6 C38.2 16 36.4 20.6 34.5 23.5 C37.2 26 40 29.2 41.5 32 C42 35.2 38.6 37.6 34.4 38 C30.4 38.4 26.6 36 24 33 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M24 33 L24 43.6" strokeWidth={strokeWidth * 1.6} />
      <path
        d="M24 33 L9.6 30.4 M24 33 L13.4 15.4 M24 33 L24 7.5 M24 33 L34.6 15.4 M24 33 L38.4 30.4"
        strokeWidth={strokeWidth * 0.85}
      />
      <path d="M20.3 26.8 L24 25.3 M17.6 22.4 L24 17.2 M31.2 27 L35.8 26.6" strokeWidth={strokeWidth * 0.7} />
      <path
        d="M20.3 26.8 L24 25.3 L24 17.2 L17.6 22.4 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 0.9}
        strokeLinejoin="miter"
      />
      <path
        d="M30.6 31.8 L34.8 31 L35.8 26.6 L31.2 27 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 0.9}
        strokeLinejoin="miter"
      />
      <path
        d="M17 31.7 L13 31 L12.4 27.2 L16.4 27.6 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 0.9}
        strokeLinejoin="miter"
      />
      <path
        d="M24.6 13.4 L26.6 14 L26 10.4 L24.2 10.8 Z"
        fill={color}
        fillOpacity={0.24}
        strokeWidth={strokeWidth * 0.9}
        strokeLinejoin="miter"
      />
      <path
        d="M20.8 27 C20.5 28.2 21 28.8 20.4 30 M22.2 26.5 C21.9 27.7 22.4 28.3 21.8 29.5 M23.6 26 C23.3 27.2 23.8 27.8 23.2 29 M31.6 31.8 C31.4 32.8 31.9 33.3 31.4 34.3 M33.4 31.5 C33.2 32.5 33.7 33 33.2 34"
        strokeWidth={strokeWidth * 0.8}
      />
    </svg>
  );
}

/** Síntomas foliares generales, por id de objetivo. */
const ICONOS_ENFERMEDADES_FOLIARES = {
  'hongos-foliares': IconoHongosFoliares,
  manchas: IconoManchas,
  roya: IconoRoya,
  'mildeo-velloso': IconoMildeoVelloso,
};
/** Sigatoka (banano y plátano). */
function IconoSigatoka({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M4 38 C12.3 21.6 25.7 12.6 44 11 C35.2 26.6 21.8 35.6 4 38 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path d="M4.6 37.6 L2 40.8" strokeWidth={strokeWidth * 1.6} />
      <path d="M5 37.4 C17 30 30 21 43.4 11.6" strokeWidth={strokeWidth * 0.95} />
      <path
        d="M11.8 31.9 L10.3 27.6 M16.6 28.7 L14.8 23.6 M21.4 25.4 L19.6 20.2 M26.2 22.2 L24.5 17.3 M31 18.9 L29.5 14.7 M35.8 15.7 L34.7 12.6 M10.5 34.5 L13.5 37.1 M15.3 31.2 L19.3 34.6 M20.1 28 L24.4 31.6 M24.9 24.7 L29.1 28.3 M29.7 21.5 L33.4 24.7 M34.5 18.3 L37.4 20.8"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M14.1 30.2 L13 27 M18.9 26.8 L17.6 23 M18 29.8 L21 32.4 M22.8 26.6 L25.5 28.9"
        strokeWidth={strokeWidth * 1.3}
      />
      <path d="M23.7 23.6 L22.3 19.6 M27.5 23.2 L30.6 25.9" strokeWidth={strokeWidth * 2.4} />
      <g transform="rotate(-19 28.6 19.9)">
        <ellipse cx="28.6" cy="19.9" rx="3.2" ry="4.8" fill={color} fillOpacity={0.1} stroke="none" />
        <path
          d="M26.2 19.9 a2.4 4.1 0 1 0 4.8 0 a2.4 4.1 0 1 0 -4.8 0 Z M27.6 19.9 a1 2 0 1 0 2 0 a1 2 0 1 0 -2 0 Z"
          fillRule="evenodd"
          fill={color}
          fillOpacity={0.3}
          strokeWidth={strokeWidth * 0.9}
        />
      </g>
      <g transform="rotate(-49 33.7 20.8)">
        <path
          d="M31.6 20.8 a2.1 3.1 0 1 0 4.2 0 a2.1 3.1 0 1 0 -4.2 0 Z M32.85 20.8 a0.85 1.4 0 1 0 1.7 0 a0.85 1.4 0 1 0 -1.7 0 Z"
          fillRule="evenodd"
          fill={color}
          fillOpacity={0.3}
          strokeWidth={strokeWidth * 0.9}
        />
      </g>
      <ellipse
        cx="32.9"
        cy="15.8"
        rx="1.9"
        ry="2.3"
        transform="rotate(-19 32.9 15.8)"
        fill={color}
        fillOpacity={0.26}
        strokeWidth={strokeWidth * 0.9}
      />
    </svg>
  );
}

/** Oomicetos (Phytophthora, Pythium). */
function IconoOomicetos({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M3 12.6 C7 10.2 10.4 14.8 14.4 12.6 C18.4 10.4 21.8 14.8 25.8 12.6 C29.8 10.4 33.2 14.8 37.2 12.6 C40 11.1 42.6 12.2 45 13.4 L45 19.4 L3 19.4 Z"
        fill={color}
        fillOpacity={0.14}
        stroke="none"
      />
      <path
        d="M3 12.6 C7 10.2 10.4 14.8 14.4 12.6 C18.4 10.4 21.8 14.8 25.8 12.6 C29.8 10.4 33.2 14.8 37.2 12.6 C40 11.1 42.6 12.2 45 13.4"
        strokeWidth={strokeWidth * 1.4}
      />
      <path d="M3 19.4 L45 19.4" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M5.4 23.6 L8.6 23.6 M39.4 22.4 L42.6 22.4 M6.2 36.4 L9.4 36.4 M39 37.6 L42.2 37.6"
        strokeWidth={strokeWidth * 0.8}
      />
      <path
        d="M21.5 19.6 C22 15.6 22.6 10.6 22.9 7.4 C23.2 5.6 24.8 5.6 25.1 7.4 C25.4 10.6 26 15.6 26.5 19.6 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.5}
      />
      <path
        d="M21.5 19.6 C21.8 17.4 22.05 15.8 22.3 14.4 C23.4 15.5 24.7 14 25.7 14.6 C25.95 16 26.2 17.6 26.5 19.6 Z"
        fill={color}
        fillOpacity={0.3}
        strokeWidth={strokeWidth * 0.9}
      />
      <path
        d="M21.6 19.6 C21.8 21.8 22 23.8 22.2 25.6 L25.8 25.6 C26 23.8 26.2 21.8 26.4 19.6 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.4}
      />
      <path
        d="M21.9 21.6 C19.4 22.2 17.2 23.6 15.6 25.8 M26.2 22.4 C28.8 23 31 24.4 32.6 26.6 M21.7 24 C19.7 25.2 18.3 26.8 17.5 28.8 M26 24.2 C27.6 25.2 28.8 26.6 29.6 28.4"
        strokeWidth={strokeWidth * 0.9}
      />
      <path
        d="M22.2 25.6 C23.3 26.7 24.7 24.7 25.8 25.6 C25.6 28.4 25.3 31.2 24.9 33.6 L23.2 33.6 C22.8 31.2 22.5 28.4 22.2 25.6 Z"
        fill={color}
        fillOpacity={0.28}
        strokeWidth={strokeWidth * 1.1}
      />
      <path
        d="M25.4 28 C27.8 29 29.6 30.8 30.6 33.4 M22.7 30.6 C20.4 31.8 18.6 33.6 17.6 36.2"
        strokeWidth={strokeWidth * 1.5}
      />
      <path
        d="M22.6 32.8 C20.5 35.2 20.5 38.4 22.8 40.4 C23 38 22.4 35.2 23.7 33.2 Z"
        fill={color}
        fillOpacity={0.2}
        strokeWidth={strokeWidth * 0.85}
      />
      <path d="M24.1 33.4 C24.1 36.6 23.9 39.4 23.5 42.2" strokeWidth={strokeWidth * 0.75} />
      <path
        d="M11.8 24.4 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M10.4 29.2 a0.9 0.9 0 1 0 1.8 0 a0.9 0.9 0 1 0 -1.8 0 Z M33.8 28.4 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z M35.9 33 a0.85 0.85 0 1 0 1.7 0 a0.85 0.85 0 1 0 -1.7 0 Z M13.6 33.4 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z"
        fill={color}
        stroke="none"
      />
    </svg>
  );
}

/** Raíz y suelo (pudriciones, damping off). */
function IconoRaizSuelo({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path d="M3 34 L45 34" strokeWidth={strokeWidth * 1.5} />
      <path
        d="M5.5 39 L8.5 39 M28 38 L31 38 M34.5 42 L37.5 42 M40 38.5 L43 38.5 M11 43 L14 43"
        strokeWidth={strokeWidth * 0.8}
      />
      <path d="M9 34 L9 27.5" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M9 27.5 C7.4 25.4 5.2 24.8 3.8 25.8 C5 28 7.4 28.7 9 27.5 Z M9 27.5 C10.6 25.4 12.8 24.8 14.2 25.8 C13 28 10.6 28.7 9 27.5 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.1}
      />
      <path d="M22 34 C22 37 21.8 39.5 21.5 42.5" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M21.9 36.5 C20.4 37.4 19.3 38.6 18.6 40.2 M21.75 39 C23.3 39.8 24.4 40.9 25 42.4"
        strokeWidth={strokeWidth * 0.85}
      />
      <path
        d="M20.4 34.6 C20.7 36.2 21 37.6 21.2 38.8 C22.5 38.9 23.2 38.9 23.9 38.8 C23.6 37.4 23.2 36 22.8 34.6 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M20.9 33.4 C21.6 30.4 23 26.6 25.2 22.8 C26.9 19.9 28.8 17.5 30.6 15.8 C31.7 16.8 32.2 17.7 31.9 18.6 C30 20.4 28.2 22.7 26.8 25.2 C25 28.4 23.8 31 23.3 33.4 Z"
        fill={color}
        fillOpacity={0.12}
        strokeWidth={strokeWidth * 1.4}
      />
      <path
        d="M20.7 32 C21.4 32.5 22.6 32.5 23.5 32 C23.4 33 23.3 33.6 23.3 34.3 C23.4 35.2 23.6 36.2 23.9 37.2 C22.9 36.7 21.7 36.7 20.9 37.2 C20.6 36.2 20.4 35.2 20.35 34.3 C20.35 33.6 20.5 33 20.7 32 Z"
        fill={color}
        fillOpacity={0.32}
        strokeWidth={strokeWidth * 0.9}
      />
      <path
        d="M31.2 16.2 C33.6 13.4 37.2 12.8 39.8 14.6 C37.8 17.8 34 18.4 31.2 16.2 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.3}
      />
      <path
        d="M30.9 15.8 C30.2 12.2 32 8.8 35.4 7.8 C36.2 11.4 34.4 14.8 30.9 15.8 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.3}
      />
    </svg>
  );
}

/** Botrytis y pudriciones (moho gris en flor y fruto). */
function IconoBotrytis({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, ...resto }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...resto}
    >
      <path
        d="M19 19.8 C25.6 19.8 29.8 24.6 29.6 30.4 C29.4 36.8 24.8 41.8 19 42.2 C13.2 41.8 8.6 36.8 8.4 30.4 C8.2 24.6 12.4 19.8 19 19.8 Z"
        fill={color}
        fillOpacity={0.1}
        strokeWidth={strokeWidth * 1.6}
      />
      <path
        d="M12.7 26 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z M15.4 29.5 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z M12 32.5 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z M14.6 36 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z M17.7 32.8 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0 Z"
        fill={color}
        stroke="none"
      />
      <path d="M19 20 L19 13.4" strokeWidth={strokeWidth * 1.2} />
      <path
        d="M19 19.8 C16.2 19.6 13.6 18.2 12.2 15.8 C15.2 15.2 18.2 16.8 19 19.8 Z M19 19.8 C21.8 19.6 24.4 18.2 25.8 15.8 C22.8 15.2 19.8 16.8 19 19.8 Z"
        fill={color}
        fillOpacity={0.16}
        strokeWidth={strokeWidth * 1.2}
      />
      <path
        d="M25.4 22.8 C28.2 24.8 29.2 28.2 29 31.2 C28.8 35.6 25.4 40 21.8 41.2 C20.2 38.4 20 34 21.2 30.2 C22.2 26.8 23.6 23.8 25.4 22.8 Z"
        fill={color}
        fillOpacity={0.26}
        strokeWidth={strokeWidth * 0.95}
      />
      <path
        d="M26.4 25.8 C27.6 28.6 27.2 32.8 25.4 36 C24.6 37.4 23.6 38.6 22.6 39.4"
        strokeWidth={strokeWidth * 0.7}
      />
      <circle cx="25.6" cy="24.6" r="1.4" fill={color} stroke="none" />
      <path
        d="M27.6 22 C27.2 18.8 30.4 16.6 32.8 18.2 C34.8 15.8 38.4 17 38.6 19.8 C41.4 20.4 41.8 24 39.4 25.6 C40.4 28.4 37.6 30.8 35 29.6 C33.4 31.8 29.8 31.4 29 28.8 C26.6 28.4 25.8 24.8 27.6 22 Z"
        fill={color}
        fillOpacity={0.14}
        strokeWidth={strokeWidth * 0.85}
      />
      <path
        d="M30.4 17.8 C29.4 15 28.4 12.6 27.6 10.6 M35.8 17.2 C36.2 14.6 36.6 12 37 9.8 M39.6 21.6 C41.2 19.6 42.4 17.6 43.4 15.6 M35.2 30.2 C36.4 31.9 37.6 33.7 38.6 35.4"
        strokeWidth={strokeWidth * 0.85}
      />
      <path
        d="M27.6 10.6 L24.6 8.2 M27.6 10.6 L29.8 7.8 M37 9.8 L34.2 7.2 M37 9.8 L40.2 7.8 M43.4 15.6 L41.6 12.2 M43.4 15.6 L45.8 13.4 M38.6 35.4 L36.6 38.4 M38.6 35.4 L41.6 37.4"
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M22.8 7.7 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M29.2 7.3 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M32.4 6.7 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M39.6 7.3 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0 Z M39.9 11.5 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z M45.1 13 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z M34.85 39.2 a1.15 1.15 0 1 0 2.3 0 a1.15 1.15 0 1 0 -2.3 0 Z M41.05 37.7 a1.15 1.15 0 1 0 2.3 0 a1.15 1.15 0 1 0 -2.3 0 Z"
        fill={color}
        stroke="none"
      />
    </svg>
  );
}

/** Enfermedades con cuadro propio, por id de objetivo. */
const ICONOS_ENFERMEDADES_OTRAS = {
  sigatoka: IconoSigatoka,
  oomicetos: IconoOomicetos,
  'raiz-suelo': IconoRaizSuelo,
  botrytis: IconoBotrytis,
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
  // No todos los productos tienen foto de empaque: si la imagen no carga, la
  // columna desaparece y la tarjeta queda como antes, sin hueco vacío.
  const [sinFoto, setSinFoto] = useState(false);

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

      {/* Foto del empaque, para reconocer el producto en la bodega */}
      {!sinFoto && (
        <span
          className="flex w-16 shrink-0 items-center justify-center border-r bg-white p-1.5"
          style={{ borderColor: COLORES.borde }}
        >
          <img
            src={`/productos/${producto.id}.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full rounded-lg object-cover"
            onError={() => setSinFoto(true)}
          />
        </span>
      )}

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
  const [sinFoto, setSinFoto] = useState(false);

  // onCerrar se lee desde una referencia para que el efecto del historial no
  // se vuelva a ejecutar (y no apile otra entrada) cada vez que el padre se
  // vuelve a pintar con una función nueva.
  const cerrarRef = useRef(onCerrar);
  cerrarRef.current = onCerrar;

  // Cada producto puede tener o no foto de empaque: se vuelve a intentar al
  // cambiar de ficha.
  useEffect(() => {
    setSinFoto(false);
  }, [producto?.id]);

  const idProducto = producto?.id;

  // La ficha se abre sobre toda la pantalla, así que tiene que poder cerrarse
  // sin buscar el botón: tecla Escape, botón físico de atrás del teléfono, o
  // tocando fuera del panel.
  useEffect(() => {
    if (!idProducto) return;

    const conEscape = (e) => {
      if (e.key === 'Escape') window.history.back();
    };
    const conAtras = () => cerrarRef.current();

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
    };
  }, [idProducto]);

  // Todos los cierres pasan por el historial: así la entrada que se añadió al
  // abrir siempre se consume, y "atrás" y los botones se comportan igual.
  const cerrar = () => window.history.back();

  // El fondo no acepta toques hasta el cuadro siguiente a la apertura: el
  // mismo toque que abrió la ficha podía caer sobre el fondo y cerrarla al
  // instante.
  const [listo, setListo] = useState(false);
  useEffect(() => {
    if (!idProducto) return;
    setListo(false);
    const cuadro = requestAnimationFrame(() => setListo(true));
    return () => cancelAnimationFrame(cuadro);
  }, [idProducto]);

  if (!producto) return null;

  const color = COLOR_CATEGORIA[producto.categoria] || COLORES.azul;
  const fichas = fichasDeProducto(producto);
  const conflictos = mismosModoDeAccion(producto);
  const alternativas = alternativasDeRotacion(producto);
  const estadios = estadiosDeProducto(producto);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
      onClick={listo ? cerrar : undefined}
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
            onClick={cerrar}
            className="mb-2 flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70"
            style={{ color: COLORES.azul }}
          >
            <ArrowLeft size={16} /> Volver
          </button>
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              {/* Foto del empaque; si el producto no tiene, se omite sin dejar hueco */}
              {!sinFoto && (
                <img
                  src={`/productos/${producto.id}.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                  style={{ border: `1px solid ${COLORES.borde}` }}
                  onError={() => setSinFoto(true)}
                />
              )}
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
            </div>
            <button
              onClick={cerrar}
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
            onClick={cerrar}
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

const ICONOS_ENFERMEDADES = { ...ICONOS_ENFERMEDADES_FOLIARES, ...ICONOS_ENFERMEDADES_OTRAS };

const ICONOS = { insectos: Bug, malezas: Sprout, enfermedades: Leaf, nutricion: Droplets };

/**
 * Ícono ilustrado de cada objetivo, por rama. Ayuda a reconocer la plaga, la
 * maleza o la enfermedad por su forma antes de leer el nombre. La rama de
 * nutrición no lleva: sus objetivos son procesos, no organismos.
 */
const ICONOS_OBJETIVO = {
  insectos: ICONOS_INSECTOS,
  malezas: ICONOS_MALEZAS,
  enfermedades: ICONOS_ENFERMEDADES,
};

function Opcion({ label, ayuda, activo, onClick, color, icono: Icono }) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-2.5 rounded-lg border p-3 text-left transition hover:shadow-sm"
      style={{
        borderColor: activo ? color : COLORES.borde,
        backgroundColor: activo ? `${color}12` : '#fff',
        boxShadow: activo ? `inset 0 0 0 1px ${color}` : undefined,
      }}
    >
      {Icono && (
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}14` }}
        >
          <Icono size={30} color={color} strokeWidth={1.8} />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
          {label}
        </span>
        {ayuda && (
          <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
            {ayuda}
          </span>
        )}
      </span>
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
              icono={ICONOS_OBJETIVO[rama.id]?.[o.id]}
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
// src/components/Caneca.jsx
// ══════════════════════════════════════════════════════════════════

/* ────────────────────────────────────────────────────────────────
   GEOMETRÍA DE LA CANECA (unidades del viewBox)
   El cuerpo es un cilindro visto de frente y un poco desde arriba: la boca
   y la base son elipses de radios RADIO_X × RADIO_Y.
   ──────────────────────────────────────────────────────────────── */
const ANCHO_VISTA = 232;
const ALTO_VISTA = 316;
const CENTRO_X = 116;
const RADIO_X = 70;
const RADIO_Y = 19;
const Y_BOCA = 62;
const Y_BASE = 282;
// La cavidad es un poco más angosta que el cuerpo: el grosor de la lámina
const RADIO_X_INTERIOR = 65.5;
const RADIO_Y_INTERIOR = 17.8;
const Y_FONDO_INTERIOR = 280;
// Altura de la superficie del líquido con la caneca llena y vacía
const Y_LLENO = 71;
const Y_VACIO = 277;
// Aros de refuerzo del cuerpo
const Y_ARO_SUPERIOR = 137;
const Y_ARO_INFERIOR = 207;

/** Altura de la superficie del líquido para un nivel entre 0 y 1. */
const yDeNivel = (nivel) => Y_VACIO - nivel * (Y_VACIO - Y_LLENO);

/** Silueta del cuerpo y de la cavidad interior. */
const CONTORNO_CUERPO = `M${CENTRO_X - RADIO_X},${Y_BOCA} A${RADIO_X},${RADIO_Y} 0 0 1 ${CENTRO_X + RADIO_X},${Y_BOCA} L${CENTRO_X + RADIO_X},${Y_BASE} A${RADIO_X},${RADIO_Y} 0 0 1 ${CENTRO_X - RADIO_X},${Y_BASE} Z`;
const CONTORNO_CAVIDAD = `M${CENTRO_X - RADIO_X_INTERIOR},${Y_BOCA} A${RADIO_X_INTERIOR},${RADIO_Y_INTERIOR} 0 0 1 ${CENTRO_X + RADIO_X_INTERIOR},${Y_BOCA} L${CENTRO_X + RADIO_X_INTERIOR},${Y_FONDO_INTERIOR} A${RADIO_X_INTERIOR},${RADIO_Y_INTERIOR} 0 0 1 ${CENTRO_X - RADIO_X_INTERIOR},${Y_FONDO_INTERIOR} Z`;

/** Mitad frontal de la elipse a una altura y: las marcas que rodean el cuerpo. */
const arcoFrontal = (y) => `M${CENTRO_X - RADIO_X},${y} A${RADIO_X},${RADIO_Y} 0 0 0 ${CENTRO_X + RADIO_X},${y}`;
/** Banda curva de cierto alto que abraza el frente del cuerpo (los aros). */
const franjaFrontal = (y, alto) =>
  `M${CENTRO_X - RADIO_X},${y} A${RADIO_X},${RADIO_Y} 0 0 0 ${CENTRO_X + RADIO_X},${y} L${CENTRO_X + RADIO_X},${y + alto} A${RADIO_X},${RADIO_Y} 0 0 1 ${CENTRO_X - RADIO_X},${y + alto} Z`;

/** Color, fondo e ícono de cada familia de pasos del orden de carga. */
const ESTILO_CATEGORIA = {
  agua: { etiqueta: 'Agua', color: COLORES.azul, fondo: COLORES.azulClaro, Icono: Droplets },
  acondicionador: { etiqueta: 'Acondicionador', color: COLORES.teal, fondo: COLORES.tealClaro, Icono: FlaskConical },
  solido: { etiqueta: 'Sólidos', color: COLORES.ambar, fondo: COLORES.ambarClaro, Icono: Package },
  liquido: { etiqueta: 'Líquidos', color: COLORES.naranja, fondo: COLORES.naranjaClaro, Icono: Droplet },
  coadyuvante: { etiqueta: 'Coadyuvantes', color: COLORES.verde, fondo: COLORES.verdeClaro, Icono: Sparkles },
  cierre: { etiqueta: 'Cierre', color: COLORES.tinta, fondo: COLORES.grisClaro, Icono: CircleCheck },
};
const ESTILO_GENERICO = { etiqueta: 'Paso', color: COLORES.gris, fondo: COLORES.grisClaro, Icono: Droplets };
// El agua y su acondicionamiento siempre forman capa, aunque no haya producto
const CATEGORIAS_SIEMPRE_VISIBLES = ['agua', 'acondicionador'];
// Opacidades alternas para que capas vecinas se distingan dentro del líquido
const OPACIDAD_CAPAS = [0.14, 0.24, 0.18, 0.28, 0.16, 0.22, 0.12, 0.26];

const acotarNivel = (valor) => {
  const n = Number(valor);
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0;
};

/**
 * Caneca de 200 L que guía el orden de mezcla.
 *
 * Dibuja una caneca metálica que se va llenando paso a paso según
 * ORDEN_TANQUE: el líquido sube con una transición, cada paso que aporta algo
 * deja una capa visible y al lado se explica qué entra en ese paso, cuáles
 * productos de la mezcla del usuario van ahí y por qué.
 *
 * Props:
 *  - pasos: ORDEN_TANQUE con, en cada paso, productos (los de la mezcla que
 *    entran ahí) y aplica (false si el paso no tiene que ver con la mezcla).
 *  - indiceActivo / onCambiarPaso: paso mostrado; el componente es controlado.
 *  - capacidadLitros: capacidad que se rotula en la caneca.
 *  - color: color del líquido y de los acentos.
 *
 * Es tolerante con datos incompletos (pasos sin nivel, sin siglas, índice
 * fuera de rango) porque no debe romper la pestaña por un dato mal cargado.
 */
function Caneca({ pasos, indiceActivo = 0, onCambiarPaso, capacidadLitros = 200, color = COLORES.azul }) {
  const pasosValidos = Array.isArray(pasos) ? pasos.filter((p) => p && typeof p == 'object') : [];
  const total = pasosValidos.length;
  const pedido = Number(indiceActivo);
  const indice = total ? Math.min(Math.max(Number.isFinite(pedido) ? Math.trunc(pedido) : 0, 0), total - 1) : 0;
  const [verPorque, setVerPorque] = useState(false);
  const idReact = useId();
  // Prefijo único para los id de los degradados y recortes del SVG: si hay
  // dos canecas en la página no se pisan entre sí.
  const prefijo = `bm${String(idReact).replace(/[^a-zA-Z0-9]/g, '')}`;

  // Al cambiar de paso se cierra la explicación del anterior
  useEffect(() => {
    setVerPorque(false);
  }, [indice]);
  if (total === 0) return null;
  const colorAcento = typeof color == 'string' && color.trim() ? color : COLORES.azul;
  const capacidad =
    Number.isFinite(Number(capacidadLitros)) && Number(capacidadLitros) > 0 ? Number(capacidadLitros) : 200;
  const niveles = [];
  const capas = [];
  // El nivel nunca baja de un paso al siguiente. Cada paso que aporta algo a
  // la mezcla deja una capa entre el nivel anterior y el suyo.
  let nivelPrevio = 0;
  pasosValidos.forEach((paso, i) => {
    const nivel = Math.max(acotarNivel(paso.nivel), nivelPrevio);
    niveles.push(nivel);
    const productos = Array.isArray(paso.productos) ? paso.productos : [];
    const dejaCapa =
      paso.aplica !== false && (productos.length > 0 || CATEGORIAS_SIEMPRE_VISIBLES.indexOf(paso.categoria) !== -1);
    const yTope = yDeNivel(nivel);
    const yPiso = yDeNivel(nivelPrevio);
    if (dejaCapa && yPiso - yTope > 0.4) capas.push({ clave: i, y: yTope, alto: yPiso - yTope, visible: i <= indice });
    nivelPrevio = nivel;
  });
  const actual = pasosValidos[indice];
  const nivelActual = niveles[indice];
  const yLiquido = yDeNivel(nivelActual);
  const litros = nivelActual * capacidad;
  // Litros enteros cuando lo son; si no, un decimal con coma
  const litrosTexto =
    Math.abs(litros - Math.round(litros)) < 0.05 ? String(Math.round(litros)) : litros.toFixed(1).replace('.', ',');
  const porcentaje = Math.round(nivelActual * 100);
  const estilo = ESTILO_CATEGORIA[actual.categoria] || ESTILO_GENERICO;
  const IconoPaso = estilo.Icono;
  const aplica = actual.aplica !== false;
  const productosPaso = Array.isArray(actual.productos) ? actual.productos : [];
  const siglasPaso = Array.isArray(actual.siglas) ? actual.siglas.filter(Boolean) : [];
  const numeroPaso = Number.isFinite(Number(actual.paso)) ? actual.paso : indice + 1;
  const irA = (i) => {
    if (typeof onCambiarPaso != 'function') return;
    if (!Number.isFinite(i) || i < 0 || i > total - 1) return;
    onCambiarPaso(i);
  };

  // El líquido se dibuja con la superficie en y = 0 y se desplaza entero hasta
  // el nivel: así la subida es una sola transición de transform. Las capas van
  // dentro con el desplazamiento contrario para quedarse quietas en su sitio.
  const moverLiquido = { transform: `translate(0px, ${yLiquido}px)` };
  const compensarLiquido = { transform: `translate(0px, ${-yLiquido}px)` };
  const MARCAS = [0.25, 0.5, 0.75, 1];
  return (
    <section>
      <style>{`
        .${prefijo}-anim { transition: transform 620ms cubic-bezier(.33,.02,.15,1); }
        .${prefijo}-fade { transition: opacity 620ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .${prefijo}-anim, .${prefijo}-fade { transition: none; }
        }
      `}</style>
      <div className="grid gap-4 sm:grid-cols-5">
        <div
          className="rounded-2xl border p-3 sm:col-span-2"
          style={{
            borderColor: COLORES.borde,
            backgroundColor: '#fff',
            backgroundImage: `linear-gradient(180deg, #fff 0%, ${COLORES.papel} 100%)`,
            boxShadow: '0 1px 3px rgba(11,36,49,0.08)',
          }}
        >
          <svg
            viewBox={`0 0 ${ANCHO_VISTA} ${ALTO_VISTA}`}
            width="100%"
            className="mx-auto block h-auto"
            style={{ maxWidth: 300 }}
            role="img"
            aria-label={`Caneca de ${capacidad} litros con ${litrosTexto} litros de mezcla, ${porcentaje} por ciento de su capacidad`}
          >
            <defs>
              <linearGradient id={`${prefijo}-acero`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2E3B46" />
                <stop offset="5%" stopColor="#4A5A66" />
                <stop offset="16%" stopColor="#7E919E" />
                <stop offset="28%" stopColor="#C2D0D9" />
                <stop offset="37%" stopColor="#A8B8C3" />
                <stop offset="52%" stopColor="#82949F" />
                <stop offset="68%" stopColor="#63737F" />
                <stop offset="84%" stopColor="#47555F" />
                <stop offset="94%" stopColor="#6E7E89" />
                <stop offset="100%" stopColor="#37444E" />
              </linearGradient>
              <linearGradient id={`${prefijo}-aceroFrente`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2E3B46" stopOpacity="1" />
                <stop offset="7%" stopColor="#4A5A66" stopOpacity="0.94" />
                <stop offset="16%" stopColor="#7E919E" stopOpacity="0.6" />
                <stop offset="28%" stopColor="#C2D0D9" stopOpacity="0.3" />
                <stop offset="41%" stopColor="#A8B8C3" stopOpacity="0.16" />
                <stop offset="56%" stopColor="#8B9DA9" stopOpacity="0.17" />
                <stop offset="69%" stopColor="#63737F" stopOpacity="0.29" />
                <stop offset="83%" stopColor="#4A5862" stopOpacity="0.62" />
                <stop offset="94%" stopColor="#6E7E89" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#37444E" stopOpacity="1" />
              </linearGradient>
              <linearGradient id={`${prefijo}-aro`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3A4854" stopOpacity="1" />
                <stop offset="8%" stopColor="#5E6E7A" stopOpacity="0.96" />
                <stop offset="20%" stopColor="#93A5B1" stopOpacity="0.74" />
                <stop offset="30%" stopColor="#D2DEE6" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#9FB0BB" stopOpacity="0.34" />
                <stop offset="70%" stopColor="#71818D" stopOpacity="0.46" />
                <stop offset="86%" stopColor="#4E5C67" stopOpacity="0.78" />
                <stop offset="100%" stopColor="#3A4854" stopOpacity="1" />
              </linearGradient>
              <linearGradient id={`${prefijo}-metal`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B4A55" />
                <stop offset="16%" stopColor="#8FA2AE" />
                <stop offset="30%" stopColor="#DCE7EE" />
                <stop offset="48%" stopColor="#A3B4BF" />
                <stop offset="70%" stopColor="#6A7A86" />
                <stop offset="88%" stopColor="#9DAFBA" />
                <stop offset="100%" stopColor="#3B4A55" />
              </linearGradient>
              <linearGradient id={`${prefijo}-interior`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#788996" />
                <stop offset="16%" stopColor="#4E5D69" />
                <stop offset="55%" stopColor="#323F49" />
                <stop offset="100%" stopColor="#1E2932" />
              </linearGradient>
              <linearGradient id={`${prefijo}-interiorLados`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0A1218" stopOpacity="0.85" />
                <stop offset="24%" stopColor="#0A1218" stopOpacity="0.16" />
                <stop offset="50%" stopColor="#0A1218" stopOpacity="0" />
                <stop offset="78%" stopColor="#0A1218" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0A1218" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id={`${prefijo}-modelado`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000" stopOpacity="0.46" />
                <stop offset="10%" stopColor="#000" stopOpacity="0.26" />
                <stop offset="26%" stopColor="#fff" stopOpacity="0.34" />
                <stop offset="36%" stopColor="#fff" stopOpacity="0.14" />
                <stop offset="52%" stopColor="#fff" stopOpacity="0" />
                <stop offset="72%" stopColor="#000" stopOpacity="0.18" />
                <stop offset="88%" stopColor="#000" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id={`${prefijo}-superficie`} cx="38%" cy="30%" r="78%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="45%" stopColor="#fff" stopOpacity="0.16" />
                <stop offset="78%" stopColor="#fff" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.16" />
              </radialGradient>
              <radialGradient id={`${prefijo}-brillo`} cx="50%" cy="40%" r="52%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="55%" stopColor="#fff" stopOpacity="0.11" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`${prefijo}-rebote`} cx="50%" cy="52%" r="55%">
                <stop offset="0%" stopColor="#E6F1F8" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#E6F1F8" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`${prefijo}-sombraBoca`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A1218" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#0A1218" stopOpacity="0" />
              </linearGradient>
              <linearGradient id={`${prefijo}-sombraBase`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A1218" stopOpacity="0" />
                <stop offset="100%" stopColor="#0A1218" stopOpacity="0.34" />
              </linearGradient>
              <radialGradient id={`${prefijo}-piso`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0B2431" stopOpacity="0.32" />
                <stop offset="62%" stopColor="#0B2431" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#0B2431" stopOpacity="0" />
              </radialGradient>
              <clipPath id={`${prefijo}-recorteCuerpo`}>
                <path d={CONTORNO_CUERPO} />
              </clipPath>
              <clipPath id={`${prefijo}-recorteCavidad`}>
                <path d={CONTORNO_CAVIDAD} />
              </clipPath>
              <clipPath id={`${prefijo}-bajoSuperficie`}>
                <rect x="-400" y="0" width="1000" height="700" />
              </clipPath>
            </defs>
            <title>{`Caneca de ${capacidad} L llena al ${porcentaje} %`}</title>
            {/* sombra en el piso */}
            <ellipse cx={CENTRO_X} cy={303} rx={86} ry={12} fill={`url(#${prefijo}-piso)`} />
            {/* tapa con sus dos tapones, apoyada detrás */}
            <g opacity="0.95">
              <ellipse cx={CENTRO_X} cy={33} rx={62} ry={26} fill={`url(#${prefijo}-metal)`} />
              <ellipse cx={CENTRO_X} cy={32} rx={55} ry={21} fill={`url(#${prefijo}-acero)`} />
              <ellipse
                cx={CENTRO_X}
                cy={32}
                rx={42}
                ry={15.5}
                fill="none"
                stroke="#fff"
                strokeOpacity="0.16"
                strokeWidth="1.2"
              />
              <ellipse cx={92} cy={25} rx={11.5} ry={6} fill="#8B9CA8" />
              <ellipse cx={92} cy={23.4} rx={9.8} ry={5} fill={`url(#${prefijo}-metal)`} />
              <path d="M85.5,23.2 h13" stroke="#3B4A55" strokeOpacity="0.55" strokeWidth="1.4" />
              <ellipse cx={146} cy={28} rx={7.6} ry={4.2} fill="#8B9CA8" />
              <ellipse cx={146} cy={26.9} rx={6.2} ry={3.4} fill={`url(#${prefijo}-metal)`} />
              <path d="M142.2,26.8 h7.6" stroke="#3B4A55" strokeOpacity="0.55" strokeWidth="1.2" />
            </g>
            {/* cuerpo y cavidad, con el líquido adentro */}
            <path d={CONTORNO_CUERPO} fill={`url(#${prefijo}-acero)`} />
            <g clipPath={`url(#${prefijo}-recorteCavidad)`}>
              <path d={CONTORNO_CAVIDAD} fill={`url(#${prefijo}-interior)`} />
              <path d={CONTORNO_CAVIDAD} fill={`url(#${prefijo}-interiorLados)`} />
              <g className={`${prefijo}-anim`} style={moverLiquido}>
                <rect
                  x={CENTRO_X - RADIO_X_INTERIOR}
                  y={0}
                  width={RADIO_X_INTERIOR * 2}
                  height={330}
                  fill={colorAcento}
                />
                <rect
                  x={CENTRO_X - RADIO_X_INTERIOR}
                  y={0}
                  width={RADIO_X_INTERIOR * 2}
                  height={330}
                  fill={`url(#${prefijo}-modelado)`}
                />
                <g clipPath={`url(#${prefijo}-bajoSuperficie)`}>
                  <g className={`${prefijo}-anim`} style={compensarLiquido}>
                    {capas.map((capa, i) => (
                      <g key={capa.clave} className={`${prefijo}-fade`} style={{ opacity: capa.visible ? 1 : 0 }}>
                        <rect
                          x={CENTRO_X - RADIO_X_INTERIOR}
                          y={capa.y}
                          width={RADIO_X_INTERIOR * 2}
                          height={capa.alto}
                          fill={colorAcento}
                          opacity={OPACIDAD_CAPAS[i % OPACIDAD_CAPAS.length]}
                        />
                        <rect
                          x={CENTRO_X - RADIO_X_INTERIOR}
                          y={capa.y}
                          width={RADIO_X_INTERIOR * 2}
                          height={0.9}
                          fill="#fff"
                          opacity="0.3"
                        />
                      </g>
                    ))}
                  </g>
                </g>
                {/* superficie del líquido */}
                <ellipse cx={CENTRO_X} cy={0} rx={RADIO_X_INTERIOR} ry={RADIO_Y_INTERIOR} fill={colorAcento} />
                <ellipse
                  cx={CENTRO_X}
                  cy={0}
                  rx={RADIO_X_INTERIOR}
                  ry={RADIO_Y_INTERIOR}
                  fill={`url(#${prefijo}-superficie)`}
                />
                <ellipse
                  cx={CENTRO_X}
                  cy={0}
                  rx={RADIO_X_INTERIOR}
                  ry={RADIO_Y_INTERIOR}
                  fill="none"
                  stroke="#fff"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
              </g>
            </g>
            {/* pared frontal translúcida, aros y marcas de nivel */}
            <path d={CONTORNO_CUERPO} fill={`url(#${prefijo}-aceroFrente)`} />
            <g clipPath={`url(#${prefijo}-recorteCuerpo)`}>
              <rect
                x={CENTRO_X - RADIO_X}
                y={Y_BOCA}
                width={RADIO_X * 2}
                height={30}
                fill={`url(#${prefijo}-sombraBoca)`}
              />
              <rect
                x={CENTRO_X - RADIO_X}
                y={Y_BASE - 34}
                width={RADIO_X * 2}
                height={34 + RADIO_Y}
                fill={`url(#${prefijo}-sombraBase)`}
              />
              {[Y_ARO_SUPERIOR, Y_ARO_INFERIOR].map((y) => (
                <g key={y}>
                  <path d={franjaFrontal(y - 5, 10)} fill={`url(#${prefijo}-aro)`} />
                  <path d={arcoFrontal(y - 5)} fill="none" stroke="#0F1A22" strokeOpacity="0.4" strokeWidth="1" />
                  <path d={arcoFrontal(y - 3.4)} fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />
                  <path d={arcoFrontal(y + 5)} fill="none" stroke="#0F1A22" strokeOpacity="0.34" strokeWidth="1" />
                </g>
              ))}
              {MARCAS.map((marca) => {
                const y = yDeNivel(marca);
                return (
                  <g key={marca}>
                    <path d={arcoFrontal(y)} fill="none" stroke="#0B141B" strokeOpacity="0.26" strokeWidth="1" />
                    <path d={arcoFrontal(y + 1.3)} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1" />
                  </g>
                );
              })}
              <rect
                x={70}
                y={Y_BOCA - RADIO_Y}
                width={30}
                height={Y_BASE - Y_BOCA + RADIO_Y * 2}
                fill={`url(#${prefijo}-brillo)`}
              />
              <rect
                x={167}
                y={Y_BOCA - RADIO_Y}
                width={15}
                height={Y_BASE - Y_BOCA + RADIO_Y * 2}
                fill={`url(#${prefijo}-rebote)`}
              />
            </g>
            {/* contorno, base y borde de la boca */}
            <path d={CONTORNO_CUERPO} fill="none" stroke="#16232D" strokeOpacity="0.45" strokeWidth="1.2" />
            <path d={arcoFrontal(Y_BASE)} fill="none" stroke={`url(#${prefijo}-metal)`} strokeWidth="4.5" />
            <path d={arcoFrontal(Y_BASE - 2.6)} fill="none" stroke="#0F1A22" strokeOpacity="0.3" strokeWidth="1" />
            <ellipse
              cx={CENTRO_X}
              cy={Y_BOCA}
              rx={RADIO_X}
              ry={RADIO_Y}
              fill="none"
              stroke={`url(#${prefijo}-metal)`}
              strokeWidth="6.5"
            />
            <ellipse
              cx={CENTRO_X}
              cy={Y_BOCA - 1.4}
              rx={RADIO_X - 1.8}
              ry={RADIO_Y - 1.8}
              fill="none"
              stroke="#fff"
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            <ellipse
              cx={CENTRO_X}
              cy={Y_BOCA}
              rx={RADIO_X_INTERIOR}
              ry={RADIO_Y_INTERIOR}
              fill="none"
              stroke="#0A121A"
              strokeOpacity="0.55"
              strokeWidth="1.6"
            />
            {/* rótulos de litros a la derecha */}
            {MARCAS.map((marca, i) => {
              const y = yDeNivel(marca);
              return (
                <g key={`etq-${marca}`}>
                  <path
                    d={`M${CENTRO_X + RADIO_X},${y} h6`}
                    stroke={COLORES.borde}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <text
                    x={CENTRO_X + RADIO_X + 9}
                    y={y + 3.4}
                    fontSize="9.5"
                    fontWeight="700"
                    fill={COLORES.textoSuave}
                  >
                    {Math.round(marca * capacidad)}
                    {i === MARCAS.length - 1 ? ' L' : ''}
                  </text>
                </g>
              );
            })}
            {/* indicador de litros que acompaña a la superficie */}
            <g className={`${prefijo}-anim`} style={moverLiquido}>
              <path
                d={`M10,0 H${CENTRO_X - RADIO_X_INTERIOR}`}
                stroke={colorAcento}
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.6"
              />
              <rect x={2} y={-9.5} width={44} height={19} rx={6.5} fill={colorAcento} />
              <text x={24} y={4.2} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
                {litrosTexto} L
              </text>
            </g>
          </svg>
          <div className="mt-1 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
              Nivel del tanque
            </p>
            <p className="mt-0.5" style={{ color: COLORES.tinta }}>
              <span className="font-mono text-3xl font-bold">{litrosTexto}</span>
              <span className="ml-1 text-base font-bold">L</span>
            </p>
            <p className="mt-0.5 text-xs" style={{ color: COLORES.textoSuave }}>
              de {capacidad} L · {porcentaje} % de la caneca
            </p>
          </div>
        </div>
        {/* Explicación del paso actual */}
        <div className="sm:col-span-3">
          <div aria-live="polite">
            <div
              className="rounded-2xl border bg-white p-4 transition"
              style={{
                borderColor: COLORES.borde,
                borderLeft: `4px solid ${aplica ? estilo.color : COLORES.borde}`,
                boxShadow: '0 1px 3px rgba(11,36,49,0.08)',
                opacity: aplica ? 1 : 0.58,
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold text-white"
                  style={{ backgroundColor: aplica ? estilo.color : COLORES.gris }}
                >
                  {numeroPaso}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color: aplica ? estilo.color : COLORES.textoSuave }}
                  >
                    <IconoPaso size={13} strokeWidth={2.2} />
                    {estilo.etiqueta}
                  </p>
                  <h3 className="mt-0.5 break-words text-base font-bold leading-tight" style={{ color: COLORES.tinta }}>
                    {actual.que}
                  </h3>
                  {actual.detalle && (
                    <p className="mt-1 break-words text-sm leading-snug" style={{ color: COLORES.textoSuave }}>
                      {actual.detalle}
                    </p>
                  )}
                </div>
              </div>
              {(siglasPaso.length > 0 || !aplica) && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {siglasPaso.map((sigla) => (
                    <span
                      key={sigla}
                      className="rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold"
                      style={{ backgroundColor: estilo.fondo, color: estilo.color }}
                    >
                      {sigla}
                    </span>
                  ))}
                  {!aplica && (
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                      style={{ backgroundColor: COLORES.grisClaro, color: COLORES.textoSuave }}
                    >
                      No aplica a tu mezcla
                    </span>
                  )}
                </div>
              )}
              <p
                className="mt-3 text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: COLORES.textoSuave }}
              >
                Qué entra aquí
              </p>
              {productosPaso.length > 0 ? (
                <ul className="mt-1.5 space-y-1.5">
                  {productosPaso.map((pr, i) => (
                    <li
                      key={pr && pr.id ? pr.id : `pr-${i}`}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                      style={{ backgroundColor: COLORES.papel }}
                    >
                      <span
                        className="min-w-0 flex-1 truncate text-sm font-semibold"
                        style={{ color: COLORES.tinta }}
                        title={pr && pr.nombre ? pr.nombre : ''}
                      >
                        {pr && pr.nombre ? pr.nombre : 'Producto'}
                      </span>
                      {pr && pr.sigla && (
                        <span
                          className="shrink-0 rounded font-mono text-[10px] font-bold"
                          style={{ color: COLORES.textoSuave }}
                        >
                          {pr.sigla}
                        </span>
                      )}
                      {pr && pr.dosis && (
                        <span className="shrink-0 font-mono text-sm font-bold" style={{ color: colorAcento }}>
                          {pr.dosis}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className="mt-1.5 rounded-lg border border-dashed px-3 py-2 text-xs"
                  style={{ borderColor: COLORES.borde, color: COLORES.textoSuave }}
                >
                  Ningún producto de tu mezcla entra en este paso.
                </p>
              )}
              {actual.porque && (
                <>
                  <button
                    type="button"
                    onClick={() => setVerPorque((v) => !v)}
                    aria-expanded={verPorque}
                    aria-label={
                      verPorque
                        ? `Ocultar la explicación del paso ${numeroPaso}`
                        : `Ver por qué se hace el paso ${numeroPaso}`
                    }
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition"
                    style={{ borderColor: COLORES.borde, color: COLORES.tinta }}
                  >
                    <Info size={13} style={{ color: estilo.color }} />
                    ¿Por qué?
                    <ChevronDown
                      size={14}
                      className="transition-transform"
                      style={{ color: COLORES.textoSuave, transform: verPorque ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  {verPorque && (
                    <div
                      className="mt-2 max-h-44 overflow-y-auto overscroll-contain rounded-xl p-3"
                      style={{ backgroundColor: COLORES.papel }}
                    >
                      <p className="break-words text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                        {actual.porque}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => irA(indice - 1)}
              disabled={indice === 0}
              aria-label="Ir al paso anterior de la carga"
              className="flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{ borderColor: COLORES.borde, backgroundColor: '#fff', color: COLORES.tinta }}
            >
              <ChevronLeft size={16} />
              Anterior
            </button>
            <span
              className="flex-1 text-center text-[11px] font-semibold uppercase tracking-wide"
              style={{ color: COLORES.textoSuave }}
            >
              Paso {indice + 1} de {total}
            </span>
            <button
              type="button"
              onClick={() => irA(indice + 1)}
              disabled={indice === total - 1}
              aria-label="Ir al siguiente paso de la carga"
              className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: colorAcento }}
            >
              Siguiente
              <ChevronRight size={16} />
            </button>
          </div>
          {/* Riel con todos los pasos; los que no aplican a la mezcla se atenúan */}
          <nav aria-label="Pasos del orden de carga" className="mt-3">
            <ol className="grid gap-1" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
              {pasosValidos.map((paso, i) => {
                const aplicaPaso = paso.aplica !== false;
                const esActual = i === indice;
                const yaPaso = i < indice;
                const colorRiel = esActual
                  ? colorAcento
                  : aplicaPaso
                    ? yaPaso
                      ? colorAcento
                      : COLORES.borde
                    : COLORES.grisClaro;
                return (
                  <li key={`riel-${i}`} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => irA(i)}
                      aria-current={esActual ? 'step' : undefined}
                      aria-label={`Paso ${Number.isFinite(Number(paso.paso)) ? paso.paso : i + 1}: ${paso.que || 'sin título'}${aplicaPaso ? '' : ' (no aplica a tu mezcla)'}`}
                      className="block w-full rounded-md px-0.5 pb-0.5 pt-1 text-center transition"
                      style={{ opacity: aplicaPaso ? 1 : 0.4 }}
                    >
                      <span
                        className="block rounded-full transition-all"
                        style={{
                          height: esActual ? 6 : 4,
                          backgroundColor: colorRiel,
                          opacity: yaPaso && !esActual ? 0.45 : 1,
                        }}
                      />
                      <span
                        className="mt-1 block font-mono text-[10px] font-bold leading-none"
                        style={{ color: esActual ? colorAcento : COLORES.textoSuave }}
                      >
                        {Number.isFinite(Number(paso.paso)) ? paso.paso : i + 1}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
// src/components/TutorialMezcla.jsx
// ══════════════════════════════════════════════════════════════════

/**
 * Repaso rápido del orden de carga: cinco ideas clave para que no se corte la
 * mezcla. Cada diapositiva dice qué hacer y, aparte, por qué.
 */
const DIAPOSITIVAS = [
  {
    titulo: 'La regla, en una frase',
    cuerpo:
      'Agua → corrige el agua → sólidos → líquidos → fertilizantes → coadyuvantes → completa. Si respetas ese orden ya evitaste la mayoría de las mezclas cortadas.',
    porque:
      'Cada familia necesita una condición distinta del caldo para integrarse bien. Meterlas en desorden es lo que produce grumos, natas y capas que ya no se recuperan agitando.',
  },
  {
    titulo: 'Sólidos primero, y prediluidos',
    cuerpo:
      'Polvos y granulados (WP, WG, SG) nunca van secos al tanque: se disuelven aparte en un balde con agua y se vierten colados, con el agitador andando.',
    porque:
      'Un polvo seco que cae sobre un caldo ya cargado se aglomera y termina tapando boquillas o quedándose en el fondo sin aplicar. Necesita agua limpia y en movimiento para hidratarse.',
  },
  {
    titulo: 'Fertilizantes y coadyuvantes, de últimos',
    cuerpo:
      'Los foliares y micronutrientes entran después de los plaguicidas. Los coadyuvantes (tensioactivos, aceites, antideriva) van al final, con el tanque casi lleno.',
    porque:
      'Son sales concentradas y surfactantes: temprano hacen flocular lo que ya está suspendido, generan espuma durante toda la carga, y su dosis depende del volumen final que aún no conoces.',
  },
  {
    titulo: 'El orden no lo arregla todo',
    cuerpo:
      'Dos productos pueden ser incompatibles entre sí aunque los cargues bien: por antagonismo físico-químico (uno desestabiliza la formulación del otro) o biológico (uno le baja la eficacia al otro sin que se vea).',
    porque:
      'La etiqueta ICA es la fuente autorizada sobre las mezclas ya documentadas. Para combinaciones que no están en la etiqueta, no existe forma de saberlo por cálculo: hay que probarlo.',
  },
  {
    titulo: 'La prueba de frasco: 15 minutos',
    cuerpo:
      'Antes de mezclar dos productos por primera vez, combínalos en un frasco transparente en la misma proporción del tanque y espera 15 minutos. Si aparecen grumos, natas, separación en capas o calor, no los mezcles: aplícalos por separado.',
    porque:
      'Quince minutos en un frasco cuestan mucho menos que un tanque de 200 L cortado, una aplicación perdida y las boquillas tapadas a mitad del lote.',
  },
];

/** Tutorial en ventana sobre la pantalla, con flechas del teclado y Escape. */
function TutorialMezcla({ onCerrar }) {
  const [indice, setIndice] = useState(0);
  const total = DIAPOSITIVAS.length;
  const diapositiva = DIAPOSITIVAS[indice];
  const esUltima = indice === total - 1;

  useEffect(() => {
    const conTecla = (e) => {
      if (e.key === 'Escape') onCerrar();
      if (e.key === 'ArrowRight') setIndice((i) => Math.min(i + 1, total - 1));
      if (e.key === 'ArrowLeft') setIndice((i) => Math.max(i - 1, 0));
    };
    document.addEventListener('keydown', conTecla);

    // Bloquear el desplazamiento del fondo mientras el tutorial está abierto
    const desplazamientoPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', conTecla);
      document.body.style.overflow = desplazamientoPrevio;
    };
  }, [onCerrar, total]);

  const puntos = useMemo(() => DIAPOSITIVAS.map((_, i) => i), []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
      onClick={onCerrar}
      role="presentation"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Tutorial: cómo armar una mezcla"
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: COLORES.borde }}>
          <span
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
            style={{ color: COLORES.textoSuave }}
          >
            <Beaker size={14} /> Tutorial · {indice + 1} de {total}
          </span>
          <button
            onClick={onCerrar}
            className="rounded-full p-1.5 transition hover:bg-slate-100"
            aria-label="Cerrar tutorial"
          >
            <X size={18} style={{ color: COLORES.textoSuave }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <h3 className="text-lg font-bold" style={{ color: COLORES.tinta }}>
            {diapositiva.titulo}
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
            {diapositiva.cuerpo}
          </p>
          {diapositiva.porque && (
            <div className="mt-3 flex gap-2 rounded-lg p-3" style={{ backgroundColor: COLORES.azulClaro }}>
              <Droplets size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.azul }} />
              <p className="text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                <strong>¿Por qué?</strong> {diapositiva.porque}
              </p>
            </div>
          )}
        </div>

        <div className="border-t px-5 py-3" style={{ borderColor: COLORES.borde }}>
          {/* Puntos de avance: el actual se alarga */}
          <div className="flex items-center justify-center gap-1.5">
            {puntos.map((i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === indice ? 16 : 6, backgroundColor: i === indice ? COLORES.azul : COLORES.borde }}
              />
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setIndice((i) => Math.max(i - 1, 0))}
              disabled={indice === 0}
              className="flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-30"
              style={{ color: COLORES.tinta, border: `1px solid ${COLORES.borde}` }}
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            <button
              onClick={() => (esUltima ? onCerrar() : setIndice((i) => i + 1))}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: COLORES.tinta }}
            >
              {esUltima ? 'Listo' : 'Siguiente'} {!esUltima && <ChevronRight size={16} />}
            </button>
          </div>
        </div>
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

/**
 * Sección plegable: muestra el título y el resumen, y despliega la
 * explicación al tocar. Así la lista de pasos se puede leer de un vistazo.
 */
function Seccion({ titulo, subtitulo, children }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <div className="rounded-xl border bg-white" style={{ borderColor: COLORES.borde }}>
      <button
        onClick={() => setAbierta((v) => !v)}
        className="flex w-full items-center justify-between gap-3 p-3 text-left"
        aria-expanded={abierta}
      >
        <span className="min-w-0">
          <span className="block text-sm font-semibold" style={{ color: COLORES.tinta }}>
            {titulo}
          </span>
          {subtitulo && (
            <span className="mt-0.5 block text-xs" style={{ color: COLORES.textoSuave }}>
              {subtitulo}
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform"
          style={{ color: COLORES.textoSuave, transform: abierta ? 'rotate(180deg)' : 'none' }}
        />
      </button>
      {abierta && (
        <div className="border-t px-3 pb-3 pt-2.5" style={{ borderColor: COLORES.borde }}>
          {children}
        </div>
      )}
    </div>
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
  const [verTutorial, setVerTutorial] = useState(false);
  const [pasoCaneca, setPasoCaneca] = useState(0);
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

  // Tipos de formulación distintos en el tanque
  const formulaciones = useMemo(() => analizarFormulaciones(productosElegidos), [productosElegidos]);

  // Semáforo de la mezcla: con dos o más productos dice de un vistazo si hay
  // riesgo de incompatibilidad física, choque de modo de acción o nada que
  // reportar. La incompatibilidad física va primero porque corta el tanque.
  const estadoMezcla = useMemo(() => {
    if (productosElegidos.length < 2) return null;
    if (formulaciones.riesgo) {
      const siglas = formulaciones.tipos.map((t) => t.sigla).join(', ');
      return {
        Icono: OctagonAlert,
        fondo: '#FDF3EE',
        borde: '#F0C9B4',
        texto: '#C2410C',
        mensaje: `Riesgo de incompatibilidad: ${formulaciones.distintas} formulaciones distintas en el tanque (${siglas})`,
      };
    }
    if (choques.length > 0) {
      return {
        Icono: AlertTriangle,
        fondo: COLORES.ambarClaro,
        borde: COLORES.ambar,
        texto: COLORES.ambar,
        mensaje: 'Hay modos de acción repetidos en la mezcla',
      };
    }
    return {
      Icono: CircleCheck,
      fondo: COLORES.verdeClaro,
      borde: COLORES.verde,
      texto: COLORES.verde,
      mensaje: 'Sin conflictos detectados entre los productos seleccionados',
    };
  }, [productosElegidos.length, formulaciones, choques.length]);

  // Orden de carga con los productos de la mezcla ubicados en su paso. Un
  // paso de formulación sin ningún producto de la mezcla queda como "no
  // aplica"; los pasos generales (agua, acondicionador, cierre) siempre aplican.
  const pasosCaneca = useMemo(() => {
    const porPaso = new Map();
    items.forEach((item) => {
      const producto = PRODUCTOS.find((p) => p.id === item.productoId);
      if (!producto) return;
      const f = formulacionDe(producto);
      const paso = f?.ordenCarga || 8;
      const calculo = calcularMezcla({
        dosis: item.dosis,
        unidad: item.unidad,
        area: condiciones.area,
        volumenHa: condiciones.volumenHa,
        capacidadBomba: condiciones.capacidadBomba,
      });
      if (!porPaso.has(paso)) porPaso.set(paso, []);
      porPaso.get(paso).push({
        id: producto.id,
        nombre: producto.nombre,
        sigla: f?.sigla || '—',
        dosis: calculo ? `${unidadAmigable(calculo.productoPorBomba, calculo.base)} por bomba` : 'falta la dosis',
      });
    });
    return ORDEN_TANQUE.map((p) => {
      const productos = porPaso.get(p.paso) || [];
      return { ...p, productos, aplica: p.siglas.length === 0 || productos.length > 0 };
    });
  }, [items, condiciones]);

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

          {estadoMezcla && (
            <div
              className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold"
              style={{
                backgroundColor: estadoMezcla.fondo,
                border: `1px solid ${estadoMezcla.borde}`,
                color: estadoMezcla.texto,
              }}
            >
              <estadoMezcla.Icono size={16} className="shrink-0" />
              {estadoMezcla.mensaje}
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
              style={{ backgroundColor: COLORES.ambarClaro, border: `1px solid ${COLORES.ambar}` }}
            >
              <p className="flex items-center gap-2 text-sm font-bold" style={{ color: COLORES.ambar }}>
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

          {formulaciones.riesgo && (
            <div
              className="mt-4 rounded-lg p-3"
              style={{ backgroundColor: '#FDF3EE', border: '1px solid #F0C9B4' }}
            >
              <p className="flex items-center gap-2 text-sm font-bold" style={{ color: '#C2410C' }}>
                <OctagonAlert size={15} /> Formulaciones distintas en la misma mezcla
              </p>
              <p className="mt-2 text-sm" style={{ color: COLORES.tinta }}>
                Estás combinando {formulaciones.distintas} tipos de formulación:{' '}
                {formulaciones.tipos.map((t) => `${t.nombre} (${t.sigla})`).join(', ')}. Mientras más tipos
                entran al mismo tanque, más pasos delicados hay en el orden de carga y más riesgo de grumos o
                separación — revisa la pestaña "Orden de carga" y no te saltes la prueba de frasco.
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
          <button
            onClick={() => setVerTutorial(true)}
            className="mt-5 flex w-full items-center gap-3 rounded-2xl p-4 text-left transition hover:opacity-90"
            style={{ backgroundColor: COLORES.tinta }}
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <GraduationCap size={22} color="#fff" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-white">Repaso rápido: que no se corte la mezcla</span>
              <span className="mt-0.5 block text-xs" style={{ color: '#9DB8C9' }}>
                Cinco ideas clave en un minuto
              </span>
            </span>
          </button>

          {/* La caneca de 200 L se llena paso a paso con los productos de la mezcla */}
          <div className="mt-5">
            <Caneca
              pasos={pasosCaneca}
              indiceActivo={pasoCaneca}
              onCambiarPaso={setPasoCaneca}
              capacidadLitros={200}
              color={COLORES.azul}
            />
          </div>

          <h3 className="mt-6 text-sm font-bold" style={{ color: COLORES.tinta }}>
            Regla general de carga
          </h3>
          <p className="mt-1 text-xs" style={{ color: COLORES.textoSuave }}>
            Toca cada paso para ver por qué importa, no solo qué hacer.
          </p>
          <div className="mt-2 space-y-2">
            {ORDEN_TANQUE.map((p) => (
              <Seccion key={p.paso} titulo={`${p.paso}. ${p.que}`} subtitulo={p.detalle}>
                <p className="text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  <strong>¿Por qué?</strong> {p.porque}
                </p>
              </Seccion>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold" style={{ color: COLORES.tinta }}>
            Coadyuvantes: qué hace cada tipo
          </h3>
          <p className="mt-1 text-xs" style={{ color: COLORES.textoSuave }}>
            No son el ingrediente activo — cambian cómo se comporta la mezcla o la gota.
          </p>
          <div className="mt-2 space-y-2">
            {COADYUVANTES.map((c) => (
              <Seccion key={c.categoria} titulo={c.categoria}>
                <p className="text-sm leading-relaxed" style={{ color: COLORES.tinta }}>
                  {c.quePasa}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide" style={{ color: COLORES.textoSuave }}>
                  Cuándo se usa
                </p>
                <p className="mt-0.5 text-sm" style={{ color: COLORES.tinta }}>
                  {c.cuando}
                </p>
              </Seccion>
            ))}
          </div>

          <div className="mt-6 flex gap-2 rounded-lg p-3" style={{ backgroundColor: COLORES.azulClaro }}>
            <Info size={16} className="mt-0.5 shrink-0" style={{ color: COLORES.azul }} />
            <p className="text-xs leading-relaxed" style={{ color: COLORES.tinta }}>
              <strong>Por qué se corta una mezcla aun siguiendo el orden:</strong> puede haber antagonismo
              físico-químico (un producto desestabiliza la formulación del otro) o antagonismo biológico (uno reduce
              la eficacia del otro sin que se note a simple vista). La etiqueta ICA es la fuente autorizada sobre
              mezclas conocidas; para lo que no está documentado, la prueba de frasco (más abajo) es la única forma
              confiable de detectarlo en campo.
            </p>
          </div>

          {verTutorial && <TutorialMezcla onCerrar={() => setVerTutorial(false)} />}
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
// src/components/AvisosApp.jsx
// ══════════════════════════════════════════════════════════════════

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
function AvisosApp() {
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

const VISTAS = ['diagnostico', 'catalogo', 'rotacion', 'mezcla', 'aprender'];

/**
 * Pestaña con la que abre la app. Los atajos del ícono instalado
 * (manifest.webmanifest) entran con ?vista=diagnostico o ?vista=mezcla.
 */
function vistaInicial() {
  const vista = new URLSearchParams(window.location.search).get('vista');
  return VISTAS.includes(vista) ? vista : 'diagnostico';
}

function App() {
  const [pestana, setPestana] = useState(vistaInicial);
  const [productoAbierto, setProductoAbierto] = useState(null);
  const [productoRotacion, setProductoRotacion] = useState(null);
  const [verCiclo, setVerCiclo] = useState(false);

  const actual = PESTANAS.find((p) => p.id === pestana);

  // Función estable: la ficha la guarda en una referencia y no debe cambiar
  // en cada pintado.
  const cerrarFicha = useCallback(() => setProductoAbierto(null), []);

  const irARotacion = (producto) => {
    // La ficha abierta dejó una entrada en el historial: se consume para que
    // "atrás" no vuelva a una ficha que ya no está.
    if (window.history.state?.ficha) window.history.back();
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

      <div className="mx-auto max-w-3xl">
        <AvisosApp />
      </div>

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
          No reemplaza la etiqueta ICA ni la visita técnica: la decisión final y la aplicación en campo son
          responsabilidad del profesional o usuario que las ejecuta.
        </p>
      </main>

      <BarraInferior pestanas={PESTANAS} activa={pestana} onCambio={cambiarPestana} />

      {productoAbierto && (
        <FichaProducto
          producto={productoAbierto}
          onCerrar={cerrarFicha}
          onVerRotacion={irARotacion}
        />
      )}
    </div>
  );
}

export default App;
