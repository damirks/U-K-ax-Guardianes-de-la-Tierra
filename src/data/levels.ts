import { LevelConfig, VocabWord } from '../types';

export const LEVELS: LevelConfig[] = [
  {
    id: "casa",
    name: "Cheém (Río Sagrado)",
    icon: "⛵",
    minigame: "Cheém: Aventura sobre el agua",
    type: "rio",
    resIcon: "🌊",
    tagline: "Navega en tu Cheém maya tradicional y recolecta residuos para purificar el río sagrado",
    vocab: [
      { maya: "cheém", es: "canoa / barco", img: "⛵" },
      { maya: "kay", es: "pez", img: "🐟" },
      { maya: "ja'", es: "agua", img: "💧" },
      { maya: "otoch", es: "casa", img: "🏠" },
      { maya: "k'iin", es: "sol / día", img: "☀️" }
    ],
    hint: "Mueve tu Cheém por el río en las 4 direcciones (flechas, WASD o botones táctiles) y atrapa los residuos. ¡Cuidado! Si atrapas a un pez sagrado (kay) pierdes una vida.",
    art: "./assets/aistudio/CHEEM__Aventura_sobre_el_agua_e41c5e12.png",
    palette: {
      primary: "#0284c7",
      secondary: "#38bdf8",
      accent: "#f59e0b",
      bgGradient: "from-sky-700 via-cyan-800 to-blue-900"
    }
  },
  {
    id: "escuela",
    name: "La Escuela",
    icon: "🏫",
    minigame: "Clasifica la basura",
    type: "clasifica",
    resIcon: "♻️",
    tagline: "Aprende la clasificación ambiental de residuos de México",
    vocab: [
      { maya: "ja'as", es: "plátano", img: "🍌" },
      { maya: "janal", es: "comida, alimento", img: "🥬" },
      { maya: "ju'un", es: "papel", img: "📰" },
      { maya: "ja'", es: "agua", img: "💧" },
      { maya: "che'", es: "árbol, madera", img: "🪵" }
    ],
    hint: "Toca un residuo que cae en el patio escolar y luego pulsa su contenedor correspondiente: Orgánico, Inorgánico o Peligroso.",
    art: "./assets/escenarios/escuela.png",
    palette: {
      primary: "#0284c7",
      secondary: "#0d9488",
      accent: "#fbbf24",
      bgGradient: "from-blue-600 via-sky-500 to-amber-100"
    }
  },
  {
    id: "parque",
    name: "El Campo",
    icon: "🌳",
    minigame: "Siembra en el campo",
    type: "siembra",
    resIcon: "🌱",
    tagline: "Reforesta las parcelas dañadas y devuelve la vida a la tierra",
    vocab: [
      { maya: "che'", es: "árbol, madera", img: "🌳" },
      { maya: "ya'ax che'", es: "ceiba (árbol sagrado)", img: "🌳" },
      { maya: "lu'um", es: "tierra", img: "🟫" },
      { maya: "iik'", es: "aire / viento", img: "💨" }
    ],
    hint: "Siembra en los cuadros de suelo fértil dentro del cercado cuando se ilumine una estrella ⭐. Completa las 3 misiones de siembra.",
    art: "./assets/escenarios/parque.png",
    palette: {
      primary: "#16a34a",
      secondary: "#84cc16",
      accent: "#f59e0b",
      bgGradient: "from-emerald-700 via-green-600 to-lime-500"
    }
  },
  {
    id: "gotas",
    name: "La Na' Ecoahorradora",
    icon: "💧",
    minigame: "Cada gota cuenta",
    type: "gotas",
    resIcon: "🏠",
    tagline: "Inspecciona la casa en corte transversal y protege el agua con decisiones responsables",
    vocab: [
      { maya: "ja'", es: "agua", img: "💧" },
      { maya: "otoch", es: "casa / hogar", img: "🏠" },
      { maya: "ch'a' ja'", es: "captar agua / lluvia", img: "🌧️" },
      { maya: "utsil", es: "bueno / bondad", img: "✨" },
      { maya: "lu'um", es: "tierra / suelo", img: "🟫" }
    ],
    hint: "Observa la vivienda en corte transversal e inspecciona las habitaciones (cocina, baño, patio, lavado y tuberías). Elige la mejor solución para ahorrar agua antes de que se agoten los 60 segundos.",
    art: "./assets/aistudio/Insignia_Pixel_de_Casa_Ecoahorradora_bcd27be2.png",
    palette: {
      primary: "#0284c7",
      secondary: "#0ea5e9",
      accent: "#38bdf8",
      bgGradient: "from-cyan-900 via-sky-950 to-blue-900"
    }
  },
  {
    id: "kaax",
    name: "El K'áax",
    icon: "🌴",
    minigame: "Rescata la fauna de México",
    type: "rescate",
    resIcon: "🐆",
    tagline: "Explora la selva nocturna con tu linterna y salva a especies en peligro",
    vocab: [
      { maya: "báalam", es: "jaguar", img: "🐆" },
      { maya: "áak", es: "tortuga", img: "🐢" },
      { maya: "kuuts", es: "pavo de monte", img: "🦃" },
      { maya: "k'áax", es: "monte / selva", img: "🌴" }
    ],
    hint: "La selva está oscura. Mueve el haz de tu linterna (flechas, WASD o arrastra) para iluminar a los animales protegidos y rescatarlos antes de que se agote el tiempo.",
    art: "./assets/escenarios/kaax.png",
    palette: {
      primary: "#065f46",
      secondary: "#047857",
      accent: "#10b981",
      bgGradient: "from-emerald-950 via-slate-900 to-green-950"
    }
  },
  {
    id: "memoria",
    name: "Memoria Maya",
    icon: "🧠",
    minigame: "Pares de palabras",
    type: "memory",
    resIcon: "🃏",
    tagline: "Descubre pares de glifos emparejando maya y español",
    vocab: [
      { maya: "ja'", es: "agua", img: "💧" },
      { maya: "che'", es: "árbol, madera", img: "🌳" },
      { maya: "k'iin", es: "sol, día", img: "☀️" },
      { maya: "janal", es: "comida", img: "🍽️" },
      { maya: "kéej", es: "venado", img: "🦌" },
      { maya: "miis", es: "gato", img: "🐱" },
      { maya: "kaan", es: "serpiente", img: "🐍" },
      { maya: "nikte'", es: "flor", img: "🌸" },
      { maya: "peek'", es: "perro", img: "🐶" },
      { maya: "t'uut'", es: "loro", img: "🦜" },
      { maya: "chéel", es: "arcoíris", img: "🌈" },
      { maya: "otoch", es: "casa", img: "🏠" },
      { maya: "kay", es: "pez", img: "🐟" },
      { maya: "k'áak'", es: "fuego", img: "🔥" }
    ],
    hint: "Voltea dos tarjetas de madera tallada por turno y empareja cada palabra maya con su traducción en español.",
    art: "./assets/escenarios/memoria.png",
    palette: {
      primary: "#6d28d9",
      secondary: "#8b5cf6",
      accent: "#fbbf24",
      bgGradient: "from-purple-950 via-indigo-900 to-violet-800"
    }
  },
  {
    id: "construye",
    name: "Construye la Palabra",
    icon: "🔤",
    minigame: "Ordena las letras",
    type: "spell",
    resIcon: "✏️",
    tagline: "Forma palabras en maaya t'aan ordenando sus glifos y glotalizaciones",
    vocab: [
      { maya: "che'", es: "árbol", img: "🌳" },
      { maya: "ja'", es: "agua", img: "💧" },
      { maya: "kéej", es: "venado", img: "🦌" },
      { maya: "miis", es: "gato", img: "🐱" },
      { maya: "kaan", es: "serpiente", img: "🐍" },
      { maya: "báalam", es: "jaguar", img: "🐆" },
      { maya: "kay", es: "pez", img: "🐟" },
      { maya: "kuuts", es: "pavo de monte", img: "🦃" },
      { maya: "áak", es: "tortuga", img: "🐢" },
      { maya: "peek'", es: "perro", img: "🐶" },
      { maya: "t'uut'", es: "loro", img: "🦜" },
      { maya: "otoch", es: "casa", img: "🏠" },
      { maya: "nikte'", es: "flor", img: "🌸" },
      { maya: "chéel", es: "arcoíris", img: "🌈" },
      { maya: "ixi'im", es: "maíz", img: "🌽" },
      { maya: "ja'as", es: "plátano", img: "🍌" },
      { maya: "kaab", es: "miel", img: "🍯" },
      { maya: "k'úum", es: "calabaza", img: "🎃" },
      { maya: "kuum", es: "olla de barro", img: "🏺" },
      { maya: "iik", es: "chile", img: "🌶️" },
      { maya: "síinik", es: "hormiga", img: "🐜" },
      { maya: "k'iin", es: "sol", img: "☀️" },
      { maya: "k'áak'", es: "fuego", img: "🔥" }
    ],
    hint: "Toca las letras en el orden exacto para construir la palabra maya que corresponde a la ilustración.",
    art: "./assets/escenarios/construye.png",
    palette: {
      primary: "#b45309",
      secondary: "#d97706",
      accent: "#fde047",
      bgGradient: "from-amber-900 via-orange-800 to-yellow-600"
    }
  },
  {
    id: "mercado",
    name: "El Mercado Maya",
    icon: "🧺",
    minigame: "Encuentra lo que piden",
    type: "market",
    resIcon: "🧺",
    tagline: "Atiende los pedidos de los marchantes en el bullicioso mercado tradicional",
    vocab: [
      { maya: "ja'as", es: "plátano", img: "🍌" },
      { maya: "ixi'im", es: "maíz", img: "🌽" },
      { maya: "k'úum", es: "calabaza", img: "🎃" },
      { maya: "iik", es: "chile", img: "🌶️" },
      { maya: "kaab", es: "miel", img: "🍯" },
      { maya: "kay", es: "pescado", img: "🐟" },
      { maya: "kuum", es: "olla de barro", img: "🏺" },
      { maya: "nikte'", es: "flor", img: "🌸" }
    ],
    hint: "Lee atentamente la petición en maaya t'aan del cliente y selecciona el producto correcto en el puesto del mercado.",
    art: "./assets/escenarios/mercado.png",
    palette: {
      primary: "#c2410c",
      secondary: "#ea580c",
      accent: "#facc15",
      bgGradient: "from-orange-950 via-amber-900 to-orange-700"
    }
  },
  {
    id: "templo",
    name: "El Templo de las Palabras",
    icon: "🗿",
    minigame: "Pruebas finales",
    type: "temple",
    resIcon: "⛩️",
    tagline: "Desbloquea las 4 puertas ancestrales demostrando tu sabiduría",
    vocab: [],
    hint: "Afronta las 4 puertas sagradas del templo: Significado, Glifos, Imágenes y la Gran Prueba Final.",
    art: "./assets/escenarios/templo.png",
    palette: {
      primary: "#78350f",
      secondary: "#92400e",
      accent: "#fbbf24",
      bgGradient: "from-stone-900 via-amber-950 to-stone-900"
    }
  }
];

