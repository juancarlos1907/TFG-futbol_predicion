import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import './CustomWeightsPage.css';
import genioLogo from '../images/imagen genio.png';
import NavDropdownMenu from '../components/MenuDropDown';
import LanguageSwitcher from '../components/LenguageSwitcher';
import Footer from '../components/Footer';

const CustomWeightsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [homeGoalWeight, setHomeGoalWeight] = useState(0.35);
    const [awayGoalWeight, setAwayGoalWeight] = useState(0.35);
    const [possessionWeight, setPossessionWeight] = useState(0.15);
    const [passesWeight, setPassesWeight] = useState(0.10);
    const [savesWeight, setSavesWeight] = useState(0.05);
    const [predictionResult, setPredictionResult] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [selectionError, setSelectionError] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/teams');
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, []);

    const handleSelect = (team) => {
        if (selectedTeams.length < 2 && !selectedTeams.find(t => t.name === team.name)) {
            setSelectedTeams([...selectedTeams, team]);
        }
    };

    const handleRemove = (team) => {
        setSelectedTeams(selectedTeams.filter(t => t.name !== team.name));
    };

    const validateWeights = () => {
        const totalWeight = homeGoalWeight + awayGoalWeight + possessionWeight + passesWeight + savesWeight;
        if (totalWeight < 0.99 || totalWeight > 1.01) {
            setValidationError('La suma de los pesos debe ser aproximadamente 1.');
            return false;
        }
        setValidationError('');
        return true;
    };

    const handlePredict = async () => {
        if (!validateWeights()) {
            return;
        }

        if (selectedTeams.length !== 2) {
            setSelectionError('Por favor, selecciona exactamente dos equipos.');
            return;
        }

        setSelectionError(''); // Limpiar cualquier mensaje de error previo

        const [homeTeam, awayTeam] = selectedTeams;
        const queryParams = new URLSearchParams({
            home_goal_weight: homeGoalWeight,
            away_goal_weight: awayGoalWeight,
            possession_weight: possessionWeight,
            passes_weight: passesWeight,
            saves_weight: savesWeight,
        }).toString();

        try {
            const response = await fetch(`http://localhost:5000/api/fixture/statistics/${homeTeam.name}/${awayTeam.name}?${queryParams}`);
            const result = await response.json();
            setPredictionResult(result);

            // Guardar el resultado y redirigir a la página de predicción
            navigate('/prediction', { state: { result } });
        } catch (error) {
            console.error('Error fetching prediction:', error);
        }
    };

    const countries = Object.keys(t('countries', { returnObjects: true }));

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
            <div className="custom-weights-content">
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
                            <button className="remove-button" onClick={() => handleRemove(team)}>{t('buttonHP')}</button>
                        </div>
                    ))}
                </div>
                <div className="weight-inputs">
                    <div className="input-group">
                        <label htmlFor="home_goal_weight">Peso Goles Local:</label>
                        <input
                            type="number"
                            id="home_goal_weight"
                            value={homeGoalWeight}
                            onChange={(e) => setHomeGoalWeight(parseFloat(e.target.value))}
                            step="0.01"
                            min="0"
                            max="1"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="away_goal_weight">Peso Goles Visitante:</label>
                        <input
                            type="number"
                            id="away_goal_weight"
                            value={awayGoalWeight}
                            onChange={(e) => setAwayGoalWeight(parseFloat(e.target.value))}
                            step="0.01"
                            min="0"
                            max="1"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="possession_weight">Peso Posesión:</label>
                        <input
                            type="number"
                            id="possession_weight"
                            value={possessionWeight}
                            onChange={(e) => setPossessionWeight(parseFloat(e.target.value))}
                            step="0.01"
                            min="0"
                            max="1"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="passes_weight">Peso Pases:</label>
                        <input
                            type="number"
                            id="passes_weight"
                            value={passesWeight}
                            onChange={(e) => setPassesWeight(parseFloat(e.target.value))}
                            step="0.01"
                            min="0"
                            max="1"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="saves_weight">Peso Salvadas:</label>
                        <input
                            type="number"
                            id="saves_weight"
                            value={savesWeight}
                            onChange={(e) => setSavesWeight(parseFloat(e.target.value))}
                            step="0.01"
                            min="0"
                            max="1"
                        />
                    </div>
                </div>
                {validationError && <div className="validation-error">{validationError}</div>}
                {selectionError && <div className="selection-error">{selectionError}</div>}
                <button className="predict-button" onClick={handlePredict}>{t('predict')}</button>
                {predictionResult && (
                    <div className="prediction-result">
                        <h2>{t('prediction_result')}</h2>
                        <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CustomWeightsPage;
