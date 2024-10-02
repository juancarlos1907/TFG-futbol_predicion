import NavDropdownMenu from '../components/MenuDropDown';
import LanguageSwitcher from '../components/LenguageSwitcher';
import genioLogo from '../images/imagen genio.png';
import Footer from '../components/Footer';
import "./AboutUs1.css";
import { useTranslation } from 'react-i18next';


function AboutUs (){
    const { t } = useTranslation();

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
            <main className="prediction-page">
                <div className="background"></div>
                <section className="about-us-section">
                    <h2>{t('aboutUsApp.missionTitle')}</h2>
                    <p>{t('aboutUsApp.missionText')}</p>
                </section>

                <section className="about-us-section">
                    <h2>{t('aboutUsApp.howItWorksTitle')}</h2>
                    <p>{t('aboutUsApp.howItWorksText')}</p>
                </section>

                <section className="about-us-section">
                    <h2>{t('aboutUsApp.formulaTitle')}</h2>
                    <p>{t('aboutUsApp.formulaText')}</p>
                    <p>{t('aboutUsApp.formula')}</p>
                    <p>{t('aboutUsApp.formulaText2')}</p>
                </section>

                <section className="about-us-section">
                    <h2>{t('aboutUsApp.ourGoalTitle')}</h2>
                    <p>{t('aboutUsApp.ourGoalText')}</p>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default AboutUs;
