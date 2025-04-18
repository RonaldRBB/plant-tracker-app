import { messages as spanishMessages } from './es/messages';
import { messages as englishMessages } from './en/messages';

export const messages = {
    es: spanishMessages,
    en: englishMessages,
};

export const defaultLocale = 'es';

export const locales = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
]; 