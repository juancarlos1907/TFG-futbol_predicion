import React from 'react';
import { useLocation } from 'react-router-dom';
import PredictionChart from '../components/PredictionChart';
import './PredictionPage.css';
import LanguageSwitcher from '../components/LenguageSwitcher';
import genioLogo from '../images/imagen genio.png';
import { useTranslation } from 'react-i18next';
import NavDropdownMenu from '../components/MenuDropDown';


const PredictionPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { result } = location.state || {};

    if (!result || !result.column_means) {
        return <div>{t('predictionPage.noData')}</div>;
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
            },
        ],
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
                    <h2>{t('predictionPage.resultTitle')}</h2>
                    <p>{result.home_team_result}</p>
                    <p>{result.away_team_result}</p>
                    <p><strong>{t('predictionPage.winner')}: {result.winner}</strong></p>
                    <div style={{ width: '80%', margin: 'auto' }}>
                        <PredictionChart data={data} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PredictionPage;
