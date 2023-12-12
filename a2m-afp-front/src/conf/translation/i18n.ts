import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import translationEN from '../../assets/i18n/en.json';
import translationKR from '../../assets/i18n/kr.json';
import { Constant } from '../../constants/constant';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    kr: {
        translation: translationKR
    }
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA,
        debug: true,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export default i18n;

