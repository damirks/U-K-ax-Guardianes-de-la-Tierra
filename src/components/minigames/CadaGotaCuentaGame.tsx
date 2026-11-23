import React, { useState, useEffect, useRef } from 'react';
import {
  Droplets,
  Heart,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Volume2,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Search,
  AlertTriangle,
  ChevronRight,
  Wrench,
} from 'lucide-react';
import { LevelConfig, VocabWord } from '../../types';
import { soundService } from '../../services/sound';
import { ParticleBurst } from '../ParticleBurst';

interface CadaGotaCuentaGameProps {
  level: LevelConfig;
  onSuccess: (unlockedWords: VocabWord[]) => void;
  onFailure: (message: string) => void;
  onUpdateStats: (lives: number, goalCount: number, goalTarget: number, timeLeft: number) => void;
}

interface ActionOption {
  id: string;
  title: string;
  mayaTitle: string;
  iconType: 'cerrar' | 'reparar' | 'recolectar' | 'desperdiciar' | 'cubeta';
  isCorrect: boolean;
  waterSavedLiters: number;
  explanation: string;
}

interface WaterChallenge {
  id: string;
  roomKey: 'cocina' | 'bano_ducha' | 'cochera' | 'techo_lluvia' | 'bano_inodoro' | 'patio_huerto' | 'dormitorio';
  roomName: string;
  mayaRoom: string;
  problemTitle: string;
  shortDiagnosis: string;
  pointerPos: { x: number; y: number; label: string }; // SVG coordinates
  highlightBox: { x: number; y: number; width: number; height: number };
  actions: ActionOption[];
  ancestralWisdom: string;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const SESSION_CHALLENGES_COUNT = 6;

const WATER_CHALLENGES_BANK: WaterChallenge[] = [
  {
    id: 'ch_cocina',
    roomKey: 'cocina',
    roomName: 'Cocina',
    mayaRoom: "K'óoben",
    problemTitle: 'Grifo del fregadero con goteo constante',
    shortDiagnosis: 'La llave de agua dulce gotea día y noche sin que nadie la use, desperdiciando agua potable.',
    pointerPos: { x: 420, y: 345, label: 'Fregadero' },
    highlightBox: { x: 310, y: 260, width: 265, height: 175 },
    actions: [
      {
        id: 'act_cerrar_llave',
        title: 'Cerrar la llave y cambiar el empaque desgastado',
        mayaTitle: "K'al ja' (Cerrar el agua)",
        iconType: 'cerrar',
        isCorrect: true,
        waterSavedLiters: 35,
        explanation: '¡Excelente! Cerrar la llave y sustituir el empaque de hule detiene el goteo de inmediato, salvando más de 30 litros al día.',
      },
      {
        id: 'act_dejar_correr',
        title: 'Dejarlo gotear, total son solo pequeñas gotas',
        mayaTitle: "Púul ja' (Desperdiciar agua)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Gota tras gota se pierden más de 1,000 litros al mes. Nunca debemos menospreciar un goteo continuo.',
      },
      {
        id: 'act_abrir_otra',
        title: 'Abrir otra llave de la casa para bajar la presión',
        mayaTitle: "K'as (Uso desmedido)",
        iconType: 'reparar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Abrir más grifos duplica el consumo sin solucionar la fuga del empaque.',
      },
    ],
    ancestralWisdom: "Para los sabios mayas, cada gota de agua (Ja') es el alma de la vida. Cuidar la cocina (K'óoben) es honrar el alimento y la salud de la familia.",
  },
  {
    id: 'ch_cocina_aceite',
    roomKey: 'cocina',
    roomName: 'Cocina · Tarja',
    mayaRoom: "K'óoben",
    problemTitle: 'Aceite de cocina usado a punto de irse por el desagüe',
    shortDiagnosis: 'Después de cocinar queda aceite caliente en el sartén y alguien piensa vaciarlo directamente en la tarja.',
    pointerPos: { x: 405, y: 362, label: 'Desagüe de cocina' },
    highlightBox: { x: 310, y: 260, width: 265, height: 175 },
    actions: [
      {
        id: 'act_envase_aceite',
        title: 'Dejarlo enfriar, guardarlo en un frasco cerrado y entregarlo a reciclaje',
        mayaTitle: "Kanant ja' (Proteger el agua)",
        iconType: 'recolectar',
        isCorrect: true,
        waterSavedLiters: 90,
        explanation: '¡Gran protección! Un solo litro de aceite contamina hasta 1,000 litros de agua de cenotes y ríos. En frasco puede reciclarse en jabón o biocombustible.',
      },
      {
        id: 'act_tirar_tarja',
        title: 'Vaciarlo al fregadero con agua caliente y jabón',
        mayaTitle: "K'askúunt ja' (Contaminar agua)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Al enfriarse en la tubería, el aceite tapa los drenajes y termina contaminando los mantos freáticos.',
      },
      {
        id: 'act_tirar_tierra',
        title: 'Arrojarlo directamente sobre las raíces de las plantas del patio',
        mayaTitle: "K'as lu'um (Dañar el suelo)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'El aceite de cocina impermeabiliza el suelo, asfixia las raíces y contamina el agua subterránea.',
      },
    ],
    ancestralWisdom: "Los cenotes (Ts'ono'ot) están conectados bajo la tierra caliza de Yucatán. Mantener limpia la cocina protege el agua pura de toda la comunidad.",
  },
  {
    id: 'ch_cocina_verduras',
    roomKey: 'cocina',
    roomName: 'Cocina · Alimentos',
    mayaRoom: "K'óoben",
    problemTitle: 'Lavar frutas y verduras con el chorro directo abierto',
    shortDiagnosis: 'El grifo permanece abierto a máxima presión durante varios minutos mientras se limpian los alimentos.',
    pointerPos: { x: 432, y: 348, label: 'Lavado de alimentos' },
    highlightBox: { x: 310, y: 260, width: 265, height: 175 },
    actions: [
      {
        id: 'act_tina_verduras',
        title: 'Lavarlas en un tazón con agua y usar esa agua sobrante para las plantas',
        mayaTitle: "Ka'a meyaj ja' (Reusar el agua)",
        iconType: 'cubeta',
        isCorrect: true,
        waterSavedLiters: 40,
        explanation: '¡Doble ahorro! Lavar en un recipiente consume una fracción mínima de agua y luego esa misma agua nutre las macetas o el huerto.',
      },
      {
        id: 'act_chorro_fuerte',
        title: 'Dejar la llave abierta al máximo para que la fuerza limpie más rápido',
        mayaTitle: "Púul ja' (Desperdicio)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'El chorro continuo desperdicia decenas de litros en menos de tres minutos directo al drenaje.',
      },
      {
        id: 'act_lavar_una_por_una',
        title: 'Abrir otra llave paralela para enjuagar todo al mismo tiempo',
        mayaTitle: "K'as (Doble gasto)",
        iconType: 'reparar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Usar dos salidas de agua simultáneas multiplica el gasto innecesariamente.',
      },
    ],
    ancestralWisdom: "En la milpa y la cocina tradicional, el agua (Ja') nunca toca el suelo sin propósito: se aprovecha hasta la última gota.",
  },
  {
    id: 'ch_ducha',
    roomKey: 'bano_ducha',
    roomName: 'Baño · Regadera',
    mayaRoom: "Ichkíil Ja'",
    problemTitle: 'Ducha de más de 15 minutos con regadera abierta',
    shortDiagnosis: 'La regadera corre al máximo con vapor llenando el cuarto mientras la persona se distrae.',
    pointerPos: { x: 520, y: 155, label: 'Regadera' },
    highlightBox: { x: 310, y: 88, width: 265, height: 168 },
    actions: [
      {
        id: 'act_ducha_5min',
        title: 'Bañarse en 5 minutos y cerrar la llave al enjabonarse',
        mayaTitle: 'Utsil ichkíil (Baño consciente)',
        iconType: 'cerrar',
        isCorrect: true,
        waterSavedLiters: 60,
        explanation: '¡Hábito de guardián! Una ducha de 5 minutos cerrando la llave al enjabonarte ahorra más de 60 litros en cada baño.',
      },
      {
        id: 'act_dejar_vapor',
        title: 'Dejar correr el agua para que el vapor caliente el baño',
        mayaTitle: "Púul ja' (Tirar agua tibia)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'El agua tibia que corre sola al drenaje es un desperdicio doble de agua limpia y energía calorífica.',
      },
      {
        id: 'act_abrir_tina',
        title: 'Llenar además la tina para jugar con burbujas',
        mayaTitle: "K'as túunt (Gasto excesivo)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Llenar la tina consume más de 150 litros adicionales de agua potable.',
      },
    ],
    ancestralWisdom: 'El baño tradicional maya se realizaba con una jícara de agua (lúuch), administrando con respeto cada porción de agua sagrada.',
  },
  {
    id: 'ch_ducha_espera',
    roomKey: 'bano_ducha',
    roomName: 'Baño · Regadera',
    mayaRoom: "Ichkíil Ja'",
    problemTitle: 'Agua fría de la regadera yéndose al drenaje antes de entibiarse',
    shortDiagnosis: 'Cada mañana se dejan correr varios litros de agua limpia esperando que salga tibia del calentador.',
    pointerPos: { x: 515, y: 185, label: 'Chorro inicial' },
    highlightBox: { x: 310, y: 88, width: 265, height: 168 },
    actions: [
      {
        id: 'act_cubeta_ducha',
        title: 'Colocar una cubeta bajo la regadera para recolectar el agua limpia inicial',
        mayaTitle: "Ch'a' ja' (Cosechar agua limpia)",
        iconType: 'cubeta',
        isCorrect: true,
        waterSavedLiters: 30,
        explanation: '¡Excelente hábito! Esa agua está completamente limpia; puedes usarla después para bajar el inodoro, trapear o regar plantas.',
      },
      {
        id: 'act_dejar_coladera',
        title: 'Dejar que se vaya directo a la coladera porque es poca',
        mayaTitle: "Púul ja' (Perder agua)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'En una familia de 4 personas, esa espera diaria desperdicia más de 1,000 litros al mes de agua potable.',
      },
      {
        id: 'act_abrir_lavabo_tb',
        title: 'Abrir el lavabo al mismo tiempo para que llegue más rápido el agua caliente',
        mayaTitle: "K'as (Doble desperdicio)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Abrir otro grifo duplica la cantidad de agua desperdiciada hacia el drenaje.',
      },
    ],
    ancestralWisdom: 'Una cubeta a tiempo convierte un desperdicio diario en reserva de vida para el hogar maya.',
  },
  {
    id: 'ch_lavabo_dientes',
    roomKey: 'bano_ducha',
    roomName: 'Baño · Lavabo',
    mayaRoom: "P'o' Chi'",
    problemTitle: 'Llave del lavabo abierta mientras alguien se cepilla los dientes',
    shortDiagnosis: 'El agua potable corre sin parar por el desagüe durante los dos minutos de cepillado dental.',
    pointerPos: { x: 450, y: 185, label: 'Lavabo' },
    highlightBox: { x: 310, y: 88, width: 265, height: 168 },
    actions: [
      {
        id: 'act_vaso_dientes',
        title: 'Cerrar la llave al cepillar y enjuagarse usando solo un vaso con agua',
        mayaTitle: "K'al ja' (Ahorrar con vaso)",
        iconType: 'cerrar',
        isCorrect: true,
        waterSavedLiters: 25,
        explanation: '¡Acción inteligente! Con un solo vaso ahorras hasta 12 litros en cada cepillado comparado con dejar la llave abierta.',
      },
      {
        id: 'act_dejar_hilo_agua',
        title: 'Dejar el grifo abierto a la mitad para no tocarlo con las manos',
        mayaTitle: "Púul ja' (Fuga continua)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Incluso a la mitad de presión se desperdician más de 6 litros por minuto sin aprovecharse.',
      },
      {
        id: 'act_cepillarse_ducha',
        title: 'Dejar abierta la regadera mientras te cepillas en el lavabo',
        mayaTitle: "K'as (Gasto innecesario)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Mantener abierta la regadera sin usarla desperdicia decenas de litros cada minuto.',
      },
    ],
    ancestralWisdom: "Cada pequeño gesto diario de cuidado fortalece el equilibrio del Ja' (agua) en tu hogar.",
  },
  {
    id: 'ch_cochera_fuga',
    roomKey: 'cochera',
    roomName: 'Cochera y Tuberías',
    mayaRoom: "P'uuk Ja'",
    problemTitle: 'Fisura en la tubería principal del calentador',
    shortDiagnosis: 'La tubería que alimenta el calentador se rompió y lanza un chorro de agua a presión al piso.',
    pointerPos: { x: 250, y: 320, label: 'Tubería rota' },
    highlightBox: { x: 82, y: 215, width: 220, height: 225 },
    actions: [
      {
        id: 'act_reparar_tubo',
        title: 'Cerrar la válvula general y reparar la unión con herramienta',
        mayaTitle: "Utskin p'uuk (Reparar tubería)",
        iconType: 'reparar',
        isCorrect: true,
        waterSavedLiters: 85,
        explanation: '¡Gran decisión técnica! Cortar la llave de paso general y cambiar el tramo roto frena la pérdida masiva de agua.',
      },
      {
        id: 'act_tapar_trapo',
        title: 'Amarrar un trapo mojado alrededor de la fuga',
        mayaTitle: "Ta'ak k'as (Remedio falso)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Un trapo no resiste la presión del agua y se soltará rápidamente inundando los cimientos.',
      },
      {
        id: 'act_lavar_carro',
        title: 'Aprovechar el chorro para mojar la camioneta',
        mayaTitle: "P'o' kisbuuts' (Mal uso)",
        iconType: 'recolectar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'El agua a presión sin control no lava el vehículo y desperdicia cientos de litros hacia la calle.',
      },
    ],
    ancestralWisdom: 'Las tuberías del hogar son como las venas subterráneas del Mayab que nutren a los pueblos. Repararlas a tiempo protege los acuíferos.',
  },
  {
    id: 'ch_cochera_auto',
    roomKey: 'cochera',
    roomName: 'Cochera · Vehículo',
    mayaRoom: "P'o' Kisbuuts'",
    problemTitle: 'Lavar la camioneta con manguera sin boquilla',
    shortDiagnosis: 'Se limpia el vehículo manteniendo la manguera abierta sobre el pavimento durante 25 minutos.',
    pointerPos: { x: 160, y: 342, label: 'Camioneta' },
    highlightBox: { x: 82, y: 215, width: 220, height: 225 },
    actions: [
      {
        id: 'act_cubeta_auto',
        title: 'Lavar la camioneta usando una cubeta con agua y un paño',
        mayaTitle: "Ch'uy ja' (Lavar con cubeta)",
        iconType: 'cubeta',
        isCorrect: true,
        waterSavedLiters: 110,
        explanation: '¡Ahorro ejemplar! Lavar con cubeta consume ~20 litros frente a más de 150 litros que gasta una manguera continua.',
      },
      {
        id: 'act_manguera_rapida',
        title: 'Dejar la manguera en el piso corriendo para enjuagar las llantas',
        mayaTitle: "Púul ja' (Gasto al drenaje)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'El agua corriendo por la cochera arrastra aceite y jabón directo a la alcantarilla pluvial.',
      },
      {
        id: 'act_lavar_calle',
        title: 'Usar la manguera también para empujar el polvo de toda la calle',
        mayaTitle: "K'as (Escoba de agua)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Usar el agua potable como escoba desperdicia cientos de litros que hacen falta en los hogares.',
      },
    ],
    ancestralWisdom: 'Limpiar no requiere abundancia sino conciencia: una jícara o una cubeta basta cuando se respeta el agua.',
  },
  {
    id: 'ch_techo_lluvia',
    roomKey: 'techo_lluvia',
    roomName: 'Techo y Patio',
    mayaRoom: "Ch'a' Ja' / Chultún",
    problemTitle: 'Lluvia sagrada enviada por Cháak corriendo al drenaje',
    shortDiagnosis: 'Cae un fuerte aguacero pero el agua del tejado escurre libremente hacia el drenaje de la calle.',
    pointerPos: { x: 670, y: 40, label: 'Canaleta pluvial' },
    highlightBox: { x: 550, y: 20, width: 290, height: 160 },
    actions: [
      {
        id: 'act_cosechar_chultun',
        title: 'Guiar el agua por canaletas con filtro a una cisterna o Chultún',
        mayaTitle: "Ch'a' ja' ti' Chultún (Cosechar lluvia)",
        iconType: 'recolectar',
        isCorrect: true,
        waterSavedLiters: 95,
        explanation: '¡Magistral visión maya! Cosechar agua de lluvia permite almacenar agua pura y gratuita para sanitarios, limpieza y riego.',
      },
      {
        id: 'act_dejar_calle',
        title: 'Dejar que toda el agua corra hacia la banqueta y la calle',
        mayaTitle: "Bíin ja' (Dejar perder)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'El agua de lluvia es un regalo del cielo. Dejarla ir sin cosecharla satura las alcantarillas y desperdicia agua dulce.',
      },
      {
        id: 'act_bloquear_techo',
        title: 'Tapar la salida de la canaleta para que se quede en el techo',
        mayaTitle: "K'al (Estancar agua)",
        iconType: 'cerrar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Estancar agua en la losa provoca goteras en las habitaciones y fomenta criaderos de mosquitos transmisores de dengue.',
      },
    ],
    ancestralWisdom: 'Nuestros antepasados tallaban Chultunes en la piedra caliza para recolectar las bendiciones del dios Cháak y sobrevivir a las secas.',
  },
  {
    id: 'ch_inodoro',
    roomKey: 'bano_inodoro',
    roomName: 'Baño · Inodoro',
    mayaRoom: "Wíix Ja'",
    problemTitle: 'Fuga silenciosa en el sapito de la taza del baño',
    shortDiagnosis: 'El sapito de hule no cierra bien y el agua se filtra continuamente hacia la taza sin que nadie baje la palanca.',
    pointerPos: { x: 355, y: 195, label: 'Válvula de inodoro' },
    highlightBox: { x: 310, y: 88, width: 265, height: 168 },
    actions: [
      {
        id: 'act_cambiar_sapito',
        title: 'Cambiar el sapito desgastado y calibrar el flotador',
        mayaTitle: 'Utskin (Sellar fuga interna)',
        iconType: 'reparar',
        isCorrect: true,
        waterSavedLiters: 50,
        explanation: '¡Gran observación! Un sapito dañado pierde hasta 100 litros al día en silencio. Remplazarlo frena la fuga por completo.',
      },
      {
        id: 'act_jalar_palanca',
        title: 'Jalar la palanca varias veces fuerte a ver si se acomoda',
        mayaTitle: "K'ux (Forzar mecanismo)",
        iconType: 'cerrar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Forzar la palanca puede reventar la cadena o romper la manivela sin corregir el empaque deformado.',
      },
      {
        id: 'act_ignorar_fuga',
        title: 'Ignorarlo porque el agua no se derrama al piso del baño',
        mayaTitle: "Ma'alob (Dejarlo pasar)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Aunque el piso esté seco, el agua potable se va directo al caño provocando un gasto fantasma enorme.',
      },
    ],
    ancestralWisdom: 'El agua que no hace ruido también se pierde. El guardián maya observa los detalles sutiles para proteger la vida en el hogar.',
  },
  {
    id: 'ch_inodoro_basura',
    roomKey: 'bano_inodoro',
    roomName: 'Baño · Inodoro',
    mayaRoom: "Wíix Ja'",
    problemTitle: 'Uso del inodoro como bote de basura con descargas constantes',
    shortDiagnosis: 'Se tiran toallitas, hilos y basura al sanitario y se baja la palanca cada vez para desaparecerlos.',
    pointerPos: { x: 355, y: 212, label: 'Taza del baño' },
    highlightBox: { x: 310, y: 88, width: 265, height: 168 },
    actions: [
      {
        id: 'act_bote_basura',
        title: 'Colocar la basura en su bote y descargar el sanitario solo cuando sea necesario',
        mayaTitle: "Ts'áa ti' nu'ukul (Usar bote)",
        iconType: 'cerrar',
        isCorrect: true,
        waterSavedLiters: 42,
        explanation: '¡Correcto! Cada descarga gasta entre 6 y 12 litros de agua limpia; además evita obstrucciones y contaminación de tuberías.',
      },
      {
        id: 'act_bajar_doble',
        title: 'Bajar la palanca dos veces para asegurarse de que baje la basura',
        mayaTitle: "Púul ja' (Doble descarga)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Hacer doble descarga desperdicia hasta 24 litros por uso y termina tapando el drenaje.',
      },
      {
        id: 'act_dejar_palanca_trabada',
        title: 'Poner más peso en el tanque para que salga más fuerte el agua',
        mayaTitle: "K'as (Alterar tanque)",
        iconType: 'reparar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Las toallitas y residuos sólidos no deben ir al agua; ningún ajuste de tanque resuelve el taponamiento.',
      },
    ],
    ancestralWisdom: 'Cada descarga equivale al agua que una persona bebe en varios días. Usa el sanitario con responsabilidad.',
  },
  {
    id: 'ch_patio_huerto',
    roomKey: 'patio_huerto',
    roomName: 'Patio y Huerto Maya',
    mayaRoom: "Pak'al yéetel Lu'um",
    problemTitle: 'Riego con manguera a pleno mediodía bajo el sol ardiente',
    shortDiagnosis: 'Las plantas y flores se riegan a las 12 del día con manguera abierta, provocando rápida evaporación.',
    pointerPos: { x: 670, y: 340, label: 'Huerto familiar' },
    highlightBox: { x: 576, y: 256, width: 280, height: 180 },
    actions: [
      {
        id: 'act_regar_atardecer',
        title: 'Regar al atardecer o temprano con regadera manual o cubeta',
        mayaTitle: "Ch'uy ja' ti' áak'ab (Riego fresco)",
        iconType: 'cubeta',
        isCorrect: true,
        waterSavedLiters: 45,
        explanation: '¡Excelente técnica agrícola! Regar en horas frescas permite que el agua penetre hasta las raíces sin evaporarse bajo el sol.',
      },
      {
        id: 'act_manguera_abierta',
        title: 'Dejar la manguera abierta tirada en la tierra por una hora',
        mayaTitle: "K'as lu'um (Inundación)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Dejar la manguera abierta encharca el suelo, pudre las raíces de las plantas y desperdicia cientos de litros.',
      },
      {
        id: 'act_regar_sol',
        title: 'Seguir regando a mediodía para refrescar las hojas',
        mayaTitle: "K'áak' le' (Quemar hojas)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Las gotas bajo el sol del mediodía actúan como lupas quemando las hojas y más del 50% del agua se evapora al instante.',
      },
    ],
    ancestralWisdom: "El respeto por los ciclos del sol (K'iin) y de la tierra (Lu'um) es la base de la milpa maya. Hidratar la tierra a la hora correcta es honrar la vida.",
  },
  {
    id: 'ch_patio_banqueta',
    roomKey: 'patio_huerto',
    roomName: 'Sala y Terraza',
    mayaRoom: "K'íiwik Na'",
    problemTitle: 'Lavar pisos y macetas usando manguera en lugar de escoba',
    shortDiagnosis: 'Se intenta limpiar el polvo y hojas secas empujándolos con un chorro constante de agua limpia.',
    pointerPos: { x: 610, y: 295, label: 'Maceta y piso' },
    highlightBox: { x: 576, y: 256, width: 280, height: 180 },
    actions: [
      {
        id: 'act_escoba_trapeador',
        title: 'Barrer primero en seco con escoba y limpiar solo con cubeta reutilizada',
        mayaTitle: 'Míis (Barrer en seco)',
        iconType: 'cubeta',
        isCorrect: true,
        waterSavedLiters: 70,
        explanation: '¡Gran ejemplo de orden! Barrer en seco retira la basura sólida sin gastar una sola gota de agua potable.',
      },
      {
        id: 'act_chorro_presion',
        title: 'Usar la manguera tapándola con el pulgar para tener más presión',
        mayaTitle: "Púul ja' (Chorro inútil)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Tapar la punta acelera la salida pero sigue desperdiciando más de 15 litros cada minuto.',
      },
      {
        id: 'act_echar_jabon_manguera',
        title: 'Echar abundante detergente y enjuagarlo con chorro abierto',
        mayaTitle: "K'askúunt (Agua jabonosa)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Requiere el triple de agua para enjuagar y contamina la tierra del jardín con químicos.',
      },
    ],
    ancestralWisdom: "La escoba (míis) fue creada para limpiar la tierra; el agua (ja') fue creada para dar vida.",
  },
  {
    id: 'ch_dormitorio_humedad',
    roomKey: 'dormitorio',
    roomName: 'Dormitorio · Muro',
    mayaRoom: "Way Na'",
    problemTitle: 'Mancha creciente de humedad en la pared junto al baño',
    shortDiagnosis: 'Una tubería oculta en el muro compartido empieza a gotear tras el yeso, desperdiciando agua día y noche.',
    pointerPos: { x: 590, y: 175, label: 'Muro húmedo' },
    highlightBox: { x: 576, y: 88, width: 278, height: 168 },
    actions: [
      {
        id: 'act_revisar_medidor_muro',
        title: 'Cerrar la llave de paso, revisar el medidor y reparar la tubería oculta',
        mayaTitle: "Utskin pak' (Reparar filtración)",
        iconType: 'reparar',
        isCorrect: true,
        waterSavedLiters: 80,
        explanation: '¡Detección oportuna! Atender las fugas ocultas evita la pérdida silenciosa de miles de litros y protege la estructura de la casa.',
      },
      {
        id: 'act_pintar_encima',
        title: 'Pasar pintura impermeabilizante encima sin revisar la tubería',
        mayaTitle: "Ta'ak (Ocultar fuga)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Pintar encima no detiene la fuga; el agua seguirá escapando dentro del muro dañando paredes y cimientos.',
      },
      {
        id: 'act_poner_mueble',
        title: 'Mover un mueble frente a la mancha para que no se vea',
        mayaTitle: "Tu'ubul (Ignorar el daño)",
        iconType: 'desperdiciar',
        isCorrect: false,
        waterSavedLiters: 0,
        explanation: 'Ignorar una fuga invisible permite que el desperdicio crezca semana tras semana sin control.',
      },
    ],
    ancestralWisdom: 'Un buen guardián escucha hasta lo que ocurre dentro de los muros para que ni una gota se pierda en silencio.',
  },
];

export const CadaGotaCuentaGame: React.FC<CadaGotaCuentaGameProps> = ({
  level,
  onSuccess,
  onFailure,
  onUpdateStats,
}) => {
  // Fresh randomized challenges and shuffled answer options on every playthrough
  const [sessionChallenges] = useState<WaterChallenge[]>(() =>
    shuffleArray(WATER_CHALLENGES_BANK)
      .slice(0, SESSION_CHALLENGES_COUNT)
      .map((ch) => ({
        ...ch,
        actions: shuffleArray(ch.actions),
      }))
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    waterSaved: number;
    ancestralWisdom: string;
  } | null>(null);

  // Solved tracking
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [totalWaterSaved, setTotalWaterSaved] = useState(0);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const failTimeoutRef = useRef<number | null>(null);

  const currentChallenge = sessionChallenges[currentIdx];
  const goalTarget = sessionChallenges.length; // 6 random challenges per session
  const solvedCount = solvedChallenges.length;

  useEffect(() => {
    return () => {
      if (failTimeoutRef.current) window.clearTimeout(failTimeoutRef.current);
    };
  }, []);

  // Sync HUD stats without timer (timeLeft = 0 means NO TIMER in HUD)
  useEffect(() => {
    onUpdateStats(lives, solvedCount, goalTarget, 0);
  }, [lives, solvedCount, goalTarget, onUpdateStats]);

  // Open modal to solve the targeted situation
  const handleOpenChallengeModal = () => {
    soundService.playClick();
    setActionFeedback(null);
    setIsModalOpen(true);
  };

  // Submit an action choice
  const handleSelectAction = (action: ActionOption) => {
    if (actionFeedback) return;

    if (action.isCorrect) {
      soundService.playSuccess();
      setScore((s) => s + 100);
      setTotalWaterSaved((w) => w + action.waterSavedLiters);

      if (!solvedChallenges.includes(currentChallenge.id)) {
        setSolvedChallenges((prev) => [...prev, currentChallenge.id]);
      }

      setActionFeedback({
        isCorrect: true,
        explanation: action.explanation,
        waterSaved: action.waterSavedLiters,
        ancestralWisdom: currentChallenge.ancestralWisdom,
      });
    } else {
      soundService.playLifeLoss();
      const nextLives = Math.max(0, lives - 1);
      setLives(nextLives);

      setActionFeedback({
        isCorrect: false,
        explanation: action.explanation,
        waterSaved: 0,
        ancestralWisdom: currentChallenge.ancestralWisdom,
      });

      if (nextLives <= 0) {
        failTimeoutRef.current = window.setTimeout(() => {
          setIsModalOpen(false);
          onFailure('Te has quedado sin oportunidades. Recuerda aplicar los hábitos de ahorro maya y vuelve a intentarlo.');
        }, 1200);
      }
    }
  };

  // Advance to next challenge
  const handleNextChallenge = () => {
    soundService.playClick();
    setIsModalOpen(false);
    setActionFeedback(null);

    if (currentIdx + 1 < sessionChallenges.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Finished all 6 challenges!
      soundService.playFanfare();
      setShowVictoryModal(true);
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center select-none animate-in fade-in duration-200 px-0.5 sm:px-0">
      {/* ======================================================================
          TOP STATUS HEADER (COMPACT & MOBILE RESPONSIVE)
          ====================================================================== */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 sm:p-3 mb-2 rounded-2xl bg-gradient-to-r from-slate-900/95 via-sky-950/90 to-slate-900/95 border-2 border-sky-400/50 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/40 shrink-0">
            <Droplets className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>
          <div className="min-w-0">
            <h2 className="font-pixel text-[10px] sm:text-xs text-sky-300 leading-snug break-words">
              Cada Gota Cuenta · La Na' Ecoahorradora
            </h2>
            <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
              Sin límite de tiempo · Resuelve una por una las situaciones
            </span>
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap shrink-0">
          <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-cyan-950/80 border border-cyan-400/50">
            <span className="text-xs">💧</span>
            <span className="text-[11px] font-bold text-cyan-200 font-mono tabular-nums">
              {totalWaterSaved} L
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-amber-950/80 border border-amber-400/50">
            <span className="text-xs">⭐</span>
            <span className="text-[11px] font-bold text-amber-200 font-mono tabular-nums">
              {score} pts
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-400/50">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold text-emerald-200 font-mono tabular-nums">
              {solvedCount}/{goalTarget}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================================
          THE CUTAWAY HOUSE (RESPONSIVE 9:5 SVG CONTAINER - PROPER Z-INDEX)
          ====================================================================== */}
      <div className="relative w-full max-w-[660px] mx-auto aspect-[9/5] max-h-[44dvh] min-h-[210px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-amber-500/70 shadow-2xl bg-[#091a27]">
        {/* Background Sky */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#12314d] via-[#0c2235] to-[#06131e]" />

        <svg
          className="relative z-10 w-full h-full block"
          viewBox="0 0 900 500"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground */}
          <rect x="0" y="440" width="900" height="60" fill="#292524" />
          <line x1="0" y1="440" x2="900" y2="440" stroke="#78350f" strokeWidth="4" />

          {/* Pitched Roof (Terracotta / Orange) */}
          <path d="M60 210 L560 25 L880 185 L860 205 L560 55 L80 230 Z" fill="#ea580c" />
          <path d="M560 25 L580 40 L880 185 L860 170 Z" fill="#c2410c" />

          {/* Main House Outline */}
          <rect x="300" y="80" width="560" height="360" fill="#0f2b3c" stroke="#0284c7" strokeWidth="6" />

          {/* Left Garage Wing Outline */}
          <rect x="80" y="210" width="220" height="230" fill="#13384c" stroke="#0284c7" strokeWidth="6" />
          <path d="M40 230 L320 90 L300 70 L20 210 Z" fill="#ea580c" />

          {/* ==================== ROOM 1: GARAGE & TUBERÍAS ==================== */}
          <g>
            <rect x="86" y="216" width="208" height="218" fill="#1e465a" />
            <rect x="96" y="230" width="130" height="200" fill="#2d5e75" />
            {/* Blue Truck */}
            <g transform="translate(105, 290)">
              <rect x="10" y="40" width="90" height="50" rx="8" fill="#0284c7" />
              <rect x="18" y="20" width="74" height="25" rx="4" fill="#38bdf8" />
              <rect x="30" y="55" width="50" height="22" rx="3" fill="#0f172a" />
              <line x1="30" y1="62" x2="80" y2="62" stroke="#94a3b8" strokeWidth="2" />
              <line x1="30" y1="68" x2="80" y2="68" stroke="#94a3b8" strokeWidth="2" />
              <rect x="15" y="55" width="10" height="12" rx="2" fill="#fde047" />
              <rect x="85" y="55" width="10" height="12" rx="2" fill="#fde047" />
              <rect x="12" y="90" width="18" height="20" rx="3" fill="#020617" />
              <rect x="80" y="90" width="18" height="20" rx="3" fill="#020617" />
            </g>
            {/* Water Heater & Pipes */}
            <g transform="translate(235, 280)">
              <rect x="10" y="20" width="35" height="85" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <rect x="20" y="30" width="15" height="25" rx="2" fill="#e2e8f0" />
              <path d="M-5 50 L10 50 M27 20 L27 5 L55 5" stroke="#ea580c" strokeWidth="4" fill="none" />
              <circle cx="0" cy="50" r="8" fill="#94a3b8" />
            </g>
          </g>

          {/* ==================== ROOM 2: BAÑO ==================== */}
          <g>
            <rect x="306" y="86" width="270" height="170" fill="#1b4255" />
            <line x1="306" y1="256" x2="576" y2="256" stroke="#0284c7" strokeWidth="4" />
            {/* Lamp */}
            <path d="M440 86 L440 105 L430 115 L450 115 Z" fill="#fde047" stroke="#ca8a04" />
            {/* Toilet */}
            <g transform="translate(325, 160)">
              <rect x="10" y="10" width="30" height="40" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <path d="M15 50 Q15 80 35 80 Q55 80 55 50 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <rect x="22" y="80" width="16" height="15" fill="#e2e8f0" />
            </g>
            {/* Sink */}
            <g transform="translate(420, 140)">
              <rect x="15" y="0" width="30" height="45" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <rect x="10" y="50" width="40" height="15" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <path d="M30 45 L30 38 Q30 34 35 34 L38 34" stroke="#94a3b8" strokeWidth="2" fill="none" />
              <rect x="25" y="65" width="10" height="30" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            </g>
            {/* Bathtub & shower */}
            <g transform="translate(485, 135)">
              <rect x="40" y="0" width="30" height="100" fill="#86efac" opacity="0.8" />
              <rect x="5" y="65" width="65" height="30" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <path d="M10 20 L25 15 L32 24" stroke="#94a3b8" strokeWidth="3" fill="none" />
              <circle cx="34" cy="26" r="5" fill="#64748b" />
            </g>
          </g>

          {/* ==================== ROOM 3: DORMITORIO ==================== */}
          <g>
            <rect x="576" y="86" width="278" height="170" fill="#16384a" />
            <line x1="576" y1="86" x2="576" y2="436" stroke="#0284c7" strokeWidth="6" />
            <rect x="650" y="105" width="22" height="30" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <rect x="680" y="105" width="22" height="30" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <rect x="710" y="105" width="22" height="30" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Bed */}
            <g transform="translate(630, 160)">
              <rect x="10" y="0" width="105" height="40" rx="3" fill="#ea580c" />
              <rect x="20" y="25" width="35" height="15" rx="3" fill="#ffffff" />
              <rect x="65" y="25" width="35" height="15" rx="3" fill="#ffffff" />
              <rect x="10" y="40" width="105" height="45" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <rect x="20" y="55" width="85" height="15" fill="#38bdf8" />
            </g>
            {/* Lamps */}
            <g transform="translate(600, 185)">
              <rect x="0" y="15" width="25" height="40" fill="#ea580c" />
              <path d="M5 15 L20 15 L16 0 L9 0 Z" fill="#fde047" />
            </g>
            <g transform="translate(750, 185)">
              <rect x="0" y="15" width="25" height="40" fill="#ea580c" />
              <path d="M5 15 L20 15 L16 0 L9 0 Z" fill="#fde047" />
            </g>
          </g>

          {/* ==================== ROOM 4: COCINA ==================== */}
          <g>
            <rect x="306" y="256" width="270" height="180" fill="#1e465a" />
            {/* Shelves */}
            <g transform="translate(370, 275)">
              <rect x="0" y="0" width="120" height="6" fill="#ea580c" />
              <circle cx="20" cy="-6" r="6" fill="#0284c7" />
              <circle cx="45" cy="-6" r="8" fill="#f59e0b" />
              <rect x="70" y="-12" width="18" height="12" fill="#10b981" />
              <rect x="0" y="25" width="120" height="6" fill="#ea580c" />
              <rect x="30" y="15" width="10" height="10" fill="#cbd5e1" />
              <rect x="50" y="15" width="10" height="10" fill="#cbd5e1" />
            </g>
            {/* Sink & Cabinets */}
            <g transform="translate(325, 345)">
              <rect x="0" y="15" width="45" height="75" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <circle cx="22" cy="30" r="10" fill="#0284c7" />
              <rect x="50" y="20" width="85" height="70" fill="#ea580c" />
              <rect x="50" y="15" width="85" height="8" fill="#f8fafc" />
              <rect x="65" y="17" width="40" height="15" rx="2" fill="#cbd5e1" />
              <path d="M85 17 L85 0 Q85 -5 80 -5 L75 -5" stroke="#94a3b8" strokeWidth="3" fill="none" />
              <line x1="75" y1="45" x2="75" y2="60" stroke="#fef08a" strokeWidth="3" />
              <line x1="110" y1="45" x2="110" y2="60" stroke="#fef08a" strokeWidth="3" />
            </g>
            {/* Fridge */}
            <g transform="translate(470, 310)">
              <rect x="10" y="0" width="45" height="125" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <line x1="10" y1="40" x2="55" y2="40" stroke="#0284c7" strokeWidth="2" />
              <rect x="15" y="15" width="4" height="15" rx="1" fill="#0284c7" />
              <rect x="15" y="55" width="4" height="25" rx="1" fill="#0284c7" />
            </g>
          </g>

          {/* ==================== ROOM 5: SALA Y PATIO ==================== */}
          <g>
            <rect x="576" y="256" width="278" height="180" fill="#13384c" />
            {/* Lamp */}
            <path d="M720 256 L720 290 L710 305 L730 305 Z" fill="#fde047" stroke="#ca8a04" />
            {/* Bookshelf */}
            <g transform="translate(595, 300)">
              <rect x="0" y="0" width="30" height="135" fill="#ea580c" />
              <ellipse cx="15" cy="-8" rx="8" ry="4" fill="#15803d" />
              <circle cx="15" cy="-14" r="7" fill="#22c55e" />
            </g>
            {/* Armchair */}
            <g transform="translate(640, 360)">
              <rect x="0" y="10" width="35" height="40" rx="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <rect x="5" y="25" width="25" height="35" rx="3" fill="#0284c7" />
            </g>
            {/* Sofa */}
            <g transform="translate(695, 350)">
              <rect x="0" y="0" width="90" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <rect x="10" y="20" width="30" height="40" rx="3" fill="#0284c7" />
              <rect x="50" y="20" width="30" height="40" rx="3" fill="#0284c7" />
              <rect x="0" y="55" width="90" height="25" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            </g>
          </g>

          {/* Room Labels */}
          <text x="320" y="110" fill="#93c5fd" fontSize="13" fontWeight="bold">🚿 BAÑO (Ichkíil)</text>
          <text x="590" y="110" fill="#93c5fd" fontSize="13" fontWeight="bold">🛏️ DORMITORIO</text>
          <text x="320" y="280" fill="#fcd34d" fontSize="13" fontWeight="bold">🍳 COCINA (K'óoben)</text>
          <text x="590" y="280" fill="#93c5fd" fontSize="13" fontWeight="bold">🛋️ SALA FAMILIAR</text>
          <text x="96" y="245" fill="#93c5fd" fontSize="13" fontWeight="bold">🚗 COCHERA Y TUBERÍAS</text>

          {/* ==========================================================
              ACTIVE ROOM HIGHLIGHT HALO & ANIMATED POINTER
              ========================================================== */}
          <g>
            {/* Animated Golden Halo around active room */}
            <rect
              x={currentChallenge.highlightBox.x}
              y={currentChallenge.highlightBox.y}
              width={currentChallenge.highlightBox.width}
              height={currentChallenge.highlightBox.height}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="4"
              strokeDasharray="8 6"
              className="animate-pulse"
              rx="10"
            />

            {/* Pulsing Target Pin with water droplets */}
            <g transform={`translate(${currentChallenge.pointerPos.x}, ${currentChallenge.pointerPos.y})`}>
              <circle cx="0" cy="0" r="18" fill="#38bdf8" opacity="0.4" className="animate-ping" />
              <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
              <path d="M0 -5 L0 5 M-5 0 L5 0" stroke="#ffffff" strokeWidth="2" />
              {/* Dripping Water Streams */}
              <circle cx="0" cy="18" r="3" fill="#38bdf8" className="animate-bounce" />
              <circle cx="0" cy="28" r="2.5" fill="#0ea5e9" className="animate-pulse" />
            </g>
          </g>
        </svg>

        {/* Floating In-house Banner */}
        <div className="absolute z-20 top-1.5 right-1.5 sm:top-2.5 sm:right-3 max-w-[78%] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-900/90 border border-amber-400 sm:border-2 text-amber-200 font-pixel text-[8px] sm:text-[10px] flex items-center gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-ping shrink-0" />
          <span className="truncate">{currentChallenge.roomName} ({currentChallenge.mayaRoom})</span>
        </div>
      </div>

      {/* ======================================================================
          STEP-BY-STEP DOCKED ACTION BAR (MOBILE FRIENDLY)
          ====================================================================== */}
      <div className="w-full p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900/95 via-sky-950/90 to-slate-900/95 border-2 sm:border-3 border-amber-400 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-2">
        {/* Step Indicator and Brief Description */}
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-pixel text-sm sm:text-base shrink-0 shadow-inner">
            {currentIdx + 1}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
              <span className="text-[9px] sm:text-[10px] font-pixel text-sky-400 uppercase tracking-wider">
                {currentChallenge.roomName} ({currentChallenge.mayaRoom})
              </span>
              <span className="text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-pixel border border-amber-400/40 shrink-0">
                Paso a Paso
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-100 leading-snug">
              {currentChallenge.problemTitle}
            </h3>
            <p className="text-xs text-slate-300 line-clamp-2 sm:line-clamp-1 mt-0.5">
              {currentChallenge.shortDiagnosis}
            </p>
          </div>
        </div>

        {/* Clear Action Button to Enter & Solve */}
        <button
          type="button"
          onClick={handleOpenChallengeModal}
          className="btn-pixel btn-pixel-gold card-shimmer w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 text-[11px] sm:text-sm rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0 animate-pulse"
        >
          <Search className="w-4 h-4 shrink-0" />
          <span>Solucionar problema</span>
          <ChevronRight className="w-4 h-4 shrink-0" />
        </button>
      </div>

      {/* ======================================================================
          MODAL DE RESOLUCIÓN ENFOCADA (MOMENTO DE DECISIÓN Y SABIDURÍA MAYA)
          ====================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto overflow-x-hidden p-4 sm:p-7 rounded-3xl bg-slate-900 border-4 border-amber-400 shadow-2xl text-slate-100 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
            {actionFeedback?.isCorrect && <ParticleBurst variant="burst" />}
            {/* Header */}
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/40 text-2xl">
                  💧
                </div>
                <div>
                  <span className="text-[10px] font-pixel text-sky-400 uppercase tracking-widest block">
                    {currentChallenge.roomName} · {currentChallenge.mayaRoom}
                  </span>
                  <h3 className="font-pixel text-xs sm:text-sm text-amber-300">
                    {currentChallenge.problemTitle}
                  </h3>
                </div>
              </div>
            </div>

            {/* Problem Details */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p className="font-medium text-slate-200">{currentChallenge.shortDiagnosis}</p>
              <div className="mt-2 text-amber-300 font-pixel text-[10px] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>¿Qué acción realizarías para proteger el agua (Ja')?</span>
              </div>
            </div>

            {/* Options Selection */}
            {!actionFeedback ? (
              <div className="space-y-2.5">
                <span className="block text-[11px] font-pixel text-slate-300">
                  Elige la solución adecuada:
                </span>
                {currentChallenge.actions.map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => handleSelectAction(act)}
                    className="w-full text-left p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border-2 border-slate-700 hover:border-amber-400 transition-all text-xs text-slate-100 cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex flex-col">
                      <span className="font-heading font-extrabold text-sm text-slate-100 group-hover:text-amber-200">
                        {act.title}
                      </span>
                      <span className="text-[10px] font-pixel text-emerald-400">
                        {act.mayaTitle}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            ) : (
              /* FEEDBACK RESULT AND MAYAN WISDOM */
              <div
                className={`p-4 rounded-2xl border-2 flex flex-col gap-3 animate-in zoom-in-95 ${
                  actionFeedback.isCorrect
                    ? 'bg-gradient-to-b from-emerald-950/95 to-slate-950 border-emerald-400 text-emerald-100'
                    : 'bg-gradient-to-b from-red-950/95 to-slate-950 border-red-400 text-red-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {actionFeedback.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-pixel text-xs sm:text-sm font-bold">
                      {actionFeedback.isCorrect ? '¡Excelente decisión sostenible!' : '¡Esa acción no cuida el agua!'}
                    </h4>
                    {actionFeedback.isCorrect && (
                      <span className="text-[10px] font-pixel text-emerald-300 font-bold">
                        +{actionFeedback.waterSaved} Litros de Ja' Protegidos · +100 Puntos
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-medium bg-black/40 p-3 rounded-xl border border-white/10">
                  {actionFeedback.explanation}
                </p>

                {/* Mayan Ancestral Wisdom */}
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                  <span className="text-xl shrink-0">🏛️</span>
                  <div>
                    <span className="font-pixel text-[9px] uppercase font-bold text-amber-300 block mb-0.5">
                      Sabiduría Maya Ancestral (Na'at Maya)
                    </span>
                    <p className="italic text-slate-300 text-[11px] leading-relaxed">
                      "{actionFeedback.ancestralWisdom}"
                    </p>
                  </div>
                </div>

                {actionFeedback.isCorrect ? (
                  <button
                    type="button"
                    onClick={handleNextChallenge}
                    className="btn-pixel btn-pixel-emerald w-full py-3.5 text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-1"
                  >
                    <span>Continuar a la siguiente habitación en la casa</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playClick();
                      setActionFeedback(null);
                    }}
                    className="btn-pixel btn-pixel-gold w-full py-3.5 text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Volver a intentar</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================================
          VICTORY MODAL (WHEN ALL SITUATIONS ARE SOLVED)
          ====================================================================== */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <ParticleBurst variant="burst" />
          <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto p-5 sm:p-8 rounded-3xl bg-slate-900 border-4 border-sky-400 shadow-[0_0_60px_rgba(56,189,248,0.5)] text-center text-slate-100 flex flex-col items-center gap-4 my-auto">
            <div className="text-6xl animate-bounce">💧</div>

            <h3 className="font-pixel text-base sm:text-lg text-sky-300">
              ¡Misión Cumplida en La Na' Ecoahorradora!
            </h3>

            <p className="text-xs sm:text-sm text-emerald-300 font-bold">
              ¡Has protegido el agua sagrada del hogar habitación por habitación!
            </p>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-2.5 w-full my-2">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-pixel">Desafíos Superados</span>
                <span className="text-base font-black text-amber-300 font-mono">
                  {solvedCount} de {goalTarget}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-pixel">Puntos Totales</span>
                <span className="text-base font-black text-amber-300 font-mono">
                  {score} pts
                </span>
              </div>
              <div className="col-span-2 p-3.5 rounded-2xl bg-cyan-950/80 border border-cyan-400/60 flex flex-col items-center">
                <span className="text-[10px] text-cyan-300 font-pixel uppercase font-bold">
                  Agua Sagrada Conservada
                </span>
                <span className="text-lg font-black text-cyan-100 font-mono">
                  {totalWaterSaved} Litros de Ja'
                </span>
                <span className="text-[11px] text-cyan-200/90 mt-1">
                  ¡Equivale a más de 18 garrafones de agua pura protegidos para la comunidad maya!
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              "Los antiguos mayas cuidaban cada manantial y recolectaban la lluvia en Chultunes. Al reparar las fugas del hogar, mantienes viva esta herencia sagrada."
            </p>

            <button
              type="button"
              onClick={() => {
                soundService.playSuccess();
                onSuccess(level.vocab);
              }}
              className="btn-pixel btn-pixel-gold w-full py-4 text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xl animate-pulse"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Regresar al mapa de escenarios</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
