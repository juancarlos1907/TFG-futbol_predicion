import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MenuDropDown.css'; // Asegúrate de tener los estilos correspondientes

const MenuDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="nav-dropdown">
            <button className="nav-dropdown-button" onClick={toggleMenu}>
                {t('|||')}
            </button>
            {isOpen && (
                <div className="nav-dropdown-content">
                    <Link to="/" className="nav-dropdown-item">{t('Predicción base')}</Link>
                    <Link to="/custom-weights" className="nav-dropdown-item">{t('Prediccion con pesos personalizados')}</Link>
                </div>
            )}
        </div>
    );
};

export default MenuDropDown;
