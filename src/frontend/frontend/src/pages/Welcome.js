import React, { useState, useEffect } from 'react';
import NavDropdownMenu from '../components/MenuDropDown';
import LanguageSwitcher from '../components/LenguageSwitcher';
import genioLogo from '../images/imagen genio.png'; // Asegúrate de poner la ruta correcta de tu logo
import Footer from '../components/Footer';
import './Welcome.css';
import { useTranslation } from 'react-i18next';
import { BsClipboard2DataFill } from "react-icons/bs";
import { IoFootball } from "react-icons/io5";
import { RiNewspaperLine } from "react-icons/ri";
import feature1 from '../images/feature1.jpg';
import feature2 from '../images/feature2.jpg';
import feature3 from '../images/feature3.jpg';
import { Link } from 'react-router-dom';

const features = [
    {
        icon: <BsClipboard2DataFill size={30} />,
        image: feature1,
        title: 'Datos fiables y actualizados',
        description: 'Gracias a la base de datos API-FOOTBALL, podemos ofrecer nuestras predicciones con los ultimos datos y estadisticas de los equipos mas famosos y actualizados al dia siguiente de celebrarse los partidos.'
        
    },
    {
        icon: <IoFootball size={30} />,
        image: feature2,
        title: 'Equipos y ligas Internacionales',
        description: 'Nuestra aplicacion cuenta con mas de 100 equipos de hasta 5 paises de la Union Europea como España, Francia, Italia, Alemania y Reino Unido,asi como ligas europeas o nacionales como La Supercopa, Champions, EuropaLeague, entre muchas.'
    },
    {
        icon: <RiNewspaperLine size={30} />,
        image: feature3,
        title: 'Predicciones en tiempo real',
        description: 'Gracias a nuestro equipo de analisis de datos, estadistico y matematico, hemos creado un sistema con el que predecir los resultados de los partidos de tu equipo favorito en base a estadisticas determinantes con las cuales obtener un resultado aproximado.'
    }
];

function Welcome() {
    const { t } = useTranslation();
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // Inicia la animación de desvanecimiento
            setTimeout(() => {
                setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
                setFade(true); // Termina la animación de desvanecimiento
            }, 500); // Duración de la transición
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
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
                <h1 className="welcome-title">¡Tu página perfecta para saber si la apuesta con tu amigo para el partido de esta noche la ganas!</h1>
                <div className="features">
                    <div className={`feature-box ${fade ? 'fade-in' : 'fade-out'}`}>
                        <img src={features[currentFeatureIndex].image} alt={features[currentFeatureIndex].title} className="feature-image" />
                        <div className="feature-content">
                            <div className="feature-header">
                                {features[currentFeatureIndex].icon}
                                <h3>{features[currentFeatureIndex].title}</h3>
                            </div>
                            <p>{features[currentFeatureIndex].description}</p>
                        </div>
                    </div>
                </div>
                <h2 className="welcome-startpredict">Empieza a usar nuestra aplicación y predice todos los partidos que quieras, !ya sea con nuestra formula optimizada o con tus propios gustos¡</h2>
                <div className="button-container">
                    <Link to="/prediction" className="button">Prediccion de Partidos</Link>
                    <Link to="/custom-prediction" className="button">Predicción Personalizada</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Welcome;

