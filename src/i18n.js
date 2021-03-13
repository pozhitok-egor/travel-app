import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationZH from './locales/zh/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  },
  zh: {
    translation: translationZH
  }
};

i18n
  .use(reactI18nextModule)
  .init({
    resources,
    lng: "ru",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;