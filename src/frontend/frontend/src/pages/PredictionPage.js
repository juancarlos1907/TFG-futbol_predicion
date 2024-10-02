import {React, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PredictionChart from '../components/PredictionChart';
import './PredictionPage.css';
import LanguageSwitcher from '../components/LenguageSwitcher';
import genioLogo from '../images/imagen genio.png';
import { useTranslation } from 'react-i18next';
import NavDropdownMenu from '../components/MenuDropDown';
import Footer from '../components/Footer.js';
import noDataImage from '../images/nodata.png';
import Modal from '../components/Modal.js';


const PredictionPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { result } = location.state || {};
    const navigate = useNavigate(); 
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRetry = () => {
        navigate(-1);
    };

    if (!result || !result.column_means) {
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
                <div className="prediction-page">
                    <div className="background"></div>
                    <div className="content no-data-content">
                        <img src={noDataImage} alt={t('predictionPage.noDataAlt')} className="no-data-image" />
                        <h2>{t('noDataTitle')}</h2>
                        <p>{t('noDataDescription')}</p>
                        <button onClick={handleRetry} className="retry-button">
                        {t('retryButton')}
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const teamNames = Object.keys(result.column_means);

    if (teamNames.length !== 2) {
        return <div>{t('predictionPage.errorTwoTeams')}</div>;
    }

    const [team1, team2] = teamNames;
    const team1Stats = result.column_means[team1];
    const team2Stats = result.column_means[team2];

    const data = {
        labels: [
            t('predictionPage.labels.goalkeeperSaves'),
            t('predictionPage.labels.goals'),
            t('predictionPage.labels.passes'),
            t('predictionPage.labels.possession')
        ],
        datasets: [
            {
                label: team1,
                data: [
                    team1Stats.goalkeeper_saves,
                    team1Stats.goals,
                    team1Stats['passes%'],
                    team1Stats['possession%']
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: '#00aaff',  // Color de la línea
                borderWidth: 2,  // Grosor de la línea
                pointBackgroundColor: '#00aaff',  // Color de los puntos
                pointBorderColor: '#003366',  // Color del borde de los puntos
                pointHoverBackgroundColor: '#003366',  // Color de fondo de los puntos al pasar el ratón
                pointHoverBorderColor: '#00aaff',  // Color del borde de los puntos al pasar el ratón
                
            },
            {
                label: team2,
                data: [
                    team2Stats.goalkeeper_saves,
                    team2Stats.goals,
                    team2Stats['passes%'],
                    team2Stats['possession%']
                ],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: '#9900cc',  // Color de la línea
                borderWidth: 2,  // Grosor de la línea
                pointBackgroundColor: '#9900cc',  // Color de los puntos
                pointBorderColor: '#003366',  // Color del borde de los puntos
                pointHoverBackgroundColor: '#003366',  // Color de fondo de los puntos al pasar el ratón
                pointHoverBorderColor: '#9900cc',  // Color del borde de los puntos al pasar el ratón
            },
        ],
    };

    const options = {
        scales: {
            y: {
                ticks: {
                    color: '#ffffff',  // Cambia el color de los números del eje Y
                    font: {
                        size: 116, // Aumenta el tamaño de las etiquetas del eje Y
                    }
                }
            },
            x: {
                ticks: {
                    color: '#ffffff',  // Cambia el color de los números del eje X
                    font: {
                        size: 116, // Aumenta el tamaño de las etiquetas del eje X
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff',  // Cambia el color de las etiquetas de la leyenda
                    font: {
                        size: 118, // Aumenta el tamaño del texto de la leyenda
                    }
                }
            },
            tooltip: {
                titleFont: {
                    size: 116, // Aumenta el tamaño del título en los tooltips
                },
                bodyFont: {
                    size: 150, // Aumenta el tamaño del cuerpo del texto en los tooltips
                },
            }
        }
    };

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
            <div className="prediction-page">
                <div className="background"></div>
                <div className="content">
                {}
                    <button onClick={handleOpenModal} className="explanation-button">
                        {t('predictionPage.explanationButton')}
                    </button>
                    
                    {}
                    <Modal show={showModal} onClose={handleCloseModal}>
                        <h2>{t('predictionPage.modalTitle')}</h2>
                        <ul>
                            <li>{t('predictionPage.modalPoint1')}</li>
                            <li>{t('predictionPage.modalPoint2')}</li>
                            <p>{t('predictionPage.formula')}</p>
                            <p>{t('predictionPage.modalDescription')}</p>
                            <li>{t('predictionPage.modalPoint3')}</li>
                        </ul>
                    </Modal>
                    <h2>{t('predictionPage.resultTitle')}
                    
                    </h2>
                    <div className="team-results">
                        <div className="team-result">
                            <p>{result.home_team_result}</p>
                        </div>
                        <div className="team-result">
                            <p>{result.away_team_result}</p>
                        </div>
                    </div>
                        <div className="winner-container">
                            <p className="winner-text">
                                <strong>{t('predictionPage.winner')}: {result.winner}</strong>
                            </p>
                        {result.warning && (
                            <div className="warning-inline">
                                <span className="warning-icon">⚠️</span>
                                <div className="warning-text">
                                    {t('predictionPage.warningMessage')}
                                </div>
                            </div>
                        )}
                    </div>
                    <div style={{ width: '80%', margin: 'auto' }}>
                        <PredictionChart data={data} options={options} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PredictionPage;
