import { GeneratedAdPack } from './schemas/ugc-schema.js';
import { ProductInput } from './prompts/hooks.js';

export interface HistoryItem {
  id: string;
  date: string;
  productName: string;
  productConfig: Partial<ProductInput>;
  adPack: GeneratedAdPack;
}

export interface UserSettings {
  defaultBrand: string;
  defaultCategory: string;
  defaultTargetPersona: string;
  defaultTone: ProductInput['tone'];
  defaultPlatform: ProductInput['platform'];
}

const DEFAULT_SETTINGS: UserSettings = {
  defaultBrand: 'GlowLab',
  defaultCategory: 'Skincare',
  defaultTargetPersona: 'Indian women, 22-32, skin-conscious',
  defaultTone: 'relatable',
  defaultPlatform: 'instagram',
};

export const store = {
  getHistory: (): HistoryItem[] => {
    try {
      const data = localStorage.getItem('ugc_history');
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  },
  addHistory: (item: HistoryItem) => {
    const history = store.getHistory();
    localStorage.setItem('ugc_history', JSON.stringify([item, ...history]));
  },
  clearHistory: () => {
    localStorage.removeItem('ugc_history');
  },
  getSettings: (): UserSettings => {
    try {
      const data = localStorage.getItem('ugc_settings');
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch { return DEFAULT_SETTINGS; }
  },
  saveSettings: (settings: UserSettings) => {
    localStorage.setItem('ugc_settings', JSON.stringify(settings));
  }
};