export interface WasteItem {
  icon: string;
  name: string;
  mayaName: string;
  binKey: 'org' | 'ino' | 'pel';
  word?: VocabWord;
}

export const CL_BINS: Record<string, { name: string; color: string; icon: string; border: string; desc: string }> = {
  org: {
    name: "Orgánico",
    color: "bg-emerald-600 hover:bg-emerald-500",
    border: "border-emerald-400",
    icon: "🍂",
    desc: "Restos de comida, cáscaras, frutas, hojas y poda. Son biodegradables y sirven para abono."
  },
  ino: {
    name: "Inorgánico",
    color: "bg-blue-600 hover:bg-blue-500",
    border: "border-blue-400",
    icon: "♻️",
    desc: "Plásticos, papel, cartón, latas, vidrio y desechos no biodegradables de origen industrial."
  },
  pel: {
    name: "Peligroso",
    color: "bg-red-600 hover:bg-red-500",
    border: "border-red-400",
    icon: "☣️",
    desc: "Pilas usadas, aceite de motor, medicamentos caducados y aerosoles. Contaminan el suelo y el agua."
  }
};

export const CL_POOL: WasteItem[] = [
  { icon: "🍌", name: "Cáscara de plátano", mayaName: "Ja'as", binKey: "org", word: { maya: "ja'as", es: "plátano", img: "🍌" } },
  { icon: "🥬", name: "Restos de comida", mayaName: "Janal", binKey: "org", word: { maya: "janal", es: "comida, alimento", img: "🥬" } },
  { icon: "🍂", name: "Hojas secas del patio", mayaName: "Le'", binKey: "org", word: { maya: "le'", es: "hoja", img: "🍂" } },
  { icon: "🧴", name: "Botella de plástico", mayaName: "Lúuch ja'", binKey: "ino", word: { maya: "ja'", es: "agua", img: "💧" } },
  { icon: "📰", name: "Periódico seco", mayaName: "Ju'un", binKey: "ino", word: { maya: "ju'un", es: "papel", img: "📰" } },
  { icon: "🥫", name: "Lata de aluminio", mayaName: "Ta'an k'ab", binKey: "ino", word: { maya: "k'uxu'", es: "metal, lata", img: "🥫" } },
  { icon: "🫙", name: "Frasco de vidrio", mayaName: "Sasik", binKey: "ino", word: { maya: "lemba'", es: "vidrio transparente", img: "🫙" } },
  { icon: "📦", name: "Caja de cartón limpia", mayaName: "Che'", binKey: "ino", word: { maya: "che'", es: "árbol, madera", img: "🪵" } },
  { icon: "🚬", name: "Colilla de cigarro", mayaName: "K'uuts", binKey: "ino", word: { maya: "k'uuts", es: "tabaco / cigarro", img: "🚬" } },
  { icon: "🧻", name: "Papel sanitario usado", mayaName: "P'oox ju'un", binKey: "ino", word: { maya: "ju'un", es: "papel", img: "🧻" } },
  { icon: "🍼", name: "Pañal desechable", mayaName: "Nok' ta'", binKey: "ino", word: { maya: "nok'", es: "ropa, pañal", img: "🍼" } },
  { icon: "🛍️", name: "Bolsa de unicel grasosa", mayaName: "Soots'il", binKey: "ino", word: { maya: "k'as", es: "sucio, desecho", img: "🛍️" } },
  { icon: "🔋", name: "Pila alcalina gastada", mayaName: "K'áak' k'ub", binKey: "pel", word: { maya: "k'áak'", es: "fuego, energía", img: "🔋" } },
  { icon: "🛢️", name: "Aceite de motor usado", mayaName: "K'i'ik' lu'um", binKey: "pel", word: { maya: "k'i'ik'", es: "líquido espeso, aceite", img: "🛢️" } },
  { icon: "💊", name: "Medicamento caducado", mayaName: "Ts'aak", binKey: "pel", word: { maya: "ts'aak", es: "medicina", img: "💊" } }
];

