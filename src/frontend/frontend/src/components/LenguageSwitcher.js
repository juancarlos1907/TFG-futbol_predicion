// LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import spanishFlag from '../images/spanish-flag.png';
import ukFlag from '../images/uk-flag.png';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <img
        src={spanishFlag}
        alt="Español"
        onClick={() => changeLanguage('es')}
        className="flag-icon"
      />
      <img
        src={ukFlag}
        alt="English"
        onClick={() => changeLanguage('en')}
        className="flag-icon"
      />
    </div>
  );
};

export default LanguageSwitcher;

