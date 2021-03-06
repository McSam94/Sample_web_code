import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import en from './en.json';
import kr from './kr.json';

const langDetectorOptions = {
    // order and from where user language should be detected
    order: ['cookie', 'localStorage', 'navigator'],

    // keys or params to lookup language from
    lookupCookie: 'locale',
    lookupLocalStorage: 'locale',

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // only detect languages that are in the whitelist
    checkWhitelist: true,
};

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // Lazy Loading translation file
    .use(HttpApi)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources: {
            en: {
                // translation is the default namespace
                translation: en,
            },
            kr: {
                translation: kr,
            },
        },
        fallbackLng: 'en',
        debug: true,
        supportedLngs: ['en', 'kr'],
        whitelist: ['en', 'kr'], // available languages for browser dector to pick from
        detection: langDetectorOptions,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
