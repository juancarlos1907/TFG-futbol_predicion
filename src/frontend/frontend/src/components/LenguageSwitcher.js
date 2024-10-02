import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TfiWorld } from 'react-icons/tfi'; // Asegúrate de instalar react-icons
import './LenguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Cierra el menú después de seleccionar el idioma
  };

  return (
    <div className="nav-dropdown">
      <button className="nav-dropdown-button" onClick={toggleMenu}>
        <TfiWorld size={20} /> {/* Icono de un mundo */}
      </button>
      {isOpen && (
        <div className="nav-dropdown-content">
          <div
            className="nav-dropdown-item"
            onClick={() => changeLanguage('en')}
          >
            English
          </div>
          <div
            className="nav-dropdown-item"
            onClick={() => changeLanguage('es')}
          >
            Español
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
