export interface Style {
  id: string;
  name: string;
  category: string;
  prompt: string;
  thumbnail: string;
}

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
