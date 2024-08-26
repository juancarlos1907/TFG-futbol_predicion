import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MenuDropDown.css'; // Asegúrate de tener los estilos correspondientes
import { TfiMenuAlt } from "react-icons/tfi";

const MenuDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="nav-dropdown">
            <button className="nav-dropdown-button" onClick={toggleMenu}>
                <TfiMenuAlt size={20} />
            </button>
            {isOpen && (
                <div className="nav-dropdown-content">
                    <Link to="/" className="nav-dropdown-item">{t('home')}</Link>
                    <Link to="/prediction" className="nav-dropdown-item">{t('primerPredicc')}</Link>
                    <Link to="/custom-prediction" className="nav-dropdown-item">{t('segundoPredicc')}</Link>
                    <Link to="/aboutUs" className="nav-dropdown-item">{t('aboutUs')}</Link>
                </div>
            )}
        </div>
    );
};

export default MenuDropDown;
