import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'fr';
export type Localized = { en: string; fr: string };

type LanguageState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  pick: (value: Localized | string) => string;
};

const LanguageContext = createContext<LanguageState | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('aurelia-lang') === 'fr' ? 'fr' : 'en'));

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('aurelia-lang', lang);
  }, [lang]);

  const value = useMemo<LanguageState>(() => ({
    lang,
    setLang,
    pick: (value) => typeof value === 'string' ? value : value[lang]
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

export const ui = {
  explorePrograms: { en: 'Explore Programs', fr: 'Explorer les programmes' },
  applyNow: { en: 'Apply Now', fr: 'Postuler maintenant' },
  learnMore: { en: 'Learn more', fr: 'En savoir plus' },
  search: { en: 'Search', fr: 'Rechercher' },
  all: { en: 'All', fr: 'Tous' },
  contact: { en: 'Contact', fr: 'Contact' },
  backHome: { en: 'Back Home', fr: 'Retour à l’accueil' },
  viewDetails: { en: 'View details', fr: 'Voir les détails' },
  register: { en: 'Register', fr: 'S’inscrire' },
  submit: { en: 'Submit', fr: 'Envoyer' },
  next: { en: 'Next', fr: 'Suivant' },
  back: { en: 'Back', fr: 'Retour' },
  close: { en: 'Close', fr: 'Fermer' },
  filters: { en: 'Filters', fr: 'Filtres' },
  noResults: { en: 'No results match your filters.', fr: 'Aucun résultat ne correspond à vos filtres.' },
  menu: { en: 'Menu', fr: 'Menu' }
} satisfies Record<string, Localized>;
