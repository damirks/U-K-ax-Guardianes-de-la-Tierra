/**
 * Types for U K'áax: Guardianes de la Tierra
 */

export interface VocabWord {
  maya: string;
  es: string;
  img?: string;
  category?: string;
}

export type MinigameId =
  | 'casa'
  | 'escuela'
  | 'parque'
  | 'gotas'
  | 'kaax'
  | 'memoria'
  | 'construye'
  | 'mercado'
  | 'templo';

export type MinigameType =
  | 'rio'
  | 'clasifica'
  | 'siembra'
  | 'gotas'
  | 'rescate'
  | 'memory'
  | 'spell'
  | 'market'
  | 'temple';

export interface LevelConfig {
  id: MinigameId;
  name: string;
  icon: string;
  minigame: string;
  type: MinigameType;
  resIcon: string;
  tagline: string;
  hint: string;
  vocab: VocabWord[];
  art: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    bgGradient: string;
  };
}

export type GameScreen =
  | 'TITLE'
  | 'MAP_SELECT'
  | 'PLAYING'
  | 'MAYATETS_QUIZ'
  | 'VICTORY';

export interface PlayerProfile {
  name: string;
  avatar: string;
  npcGuide: string;
}

export interface MinigameResult {
  won: boolean;
  message: string;
  unlockedWords: VocabWord[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  mayaName: string;
  category: 'rescate' | 'rio' | 'clasifica' | 'siembra' | 'memoria' | 'quiz' | 'general';
}

