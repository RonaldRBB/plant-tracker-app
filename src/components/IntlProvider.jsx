'use client';
import React, { useState, useEffect } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { messages, defaultLocale } from '../lang/intl-config';

export const LocaleContext = React.createContext({
    locale: defaultLocale,
    setLocale: () => {},
});

export function IntlProvider({ children }) {
    const [locale, setLocale] = useState(defaultLocale);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale) {
            setLocale(savedLocale);
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('locale', locale);
        }
    }, [locale, isClient]);

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <ReactIntlProvider
                messages={messages[locale]}
                locale={locale}
                defaultLocale={defaultLocale}
            >
                {children}
            </ReactIntlProvider>
        </LocaleContext.Provider>
    );
} 