import React, { useEffect } from 'react';
import NavDropdownMenu from '../components/MenuDropDown.js'
import LanguageSwitcher from '../components/LenguageSwitcher.js';
import genioLogo from '../images/imagen genio.png'; // Asegúrate de poner la ruta correcta de tu logo
import Footer from '../components/Footer.js';
import './Welcome.css';
import { useTranslation } from 'react-i18next';

function Welcome() {

    const { t } = useTranslation();

    useEffect(() => {
        const features = document.querySelectorAll('.feature-box');
        features.forEach((feature, index) => {
          feature.style.animationDelay = `${index * 0.5}s`; // Ajusta el retraso
        });
      }, []);

  return (
    <>
        <header className="header">
            <NavDropdownMenu />
            <div className="header-title-container">
                <img src={genioLogo} alt="Genio Logo" />
                <h1>{t('title')}</h1>
            </div>
            <LanguageSwitcher className="language-switcher" />
        </header>
        <div className="welcome-content">
            <h1>!Tu página perfecta para saber si la apuesta con tu amigo para el partido de esta noche la ganas¡</h1>
            <div className="features">
                <div className="feature-box">
                <h3>Datos fiables y actualizados</h3>
                <p>Gracias a la base de datos API-FOOTBALL, podemos ofrecer nuestras predicciones con los ultimos datos 
                    y estadisticas de los equipos mas famosos y actualizados al dia siguiente de celebrarse los partidos.</p>
                </div>
                <div className="feature-box">
                <h3>Equipos y ligas Internacionales</h3>
                <p>Nuestra aplicacion cuenta con mas de 100 equipos de hasta 5 paises de la Union Europea 
                    como España, Francia, Italia, Alemania y Reino Unido,asi como ligas europeas o 
                    nacionales como La Supercopa, Champions, EuropaLeague, entre muchas.</p>
                </div>
                <div className="feature-box">
                <h3>Predicciones en tiempo real</h3>
                <p>Gracias a nuestro equipo de analisis de datos, estadistico y matematico, 
                    hemos creado un sistema con el que predecir los resultados de los partidos de tu equipo favorito 
                    en base a estadisticas determinantes con las cuales obtener un resultado aproximado. </p>
                </div>
            </div>
        </div>
      <Footer />
    </>
  );
}

export default Welcome;
