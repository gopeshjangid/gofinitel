import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from "./translation/en.json";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection : {
  // order and from where user language should be detected
  order: ['cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'KEYCLOAK_LOCALE',
  lookupCookie: 'KEYCLOAK_LOCALE',
  
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['cookie'],

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'http://localhost:8082/',

},
    resources: {
      en : {
        translation : enTranslation
      }
    },
    supportedLngs: ['en','fr'],
    debug: false,
    fallbackLng: "en",
    //lng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
  });


export default i18n;