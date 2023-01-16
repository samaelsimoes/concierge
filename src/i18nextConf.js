import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector';

const fallbackLng = ['en_US'];
const availableLanguages = ['en_US', 'pt_BR', 'es_ES'];

const backend = new Backend({Backend}, {loadPath: '/concierge/locales/{{lng}}/{{ns}}.json'})

i18n
  .use(backend) // load translations using http (default                                               public/assets/locals/en/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng: "en_US", // fallback language is english.
    load: 'all',
    detection: {
      checkWhitelist: true, // options for language detection
    },
    debug: false,
    supportedLngs: availableLanguages,
    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

export default i18n;