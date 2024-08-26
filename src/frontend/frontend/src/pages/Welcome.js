import React, { useState, useEffect } from 'react';
import NavDropdownMenu from '../components/MenuDropDown';
import LanguageSwitcher from '../components/LenguageSwitcher';
import genioLogo from '../images/imagen genio.png';
import Footer from '../components/Footer';
import './Welcome.css';
import { useTranslation } from 'react-i18next';
import { BsClipboard2DataFill } from "react-icons/bs";
import { IoFootball } from "react-icons/io5";
import { RiNewspaperLine } from "react-icons/ri";
import feature1 from '../images/feature1.jpg';
import feature2 from '../images/feature2.jpg';
import feature3 from '../images/feature3.png';
import { Link } from 'react-router-dom';

const features = [
    {
        icon: <BsClipboard2DataFill size={30} />,
        image: feature1,
        titleKey: 'features.dataReliable.title',
        descriptionKey: 'features.dataReliable.description'
    },
    {
        icon: <IoFootball size={30} />,
        image: feature2,
        titleKey: 'features.teamsLeagues.title',
        descriptionKey: 'features.teamsLeagues.description'
    },
    {
        icon: <RiNewspaperLine size={30} />,
        image: feature3,
        titleKey: 'features.realTimePredictions.title',
        descriptionKey: 'features.realTimePredictions.description'
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
                    <img src={genioLogo} alt={t('header.logoAlt')} />
                    <h1>{t('title')}</h1>
                </div>
                <LanguageSwitcher className="language-switcher" />
            </header>
            <div className="welcome-content">
                <h1 className="welcome-title">{t('welcomeTitle')}</h1>
                <div className="features">
                    <div className={`feature-box ${fade ? 'fade-in' : 'fade-out'}`}>
                        <img src={features[currentFeatureIndex].image} alt={t(features[currentFeatureIndex].titleKey)} className="feature-image" />
                        <div className="feature-content">
                            <div className="feature-header">
                                {features[currentFeatureIndex].icon}
                                <h3>{t(features[currentFeatureIndex].titleKey)}</h3>
                            </div>
                            <p>{t(features[currentFeatureIndex].descriptionKey)}</p>
                        </div>
                    </div>
                </div>
                <h2 className="welcome-startpredict">{t('welcomeStartPredict')}</h2>
                <div className="button-container">
                    <Link to="/prediction" className="button">{t('predict')}</Link>
                    <Link to="/custom-prediction" className="button">{t('predictCustom')}</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Welcome;
