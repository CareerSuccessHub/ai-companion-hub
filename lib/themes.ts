export interface Theme {
  id: 'pixel-rpg' | 'anime' | 'pet';
  name: string;
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  cardBg: string;
  companionStyle: string;
}

export const themes: Record<string, Theme> = {
  'pixel-rpg': {
    id: 'pixel-rpg',
    name: 'Pixel RPG',
    background: 'bg-slate-900',
    text: 'text-green-400',
    primary: 'bg-green-600',
    secondary: 'bg-blue-600',
    accent: 'text-yellow-400',
    cardBg: 'bg-slate-800',
    companionStyle: 'pixelated',
  },
  'anime': {
    id: 'anime',
    name: 'Anime Companion',
    background: 'bg-gradient-to-br from-pink-100 to-purple-200',
    text: 'text-purple-900',
    primary: 'bg-pink-500',
    secondary: 'bg-purple-500',
    accent: 'text-pink-600',
    cardBg: 'bg-white/80',
    companionStyle: 'anime',
  },
  'pet': {
    id: 'pet',
    name: 'Pet Companion',
    background: 'bg-gradient-to-br from-amber-50 to-orange-100',
    text: 'text-amber-900',
    primary: 'bg-orange-500',
    secondary: 'bg-amber-500',
    accent: 'text-orange-600',
    cardBg: 'bg-white/90',
    companionStyle: 'pet',
  },
};
