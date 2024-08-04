import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locale/en.json';
import ptTranslation from '../locale/pt-br.json';

const savedLanguage = localStorage.getItem('selectedLanguage');

i18n.use(initReactI18next).init({
    resources: {
        en: {
            ...enTranslation,
        },
        pt: {
            ...ptTranslation,
        },
    },
    lng: savedLanguage || 'en',
});

export default i18n;
