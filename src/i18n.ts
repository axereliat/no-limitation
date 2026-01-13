import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bgTranslation from './locales/bg/translation.json';
import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';
import itTranslation from './locales/it/translation.json';

const resources = {
  bg: { translation: bgTranslation },
  en: { translation: enTranslation },
  ru: { translation: ruTranslation },
  it: { translation: itTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'bg',
  fallbackLng: 'bg',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
