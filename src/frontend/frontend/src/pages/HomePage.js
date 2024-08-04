import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LenguageSwitcher';
import Dropdown from '../components/Dropdown';
import './HomePage.css';
import genioLogo from '../images/imagen genio.png';

const HomePage = () => {
    const { t } = useTranslation(); // Hook para usar traducciones
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/teams');
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchData();
    }, []);

    const handleSelect = (team) => {
        if (selectedTeams.length < 2 && !selectedTeams.find(t => t.name === team.name)) {
            setSelectedTeams([...selectedTeams, team]);
        }
    };

    const handleRemove = (team) => {
        setSelectedTeams(selectedTeams.filter(t => t.name !== team.name));
    };

    const countries = Object.keys(t('countries', { returnObjects: true }));

    return (
        <>
            <header className="header">
                <div className="header-title-container">
                    <img src={genioLogo} alt="Genio Logo" />
                    <h1>{t('title')}</h1>
                </div>
                <LanguageSwitcher className="language-switcher" />
            </header>
            <div className="homepage-content">
                <div className="dropdown-container">
                    {countries.map(country => (
                        <Dropdown
                            key={country}
                            country={t(`countries.${country}`)}
                            teams={teams.filter(team => team.country === country)}
                            selectedTeams={selectedTeams}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
                <div className="selected-teams">
                    {selectedTeams.map(team => (
                        <div key={team.name} className="selected-team">
                            <img src={team.logo} alt={`${team.name} logo`} />
                            <span>{team.name}</span>
                            <button className="remove-button" onClick={() => handleRemove(team)}>Remove</button>
                        </div>
                    ))}
                </div>
                <button className="predict-button">{t('predict')}</button>
            </div>
        </>
    );
};

export default HomePage;