export interface FaunaSpecies {
  emoji: string;
  name: string;
  info: string;
  word?: VocabWord;
}

export const JG_ANIMALS: FaunaSpecies[] = [
  {
    emoji: "🐆",
    name: "Jaguar",
    info: "El felino más grande de América. La deforestación reduce su territorio.",
    word: { maya: "báalam", es: "jaguar", img: "🐆" }
  },
  {
    emoji: "🦜",
    name: "Guacamaya roja",
    info: "Habita en las selvas del sureste mexicano. El tráfico ilegal amenaza su población."
  },
  {
    emoji: "🐢",
    name: "Tortuga marina",
    info: "Anida en playas mexicanas; los plásticos y la iluminación artificial desorientan a las crías.",
    word: { maya: "áak", es: "tortuga", img: "🐢" }
  },
  {
    emoji: "🦃",
    name: "Pavo ocelado",
    info: "Endémico de la Península de Yucatán y Centroamérica. Su hábitat selvático se fragmenta.",
    word: { maya: "kuuts", es: "pavo de monte", img: "🦃" }
  },
  {
    emoji: "🐋",
    name: "Manatí antillano",
    info: "Habita en lagunas y estuarios mayas. Las redes de pesca y embarcaciones a motor lo lastiman."
  },
  {
    emoji: "🐬",
    name: "Vaquita marina",
    info: "El cetáceo más amenazado del planeta, exclusivo del Alto Golfo de California."
  },
  {
    emoji: "🐒",
    name: "Mono araña",
    info: "Ágil acróbata de las copas de los árboles, amenazado por incendios y pérdida de selva."
  },
  {
    emoji: "🦅",
    name: "Águila harpía",
    info: "La rapaz más poderosa de las selvas altas, requiere bosques maduros y protegidos."
  },
  {
    emoji: "🐗",
    name: "Tapir centroamericano",
    info: "El mamífero terrestre más corpulento del sureste, dispersor vital de semillas en la selva."
  },
  {
    emoji: "🦌",
    name: "Venado cola blanca",
    info: "Mamífero sagrado de la selva maya (kéej), símbolo de nobleza y agilidad.",
    word: { maya: "kéej", es: "venado", img: "🦌" }
  },
  {
    emoji: "🦉",
    name: "Tecolote maya",
    info: "Ave nocturna guardiana del monte (tunkuruchu'), vigía de los misterios de la selva.",
    word: { maya: "tunkuruchu'", es: "búho / tecolote", img: "🦉" }
  }
];

