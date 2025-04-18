import React, { useContext } from 'react';
import { LocaleContext } from './IntlProvider';
import { locales } from '../lang/intl-config';

export function LanguageSwitcher() {
    const { locale, setLocale } = useContext(LocaleContext);

    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
                <span className="icon">
                    <i className="fas fa-globe"></i>
                </span>
                <span>{locales.find(l => l.code === locale)?.name}</span>
            </a>
            <div className="navbar-dropdown">
                {locales.map(({ code, name }) => (
                    <a
                        key={code}
                        className={`navbar-item ${code === locale ? 'is-active' : ''}`}
                        onClick={() => setLocale(code)}
                    >
                        {name}
                    </a>
                ))}
            </div>
        </div>
    );
} 