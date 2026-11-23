export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  mayaName: string;
  category: 'rescate' | 'rio' | 'clasifica' | 'siembra' | 'memoria' | 'quiz' | 'general';
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'rescate_maestro',
    title: 'Rescatista Maestro',
    mayaName: 'Nojoch Tokil',
    description: 'Rescata a todos los animales sagrados de la selva y enciende las antorchas protectoras.',
    icon: '🐆',
    category: 'rescate',
  },
  {
    id: 'rio_cristalino',
    title: 'Río de Cristal (Ja\')',
    mayaName: 'Sak Ja\'',
    description: 'Navega en Le Cheemo\' y limpia los desechos del río sagrado sin atrapar a ningún pez (kay).',
    icon: '⛵',
    category: 'rio',
  },
  {
    id: 'clasificador_experto',
    title: 'Clasificador Experto',
    mayaName: 'Utsil P\'oox',
    description: 'Clasifica correctamente los residuos en la escuela distinguiendo orgánicos y reciclables.',
    icon: '♻️',
    category: 'clasifica',
  },
  {
    id: 'sembrador_ceiba',
    title: 'Guardián de la Ceiba',
    mayaName: 'Ya\'ax Che\'',
    description: 'Siembra las semillas sagradas en el campo fértil y devuelve la vida a la tierra (Lu\'um).',
    icon: '🌱',
    category: 'siembra',
  },
  {
    id: 'memoria_ancestral',
    title: 'Memoria de Glifos',
    mayaName: 'K\'a\'ajsaj',
    description: 'Empareja los códices mayas sagrados descubriendo los glifos de la naturaleza.',
    icon: '🧠',
    category: 'memoria',
  },
  {
    id: 'constructor_lengua',
    title: 'Voz del Mayab',
    mayaName: 'T\'aanil',
    description: 'Construye palabras en maaya t\'aan letra por letra demostrando tu conocimiento.',
    icon: '📜',
    category: 'general',
  },
  {
    id: 'comerciante_justo',
    title: 'Trueque Sustentable',
    mayaName: 'K\'oob',
    description: 'Atiende a los pobladores en el mercado maya entregando productos locales ecológicos.',
    icon: '🧺',
    category: 'general',
  },
  {
    id: 'sabio_mayatets',
    title: 'Gran Sabio del Mayab',
    mayaName: 'Nojoch Ahau',
    description: 'Supera con éxito las pruebas del gran Quiz MayaTets con sabiduría en lengua maya.',
    icon: '🎓',
    category: 'quiz',
  },
  {
    id: 'guardian_del_agua',
    title: 'Guardián de Cada Gota',
    mayaName: 'Yáax Ja\'',
    description: 'Inspecciona la casa en corte transversal, repara fugas y protege el agua sagrada del hogar.',
    icon: '💧',
    category: 'general',
  },
];
