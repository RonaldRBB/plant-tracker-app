'use client';

import Link from "next/link";
import PlantLogo from "./PlantLogo";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FormattedMessage } from "react-intl";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link href="/" className="navbar-item">
                    <PlantLogo />
                </Link>
                <button
                    className={`navbar-burger ${isActive ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded={isActive}
                    data-target="navbarMenu"
                    onClick={toggleMenu}
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </button>
            </div>

            <div id="navbarMenu" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-end">
                    <Link href="/" className="navbar-item">
                        <FormattedMessage id="nav.home" defaultMessage="Home" />
                    </Link>
                    <Link href="/my-plants" className="navbar-item">
                        <FormattedMessage id="nav.myPlants" defaultMessage="Mis Plantas" />
                    </Link>
                    <Link href="/plants" className="navbar-item">
                        <FormattedMessage id="nav.catalog" defaultMessage="Catálogo" />
                    </Link>
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
