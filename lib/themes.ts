export interface Theme {
  id: 'professional';
  name: string;
  color: string;
}

export const themes: Record<string, Theme> = {
  'professional': {
    id: 'professional',
    name: 'AI Mentor',
    color: 'blue',
  },
};
